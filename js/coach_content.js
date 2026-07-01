// ═══════════════════════════════════════════════════════════════════
// ── COACH — prewritten content library ─────────────────────────────
// Pure data, no logic: tip templates the rule engine (js/coach.js)
// selects from, plus the static workout-routine and recipe-idea
// libraries used by the weight-goal suggested plan. Loaded on every
// page, right before coach.js.
// ═══════════════════════════════════════════════════════════════════

// Each rule: condition(ctx) -> bool, text(ctx) -> string. Higher priority
// wins when multiple rules match (used for picking the single "top" tip
// shown in the Home banner).
const COACH_RULES = [
  { id:'duckThirsty', category:'duck', priority:95, icon:'💧',
    condition: ctx => ctx.duck.emotion === 'thirsty',
    text: () => "Quackers is getting thirsty — go drink a glass of water, it's good for both of you!",
    actionHref:'calories.html', actionLabelKey:'coachActionLogWater', actionLabel:'Log water' },

  { id:'duckSickPeriod', category:'duck', priority:94, icon:'🩸',
    condition: ctx => ctx.duck.emotion === 'sick' && ctx.duck.cyclePhase === 'period',
    text: () => "It's that time of the month — be gentle with yourself today. Quackers is holding their tummy too.",
    actionHref:'cycle.html', actionLabelKey:'coachActionOpenCycle', actionLabel:'Open Cycle' },

  { id:'duckHungry', category:'duck', priority:90, icon:'🍗',
    condition: ctx => ctx.duck.emotion === 'hungry',
    text: () => "Quackers' tummy is rumbling — log a meal on the Calories page to feed them.",
    actionHref:'calories.html', actionLabelKey:'coachActionLogMeal', actionLabel:'Log a meal' },

  { id:'duckGrumpyPms', category:'duck', priority:80, icon:'😤',
    condition: ctx => ctx.duck.emotion === 'grumpy' && ctx.duck.cyclePhase === 'pms',
    text: () => "PMS mood swings today — Quackers is feeling a little grumpy too. Extra self-care might help both of you.",
    actionHref:null },

  { id:'duckSad', category:'duck', priority:75, icon:'🥺',
    condition: ctx => ctx.duck.emotion === 'sad',
    text: () => "Quackers seems a little down. Checking off a habit would cheer them right up!",
    actionHref:'tracker.html', actionLabelKey:'coachActionOpenHabits', actionLabel:'Open Habits' },

  { id:'duckTired', category:'duck', priority:60, icon:'😴',
    condition: ctx => ctx.duck.emotion === 'tired' || ctx.duck.emotion === 'sleeping',
    text: () => "Quackers is worn out. Maybe it's a good day to take it a little easier.",
    actionHref:null },

  { id:'cycleOvulation', category:'cycle', priority:55, icon:'✨',
    condition: ctx => ctx.duck.cyclePhase === 'ovulation',
    text: () => "Ovulation day — energy tends to peak right around now. Great day for a workout!",
    actionHref:'workout.html', actionLabelKey:'coachActionOpenWorkout', actionLabel:'Open Workout' },

  { id:'habitsAllDone', category:'habits', priority:70, icon:'🎉',
    condition: ctx => ctx.habitsTotal > 0 && ctx.habitsCheckedToday === ctx.habitsTotal,
    text: () => "Every habit checked off today — amazing work! Quackers is thrilled.",
    actionHref:null },

  { id:'habitsNoneToday', category:'habits', priority:65, icon:'📋',
    condition: ctx => ctx.habitsTotal > 0 && ctx.habitsCheckedToday === 0 && ctx.hour >= 12,
    text: () => "You haven't checked off any habits yet today — complete them all to make Quackers happier!",
    actionHref:'tracker.html', actionLabelKey:'coachActionOpenHabits', actionLabel:'Open Habits' },

  { id:'habitsAlmostStreak', category:'habits', priority:62, icon:'🔥',
    condition: ctx => ctx.almostStreak,
    text: () => "You're one day away from a streak milestone — don't break the chain now!",
    actionHref:'tracker.html', actionLabelKey:'coachActionOpenHabits', actionLabel:'Open Habits' },

  { id:'tasksOverdue', category:'tasks', priority:58, icon:'⏰',
    condition: ctx => ctx.tasksOverdue > 0,
    text: ctx => ctx.tasksOverdue === 1
      ? "You have 1 overdue task waiting — clearing it off your list will feel great."
      : `You have ${ctx.tasksOverdue} overdue tasks waiting — clearing them off your list will feel great.`,
    actionHref:'tasks.html', actionLabelKey:'coachActionOpenTasks', actionLabel:'Open Tasks' },

  { id:'waterBehind', category:'health', priority:50, icon:'🚰',
    condition: ctx => ctx.water.goal > 0 && ctx.hour >= 15 && ctx.water.cur < ctx.water.goal * 0.5,
    text: () => "You're behind on water today — try to catch up before the day is over.",
    actionHref:'calories.html', actionLabelKey:'coachActionLogWater', actionLabel:'Log water' },

  { id:'weightGoalActive', category:'goal', priority:40, icon:'🎯',
    condition: ctx => !!(ctx.bodyGoal && ctx.bodyGoal.active),
    text: () => "Your weight goal is active — check your Suggested Plan for today's calorie target, workout, and recipes.",
    actionHref:'coach.html', actionLabelKey:'coachActionOpenPlan', actionLabel:'See Plan' },
];

