// ═══════════════════════════════════════════════════════════════════
// ── DUCK COMPANION PAGE ─────────────────────────────────────────────
// only ever loaded on duck.html. Renders Duck's (js/duck.js) state:
// the SVG pose, stat bars, a friendly status message, and a recent
// activity log. Registers itself as DuckUI so Duck.trigger(...) calls
// made while this page is open (pet/treat) refresh the view live.
// ═══════════════════════════════════════════════════════════════════

const STAT_META = {
  health:    { icon:'❤️', labelKey:'duckStatHealth',    label:'Health',    color:'#e05a7a' },
  hunger:    { icon:'🍗', labelKey:'duckStatHunger',    label:'Hunger',    color:'#f5a623' },
  thirst:    { icon:'💧', labelKey:'duckStatThirst',    label:'Thirst',    color:'#4f9ef7' },
  energy:    { icon:'⚡', labelKey:'duckStatEnergy',    label:'Energy',    color:'#a78bfa' },
  mood:      { icon:'😊', labelKey:'duckStatMood',      label:'Mood',      color:'#3ecfb2' },
  happiness: { icon:'🌟', labelKey:'duckStatHappiness', label:'Happiness', color:'#ffca4f' },
};

const EVENT_LOG_META = {
  habitDone:       { icon:'✅', key:'duckLogHabitDone',      label:'Checked off a habit' },
  allHabitsDone:    { icon:'🎉', key:'duckLogAllHabits',      label:'Completed every habit today!' },
  taskDone:        { icon:'✔️', key:'duckLogTaskDone',       label:'Finished a task' },
  streakMilestone:  { icon:'🔥', key:'duckLogStreak',         label:'Hit a streak milestone' },
  goalCompleted:    { icon:'🏆', key:'duckLogGoal',           label:'Completed a goal' },
  foodLogged:       { icon:'🍽', key:'duckLogFood',           label:'Logged a meal' },
  waterLogged:      { icon:'💧', key:'duckLogWater',          label:'Logged some water' },
  calorieGoalMet:   { icon:'🎯', key:'duckLogCalorieGoal',    label:'Hit the daily calorie goal' },
  workoutStarted:   { icon:'🏋️', key:'duckLogWorkoutStart',   label:'Started a workout' },
  workoutDone:      { icon:'💪', key:'duckLogWorkoutDone',    label:'Finished a workout' },
  periodDay:        { icon:'🩸', key:'duckLogPeriod',         label:'On their period today' },
  pmsPhase:         { icon:'😤', key:'duckLogPms',            label:'Feeling PMS today' },
  ovulationDay:      { icon:'✨', key:'duckLogOvulation',      label:'Ovulation day — extra energy' },
  pillTaken:        { icon:'💊', key:'duckLogPillTaken',      label:'Took the pill' },
  pillMissed:       { icon:'⚠️', key:'duckLogPillMissed',      label:'Missed the pill' },
  pomodoroStart:    { icon:'⏱', key:'duckLogPomoStart',       label:'Started a focus session' },
  pomodoroFinish:   { icon:'✅', key:'duckLogPomoFinish',      label:'Finished a focus session' },
  savingsGoalMet:   { icon:'💰', key:'duckLogSavings',         label:'Hit a savings goal' },
  shoppingDone:     { icon:'🛒', key:'duckLogShopping',        label:'Checked off the shopping list' },
  pet:              { icon:'🤗', key:'duckLogPet',             label:'Got a pet' },
  treat:            { icon:'🍪', key:'duckLogTreat',           label:'Got a treat' },
  midnight:         { icon:'🌙', key:'duckLogMidnight',        label:'A new day begins' },
};

function duckTr() { return TRANSLATIONS[state.lang] || TRANSLATIONS.en; }

