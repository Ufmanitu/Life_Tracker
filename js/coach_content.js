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

// ── Workout routines (static, prewritten) ──────────────────────────
// Each exercise carries BOTH a human-readable `setsReps` display string
// AND structured fields (cat/type/sets/reps/duration) matching
// workout.js's real exercise shape, so a routine can be pushed directly
// into a workout-page template (js/coach.js addRoutineToWorkoutPage())
// without any fragile text parsing.
const LOSE_ROUTINES = [
  {
    id:'beginnerFatLoss', title:'Beginner Fat-Loss Split',
    tagline:'3 days a week, full body, no equipment needed',
    days:[
      { day:'Day 1', focus:'Full Body', exercises:[
        { name:'Bodyweight squats', setsReps:'3 × 15', cat:'strength', type:'sets', sets:3, reps:15 },
        { name:'Push-ups (knees ok)', setsReps:'3 × 10', cat:'strength', type:'sets', sets:3, reps:10 },
        { name:'Glute bridges', setsReps:'3 × 15', cat:'strength', type:'sets', sets:3, reps:15 },
        { name:'Plank', setsReps:'3 × 30s', cat:'strength', type:'sets', sets:3, reps:30 },
      ]},
      { day:'Day 2', focus:'Cardio', exercises:[
        { name:'Brisk walk or jog', setsReps:'27 min', cat:'cardio', type:'duration', duration:27 },
        { name:'Jumping jacks', setsReps:'3 × 30s', cat:'cardio', type:'sets', sets:3, reps:30 },
      ]},
      { day:'Day 3', focus:'Full Body', exercises:[
        { name:'Lunges', setsReps:'3 × 12 each leg', cat:'strength', type:'sets', sets:3, reps:12 },
        { name:'Incline push-ups', setsReps:'3 × 10', cat:'strength', type:'sets', sets:3, reps:10 },
        { name:'Superman hold', setsReps:'3 × 20s', cat:'strength', type:'sets', sets:3, reps:20 },
        { name:'Mountain climbers', setsReps:'3 × 30s', cat:'cardio', type:'sets', sets:3, reps:30 },
      ]},
    ],
  },
  {
    id:'homeCardioStarter', title:'Home Cardio Starter',
    tagline:'4 days a week, low impact, great for beginners',
    days:[
      { day:'Day 1', focus:'Steady Cardio', exercises:[{ name:'Brisk walk', setsReps:'30 min', cat:'cardio', type:'duration', duration:30 }]},
      { day:'Day 2', focus:'Intervals', exercises:[
        { name:'Fast walk / jog intervals', setsReps:'20 min', cat:'cardio', type:'duration', duration:20, notes:'1 min fast / 2 min easy' },
      ]},
      { day:'Day 3', focus:'Active Recovery', exercises:[{ name:'Easy walk + stretching', setsReps:'20 min', cat:'flexibility', type:'duration', duration:20 }]},
      { day:'Day 4', focus:'Steady Cardio', exercises:[{ name:'Brisk walk or cycle', setsReps:'35 min', cat:'cardio', type:'duration', duration:35 }]},
    ],
  },
  {
    id:'strengthPlusWalk', title:'3-Day Strength + Daily Walk',
    tagline:'Strength training 3x a week, plus a daily walk',
    days:[
      { day:'Day 1', focus:'Upper Body', exercises:[
        { name:'Push-ups', setsReps:'3 × 10', cat:'strength', type:'sets', sets:3, reps:10 },
        { name:'Dumbbell/water-bottle rows', setsReps:'3 × 12', cat:'strength', type:'sets', sets:3, reps:12 },
        { name:'Shoulder taps', setsReps:'3 × 20', cat:'strength', type:'sets', sets:3, reps:20 },
      ]},
      { day:'Day 2', focus:'Lower Body', exercises:[
        { name:'Squats', setsReps:'3 × 15', cat:'strength', type:'sets', sets:3, reps:15 },
        { name:'Step-ups', setsReps:'3 × 12 each leg', cat:'strength', type:'sets', sets:3, reps:12 },
        { name:'Calf raises', setsReps:'3 × 20', cat:'strength', type:'sets', sets:3, reps:20 },
      ]},
      { day:'Day 3', focus:'Core + Cardio', exercises:[
        { name:'Plank', setsReps:'3 × 30s', cat:'strength', type:'sets', sets:3, reps:30 },
        { name:'Bicycle crunches', setsReps:'3 × 20', cat:'strength', type:'sets', sets:3, reps:20 },
        { name:'Brisk walk', setsReps:'20 min', cat:'cardio', type:'duration', duration:20 },
      ]},
    ],
  },
];

