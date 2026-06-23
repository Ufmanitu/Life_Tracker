// ============================================================
//  duck.js — Life Tracker Duck Companion
//  Step 1: State model · localStorage schema · decay engine · trigger API
//
//  HOW TO USE (for now):
//    1. Add <script src="duck.js"></script> BEFORE app.js in every .html page
//    2. Call Duck.trigger('habitDone') etc. from app.js (Steps 5–7)
//    3. DuckUI (Step 3) reads Duck.getState() to render the widget
// ============================================================

const Duck = (() => {

  // ────────────────────────────────────────────────────────────
  //  STORAGE KEYS
  // ────────────────────────────────────────────────────────────
  const KEYS = {
    state:     'duck_state',       // JSON blob: stats + meta
    name:      'duck_name',        // string — user-chosen duck name
    lastReset: 'duck_last_reset',  // 'YYYY-MM-DD' — tracks daily resets
    log:       'duck_event_log',   // array of last 20 {event, time} entries
  };

  // ────────────────────────────────────────────────────────────
  //  DEFAULT STATE  (written on first ever load)
  // ────────────────────────────────────────────────────────────
  const DEFAULT_STATE = {
    stats: {
      health:    80,   // 0–100 · workout+water raise it, period/sick lowers it
      hunger:    60,   // 0–100 · fills when food is logged, drains over time
      energy:    75,   // 0–100 · resets every morning, drains through the day
      mood:      70,   // 0–100 · habits/tasks raise it, idle time lowers it
      happiness: 65,   // 0–100 · long-term wellbeing · streaks & goals drive it
    },
    emotion:            'happy',  // key from EMOTIONS — what the SVG renders
    lastSaved:          null,     // ISO timestamp of last save
    cyclePhase:         null,     // 'period' | 'pms' | 'ovulation' | 'luteal' | null
    onPill:             false,    // true = birth control mode active
    workoutToday:       false,    // resets each midnight
    workoutRecovering:  false,    // true for ~60 min post-workout (tired state)
    pomodoroActive:     false,    // true while Pomodoro timer is running
  };

  // ────────────────────────────────────────────────────────────
  //  EMOTION STATES  (each maps to one SVG pose in Step 2)
  // ────────────────────────────────────────────────────────────
  //  priority: higher number = wins over lower in resolveEmotion()
  //  transient: true = only shown briefly, then resolveEmotion() takes over
  const EMOTIONS = {
    happy:       { label: 'Happy 😊',      priority: 0,  transient: false },
    content:     { label: 'Content 🙂',    priority: 0,  transient: false },
    excited:     { label: 'Excited! 🎉',   priority: 1,  transient: false },
    working:     { label: 'Focused 🎯',    priority: 1,  transient: false },
    tired:       { label: 'Tired 😴',      priority: 2,  transient: false },
    sad:         { label: 'Sad 🥺',        priority: 2,  transient: false },
    sleeping:    { label: 'Sleeping 💤',   priority: 3,  transient: false },
    hungry:      { label: 'Hungry 🍗',     priority: 3,  transient: false },
    grumpy:      { label: 'Grumpy 😤',     priority: 3,  transient: false },
    sick:        { label: 'Sick 🤒',       priority: 4,  transient: false },
    eating:      { label: 'Eating 🍽',     priority: 5,  transient: true  },
    drinking:    { label: 'Drinking 💧',   priority: 5,  transient: true  },
    celebrating: { label: 'Yay! 🎊',       priority: 6,  transient: true  },
  };

  // ────────────────────────────────────────────────────────────
  //  PASSIVE DECAY  (applied per hour of elapsed time)
  // ────────────────────────────────────────────────────────────
  const DECAY = {
    hungerPerHour:       -4,    // empty stomach in ~25h without logging food
    energyPerHour:       -3,    // runs low by evening (~8h of use)
    moodPerHour:         -1.5,  // drifts without positive events
    happinessPerDay:     -1,    // slight daily drift; streaks offset this
    // health has NO passive decay — it only changes via events
  };

  // ────────────────────────────────────────────────────────────
  //  TRIGGER DEFINITIONS
  //
  //  Each entry is a recipe for what happens when Duck.trigger(key) is called.
  //
  //  Fields:
  //    health/hunger/energy/mood/happiness  — stat delta (+/-)
  //    emotion      — emotion to show immediately
  //    duration     — ms to hold the transient emotion (0 = permanent until next resolve)
  //    afterEmotion — emotion to switch to after duration expires (optional)
  //    afterDelay   — extra ms delay before afterEmotion (optional)
  // ────────────────────────────────────────────────────────────
  const TRIGGERS = {

    // ── Habits & Tasks ──────────────────────────────────────
    habitDone: {
      mood: +8, happiness: +4,
      emotion: 'happy', duration: 3000,
    },
    allHabitsDone: {
      mood: +20, happiness: +15,
      emotion: 'celebrating', duration: 5000,
    },
    taskDone: {
      mood: +5, happiness: +2,
      emotion: 'happy', duration: 2000,
    },
    streakMilestone: {
      mood: +15, happiness: +20,
      emotion: 'celebrating', duration: 6000,
    },
    goalAdded: {
      mood: +3,
      emotion: 'working', duration: 2000,
    },
    goalCompleted: {
      mood: +20, happiness: +25,
      emotion: 'celebrating', duration: 6000,
    },

    // ── Calories & Water ────────────────────────────────────
    foodLogged: {
      hunger: +25, mood: +5,
      emotion: 'eating', duration: 4000,
    },
    waterLogged: {
      health: +4, mood: +3,
      emotion: 'drinking', duration: 3000,
    },
    calorieGoalMet: {
      happiness: +10, mood: +10,
      emotion: 'celebrating', duration: 4000,
    },

    // ── Workout ─────────────────────────────────────────────
    workoutStarted: {
      energy: -8,
      emotion: 'working', duration: 2000,
    },
    workoutDone: {
      health: +15, happiness: +12, energy: -15, mood: +8,
      emotion: 'tired', duration: 8000,           // tired right after
      afterEmotion: 'happy', afterDelay: 2000,    // then proud & happy
    },

    // ── Menstrual Cycle ─────────────────────────────────────
    periodDay: {
      // applied each day during period — no duration (stays all day)
      health: -10, mood: -8, energy: -8,
      emotion: 'sick', duration: 0,
    },
    pmsPhase: {
      mood: -12, energy: -5,
      emotion: 'grumpy', duration: 0,
    },
    ovulationDay: {
      energy: +10, mood: +8,
      emotion: 'excited', duration: 5000,
    },
    lutealPhase: {
      energy: -3, mood: -3,
      // no emotion override — subtle effect only
    },
    pillTaken: {
      happiness: +3, mood: +2,
      emotion: 'happy', duration: 2000,
    },
    pillMissed: {
      mood: -5,
      emotion: 'sad', duration: 3000,
    },

    // ── Time-based (called internally) ──────────────────────
    midnight: {
      // daily reset: slept, so energy refills; woke up hungry
      energy: +40, hunger: -20,
    },
    morningBoost: {
      mood: +10, energy: +10,
      emotion: 'happy', duration: 3000,
    },
    longIdle: {
      // applied after 2h+ without any app interaction
      mood: -5, energy: -5,
    },

    // ── Pomodoro ─────────────────────────────────────────────
    pomodoroStart: {
      emotion: 'working', duration: 0,  // stays focused until finish
    },
    pomodoroFinish: {
      mood: +10, happiness: +5,
      emotion: 'happy', duration: 3000,
    },

    // ── Finance ──────────────────────────────────────────────
    expenseLogged: {
      mood: -2,
    },
    savingsGoalMet: {
      happiness: +10,
      emotion: 'celebrating', duration: 4000,
    },

    // ── Shopping ─────────────────────────────────────────────
    shoppingDone: {
      happiness: +5, mood: +5,
      emotion: 'excited', duration: 3000,
    },
  };

  // ────────────────────────────────────────────────────────────
  //  INTERNAL STATE (in-memory; mirrored to localStorage)
  // ────────────────────────────────────────────────────────────
  let state = null;

  // ────────────────────────────────────────────────────────────
  //  LOAD / SAVE
  // ────────────────────────────────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(KEYS.state);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = { ...deepClone(DEFAULT_STATE), ...parsed };
        // Always merge stats carefully so new keys get defaults
        state.stats = { ...DEFAULT_STATE.stats, ...(parsed.stats || {}) };
      } else {
        state = deepClone(DEFAULT_STATE);
        state.lastSaved = new Date().toISOString();
      }
    } catch (e) {
      console.warn('[Duck] localStorage read failed, using defaults:', e);
      state = deepClone(DEFAULT_STATE);
    }

    applyTimeDecay();
    checkDailyReset();
    resolveEmotion();
    return state;
  }

  function save() {
    state.lastSaved = new Date().toISOString();
    try {
      localStorage.setItem(KEYS.state, JSON.stringify(state));
    } catch (e) {
      console.warn('[Duck] Could not save state:', e);
    }
  }

  // ────────────────────────────────────────────────────────────
  //  TIME-BASED DECAY
  //  Called on every load — applies the passive stat drain
  //  that accumulated since the last save.
  // ────────────────────────────────────────────────────────────
  function applyTimeDecay() {
    if (!state.lastSaved) return;

    const now  = Date.now();
    const last = new Date(state.lastSaved).getTime();
    const hoursPassed = Math.min((now - last) / 3_600_000, 24); // cap at 24h

    if (hoursPassed < 0.1) return; // < 6 minutes — not worth applying

    adjustStat('hunger',    DECAY.hungerPerHour    * hoursPassed);
    adjustStat('energy',    DECAY.energyPerHour    * hoursPassed);
    adjustStat('mood',      DECAY.moodPerHour      * hoursPassed);
    adjustStat('happiness', DECAY.happinessPerDay  * (hoursPassed / 24));
  }

  // ────────────────────────────────────────────────────────────
  //  DAILY RESET  (runs once per calendar day)
  // ────────────────────────────────────────────────────────────
  function checkDailyReset() {
    const today     = todayStr();
    const lastReset = localStorage.getItem(KEYS.lastReset);
    if (lastReset === today) return;

    // New day! Apply midnight reset effects
    adjustStat('energy',    +40);  // slept → refreshed
    adjustStat('hunger',    -20);  // woke up hungry
    adjustStat('happiness', -1);   // daily drift (offset by tracking activity)

    // Clear daily flags
    state.workoutToday      = false;
    state.workoutRecovering = false;
    state.pomodoroActive    = false;

    // Cycle phase is re-applied fresh by the cycle module (Steps 5–7)
    // so we only clear it here if NOT on a multi-day phase
    if (!['period', 'pms'].includes(state.cyclePhase)) {
      state.cyclePhase = null;
    }

    localStorage.setItem(KEYS.lastReset, today);
    logEvent('midnight');
  }

  // ────────────────────────────────────────────────────────────
  //  CORE TRIGGER API
  //  The only function app.js needs to call.
  //  e.g. Duck.trigger('habitDone')
  //       Duck.trigger('foodLogged', { hunger: +40 })  // override delta
  // ────────────────────────────────────────────────────────────
  function trigger(eventKey, overrides = {}) {
    if (!state) load();

    const def = TRIGGERS[eventKey];
    if (!def) {
      console.warn('[Duck] Unknown trigger:', eventKey);
      return state;
    }

    const delta = { ...def, ...overrides };

    // ── Apply stat deltas ──
    ['health', 'hunger', 'energy', 'mood', 'happiness'].forEach(stat => {
      if (typeof delta[stat] === 'number') adjustStat(stat, delta[stat]);
    });

    // ── Special state flags ──
    if (eventKey === 'workoutDone')    { state.workoutToday = true; state.workoutRecovering = true; }
    if (eventKey === 'pomodoroStart')  state.pomodoroActive = true;
    if (eventKey === 'pomodoroFinish') state.pomodoroActive = false;
    if (eventKey === 'periodDay')      state.cyclePhase = 'period';
    if (eventKey === 'pmsPhase')       state.cyclePhase = 'pms';
    if (eventKey === 'ovulationDay')   state.cyclePhase = 'ovulation';
    if (eventKey === 'lutealPhase')    state.cyclePhase = 'luteal';

    // Workout recovery clears after 60 min
    if (eventKey === 'workoutDone') {
      setTimeout(() => {
        state.workoutRecovering = false;
        resolveEmotion();
        save();
        notifyUI();
      }, 60 * 60 * 1000);
    }

    // ── Set emotion ──
    if (delta.emotion) {
      setEmotion(delta.emotion);

      if (delta.duration > 0) {
        // Transient: revert to resolved emotion after duration
        setTimeout(() => {
          resolveEmotion();
          notifyUI();
        }, delta.duration);

        if (delta.afterEmotion) {
          setTimeout(() => {
            setEmotion(delta.afterEmotion);
            notifyUI();
          }, delta.duration + (delta.afterDelay || 0));
        }
      }
      // duration === 0 means the emotion is persistent until next resolveEmotion()
    } else {
      resolveEmotion();
    }

    logEvent(eventKey);
    save();
    notifyUI();

    return state;
  }

  // ────────────────────────────────────────────────────────────
  //  EMOTION RESOLVER
  //  Determines the "baseline" emotion from current stats.
  //  Priority rules fire top-to-bottom; first match wins.
  // ────────────────────────────────────────────────────────────
  function resolveEmotion() {
    const s = state.stats;

    if (s.health < 25)                             return setEmotion('sick');
    if (s.hunger < 15)                             return setEmotion('hungry');
    if (s.energy < 15)                             return setEmotion('sleeping');
    if (state.cyclePhase === 'period')             return setEmotion('sick');
    if (state.cyclePhase === 'pms')                return setEmotion('grumpy');
    if (state.workoutRecovering)                   return setEmotion('tired');
    if (state.pomodoroActive)                      return setEmotion('working');
    if (s.mood < 30)                               return setEmotion('sad');
    if (s.mood < 50 || s.energy < 35)             return setEmotion('tired');
    if (s.mood > 85 && s.happiness > 80)           return setEmotion('excited');
    if (s.mood > 70)                               return setEmotion('happy');
    return setEmotion('content');
  }

  function setEmotion(key) {
    if (EMOTIONS[key]) state.emotion = key;
    return key;
  }

  // ────────────────────────────────────────────────────────────
  //  HELPERS
  // ────────────────────────────────────────────────────────────
  function adjustStat(key, delta) {
    state.stats[key] = clamp((state.stats[key] ?? 0) + delta, 0, 100);
  }

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function logEvent(key) {
    try {
      const log = JSON.parse(localStorage.getItem(KEYS.log) || '[]');
      log.unshift({ event: key, time: new Date().toISOString() });
      if (log.length > 20) log.pop();
      localStorage.setItem(KEYS.log, JSON.stringify(log));
    } catch (_) { /* non-critical */ }
  }

  // Notifies DuckUI (defined in Step 3) to re-render.
  // Safe to call before Step 3 exists — it's a no-op.
  function notifyUI() {
    if (typeof DuckUI !== 'undefined' && typeof DuckUI.render === 'function') {
      DuckUI.render();
    }
  }

  // ────────────────────────────────────────────────────────────
  //  PUBLIC API
  // ────────────────────────────────────────────────────────────
  function getState()    { return state ?? load(); }
  function getStats()    { return (state ?? load()).stats; }
  function getEmotion()  { return (state ?? load()).emotion; }
  function getName()     { return localStorage.getItem(KEYS.name) || 'Quackers'; }
  function setName(n)    { localStorage.setItem(KEYS.name, String(n).trim() || 'Quackers'); }

  // Hourly passive tick (called by setInterval below)
  function tick() {
    if (!state) load();
    applyTimeDecay();
    checkDailyReset();
    resolveEmotion();
    save();
    notifyUI();
  }

  // ────────────────────────────────────────────────────────────
  //  EXPORTS
  // ────────────────────────────────────────────────────────────
  return {
    // Core
    load, save, tick, trigger,
    // Getters
    getState, getStats, getEmotion, getName, setName,
    // Schema references (useful for Step 3 UI & Step 8 speech lines)
    EMOTIONS, TRIGGERS, DEFAULT_STATE, KEYS,
  };

})();

// ── Auto-init ─────────────────────────────────────────────────
Duck.load();

// ── Hourly passive decay tick ─────────────────────────────────
setInterval(() => Duck.tick(), 60 * 60 * 1000);