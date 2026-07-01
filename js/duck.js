// ═══════════════════════════════════════════════════════════════════
// ── DUCK COMPANION — state engine ──────────────────────────────────
// Loaded on every page (after core.js) so the duck's mood keeps
// drifting/decaying in the background no matter which page the user
// is on. The actual "My Duck" page (duck.html + duck_page.js) is just
// a viewer/renderer on top of this state; every other page/module
// calls Duck.trigger(...) when something real happens (a habit gets
// checked, water gets logged, a workout is finished, etc).
// ═══════════════════════════════════════════════════════════════════

const Duck = (() => {

  const KEYS = {
    state:     'duck_state_v1',
    name:      'duck_name_v1',
    lastReset: 'duck_last_reset_v1',
    log:       'duck_event_log_v1',
  };

  // stats are 0-100. thirst/hunger/energy/mood decay passively; health and
  // happiness only move in response to triggers (real tracked behaviour).
  const DEFAULT_STATE = {
    stats: {
      health:    80,
      hunger:    65,
      thirst:    65,
      energy:    75,
      mood:      70,
      happiness: 65,
    },
    emotion:            'happy',
    lastSaved:          null,
    cyclePhase:         null,     // 'period' | 'pms' | 'ovulation' | 'luteal' | null
    workoutRecovering:  false,    // true for ~60 min post-workout (tired state)
    pomodoroActive:     false,
  };

  // priority is unused for now (resolveEmotion is a straight priority-ordered
  // if-chain) but kept so future poses/animations can reference it.
  const EMOTIONS = {
    happy:       { label:'Happy 😊' },
    content:     { label:'Content 🙂' },
    excited:     { label:'Excited! 🎉' },
    working:     { label:'Focused 🎯' },
    tired:       { label:'Tired 😴' },
    sad:         { label:'Sad 🥺' },
    sleeping:    { label:'Sleeping 💤' },
    hungry:      { label:'Hungry 🍗' },
    thirsty:     { label:'Thirsty 🥵' },
    grumpy:      { label:'Grumpy 😤' },
    sick:        { label:'Not feeling well 🤒' },
    eating:      { label:'Eating 🍽' },
    drinking:    { label:'Drinking 💧' },
    celebrating: { label:'Yay! 🎊' },
  };

  const DECAY = {
    hungerPerHour: -3.5,
    thirstPerHour: -5,     // thirst drains fastest — water is a daily habit
    energyPerHour: -3,
    moodPerHour:   -1.2,
    happinessPerDay: -1,
    // health has no passive decay — only events move it
  };

  const TRIGGERS = {
    // ── Habits & Tasks ──────────────────────────────────────
    habitDone:       { mood:+8, happiness:+4, emotion:'happy', duration:3000 },
    allHabitsDone:    { mood:+20, happiness:+15, emotion:'celebrating', duration:5000 },
    taskDone:        { mood:+5, happiness:+2, emotion:'happy', duration:2000 },
    streakMilestone:  { mood:+15, happiness:+20, emotion:'celebrating', duration:6000 },
    goalCompleted:    { mood:+20, happiness:+25, emotion:'celebrating', duration:6000 },

    // ── Calories & Water ────────────────────────────────────
    foodLogged:       { hunger:+25, mood:+3, emotion:'eating', duration:4000 },
    waterLogged:      { thirst:+30, health:+3, mood:+3, emotion:'drinking', duration:3000 },
    calorieGoalMet:   { happiness:+10, mood:+10, emotion:'celebrating', duration:4000 },

    // ── Workout ─────────────────────────────────────────────
    workoutStarted:   { energy:-8, emotion:'working', duration:2000 },
    workoutDone:      { health:+15, happiness:+12, energy:-15, mood:+8,
                        emotion:'tired', duration:8000, afterEmotion:'happy', afterDelay:2000 },

    // ── Menstrual Cycle (applied passively, see applyCyclePhase()) ──
    periodDay:        { health:-10, mood:-8, energy:-8, emotion:'sick', duration:0 },
    pmsPhase:         { mood:-12, energy:-5, emotion:'grumpy', duration:0 },
    ovulationDay:      { energy:+10, mood:+8, emotion:'excited', duration:5000 },
    lutealPhase:      { energy:-3, mood:-3 },
    pillTaken:        { happiness:+3, mood:+2, emotion:'happy', duration:2000 },
    pillMissed:       { mood:-5, emotion:'sad', duration:3000 },

    // ── Pomodoro ─────────────────────────────────────────────
    pomodoroStart:    { emotion:'working', duration:0 },
    pomodoroFinish:   { mood:+10, happiness:+5, emotion:'happy', duration:3000 },

    // ── Finance ──────────────────────────────────────────────
    expenseLogged:    { mood:-1 },
    savingsGoalMet:   { happiness:+10, emotion:'celebrating', duration:4000 },

    // ── Shopping / Recipes ───────────────────────────────────
    shoppingDone:     { happiness:+5, mood:+5, emotion:'excited', duration:3000 },

    // ── Direct interactions (from the duck page itself) ─────
    pet:              { happiness:+3, mood:+4, emotion:'happy', duration:2500 },
    treat:            { hunger:+15, happiness:+5, mood:+5, emotion:'eating', duration:3000 },
  };

  let duckState = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEYS.state);
      if (raw) {
        const parsed = JSON.parse(raw);
        duckState = { ...deepClone(DEFAULT_STATE), ...parsed };
        duckState.stats = { ...DEFAULT_STATE.stats, ...(parsed.stats || {}) };
      } else {
        duckState = deepClone(DEFAULT_STATE);
        duckState.lastSaved = new Date().toISOString();
      }
    } catch (e) {
      duckState = deepClone(DEFAULT_STATE);
    }

    applyTimeDecay();
    checkDailyReset();
    applyCyclePhase();
    resolveEmotion();
    return duckState;
  }

  function save() {
    duckState.lastSaved = new Date().toISOString();
    try { localStorage.setItem(KEYS.state, JSON.stringify(duckState)); } catch (e) {}
  }

  function applyTimeDecay() {
    if (!duckState.lastSaved) return;
    const now = Date.now();
    const last = new Date(duckState.lastSaved).getTime();
    const hoursPassed = Math.min((now - last) / 3_600_000, 24);
    if (hoursPassed < 0.1) return;

    adjustStat('hunger',    DECAY.hungerPerHour * hoursPassed);
    adjustStat('thirst',    DECAY.thirstPerHour * hoursPassed);
    adjustStat('energy',    DECAY.energyPerHour * hoursPassed);
    adjustStat('mood',      DECAY.moodPerHour * hoursPassed);
    adjustStat('happiness', DECAY.happinessPerDay * (hoursPassed / 24));
  }

  function checkDailyReset() {
    const today = todayStr();
    const lastReset = localStorage.getItem(KEYS.lastReset);
    if (lastReset === today) return;

    adjustStat('energy', +40);
    adjustStat('hunger', -15);
    adjustStat('thirst', -20);
    adjustStat('happiness', -1);

    duckState.workoutRecovering = false;
    duckState.pomodoroActive = false;

    localStorage.setItem(KEYS.lastReset, today);
    logEvent('midnight');
  }

  // ── Cycle phase awareness ───────────────────────────────────────
  // Reads duckState.cycleData directly (populated globally by core.js's
  // loadCycle(), same as every page). Kept self-contained here rather
  // than depending on cycle.js, which only loads on cycle.html.
  function getCyclePhaseToday() {
    try {
      if (typeof state === 'undefined' || !state.cycleData) return null;
      const cd = state.cycleData;
      const periods = (cd.periods || []).slice().sort((a, b) => new Date(a.start) - new Date(b.start));
      if (!periods.length) return null;
      const anchor = periods[periods.length - 1];
      const cycleLen = cd.cycleLen || 28;
      const dur = anchor.dur || 5;
      const base = new Date(anchor.start); base.setHours(0, 0, 0, 0);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const diff = ((today - base) / 86400000 % cycleLen + cycleLen) % cycleLen;
      if (cd.mode === 'pill') {
        const packDay = (Math.floor((today - base) / 86400000) % 28 + 28) % 28;
        return packDay < 21 ? null : 'pms'; // placebo week = mild PMS-ish dip
      }
      if (diff < dur) return 'period';
      if (diff >= cycleLen - 7) return 'pms';
      if (diff === cycleLen - 14) return 'ovulation';
      return 'luteal';
    } catch (e) { return null; }
  }

  let _lastAppliedCyclePhase = undefined;
  function applyCyclePhase() {
    const phase = getCyclePhaseToday();
    if (phase === _lastAppliedCyclePhase) { duckState.cyclePhase = phase; return; }
    _lastAppliedCyclePhase = phase;
    duckState.cyclePhase = phase;
    if (phase === 'period') trigger('periodDay');
    else if (phase === 'pms') trigger('pmsPhase');
    else if (phase === 'ovulation') trigger('ovulationDay');
    else if (phase === 'luteal') trigger('lutealPhase');
  }

  function trigger(eventKey, overrides = {}) {
    if (!duckState) load();
    const def = TRIGGERS[eventKey];
    if (!def) return duckState;
    const delta = { ...def, ...overrides };

    ['health', 'hunger', 'thirst', 'energy', 'mood', 'happiness'].forEach(stat => {
      if (typeof delta[stat] === 'number') adjustStat(stat, delta[stat]);
    });

    if (eventKey === 'workoutDone')    { duckState.workoutRecovering = true;
      setTimeout(() => { duckState.workoutRecovering = false; resolveEmotion(); save(); notifyUI(); }, 60 * 60 * 1000); }
    if (eventKey === 'pomodoroStart')  duckState.pomodoroActive = true;
    if (eventKey === 'pomodoroFinish') duckState.pomodoroActive = false;

    if (delta.emotion) {
      setEmotion(delta.emotion);
      if (delta.duration > 0) {
        setTimeout(() => { resolveEmotion(); notifyUI(); }, delta.duration);
        if (delta.afterEmotion) {
          setTimeout(() => { setEmotion(delta.afterEmotion); notifyUI(); }, delta.duration + (delta.afterDelay || 0));
        }
      }
    } else {
      resolveEmotion();
    }

    logEvent(eventKey);
    save();
    notifyUI();
    return duckState;
  }

  function resolveEmotion() {
    const s = duckState.stats;
    if (s.health < 25)                 return setEmotion('sick');
    if (duckState.cyclePhase === 'period') return setEmotion('sick');
    if (duckState.cyclePhase === 'pms')    return setEmotion('grumpy');
    if (s.thirst < 20)                 return setEmotion('thirsty');
    if (s.hunger < 20)                 return setEmotion('hungry');
    if (s.energy < 15)                 return setEmotion('sleeping');
    if (duckState.workoutRecovering)       return setEmotion('tired');
    if (duckState.pomodoroActive)          return setEmotion('working');
    if (s.mood < 30)                   return setEmotion('sad');
    if (s.mood < 50 || s.energy < 35)  return setEmotion('tired');
    if (s.mood > 85 && s.happiness > 80) return setEmotion('excited');
    if (s.mood > 70)                   return setEmotion('happy');
    return setEmotion('content');
  }

  function setEmotion(key) { if (EMOTIONS[key]) duckState.emotion = key; return key; }
  function adjustStat(key, delta) { duckState.stats[key] = clamp((duckState.stats[key] ?? 0) + delta, 0, 100); }
  function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
  function todayStr() { return new Date().toISOString().slice(0, 10); }
  function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

  function logEvent(key) {
    try {
      const log = JSON.parse(localStorage.getItem(KEYS.log) || '[]');
      log.unshift({ event: key, time: new Date().toISOString() });
      if (log.length > 20) log.pop();
      localStorage.setItem(KEYS.log, JSON.stringify(log));
    } catch (e) {}
  }

  function notifyUI() {
    if (typeof DuckUI !== 'undefined' && typeof DuckUI.render === 'function') DuckUI.render();
    if (typeof DuckPeek !== 'undefined' && typeof DuckPeek.render === 'function') DuckPeek.render();
  }

  function getState()   { return duckState ?? load(); }
  function getStats()   { return (duckState ?? load()).stats; }
  function getEmotion() { return (duckState ?? load()).emotion; }
  function getLog()     { try { return JSON.parse(localStorage.getItem(KEYS.log) || '[]'); } catch (e) { return []; } }
  function getName()    { return localStorage.getItem(KEYS.name) || 'Quackers'; }
  function setName(n)   { localStorage.setItem(KEYS.name, String(n).trim() || 'Quackers'); }

  function tick() {
    if (!duckState) load();
    applyTimeDecay();
    checkDailyReset();
    applyCyclePhase();
    resolveEmotion();
    save();
    notifyUI();
  }

  return {
    load, save, tick, trigger,
    getState, getStats, getEmotion, getLog, getName, setName, getCyclePhaseToday,
    EMOTIONS, TRIGGERS, DEFAULT_STATE, KEYS,
  };

})();

Duck.load();
setInterval(() => Duck.tick(), 30 * 60 * 1000);