// ── Weight-loss workout routines (static, prewritten) ──────────────
const WEIGHT_ROUTINES = [
  {
    id:'beginnerFatLoss', title:'Beginner Fat-Loss Split',
    tagline:'3 days a week, full body, no equipment needed',
    days:[
      { day:'Day 1', focus:'Full Body', exercises:[
        { name:'Bodyweight squats', setsReps:'3 × 15' },
        { name:'Push-ups (knees ok)', setsReps:'3 × 10' },
        { name:'Glute bridges', setsReps:'3 × 15' },
        { name:'Plank', setsReps:'3 × 30s' },
      ]},
      { day:'Day 2', focus:'Cardio', exercises:[
        { name:'Brisk walk or jog', setsReps:'25–30 min' },
        { name:'Jumping jacks', setsReps:'3 × 30s' },
      ]},
      { day:'Day 3', focus:'Full Body', exercises:[
        { name:'Lunges', setsReps:'3 × 12 each leg' },
        { name:'Incline push-ups', setsReps:'3 × 10' },
        { name:'Superman hold', setsReps:'3 × 20s' },
        { name:'Mountain climbers', setsReps:'3 × 30s' },
      ]},
    ],
  },
  {
    id:'homeCardioStarter', title:'Home Cardio Starter',
    tagline:'4 days a week, low impact, great for beginners',
    days:[
      { day:'Day 1', focus:'Steady Cardio', exercises:[{ name:'Brisk walk', setsReps:'30 min' }]},
      { day:'Day 2', focus:'Intervals', exercises:[
        { name:'Fast walk / jog intervals', setsReps:'20 min (1 min fast / 2 min easy)' },
      ]},
      { day:'Day 3', focus:'Active Recovery', exercises:[{ name:'Easy walk + stretching', setsReps:'20 min' }]},
      { day:'Day 4', focus:'Steady Cardio', exercises:[{ name:'Brisk walk or cycle', setsReps:'35 min' }]},
    ],
  },
  {
    id:'strengthPlusWalk', title:'3-Day Strength + Daily Walk',
    tagline:'Strength training 3x a week, plus a daily walk',
    days:[
      { day:'Day 1', focus:'Upper Body', exercises:[
        { name:'Push-ups', setsReps:'3 × 10' },
        { name:'Dumbbell/water-bottle rows', setsReps:'3 × 12' },
        { name:'Shoulder taps', setsReps:'3 × 20' },
      ]},
      { day:'Day 2', focus:'Lower Body', exercises:[
        { name:'Squats', setsReps:'3 × 15' },
        { name:'Step-ups', setsReps:'3 × 12 each leg' },
        { name:'Calf raises', setsReps:'3 × 20' },
      ]},
      { day:'Day 3', focus:'Core + Cardio', exercises:[
        { name:'Plank', setsReps:'3 × 30s' },
        { name:'Bicycle crunches', setsReps:'3 × 20' },
        { name:'Brisk walk', setsReps:'20 min' },
      ]},
    ],
  },
];

// ── Recipe ideas (static, prewritten, tagged for a calorie deficit) ─
const RECIPE_IDEAS = [
  { name:'Greek Yogurt & Berry Bowl', kcal:220, protein:20, tag:'breakfast', blurb:'High-protein yogurt with mixed berries and a spoon of honey.' },
  { name:'Veggie Egg White Scramble', kcal:180, protein:22, tag:'breakfast', blurb:'Egg whites with spinach, tomato, and peppers.' },
  { name:'Grilled Chicken Salad', kcal:350, protein:35, tag:'lunch', blurb:'Grilled chicken breast over greens with a light vinaigrette.' },
  { name:'Lentil & Veggie Soup', kcal:280, protein:16, tag:'lunch', blurb:'Fiber-rich lentils simmered with carrots, celery, and tomato.' },
  { name:'Baked Salmon & Steamed Greens', kcal:400, protein:34, tag:'dinner', blurb:'Omega-3-rich salmon with broccoli or green beans.' },
  { name:'Turkey & Veggie Stir-Fry', kcal:380, protein:32, tag:'dinner', blurb:'Lean ground turkey stir-fried with mixed vegetables.' },
];