const GAIN_ROUTINES = [
  {
    id:'beginnerStrengthBuilder', title:'Beginner Strength Builder',
    tagline:'3 days a week, progressive overload, builds the base for muscle gain',
    days:[
      { day:'Day 1', focus:'Push', exercises:[
        { name:'Push-ups (add weight/incline as it gets easy)', setsReps:'4 × 10', cat:'strength', type:'sets', sets:4, reps:10 },
        { name:'Shoulder press (dumbbells or bottles)', setsReps:'3 × 10', cat:'strength', type:'sets', sets:3, reps:10 },
        { name:'Triceps dips', setsReps:'3 × 12', cat:'strength', type:'sets', sets:3, reps:12 },
      ]},
      { day:'Day 2', focus:'Pull', exercises:[
        { name:'Rows (dumbbells or bands)', setsReps:'4 × 10', cat:'strength', type:'sets', sets:4, reps:10 },
        { name:'Pull-ups or lat pulldown', setsReps:'3 × 8', cat:'strength', type:'sets', sets:3, reps:8 },
        { name:'Bicep curls', setsReps:'3 × 12', cat:'strength', type:'sets', sets:3, reps:12 },
      ]},
      { day:'Day 3', focus:'Legs', exercises:[
        { name:'Squats (add weight as it gets easy)', setsReps:'4 × 10', cat:'strength', type:'sets', sets:4, reps:10 },
        { name:'Romanian deadlifts', setsReps:'3 × 10', cat:'strength', type:'sets', sets:3, reps:10 },
        { name:'Walking lunges', setsReps:'3 × 12 each leg', cat:'strength', type:'sets', sets:3, reps:12 },
      ]},
    ],
  },
  {
    id:'pushPullLegsStarter', title:'Push/Pull/Legs Starter',
    tagline:'6 days a week, classic split for steady muscle gain',
    days:[
      { day:'Day 1', focus:'Push', exercises:[
        { name:'Bench press or push-ups', setsReps:'4 × 8', cat:'strength', type:'sets', sets:4, reps:8 },
        { name:'Overhead press', setsReps:'3 × 10', cat:'strength', type:'sets', sets:3, reps:10 },
      ]},
      { day:'Day 2', focus:'Pull', exercises:[
        { name:'Rows', setsReps:'4 × 8', cat:'strength', type:'sets', sets:4, reps:8 },
        { name:'Pull-ups', setsReps:'3 × 8', cat:'strength', type:'sets', sets:3, reps:8 },
      ]},
      { day:'Day 3', focus:'Legs', exercises:[
        { name:'Squats', setsReps:'4 × 8', cat:'strength', type:'sets', sets:4, reps:8 },
        { name:'Lunges', setsReps:'3 × 12 each leg', cat:'strength', type:'sets', sets:3, reps:12 },
      ]},
    ],
  },
  {
    id:'fullBodyMassGain', title:'Full-Body Mass Gain',
    tagline:'3 days a week, compound lifts, efficient for building size',
    days:[
      { day:'Day 1', focus:'Full Body A', exercises:[
        { name:'Squats', setsReps:'4 × 8', cat:'strength', type:'sets', sets:4, reps:8 },
        { name:'Bench press or push-ups', setsReps:'4 × 8', cat:'strength', type:'sets', sets:4, reps:8 },
        { name:'Rows', setsReps:'4 × 8', cat:'strength', type:'sets', sets:4, reps:8 },
      ]},
      { day:'Day 2', focus:'Full Body B', exercises:[
        { name:'Deadlifts (light, focus on form)', setsReps:'3 × 8', cat:'strength', type:'sets', sets:3, reps:8 },
        { name:'Overhead press', setsReps:'3 × 10', cat:'strength', type:'sets', sets:3, reps:10 },
        { name:'Pull-ups or lat pulldown', setsReps:'3 × 8', cat:'strength', type:'sets', sets:3, reps:8 },
      ]},
      { day:'Day 3', focus:'Full Body C', exercises:[
        { name:'Lunges', setsReps:'3 × 12 each leg', cat:'strength', type:'sets', sets:3, reps:12 },
        { name:'Incline push-ups', setsReps:'3 × 12', cat:'strength', type:'sets', sets:3, reps:12 },
        { name:'Bent-over rows', setsReps:'3 × 12', cat:'strength', type:'sets', sets:3, reps:12 },
      ]},
    ],
  },
];

