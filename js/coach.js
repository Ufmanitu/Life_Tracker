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
    const startKg = goal.unit === 'lb' ? lbToKg(goal.startWeight) : goal.startWeight;
    const targetKg = goal.unit === 'lb' ? lbToKg(goal.targetWeight) : goal.targetWeight;
    const currentKg = goal.unit === 'lb' ? lbToKg(goal.currentWeight) : goal.currentWeight;

    // Direction matters: a target ABOVE the start weight is a gain goal
    // (calorie surplus, strength routines, calorie-dense recipes), not a
    // loss goal — treating every goal as "lose weight" was the bug.
    const direction = targetKg > startKg + 0.05 ? 'gain' : targetKg < startKg - 0.05 ? 'lose' : 'maintain';

    let suggestedKcal, remainingKg, totalDistanceKg, weeksRemaining, ratePerWeek;
    if (direction === 'gain') {
      suggestedKcal = Math.round(tdee + 350); // lean-bulk surplus
      totalDistanceKg = Math.max(0, targetKg - startKg);
      remainingKg = Math.max(0, targetKg - currentKg);
      ratePerWeek = 0.25; // slower than loss — minimizes excess fat gain
    } else if (direction === 'lose') {
      const floor = goal.sex === 'male' ? 1500 : 1200;
      suggestedKcal = Math.max(floor, Math.round(tdee - 500)); // standard safe deficit
      totalDistanceKg = Math.max(0, startKg - targetKg);
      remainingKg = Math.max(0, currentKg - targetKg);
      ratePerWeek = 0.5;
    } else {
      suggestedKcal = tdee;
      totalDistanceKg = 0; remainingKg = 0; ratePerWeek = 0.5;
    }
    const progressPct = totalDistanceKg > 0
      ? Math.min(100, Math.max(0, Math.round(Math.abs(currentKg - startKg) / totalDistanceKg * 100)))
      : (direction === 'maintain' ? 100 : 0);
    weeksRemaining = remainingKg > 0 ? Math.ceil(remainingKg / ratePerWeek) : 0;

    const routinePool = direction === 'gain' ? GAIN_ROUTINES : LOSE_ROUTINES;
    const recipePool = direction === 'gain' ? GAIN_RECIPE_IDEAS : LOSE_RECIPE_IDEAS;

    // Pick one routine (round-robin by how much distance is left, just to vary it)
    const routine = routinePool[Math.min(routinePool.length - 1, Math.floor(remainingKg / 5))] || routinePool[0];

    // Recipe ideas: prewritten library, ranked by closeness to a typical
    // meal-sized share of the suggested daily calories (a hard pass/fail
    // filter could exclude every recipe in extreme cases — e.g. a very
    // active bulking goal with a very high TDEE — so this always returns
    // results, just prioritizing the closest fits), plus any of the
    // user's own saved recipes that are at least in the right direction.
    const perMealBudget = suggestedKcal / 3;
    const byCloseness = (a, b) => Math.abs(a.kcal - perMealBudget) - Math.abs(b.kcal - perMealBudget);
    const ideas = [...recipePool].sort(byCloseness).slice(0, 3);
    let ownRecipeMatches = [];
    try {
      const raw = JSON.parse(localStorage.getItem('lt_recipes') || 'null');
      if (raw && Array.isArray(raw.recipes)) {
        const inDirection = r => (r.kcal || 0) > 0 && (direction === 'gain' ? r.kcal >= perMealBudget * 0.5 : true);
        ownRecipeMatches = raw.recipes.filter(inDirection).sort(byCloseness).slice(0, 3);
      }
    } catch (e) {}

    return {
      direction, tdee, suggestedKcal,
      totalDistanceKg: +totalDistanceKg.toFixed(1), remainingKg: +remainingKg.toFixed(1),
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

  // ── Push a suggested routine into the Workout page as templates ────
  // workout.js's wktTemplates/lt_workout_templates live inside its own
  // if(CURRENT_PAGE==='workout') closure, not globally exposed (same
  // situation as calGoals) — so this writes localStorage directly,
  // matching applySuggestedCalorieGoal(). One template per routine day.
  function addRoutineToWorkoutPage(routine) {
    let templates = [];
    try { templates = JSON.parse(localStorage.getItem('lt_workout_templates') || 'null') || []; } catch (e) {}
    routine.days.forEach(day => {
      templates.push({
        name: `${routine.title} — ${day.day} (${day.focus})`,
        exercises: day.exercises.map(ex => ({
          id: 0, name: ex.name, cat: ex.cat || 'strength', type: ex.type || 'sets',
          sets: ex.sets || 0, reps: ex.reps || 0, weight: 0,
          duration: ex.duration || 0, distance: 0, notes: ex.notes || '',
        })),
      });
    });
    try { localStorage.setItem('lt_workout_templates', JSON.stringify(templates)); } catch (e) {}
  }

  // ── Push suggested recipe ideas into the Recipe Book ────────────────
  // Same localStorage-direct pattern — recipes.js's recRecipes/recIdCtr
  // are scoped inside if(CURRENT_PAGE==='recipes').
  function addRecipesToRecipesPage(ideas) {
    let recipes = [], ctr = 1;
    try {
      const raw = JSON.parse(localStorage.getItem('lt_recipes') || 'null');
      if (raw) { recipes = raw.recipes || []; ctr = raw.ctr || 1; }
    } catch (e) {}
    ideas.forEach(idea => {
      recipes.push({
        id: ctr++, name: idea.name, tag: idea.tag || 'lunch',
        servings: idea.servings || 1, kcal: idea.kcal || 0,
        protein: idea.protein || 0, carbs: idea.carbs || 0, fat: idea.fat || 0,
        notes: idea.blurb || '', ingredients: idea.ingredients || [],
      });
    });
    try { localStorage.setItem('lt_recipes', JSON.stringify({ recipes, ctr })); } catch (e) {}
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
    addRoutineToWorkoutPage, addRecipesToRecipesPage,
    ACTIVITY_MULTIPLIERS, DEFAULT_BODY_GOAL,
  };

})();
