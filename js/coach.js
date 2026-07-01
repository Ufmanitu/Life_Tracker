// ═══════════════════════════════════════════════════════════════════
// ── COACH — rule-based insights & weight-goal engine ────────────────
// A "set of prewritten code rules" (no ML) that observes real app state
// — Duck's mood, habits, tasks, calories/water, cycle phase — and
// surfaces relevant tips (js/coach_content.js's COACH_RULES), plus an
// optional weight-loss goal with a TDEE-based suggested plan. Loaded
// on every page (after duck.js/duck_poses.js), same architecture as
// Duck: a self-contained IIFE exposed as a global `Coach` object.
// ═══════════════════════════════════════════════════════════════════

const Coach = (() => {

  const BODY_GOAL_KEY = 'ht_body_goal_v1';
  const CAL_GOALS_KEY = 'ht_cal_goals_v1';

  const DEFAULT_BODY_GOAL = {
    active: false,
    sex: 'female',
    age: 30,
    heightCm: 165,
    activityLevel: 'moderate', // sedentary | light | moderate | active | veryActive
    startWeight: 70,
    targetWeight: 62,
    currentWeight: 70,
    unit: 'kg',
    startDate: null,
  };

  const ACTIVITY_MULTIPLIERS = {
    sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9,
  };

  function lbToKg(lb) { return lb * 0.453592; }
  function kgToLb(kg) { return kg / 0.453592; }

  // ── Body goal persistence ──────────────────────────────────────
  function getBodyGoal() {
    try {
      const raw = JSON.parse(localStorage.getItem(BODY_GOAL_KEY) || 'null');
      return raw ? { ...DEFAULT_BODY_GOAL, ...raw } : { ...DEFAULT_BODY_GOAL };
    } catch (e) { return { ...DEFAULT_BODY_GOAL }; }
  }
  function saveBodyGoal(goal) {
    try { localStorage.setItem(BODY_GOAL_KEY, JSON.stringify(goal)); } catch (e) {}
  }

  // ── TDEE (Mifflin-St Jeor) ──────────────────────────────────────
  function calcTDEE(goal) {
    const weightKg = goal.unit === 'lb' ? lbToKg(goal.currentWeight || goal.startWeight) : (goal.currentWeight || goal.startWeight);
    const bmr = goal.sex === 'male'
      ? 10 * weightKg + 6.25 * goal.heightCm - 5 * goal.age + 5
      : 10 * weightKg + 6.25 * goal.heightCm - 5 * goal.age - 161;
    const mult = ACTIVITY_MULTIPLIERS[goal.activityLevel] || ACTIVITY_MULTIPLIERS.moderate;
    return Math.round(bmr * mult);
  }

  function getWeightPlan() {
    const goal = getBodyGoal();
    if (!goal.active) return null;

    const tdee = calcTDEE(goal);
    const floor = goal.sex === 'male' ? 1500 : 1200;
    const deficit = 500; // ~0.5kg/week, a standard safe-deficit guideline
    const suggestedKcal = Math.max(floor, tdee - deficit);

    const startKg = goal.unit === 'lb' ? lbToKg(goal.startWeight) : goal.startWeight;
    const targetKg = goal.unit === 'lb' ? lbToKg(goal.targetWeight) : goal.targetWeight;
    const currentKg = goal.unit === 'lb' ? lbToKg(goal.currentWeight) : goal.currentWeight;
    const totalToLoseKg = Math.max(0, startKg - targetKg);
    const remainingKg = Math.max(0, currentKg - targetKg);
    const progressPct = totalToLoseKg > 0 ? Math.min(100, Math.round((startKg - currentKg) / totalToLoseKg * 100)) : 0;
    const weeksRemaining = remainingKg > 0 ? Math.ceil(remainingKg / 0.5) : 0;

    // Pick one routine (round-robin by how much weight is left, just to vary it)
    const routine = WEIGHT_ROUTINES[Math.min(WEIGHT_ROUTINES.length - 1, Math.floor(remainingKg / 5))] || WEIGHT_ROUTINES[0];

    // Recipe ideas: prewritten library, filtered to fit comfortably under a
    // typical meal-sized share of the suggested daily calories, plus any of
    // the user's own saved recipes that already fit.
    const perMealBudget = suggestedKcal / 3;
    const ideas = RECIPE_IDEAS.filter(r => r.kcal <= perMealBudget * 1.15).slice(0, 3);
    let ownRecipeMatches = [];
    try {
      const raw = JSON.parse(localStorage.getItem('lt_recipes') || 'null');
      if (raw && Array.isArray(raw.recipes)) {
        ownRecipeMatches = raw.recipes.filter(r => (r.kcal || 0) > 0 && r.kcal <= perMealBudget * 1.15).slice(0, 3);
      }
    } catch (e) {}

    return {
      tdee, suggestedKcal, deficit,
      totalToLoseKg: +totalToLoseKg.toFixed(1), remainingKg: +remainingKg.toFixed(1),
      progressPct, weeksRemaining, routine, ideas, ownRecipeMatches,
      unit: goal.unit,
    };
  }

  function applySuggestedCalorieGoal(kcal) {
    let calGoals = { kcal: 2000, protein: 150, carbs: 250, fat: 65, water: 8 };
    try {
      const g = JSON.parse(localStorage.getItem(CAL_GOALS_KEY) || 'null');
      if (g) calGoals = { ...calGoals, ...g };
    } catch (e) {}
    calGoals.kcal = Math.round(kcal);
    try { localStorage.setItem(CAL_GOALS_KEY, JSON.stringify(calGoals)); } catch (e) {}
  }

  // ── Context gathering (reuses core.js's global helpers where possible) ──
  function getContext() {
    const today = new Date();
    const y = today.getFullYear(), m = today.getMonth(), d = today.getDate();

    let habitsTotal = 0, habitsCheckedToday = 0, almostStreak = false;
    try {
      habitsTotal = (state.habits || []).length;
      const checkedMap = _getCheckedForMonth(y, m);
      state.habits.forEach((_, hi) => {
        if (checkedMap[`${hi}_${d}`]) habitsCheckedToday++;
        const streak = calcStreak(hi);
        if ([6, 13, 29, 59, 99, 364].includes(streak)) almostStreak = true; // 1 day from a milestone
      });
    } catch (e) {}

    let tasksOverdue = 0;
    try {
      const todayStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      tasksOverdue = (state.tasks || []).filter(t => !t.done && t.due && t.due < todayStr).length;
    } catch (e) {}

    let calProgress = { val: 0, goal: 2000 };
    let waterCur = 0, waterGoal = 8;
    try {
      calProgress = getCalorieProgressToday();
      const g = JSON.parse(localStorage.getItem(CAL_GOALS_KEY) || 'null');
      if (g && g.water) waterGoal = g.water;
      const raw = JSON.parse(localStorage.getItem(xCalMonthKey(today)) || 'null');
      const day = raw && raw.days && raw.days[xDateKey(today)];
      if (day) waterCur = day.water || 0;
    } catch (e) {}

    let duckStats = {}, duckEmotion = 'content', cyclePhase = null;
    try {
      duckStats = Duck.getStats();
      duckEmotion = Duck.getEmotion();
      cyclePhase = Duck.getCyclePhaseToday();
    } catch (e) {}

    return {
      duck: { stats: duckStats, emotion: duckEmotion, cyclePhase },
      habitsTotal, habitsCheckedToday, almostStreak,
      tasksOverdue,
      hour: today.getHours(),
      water: { cur: waterCur, goal: waterGoal },
      calories: { cur: calProgress.val, goal: calProgress.goal },
      bodyGoal: getBodyGoal(),
    };
  }

  function getInsights() {
    const ctx = getContext();
    return COACH_RULES
      .filter(rule => { try { return rule.condition(ctx); } catch (e) { return false; } })
      .map(rule => ({
        id: rule.id, category: rule.category, icon: rule.icon,
        text: rule.text(ctx),
        actionHref: rule.actionHref, actionLabel: rule.actionLabel, actionLabelKey: rule.actionLabelKey,
      }))
      .sort((a, b) => (COACH_RULES.find(r => r.id === b.id).priority) - (COACH_RULES.find(r => r.id === a.id).priority));
  }

  function getTopInsight() {
    const insights = getInsights();
    return insights.length ? insights[0] : null;
  }

  return {
    getContext, getInsights, getTopInsight,
    getBodyGoal, saveBodyGoal, calcTDEE, getWeightPlan, applySuggestedCalorieGoal,
    ACTIVITY_MULTIPLIERS, DEFAULT_BODY_GOAL,
  };

})();
