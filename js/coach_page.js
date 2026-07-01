// ═══════════════════════════════════════════════════════════════════
// ── COACH PAGE ──────────────────────────────────────────────────────
// only ever loaded on coach.html. Renders the tips feed, the weight
// goal form, and (if a goal is active) the TDEE-based suggested plan.
// ═══════════════════════════════════════════════════════════════════

function coachTr() { return TRANSLATIONS[state.lang] || TRANSLATIONS.en; }

function renderCoachTips() {
  const tr = coachTr();
  const list = document.getElementById('coach-tips-list');
  const insights = Coach.getInsights();
  if (!insights.length) {
    list.innerHTML = `<div class="coach-tips-empty">${tr.coachTipsEmpty || "Nothing urgent right now — you're doing great!"}</div>`;
    return;
  }
  list.innerHTML = insights.map(tip => {
    const actionLabel = tip.actionLabelKey ? (tr[tip.actionLabelKey] || tip.actionLabel) : tip.actionLabel;
    const action = tip.actionHref ? `<a class="coach-tip-action" href="${tip.actionHref}">${actionLabel || 'Open'}</a>` : '';
    return `<div class="coach-tip-row"><span class="coach-tip-icon">${tip.icon}</span><span class="coach-tip-text">${esc(tip.text)}</span>${action}</div>`;
  }).join('');
}

function fillGoalForm(goal) {
  document.getElementById('coach-goal-sex').value = goal.sex;
  document.getElementById('coach-goal-age').value = goal.age;
  document.getElementById('coach-goal-height').value = goal.heightCm;
  document.getElementById('coach-goal-activity').value = goal.activityLevel;
  document.getElementById('coach-goal-unit').value = goal.unit;
  document.getElementById('coach-goal-start').value = goal.startWeight;
  document.getElementById('coach-goal-current').value = goal.currentWeight;
  document.getElementById('coach-goal-target').value = goal.targetWeight;
}

function readGoalForm() {
  return {
    active: true,
    sex: document.getElementById('coach-goal-sex').value,
    age: +document.getElementById('coach-goal-age').value || 30,
    heightCm: +document.getElementById('coach-goal-height').value || 165,
    activityLevel: document.getElementById('coach-goal-activity').value,
    unit: document.getElementById('coach-goal-unit').value,
    startWeight: +document.getElementById('coach-goal-start').value || 70,
    currentWeight: +document.getElementById('coach-goal-current').value || 70,
    targetWeight: +document.getElementById('coach-goal-target').value || 62,
    startDate: Coach.getBodyGoal().startDate || new Date().toISOString().slice(0, 10),
  };
}

function renderCoachGoalProgress(goal) {
  const wrap = document.getElementById('coach-progress-wrap');
  if (!goal.active) { wrap.classList.add('hidden'); return; }
  wrap.classList.remove('hidden');
  const plan = Coach.getWeightPlan();
  wrap.querySelector('#coach-progress-pct').textContent = (plan ? plan.progressPct : 0) + '%';
  document.getElementById('coach-progress-fill').style.width = (plan ? plan.progressPct : 0) + '%';
}

function renderCoachPlan() {
  const tr = coachTr();
  const plan = Coach.getWeightPlan();
  const card = document.getElementById('coach-plan-card');
  if (!plan) { card.classList.add('hidden'); return; }
  card.classList.remove('hidden');

  document.getElementById('coach-plan-kcal').textContent = plan.suggestedKcal + ' kcal';
  document.getElementById('coach-plan-tdee').textContent = plan.tdee + ' kcal';
  document.getElementById('coach-plan-remaining').textContent = plan.remainingKg + ' ' + plan.unit;
  document.getElementById('coach-plan-weeks').textContent = plan.weeksRemaining > 0 ? plan.weeksRemaining : (tr.coachGoalReached || 'Reached!');

  document.getElementById('coach-routine-title').textContent = plan.routine.title;
  document.getElementById('coach-routine-tagline').textContent = plan.routine.tagline;
  document.getElementById('coach-routine-days').innerHTML = plan.routine.days.map(d => `
    <div class="coach-routine-day-card">
      <div class="coach-routine-day-title">${esc(d.day)} — ${esc(d.focus)}</div>
      ${d.exercises.map(ex => `<div class="coach-routine-ex-row"><span>${esc(ex.name)}</span><span>${esc(ex.setsReps)}</span></div>`).join('')}
    </div>`).join('');

  const allIdeas = [...plan.ownRecipeMatches.map(r => ({ name: r.name, kcal: r.kcal, protein: r.protein, tag: r.tag, blurb: tr.coachYourRecipe || 'One of your own saved recipes', own: true })), ...plan.ideas];
  document.getElementById('coach-recipe-grid').innerHTML = allIdeas.length
    ? allIdeas.map(r => `
      <div class="coach-recipe-card">
        <div class="coach-recipe-name">${r.own ? '⭐ ' : ''}${esc(r.name)}</div>
        <div class="coach-recipe-macro">${r.kcal} kcal · ${r.protein||0}g protein</div>
        <div class="coach-recipe-blurb">${esc(r.blurb||'')}</div>
      </div>`).join('')
    : `<div class="coach-tips-empty">${tr.coachNoRecipes || 'No matching recipe ideas right now.'}</div>`;

  document.getElementById('coach-apply-cal-btn').dataset.kcal = plan.suggestedKcal;
}

function renderCoachPage() {
  renderCoachTips();
  const goal = Coach.getBodyGoal();
  fillGoalForm(goal);
  renderCoachGoalProgress(goal);
  renderCoachPlan();
}

document.getElementById('coach-goal-save-btn').addEventListener('click', () => {
  Coach.saveBodyGoal(readGoalForm());
  renderCoachPage();
});

document.getElementById('coach-goal-clear-btn').addEventListener('click', () => {
  Coach.saveBodyGoal({ ...Coach.DEFAULT_BODY_GOAL, active: false });
  renderCoachPage();
});

document.getElementById('coach-apply-cal-btn').addEventListener('click', (e) => {
  const kcal = +e.target.dataset.kcal;
  if (kcal) {
    Coach.applySuggestedCalorieGoal(kcal);
    const ind = document.getElementById('save-indicator');
    ind.classList.add('show');
    setTimeout(() => ind.classList.remove('show'), 1700);
  }
});

renderCoachPage();