function duckStatusMessage(emotion, s) {
  const tr = duckTr();
  const cyclePhase = Duck.getState().cyclePhase;
  const MSG = {
    sick_period: tr.duckMsgPeriod || "Having a rough day — it's that time of the month. Sending extra love. 💕",
    sick:        tr.duckMsgSick || "Not feeling great today. Some healthy habits would help them bounce back.",
    grumpy:      cyclePhase === 'pms' ? (tr.duckMsgPms || "A little moody today (hello PMS) — be gentle with them.")
                                       : (tr.duckMsgGrumpy || "In a grumpy mood right now."),
    thirsty:     tr.duckMsgThirsty || "Getting thirsty! Log some water today to help them out. 💧",
    hungry:      tr.duckMsgHungry || "Getting hungry — log a meal to feed them. 🍽",
    sleeping:    tr.duckMsgSleeping || "Running very low on energy — maybe it's time to rest.",
    tired:       tr.duckMsgTired || "A little tired after all that hard work — but proud of you!",
    sad:         tr.duckMsgSad || "Feeling a little down. Check off a habit to cheer them up!",
    excited:     tr.duckMsgExcited || "Super excited today! Keep up the great momentum. 🎉",
    working:     tr.duckMsgWorking || "Staying focused during your Pomodoro session. 🎯",
    celebrating: tr.duckMsgCelebrating || "Celebrating your big win! 🎊",
    eating:      tr.duckMsgEating || "Enjoying a snack!",
    drinking:    tr.duckMsgDrinking || "Getting a refreshing drink!",
    happy:       tr.duckMsgHappy || "Having a great day, thanks to you!",
    content:     tr.duckMsgContent || "Feeling calm and content.",
  };
  if (emotion === 'sick' && cyclePhase === 'period') return MSG.sick_period;
  return MSG[emotion] || MSG.content;
}

function duckTimeAgo(iso) {
  const tr = duckTr();
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return tr.duckJustNow || 'just now';
  if (mins < 60) return `${mins}${tr.duckMinAgo || 'm ago'}`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}${tr.duckHourAgo || 'h ago'}`;
  const days = Math.floor(hrs / 24);
  return `${days}${tr.duckDayAgo || 'd ago'}`;
}

function renderDuckPage() {
  const tr = duckTr();
  const s = Duck.getState();
  const emotion = Duck.getEmotion();

  document.getElementById('duck-name-display').textContent = Duck.getName();

  const stage = document.getElementById('duck-stage');
  stage.innerHTML = getDuckPoseSVG(emotion);

  const emoLabel = (Duck.EMOTIONS[emotion] || {}).label || emotion;
  document.getElementById('duck-emotion-label').textContent = tr['duckEmotion_' + emotion] || emoLabel;

  document.getElementById('duck-status-msg').textContent = duckStatusMessage(emotion, s.stats);

  // Stat bars
  const statsList = document.getElementById('duck-stats-list');
  statsList.innerHTML = Object.keys(STAT_META).map(key => {
    const meta = STAT_META[key];
    const val = Math.round(s.stats[key]);
    const label = tr[meta.labelKey] || meta.label;
    return `
      <div class="duck-stat-row">
        <div class="duck-stat-label"><span class="duck-stat-icon">${meta.icon}</span>${label}</div>
        <div class="duck-stat-track"><div class="duck-stat-fill" style="width:${val}%;background:${meta.color};"></div></div>
        <div class="duck-stat-val">${val}%</div>
      </div>`;
  }).join('');

  // Event log
  const log = Duck.getLog();
  const logList = document.getElementById('duck-log-list');
  if (!log.length) {
    logList.innerHTML = `<div class="duck-log-empty">${tr.duckLogEmpty || 'Nothing yet — go check off a habit!'}</div>`;
  } else {
    logList.innerHTML = log.slice(0, 10).map(entry => {
      const meta = EVENT_LOG_META[entry.event];
      if (!meta) return '';
      const label = tr[meta.key] || meta.label;
      return `<div class="duck-log-row"><span class="duck-log-icon">${meta.icon}</span><span class="duck-log-text">${label}</span><span class="duck-log-time">${duckTimeAgo(entry.time)}</span></div>`;
    }).join('') || `<div class="duck-log-empty">${tr.duckLogEmpty || 'Nothing yet — go check off a habit!'}</div>`;
  }
}

// Registered so Duck.trigger()'s notifyUI() can refresh this page live
// (e.g. when a transient emotion like "eating" resolves back after its
// timeout while the user is sitting on this page).
const DuckUI = { render: renderDuckPage };

document.getElementById('duck-rename-btn').addEventListener('click', () => {
  const tr = duckTr();
  const next = prompt(tr.duckRenamePrompt || 'Name your duck:', Duck.getName());
  if (next && next.trim()) {
    Duck.setName(next);
    renderDuckPage();
  }
});

document.getElementById('duck-pet-btn').addEventListener('click', () => {
  Duck.trigger('pet');
});

document.getElementById('duck-treat-btn').addEventListener('click', () => {
  Duck.trigger('treat');
});

renderDuckPage();