// ── Recipe ideas (static, prewritten) ───────────────────────────────
// Full macro/ingredient fields matching recipes.js's own recipe shape,
// so an idea can be pushed directly into the Recipe Book
// (js/coach.js addRecipesToRecipesPage()).
const LOSE_RECIPE_IDEAS = [
  { name:'Greek Yogurt & Berry Bowl', kcal:220, protein:20, carbs:24, fat:5, servings:1, tag:'breakfast', blurb:'High-protein yogurt with mixed berries and a spoon of honey.',
    ingredients:[{name:'Greek yogurt',qty:1,unit:'cup'},{name:'Mixed berries',qty:0.5,unit:'cup'},{name:'Honey',qty:1,unit:'tsp'}] },
  { name:'Veggie Egg White Scramble', kcal:180, protein:22, carbs:6, fat:6, servings:1, tag:'breakfast', blurb:'Egg whites with spinach, tomato, and peppers.',
    ingredients:[{name:'Egg whites',qty:4,unit:''},{name:'Spinach',qty:1,unit:'cup'},{name:'Tomato',qty:0.5,unit:''},{name:'Bell pepper',qty:0.5,unit:''}] },
  { name:'Grilled Chicken Salad', kcal:350, protein:35, carbs:14, fat:16, servings:1, tag:'lunch', blurb:'Grilled chicken breast over greens with a light vinaigrette.',
    ingredients:[{name:'Chicken breast',qty:150,unit:'g'},{name:'Mixed greens',qty:2,unit:'cup'},{name:'Olive oil vinaigrette',qty:1,unit:'tbsp'}] },
  { name:'Lentil & Veggie Soup', kcal:280, protein:16, carbs:42, fat:5, servings:1, tag:'lunch', blurb:'Fiber-rich lentils simmered with carrots, celery, and tomato.',
    ingredients:[{name:'Lentils',qty:0.75,unit:'cup'},{name:'Carrot',qty:1,unit:''},{name:'Celery',qty:1,unit:'stalk'},{name:'Diced tomato',qty:0.5,unit:'cup'}] },
  { name:'Baked Salmon & Steamed Greens', kcal:400, protein:34, carbs:8, fat:24, servings:1, tag:'dinner', blurb:'Omega-3-rich salmon with broccoli or green beans.',
    ingredients:[{name:'Salmon fillet',qty:150,unit:'g'},{name:'Broccoli',qty:1.5,unit:'cup'}] },
  { name:'Turkey & Veggie Stir-Fry', kcal:380, protein:32, carbs:22, fat:16, servings:1, tag:'dinner', blurb:'Lean ground turkey stir-fried with mixed vegetables.',
    ingredients:[{name:'Ground turkey',qty:150,unit:'g'},{name:'Mixed stir-fry vegetables',qty:2,unit:'cup'},{name:'Soy sauce',qty:1,unit:'tbsp'}] },
];

const GAIN_RECIPE_IDEAS = [
  { name:'Peanut Butter Banana Smoothie', kcal:520, protein:28, carbs:62, fat:18, servings:1, tag:'breakfast', blurb:'Calorie-dense smoothie for an easy way to hit a surplus.',
    ingredients:[{name:'Banana',qty:1,unit:''},{name:'Peanut butter',qty:2,unit:'tbsp'},{name:'Milk',qty:1.5,unit:'cup'},{name:'Protein powder',qty:1,unit:'scoop'}] },
  { name:'Oats with Nut Butter & Honey', kcal:480, protein:18, carbs:64, fat:16, servings:1, tag:'breakfast', blurb:'Slow-digesting carbs plus healthy fats to fuel the day.',
    ingredients:[{name:'Rolled oats',qty:1,unit:'cup'},{name:'Almond butter',qty:2,unit:'tbsp'},{name:'Honey',qty:1,unit:'tbsp'},{name:'Milk',qty:1,unit:'cup'}] },
  { name:'Chicken, Rice & Avocado Bowl', kcal:650, protein:42, carbs:70, fat:20, servings:1, tag:'lunch', blurb:'Balanced protein/carbs/fat bowl built for a lean bulk.',
    ingredients:[{name:'Chicken breast',qty:200,unit:'g'},{name:'Cooked rice',qty:1.5,unit:'cup'},{name:'Avocado',qty:0.5,unit:''}] },
  { name:'Beef & Sweet Potato Skillet', kcal:600, protein:38, carbs:52, fat:22, servings:1, tag:'lunch', blurb:'Iron-rich beef with calorie-dense sweet potato.',
    ingredients:[{name:'Lean ground beef',qty:150,unit:'g'},{name:'Sweet potato',qty:1,unit:''},{name:'Olive oil',qty:1,unit:'tbsp'}] },
  { name:'Salmon, Quinoa & Veg', kcal:620, protein:36, carbs:48, fat:26, servings:1, tag:'dinner', blurb:'Omega-3s plus complex carbs for recovery and growth.',
    ingredients:[{name:'Salmon fillet',qty:180,unit:'g'},{name:'Cooked quinoa',qty:1,unit:'cup'},{name:'Mixed vegetables',qty:1,unit:'cup'}] },
  { name:'Pasta with Ground Turkey & Cheese', kcal:680, protein:40, carbs:74, fat:22, servings:1, tag:'dinner', blurb:'A filling, calorie-dense classic for consistent surplus days.',
    ingredients:[{name:'Pasta',qty:100,unit:'g'},{name:'Ground turkey',qty:150,unit:'g'},{name:'Marinara sauce',qty:0.5,unit:'cup'},{name:'Parmesan',qty:2,unit:'tbsp'}] },
];
