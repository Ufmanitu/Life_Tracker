// ═══════════════════════════════════════════════════════════════════
// ── COACH QUIZ — shared field builders for cycle + health setup ────
// Pure DOM-string builders/readers/savers, no modal chrome of their
// own. Used by both the onboarding modal (js/core.js) and the Duck
// page's skipped-setup reminder popup (js/duck_page.js), so the two
// don't duplicate the same form markup. Loaded on every page, right
// after coach.js.
// ═══════════════════════════════════════════════════════════════════

function buildCycleQuizHTML(values) {
  const v = values || {};
  const tr = TRANSLATIONS[state.lang] || TRANSLATIONS.en;
  const mode = v.mode || 'natural';
  return `
    <div class="cq-field-row">
      <button type="button" class="cq-toggle-btn ${mode==='natural'?'active':''}" data-cqmode="natural">🌸 ${tr.cycleNatural||'Natural Cycle'}</button>
      <button type="button" class="cq-toggle-btn ${mode==='pill'?'active':''}" data-cqmode="pill">💊 ${tr.cyclePill||'Birth Control Pill'}</button>
    </div>
    <div class="cq-field">
      <label class="form-label">${tr.cycleStartDateLabel||'Start Date of Last Period'}</label>
      <input type="date" class="form-input cq-input" id="cq-start" value="${v.start||''}" />
    </div>
    <div class="cq-field-row">
      <div class="cq-field">
        <label class="form-label">${tr.cyclePeriodDurLabel||'Period Duration (days)'}</label>
        <input type="number" class="form-input cq-input" id="cq-dur" min="1" max="14" value="${v.dur||5}" />
      </div>
      <div class="cq-field" id="cq-cyclelen-field" ${mode==='pill'?'style="display:none;"':''}>
        <label class="form-label">${tr.cycleLengthLabel||'Cycle Length (days)'}</label>
        <input type="number" class="form-input cq-input" id="cq-cyclelen" min="21" max="45" value="${v.cycleLen||28}" />
      </div>
    </div>`;
}

function wireCycleQuizToggle(container) {
  container.querySelectorAll('[data-cqmode]').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('[data-cqmode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cycleLenField = container.querySelector('#cq-cyclelen-field');
      if (cycleLenField) cycleLenField.style.display = btn.dataset.cqmode === 'pill' ? 'none' : '';
    });
  });
}

function readCycleQuizForm(container) {
  const modeBtn = container.querySelector('[data-cqmode].active');
  return {
    mode: modeBtn ? modeBtn.dataset.cqmode : 'natural',
    start: container.querySelector('#cq-start').value,
    dur: +container.querySelector('#cq-dur').value || 5,
    cycleLen: +container.querySelector('#cq-cyclelen')?.value || 28,
  };
}

// Mirrors the existing Local Assistant "cycle" wizard's action() in
// getWizards() (core.js) but without the auto-navigate-to-cycle.html,
// since this is reused from onboarding/the duck-page popup too.
function saveCycleQuizAnswers(answers) {
  if (!state.cycleData) state.cycleData = { periods:[], days:{}, cycleLen:28, mode:'natural', takenPills:{} };
  const mode = answers.mode || 'natural';
  const start = answers.start;
  const dur = parseInt(answers.dur) || 5;
  const cycleLen = mode === 'pill' ? 28 : (parseInt(answers.cycleLen) || 28);
  state.cycleData.mode = mode;
  state.cycleData.cycleLen = cycleLen;
  if (!state.cycleData.periods) state.cycleData.periods = [];
  if (start) {
    state.cycleData.periods = state.cycleData.periods.filter(p => p.start !== start && !p.predicted);
    state.cycleData.periods.push({ start, dur, predicted: false });
    state.cycleData.periods.sort((a, b) => new Date(a.start) - new Date(b.start));
  }
  try { localStorage.setItem('ht_cycle_v2', JSON.stringify(state.cycleData)); } catch (e) {}
}

function buildHealthGoalQuizHTML(values) {
  const v = { ...Coach.DEFAULT_BODY_GOAL, ...(values || {}) };
  const tr = TRANSLATIONS[state.lang] || TRANSLATIONS.en;
  return `
    <div class="cq-goal-grid">
      <div class="cq-field">
        <label class="form-label">${tr.coachSex||'Sex'}</label>
        <select class="form-select cq-input" id="cq-sex">
          <option value="female" ${v.sex==='female'?'selected':''}>${tr.coachSexFemale||'Female'}</option>
          <option value="male" ${v.sex==='male'?'selected':''}>${tr.coachSexMale||'Male'}</option>
        </select>
      </div>
      <div class="cq-field">
        <label class="form-label">${tr.coachAge||'Age'}</label>
        <input type="number" class="form-input cq-input" id="cq-age" min="14" max="100" value="${v.age}" />
      </div>
      <div class="cq-field">
        <label class="form-label">${tr.coachHeight||'Height (cm)'}</label>
        <input type="number" class="form-input cq-input" id="cq-height" min="120" max="230" value="${v.heightCm}" />
      </div>
      <div class="cq-field">
        <label class="form-label">${tr.coachActivity||'Activity Level'}</label>
        <select class="form-select cq-input" id="cq-activity">
          <option value="sedentary" ${v.activityLevel==='sedentary'?'selected':''}>${tr.coachActivitySedentary||'Sedentary'}</option>
          <option value="light" ${v.activityLevel==='light'?'selected':''}>${tr.coachActivityLight||'Light'}</option>
          <option value="moderate" ${v.activityLevel==='moderate'?'selected':''}>${tr.coachActivityModerate||'Moderate'}</option>
          <option value="active" ${v.activityLevel==='active'?'selected':''}>${tr.coachActivityActive||'Active'}</option>
          <option value="veryActive" ${v.activityLevel==='veryActive'?'selected':''}>${tr.coachActivityVeryActive||'Very Active'}</option>
        </select>
      </div>
      <div class="cq-field">
        <label class="form-label">${tr.coachUnit||'Unit'}</label>
        <select class="form-select cq-input" id="cq-unit">
          <option value="kg" ${v.unit==='kg'?'selected':''}>kg</option>
          <option value="lb" ${v.unit==='lb'?'selected':''}>lb</option>
        </select>
      </div>
      <div class="cq-field">
        <label class="form-label">${tr.coachStartWeight||'Start Weight'}</label>
        <input type="number" class="form-input cq-input" id="cq-start-weight" min="1" step="0.1" value="${v.startWeight}" />
      </div>
      <div class="cq-field">
        <label class="form-label">${tr.coachCurrentWeight||'Current Weight'}</label>
        <input type="number" class="form-input cq-input" id="cq-current-weight" min="1" step="0.1" value="${v.currentWeight}" />
      </div>
      <div class="cq-field">
        <label class="form-label">${tr.coachTargetWeight||'Target Weight'}</label>
        <input type="number" class="form-input cq-input" id="cq-target-weight" min="1" step="0.1" value="${v.targetWeight}" />
      </div>
    </div>`;
}

function readHealthGoalForm(container) {
  return {
    active: true,
    sex: container.querySelector('#cq-sex').value,
    age: +container.querySelector('#cq-age').value || 30,
    heightCm: +container.querySelector('#cq-height').value || 165,
    activityLevel: container.querySelector('#cq-activity').value,
    unit: container.querySelector('#cq-unit').value,
    startWeight: +container.querySelector('#cq-start-weight').value || 70,
    currentWeight: +container.querySelector('#cq-current-weight').value || 70,
    targetWeight: +container.querySelector('#cq-target-weight').value || 62,
    startDate: new Date().toISOString().slice(0, 10),
  };
}
