// ─── MULTI-PAGE SETUP ────────────────────────────────────────────────────────
const CURRENT_PAGE = document.body.dataset.page || 'tracker';

// ─── USER PREFERENCES ────────────────────────────────────────────────────────
const PREFS_KEY = 'ht_user_prefs_v1';
let userPrefs = { gender: null, setupDone: false };

function loadUserPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem(PREFS_KEY) || 'null');
    if (p) userPrefs = { ...userPrefs, ...p };
  } catch(e) {}
}

function saveUserPrefs() {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(userPrefs)); } catch(e) {}
}

function isCycleUser() {
  // Show cycle tab if gender is female, or not yet set (default show)
  return !userPrefs.gender || userPrefs.gender === 'female';
}

function applyCycleTabVisibility() {
  const show = isCycleUser();
  document.querySelectorAll('[data-tab="cycle"]').forEach(btn => {
    btn.style.display = show ? '' : 'none';
  });
  // Also hide/show sidebar cycle item
  const sbCycle = document.getElementById('sb-cycle-item');
  if(sbCycle) sbCycle.style.display = show ? '' : 'none';
  // If currently on cycle page but cycle is hidden, redirect to tracker
  if (!show && CURRENT_PAGE === 'cycle') {
    window.location.href = 'tracker.html';
  }
}

// ─── SAFE EVENT HELPER ───────────────────────────────────────────────────────
function on(id, ev, fn) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (el) el.addEventListener(ev, fn);
}

// ─── NAV STATE PERSISTENCE ───────────────────────────────────────────────────
const NAV_KEY = 'ht_nav_v1';
function saveNav() {
  try { localStorage.setItem(NAV_KEY, JSON.stringify({year:state.year,month:state.month})); } catch(e) {}
}
function loadNav() {
  try {
    const n = JSON.parse(localStorage.getItem(NAV_KEY)||'null');
    if (n && typeof n.year==='number') { state.year=n.year; state.month=n.month; }
  } catch(e) {}
}

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],
    monthShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    days:["Mo","Tu","We","Th","Fr","Sa","Su"],
    subtitle:"— Life Tracker —",
    tabTracker:"📊 Habit Tracker", tabDays:"Days", tabTasks:"✅ Tasks", tabAnalysis:"📈 Analysis",
    habitsSubtabHabits:"💪 Habit Tracker", habitsSubtabAnalysis:"📈 Analysis",
    scopeDaily:"☀️ Daily", scopeWeekly:"📅 Weekly", scopeMonthly:"🗓 Monthly", scopeYearly:"📆 Yearly",
    pomoSessionsLabel:"Sessions", pomoFocusLabel:"Focus Time", pomoBreaksLabel:"Breaks",
    pomoHint:"Press Space to start · Esc to close",
    pomodoroBtn:"⏱ Pomodoro",
    statHabits:"Habits", statCompleted:"Completed", statProgress:"Progress", statTasksDone:"Tasks Done",
    myHabits:"My Habits",
    addHabitPlaceholder:"Add a new habit…", addHabitBtn:"+ Add",
    thisDay:"This day", todayBadge:"Today",
    mindsetTitle:"Mindset Check-In", energy:"Energy", focus:"Focus", mood:"Mood", motivation:"Motivation",
    tasksThisWeek:"📋 Tasks This Week",
    filterAll:"All", filterHigh:"🔴 High", filterMedium:"⚡ Medium", filterLow:"🔵 Low",
    taskNameLabel:"Task Name", taskNamePlaceholder:"What needs to be done?",
    priorityLabel:"Priority", dueDateLabel:"Due Date", statusLabel:"Status", addTaskBtn:"+ Add Task",
    priorityHigh:"🔴 High Priority", priorityMedium:"⚡ Medium Priority", priorityLow:"🔵 Low Priority",
    statusInProgress:"In Progress", statusNotStarted:"Not Started", statusCompleted:"Completed",
    noTasks:"No tasks. Add one below!",
    dailyConsistency:"Daily Consistency",
    mindsetTrackerTitle:"Mindset Tracker — Energy · Focus · Motivation",
    habitBreakdown:"Habit Breakdown",
    goalsThisMonth:"Goals This Month 🎯", goalPlaceholder:"Add a goal for this month…", addGoalBtn:"+ Add Goal",
    weeklyScore:"Weekly Score", overallProgress:"Overall Progress",
    crossStatsTitle:"🔗 Cross-Tracker Stats", calGoalToday:"Calorie Goal Today", workoutStreak:"🔥 Workout Streak", daysUnit:"days",
    weekPrefix:"Week", weekShort:"Wk",
    session:"Session", focusTime:"Focus Time",
    pomodoroMode:"Pomodoro", shortBreak:"Short Break", longBreak:"Long Break",
    startBtn:"▶ Start", pauseBtn:"⏸ Pause", resetBtn:"↺ Reset",
    saved:"✓ Saved",
    completedStat:"completed", habitsStat:"habits", daysStat:"days",
    dueToday:"Today", dueTomorrow:"Tomorrow",
    dueOverdue:(n)=>`${n}d overdue`, dueFuture:(n)=>`In ${n} days`,
    langLabel:"EN 🇬🇧",
    tabTimetable:"🗓 Timetable", tabShopping:"🛒 Shop", tabCycle:"🌸 Cycle", tabFinance:"💰 Finance", tabRecipes:"📖 Recipes",
    shopTitle:"🛒 Shopping List", shopGrocery:"🥦 Grocery", shopHousehold:"🏠 Household",
    shopPersonal:"💄 Personal", shopOther:"📦 Other",
    shopItemName:"Item Name", shopItemPlaceholder:"Add an item…", shopQty:"Qty",
    shopCategory:"Category", shopAddItem:"+ Add Item", shopClearChecked:"🗑 Clear Checked",
    shopNoItems:"No items yet. Add some below!", shopNoItemsCat:"No items yet.",
    cycleNatural:"🌸 Natural Cycle", cyclePill:"💊 Birth Control Pill",
    cycleSetBtn:"+ Set Cycle", cycleSaveDay:"💾 Save Today",
    cycleSymptomsTitle:"💊 Today's Symptoms", cycleMoodTitle:"💭 Mood & Notes",
    cycleNotesPlaceholder:"Any notes for today…",
    cycleInsightsTitle:"📊 Cycle Insights", cycleHistoryTitle:"🗓 History",
    cyclePeriodPhase:"Menstrual Phase", cycleFertilePhase:"Fertile Window",
    cycleOvulationPhase:"Ovulation", cyclePmsPhase:"Luteal / PMS",
    cycleFollicularPhase:"Follicular Phase",
    cyclePeriodDesc:"Rest and be gentle with yourself.",
    cycleFertileDesc:"High energy. Great for social plans.",
    cycleOvulationDesc:"Peak energy and confidence!",
    cyclePmsDesc:"Slow down, prioritize rest.",
    cycleFollicularDesc:"Energy is rising!",
    cycleSetupHint:"Set your cycle start date to see insights.",
    cycleStartDateLabel:"Start Date of Last Period",
    cyclePeriodDurLabel:"Period Duration (days)",
    cycleLengthLabel:"Cycle Length (days)",
    cycleSymptoms:["🤕 Cramps","😴 Fatigue","🤢 Nausea","🎭 Mood Swings","🍫 Cravings","💧 Bloating","🤯 Headache","💔 Breast Tenderness","😰 Anxiety","🥵 Hot Flashes","💤 Insomnia","✨ High Energy"],
    cycleMoods:["😊","😌","😢","😠","😤","🥰","😶","🤩"],
    cycleMoodLabels:["Happy","Calm","Sad","Irritable","Stressed","Loving","Numb","Energetic"],
    cyclePillLegendActive:"Active (21)", cyclePillLegendPlacebo:"Placebo (7)", cyclePillLegendTaken:"Taken",
    cycleInsightsPackDay:"Pack Day", cycleInsightsPillType:"Pill Type", cycleInsightsTakenToday:"Taken Today",
    cycleInsightsNextPeriod:"Next Period", cycleInsightsCycleDay:"Cycle Day", cycleInsightsCycleLen:"Cycle Length",
    cycleInsightsOvulation:"Ovulation Est.", cycleInsightsTakenYes:"✓ Yes", cycleInsightsTakenNo:"✗ Not yet",
    cycleInsightsDays:"days", cycleInsightsToday:"Today", cycleInsightsPassed:"Passed", cycleInsightsOverdue:"Today / Overdue",
    cycleInsightsActive:"Active (Pink)", cycleInsightsPlacebo:"Placebo (White)",
    cycleHistoryNoData:"No cycles logged yet.", cyclePillHoverActive:"Active Pill",
    cycleSetupTitle:"📅 Log Cycle Start",
    cycleInsightsTitleCard:"📊 Cycle Insights", cycleHistoryTitleCard:"🗓 History",
    cyclePillPackTitle:"💊 Pill Pack", cyclePillPackSetup:"Set your cycle start date to begin",
    cycleStatusTitle:"🌸 Cycle Status",
    cyclePillCalLegendActive:"Active", cyclePillCalLegendPlacebo:"Placebo",
    cycleIntimacyTitle:"💞 Intimacy Log — Today",
    cycleIntimacyHistoryTitle:"This month",
    cycleIntimacyTypes:["💋 Kiss","🛡 Protected Sex","🔥 Unprotected Sex","💜 Oral","✨ Other Intimacy"],
    cycleIntimacyKeys:["kiss","protected","unprotected","oral","other"],
    cyclePregnancyTitle:"🤰 Pregnancy Possibility",
    cyclePregnancyNoData:"Set your cycle start date to see pregnancy risk estimates.",
    cyclePregnancyRiskNone:"Minimal",
    cyclePregnancyRiskLow:"Low",
    cyclePregnancyRiskMedium:"Medium",
    cyclePregnancyRiskHigh:"High",
    cyclePregnancyRiskVeryHigh:"Very High",
    cyclePregnancyFactorPhase:"Cycle Phase",
    cyclePregnancyFactorContact:"Recent Intimacy",
    cyclePregnancyFactorProtection:"Protection Used",
    cyclePregnancyFactorPill:"Pill Active",
    cyclePregnancyDisclaimer:"⚠️ This is an estimate based on cycle phase and logged intimacy only. It is not medical advice. Consult a healthcare professional for accurate assessment.",
    cyclePregnancyHistoryTitle:"Recent at-risk events",
    cyclePregnancyHistoryEmpty:"No unprotected intimacy logged this cycle.",
    cyclePregnancyPhaseLabels:{period:"Menstrual — very low",follicular:"Follicular — low",fertile:"Fertile window — elevated",ovulation:"Ovulation — highest",pms:"Luteal — very low"},
    cyclePregnancyProtYes:"Yes — reduced",
    cyclePregnancyProtNo:"No — full risk",
    cyclePregnancyPillYes:"Yes — very low",
    cyclePregnancyPillNo:"No",
    cycleIntimacyDayLabel:"Day",
    cycleHistoryDayPeriod:"day period", cycleHistoryPredicted:"predicted",
    tabGoals:"🎯 Goals", tabTodo:"✅ To-Do",
    goalsDailyTitle:"Daily Goals", goalsDailySub:"Reset every day",
    goalsWeeklyTitle:"Weekly Goals", goalsWeeklySub:"Reset every week",
    goalsMonthlyTitle:"Monthly Goals", goalsMonthlySub:"Reset every month",
    goalsYearlyTitle:"Yearly Goals", goalsYearlySub:"Big picture milestones",
    goalDailyPlaceholder:"Add a daily goal…", goalWeeklyPlaceholder:"Add a weekly goal…",
    goalMonthlyPlaceholder:"Add a monthly goal…", goalYearlyPlaceholder:"Add a yearly goal…",
    goalsEmpty:"No goals yet. Add one above!",
    todoTitle:"✅ To-Do List", todoPlaceholder:"What needs to be done?",
    todoFilterActive:"Active", todoFilterDone:"Done", todoClearDone:"🗑 Clear Done",
    todoAddBtn:"+ Add", todoEmpty:"Nothing here yet. Add your first task above!",
    todoCatPersonal:"👤 Personal", todoCatWork:"💼 Work", todoCatHealth:"💪 Health",
    todoCatFinance:"💰 Finance", todoCatHome:"🏠 Home", todoCatOther:"📦 Other",
    finTotalExpenses:"Total Expenses", finTotalIncome:"Total Income", finBalance:"Balance",
    finMonthlyBudget:"Monthly Budget", finExpenses:"Expenses", finIncome:"Income",
    finToday:"Today", finThisWeek:"This week", finThisMonth:"This month", finAll:"All",
    finDescription:"Aa Description", finAmount:"💲 Amount", finCategory:"🏷 Category", finSource:"🏷 Source",
    finNoExpenses:"No expenses yet. Add one below!", finNoIncome:"No income yet. Add one below!",
    finDescPlaceholder:"Description…", finSourcePlaceholder:"Source…",
    finAddEntry:"+ Add", finBudgetBreakdown:"Budget Breakdown", finTotalSpent:"Total spent",
    finSavingsGoals:"Savings Goals",
    finCatFood:"🍔 Food", finCatHealth:"💊 Health", finCatTransport:"🚗 Transport",
    finCatEntertainment:"🎬 Entertainment", finCatUtilities:"⚡ Utilities", finCatHome:"🏠 Home",
    finCatDevelopment:"📚 Development", finCatInvestment:"📈 Investment", finCatOther:"📦 Other",
    finIncSalary:"💼 Salary", finIncFreelance:"💻 Freelance", finIncInvestment:"📈 Investment",
    finIncGift:"🎁 Gift", finIncOther:"📦 Other",
    finNewPage:"+ New page", finBudgetModalTitle:"🎯 Set Monthly Budget",
    finBudgetLabel:"Budget limit (€)", finBudgetCancel:"Cancel", finBudgetSave:"💾 Save Budget",
    finSavNamePlaceholder:"Goal name…", finSavTargetPlaceholder:"Target €",
    ttTitle:"🗓 Weekly Timetable", ttEventTitle:"Event Title", ttEventPlaceholder:"e.g. Morning run…",
    ttDay:"Day", ttAllDay:"All Day", ttStart:"Start", ttEnd:"End", ttCategory:"Category",
    ttAddEvent:"+ Add Event", ttEditBanner:"✎ Editing event —", ttCancelEdit:"✕ Cancel",
    ttClearAll:"Clear All Events", ttGcalTitle:"Import from Google Calendar",
    ttGcalSubtitle:"Fetching your events for this week…", ttGcalConnecting:"Connecting to Google Calendar…",
    ttGcalSelected:"0 selected", ttGcalSelectAll:"Select All", ttGcalImport:"➕ Add to Timetable",
    ttConfirmTitle:"Clear All Events?",
    ttConfirmDesc:"This will permanently remove all events from your timetable. This action cannot be undone.",
    ttConfirmCancel:"Cancel", ttConfirmDelete:"Delete All",
    ttDayMon:"Monday", ttDayTue:"Tuesday", ttDayWed:"Wednesday", ttDayThu:"Thursday",
    ttDayFri:"Friday", ttDaySat:"Saturday", ttDaySun:"Sunday",
    ttCatWork:"Work", ttCatStudy:"Study", ttCatHealth:"Health", ttCatPersonal:"Personal",
    ttCatSocial:"Social", ttCatOther:"Other",
    tabSettings:"⚙️ Settings",
    // Onboarding
    onboardingTitle:"Welcome to Life Tracker 🎉",
    onboardingSubtitle:"Let's set up your experience in seconds.",
    onboardingStep1:"Choose your language",
    onboardingStep2:"Who are you?",
    onboardingStep3:"Pick a theme",
    onboardingFinish:"Get Started →",
    genderFemale:"Female", genderMale:"Male",
    // Settings page
    settingsTitle:"⚙️ Settings",
    settingsProfile:"👤 Profile",
    settingsGenderLabel:"Gender",
    settingsGenderHint:"The Cycle Tracker tab is only shown for Female users.",
    settingsLanguageTitle:"🌐 Language",
    settingsThemeTitle:"🎨 Theme",
    settingsGoalsTitle:"🎯 Daily Macro Goals",
    settingsGoalsHint:"Set your daily calorie & macro targets. These power the goal bars on the Calories page and the Analysis cross-stats.",
    settingsGoalsSaveBtn:"💾 Save Goals",
    settingsWorkoutLinkTitle:"🏋️ Habit Linking",
    settingsWorkoutLinkHint:"Pick a habit that gets automatically pre-selected and checked off whenever you log a workout.",
    settingsDefaultHabitLabel:"Default linked habit",
    settingsDefaultHabitNone:"— none —",
    settingsDangerZone:"⚠️ Danger Zone",
    settingsClearAllLabel:"Delete All Data",
    settingsClearAllHint:"This will permanently erase all your habits, tasks, timetable, finance, cycle and shopping data. Cannot be undone.",
    settingsClearAllBtn:"🗑 Delete All Data",
    settingsClearModalTitle:"Delete All Data?",
    settingsClearModalDesc:"This will permanently erase ALL Life Tracker data from this browser. This action cannot be undone.",
    settingsClearModalConfirm:"Delete Everything",
    settingsSyncTitle:"🔄 Export & Import Data",
    settingsSyncHint:"Export a backup of all your data as a JSON file, then import it on any other device to sync your Life Tracker.",
    settingsExportBtn:"Export Backup",
    settingsImportBtn:"Import Backup",
    importModalTitle:"Import Backup?",
        journalTitle:"📓 Daily Journal",
    journalMoodLabel:"How was today?",
    journalPlaceholder:"What happened today? Even 2–3 sentences builds a powerful record over time…",
    journalSaveBtn:"Save Entry",
    journalNoEntries:"No journal entries yet. Start writing below!",
    journalRecentTitle:"Recent Entries",
    journalToday:"Today",
    journalYesterday:"Yesterday",
    journalDaysAgo:(n)=>`${n} days ago`,
    journalNoNote:"(mood only)",
    journalNotePlaceholder:"Add a note for today…",
  },
  hu: {
    monthNames:["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"],
    monthShort:["Jan","Feb","Már","Ápr","Máj","Jún","Júl","Aug","Sze","Okt","Nov","Dec"],
    days:["H","K","Sze","Cs","P","Szo","V"],
    subtitle:"— Életkövető —",
    tabTracker:"📊 Szokáskövető", tabDays:"Napok", tabTasks:"✅ Feladatok", tabAnalysis:"📈 Elemzés",
    habitsSubtabHabits:"💪 Szokáskövető", habitsSubtabAnalysis:"📈 Elemzés",
    scopeDaily:"☀️ Napi", scopeWeekly:"📅 Heti", scopeMonthly:"🗓 Havi", scopeYearly:"📆 Éves",
    pomoSessionsLabel:"Munkamenetek", pomoFocusLabel:"Fókusz idő", pomoBreaksLabel:"Szünetek",
    pomoHint:"Szóköz: indít · Esc: bezár",
    pomodoroBtn:"⏱ Pomodoro",
    statHabits:"Szokások", statCompleted:"Teljesítve", statProgress:"Haladás", statTasksDone:"Kész feladat",
    myHabits:"Szokásaim",
    addHabitPlaceholder:"Új szokás hozzáadása…", addHabitBtn:"+ Hozzáad",
    thisDay:"Ezen a napon", todayBadge:"Ma",
    mindsetTitle:"Napi értékelés", energy:"Energia", focus:"Fókusz", mood:"Hangulat", motivation:"Motiváció",
    tasksThisWeek:"📋 Heti feladatok",
    filterAll:"Mind", filterHigh:"🔴 Magas", filterMedium:"⚡ Közepes", filterLow:"🔵 Alacsony",
    taskNameLabel:"Feladat neve", taskNamePlaceholder:"Mit kell elvégezni?",
    priorityLabel:"Prioritás", dueDateLabel:"Határidő", statusLabel:"Állapot", addTaskBtn:"+ Feladat hozzáadása",
    priorityHigh:"🔴 Magas prioritás", priorityMedium:"⚡ Közepes prioritás", priorityLow:"🔵 Alacsony prioritás",
    statusInProgress:"Folyamatban", statusNotStarted:"Nem kezdett", statusCompleted:"Befejezett",
    noTasks:"Nincs feladat. Adj hozzá egyet!",
    dailyConsistency:"Napi következetesség",
    mindsetTrackerTitle:"Mentális nyomkövető — Energia · Fókusz · Motiváció",
    habitBreakdown:"Szokások részletezése",
    goalsThisMonth:"Havi célok 🎯", goalPlaceholder:"Havi cél hozzáadása…", addGoalBtn:"+ Cél hozzáadása",
    weeklyScore:"Heti eredmény", overallProgress:"Összesített haladás",
    crossStatsTitle:"🔗 Összekötött statisztikák", calGoalToday:"Mai kalóriacél", workoutStreak:"🔥 Edzés sorozat", daysUnit:"nap",
    weekPrefix:"Hét", weekShort:"Hét",
    session:"Munkamenet", focusTime:"Fókusz idő",
    pomodoroMode:"Pomodoro", shortBreak:"Rövid szünet", longBreak:"Hosszú szünet",
    startBtn:"▶ Indítás", pauseBtn:"⏸ Szünet", resetBtn:"↺ Visszaállít",
    saved:"✓ Mentve",
    completedStat:"teljesítve", habitsStat:"szokás", daysStat:"nap",
    dueToday:"Ma", dueTomorrow:"Holnap",
    dueOverdue:(n)=>`${n} napja lejárt`, dueFuture:(n)=>`Még ${n} nap`,
    langLabel:"HU 🇭🇺",
    tabTimetable:"🗓 Órarend", tabShopping:"🛒 Bevásárlás", tabCycle:"🌸 Ciklus", tabFinance:"💰 Pénzügy", tabRecipes:"📖 Receptek",
    shopTitle:"🛒 Bevásárlólista", shopGrocery:"🥦 Élelmiszer", shopHousehold:"🏠 Háztartás",
    shopPersonal:"💄 Személyes", shopOther:"📦 Egyéb",
    shopItemName:"Termék neve", shopItemPlaceholder:"Elem hozzáadása…", shopQty:"Db",
    shopCategory:"Kategória", shopAddItem:"+ Hozzáad", shopClearChecked:"🗑 Kész törlése",
    shopNoItems:"Még nincs elem. Adj hozzá egyet!", shopNoItemsCat:"Még nincs elem.",
    cycleNatural:"🌸 Természetes ciklus", cyclePill:"💊 Fogamzásgátló",
    cycleSetBtn:"+ Ciklus beállítása", cycleSaveDay:"💾 Ma mentése",
    cycleSymptomsTitle:"💊 Mai tünetek", cycleMoodTitle:"💭 Hangulat & Jegyzetek",
    cycleNotesPlaceholder:"Mai jegyzetek…",
    cycleInsightsTitle:"📊 Ciklus-elemzés", cycleHistoryTitle:"🗓 Előzmények",
    cyclePeriodPhase:"Menstruációs fázis", cycleFertilePhase:"Termékeny ablak",
    cycleOvulationPhase:"Ovuláció", cyclePmsPhase:"Luteális / PMS",
    cycleFollicularPhase:"Follikuláris fázis",
    cyclePeriodDesc:"Pihenj és kímélj magad.",
    cycleFertileDesc:"Magas energia. Jó a szociális tervekre.",
    cycleOvulationDesc:"Csúcs energia és magabiztosság!",
    cyclePmsDesc:"Lassíts, helyezd előtérbe a pihenést.",
    cycleFollicularDesc:"Az energia emelkedőben!",
    cycleSetupHint:"Állítsd be a ciklus kezdőnapját az elemzéshez.",
    cycleStartDateLabel:"Az utolsó menstruáció kezdete",
    cyclePeriodDurLabel:"Menstruáció hossza (nap)",
    cycleLengthLabel:"Ciklus hossza (nap)",
    cycleSymptoms:["🤕 Görcsök","😴 Fáradtság","🤢 Hányinger","🎭 Hangulatingadozás","🍫 Sóvárgás","💧 Puffadás","🤯 Fejfájás","💔 Mellérzékenység","😰 Szorongás","🥵 Hőhullámok","💤 Álmatlanság","✨ Magas energia"],
    cycleMoods:["😊","😌","😢","😠","😤","🥰","😶","🤩"],
    cycleMoodLabels:["Boldog","Nyugodt","Szomorú","Ingerlékeny","Stresszes","Szerető","Közömbös","Energikus"],
    cyclePillLegendActive:"Aktív (21)", cyclePillLegendPlacebo:"Placebo (7)", cyclePillLegendTaken:"Bevéve",
    cycleInsightsPackDay:"Csomag napja", cycleInsightsPillType:"Tabletta típusa", cycleInsightsTakenToday:"Ma bevéve",
    cycleInsightsNextPeriod:"Következő menstruáció", cycleInsightsCycleDay:"Ciklus napja", cycleInsightsCycleLen:"Ciklus hossza",
    cycleInsightsOvulation:"Ovuláció becslés", cycleInsightsTakenYes:"✓ Igen", cycleInsightsTakenNo:"✗ Még nem",
    cycleInsightsDays:"nap", cycleInsightsToday:"Ma", cycleInsightsPassed:"Elmúlt", cycleInsightsOverdue:"Ma / Lejárt",
    cycleInsightsActive:"Aktív (Rózsaszín)", cycleInsightsPlacebo:"Placebo (Fehér)",
    cycleHistoryNoData:"Még nincs naplózott ciklus.", cyclePillHoverActive:"Aktív tabletta",
    cycleSetupTitle:"📅 Ciklus kezdet rögzítése",
    cycleInsightsTitleCard:"📊 Ciklus-elemzés", cycleHistoryTitleCard:"🗓 Előzmények",
    cyclePillPackTitle:"💊 Tablettacsomag", cyclePillPackSetup:"Állítsd be a ciklus kezdőnapját",
    cycleStatusTitle:"🌸 Ciklus állapot",
    cyclePillCalLegendActive:"Aktív", cyclePillCalLegendPlacebo:"Placebo",
    cycleIntimacyTitle:"💞 Intimitás napló — Ma",
    cycleIntimacyHistoryTitle:"Ezen a hónapban",
    cycleIntimacyTypes:["💋 Csók","🛡 Védett szex","🔥 Védelem nélküli szex","💜 Orális","✨ Egyéb intimitás"],
    cycleIntimacyKeys:["kiss","protected","unprotected","oral","other"],
    cyclePregnancyTitle:"🤰 Terhességi valószínűség",
    cyclePregnancyNoData:"Állítsd be a ciklus kezdőnapját a becslés megtekintéséhez.",
    cyclePregnancyRiskNone:"Minimális",
    cyclePregnancyRiskLow:"Alacsony",
    cyclePregnancyRiskMedium:"Közepes",
    cyclePregnancyRiskHigh:"Magas",
    cyclePregnancyRiskVeryHigh:"Nagyon magas",
    cyclePregnancyFactorPhase:"Ciklusfázis",
    cyclePregnancyFactorContact:"Közelmúltbeli intimitás",
    cyclePregnancyFactorProtection:"Védekezés",
    cyclePregnancyFactorPill:"Fogamzásgátló aktív",
    cyclePregnancyDisclaimer:"⚠️ Ez csak a ciklusfázis és a naplózott intimitás alapján becsült érték. Nem orvosi tanács. Pontos felméréshez fordulj egészségügyi szakemberhez.",
    cyclePregnancyHistoryTitle:"Közelmúltbeli kockázatos események",
    cyclePregnancyHistoryEmpty:"Nincs védelem nélküli intimitás naplózva ezen a cikluson.",
    cyclePregnancyPhaseLabels:{period:"Menstruáció — nagyon alacsony",follicular:"Follikuláris — alacsony",fertile:"Termékeny ablak — emelkedett",ovulation:"Ovuláció — legmagasabb",pms:"Luteális — nagyon alacsony"},
    cyclePregnancyProtYes:"Igen — csökkentett",
    cyclePregnancyProtNo:"Nem — teljes kockázat",
    cyclePregnancyPillYes:"Igen — nagyon alacsony",
    cyclePregnancyPillNo:"Nem",
    cycleIntimacyDayLabel:"Nap",
    cycleHistoryDayPeriod:"napos periódus", cycleHistoryPredicted:"becsült",
    tabGoals:"🎯 Célok", tabTodo:"✅ Teendők",
    goalsDailyTitle:"Napi célok", goalsDailySub:"Naponta visszaáll",
    goalsWeeklyTitle:"Heti célok", goalsWeeklySub:"Hetente visszaáll",
    goalsMonthlyTitle:"Havi célok", goalsMonthlySub:"Havonta visszaáll",
    goalsYearlyTitle:"Éves célok", goalsYearlySub:"Nagy mérföldkövek",
    goalDailyPlaceholder:"Napi cél hozzáadása…", goalWeeklyPlaceholder:"Heti cél hozzáadása…",
    goalMonthlyPlaceholder:"Havi cél hozzáadása…", goalYearlyPlaceholder:"Éves cél hozzáadása…",
    goalsEmpty:"Még nincs cél. Adj hozzá egyet!",
    todoTitle:"✅ Teendőlista", todoPlaceholder:"Mit kell elvégezni?",
    todoFilterActive:"Aktív", todoFilterDone:"Kész", todoClearDone:"🗑 Kész törlése",
    todoAddBtn:"+ Hozzáad", todoEmpty:"Még semmi sincs itt. Add hozzá az első feladatot!",
    todoCatPersonal:"👤 Személyes", todoCatWork:"💼 Munka", todoCatHealth:"💪 Egészség",
    todoCatFinance:"💰 Pénzügy", todoCatHome:"🏠 Otthon", todoCatOther:"📦 Egyéb",
    finTotalExpenses:"Összes kiadás", finTotalIncome:"Összes bevétel", finBalance:"Egyenleg",
    finMonthlyBudget:"Havi keret", finExpenses:"Kiadások", finIncome:"Bevételek",
    finToday:"Ma", finThisWeek:"Ezen a héten", finThisMonth:"Ezen a hónapban", finAll:"Mind",
    finDescription:"Aa Leírás", finAmount:"💲 Összeg", finCategory:"🏷 Kategória", finSource:"🏷 Forrás",
    finNoExpenses:"Még nincs kiadás. Adj hozzá egyet!", finNoIncome:"Még nincs bevétel. Adj hozzá egyet!",
    finDescPlaceholder:"Leírás…", finSourcePlaceholder:"Forrás…",
    finAddEntry:"+ Hozzáad", finBudgetBreakdown:"Keret áttekintés", finTotalSpent:"Összesen elköltve",
    finSavingsGoals:"Megtakarítási célok",
    finCatFood:"🍔 Étel", finCatHealth:"💊 Egészség", finCatTransport:"🚗 Közlekedés",
    finCatEntertainment:"🎬 Szórakozás", finCatUtilities:"⚡ Rezsi", finCatHome:"🏠 Otthon",
    finCatDevelopment:"📚 Fejlődés", finCatInvestment:"📈 Befektetés", finCatOther:"📦 Egyéb",
    finIncSalary:"💼 Fizetés", finIncFreelance:"💻 Szabadúszó", finIncInvestment:"📈 Befektetés",
    finIncGift:"🎁 Ajándék", finIncOther:"📦 Egyéb",
    finNewPage:"+ Új oldal", finBudgetModalTitle:"🎯 Havi keret beállítása",
    finBudgetLabel:"Keret összege (€)", finBudgetCancel:"Mégsem", finBudgetSave:"💾 Mentés",
    finSavNamePlaceholder:"Cél neve…", finSavTargetPlaceholder:"Célösszeg €",
    ttTitle:"🗓 Heti órarend", ttEventTitle:"Esemény neve", ttEventPlaceholder:"pl. Reggeli futás…",
    ttDay:"Nap", ttAllDay:"Egész nap", ttStart:"Kezdés", ttEnd:"Vége", ttCategory:"Kategória",
    ttAddEvent:"+ Esemény hozzáadása", ttEditBanner:"✎ Esemény szerkesztése —", ttCancelEdit:"✕ Mégsem",
    ttClearAll:"Összes esemény törlése", ttGcalTitle:"Importálás Google Naptárból",
    ttGcalSubtitle:"Az eseményeid lekérése erre a hétre…", ttGcalConnecting:"Kapcsolódás a Google Naptárhoz…",
    ttGcalSelected:"0 kiválasztva", ttGcalSelectAll:"Összes kijelölése", ttGcalImport:"➕ Hozzáadás az órarendhez",
    ttConfirmTitle:"Összes esemény törlése?",
    ttConfirmDesc:"Ez véglegesen eltávolítja az összes eseményt az órarendből. Ez a művelet nem vonható vissza.",
    ttConfirmCancel:"Mégsem", ttConfirmDelete:"Összes törlése",
    ttDayMon:"Hétfő", ttDayTue:"Kedd", ttDayWed:"Szerda", ttDayThu:"Csütörtök",
    ttDayFri:"Péntek", ttDaySat:"Szombat", ttDaySun:"Vasárnap",
    ttCatWork:"Munka", ttCatStudy:"Tanulás", ttCatHealth:"Egészség", ttCatPersonal:"Személyes",
    ttCatSocial:"Társasági", ttCatOther:"Egyéb",
    tabSettings:"⚙️ Beállítások",
    onboardingTitle:"Üdvözöl a Life Tracker 🎉",
    onboardingSubtitle:"Állítsuk be a tapasztalatod pár másodperc alatt.",
    onboardingStep1:"Válassz nyelvet",
    onboardingStep2:"Ki vagy te?",
    onboardingStep3:"Válassz témát",
    onboardingFinish:"Kezdjük →",
    genderFemale:"Nő", genderMale:"Férfi",
    settingsTitle:"⚙️ Beállítások",
    settingsProfile:"👤 Profil",
    settingsGenderLabel:"Nem",
    settingsGenderHint:"A Ciklus fül csak Nő felhasználóknak jelenik meg.",
    settingsLanguageTitle:"🌐 Nyelv",
    settingsThemeTitle:"🎨 Téma",
    settingsGoalsTitle:"🎯 Napi makró célok",
    settingsGoalsHint:"Állítsd be a napi kalória- és makró céljaidat. Ezek vezérlik a Kalória oldal célsávjait és az Analízis kereszt-statisztikáit.",
    settingsGoalsSaveBtn:"💾 Célok mentése",
    settingsWorkoutLinkTitle:"🏋️ Szokás összekapcsolás",
    settingsWorkoutLinkHint:"Válassz egy szokást, amely automatikusan kiválasztott és bejelölt lesz, amikor edzést rögzítesz.",
    settingsDefaultHabitLabel:"Alapértelmezett összekapcsolt szokás",
    settingsDefaultHabitNone:"— nincs —",
    settingsDangerZone:"⚠️ Veszélyzóna",
    settingsClearAllLabel:"Összes adat törlése",
    settingsClearAllHint:"Véglegesen törli az összes szokást, feladatot, órarendet, pénzügyet, ciklust és bevásárlólistát. Nem vonható vissza.",
    settingsClearAllBtn:"🗑 Összes törlése",
    settingsClearModalTitle:"Összes adat törlése?",
    settingsClearModalDesc:"Ez véglegesen törli az összes Life Tracker adatot ebből a böngészőből. Nem vonható vissza.",
    settingsClearModalConfirm:"Mindent töröl",
    settingsSyncTitle:"🔄 Exportálás & Importálás",
    settingsSyncHint:"Exportáld az adataidat JSON fájlként, majd importáld bármely más eszközön a szinkronizáláshoz.",
    settingsExportBtn:"Mentés exportálása",
    settingsImportBtn:"Mentés importálása",
    importModalTitle:"Importálás?",
        journalTitle:"📓 Napi napló",
    journalMoodLabel:"Milyen volt a mai nap?",
    journalPlaceholder:"Mi történt ma? Már 2–3 mondat is erős visszatekintést teremt idő múltával…",
    journalSaveBtn:"Bejegyzés mentése",
    journalNoEntries:"Még nincs naplóbejegyzés. Kezdj el írni!",
    journalRecentTitle:"Legutóbbi bejegyzések",
    journalToday:"Ma",
    journalYesterday:"Tegnap",
    journalDaysAgo:(n)=>`${n} napja`,
    journalNoNote:"(csak hangulat)",
    journalNotePlaceholder:"Adj hozzá egy megjegyzést a mai naphoz…",
  },
  de: {
    monthNames:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    monthShort:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
    days:["Mo","Di","Mi","Do","Fr","Sa","So"],
    subtitle:"— Leben Tracker —",
    tabTracker:"📊 Habit Tracker", tabDays:"Tage", tabTasks:"✅ Aufgaben", tabAnalysis:"📈 Analyse",
    habitsSubtabHabits:"💪 Gewohnheiten", habitsSubtabAnalysis:"📈 Analyse",
    scopeDaily:"☀️ Täglich", scopeWeekly:"📅 Wöchentlich", scopeMonthly:"🗓 Monatlich", scopeYearly:"📆 Jährlich",
    pomoSessionsLabel:"Sitzungen", pomoFocusLabel:"Fokuszeit", pomoBreaksLabel:"Pausen",
    pomoHint:"Leertaste: Start · Esc: Schließen",
    pomodoroBtn:"⏱ Pomodoro",
    statHabits:"Gewohnheiten", statCompleted:"Erledigt", statProgress:"Fortschritt", statTasksDone:"Aufgaben",
    myHabits:"Meine Gewohnheiten",
    addHabitPlaceholder:"Neue Gewohnheit…", addHabitBtn:"+ Hinzufügen",
    thisDay:"Dieser Tag", todayBadge:"Heute",
    mindsetTitle:"Tages-Check-In", energy:"Energie", focus:"Fokus", mood:"Stimmung", motivation:"Motivation",
    tasksThisWeek:"📋 Aufgaben diese Woche",
    filterAll:"Alle", filterHigh:"🔴 Hoch", filterMedium:"⚡ Mittel", filterLow:"🔵 Niedrig",
    taskNameLabel:"Aufgabenname", taskNamePlaceholder:"Was muss erledigt werden?",
    priorityLabel:"Priorität", dueDateLabel:"Fälligkeitsdatum", statusLabel:"Status", addTaskBtn:"+ Aufgabe hinzufügen",
    priorityHigh:"🔴 Hohe Priorität", priorityMedium:"⚡ Mittlere Priorität", priorityLow:"🔵 Niedrige Priorität",
    statusInProgress:"In Bearbeitung", statusNotStarted:"Nicht begonnen", statusCompleted:"Abgeschlossen",
    noTasks:"Keine Aufgaben. Füge eine hinzu!",
    dailyConsistency:"Tägliche Konsistenz",
    mindsetTrackerTitle:"Mentaler Tracker — Energie · Fokus · Motivation",
    habitBreakdown:"Gewohnheiten Übersicht",
    goalsThisMonth:"Monatsziele 🎯", goalPlaceholder:"Monatsziel hinzufügen…", addGoalBtn:"+ Ziel hinzufügen",
    weeklyScore:"Wochenpunktzahl", overallProgress:"Gesamtfortschritt",
    crossStatsTitle:"🔗 Verknüpfte Statistiken", calGoalToday:"Kalorienziel Heute", workoutStreak:"🔥 Trainings-Serie", daysUnit:"Tage",
    weekPrefix:"Woche", weekShort:"Wo",
    session:"Sitzung", focusTime:"Fokuszeit",
    pomodoroMode:"Pomodoro", shortBreak:"Kurze Pause", longBreak:"Lange Pause",
    startBtn:"▶ Start", pauseBtn:"⏸ Pause", resetBtn:"↺ Zurücksetzen",
    saved:"✓ Gespeichert",
    completedStat:"erledigt", habitsStat:"Gewohnheiten", daysStat:"Tage",
    dueToday:"Heute", dueTomorrow:"Morgen",
    dueOverdue:(n)=>`${n}T überfällig`, dueFuture:(n)=>`In ${n} Tagen`,
    langLabel:"DE 🇩🇪",
    tabTimetable:"🗓 Stundenplan", tabShopping:"🛒 Einkauf", tabCycle:"🌸 Zyklus", tabFinance:"💰 Finanzen", tabRecipes:"📖 Rezepte",
    shopTitle:"🛒 Einkaufsliste", shopGrocery:"🥦 Lebensmittel", shopHousehold:"🏠 Haushalt",
    shopPersonal:"💄 Persönlich", shopOther:"📦 Sonstiges",
    shopItemName:"Artikelname", shopItemPlaceholder:"Artikel hinzufügen…", shopQty:"Menge",
    shopCategory:"Kategorie", shopAddItem:"+ Hinzufügen", shopClearChecked:"🗑 Erledigt löschen",
    shopNoItems:"Noch keine Artikel. Füge welche hinzu!", shopNoItemsCat:"Noch keine Artikel.",
    cycleNatural:"🌸 Natürlicher Zyklus", cyclePill:"💊 Antibabypille",
    cycleSetBtn:"+ Zyklus festlegen", cycleSaveDay:"💾 Heute speichern",
    cycleSymptomsTitle:"💊 Heutige Symptome", cycleMoodTitle:"💭 Stimmung & Notizen",
    cycleNotesPlaceholder:"Notizen für heute…",
    cycleInsightsTitle:"📊 Zykluseinblicke", cycleHistoryTitle:"🗓 Verlauf",
    cyclePeriodPhase:"Menstruationsphase", cycleFertilePhase:"Fruchtbares Fenster",
    cycleOvulationPhase:"Eisprung", cyclePmsPhase:"Luteal / PMS",
    cycleFollicularPhase:"Follikelphase",
    cyclePeriodDesc:"Ruh dich aus und sei sanft zu dir.",
    cycleFertileDesc:"Hohe Energie. Gut für soziale Pläne.",
    cycleOvulationDesc:"Höchste Energie und Selbstvertrauen!",
    cyclePmsDesc:"Mach langsamer, priorisiere Ruhe.",
    cycleFollicularDesc:"Die Energie steigt!",
    cycleSetupHint:"Lege das Zyklusstartdatum fest.",
    cycleStartDateLabel:"Beginn der letzten Periode",
    cyclePeriodDurLabel:"Periodendauer (Tage)",
    cycleLengthLabel:"Zykluslänge (Tage)",
    cycleSymptoms:["🤕 Krämpfe","😴 Müdigkeit","🤢 Übelkeit","🎭 Stimmungsschwankungen","🍫 Heißhunger","💧 Blähungen","🤯 Kopfschmerzen","💔 Brustschmerzen","😰 Angst","🥵 Hitzewallungen","💤 Schlaflosigkeit","✨ Hohe Energie"],
    cycleMoods:["😊","😌","😢","😠","😤","🥰","😶","🤩"],
    cycleMoodLabels:["Glücklich","Ruhig","Traurig","Reizbar","Gestresst","Liebevoll","Gefühllos","Energiegeladen"],
    cyclePillLegendActive:"Aktiv (21)", cyclePillLegendPlacebo:"Placebo (7)", cyclePillLegendTaken:"Eingenommen",
    cycleInsightsPackDay:"Packungstag", cycleInsightsPillType:"Pillentyp", cycleInsightsTakenToday:"Heute eingenommen",
    cycleInsightsNextPeriod:"Nächste Periode", cycleInsightsCycleDay:"Zyklustag", cycleInsightsCycleLen:"Zykluslänge",
    cycleInsightsOvulation:"Eisprung geschätzt", cycleInsightsTakenYes:"✓ Ja", cycleInsightsTakenNo:"✗ Noch nicht",
    cycleInsightsDays:"Tage", cycleInsightsToday:"Heute", cycleInsightsPassed:"Vorbei", cycleInsightsOverdue:"Heute / Überfällig",
    cycleInsightsActive:"Aktiv (Rosa)", cycleInsightsPlacebo:"Placebo (Weiß)",
    cycleHistoryNoData:"Noch keine Zyklen protokolliert.", cyclePillHoverActive:"Aktive Pille",
    cycleSetupTitle:"📅 Zyklusbeginn eintragen",
    cycleInsightsTitleCard:"📊 Zykluseinblicke", cycleHistoryTitleCard:"🗓 Verlauf",
    cyclePillPackTitle:"💊 Pillenpack", cyclePillPackSetup:"Lege das Zyklusstartdatum fest",
    cycleStatusTitle:"🌸 Zyklusstatus",
    cyclePillCalLegendActive:"Aktiv", cyclePillCalLegendPlacebo:"Placebo",
    cycleIntimacyTitle:"💞 Intimität-Tagebuch — Heute",
    cycleIntimacyHistoryTitle:"Diesen Monat",
    cycleIntimacyTypes:["💋 Kuss","🛡 Geschützter Sex","🔥 Ungeschützter Sex","💜 Oral","✨ Sonstige Intimität"],
    cycleIntimacyKeys:["kiss","protected","unprotected","oral","other"],
    cyclePregnancyTitle:"🤰 Schwangerschaftsmöglichkeit",
    cyclePregnancyNoData:"Lege dein Zyklusstartdatum fest, um Risikoschätzungen zu sehen.",
    cyclePregnancyRiskNone:"Minimal",
    cyclePregnancyRiskLow:"Niedrig",
    cyclePregnancyRiskMedium:"Mittel",
    cyclePregnancyRiskHigh:"Hoch",
    cyclePregnancyRiskVeryHigh:"Sehr hoch",
    cyclePregnancyFactorPhase:"Zyklusphase",
    cyclePregnancyFactorContact:"Letzte Intimität",
    cyclePregnancyFactorProtection:"Verhütung verwendet",
    cyclePregnancyFactorPill:"Pille aktiv",
    cyclePregnancyDisclaimer:"⚠️ Dies ist eine Schätzung basierend auf Zyklusphase und protokollierter Intimität. Kein medizinischer Rat. Konsultiere einen Arzt für eine genaue Einschätzung.",
    cyclePregnancyHistoryTitle:"Jüngste Risiko-Ereignisse",
    cyclePregnancyHistoryEmpty:"Kein ungeschützter Kontakt in diesem Zyklus protokolliert.",
    cyclePregnancyPhaseLabels:{period:"Menstruation — sehr niedrig",follicular:"Follikelphase — niedrig",fertile:"Fruchtbares Fenster — erhöht",ovulation:"Eisprung — am höchsten",pms:"Lutealphase — sehr niedrig"},
    cyclePregnancyProtYes:"Ja — reduziert",
    cyclePregnancyProtNo:"Nein — volles Risiko",
    cyclePregnancyPillYes:"Ja — sehr niedrig",
    cyclePregnancyPillNo:"Nein",
    cycleIntimacyDayLabel:"Tag",
    cycleHistoryDayPeriod:"Tage Periode", cycleHistoryPredicted:"vorhergesagt",
    tabGoals:"🎯 Ziele", tabTodo:"✅ To-Do",
    goalsDailyTitle:"Tagesziele", goalsDailySub:"Täglich zurückgesetzt",
    goalsWeeklyTitle:"Wochenziele", goalsWeeklySub:"Wöchentlich zurückgesetzt",
    goalsMonthlyTitle:"Monatsziele", goalsMonthlySub:"Monatlich zurückgesetzt",
    goalsYearlyTitle:"Jahresziele", goalsYearlySub:"Große Meilensteine",
    goalDailyPlaceholder:"Tagesziel hinzufügen…", goalWeeklyPlaceholder:"Wochenziel hinzufügen…",
    goalMonthlyPlaceholder:"Monatsziel hinzufügen…", goalYearlyPlaceholder:"Jahresziel hinzufügen…",
    goalsEmpty:"Noch keine Ziele. Füge eines hinzu!",
    todoTitle:"✅ To-Do-Liste", todoPlaceholder:"Was muss erledigt werden?",
    todoFilterActive:"Aktiv", todoFilterDone:"Erledigt", todoClearDone:"🗑 Erledigte löschen",
    todoAddBtn:"+ Hinzufügen", todoEmpty:"Noch nichts hier. Füge deine erste Aufgabe hinzu!",
    todoCatPersonal:"👤 Persönlich", todoCatWork:"💼 Arbeit", todoCatHealth:"💪 Gesundheit",
    todoCatFinance:"💰 Finanzen", todoCatHome:"🏠 Zuhause", todoCatOther:"📦 Sonstiges",
    finTotalExpenses:"Gesamtausgaben", finTotalIncome:"Gesamteinnahmen", finBalance:"Saldo",
    finMonthlyBudget:"Monatsbudget", finExpenses:"Ausgaben", finIncome:"Einnahmen",
    finToday:"Heute", finThisWeek:"Diese Woche", finThisMonth:"Diesen Monat", finAll:"Alle",
    finDescription:"Aa Beschreibung", finAmount:"💲 Betrag", finCategory:"🏷 Kategorie", finSource:"🏷 Quelle",
    finNoExpenses:"Noch keine Ausgaben. Füge eine hinzu!", finNoIncome:"Noch keine Einnahmen. Füge eine hinzu!",
    finDescPlaceholder:"Beschreibung…", finSourcePlaceholder:"Quelle…",
    finAddEntry:"+ Hinzufügen", finBudgetBreakdown:"Budget Übersicht", finTotalSpent:"Gesamt ausgegeben",
    finSavingsGoals:"Sparziele",
    finCatFood:"🍔 Essen", finCatHealth:"💊 Gesundheit", finCatTransport:"🚗 Transport",
    finCatEntertainment:"🎬 Unterhaltung", finCatUtilities:"⚡ Nebenkosten", finCatHome:"🏠 Zuhause",
    finCatDevelopment:"📚 Weiterbildung", finCatInvestment:"📈 Investition", finCatOther:"📦 Sonstiges",
    finIncSalary:"💼 Gehalt", finIncFreelance:"💻 Freelance", finIncInvestment:"📈 Investition",
    finIncGift:"🎁 Geschenk", finIncOther:"📦 Sonstiges",
    finNewPage:"+ Neue Seite", finBudgetModalTitle:"🎯 Monatsbudget festlegen",
    finBudgetLabel:"Budgetlimit (€)", finBudgetCancel:"Abbrechen", finBudgetSave:"💾 Budget speichern",
    finSavNamePlaceholder:"Zielname…", finSavTargetPlaceholder:"Zielbetrag €",
    ttTitle:"🗓 Wöchentlicher Stundenplan", ttEventTitle:"Titel des Ereignisses", ttEventPlaceholder:"z.B. Morgenrunde…",
    ttDay:"Tag", ttAllDay:"Ganztägig", ttStart:"Beginn", ttEnd:"Ende", ttCategory:"Kategorie",
    ttAddEvent:"+ Ereignis hinzufügen", ttEditBanner:"✎ Ereignis bearbeiten —", ttCancelEdit:"✕ Abbrechen",
    ttClearAll:"Alle Ereignisse löschen", ttGcalTitle:"Aus Google Kalender importieren",
    ttGcalSubtitle:"Deine Ereignisse für diese Woche werden abgerufen…", ttGcalConnecting:"Verbindung zum Google Kalender…",
    ttGcalSelected:"0 ausgewählt", ttGcalSelectAll:"Alle auswählen", ttGcalImport:"➕ Zum Stundenplan hinzufügen",
    ttConfirmTitle:"Alle Ereignisse löschen?",
    ttConfirmDesc:"Hiermit werden alle Ereignisse dauerhaft aus dem Stundenplan entfernt. Diese Aktion kann nicht rückgängig gemacht werden.",
    ttConfirmCancel:"Abbrechen", ttConfirmDelete:"Alle löschen",
    ttDayMon:"Montag", ttDayTue:"Dienstag", ttDayWed:"Mittwoch", ttDayThu:"Donnerstag",
    ttDayFri:"Freitag", ttDaySat:"Samstag", ttDaySun:"Sonntag",
    ttCatWork:"Arbeit", ttCatStudy:"Lernen", ttCatHealth:"Gesundheit", ttCatPersonal:"Persönlich",
    ttCatSocial:"Soziales", ttCatOther:"Sonstiges",
    tabSettings:"⚙️ Einstellungen",
    onboardingTitle:"Willkommen beim Life Tracker 🎉",
    onboardingSubtitle:"Richte dein Erlebnis in Sekunden ein.",
    onboardingStep1:"Wähle deine Sprache",
    onboardingStep2:"Wer bist du?",
    onboardingStep3:"Wähle ein Thema",
    onboardingFinish:"Los geht's →",
    genderFemale:"Weiblich", genderMale:"Männlich",
    settingsTitle:"⚙️ Einstellungen",
    settingsProfile:"👤 Profil",
    settingsGenderLabel:"Geschlecht",
    settingsGenderHint:"Der Zyklus-Tab wird nur für weibliche Nutzer angezeigt.",
    settingsLanguageTitle:"🌐 Sprache",
    settingsThemeTitle:"🎨 Design",
    settingsDangerZone:"⚠️ Gefahrenzone",
    settingsClearAllLabel:"Alle Daten löschen",
    settingsClearAllHint:"Löscht dauerhaft alle Gewohnheiten, Aufgaben, Stundenplan, Finanzen, Zyklus und Einkaufsdaten. Nicht rückgängig machbar.",
    settingsClearAllBtn:"🗑 Alle Daten löschen",
    settingsClearModalTitle:"Alle Daten löschen?",
    settingsClearModalDesc:"Hiermit werden ALLE Life Tracker Daten aus diesem Browser dauerhaft gelöscht. Nicht rückgängig machbar.",
    settingsClearModalConfirm:"Alles löschen",
    settingsSyncTitle:"🔄 Exportieren & Importieren",
    settingsSyncHint:"Exportiere deine Daten als JSON-Datei und importiere sie auf einem anderen Gerät, um Life Tracker zu synchronisieren.",
    settingsExportBtn:"Backup exportieren",
    settingsImportBtn:"Backup importieren",
    importModalTitle:"Backup importieren?",
        journalTitle:"📓 Tagesjournal",
    journalMoodLabel:"Wie war heute?",
    journalPlaceholder:"Was ist heute passiert? Schon 2–3 Sätze ergeben im Laufe der Zeit ein kraftvolles Tagebuch…",
    journalSaveBtn:"Eintrag speichern",
    journalNoEntries:"Noch keine Journaleinträge. Fang jetzt an!",
    journalRecentTitle:"Letzte Einträge",
    journalToday:"Heute",
    journalYesterday:"Gestern",
    journalDaysAgo:(n)=>`vor ${n} Tagen`,
    journalNoNote:"(nur Stimmung)",
    journalNotePlaceholder:"Notiz für heute hinzufügen…",
  },
  es: {
    monthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    monthShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    days:["Lu","Ma","Mi","Ju","Vi","Sá","Do"],
    subtitle:"— Rastreador de Vida —",
    tabTracker:"📊 Seguimiento de Hábitos", tabDays:"Días", tabTasks:"✅ Tareas", tabAnalysis:"📈 Análisis",
    habitsSubtabHabits:"💪 Hábitos", habitsSubtabAnalysis:"📈 Análisis",
    scopeDaily:"☀️ Diario", scopeWeekly:"📅 Semanal", scopeMonthly:"🗓 Mensual", scopeYearly:"📆 Anual",
    pomoSessionsLabel:"Sesiones", pomoFocusLabel:"Tiempo enfocado", pomoBreaksLabel:"Pausas",
    pomoHint:"Espacio: iniciar · Esc: cerrar",
    pomodoroBtn:"⏱ Pomodoro",
    statHabits:"Hábitos", statCompleted:"Completado", statProgress:"Progreso", statTasksDone:"Tareas",
    myHabits:"Mis Hábitos",
    addHabitPlaceholder:"Añadir un hábito…", addHabitBtn:"+ Añadir",
    thisDay:"Este día", todayBadge:"Hoy",
    mindsetTitle:"Check-In Diario", energy:"Energía", focus:"Enfoque", mood:"Ánimo", motivation:"Motivación",
    tasksThisWeek:"📋 Tareas de esta semana",
    filterAll:"Todas", filterHigh:"🔴 Alta", filterMedium:"⚡ Media", filterLow:"🔵 Baja",
    taskNameLabel:"Nombre de tarea", taskNamePlaceholder:"¿Qué hay que hacer?",
    priorityLabel:"Prioridad", dueDateLabel:"Fecha límite", statusLabel:"Estado", addTaskBtn:"+ Añadir tarea",
    priorityHigh:"🔴 Alta Prioridad", priorityMedium:"⚡ Prioridad Media", priorityLow:"🔵 Baja Prioridad",
    statusInProgress:"En curso", statusNotStarted:"Sin empezar", statusCompleted:"Completado",
    noTasks:"Sin tareas. ¡Añade una!",
    dailyConsistency:"Consistencia Diaria",
    mindsetTrackerTitle:"Rastreador Mental — Energía · Enfoque · Motivación",
    habitBreakdown:"Desglose de Hábitos",
    goalsThisMonth:"Metas del Mes 🎯", goalPlaceholder:"Añadir meta mensual…", addGoalBtn:"+ Añadir Meta",
    weeklyScore:"Puntuación Semanal", overallProgress:"Progreso Total",
    crossStatsTitle:"🔗 Estadísticas Cruzadas", calGoalToday:"Meta de Calorías de Hoy", workoutStreak:"🔥 Racha de Entrenamiento", daysUnit:"días",
    weekPrefix:"Semana", weekShort:"Sem",
    session:"Sesión", focusTime:"Tiempo de Enfoque",
    pomodoroMode:"Pomodoro", shortBreak:"Descanso Corto", longBreak:"Descanso Largo",
    startBtn:"▶ Iniciar", pauseBtn:"⏸ Pausa", resetBtn:"↺ Reiniciar",
    saved:"✓ Guardado",
    completedStat:"completado", habitsStat:"hábitos", daysStat:"días",
    dueToday:"Hoy", dueTomorrow:"Mañana",
    dueOverdue:(n)=>`${n}d de retraso`, dueFuture:(n)=>`En ${n} días`,
    langLabel:"ES 🇪🇸",
    tabTimetable:"🗓 Horario", tabShopping:"🛒 Compras", tabCycle:"🌸 Ciclo", tabFinance:"💰 Finanzas", tabRecipes:"📖 Recetas",
    shopTitle:"🛒 Lista de compras", shopGrocery:"🥦 Supermercado", shopHousehold:"🏠 Hogar",
    shopPersonal:"💄 Personal", shopOther:"📦 Otros",
    shopItemName:"Nombre del artículo", shopItemPlaceholder:"Añadir artículo…", shopQty:"Cant.",
    shopCategory:"Categoría", shopAddItem:"+ Añadir", shopClearChecked:"🗑 Borrar marcados",
    shopNoItems:"Sin artículos. ¡Añade uno!", shopNoItemsCat:"Sin artículos.",
    cycleNatural:"🌸 Ciclo Natural", cyclePill:"💊 Anticonceptivo",
    cycleSetBtn:"+ Configurar ciclo", cycleSaveDay:"💾 Guardar hoy",
    cycleSymptomsTitle:"💊 Síntomas de hoy", cycleMoodTitle:"💭 Humor y Notas",
    cycleNotesPlaceholder:"Notas para hoy…",
    cycleInsightsTitle:"📊 Análisis del ciclo", cycleHistoryTitle:"🗓 Historial",
    cyclePeriodPhase:"Fase Menstrual", cycleFertilePhase:"Ventana Fértil",
    cycleOvulationPhase:"Ovulación", cyclePmsPhase:"Lútea / SPM",
    cycleFollicularPhase:"Fase Folicular",
    cyclePeriodDesc:"Descansa y sé amable contigo.",
    cycleFertileDesc:"Alta energía. Ideal para planes sociales.",
    cycleOvulationDesc:"¡Energía máxima y confianza!",
    cyclePmsDesc:"Ve más despacio, prioriza el descanso.",
    cycleFollicularDesc:"¡La energía va subiendo!",
    cycleSetupHint:"Configura la fecha de inicio del ciclo.",
    cycleStartDateLabel:"Inicio del último período",
    cyclePeriodDurLabel:"Duración del período (días)",
    cycleLengthLabel:"Duración del ciclo (días)",
    cycleSymptoms:["🤕 Cólicos","😴 Fatiga","🤢 Náuseas","🎭 Cambios de humor","🍫 Antojos","💧 Hinchazón","🤯 Dolor de cabeza","💔 Sensibilidad mamaria","😰 Ansiedad","🥵 Sofocos","💤 Insomnio","✨ Alta energía"],
    cycleMoods:["😊","😌","😢","😠","😤","🥰","😶","🤩"],
    cycleMoodLabels:["Feliz","Tranquila","Triste","Irritable","Estresada","Amorosa","Indiferente","Enérgica"],
    cyclePillLegendActive:"Activa (21)", cyclePillLegendPlacebo:"Placebo (7)", cyclePillLegendTaken:"Tomada",
    cycleInsightsPackDay:"Día del blíster", cycleInsightsPillType:"Tipo de píldora", cycleInsightsTakenToday:"Tomada hoy",
    cycleInsightsNextPeriod:"Próxima regla", cycleInsightsCycleDay:"Día del ciclo", cycleInsightsCycleLen:"Longitud del ciclo",
    cycleInsightsOvulation:"Ovulación est.", cycleInsightsTakenYes:"✓ Sí", cycleInsightsTakenNo:"✗ Aún no",
    cycleInsightsDays:"días", cycleInsightsToday:"Hoy", cycleInsightsPassed:"Pasó", cycleInsightsOverdue:"Hoy / Atrasado",
    cycleInsightsActive:"Activa (Rosa)", cycleInsightsPlacebo:"Placebo (Blanca)",
    cycleHistoryNoData:"Sin ciclos registrados.", cyclePillHoverActive:"Píldora activa",
    cycleSetupTitle:"📅 Registrar inicio del ciclo",
    cycleInsightsTitleCard:"📊 Análisis del ciclo", cycleHistoryTitleCard:"🗓 Historial",
    cyclePillPackTitle:"💊 Blíster", cyclePillPackSetup:"Configura la fecha de inicio del ciclo",
    cycleStatusTitle:"🌸 Estado del ciclo",
    cyclePillCalLegendActive:"Activa", cyclePillCalLegendPlacebo:"Placebo",
    cycleIntimacyTitle:"💞 Registro de intimidad — Hoy",
    cycleIntimacyHistoryTitle:"Este mes",
    cycleIntimacyTypes:["💋 Beso","🛡 Sexo con protección","🔥 Sexo sin protección","💜 Oral","✨ Otra intimidad"],
    cycleIntimacyKeys:["kiss","protected","unprotected","oral","other"],
    cyclePregnancyTitle:"🤰 Posibilidad de embarazo",
    cyclePregnancyNoData:"Establece la fecha de inicio de tu ciclo para ver las estimaciones de riesgo.",
    cyclePregnancyRiskNone:"Mínimo",
    cyclePregnancyRiskLow:"Bajo",
    cyclePregnancyRiskMedium:"Medio",
    cyclePregnancyRiskHigh:"Alto",
    cyclePregnancyRiskVeryHigh:"Muy alto",
    cyclePregnancyFactorPhase:"Fase del ciclo",
    cyclePregnancyFactorContact:"Intimidad reciente",
    cyclePregnancyFactorProtection:"Protección usada",
    cyclePregnancyFactorPill:"Píldora activa",
    cyclePregnancyDisclaimer:"⚠️ Esta es una estimación basada solo en la fase del ciclo y la intimidad registrada. No es consejo médico. Consulta a un profesional de la salud para una evaluación precisa.",
    cyclePregnancyHistoryTitle:"Eventos de riesgo recientes",
    cyclePregnancyHistoryEmpty:"No se ha registrado intimidad sin protección en este ciclo.",
    cyclePregnancyPhaseLabels:{period:"Menstrual — muy bajo",follicular:"Folicular — bajo",fertile:"Ventana fértil — elevado",ovulation:"Ovulación — máximo",pms:"Lútea — muy bajo"},
    cyclePregnancyProtYes:"Sí — reducido",
    cyclePregnancyProtNo:"No — riesgo completo",
    cyclePregnancyPillYes:"Sí — muy bajo",
    cyclePregnancyPillNo:"No",
    cycleIntimacyDayLabel:"Día",
    cycleHistoryDayPeriod:"días de regla", cycleHistoryPredicted:"predicho",
    tabGoals:"🎯 Metas", tabTodo:"✅ Tareas",
    goalsDailyTitle:"Metas diarias", goalsDailySub:"Se reinician cada día",
    goalsWeeklyTitle:"Metas semanales", goalsWeeklySub:"Se reinician cada semana",
    goalsMonthlyTitle:"Metas mensuales", goalsMonthlySub:"Se reinician cada mes",
    goalsYearlyTitle:"Metas anuales", goalsYearlySub:"Grandes hitos del año",
    goalDailyPlaceholder:"Añadir meta diaria…", goalWeeklyPlaceholder:"Añadir meta semanal…",
    goalMonthlyPlaceholder:"Añadir meta mensual…", goalYearlyPlaceholder:"Añadir meta anual…",
    goalsEmpty:"Sin metas aún. ¡Añade una!",
    todoTitle:"✅ Lista de tareas", todoPlaceholder:"¿Qué hay que hacer?",
    todoFilterActive:"Activas", todoFilterDone:"Hechas", todoClearDone:"🗑 Borrar hechas",
    todoAddBtn:"+ Añadir", todoEmpty:"Nada aquí aún. ¡Añade tu primera tarea!",
    todoCatPersonal:"👤 Personal", todoCatWork:"💼 Trabajo", todoCatHealth:"💪 Salud",
    todoCatFinance:"💰 Finanzas", todoCatHome:"🏠 Hogar", todoCatOther:"📦 Otros",
    finTotalExpenses:"Total Gastos", finTotalIncome:"Total Ingresos", finBalance:"Balance",
    finMonthlyBudget:"Presupuesto Mensual", finExpenses:"Gastos", finIncome:"Ingresos",
    finToday:"Hoy", finThisWeek:"Esta semana", finThisMonth:"Este mes", finAll:"Todos",
    finDescription:"Aa Descripción", finAmount:"💲 Importe", finCategory:"🏷 Categoría", finSource:"🏷 Fuente",
    finNoExpenses:"Sin gastos aún. ¡Añade uno!", finNoIncome:"Sin ingresos aún. ¡Añade uno!",
    finDescPlaceholder:"Descripción…", finSourcePlaceholder:"Fuente…",
    finAddEntry:"+ Añadir", finBudgetBreakdown:"Desglose del presupuesto", finTotalSpent:"Total gastado",
    finSavingsGoals:"Metas de ahorro",
    finCatFood:"🍔 Comida", finCatHealth:"💊 Salud", finCatTransport:"🚗 Transporte",
    finCatEntertainment:"🎬 Entretenimiento", finCatUtilities:"⚡ Servicios", finCatHome:"🏠 Hogar",
    finCatDevelopment:"📚 Formación", finCatInvestment:"📈 Inversión", finCatOther:"📦 Otros",
    finIncSalary:"💼 Salario", finIncFreelance:"💻 Freelance", finIncInvestment:"📈 Inversión",
    finIncGift:"🎁 Regalo", finIncOther:"📦 Otros",
    finNewPage:"+ Nueva página", finBudgetModalTitle:"🎯 Establecer presupuesto mensual",
    finBudgetLabel:"Límite del presupuesto (€)", finBudgetCancel:"Cancelar", finBudgetSave:"💾 Guardar presupuesto",
    finSavNamePlaceholder:"Nombre del objetivo…", finSavTargetPlaceholder:"Objetivo €",
    ttTitle:"🗓 Horario semanal", ttEventTitle:"Título del evento", ttEventPlaceholder:"ej. Carrera matutina…",
    ttDay:"Día", ttAllDay:"Todo el día", ttStart:"Inicio", ttEnd:"Fin", ttCategory:"Categoría",
    ttAddEvent:"+ Añadir evento", ttEditBanner:"✎ Editando evento —", ttCancelEdit:"✕ Cancelar",
    ttClearAll:"Borrar todos los eventos", ttGcalTitle:"Importar desde Google Calendar",
    ttGcalSubtitle:"Obteniendo tus eventos de esta semana…", ttGcalConnecting:"Conectando con Google Calendar…",
    ttGcalSelected:"0 seleccionados", ttGcalSelectAll:"Seleccionar todo", ttGcalImport:"➕ Añadir al horario",
    ttConfirmTitle:"¿Borrar todos los eventos?",
    ttConfirmDesc:"Esto eliminará permanentemente todos los eventos del horario. Esta acción no se puede deshacer.",
    ttConfirmCancel:"Cancelar", ttConfirmDelete:"Eliminar todo",
    ttDayMon:"Lunes", ttDayTue:"Martes", ttDayWed:"Miércoles", ttDayThu:"Jueves",
    ttDayFri:"Viernes", ttDaySat:"Sábado", ttDaySun:"Domingo",
    ttCatWork:"Trabajo", ttCatStudy:"Estudio", ttCatHealth:"Salud", ttCatPersonal:"Personal",
    ttCatSocial:"Social", ttCatOther:"Otro",
    tabSettings:"⚙️ Ajustes",
    onboardingTitle:"Bienvenido a Life Tracker 🎉",
    onboardingSubtitle:"Configura tu experiencia en segundos.",
    onboardingStep1:"Elige tu idioma",
    onboardingStep2:"¿Quién eres?",
    onboardingStep3:"Elige un tema",
    onboardingFinish:"Empezar →",
    genderFemale:"Femenino", genderMale:"Masculino",
    settingsTitle:"⚙️ Ajustes",
    settingsProfile:"👤 Perfil",
    settingsGenderLabel:"Género",
    settingsGenderHint:"La pestaña Ciclo solo se muestra para usuarias femeninas.",
    settingsLanguageTitle:"🌐 Idioma",
    settingsThemeTitle:"🎨 Tema",
    settingsDangerZone:"⚠️ Zona de peligro",
    settingsClearAllLabel:"Eliminar todos los datos",
    settingsClearAllHint:"Eliminará permanentemente todos tus hábitos, tareas, horario, finanzas, ciclo y lista de compras. No se puede deshacer.",
    settingsClearAllBtn:"🗑 Eliminar todo",
    settingsClearModalTitle:"¿Eliminar todos los datos?",
    settingsClearModalDesc:"Esto borrará TODOS los datos de Life Tracker de este navegador. No se puede deshacer.",
    settingsClearModalConfirm:"Eliminar todo",
    settingsSyncTitle:"🔄 Exportar e Importar",
    settingsSyncHint:"Exporta una copia de seguridad de tus datos como archivo JSON e impórtala en otro dispositivo para sincronizar Life Tracker.",
    settingsExportBtn:"Exportar copia de seguridad",
    settingsImportBtn:"Importar copia de seguridad",
    importModalTitle:"¿Importar copia de seguridad?",
        journalTitle:"📓 Diario Personal",
    journalMoodLabel:"¿Cómo fue hoy?",
    journalPlaceholder:"¿Qué pasó hoy? Con 2–3 frases ya construyes un poderoso registro con el tiempo…",
    journalSaveBtn:"Guardar entrada",
    journalNoEntries:"Aún no hay entradas. ¡Empieza a escribir!",
    journalRecentTitle:"Entradas recientes",
    journalToday:"Hoy",
    journalYesterday:"Ayer",
    journalDaysAgo:(n)=>`Hace ${n} días`,
    journalNoNote:"(solo ánimo)",
    journalNotePlaceholder:"Añadir una nota de hoy…",
  },
  fr: {
    monthNames:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
    monthShort:["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],
    days:["Lu","Ma","Me","Je","Ve","Sa","Di"],
    subtitle:"— Suivi de Vie —",
    tabTracker:"📊 Suivi des Habitudes", tabDays:"Jours", tabTasks:"✅ Tâches", tabAnalysis:"📈 Analyse",
    habitsSubtabHabits:"💪 Habitudes", habitsSubtabAnalysis:"📈 Analyse",
    scopeDaily:"☀️ Quotidien", scopeWeekly:"📅 Hebdomadaire", scopeMonthly:"🗓 Mensuel", scopeYearly:"📆 Annuel",
    pomoSessionsLabel:"Séances", pomoFocusLabel:"Temps de focus", pomoBreaksLabel:"Pauses",
    pomoHint:"Espace : démarrer · Esc : fermer",
    pomodoroBtn:"⏱ Pomodoro",
    statHabits:"Habitudes", statCompleted:"Complété", statProgress:"Progrès", statTasksDone:"Tâches",
    myHabits:"Mes Habitudes",
    addHabitPlaceholder:"Ajouter une habitude…", addHabitBtn:"+ Ajouter",
    thisDay:"Ce jour", todayBadge:"Aujourd'hui",
    mindsetTitle:"Bilan Quotidien", energy:"Énergie", focus:"Concentration", mood:"Humeur", motivation:"Motivation",
    tasksThisWeek:"📋 Tâches cette semaine",
    filterAll:"Toutes", filterHigh:"🔴 Haute", filterMedium:"⚡ Moyenne", filterLow:"🔵 Basse",
    taskNameLabel:"Nom de la tâche", taskNamePlaceholder:"Que faut-il faire ?",
    priorityLabel:"Priorité", dueDateLabel:"Date d'échéance", statusLabel:"Statut", addTaskBtn:"+ Ajouter tâche",
    priorityHigh:"🔴 Haute Priorité", priorityMedium:"⚡ Priorité Moyenne", priorityLow:"🔵 Basse Priorité",
    statusInProgress:"En cours", statusNotStarted:"Non commencé", statusCompleted:"Terminé",
    noTasks:"Aucune tâche. Ajoutez-en une !",
    dailyConsistency:"Cohérence Quotidienne",
    mindsetTrackerTitle:"Suivi Mental — Énergie · Concentration · Motivation",
    habitBreakdown:"Détail des Habitudes",
    goalsThisMonth:"Objectifs du Mois 🎯", goalPlaceholder:"Ajouter un objectif mensuel…", addGoalBtn:"+ Ajouter Objectif",
    weeklyScore:"Score Hebdomadaire", overallProgress:"Progrès Global",
    crossStatsTitle:"🔗 Statistiques Croisées", calGoalToday:"Objectif Calories Aujourd'hui", workoutStreak:"🔥 Série d'Entraînement", daysUnit:"jours",
    weekPrefix:"Semaine", weekShort:"Sem",
    session:"Séance", focusTime:"Temps de Focus",
    pomodoroMode:"Pomodoro", shortBreak:"Courte Pause", longBreak:"Longue Pause",
    startBtn:"▶ Démarrer", pauseBtn:"⏸ Pause", resetBtn:"↺ Réinitialiser",
    saved:"✓ Sauvegardé",
    completedStat:"complété", habitsStat:"habitudes", daysStat:"jours",
    dueToday:"Aujourd'hui", dueTomorrow:"Demain",
    dueOverdue:(n)=>`${n}j de retard`, dueFuture:(n)=>`Dans ${n} jours`,
    langLabel:"FR 🇫🇷",
    tabTimetable:"🗓 Emploi du temps", tabShopping:"🛒 Courses", tabCycle:"🌸 Cycle", tabFinance:"💰 Finances", tabRecipes:"📖 Recettes",
    shopTitle:"🛒 Liste de courses", shopGrocery:"🥦 Épicerie", shopHousehold:"🏠 Maison",
    shopPersonal:"💄 Personnel", shopOther:"📦 Autre",
    shopItemName:"Nom de l'article", shopItemPlaceholder:"Ajouter un article…", shopQty:"Qté",
    shopCategory:"Catégorie", shopAddItem:"+ Ajouter", shopClearChecked:"🗑 Supprimer cochés",
    shopNoItems:"Aucun article. Ajoutez-en un!", shopNoItemsCat:"Aucun article.",
    cycleNatural:"🌸 Cycle Naturel", cyclePill:"💊 Contraceptif",
    cycleSetBtn:"+ Configurer cycle", cycleSaveDay:"💾 Enregistrer aujourd'hui",
    cycleSymptomsTitle:"💊 Symptômes du jour", cycleMoodTitle:"💭 Humeur & Notes",
    cycleNotesPlaceholder:"Notes pour aujourd'hui…",
    cycleInsightsTitle:"📊 Aperçu du cycle", cycleHistoryTitle:"🗓 Historique",
    cyclePeriodPhase:"Phase Menstruelle", cycleFertilePhase:"Fenêtre Fertile",
    cycleOvulationPhase:"Ovulation", cyclePmsPhase:"Lutéale / SPM",
    cycleFollicularPhase:"Phase Folliculaire",
    cyclePeriodDesc:"Repose-toi et sois douce avec toi-même.",
    cycleFertileDesc:"Haute énergie. Idéal pour les projets sociaux.",
    cycleOvulationDesc:"Énergie et confiance au maximum!",
    cyclePmsDesc:"Ralentis, priorise le repos.",
    cycleFollicularDesc:"L'énergie monte!",
    cycleSetupHint:"Configure la date de début du cycle.",
    cycleStartDateLabel:"Début des dernières règles",
    cyclePeriodDurLabel:"Durée des règles (jours)",
    cycleLengthLabel:"Longueur du cycle (jours)",
    cycleSymptoms:["🤕 Crampes","😴 Fatigue","🤢 Nausées","🎭 Sautes d'humeur","🍫 Envies","💧 Ballonnements","🤯 Maux de tête","💔 Sensibilité mammaire","😰 Anxiété","🥵 Bouffées de chaleur","💤 Insomnie","✨ Haute énergie"],
    cycleMoods:["😊","😌","😢","😠","😤","🥰","😶","🤩"],
    cycleMoodLabels:["Heureuse","Calme","Triste","Irritable","Stressée","Aimante","Engourdissement","Énergique"],
    cyclePillLegendActive:"Active (21)", cyclePillLegendPlacebo:"Placebo (7)", cyclePillLegendTaken:"Prise",
    cycleInsightsPackDay:"Jour du pack", cycleInsightsPillType:"Type de pilule", cycleInsightsTakenToday:"Prise aujourd'hui",
    cycleInsightsNextPeriod:"Prochaines règles", cycleInsightsCycleDay:"Jour du cycle", cycleInsightsCycleLen:"Longueur du cycle",
    cycleInsightsOvulation:"Ovulation est.", cycleInsightsTakenYes:"✓ Oui", cycleInsightsTakenNo:"✗ Pas encore",
    cycleInsightsDays:"jours", cycleInsightsToday:"Aujourd'hui", cycleInsightsPassed:"Passé", cycleInsightsOverdue:"Aujourd'hui / En retard",
    cycleInsightsActive:"Active (Rose)", cycleInsightsPlacebo:"Placebo (Blanche)",
    cycleHistoryNoData:"Aucun cycle enregistré.", cyclePillHoverActive:"Pilule active",
    cycleSetupTitle:"📅 Enregistrer début du cycle",
    cycleInsightsTitleCard:"📊 Aperçu du cycle", cycleHistoryTitleCard:"🗓 Historique",
    cyclePillPackTitle:"💊 Plaquette", cyclePillPackSetup:"Configurez la date de début du cycle",
    cycleStatusTitle:"🌸 Statut du cycle",
    cyclePillCalLegendActive:"Active", cyclePillCalLegendPlacebo:"Placebo",
    cycleIntimacyTitle:"💞 Journal d'intimité — Aujourd'hui",
    cycleIntimacyHistoryTitle:"Ce mois-ci",
    cycleIntimacyTypes:["💋 Bisou","🛡 Rapports protégés","🔥 Rapports non protégés","💜 Oral","✨ Autre intimité"],
    cycleIntimacyKeys:["kiss","protected","unprotected","oral","other"],
    cyclePregnancyTitle:"🤰 Probabilité de grossesse",
    cyclePregnancyNoData:"Définissez la date de début de votre cycle pour voir les estimations de risque.",
    cyclePregnancyRiskNone:"Minimal",
    cyclePregnancyRiskLow:"Faible",
    cyclePregnancyRiskMedium:"Moyen",
    cyclePregnancyRiskHigh:"Élevé",
    cyclePregnancyRiskVeryHigh:"Très élevé",
    cyclePregnancyFactorPhase:"Phase du cycle",
    cyclePregnancyFactorContact:"Intimité récente",
    cyclePregnancyFactorProtection:"Protection utilisée",
    cyclePregnancyFactorPill:"Pilule active",
    cyclePregnancyDisclaimer:"⚠️ Ceci est une estimation basée uniquement sur la phase du cycle et l'intimité enregistrée. Ce n'est pas un avis médical. Consultez un professionnel de santé pour une évaluation précise.",
    cyclePregnancyHistoryTitle:"Événements à risque récents",
    cyclePregnancyHistoryEmpty:"Aucune intimité non protégée enregistrée dans ce cycle.",
    cyclePregnancyPhaseLabels:{period:"Menstruelle — très faible",follicular:"Folliculaire — faible",fertile:"Fenêtre fertile — élevé",ovulation:"Ovulation — maximum",pms:"Lutéale — très faible"},
    cyclePregnancyProtYes:"Oui — réduit",
    cyclePregnancyProtNo:"Non — risque complet",
    cyclePregnancyPillYes:"Oui — très faible",
    cyclePregnancyPillNo:"Non",
    cycleIntimacyDayLabel:"Jour",
    cycleHistoryDayPeriod:"jours de règles", cycleHistoryPredicted:"prédit",
    tabGoals:"🎯 Objectifs", tabTodo:"✅ À faire",
    goalsDailyTitle:"Objectifs quotidiens", goalsDailySub:"Remis à zéro chaque jour",
    goalsWeeklyTitle:"Objectifs hebdomadaires", goalsWeeklySub:"Remis à zéro chaque semaine",
    goalsMonthlyTitle:"Objectifs mensuels", goalsMonthlySub:"Remis à zéro chaque mois",
    goalsYearlyTitle:"Objectifs annuels", goalsYearlySub:"Grandes étapes de l'année",
    goalDailyPlaceholder:"Ajouter un objectif quotidien…", goalWeeklyPlaceholder:"Ajouter un objectif hebdomadaire…",
    goalMonthlyPlaceholder:"Ajouter un objectif mensuel…", goalYearlyPlaceholder:"Ajouter un objectif annuel…",
    goalsEmpty:"Aucun objectif. Ajoutez-en un !",
    todoTitle:"✅ Liste de tâches", todoPlaceholder:"Que faut-il faire ?",
    todoFilterActive:"Actives", todoFilterDone:"Faites", todoClearDone:"🗑 Supprimer faites",
    todoAddBtn:"+ Ajouter", todoEmpty:"Rien ici encore. Ajoutez votre première tâche !",
    todoCatPersonal:"👤 Personnel", todoCatWork:"💼 Travail", todoCatHealth:"💪 Santé",
    todoCatFinance:"💰 Finances", todoCatHome:"🏠 Maison", todoCatOther:"📦 Autre",
    finTotalExpenses:"Total Dépenses", finTotalIncome:"Total Revenus", finBalance:"Solde",
    finMonthlyBudget:"Budget Mensuel", finExpenses:"Dépenses", finIncome:"Revenus",
    finToday:"Aujourd'hui", finThisWeek:"Cette semaine", finThisMonth:"Ce mois-ci", finAll:"Tout",
    finDescription:"Aa Description", finAmount:"💲 Montant", finCategory:"🏷 Catégorie", finSource:"🏷 Source",
    finNoExpenses:"Aucune dépense. Ajoutez-en une !", finNoIncome:"Aucun revenu. Ajoutez-en un !",
    finDescPlaceholder:"Description…", finSourcePlaceholder:"Source…",
    finAddEntry:"+ Ajouter", finBudgetBreakdown:"Détail du budget", finTotalSpent:"Total dépensé",
    finSavingsGoals:"Objectifs d'épargne",
    finCatFood:"🍔 Nourriture", finCatHealth:"💊 Santé", finCatTransport:"🚗 Transport",
    finCatEntertainment:"🎬 Loisirs", finCatUtilities:"⚡ Charges", finCatHome:"🏠 Maison",
    finCatDevelopment:"📚 Formation", finCatInvestment:"📈 Investissement", finCatOther:"📦 Autre",
    finIncSalary:"💼 Salaire", finIncFreelance:"💻 Freelance", finIncInvestment:"📈 Investissement",
    finIncGift:"🎁 Cadeau", finIncOther:"📦 Autre",
    finNewPage:"+ Nouvelle page", finBudgetModalTitle:"🎯 Définir le budget mensuel",
    finBudgetLabel:"Limite du budget (€)", finBudgetCancel:"Annuler", finBudgetSave:"💾 Enregistrer le budget",
    finSavNamePlaceholder:"Nom de l'objectif…", finSavTargetPlaceholder:"Objectif €",
    ttTitle:"🗓 Emploi du temps hebdomadaire", ttEventTitle:"Titre de l'événement", ttEventPlaceholder:"ex. Course du matin…",
    ttDay:"Jour", ttAllDay:"Toute la journée", ttStart:"Début", ttEnd:"Fin", ttCategory:"Catégorie",
    ttAddEvent:"+ Ajouter un événement", ttEditBanner:"✎ Modification de l'événement —", ttCancelEdit:"✕ Annuler",
    ttClearAll:"Supprimer tous les événements", ttGcalTitle:"Importer depuis Google Agenda",
    ttGcalSubtitle:"Récupération de vos événements pour cette semaine…", ttGcalConnecting:"Connexion à Google Agenda…",
    ttGcalSelected:"0 sélectionné", ttGcalSelectAll:"Tout sélectionner", ttGcalImport:"➕ Ajouter à l'emploi du temps",
    ttConfirmTitle:"Supprimer tous les événements ?",
    ttConfirmDesc:"Cela supprimera définitivement tous les événements de votre emploi du temps. Cette action est irréversible.",
    ttConfirmCancel:"Annuler", ttConfirmDelete:"Tout supprimer",
    ttDayMon:"Lundi", ttDayTue:"Mardi", ttDayWed:"Mercredi", ttDayThu:"Jeudi",
    ttDayFri:"Vendredi", ttDaySat:"Samedi", ttDaySun:"Dimanche",
    ttCatWork:"Travail", ttCatStudy:"Études", ttCatHealth:"Santé", ttCatPersonal:"Personnel",
    ttCatSocial:"Social", ttCatOther:"Autre",
    tabSettings:"⚙️ Paramètres",
    onboardingTitle:"Bienvenue dans Life Tracker 🎉",
    onboardingSubtitle:"Configurez votre expérience en quelques secondes.",
    onboardingStep1:"Choisissez votre langue",
    onboardingStep2:"Qui êtes-vous ?",
    onboardingStep3:"Choisissez un thème",
    onboardingFinish:"Commencer →",
    genderFemale:"Féminin", genderMale:"Masculin",
    settingsTitle:"⚙️ Paramètres",
    settingsProfile:"👤 Profil",
    settingsGenderLabel:"Genre",
    settingsGenderHint:"L'onglet Cycle n'est visible que pour les utilisatrices féminines.",
    settingsLanguageTitle:"🌐 Langue",
    settingsThemeTitle:"🎨 Thème",
    settingsDangerZone:"⚠️ Zone de danger",
    settingsClearAllLabel:"Supprimer toutes les données",
    settingsClearAllHint:"Supprimera définitivement toutes vos habitudes, tâches, emplois du temps, finances, cycle et listes de courses. Irréversible.",
    settingsClearAllBtn:"🗑 Tout supprimer",
    settingsClearModalTitle:"Supprimer toutes les données ?",
    settingsClearModalDesc:"Cela effacera TOUTES les données Life Tracker de ce navigateur. Action irréversible.",
    settingsClearModalConfirm:"Tout effacer",
    settingsSyncTitle:"🔄 Exporter & Importer",
    settingsSyncHint:"Exportez une sauvegarde de vos données en JSON, puis importez-la sur n'importe quel appareil pour synchroniser Life Tracker.",
    settingsExportBtn:"Exporter la sauvegarde",
    settingsImportBtn:"Importer la sauvegarde",
    importModalTitle:"Importer la sauvegarde ?",
        journalTitle:"📓 Journal Quotidien",
    journalMoodLabel:"Comment était aujourd'hui ?",
    journalPlaceholder:"Qu'est-il arrivé aujourd'hui ? Même 2–3 phrases forment un précieux journal sur la durée…",
    journalSaveBtn:"Enregistrer",
    journalNoEntries:"Pas encore d'entrées. Commence à écrire !",
    journalRecentTitle:"Entrées récentes",
    journalToday:"Aujourd'hui",
    journalYesterday:"Hier",
    journalDaysAgo:(n)=>`Il y a ${n} jours`,
    journalNoNote:"(humeur seulement)",
    journalNotePlaceholder:"Ajouter une note pour aujourd'hui…",
  }
};

function t(key){ return (TRANSLATIONS[state.lang]||TRANSLATIONS.en)[key] || TRANSLATIONS.en[key] || key; }
function getDays(){ return t('days'); }
function getMonthNames(){ return t('monthNames'); }
function getMonthShort(){ return t('monthShort'); }

const THEME_WEEK_COLORS = {
  dark:    ["#4f6ef7","#e05a9a","#3ecfb2","#f5a623","#a78bfa","#e07a3a"],
  light:   ["#4060e8","#d0407a","#28b898","#d08010","#8060d8","#c05820"],
  forest:  ["#30d870","#80f040","#20c890","#a0e840","#50e8a0","#60d040"],
  sakura:  ["#ff60b0","#ff90c8","#e040a0","#ff70d8","#d850b8","#ff80a0"],
  ocean:   ["#20c8f8","#40e0d0","#2090e8","#30d8f0","#50a8ff","#00e8c8"],
  sunset:  ["#ff8020","#ff5030","#ffb030","#ff3860","#ffa010","#ff6040"],
  midnight:["#a860f8","#e060e8","#8040d8","#c070ff","#9050e0","#d040c0"],
  amoled:  ["#00f0b0","#f000b0","#00b0f0","#f0a000","#b000f0","#00f050"],
  paper:   ["#7060a0","#a05060","#407870","#906820","#604890","#806040"],
  slate:   ["#4898d8","#6878c8","#38a8c8","#5888e8","#4878b8","#5898c8"],
};
const THEME_WEEK_BG = {
  dark:    ["rgba(79,110,247,.09)","rgba(224,90,154,.09)","rgba(62,207,178,.09)","rgba(245,166,35,.09)","rgba(167,139,250,.09)","rgba(224,122,58,.09)"],
  light:   ["rgba(64,96,232,.07)","rgba(208,64,122,.07)","rgba(40,184,152,.07)","rgba(208,128,16,.07)","rgba(128,96,216,.07)","rgba(192,88,32,.07)"],
  forest:  ["rgba(48,216,112,.13)","rgba(128,240,64,.11)","rgba(32,200,144,.11)","rgba(160,232,64,.09)","rgba(80,232,160,.11)","rgba(96,208,64,.09)"],
  sakura:  ["rgba(255,96,176,.13)","rgba(255,144,200,.11)","rgba(224,64,160,.11)","rgba(255,112,216,.09)","rgba(216,80,184,.11)","rgba(255,128,160,.09)"],
  ocean:   ["rgba(32,200,248,.13)","rgba(64,224,208,.11)","rgba(32,144,232,.11)","rgba(48,216,240,.09)","rgba(80,168,255,.11)","rgba(0,232,200,.09)"],
  sunset:  ["rgba(255,128,32,.14)","rgba(255,80,48,.12)","rgba(255,176,48,.12)","rgba(255,56,96,.10)","rgba(255,160,16,.12)","rgba(255,96,64,.10)"],
  midnight:["rgba(168,96,248,.13)","rgba(224,96,232,.11)","rgba(128,64,216,.11)","rgba(192,112,255,.09)","rgba(144,80,224,.11)","rgba(208,64,192,.09)"],
  amoled:  ["rgba(0,240,176,.10)","rgba(240,0,176,.09)","rgba(0,176,240,.09)","rgba(240,160,0,.08)","rgba(176,0,240,.09)","rgba(0,240,80,.08)"],
  paper:   ["rgba(112,96,160,.08)","rgba(160,80,96,.07)","rgba(64,120,112,.07)","rgba(144,104,32,.06)","rgba(96,72,144,.07)","rgba(128,96,64,.06)"],
  slate:   ["rgba(72,152,216,.09)","rgba(104,120,200,.08)","rgba(56,168,200,.08)","rgba(88,136,232,.07)","rgba(72,120,184,.08)","rgba(88,152,200,.07)"],
};
function getThemeName(){
  const cls=document.body.className;
  const match=cls.match(/theme-(\w+)/);
  return match?match[1]:'dark';
}
function getWeekColors(){ return THEME_WEEK_COLORS[getThemeName()]||THEME_WEEK_COLORS.dark; }
function getWeekBg(){ return THEME_WEEK_BG[getThemeName()]||THEME_WEEK_BG.dark; }
const CIRC=2*Math.PI*42;
const POMO_CIRC=2*Math.PI*52;

let saveTimer=null,editingHabit=null,taskFilter="all",taskScope="daily",trackerScope="weekly",currentWeekIdx=null,ttWeekIdx=null,dailyDayView=null;
// ttWeekStart: a Date (Monday 00:00:00) for the timetable's currently displayed week.
// Null means "use the week containing today".
let ttWeekStart=null;
function getTTWeekMonday(d){
  const dt=new Date(d); dt.setHours(0,0,0,0);
  const dow=dt.getDay();
  const offset=dow===0?-6:1-dow;
  dt.setDate(dt.getDate()+offset);
  return dt;
}
function fmtDate(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function getTTWeekDates(){
  const mon = ttWeekStart || getTTWeekMonday(new Date());
  return Array.from({length:7},(_,i)=>{ const d=new Date(mon); d.setDate(mon.getDate()+i); return d; });
}
let editingTTId=null, editingTaskId=null;
const NOW=new Date();

let state={
  year:NOW.getFullYear(), month:NOW.getMonth(), lang:"en",
  habits:[],
  checked:{}, mindset:{},
  tasks:[],
  goals:[],
  tab:CURRENT_PAGE, taskIdCtr:1, goalIdCtr:1,
  shopItems:[], shopIdCtr:1,
  goalsDaily:[], goalsDailyCtr:1,
  goalsWeekly:[], goalsWeeklyCtr:1,
  goalsMonthly:[], goalsMonthlyCtr:1,
  goalsYearly:[], goalsYearlyCtr:1,
  todos:[], todoCtr:1,
  cycleData:{ periods:[], days:{}, cycleLen:28, mode:"natural", takenPills:{} },
  timetable:[], ttIdCtr:1,
  journal:{}
};

const K={
  habits:()=>"ht_habits_v4",
  checked:()=>`ht_checked_v4_${state.year}_${state.month}`,
  mindset:()=>`ht_mindset_v4_${state.year}_${state.month}`,
  tasks:()=>"ht_tasks_v4",
  goals:()=>`ht_goals_v4_${state.year}_${state.month}`,
  lang:()=>"ht_lang_v4",
  timetable:()=>"ht_timetable_v1"
};
function saveAll(){
  invalidateStreakCache();
  try{
    localStorage.setItem(K.habits(),JSON.stringify(state.habits));
    localStorage.setItem(K.checked(),JSON.stringify(state.checked));
    localStorage.setItem(K.mindset(),JSON.stringify(state.mindset));
    localStorage.setItem(K.tasks(),JSON.stringify({tasks:state.tasks,ctr:state.taskIdCtr}));
    localStorage.setItem(K.goals(),JSON.stringify({goals:state.goals,ctr:state.goalIdCtr}));
    localStorage.setItem(K.lang(),state.lang);
    localStorage.setItem(K.timetable(),JSON.stringify({tt:state.timetable,ctr:state.ttIdCtr}));
    saveNav();
    localStorage.setItem('ht_goals_ext_v1',JSON.stringify({daily:state.goalsDaily,dCtr:state.goalsDailyCtr,weekly:state.goalsWeekly,wCtr:state.goalsWeeklyCtr,monthly:state.goalsMonthly,mCtr:state.goalsMonthlyCtr,yearly:state.goalsYearly,yCtr:state.goalsYearlyCtr}));
    localStorage.setItem('ht_todos_v1',JSON.stringify({todos:state.todos,ctr:state.todoCtr}));
    localStorage.setItem('ht_journal_v1',JSON.stringify(state.journal));
  }catch(e){}
  flashSaved();
}
function loadAll(){
  loadUserPrefs();
  loadNav();
  try{const l=localStorage.getItem(K.lang());if(l&&TRANSLATIONS[l])state.lang=l;}catch(e){}
  try{const h=localStorage.getItem(K.habits());if(h)state.habits=JSON.parse(h);}catch(e){}
  loadMonthData();
  try{const t=localStorage.getItem(K.tasks());if(t){const p=JSON.parse(t);state.tasks=p.tasks;state.taskIdCtr=p.ctr;}}catch(e){}
  loadShop();
  loadCycle();
  try{const eg=JSON.parse(localStorage.getItem('ht_goals_ext_v1')||'null');if(eg){state.goalsDaily=eg.daily||[];state.goalsDailyCtr=eg.dCtr||1;state.goalsWeekly=eg.weekly||[];state.goalsWeeklyCtr=eg.wCtr||1;state.goalsMonthly=eg.monthly||[];state.goalsMonthlyCtr=eg.mCtr||1;state.goalsYearly=eg.yearly||[];state.goalsYearlyCtr=eg.yCtr||1;}}catch(e){}
  try{const td=JSON.parse(localStorage.getItem('ht_todos_v1')||'null');if(td){state.todos=td.todos||[];state.todoCtr=td.ctr||1;}}catch(e){}
  try{const ttd=JSON.parse(localStorage.getItem(K.timetable())||'null');if(ttd){state.timetable=ttd.tt||[];state.ttIdCtr=ttd.ctr||1;}}catch(e){}
  try{const jd=JSON.parse(localStorage.getItem('ht_journal_v1')||'null');if(jd&&typeof jd==='object')state.journal=jd;}catch(e){}
  // Purge legacy events that have no date (they pre-date week-aware storage)
  state.timetable=state.timetable.filter(ev=>!!ev.date);
}
function loadMonthData(){
  try{const c=localStorage.getItem(K.checked());state.checked=c?JSON.parse(c):{};}catch(e){state.checked={};}
  try{const m=localStorage.getItem(K.mindset());state.mindset=m?JSON.parse(m):{};}catch(e){state.mindset={};}
  try{const g=localStorage.getItem(K.goals());if(g){const p=JSON.parse(g);state.goals=p.goals;state.goalIdCtr=p.ctr;}}catch(e){}
}
function flashSaved(){
  const el=document.getElementById("save-indicator");
  el.textContent=t('saved');
  el.classList.remove("show");void el.offsetWidth;el.classList.add("show");
  clearTimeout(saveTimer);saveTimer=setTimeout(()=>el.classList.remove("show"),1700);
}

function applyTranslations(){
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.dataset.i18n;
    if(tr[key]!==undefined&&typeof tr[key]==='string') el.textContent=tr[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key=el.dataset.i18nPlaceholder;
    if(tr[key]) el.placeholder=tr[key];
  });
  document.getElementById('lang-btn').innerHTML=`🌐 ${tr.langLabel} ▾`;
  document.querySelectorAll('.lang-option').forEach(opt=>{
    opt.classList.toggle('active',opt.dataset.lang===state.lang);
  });
  const ps=document.getElementById('task-priority-select');
  if(ps){ps.options[0].text=tr.priorityHigh||'🔴 High';ps.options[1].text=tr.priorityMedium||'⚡ Medium';ps.options[2].text=tr.priorityLow||'🔵 Low';}
  const ss=document.getElementById('task-status-select');
  if(ss){ss.options[0].text=tr.statusNotStarted||'Not Started';ss.options[1].text=tr.statusInProgress||'In Progress';}
  if(pomoRunning){document.getElementById('pomo-start').textContent=tr.pauseBtn||'⏸ Pause';}
  else{document.getElementById('pomo-start').textContent=tr.startBtn||'▶ Start';}
  document.getElementById('pomo-reset').textContent=tr.resetBtn||'↺ Reset';
  const mh=document.getElementById('my-habits-header');if(mh)mh.textContent=tr.myHabits||'My Habits';
  document.getElementById('save-indicator').textContent=tr.saved||'✓ Saved';
  // Shopping category select options
  const shopCatSel=document.getElementById('shop-cat-select');
  if(shopCatSel){
    const catKeys=['shopGrocery','shopHousehold','shopPersonal','shopOther'];
    shopCatSel.querySelectorAll('option').forEach((opt,i)=>{if(tr[catKeys[i]])opt.text=tr[catKeys[i]];});
  }
  // Timetable day select options
  const ttDaySel=document.getElementById('tt-day-select');
  if(ttDaySel){
    const dayKeys=['ttDayMon','ttDayTue','ttDayWed','ttDayThu','ttDayFri','ttDaySat','ttDaySun'];
    ttDaySel.querySelectorAll('option').forEach((opt,i)=>{if(tr[dayKeys[i]])opt.text=tr[dayKeys[i]];});
  }
  // Timetable category select options
  const ttCatSel=document.getElementById('tt-cat-select');
  if(ttCatSel){
    const ttCatKeys=['ttCatWork','ttCatStudy','ttCatHealth','ttCatPersonal','ttCatSocial','ttCatOther'];
    ttCatSel.querySelectorAll('option').forEach((opt,i)=>{if(tr[ttCatKeys[i]])opt.text=tr[ttCatKeys[i]];});
  }
  // Finance expense category select options
  const finExpCat=document.getElementById('fin-exp-cat');
  if(finExpCat){
    const expCatKeys=['finCatFood','finCatHealth','finCatTransport','finCatEntertainment','finCatUtilities','finCatHome','finCatDevelopment','finCatInvestment','finCatOther'];
    finExpCat.querySelectorAll('option').forEach((opt,i)=>{if(tr[expCatKeys[i]])opt.text=tr[expCatKeys[i]];});
  }
  // Finance income category select options
  const finIncCat=document.getElementById('fin-inc-cat');
  if(finIncCat){
    const incCatKeys=['finIncSalary','finIncFreelance','finIncInvestment','finIncGift','finIncOther'];
    finIncCat.querySelectorAll('option').forEach((opt,i)=>{if(tr[incCatKeys[i]])opt.text=tr[incCatKeys[i]];});
  }
  // Re-render shopping/cycle if currently shown
  if(CURRENT_PAGE==='shopping')renderShoppingList();
  if(CURRENT_PAGE==='cycle')renderCycleTracker();
  // Update sidebar nav labels when language changes
  const sbLabelMap = {
    'tracker.html': tr.tabTracker,
    'analysis.html': tr.tabAnalysis,
    'timetable.html': tr.tabTimetable,
    'tasks.html': tr.tabTasks,
    'shopping.html': tr.tabShopping,
    'finance.html': tr.tabFinance,
    'calories.html': tr.calKcal||'Calories',
    'cycle.html': tr.tabCycle,
    'recipes.html': tr.tabRecipes,
  };
  const _stripEmoji = s => s.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}✅📊📈🗓💰🛒🌸⏱📖]+\s*/gu, '').trim();
  document.querySelectorAll('#sidebar .sb-item[href]').forEach(a => {
    const lbl = sbLabelMap[a.getAttribute('href')];
    if(lbl){ const sp=a.querySelector('.sb-label'); if(sp) sp.textContent=_stripEmoji(lbl); }
  });
  // Habits sub-tab buttons
  document.querySelectorAll('.habits-subtab-btn').forEach(btn=>{
    if(btn.dataset.subtab==='habits'&&tr.habitsSubtabHabits)btn.textContent=tr.habitsSubtabHabits;
    if(btn.dataset.subtab==='analysis'&&tr.habitsSubtabAnalysis)btn.textContent=tr.habitsSubtabAnalysis;
  });
  // Tracker scope buttons (Daily/Weekly/Monthly)
  document.querySelectorAll('.tracker-scope-btn').forEach(btn=>{
    const map={daily:tr.scopeDaily,weekly:tr.scopeWeekly,monthly:tr.scopeMonthly};
    if(map[btn.dataset.tscope])btn.textContent=map[btn.dataset.tscope];
  });
  // Tasks scope buttons (Daily/Weekly/Monthly/Yearly)
  document.querySelectorAll('.tasks-scope-btn').forEach(btn=>{
    const map={daily:tr.scopeDaily,weekly:tr.scopeWeekly,monthly:tr.scopeMonthly,yearly:tr.scopeYearly};
    if(map[btn.dataset.scope])btn.textContent=map[btn.dataset.scope];
  });
  // Pomodoro stat labels
  const pomoStatLbls=document.querySelectorAll('.pomo-stat-lbl');
  if(pomoStatLbls.length>=3){
    if(tr.pomoSessionsLabel)pomoStatLbls[0].textContent=tr.pomoSessionsLabel;
    if(tr.pomoFocusLabel)pomoStatLbls[1].textContent=tr.pomoFocusLabel;
    if(tr.pomoBreaksLabel)pomoStatLbls[2].textContent=tr.pomoBreaksLabel;
  }
  const pomoHintEl=document.querySelector('.pomo-hint');
  if(pomoHintEl&&tr.pomoHint)pomoHintEl.textContent=tr.pomoHint;
}

function getDaysInMonth(y,m){return new Date(y,m+1,0).getDate();}
function getFirstDayOffset(y,m){const d=new Date(y,m,1).getDay();return d===0?6:d-1;}
function getDow(y,m,d){const w=new Date(y,m,d).getDay();return w===0?6:w-1;}
function getWeekIdx(d,offset){return Math.floor((d-1+offset)/7);}
function isChecked(hi,d){return!!state.checked[`${hi}_${d}`];}

// ─── STREAK TRACKING ─────────────────────────────────────────────────────────
const _streakCheckedCache={};
function _getCheckedForMonth(y,m){
  const k=`ht_checked_v4_${y}_${m}`;
  if(y===state.year&&m===state.month)return state.checked; // live data
  if(_streakCheckedCache[k]!==undefined)return _streakCheckedCache[k];
  try{const raw=localStorage.getItem(k);_streakCheckedCache[k]=raw?JSON.parse(raw):{};}
  catch(e){_streakCheckedCache[k]={};}
  return _streakCheckedCache[k];
}
function _isCheckedAny(hi,y,m,d){return!!(_getCheckedForMonth(y,m)[`${hi}_${d}`]);}
function calcStreak(hi){
  const now=new Date();
  let y=now.getFullYear(),m=now.getMonth(),d=now.getDate();
  // If today isn't checked the streak still "lives" from yesterday (don't kill it mid-day)
  if(!_isCheckedAny(hi,y,m,d)){
    d--;
    if(d<1){m--;if(m<0){m=11;y--;}d=getDaysInMonth(y,m);}
    if(!_isCheckedAny(hi,y,m,d))return 0; // yesterday not checked either → no streak
  }
  let streak=0,safety=0;
  while(safety++<1200){
    if(_isCheckedAny(hi,y,m,d)){streak++;d--;if(d<1){m--;if(m<0){m=11;y--;}d=getDaysInMonth(y,m);}}
    else break;
  }
  return streak;
}
function invalidateStreakCache(){for(const k in _streakCheckedCache)delete _streakCheckedCache[k];}
function streakBadgeHTML(streak,habitName){
  if(streak<1)return'';
  const fire=streak>=7?'🔥':streak>=3?'🔥':'🔥';
  const glow=streak>=30?'#ff6b35':streak>=14?'#ff8c42':streak>=7?'#f5a623':'#ffbe4a';
  const hn=habitName?(` data-habit="${habitName.replace(/"/g,'&quot;')}"`):'';
  return `<span class="streak-badge" style="--streak-color:${glow}" title="${streak}-day streak"${hn} data-streak="${streak}">${fire}<span class="streak-count">${streak}</span></span>`;
}
// ─────────────────────────────────────────────────────────────────────────────

function isToday(d){return state.year===NOW.getFullYear()&&state.month===NOW.getMonth()&&d===NOW.getDate();}
function isFuture(d){return new Date(state.year,state.month,d)>NOW;}
function getMindset(d,type){return state.mindset[`${d}_${type}`]||0;}
function setMindset(d,type,val){state.mindset[`${d}_${type}`]=val;saveAll();}
function toggleCheck(hi,d){
  const k=`${hi}_${d}`;state.checked[k]=!state.checked[k];
  if(!state.checked[k])delete state.checked[k];
  saveAll();render(false);
}

function getDueLabel(s){
  if(!s)return null;
  const due=new Date(s+"T00:00:00");const today=new Date();today.setHours(0,0,0,0);
  const diff=Math.round((due-today)/86400000);
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  if(diff<0)return{text:tr.dueOverdue(Math.abs(diff)),overdue:true};
  if(diff===0)return{text:tr.dueToday,overdue:false};
  if(diff===1)return{text:tr.dueTomorrow,overdue:false};
  return{text:tr.dueFuture(diff),overdue:false};
}

function calcStats(){
  const days=getDaysInMonth(state.year,state.month);
  const total=state.habits.length*days;
  let done=0;
  for(let hi=0;hi<state.habits.length;hi++)
    for(let d=1;d<=days;d++)if(isChecked(hi,d))done++;
  return{days,total,done,pct:total>0?(done/total)*100:0};
}
function calcHabitPcts(){
  const days=getDaysInMonth(state.year,state.month);
  return state.habits.map((_,hi)=>{
    let done=0;for(let d=1;d<=days;d++)if(isChecked(hi,d))done++;
    return days>0?(done/days)*100:0;
  });
}
function calcWeekTotals(wg){
  return wg.map(days=>{
    let done=0,pos=0;
    days.forEach(d=>{pos+=state.habits.length;state.habits.forEach((_,hi)=>{if(isChecked(hi,d))done++;});});
    return pos>0?Math.round((done/pos)*100):0;
  });
}
function calcDowTotals(){
  const days=getDaysInMonth(state.year,state.month);
  return getDays().map((_,di)=>{
    let done=0,pos=0;
    for(let d=1;d<=days;d++){
      if(getDow(state.year,state.month,d)===di){
        pos+=state.habits.length;
        state.habits.forEach((_,hi)=>{if(isChecked(hi,d))done++;});
      }
    }
    return pos>0?Math.round((done/pos)*100):0;
  });
}
function calcDayPct(d){
  if(!state.habits.length)return 0;
  let done=0;state.habits.forEach((_,hi)=>{if(isChecked(hi,d))done++;});
  return Math.round((done/state.habits.length)*100);
}
function getWeekGroups(){
  const days=getDaysInMonth(state.year,state.month);
  const offset=getFirstDayOffset(state.year,state.month);
  const groups=[];
  for(let d=1;d<=days;d++){const wi=getWeekIdx(d,offset);if(!groups[wi])groups[wi]=[];groups[wi].push(d);}
  return groups.filter(g=>g&&g.length>0);
}
function tasksDone(){return state.tasks.filter(t=>t.done).length;}
function updateArc(id,pct){
  const el=document.getElementById(id);if(!el)return;
  el.setAttribute("stroke-dasharray",`${((pct/100)*CIRC).toFixed(2)} ${CIRC.toFixed(2)}`);
}
function makeRadialHTML(pct,color,size){
  const dash=(pct/100)*CIRC;
  const isDarkMode=!['theme-light','theme-paper'].some(c=>document.body.classList.contains(c));
  const trackColor=isDarkMode?'#0d1e3a':'#d0dcea';
  return `<div class="radial-wrap" style="width:${size}px;height:${size}px;">
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" style="transform:rotate(-90deg)">
      <circle cx="50" cy="50" r="42" fill="none" stroke="${trackColor}" stroke-width="10"/>
      <circle cx="50" cy="50" r="42" fill="none" stroke="${color}" stroke-width="10"
        stroke-dasharray="${dash.toFixed(2)} ${CIRC.toFixed(2)}" stroke-linecap="round"/>
    </svg>
    <div class="radial-text"><span style="font-size:${size<75?'11':'14'}px;font-weight:800;color:var(--text);font-family:'Montserrat',sans-serif;">${Math.round(pct)}%</span></div>
  </div>`;
}
function pctColor(p){return p>=70?"#3ecfb2":p>=40?"#f5a623":"#e05a9a";}
function bumpEl(id){const el=document.getElementById(id);if(!el)return;el.classList.remove("bump");void el.offsetWidth;el.classList.add("bump");}

function render(animate){
  const{days,total,done,pct}=calcStats();
  const wg=getWeekGroups();const wt=calcWeekTotals(wg);const hp=calcHabitPcts();const dt=calcDowTotals();const td=tasksDone();
  document.getElementById("month-title").textContent=getMonthNames()[state.month];
  document.getElementById("year-label").textContent=state.year;
  // Stats elements only exist on tracker page
  if(CURRENT_PAGE==="tracker"||CURRENT_PAGE==="habits"){
    const ph=document.getElementById("stat-habits").textContent;const pd=document.getElementById("stat-done").textContent;
    const pp=document.getElementById("stat-pct").textContent;const pt=document.getElementById("stat-tasks").textContent;
    document.getElementById("stat-habits").textContent=state.habits.length;
    document.getElementById("stat-done").textContent=done;
    document.getElementById("stat-pct").textContent=Math.round(pct)+"%";
    document.getElementById("stat-tasks").textContent=`${td}/${state.tasks.length}`;
    if(ph!==String(state.habits.length))bumpEl("stat-habits");
    if(pd!==String(done))bumpEl("stat-done");
    if(pp!==Math.round(pct)+"%")bumpEl("stat-pct");
    if(pt!==`${td}/${state.tasks.length}`)bumpEl("stat-tasks");
    updateArc("overall-arc",pct);
    document.getElementById("overall-pct-text").textContent=Math.round(pct)+"%";
    document.getElementById("overall-sub-text").textContent=`${done}/${total}`;
  }

  const nl=document.getElementById("habit-names-list");if(!nl)return;nl.innerHTML="";
  document.getElementById("my-habits-header").textContent=t('myHabits');
  state.habits.forEach((h,hi)=>{
    const row=document.createElement("div");row.className="habit-name-row";row.style.animationDelay=`${hi*.04}s`;
    if(editingHabit===hi){
      row.innerHTML=`<input class="habit-name-input" type="text" value="${h.replace(/"/g,'&quot;')}" id="edit-input-${hi}" />
        <button class="habit-edit-save-btn" data-savehi="${hi}">✓</button>
        <button class="habit-remove-btn" data-cancelhi="${hi}" style="opacity:.5;font-size:14px;">✕</button>`;
      nl.appendChild(row);
      const inp=row.querySelector(".habit-name-input");
      requestAnimationFrame(()=>{inp.focus();inp.select();});
    }else{
      const s=calcStreak(hi);
      row.innerHTML=`<span class="habit-name-text">${h}</span>${streakBadgeHTML(s,h)}
        <button class="habit-edit-btn" data-edithi="${hi}">✎</button>
        <button class="habit-remove-btn" data-hi="${hi}">×</button>`;
      nl.appendChild(row);
    }
  });

  const wc_el=document.getElementById("weeks-container");wc_el.innerHTML="";
  const DAYS_ARR=getDays();
  wg.forEach((diw,wi)=>{
    const col=document.createElement("div");col.className="week-col";
    const WC=getWeekColors();const WB=getWeekBg();const wcolor=WC[wi%WC.length];const wbg=WB[wi%WB.length];
    const dm={};diw.forEach(d=>{dm[getDow(state.year,state.month,d)]=d;});
    const slots=Array.from({length:7},(_,dow)=>dm[dow]!==undefined?dm[dow]:null);
    const hdr=document.createElement("div");hdr.className="week-header";hdr.style.background=wcolor;
    hdr.textContent=`${t('weekPrefix')} ${wi+1}`;col.appendChild(hdr);
    const dr=document.createElement("div");dr.className="week-days-row";dr.style.background=wbg;
    slots.forEach((d,dow)=>{
      const cell=document.createElement("div");cell.className="day-header-cell";
      if(d===null){cell.style.visibility="hidden";cell.innerHTML=`<div class="day-dow">${DAYS_ARR[dow]}</div><div class="day-num">0</div>`;}
      else{const today=isToday(d);cell.innerHTML=`<div class="day-dow" style="color:${wcolor}">${DAYS_ARR[dow]}</div><div class="day-num ${today?'today-num':''}">${d}${(()=>{const jk=getJournalKey(state.year,state.month,d);const je=state.journal[jk];return (je&&(je.note||je.mood))?'<span class=\"journal-dot\">◆</span>':''})()}</div>`;}
      dr.appendChild(cell);
    });col.appendChild(dr);
    state.habits.forEach((_,hi)=>{
      const row=document.createElement("div");row.className="week-habit-row";row.style.background=wbg;
      slots.forEach(d=>{
        const box=document.createElement("div");box.className="checkbox";
        if(d===null){box.classList.add("invisible");}
        else{
          const ck=isChecked(hi,d);if(ck)box.classList.add("done");
          box.style.border=`2.5px solid ${ck?wcolor:"#2a3d6e"}`;
          box.style.background=ck?wcolor+"28":"transparent";
          box.dataset.hi=hi;box.dataset.d=d;box.dataset.wcolor=wcolor;
          if(ck)box.innerHTML=`<svg viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="${wcolor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        }
        row.appendChild(box);
      });col.appendChild(row);
    });
    const foot=document.createElement("div");foot.className="week-footer";foot.style.background=wbg;foot.style.color=wcolor;foot.textContent=wt[wi]+"%";col.appendChild(foot);
    wc_el.appendChild(col);
  });

  if(animate){
    requestAnimationFrame(()=>{document.querySelectorAll(".week-col").forEach((col,i)=>{col.style.animation=`fadeSlideUp .45s ${.08+i*.07}s cubic-bezier(.4,0,.2,1) both`;});});
  }else{
    document.querySelectorAll(".week-col").forEach(col=>{col.style.opacity="1";col.style.animation="none";});
  }

  const onTrackerPage=(state.tab==="tracker"||state.tab==="habits"||CURRENT_PAGE==="habits");
  if(onTrackerPage&&trackerScope==="daily")renderDaysView(animate);
  else if(onTrackerPage&&trackerScope==="weekly")renderWeeklyView(animate);
  else if(state.tab==="tasks")renderTasksView();
  else if(state.tab==="analysis")renderAnalysis(days,total,done,pct,hp,wg,wt,dt);
}

function renderDaysView(animate){
  const total=getDaysInMonth(state.year,state.month);
  const grid=document.getElementById("days-grid");grid.innerHTML="";

  // Default to today if same month, else day 1
  if(dailyDayView===null||dailyDayView<1||dailyDayView>total){
    dailyDayView=(state.year===NOW.getFullYear()&&state.month===NOW.getMonth())?NOW.getDate():1;
  }
  const d=dailyDayView;
  const pct=calcDayPct(d);const color=pctColor(pct);
  const today=isToday(d);const future=isFuture(d);
  const ms=getMonthShort();

  // Habit list
  let habHTML="";
  state.habits.forEach((h,hi)=>{
    const ck=isChecked(hi,d);
    habHTML+=`<div class="day-habit-item">
      <div class="day-habit-cb ${ck?'checked':''}" data-hi="${hi}" data-d="${d}">
        ${ck?`<svg viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#3ecfb2" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""}
      </div>
      <span class="day-habit-label ${ck?'done-label':''}">${h}</span>
    </div>`;
  });

  // Mindset
  const mtypes=[
    {key:"energy",label:t('energy'),icon:"⚡",cols:["#2a3d5e","#f5a62388","#f5a623bb","#f5a623","#ffbe4a"]},
    {key:"focus",label:t('focus'),icon:"🎯",cols:["#2a3d5e","#4f6ef788","#4f6ef7bb","#4f6ef7","#7090f9"]},
    {key:"motivation",label:t('mood'),icon:"🔥",cols:["#2a3d5e","#e05a9a88","#e05a9abb","#e05a9a","#f07ab0"]},
  ];
  let mHTML=`<div class="mindset-section ddv-side-block"><div class="mindset-title">${t('mindsetTitle')}</div>`;
  mtypes.forEach(mt=>{
    const val=getMindset(d,mt.key);
    mHTML+=`<div class="mindset-row"><span class="mindset-icon">${mt.icon}</span><span class="mindset-label">${mt.label}</span><div class="mindset-stars">`;
    for(let s=1;s<=5;s++){
      const act=s<=val;
      mHTML+=`<div class="mindset-star ${act?'active':''}" style="background:${act?mt.cols[s-1]:'transparent'};border-color:${act?'transparent':'#1e3060'};" data-d="${d}" data-type="${mt.key}" data-val="${s}">●</div>`;
    }
    const textColor=val>0?mt.cols[Math.min(val-1,4)]:"#2a4060";
    mHTML+=`</div><span class="mindset-val" style="color:${textColor}">${val||""}</span></div>`;
  });
  mHTML+=`</div>`;

  // Journal
  const jk=getJournalKey(state.year,state.month,d);
  const jEntry=state.journal[jk]||{mood:0,note:''};
  const journalHTML=`<div class="day-journal-section ddv-side-block">
    <div class="mindset-title">${t('journalTitle')}</div>
    <div class="day-journal-mood-row" id="day-journal-mood-${d}">
      ${JOURNAL_MOODS.map((em,i)=>{
        const act=jEntry.mood===i+1;
        return `<button class="day-journal-mood-btn${act?' active':''}" data-jd="${jk}" data-jmood="${i+1}" style="${act?`border-color:${JOURNAL_MOOD_COLORS[i]};box-shadow:0 0 0 2px ${JOURNAL_MOOD_COLORS[i]}33;background:${JOURNAL_MOOD_COLORS[i]}18;`:''}">${em}</button>`;
      }).join('')}
    </div>
    <textarea class="day-journal-note" data-jd="${jk}" placeholder="${t('journalNotePlaceholder')}" maxlength="2000">${jEntry.note}</textarea>
  </div>`;

  // Month dots strip
  const dotsHTML=Array.from({length:total},(_,i)=>{
    const dd=i+1,isTd=isToday(dd),isFt=isFuture(dd),isSel=dd===d;
    const dp=calcDayPct(dd);
    const bg=isSel?'#4f6ef7':isTd?'#4f6ef755':isFt?'var(--border2)':dp>=80?'#3ecfb2':dp>=40?'#f5a623':'#e05a5a44';
    return `<div class="ddv-dot${isSel?' ddv-dot-sel':''}${isTd&&!isSel?' ddv-dot-today':''}" data-dd="${dd}" style="background:${bg}" title="${ms[state.month]} ${dd}${isTd?' — Today':''}"></div>`;
  }).join('');

  // Build the wrapper
  const wrapper=document.createElement("div");wrapper.className="ddv-wrap";
  wrapper.innerHTML=`
    <div class="ddv-nav">
      <button class="ddv-arrow" id="ddv-prev"${d<=1?' disabled':''}>‹</button>
      <div class="ddv-date-block">
        <span class="ddv-date-big">${ms[state.month]} ${d}</span>
        ${today?`<span class="day-card-today-badge" style="font-size:10px;">${t('todayBadge')}</span>`:''}
        ${!today?`<button class="ddv-jump-today" id="ddv-jump">${t('todayBadge')||'Today'} →</button>`:''}
      </div>
      <button class="ddv-arrow" id="ddv-next"${d>=total?' disabled':''}>›</button>
    </div>
    <div class="ddv-dots-strip">${dotsHTML}</div>
    <div class="day-card${today?' is-today':''}${future?' future':''} ddv-card">
      <div class="day-card-progress-row">
        <span class="day-card-pct" style="color:${color}">${pct}%</span>
        <div class="day-card-track"><div class="day-card-fill" style="width:0%;background:${color};"></div></div>
      </div>
      <div class="ddv-card-body">
        <div class="ddv-habits-col">
          <div class="day-habits-list">${habHTML||`<div style="color:var(--text-dim);font-size:13px;font-weight:600;padding:8px 0;">No habits yet — add one above.</div>`}</div>
        </div>
        <div class="ddv-side-col">
          ${mHTML}
          ${journalHTML}
        </div>
      </div>
    </div>`;

  grid.appendChild(wrapper);

  // Wire navigation
  document.getElementById("ddv-prev")?.addEventListener("click",()=>{dailyDayView=d-1;renderDaysView(false);});
  document.getElementById("ddv-next")?.addEventListener("click",()=>{dailyDayView=d+1;renderDaysView(false);});
  document.getElementById("ddv-jump")?.addEventListener("click",()=>{dailyDayView=null;renderDaysView(false);});
  grid.querySelectorAll(".ddv-dot").forEach(dot=>dot.addEventListener("click",()=>{dailyDayView=+dot.dataset.dd;renderDaysView(false);}));

  if(animate){
    requestAnimationFrame(()=>{wrapper.style.animation=`fadeSlideUp .4s cubic-bezier(.4,0,.2,1) both`;});
  }else{
    wrapper.style.opacity="1";
  }
  requestAnimationFrame(()=>{const fill=wrapper.querySelector(".day-card-fill");if(fill)fill.style.width=pct+"%";});
}

function renderTasksView(){
  const list=document.getElementById("tasks-list");list.innerHTML="";
  // Scope title
  const scopeTitles={daily:"☀️ Daily Tasks",weekly:"📅 Weekly Tasks",monthly:"🗓 Monthly Tasks",yearly:"📆 Yearly Tasks"};
  document.getElementById('tasks-title').textContent=scopeTitles[taskScope]||t('tasksThisWeek');
  // Update scope btn active state
  document.querySelectorAll('.tasks-scope-btn').forEach(b=>b.classList.toggle('active',b.dataset.scope===taskScope));
  document.querySelectorAll('.task-filter-btn[data-i18n]').forEach(b=>{
    const key=b.dataset.i18n;const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
    if(tr[key])b.textContent=tr[key];
  });
  // Scope hierarchy: daily < weekly < monthly < yearly
  // A task is shown if its own scope is <= the current view scope,
  // OR its due date falls within the current scope's time window.
  const SCOPE_ORDER=['daily','weekly','monthly','yearly'];
  function scopeIncludes(taskScp,viewScp){
    const ti=SCOPE_ORDER.indexOf(taskScp||'daily');
    const vi=SCOPE_ORDER.indexOf(viewScp);
    return ti<=vi;
  }
  function dueWithinScope(dueStr,viewScp){
    if(!dueStr)return false;
    const due=new Date(dueStr+'T00:00:00');
    const today=new Date();today.setHours(0,0,0,0);
    const diff=Math.round((due-today)/86400000);
    if(viewScp==='daily') return diff<=0;
    if(viewScp==='weekly') return diff<=6;
    if(viewScp==='monthly'){
      const endOfMonth=new Date(today.getFullYear(),today.getMonth()+1,0);
      return diff<=Math.round((endOfMonth-today)/86400000);
    }
    if(viewScp==='yearly'){
      const endOfYear=new Date(today.getFullYear(),11,31);
      return diff<=Math.round((endOfYear-today)/86400000);
    }
    return false;
  }
  const filtered=state.tasks.filter(t=>{
    const scopeMatch = scopeIncludes(t.scope,taskScope) || dueWithinScope(t.due,taskScope);
    const priMatch = taskFilter==="all"||t.priority===taskFilter;
    return scopeMatch && priMatch;
  });
  if(!filtered.length){
    list.innerHTML=`<div style="text-align:center;color:#4a6a9a;padding:30px;font-size:14px;font-weight:600;">${t('noTasks')}</div>`;return;
  }
  const pClass={high:"priority-high",medium:"priority-medium",low:"priority-low"};
  const pLabel={high:t('priorityHigh'),medium:t('priorityMedium'),low:t('priorityLow')};
  const sClass={inprogress:"status-inprogress",notstarted:"status-notstarted",completed:"status-completed"};
  const sLabel={inprogress:t('statusInProgress'),notstarted:t('statusNotStarted'),completed:t('statusCompleted')};
  filtered.forEach((task,idx)=>{
    const item=document.createElement("div");item.className="task-item"+(task.done?" completed":"");
    item.style.animationDelay=`${idx*.05}s`;
    const due=getDueLabel(task.due);
    const dueHTML=due?`<span class="task-due ${due.overdue?'overdue':''}">${due.text}</span>`:"";
    item.innerHTML=`
      <div class="task-cb ${task.done?'checked':''}" data-tid="${task.id}">
        ${task.done?`<svg viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#3ecfb2" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""}
      </div>
      <span class="task-name ${task.done?'done':''}">${task.name}</span>
      <span class="priority-badge ${pClass[task.priority]}">${pLabel[task.priority]}</span>
      ${dueHTML}
      <span class="status-badge ${sClass[task.status]||'status-notstarted'}">${sLabel[task.status]||task.status}</span>
      <button class="task-edit-btn" data-etid="${task.id}" title="Edit">✎</button>
      <button class="task-remove-btn" data-rtid="${task.id}">×</button>`;
    list.appendChild(item);
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── CROSS-TRACKER HELPERS (global, available on every page) ────────────────
// Calorie data is stored by calories.html / recipes.html under "ht_calories_YYYY-MM"
// Workout data is stored by workout.html under "lt_workouts_YYYY_MM"
// ═══════════════════════════════════════════════════════════════════════════════
function xCalMonthKey(d){ return `ht_calories_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function xDateKey(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function xWktMonthKey(d){ return `lt_workouts_${d.getFullYear()}_${String(d.getMonth()+1).padStart(2,'0')}`; }

// Today's calorie intake vs goal (reads ht_cal_goals_v1 + ht_calories_YYYY-MM)
function getCalorieProgressToday(){
  let goal=2000;
  try{ const g=JSON.parse(localStorage.getItem('ht_cal_goals_v1')||'null'); if(g&&g.kcal) goal=g.kcal; }catch(e){}
  const d=new Date();
  let val=0;
  try{
    const raw=JSON.parse(localStorage.getItem(xCalMonthKey(d))||'null');
    const day=raw&&raw.days&&raw.days[xDateKey(d)];
    if(day){
      ['breakfast','lunch','dinner','snacks'].forEach(m=>{(day.meals?.[m]||[]).forEach(f=>{val+=(f.kcal||0)*(f.qty||1);});});
    }
  }catch(e){}
  return { val:Math.round(val), goal, pct: goal>0?Math.min(100,Math.round(val/goal*100)):0 };
}

// Current workout streak (consecutive days with at least one session), scans up to 90 days back
function getWorkoutStreakGlobal(){
  const today=new Date(); today.setHours(0,0,0,0);
  let streak=0;
  for(let i=0;i<90;i++){
    const d=new Date(today); d.setDate(d.getDate()-i);
    let sessions=[];
    try{ const raw=JSON.parse(localStorage.getItem(xWktMonthKey(d))||'null'); if(raw) sessions=raw.sessions||[]; }catch(e){}
    const dk=xDateKey(d);
    if(sessions.some(s=>s.date===dk)) streak++;
    else if(i>0) break;
  }
  return streak;
}

function renderAnalysis(days,total,done,pct,hp,wg,wt,dt){
  const maxH=72;const DAYS_ARR=getDays();
  document.getElementById("bar-chart-days").innerHTML=DAYS_ARR.map((dl,i)=>{
    const _WC=getWeekColors();const h=Math.round((dt[i]/100)*maxH);const col=_WC[i%_WC.length];
    return `<div class="bar-chart-col"><div class="bar-chart-bar" style="height:${Math.max(h,2)}px;background:${col};opacity:${dt[i]===0?.15:.85};"></div><div class="bar-chart-lbl">${dl}</div></div>`;
  }).join("");
  const hbEl=document.getElementById("habit-bars");hbEl.innerHTML="";
  state.habits.forEach((h,hi)=>{
    const p=hp[hi];const color=pctColor(p);
    const row=document.createElement("div");row.className="habit-bar-row";
    row.innerHTML=`<span class="habit-bar-label">${h}</span>
      <div class="habit-bar-track"><div class="habit-bar-fill" style="width:0%;background:${color};"></div></div>
      <span class="habit-bar-pct" style="color:${color};">${Math.round(p)}%</span>`;
    hbEl.appendChild(row);
    requestAnimationFrame(()=>{setTimeout(()=>{const f=row.querySelector(".habit-bar-fill");if(f)f.style.width=p+"%";},60+hi*40);});
  });
  const wrEl=document.getElementById("week-radials");wrEl.innerHTML="";
  wg.forEach((_,wi)=>{
    const item=document.createElement("div");item.className="week-radial-item";
    const _WC2=getWeekColors();item.innerHTML=makeRadialHTML(wt[wi],_WC2[wi%_WC2.length],68)+`<span class="week-radial-label" style="color:${_WC2[wi%_WC2.length]}">${t('weekShort')} ${wi+1}</span>`;
    wrEl.appendChild(item);
  });
  updateArc("overall-arc-2",pct);
  document.getElementById("overall-pct-text-2").textContent=Math.round(pct)+"%";
  document.getElementById("overall-sub-text-2").textContent=`${done}/${total}`;
  document.getElementById("overall-stats").innerHTML=`
    <div><strong style="color:#fff;font-size:1.1em;">${done}</strong>&nbsp;${t('completedStat')}</div>
    <div><strong style="color:#fff;font-size:1.1em;">${state.habits.length}</strong>&nbsp;${t('habitsStat')}</div>
    <div><strong style="color:#fff;font-size:1.1em;">${getDaysInMonth(state.year,state.month)}</strong>&nbsp;${t('daysStat')}</div>`;
  renderMindsetChart(days);renderGoals();renderJournal();renderCrossStats();
}

function renderCrossStats(){
  const calProg=getCalorieProgressToday();
  const fillEl=document.getElementById('cross-cal-fill');
  if(fillEl) fillEl.style.width=calProg.pct+'%';
  const pctEl=document.getElementById('cross-cal-pct');
  if(pctEl) pctEl.textContent=`${calProg.val}/${calProg.goal} kcal (${calProg.pct}%)`;
  const streakEl=document.getElementById('cross-wkt-streak');
  if(streakEl) streakEl.textContent=`${getWorkoutStreakGlobal()} ${t('daysUnit')}`;
}

function renderMindsetChart(days){
  const svg=document.getElementById("mindset-chart-svg");if(!svg)return;
  const W=700,H=90;
  const mtypes=[{key:"energy",color:"#f5a623"},{key:"focus",color:"#4f6ef7"},{key:"motivation",color:"#e05a9a"}];
  let paths=`<line x1="0" y1="${H-4}" x2="${W}" y2="${H-4}" stroke="#1e3060" stroke-width="1"/>`;
  for(let v=1;v<=4;v++){const y=H-(v/5)*(H-14)-4;paths+=`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#111e38" stroke-width="1" stroke-dasharray="4,4"/>`;}
  mtypes.forEach(mt=>{
    const pts=[];
    for(let d=1;d<=days;d++){
      const val=getMindset(d,mt.key);
      if(val>0){const x=((d-1)/(days-1))*W;const y=H-(val/5)*(H-14)-4;pts.push({x,y,d,val});}
    }
    if(pts.length>=2){
      const polyPts=pts.map(p=>`${p.x},${p.y}`).join(" ");
      paths+=`<polyline points="${polyPts}" fill="none" stroke="${mt.color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>`;
    }
    pts.forEach(p=>{paths+=`<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="${mt.color}" opacity="0.95"/>`;});
  });
  svg.innerHTML=paths;
}

function renderGoals(){
  const gl=document.getElementById("goal-list");if(!gl)return;gl.innerHTML="";
  state.goals.forEach(g=>{
    const item=document.createElement("div");item.className="goal-item";
    const done=g.progress>=100;
    item.innerHTML=`<span class="goal-name ${done?'done-goal':''}">${g.name}</span>
      <div class="goal-progress-wrap">
        <div class="goal-prog-track"><div class="goal-prog-fill" style="width:${g.progress}%"></div></div>
        <div class="goal-prog-pct">${g.progress}%</div>
      </div>
      <input class="goal-prog-input" type="number" min="0" max="100" value="${g.progress}" data-gid="${g.id}" title="Progress %"/>
      <button class="goal-remove-btn" data-rgid="${g.id}">×</button>`;
    gl.appendChild(item);
  });
}


// ─── DAILY JOURNAL ────────────────────────────────────────────────────────────
let journalSelectedDate = null; // { year, month, day } — null = today

function getJournalKey(year, month, day) {
  return `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}
function getJournalEntry(dateKey) {
  return state.journal[dateKey] || { mood:0, note:'' };
}
function saveJournalEntry(dateKey, mood, note) {
  note = note.trim();
  if (!note && !mood) { delete state.journal[dateKey]; }
  else { state.journal[dateKey] = { mood, note }; }
  localStorage.setItem('ht_journal_v1', JSON.stringify(state.journal));
  flashSaved();
}
function getJournalDateObj() {
  if (journalSelectedDate) return new Date(journalSelectedDate.year, journalSelectedDate.month, journalSelectedDate.day);
  return new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());
}
function setJournalDate(d) {
  const today = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());
  if (d > today) return; // no future entries
  journalSelectedDate = { year:d.getFullYear(), month:d.getMonth(), day:d.getDate() };
}

const JOURNAL_MOODS = ['😢','😕','😐','🙂','😄'];
const JOURNAL_MOOD_COLORS = ['#e05a9a','#f5a623','#4f6ef7','#3ecfb2','#a78bfa'];

function renderJournal() {
  const card = document.getElementById('journal-card');
  if (!card) return;
  const d = getJournalDateObj();
  const dateKey = getJournalKey(d.getFullYear(), d.getMonth(), d.getDate());
  const entry = getJournalEntry(dateKey);
  const todayKey = getJournalKey(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());
  const yestD = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() - 1);
  const yestKey = getJournalKey(yestD.getFullYear(), yestD.getMonth(), yestD.getDate());
  const isToday = dateKey === todayKey;
  const isYest = dateKey === yestKey;

  let displayDate;
  if (isToday) displayDate = t('journalToday');
  else if (isYest) displayDate = t('journalYesterday');
  else displayDate = d.toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'});

  const dateDisplay = document.getElementById('journal-date-display');
  if (dateDisplay) { dateDisplay.textContent = displayDate; dateDisplay.style.color = isToday ? '#4f6ef7' : 'var(--text)'; }

  // Disable next-day btn if today
  const nextBtn = document.getElementById('journal-next-day');
  if (nextBtn) nextBtn.disabled = isToday;

  // Mood picker
  const moodRow = document.getElementById('journal-mood-row');
  if (moodRow) {
    moodRow.innerHTML = `<span class="journal-mood-label">${t('journalMoodLabel')}</span>` +
      JOURNAL_MOODS.map((em, i) => {
        const active = entry.mood === i+1;
        return `<button class="journal-mood-btn${active?' active':''}" data-jmood="${i+1}" title="${i+1}/5" style="${active?`border-color:${JOURNAL_MOOD_COLORS[i]};box-shadow:0 0 0 3px ${JOURNAL_MOOD_COLORS[i]}33;background:${JOURNAL_MOOD_COLORS[i]}18;`:''}">${em}</button>`;
      }).join('');
  }

  // Textarea
  const ta = document.getElementById('journal-textarea');
  if (ta) { ta.value = entry.note; updateJournalCharCount(); }

  renderJournalHistory(dateKey);
}

function updateJournalCharCount() {
  const ta = document.getElementById('journal-textarea');
  const cc = document.getElementById('journal-char-count');
  if (!ta || !cc) return;
  const len = ta.value.length;
  const max = 2000;
  cc.textContent = `${len} / ${max}`;
  cc.style.color = len > max * 0.9 ? '#e05a9a' : 'var(--text-muted)';
  if (ta.value.length > max) ta.value = ta.value.slice(0, max);
}

function renderJournalHistory(activeDateKey) {
  const hist = document.getElementById('journal-history');
  if (!hist) return;
  const entries = Object.entries(state.journal)
    .filter(([,v]) => v && (v.note || v.mood))
    .sort((a,b) => b[0].localeCompare(a[0]))
    .slice(0, 12);
  if (!entries.length) {
    hist.innerHTML = `<div class="journal-history-title">${t('journalRecentTitle')}</div><div class="journal-empty">${t('journalNoEntries')}</div>`;
    return;
  }
  const todayKey = getJournalKey(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());
  const yestD = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()-1);
  const yestKey = getJournalKey(yestD.getFullYear(), yestD.getMonth(), yestD.getDate());
  hist.innerHTML = `<div class="journal-history-title">${t('journalRecentTitle')}</div>` +
    entries.map(([dk, en]) => {
      let label;
      if (dk === todayKey) label = t('journalToday');
      else if (dk === yestKey) label = t('journalYesterday');
      else {
        const [y,m,day] = dk.split('-').map(Number);
        const diff = Math.round((Date.now() - new Date(y,m-1,day).getTime()) / 86400000);
        label = diff < 30 ? t('journalDaysAgo')(diff) : dk;
      }
      const moodEmoji = en.mood ? JOURNAL_MOODS[en.mood-1] : '';
      const moodColor = en.mood ? JOURNAL_MOOD_COLORS[en.mood-1] : 'transparent';
      const notePreview = en.note ? en.note.slice(0,100)+(en.note.length>100?'…':'') : `<em class="journal-no-note">${t('journalNoNote')}</em>`;
      const isActive = dk === activeDateKey;
      return `<div class="journal-entry-item${isActive?' active':''}" data-jentry="${dk}">
        <div class="journal-entry-left">
          <div class="journal-entry-date">${label}</div>
          ${moodEmoji?`<div class="journal-entry-mood" style="color:${moodColor}">${moodEmoji}</div>`:''}
        </div>
        <div class="journal-entry-text">${notePreview}</div>
        <button class="journal-entry-delete" data-jdel="${dk}" title="Delete">×</button>
      </div>`;
    }).join('');
}

function getCurrentWeekIdx(){
  const wg=getWeekGroups();
  // Find which week contains today (if same month), else default to last week
  for(let i=0;i<wg.length;i++){
    if(wg[i].some(d=>isToday(d)))return i;
  }
  return wg.length-1;
}

function renderWeeklyView(animate){
  const wg=getWeekGroups();
  if(currentWeekIdx===null)currentWeekIdx=getCurrentWeekIdx();
  currentWeekIdx=Math.max(0,Math.min(currentWeekIdx,wg.length-1));

  const diw=wg[currentWeekIdx];
  const WC=getWeekColors();const WB=getWeekBg();
  const wcolor=WC[currentWeekIdx%WC.length];
  const wbg=WB[currentWeekIdx%WB.length];
  const DAYS_ARR=getDays();
  const ms=getMonthShort();

  // Nav buttons
  document.getElementById('weekly-prev-btn').disabled=currentWeekIdx===0;
  document.getElementById('weekly-next-btn').disabled=currentWeekIdx===wg.length-1;

  // Title
  const weekScore=calcWeekTotals(wg)[currentWeekIdx];
  document.getElementById('weekly-title').innerHTML=
    `${t('weekPrefix')} ${currentWeekIdx+1} <span>${getMonthNames()[state.month]} ${state.year}</span>`;
  const badge=document.getElementById('weekly-score-badge');
  badge.textContent=weekScore+'%';
  badge.style.color=pctColor(weekScore);
  badge.style.borderColor=pctColor(weekScore)+'44';

  // Build day map (Mon–Sun slots)
  const dm={};diw.forEach(d=>{dm[getDow(state.year,state.month,d)]=d;});
  const slots=Array.from({length:7},(_,dow)=>dm[dow]!==undefined?dm[dow]:null);

  // Build grid
  const grid=document.getElementById('weekly-grid');grid.innerHTML='';

  // Habit name column
  const namesCol=document.createElement('div');namesCol.className='weekly-habit-names';
  // Edit/remove uses same pattern as monthly
  state.habits.forEach((h,hi)=>{
    const row=document.createElement('div');row.className='weekly-habit-name-row';
    if(editingHabit===hi){
      row.innerHTML=`<input class="habit-name-input" type="text" value="${h.replace(/"/g,'&quot;')}" id="edit-input-${hi}"/>
        <button class="habit-edit-save-btn" data-savehi="${hi}">✓</button>
        <button class="habit-remove-btn" data-cancelhi="${hi}" style="opacity:.5;font-size:14px;">✕</button>`;
      namesCol.appendChild(row);
      requestAnimationFrame(()=>{const inp=row.querySelector('.habit-name-input');if(inp){inp.focus();inp.select();}});
    }else{
      const sw=calcStreak(hi);
      row.innerHTML=`<span class="weekly-habit-name-text">${h}</span>${streakBadgeHTML(sw,h)}
        <button class="habit-edit-btn" data-edithi="${hi}">✎</button>
        <button class="habit-remove-btn" data-hi="${hi}">×</button>`;
      namesCol.appendChild(row);
    }
  });
  grid.appendChild(namesCol);

  // Day columns
  const daysWrap=document.createElement('div');daysWrap.className='weekly-days-cols';
  slots.forEach((d,dow)=>{
    const col=document.createElement('div');col.className='weekly-day-col';
    const isEmpty=d===null;
    const today=d&&isToday(d);
    const future=d&&isFuture(d);

    // Header
    const hdr=document.createElement('div');hdr.className='weekly-day-header';
    hdr.style.background=isEmpty?'transparent':wbg;
    if(!isEmpty){
      hdr.innerHTML=`<span class="weekly-day-dow" style="color:${wcolor}">${DAYS_ARR[dow]}</span>
        <span class="weekly-day-num${today?' is-today':''}">${d}</span>`;
    }else{
      hdr.innerHTML=`<span class="weekly-day-dow" style="opacity:.2">${DAYS_ARR[dow]}</span><span class="weekly-day-num" style="opacity:.1">–</span>`;
    }
    col.appendChild(hdr);

    // Habit cells
    state.habits.forEach((_,hi)=>{
      const cell=document.createElement('div');cell.className='weekly-cell';
      if(isEmpty){cell.innerHTML='<div style="width:28px;height:28px;opacity:.05;border-radius:7px;border:2px solid #fff;"></div>';}
      else{
        const ck=isChecked(hi,d);
        const cb=document.createElement('div');
        cb.className='weekly-cb'+(ck?' done':'')+(future?' future-day':'');
        cb.style.border=`2.5px solid ${ck?wcolor:'#2a3d6e'}`;
        cb.style.background=ck?wcolor+'28':'transparent';
        cb.dataset.hi=hi;cb.dataset.d=d;cb.dataset.wcolor=wcolor;
        if(ck)cb.innerHTML=`<svg viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="${wcolor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        cell.appendChild(cb);
      }
      col.appendChild(cell);
    });

    // Footer pct
    if(!isEmpty){
      const foot=document.createElement('div');foot.className='weekly-day-footer';
      const dpct=calcDayPct(d);
      foot.style.color=pctColor(dpct);
      foot.textContent=dpct+'%';
      col.appendChild(foot);
    }
    daysWrap.appendChild(col);
  });
  grid.appendChild(daysWrap);

  if(animate){
    daysWrap.querySelectorAll('.weekly-day-col').forEach((col,i)=>{
      col.style.opacity='0';
      col.style.animation=`fadeSlideUp .35s ${i*.04}s cubic-bezier(.4,0,.2,1) both`;
    });
  }
}

function applyTrackerScope(scope){
  trackerScope=scope;
  document.querySelectorAll('.tracker-scope-btn').forEach(b=>b.classList.toggle('active',b.dataset.tscope===scope));
  const gridView=document.getElementById('tracker-grid-view');
  const daysView=document.getElementById('tracker-days-view');
  const weeklyWrap=document.getElementById('weekly-view-wrap');
  const monthlyWrap=document.getElementById('monthly-view-wrap');

  if(scope==='daily'){
    gridView.classList.add('hidden');
    daysView.classList.remove('hidden');
    dailyDayView=null;
    renderDaysView(true);
  } else if(scope==='weekly'){
    gridView.classList.remove('hidden');
    daysView.classList.add('hidden');
    weeklyWrap.classList.remove('hidden');
    monthlyWrap.classList.add('hidden');
    if(currentWeekIdx===null)currentWeekIdx=getCurrentWeekIdx();
    render(false);
    renderWeeklyView(true);
  } else {
    // monthly
    gridView.classList.remove('hidden');
    daysView.classList.add('hidden');
    weeklyWrap.classList.add('hidden');
    monthlyWrap.classList.remove('hidden');
    render(true);
  }
}

function switchTab(tab){
  saveNav();
  if(tab==='analysis'){
    // Analysis is now a sub-tab inside the habits page
    if(CURRENT_PAGE==='habits'){
      setHabitsSubtab('analysis');
      return;
    }
    window.location.href='tracker.html#analysis';
    return;
  }
  if(tab==='tracker'||tab==='habits'){ window.location.href='tracker.html'; return; }
  if(tab==='settings'){ openSettingsModal(); return; }
  window.location.href = tab + '.html';
}


// ─── GOALS PAGE ───────────────────────────────────────────────────────────────
const GOAL_PERIODS = ['daily','weekly','monthly','yearly'];

function renderGoalPeriod(period){
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const listEl = document.getElementById(period+'-goal-list');
  const progEl = document.getElementById(period+'-goal-progress');
  if(!listEl) return;
  const goals = state['goals'+period.charAt(0).toUpperCase()+period.slice(1)] || [];
  listEl.innerHTML = '';
  const done = goals.filter(g=>g.progress>=100).length;
  const pct = goals.length ? Math.round(done/goals.length*100) : 0;
  if(progEl){ progEl.textContent = pct+'%'; progEl.style.color = pct>=70?'#3ecfb2':pct>=40?'#f5a623':'#e05a9a'; }
  if(!goals.length){
    listEl.innerHTML=`<div class="todo-empty">${tr.goalsEmpty||'No goals yet. Add one above!'}</div>`;
    return;
  }
  goals.forEach(g=>{
    const item=document.createElement('div');item.className='goal-item';
    const isDone=g.progress>=100;
    item.innerHTML=`<span class="goal-name ${isDone?'done-goal':''}">${g.name}</span>
      <div class="goal-progress-wrap">
        <div class="goal-prog-track"><div class="goal-prog-fill" style="width:${g.progress}%"></div></div>
        <div class="goal-prog-pct">${g.progress}%</div>
      </div>
      <input class="goal-prog-input" type="number" min="0" max="100" value="${g.progress}" data-gperiod="${period}" data-gid="${g.id}" title="Progress %"/>
      <button class="goal-remove-btn" data-gperiod="${period}" data-rgid="${g.id}">×</button>`;
    listEl.appendChild(item);
  });
}

function renderGoalsPage(){
  GOAL_PERIODS.forEach(renderGoalPeriod);
}

function addGoalToPeriod(period){
  const inp = document.getElementById(period+'-goal-input');
  const name = inp.value.trim(); if(!name) return;
  const key = 'goals'+period.charAt(0).toUpperCase()+period.slice(1);
  const ctrKey = key+'Ctr';
  state[key].push({id:state[ctrKey]++, name, progress:0});
  inp.value=''; saveAll(); renderGoalPeriod(period);
}



// ─── TO-DO PAGE ───────────────────────────────────────────────────────────────
const TODO_CATS = {
  personal:{icon:'👤', color:'#a78bfa'},
  work:    {icon:'💼', color:'#4f6ef7'},
  health:  {icon:'💪', color:'#3ecfb2'},
  finance: {icon:'💰', color:'#f5a623'},
  home:    {icon:'🏠', color:'#e07a3a'},
  other:   {icon:'📦', color:'#e05a9a'},
};
let todoFilter = 'all';

function renderTodoPage(){
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const lanes = document.getElementById('todo-lanes');
  lanes.innerHTML='';
  const catLabels = {
    personal: tr.todoCatPersonal||'👤 Personal',
    work:     tr.todoCatWork||'💼 Work',
    health:   tr.todoCatHealth||'💪 Health',
    finance:  tr.todoCatFinance||'💰 Finance',
    home:     tr.todoCatHome||'🏠 Home',
    other:    tr.todoCatOther||'📦 Other',
  };
  const priClass={high:'todo-pri-high',medium:'todo-pri-medium',low:'todo-pri-low'};
  const priLabel={high:tr.filterHigh||'🔴 High',medium:tr.filterMedium||'⚡ Medium',low:tr.filterLow||'🔵 Low'};

  const filtered = state.todos.filter(td=>{
    if(todoFilter==='active') return !td.done;
    if(todoFilter==='done') return td.done;
    return true;
  });

  // Group by category, only show cats that have items (or all if filter=all)
  const cats = Object.keys(TODO_CATS);
  const byCat = {};
  cats.forEach(c=>{ byCat[c]=filtered.filter(td=>td.cat===c); });
  const activeCats = cats.filter(c=>byCat[c].length>0);
  if(!activeCats.length){
    lanes.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);font-size:14px;font-weight:600;">${tr.todoEmpty||'Nothing here yet. Add your first task above!'}</div>`;
    return;
  }

  activeCats.forEach(cat=>{
    const info = TODO_CATS[cat];
    const items = byCat[cat];
    const lane = document.createElement('div'); lane.className='todo-lane';
    lane.style.borderTopColor=info.color; lane.style.borderTopWidth='3px';
    const doneCount = items.filter(i=>i.done).length;
    lane.innerHTML=`<div class="todo-lane-header">
      <span class="todo-lane-icon">${info.icon}</span>
      <span class="todo-lane-title" style="color:${info.color};">${catLabels[cat].replace(/^[^ ]+ /,'')}</span>
      <span class="todo-lane-count">${doneCount}/${items.length}</span>
    </div>`;
    items.forEach((td,idx)=>{
      const item=document.createElement('div');
      item.className='todo-item'+(td.done?' todo-done':'');
      item.style.animationDelay=idx*.04+'s';
      const due = getDueLabel(td.due);
      const dueHTML = due?`<span class="todo-due-badge ${due.overdue?'overdue':''}">${due.text}</span>`:'';
      item.innerHTML=`
        <div class="todo-cb ${td.done?'checked':''}" data-tdid="${td.id}">
          <svg viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <span class="todo-item-name ${td.done?'done-name':''}">${td.name}</span>
        <div class="todo-item-meta">
          <span class="todo-pri ${priClass[td.priority]||'todo-pri-medium'}">${priLabel[td.priority]||td.priority}</span>
          ${dueHTML}
        </div>
        <button class="todo-remove-btn" data-rtdid="${td.id}">×</button>`;
      lane.appendChild(item);
    });
    lanes.appendChild(lane);
  });
}



// ─── SHOPPING LIST ────────────────────────────────────────────────────────────
const SHOP_CATS = {
  grocery: {label:"🥦 Grocery", color:"#3ecfb2"},
  household: {label:"🏠 Household", color:"#4f6ef7"},
  personal: {label:"💄 Personal", color:"#e05a9a"},
  other: {label:"📦 Other", color:"#f5a623"},
};
let shopFilter = "all";

function saveShop(){ try{localStorage.setItem("ht_shop_v1",JSON.stringify({items:state.shopItems,ctr:state.shopIdCtr}));}catch(e){} }
function loadShop(){
  try{
    const d=JSON.parse(localStorage.getItem("ht_shop_v1")||"null");
    if(d){state.shopItems=d.items||[];state.shopIdCtr=d.ctr||1;}
  }catch(e){}
}

function renderShoppingList(){
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const SHOP_CATS_LABELS = {
    grocery: tr.shopGrocery||"🥦 Grocery",
    household: tr.shopHousehold||"🏠 Household",
    personal: tr.shopPersonal||"💄 Personal",
    other: tr.shopOther||"📦 Other",
  };
  const cats = shopFilter === "all" ? Object.keys(SHOP_CATS) : [shopFilter];
  const wrap = document.getElementById("shop-lists");
  wrap.innerHTML = "";
  cats.forEach(cat=>{
    const items = state.shopItems.filter(i=>i.cat===cat);
    if(shopFilter==="all" && items.length===0) return;
    const catInfo = SHOP_CATS[cat];
    const card = document.createElement("div");
    card.className = "shop-category-card";
    card.innerHTML = `<div class="shop-category-title" style="color:${catInfo.color};">${SHOP_CATS_LABELS[cat]}</div><div class="shop-items-list" data-cat="${cat}"></div>`;
    const list = card.querySelector(".shop-items-list");
    if(items.length===0){
      list.innerHTML = `<div style="font-size:12px;color:var(--text-muted);padding:6px 0;">${tr.shopNoItemsCat||"No items yet."}</div>`;
    } else {
      items.forEach(item=>{
        const row = document.createElement("div");
        row.className = "shop-item";
        row.dataset.sid = item.id;
        row.innerHTML = `
          <div class="shop-cb ${item.done?"checked":""}" data-sid="${item.id}">
            <svg viewBox="0 0 20 20" fill="none" stroke="#3ecfb2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,10 8,14 16,6"/></svg>
          </div>
          <span class="shop-item-name ${item.done?"checked-name":""}">${item.name}</span>
          <span class="shop-item-qty">×${item.qty}</span>
          <button class="shop-edit-btn" data-esid="${item.id}" title="Edit">✎</button>
          <button class="shop-remove-btn" data-rsid="${item.id}">✕</button>`;
        list.appendChild(row);
      });
    }
    wrap.appendChild(card);
  });
  if(wrap.innerHTML === ""){
    wrap.innerHTML = `<div style="font-size:13px;color:var(--text-muted);padding:20px 0;">${tr.shopNoItems||"No items yet. Add some below!"}</div>`;
  }
}

if(CURRENT_PAGE==="shopping"){ document.getElementById("add-shop-btn").addEventListener("click",()=>{
  const name = document.getElementById("shop-name-input").value.trim();
  if(!name)return;
  const qty = Math.max(1,parseInt(document.getElementById("shop-qty-input").value)||1);
  const cat = document.getElementById("shop-cat-select").value;
  state.shopItems.push({id:state.shopIdCtr++, name, qty, cat, done:false});
  document.getElementById("shop-name-input").value="";
  document.getElementById("shop-qty-input").value="1";
  saveShop(); renderShoppingList();
});
document.getElementById("shop-name-input").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("add-shop-btn").click();});
document.getElementById("clear-checked-shop-btn").addEventListener("click",()=>{
  state.shopItems = state.shopItems.filter(i=>!i.done);
  saveShop(); renderShoppingList();
});
document.getElementById("shop-lists").addEventListener("click",e=>{
  const cb = e.target.closest(".shop-cb[data-sid]");
  if(cb){const it=state.shopItems.find(x=>x.id===+cb.dataset.sid);if(it)it.done=!it.done;saveShop();renderShoppingList();return;}

  // Edit button — expand row into inline edit form
  const eb = e.target.closest(".shop-edit-btn[data-esid]");
  if(eb){
    const id=+eb.dataset.esid;
    const it=state.shopItems.find(x=>x.id===id);
    if(!it)return;
    const row=eb.closest(".shop-item");
    if(row.classList.contains("editing"))return;
    row.classList.add("editing");
    const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
    const catOpts=[
      {v:"grocery",l:tr.shopGrocery||"🥦 Grocery"},
      {v:"household",l:tr.shopHousehold||"🏠 Household"},
      {v:"personal",l:tr.shopPersonal||"💄 Personal"},
      {v:"other",l:tr.shopOther||"📦 Other"},
    ];
    row.innerHTML=`
      <div class="shop-edit-wrap">
        <input class="shop-edit-input shop-edit-name" value="${it.name.replace(/"/g,'&quot;')}" placeholder="Item name" data-field="name"/>
        <input class="shop-edit-input shop-edit-qty" type="number" min="1" value="${it.qty}" data-field="qty"/>
        <select class="shop-edit-cat" data-field="cat">${catOpts.map(o=>`<option value="${o.v}"${it.cat===o.v?" selected":""}>${o.l}</option>`).join("")}</select>
        <button class="shop-edit-save" data-savesid="${id}">✓ Save</button>
        <button class="shop-edit-cancel" data-cancelsid="${id}">✕</button>
      </div>`;
    row.querySelector('.shop-edit-input').focus();
    return;
  }

  // Save inline edit
  const sb = e.target.closest(".shop-edit-save[data-savesid]");
  if(sb){
    const id=+sb.dataset.savesid;
    const row=sb.closest(".shop-item");
    const name=row.querySelector('[data-field="name"]').value.trim();
    const qty=Math.max(1,parseInt(row.querySelector('[data-field="qty"]').value)||1);
    const cat=row.querySelector('[data-field="cat"]').value;
    if(name){const it=state.shopItems.find(x=>x.id===id);if(it){it.name=name;it.qty=qty;it.cat=cat;}}
    saveShop();renderShoppingList();
    return;
  }

  // Cancel inline edit
  const xb = e.target.closest(".shop-edit-cancel[data-cancelsid]");
  if(xb){saveShop();renderShoppingList();return;}

  const rb = e.target.closest(".shop-remove-btn[data-rsid]");
  if(rb){state.shopItems=state.shopItems.filter(x=>x.id!==+rb.dataset.rsid);saveShop();renderShoppingList();}
});
document.getElementById("shop-filter-row").addEventListener("click",e=>{
  const btn = e.target.closest("[data-shopcat]");
  if(!btn)return;
  document.querySelectorAll("[data-shopcat]").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  shopFilter = btn.dataset.shopcat;
  renderShoppingList();
});
} // end CURRENT_PAGE shopping

// ─── MENSTRUAL CYCLE TRACKER v2 ──────────────────────────────────────────────
const SYMPTOMS_EN = ["🤕 Cramps","😴 Fatigue","🤢 Nausea","🎭 Mood Swings","🍫 Cravings","💧 Bloating","🤯 Headache","💔 Breast Tenderness","😰 Anxiety","🥵 Hot Flashes","💤 Insomnia","✨ High Energy"];
const MOODS = ["😊","😌","😢","😠","😤","🥰","😶","🤩"];
const MOOD_LABELS_EN = ["Happy","Calm","Sad","Irritable","Stressed","Loving","Numb","Energetic"];
function getSymptoms(){ return (TRANSLATIONS[state.lang]||TRANSLATIONS.en).cycleSymptoms || SYMPTOMS_EN; }
function getMoodLabels(){ return (TRANSLATIONS[state.lang]||TRANSLATIONS.en).cycleMoodLabels || MOOD_LABELS_EN; }

let cycleCalYear = NOW.getFullYear(), cycleCalMonth = NOW.getMonth();
let todaySymptoms = [], todayMood = "";
let cycleMode = "natural"; // "natural" | "pill"
let hoveredPillIdx = -1; // which pill (0-27) is hovered

function saveCycle(){ try{localStorage.setItem("ht_cycle_v2",JSON.stringify(state.cycleData));}catch(e){} }
function loadCycle(){
  try{
    // Try v2 key first, fall back to v1
    const raw = localStorage.getItem("ht_cycle_v2") || localStorage.getItem("ht_cycle_v1");
    const d = JSON.parse(raw||"null");
    if(d) state.cycleData = {...{periods:[],days:{},cycleLen:28,mode:"natural",takenPills:{}},  ...d};
  }catch(e){}
}
function todayKey(){ const n=new Date(); return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`; }
function dateKey(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function addDays(date, n){ const d=new Date(date); d.setDate(d.getDate()+n); return d; }

// Get the anchor (most recent period start)
function getAnchor(){
  const periods = (state.cycleData.periods||[]).slice().sort((a,b)=>new Date(a.start)-new Date(b.start));
  if(!periods.length) return null;
  return periods[periods.length-1];
}

// For pill mode: given cycle start, pill index 0-27 → corresponding calendar date
function pillIndexToDate(cycleStart, idx){
  return addDays(new Date(cycleStart), idx);
}

// For any calendar date → pill index in current pack (0-27) or -1
function dateToPillIdx(cycleStart, date){
  const start = new Date(cycleStart); start.setHours(0,0,0,0);
  const d = new Date(date); d.setHours(0,0,0,0);
  const diff = Math.round((d-start)/86400000);
  if(diff<0) return -1;
  return diff % 28; // repeating 28-day packs
}

// Calculate all predicted periods for a given year range based on anchor
function getPredictedPeriods(anchor, cycleLen, months=18){
  const result = [];
  const dur = anchor.dur || 5;
  const base = new Date(anchor.start);
  // Past packs: go back up to 6 cycles
  for(let i=-6;i<=months;i++){
    const start = addDays(base, i*cycleLen);
    result.push({ start: dateKey(start), dur, predicted: i!==0 });
  }
  return result;
}

// Get phase tag for a given date (natural mode)
function getNaturalDayTag(date, anchor, cycleLen){
  if(!anchor) return null;
  const dur = anchor.dur||5;
  const base = new Date(anchor.start); base.setHours(0,0,0,0);
  const d = new Date(date); d.setHours(0,0,0,0);
  const diff = ((d-base)/86400000 % cycleLen + cycleLen) % cycleLen;
  if(diff<dur) return "period";
  if(diff===cycleLen-14) return "ovulation";
  if(diff>=cycleLen-19 && diff<cycleLen-13) return "fertile";
  if(diff>=cycleLen-7) return "pms-zone";
  return null;
}

// Get pill tag for a calendar date (pill mode)
function getPillDayTag(date, anchor){
  if(!anchor) return null;
  const idx = dateToPillIdx(anchor.start, date) ;
  if(idx<0) return null;
  if(idx<21) return "pill-day";    // rows 1-3 = active (pink)
  return "pill-placebo";           // row 4 = placebo (white)
}

// ── RENDER ──────────────────────────────────────────────────────────────────

function renderCycleTracker(){
  // Sync mode
  cycleMode = state.cycleData.mode || "natural";
  document.querySelectorAll(".cycle-mode-btn").forEach(b=>{
    b.classList.toggle("active", b.dataset.cmode===cycleMode);
  });

  // Show/hide pack vs status card
  document.getElementById("pill-pack-card").style.display = cycleMode==="pill" ? "" : "none";
  document.getElementById("cycle-status-card").style.display = cycleMode==="natural" ? "" : "none";
  document.getElementById("period-dur-field").style.display = cycleMode==="natural" ? "" : "none";

  renderPillPack();
  renderCycleCalendar();
  renderCycleInsights();
  renderCycleStatus();
  renderCycleSymptoms();
  renderCycleMood();
  renderCycleHistory();

  const tk = todayKey();
  const dayData = (state.cycleData.days||{})[tk]||{};
  todaySymptoms = dayData.symptoms||[];
  todayMood = dayData.mood||"";
  todayIntimacy = [...(dayData.intimacy||[])];
  document.getElementById("cycle-notes-input").value = dayData.notes||"";
  updateSymptomButtons();
  updateMoodButtons();
  renderIntimacyTracker();
  renderPregnancyTracker();
}

function renderPillPack(){
  if(cycleMode !== "pill") return;
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const anchor = getAnchor();
  const grid = document.getElementById("pill-grid");
  grid.innerHTML = "";
  const today = new Date(); today.setHours(0,0,0,0);
  const takenPills = state.cycleData.takenPills || {};

  if(anchor){
    const packStart = new Date(anchor.start); packStart.setHours(0,0,0,0);
    // Find which 28-day pack we're currently in
    const daysSinceAnchor = Math.floor((today - packStart)/86400000);
    const currentPackOffset = Math.floor(daysSinceAnchor / 28) * 28;
    const currentPackStart = addDays(packStart, currentPackOffset);

    // Date range label
    const packEnd = addDays(currentPackStart, 27);
    const fmtDate = d => `${d.getDate()} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]}`;
    document.getElementById("pill-pack-date-range").textContent = `${fmtDate(currentPackStart)} – ${fmtDate(packEnd)} ${packEnd.getFullYear()}`;

    for(let i=0;i<28;i++){
      const pillDate = addDays(currentPackStart, i);
      const dk = dateKey(pillDate);
      const isPink = i<21;
      const isToday = pillDate.getTime()===today.getTime();
      const isTaken = !!takenPills[dk];
      const isPast = pillDate < today;

      const cell = document.createElement("div");
      cell.className = "pill-cell";
      cell.dataset.pillIdx = i;
      cell.dataset.pillDate = dk;

      const pill = document.createElement("div");
      pill.className = `pill ${isPink?"pink":"white-pill"}${isTaken?" taken":""}${isToday?" today-pill":""}`;
      const inner = document.createElement("div");
      inner.className = "pill-inner";
      pill.appendChild(inner);

      const dayNum = document.createElement("div");
      dayNum.className = "pill-day-num";
      dayNum.textContent = pillDate.getDate();

      cell.appendChild(pill);
      cell.appendChild(dayNum);
      grid.appendChild(cell);

      // Hover: highlight pill + calendar date
      cell.addEventListener("mouseenter",()=>{
        hoveredPillIdx = i;
        document.querySelectorAll(".pill-cell").forEach(c=>c.classList.remove("hovered-cell"));
        document.querySelectorAll(".pill").forEach(p=>p.classList.remove("hovered"));
        cell.classList.add("hovered-cell");
        pill.classList.add("hovered");
        // Highlight corresponding calendar day
        highlightCalendarDate(dk);
        // Show date label under calendar
        const hl = document.getElementById("cycle-hovered-date");
        hl.textContent = `💊 ${fmtDate(pillDate)} ${pillDate.getFullYear()} · ${isPink?(tr.cyclePillHoverActive||"Active Pill"):(tr.cyclePillLegendPlacebo||"Placebo")}`;
        hl.style.opacity="1";
      });
      cell.addEventListener("mouseleave",()=>{
        cell.classList.remove("hovered-cell");
        pill.classList.remove("hovered");
        clearCalendarHighlight();
        document.getElementById("cycle-hovered-date").style.opacity="0";
        hoveredPillIdx=-1;
      });

      // Click to mark taken/untaken
      cell.addEventListener("click",()=>{
        if(!state.cycleData.takenPills) state.cycleData.takenPills={};
        if(state.cycleData.takenPills[dk]) delete state.cycleData.takenPills[dk];
        else state.cycleData.takenPills[dk]=true;
        saveCycle(); renderPillPack();
      });
    }
  } else {
    document.getElementById("pill-pack-date-range").textContent = tr.cyclePillPackSetup||"Set your cycle start date to begin";
    // Show empty greyed pills
    for(let i=0;i<28;i++){
      const cell=document.createElement("div"); cell.className="pill-cell";
      const pill=document.createElement("div"); pill.className=`pill ${i<21?"pink":"white-pill"} taken`;
      const inner=document.createElement("div"); inner.className="pill-inner";
      pill.appendChild(inner);
      const num=document.createElement("div"); num.className="pill-day-num"; num.textContent="—";
      cell.appendChild(pill); cell.appendChild(num);
      grid.appendChild(cell);
    }
  }
}

function highlightCalendarDate(dk){
  document.querySelectorAll(".cycle-cal-day[data-date]").forEach(el=>{
    el.classList.remove("pill-highlighted","cal-hover-highlight");
    if(el.dataset.date===dk) el.classList.add("pill-highlighted");
  });
}
function clearCalendarHighlight(){
  document.querySelectorAll(".cycle-cal-day").forEach(el=>el.classList.remove("pill-highlighted","cal-hover-highlight"));
}

function renderCycleCalendar(){
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const monthNames=tr.monthNames||["January","February","March","April","May","June","July","August","September","October","November","December"];
  document.getElementById("cycle-cal-title").textContent = `${monthNames[cycleCalMonth]} ${cycleCalYear}`;
  // Also sync the top header to reflect cycle month/year
  if(state.tab==="cycle"){
    document.getElementById("month-title").textContent = monthNames[cycleCalMonth];
    document.getElementById("year-label").textContent = cycleCalYear;
  }
  const cal = document.getElementById("cycle-calendar");
  cal.innerHTML = "";

  const anchor = getAnchor();
  const cycleLen = state.cycleData.cycleLen || 28;
  const days = tr.days||["Mo","Tu","We","Th","Fr","Sa","Su"];
  days.forEach(d=>{const h=document.createElement("div");h.className="cycle-cal-header";h.textContent=d;cal.appendChild(h);});

  const first=new Date(cycleCalYear,cycleCalMonth,1);
  let dow=(first.getDay()+6)%7;
  const daysInMonth=new Date(cycleCalYear,cycleCalMonth+1,0).getDate();
  const daysInPrev=new Date(cycleCalYear,cycleCalMonth,0).getDate();
  const todayD=new Date();todayD.setHours(0,0,0,0);

  for(let i=dow-1;i>=0;i--){
    const cell=document.createElement("div");cell.className="cycle-cal-day other-month";cell.textContent=daysInPrev-i;cal.appendChild(cell);
  }
  for(let d=1;d<=daysInMonth;d++){
    const date=new Date(cycleCalYear,cycleCalMonth,d);date.setHours(0,0,0,0);
    let tag = cycleMode==="pill"
      ? getPillDayTag(date, anchor)
      : getNaturalDayTag(date, anchor, cycleLen);
    const cell=document.createElement("div");
    const dk=dateKey(date);
    cell.className="cycle-cal-day"+(tag?" "+tag:"")+(date.getTime()===todayD.getTime()?" today-cycle":"");
    // Intimacy icon indicator
    const dayEntry=(state.cycleData.days||{})[dk]||{};
    const intArr=dk===todayKey()?todayIntimacy:(dayEntry.intimacy||[]);
    if(intArr.length){
      cell.classList.add("has-intimacy");
      const CYEMOJI={kiss:"💋",protected:"🛡️",unprotected:"🔥",oral:"💜",other:"✨"};
      const dn=document.createElement("span"); dn.className="cy-day-num"; dn.textContent=d; cell.appendChild(dn);
      const eiw=document.createElement("div"); eiw.className="cy-int-icons";
      intArr.forEach(k=>{const s=document.createElement("span");s.textContent=CYEMOJI[k]||"💞";eiw.appendChild(s);});
      cell.appendChild(eiw);
    } else {
      cell.textContent=d;
    }
    cell.dataset.date=dk;
    cal.appendChild(cell);
  }

  // Legend
  const legend=document.getElementById("cycle-legend");
  const cs=getComputedStyle(document.body);
  const cPeriod=cs.getPropertyValue('--cy-period').trim()||'rgb(255,40,120)';
  const cFertile=cs.getPropertyValue('--cy-fertile').trim()||'rgb(112,231,247)';
  const cOvul=cs.getPropertyValue('--cy-ovulation').trim()||'rgb(0,195,255)';
  const cPms=cs.getPropertyValue('--cy-pms').trim()||'rgb(255,114,161)';
  const cPill=cs.getPropertyValue('--cy-pill').trim()||'rgb(224,90,154)';
  const cPlacebo=cs.getPropertyValue('--cy-placebo').trim()||'rgb(255,255,255)';
  if(cycleMode==="pill"){
    legend.innerHTML=`
      <div class="legend-item"><div class="legend-dot" style="background:${cPill};opacity:.8;border:2px solid ${cPill};"></div> ${tr.cyclePillCalLegendActive||tr.cyclePill||"Active"}</div>
      <div class="legend-item"><div class="legend-dot" style="background:${cPlacebo};opacity:.7;border:2px solid ${cPlacebo};"></div> ${tr.cyclePillCalLegendPlacebo||"Placebo"}</div>`;
  } else {
    legend.innerHTML=`
      <div class="legend-item"><div class="legend-dot" style="background:${cPeriod};opacity:.8;border:2px solid ${cPeriod};"></div> ${tr.cyclePeriodPhase||"Period"}</div>
      <div class="legend-item"><div class="legend-dot" style="background:${cFertile};opacity:.8;border:2px solid ${cFertile};"></div> ${tr.cycleFertilePhase||"Fertile"}</div>
      <div class="legend-item"><div class="legend-dot" style="background:${cOvul};opacity:.8;border:2px solid ${cOvul};"></div> ${tr.cycleOvulationPhase||"Ovulation"}</div>
      <div class="legend-item"><div class="legend-dot" style="background:${cPms};opacity:.8;border:2px solid ${cPms};"></div> ${tr.cyclePmsPhase||"PMS Zone"}</div>`;
  }
}

function renderCycleInsights(){
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const anchor = getAnchor();
  const ins = document.getElementById("cycle-insights");
  if(!anchor){ins.innerHTML=`<div style="font-size:12px;color:var(--text-muted);">${tr.cycleSetupHint||"Set your cycle start date to see insights."}</div>`;return;}
  const cycleLen = state.cycleData.cycleLen||28;
  const today=new Date();today.setHours(0,0,0,0);
  const base=new Date(anchor.start);base.setHours(0,0,0,0);
  const daysSinceBase=Math.floor((today-base)/86400000);
  const dayOfCycle=(daysSinceBase%cycleLen)+1;
  const daysUntilNext=cycleLen-dayOfCycle+1;

  if(cycleMode==="pill"){
    const packDay=(daysSinceBase%28)+1;
    const pillType=packDay<=21?(tr.cycleInsightsActive||"Active (Pink)"):(tr.cycleInsightsPlacebo||"Placebo (White)");
    const takenToday=!!(state.cycleData.takenPills||{})[todayKey()];
    ins.innerHTML=`
      <div class="cycle-insight-row"><span class="cycle-insight-label">${tr.cycleInsightsPackDay||"Pack Day"}</span><span class="cycle-insight-val" style="color:#e05a9a;">Day ${packDay}/28</span></div>
      <div class="cycle-insight-row"><span class="cycle-insight-label">${tr.cycleInsightsPillType||"Pill Type"}</span><span class="cycle-insight-val">${pillType}</span></div>
      <div class="cycle-insight-row"><span class="cycle-insight-label">${tr.cycleInsightsTakenToday||"Taken Today"}</span><span class="cycle-insight-val" style="color:${takenToday?"#3ecfb2":"#f5a623"};">${takenToday?(tr.cycleInsightsTakenYes||"✓ Yes"):(tr.cycleInsightsTakenNo||"✗ Not yet")}</span></div>
      <div class="cycle-insight-row"><span class="cycle-insight-label">${tr.cycleInsightsNextPeriod||"Next Period"}</span><span class="cycle-insight-val" style="color:#f5a623;">${daysUntilNext<=0?(tr.cycleInsightsToday||"Today"):daysUntilNext+" "+(tr.cycleInsightsDays||"days")}</span></div>`;
  } else {
    const ovDay=cycleLen-14;
    const daysUntilOv=ovDay-dayOfCycle+1;
    ins.innerHTML=`
      <div class="cycle-insight-row"><span class="cycle-insight-label">${tr.cycleInsightsCycleDay||"Cycle Day"}</span><span class="cycle-insight-val" style="color:#e05a9a;">Day ${dayOfCycle}</span></div>
      <div class="cycle-insight-row"><span class="cycle-insight-label">${tr.cycleInsightsCycleLen||"Cycle Length"}</span><span class="cycle-insight-val">${cycleLen} ${tr.cycleInsightsDays||"days"}</span></div>
      <div class="cycle-insight-row"><span class="cycle-insight-label">${tr.cycleInsightsNextPeriod||"Next Period"}</span><span class="cycle-insight-val" style="color:#f5a623;">${daysUntilNext<=0?(tr.cycleInsightsOverdue||"Today / Overdue"):daysUntilNext+" "+(tr.cycleInsightsDays||"days")}</span></div>
      <div class="cycle-insight-row"><span class="cycle-insight-label">${tr.cycleInsightsOvulation||"Ovulation Est."}</span><span class="cycle-insight-val" style="color:rgb(0,195,255);">${daysUntilOv<0?(tr.cycleInsightsPassed||"Passed"):daysUntilOv===0?(tr.cycleInsightsToday||"Today"):daysUntilOv+" "+(tr.cycleInsightsDays||"days")}</span></div>`;
  }
}

function renderCycleStatus(){
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const anchor = getAnchor();
  const card = document.getElementById("cycle-status-inner");
  if(!anchor){card.innerHTML=`<div style="font-size:12px;color:var(--text-muted);line-height:1.6;">${tr.cycleSetupHint||"Set your cycle start date to get phase insights."}</div>`;return;}
  const cycleLen=state.cycleData.cycleLen||28;
  const today=new Date();today.setHours(0,0,0,0);
  const tag=getNaturalDayTag(today,anchor,cycleLen);
  const phases={
    period:{emoji:"🌹",label:tr.cyclePeriodPhase||"Menstrual Phase",desc:tr.cyclePeriodDesc||"Rest and be gentle with yourself.",color:"rgb(255,40,120)"},
    fertile:{emoji:"🌿",label:tr.cycleFertilePhase||"Fertile Window",desc:tr.cycleFertileDesc||"High energy. Great for social plans.",color:"rgb(112,231,247)"},
    ovulation:{emoji:"✨",label:tr.cycleOvulationPhase||"Ovulation",desc:tr.cycleOvulationDesc||"Peak energy and confidence!",color:"rgb(0,195,255)"},
    "pms-zone":{emoji:"🌙",label:tr.cyclePmsPhase||"Luteal / PMS",desc:tr.cyclePmsDesc||"Slow down, prioritize rest.",color:"rgb(255,114,161)"},
  };
  const ph=phases[tag]||{emoji:"🌸",label:tr.cycleFollicularPhase||"Follicular Phase",desc:tr.cycleFollicularDesc||"Energy is rising!",color:"#4f6ef7"};
  card.innerHTML=`<div style="font-size:32px;margin-bottom:8px;">${ph.emoji}</div><div style="font-size:16px;font-weight:800;color:${ph.color};margin-bottom:4px;">${ph.label}</div><div style="font-size:13px;color:var(--text-sec);line-height:1.6;">${ph.desc}</div>`;
}

function renderCycleSymptoms(){
  const grid=document.getElementById("symptom-grid");grid.innerHTML="";
  const symptoms=getSymptoms();
  symptoms.forEach((s,i)=>{
    const enKey=SYMPTOMS_EN[i]||s; // use English key for storage, translated label for display
    const btn=document.createElement("button");
    btn.className="symptom-btn"+(todaySymptoms.includes(enKey)?" active":"");
    btn.textContent=s;btn.dataset.sym=enKey;
    btn.addEventListener("click",()=>{
      if(todaySymptoms.includes(enKey))todaySymptoms=todaySymptoms.filter(x=>x!==enKey);
      else todaySymptoms.push(enKey);
      btn.classList.toggle("active",todaySymptoms.includes(enKey));
    });
    grid.appendChild(btn);
  });
}
function updateSymptomButtons(){document.querySelectorAll(".symptom-btn").forEach(b=>b.classList.toggle("active",todaySymptoms.includes(b.dataset.sym)));}

function renderCycleMood(){
  const row=document.getElementById("cycle-mood-row");row.innerHTML="";
  const moodLabels=getMoodLabels();
  MOODS.forEach((m,i)=>{
    const btn=document.createElement("button");
    btn.className="cycle-mood-btn"+(todayMood===m?" active":"");
    btn.title=moodLabels[i]||m;btn.textContent=m;btn.dataset.mood=m;
    btn.addEventListener("click",()=>{todayMood=(todayMood===m)?"":m;updateMoodButtons();});
    row.appendChild(btn);
  });
}
function updateMoodButtons(){document.querySelectorAll(".cycle-mood-btn").forEach(b=>b.classList.toggle("active",todayMood===b.dataset.mood));}

// ── INTIMACY COLOURS (key → css colour) ─────────────────────────
const INTIMACY_COLORS={kiss:"#f5a623",protected:"#3ecfb2",unprotected:"#ff5a7a",oral:"#b478f0",other:"#4f6ef7"};
const INTIMACY_CLASS={kiss:"ib-kiss",protected:"ib-prot",unprotected:"ib-unprot",oral:"ib-oral",other:"ib-other"};
let todayIntimacy = []; // array of keys active today

function renderIntimacyTracker(){
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const grid=document.getElementById("intimacy-grid");
  if(!grid)return;
  grid.innerHTML="";

  const types  = tr.cycleIntimacyTypes  || ["💋 Kiss","🛡 Protected Sex","🔥 Unprotected Sex","💜 Oral","✨ Other Intimacy"];
  const keys   = tr.cycleIntimacyKeys   || ["kiss","protected","unprotected","oral","other"];

  // Button row
  const row=document.createElement("div");
  row.className="intimacy-toggle-row";
  types.forEach((label,i)=>{
    const k=keys[i];
    const btn=document.createElement("button");
    btn.className="intimacy-btn "+(INTIMACY_CLASS[k]||"")+(todayIntimacy.includes(k)?" active":"");
    btn.textContent=label; btn.dataset.ikey=k;
    btn.addEventListener("click",()=>{
      if(todayIntimacy.includes(k)) todayIntimacy=todayIntimacy.filter(x=>x!==k);
      else todayIntimacy.push(k);
      renderIntimacyTracker();
      renderPregnancyTracker();
    });
    row.appendChild(btn);
  });
  grid.appendChild(row);

  // Mini calendar for the month
  renderIntimacyCalendar();
}

function renderIntimacyCalendar(){
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const strip=document.getElementById("intimacy-history-strip");
  if(!strip)return;
  strip.innerHTML="";

  const title=document.createElement("div");
  title.className="intimacy-history-title";
  title.textContent=tr.cycleIntimacyHistoryTitle||"This month";
  strip.appendChild(title);

  const keys  = tr.cycleIntimacyKeys||["kiss","protected","unprotected","oral","other"];
  const days  = tr.days||["Mo","Tu","We","Th","Fr","Sa","Su"];
  const calWrap=document.createElement("div"); calWrap.className="intimacy-calendar-row";

  // Day headers
  days.forEach(d=>{
    const h=document.createElement("div"); h.className="intimacy-cal-header"; h.textContent=d; calWrap.appendChild(h);
  });

  const now=new Date(); now.setHours(0,0,0,0);
  const y=cycleCalYear, m=cycleCalMonth;
  const first=new Date(y,m,1);
  let dow=(first.getDay()+6)%7;
  const daysInMonth=new Date(y,m+1,0).getDate();
  const daysInPrev =new Date(y,m,0).getDate();

  // Leading blanks
  for(let i=dow-1;i>=0;i--){
    const c=document.createElement("div"); c.className="intimacy-cal-cell other-month-int"; c.textContent=daysInPrev-i; calWrap.appendChild(c);
  }

  const intimacyDays=state.cycleData.days||{};
  for(let d=1;d<=daysInMonth;d++){
    const date=new Date(y,m,d); date.setHours(0,0,0,0);
    const dk=dateKey(date);
    const isToday=date.getTime()===now.getTime();
    const dayEntry=(intimacyDays[dk])||{};
    // Use todayIntimacy buffer for today's unsaved state
    const intimacyArr=isToday ? todayIntimacy : (dayEntry.intimacy||[]);
    const hasData=intimacyArr.length>0;

    const cell=document.createElement("div");
    cell.className="intimacy-cal-cell"+(isToday?" today-int":"")+(hasData?" has-data":"");
    cell.title=dk;
    cell.textContent=d;

    if(hasData){
      cell.textContent="";
      // Show number of day small, then emoji row
      const dayNum=document.createElement("div"); dayNum.className="int-cell-day"; dayNum.textContent=d; cell.appendChild(dayNum);
      const emojiRow=document.createElement("div"); emojiRow.className="int-emoji-row";
      intimacyArr.forEach(k=>{
        const idx=keys.indexOf(k);
        const fullLabel=(tr.cycleIntimacyTypes||["💋","🛡","🔥","💜","✨"])[idx]||k;
        // Extract just the emoji (first grapheme cluster)
        const emoji=[...fullLabel][0]||"💞";
        const span=document.createElement("span"); span.className="int-emoji"; span.textContent=emoji;
        span.title=fullLabel; emojiRow.appendChild(span);
      });
      cell.appendChild(emojiRow);
    }
    calWrap.appendChild(cell);
  }
  strip.appendChild(calWrap);

  // Legend
  const legend=document.createElement("div"); legend.className="intimacy-legend";
  const types=tr.cycleIntimacyTypes||["💋 Kiss","🛡 Protected","🔥 Unprotected","💜 Oral","✨ Other"];
  keys.forEach((k,i)=>{
    const li=document.createElement("div"); li.className="int-legend-item";
    const fullLabel=types[i]||k;
    const chars=[...fullLabel];
    // grab leading emoji chars (can be multi-codepoint)
    let emojiEnd=0;
    if(chars.length&&chars[0].match(/\p{Emoji}/u)){emojiEnd=1;if(chars[1]&&chars[1]==='\uFE0F')emojiEnd=2;}
    const icon=chars.slice(0,emojiEnd||1).join('');
    const label=fullLabel.slice(icon.length).trim();
    li.innerHTML=`<span class="int-legend-icon">${icon}</span>${label||k}`;
    legend.appendChild(li);
  });
  strip.appendChild(legend);
}

// ── PREGNANCY POSSIBILITY TRACKER ──────────────────────────────
function calcPregnancyRisk(){
  // Returns { score:0-1, level:'none'|'low'|'medium'|'high'|'very_high', factors:[] }
  const anchor=getAnchor();
  if(!anchor) return null;

  const cycleLen=state.cycleData.cycleLen||28;
  const isPill=cycleMode==="pill";
  const today=new Date(); today.setHours(0,0,0,0);
  const tag=getNaturalDayTag(today,anchor,cycleLen);
  const tk=todayKey();

  // Base phase risk score (realistic daily unprotected risk by cycle phase)
  const phaseScore={period:0.02,fertile:0.15,ovulation:0.33,null:0.04,"pms-zone":0.02}[tag]??0.04;

  // Recent intimacy (last 5 days including today)
  let hasUnprotected=false, hasProtected=false, hasKiss=false, hasOral=false;
  for(let i=0;i<5;i++){
    const d=addDays(today,-i); const dk=dateKey(d);
    const arr=dk===tk ? todayIntimacy : ((state.cycleData.days[dk]||{}).intimacy||[]);
    if(arr.includes("unprotected")) hasUnprotected=true;
    if(arr.includes("protected"))   hasProtected=true;
    if(arr.includes("kiss"))        hasKiss=true;
    if(arr.includes("oral"))        hasOral=true;
  }

  // Pill factor
  let pillActive=false;
  if(isPill){
    const base=new Date(anchor.start); base.setHours(0,0,0,0);
    const daysSince=Math.floor((today-base)/86400000);
    const packDay=(daysSince%28)+1;
    pillActive=packDay<=21;
  }

  // Score computation — kiss and oral have NO pregnancy risk
  let score=phaseScore;
  if(hasUnprotected) score*=1.0;     // full phase risk
  else if(hasProtected) score*=0.02; // ~98% effective barrier
  else score=0; // no pregnancy-risk intimacy logged → genuinely 0

  if(pillActive) score*=0.01; // ~99% effective

  // Clamp. Only enforce a tiny non-zero floor when some contact was logged —
  // if nothing was logged, 0% is the correct answer.
  if(score>0) score=Math.max(0.00002,score);
  score=Math.min(1,score);
  const level=score<0.005?"none":score<0.05?"low":score<0.12?"medium":score<0.25?"high":"very_high";

  return{
    score, level, tag,
    hasUnprotected, hasProtected, hasKiss, hasOral,
    pillActive, phaseScore
  };
}

function renderPregnancyTracker(){
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const el=document.getElementById("pregnancy-inner");
  if(!el)return;

  const anchor=getAnchor();
  if(!anchor){el.innerHTML=`<div class="preg-no-data">${tr.cyclePregnancyNoData||"Set your cycle start date to see pregnancy risk estimates."}</div>`;return;}

  const risk=calcPregnancyRisk();
  if(!risk){el.innerHTML="";return;}

  const levelMap={none:0,low:1,medium:2,high:3,very_high:4};
  const n=levelMap[risk.level]||0;
  const levelLabels=[
    tr.cyclePregnancyRiskNone||"Minimal",
    tr.cyclePregnancyRiskLow||"Low",
    tr.cyclePregnancyRiskMedium||"Medium",
    tr.cyclePregnancyRiskHigh||"High",
    tr.cyclePregnancyRiskVeryHigh||"Very High"
  ];
  const levelColors=["#3ecfb2","#3ecfb2","#f5a623","#ff7a40","#ff2050"];
  const color=levelColors[n];
  const label=levelLabels[n];

  // Gauge arc (semicircle)
  const pct=Math.min(1,risk.score*2.5+n*0.18); // visual boost for clarity
  const r=46, cx=60, cy=60;
  const arcLen=Math.PI*r; // half circumference
  const filled=pct*arcLen;
  const dash=`${filled} ${arcLen-filled+0.1}`;

  // Phase label
  const phaseLabels=tr.cyclePregnancyPhaseLabels||{};
  const phaseKey={period:"period",fertile:"fertile",ovulation:"ovulation","pms-zone":"pms",null:"follicular"}[risk.tag]??"follicular";
  const phaseText=phaseLabels[phaseKey]||phaseKey;

  // Protection factor text
  const protText=risk.pillActive
    ? (tr.cyclePregnancyPillYes||"Yes — very low")
    : risk.hasUnprotected ? (tr.cyclePregnancyProtNo||"No — full risk")
    : risk.hasProtected   ? (tr.cyclePregnancyProtYes||"Yes — reduced")
    : "—";
  const protBadge=risk.pillActive||risk.hasProtected ? "preg-badge-low" : risk.hasUnprotected ? "preg-badge-high" : "preg-badge-low";

  const phaseBadge=phaseKey==="ovulation"?"preg-badge-very-high":phaseKey==="fertile"?"preg-badge-high":phaseKey==="follicular"||phaseKey==="period"||phaseKey==="pms"?"preg-badge-low":"preg-badge-med";
  const overallBadge=["preg-badge-low","preg-badge-low","preg-badge-med","preg-badge-high","preg-badge-very-high"][n];

  const pctRaw=risk.score*100;
  const pctDisplay=pctRaw===0 ? '0%' : pctRaw>=1 ? Math.round(pctRaw)+'%' : (pctRaw>=0.1 ? pctRaw.toFixed(2) : pctRaw.toFixed(3))+'%';

  el.innerHTML=`
    <div class="preg-risk-gauge">
      <div class="preg-gauge-arc">
        <svg viewBox="0 0 120 66" xmlns="http://www.w3.org/2000/svg">
          <path d="M 14 60 A 46 46 0 0 1 106 60" fill="none" stroke="var(--border)" stroke-width="11" stroke-linecap="round"/>
          <path d="M 14 60 A 46 46 0 0 1 106 60" fill="none" stroke="${color}" stroke-width="11" stroke-linecap="round"
            stroke-dasharray="${dash}" style="transition:stroke-dasharray .7s cubic-bezier(.4,0,.2,1);"/>
        </svg>
      </div>
      <div class="preg-risk-label preg-risk-hoverable" style="color:${color};" data-pct="${pctDisplay}">
        <span class="preg-label-text">${label}</span>
        <span class="preg-label-pct">${pctDisplay}</span>
      </div>
      <div class="preg-risk-sub">${phaseText}</div>
    </div>
    <div class="preg-factors">
      <div class="preg-factor-row">
        <div class="preg-factor-icon">🌸</div>
        <div class="preg-factor-text">${tr.cyclePregnancyFactorPhase||"Cycle Phase"}</div>
        <div class="preg-factor-badge ${phaseBadge}">${phaseText.split("—")[0].trim()}</div>
      </div>
      <div class="preg-factor-row">
        <div class="preg-factor-icon">💞</div>
        <div class="preg-factor-text">${tr.cyclePregnancyFactorContact||"Recent Intimacy"}</div>
        <div class="preg-factor-badge ${risk.hasUnprotected?"preg-badge-high":risk.hasProtected?"preg-badge-med":"preg-badge-low"}">${risk.hasUnprotected?"🔥 Yes":risk.hasProtected?"🛡 Yes":"—"}</div>
      </div>
      <div class="preg-factor-row">
        <div class="preg-factor-icon">🛡</div>
        <div class="preg-factor-text">${tr.cyclePregnancyFactorProtection||"Protection Used"}</div>
        <div class="preg-factor-badge ${protBadge}">${protText}</div>
      </div>
      ${cycleMode==="pill"?`
      <div class="preg-factor-row">
        <div class="preg-factor-icon">💊</div>
        <div class="preg-factor-text">${tr.cyclePregnancyFactorPill||"Pill Active"}</div>
        <div class="preg-factor-badge ${risk.pillActive?"preg-badge-low":"preg-badge-med"}">${risk.pillActive?(tr.cyclePregnancyPillYes||"Yes — very low"):(tr.cyclePregnancyPillNo||"No")}</div>
      </div>`:""}
    </div>
    ${renderPregnancyHistory(tr)}
    <div class="preg-disclaimer">${tr.cyclePregnancyDisclaimer||""}</div>`;
}

function renderPregnancyHistory(tr){
  const anchor=getAnchor();
  if(!anchor) return "";
  const cycleLen=state.cycleData.cycleLen||28;
  const today=new Date(); today.setHours(0,0,0,0);
  const base=new Date(anchor.start); base.setHours(0,0,0,0);
  const days=state.cycleData.days||{};
  const types=tr.cycleIntimacyTypes||["💋 Kiss","🛡 Protected","🔥 Unprotected","💜 Oral","✨ Other"];
  const keys=tr.cycleIntimacyKeys||["kiss","protected","unprotected","oral","other"];

  // Collect unprotected events in current cycle
  const startOfCycle=new Date(base);
  const daysSince=Math.floor((today-base)/86400000);
  const cycleStart=addDays(base,Math.floor(daysSince/cycleLen)*cycleLen);

  const events=[];
  for(let i=0;i<cycleLen;i++){
    const d=addDays(cycleStart,i);
    if(d>today) break;
    const dk=dateKey(d);
    const arr=dk===todayKey()?todayIntimacy:((days[dk]||{}).intimacy||[]);
    if(arr.length){
      const tag=getNaturalDayTag(d,anchor,cycleLen);
      const riskLabels={period:tr.cyclePregnancyRiskNone||"Minimal",null:tr.cyclePregnancyRiskLow||"Low",fertile:tr.cyclePregnancyRiskHigh||"High",ovulation:tr.cyclePregnancyRiskVeryHigh||"Very High","pms-zone":tr.cyclePregnancyRiskNone||"Minimal"};
      const riskColors={period:"#3ecfb2",null:"#3ecfb2",fertile:"#ff7a40",ovulation:"#ff2050","pms-zone":"#3ecfb2"};
      events.push({dk,arr,tag,riskLabel:riskLabels[tag]??tr.cyclePregnancyRiskLow,riskColor:riskColors[tag]??"#3ecfb2"});
    }
  }
  if(!events.length) return `<div class="preg-history-section"><div class="preg-history-title">${tr.cyclePregnancyHistoryTitle||"Recent events"}</div><div style="font-size:11px;color:var(--text-muted);">${tr.cyclePregnancyHistoryEmpty||"None logged."}</div></div>`;

  const rows=events.slice(-8).reverse().map(e=>{
    const typeLabels=e.arr.map(k=>{const idx=keys.indexOf(k);return idx>=0?types[idx]:k;}).join(", ");
    return `<div class="preg-hist-row">
      <div class="preg-hist-date">${e.dk}</div>
      <div class="preg-hist-type">${typeLabels}</div>
      <div class="preg-hist-risk" style="color:${e.riskColor}">${e.riskLabel}</div>
    </div>`;
  }).join("");
  return `<div class="preg-history-section"><div class="preg-history-title">${tr.cyclePregnancyHistoryTitle||"Recent events"}</div><div class="preg-history-table">${rows}</div></div>`;
}

function renderCycleHistory(){
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const list=document.getElementById("cycle-history-list");list.innerHTML="";
  const allPeriods=(state.cycleData.periods||[]).slice().sort((a,b)=>new Date(b.start)-new Date(a.start));
  const realPeriods=allPeriods.filter(p=>!p.predicted);
  if(!realPeriods.length){list.innerHTML=`<div style="font-size:12px;color:var(--text-muted);">${tr.cycleHistoryNoData||"No cycles logged yet."}</div>`;return;}
  realPeriods.forEach((p,i)=>{
    const row=document.createElement("div");row.className="history-item";
    row.dataset.cycstart=p.start;
    row.innerHTML=`
      <div style="flex:1;">
        <div style="font-size:12px;font-weight:700;color:var(--text-sec);">🌹 ${p.start}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:1px;">${p.dur||5} ${tr.cycleHistoryDayPeriod||"day period"}</div>
      </div>
      <button class="history-edit-btn" data-heidx="${i}" title="Edit">✎</button>
      <button class="history-remove-btn" data-cycidx="${i}">✕</button>`;
    list.appendChild(row);
  });
}

// ── EVENTS ──────────────────────────────────────────────────────────────────

// Mode switch
document.querySelectorAll(".cycle-mode-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    cycleMode = btn.dataset.cmode;
    state.cycleData.mode = cycleMode;
    saveCycle(); renderCycleTracker();
  });
});

if(CURRENT_PAGE==="cycle"){ document.getElementById("add-cycle-btn").addEventListener("click",()=>{
  const start=document.getElementById("cycle-start-input").value;
  if(!start)return;
  const dur=parseInt(document.getElementById("cycle-duration-input").value)||5;
  const cycleLen=parseInt(document.getElementById("cycle-length-input").value)||28;
  state.cycleData.cycleLen=cycleLen;
  if(!state.cycleData.periods)state.cycleData.periods=[];
  // Remove any existing entry for same date
  state.cycleData.periods=state.cycleData.periods.filter(p=>p.start!==start&&!p.predicted);
  state.cycleData.periods.push({start,dur,predicted:false});
  state.cycleData.periods.sort((a,b)=>new Date(a.start)-new Date(b.start));
  saveCycle();renderCycleTracker();
});

document.getElementById("cycle-history-list").addEventListener("click",e=>{
  // Edit button
  const eb=e.target.closest(".history-edit-btn[data-heidx]");
  if(eb){
    const realPeriods=(state.cycleData.periods||[]).filter(p=>!p.predicted).slice().sort((a,b)=>new Date(b.start)-new Date(a.start));
    const p=realPeriods[+eb.dataset.heidx];
    if(!p)return;
    const row=eb.closest(".history-item");
    if(row.classList.contains("editing"))return;
    row.classList.add("editing");
    const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
    row.innerHTML=`
      <div class="history-edit-wrap">
        <label style="font-size:11px;color:var(--text-muted);font-weight:700;">Date</label>
        <input class="history-edit-input history-edit-date" type="hidden" value="${p.start}" data-origstart="${p.start}"/><button type="button" class="dp-trigger history-edit-dp-trigger" style="min-width:130px;font-size:12px;padding:6px 9px;"><span class="dp-trigger-text dp-placeholder">— Select date —</span><svg class="dp-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></button>
        <label style="font-size:11px;color:var(--text-muted);font-weight:700;">Days</label>
        <input class="history-edit-input history-edit-num" type="number" min="1" max="14" value="${p.dur||5}"/>
        <button class="history-edit-save">✓ Save</button>
        <button class="history-edit-cancel">✕</button>
      </div>`;
    {
      const dpInp = row.querySelector('.history-edit-date');
      const dpTrig = row.querySelector('.history-edit-dp-trigger');
      const dpInst = new DatePicker(dpInp, dpTrig);
      DatePicker._all.push(dpInst);
      dpInst._syncValue(p.start);
      dpInst.openPopup();
    }
    return;
  }

  // Save inline edit
  const sb=e.target.closest(".history-edit-save");
  if(sb){
    const row=sb.closest(".history-item");
    const origStart=row.querySelector('.history-edit-date').dataset.origstart;
    const newStart=row.querySelector('.history-edit-date').value;
    const newDur=Math.max(1,parseInt(row.querySelector('.history-edit-num').value)||5);
    const entry=state.cycleData.periods.find(x=>x.start===origStart&&!x.predicted);
    if(entry&&newStart){entry.start=newStart;entry.dur=newDur;}
    state.cycleData.periods.sort((a,b)=>new Date(a.start)-new Date(b.start));
    saveCycle();renderCycleTracker();
    return;
  }

  // Cancel inline edit
  const xb=e.target.closest(".history-edit-cancel");
  if(xb){renderCycleHistory();return;}

  // Remove button
  const rb=e.target.closest(".history-remove-btn[data-cycidx]");
  if(!rb)return;
  const periods=(state.cycleData.periods||[]).filter(p=>!p.predicted).slice().sort((a,b)=>new Date(b.start)-new Date(a.start));
  const p=periods[+rb.dataset.cycidx];
  if(p)state.cycleData.periods=state.cycleData.periods.filter(x=>x.start!==p.start);
  saveCycle();renderCycleTracker();
});

document.getElementById("save-cycle-day-btn").addEventListener("click",()=>{
  const tk=todayKey();
  if(!state.cycleData.days)state.cycleData.days={};
  state.cycleData.days[tk]={
    symptoms:[...todaySymptoms],
    mood:todayMood,
    notes:document.getElementById("cycle-notes-input").value,
    intimacy:[...todayIntimacy]
  };
  saveCycle();
  renderIntimacyCalendar();
  renderPregnancyTracker();
  const ind=document.getElementById("save-indicator");ind.classList.add("show");setTimeout(()=>ind.classList.remove("show"),1700);
});

document.getElementById("cycle-prev-month").addEventListener("click",()=>{
  if(cycleCalMonth===0){cycleCalMonth=11;cycleCalYear--;}else cycleCalMonth--;
  renderCycleCalendar();
});
document.getElementById("cycle-next-month").addEventListener("click",()=>{
  if(cycleCalMonth===11){cycleCalMonth=0;cycleCalYear++;}else cycleCalMonth++;
  renderCycleCalendar();
}); }

// ─── LANGUAGE SELECTOR — fixed-position dropdown, positioned via JS ───────────
const langBtn=document.getElementById('lang-btn');
const langDropdown=document.getElementById('lang-dropdown');
let langDropOpen=false;

function openLangDrop(){
  const rect=langBtn.getBoundingClientRect();
  langDropdown.style.top=(rect.bottom+6)+'px';
  // Align right edge of dropdown to right edge of button
  const dropW=langDropdown.offsetWidth||160;
  langDropdown.style.left=Math.max(4,rect.right-dropW)+'px';
  langDropdown.style.right='auto';
  langDropdown.classList.add('open');
  langBtn.classList.add('open');
  langDropOpen=true;
}

function closeLangDrop(){
  langDropdown.classList.remove('open');
  langBtn.classList.remove('open');
  langDropOpen=false;
}

langBtn.addEventListener('click',function(e){
  e.stopPropagation();
  if(langDropOpen){closeLangDrop();}else{openLangDrop();}
});

// Close on outside click
document.addEventListener('click',function(e){
  const sbLangBtn = document.getElementById('sb-lang-btn');
  const isOpen = langDropOpen || langDropdown.classList.contains('open');
  if(isOpen && !langDropdown.contains(e.target) && e.target!==langBtn && e.target!==sbLangBtn){
    langDropdown.classList.remove('open');
    langBtn.classList.remove('open');
    langDropOpen=false;
  }
});

// Handle option clicks — directly on each option element
langDropdown.querySelectorAll('.lang-option').forEach(function(opt){
  opt.addEventListener('click',function(e){
    e.stopPropagation();
    const lang=opt.dataset.lang;
    if(!lang||!TRANSLATIONS[lang])return;
    state.lang=lang;
    closeLangDrop();
    applyTranslations();
    render(false);
    if(state.tab==="days")renderDaysView(false);
    else if(state.tab==="tasks")renderTasksView();
    else if(state.tab==="analysis"){
      const{days,total,done,pct}=calcStats();const wg=getWeekGroups();
      renderAnalysis(days,total,done,pct,calcHabitPcts(),wg,calcWeekTotals(wg),calcDowTotals());
    }
    else if(CURRENT_PAGE==="shopping")renderShoppingList();
    else if(CURRENT_PAGE==="cycle")renderCycleTracker();
    else if(CURRENT_PAGE==="finance")renderFinance();
    try{localStorage.setItem(K.lang(),lang);}catch(e){}
  });
});

// ─── POMODORO ─────────────────────────────────────────────────────────────────
let pomoInterval=null,pomoRunning=false,pomoMode="pomo",pomoTotal=1500,pomoRemaining=1500,pomoSessions=1;
let pomoCompletedSessions=0, pomoBreaks=0, pomoFocusSeconds=0;
const POMO_CIRC_NEW=2*Math.PI*96; // r=96 for new larger ring
const POMO_COLORS={pomo:"#e05a9a",break:"#3ecfb2",long:"#a78bfa"};

function getPomoLabel(){
  const map={pomo:t('focusTime'),break:t('shortBreak'),long:t('longBreak')};return map[pomoMode]||t('focusTime');
}

function renderPomoDots(){
  const dots=document.getElementById("pomo-dots");if(!dots)return;
  const total=4;dots.innerHTML="";
  for(let i=0;i<total;i++){
    const d=document.createElement("div");
    d.className="pomo-dot"+(i<pomoCompletedSessions?" done":i===pomoCompletedSessions%total?" current":"");
    dots.appendChild(d);
  }
}

function updatePomoStats(){
  const ss=document.getElementById("pomo-stat-sessions");
  const sf=document.getElementById("pomo-stat-focus");
  const sb=document.getElementById("pomo-stat-breaks");
  if(ss)ss.textContent=pomoCompletedSessions;
  if(sf){const m=Math.floor(pomoFocusSeconds/60);sf.textContent=m+"m";}
  if(sb)sb.textContent=pomoBreaks;
}

function updatePomoDisplay(){
  const m=Math.floor(pomoRemaining/60),s=pomoRemaining%60;
  document.getElementById("pomo-display").textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  document.getElementById("pomo-session-lbl").textContent=`${t('session')} ${pomoSessions}`;
  document.getElementById("pomo-label").textContent=getPomoLabel();
  const col=POMO_COLORS[pomoMode];const arc=document.getElementById("pomo-arc");
  const dash=(pomoRemaining/pomoTotal)*POMO_CIRC_NEW;
  arc.setAttribute("stroke-dasharray",`${dash.toFixed(2)} ${POMO_CIRC_NEW.toFixed(2)}`);arc.style.stroke=col;
  const disp=document.getElementById("pomo-display");
  disp.className="pomo-time-big"+(pomoMode==="break"?" mode-break":pomoMode==="long"?" mode-long":"");
  const widget=document.getElementById("pomo-widget");
  const wasHidden=widget.classList.contains("hidden");
  widget.classList.remove("mode-pomo","mode-break","mode-long");
  if(pomoMode!=="pomo")widget.classList.add("mode-"+pomoMode);
  if(wasHidden)widget.classList.add("hidden");
  renderPomoDots();
  updatePomoStats();
}

function startPomo(){
  if(pomoRunning){
    clearInterval(pomoInterval);pomoRunning=false;document.getElementById("pomo-start").textContent=t('startBtn');
  }else{
    pomoRunning=true;document.getElementById("pomo-start").textContent=t('pauseBtn');
    pomoInterval=setInterval(()=>{
      if(pomoMode==="pomo")pomoFocusSeconds++;
      pomoRemaining--;
      if(pomoRemaining<=0){
        clearInterval(pomoInterval);pomoRunning=false;document.getElementById("pomo-start").textContent=t('startBtn');
        if(pomoMode==="pomo"){pomoSessions++;pomoCompletedSessions++;}
        else{pomoBreaks++;}
        try{const a=new AudioContext();const o=a.createOscillator();const g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=880;o.type="sine";g.gain.setValueAtTime(0,a.currentTime);g.gain.linearRampToValueAtTime(.35,a.currentTime+.05);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.8);o.start(a.currentTime);o.stop(a.currentTime+.8);}catch(e){}
        updatePomoDisplay();
        return;
      }
      updatePomoDisplay();
    },1000);
  }
}

function resetPomo(){
  clearInterval(pomoInterval);pomoRunning=false;pomoRemaining=pomoTotal;
  document.getElementById("pomo-start").textContent=t('startBtn');updatePomoDisplay();
}

function togglePomoWidget(){
  const w=document.getElementById("pomo-widget");
  const bd=document.getElementById("pomo-backdrop");
  const b=document.getElementById("pomo-toggle");
  const isHidden=w.classList.contains("hidden");
  w.classList.toggle("hidden");
  bd.classList.toggle("hidden",!isHidden?true:false);
  const nowOpen=!w.classList.contains("hidden");
  b.classList.toggle("active",nowOpen);
  // Sync sidebar pomo button active state
  const sbPomoBtn=document.getElementById("sb-pomo-btn");
  if(sbPomoBtn) sbPomoBtn.classList.toggle("sb-pomo-active",nowOpen);
}

document.getElementById("pomo-toggle").addEventListener("click",togglePomoWidget);
const _settingsIconBtn = document.getElementById('settings-icon-btn');
if (_settingsIconBtn) _settingsIconBtn.addEventListener('click', openSettingsModal);
document.getElementById("pomo-close-btn").addEventListener("click",()=>{
  document.getElementById("pomo-widget").classList.add("hidden");
  document.getElementById("pomo-backdrop").classList.add("hidden");
  document.getElementById("pomo-toggle").classList.remove("active");
  const sbPomoBtn=document.getElementById('sb-pomo-btn');if(sbPomoBtn)sbPomoBtn.classList.remove('sb-pomo-active');
});
// Click backdrop to close
document.getElementById("pomo-backdrop").addEventListener("click",()=>{
  document.getElementById("pomo-widget").classList.add("hidden");
  document.getElementById("pomo-backdrop").classList.add("hidden");
  document.getElementById("pomo-toggle").classList.remove("active");
  const sbPomoBtn=document.getElementById('sb-pomo-btn');if(sbPomoBtn)sbPomoBtn.classList.remove('sb-pomo-active');
});
document.querySelectorAll(".pomo-mode-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".pomo-mode-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    pomoMode=btn.dataset.mode;pomoTotal=+btn.dataset.time;pomoRemaining=pomoTotal;
    clearInterval(pomoInterval);pomoRunning=false;
    document.getElementById("pomo-start").textContent=t('startBtn');updatePomoDisplay();
  });
});
document.getElementById("pomo-start").addEventListener("click",startPomo);
document.getElementById("pomo-reset").addEventListener("click",resetPomo);

// Keyboard shortcuts: Space = start/pause, Escape = close widget
document.addEventListener("keydown",e=>{
  const w=document.getElementById("pomo-widget");
  if(e.code==="Escape"&&!w.classList.contains("hidden")){
    w.classList.add("hidden");
    document.getElementById("pomo-backdrop").classList.add("hidden");
    document.getElementById("pomo-toggle").classList.remove("active");
  const sbPomoBtn=document.getElementById('sb-pomo-btn');if(sbPomoBtn)sbPomoBtn.classList.remove('sb-pomo-active');
    return;
  }
  if(e.code==="Space"&&!w.classList.contains("hidden")&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"&&e.target.tagName!=="BUTTON"){
    e.preventDefault();startPomo();
  }
});


// ─── TIMETABLE ────────────────────────────────────────────────────────────────
const TT_START = 6, TT_END = 23; // hour range (inclusive start, exclusive end)
const TT_SLOTS = (TT_END - TT_START) * 2; // 30-min slots
const TT_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const TT_CATS = {
  work:    {label:'Work',    bg:'rgba(79,110,247,.25)',  border:'#4f6ef7',  text:'#b0c4ff'},
  study:   {label:'Study',   bg:'rgba(167,139,250,.22)', border:'#a78bfa',  text:'#d0c0ff'},
  health:  {label:'Health',  bg:'rgba(62,207,178,.22)',  border:'#3ecfb2',  text:'#80f0d8'},
  personal:{label:'Personal',bg:'rgba(255,40,120,.20)',  border:'#ff2878',  text:'#ff90bc'},
  social:  {label:'Social',  bg:'rgba(245,166,35,.22)',  border:'#f5a623',  text:'#ffd070'},
  other:   {label:'Other',   bg:'rgba(100,116,139,.22)', border:'#64748b',  text:'#aabccc'},
};

function ttTimeToSlot(hhmm){
  const [h,m]=hhmm.split(':').map(Number);
  return (h-TT_START)*2+(m>=30?1:0);
}

function getTTCurrentWeekIdx(){
  // Default to week containing today if same month, else first week
  const wg=getWeekGroups();
  if(state.year===NOW.getFullYear()&&state.month===NOW.getMonth()){
    for(let i=0;i<wg.length;i++){if(wg[i].some(d=>isToday(d)))return i;}
  }
  return 0;
}

function renderTimetable(){
  const grid=document.getElementById('tt-grid');
  if(!grid)return;

  // Ensure ttWeekStart is set (defaults to Monday of current real week)
  if(!ttWeekStart) ttWeekStart=getTTWeekMonday(new Date());

  // Sync top header to the timetable week's month/year
  if(state.tab==='timetable'){
    document.getElementById('month-title').textContent=getMonthNames()[ttWeekStart.getMonth()];
    document.getElementById('year-label').textContent=ttWeekStart.getFullYear();
  }

  // Get the 7 dates (Mon–Sun) for this week
  const weekDates=getTTWeekDates(); // array of Date objects

  // Today check
  const todayStr=fmtDate(new Date());

  // Build date-string → dow(0=Mon…6=Sun) map
  const weekDateToDow={};
  weekDates.forEach((dt,dow)=>{ weekDateToDow[fmtDate(dt)]=dow; });

  // Week label
  const monthShortNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monDate=weekDates[0], sunDate=weekDates[6];
  const rangeLabel = monDate.getMonth()===sunDate.getMonth()
    ? `${monthShortNames[monDate.getMonth()]} ${monDate.getDate()}–${sunDate.getDate()}, ${monDate.getFullYear()}`
    : `${monthShortNames[monDate.getMonth()]} ${monDate.getDate()} – ${monthShortNames[sunDate.getMonth()]} ${sunDate.getDate()}, ${sunDate.getFullYear()}`;
  const weekLabelEl=document.getElementById('tt-week-label');
  if(weekLabelEl)weekLabelEl.textContent=rangeLabel;

  // Nav buttons: always enabled (no month boundary)
  const prevBtn=document.getElementById('tt-week-prev-btn');
  const nextBtn=document.getElementById('tt-week-next-btn');
  if(prevBtn)prevBtn.disabled=false;
  if(nextBtn)nextBtn.disabled=false;

  let html='';
  html+=`<div class="tt-corner" style="grid-row:1/3;grid-column:1;"><span class="tt-corner-allday">ALL DAY</span></div>`;
  for(let dow=0;dow<7;dow++){
    const dt=weekDates[dow];
    const ds=fmtDate(dt);
    const isTod=ds===todayStr;
    html+=`<div class="tt-day-header${isTod?' tt-today-col':''}" style="grid-row:1;grid-column:${dow+2};">
      <div class="tt-day-header-inner">
        <span>${TT_DAYS[dow]}</span>
        <span class="tt-day-date">${dt.getDate()}</span>
      </div>
    </div>`;
  }
  // Row 2: dedicated all-day strip
  for(let dow=0;dow<7;dow++){
    const isTod=fmtDate(weekDates[dow])===todayStr;
    html+=`<div class="tt-allday-cell${isTod?' tt-today-col':''}" data-allday-col="${dow}" style="grid-row:2;grid-column:${dow+2};"></div>`;
  }
  // Rows 3+: time slots
  for(let s=0;s<TT_SLOTS;s++){
    const row=s+3;
    const totalMins=(TT_START*60)+s*30;
    const hh=Math.floor(totalMins/60),mm=totalMins%60;
    const isHour=mm===0;
    html+=`<div class="tt-time-label${isHour?' tt-hour-label':''}" style="grid-row:${row};grid-column:1;">${isHour?String(hh).padStart(2,'0')+':00':''}</div>`;
    for(let dow=0;dow<7;dow++){
      const isTod=fmtDate(weekDates[dow])===todayStr;
      html+=`<div class="tt-cell${isHour?' tt-hour-cell':''}${isTod?' tt-today-col':''}" style="grid-row:${row};grid-column:${dow+2};"></div>`;
    }
  }
  grid.innerHTML=html;

  // Place events — only show events whose date is in this week
  state.timetable.forEach(ev=>{
    if(!ev.date)return;
    if(!(ev.date in weekDateToDow))return;
    const evDow=weekDateToDow[ev.date];
    const col=evDow+2;
    const cat=TT_CATS[ev.cat]||TT_CATS.other;

    // All-day events: place into the dedicated all-day strip row
    if(ev.isAllDay || ev.start==='00:00' && ev.end==='23:59'){
      const cell=grid.querySelector(`[data-allday-col="${evDow}"]`);
      if(cell){
        const badge=document.createElement('div');
        badge.className='tt-allday-badge';
        badge.style.cssText=`background:${cat.bg};border-color:${cat.border};color:${cat.text};`;
        badge.title=ev.title;
        badge.dataset.ttid=ev.id;
        badge.innerHTML=`<span class="tt-allday-title">${ev.title}</span><button class="tt-event-edit" data-tteditid="${ev.id}" title="Edit">✎</button><button class="tt-event-del" data-ttid="${ev.id}" title="Remove">×</button>`;
        cell.appendChild(badge);
      }
      return;
    }

    // Timed events: clamp to visible range instead of dropping
    let startSlot=ttTimeToSlot(ev.start);
    let endSlot=ttTimeToSlot(ev.end);
    if(isNaN(startSlot)||isNaN(endSlot))return;
    // Clamp: if entirely outside grid, skip; otherwise clip to grid edges
    if(startSlot>=TT_SLOTS||endSlot<=0)return;
    startSlot=Math.max(0,startSlot);
    endSlot=Math.min(TT_SLOTS,endSlot);
    if(startSlot>=endSlot)return;

    const rowStart=startSlot+3;
    const rowEnd=endSlot+3;
    const el=document.createElement('div');
    el.className='tt-event';
    el.style.cssText=`grid-row:${rowStart}/${rowEnd};grid-column:${col};background:${cat.bg};border-color:${cat.border};color:${cat.text};`;
    el.innerHTML=`<span class="tt-event-title"><span class="tt-event-time">${ev.start}</span> ${ev.title}</span><button class="tt-event-edit" data-tteditid="${ev.id}" title="Edit">✎</button><button class="tt-event-del" data-ttid="${ev.id}" title="Remove">×</button>`;
    grid.appendChild(el);
  });

  // Legend
  const leg=document.getElementById('tt-legend-strip');
  if(leg){
    leg.innerHTML=Object.entries(TT_CATS).map(([k,c])=>
      `<div class="tt-legend-item"><div class="tt-legend-dot" style="background:${c.border}"></div>${c.label}</div>`
    ).join('');
  }
}

function ttDowToDateStr(dow){
  // Returns "YYYY-MM-DD" for the given day-of-week (0=Mon) in the currently viewed timetable week
  const weekDates=getTTWeekDates();
  return fmtDate(weekDates[dow]);
}

function ttCancelEdit(){
  editingTTId=null;
  document.getElementById('tt-add-btn').textContent='+ Add Event';
  document.getElementById('tt-title-input').value='';
  document.getElementById('tt-start-input').value='09:00';
  document.getElementById('tt-end-input').value='10:00';
  const alldayCk=document.getElementById('tt-allday-check');
  if(alldayCk){alldayCk.checked=false;document.getElementById('tt-time-fields').style.display='contents';}
  document.getElementById('tt-edit-banner').classList.remove('show');
  document.getElementById('tt-add-form').classList.remove('editing');
}
if(CURRENT_PAGE==='timetable'){ document.getElementById('tt-cancel-edit').addEventListener('click',ttCancelEdit);
document.getElementById('tt-add-btn').addEventListener('click',()=>{
  const title=document.getElementById('tt-title-input').value.trim();
  if(!title)return;
  const day=+document.getElementById('tt-day-select').value;
  const isAllDay=document.getElementById('tt-allday-check').checked;
  const start=isAllDay?'00:00':document.getElementById('tt-start-input').value;
  const end=isAllDay?'23:59':document.getElementById('tt-end-input').value;
  const cat=document.getElementById('tt-cat-select').value;
  if(!isAllDay&&(!start||!end||start>=end))return;
  if(!isAllDay){const startSlot=ttTimeToSlot(start),endSlot=ttTimeToSlot(end);if(startSlot<0||endSlot>TT_SLOTS||startSlot>=endSlot)return;}
  const date=ttDowToDateStr(day); // actual date for selected DOW in current week
  if(editingTTId!==null){
    const ev=state.timetable.find(x=>x.id===editingTTId);
    if(ev){ev.title=title;ev.day=day;ev.date=date;ev.start=start;ev.end=end;ev.cat=cat;ev.isAllDay=isAllDay;}
    ttCancelEdit();
    saveAll();renderTimetable();
    return;
  }
  state.timetable.push({id:state.ttIdCtr++,title,day,date,start,end,cat,isAllDay});
  document.getElementById('tt-title-input').value='';
  saveAll();renderTimetable();
});
document.getElementById('tt-title-input').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('tt-add-btn').click();if(e.key==='Escape'&&editingTTId!==null)ttCancelEdit();});
document.getElementById('tt-grid').addEventListener('click',e=>{
  const edit=e.target.closest('.tt-event-edit');
  if(edit){
    const id=+edit.dataset.tteditid;
    const ev=state.timetable.find(x=>x.id===id);
    if(ev){
      editingTTId=id;
      document.getElementById('tt-title-input').value=ev.title;
      document.getElementById('tt-day-select').value=ev.day;
      const alldayCk=document.getElementById('tt-allday-check');
      const timeFields=document.getElementById('tt-time-fields');
      if(alldayCk){alldayCk.checked=!!ev.isAllDay;timeFields.style.display=ev.isAllDay?'none':'contents';}
      document.getElementById('tt-start-input').value=ev.isAllDay?'09:00':(ev.start||'09:00');
      document.getElementById('tt-end-input').value=ev.isAllDay?'10:00':(ev.end||'10:00');
      document.getElementById('tt-cat-select').value=ev.cat;
      document.getElementById('tt-add-btn').textContent='✓ Update Event';
      document.getElementById('tt-edit-banner').classList.add('show');
      document.getElementById('tt-add-form').classList.add('editing');
      document.getElementById('tt-title-input').focus();
    }
    return;
  }
  const del=e.target.closest('.tt-event-del');
  if(del){
    const id=+del.dataset.ttid;
    state.timetable=state.timetable.filter(ev=>ev.id!==id);
    saveAll();renderTimetable();
  }
});

// ─── GOOGLE CALENDAR ICS IMPORT ───────────────────────────────────────────────
(function(){
  const DOW_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  let gcalEvents = [];
  let selectedIds = new Set();

  // ── ICS PARSER ────────────────────────────────────────────────────────────
  function unfoldICS(raw){
    // ICS lines can be "folded" (continued on next line with a leading space/tab)
    return raw.replace(/\r\n[ \t]/g,' ').replace(/\n[ \t]/g,' ');
  }

  function getICSProp(block, prop){
    // Matches PROP, PROP;PARAM=..., etc.
    const re = new RegExp('^' + prop + '(?:;[^:]*)?:(.*)','im');
    const m = block.match(re);
    return m ? m[1].trim() : null;
  }

  function parseICSDateTime(raw){
    if(!raw) return null;
    // Strip timezone ID and other params that might appear after value= reassignment
    const str = raw.replace(/^.*:/, ''); // handles TZID=... embedded after split edge-cases
    // YYYYMMDDTHHMMSS or YYYYMMDDTHHMMSSZ
    const mDT = str.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
    if(mDT) return { date:`${mDT[1]}-${mDT[2]}-${mDT[3]}`, time:`${mDT[4]}:${mDT[5]}` };
    // YYYYMMDD (all-day)
    const mD = str.match(/^(\d{4})(\d{2})(\d{2})$/);
    if(mD) return { date:`${mD[1]}-${mD[2]}-${mD[3]}`, time: null };
    return null;
  }

  function dateStrToDow(dateStr){
    const d = new Date(dateStr + 'T12:00:00');
    const jsDay = d.getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  }

  function guessCat(title){
    if(/\b(meet|standup|sprint|review|sync|call|client|office|zoom|teams|work)\b/i.test(title)) return 'work';
    if(/\b(study|class|lecture|course|homework|school|exam|learn|tutorial)\b/i.test(title)) return 'study';
    if(/\b(gym|workout|yoga|run|swim|sport|health|doctor|dentist|medic|physio)\b/i.test(title)) return 'health';
    if(/\b(lunch|dinner|breakfast|coffee|cafe|meal|eat|restaurant)\b/i.test(title)) return 'social';
    if(/\b(friend|party|birthday|wedding|hangout|social)\b/i.test(title)) return 'social';
    return 'personal';
  }

  function parseICS(raw){
    const unfolded = unfoldICS(raw);
    const events = [];
    const blocks = unfolded.split(/BEGIN:VEVENT/i);

    // Helper: add N weeks/days/months to a date string
    function addDays(dateStr, n){
      const d = new Date(dateStr + 'T12:00:00');
      d.setDate(d.getDate() + n);
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    }
    function addWeeks(dateStr, n){ return addDays(dateStr, n*7); }
    function addMonths(dateStr, n){
      const d = new Date(dateStr + 'T12:00:00');
      d.setMonth(d.getMonth() + n);
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    }

    // Parse RRULE string into an object
    function parseRRule(rrule){
      if(!rrule) return null;
      const parts = {};
      rrule.split(';').forEach(p => {
        const [k,v] = p.split('=');
        if(k && v) parts[k.toUpperCase()] = v;
      });
      return parts;
    }

    // Expand a single base event into all its occurrences up to a cutoff
    const EXPAND_UNTIL = new Date(); EXPAND_UNTIL.setFullYear(EXPAND_UNTIL.getFullYear() + 2);
    const EXPAND_UNTIL_STR = fmtDate(EXPAND_UNTIL);

    function expandRecurring(base, rruleStr){
      const rr = parseRRule(rruleStr);
      if(!rr || !rr.FREQ) return [base];

      const freq = rr.FREQ; // DAILY, WEEKLY, MONTHLY, YEARLY
      const interval = parseInt(rr.INTERVAL || '1', 10);
      const countLimit = rr.COUNT ? parseInt(rr.COUNT, 10) : 500;
      const untilStr = rr.UNTIL ? rr.UNTIL.slice(0,8) : null;
      const untilDate = untilStr
        ? `${untilStr.slice(0,4)}-${untilStr.slice(4,6)}-${untilStr.slice(6,8)}`
        : EXPAND_UNTIL_STR;
      const hardStop = untilDate < EXPAND_UNTIL_STR ? untilDate : EXPAND_UNTIL_STR;

      const results = [];
      let curDate = base.date;
      let count = 0;

      while(curDate <= hardStop && count < countLimit){
        results.push({ ...base, date: curDate });
        count++;
        if(freq === 'DAILY')        curDate = addDays(curDate, interval);
        else if(freq === 'WEEKLY')  curDate = addWeeks(curDate, interval);
        else if(freq === 'MONTHLY') curDate = addMonths(curDate, interval);
        else if(freq === 'YEARLY')  curDate = addMonths(curDate, interval * 12);
        else break;
      }
      return results;
    }

    for(let i = 1; i < blocks.length; i++){
      const block = blocks[i];
      let summary = getICSProp(block, 'SUMMARY') || 'Untitled Event';
      summary = summary.replace(/\\,/g,',').replace(/\\;/g,';').replace(/\\n/gi,' ').replace(/\\\\/g,'\\');

      const dtStartRaw = getICSProp(block, 'DTSTART');
      const dtEndRaw   = getICSProp(block, 'DTEND');
      const rrule      = getICSProp(block, 'RRULE');

      const start = parseICSDateTime(dtStartRaw);
      const end   = parseICSDateTime(dtEndRaw);
      if(!start || !start.date) continue;

      // Skip RECURRENCE-ID exceptions — they're already the base event's occurrence
      if(getICSProp(block, 'RECURRENCE-ID')) continue;

      const base = {
        title:   summary,
        date:    start.date,
        start:   start.time || '00:00',
        end:     end?.time  || (start.time ? addOneHour(start.time) : '23:59'),
        isAllDay: !start.time,
        // For all-day events, DTEND is exclusive (next day), so subtract 1 day for endDate
        endDate: (!start.time && end?.date && end.date > start.date)
          ? (()=>{ const d=new Date(end.date+'T12:00:00');d.setDate(d.getDate()-1);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; })()
          : null,
        recurring: !!rrule
      };

      if(rrule){
        expandRecurring(base, rrule).forEach(ev => events.push(ev));
      } else {
        events.push(base);
      }
    }
    return events;
  }

  function addOneHour(hhmm){
    const [h,m] = hhmm.split(':').map(Number);
    const nh = Math.min(h+1, 23);
    return `${String(nh).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  }

  // ── WEEK RANGE ────────────────────────────────────────────────────────────
  function getWeekRange(){
    const weekDates = getTTWeekDates();
    return { mondayStr: fmtDate(weekDates[0]), sundayStr: fmtDate(weekDates[6]) };
  }

  // ── MODAL ─────────────────────────────────────────────────────────────────
  function openModalWithICS(raw){
    let allParsed;
    try {
      allParsed = parseICS(raw);
    } catch(e) {
      showError('Could not parse this file. Please make sure it is a valid .ics calendar file.');
      return;
    }

    gcalEvents = allParsed
      .map((ev, i) => ({ id: i, ...ev, day: dateStrToDow(ev.date), cat: guessCat(ev.title) }))
      .sort((a,b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start));

    renderEventList(allParsed.length);
  }

  function openModal(){
    document.getElementById('gcal-modal').classList.remove('hidden');
    document.getElementById('gcal-modal-backdrop').classList.add('open');
    document.getElementById('gcal-modal-footer').style.display = 'none';
    document.getElementById('gcal-modal-subtitle').textContent = 'Choose a .ics file exported from Google Calendar';
    document.getElementById('gcal-modal-body').innerHTML = `
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="background:var(--surface2);border:1.5px solid var(--border);border-radius:13px;padding:18px 20px;">
          <div style="font-size:12px;font-weight:800;color:var(--text);margin-bottom:10px;letter-spacing:.4px;">HOW TO EXPORT FROM GOOGLE CALENDAR</div>
          <ol style="font-size:12px;color:var(--text-muted);font-weight:600;line-height:1.9;padding-left:18px;margin:0;">
            <li>Open <strong style="color:var(--text-sec);">calendar.google.com</strong></li>
            <li>Click ⚙️ Settings → <strong style="color:var(--text-sec);">Import & export</strong></li>
            <li>Click <strong style="color:var(--text-sec);">"Export"</strong> → a .zip will download</li>
            <li>Unzip it and find the <strong style="color:var(--text-sec);">.ics file</strong></li>
            <li>Click the button below to load it 👇</li>
          </ol>
        </div>
        <label id="gcal-file-label" style="display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,rgba(66,133,244,.15),rgba(66,133,244,.08));border:2px dashed #4285f488;border-radius:13px;padding:28px;cursor:pointer;transition:all .2s;font-size:13px;font-weight:700;color:#4285f4;letter-spacing:.3px;" onmouseover="this.style.background='rgba(66,133,244,.18)'" onmouseout="this.style.background='linear-gradient(135deg,rgba(66,133,244,.15),rgba(66,133,244,.08))'">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4285f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Choose .ics file
          <input type="file" id="gcal-file-input" accept=".ics,text/calendar" style="display:none;"/>
        </label>
        <div id="gcal-parse-status" style="display:none;text-align:center;font-size:12px;color:var(--text-muted);font-weight:600;padding:8px;"></div>
      </div>`;

    // Wire up file input
    document.getElementById('gcal-file-input').addEventListener('change', function(){
      const file = this.files[0];
      if(!file) return;
      const status = document.getElementById('gcal-parse-status');
      status.style.display = 'block';
      status.textContent = `📂 Reading ${file.name}…`;
      const label = document.getElementById('gcal-file-label');
      if(label) label.style.opacity = '0.6';
      const reader = new FileReader();
      reader.onload = e => openModalWithICS(e.target.result);
      reader.onerror = () => showError('Could not read the file. Please try again.');
      reader.readAsText(file, 'UTF-8');
    });
  }

  function showError(msg){
    document.getElementById('gcal-modal-body').innerHTML = `
      <div class="gcal-error">⚠️ ${msg}</div>`;
    document.getElementById('gcal-modal-subtitle').textContent = 'Import failed';
    document.getElementById('gcal-modal-footer').style.display = 'none';
  }

  function closeModal(){
    document.getElementById('gcal-modal').classList.add('hidden');
    document.getElementById('gcal-modal-backdrop').classList.remove('open');
    selectedIds.clear();
    gcalEvents = [];
  }

  function isAlreadyInTimetable(ev){
    return state.timetable.some(tt =>
      tt.date === ev.date &&
      tt.title.toLowerCase() === ev.title.toLowerCase() &&
      (ev.isAllDay ? !!tt.isAllDay : tt.start === ev.start)
    );
  }

  function renderEventList(totalInFile){
    if(!gcalEvents.length){
      document.getElementById('gcal-modal-body').innerHTML = `
        <div class="gcal-empty">
          📭 No events found in this file
          ${totalInFile === 0 ? '' : `<span style="font-size:11px;opacity:.5;margin-top:4px;display:block;">(${totalInFile} items parsed but none could be read)</span>`}
        </div>`;
      document.getElementById('gcal-modal-subtitle').textContent = 'No events found';
      document.getElementById('gcal-modal-footer').style.display = 'none';
      return;
    }

    document.getElementById('gcal-modal-subtitle').textContent =
      `${gcalEvents.length} event${gcalEvents.length!==1?'s':''} found in file — pick what you want`;

    selectedIds = new Set(gcalEvents.filter(ev=>!isAlreadyInTimetable(ev)).map(ev=>ev.id));

    const body = document.getElementById('gcal-modal-body');
    body.innerHTML = '';

    // Group events by date
    const groups = {};
    gcalEvents.forEach(ev => {
      if(!groups[ev.date]) groups[ev.date] = [];
      groups[ev.date].push(ev);
    });

    const DOW_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    function fmtDateHeader(dateStr){
      const d = new Date(dateStr + 'T12:00:00');
      return `${DOW_FULL[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }

    Object.keys(groups).sort().forEach(dateStr => {
      // Date group header
      const hdr = document.createElement('div');
      hdr.className = 'gcal-date-group-header';
      hdr.textContent = fmtDateHeader(dateStr);
      body.appendChild(hdr);

      groups[dateStr].forEach(ev => {
        const alreadyIn = isAlreadyInTimetable(ev);
        const sel = selectedIds.has(ev.id);
        const item = document.createElement('div');
        item.className = 'gcal-event-item' + (sel ? ' selected' : '');
        item.dataset.evid = ev.id;

        item.innerHTML = `
          <div class="gcal-event-cb ${sel?'checked':''}">
            <svg viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gcal-event-info">
            <div class="gcal-event-title-text">${ev.title}</div>
            <div class="gcal-event-time-text">${ev.isAllDay ? 'All day' : `${ev.start} – ${ev.end}`}${ev.recurring?' · 🔁':''}</div>
          </div>
          <div class="gcal-day-badge">${DOW_NAMES[ev.day]}</div>
          ${alreadyIn ? '<div class="gcal-already-badge">✓ Added</div>' : ''}`;

        if(!alreadyIn){
          item.addEventListener('click', () => toggleEventSelection(ev.id));
        } else {
          item.style.opacity = '0.5';
          item.style.cursor = 'default';
        }
        body.appendChild(item);
      });
    });

    document.getElementById('gcal-modal-footer').style.display = 'flex';
    updateSelectionUI();
  }

  function toggleEventSelection(id){
    if(selectedIds.has(id)) selectedIds.delete(id);
    else selectedIds.add(id);
    const item = document.querySelector(`.gcal-event-item[data-evid="${id}"]`);
    if(item){
      item.classList.toggle('selected', selectedIds.has(id));
      item.querySelector('.gcal-event-cb').classList.toggle('checked', selectedIds.has(id));
    }
    updateSelectionUI();
  }

  function updateSelectionUI(){
    const count = selectedIds.size;
    document.getElementById('gcal-count-label').textContent = `${count} event${count!==1?'s':''} selected`;
    document.getElementById('gcal-import-selected-btn').disabled = count === 0;
    const allSelectable = gcalEvents.filter(ev=>!isAlreadyInTimetable(ev));
    const allSelected = allSelectable.length > 0 && allSelectable.every(ev=>selectedIds.has(ev.id));
    document.getElementById('gcal-select-all-btn').textContent = allSelected ? 'Deselect All' : 'Select All';
  }

  function importSelected(){
    const toAdd = gcalEvents.filter(ev => selectedIds.has(ev.id) && !isAlreadyInTimetable(ev));
    if(!toAdd.length) return;
    toAdd.forEach(ev => {
      // For multi-day all-day events, expand across each date in the range
      if(ev.isAllDay && ev.endDate && ev.endDate > ev.date){
        let cur=ev.date;
        while(cur<=ev.endDate){
          const dow=dateStrToDow(cur);
          state.timetable.push({ id:state.ttIdCtr++, title:ev.title, day:dow, date:cur, start:'00:00', end:'23:59', cat:ev.cat, isAllDay:true });
          // next day
          const d=new Date(cur+'T12:00:00');d.setDate(d.getDate()+1);
          cur=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        }
      } else {
        state.timetable.push({ id:state.ttIdCtr++, title:ev.title, day:ev.day, date:ev.date, start:ev.start, end:ev.end, cat:ev.cat, isAllDay:!!ev.isAllDay });
      }
    });
    saveAll(); renderTimetable(); closeModal();
    const ind = document.getElementById('save-indicator');
    if(ind){
      ind.textContent = `✓ ${toAdd.length} event${toAdd.length!==1?'s':''} imported`;
      ind.classList.remove('show'); void ind.offsetWidth; ind.classList.add('show');
      setTimeout(()=>{ ind.textContent = t('saved'); ind.classList.remove('show'); }, 2500);
    }
  }

  // Wire up
  document.getElementById('gcal-import-btn').addEventListener('click', openModal);
  document.getElementById('gcal-modal-close').addEventListener('click', closeModal);
  document.getElementById('gcal-modal-backdrop').addEventListener('click', closeModal);
  document.getElementById('gcal-import-selected-btn').addEventListener('click', importSelected);
  document.getElementById('gcal-select-all-btn').addEventListener('click', ()=>{
    const allSelectable = gcalEvents.filter(ev=>!isAlreadyInTimetable(ev));
    const allSelected = allSelectable.every(ev=>selectedIds.has(ev.id));
    allSelected
      ? allSelectable.forEach(ev=>selectedIds.delete(ev.id))
      : allSelectable.forEach(ev=>selectedIds.add(ev.id));
    renderEventList(gcalEvents.length);
  });
})(); }

// ─── EVENTS ───────────────────────────────────────────────────────────────────

// ── Header nav arrows (present on ALL pages) ──────────────────────────────────
on("prev-month","click",()=>{
  if(CURRENT_PAGE==="cycle"){
    if(cycleCalMonth===0){cycleCalMonth=11;cycleCalYear--;}else cycleCalMonth--;
    renderCycleCalendar();
  } else {
    if(state.month===0){state.month=11;state.year--;}else state.month--;
    editingHabit=null;currentWeekIdx=null;
    if(CURRENT_PAGE==="timetable"){
      ttWeekStart=getTTWeekMonday(new Date(state.year,state.month,1));
      renderTimetable();
    } else {
      ttWeekIdx=null;ttWeekStart=null;loadMonthData();
      if(CURRENT_PAGE==='analysis'){
        _renderAnalysisPage();
      } else { render(true);applyTranslations(); }
    }
  }
});
on("next-month","click",()=>{
  if(CURRENT_PAGE==="cycle"){
    if(cycleCalMonth===11){cycleCalMonth=0;cycleCalYear++;}else cycleCalMonth++;
    renderCycleCalendar();
  } else {
    if(state.month===11){state.month=0;state.year++;}else state.month++;
    editingHabit=null;currentWeekIdx=null;
    if(CURRENT_PAGE==="timetable"){
      ttWeekStart=getTTWeekMonday(new Date(state.year,state.month,1));
      renderTimetable();
    } else {
      ttWeekIdx=null;ttWeekStart=null;loadMonthData();
      if(CURRENT_PAGE==='analysis'){
        _renderAnalysisPage();
      } else { render(true);applyTranslations(); }
    }
  }
});
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click",()=>switchTab(btn.dataset.tab));
});

// ── TRACKER PAGE ──────────────────────────────────────────────────────────────
if(CURRENT_PAGE==="tracker"||CURRENT_PAGE==="habits"){
  // Inject packs button styles immediately so button is visible before modal is opened
  if(!document.getElementById("hpm-btn-styles")){
    const _bst=document.createElement("style");
    _bst.id="hpm-btn-styles";
    _bst.textContent=`.habit-packs-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:22px;border:2.5px solid #4f6ef7;background:linear-gradient(135deg,#4f6ef7,#7c3aed);color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit;transition:all .18s;white-space:nowrap;box-shadow:0 4px 18px rgba(79,110,247,.5);letter-spacing:.3px;}.habit-packs-btn:hover{background:linear-gradient(135deg,#6b84ff,#9b59f7);box-shadow:0 6px 24px rgba(79,110,247,.7);transform:translateY(-2px);}.habit-packs-btn:active{transform:translateY(0) scale(.97);}`.replace(/\n\s*/g,'');
    document.head.appendChild(_bst);
  }
  on("tracker-section","click",e=>{
    const cb=e.target.closest(".day-habit-cb");
    if(cb){
      const hi=+cb.dataset.hi,d=+cb.dataset.d;
      const k=`${hi}_${d}`;
      state.checked[k]=!state.checked[k];
      if(!state.checked[k])delete state.checked[k];
      const nowChecked=!!state.checked[k];
      // Instant visual update — no full re-render
      cb.classList.toggle("checked",nowChecked);
      cb.innerHTML=nowChecked?`<svg viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#3ecfb2" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`:"";
      const lbl=cb.closest(".day-habit-item")?.querySelector(".day-habit-label");
      if(lbl)lbl.classList.toggle("done-label",nowChecked);
      // Update day progress bar and pct
      const card=cb.closest(".day-card");
      if(card){
        const pct=calcDayPct(d);const color=pctColor(pct);
        const fill=card.querySelector(".day-card-fill");if(fill){fill.style.background=color;fill.style.width=pct+"%";}
        const pctEl=card.querySelector(".day-card-pct");if(pctEl){pctEl.textContent=pct+"%";pctEl.style.color=color;}
      }
      saveAll();
      return;
    }
    const star=e.target.closest(".mindset-star[data-d]");
    if(star){
      const d=+star.dataset.d,type=star.dataset.type,val=+star.dataset.val;
      const cur=getMindset(d,type);setMindset(d,type,cur===val?0:val);renderDaysView(false);
      return;
    }
    // Day card journal mood
    const jmb=e.target.closest(".day-journal-mood-btn[data-jd]");
    if(jmb){
      const jk=jmb.dataset.jd;
      const wasActive=jmb.classList.contains('active');
      jmb.closest('.day-journal-mood-row')?.querySelectorAll('.day-journal-mood-btn').forEach((b,i)=>{
        b.classList.remove('active'); b.style.borderColor=''; b.style.boxShadow=''; b.style.background='';
      });
      const newMood=wasActive?0:parseInt(jmb.dataset.jmood);
      if(!wasActive){
        jmb.classList.add('active');
        const ci=parseInt(jmb.dataset.jmood)-1;
        jmb.style.borderColor=JOURNAL_MOOD_COLORS[ci];
        jmb.style.boxShadow=`0 0 0 2px ${JOURNAL_MOOD_COLORS[ci]}33`;
        jmb.style.background=`${JOURNAL_MOOD_COLORS[ci]}18`;
      }
      const existing=state.journal[jk]||{mood:0,note:''};
      saveJournalEntry(jk,newMood,existing.note||'');
      return;
    }
    const wcb=e.target.closest(".weekly-cb[data-hi]");
    if(wcb){
      const hi=+wcb.dataset.hi,d=+wcb.dataset.d,wcolor=wcb.dataset.wcolor||'#3ecfb2';
      const k=`${hi}_${d}`;state.checked[k]=!state.checked[k];
      if(!state.checked[k])delete state.checked[k];
      const nowChecked=!!state.checked[k];
      wcb.classList.toggle('done',nowChecked);
      wcb.style.border=`2.5px solid ${nowChecked?wcolor:'#2a3d6e'}`;
      wcb.style.background=nowChecked?wcolor+'28':'transparent';
      wcb.innerHTML=nowChecked?`<svg viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="${wcolor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`:'';
      // Update footer pct for this day column
      const col=wcb.closest('.weekly-day-col');
      if(col){const foot=col.querySelector('.weekly-day-footer');if(foot){const dpct=calcDayPct(d);foot.textContent=dpct+'%';foot.style.color=pctColor(dpct);}}
      // Update week score badge
      const wg=getWeekGroups();const wt=calcWeekTotals(wg);const ws=wt[currentWeekIdx];
      const badge=document.getElementById('weekly-score-badge');if(badge){badge.textContent=ws+'%';badge.style.color=pctColor(ws);badge.style.borderColor=pctColor(ws)+'44';}
      // Update top stats
      const{done,total,pct}=calcStats();
      document.getElementById('stat-done').textContent=done;
      document.getElementById('stat-pct').textContent=Math.round(pct)+'%';
      updateArc('overall-arc',pct);
      document.getElementById('overall-pct-text').textContent=Math.round(pct)+'%';
      document.getElementById('overall-sub-text').textContent=`${done}/${total}`;
      saveAll();return;
    }
    const scopeBtn=e.target.closest(".tracker-scope-btn");
    if(scopeBtn){applyTrackerScope(scopeBtn.dataset.tscope);return;}
    const box=e.target.closest(".checkbox:not(.invisible)");
    if(box){
      const hi=+box.dataset.hi,d=+box.dataset.d,wcolor=box.dataset.wcolor||'#3ecfb2';
      const k=`${hi}_${d}`;state.checked[k]=!state.checked[k];
      if(!state.checked[k])delete state.checked[k];
      const nowChecked=!!state.checked[k];
      box.classList.toggle('done',nowChecked);
      box.style.border=`2.5px solid ${nowChecked?wcolor:'#2a3d6e'}`;
      box.style.background=nowChecked?wcolor+'28':'transparent';
      box.innerHTML=nowChecked?`<svg viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="${wcolor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`:'';
      // Update week footer pct
      const col=box.closest('.week-col');
      if(col){const wg=getWeekGroups();const wt=calcWeekTotals(wg);const wi=Array.from(col.parentNode.children).indexOf(col);const foot=col.querySelector('.week-footer');if(foot&&wi>=0)foot.textContent=wt[wi]+'%';}
      // Update top stats
      const{done,total,pct}=calcStats();
      document.getElementById('stat-done').textContent=done;
      document.getElementById('stat-pct').textContent=Math.round(pct)+'%';
      updateArc('overall-arc',pct);
      document.getElementById('overall-pct-text').textContent=Math.round(pct)+'%';
      document.getElementById('overall-sub-text').textContent=`${done}/${total}`;
      saveAll();return;
    }
    const rem=e.target.closest(".habit-remove-btn[data-hi]");
    if(rem&&editingHabit===null){
      const hi=+rem.dataset.hi;const nc={};
      Object.keys(state.checked).forEach(k=>{const[h,d]=k.split("_").map(Number);if(h<hi)nc[k]=true;else if(h>hi)nc[`${h-1}_${d}`]=true;});
      state.habits.splice(hi,1);state.checked=nc;saveAll();render(true);return;
    }
    const editBtn=e.target.closest("[data-edithi]");
    if(editBtn){editingHabit=+editBtn.dataset.edithi;render(false);return;}
    const saveBtn=e.target.closest("[data-savehi]");
    if(saveBtn){const inp=document.getElementById(`edit-input-${saveBtn.dataset.savehi}`);if(inp?.value.trim())state.habits[+saveBtn.dataset.savehi]=inp.value.trim();editingHabit=null;saveAll();render(false);return;}
    const cancelBtn=e.target.closest("[data-cancelhi]");
    if(cancelBtn){editingHabit=null;render(false);}
  });
  // Weekly view nav
  on("weekly-prev-btn","click",()=>{
    if(currentWeekIdx>0){currentWeekIdx--;renderWeeklyView(true);}
  });
  on("weekly-next-btn","click",()=>{
    const wg=getWeekGroups();
    if(currentWeekIdx<wg.length-1){currentWeekIdx++;renderWeeklyView(true);}
  });
  // Monthly add-habit
  on("add-habit-btn-monthly","click",()=>{
    const v=document.getElementById("new-habit-input-monthly").value.trim();
    if(!v)return;state.habits.push(v);document.getElementById("new-habit-input-monthly").value="";saveAll();render(true);
  });
  on("new-habit-input-monthly","keydown",e=>{if(e.key==="Enter")document.getElementById("add-habit-btn-monthly").click();});
  const addBtn=document.getElementById("add-habit-btn");
  const addInput=document.getElementById("new-habit-input");
  if(addBtn&&addInput){
    addBtn.addEventListener("click",()=>{const v=addInput.value.trim();if(!v)return;state.habits.push(v);addInput.value="";saveAll();render(true);});
    addInput.addEventListener("keydown",e=>{if(e.key==="Enter")addBtn.click();});
  }

  // ── HABIT PACKS ─────────────────────────────────────────────────────────────
  const HABIT_PACKS = [
    {
      id:"morning", emoji:"🌅", label:"Morning Routine",
      color:"linear-gradient(135deg,#f5a623,#e87c1e)",
      shadow:"rgba(245,166,35,.35)",
      habits:["🌅 Wake up early","🛏 Make the bed","💧 Drink a glass of water","📓 Journal 5 min","🧘 Meditate","🤸 Stretch / yoga","🥗 Eat a healthy breakfast"]
    },
    {
      id:"fitness", emoji:"💪", label:"Fitness",
      color:"linear-gradient(135deg,#3ecfb2,#1fa88e)",
      shadow:"rgba(62,207,178,.35)",
      habits:["🏋️ Workout","🚶 10 000 steps","💧 Drink 2 L water","🚫 No sugar today","🤸 Stretch after workout","😴 Sleep 8 hours"]
    },
    {
      id:"study", emoji:"📚", label:"Study",
      color:"linear-gradient(135deg,#4f6ef7,#2d4edc)",
      shadow:"rgba(79,110,247,.35)",
      habits:["📖 Study 2 hours","📚 Read 30 minutes","📝 Review notes","📵 No phone during study","🗓 Plan tomorrow","☕ Morning focus session"]
    },
    {
      id:"mental", emoji:"🧠", label:"Mental Health",
      color:"linear-gradient(135deg,#e05a9a,#c84080)",
      shadow:"rgba(224,90,154,.35)",
      habits:["🧘 Meditate","📓 Journal","🙏 Write 3 gratitudes","🌿 Nature walk","📵 Screen-free hour","😴 Sleep 8 hours","🫂 Connect with someone"]
    },
    {
      id:"finance", emoji:"💰", label:"Finance",
      color:"linear-gradient(135deg,#f7c948,#d4a017)",
      shadow:"rgba(247,201,72,.35)",
      habits:["📊 Track spending","🚫 No impulse buying","💰 Transfer to savings","📋 Review budget","🧾 Log every expense"]
    },
    {
      id:"health", emoji:"🍏", label:"Healthy Living",
      color:"linear-gradient(135deg,#5cdb5c,#3aa83a)",
      shadow:"rgba(92,219,92,.35)",
      habits:["💧 Drink 8 glasses of water","🥦 Eat vegetables","🚫 No junk food","😴 Sleep 8 hours","🏃 Exercise 30 min","🚭 No alcohol"]
    }
  ];

  function openPacksModal(){
    let modal=document.getElementById("habit-packs-modal");
    if(!modal){
      modal=document.createElement("div");
      modal.id="habit-packs-modal";
      modal.innerHTML=`
        <div class="hpm-backdrop" id="hpm-backdrop"></div>
        <div class="hpm-dialog" id="hpm-dialog">
          <div class="hpm-header">
            <div class="hpm-title">📦 Quick-Start Habit Packs</div>
            <div class="hpm-subtitle">Pick a pack — habits will be added instantly. Skip any you don't need.</div>
            <button class="hpm-close" id="hpm-close">✕</button>
          </div>
          <div class="hpm-body">
            <div class="hpm-packs-grid" id="hpm-packs-grid"></div>
            <div class="hpm-preview" id="hpm-preview" style="display:none;">
              <div class="hpm-preview-header">
                <div class="hpm-preview-title" id="hpm-preview-title"></div>
                <button class="hpm-back-btn" id="hpm-back-btn">← Back</button>
              </div>
              <div class="hpm-habits-list" id="hpm-habits-list"></div>
              <div class="hpm-preview-footer">
                <button class="hpm-add-all-btn" id="hpm-add-all-btn">✅ Add All Habits</button>
                <button class="hpm-add-selected-btn" id="hpm-add-selected-btn">+ Add Selected</button>
              </div>
            </div>
          </div>
        </div>`;
      document.body.appendChild(modal);

      // Style injection
      if(!document.getElementById("hpm-styles")){
        const st=document.createElement("style");
        st.id="hpm-styles";
        st.textContent=`
          #habit-packs-modal{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;}
          .hpm-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);}
          .hpm-dialog{position:relative;background:var(--surface);border:1.5px solid var(--border);border-radius:20px;width:min(680px,94vw);max-height:82vh;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(0,0,0,.45);overflow:hidden;animation:hpmIn .22s cubic-bezier(.4,0,.2,1);}
          @keyframes hpmIn{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}
          .hpm-header{padding:20px 22px 14px;border-bottom:1px solid var(--border);flex-shrink:0;position:relative;}
          .hpm-title{font-size:16px;font-weight:800;color:var(--text);letter-spacing:.3px;}
          .hpm-subtitle{font-size:12px;color:var(--text-muted);margin-top:3px;}
          .hpm-close{position:absolute;top:16px;right:16px;background:transparent;border:none;color:var(--text-muted);font-size:18px;cursor:pointer;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s;}
          .hpm-close:hover{background:var(--surface2);color:var(--text);}
          .hpm-body{flex:1;overflow-y:auto;padding:18px 22px 22px;}
          .hpm-packs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;}
          .hpm-pack-card{border-radius:14px;padding:16px 14px 14px;cursor:pointer;position:relative;overflow:hidden;border:1.5px solid transparent;transition:transform .15s,box-shadow .15s;display:flex;flex-direction:column;gap:6px;}
          .hpm-pack-card:hover{transform:translateY(-2px);}
          .hpm-pack-emoji{font-size:26px;line-height:1;}
          .hpm-pack-label{font-size:13px;font-weight:800;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.3);}
          .hpm-pack-count{font-size:11px;color:rgba(255,255,255,.8);}
          .hpm-pack-added-badge{position:absolute;top:8px;right:8px;background:rgba(255,255,255,.25);border-radius:20px;padding:2px 8px;font-size:10px;font-weight:700;color:#fff;display:none;}
          .hpm-pack-card.pack-added .hpm-pack-added-badge{display:block;}
          .hpm-preview{display:flex;flex-direction:column;gap:10px;}
          .hpm-preview-header{display:flex;align-items:center;justify-content:space-between;}
          .hpm-preview-title{font-size:15px;font-weight:800;color:var(--text);}
          .hpm-back-btn{background:transparent;border:1.5px solid var(--border);border-radius:20px;padding:5px 14px;font-size:12px;color:var(--text-muted);cursor:pointer;font-family:inherit;transition:background .15s;}
          .hpm-back-btn:hover{background:var(--surface2);}
          .hpm-habits-list{display:flex;flex-direction:column;gap:7px;margin:4px 0;}
          .hpm-habit-row{display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--surface2);border-radius:10px;border:1.5px solid var(--border);cursor:pointer;transition:border-color .15s,background .15s;user-select:none;}
          .hpm-habit-row.selected{border-color:var(--accent,#4f6ef7);background:var(--surface);}
          .hpm-habit-check{width:18px;height:18px;border-radius:5px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;transition:background .15s,border-color .15s;}
          .hpm-habit-row.selected .hpm-habit-check{background:var(--accent,#4f6ef7);border-color:var(--accent,#4f6ef7);color:#fff;}
          .hpm-habit-row.already-added{opacity:.45;cursor:default;}
          .hpm-habit-row.already-added .hpm-habit-check{background:var(--border);}
          .hpm-habit-name{font-size:13px;font-weight:600;color:var(--text);}
          .hpm-already-lbl{font-size:10px;color:var(--text-muted);margin-left:auto;flex-shrink:0;}
          .hpm-preview-footer{display:flex;gap:10px;flex-wrap:wrap;}
          .hpm-add-all-btn{flex:1;padding:10px 18px;border-radius:10px;border:none;background:linear-gradient(135deg,#4f6ef7,#2d4edc);color:#fff;font-weight:800;font-size:13px;cursor:pointer;font-family:inherit;transition:opacity .15s;}
          .hpm-add-all-btn:hover{opacity:.88;}
          .hpm-add-selected-btn{flex:1;padding:10px 18px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface2);color:var(--text);font-weight:700;font-size:13px;cursor:pointer;font-family:inherit;transition:background .15s;}
          .hpm-add-selected-btn:hover{background:var(--surface);}
        `;
        document.head.appendChild(st);
      }

      // Backdrop / close
      on("hpm-backdrop","click",closePacksModal);
      on("hpm-close","click",closePacksModal);
      document.addEventListener("keydown",e=>{if(e.key==="Escape")closePacksModal();},{once:false});

      // Render pack cards
      const grid=document.getElementById("hpm-packs-grid");
      HABIT_PACKS.forEach(pack=>{
        const card=document.createElement("div");
        card.className="hpm-pack-card";
        card.dataset.packId=pack.id;
        card.style.background=pack.color;
        card.style.boxShadow=`0 6px 20px ${pack.shadow}`;
        card.innerHTML=`<div class="hpm-pack-emoji">${pack.emoji}</div>
          <div class="hpm-pack-label">${pack.label}</div>
          <div class="hpm-pack-count">${pack.habits.length} habits</div>
          <div class="hpm-pack-added-badge">✓ Added</div>`;
        card.addEventListener("click",()=>openPackPreview(pack));
        grid.appendChild(card);
      });
      refreshPackAddedBadges();

      // Back button
      on("hpm-back-btn","click",()=>{
        document.getElementById("hpm-packs-grid").style.display="";
        document.getElementById("hpm-preview").style.display="none";
      });

      // Add All
      on("hpm-add-all-btn","click",()=>{
        const pack=HABIT_PACKS.find(p=>p.id===currentPreviewPackId);
        if(!pack)return;
        let added=0;
        pack.habits.forEach(h=>{
          if(!state.habits.includes(h)){state.habits.push(h);added++;}
        });
        closePacksModal();
        if(added>0){saveAll();render(true);}
        else{refreshPackAddedBadges();}
      });

      // Add Selected
      on("hpm-add-selected-btn","click",()=>{
        const pack=HABIT_PACKS.find(p=>p.id===currentPreviewPackId);
        if(!pack)return;
        let added=0;
        document.querySelectorAll(".hpm-habit-row.selected:not(.already-added)").forEach(row=>{
          const h=row.dataset.habit;
          if(h&&!state.habits.includes(h)){state.habits.push(h);added++;}
        });
        closePacksModal();
        if(added>0){saveAll();render(true);}
        else{refreshPackAddedBadges();}
      });
    }

    modal.style.display="flex";
    document.getElementById("hpm-packs-grid").style.display="";
    document.getElementById("hpm-preview").style.display="none";
    refreshPackAddedBadges();
  }

  let currentPreviewPackId=null;

  function openPackPreview(pack){
    currentPreviewPackId=pack.id;
    document.getElementById("hpm-packs-grid").style.display="none";
    const preview=document.getElementById("hpm-preview");
    preview.style.display="flex";
    document.getElementById("hpm-preview-title").textContent=`${pack.emoji} ${pack.label}`;
    refreshPreviewList(pack);
  }

  function refreshPreviewList(pack){
    const list=document.getElementById("hpm-habits-list");
    if(!list)return;
    list.innerHTML="";
    pack.habits.forEach(h=>{
      const alreadyAdded=state.habits.includes(h);
      const row=document.createElement("div");
      row.className="hpm-habit-row"+(alreadyAdded?" already-added":" selected");
      row.dataset.habit=h;
      row.innerHTML=`<div class="hpm-habit-check">${alreadyAdded?"✓":"✓"}</div>
        <div class="hpm-habit-name">${h}</div>
        ${alreadyAdded?'<div class="hpm-already-lbl">already added</div>':''}`;
      if(!alreadyAdded){
        row.addEventListener("click",()=>{row.classList.toggle("selected");});
      }
      list.appendChild(row);
    });
  }

  function refreshPackAddedBadges(){
    HABIT_PACKS.forEach(pack=>{
      const card=document.querySelector(`.hpm-pack-card[data-pack-id="${pack.id}"]`);
      if(!card)return;
      const allAdded=pack.habits.every(h=>state.habits.includes(h));
      card.classList.toggle("pack-added",allAdded);
    });
  }

  function closePacksModal(){
    const modal=document.getElementById("habit-packs-modal");
    if(modal)modal.style.display="none";
  }

  on("habit-packs-btn","click",openPacksModal);
  on("habit-packs-btn-weekly","click",openPacksModal);
  on("habit-packs-btn-daily","click",openPacksModal);
  // Daily add-habit
  on("add-habit-btn-daily","click",()=>{
    const inp=document.getElementById("new-habit-input-daily");
    if(!inp)return;const v=inp.value.trim();if(!v)return;
    state.habits.push(v);inp.value="";saveAll();render(true);
  });
  on("new-habit-input-daily","keydown",e=>{if(e.key==="Enter")document.getElementById("add-habit-btn-daily").click();});
}

// ── TASKS PAGE ────────────────────────────────────────────────────────────────
if(CURRENT_PAGE==="tasks"){
  on("tasks-section","click",e=>{
    const cb=e.target.closest(".task-cb[data-tid]");
    if(cb){const task=state.tasks.find(x=>x.id===+cb.dataset.tid);if(task){task.done=!task.done;task.status=task.done?"completed":"inprogress";}saveAll();renderTasksView();render(false);return;}
    const editBtn=e.target.closest(".task-edit-btn[data-etid]");
    if(editBtn){
      const task=state.tasks.find(x=>x.id===+editBtn.dataset.etid);
      if(task){
        editingTaskId=task.id;
        document.getElementById("task-name-input").value=task.name;
        document.getElementById("task-priority-select").value=task.priority||"medium";
        document.getElementById("task-due-input").value=task.due||"";
        document.getElementById("task-status-select").value=task.status||"notstarted";
        document.getElementById("add-task-btn").textContent="✓ Update Task";
        document.getElementById("task-edit-banner").classList.add("show");
        document.getElementById("add-task-form").classList.add("editing");
        document.getElementById("task-name-input").focus();
        document.getElementById("task-name-input").scrollIntoView({behavior:"smooth",block:"nearest"});
      }
      return;
    }
    const rem=e.target.closest("[data-rtid]");
    if(rem){state.tasks=state.tasks.filter(task=>task.id!==+rem.dataset.rtid);saveAll();renderTasksView();render(false);}
  });
  document.querySelectorAll(".task-filter-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".task-filter-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");taskFilter=btn.dataset.filter;renderTasksView();
    });
  });
  document.querySelectorAll(".tasks-scope-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{ taskScope=btn.dataset.scope; renderTasksView(); });
  });
  function taskCancelEdit(){
    editingTaskId=null;
    document.getElementById("add-task-btn").textContent="+ Add Task";
    document.getElementById("task-name-input").value="";
    document.getElementById("task-due-input").value="";
    document.getElementById("task-edit-banner").classList.remove("show");
    document.getElementById("add-task-form").classList.remove("editing");
  }
  on("task-cancel-edit","click",taskCancelEdit);
  on("add-task-btn","click",()=>{
    const name=document.getElementById("task-name-input").value.trim();if(!name)return;
    const priority=document.getElementById("task-priority-select").value;
    const due=document.getElementById("task-due-input").value;
    const status=document.getElementById("task-status-select").value;
    if(editingTaskId!==null){
      const task=state.tasks.find(x=>x.id===editingTaskId);
      if(task){task.name=name;task.priority=priority;task.due=due;task.status=status;}
      taskCancelEdit();saveAll();renderTasksView();render(false);return;
    }
    state.tasks.push({id:state.taskIdCtr++,name,priority,due,status,done:false,scope:taskScope});
    document.getElementById("task-name-input").value="";document.getElementById("task-due-input").value="";
    saveAll();renderTasksView();render(false);
  });
  on("task-name-input","keydown",e=>{
    if(e.key==="Enter")document.getElementById("add-task-btn").click();
    if(e.key==="Escape"&&editingTaskId!==null)taskCancelEdit();
  });
}

// Day card journal note: auto-save on input (debounced)
if(CURRENT_PAGE==="tracker"||CURRENT_PAGE==="habits"){
  let _jNoteTimer=null;
  document.addEventListener('input',e=>{
    const jta=e.target.closest(".day-journal-note[data-jd]");
    if(!jta)return;
    if(jta.value.length>2000)jta.value=jta.value.slice(0,2000);
    clearTimeout(_jNoteTimer);
    _jNoteTimer=setTimeout(()=>{
      const jk=jta.dataset.jd;
      const existing=state.journal[jk]||{mood:0,note:''};
      saveJournalEntry(jk,existing.mood||0,jta.value);
    },600);
  });
}

// ── ANALYSIS PAGE — standalone render (no redirect) ──────────────────────────
if(CURRENT_PAGE==="analysis"){
  function _renderAnalysisPage(){
    const days=getDaysInMonth(state.year,state.month);
    const total=state.habits.length*days;
    let done=0;
    for(let hi=0;hi<state.habits.length;hi++)
      for(let d=1;d<=days;d++)if(isChecked(hi,d))done++;
    const pct=total>0?(done/total)*100:0;
    document.getElementById("month-title").textContent=getMonthNames()[state.month];
    document.getElementById("year-label").textContent=state.year;
    renderAnalysis(days,total,done,pct,calcHabitPcts(),getWeekGroups(),calcWeekTotals(getWeekGroups()),calcDowTotals());
  }
  _renderAnalysisPage();
  on("analysis-section","click",e=>{
    const rem=e.target.closest("[data-rgid]");
    if(rem){state.goals=state.goals.filter(g=>g.id!==+rem.dataset.rgid);saveAll();_renderAnalysisPage();}
  });
  on("analysis-section","change",e=>{
    const inp=e.target.closest(".goal-prog-input[data-gid]");
    if(inp){const g=state.goals.find(x=>x.id===+inp.dataset.gid);if(g){g.progress=Math.max(0,Math.min(100,+inp.value||0));}saveAll();_renderAnalysisPage();}
  });
  on("goal-add-btn","click",()=>{
    const name=document.getElementById("goal-input").value.trim();if(!name)return;
    state.goals.push({id:state.goalIdCtr++,name,progress:0});
    document.getElementById("goal-input").value="";saveAll();_renderAnalysisPage();
  });
  on("goal-input","keydown",e=>{
    if(e.key==="Enter"){const name=document.getElementById("goal-input").value.trim();if(!name)return;
      state.goals.push({id:state.goalIdCtr++,name,progress:0});
      document.getElementById("goal-input").value="";saveAll();_renderAnalysisPage();}
  });
}

if(CURRENT_PAGE==="habits"){
  on("analysis-section","click",e=>{
    const rem=e.target.closest("[data-rgid]");
    if(rem){state.goals=state.goals.filter(g=>g.id!==+rem.dataset.rgid);saveAll();renderGoals();}
  });
  on("analysis-section","change",e=>{
    const inp=e.target.closest(".goal-prog-input[data-gid]");
    if(inp){const g=state.goals.find(x=>x.id===+inp.dataset.gid);if(g){g.progress=Math.max(0,Math.min(100,+inp.value||0));}saveAll();renderGoals();}
  });
  on("goal-add-btn","click",()=>{
    const name=document.getElementById("goal-input").value.trim();if(!name)return;
    state.goals.push({id:state.goalIdCtr++,name,progress:0});
    document.getElementById("goal-input").value="";saveAll();renderGoals();
  });
  on("goal-input","keydown",e=>{if(e.key==="Enter")document.getElementById("goal-add-btn").click();});
}


// ── JOURNAL EVENT HANDLERS ────────────────────────────────────────────────────
if(CURRENT_PAGE==="habits"){
  on('journal-prev-day','click',()=>{
    const d=getJournalDateObj(); d.setDate(d.getDate()-1); setJournalDate(d); renderJournal();
  });
  on('journal-next-day','click',()=>{
    const d=getJournalDateObj(); d.setDate(d.getDate()+1); setJournalDate(d); renderJournal();
  });
  on('journal-save-btn','click',()=>{
    const d=getJournalDateObj();
    const dateKey=getJournalKey(d.getFullYear(),d.getMonth(),d.getDate());
    const ta=document.getElementById('journal-textarea');
    const activeBtn=document.querySelector('.journal-mood-btn.active');
    const mood=activeBtn?parseInt(activeBtn.dataset.jmood):0;
    saveJournalEntry(dateKey,mood,ta?ta.value:'');
    // Show dot on monthly/weekly cell if exists
    render(false);
    // Re-render history
    renderJournalHistory(dateKey);
    // Button feedback
    const btn=document.getElementById('journal-save-btn');
    if(btn){const orig=btn.innerHTML;btn.innerHTML='✓ Saved!';btn.style.background='linear-gradient(135deg,#3ecfb2,#2aa894)';setTimeout(()=>{btn.innerHTML=orig;btn.style.background='';},1600);}
  });
  on('journal-textarea','input',updateJournalCharCount);
  on('journal-textarea','keydown',e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey))document.getElementById('journal-save-btn')?.click();});
  on('journal-card','click',e=>{
    // Mood button
    const mb=e.target.closest('.journal-mood-btn[data-jmood]');
    if(mb){
      const wasActive=mb.classList.contains('active');
      document.querySelectorAll('.journal-mood-btn').forEach((b,i)=>{
        b.classList.remove('active');
        b.style.borderColor=''; b.style.boxShadow=''; b.style.background='';
      });
      if(!wasActive){
        mb.classList.add('active');
        const idx=parseInt(mb.dataset.jmood)-1;
        mb.style.borderColor=JOURNAL_MOOD_COLORS[idx];
        mb.style.boxShadow=`0 0 0 3px ${JOURNAL_MOOD_COLORS[idx]}33`;
        mb.style.background=`${JOURNAL_MOOD_COLORS[idx]}18`;
      }
      return;
    }
    // Delete entry
    const del=e.target.closest('.journal-entry-delete[data-jdel]');
    if(del){
      delete state.journal[del.dataset.jdel];
      localStorage.setItem('ht_journal_v1',JSON.stringify(state.journal));
      render(false);
      renderJournal();
      return;
    }
    // Click history entry to navigate
    const item=e.target.closest('.journal-entry-item[data-jentry]');
    if(item&&!e.target.closest('[data-jdel]')){
      const dk=item.dataset.jentry;
      const[y,m,day]=dk.split('-').map(Number);
      setJournalDate(new Date(y,m-1,day));
      renderJournal();
      // Scroll to top of journal card
      document.getElementById('journal-card')?.scrollIntoView({behavior:'smooth',block:'nearest'});
      return;
    }
  });
}

// ── TIMETABLE PAGE ────────────────────────────────────────────────────────────
function ttNavigateWeek(delta){
  if(!ttWeekStart) ttWeekStart=getTTWeekMonday(new Date());
  ttWeekStart=new Date(ttWeekStart);
  ttWeekStart.setDate(ttWeekStart.getDate()+delta*7);
  state.month=ttWeekStart.getMonth();
  state.year=ttWeekStart.getFullYear();
  renderTimetable();
}
if(CURRENT_PAGE==="timetable"){
  on("tt-week-prev-btn","click",()=>ttNavigateWeek(-1));
  on("tt-week-next-btn","click",()=>ttNavigateWeek(1));
  (function(){
    const clearBtn=document.getElementById("tt-clear-all-btn");
    const backdrop=document.getElementById("tt-confirm-backdrop");
    const modal=document.getElementById("tt-confirm-modal");
    const cancelBtn=document.getElementById("tt-confirm-cancel");
    const deleteBtn=document.getElementById("tt-confirm-delete");
    if(!clearBtn)return;
    function openConfirm(){if(!state.timetable.length)return;backdrop.classList.add("open");modal.classList.add("open");}
    function closeConfirm(){backdrop.classList.remove("open");modal.classList.remove("open");}
    clearBtn.addEventListener("click",openConfirm);
    backdrop.addEventListener("click",closeConfirm);
    cancelBtn.addEventListener("click",closeConfirm);
    document.addEventListener("keydown",e=>{if(e.key==="Escape")closeConfirm();});
    deleteBtn.addEventListener("click",()=>{state.timetable=[];state.ttIdCtr=1;saveAll();renderTimetable();closeConfirm();});
  })();
}

// ─── THEME SYSTEM ─────────────────────────────────────────────────────────────
(function(){
  const THEME_KEY='ht_theme_v2';
  const btn=document.getElementById('theme-toggle');
  const dropdown=document.getElementById('theme-dropdown');
  const THEMES={
    dark:{icon:'🌑',cls:''},
    light:{icon:'☀️',cls:'theme-light'},
    forest:{icon:'🌿',cls:'theme-forest'},
    sakura:{icon:'🌸',cls:'theme-sakura'},
    ocean:{icon:'🌊',cls:'theme-ocean'},
    sunset:{icon:'🌅',cls:'theme-sunset'},
    midnight:{icon:'🌙',cls:'theme-midnight'},
    amoled:{icon:'🖤',cls:'theme-amoled'},
    paper:{icon:'🤍',cls:'theme-paper'},
    slate:{icon:'🌫️',cls:'theme-slate'},
  };
  const ALL_CLS=Object.values(THEMES).map(t=>t.cls).filter(Boolean);
  let current='dark';
  let open=false;

  function applyTheme(name){
    current=name;
    const th=THEMES[name]||THEMES.dark;
    document.body.classList.remove(...ALL_CLS);
    if(th.cls) document.body.classList.add(th.cls);
    btn.textContent=th.icon;
    dropdown.querySelectorAll('.theme-option').forEach(o=>o.classList.toggle('active',o.dataset.theme===name));
    try{localStorage.setItem(THEME_KEY,name);}catch(e){}
    // Re-render colour-dependent views
    if(typeof render==='function') render(false);
    if(typeof renderCycleCalendar==='function' && CURRENT_PAGE==='cycle') renderCycleCalendar();
  }

  function openDrop(){
    const rect=btn.getBoundingClientRect();
    dropdown.style.top=(rect.bottom+6)+'px';
    const dw=dropdown.offsetWidth||192;
    dropdown.style.left=Math.max(4,rect.right-dw)+'px';
    dropdown.style.right='auto';
    dropdown.classList.add('open');
    btn.style.borderColor='#4f6ef7';
    open=true;
  }
  function closeDrop(){
    dropdown.classList.remove('open');
    btn.style.borderColor='';
    open=false;
  }

  // Load saved theme
  try{const s=localStorage.getItem(THEME_KEY);if(s&&THEMES[s])current=s;}catch(e){}
  applyTheme(current);

  btn.addEventListener('click',e=>{e.stopPropagation();open?closeDrop():openDrop();});
  document.addEventListener('click',e=>{
    const sbThemeBtn = document.getElementById('sb-theme-btn');
    const isOpen = open || dropdown.classList.contains('open');
    if(isOpen&&!dropdown.contains(e.target)&&e.target!==btn&&e.target!==sbThemeBtn)closeDrop();
  });
  dropdown.querySelectorAll('.theme-option').forEach(opt=>{
    opt.addEventListener('click',e=>{e.stopPropagation();applyTheme(opt.dataset.theme);closeDrop();});
  });
})();

// ─── HABITS SUB-TAB SWITCHER ──────────────────────────────────────────────────
function setHabitsSubtab(subtab){
  const trackerSection=document.getElementById('tracker-section');
  const statsRow=document.getElementById('stats-row');
  const analysisSection=document.getElementById('analysis-section');
  const subtabBar=document.getElementById('habits-subtab-bar');
  if(!subtabBar)return;
  subtabBar.querySelectorAll('.habits-subtab-btn').forEach(b=>{
    const isActive=b.dataset.subtab===subtab;
    b.classList.toggle('active',isActive);
    b.style.background=isActive?'var(--surface2)':'transparent';
    b.style.color=isActive?'var(--text)':'var(--text-muted)';
    b.style.borderColor=isActive?'#4f6ef7':'var(--border)';
  });
  if(subtab==='habits'){
    if(trackerSection)trackerSection.classList.remove('hidden');
    if(statsRow)statsRow.classList.remove('hidden');
    if(analysisSection)analysisSection.classList.add('hidden');
  }else{
    if(trackerSection)trackerSection.classList.add('hidden');
    if(statsRow)statsRow.classList.add('hidden');
    if(analysisSection){
      analysisSection.classList.remove('hidden');
      analysisSection.style.animation='fadeSlideUp .45s cubic-bezier(.4,0,.2,1) both';
      // Render analysis content
      const{days,total,done,pct}=calcStats();const wg=getWeekGroups();
      renderAnalysis(days,total,done,pct,calcHabitPcts(),wg,calcWeekTotals(wg),calcDowTotals());
    }
  }
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
const SB_PREF_KEY = 'lt_sidebar_v1';

function initSidebar() {
  document.body.classList.add('has-sidebar');

  // Load collapse preference
  let collapsed = false;
  try { const p = JSON.parse(localStorage.getItem(SB_PREF_KEY)||'null'); if(p) collapsed = !!p.collapsed; } catch(e){}
  if(collapsed) document.body.classList.add('sb-collapsed');

  const showCycle = isCycleUser();
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;

  // Nav definition
  const sections = [
    { label: 'Track', items: [
      { page:'habits',    href:'tracker.html',  icon:'📊', label: tr.tabTracker||'Habits' },
      { page:'analysis',  href:'analysis.html', icon:'📈', label: tr.tabAnalysis||'Analysis' },
    ]},
    { label: 'Schedule', items: [
      { page:'timetable', href:'timetable.html', icon:'🗓', label: tr.tabTimetable||'Timetable' },
      { page:'tasks',     href:'tasks.html',     icon:'✅', label: tr.tabTasks||'Tasks' },
    ]},
    { label: 'Health', items: [
      { page:'calories',  href:'calories.html',  icon:'🍎', label:'Calories' },
      { page:'workout',   href:'workout.html',   icon:'🏋️', label:'Workout' },
      ...(showCycle ? [{ page:'cycle', href:'cycle.html', icon:'🌸', label: tr.tabCycle||'Cycle', id:'sb-cycle-item' }] : []),
    ]},
    { label: 'Lifestyle', items: [
      { page:'shopping', href:'shopping.html', icon:'🛒', label: tr.tabShopping||'Shopping' },
      { page:'finance',  href:'finance.html',  icon:'💰', label: tr.tabFinance||'Finance' },
      { page:'recipes',  href:'recipes.html',  icon:'📖', label: tr.tabRecipes||'Recipes' },
    ]},
  ];

  // Strip leading emoji/symbol characters from a label so the sidebar
  // icon (sb-icon) and the text label (sb-label) are never duplicated.
  const stripLeadEmoji = s => s.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}✅📊📈🗓💰🛒🌸⏱💬🍎🏋️📖]+\s*/gu, '').trim();

  let navHTML = '';
  sections.forEach(sec => {
    navHTML += `<div class="sb-group"><div class="sb-group-label">${sec.label}</div>`;
    sec.items.forEach(item => {
      const isActive = CURRENT_PAGE === item.page || (item.page==='habits' && (CURRENT_PAGE==='tracker'||CURRENT_PAGE==='habits'));
      const cls = ['sb-item', isActive?'active':'', item.soon?'sb-soon':''].filter(Boolean).join(' ');
      const idAttr = item.id ? `id="${item.id}"` : '';
      const soonBadge = item.soon ? `<span class="sb-soon-badge">SOON</span>` : '';
      const cleanLabel = stripLeadEmoji(item.label);
      navHTML += `<a class="${cls}" ${idAttr} href="${item.soon?'#':item.href}" title="${cleanLabel}">
        <span class="sb-icon">${item.icon}</span>
        <span class="sb-label">${cleanLabel}${soonBadge}</span>
      </a>`;
    });
    navHTML += `</div>`;
  });

  // Build sidebar element
  const sidebar = document.createElement('aside');
  sidebar.id = 'sidebar';
  if(collapsed) sidebar.classList.add('sb-collapsed');
  sidebar.innerHTML = `
    <div class="sb-head">
      <div class="sb-logo">
        <span class="sb-logo-icon">✦</span>
        <span class="sb-logo-text">Life Tracker</span>
      </div>
      <button class="sb-col-btn" id="sb-col-btn" title="Collapse sidebar">‹</button>
    </div>
    <nav class="sb-nav">${navHTML}</nav>
    <div class="sb-foot">
      <div class="sb-divider"></div>
      <button class="sb-item" id="sb-pomo-btn" title="Pomodoro Timer">
        <span class="sb-icon">⏱</span><span class="sb-label">Pomodoro</span>
      </button>
      <button class="sb-item" id="sb-theme-btn" title="Change Theme">
        <span class="sb-icon">🎨</span><span class="sb-label">Theme</span>
      </button>
      <button class="sb-item" id="sb-lang-btn" title="Language">
        <span class="sb-icon">🌐</span><span class="sb-label">Language</span>
      </button>
      <button class="sb-item" id="sb-settings-btn" title="Settings">
        <span class="sb-icon">⚙️</span><span class="sb-label">Settings</span>
      </button>
    </div>`;

  // Mobile overlay + hamburger
  const overlay = document.createElement('div');
  overlay.id = 'sb-overlay';

  const hamburger = document.createElement('button');
  hamburger.id = 'sb-hamburger';
  hamburger.title = 'Open menu';
  hamburger.textContent = '☰';

  // Inject into DOM
  document.body.insertBefore(sidebar, document.body.firstChild);
  document.body.appendChild(overlay);
  const header = document.getElementById('header');
  if(header) header.insertBefore(hamburger, header.firstChild);

  // ── Collapse toggle ──
  document.getElementById('sb-col-btn').addEventListener('click', () => {
    const isCol = sidebar.classList.toggle('sb-collapsed');
    document.body.classList.toggle('sb-collapsed', isCol);
    try { localStorage.setItem(SB_PREF_KEY, JSON.stringify({collapsed:isCol})); } catch(e){}
  });

  // ── Mobile hamburger ──
  hamburger.addEventListener('click', () => {
    const open = sidebar.classList.toggle('sb-mobile-open');
    overlay.classList.toggle('open', open);
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('sb-mobile-open');
    overlay.classList.remove('open');
  });

  // ── Footer button wiring ──
  document.getElementById('sb-pomo-btn').addEventListener('click', () => {
    const orig = document.getElementById('pomo-toggle');
    if(orig) orig.click();
    // mirror active style
    const sbBtn = document.getElementById('sb-pomo-btn');
    setTimeout(()=>{
      if(sbBtn) sbBtn.classList.toggle('sb-pomo-active', orig && orig.classList.contains('active'));
    }, 50);
  });

  function openSbDropdown(dropId, sbBtnId, fallbackId) {
    const dropdown = document.getElementById(dropId);
    const sbBtn = document.getElementById(sbBtnId);
    if (!dropdown || !sbBtn) return;
    const isOpen = dropdown.classList.contains('open');
    // Close all dropdowns first
    document.querySelectorAll('#theme-dropdown, #lang-dropdown').forEach(d => d.classList.remove('open'));
    if (isOpen) return; // was open → just close
    // Position: open to the right of sidebar button, clamped to viewport
    const rect = sbBtn.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    dropdown.style.display = 'block'; // briefly show to measure
    const dw = dropdown.offsetWidth || 200;
    const dh = dropdown.offsetHeight || 300;
    dropdown.style.display = '';
    // Try right of sidebar; if it overflows, try above button; last resort: center above
    let left = rect.right + 8;
    if (left + dw > vw - 8) left = Math.max(8, vw - dw - 8);
    let top = rect.top;
    if (top + dh > vh - 8) top = Math.max(8, vh - dh - 8);
    dropdown.style.left = left + 'px';
    dropdown.style.top = top + 'px';
    dropdown.style.right = 'auto';
    dropdown.classList.add('open');
  }

  document.getElementById('sb-theme-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openSbDropdown('theme-dropdown', 'sb-theme-btn', 'theme-toggle');
  });

  document.getElementById('sb-lang-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openSbDropdown('lang-dropdown', 'sb-lang-btn', 'lang-btn');
  });

  document.getElementById('sb-settings-btn').addEventListener('click', () => {
    // Use the existing switchTab settings logic
    switchTab('settings');
  });

  // ── Close sidebar on nav item click (mobile) ──
  sidebar.querySelectorAll('a.sb-item:not(.sb-soon)').forEach(a => {
    a.addEventListener('click', () => {
      sidebar.classList.remove('sb-mobile-open');
      overlay.classList.remove('open');
    });
  });

  // ── Keep cycle item in sync with gender prefs ──
  function syncCycleItem() {
    const show = isCycleUser();
    const item = document.getElementById('sb-cycle-item');
    if(item) item.closest('.sb-group') && (item.style.display = show ? '' : 'none');
  }
  syncCycleItem();
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
loadAll();
applyTranslations();
updatePomoDisplay();
initSidebar();

// Mark active tab link — habits page is the tracker tab; analysis has no top tab
document.querySelectorAll('.tab-btn').forEach(b=>{
  if(CURRENT_PAGE==='analysis'){ b.classList.remove('active'); return; }
  const effectivePage = CURRENT_PAGE==='habits'?'habits':CURRENT_PAGE;
  b.classList.toggle('active', b.dataset.tab===effectivePage);
});

// Apply cycle tab visibility based on gender preference
applyCycleTabVisibility();

// Page-specific initialisation
if(CURRENT_PAGE==='tracker'||CURRENT_PAGE==='habits'){
  render(true);
  applyTrackerScope(trackerScope);
  // Wire up sub-tab buttons
  document.querySelectorAll('.habits-subtab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>setHabitsSubtab(btn.dataset.subtab));
  });
  // Check if loaded with #analysis hash
  if(window.location.hash==='#analysis'){
    setHabitsSubtab('analysis');
  }
} else if(CURRENT_PAGE==='tasks'){
  renderTasksView();
} else if(CURRENT_PAGE==='analysis'){
  // Initialised above in the CURRENT_PAGE==="analysis" block
} else if(CURRENT_PAGE==='shopping'){
  renderShoppingList();
} else if(CURRENT_PAGE==='cycle'){
  renderCycleTracker();
} else if(CURRENT_PAGE==='timetable'){
  renderTimetable();
  const mon=ttWeekStart||getTTWeekMonday(new Date());
  document.getElementById('month-title').textContent=getMonthNames()[mon.getMonth()];
  document.getElementById('year-label').textContent=mon.getFullYear();
} else if(CURRENT_PAGE==='settings'){
  initSettingsPage();
}

// Show onboarding modal if first-time user
if(!userPrefs.setupDone){
  showOnboardingModal();
}

// ─── CUSTOM DATE PICKER ────────────────────────────────────────────────────────
class DatePicker {
  constructor(inputEl, triggerEl) {
    this.input = inputEl;
    this.trigger = triggerEl || null;
    this._value = inputEl.value || '';
    this.viewYear = null;
    this.viewMonth = null;
    this.popup = null;
    this.isOpen = false;
    this.mode = 'days';
    if (!this.trigger) this._wrapInput();
    this._buildPopup();
    this._attachTriggerEvent();
    this._interceptValue();
    this._syncValue(this._value);
  }

  _wrapInput() {
    const wrapper = document.createElement('div');
    wrapper.className = 'dp-wrapper';
    this.input.parentNode.insertBefore(wrapper, this.input);
    wrapper.appendChild(this.input);
    this.input.type = 'hidden';
    this.trigger = document.createElement('button');
    this.trigger.type = 'button';
    this.trigger.className = 'dp-trigger';
    this.trigger.innerHTML = `<span class="dp-trigger-text dp-placeholder">— Select date —</span><svg class="dp-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    wrapper.appendChild(this.trigger);
    this.wrapper = wrapper;
  }

  _buildPopup() {
    this.popup = document.createElement('div');
    this.popup.className = 'dp-popup';
    this.popup.style.display = 'none';
    document.body.appendChild(this.popup);
  }

  _attachTriggerEvent() {
    this.trigger.addEventListener('click', e => { e.stopPropagation(); this.toggleOpen(); });
    // Single persistent handler for all popup interactions (prev/next/day/etc)
    this.popup.addEventListener('click', e => {
      e.stopPropagation();
      if (this.mode === 'years') {
        if (e.target.closest('[data-act="back"]')) { this.mode='days'; this._render(); return; }
        const yi = e.target.closest('.dp-year-item');
        if (yi) { this.viewYear=+yi.dataset.year; this.mode='days'; this._render(); }
        return;
      }
      const act = e.target.closest('[data-act]')?.dataset?.act;
      if (act === 'prev') { this.viewMonth--; if (this.viewMonth<0){this.viewMonth=11;this.viewYear--;} this._render(); return; }
      if (act === 'next') { this.viewMonth++; if (this.viewMonth>11){this.viewMonth=0;this.viewYear++;} this._render(); return; }
      if (act === 'years') { this.mode='years'; this._render(); return; }
      if (act === 'today') { const t=new Date(); this._pick(t.getFullYear(), t.getMonth(), t.getDate()); return; }
      if (act === 'clear') { this.setValue(''); this.input.dispatchEvent(new Event('change',{bubbles:true})); this.closePopup(); return; }
      const day = e.target.closest('.dp-day');
      if (day) { this._pick(+day.dataset.y, +day.dataset.m, +day.dataset.d); }
    });
  }

  _interceptValue() {
    const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    const self = this;
    Object.defineProperty(this.input, 'value', {
      get() { return desc.get.call(self.input); },
      set(v) { desc.set.call(self.input, v); self._syncValue(v); },
      configurable: true
    });
  }

  _syncValue(v) {
    this._value = v || '';
    const textEl = this.trigger ? this.trigger.querySelector('.dp-trigger-text') : null;
    if (!textEl) return;
    if (!v) {
      textEl.textContent = '— Select date —';
      textEl.className = 'dp-trigger-text dp-placeholder';
    } else {
      const parts = v.split('-');
      if (parts.length === 3) {
        const [y, m, d] = parts.map(Number);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        textEl.textContent = `${months[m-1]} ${d}, ${y}`;
      } else {
        textEl.textContent = v;
      }
      textEl.className = 'dp-trigger-text';
    }
  }

  getValue() { return this.input.value; }
  setValue(v) {
    const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.input), 'value') ||
                 Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    desc.set.call(this.input, v);
    this._syncValue(v);
  }

  toggleOpen() { this.isOpen ? this.closePopup() : this.openPopup(); }

  openPopup() {
    DatePicker._closeAll(this);
    this.isOpen = true;
    this.mode = 'days';
    const today = new Date();
    if (this._value) {
      const [y, m] = this._value.split('-').map(Number);
      this.viewYear = y; this.viewMonth = m - 1;
    } else {
      this.viewYear = today.getFullYear(); this.viewMonth = today.getMonth();
    }
    if (this.trigger) this.trigger.classList.add('dp-open');
    this.popup.style.display = 'block';
    this._render();
    this._position();
  }

  closePopup() {
    this.isOpen = false;
    if (this.trigger) this.trigger.classList.remove('dp-open');
    this.popup.style.display = 'none';
  }

  _position() {
    const ref = this.trigger || this.input;
    const rect = ref.getBoundingClientRect();
    const pH = this.popup.offsetHeight || 310;
    const pW = 272;
    let top = rect.bottom + 6;
    let left = rect.left;
    if (top + pH > window.innerHeight - 8) top = Math.max(6, rect.top - pH - 6);
    if (left + pW > window.innerWidth - 8) left = window.innerWidth - pW - 8;
    if (left < 6) left = 6;
    this.popup.style.top = top + 'px';
    this.popup.style.left = left + 'px';
  }

  _render() {
    if (this.mode === 'years') { this._renderYears(); return; }
    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const DOWS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    const firstDay = new Date(this.viewYear, this.viewMonth, 1).getDay();
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const daysInPrev = new Date(this.viewYear, this.viewMonth, 0).getDate();
    const today = new Date(); today.setHours(0,0,0,0);
    const [selY, selM, selD] = this._value ? this._value.split('-').map(Number) : [];

    let cells = '';
    for (let i = firstDay - 1; i >= 0; i--) {
      const dd = daysInPrev - i;
      const yy = this.viewMonth === 0 ? this.viewYear-1 : this.viewYear;
      const mm = this.viewMonth === 0 ? 11 : this.viewMonth-1;
      cells += `<div class="dp-day dp-other-month" data-y="${yy}" data-m="${mm}" data-d="${dd}">${dd}</div>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(this.viewYear, this.viewMonth, d); dt.setHours(0,0,0,0);
      const isT = dt.getTime() === today.getTime();
      const isS = selY===this.viewYear && (selM-1)===this.viewMonth && selD===d;
      cells += `<div class="dp-day${isT?' dp-today':''}${isS?' dp-selected':''}" data-y="${this.viewYear}" data-m="${this.viewMonth}" data-d="${d}">${d}</div>`;
    }
    const used = firstDay + daysInMonth;
    const fill = used % 7 === 0 ? 0 : 7 - (used % 7);
    for (let d = 1; d <= fill; d++) {
      const yy = this.viewMonth===11 ? this.viewYear+1 : this.viewYear;
      const mm = this.viewMonth===11 ? 0 : this.viewMonth+1;
      cells += `<div class="dp-day dp-other-month" data-y="${yy}" data-m="${mm}" data-d="${d}">${d}</div>`;
    }

    this.popup.innerHTML = `
      <div class="dp-nav">
        <button type="button" class="dp-nav-btn" data-act="prev">&#8249;</button>
        <span class="dp-nav-title" data-act="years">${MONTHS[this.viewMonth]} ${this.viewYear}</span>
        <button type="button" class="dp-nav-btn" data-act="next">&#8250;</button>
      </div>
      <div class="dp-dow-row">${DOWS.map(d=>`<div class="dp-dow">${d}</div>`).join('')}</div>
      <div class="dp-days">${cells}</div>
      <div class="dp-footer">
        <button type="button" class="dp-today-btn" data-act="today">Today</button>
        <button type="button" class="dp-clear-btn" data-act="clear">Clear</button>
      </div>`;

  }

  _renderYears() {
    const curY = new Date().getFullYear();
    let items = '';
    for (let y = curY-80; y <= curY+15; y++) {
      items += `<div class="dp-year-item${y===this.viewYear?' dp-year-sel':''}" data-year="${y}">${y}</div>`;
    }
    this.popup.innerHTML = `
      <div class="dp-nav" style="margin-bottom:10px;">
        <span style="font-size:11px;font-weight:800;color:var(--text-muted);letter-spacing:1px;">SELECT YEAR</span>
        <button type="button" class="dp-year-back" data-act="back">← Back</button>
      </div>
      <div class="dp-year-grid">${items}</div>`;
    const sel = this.popup.querySelector('.dp-year-sel');
    if (sel) setTimeout(()=>sel.scrollIntoView({block:'center'}),0);
  }

  _pick(y, m, d) {
    const mm = String(m+1).padStart(2,'0');
    const dd = String(d).padStart(2,'0');
    this.setValue(`${y}-${mm}-${dd}`);
    this.input.dispatchEvent(new Event('change',{bubbles:true}));
    this.closePopup();
  }

  static _all = [];
  static _closeAll(except) { DatePicker._all.forEach(p => { if(p!==except) p.closePopup(); }); }
}

// Close on outside click or Escape
document.addEventListener('click', () => { DatePicker._all.forEach(p => p.closePopup()); });
document.addEventListener('keydown', e => { if(e.key==='Escape') DatePicker._all.forEach(p => p.closePopup()); });

// Initialise static date pickers
(function() {
  ['task-due-input','cycle-start-input'].forEach(id => {
    const inp = document.getElementById(id);
    const trig = document.getElementById(id.replace('-input','-trigger'));
    if (!inp) return;
    inp.type = 'hidden';
    const dp = new DatePicker(inp, trig);
    dp.wrapper = inp.closest('.dp-wrapper');
    DatePicker._all.push(dp);
  });
})();

// ═══════════════════════════════════════════════════════════════════
// ── FINANCE MODULE ────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
if (CURRENT_PAGE === 'finance') {

// ── TRANSLATIONS (finance keys) ───────────────────────────────────
const FIN_I18N = {
  en: { tabFinance:'💰 Finance', finTotalExpenses:'Total Expenses', finTotalIncome:'Total Income',
        finBalance:'Balance', finMonthlyBudget:'Monthly Budget', finExpenses:'Expenses',
        finIncome:'Income', finDescription:'Aa Description', finAmount:'💲 Amount',
        finCategory:'🏷 Category', finSource:'🏷 Source', finNoExpenses:'No expenses yet. Add one below!',
        finNoIncome:'No income yet. Add one below!', finDescPlaceholder:'Description…',
        finSourcePlaceholder:'Source…', finAddEntry:'+ Add', finToday:'Today',
        finThisWeek:'This week', finThisMonth:'This month', finAll:'All',
        finBudgetBreakdown:'Budget Breakdown', finTotalSpent:'Total spent',
        finBudgetEnvelopes:'Budget Envelopes', finEnvelopeHint:'Click ✎ to set a monthly limit per category',
        finNoDataMonth:'No data this month.', finSavingsEmpty:'No savings goals yet.',
        finOverBudget:'over budget', finLeftMonth:'left this month',
        finNoLimit:'No limit', finSetLimit:'Set one',
        finSavingsGoals:'Savings Goals' },
  hu: { tabFinance:'💰 Pénzügy', finTotalExpenses:'Összes kiadás', finTotalIncome:'Összes bevétel',
        finBalance:'Egyenleg', finMonthlyBudget:'Havi keret', finExpenses:'Kiadások',
        finIncome:'Bevételek', finDescription:'Megnevezés', finAmount:'Összeg',
        finCategory:'Kategória', finSource:'Forrás', finNoExpenses:'Még nincs kiadás.',
        finNoIncome:'Még nincs bevétel.', finDescPlaceholder:'Megnevezés…',
        finSourcePlaceholder:'Forrás…', finAddEntry:'+ Hozzáad', finToday:'Ma',
        finThisWeek:'Ez a hét', finThisMonth:'Ez a hónap', finAll:'Mind',
        finBudgetBreakdown:'Kategóriák', finTotalSpent:'Összesen',
        finBudgetEnvelopes:'Keret borítékok', finEnvelopeHint:'✎ gombra kattintva havi keretet állíthatsz',
        finNoDataMonth:'Még nincs adat erre a hónapra.', finSavingsEmpty:'Még nincs megtakarítási cél.',
        finOverBudget:'túllépés', finLeftMonth:'maradt erre a hónapra',
        finNoLimit:'Nincs limit', finSetLimit:'Beállítás',
        finSavingsGoals:'Megtakarítási célok' },
  de: { tabFinance:'💰 Finanzen', finTotalExpenses:'Gesamtausgaben', finTotalIncome:'Gesamteinnahmen',
        finBalance:'Saldo', finMonthlyBudget:'Monatsbudget', finExpenses:'Ausgaben',
        finIncome:'Einnahmen', finNoExpenses:'Noch keine Ausgaben.', finNoIncome:'Noch keine Einnahmen.',
        finDescPlaceholder:'Beschreibung…', finSourcePlaceholder:'Quelle…', finAddEntry:'+ Hinzufügen',
        finToday:'Heute', finThisWeek:'Diese Woche', finThisMonth:'Dieser Monat', finAll:'Alle',
        finBudgetBreakdown:'Ausgaben nach Kategorie', finTotalSpent:'Gesamt ausgegeben',
        finBudgetEnvelopes:'Budget-Umschläge', finEnvelopeHint:'✎ klicken um monatliches Limit zu setzen',
        finNoDataMonth:'Keine Daten diesen Monat.', finSavingsEmpty:'Noch keine Sparziele.',
        finOverBudget:'über Budget', finLeftMonth:'noch übrig diesen Monat',
        finNoLimit:'Kein Limit', finSetLimit:'Festlegen',
        finSavingsGoals:'Sparziele' },
  es: { tabFinance:'💰 Finanzas', finTotalExpenses:'Total gastos', finTotalIncome:'Total ingresos',
        finBalance:'Balance', finMonthlyBudget:'Presupuesto mensual', finExpenses:'Gastos',
        finIncome:'Ingresos', finNoExpenses:'Sin gastos aún.', finNoIncome:'Sin ingresos aún.',
        finDescPlaceholder:'Descripción…', finSourcePlaceholder:'Fuente…', finAddEntry:'+ Añadir',
        finToday:'Hoy', finThisWeek:'Esta semana', finThisMonth:'Este mes', finAll:'Todo',
        finBudgetBreakdown:'Desglose', finTotalSpent:'Total gastado',
        finBudgetEnvelopes:'Sobres de presupuesto', finEnvelopeHint:'Haz clic en ✎ para establecer un límite mensual',
        finNoDataMonth:'Sin datos este mes.', finSavingsEmpty:'Todavía no hay metas de ahorro.',
        finOverBudget:'sobre presupuesto', finLeftMonth:'restante este mes',
        finNoLimit:'Sin límite', finSetLimit:'Establecer',
        finSavingsGoals:'Metas de ahorro' },
  fr: { tabFinance:'💰 Finances', finTotalExpenses:'Total dépenses', finTotalIncome:'Total revenus',
        finBalance:'Solde', finMonthlyBudget:'Budget mensuel', finExpenses:'Dépenses',
        finIncome:'Revenus', finNoExpenses:'Aucune dépense encore.', finNoIncome:'Aucun revenu encore.',
        finDescPlaceholder:'Description…', finSourcePlaceholder:'Source…', finAddEntry:'+ Ajouter',
        finToday:"Aujourd'hui", finThisWeek:'Cette semaine', finThisMonth:'Ce mois', finAll:'Tout',
        finBudgetBreakdown:'Répartition', finTotalSpent:'Total dépensé',
        finBudgetEnvelopes:'Enveloppes budgétaires', finEnvelopeHint:'Cliquez ✎ pour définir une limite mensuelle',
        finNoDataMonth:'Aucune donnée ce mois.', finSavingsEmpty:"Aucun objectif d'épargne.",
        finOverBudget:'au-dessus du budget', finLeftMonth:'restant ce mois',
        finNoLimit:'Sans limite', finSetLimit:'Définir',
        finSavingsGoals:"Objectifs d'épargne" },
};
// Merge fin translations into main TRANSLATIONS
Object.keys(TRANSLATIONS).forEach(lang => {
  if (FIN_I18N[lang]) Object.assign(TRANSLATIONS[lang], FIN_I18N[lang]);
});

// ── FINANCE STATE & STORAGE ───────────────────────────────────────
const FIN_KEY = 'ht_finance_v1';
let finState = {
  expenses: [], incomes: [], idCtr: 1,
  monthlyBudget: 0,
  categoryBudgets: {},
  savings: [], savIdCtr: 1,
};
function loadFinance() {
  try {
    const raw = JSON.parse(localStorage.getItem(FIN_KEY) || 'null');
    if (raw) finState = Object.assign(finState, raw);
  } catch(e) {}
}
function saveFinance() {
  try { localStorage.setItem(FIN_KEY, JSON.stringify(finState)); } catch(e) {}
  flashSaved();
}

// ── HELPERS ───────────────────────────────────────────────────────
const CAT_COLORS = {
  Food:'#f5a623',Health:'#3ecfb2',Transport:'#7090f9',Entertainment:'#a78bfa',
  Utilities:'#e05a9a',Home:'#c09060',Development:'#20b4f8',Investment:'#ff8c00',
  Salary:'#3ecfb2',Freelance:'#7090f9',Gift:'#e05a9a',Other:'#8898aa',
};
function catClass(cat) {
  const map = {Food:'food',Health:'health',Transport:'transport',Entertainment:'entertainment',
    Utilities:'utilities',Home:'home',Development:'development',Investment:'investment',
    Salary:'salary',Freelance:'freelance',Gift:'gift',Other:'other'};
  return 'fin-cat-'+(map[cat]||'other');
}
// Maps canonical English key → i18n translation key
const CAT_I18N_KEY = {
  Food:'finCatFood', Health:'finCatHealth', Transport:'finCatTransport',
  Entertainment:'finCatEntertainment', Utilities:'finCatUtilities', Home:'finCatHome',
  Development:'finCatDevelopment', Investment:'finCatInvestment', Other:'finCatOther',
  Salary:'finIncSalary', Freelance:'finIncFreelance', Gift:'finIncGift',
};
function catLabel(cat) {
  const key = CAT_I18N_KEY[cat];
  if (!key) return cat;
  const full = t(key) || cat;
  // Strip leading emoji + space ("🍔 Étel" → "Étel")
  return full.replace(/^.{1,2}\s/, '').trim() || cat;
}
function fmtAmt(n) { return '€'+Number(n).toFixed(2); }

let expScope = 'month', incScope = 'month';
function inScope(dateStr, scope) {
  const d = new Date(dateStr+'T00:00:00');
  const now = new Date(); now.setHours(0,0,0,0);
  if (scope === 'all') return true;
  if (scope === 'today') {
    return d.getFullYear()===now.getFullYear()&&d.getMonth()===now.getMonth()&&d.getDate()===now.getDate();
  }
  if (scope === 'week') {
    const mon = getTTWeekMonday(now);
    const sun = new Date(mon); sun.setDate(sun.getDate()+6); sun.setHours(23,59,59);
    return d >= mon && d <= sun;
  }
  if (scope === 'month') {
    return d.getFullYear()===now.getFullYear()&&d.getMonth()===now.getMonth();
  }
  return true;
}

// ── EMOJI PICKER ──────────────────────────────────────────────────
const EMOJIS = ['💳','🏧','💵','💸','🛒','🍔','🥗','☕','🍕','🍺','🏥','💊','🚗','⛽','🚌','🎬','🎮','📚','📗','📒','🏠','🔧','⚡','💧','📱','💻','🎓','📈','🥇','💎','🛍️','🎁','🌍','✈️','🏋️','💼','🤝','🏦','🍫','🥤'];
function buildEmojiPicker(pickerId, btnId, onPick) {
  const picker = document.getElementById(pickerId);
  if (!picker) return;
  picker.innerHTML = EMOJIS.map(e=>`<div class="fin-emoji-opt" data-e="${e}">${e}</div>`).join('');
  const btn = document.getElementById(btnId);
  btn.addEventListener('click', e => { e.stopPropagation(); picker.classList.toggle('hidden'); });
  picker.addEventListener('click', e => {
    const opt = e.target.closest('[data-e]');
    if (!opt) return;
    btn.textContent = opt.dataset.e;
    picker.classList.add('hidden');
    if (onPick) onPick(opt.dataset.e);
  });
  document.addEventListener('click', () => picker.classList.add('hidden'));
}

// ── RENDER ────────────────────────────────────────────────────────
function renderFinanceStats() {
  const expAll = finState.expenses;
  const incAll = finState.incomes;
  const monthExp = expAll.filter(e => inScope(e.date,'month')).reduce((s,e)=>s+Number(e.amount),0);
  const monthInc = incAll.filter(i => inScope(i.date,'month')).reduce((s,i)=>s+Number(i.amount),0);
  const balance = monthInc - monthExp;

  document.getElementById('fin-stat-expenses').textContent = fmtAmt(monthExp);
  document.getElementById('fin-stat-income').textContent = fmtAmt(monthInc);
  const balEl = document.getElementById('fin-stat-balance');
  balEl.textContent = fmtAmt(balance);
  const balCard = document.getElementById('fin-balance-card');
  balCard.classList.toggle('negative', balance < 0);

  const budgetUsed = monthExp;
  const budgetLimit = finState.monthlyBudget || 0;
  document.getElementById('fin-stat-budget-used').textContent = '€'+Math.round(budgetUsed);
  document.getElementById('fin-stat-budget-limit').textContent = budgetLimit > 0 ? '€'+budgetLimit : '—';
}

function renderExpenseList() {
  const list = document.getElementById('fin-expense-list');
  const filtered = finState.expenses.filter(e => inScope(e.date, expScope));
  if (!filtered.length) {
    list.innerHTML = `<div class="fin-empty-msg">${t('finNoExpenses')||'No expenses yet.'}</div>`;
    return;
  }
  list.innerHTML = '';
  [...filtered].reverse().forEach((exp, idx) => {
    const row = document.createElement('div');
    row.className = 'fin-entry-row';
    row.style.animationDelay = idx*0.03+'s';
    row.innerHTML = `
      <div>
        <div class="fin-entry-desc">
          <span class="fin-entry-emoji">${exp.emoji||'💳'}</span>
          <span class="fin-entry-name">${exp.desc}</span>
        </div>
        <div class="fin-entry-date">${exp.date}</div>
      </div>
      <div class="fin-entry-amt">${fmtAmt(exp.amount)}</div>
      <div class="fin-entry-cat"><span class="fin-cat-badge ${catClass(exp.category)}">${catLabel(exp.category)}</span></div>
      <div class="fin-entry-actions">
        <button class="fin-entry-del-btn" data-del-exp="${exp.id}" title="Delete">×</button>
      </div>`;
    list.appendChild(row);
  });
}

function renderIncomeList() {
  const list = document.getElementById('fin-income-list');
  const filtered = finState.incomes.filter(i => inScope(i.date, incScope));
  if (!filtered.length) {
    list.innerHTML = `<div class="fin-empty-msg">${t('finNoIncome')||'No income yet.'}</div>`;
    return;
  }
  list.innerHTML = '';
  [...filtered].reverse().forEach((inc, idx) => {
    const row = document.createElement('div');
    row.className = 'fin-entry-row income-row';
    row.style.animationDelay = idx*0.03+'s';
    row.innerHTML = `
      <div>
        <div class="fin-entry-desc">
          <span class="fin-entry-emoji">${inc.emoji||'💵'}</span>
          <span class="fin-entry-name">${inc.desc}</span>
        </div>
        <div class="fin-entry-date">${inc.date}</div>
      </div>
      <div class="fin-entry-amt">${fmtAmt(inc.amount)}</div>
      <div class="fin-entry-cat"><span class="fin-cat-badge ${catClass(inc.category)}">${catLabel(inc.category)}</span></div>
      <div class="fin-entry-actions">
        <button class="fin-entry-del-btn" data-del-inc="${inc.id}" title="Delete">×</button>
      </div>`;
    list.appendChild(row);
  });
}

function renderEnvelopes() {
  const el = document.getElementById('fin-breakdown-list');
  const totalEl = document.getElementById('fin-breakdown-total');
  const monthExp = finState.expenses.filter(e => inScope(e.date,'month'));
  const totals = {};
  monthExp.forEach(e => { totals[e.category] = (totals[e.category]||0)+Number(e.amount); });
  const total = Object.values(totals).reduce((s,v)=>s+v,0);
  if(totalEl) totalEl.textContent = fmtAmt(total);

  // Merge categories: those with spending + those with a budget set but no spending yet
  const budgets = finState.categoryBudgets || {};
  const allCats = [...new Set([...Object.keys(totals), ...Object.keys(budgets)])];
  // Sort: categories with a limit first (by spent desc), then no-limit by spent desc
  allCats.sort((a,b) => {
    const aHas = !!budgets[a], bHas = !!budgets[b];
    if (aHas !== bHas) return aHas ? -1 : 1;
    return (totals[b]||0) - (totals[a]||0);
  });

  if (!allCats.length) {
    el.innerHTML = `<div class="fin-empty-msg" style="font-size:12px;">${t('finNoDataMonth')||'No data this month.'}</div>`;
    return;
  }
  el.innerHTML = '';

  allCats.forEach((cat, idx) => {
    const spent = totals[cat] || 0;
    const limit = budgets[cat] || 0;
    const hasLimit = limit > 0;
    const color = CAT_COLORS[cat] || '#8898aa';

    // Bar fill percentage
    let barPct, barColor;
    if (hasLimit) {
      barPct = Math.min(100, (spent / limit) * 100);
      const ratio = spent / limit;
      barColor = ratio >= 1 ? '#ef4444' : ratio >= 0.8 ? '#f5a623' : color;
    } else {
      barPct = total > 0 ? (spent / total) * 100 : 0;
      barColor = color;
    }

    const remaining = limit - spent;
    const over = hasLimit && remaining < 0;
    const nearLimit = hasLimit && !over && remaining / limit < 0.2;

    const item = document.createElement('div');
    item.className = 'fin-envelope-item';
    item.dataset.cat = cat;

    item.innerHTML = `
      <div class="fin-envelope-top">
        <div class="fin-envelope-left">
          <div class="fin-breakdown-dot" style="background:${color}"></div>
          <span class="fin-envelope-name">${catLabel(cat)}</span>
        </div>
        <div class="fin-envelope-right">
          <span class="fin-envelope-spent">${fmtAmt(spent)}</span>
          ${hasLimit ? `<span class="fin-envelope-sep">/</span><span class="fin-envelope-limit">€${limit}</span>` : ''}
          <div class="fin-envelope-edit-wrap">
            <button class="fin-envelope-edit-btn" data-editcat="${cat}" title="Set budget limit">✎</button>
            <div class="fin-envelope-input-pop hidden" data-pop="${cat}">
              <input class="fin-envelope-input" type="number" placeholder="limit €" min="0" step="1" value="${limit||''}"/>
              <button class="fin-envelope-save-btn">✓</button>
              <button class="fin-envelope-clear-btn" title="Remove limit">✕</button>
            </div>
          </div>
        </div>
      </div>
      <div class="fin-envelope-bar-track">
        <div class="fin-envelope-bar-fill" style="width:0%;background:${barColor}"></div>
      </div>
      ${hasLimit
        ? `<div class="fin-envelope-status ${over?'over':nearLimit?'warn':'ok'}">
             ${over
               ? `⚠️ €${Math.abs(remaining).toFixed(2)} ${t('finOverBudget')||'over budget'}`
               : `✓ €${remaining.toFixed(2)} ${t('finLeftMonth')||'left this month'}`}
           </div>`
        : `<div class="fin-envelope-nolimit">${t('finNoLimit')||'No limit'} — <span class="fin-envelope-setlink" data-setlink="${cat}">${t('finSetLimit')||'Set one'}</span></div>`
      }`;

    el.appendChild(item);

    // Animate bar
    requestAnimationFrame(() => setTimeout(() => {
      const f = item.querySelector('.fin-envelope-bar-fill');
      if (f) { f.style.transition = 'width .65s cubic-bezier(.4,0,.2,1),background .3s'; f.style.width = barPct + '%'; }
    }, 60 + idx * 30));

    // Toggle input pop
    const openPop = () => {
      const pop = item.querySelector('.fin-envelope-input-pop');
      pop.classList.remove('hidden');
      const inp = pop.querySelector('.fin-envelope-input');
      inp.focus(); inp.select();
    };
    item.querySelector('[data-editcat]').addEventListener('click', e => { e.stopPropagation(); openPop(); });
    const setLink = item.querySelector('[data-setlink]');
    if (setLink) setLink.addEventListener('click', e => { e.stopPropagation(); openPop(); });

    // Save helper
    const saveEnvelopeLimit = (val) => {
      if (!finState.categoryBudgets) finState.categoryBudgets = {};
      if (!isNaN(val) && val > 0) {
        finState.categoryBudgets[cat] = val;
      } else {
        delete finState.categoryBudgets[cat];
      }
      saveFinance(); renderFinance();
    };

    const pop = item.querySelector('.fin-envelope-input-pop');
    const inp = pop.querySelector('.fin-envelope-input');
    pop.querySelector('.fin-envelope-save-btn').addEventListener('click', e => {
      e.stopPropagation();
      saveEnvelopeLimit(parseFloat(inp.value));
    });
    pop.querySelector('.fin-envelope-clear-btn').addEventListener('click', e => {
      e.stopPropagation();
      saveEnvelopeLimit(0);
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') saveEnvelopeLimit(parseFloat(inp.value));
      if (e.key === 'Escape') pop.classList.add('hidden');
      e.stopPropagation();
    });
    // Close pop on outside click
    document.addEventListener('click', () => pop.classList.add('hidden'), { once: false });
    pop.addEventListener('click', e => e.stopPropagation());
  });
}

function renderSavings() {
  const el = document.getElementById('fin-savings-list');
  if (!finState.savings.length) {
    el.innerHTML = `<div class="fin-empty-msg" style="font-size:12px;">${t('finSavingsEmpty')||'No savings goals yet.'}</div>`;
    return;
  }
  el.innerHTML = '';
  finState.savings.forEach(sav => {
    const pct = sav.target > 0 ? Math.min(100,Math.round(sav.current/sav.target*100)) : 0;
    const item = document.createElement('div');
    item.className = 'fin-savings-goal-item';
    item.innerHTML = `
      <div class="fin-savings-goal-header">
        <span class="fin-savings-goal-name">${sav.name}</span>
        <div class="fin-savings-goal-vals">
          <span class="fin-savings-goal-current">€${sav.current||0}</span>
          <span class="fin-savings-goal-sep">/</span>
          <span class="fin-savings-goal-target">€${sav.target}</span>
        </div>
      </div>
      <div class="fin-savings-track"><div class="fin-savings-fill" style="width:0%"></div></div>
      <div class="fin-savings-actions">
        <input class="fin-savings-contrib-input" type="number" placeholder="+€" min="0" step="1" data-savid="${sav.id}" />
        <button class="fin-savings-contrib-btn" data-savcontrib="${sav.id}">+ Add</button>
        <button class="fin-savings-del-btn" data-savdel="${sav.id}">×</button>
      </div>`;
    el.appendChild(item);
    requestAnimationFrame(()=>setTimeout(()=>{ const f=item.querySelector('.fin-savings-fill');if(f)f.style.width=pct+'%'; },120));
  });
}

function renderFinance() {
  renderFinanceStats();
  renderExpenseList();
  renderIncomeList();
  renderEnvelopes();
  renderSavings();
  applyTranslations();
}

// ── EVENT WIRING ──────────────────────────────────────────────────
// Scope filters — expenses
document.querySelectorAll('.fin-filter-btn:not(.inc-filter)').forEach(btn => {
  btn.addEventListener('click', () => {
    expScope = btn.dataset.fscope;
    document.querySelectorAll('.fin-filter-btn:not(.inc-filter)').forEach(b=>b.classList.toggle('active',b===btn));
    renderExpenseList();
  });
});
// Scope filters — income
document.querySelectorAll('.fin-filter-btn.inc-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    incScope = btn.dataset.fscope;
    document.querySelectorAll('.fin-filter-btn.inc-filter').forEach(b=>b.classList.toggle('active',b===btn));
    renderIncomeList();
  });
});

// Add expense
let expEmoji = '💳';
buildEmojiPicker('fin-exp-emoji-picker','fin-exp-emoji-btn', e => { expEmoji = e; });
function addExpense() {
  const desc = document.getElementById('fin-exp-desc').value.trim();
  const amt = parseFloat(document.getElementById('fin-exp-amt').value);
  if (!desc || isNaN(amt) || amt <= 0) return;
  const cat = document.getElementById('fin-exp-cat').value;
  finState.expenses.push({id:finState.idCtr++,emoji:expEmoji,desc,amount:amt,category:cat,date:fmtDate(new Date())});
  document.getElementById('fin-exp-desc').value='';
  document.getElementById('fin-exp-amt').value='';
  saveFinance(); renderFinance();
}
on('fin-exp-add-btn','click',addExpense);
on('fin-exp-desc','keydown',e=>{ if(e.key==='Enter') addExpense(); });
on('fin-exp-amt','keydown',e=>{ if(e.key==='Enter') addExpense(); });
on('fin-exp-newpage-btn','click',()=>{ document.getElementById('fin-exp-desc').focus(); });

// Add income
let incEmoji = '💼';
buildEmojiPicker('fin-inc-emoji-picker','fin-inc-emoji-btn', e => { incEmoji = e; });
function addIncome() {
  const desc = document.getElementById('fin-inc-desc').value.trim();
  const amt = parseFloat(document.getElementById('fin-inc-amt').value);
  if (!desc || isNaN(amt) || amt <= 0) return;
  const cat = document.getElementById('fin-inc-cat').value;
  finState.incomes.push({id:finState.idCtr++,emoji:incEmoji,desc,amount:amt,category:cat,date:fmtDate(new Date())});
  document.getElementById('fin-inc-desc').value='';
  document.getElementById('fin-inc-amt').value='';
  saveFinance(); renderFinance();
}
on('fin-inc-add-btn','click',addIncome);
on('fin-inc-desc','keydown',e=>{ if(e.key==='Enter') addIncome(); });
on('fin-inc-amt','keydown',e=>{ if(e.key==='Enter') addIncome(); });

// Delete entry delegation
on('fin-expense-list','click',e=>{
  const btn = e.target.closest('[data-del-exp]');
  if(btn){ finState.expenses=finState.expenses.filter(x=>x.id!==+btn.dataset.delExp); saveFinance(); renderFinance(); }
});
on('fin-income-list','click',e=>{
  const btn = e.target.closest('[data-del-inc]');
  if(btn){ finState.incomes=finState.incomes.filter(x=>x.id!==+btn.dataset.delInc); saveFinance(); renderFinance(); }
});

// Budget modal
const budgetBackdrop = document.getElementById('fin-budget-backdrop');
const budgetModal = document.getElementById('fin-budget-modal');
function openBudgetModal() {
  document.getElementById('fin-budget-input').value = finState.monthlyBudget || '';
  budgetBackdrop.classList.remove('hidden');
  budgetModal.classList.remove('hidden');
  requestAnimationFrame(()=>document.getElementById('fin-budget-input').focus());
}
function closeBudgetModal() {
  budgetBackdrop.classList.add('hidden');
  budgetModal.classList.add('hidden');
}
on('fin-budget-set-btn','click', openBudgetModal);
on('fin-budget-modal-close','click', closeBudgetModal);
on('fin-budget-modal-cancel','click', closeBudgetModal);
if(budgetBackdrop) budgetBackdrop.addEventListener('click', closeBudgetModal);
on('fin-budget-modal-save','click',()=>{
  const val = parseFloat(document.getElementById('fin-budget-input').value);
  finState.monthlyBudget = isNaN(val) ? 0 : Math.max(0,val);
  saveFinance(); renderFinance(); closeBudgetModal();
});
on('fin-budget-input','keydown',e=>{ if(e.key==='Enter') document.getElementById('fin-budget-modal-save').click(); if(e.key==='Escape') closeBudgetModal(); });

// Savings
on('fin-sav-add-btn','click',()=>{
  const name = document.getElementById('fin-sav-name').value.trim();
  const target = parseFloat(document.getElementById('fin-sav-target').value);
  if(!name || isNaN(target) || target<=0) return;
  finState.savings.push({id:finState.savIdCtr++,name,target,current:0});
  document.getElementById('fin-sav-name').value='';
  document.getElementById('fin-sav-target').value='';
  saveFinance(); renderSavings();
});
on('fin-savings-list','click',e=>{
  const contrib = e.target.closest('[data-savcontrib]');
  if(contrib){
    const id = +contrib.dataset.savcontrib;
    const sav = finState.savings.find(s=>s.id===id);
    const inp = document.querySelector(`.fin-savings-contrib-input[data-savid="${id}"]`);
    if(sav&&inp){ const v=parseFloat(inp.value); if(!isNaN(v)&&v>0){ sav.current=(sav.current||0)+v; saveFinance(); renderSavings(); } }
    return;
  }
  const del = e.target.closest('[data-savdel]');
  if(del){ finState.savings=finState.savings.filter(s=>s.id!==+del.dataset.savdel); saveFinance(); renderSavings(); }
});

// Nav buttons update month title only (no tab re-render needed for finance)
on('prev-month','click',()=>{
  state.month--; if(state.month<0){state.month=11;state.year--;}
  document.getElementById('month-title').textContent=getMonthNames()[state.month];
  document.getElementById('year-label').textContent=state.year;
  saveNav();
});
on('next-month','click',()=>{
  state.month++; if(state.month>11){state.month=0;state.year++;}
  document.getElementById('month-title').textContent=getMonthNames()[state.month];
  document.getElementById('year-label').textContent=state.year;
  saveNav();
});

// ── INIT ─────────────────────────────────────────────────────────
loadFinance();
renderFinance();

} // end if(CURRENT_PAGE === 'finance')

// ── Add Finance tab to translations for non-finance pages ─────────
(function() {
  const tabKey = 'tabFinance';
  const labels = { en:'💰 Finance', hu:'💰 Pénzügy', de:'💰 Finanzen', es:'💰 Finanzas', fr:'💰 Finances' };
  Object.keys(TRANSLATIONS).forEach(lang => {
    if (!TRANSLATIONS[lang][tabKey]) TRANSLATIONS[lang][tabKey] = labels[lang]||labels.en;
  });
})();
// ─── ONBOARDING MODAL ────────────────────────────────────────────────────────
function showOnboardingModal() {
  const tr = TRANSLATIONS[state.lang] || TRANSLATIONS.en;

  const THEMES = [
    {id:'dark',   label:'🌑 Dark'},
    {id:'light',  label:'☀️ Light'},
    {id:'forest', label:'🌿 Forest'},
    {id:'sakura', label:'🌸 Sakura'},
    {id:'ocean',  label:'🌊 Ocean'},
    {id:'sunset', label:'🌅 Sunset'},
    {id:'midnight',label:'🌙 Midnight'},
    {id:'amoled', label:'🖤 AMOLED'},
    {id:'paper',  label:'🤍 Paper'},
    {id:'slate',  label:'🌫️ Slate'},
  ];
  const LANGS = [
    {id:'en', label:'🇬🇧 English'},
    {id:'hu', label:'🇭🇺 Magyar'},
    {id:'de', label:'🇩🇪 Deutsch'},
    {id:'es', label:'🇪🇸 Español'},
    {id:'fr', label:'🇫🇷 Français'},
  ];

  let obStep = 1; // 1 = lang, 2 = gender, 3 = theme
  let obLang = state.lang;
  let obGender = null;
  let obTheme = getThemeName();

  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.id = 'ob-backdrop';

  // Modal
  const modal = document.createElement('div');
  modal.id = 'ob-modal';

  document.body.appendChild(backdrop);
  document.body.appendChild(modal);

  function renderObModal() {
    const curTr = TRANSLATIONS[obLang] || TRANSLATIONS.en;
    const stepTitles = [
      curTr.onboardingStep1 || 'Choose your language',
      curTr.onboardingStep2 || 'Who are you?',
      curTr.onboardingStep3 || 'Pick a theme',
    ];

    let bodyHTML = '';

    if (obStep === 1) {
      bodyHTML = `
        <div class="ob-lang-grid">
          ${LANGS.map(l => `
            <button class="ob-lang-btn ${obLang===l.id?'active':''}" data-oblang="${l.id}">${l.label}</button>
          `).join('')}
        </div>`;
    } else if (obStep === 2) {
      bodyHTML = `
        <div class="ob-gender-row">
          <button class="ob-gender-btn ${obGender==='female'?'active':''}" data-obgender="female">
            <span class="ob-gender-icon">♀️</span>
            <span class="ob-gender-label">${curTr.genderFemale||'Female'}</span>
          </button>
          <button class="ob-gender-btn ${obGender==='male'?'active':''}" data-obgender="male">
            <span class="ob-gender-icon">♂️</span>
            <span class="ob-gender-label">${curTr.genderMale||'Male'}</span>
          </button>

        </div>
        <div class="ob-hint">${curTr.settingsGenderHint||'The Cycle Tracker tab is only shown for Female users.'}</div>`;
    } else if (obStep === 3) {
      bodyHTML = `
        <div class="ob-theme-grid">
          ${THEMES.map(th => `
            <button class="ob-theme-btn ${obTheme===th.id?'active':''}" data-obtheme="${th.id}">${th.label}</button>
          `).join('')}
        </div>`;
    }

    const isLast = obStep === 3;
    const canNext = obStep === 1 ? !!obLang : obStep === 2 ? !!obGender : !!obTheme;

    modal.innerHTML = `
      <div class="ob-header">
        <div class="ob-logo">🌟</div>
        <div class="ob-title">${curTr.onboardingTitle||'Welcome to Life Tracker 🎉'}</div>
        <div class="ob-subtitle">${curTr.onboardingSubtitle||"Let's set up your experience."}</div>
      </div>
      <div class="ob-steps">
        ${[1,2,3].map(s=>`<div class="ob-step-dot ${s===obStep?'active':s<obStep?'done':''}"></div>`).join('')}
      </div>
      <div class="ob-section-title">${stepTitles[obStep-1]}</div>
      <div class="ob-body">${bodyHTML}</div>
      <div class="ob-footer">
        ${obStep > 1 ? `<button class="ob-back-btn" id="ob-back">← Back</button>` : '<span></span>'}
        <button class="ob-next-btn ${canNext?'':'disabled'}" id="ob-next" ${canNext?'':'disabled'}>
          ${isLast ? (curTr.onboardingFinish||'Get Started →') : 'Next →'}
        </button>
      </div>`;

    // Bind buttons
    modal.querySelectorAll('[data-oblang]').forEach(btn => {
      btn.addEventListener('click', () => {
        obLang = btn.dataset.oblang;
        renderObModal();
      });
    });
    modal.querySelectorAll('[data-obgender]').forEach(btn => {
      btn.addEventListener('click', () => {
        obGender = btn.dataset.obgender;
        renderObModal();
      });
    });
    modal.querySelectorAll('[data-obtheme]').forEach(btn => {
      btn.addEventListener('click', () => {
        obTheme = btn.dataset.obtheme;
        // Live preview theme
        document.body.className = document.body.className.replace(/theme-\w+/,'');
        document.body.classList.add('theme-' + obTheme);
        renderObModal();
      });
    });
    const nextBtn = modal.querySelector('#ob-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!canNext) return;
        if (obStep < 3) {
          obStep++;
          renderObModal();
        } else {
          finishOnboarding();
        }
      });
    }
    const backBtn = modal.querySelector('#ob-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => { obStep--; renderObModal(); });
    }
  }

  function finishOnboarding() {
    // Save all choices
    state.lang = obLang;
    userPrefs.gender = obGender;
    userPrefs.setupDone = true;
    saveUserPrefs();
    try { localStorage.setItem(K.lang(), obLang); } catch(e) {}

    // Apply theme
    document.body.className = document.body.className.replace(/theme-\w+/g,'');
    document.body.classList.add('theme-' + obTheme);
    try { localStorage.setItem('ht_theme_v2', obTheme); } catch(e) {}

    // Remove modal
    backdrop.remove();
    modal.remove();

    // Apply translations + cycle visibility
    applyTranslations();
    applyCycleTabVisibility();

    // Launch the guided tour for first-time users
    setTimeout(() => window.startTour && window.startTour(true), 400);
  }

  renderObModal();
}

// ─── SETTINGS MODAL ───────────────────────────────────────────────────────────
// ─── BACKUP HELPERS (used by modal + settings page) ──────────────────────────
function buildBackup() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('ht_')) {
      data[key] = localStorage.getItem(key);
    }
  }
  return { version: '1.0', exportedAt: new Date().toISOString(), appName: 'LifeTracker', data };
}

function describeBackup(backup) {
  const d = backup.data || {};
  const lines = [];
  const dateStr = new Date(backup.exportedAt).toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' });
  lines.push(`📅 Exported: ${dateStr}`);
  try { const k = Object.keys(d).find(k=>k.startsWith('ht_habits_')); if(k){ const h=JSON.parse(d[k]); lines.push(`💪 Habits: ${h.length}`); } } catch(e){}
  try { const k = Object.keys(d).find(k=>k.startsWith('ht_tasks_')); if(k){ const t=JSON.parse(d[k]); lines.push(`✅ Tasks: ${(t.tasks||[]).length}`); } } catch(e){}
  try { const k = Object.keys(d).find(k=>k.startsWith('ht_finance_')); if(k){ const f=JSON.parse(d[k]); const n=Object.values(f.transactions||{}).reduce((s,a)=>s+(a||[]).length,0); lines.push(`💰 Finance entries: ${n}`); } } catch(e){}
  try { const k = Object.keys(d).find(k=>k.startsWith('ht_shop_')); if(k){ const s=JSON.parse(d[k]); lines.push(`🛒 Shopping items: ${(s.items||[]).length}`); } } catch(e){}
  try { const k = Object.keys(d).find(k=>k.startsWith('ht_timetable_')); if(k){ const tt=JSON.parse(d[k]); lines.push(`🗓 Timetable events: ${(tt.tt||[]).length}`); } } catch(e){}
  const hasCycle = Object.keys(d).some(k=>k.startsWith('ht_cycle_'));
  if (hasCycle) lines.push(`🌸 Cycle data: included`);
  lines.push(`🔑 Total keys: ${Object.keys(d).length}`);
  return lines.join('\n');
}

function openSettingsModal() {
  if (document.getElementById('settings-modal-backdrop')) return;

  // ── Full-page overlay — stays in DOM; only content re-renders on lang change ──
  const backdrop = document.createElement('div');
  backdrop.id = 'settings-modal-backdrop';
  backdrop.style.cssText = 'position:fixed;inset:0;z-index:8900;background:var(--bg);overflow-y:auto;animation:fadeSlideUp .35s cubic-bezier(.4,0,.2,1);';
  backdrop.innerHTML = `
    <div class="bg-orb bg-orb-1" style="pointer-events:none;"></div>
    <div class="bg-orb bg-orb-2" style="pointer-events:none;"></div>
    <div class="bg-orb bg-orb-3" style="pointer-events:none;"></div>`;

  const modal = document.createElement('div');
  modal.id = 'settings-modal';
  modal.style.cssText = 'position:relative;z-index:1;max-width:860px;margin:0 auto;padding:clamp(16px,2.5vw,32px) clamp(16px,4vw,48px) 60px;display:flex;flex-direction:column;gap:20px;';

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  function closeModal() { backdrop.remove(); }

  // Escape key handler (attached once, removed on close)
  function escHandler(e) { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escHandler); } }
  document.addEventListener('keydown', escHandler);

  // ── Section → localStorage key mapping ──
  const SECTION_KEY_MAP = {
    habits:    { exact: ['ht_habits_v4','ht_goals_ext_v1','ht_todos_v1'], prefix: ['ht_habits_'] },
    timetable: { exact: ['ht_timetable_v4'], prefix: ['ht_timetable_'] },
    tasks:     { exact: ['ht_tasks_v3'], prefix: ['ht_tasks_'] },
    shopping:  { exact: ['ht_shopping_v3'], prefix: ['ht_shop_'] },
    cycle:     { exact: ['ht_cycle_v2'], prefix: ['ht_cycle_'] },
    finance:   { exact: ['ht_finance_v1'], prefix: ['ht_finance_'] },
    journal:   { exact: ['ht_journal_v1'], prefix: [] },
    settings:  { exact: ['ht_lang_v1','ht_theme_v2','ht_nav_v1','ht_tour_v1','ht_user_prefs_v1'], prefix: [] },
  };

  function openDeletePopup(preCheckAll) {
    document.getElementById('del-popup-bd')?.remove();
    document.getElementById('del-popup-modal')?.remove();
    const SECTIONS = [
      { key:'habits',    label:'📊 Habit Tracker' },
      { key:'timetable', label:'🗓 Timetable' },
      { key:'tasks',     label:'✅ Tasks' },
      { key:'shopping',  label:'🛒 Shopping' },
      { key:'cycle',     label:'🌸 Cycle' },
      { key:'finance',   label:'💰 Finance' },
      { key:'journal',   label:'📓 Journal' },
      { key:'settings',  label:'⚙️ Settings &amp; Prefs' },
    ];
    const bd = document.createElement('div');
    bd.id = 'del-popup-bd';
    bd.style.cssText = 'position:fixed;inset:0;z-index:9200;background:rgba(0,0,0,.65);backdrop-filter:blur(5px);animation:fadeIn .2s ease;';
    const rows = SECTIONS.map(s => `
      <label class="del-sec-row" data-key="${s.key}" style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface2);cursor:pointer;transition:border-color .15s,background .15s;font-size:13px;font-weight:600;color:var(--text);user-select:none;">
        <input type="checkbox" data-section="${s.key}" ${preCheckAll?'checked':''}
          style="width:16px;height:16px;accent-color:#e05a9a;cursor:pointer;flex-shrink:0;"/>
        ${s.label}
      </label>`).join('');
    const pm = document.createElement('div');
    pm.id = 'del-popup-modal';
    pm.style.cssText = 'position:fixed;z-index:9201;top:50%;left:50%;transform:translate(-50%,-50%);width:min(480px,92vw);background:var(--surface);border:1.5px solid var(--border);border-radius:20px;padding:28px;box-shadow:0 24px 80px rgba(0,0,0,.55);animation:centeredModalPop .28s cubic-bezier(.4,0,.2,1);';
    pm.innerHTML = `
      <div style="text-align:center;font-size:30px;margin-bottom:8px;">🗑️</div>
      <div style="text-align:center;font-size:17px;font-weight:800;color:var(--text);margin-bottom:6px;">Select Data to Delete</div>
      <div style="text-align:center;font-size:12px;color:var(--text-muted);margin-bottom:18px;line-height:1.6;">Tick the sections you want to erase.<br>Anything left unticked stays safe.</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">${rows}</div>
      <div style="display:flex;gap:8px;justify-content:center;margin-bottom:20px;">
        <button id="del-sel-all" style="padding:5px 14px;border-radius:7px;border:1.5px solid var(--border);background:var(--surface2);color:var(--text-muted);font-family:inherit;font-size:11px;font-weight:700;cursor:pointer;">☑ Select All</button>
        <button id="del-sel-none" style="padding:5px 14px;border-radius:7px;border:1.5px solid var(--border);background:var(--surface2);color:var(--text-muted);font-family:inherit;font-size:11px;font-weight:700;cursor:pointer;">☐ Select None</button>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button id="del-cancel" style="padding:10px 22px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface2);color:var(--text-muted);font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;">Cancel</button>
        <button id="del-confirm" style="padding:10px 22px;border-radius:10px;border:none;background:linear-gradient(135deg,#e05a9a,#c84080);color:#fff;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 3px 12px rgba(224,90,154,.4);">🗑 Delete Selected</button>
      </div>`;
    document.body.appendChild(bd);
    document.body.appendChild(pm);
    pm.querySelectorAll('.del-sec-row').forEach(row => {
      const cb = row.querySelector('input');
      function sync() { row.style.borderColor = cb.checked ? '#e05a9a' : ''; row.style.background = cb.checked ? 'rgba(224,90,154,.1)' : ''; }
      cb.addEventListener('change', sync); sync();
    });
    function closePop() { bd.remove(); pm.remove(); }
    bd.addEventListener('click', closePop);
    pm.querySelector('#del-cancel').addEventListener('click', closePop);
    pm.querySelector('#del-sel-all').addEventListener('click', () => { pm.querySelectorAll('input[data-section]').forEach(cb => { cb.checked = true; cb.dispatchEvent(new Event('change')); }); });
    pm.querySelector('#del-sel-none').addEventListener('click', () => { pm.querySelectorAll('input[data-section]').forEach(cb => { cb.checked = false; cb.dispatchEvent(new Event('change')); }); });
    pm.querySelector('#del-confirm').addEventListener('click', () => {
      const checked = Array.from(pm.querySelectorAll('input[data-section]:checked')).map(cb => cb.dataset.section);
      if (checked.length === 0) { closePop(); return; }
      const exactSet = new Set(); const prefixList = [];
      checked.forEach(sec => { const map = SECTION_KEY_MAP[sec]; if (!map) return; map.exact.forEach(k => exactSet.add(k)); map.prefix.forEach(p => prefixList.push(p)); });
      const toDelete = [];
      for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && (exactSet.has(k) || prefixList.some(p => k.startsWith(p)))) toDelete.push(k); }
      toDelete.forEach(k => localStorage.removeItem(k));
      if (checked.includes('settings')) userPrefs = { gender: null, setupDone: false };
      closePop(); closeModal(); window.location.href = 'tracker.html';
    });
  }

  // ── render(): builds modal HTML + wires all listeners; safe to call again ──
  function renderSettingsContent() {
    const tr = TRANSLATIONS[state.lang] || TRANSLATIONS.en;
    const scrollY = backdrop.scrollTop;

    modal.innerHTML = `
      <!-- PAGE HEADER -->
      <div style="display:flex;align-items:center;gap:14px;padding:clamp(10px,1.5vw,18px) 0 4px;">
        <button id="settings-modal-close" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface2);color:var(--text-muted);font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;">
          ← Back
        </button>
        <div>
          <div style="font-size:clamp(18px,2.2vw,26px);font-weight:900;color:var(--text);letter-spacing:-.5px;">${tr.settingsTitle||'⚙️ Settings'}</div>
          <div style="font-size:12px;color:var(--text-muted);font-weight:500;margin-top:1px;">Manage your preferences and data</div>
        </div>
      </div>

      <!-- PROFILE -->
      <div class="settings-card">
        <div class="settings-card-title">${tr.settingsProfile||'👤 Profile'}</div>
        <div class="settings-row">
          <div class="settings-row-label">${tr.settingsGenderLabel||'Gender'}</div>
          <div class="settings-gender-btns" id="settings-modal-gender-btns">
            <button class="settings-gender-btn" data-gender="female">♀️ <span>${tr.genderFemale||'Female'}</span></button>
            <button class="settings-gender-btn" data-gender="male">♂️ <span>${tr.genderMale||'Male'}</span></button>
          </div>
        </div>
        <div class="settings-hint">${tr.settingsGenderHint||'The Cycle Tracker tab is only shown for Female users.'}</div>
      </div>

      <!-- LANGUAGE -->
      <div class="settings-card">
        <div class="settings-card-title">${tr.settingsLanguageTitle||'🌐 Language'}</div>
        <div class="settings-lang-grid">
          <button class="settings-lang-btn" data-lang="en">🇬🇧 English</button>
          <button class="settings-lang-btn" data-lang="hu">🇭🇺 Magyar</button>
          <button class="settings-lang-btn" data-lang="de">🇩🇪 Deutsch</button>
          <button class="settings-lang-btn" data-lang="es">🇪🇸 Español</button>
          <button class="settings-lang-btn" data-lang="fr">🇫🇷 Français</button>
        </div>
      </div>

      <!-- THEME -->
      <div class="settings-card">
        <div class="settings-card-title">${tr.settingsThemeTitle||'🎨 Theme'}</div>
        <div class="settings-theme-grid">
          <button class="settings-theme-btn" data-theme="dark">🌑 Dark</button>
          <button class="settings-theme-btn" data-theme="light">☀️ Light</button>
          <button class="settings-theme-btn" data-theme="forest">🌿 Forest</button>
          <button class="settings-theme-btn" data-theme="sakura">🌸 Sakura</button>
          <button class="settings-theme-btn" data-theme="ocean">🌊 Ocean</button>
          <button class="settings-theme-btn" data-theme="sunset">🌅 Sunset</button>
          <button class="settings-theme-btn" data-theme="midnight">🌙 Midnight</button>
          <button class="settings-theme-btn" data-theme="amoled">🖤 AMOLED</button>
          <button class="settings-theme-btn" data-theme="paper">🤍 Paper</button>
          <button class="settings-theme-btn" data-theme="slate">🌫️ Slate</button>
        </div>
      </div>

      <!-- EXPORT / IMPORT -->
      <div class="settings-card">
        <div class="settings-card-title">🔄 ${tr.settingsSyncTitle||'Export &amp; Import Data'}</div>
        <div class="settings-hint" style="margin-bottom:14px;">${tr.settingsSyncHint||'Export a backup of all your data as a JSON file, then import it on any other device.'}</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button id="settings-modal-export-btn" style="display:inline-flex;align-items:center;gap:7px;padding:10px 20px;border-radius:10px;border:none;background:linear-gradient(135deg,#3ecfb2,#2ba88e);color:#fff;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 3px 12px rgba(62,207,178,.28);transition:opacity .15s;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            ${tr.settingsExportBtn||'Export Backup'}
          </button>
          <label style="display:inline-flex;align-items:center;gap:7px;padding:10px 20px;border-radius:10px;border:none;background:linear-gradient(135deg,#4f6ef7,#3a5ce0);color:#fff;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 3px 12px rgba(79,110,247,.28);transition:opacity .15s;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 5 17 10"/><line x1="12" y1="5" x2="12" y2="17"/></svg>
            ${tr.settingsImportBtn||'Import Backup'}
            <input type="file" id="settings-modal-import-input" accept=".json" style="display:none;"/>
          </label>
        </div>
        <div id="settings-modal-sync-status" style="display:none;margin-top:12px;font-size:12px;font-weight:600;color:#3ecfb2;"></div>
      </div>

      <!-- DANGER ZONE -->
      <div class="settings-card settings-danger-card">
        <div class="settings-card-title settings-danger-title">${tr.settingsDangerZone||'⚠️ Danger Zone'}</div>
        <div class="settings-hint" style="margin-bottom:16px;">${tr.settingsClearAllHint||'Permanently erase data. This cannot be undone.'}</div>
        <!-- Delete by Section -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:14px 16px;border-radius:12px;border:1.5px solid rgba(200,150,40,.25);background:rgba(200,150,40,.05);margin-bottom:12px;">
          <div>
            <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:4px;">☑ Delete by Section</div>
            <div class="settings-hint" style="margin:0;">Choose exactly which pages to wipe. Everything else stays safe.</div>
          </div>
          <button class="settings-danger-btn" id="settings-modal-clear-section-btn" style="background:rgba(180,130,30,.1);color:#b89030;border-color:rgba(180,130,30,.4);flex-shrink:0;">☑ Choose &amp; Delete</button>
        </div>
        <!-- Delete All -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:14px 16px;border-radius:12px;border:1.5px solid rgba(180,40,40,.35);background:rgba(160,30,30,.07);">
          <div>
            <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:4px;">🗑 Delete All Data</div>
            <div class="settings-hint" style="margin:0;">Wipe everything — habits, tasks, finance, cycle, timetable, settings.</div>
          </div>
          <button class="settings-danger-btn" id="settings-modal-clear-btn" style="background:linear-gradient(135deg,#8b1a1a,#6b1212);color:#ffb3b3;border-color:rgba(180,40,40,.6);flex-shrink:0;">${tr.settingsClearAllBtn||'🗑 Delete All'}</button>
        </div>
      </div>

      <!-- GUIDED TOUR -->
      <div class="settings-card">
        <div class="settings-card-title">🗺️ Guided Tour</div>
        <div class="settings-hint" style="margin-bottom:14px;">New here or want a refresher? The tour walks you through every feature step by step.</div>
        <button id="settings-modal-tour-btn" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:10px;border:none;background:linear-gradient(135deg,#f5a623,#e08a10);color:#fff;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 3px 12px rgba(245,166,35,.35);transition:opacity .15s;">
          🗺️ Take the Tour
        </button>
      </div>

      <!-- ABOUT -->
      <div class="settings-card">
        <div class="settings-card-title">ℹ️ About</div>
        <div class="settings-hint" style="font-size:13px;line-height:1.9;"><strong>Life Tracker</strong> — Beta<br>All data is stored locally in your browser. No account needed. Works offline.</div>
      </div>`;

    // Restore scroll position after re-render
    backdrop.scrollTop = scrollY;

    // Highlight active buttons
    modal.querySelectorAll('.settings-gender-btn').forEach(b => b.classList.toggle('active', b.dataset.gender === userPrefs.gender));
    modal.querySelectorAll('.settings-lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === state.lang));
    const curTheme = getThemeName();
    modal.querySelectorAll('.settings-theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === curTheme));

    // ── Wire listeners ──
    modal.querySelector('#settings-modal-close').addEventListener('click', closeModal);

    modal.querySelector('#settings-modal-gender-btns').addEventListener('click', e => {
      const btn = e.target.closest('[data-gender]');
      if (!btn) return;
      userPrefs.gender = btn.dataset.gender;
      saveUserPrefs();
      modal.querySelectorAll('.settings-gender-btn').forEach(b => b.classList.toggle('active', b.dataset.gender === userPrefs.gender));
      applyCycleTabVisibility();
    });

    modal.querySelector('.settings-lang-grid').addEventListener('click', e => {
      const btn = e.target.closest('[data-lang]');
      if (!btn) return;
      state.lang = btn.dataset.lang;
      try { localStorage.setItem(K.lang(), state.lang); } catch(e2) {}
      applyTranslations();
      // Re-render whichever page is currently open so it updates immediately
      switch (CURRENT_PAGE) {
        case 'tracker':  case 'habits': render(false); break;
        case 'timetable': renderTimetable(); break;
        case 'tasks':    renderTasksView(); break;
        case 'shopping': renderShoppingList(); break;
        case 'cycle':    renderCycleTracker(); break;
        case 'finance':  renderFinance(); break;
        case 'analysis': render(false); break;
      }
      renderSettingsContent(); // re-render settings panel in new language
    });

    modal.querySelector('.settings-theme-grid').addEventListener('click', e => {
      const btn = e.target.closest('[data-theme]');
      if (!btn) return;
      const theme = btn.dataset.theme;
      document.body.className = document.body.className.replace(/theme-\w+/g,'');
      document.body.classList.add('theme-' + theme);
      try { localStorage.setItem('ht_theme_v2', theme); } catch(e2) {}
      modal.querySelectorAll('.settings-theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
    });

    modal.querySelector('#settings-modal-clear-section-btn').addEventListener('click', () => openDeletePopup(false));
    modal.querySelector('#settings-modal-clear-btn').addEventListener('click', () => openDeletePopup(true));

    modal.querySelector('#settings-modal-tour-btn').addEventListener('click', () => {
      closeModal();
      setTimeout(() => window.startTour && window.startTour(true), 200);
    });

    // Export
    modal.querySelector('#settings-modal-export-btn').addEventListener('click', () => {
      const backup = buildBackup();
      const syncStatus = modal.querySelector('#settings-modal-sync-status');
      if (Object.keys(backup.data).length === 0) {
        syncStatus.textContent = '⚠️ No data found to export.';
        syncStatus.style.display = 'block';
        setTimeout(() => { syncStatus.style.display = 'none'; }, 3000);
        return;
      }
      const json = JSON.stringify(backup, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const dateTag = new Date().toISOString().slice(0, 10);
      const a = document.createElement('a');
      a.href = url; a.download = `life-tracker-backup-${dateTag}.json`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
      syncStatus.style.color = '#3ecfb2';
      syncStatus.textContent = `✓ Exported (${Object.keys(backup.data).length} keys, ${(json.length/1024).toFixed(1)} KB)`;
      syncStatus.style.display = 'block';
      setTimeout(() => { syncStatus.style.display = 'none'; }, 4000);
    });

    // Import
    modal.querySelector('#settings-modal-import-input').addEventListener('change', function() {
      const file = this.files[0];
      if (!file) return;
      this.value = '';
      const reader = new FileReader();
      reader.onload = (ev) => {
        let backup;
        try {
          backup = JSON.parse(ev.target.result);
          if (!backup.data || backup.appName !== 'LifeTracker') throw new Error('invalid');
        } catch(e) {
          alert('⚠️ Invalid file. Please select a Life Tracker JSON backup.');
          return;
        }
        const preview = describeBackup(backup);
        if (confirm(`Import this backup?\n\n${preview}\n\nThis will overwrite all current data. Cannot be undone.`)) {
          const existing = [];
          for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith('ht_')) existing.push(k); }
          existing.forEach(k => localStorage.removeItem(k));
          Object.entries(backup.data).forEach(([key, val]) => { try { localStorage.setItem(key, val); } catch(e) {} });
          closeModal();
          window.location.href = 'tracker.html';
        }
      };
      reader.readAsText(file);
    });
  }

  renderSettingsContent(); // initial render
}

// ─── SETTINGS PAGE ────────────────────────────────────────────────────────────
function initSettingsPage() {
  if (CURRENT_PAGE !== 'settings') return;

  // Highlight active gender btn
  function refreshGenderBtns() {
    document.querySelectorAll('.settings-gender-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.gender === userPrefs.gender);
    });
  }
  // Highlight active lang btn
  function refreshLangBtns() {
    document.querySelectorAll('.settings-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === state.lang);
    });
  }
  // Highlight active theme btn
  function refreshThemeBtns() {
    const cur = getThemeName();
    document.querySelectorAll('.settings-theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === cur);
    });
  }

  refreshGenderBtns();
  refreshLangBtns();
  refreshThemeBtns();

  // Gender
  document.getElementById('settings-gender-btns').addEventListener('click', e => {
    const btn = e.target.closest('[data-gender]');
    if (!btn) return;
    userPrefs.gender = btn.dataset.gender;
    saveUserPrefs();
    refreshGenderBtns();
    applyCycleTabVisibility();
  });

  // Language
  document.getElementById('settings-lang-grid').addEventListener('click', e => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    state.lang = btn.dataset.lang;
    try { localStorage.setItem(K.lang(), state.lang); } catch(e2) {}
    refreshLangBtns();
    applyTranslations();
    if(CURRENT_PAGE==='finance')renderFinance();
  });

  // Theme
  document.getElementById('settings-theme-grid').addEventListener('click', e => {
    const btn = e.target.closest('[data-theme]');
    if (!btn) return;
    const theme = btn.dataset.theme;
    document.body.className = document.body.className.replace(/theme-\w+/g,'');
    document.body.classList.add('theme-' + theme);
    try { localStorage.setItem('ht_theme_v2', theme); } catch(e2) {}
    refreshThemeBtns();
  });

  // Clear all data modal
  const clearBackdrop = document.getElementById('settings-clear-backdrop');
  const clearModal = document.getElementById('settings-clear-modal');

  on('settings-clear-all-btn','click',() => {
    clearBackdrop.classList.remove('hidden');
    clearModal.classList.remove('hidden');
  });
  on('settings-clear-cancel','click',() => {
    clearBackdrop.classList.add('hidden');
    clearModal.classList.add('hidden');
  });
  if (clearBackdrop) clearBackdrop.addEventListener('click',() => {
    clearBackdrop.classList.add('hidden');
    clearModal.classList.add('hidden');
  });
  on('settings-clear-confirm','click',() => {
    // Delete all ht_* keys from localStorage
    const keysToDelete = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('ht_')) keysToDelete.push(key);
    }
    keysToDelete.forEach(k => localStorage.removeItem(k));
    // Reset prefs
    userPrefs = { gender: null, setupDone: false };
    window.location.href = 'tracker.html';
  });

  // ─── EXPORT / IMPORT (settings.html standalone page) ─────────────────────

  // Export handler
  on('settings-export-btn', 'click', () => {
    const backup = buildBackup();
    const status = document.getElementById('settings-export-status');
    if (Object.keys(backup.data).length === 0) {
      if (status) { status.textContent = '⚠️ No data found to export.'; status.style.display = 'block'; setTimeout(()=>{ status.style.display='none'; }, 3000); }
      return;
    }
    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateTag = new Date().toISOString().slice(0, 10);
    const a = document.createElement('a');
    a.href = url; a.download = `life-tracker-backup-${dateTag}.json`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    if (status) { status.textContent = `✓ Exported (${Object.keys(backup.data).length} keys, ${(json.length/1024).toFixed(1)} KB)`; status.style.display = 'block'; setTimeout(()=>{ status.style.display='none'; }, 4000); }
  });

  // Import handler
  const importInput = document.getElementById('settings-import-input');
  if (importInput) {
    importInput.addEventListener('change', function() {
      const file = this.files[0];
      if (!file) return;
      this.value = '';
      const reader = new FileReader();
      reader.onload = (ev) => {
        let backup;
        try {
          backup = JSON.parse(ev.target.result);
          if (!backup.data || backup.appName !== 'LifeTracker') throw new Error('invalid');
        } catch(e) {
          alert('⚠️ Invalid file. Please select a Life Tracker JSON backup.');
          return;
        }
        if (confirm(`Import this backup?\n\n${describeBackup(backup)}\n\nThis will overwrite all current data. Cannot be undone.`)) {
          const existing = [];
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('ht_')) existing.push(k);
          }
          existing.forEach(k => localStorage.removeItem(k));
          Object.entries(backup.data).forEach(([key, val]) => {
            try { localStorage.setItem(key, val); } catch(e) {}
          });
          window.location.href = 'tracker.html';
        }
      };
      reader.readAsText(file);
    });
  }

  // Tour button on standalone settings page
  on('settings-page-tour-btn', 'click', () => {
    window.startTour && window.startTour(true);
  });

  // ─── DAILY MACRO GOALS ─────────────────────────────────────────────────
  if (typeof calLoadGoals === 'function') calLoadGoals();
  ['kcal','protein','carbs','fat','water'].forEach(k => {
    const el = document.getElementById(`settings-goal-inp-${k}`);
    if (el && typeof calGoals !== 'undefined' && calGoals[k] != null) el.value = calGoals[k];
  });
  on('settings-goals-save-btn','click', () => {
    if (typeof calGoals === 'undefined') return;
    calGoals.kcal    = +(document.getElementById('settings-goal-inp-kcal')?.value)||2000;
    calGoals.protein = +(document.getElementById('settings-goal-inp-protein')?.value)||150;
    calGoals.carbs   = +(document.getElementById('settings-goal-inp-carbs')?.value)||250;
    calGoals.fat     = +(document.getElementById('settings-goal-inp-fat')?.value)||65;
    calGoals.water   = +(document.getElementById('settings-goal-inp-water')?.value)||8;
    if (typeof calSaveGoals === 'function') calSaveGoals();
    const btn = document.getElementById('settings-goals-save-btn');
    if (btn) {
      const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
      btn.textContent = '✓ Saved!';
      setTimeout(()=>{ btn.textContent = tr.settingsGoalsSaveBtn||'💾 Save Goals'; }, 1500);
    }
  });

  // ─── DEFAULT WORKOUT HABIT LINK ────────────────────────────────────────
  const defHabitSel = document.getElementById('settings-default-habit-select');
  if (defHabitSel) {
    const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
    defHabitSel.innerHTML = `<option value="">${tr.settingsDefaultHabitNone||'— none —'}</option>`;
    (state.habits||[]).forEach((h,i) => {
      const opt = document.createElement('option');
      opt.value = i; opt.textContent = h;
      defHabitSel.appendChild(opt);
    });
    if (userPrefs.defaultWorkoutHabit !== undefined && userPrefs.defaultWorkoutHabit !== null) {
      defHabitSel.value = userPrefs.defaultWorkoutHabit;
    }
    defHabitSel.addEventListener('change', () => {
      userPrefs.defaultWorkoutHabit = defHabitSel.value;
      saveUserPrefs();
    });
  }
}


// ─── LOCAL ASSISTANT ──────────────────────────────────────────────────────────
(function() {

const ASST_PAGES = ['tracker','habits','timetable','tasks','shopping','cycle','finance','analysis','settings'];

// ── Predefined Q&A content (Magyar + English) ────────────────────────────────
function getAsstContent() {
  const lang = (typeof state !== 'undefined' && state.lang) || 'en';
  const isHU = lang === 'hu';

  return {
    greeting: isHU
      ? '👋 Szia! Én vagyok a Life Tracker Segéded. Miben segíthetek ma?'
      : '👋 Hi! I\'m your Life Tracker Assistant. What can I help you with today?',
    backLabel: isHU ? '← Vissza' : '← Back',
    categories: [
      {
        id: 'tour',
        icon: '🗺️',
        label: isHU ? 'Ismerkedés a funkciókal' : 'Take a Tour',
        items: [
          { id: 'tour-start', icon: '🗺️', label: isHU ? '🗺️ Indíts interaktív túrát' : '🗺️ Start interactive tour', action: 'tour' },
        ]
      },
      {
        id: 'setup',
        icon: '⚙️',
        label: isHU ? 'Beállítás & Konfiguráció' : 'Setup & Configuration',
        items: [
          { id: 'setup-habit',     icon: '💪', label: isHU ? 'Szokás hozzáadása'             : 'Add a habit',              wizard: 'habit' },
          { id: 'setup-task',      icon: '✅', label: isHU ? 'Feladat hozzáadása'             : 'Add a task',               wizard: 'task' },
          { id: 'setup-event',     icon: '🗓', label: isHU ? 'Órarend esemény hozzáadása'     : 'Add a timetable event',    wizard: 'event' },
          { id: 'setup-shopping',  icon: '🛒', label: isHU ? 'Bevásárló elem hozzáadása'      : 'Add a shopping item',      wizard: 'shopping' },
          { id: 'setup-finance',   icon: '💰', label: isHU ? 'Pénzügy beállítása'             : 'Set up finance',           wizard: 'finance' },
          { id: 'setup-cycle',     icon: '🌸', label: isHU ? 'Ciklus beállítása'              : 'Set up my cycle',          wizard: 'cycle' },
          { id: 'setup-theme',     icon: '🎨', label: isHU ? 'Téma megváltoztatása'           : 'Change theme',             wizard: 'theme' },
          { id: 'setup-language',  icon: '🌐', label: isHU ? 'Nyelv megváltoztatása'          : 'Change language',          wizard: 'language' },
        ]
      },
      {
        id: 'howto',
        icon: '❓',
        label: isHU ? 'Hogyan működik?' : 'How does it work?',
        items: [
          { id: 'how-tracker',    icon: '📊', label: isHU ? 'Szokáskövetés'        : 'Habit Tracker' },
          { id: 'how-analysis',   icon: '📈', label: isHU ? 'Elemzés & Statisztika': 'Analysis & Stats' },
          { id: 'how-tasks',      icon: '✅', label: isHU ? 'Feladatok'             : 'Tasks' },
          { id: 'how-timetable',  icon: '🗓', label: isHU ? 'Órarend'              : 'Timetable' },
          { id: 'how-shopping',   icon: '🛒', label: isHU ? 'Bevásárlólista'       : 'Shopping List' },
          { id: 'how-finance',    icon: '💰', label: isHU ? 'Pénzügy'              : 'Finance' },
          { id: 'how-cycle',      icon: '🌸', label: isHU ? 'Cikluskövető'         : 'Cycle Tracker' },
          { id: 'how-pomodoro',   icon: '⏱', label: isHU ? 'Pomodoro'             : 'Pomodoro Timer' },
          { id: 'how-export',     icon: '🔄', label: isHU ? 'Adatmentés / szinkron': 'Backup & Sync' },
          { id: 'how-themes',     icon: '🎨', label: isHU ? 'Témák & Megjelenés'   : 'Themes & Appearance' },
          { id: 'how-language',   icon: '🌐', label: isHU ? 'Nyelvi beállítások'   : 'Language Settings' },
        ]
      },
      {
        id: 'tips',
        icon: '💡',
        label: isHU ? 'Tippek & Trükkök' : 'Tips & Tricks',
        items: [
          { id: 'tip-habits',    icon: '💪', label: isHU ? 'Jobb szokások kialakítása'   : 'Building better habits' },
          { id: 'tip-pomodoro',  icon: '⏱', label: isHU ? 'Hatékony Pomodoro használat' : 'Effective Pomodoro use' },
          { id: 'tip-finance',   icon: '💰', label: isHU ? 'Pénzügyi tippek'             : 'Finance tips' },
          { id: 'tip-tasks',     icon: '✅', label: isHU ? 'Produktív feladatkezelés'    : 'Productive task management' },
          { id: 'tip-cycle',     icon: '🌸', label: isHU ? 'Cikluskövető tippek'        : 'Cycle tracker tips' },
          { id: 'tip-data',      icon: '🔒', label: isHU ? 'Adatok & Adatvédelem'       : 'Your data & privacy' },
        ]
      },
      {
        id: 'troubleshoot',
        icon: '🔧',
        label: isHU ? 'Hibaelhárítás' : 'Troubleshooting',
        items: [
          { id: 'fix-saving',    icon: '💾', label: isHU ? 'Nem ment az adat'           : 'Data not saving' },
          { id: 'fix-import',    icon: '📥', label: isHU ? 'Import nem sikerül'          : 'Import not working' },
          { id: 'fix-theme',     icon: '🎨', label: isHU ? 'A téma visszaáll'           : 'Theme keeps resetting' },
          { id: 'fix-cal',       icon: '🗓', label: isHU ? 'Naptár import probléma'     : 'Calendar import issue' },
          { id: 'fix-cycle',     icon: '🌸', label: isHU ? 'Ciklus adatok hibásak'      : 'Cycle data looks wrong' },
          { id: 'fix-clear',     icon: '🗑', label: isHU ? 'Adatok törlése / nulláról'  : 'Reset / clear all data' },
          { id: 'fix-mobile',    icon: '📱', label: isHU ? 'Mobilon nem jól néz ki'     : 'Looks off on mobile' },
        ]
      },
      {
        id: 'navigate',
        icon: '🧭',
        label: isHU ? 'Ugrás oldalra' : 'Go to page',
        items: [
          { id: 'nav-tracker',   icon: '📊', label: isHU ? 'Szokáskövetés'    : 'Habit Tracker',   href: 'tracker.html' },
          { id: 'nav-timetable', icon: '🗓', label: isHU ? 'Órarend'          : 'Timetable',        href: 'timetable.html' },
          { id: 'nav-tasks',     icon: '✅', label: isHU ? 'Feladatok'         : 'Tasks',            href: 'tasks.html' },
          { id: 'nav-shopping',  icon: '🛒', label: isHU ? 'Bevásárlólista'   : 'Shopping List',    href: 'shopping.html' },
          { id: 'nav-finance',   icon: '💰', label: isHU ? 'Pénzügy'          : 'Finance',          href: 'finance.html' },
          { id: 'nav-cycle',     icon: '🌸', label: isHU ? 'Cikluskövető'     : 'Cycle Tracker',    href: 'cycle.html' },
          { id: 'nav-analysis',  icon: '📈', label: isHU ? 'Elemzés'          : 'Analysis',         href: 'tracker.html', action: 'analysis' },
          { id: 'nav-settings',  icon: '⚙️', label: isHU ? 'Beállítások'      : 'Settings',         href: null, action: 'settings' },
        ]
      }
    ],
    answers: {
      // ── HOW-TO answers ─────────────────────────────────────────────────────
      'how-tracker': isHU
        ? `📊 <b>Szokáskövetés</b><br><br>A szokáskövetőben napi/heti/havi nézetben láthatod a szokásaidat.<br><br>• <b>Szokás hozzáadása:</b> gépeld be a szokás nevét a beviteli mezőbe, majd kattints a <b>+ Hozzáad</b> gombra.<br>• <b>Bejelölés:</b> kattints a nap mezőjére, hogy megjelöld teljesítettként.<br>• <b>Nézetek:</b> válts a ☀️ Napi / 📅 Heti / 🗓 Havi nézetek között a felső gombsorral.<br>• <b>Szokás törlése:</b> kattints a szokás nevére, majd a megjelenő 🗑 ikonra.<br>• <b>Elemzés:</b> váltj az <b>📈 Elemzés</b> alfülre a részletes statisztikákért.`
        : `📊 <b>Habit Tracker</b><br><br>Track your daily habits in daily, weekly, or monthly view.<br><br>• <b>Add a habit:</b> type its name in the input field and click <b>+ Add</b>.<br>• <b>Check off:</b> click a day cell to mark it as done.<br>• <b>Views:</b> switch between ☀️ Daily / 📅 Weekly / 🗓 Monthly using the scope bar.<br>• <b>Delete a habit:</b> click the habit name, then the 🗑 icon that appears.<br>• <b>Analysis:</b> switch to the <b>📈 Analysis</b> subtab for detailed statistics.`,

      'how-analysis': isHU
        ? `📈 <b>Elemzés & Statisztika</b><br><br>Az elemzés fül részletes képet ad a szokásaidról és a haladásodról.<br><br>• <b>Napi konzisztencia:</b> sávdiagram, ami megmutatja hány szokást teljesítettél naponta.<br>• <b>Mindset Tracker:</b> kövesd az energiádat, fókuszodat és motivációdat vonaldiagramon.<br>• <b>Szokás lebontás:</b> minden szokásnál látod a havi teljesítési arányt.<br>• <b>Heti pontszám:</b> sugárdiagramok az egyes hetek százalékos eredményével.<br>• <b>Célok:</b> adj hozzá havi célokat és jelöld őket teljesítettként.<br>• <b>Összesítő:</b> az egész havi haladásod egy gyűrűdiagramon.`
        : `📈 <b>Analysis & Stats</b><br><br>The Analysis tab gives a detailed view of your habits and progress.<br><br>• <b>Daily Consistency:</b> bar chart showing how many habits you completed each day.<br>• <b>Mindset Tracker:</b> line chart for your energy, focus and motivation scores.<br>• <b>Habit Breakdown:</b> see the monthly completion rate for each individual habit.<br>• <b>Weekly Score:</b> radial charts showing each week's percentage score.<br>• <b>Goals:</b> add monthly goals and mark them as achieved.<br>• <b>Overall Progress:</b> your full month's completion in a ring chart.`,

      'how-tasks': isHU
        ? `✅ <b>Feladatok</b><br><br>A feladatkezelő napi, heti, havi és éves nézetben szervezi a teendőidet.<br><br>• <b>Új feladat:</b> töltsd ki az alul lévő mezőket és kattints <b>+ Feladat hozzáadása</b>-ra.<br>• <b>Prioritás:</b> 🔴 Magas / ⚡ Közepes / 🔵 Alacsony<br>• <b>Határidő:</b> megadhatsz esedékességi dátumot.<br>• <b>Szűrés:</b> a felső gombokkal szűrhetsz prioritás szerint.<br>• <b>Szerkesztés:</b> kattints a feladaton a ✎ ikonra a szerkesztéshez.<br>• <b>Hatókör:</b> ☀️ Napi / 📅 Heti / 🗓 Havi / 📆 Éves nézetek között válthatsz.`
        : `✅ <b>Tasks</b><br><br>Organize your to-dos across daily, weekly, monthly, and yearly views.<br><br>• <b>Add a task:</b> fill in the fields at the bottom and click <b>+ Add Task</b>.<br>• <b>Priority:</b> 🔴 High / ⚡ Medium / 🔵 Low<br>• <b>Due date:</b> set a deadline for any task.<br>• <b>Filter:</b> use the top buttons to filter by priority.<br>• <b>Edit:</b> click the ✎ icon on any task to edit it.<br>• <b>Scope:</b> switch between ☀️ Daily / 📅 Weekly / 🗓 Monthly / 📆 Yearly views.`,

      'how-timetable': isHU
        ? `🗓 <b>Órarend</b><br><br>A heti órarend segít átlátni az ismétlődő eseményeidet.<br><br>• <b>Esemény hozzáadása:</b> töltsd ki a nevet, napot, időpontot és kategóriát, majd kattints <b>+ Esemény</b>-re.<br>• <b>Google Naptár import:</b> kattints az <b>Import .ics</b> gombra és töltsd fel a fájlt.<br>• <b>Egész napos:</b> jelöld be az „Egész nap" opciót időpont nélküli eseményekhez.<br>• <b>Hétváltás:</b> a ‹ › gombokkal léphetsz hetek között.<br>• <b>Kategóriák:</b> Munka / Tanulás / Egészség / Személyes / Szociális / Egyéb<br>• <b>Szerkesztés:</b> kattints az eseményre az órarend rácsban.`
        : `🗓 <b>Timetable</b><br><br>The weekly timetable helps you visualize recurring events.<br><br>• <b>Add an event:</b> fill in title, day, time, and category, then click <b>+ Add Event</b>.<br>• <b>Google Calendar import:</b> click <b>Import .ics</b> and upload your exported file.<br>• <b>All-day events:</b> tick "All Day" for events without a specific time.<br>• <b>Navigate weeks:</b> use the ‹ › arrows to switch between weeks.<br>• <b>Categories:</b> Work / Study / Health / Personal / Social / Other<br>• <b>Edit:</b> click any event in the grid to edit or delete it.`,

      'how-shopping': isHU
        ? `🛒 <b>Bevásárlólista</b><br><br>A bevásárlólista kategóriánként csoportosítja az elemeket.<br><br>• <b>Elem hozzáadása:</b> add meg a nevét, mennyiségét és kategóriáját, majd kattints <b>+ Elem hozzáadása</b>-ra.<br>• <b>Kategóriák:</b> 🥦 Élelmiszer / 🏠 Háztartás / 💄 Személyes / 📦 Egyéb<br>• <b>Kész jelölés:</b> kattints az elemre a pipa bejelöléséhez.<br>• <b>Szűrés:</b> a felső gombokkal kategória szerint szűrhetsz.<br>• <b>Teljesítettek törlése:</b> kattints a <b>🗑 Teljesítettek törlése</b> gombra a kész elemek eltávolításához.<br>• <b>Mennyiség módosítás:</b> a + / – gombokkal változtathatod a mennyiséget.`
        : `🛒 <b>Shopping List</b><br><br>The shopping list groups items by category for easy shopping.<br><br>• <b>Add an item:</b> enter its name, quantity, and category, then click <b>+ Add Item</b>.<br>• <b>Categories:</b> 🥦 Grocery / 🏠 Household / 💄 Personal / 📦 Other<br>• <b>Check off:</b> tap an item to mark it as done.<br>• <b>Filter:</b> use the top category buttons to focus on one group.<br>• <b>Clear checked:</b> click <b>🗑 Clear Checked</b> to remove completed items.<br>• <b>Adjust quantity:</b> use the + / – buttons to change quantities.`,

      'how-finance': isHU
        ? `💰 <b>Pénzügy</b><br><br>Kövesd nyomon bevételeidet és kiadásaidat hónapról hónapra.<br><br>• <b>Bevétel hozzáadása:</b> kattints a <b>+ Bevétel</b> gombra és add meg a részleteket.<br>• <b>Kiadás hozzáadása:</b> kattints a <b>+ Kiadás</b> gombra.<br>• <b>Kategóriák:</b> Élelmiszer / Lakhatás / Közlekedés / Szórakozás / Egészség / Egyéb<br>• <b>Összesítő kártyák:</b> mutatják az egyenlegedet, bevételedet és kiadásodat.<br>• <b>Hónapok közötti navigáció:</b> a fejléc ‹ › nyilakkal.<br>• <b>Pénznem beállítás:</b> Beállítások → Pénzügy beállítása → pénznem kiválasztás.`
        : `💰 <b>Finance</b><br><br>Track your income and expenses month by month.<br><br>• <b>Add income:</b> click the <b>+ Income</b> button and fill in the details.<br>• <b>Add expense:</b> click the <b>+ Expense</b> button.<br>• <b>Categories:</b> Food / Housing / Transport / Entertainment / Health / Other<br>• <b>Summary cards:</b> show your balance, total income, and total spending.<br>• <b>Navigate months:</b> use the ‹ › arrows in the header.<br>• <b>Set currency:</b> use the Setup wizard or go to Settings → Set up Finance.`,

      'how-cycle': isHU
        ? `🌸 <b>Cikluskövető</b><br><br>Kövesd a természetes ciklusodat vagy a fogamzásgátló tabletta bevételét.<br><br>• <b>Módváltás:</b> válts a 🌸 Természetes és 💊 Tabletta módok között a felső gombsorral.<br>• <b>Ciklus beállítása:</b> add meg a legutóbbi menstruáció kezdődátumát, a vérzés hosszát és a ciklus hosszát.<br>• <b>Naptár:</b> a ciklusnaptáron látható a vérzési időszak (piros), az ovulációs ablak (zöld) és az előrejelzések.<br>• <b>Tünetek & Hangulat:</b> napi szinten rögzíthetsz tüneteket és hangulatot.<br>• <b>Tabletta mód:</b> 21 aktív + 7 placebo tabletta vizuális nyomkövetéssel.<br>• <b>Terhességi valószínűség:</b> az oldal alján látható az aktuális esélybecslés.`
        : `🌸 <b>Cycle Tracker</b><br><br>Track your natural menstrual cycle or birth control pill schedule.<br><br>• <b>Switch modes:</b> toggle between 🌸 Natural Cycle and 💊 Birth Control Pill at the top.<br>• <b>Set up:</b> enter your last period start date, period duration, and cycle length.<br>• <b>Calendar:</b> the cycle calendar shows your period (red), ovulation window (green), and predictions.<br>• <b>Symptoms & Mood:</b> log daily symptoms and mood entries.<br>• <b>Pill mode:</b> visual tracker for 21 active + 7 placebo pills with taken/missed tracking.<br>• <b>Pregnancy possibility:</b> an estimate is shown based on your current cycle phase.`,

      'how-pomodoro': isHU
        ? `⏱ <b>Pomodoro időzítő</b><br><br>A Pomodoro technika 25 perces fókuszált munkaszakaszokból és rövid szünetekből áll.<br><br>• <b>Megnyitás:</b> kattints az <b>⏱ Pomodoro</b> gombra a fejlécben – bármely oldalon elérhető.<br>• <b>Módok:</b> Pomodoro (25 perc) / Rövid szünet (5 perc) / Hosszú szünet (15 perc)<br>• <b>Indítás/szünet:</b> kattints a <b>▶ Start</b> gombra, vagy nyomd meg a <b>Space</b> billentyűt.<br>• <b>Visszaállítás:</b> <b>↺ Reset</b> gomb.<br>• <b>Bezárás:</b> <b>Esc</b> billentyű vagy az X gomb.<br>• <b>Statisztikák:</b> a widget mutatja az elvégzett meneteket, fókuszidőt és szüneteket.`
        : `⏱ <b>Pomodoro Timer</b><br><br>The Pomodoro technique uses 25-minute focused work sessions with short breaks.<br><br>• <b>Open it:</b> click the <b>⏱ Pomodoro</b> button in the header — available on every page.<br>• <b>Modes:</b> Pomodoro (25 min) / Short Break (5 min) / Long Break (15 min)<br>• <b>Start/pause:</b> click <b>▶ Start</b> or press the <b>Space</b> key.<br>• <b>Reset:</b> click the <b>↺ Reset</b> button.<br>• <b>Close:</b> press <b>Esc</b> or click the X button.<br>• <b>Stats:</b> the widget tracks your completed sessions, focus time, and breaks.`,

      'how-export': isHU
        ? `🔄 <b>Adatmentés & szinkron</b><br><br>Az összes adatod a böngésződ helyi tárhelyén (localStorage) van mentve – nincs szükség internetre.<br><br>• <b>Mentés:</b> Beállítások → <b>Export Backup</b> → letölt egy <code>.json</code> fájlt.<br>• <b>Visszaállítás:</b> Beállítások → <b>Import Backup</b> → válaszd ki a fájlt.<br>• <b>Eszközök között:</b> exportáld az egyiken, importáld a másikon (pl. e-mailen keresztül küld át a fájlt).<br>• <b>Figyelem:</b> az importálás felülírja a jelenlegi adatokat – előtte exportálj biztonsági mentést!<br>• <b>Mikor mentsen?</b> Javasolt hetente menteni a fontos adatokról.`
        : `🔄 <b>Backup & Sync</b><br><br>All your data is stored in your browser's localStorage — no internet needed.<br><br>• <b>Save a backup:</b> Settings → <b>Export Backup</b> → downloads a <code>.json</code> file.<br>• <b>Restore:</b> Settings → <b>Import Backup</b> → pick the file.<br>• <b>Between devices:</b> export on one device, import on the other (send the file via email or cloud).<br>• <b>Warning:</b> importing overwrites current data — export a backup first if needed!<br>• <b>How often?</b> It's good practice to export a backup once a week.`,

      'how-themes': isHU
        ? `🎨 <b>Témák & Megjelenés</b><br><br>A Life Tracker 10 különböző témával rendelkezik.<br><br>• <b>Témaváltás:</b> kattints a fejlécben a 🌙 gombra, vagy menj a <b>Beállítások</b> oldalra.<br>• <b>Elérhető témák:</b><br>  🌑 Dark · ☀️ Light · 🌿 Forest · 🌸 Sakura · 🌊 Ocean<br>  🌅 Sunset · 🌙 Midnight Purple · 🖤 AMOLED Black · 🤍 Minimal Paper · 🌫️ Slate<br>• <b>Mentés:</b> a választott téma automatikusan elmentődik és az összes oldalon érvényes.<br>• <b>Legsötétebb mód:</b> az AMOLED Black téma szemkímélő sötét szobában.`
        : `🎨 <b>Themes & Appearance</b><br><br>Life Tracker has 10 different visual themes.<br><br>• <b>Change theme:</b> click the 🌙 button in the header or go to the <b>Settings</b> page.<br>• <b>Available themes:</b><br>  🌑 Dark · ☀️ Light · 🌿 Forest · 🌸 Sakura · 🌊 Ocean<br>  🌅 Sunset · 🌙 Midnight Purple · 🖤 AMOLED Black · 🤍 Minimal Paper · 🌫️ Slate<br>• <b>Auto-saved:</b> your chosen theme is saved automatically and applies across all pages.<br>• <b>Darkest option:</b> AMOLED Black is ideal for OLED screens and dark rooms.`,

      'how-language': isHU
        ? `🌐 <b>Nyelvi beállítások</b><br><br>A Life Tracker 5 nyelven érhető el.<br><br>• <b>Nyelvváltás:</b> kattints a fejlécben a 🌐 gombra, vagy menj a <b>Beállítások</b> oldalra.<br>• <b>Elérhető nyelvek:</b> 🇬🇧 English / 🇭🇺 Magyar / 🇩🇪 Deutsch / 🇪🇸 Español / 🇫🇷 Français<br>• <b>Mentés:</b> a nyelv automatikusan elmentődik és az összes oldalon érvényes.<br>• <b>Részleges fordítás:</b> egyes dinamikusan generált tartalmak (pl. eseménynevek) az általad begépelt nyelven maradnak.`
        : `🌐 <b>Language Settings</b><br><br>Life Tracker is available in 5 languages.<br><br>• <b>Change language:</b> click the 🌐 button in the header or go to the <b>Settings</b> page.<br>• <b>Available languages:</b> 🇬🇧 English / 🇭🇺 Magyar / 🇩🇪 Deutsch / 🇪🇸 Español / 🇫🇷 Français<br>• <b>Auto-saved:</b> your language preference is saved and applies across all pages.<br>• <b>Note:</b> user-entered content (habit names, task titles, etc.) stays in whatever language you typed them.`,

      // ── TIPS answers ────────────────────────────────────────────────────────
      'tip-habits': isHU
        ? `💪 <b>Jobb szokások kialakítása</b><br><br>Néhány tipp a szokáskövetőhöz:<br><br>• <b>Kis lépések:</b> kezdj 2–3 szokással, ne 10-zel egyszerre – az átterhelés megöli a motivációt.<br>• <b>Kötés:</b> kösd az új szokást egy meglévőhöz (pl. „reggeli kávé után → 5 perc olvasás").<br>• <b>Streak:</b> a heti és havi nézet megmutatja a folyamatos sorozatodat – ne törd meg!<br>• <b>Elemzés használata:</b> nézd meg hetente az 📈 Elemzés fület, hogy lásd, hol csúszik a teljesítmény.<br>• <b>Reális célok:</b> egy szokást akkor tekints sikernek, ha a napok 80%+-án teljesíted.`
        : `💪 <b>Building better habits</b><br><br>Tips for getting the most from the Habit Tracker:<br><br>• <b>Start small:</b> begin with 2–3 habits, not 10 at once — overloading kills motivation.<br>• <b>Habit stacking:</b> attach a new habit to an existing one (e.g. "after morning coffee → 5 min reading").<br>• <b>Streaks:</b> the weekly and monthly views show your streaks — try not to break the chain!<br>• <b>Review regularly:</b> check the 📈 Analysis tab weekly to see where performance slips.<br>• <b>Realistic targets:</b> consider a habit successful if you complete it on 80%+ of days.`,

      'tip-pomodoro': isHU
        ? `⏱ <b>Hatékony Pomodoro használat</b><br><br>• <b>Zavaró tényezők kiiktatása:</b> Pomodoro közben kapcsold ki az értesítéseket – az időzítő jelzi, ha kész.<br>• <b>Egy feladat egy menet:</b> minden Pomodoro előtt döntsd el, min dolgozol – ne multitaskingolj.<br>• <b>Szüneteket tarts meg:</b> a szünetek nem luxus – az agy regenerálódáshoz kell.<br>• <b>4 menet után hosszú szünet:</b> a 15 perces hosszú szünet után sokkal produktívabb leszel.<br>• <b>Kapcsold össze a feladatokkal:</b> a Pomodoro gomb bármely oldalon elérhető, még a feladatok nézetben is.`
        : `⏱ <b>Effective Pomodoro use</b><br><br>• <b>Eliminate distractions:</b> during a Pomodoro, silence notifications — the timer will alert you when done.<br>• <b>One task per session:</b> decide what you're working on before starting — avoid multitasking.<br>• <b>Actually take breaks:</b> breaks aren't a luxury — your brain needs recovery to stay sharp.<br>• <b>Long break after 4 sessions:</b> the 15-minute break after 4 Pomodoros restores deep focus capacity.<br>• <b>Combine with Tasks:</b> the Pomodoro button is available on every page, even while viewing your task list.`,

      'tip-finance': isHU
        ? `💰 <b>Pénzügyi tippek</b><br><br>• <b>Minden kiadást rögzíts:</b> még a kis összegek is összeadódnak – rögzítsd, amint elköltötted.<br>• <b>Kategóriák:</b> következetes kategorizálással láthatod, mire megy el legtöbb pénzed.<br>• <b>Havi büdzsé:</b> állíts be havi keretet a Pénzügy beállítása varázslóban – a tracker mutatja, mennyit költöttél.<br>• <b>Hónap eleji szokás:</b> minden hónap elején nézd át az előző hónap kiadásait az összesítőben.<br>• <b>Megtakarítás nyomkövetés:</b> adj hozzá havi „Megtakarítás" bevételt, ami jelzi, mennyit sikerült félretenned.`
        : `💰 <b>Finance tips</b><br><br>• <b>Log everything:</b> even small amounts add up — enter them as soon as you spend.<br>• <b>Use categories consistently:</b> consistent categorization shows exactly where your money goes.<br>• <b>Set a monthly budget:</b> configure it in the Finance Setup wizard to see how much of your budget remains.<br>• <b>Monthly review habit:</b> at the start of each month, review last month's summary cards.<br>• <b>Track savings:</b> add a monthly "Savings" income entry to track how much you've set aside.`,

      'tip-tasks': isHU
        ? `✅ <b>Produktív feladatkezelés</b><br><br>• <b>Hatókör szerinti szétválasztás:</b> a napi feladatok aznapra valók, a heti és havi célokat ne keverd a napi listába.<br>• <b>Priorizálás:</b> kezd a 🔴 Magas prioritású feladatokkal, mielőtt a 🔵 Alacsonyakhoz érnél.<br>• <b>Határidők:</b> adj minden feladathoz határidőt – ez segít fókuszban maradni.<br>• <b>Heti áttekintés:</b> minden hétfőn ellenőrizd a heti feladatlistát, és mozdítsd át, ami szükséges.<br>• <b>Ne zsúfold túl:</b> napi 3–5 feladat reális, több csak frusztrációhoz vezet.`
        : `✅ <b>Productive task management</b><br><br>• <b>Use scopes properly:</b> daily tasks are for today only; keep weekly/monthly goals separate.<br>• <b>Prioritize:</b> tackle 🔴 High priority tasks first before moving to 🔵 Low ones.<br>• <b>Set due dates:</b> deadlines on every task help you stay focused and avoid procrastination.<br>• <b>Weekly review:</b> every Monday, scan your weekly list and carry forward anything unfinished.<br>• <b>Don't overload:</b> 3–5 daily tasks is realistic; more leads to frustration and skipped days.`,

      'tip-cycle': isHU
        ? `🌸 <b>Cikluskövető tippek</b><br><br>• <b>Rendszeres naplózás:</b> napi szinten jelöld be a tüneteket és a hangulatot – minél több adat, annál pontosabb az előrejelzés.<br>• <b>Több hónap:</b> add meg a korábbi cikluskezdési dátumokat is a Ciklus előzmények részben a pontosabb átlaghoz.<br>• <b>Tabletták:</b> a tablettás módban jelöld be minden nap, hogy bevette-e – a rendszer jelzi a kihagyott tablettákat.<br>• <b>Ovuláció jelzés:</b> a zöld csillag a naptáron jelöli a várható ovulációs napot.<br>• <b>Terhességi valószínűség:</b> ez becslés, nem orvosi tanácsadás – fontos döntésekhez keresd fel kezelőorvosodat.`
        : `🌸 <b>Cycle tracker tips</b><br><br>• <b>Log daily:</b> mark symptoms and mood every day — more data means better predictions.<br>• <b>Add past cycles:</b> enter previous cycle start dates in the History section for a more accurate cycle average.<br>• <b>Pill mode:</b> check off each pill every day — the tracker will highlight any you missed.<br>• <b>Ovulation marker:</b> the green star on the calendar shows the predicted ovulation day.<br>• <b>Pregnancy estimate:</b> this is an estimate, not medical advice — consult your doctor for important decisions.`,

      'tip-data': isHU
        ? `🔒 <b>Az adataid & adatvédelem</b><br><br>• <b>Tárolás:</b> minden adat kizárólag a te böngésződben van mentve (localStorage). Semmilyen adat nem kerül szerverre.<br>• <b>Offline működés:</b> az alkalmazás internet nélkül is teljesen használható.<br>• <b>Adatbiztonság:</b> exportálj rendszeresen <code>.json</code> biztonsági mentést, ha nem szeretnéd elveszíteni az adataidat.<br>• <b>Böngésző törlés figyelmeztetés:</b> ha törlöd a böngésző localStorage adatait (pl. sütik törlése), a Life Tracker adatai is elvesznek.<br>• <b>Inkognitó mód:</b> inkognító ablakban az adatok bezáráskor törlődnek.`
        : `🔒 <b>Your data & privacy</b><br><br>• <b>Storage:</b> all data is saved only in your browser (localStorage). Nothing is sent to any server.<br>• <b>Offline:</b> the app works fully without an internet connection.<br>• <b>Data safety:</b> export a <code>.json</code> backup regularly so you never lose your data.<br>• <b>Browser clear warning:</b> if you clear your browser's localStorage (e.g. "clear cookies & data"), all Life Tracker data will be lost.<br>• <b>Incognito mode:</b> in private/incognito windows, data is deleted when you close the window.`,

      // ── TROUBLESHOOT answers ─────────────────────────────────────────────────
      'fix-saving': isHU
        ? `💾 <b>Nem ment az adat?</b><br><br>Néhány lehetséges ok és megoldás:<br><br>• <b>Böngésző-tároló tele:</b> a localStorage ~5–10 MB-os korláttal rendelkezik. Próbálj törölni régi adatokat a Beállítások → Adatok törlése menüpontban.<br>• <b>Privát/inkognító mód:</b> privát ablakban az adatok az ablak bezárásakor törlődnek – használj normál böngészési módot.<br>• <b>Böngésző beállítás:</b> egyes böngészők blokkolják a localStorage-t. Ellenőrizd a süti/tároló engedélyeket.<br>• <b>Safari iOS:</b> privát módban a Safari letiltja a localStorage-t.<br><br>Ha a probléma fennáll, exportálj biztonsági mentést, majd próbáld meg az importálást egy másik böngészőben.`
        : `💾 <b>Data not saving?</b><br><br>Possible causes and fixes:<br><br>• <b>Browser storage full:</b> localStorage has a ~5–10 MB limit. Try clearing old data via Settings → Delete All Data.<br>• <b>Private/incognito mode:</b> data is deleted when you close a private window — use a normal browser window.<br>• <b>Browser setting:</b> some browsers block localStorage. Check your cookie/storage permissions in browser settings.<br>• <b>Safari iOS:</b> private mode disables localStorage on Safari.<br><br>If the issue persists, try exporting a backup and importing it in a different browser.`,

      'fix-import': isHU
        ? `📥 <b>Import nem sikerül?</b><br><br>• <b>Fájl formátum:</b> csak <code>.json</code> fájl importálható – ellenőrizd, hogy a letöltött backup fájl kiterjesztése <code>.json</code>.<br>• <b>Helyes fájl:</b> csak a Life Tracker által exportált backup fájl kompatibilis.<br>• <b>Fájl sérült:</b> ha a fájl nem nyílik meg, előfordulhat, hogy az export nem fejeződött be – próbáld újra az exportálást.<br>• <b>Importálás megerősítése:</b> az import ablak mutat egy előnézetet – győződj meg, hogy a megfelelő fájlt választottad.<br>• <b>Böngésző kompatibilitás:</b> használj modern böngészőt (Chrome, Firefox, Edge, Safari).`
        : `📥 <b>Import not working?</b><br><br>• <b>File format:</b> only <code>.json</code> files can be imported — check that the backup file extension is <code>.json</code>.<br>• <b>Correct file:</b> only backup files exported from Life Tracker are compatible.<br>• <b>Corrupted file:</b> if the file won't open, the export may not have completed — try exporting again.<br>• <b>Confirm the import:</b> the import modal shows a preview — make sure you've selected the right file.<br>• <b>Browser compatibility:</b> use a modern browser (Chrome, Firefox, Edge, Safari).`,

      'fix-theme': isHU
        ? `🎨 <b>A téma visszaáll?</b><br><br>• <b>Normál viselkedés:</b> ha privát/inkognító módot használsz, a téma bezáráskor elvész.<br>• <b>Sütik törlése:</b> ha rendszeresen törlöd a böngésző adatait, a tema-beállítás is törlődik.<br>• <b>Megoldás:</b> exportálj biztonsági mentést – az tartalmazza a témát és az összes beállítást is.<br>• <b>Exportált backup:</b> az import visszaállítja a témát is.`
        : `🎨 <b>Theme keeps resetting?</b><br><br>• <b>Normal behaviour:</b> if you use private/incognito mode, the theme is lost when you close the window.<br>• <b>Clearing browser data:</b> if you regularly clear browser cookies/storage, the theme preference is wiped too.<br>• <b>Solution:</b> export a backup regularly — it includes your theme and all settings.<br>• <b>After import:</b> importing a backup restores your theme along with all other data.`,

      'fix-cal': isHU
        ? `🗓 <b>Google Naptár import probléma</b><br><br>• <b>Fájl típusa:</b> csak <code>.ics</code> formátumú fájl importálható – Google Naptárból exportáld.<br>• <b>Google export lépései:</b> Google Naptár → Beállítások → „Exportálás" → tömd ki a ZIP fájlt → válaszd a megfelelő <code>.ics</code> fájlt.<br>• <b>Ismétlődő események:</b> az ismétlődő (RRULE) eseményeket az alkalmazás automatikusan kiszámolja a heti nézetre.<br>• <b>Időzóna:</b> az alkalmazás a helyi böngésző időzónát használja.<br>• <b>Sok esemény:</b> csak az aktuális hétre vonatkozó események kerülnek be az órarendbe.`
        : `🗓 <b>Calendar import issue</b><br><br>• <b>File type:</b> only <code>.ics</code> files can be imported — export this from Google Calendar.<br>• <b>Google export steps:</b> Google Calendar → Settings → "Export" → unzip the file → choose the right <code>.ics</code> file.<br>• <b>Recurring events:</b> the app automatically calculates recurring (RRULE) events for the weekly view.<br>• <b>Timezone:</b> the app uses your browser's local timezone.<br>• <b>Too many events:</b> only events relevant to the current week are added to the timetable.`,

      'fix-cycle': isHU
        ? `🌸 <b>Ciklus adatok hibásnak tűnnek?</b><br><br>• <b>Dátum ellenőrzés:</b> a beállított kezdődátum helyes-e? Menj a Cikluskövető oldalra és ellenőrizd a „📅 Ciklus rögzítése" kártyán.<br>• <b>Ciklus hossz:</b> ha szokatlanul hosszú az előre jelzett idő, ellenőrizd a ciklus hosszát (alapértelmezett: 28 nap).<br>• <b>Több ciklus:</b> a pontosabb előrejelzéshez adj hozzá több korábbi ciklust a Ciklus előzmények részben.<br>• <b>Mód váltás:</b> ha természetes ciklusról tablettás módra váltasz (vagy fordítva), a korábbi adatok megmaradnak, de az előrejelzés frissül.<br>• <b>Reset:</b> ha teljesen újra szeretnéd kezdeni, a Beállítások → Adatok törlése menüpont eltávolít mindent.`
        : `🌸 <b>Cycle data looks wrong?</b><br><br>• <b>Check the date:</b> is your cycle start date correct? Go to Cycle Tracker and review the "📅 Log Cycle Start" card.<br>• <b>Cycle length:</b> if predictions seem too far away, check your cycle length setting (default: 28 days).<br>• <b>Add more cycles:</b> for more accurate predictions, add multiple past cycle start dates in the History section.<br>• <b>Mode switch:</b> switching between Natural and Pill mode keeps your old data but updates predictions.<br>• <b>Full reset:</b> if you want to start fresh, Settings → Delete All Data will remove everything.`,

      'fix-clear': isHU
        ? `🗑 <b>Adatok törlése / nulláról indulás</b><br><br>• <b>Teljes törlés:</b> Beállítások → <b>⚠️ Veszélyzóna</b> → <b>🗑 Összes adat törlése</b> – ez minden adatot töröl.<br>• <b>Mielőtt törlöd:</b> javasolt előbb biztonsági mentést exportálni, hátha meggondolod magad.<br>• <b>Visszavonhatatlan:</b> a törlés visszavonhatatlan – nincs „visszacsináló" gomb.<br>• <b>Részleges törlés:</b> ha csak egy szekciót szeretnél törölni (pl. csak a pénzügyi adatokat), jelenleg nincs rá külön gomb – az összes törlés oldal ezt elvégzi.`
        : `🗑 <b>Reset / clear all data</b><br><br>• <b>Full reset:</b> go to Settings → <b>⚠️ Danger Zone</b> → <b>🗑 Delete All Data</b> — this erases everything.<br>• <b>Before you delete:</b> it's recommended to export a backup first in case you change your mind.<br>• <b>Cannot be undone:</b> deletion is permanent — there is no undo button.<br>• <b>Partial deletion:</b> there is no per-section delete option currently — the full reset covers all sections.`,

      'fix-mobile': isHU
        ? `📱 <b>Mobilon nem jól néz ki?</b><br><br>• <b>Ajánlott eszköz:</b> a Life Tracker laptopra és nagy képernyőre van optimalizálva. Mobilon is működik, de néhány funkció szűkebb képernyőn korlátozottabb.<br>• <b>Fekvő tájolás:</b> mobilon fekvő (landscape) tájolásban sokkal jobban használható a szokástracker és az órarend.<br>• <b>Pinch-to-zoom:</b> ha egy rész túl kicsi, próbálj ráközelíteni.<br>• <b>Legjobb mobilos élmény:</b> Feladatok, Bevásárlólista és Cikluskövető oldalak a legbarátságosabbak kis képernyőn.`
        : `📱 <b>Looks off on mobile?</b><br><br>• <b>Recommended device:</b> Life Tracker is optimized for laptop and large screens. It works on mobile but some features are limited on small screens.<br>• <b>Landscape mode:</b> rotate to landscape orientation on mobile for a much better experience with the habit tracker and timetable.<br>• <b>Pinch-to-zoom:</b> if something looks too small, try pinching to zoom in.<br>• <b>Best on mobile:</b> the Tasks, Shopping List, and Cycle Tracker pages are the most mobile-friendly.`,
    }
  };
}

// ── Wizard definitions ────────────────────────────────────────────────────────
function getWizards() {
  const lang = (typeof state !== 'undefined' && state.lang) || 'en';
  const isHU = lang === 'hu';

  return {
    cycle: {
      title: isHU ? '🌸 Ciklus beállítása' : '🌸 Set Up Cycle',
      steps: [
        {
          id: 'mode',
          type: 'choice',
          question: isHU ? 'Melyik módot szeretnéd használni?' : 'Which tracking mode would you like?',
          choices: [
            { value: 'natural', label: isHU ? '🌸 Természetes ciklus' : '🌸 Natural Cycle' },
            { value: 'pill',    label: isHU ? '💊 Fogamzásgátló tabletta' : '💊 Birth Control Pill' },
          ]
        },
        {
          id: 'start',
          type: 'date',
          question: isHU ? 'Mikor kezdődött az utolsó menstruációd? (kezdőnap)' : 'When did your last period start?',
          placeholder: isHU ? 'Válassz dátumot' : 'Select a date',
        },
        {
          id: 'dur',
          type: 'number',
          question: isHU ? 'Hány napig tart általában a vérzés?' : 'How many days does your period usually last?',
          placeholder: '5',
          min: 1, max: 14, default: 5,
          hint: isHU ? 'Jellemzően 3–7 nap' : 'Typically 3–7 days',
        },
        {
          id: 'cycleLen',
          type: 'number',
          question: isHU ? 'Hány napos a ciklusod? (az egyik vérzés első napjától a következőig)' : 'How long is your cycle? (first day of one period to the next)',
          placeholder: '28',
          min: 21, max: 45, default: 28,
          hint: isHU ? 'Átlagosan 28 nap' : 'Average is 28 days',
          skipIf: (answers) => answers.mode === 'pill',
        },
      ],
      finish: isHU ? '✅ Ciklus mentve! Megnyitom a Cikluskövetőt.' : '✅ Cycle saved! Opening Cycle Tracker.',
      action: function(answers) {
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
          state.cycleData.periods.sort((a,b) => new Date(a.start) - new Date(b.start));
        }
        try { localStorage.setItem('ht_cycle_v2', JSON.stringify(state.cycleData)); } catch(e){}
        setTimeout(() => { window.location.href = 'cycle.html'; }, 1200);
      }
    },

    habit: {
      title: isHU ? '💪 Szokás hozzáadása' : '💪 Add a Habit',
      steps: [
        {
          id: 'name',
          type: 'text',
          question: isHU ? 'Mi legyen az új szokásod neve?' : 'What should the new habit be called?',
          placeholder: isHU ? 'pl. Reggeli futás, Olvasás…' : 'e.g. Morning run, Reading…',
        },
      ],
      finish: isHU ? '✅ Szokás hozzáadva! Megnyitom a Szokáskövetőt.' : '✅ Habit added! Opening Habit Tracker.',
      action: function(answers) {
        const name = (answers.name || '').trim();
        if (!name) return;
        if (!state.habits) state.habits = [];
        state.habits.push(name);
        try { localStorage.setItem('ht_habits_v4', JSON.stringify(state.habits)); } catch(e){}
        setTimeout(() => { window.location.href = 'tracker.html'; }, 1200);
      }
    },

    task: {
      title: isHU ? '✅ Feladat hozzáadása' : '✅ Add a Task',
      steps: [
        {
          id: 'name',
          type: 'text',
          question: isHU ? 'Mi a feladat neve?' : 'What is the task name?',
          placeholder: isHU ? 'pl. Beadandó leadása, Fogászat lefoglalása…' : 'e.g. Submit assignment, Book dentist…',
        },
        {
          id: 'scope',
          type: 'choice',
          question: isHU ? 'Milyen hatókörű a feladat?' : 'What scope does this task belong to?',
          choices: [
            { value: 'daily',   label: isHU ? '☀️ Napi'   : '☀️ Daily' },
            { value: 'weekly',  label: isHU ? '📅 Heti'   : '📅 Weekly' },
            { value: 'monthly', label: isHU ? '🗓 Havi'   : '🗓 Monthly' },
            { value: 'yearly',  label: isHU ? '📆 Éves'   : '📆 Yearly' },
          ]
        },
        {
          id: 'priority',
          type: 'choice',
          question: isHU ? 'Mekkora a prioritása?' : 'What priority level?',
          choices: [
            { value: 'high',   label: isHU ? '🔴 Magas'   : '🔴 High' },
            { value: 'medium', label: isHU ? '⚡ Közepes' : '⚡ Medium' },
            { value: 'low',    label: isHU ? '🔵 Alacsony': '🔵 Low' },
          ]
        },
      ],
      finish: isHU ? '✅ Feladat hozzáadva! Megnyitom a Feladatok oldalt.' : '✅ Task added! Opening Tasks page.',
      action: function(answers) {
        const name = (answers.name || '').trim();
        if (!name) return;
        const scope = answers.scope || 'daily';
        const priority = answers.priority || 'medium';
        const key = 'ht_tasks_v3';
        let tasks = [];
        try { tasks = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){}
        tasks.push({ id: Date.now(), name, scope, priority, status: 'inprogress', due: '', done: false, created: new Date().toISOString() });
        try { localStorage.setItem(key, JSON.stringify(tasks)); } catch(e){}
        setTimeout(() => { window.location.href = 'tasks.html'; }, 1200);
      }
    },

    event: {
      title: isHU ? '🗓 Órarend esemény hozzáadása' : '🗓 Add a Timetable Event',
      steps: [
        {
          id: 'title',
          type: 'text',
          question: isHU ? 'Mi az esemény neve?' : 'What is the event title?',
          placeholder: isHU ? 'pl. Matek óra, Edzés, Gyűlés…' : 'e.g. Math class, Gym, Team meeting…',
        },
        {
          id: 'day',
          type: 'choice',
          question: isHU ? 'Melyik napon?' : 'Which day?',
          choices: [
            { value: '0', label: isHU ? '📅 Hétfő'     : '📅 Monday' },
            { value: '1', label: isHU ? '📅 Kedd'      : '📅 Tuesday' },
            { value: '2', label: isHU ? '📅 Szerda'    : '📅 Wednesday' },
            { value: '3', label: isHU ? '📅 Csütörtök' : '📅 Thursday' },
            { value: '4', label: isHU ? '📅 Péntek'    : '📅 Friday' },
            { value: '5', label: isHU ? '📅 Szombat'   : '📅 Saturday' },
            { value: '6', label: isHU ? '📅 Vasárnap'  : '📅 Sunday' },
          ]
        },
        {
          id: 'category',
          type: 'choice',
          question: isHU ? 'Milyen kategóriájú?' : 'What category?',
          choices: [
            { value: 'work',     label: isHU ? '💼 Munka'      : '💼 Work' },
            { value: 'study',    label: isHU ? '📚 Tanulás'    : '📚 Study' },
            { value: 'health',   label: isHU ? '💪 Egészség'   : '💪 Health' },
            { value: 'personal', label: isHU ? '🙂 Személyes'  : '🙂 Personal' },
            { value: 'social',   label: isHU ? '👥 Szociális'  : '👥 Social' },
            { value: 'other',    label: isHU ? '📦 Egyéb'      : '📦 Other' },
          ]
        },
      ],
      finish: isHU ? '✅ Esemény hozzáadva! Megnyitom az Órarend oldalt.' : '✅ Event added! Opening Timetable.',
      action: function(answers) {
        const title = (answers.title || '').trim();
        if (!title) return;
        const key = 'ht_timetable_v4';
        let events = [];
        try { events = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){}
        events.push({
          id: Date.now(),
          title,
          day: parseInt(answers.day) || 0,
          start: '09:00',
          end: '10:00',
          allDay: false,
          category: answers.category || 'other',
          color: null,
          imported: false,
        });
        try { localStorage.setItem(key, JSON.stringify(events)); } catch(e){}
        setTimeout(() => { window.location.href = 'timetable.html'; }, 1200);
      }
    },

    shopping: {
      title: isHU ? '🛒 Bevásárló elem hozzáadása' : '🛒 Add a Shopping Item',
      steps: [
        {
          id: 'name',
          type: 'text',
          question: isHU ? 'Mit kell beleírni a listára?' : 'What item do you need to add?',
          placeholder: isHU ? 'pl. Tej, Sampon, Mosogatószer…' : 'e.g. Milk, Shampoo, Dish soap…',
        },
        {
          id: 'category',
          type: 'choice',
          question: isHU ? 'Melyik kategóriába tartozik?' : 'Which category does it belong to?',
          choices: [
            { value: 'grocery',   label: isHU ? '🥦 Élelmiszer'  : '🥦 Grocery' },
            { value: 'household', label: isHU ? '🏠 Háztartás'   : '🏠 Household' },
            { value: 'personal',  label: isHU ? '💄 Személyes'   : '💄 Personal' },
            { value: 'other',     label: isHU ? '📦 Egyéb'       : '📦 Other' },
          ]
        },
      ],
      finish: isHU ? '✅ Elem hozzáadva! Megnyitom a Bevásárlólistát.' : '✅ Item added! Opening Shopping List.',
      action: function(answers) {
        const name = (answers.name || '').trim();
        if (!name) return;
        const key = 'ht_shopping_v3';
        let items = [];
        try { items = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){}
        items.push({ id: Date.now(), name, qty: 1, category: answers.category || 'grocery', checked: false });
        try { localStorage.setItem(key, JSON.stringify(items)); } catch(e){}
        setTimeout(() => { window.location.href = 'shopping.html'; }, 1200);
      }
    },

    finance: {
      title: isHU ? '💰 Pénzügy beállítása' : '💰 Set Up Finance',
      steps: [
        {
          id: 'currency',
          type: 'choice',
          question: isHU ? 'Melyik pénznemet szeretnéd használni?' : 'Which currency would you like to use?',
          choices: [
            { value: 'HUF', label: '🇭🇺 HUF – Magyar forint' },
            { value: 'EUR', label: '🇪🇺 EUR – Euro' },
            { value: 'USD', label: '🇺🇸 USD – US Dollar' },
            { value: 'GBP', label: '🇬🇧 GBP – British Pound' },
            { value: 'other', label: isHU ? '✏️ Egyéb' : '✏️ Other' },
          ]
        },
        {
          id: 'currency_custom',
          type: 'text',
          question: isHU ? 'Add meg a pénznem jelét (pl. CHF, PLN, SEK…)' : 'Enter the currency symbol (e.g. CHF, PLN, SEK…)',
          placeholder: 'CHF',
          skipIf: (answers) => answers.currency !== 'other',
        },
        {
          id: 'budget',
          type: 'number',
          question: isHU ? 'Mi a havi büdzséd? (hagyd üresen, ha nem szeretnél megadni)' : 'What is your monthly budget? (leave empty to skip)',
          placeholder: '0',
          min: 0, max: 9999999, default: '',
          hint: isHU ? 'Ennyi a tervezett havi keret' : 'Your planned monthly spending limit',
        },
      ],
      finish: isHU ? '✅ Pénzügy beállítva! Megnyitom a Pénzügy oldalt.' : '✅ Finance set up! Opening Finance page.',
      action: function(answers) {
        const currency = answers.currency === 'other' ? (answers.currency_custom || '?') : answers.currency;
        const budget = parseFloat(answers.budget) || 0;
        try {
          const raw = JSON.parse(localStorage.getItem('ht_finance_v1') || 'null') || {};
          raw.currency = currency;
          if (budget > 0) raw.monthlyBudget = budget;
          localStorage.setItem('ht_finance_v1', JSON.stringify(raw));
        } catch(e){}
        setTimeout(() => { window.location.href = 'finance.html'; }, 1200);
      }
    },

    theme: {
      title: isHU ? '🎨 Téma kiválasztása' : '🎨 Choose a Theme',
      steps: [
        {
          id: 'theme',
          type: 'choice',
          question: isHU ? 'Melyik témát szeretnéd?' : 'Which theme would you like?',
          choices: [
            { value: 'dark',     label: '🌑 Dark' },
            { value: 'light',    label: '☀️ Light' },
            { value: 'forest',   label: '🌿 Forest' },
            { value: 'sakura',   label: '🌸 Sakura' },
            { value: 'ocean',    label: '🌊 Ocean' },
            { value: 'sunset',   label: '🌅 Sunset' },
            { value: 'midnight', label: '🌙 Midnight Purple' },
            { value: 'amoled',   label: '🖤 AMOLED Black' },
            { value: 'paper',    label: '🤍 Minimal Paper' },
            { value: 'slate',    label: '🌫️ Slate' },
          ]
        },
      ],
      finish: isHU ? '✅ Téma alkalmazva!' : '✅ Theme applied!',
      action: function(answers) {
        const theme = answers.theme;
        if (!theme) return;
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add('theme-' + theme);
        try { localStorage.setItem('ht_theme_v2', theme); } catch(e){}
      }
    },

    language: {
      title: isHU ? '🌐 Nyelv kiválasztása' : '🌐 Choose Language',
      steps: [
        {
          id: 'lang',
          type: 'choice',
          question: isHU ? 'Melyik nyelvet szeretnéd használni?' : 'Which language would you like?',
          choices: [
            { value: 'en', label: '🇬🇧 English' },
            { value: 'hu', label: '🇭🇺 Magyar' },
            { value: 'de', label: '🇩🇪 Deutsch' },
            { value: 'es', label: '🇪🇸 Español' },
            { value: 'fr', label: '🇫🇷 Français' },
          ]
        },
      ],
      finish: isHU ? '✅ Nyelv beállítva!' : '✅ Language applied!',
      action: function(answers) {
        const lang = answers.lang;
        if (!lang) return;
        try { localStorage.setItem('ht_lang_v1', lang); } catch(e){}
        if (typeof setLang === 'function') {
          setLang(lang);
        } else {
          location.reload();
        }
      }
    },
  };
}

// ── UI Builder ────────────────────────────────────────────────────────────────
function buildAsstUI() {
  document.getElementById('asst-fab')?.remove();
  document.getElementById('asst-panel')?.remove();
  document.getElementById('asst-backdrop')?.remove();

  const content = getAsstContent();

  // FAB button
  const fab = document.createElement('button');
  fab.id = 'asst-fab';
  fab.innerHTML = '💬';
  fab.title = content.greeting;
  fab.style.cssText = `
    position:fixed;bottom:28px;right:28px;z-index:7000;
    width:52px;height:52px;border-radius:50%;border:none;
    background:linear-gradient(135deg,#4f6ef7,#e05a9a);
    color:#fff;font-size:22px;cursor:pointer;
    box-shadow:0 4px 20px rgba(79,110,247,.45);
    transition:transform .18s,box-shadow .18s;
    display:flex;align-items:center;justify-content:center;
  `;
  fab.onmouseenter = () => { fab.style.transform='scale(1.1)'; fab.style.boxShadow='0 6px 28px rgba(79,110,247,.6)'; };
  fab.onmouseleave = () => { fab.style.transform=''; fab.style.boxShadow='0 4px 20px rgba(79,110,247,.45)'; };

  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.id = 'asst-backdrop';
  backdrop.style.cssText = 'position:fixed;inset:0;z-index:7001;background:rgba(0,0,0,.4);backdrop-filter:blur(3px);display:none;';

  // Panel
  const panel = document.createElement('div');
  panel.id = 'asst-panel';
  panel.style.cssText = `
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:7002;
    width:min(720px,94vw);height:min(80vh,740px);
    background:var(--surface);border:1.5px solid var(--border);
    border-radius:24px;box-shadow:0 32px 80px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.04);
    display:none;flex-direction:column;overflow:hidden;
    animation:centeredModalPop .3s cubic-bezier(.4,0,.2,1);
  `;

  panel.innerHTML = `
    <div style="padding:18px 22px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px;flex-shrink:0;background:linear-gradient(135deg,rgba(79,110,247,.12),rgba(224,90,154,.08));">
      <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#4f6ef7,#e05a9a);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:0 4px 16px rgba(79,110,247,.35);">💬</div>
      <div style="flex:1;">
        <div style="font-weight:800;font-size:16px;color:var(--text);letter-spacing:-.3px;">Life Tracker Assistant</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">● Always here to help</div>
      </div>
      <button id="asst-close" style="background:none;border:1.5px solid var(--border);color:var(--text-muted);font-size:15px;cursor:pointer;padding:5px 12px;border-radius:8px;line-height:1;transition:all .15s;" onmouseenter="this.style.borderColor='#e05a9a';this.style.color='#e05a9a';" onmouseleave="this.style.borderColor='';this.style.color='';">✕</button>
    </div>
    <div id="asst-messages" style="flex:1;overflow-y:auto;padding:22px 24px 12px;display:flex;flex-direction:column;gap:16px;"></div>
    <div id="asst-chips" style="padding:14px 20px 20px;display:flex;flex-wrap:wrap;gap:10px;flex-shrink:0;border-top:1px solid var(--border);"></div>
  `;

  document.body.appendChild(backdrop);
  document.body.appendChild(panel);
  document.body.appendChild(fab);

  let isOpen = false;
  let wizardState = null;

  function open() {
    isOpen = true;
    panel.style.display = 'flex';
    backdrop.style.display = 'block';
    fab.innerHTML = '✕';
    fab.style.background = 'linear-gradient(135deg,#555,#333)';
    if (!document.getElementById('asst-messages').children.length) {
      showGreeting();
    }
  }
  function close() {
    isOpen = false;
    panel.style.display = 'none';
    backdrop.style.display = 'none';
    fab.innerHTML = '💬';
    fab.style.background = 'linear-gradient(135deg,#4f6ef7,#e05a9a)';
  }

  fab.addEventListener('click', () => isOpen ? close() : open());
  backdrop.addEventListener('click', close);
  panel.querySelector('#asst-close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) close(); });

  // ── Message helpers ────────────────────────────────────────────────────────
  const msgBox = panel.querySelector('#asst-messages');
  const chipsBox = panel.querySelector('#asst-chips');

  function addMsg(html, from = 'bot') {
    const wrap = document.createElement('div');
    wrap.style.cssText = from === 'bot'
      ? 'display:flex;gap:8px;align-items:flex-end;'
      : 'display:flex;justify-content:flex-end;';

    if (from === 'bot') {
      wrap.innerHTML = `
        <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#4f6ef7,#e05a9a);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;box-shadow:0 2px 10px rgba(79,110,247,.3);">💬</div>
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:16px 16px 16px 4px;padding:12px 16px;font-size:14px;line-height:1.65;color:var(--text);max-width:82%;word-break:break-word;">${html}</div>
      `;
    } else {
      wrap.innerHTML = `<div style="background:linear-gradient(135deg,#4f6ef7,#3a5ce0);border-radius:16px 16px 4px 16px;padding:12px 16px;font-size:14px;line-height:1.65;color:#fff;max-width:82%;word-break:break-word;">${html}</div>`;
    }
    msgBox.appendChild(wrap);
    msgBox.scrollTop = msgBox.scrollHeight;
    return wrap;
  }

  function setChips(chips) {
    chipsBox.innerHTML = '';
    chips.forEach(chip => {
      const btn = document.createElement('button');
      btn.innerHTML = chip.label;
      btn.style.cssText = `
        padding:9px 18px;border-radius:20px;border:1.5px solid var(--border);
        background:var(--surface2);color:var(--text);font-family:inherit;
        font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;white-space:nowrap;
      `;
      btn.onmouseenter = () => { btn.style.borderColor='#4f6ef7'; btn.style.color='#4f6ef7'; };
      btn.onmouseleave = () => { btn.style.borderColor=''; btn.style.color=''; };
      btn.addEventListener('click', () => chip.onClick());
      chipsBox.appendChild(btn);
    });
  }

  function addInput(cfg) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:6px;align-items:flex-end;padding:2px 0;';

    let inputEl;
    if (cfg.type === 'date') {
      inputEl = document.createElement('input');
      inputEl.type = 'date';
      inputEl.style.cssText = 'flex:1;padding:8px 10px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface2);color:var(--text);font-family:inherit;font-size:12px;';
      const today = new Date();
      inputEl.max = today.toISOString().slice(0,10);
      inputEl.value = today.toISOString().slice(0,10);
    } else {
      inputEl = document.createElement('input');
      inputEl.type = cfg.type === 'number' ? 'number' : 'text';
      inputEl.placeholder = cfg.placeholder || '';
      if (cfg.min !== undefined) inputEl.min = cfg.min;
      if (cfg.max !== undefined) inputEl.max = cfg.max;
      if (cfg.default !== undefined && cfg.default !== '') inputEl.value = cfg.default;
      inputEl.style.cssText = 'flex:1;padding:8px 10px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface2);color:var(--text);font-family:inherit;font-size:12px;';
    }

    const btn = document.createElement('button');
    btn.textContent = '→';
    btn.style.cssText = 'padding:8px 14px;border-radius:10px;border:none;background:linear-gradient(135deg,#4f6ef7,#3a5ce0);color:#fff;font-weight:800;cursor:pointer;font-size:14px;flex-shrink:0;';

    if (cfg.hint) {
      const hintWrap = document.createElement('div');
      hintWrap.style.cssText = 'width:100%;';
      const hintEl = document.createElement('div');
      hintEl.textContent = cfg.hint;
      hintEl.style.cssText = 'font-size:11px;color:var(--text-muted);margin-bottom:4px;';
      hintWrap.appendChild(hintEl);
      hintWrap.appendChild(wrap);
      wrap.appendChild(inputEl);
      wrap.appendChild(btn);
      msgBox.appendChild(hintWrap);
    } else {
      wrap.appendChild(inputEl);
      wrap.appendChild(btn);
      msgBox.appendChild(wrap);
    }

    msgBox.scrollTop = msgBox.scrollHeight;
    inputEl.focus();

    function submit() {
      const val = inputEl.value.toString().trim();
      cfg.onSubmit(val);
    }
    btn.addEventListener('click', submit);
    inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
  }

  // ── Navigation ─────────────────────────────────────────────────────────────
  function showGreeting() {
    const content = getAsstContent();
    addMsg(content.greeting);
    showCategories();
  }

  function showCategories() {
    const content = getAsstContent();
    setChips([
      ...content.categories.map(cat => ({
        label: `${cat.icon} ${cat.label}`,
        onClick: () => showCategory(cat)
      }))
    ]);
  }

  function showCategory(cat) {
    const content = getAsstContent();
    addMsg(cat.icon + ' ' + cat.label, 'user');
    setChips([
      { label: content.backLabel, onClick: () => { addMsg(content.backLabel,'user'); showCategories(); } },
      ...cat.items.map(item => ({
        label: `${item.icon} ${item.label}`,
        onClick: () => handleItem(item)
      }))
    ]);
  }

  function handleItem(item) {
    const content = getAsstContent();
    addMsg(`${item.icon} ${item.label}`, 'user');
    setChips([]);

    // Navigation items with href
    if (item.href && !item.action) {
      window.location.href = item.href;
      return;
    }
    // Navigation items with special action
    if (item.action === 'settings') {
      close();
      if (typeof openSettingsModal === 'function') openSettingsModal();
      return;
    }
    if (item.action === 'tour') {
      close();
      setTimeout(() => window.startTour && window.startTour(true), 200);
      return;
    }
    if (item.action === 'analysis') {
      window.location.href = item.href + '#analysis';
      return;
    }

    // Wizard items
    if (item.wizard) {
      const wizards = getWizards();
      const wiz = wizards[item.wizard];
      if (wiz) {
        addMsg(`<b>${wiz.title}</b>`);
        wizardState = { wizard: item.wizard, step: 0, answers: {} };
        runWizardStep();
        return;
      }
    }

    // Plain answer
    const answer = content.answers[item.id];
    if (answer) {
      addMsg(answer);
      setChips([{ label: content.backLabel, onClick: () => { addMsg(content.backLabel,'user'); showCategories(); } }]);
    }
  }

  // ── Wizard engine ──────────────────────────────────────────────────────────
  function runWizardStep() {
    const wizards = getWizards();
    const wiz = wizards[wizardState.wizard];
    if (!wiz) return;
    const content = getAsstContent();

    let step = wizardState.step;
    while (step < wiz.steps.length) {
      const s = wiz.steps[step];
      if (s.skipIf && s.skipIf(wizardState.answers)) {
        step++;
        wizardState.step = step;
      } else {
        break;
      }
    }

    if (step >= wiz.steps.length) {
      addMsg(wiz.finish);
      wiz.action(wizardState.answers);
      wizardState = null;
      setTimeout(() => {
        setChips([{ label: content.backLabel, onClick: () => { addMsg(content.backLabel,'user'); showCategories(); } }]);
      }, 1300);
      return;
    }

    const stepDef = wiz.steps[step];
    addMsg(stepDef.question);

    if (stepDef.type === 'choice') {
      setChips(stepDef.choices.map(ch => ({
        label: ch.label,
        onClick: () => {
          addMsg(ch.label, 'user');
          wizardState.answers[stepDef.id] = ch.value;
          wizardState.step = step + 1;
          runWizardStep();
        }
      })));
    } else {
      addInput({
        type: stepDef.type,
        placeholder: stepDef.placeholder,
        min: stepDef.min,
        max: stepDef.max,
        default: stepDef.default,
        hint: stepDef.hint,
        onSubmit: (val) => {
          const display = val || (stepDef.default !== undefined ? String(stepDef.default) : '-');
          addMsg(display, 'user');
          wizardState.answers[stepDef.id] = val || (stepDef.default !== undefined ? String(stepDef.default) : '');
          wizardState.step = step + 1;
          runWizardStep();
        }
      });
      setChips([]);
    }
  }
} // end buildAsstUI

// Initialise the assistant on every page listed in ASST_PAGES
if (ASST_PAGES.includes(CURRENT_PAGE)) {
  buildAsstUI();
}
const TOUR_KEY = 'ht_tour_v1';

// Each step: { page, selector, titleKey, descKey, position }
// position: 'bottom' | 'top' | 'left' | 'right' | 'center'
const TOUR_STEPS = [
  // ── Tracker page ──────────────────────────────────────────────────
  { page: 'habits',    selector: '#sidebar .sb-nav',         position: 'right',  titleKey: 'tourTabsTitle',      descKey: 'tourTabsDesc' },
  { page: 'habits',    selector: '#habits-subtab-bar',       position: 'bottom', titleKey: 'tourSubtabTitle',    descKey: 'tourSubtabDesc' },
  { page: 'habits',    selector: '#tracker-section .tracker-scope-bar', position: 'bottom', titleKey: 'tourScopeTitle', descKey: 'tourScopeDesc' },
  { page: 'habits',    selector: '#monthly-view-wrap',       position: 'top',    titleKey: 'tourGridTitle',      descKey: 'tourGridDesc' },
  { page: 'habits',    selector: '#add-habit-row',           position: 'top',    titleKey: 'tourAddHabitTitle',  descKey: 'tourAddHabitDesc' },
  { page: 'habits',    selector: '#stats-row',               position: 'bottom', titleKey: 'tourStatsTitle',     descKey: 'tourStatsDesc' },
  // ── Timetable page ─────────────────────────────────────────────────
  { page: 'timetable', selector: '#tt-grid-wrap',            position: 'bottom', titleKey: 'tourTTGridTitle',    descKey: 'tourTTGridDesc' },
  { page: 'timetable', selector: '.tt-add-form',             position: 'top',    titleKey: 'tourTTFormTitle',    descKey: 'tourTTFormDesc' },
  { page: 'timetable', selector: '#gcal-import-btn',         position: 'bottom', titleKey: 'tourGcalTitle',      descKey: 'tourGcalDesc' },
  // ── Tasks page ─────────────────────────────────────────────────────
  { page: 'tasks',     selector: '.tasks-scope-bar',         position: 'bottom', titleKey: 'tourTaskScopeTitle', descKey: 'tourTaskScopeDesc' },
  { page: 'tasks',     selector: '#tasks-list',              position: 'bottom', titleKey: 'tourTaskListTitle',  descKey: 'tourTaskListDesc' },
  { page: 'tasks',     selector: '#add-task-form',           position: 'top',    titleKey: 'tourTaskFormTitle',  descKey: 'tourTaskFormDesc' },
  // ── Finance page ────────────────────────────────────────────────────
  { page: 'finance',   selector: '.fin-summary-cards',       position: 'bottom', titleKey: 'tourFinSummaryTitle',descKey: 'tourFinSummaryDesc' },
  { page: 'finance',   selector: '.fin-add-row, .fin-btn-row, #fin-add-expense-btn', position: 'top', titleKey: 'tourFinAddTitle', descKey: 'tourFinAddDesc' },
  // ── Shopping page ──────────────────────────────────────────────────
  { page: 'shopping',  selector: '#shop-lists',              position: 'bottom', titleKey: 'tourShopListTitle',  descKey: 'tourShopListDesc' },
  { page: 'shopping',  selector: '.add-task-form',           position: 'top',    titleKey: 'tourShopFormTitle',  descKey: 'tourShopFormDesc' },
  // ── Cycle page (female users only) ────────────────────────────────
  { page: 'cycle', female: true, selector: '.cycle-mode-toggle',    position: 'bottom', titleKey: 'tourCycleModeTitle',    descKey: 'tourCycleModeDesc' },
  { page: 'cycle', female: true, selector: '#pill-setup-card',      position: 'top',    titleKey: 'tourCycleSetupTitle',   descKey: 'tourCycleSetupDesc' },
  { page: 'cycle', female: true, selector: '#cycle-cal-card',       position: 'left',   titleKey: 'tourCycleCalTitle',     descKey: 'tourCycleCalDesc' },
  { page: 'cycle', female: true, selector: '#symptom-grid',         position: 'top',    titleKey: 'tourCycleSympTitle',    descKey: 'tourCycleSympDesc' },
  { page: 'cycle', female: true, selector: '#cycle-insights',       position: 'top',    titleKey: 'tourCycleInsightsTitle',descKey: 'tourCycleInsightsDesc' },
  // ── Pomodoro (any page) ────────────────────────────────────────────
  { page: null,        selector: '#sb-pomo-btn',             position: 'right',  titleKey: 'tourPomoTitle',      descKey: 'tourPomoDesc' },
  // ── Assistant FAB ──────────────────────────────────────────────────
  { page: null,        selector: '#asst-fab',                position: 'top',    titleKey: 'tourAsstTitle',      descKey: 'tourAsstDesc' },
];

const TOUR_I18N = {
  en: {
    tourNext: 'Next →', tourPrev: '← Back', tourSkip: 'Skip tour', tourFinish: '🎉 Let\'s go!',
    tourProgress: (n, t) => `Step ${n} of ${t}`,
    tourTabsTitle:       '🗂 Navigation Tabs',
    tourTabsDesc:        'Switch between all the major sections of Life Tracker using these tabs — Habit Tracker, Timetable, Tasks, Shopping, Cycle, and Finance.',
    tourSubtabTitle:     '📊 Habit Tracker & Analysis',
    tourSubtabDesc:      'Within the Habit Tracker you have two sub-views: the main tracker grid and the Analysis tab with detailed statistics and charts.',
    tourScopeTitle:      '☀️ Daily · Weekly · Monthly Views',
    tourScopeDesc:       'Switch how you see your habits. Daily gives you a simple checkbox per habit. Weekly shows the current 7-day window. Monthly shows the full calendar grid.',
    tourGridTitle:       '✅ The Habit Grid',
    tourGridDesc:        'Each row is a habit. Each column is a day. Click any cell to mark that day as completed — it lights up. Click again to unmark it.',
    tourAddHabitTitle:   '➕ Add a Habit',
    tourAddHabitDesc:    'Type a habit name here and press Enter or click + Add. Your new habit appears instantly at the top of the grid.',
    tourStatsTitle:      '📈 Stats at a Glance',
    tourStatsDesc:       'These cards always show your daily progress: total habits, how many you\'ve completed today, your completion percentage, and task count.',
    tourTTGridTitle:     '🗓 Your Weekly Timetable',
    tourTTGridDesc:      'A visual grid of your week. Time runs down, days across. Events appear as colored blocks — each category has its own colour.',
    tourTTFormTitle:     '➕ Add an Event',
    tourTTFormDesc:      'Fill in the event title, day, start & end time, and category, then click + Add Event. You can also click any existing event in the grid to edit or delete it.',
    tourGcalTitle:       '📅 Import from Google Calendar',
    tourGcalDesc:        'Already use Google Calendar? Export your calendar as an .ics file and import it here — all your events appear in the timetable instantly.',
    tourTaskScopeTitle:  '📋 Task Scopes',
    tourTaskScopeDesc:   'Organise tasks by time horizon: Daily (today only), Weekly (this week), Monthly (this month), or Yearly (big-picture goals). Each scope is a separate list.',
    tourTaskListTitle:   '✅ Your Task List',
    tourTaskListDesc:    'Tasks are colour-coded by priority: 🔴 High, ⚡ Medium, 🔵 Low. Tap the checkbox to complete, the ✎ icon to edit, or the 🗑 icon to delete.',
    tourTaskFormTitle:   '➕ Add a Task',
    tourTaskFormDesc:    'Fill in the name, choose priority and optional due date, then click + Add Task. Due dates glow red when overdue.',
    tourFinSummaryTitle: '💰 Finance Summary',
    tourFinSummaryDesc:  'These cards show your total income, total expenses, and current balance for the selected month. Use the ‹ › arrows in the header to browse months.',
    tourFinAddTitle:     '➕ Log Income & Expenses',
    tourFinAddDesc:      'Add income or expense entries here. Each entry has a description, amount, category, and date. Everything is grouped by category in the breakdown chart below.',
    tourShopListTitle:   '🛒 Shopping Lists',
    tourShopListDesc:    'Items are grouped by category into cards. Tap any item to check it off as purchased. Use the filter buttons at the top to focus on one category.',
    tourShopFormTitle:   '➕ Add a Shopping Item',
    tourShopFormDesc:    'Enter the item name, quantity, and category then click + Add Item. Use 🗑 Clear Checked to remove everything you\'ve already bought.',
    tourPomoTitle:       '⏱ Pomodoro Timer',
    tourPomoDesc:        'The Pomodoro timer is available on every page. Click it to open a focus timer: 25 min work → 5 min break → repeat. Press Space to start, Esc to close.',
    tourAsstTitle:       '💬 Your Assistant',
    tourAsstDesc:        'This is your Life Tracker Assistant — available on every page. Ask it how features work, use it to add habits, tasks, or events, or get tips. Click it anytime!',
    tourCycleModeTitle:  '🌸 Natural Cycle & Pill Mode',
    tourCycleModeDesc:   'Choose between two tracking modes: Natural Cycle (track your period and ovulation) or Birth Control Pill (track your daily pill pack with active and placebo pills).',
    tourCycleSetupTitle: '📅 Log Your Cycle Start',
    tourCycleSetupDesc:  'Enter the start date of your last period, how long your period lasts, and your average cycle length. The app will calculate your phases and predict your next period automatically.',
    tourCycleCalTitle:   '🗓 Cycle Calendar',
    tourCycleCalDesc:    'Each day is colour-coded by phase: 🔴 Period · 🟠 Fertile window · 🟡 Ovulation · 🟣 PMS/Luteal. Hover over any day to see what phase you are in.',
    tourCycleSympTitle:  '💊 Log Symptoms & Mood',
    tourCycleSympDesc:   'Tap any symptom you are experiencing today — cramps, fatigue, cravings, and more. Then pick a mood emoji and add a personal note. Hit 💾 Save Today to record it.',
    tourCycleInsightsTitle: '📊 Cycle Insights',
    tourCycleInsightsDesc:  'Your personal cycle stats live here: current cycle day, days until next period, estimated ovulation date, and your full cycle history. Everything updates automatically.',
  },
  hu: {
    tourNext: 'Következő →', tourPrev: '← Vissza', tourSkip: 'Átugorja', tourFinish: '🎉 Kezdjük!',
    tourProgress: (n, t) => `${n}. lépés / ${t}`,
    tourTabsTitle:       '🗂 Navigációs fülek',
    tourTabsDesc:        'A Life Tracker főbb részei közötti váltáshoz használd ezeket a füleket: Szokáskövető, Órarend, Feladatok, Bevásárlólista, Ciklus, Pénzügy.',
    tourSubtabTitle:     '📊 Szokáskövető & Elemzés',
    tourSubtabDesc:      'A Szokáskövetőn belül két nézet áll rendelkezésre: a fő nyomkövetési rács, és az Elemzés fül részletes statisztikákkal és diagramokkal.',
    tourScopeTitle:      '☀️ Napi · Heti · Havi nézetek',
    tourScopeDesc:       'Válaszd meg, hogyan szeretnéd látni a szokásaidat. Napi nézet egyszerű jelölőnégyzeteket mutat. Heti a jelenlegi 7 napot. Havi a teljes naptárrácsot.',
    tourGridTitle:       '✅ A szokásrács',
    tourGridDesc:        'Minden sor egy szokás, minden oszlop egy nap. Kattints egy cellára, hogy aznapi elvégzettként jelöld meg — kiszínesedik. Újra kattintva megszüntetheted.',
    tourAddHabitTitle:   '➕ Szokás hozzáadása',
    tourAddHabitDesc:    'Írd be a szokás nevét ide, és nyomd meg az Enter billentyűt vagy kattints a + Hozzáad gombra. Az új szokás azonnal megjelenik a rács tetején.',
    tourStatsTitle:      '📈 Gyors statisztikák',
    tourStatsDesc:       'Ezek a kártyák mindig mutatják a napi haladást: összes szokás, hány teljesült ma, teljesítési arány, és a feladatok száma.',
    tourTTGridTitle:     '🗓 Heti órarend',
    tourTTGridDesc:      'A hét vizuális rácsában az idő lefelé halad, a napok vízszintesen. Az eseményeket színes blokkok jelölik — minden kategóriának saját színe van.',
    tourTTFormTitle:     '➕ Esemény hozzáadása',
    tourTTFormDesc:      'Add meg az esemény nevét, napját, kezdési és befejezési idejét, majd kattints a + Esemény gombra. Meglévő eseményre kattintva szerkesztheted vagy törölheted.',
    tourGcalTitle:       '📅 Importálás Google Naptárból',
    tourGcalDesc:        'Már használsz Google Naptárt? Exportáld .ics fájlként, majd importáld ide — az összes esemény azonnal megjelenik az órarendben.',
    tourTaskScopeTitle:  '📋 Feladat hatókörök',
    tourTaskScopeDesc:   'Rendezd a feladatokat időhorizont szerint: Napi (csak ma), Heti (ezen a héten), Havi (ebben a hónapban), Éves (nagy célok). Minden hatókör külön lista.',
    tourTaskListTitle:   '✅ Feladatlista',
    tourTaskListDesc:    'A feladatok prioritás szerint színkódoltak: 🔴 Magas, ⚡ Közepes, 🔵 Alacsony. Kattints a jelölőre a kész jelöléshez, ✎-re a szerkesztéshez, 🗑-ra a törléshez.',
    tourTaskFormTitle:   '➕ Feladat hozzáadása',
    tourTaskFormDesc:    'Add meg a nevet, válassz prioritást és opcionális határidőt, majd kattints a + Feladat hozzáadása gombra. A lejárt határidők pirosan jelöltek.',
    tourFinSummaryTitle: '💰 Pénzügyi összesítő',
    tourFinSummaryDesc:  'Ezek a kártyák mutatják a kiválasztott hónap összes bevételét, kiadását és egyenlegét. Hónapok között a fejlécben lévő ‹ › nyilakkal navigálhatsz.',
    tourFinAddTitle:     '➕ Bevételek & kiadások rögzítése',
    tourFinAddDesc:      'Ide viheted fel a bevételeket és kiadásokat. Minden bejegyzéshez megadható a leírás, összeg, kategória és dátum. Az összesítő diagram kategóriánként csoportosítja ezeket.',
    tourShopListTitle:   '🛒 Bevásárlólisták',
    tourShopListDesc:    'A termékek kategóriánként csoportosított kártyákon jelennek meg. Kattints egy elemre, hogy megvettként jelöld. A szűrőgombokkal egy kategóriára fókuszálhatsz.',
    tourShopFormTitle:   '➕ Termék hozzáadása',
    tourShopFormDesc:    'Add meg a termék nevét, mennyiségét és kategóriáját, majd kattints a + Elem hozzáadása gombra. A 🗑 Teljesítettek törlése gombbal eltávolíthatod a megvett elemeket.',
    tourPomoTitle:       '⏱ Pomodoro időzítő',
    tourPomoDesc:        'A Pomodoro időzítő minden oldalon elérhető. Kattints rá egy fókuszidőzítő megnyitásához: 25 perc munka → 5 perc szünet → ismétlés. Space = indítás, Esc = bezárás.',
    tourAsstTitle:       '💬 A segéded',
    tourAsstDesc:        'Ez a Life Tracker Segéded — minden oldalon elérhető. Kérdezz tőle a funkciókkal kapcsolatban, add hozzá szokásaidat, feladataidat vagy eseményeidet, és kérj tippeket. Kattints bármikor!',
    tourCycleModeTitle:  '🌸 Természetes ciklus & Fogamzásgátló mód',
    tourCycleModeDesc:   'Két követési mód közül választhatsz: Természetes ciklus (menstruáció és ovuláció követése) vagy Fogamzásgátló tabletta (napi tablettaszedés követése aktív és placebo tablettákkal).',
    tourCycleSetupTitle: '📅 Ciklus beállítása',
    tourCycleSetupDesc:  'Add meg az utolsó menstruációd kezdő dátumát, a menstruáció hosszát és az átlagos ciklushosszt. Az alkalmazás automatikusan kiszámolja a fázisokat és a következő menstruáció várható idejét.',
    tourCycleCalTitle:   '🗓 Ciklus naptár',
    tourCycleCalDesc:    'Minden nap szín szerint jelzi a fázist: 🔴 Menstruáció · 🟠 Termékeny ablak · 🟡 Ovuláció · 🟣 PMS/Luteális. Vidd az egeret egy napra, hogy lásd, melyik fázisban vagy.',
    tourCycleSympTitle:  '💊 Tünetek & Hangulat naplózása',
    tourCycleSympDesc:   'Jelöld be a mai tüneteidet — görcsök, fáradtság, sóvárgás és egyebek. Ezután válassz hangulat emojit és adj hozzá személyes megjegyzést. Nyomd meg a 💾 Mentés gombra.',
    tourCycleInsightsTitle: '📊 Ciklus statisztikák',
    tourCycleInsightsDesc:  'Személyes ciklus adataid: aktuális ciklusnap, napok a következő menstruációig, becsült ovulációs dátum és teljes ciklustörténet. Minden automatikusan frissül.',
  },
  de: {
    tourNext: 'Weiter →', tourPrev: '← Zurück', tourSkip: 'Tour überspringen', tourFinish: '🎉 Los geht\'s!',
    tourProgress: (n, t) => `Schritt ${n} von ${t}`,
    tourTabsTitle:       '🗂 Navigations-Tabs',
    tourTabsDesc:        'Wechsle mit diesen Tabs zwischen den Hauptbereichen von Life Tracker: Gewohnheits-Tracker, Stundenplan, Aufgaben, Einkaufsliste, Zyklus und Finanzen.',
    tourSubtabTitle:     '📊 Tracker & Analyse',
    tourSubtabDesc:      'Im Gewohnheits-Tracker gibt es zwei Unteransichten: das Tracking-Raster und den Analyse-Tab mit detaillierten Statistiken und Diagrammen.',
    tourScopeTitle:      '☀️ Täglich · Wöchentlich · Monatlich',
    tourScopeDesc:       'Wähle, wie du deine Gewohnheiten siehst. Täglich zeigt einfache Checkboxen. Wöchentlich das aktuelle 7-Tage-Fenster. Monatlich das vollständige Kalenderraster.',
    tourGridTitle:       '✅ Das Gewohnheitsraster',
    tourGridDesc:        'Jede Zeile ist eine Gewohnheit, jede Spalte ein Tag. Klicke auf eine Zelle, um diesen Tag als erledigt zu markieren — sie leuchtet auf. Erneut klicken zum Aufheben.',
    tourAddHabitTitle:   '➕ Gewohnheit hinzufügen',
    tourAddHabitDesc:    'Gib einen Namen ein und drücke Enter oder klicke + Hinzufügen. Die neue Gewohnheit erscheint sofort oben im Raster.',
    tourStatsTitle:      '📈 Statistik-Übersicht',
    tourStatsDesc:       'Diese Karten zeigen deinen täglichen Fortschritt: Gesamtanzahl der Gewohnheiten, heute erledigte, Abschlussquote und Aufgabenanzahl.',
    tourTTGridTitle:     '🗓 Wöchentlicher Stundenplan',
    tourTTGridDesc:      'Ein visuelles Wochenraster. Die Zeit verläuft nach unten, die Tage quer. Ereignisse erscheinen als farbige Blöcke — jede Kategorie hat ihre eigene Farbe.',
    tourTTFormTitle:     '➕ Ereignis hinzufügen',
    tourTTFormDesc:      'Titel, Tag, Start- und Endzeit sowie Kategorie ausfüllen, dann + Ereignis hinzufügen klicken. Auf ein bestehendes Ereignis klicken, um es zu bearbeiten oder zu löschen.',
    tourGcalTitle:       '📅 Import aus Google Calendar',
    tourGcalDesc:        'Nutzt du bereits Google Calendar? Exportiere deinen Kalender als .ics-Datei und importiere sie hier — alle Ereignisse erscheinen sofort im Stundenplan.',
    tourTaskScopeTitle:  '📋 Aufgaben-Bereiche',
    tourTaskScopeDesc:   'Organisiere Aufgaben nach Zeithorizont: Täglich, Wöchentlich, Monatlich oder Jährlich (große Ziele). Jeder Bereich ist eine eigene Liste.',
    tourTaskListTitle:   '✅ Deine Aufgabenliste',
    tourTaskListDesc:    'Aufgaben sind nach Priorität farbcodiert: 🔴 Hoch, ⚡ Mittel, 🔵 Niedrig. Checkbox für erledigt, ✎ zum Bearbeiten, 🗑 zum Löschen.',
    tourTaskFormTitle:   '➕ Aufgabe hinzufügen',
    tourTaskFormDesc:    'Name eingeben, Priorität und optionales Fälligkeitsdatum wählen, dann + Aufgabe hinzufügen klicken. Überfällige Aufgaben leuchten rot.',
    tourFinSummaryTitle: '💰 Finanz-Übersicht',
    tourFinSummaryDesc:  'Diese Karten zeigen Gesamteinnahmen, Gesamtausgaben und aktuelles Saldo für den gewählten Monat. Mit den ‹ › Pfeilen in der Kopfzeile zwischen Monaten wechseln.',
    tourFinAddTitle:     '➕ Einnahmen & Ausgaben erfassen',
    tourFinAddDesc:      'Hier Einnahmen und Ausgaben hinzufügen. Jeder Eintrag hat Beschreibung, Betrag, Kategorie und Datum. Im Aufschlussdiagramm wird alles nach Kategorie gruppiert.',
    tourShopListTitle:   '🛒 Einkaufslisten',
    tourShopListDesc:    'Artikel sind nach Kategorie in Karten gruppiert. Artikel antippen, um sie als gekauft abzuhaken. Filterknöpfe oben zum Fokussieren auf eine Kategorie.',
    tourShopFormTitle:   '➕ Artikel hinzufügen',
    tourShopFormDesc:    'Name, Menge und Kategorie eingeben, dann + Artikel hinzufügen klicken. Mit 🗑 Erledigte löschen bereits gekaufte Artikel entfernen.',
    tourPomoTitle:       '⏱ Pomodoro-Timer',
    tourPomoDesc:        'Der Pomodoro-Timer ist auf jeder Seite verfügbar. Klicken, um einen Fokus-Timer zu öffnen: 25 Min. Arbeit → 5 Min. Pause → wiederholen. Leertaste = Start, Esc = Schließen.',
    tourAsstTitle:       '💬 Dein Assistent',
    tourAsstDesc:        'Dies ist dein Life Tracker Assistent — auf jeder Seite verfügbar. Frag ihn, wie Funktionen funktionieren, füge Gewohnheiten, Aufgaben oder Ereignisse hinzu oder lass dir Tipps geben.',
    tourCycleModeTitle:  '🌸 Natürlicher Zyklus & Pillen-Modus',
    tourCycleModeDesc:   'Wähle zwischen zwei Tracking-Modi: Natürlicher Zyklus (Periode und Eisprung verfolgen) oder Antibabypille (tägliche Pilleneinnahme mit aktiven und Placebopillen verfolgen).',
    tourCycleSetupTitle: '📅 Zyklusbeginn eintragen',
    tourCycleSetupDesc:  'Gib das Startdatum deiner letzten Periode, die Periodendauer und deine durchschnittliche Zykluslänge ein. Die App berechnet automatisch deine Phasen und sagt die nächste Periode voraus.',
    tourCycleCalTitle:   '🗓 Zyklus-Kalender',
    tourCycleCalDesc:    'Jeder Tag ist nach Phase farbcodiert: 🔴 Periode · 🟠 Fruchtbares Fenster · 🟡 Eisprung · 🟣 PMS/Lutealphase. Fahre mit der Maus über einen Tag, um die Phase zu sehen.',
    tourCycleSympTitle:  '💊 Symptome & Stimmung erfassen',
    tourCycleSympDesc:   'Tippe auf aktuelle Symptome — Krämpfe, Müdigkeit, Heißhunger und mehr. Wähle dann ein Stimmungs-Emoji und füge eine persönliche Notiz hinzu. Mit 💾 Heute speichern bestätigen.',
    tourCycleInsightsTitle: '📊 Zyklus-Statistiken',
    tourCycleInsightsDesc:  'Deine persönlichen Zyklusdaten: aktueller Zyklustag, Tage bis zur nächsten Periode, geschätztes Eisprungdatum und vollständige Zyklushistorie. Alles wird automatisch aktualisiert.',
  },
  es: {
    tourNext: 'Siguiente →', tourPrev: '← Atrás', tourSkip: 'Saltar tour', tourFinish: '🎉 ¡Vamos!',
    tourProgress: (n, t) => `Paso ${n} de ${t}`,
    tourTabsTitle:       '🗂 Pestañas de navegación',
    tourTabsDesc:        'Usa estas pestañas para moverte entre las secciones principales de Life Tracker: Seguimiento de hábitos, Horario, Tareas, Lista de compras, Ciclo y Finanzas.',
    tourSubtabTitle:     '📊 Tracker y Análisis',
    tourSubtabDesc:      'Dentro del Seguimiento de hábitos tienes dos sub-vistas: la cuadrícula principal y la pestaña Análisis con estadísticas detalladas y gráficos.',
    tourScopeTitle:      '☀️ Vistas Diaria · Semanal · Mensual',
    tourScopeDesc:       'Elige cómo ver tus hábitos. Diario muestra casillas simples. Semanal muestra los 7 días actuales. Mensual muestra la cuadrícula completa del calendario.',
    tourGridTitle:       '✅ La cuadrícula de hábitos',
    tourGridDesc:        'Cada fila es un hábito, cada columna es un día. Haz clic en una celda para marcarla como completada — se ilumina. Haz clic de nuevo para desmarcarla.',
    tourAddHabitTitle:   '➕ Añadir un hábito',
    tourAddHabitDesc:    'Escribe el nombre del hábito aquí y presiona Enter o haz clic en + Añadir. Tu nuevo hábito aparece al instante en la parte superior de la cuadrícula.',
    tourStatsTitle:      '📈 Estadísticas rápidas',
    tourStatsDesc:       'Estas tarjetas siempre muestran tu progreso diario: total de hábitos, cuántos has completado hoy, tu porcentaje de completado y recuento de tareas.',
    tourTTGridTitle:     '🗓 Tu horario semanal',
    tourTTGridDesc:      'Una cuadrícula visual de tu semana. El tiempo baja, los días van de izquierda a derecha. Los eventos aparecen como bloques de colores según su categoría.',
    tourTTFormTitle:     '➕ Añadir un evento',
    tourTTFormDesc:      'Rellena el título, día, hora de inicio y fin, y categoría, luego haz clic en + Añadir evento. Haz clic en cualquier evento existente para editarlo o eliminarlo.',
    tourGcalTitle:       '📅 Importar de Google Calendar',
    tourGcalDesc:        '¿Ya usas Google Calendar? Exporta tu calendario como .ics e impórtalo aquí — todos tus eventos aparecen instantáneamente en el horario.',
    tourTaskScopeTitle:  '📋 Alcances de tareas',
    tourTaskScopeDesc:   'Organiza tareas por horizonte temporal: Diario (solo hoy), Semanal (esta semana), Mensual (este mes) o Anual (grandes metas). Cada alcance es una lista separada.',
    tourTaskListTitle:   '✅ Tu lista de tareas',
    tourTaskListDesc:    'Las tareas tienen código de color por prioridad: 🔴 Alta, ⚡ Media, 🔵 Baja. Casilla para completar, ✎ para editar, 🗑 para eliminar.',
    tourTaskFormTitle:   '➕ Añadir una tarea',
    tourTaskFormDesc:    'Rellena el nombre, elige prioridad y fecha límite opcional, luego haz clic en + Añadir tarea. Las fechas vencidas se iluminan en rojo.',
    tourFinSummaryTitle: '💰 Resumen financiero',
    tourFinSummaryDesc:  'Estas tarjetas muestran tus ingresos totales, gastos totales y saldo actual del mes seleccionado. Usa las flechas ‹ › del encabezado para cambiar de mes.',
    tourFinAddTitle:     '➕ Registrar ingresos y gastos',
    tourFinAddDesc:      'Añade aquí entradas de ingresos o gastos. Cada entrada tiene descripción, importe, categoría y fecha. Todo se agrupa por categoría en el gráfico de desglose.',
    tourShopListTitle:   '🛒 Listas de compras',
    tourShopListDesc:    'Los artículos están agrupados en tarjetas por categoría. Toca un artículo para marcarlo como comprado. Usa los filtros de arriba para enfocarte en una categoría.',
    tourShopFormTitle:   '➕ Añadir un artículo',
    tourShopFormDesc:    'Introduce el nombre, cantidad y categoría y haz clic en + Añadir artículo. Usa 🗑 Limpiar marcados para eliminar todo lo que ya hayas comprado.',
    tourPomoTitle:       '⏱ Temporizador Pomodoro',
    tourPomoDesc:        'El temporizador Pomodoro está disponible en todas las páginas. Haz clic para abrir un temporizador de enfoque: 25 min trabajo → 5 min descanso → repetir. Espacio = iniciar, Esc = cerrar.',
    tourAsstTitle:       '💬 Tu asistente',
    tourAsstDesc:        'Este es tu Asistente de Life Tracker — disponible en cada página. Pregúntale cómo funcionan las funciones, úsalo para añadir hábitos, tareas o eventos, u obtén consejos.',
    tourCycleModeTitle:  '🌸 Ciclo Natural y Modo Pastilla',
    tourCycleModeDesc:   'Elige entre dos modos de seguimiento: Ciclo Natural (seguimiento de menstruación y ovulación) o Pastilla Anticonceptiva (seguimiento diario del blíster con pastillas activas y placebo).',
    tourCycleSetupTitle: '📅 Registrar el inicio del ciclo',
    tourCycleSetupDesc:  'Introduce la fecha de inicio de tu último período, cuánto dura la menstruación y la duración media de tu ciclo. La app calculará tus fases y predecirá el próximo período automáticamente.',
    tourCycleCalTitle:   '🗓 Calendario del ciclo',
    tourCycleCalDesc:    'Cada día está codificado por color según la fase: 🔴 Período · 🟠 Ventana fértil · 🟡 Ovulación · 🟣 SPM/Lútea. Pasa el cursor sobre cualquier día para ver en qué fase estás.',
    tourCycleSympTitle:  '💊 Registrar síntomas y estado de ánimo',
    tourCycleSympDesc:   'Toca los síntomas que estés experimentando hoy — calambres, fatiga, antojos y más. Luego elige un emoji de estado de ánimo y añade una nota personal. Pulsa 💾 Guardar hoy.',
    tourCycleInsightsTitle: '📊 Estadísticas del ciclo',
    tourCycleInsightsDesc:  'Tus estadísticas personales: día actual del ciclo, días hasta el próximo período, fecha estimada de ovulación e historial completo del ciclo. Todo se actualiza automáticamente.',
  },
  fr: {
    tourNext: 'Suivant →', tourPrev: '← Précédent', tourSkip: 'Passer la visite', tourFinish: '🎉 C\'est parti !',
    tourProgress: (n, t) => `Étape ${n} sur ${t}`,
    tourTabsTitle:       '🗂 Onglets de navigation',
    tourTabsDesc:        'Utilisez ces onglets pour passer entre les sections principales de Life Tracker : Suivi des habitudes, Emploi du temps, Tâches, Liste de courses, Cycle et Finances.',
    tourSubtabTitle:     '📊 Tracker & Analyse',
    tourSubtabDesc:      'Dans le Suivi des habitudes, vous avez deux sous-vues : la grille de suivi principale et l\'onglet Analyse avec des statistiques détaillées et des graphiques.',
    tourScopeTitle:      '☀️ Vues Quotidienne · Hebdomadaire · Mensuelle',
    tourScopeDesc:       'Choisissez comment voir vos habitudes. Quotidien affiche des cases simples. Hebdomadaire montre les 7 jours actuels. Mensuel affiche la grille complète du calendrier.',
    tourGridTitle:       '✅ La grille des habitudes',
    tourGridDesc:        'Chaque ligne est une habitude, chaque colonne un jour. Cliquez sur une cellule pour la marquer comme complète — elle s\'illumine. Cliquez à nouveau pour la démarquer.',
    tourAddHabitTitle:   '➕ Ajouter une habitude',
    tourAddHabitDesc:    'Saisissez le nom d\'une habitude ici et appuyez sur Entrée ou cliquez sur + Ajouter. Votre nouvelle habitude apparaît instantanément en haut de la grille.',
    tourStatsTitle:      '📈 Statistiques rapides',
    tourStatsDesc:       'Ces cartes affichent toujours votre progression quotidienne : total des habitudes, combien vous en avez complété aujourd\'hui, votre pourcentage de réalisation et le nombre de tâches.',
    tourTTGridTitle:     '🗓 Votre emploi du temps hebdomadaire',
    tourTTGridDesc:      'Une grille visuelle de votre semaine. Le temps défile vers le bas, les jours s\'étendent horizontalement. Les événements apparaissent comme des blocs colorés par catégorie.',
    tourTTFormTitle:     '➕ Ajouter un événement',
    tourTTFormDesc:      'Remplissez le titre, le jour, l\'heure de début et de fin, puis cliquez sur + Ajouter un événement. Cliquez sur un événement existant pour le modifier ou le supprimer.',
    tourGcalTitle:       '📅 Importer depuis Google Calendar',
    tourGcalDesc:        'Vous utilisez déjà Google Calendar ? Exportez votre agenda en .ics et importez-le ici — tous vos événements apparaissent instantanément dans l\'emploi du temps.',
    tourTaskScopeTitle:  '📋 Portées des tâches',
    tourTaskScopeDesc:   'Organisez les tâches par horizon temporel : Quotidien, Hebdomadaire, Mensuel ou Annuel (grands objectifs). Chaque portée est une liste séparée.',
    tourTaskListTitle:   '✅ Votre liste de tâches',
    tourTaskListDesc:    'Les tâches sont codées par couleur selon la priorité : 🔴 Élevée, ⚡ Moyenne, 🔵 Faible. Case à cocher pour terminer, ✎ pour modifier, 🗑 pour supprimer.',
    tourTaskFormTitle:   '➕ Ajouter une tâche',
    tourTaskFormDesc:    'Remplissez le nom, choisissez la priorité et une date limite facultative, puis cliquez sur + Ajouter une tâche. Les échéances dépassées s\'illuminent en rouge.',
    tourFinSummaryTitle: '💰 Résumé financier',
    tourFinSummaryDesc:  'Ces cartes affichent vos revenus totaux, dépenses totales et solde actuel pour le mois sélectionné. Utilisez les flèches ‹ › dans l\'en-tête pour changer de mois.',
    tourFinAddTitle:     '➕ Enregistrer revenus & dépenses',
    tourFinAddDesc:      'Ajoutez ici des entrées de revenus ou de dépenses. Chaque entrée a une description, un montant, une catégorie et une date. Tout est regroupé par catégorie dans le graphique.',
    tourShopListTitle:   '🛒 Listes de courses',
    tourShopListDesc:    'Les articles sont regroupés en cartes par catégorie. Touchez un article pour le cocher comme acheté. Utilisez les filtres en haut pour vous concentrer sur une catégorie.',
    tourShopFormTitle:   '➕ Ajouter un article',
    tourShopFormDesc:    'Saisissez le nom, la quantité et la catégorie puis cliquez sur + Ajouter un article. Utilisez 🗑 Effacer cochés pour supprimer tout ce que vous avez déjà acheté.',
    tourPomoTitle:       '⏱ Minuteur Pomodoro',
    tourPomoDesc:        'Le minuteur Pomodoro est disponible sur chaque page. Cliquez pour ouvrir un minuteur de concentration : 25 min travail → 5 min pause → répéter. Espace = démarrer, Échap = fermer.',
    tourAsstTitle:       '💬 Votre assistant',
    tourAsstDesc:        'Voici votre Assistant Life Tracker — disponible sur chaque page. Demandez-lui comment fonctionnent les fonctionnalités, ajoutez des habitudes, tâches ou événements, ou obtenez des conseils.',
    tourCycleModeTitle:  '🌸 Cycle Naturel & Mode Pilule',
    tourCycleModeDesc:   'Choisissez entre deux modes de suivi : Cycle Naturel (suivre les règles et l\'ovulation) ou Pilule Contraceptive (suivi quotidien de la plaquette avec pilules actives et placebo).',
    tourCycleSetupTitle: '📅 Enregistrer le début du cycle',
    tourCycleSetupDesc:  'Entrez la date de début de vos dernières règles, la durée des règles et la longueur moyenne de votre cycle. L\'app calculera vos phases et prédira les prochaines règles automatiquement.',
    tourCycleCalTitle:   '🗓 Calendrier du cycle',
    tourCycleCalDesc:    'Chaque jour est coloré selon la phase : 🔴 Règles · 🟠 Fenêtre fertile · 🟡 Ovulation · 🟣 SPM/Phase lutéale. Survolez n\'importe quel jour pour voir dans quelle phase vous êtes.',
    tourCycleSympTitle:  '💊 Journaliser symptômes & humeur',
    tourCycleSympDesc:   'Touchez les symptômes que vous ressentez aujourd\'hui — crampes, fatigue, envies et plus encore. Choisissez ensuite un emoji d\'humeur et ajoutez une note personnelle. Cliquez sur 💾 Enregistrer.',
    tourCycleInsightsTitle: '📊 Statistiques du cycle',
    tourCycleInsightsDesc:  'Vos statistiques personnelles : jour actuel du cycle, jours avant les prochaines règles, date d\'ovulation estimée et historique complet du cycle. Tout se met à jour automatiquement.',
  },
};

// Pages that have a tour, in order. Cycle page added dynamically for female users.
const TOUR_PAGES_BASE = ['habits', 'timetable', 'tasks', 'finance', 'shopping'];
const TOUR_PAGES_FEMALE = ['habits', 'timetable', 'tasks', 'finance', 'shopping', 'cycle'];

function getActiveTourPages() {
  return isCycleUser() && userPrefs.gender === 'female' ? TOUR_PAGES_FEMALE : TOUR_PAGES_BASE;
}

function getActiveTourSteps() {
  const isFemale = isCycleUser() && userPrefs.gender === 'female';
  return TOUR_STEPS.filter(s => !s.female || isFemale);
}

function getTourStepsForPage(page) {
  return getActiveTourSteps().filter(s => s.page === page || s.page === null);
}

function getTourLang() {
  return (typeof state !== 'undefined' && state.lang) || 'en';
}

function getTourTr() {
  const lang = getTourLang();
  return TOUR_I18N[lang] || TOUR_I18N.en;
}

// Save/load tour state
function loadTourState() {
  try { return JSON.parse(localStorage.getItem(TOUR_KEY) || 'null'); } catch(e) { return null; }
}
function saveTourState(s) {
  try { localStorage.setItem(TOUR_KEY, JSON.stringify(s)); } catch(e) {}
}
function clearTourState() {
  try { localStorage.removeItem(TOUR_KEY); } catch(e) {}
}

// Compute which global tour step we're on across all pages
function buildGlobalStepMap() {
  const map = [];
  getActiveTourSteps().forEach((step, idx) => {
    map.push({ globalIdx: idx, step });
  });
  return map;
}

function countTotalSteps() {
  return getActiveTourSteps().length;
}

// Start tour: either fresh (step 0) or resuming from localStorage
// Exposed globally so finishOnboarding, settings modal and settings page can call it
window.startTour = function startTour(fromBeginning) {
  let tourState = fromBeginning ? null : loadTourState();

  if (!tourState || fromBeginning) {
    tourState = { globalStep: 0, totalSteps: getActiveTourSteps().length };
    saveTourState(tourState);
    // If we're not on habits page, navigate there
    if (CURRENT_PAGE !== 'habits') {
      window.location.href = 'tracker.html?tour=1';
      return;
    }
  }

  // Close assistant panel if open
  const panel = document.getElementById('asst-panel');
  if (panel) panel.style.display = 'none';
  const backdrop = document.getElementById('asst-backdrop');
  if (backdrop) backdrop.style.display = 'none';
  const fab = document.getElementById('asst-fab');
  if (fab) { fab.innerHTML = '💬'; fab.style.background = 'linear-gradient(135deg,#4f6ef7,#e05a9a)'; }

  showTourStep(tourState.globalStep);
}

function showTourStep(globalStep) {
  // Clean up any existing tour UI
  document.getElementById('tour-overlay')?.remove();
  document.getElementById('tour-tooltip')?.remove();
  document.getElementById('tour-highlight-box')?.remove();

  const tr = getTourTr();
  const activeSteps = getActiveTourSteps();
  const total = activeSteps.length;

  if (globalStep >= total) {
    clearTourState();
    showTourFinale();
    return;
  }

  const stepDef = activeSteps[globalStep];

  // If this step belongs to a different page, navigate there
  if (stepDef.page && stepDef.page !== CURRENT_PAGE) {
    saveTourState({ globalStep, totalSteps: total });
    // Map page name to file
    const pageMap = { habits: 'tracker.html', timetable: 'timetable.html', tasks: 'tasks.html', finance: 'finance.html', shopping: 'shopping.html', cycle: 'cycle.html', analysis: 'tracker.html', calories: 'calories.html', workout: 'workout.html', recipes: 'recipes.html' };
    window.location.href = (pageMap[stepDef.page] || 'tracker.html') + '?tour=1';
    return;
  }

  saveTourState({ globalStep, totalSteps: total });

  // Find element
  let targetEl = null;
  if (stepDef.selector) {
    try { targetEl = document.querySelector(stepDef.selector); } catch(e) {}
  }

  renderTourUI(globalStep, total, stepDef, targetEl, tr);
}

function renderTourUI(globalStep, total, stepDef, targetEl, tr) {
  const isCycleStep = stepDef.page === 'cycle';
  const accentColor = isCycleStep ? '#e05a9a' : '#4f6ef7';
  const accentDark  = isCycleStep ? '#c84080' : '#3a5ce0';
  const accentGlow  = isCycleStep ? 'rgba(224,90,154,.45)' : 'rgba(79,110,247,.45)';
  const accentBorder= isCycleStep ? 'rgba(224,90,154,.2)'  : 'rgba(79,110,247,.2)';
  const stepIcon    = isCycleStep ? '🌸' : '🗺️';

  // Dark overlay
  const overlay = document.createElement('div');
  overlay.id = 'tour-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9100;pointer-events:all;';

  // Highlight box (cut-out effect via box-shadow)
  const hlBox = document.createElement('div');
  hlBox.id = 'tour-highlight-box';
  hlBox.style.cssText = `
    position:fixed;z-index:9101;pointer-events:none;
    border-radius:12px;
    box-shadow:0 0 0 9999px rgba(0,0,0,.68);
    border:2.5px solid ${accentColor};
    transition:all .35s cubic-bezier(.4,0,.2,1);
  `;

  // Tooltip
  const tip = document.createElement('div');
  tip.id = 'tour-tooltip';
  tip.style.cssText = `
    position:fixed;z-index:9102;
    width:min(460px,92vw);
    box-sizing:border-box;
    background:var(--surface);
    border:1.5px solid var(--border);
    border-radius:20px;
    padding:0;
    box-shadow:0 24px 70px rgba(0,0,0,.6),0 0 0 1px ${accentBorder};
    font-family:inherit;
    animation:scalePop .28s cubic-bezier(.4,0,.2,1);
    overflow:hidden;
  `;

  const titleText = tr[stepDef.titleKey] || stepDef.titleKey;
  const descText  = tr[stepDef.descKey]  || stepDef.descKey;
  const isLast    = globalStep === total - 1;
  const isFirst   = globalStep === 0;

  // Compact dot row
  const visibleDots = Math.min(total, 18);
  const dotScale = total > 18 ? Math.floor((globalStep / total) * visibleDots) : globalStep;
  const dotHTML = Array.from({length: visibleDots}, (_, i) =>
    `<div style="flex-shrink:0;width:${i===dotScale?'20px':'7px'};height:7px;border-radius:4px;background:${i===dotScale ? accentColor : 'var(--border)'};transition:all .28s cubic-bezier(.4,0,.2,1);"></div>`
  ).join('');

  tip.innerHTML = `
    <div style="padding:20px 24px 16px;border-bottom:1px solid var(--border);background:linear-gradient(135deg,rgba(${isCycleStep?'224,90,154':'79,110,247'},.08),rgba(${isCycleStep?'79,110,247':'224,90,154'},.04));">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,${accentColor},${accentDark});display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 2px 8px ${accentGlow};">${stepIcon}</div>
          <span style="font-size:11px;font-weight:700;color:${accentColor};letter-spacing:.8px;text-transform:uppercase;">${tr.tourProgress(globalStep + 1, total)}</span>
        </div>
        <button id="tour-skip-btn" style="background:none;border:1px solid var(--border);font-size:11px;color:var(--text-muted);cursor:pointer;font-family:inherit;padding:4px 10px;border-radius:8px;transition:all .15s;white-space:nowrap;" onmouseenter="this.style.borderColor='${accentColor}';this.style.color='${accentColor}';" onmouseleave="this.style.borderColor='';this.style.color=''">${tr.tourSkip}</button>
      </div>
      <div style="font-size:17px;font-weight:800;color:var(--text);line-height:1.3;margin-bottom:8px;">${titleText}</div>
      <div style="font-size:13.5px;color:var(--text-muted);line-height:1.7;">${descText}</div>
    </div>
    <div style="padding:14px 24px 16px;display:flex;flex-direction:column;gap:12px;">
      <div style="display:flex;align-items:center;gap:4px;min-height:7px;">
        ${dotHTML}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
        ${!isFirst
          ? `<button id="tour-prev-btn" style="flex-shrink:0;padding:9px 20px;border-radius:11px;border:1.5px solid var(--border);background:transparent;color:var(--text-muted);font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;white-space:nowrap;" onmouseenter="this.style.borderColor='var(--text-muted)';this.style.color='var(--text)';" onmouseleave="this.style.borderColor='';this.style.color=''">${tr.tourPrev}</button>`
          : `<span style="flex-shrink:0;"></span>`}
        <button id="tour-next-btn" style="flex:1;padding:10px 24px;border-radius:11px;border:none;background:linear-gradient(135deg,${accentColor},${accentDark});color:#fff;font-family:inherit;font-size:14px;font-weight:800;cursor:pointer;box-shadow:0 4px 16px ${accentGlow};transition:all .15s;white-space:nowrap;" onmouseenter="this.style.transform='translateY(-1px)';" onmouseleave="this.style.transform='';">${isLast ? tr.tourFinish : tr.tourNext}</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(hlBox);
  document.body.appendChild(tip);

  // Position highlight and tooltip
  function positionTour() {
    let rect;
    if (targetEl) {
      // Scroll element into view instantly (synchronous) so getBoundingClientRect
      // always reads the final post-scroll position, not a mid-animation one.
      targetEl.scrollIntoView({ behavior: 'instant', block: 'nearest' });
      rect = targetEl.getBoundingClientRect();
      const PAD = 8;
      hlBox.style.left   = (rect.left - PAD) + 'px';
      hlBox.style.top    = (rect.top - PAD) + 'px';
      hlBox.style.width  = (rect.width + PAD*2) + 'px';
      hlBox.style.height = (rect.height + PAD*2) + 'px';
      hlBox.style.display = 'block';
    } else {
      // No target: center highlight as a small ring
      hlBox.style.display = 'none';
    }

    // Position tooltip using its actual rendered size
    const tipRect = tip.getBoundingClientRect();
    const tipW = tipRect.width || Math.min(460, window.innerWidth * 0.92);
    const tipH = tipRect.height || 200;
    const vW = window.innerWidth;
    const vH = window.innerHeight;
    const MARGIN = 14;
    const pos = stepDef.position || 'bottom';

    let left, top;
    if (!targetEl || stepDef.position === 'center') {
      left = (vW - tipW) / 2;
      top  = (vH - tipH) / 2;
    } else {
      const cx = rect.left + rect.width / 2;
      if (pos === 'bottom') {
        left = Math.max(MARGIN, Math.min(cx - tipW/2, vW - tipW - MARGIN));
        top  = rect.bottom + 16;
        // Flip to top if it would clip bottom
        if (top + tipH > vH - MARGIN) top = Math.max(MARGIN, rect.top - tipH - 16);
      } else if (pos === 'top') {
        left = Math.max(MARGIN, Math.min(cx - tipW/2, vW - tipW - MARGIN));
        top  = rect.top - tipH - 16;
        if (top < MARGIN) top = rect.bottom + 16;
      } else if (pos === 'left') {
        left = Math.max(MARGIN, rect.left - tipW - 16);
        top  = Math.max(MARGIN, Math.min(rect.top + rect.height/2 - tipH/2, vH - tipH - MARGIN));
      } else { // right
        left = Math.min(rect.right + 16, vW - tipW - MARGIN);
        top  = Math.max(MARGIN, Math.min(rect.top + rect.height/2 - tipH/2, vH - tipH - MARGIN));
      }
      // Final clamp to viewport
      top  = Math.max(MARGIN, Math.min(top,  vH - tipH - MARGIN));
      left = Math.max(MARGIN, Math.min(left, vW - tipW - MARGIN));
    }
    tip.style.left = left + 'px';
    tip.style.top  = top + 'px';
  }

  // Two-pass: render off-screen first so browser can measure the tooltip height,
  // then snap into position in the next paint frame.
  tip.style.visibility = 'hidden';
  requestAnimationFrame(() => {
    tip.style.visibility = '';
    positionTour();
  });
  window.addEventListener('resize', positionTour);

  // Click overlay to advance (except on the tooltip itself)
  overlay.addEventListener('click', (e) => {
    // Only advance if clicking clearly outside the highlight area
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      if (e.clientX >= rect.left - 8 && e.clientX <= rect.right + 8 &&
          e.clientY >= rect.top - 8  && e.clientY <= rect.bottom + 8) {
        return; // let the real element handle it
      }
    }
  });

  // Button handlers
  tip.querySelector('#tour-next-btn').addEventListener('click', () => {
    window.removeEventListener('resize', positionTour);
    showTourStep(globalStep + 1);
  });
  const prevBtn = tip.querySelector('#tour-prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      window.removeEventListener('resize', positionTour);
      showTourStep(globalStep - 1);
    });
  }
  tip.querySelector('#tour-skip-btn').addEventListener('click', () => {
    window.removeEventListener('resize', positionTour);
    clearTourState();
    overlay.remove(); hlBox.remove(); tip.remove();
  });

  // Keyboard navigation
  function keyHandler(e) {
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      document.removeEventListener('keydown', keyHandler);
      window.removeEventListener('resize', positionTour);
      showTourStep(globalStep + 1);
    } else if (e.key === 'ArrowLeft' && !isFirst) {
      document.removeEventListener('keydown', keyHandler);
      window.removeEventListener('resize', positionTour);
      showTourStep(globalStep - 1);
    } else if (e.key === 'Escape') {
      document.removeEventListener('keydown', keyHandler);
      window.removeEventListener('resize', positionTour);
      clearTourState();
      overlay.remove(); hlBox.remove(); tip.remove();
    }
  }
  document.addEventListener('keydown', keyHandler);
}

function showTourFinale() {
  const tr = getTourTr();
  const overlay = document.createElement('div');
  overlay.id = 'tour-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9100;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;animation:fadeIn .3s ease;';

  const card = document.createElement('div');
  card.style.cssText = 'background:var(--surface);border:1.5px solid var(--border);border-radius:22px;padding:36px 40px;text-align:center;max-width:min(420px,90vw);box-shadow:0 24px 80px rgba(0,0,0,.55);animation:scalePop .35s cubic-bezier(.4,0,.2,1);';

  const lang = getTourLang();
  const confetti = ['🎉','🌟','✨','🎊','💪'];
  const finMsgs = {
    en: `You're all set! You now know the essentials of Life Tracker.<br><br>Explore freely — your <b>💬 Assistant</b> is always here if you have questions.`,
    hu: `Mindennel tisztában vagy! Megismerted a Life Tracker legfontosabb funkcióit.<br><br>Fedezz fel szabadon — a <b>💬 Segéded</b> mindig elérhető, ha kérdésed van.`,
    de: `Du bist startklar! Du kennst jetzt die wichtigsten Funktionen von Life Tracker.<br><br>Erkunde frei — dein <b>💬 Assistent</b> steht dir bei Fragen jederzeit zur Verfügung.`,
    es: `¡Todo listo! Ya conoces los aspectos esenciales de Life Tracker.<br><br>Explora libremente — tu <b>💬 Asistente</b> siempre está aquí si tienes preguntas.`,
    fr: `Tout est prêt ! Vous connaissez maintenant l'essentiel de Life Tracker.<br><br>Explorez librement — votre <b>💬 Assistant</b> est toujours là si vous avez des questions.`,
  };
  const btnLabels = { en:'Start tracking!', hu:'Kezdjük el!', de:'Jetzt loslegen!', es:'¡Empezar!', fr:'C\'est parti !' };

  card.innerHTML = `
    <div style="font-size:48px;margin-bottom:12px;">${confetti.join(' ')}</div>
    <div style="font-size:22px;font-weight:900;color:var(--text);margin-bottom:12px;">
      ${tr.tourFinish}
    </div>
    <div style="font-size:14px;color:var(--text-muted);line-height:1.7;margin-bottom:24px;">
      ${finMsgs[lang] || finMsgs.en}
    </div>
    <button id="tour-done-btn" style="padding:12px 32px;border-radius:12px;border:none;background:linear-gradient(135deg,#4f6ef7,#e05a9a);color:#fff;font-family:inherit;font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 4px 20px rgba(79,110,247,.45);transition:transform .15s;" onmouseenter="this.style.transform='scale(1.04)'" onmouseleave="this.style.transform=''">
      ${btnLabels[lang] || btnLabels.en}
    </button>
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);
  overlay.querySelector('#tour-done-btn').addEventListener('click', () => overlay.remove());
}

// Resume tour if we navigated between pages during a tour
(function checkResumeTour() {
  const urlParams = new URLSearchParams(window.location.search);
  const hasTourParam = urlParams.has('tour');
  const tourState = loadTourState();
  if (hasTourParam && tourState) {
    // Clean up URL param without reload
    const url = new URL(window.location.href);
    url.searchParams.delete('tour');
    window.history.replaceState({}, '', url.toString());
    // Resume after page is ready
    setTimeout(() => showTourStep(tourState.globalStep), 600);
  }
})();

// ── STREAK CELEBRATION MODAL ─────────────────────────────────────────────────
(function initStreakModal() {
  // Inject modal HTML once
  const el = document.createElement('div');
  el.innerHTML = `
    <div id="streak-modal-backdrop"></div>
    <div id="streak-modal" class="hidden" role="dialog" aria-modal="true" aria-labelledby="streak-modal-title">
      <button id="streak-modal-close" title="Close">✕</button>
      <div class="streak-modal-fire-wrap">
        <span class="streak-modal-fire-big">🔥</span>
        <div class="streak-modal-rings">
          <div class="streak-modal-ring r1"></div>
          <div class="streak-modal-ring r2"></div>
          <div class="streak-modal-ring r3"></div>
        </div>
      </div>
      <div class="streak-modal-count" id="streak-modal-count">0</div>
      <div class="streak-modal-label" id="streak-modal-label">day streak</div>
      <div class="streak-modal-title" id="streak-modal-title"></div>
      <div class="streak-modal-msg" id="streak-modal-msg"></div>
      <button class="streak-modal-cta" id="streak-modal-cta">Keep it up! 💪</button>
    </div>`;
  document.body.appendChild(el.children[0]); // backdrop
  document.body.appendChild(el.children[0]); // modal

  const backdrop = document.getElementById('streak-modal-backdrop');
  const modal    = document.getElementById('streak-modal');
  const closeBtn = document.getElementById('streak-modal-close');
  const ctaBtn   = document.getElementById('streak-modal-cta');

  function openStreakModal(habitName, streak) {
    const msgs = [
      ["You're unstoppable!", "Day after day, you show up. That's what real progress looks like."],
      ["Consistency is your superpower!", "Most people quit. You didn't. That says everything."],
      ["Look at you go!", "Building a habit takes grit — and you've clearly got it."],
      ["On a roll!", "Every check mark is a vote for the person you're becoming."],
      ["The streak speaks for itself!", "Don't stop now — tomorrow's check mark is already waiting for you."],
    ];
    const milestones = streak >= 100 ? "🏆 100+ days — legendary!" :
                       streak >= 30  ? "🥇 30-day milestone — incredible!" :
                       streak >= 14  ? "🎯 Two weeks straight — amazing!" :
                       streak >= 7   ? "⚡ One whole week — fantastic!" :
                       streak >= 3   ? "✨ Three days strong — great start!" : null;

    const pick = msgs[Math.floor(Math.random() * msgs.length)];
    document.getElementById('streak-modal-count').textContent = streak;
    document.getElementById('streak-modal-label').textContent = streak === 1 ? 'day streak' : 'day streak';
    document.getElementById('streak-modal-title').textContent = `"${habitName}"`;
    document.getElementById('streak-modal-msg').innerHTML =
      (milestones ? `<span class="streak-modal-milestone">${milestones}</span><br><br>` : '') +
      `<b>${pick[0]}</b><br>${pick[1]}`;

    backdrop.classList.add('open');
    modal.classList.remove('hidden');
    // Small delay so CSS transition fires
    requestAnimationFrame(() => modal.classList.add('open'));
  }

  function closeStreakModal() {
    modal.classList.remove('open');
    backdrop.classList.remove('open');
    setTimeout(() => modal.classList.add('hidden'), 280);
  }

  closeBtn.addEventListener('click', closeStreakModal);
  ctaBtn.addEventListener('click', closeStreakModal);
  backdrop.addEventListener('click', closeStreakModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeStreakModal();
  });

  // Delegated click — catch any .streak-badge click anywhere on the page
  document.addEventListener('click', function(e) {
    const badge = e.target.closest('.streak-badge');
    if (!badge) return;
    const habit  = badge.dataset.habit  || 'this habit';
    const streak = parseInt(badge.dataset.streak, 10) || 1;
    openStreakModal(habit, streak);
  });
})();


})();

// ═══════════════════════════════════════════════════════════════════
// ── CALORIES MODULE ───────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
if (CURRENT_PAGE === 'calories') {

// ── TRANSLATIONS ──────────────────────────────────────────────────
const CAL_I18N = {
  en: {
    calKcal:'Calories', calProtein:'Protein', calCarbs:'Carbs', calFat:'Fat',
    calWater:'Water', calWaterGlasses:'glasses',
    calBreakfast:'Breakfast', calLunch:'Lunch', calDinner:'Dinner', calSnacks:'Snacks',
    calGoalsTitle:'🎯 Daily Goals', calSaveGoals:'💾 Save Goals',
    calWeeklyTitle:'📅 This Week', calGoalLine:'Goal',
    calCyclePhaseTitle:'🌸 Cycle-Phase Nutrition',
    calPhasePeriod:'Menstrual Phase', calPhaseFollicular:'Follicular Phase', calPhaseFertile:'Fertile Window', calPhaseOvulation:'Ovulation', calPhasePms:'Luteal Phase',
    calPhaseTipPeriod:'Focus on iron-rich foods (red meat, spinach, lentils) and magnesium to ease cramps. Warm, comforting meals help too.',
    calPhaseTipFollicular:'Energy is rising — lean proteins, fresh veggies and healthy carbs support rising estrogen and workouts.',
    calPhaseTipFertile:'Light, energizing meals with antioxidants (berries, leafy greens) and healthy fats work well during this active phase.',
    calPhaseTipOvulation:'Energy peaks — fuel with balanced protein, complex carbs and zinc-rich foods (nuts, seeds) to support this high.',
    calPhaseTipPms:'Cravings rise — favor complex carbs, magnesium (dark chocolate, nuts) and reduce salt/sugar to ease bloating and mood swings.',
    calPhaseTipDefault:'Set up your cycle on the Cycle tab to get personalized nutrition tips for each phase.',
    calMacroDist:'🥧 Macro Split',
    calTodayBtn:'Today',
    calAddFood:'Add Food', calQuickAdd:'⚡ Quick Add',
    calFromRecipe:'📖 From Recipe', calRecent:'🕐 Recent',
    calFoodName:'Food Name', calFoodNamePh:'e.g. Chicken breast…',
    calKcalLabel:'Calories (kcal)', calServingSize:'Serving',
    calServingUnit:'g / ml', calProteinLabel:'Protein (g)',
    calCarbsLabel:'Carbs (g)', calFatLabel:'Fat (g)',
    calQtyLabel:'Quantity (servings)',
    calRecipeSoon:'Recipe module coming soon',
    calRecipeSoonDesc:'Link meals from your recipe book and push macros automatically.',
    calCancel:'Cancel', calAddBtn:'+ Add Food',
    calRemaining:'remaining', calOver:'over goal',
    calNoRecent:'No recent foods yet.',
    calWeekAvg:'Avg', calWeekTotal:'Total',
    calKcalLeft: n => `${n} kcal left`,
    calKcalOver: n => `${n} kcal over`,
    calDayLabels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  },
  hu: {
    calKcal:'Kalória', calProtein:'Fehérje', calCarbs:'Szénhidrát', calFat:'Zsír',
    calWater:'Víz', calWaterGlasses:'pohár',
    calBreakfast:'Reggeli', calLunch:'Ebéd', calDinner:'Vacsora', calSnacks:'Snack',
    calGoalsTitle:'🎯 Napi célok', calSaveGoals:'💾 Célok mentése',
    calWeeklyTitle:'📅 Ez a hét', calGoalLine:'Cél',
    calCyclePhaseTitle:'🌸 Ciklusfázis-táplálkozás',
    calPhasePeriod:'Menstruációs fázis', calPhaseFollicular:'Follikuláris fázis', calPhaseFertile:'Termékeny ablak', calPhaseOvulation:'Ovuláció', calPhasePms:'Luteális fázis',
    calPhaseTipPeriod:'Fókuszálj vasban gazdag ételekre (vörös hús, spenót, lencse) és magnéziumra a görcsök ellen. A meleg, megnyugtató ételek is segítenek.',
    calPhaseTipFollicular:'Az energiaszint emelkedik — sovány fehérjék, friss zöldségek és egészséges szénhidrátok támogatják az ösztrogénszint emelkedését és az edzéseket.',
    calPhaseTipFertile:'Könnyű, energizáló ételek antioxidánsokkal (bogyós gyümölcsök, leveles zöldek) és egészséges zsírokkal jól illenek ehhez az aktív fázishoz.',
    calPhaseTipOvulation:'Az energiaszint a csúcson van — táplálkozz kiegyensúlyozott fehérjével, összetett szénhidráttal és cinkben gazdag ételekkel (dió, magvak).',
    calPhaseTipPms:'A vágyak fokozódnak — válassz összetett szénhidrátokat, magnéziumot (étcsokoládé, dió) és csökkentsd a só/cukor bevitelt a puffadás és hangulatingadozás ellen.',
    calPhaseTipDefault:'Állítsd be a ciklusod a Ciklus fülön, hogy személyre szabott táplálkozási tippeket kapj minden fázishoz.',
    calMacroDist:'🥧 Makró arány',
    calTodayBtn:'Ma',
    calAddFood:'Étel hozzáadása', calQuickAdd:'⚡ Gyors bevitel',
    calFromRecipe:'📖 Receptből', calRecent:'🕐 Legutóbbi',
    calFoodName:'Étel neve', calFoodNamePh:'pl. Csirkemell…',
    calKcalLabel:'Kalória (kcal)', calServingSize:'Adag',
    calServingUnit:'g / ml', calProteinLabel:'Fehérje (g)',
    calCarbsLabel:'Szénhidrát (g)', calFatLabel:'Zsír (g)',
    calQtyLabel:'Mennyiség (adag)',
    calRecipeSoon:'A recept modul hamarosan elérhető',
    calRecipeSoonDesc:'Hozd létre receptjeidet és add hozzá az ételeket automatikusan.',
    calCancel:'Mégse', calAddBtn:'+ Hozzáad',
    calRemaining:'maradt', calOver:'túllépés',
    calNoRecent:'Még nincs legutóbbi étel.',
    calWeekAvg:'Átlag', calWeekTotal:'Összesen',
    calKcalLeft: n => `${n} kcal maradt`,
    calKcalOver: n => `${n} kcal túllépés`,
    calDayLabels:['H','K','Sze','Cs','P','Szo','V'],
  },
  de: {
    calKcal:'Kalorien', calProtein:'Eiweiß', calCarbs:'Kohlenhydrate', calFat:'Fett',
    calWater:'Wasser', calWaterGlasses:'Gläser',
    calBreakfast:'Frühstück', calLunch:'Mittagessen', calDinner:'Abendessen', calSnacks:'Snacks',
    calGoalsTitle:'🎯 Tagesziele', calSaveGoals:'💾 Ziele speichern',
    calWeeklyTitle:'📅 Diese Woche', calGoalLine:'Ziel',
    calMacroDist:'🥧 Makro-Aufteilung',
    calTodayBtn:'Heute',
    calAddFood:'Essen hinzufügen', calQuickAdd:'⚡ Schnell hinzufügen',
    calFromRecipe:'📖 Aus Rezept', calRecent:'🕐 Zuletzt',
    calFoodName:'Lebensmittel', calFoodNamePh:'z.B. Hähnchenbrust…',
    calKcalLabel:'Kalorien (kcal)', calServingSize:'Portion',
    calServingUnit:'g / ml', calProteinLabel:'Eiweiß (g)',
    calCarbsLabel:'Kohlenhydrate (g)', calFatLabel:'Fett (g)',
    calQtyLabel:'Menge (Portionen)',
    calRecipeSoon:'Rezeptmodul kommt bald',
    calRecipeSoonDesc:'Verknüpfe Mahlzeiten aus deinem Rezeptbuch.',
    calCancel:'Abbrechen', calAddBtn:'+ Hinzufügen',
    calRemaining:'übrig', calOver:'überschritten',
    calNoRecent:'Noch keine letzten Lebensmittel.',
    calWeekAvg:'Avg', calWeekTotal:'Gesamt',
    calKcalLeft: n => `${n} kcal übrig`,
    calKcalOver: n => `${n} kcal überschritten`,
    calDayLabels:['Mo','Di','Mi','Do','Fr','Sa','So'],
  },
  es: {
    calKcal:'Calorías', calProtein:'Proteína', calCarbs:'Carbos', calFat:'Grasas',
    calWater:'Agua', calWaterGlasses:'vasos',
    calBreakfast:'Desayuno', calLunch:'Almuerzo', calDinner:'Cena', calSnacks:'Snacks',
    calGoalsTitle:'🎯 Metas diarias', calSaveGoals:'💾 Guardar metas',
    calWeeklyTitle:'📅 Esta semana', calGoalLine:'Meta',
    calMacroDist:'🥧 Distribución',
    calTodayBtn:'Hoy',
    calAddFood:'Añadir alimento', calQuickAdd:'⚡ Agregar rápido',
    calFromRecipe:'📖 De receta', calRecent:'🕐 Recientes',
    calFoodName:'Nombre del alimento', calFoodNamePh:'ej. Pechuga de pollo…',
    calKcalLabel:'Calorías (kcal)', calServingSize:'Porción',
    calServingUnit:'g / ml', calProteinLabel:'Proteína (g)',
    calCarbsLabel:'Carbohidratos (g)', calFatLabel:'Grasas (g)',
    calQtyLabel:'Cantidad (porciones)',
    calRecipeSoon:'Módulo de recetas próximamente',
    calRecipeSoonDesc:'Vincula comidas desde tu libro de recetas.',
    calCancel:'Cancelar', calAddBtn:'+ Agregar',
    calRemaining:'restante', calOver:'excedido',
    calNoRecent:'Sin alimentos recientes.',
    calWeekAvg:'Prom', calWeekTotal:'Total',
    calKcalLeft: n => `${n} kcal restantes`,
    calKcalOver: n => `${n} kcal excedidas`,
    calDayLabels:['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
  },
  fr: {
    calKcal:'Calories', calProtein:'Protéines', calCarbs:'Glucides', calFat:'Lipides',
    calWater:'Eau', calWaterGlasses:'verres',
    calBreakfast:'Petit-déjeuner', calLunch:'Déjeuner', calDinner:'Dîner', calSnacks:'Collations',
    calGoalsTitle:'🎯 Objectifs quotidiens', calSaveGoals:'💾 Enregistrer',
    calWeeklyTitle:'📅 Cette semaine', calGoalLine:'Objectif',
    calMacroDist:'🥧 Répartition',
    calTodayBtn:"Aujourd'hui",
    calAddFood:'Ajouter un aliment', calQuickAdd:'⚡ Ajout rapide',
    calFromRecipe:'📖 Depuis recette', calRecent:'🕐 Récents',
    calFoodName:'Nom de l\'aliment', calFoodNamePh:'ex. Blanc de poulet…',
    calKcalLabel:'Calories (kcal)', calServingSize:'Portion',
    calServingUnit:'g / ml', calProteinLabel:'Protéines (g)',
    calCarbsLabel:'Glucides (g)', calFatLabel:'Lipides (g)',
    calQtyLabel:'Quantité (portions)',
    calRecipeSoon:'Module recettes bientôt disponible',
    calRecipeSoonDesc:'Liez des repas depuis votre livre de recettes.',
    calCancel:'Annuler', calAddBtn:'+ Ajouter',
    calRemaining:'restant', calOver:'dépassé',
    calNoRecent:'Aucun aliment récent.',
    calWeekAvg:'Moy', calWeekTotal:'Total',
    calKcalLeft: n => `${n} kcal restantes`,
    calKcalOver: n => `${n} kcal dépassées`,
    calDayLabels:['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
  },
};
Object.keys(TRANSLATIONS).forEach(lang => {
  if (CAL_I18N[lang]) Object.assign(TRANSLATIONS[lang], CAL_I18N[lang]);
});

// ── STORAGE KEYS ──────────────────────────────────────────────────
const CAL_DATA_PREFIX = 'ht_calories_';   // + YYYY-MM
const CAL_GOALS_KEY   = 'ht_cal_goals_v1';
const CAL_RECENT_KEY  = 'ht_cal_recent_v1';

// ── STATE ─────────────────────────────────────────────────────────
let calViewDate = new Date();  // which day we're viewing
calViewDate.setHours(0,0,0,0);

let calGoals = { kcal:2000, protein:150, carbs:250, fat:65, water:8 };
let calActiveMeal = 'breakfast'; // which meal modal is open for
let calFoodIdCtr = 1;

// ── HELPERS ───────────────────────────────────────────────────────
function calDateKey(d) {
  const dd = d || calViewDate;
  return `${dd.getFullYear()}-${String(dd.getMonth()+1).padStart(2,'0')}-${String(dd.getDate()).padStart(2,'0')}`;
}
function calMonthKey(d) {
  const dd = d || calViewDate;
  return `${dd.getFullYear()}-${String(dd.getMonth()+1).padStart(2,'0')}`;
}
function calStorageKey(d) { return CAL_DATA_PREFIX + calMonthKey(d); }

function calLoadMonth(d) {
  try {
    const raw = localStorage.getItem(calStorageKey(d));
    return raw ? JSON.parse(raw) : { days: {} };
  } catch(e) { return { days: {} }; }
}
function calSaveMonth(data, d) {
  try { localStorage.setItem(calStorageKey(d), JSON.stringify(data)); } catch(e) {}
}
function calGetDay(d) {
  const data = calLoadMonth(d);
  const key  = calDateKey(d);
  return data.days[key] || { meals:{ breakfast:[], lunch:[], dinner:[], snacks:[] }, water:0 };
}
function calSaveDay(dayData, d) {
  const data = calLoadMonth(d);
  data.days[calDateKey(d)] = dayData;
  calSaveMonth(data, d);
}

function calLoadGoals() {
  try {
    const g = JSON.parse(localStorage.getItem(CAL_GOALS_KEY)||'null');
    if(g) calGoals = {...calGoals,...g};
  } catch(e){}
}
function calSaveGoals() {
  try { localStorage.setItem(CAL_GOALS_KEY, JSON.stringify(calGoals)); } catch(e){}
}

function calLoadRecent() {
  try { return JSON.parse(localStorage.getItem(CAL_RECENT_KEY)||'[]'); } catch(e) { return []; }
}
function calSaveRecent(arr) {
  try { localStorage.setItem(CAL_RECENT_KEY, JSON.stringify(arr.slice(0,20))); } catch(e){}
}
function calAddToRecent(item) {
  let arr = calLoadRecent();
  arr = arr.filter(x => x.name.toLowerCase() !== item.name.toLowerCase());
  arr.unshift(item);
  calSaveRecent(arr);
}

function calDayTotals(dayData) {
  let kcal=0,protein=0,carbs=0,fat=0;
  ['breakfast','lunch','dinner','snacks'].forEach(m => {
    (dayData.meals[m]||[]).forEach(f => {
      const q = f.qty||1;
      kcal    += (f.kcal||0)*q;
      protein += (f.protein||0)*q;
      carbs   += (f.carbs||0)*q;
      fat     += (f.fat||0)*q;
    });
  });
  return { kcal:Math.round(kcal), protein:+protein.toFixed(1), carbs:+carbs.toFixed(1), fat:+fat.toFixed(1) };
}
function calMealTotals(items) {
  let kcal=0,protein=0,carbs=0,fat=0;
  (items||[]).forEach(f => {
    const q=f.qty||1;
    kcal    += (f.kcal||0)*q;
    protein += (f.protein||0)*q;
    carbs   += (f.carbs||0)*q;
    fat     += (f.fat||0)*q;
  });
  return { kcal:Math.round(kcal), protein:+protein.toFixed(1), carbs:+carbs.toFixed(1), fat:+fat.toFixed(1) };
}

function calIsToday(d) {
  const t = new Date(); t.setHours(0,0,0,0);
  return d.getTime() === t.getTime();
}

function t(key) {
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  return tr[key]||TRANSLATIONS.en[key]||key;
}

// ── RENDER: macro summary rings ────────────────────────────────────
function calRenderMacroRow() {
  const day    = calGetDay(calViewDate);
  const totals = calDayTotals(day);
  const CIRC   = 163.4; // 2π * r (r=26)

  const macros = [
    { key:'kcal',    val:totals.kcal,    goal:calGoals.kcal,    color:'#4f6ef7', unit:'kcal' },
    { key:'protein', val:totals.protein, goal:calGoals.protein, color:'#3ecfb2', unit:'g' },
    { key:'carbs',   val:totals.carbs,   goal:calGoals.carbs,   color:'#f5a623', unit:'g' },
    { key:'fat',     val:totals.fat,     goal:calGoals.fat,     color:'#e05a9a', unit:'g' },
  ];

  macros.forEach(m => {
    const pct  = Math.min(1, m.goal > 0 ? m.val/m.goal : 0);
    const arc  = document.getElementById(`cal-ring-${m.key}`);
    const pctEl= document.getElementById(`cal-pct-${m.key}`);
    const valEl= document.getElementById(`cal-val-${m.key}`);
    const goalEl= document.getElementById(`cal-goal-${m.key}`);
    const remEl = document.getElementById(`cal-rem-${m.key}`);
    if(arc)  arc.setAttribute('stroke-dasharray', `${pct*CIRC} ${CIRC}`);
    if(pctEl) pctEl.textContent = Math.round(pct*100)+'%';
    if(valEl) valEl.textContent = m.val;
    if(goalEl) goalEl.textContent = m.goal;
    if(remEl) {
      const rem = m.goal - m.val;
      const tr  = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
      if(rem > 0) {
        remEl.textContent = typeof tr.calKcalLeft==='function' && m.key==='kcal'
          ? tr.calKcalLeft(rem)
          : `${rem}${m.unit} ${tr.calRemaining||'left'}`;
        remEl.style.color = 'var(--text-muted)';
      } else if(rem < 0) {
        remEl.textContent = typeof tr.calKcalOver==='function' && m.key==='kcal'
          ? tr.calKcalOver(Math.abs(rem))
          : `${Math.abs(rem)}${m.unit} ${tr.calOver||'over'}`;
        remEl.style.color = '#e05a9a';
      } else {
        remEl.textContent = '✓';
        remEl.style.color = '#3ecfb2';
      }
    }
    // colour ring red when over
    if(arc && pct >= 1 && m.key==='kcal') arc.setAttribute('stroke', '#e05a9a');
    else if(arc) arc.setAttribute('stroke', m.color);
  });
}

// ── RENDER: date nav ───────────────────────────────────────────────
function calRenderDateNav() {
  const lbl = document.getElementById('cal-date-label');
  const todayBtn = document.getElementById('cal-today-btn');
  if(!lbl) return;
  const today = new Date(); today.setHours(0,0,0,0);
  const diff  = Math.round((calViewDate-today)/864e5);
  const tr    = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  if(diff===0) {
    lbl.textContent = tr.calTodayBtn||'Today';
    if(todayBtn) todayBtn.style.opacity='0.4';
  } else if(diff===-1) {
    lbl.textContent = t('dueYesterday') || 'Yesterday';
    if(todayBtn) todayBtn.style.opacity='1';
  } else {
    // Format as "Fri, Jun 13"
    lbl.textContent = calViewDate.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
    if(todayBtn) todayBtn.style.opacity='1';
  }
}

// ── RENDER: meal cards ─────────────────────────────────────────────
function calRenderMeals() {
  const day = calGetDay(calViewDate);
  const tr  = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const MEALS = ['breakfast','lunch','dinner','snacks'];

  MEALS.forEach(meal => {
    const items  = day.meals[meal]||[];
    const totals = calMealTotals(items);
    const kcalEl = document.getElementById(`cal-meal-kcal-${meal}`);
    const listEl = document.getElementById(`cal-meal-items-${meal}`);
    if(kcalEl) kcalEl.textContent = totals.kcal+' kcal';
    if(!listEl) return;

    if(items.length===0) {
      listEl.innerHTML = `<div class="cal-meal-empty" data-i18n="calMealEmpty">No items yet — tap ＋ to add</div>`;
    } else {
      listEl.innerHTML = items.map((f,i) => {
        const q  = f.qty||1;
        const kc = Math.round((f.kcal||0)*q);
        const pr = +((f.protein||0)*q).toFixed(1);
        const cb = +((f.carbs||0)*q).toFixed(1);
        const ft = +((f.fat||0)*q).toFixed(1);
        return `<div class="cal-food-row" data-meal="${meal}" data-idx="${i}">
          <div class="cal-food-name">${f.name}</div>
          <div class="cal-food-macros">
            <span class="cal-fm-kcal">${kc} kcal</span>
            <span class="cal-fm-p" title="Protein">P ${pr}g</span>
            <span class="cal-fm-c" title="Carbs">C ${cb}g</span>
            <span class="cal-fm-f" title="Fat">F ${ft}g</span>
          </div>
          <button class="cal-food-del" data-meal="${meal}" data-idx="${i}" title="Remove">✕</button>
        </div>`;
      }).join('');

      // bind delete buttons
      listEl.querySelectorAll('.cal-food-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const m   = btn.dataset.meal;
          const idx = +btn.dataset.idx;
          const d   = calGetDay(calViewDate);
          d.meals[m].splice(idx,1);
          calSaveDay(d, calViewDate);
          calRenderAll();
        });
      });
    }
  });
}

// ── RENDER: water ──────────────────────────────────────────────────
function calRenderWater() {
  const day  = calGetDay(calViewDate);
  const goal = calGoals.water||8;
  const cur  = day.water||0;
  const el   = document.getElementById('cal-water-glasses');
  const valEl= document.getElementById('cal-water-val');
  const gEl  = document.getElementById('cal-water-goal-lbl');
  if(!el) return;
  if(valEl) valEl.textContent = cur;
  if(gEl)  gEl.textContent   = goal;

  let html='';
  for(let i=0;i<Math.max(goal,cur);i++){
    const filled = i<cur;
    html += `<button class="cal-water-glass${filled?' filled':''}" data-glass="${i}" title="${i+1}">💧</button>`;
  }
  // add one extra empty to make it easy to add
  if(cur >= goal && cur < 20) {
    html += `<button class="cal-water-glass" data-glass="${cur}" title="${cur+1}">💧</button>`;
  }
  el.innerHTML = html;

  el.querySelectorAll('.cal-water-glass').forEach(btn => {
    btn.addEventListener('click', () => {
      const d   = calGetDay(calViewDate);
      const idx = +btn.dataset.glass;
      // toggle: clicking filled glass at end removes, clicking empty adds
      d.water = (d.water===idx+1) ? idx : idx+1;
      calSaveDay(d, calViewDate);
      calRenderWater();
    });
  });
}

// ── RENDER: weekly chart ───────────────────────────────────────────
function calRenderWeeklyChart() {
  const svg = document.getElementById('cal-weekly-svg');
  if(!svg) return;
  const tr  = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const days= tr.calDayLabels||['Mo','Tu','We','Th','Fr','Sa','Su'];

  // Get Mon-Sun of the week containing calViewDate
  const dow = (calViewDate.getDay()+6)%7; // 0=Mon
  const monday = new Date(calViewDate); monday.setDate(calViewDate.getDate()-dow);

  const W=300, H=120, PAD=24, BAR_AREA_H=80;
  const weekData = [];
  let maxKcal = calGoals.kcal;

  for(let i=0;i<7;i++){
    const d = new Date(monday); d.setDate(monday.getDate()+i);
    const day = calGetDay(d);
    const tot = calDayTotals(day);
    weekData.push({ kcal:tot.kcal, label:days[i], date:d });
    if(tot.kcal > maxKcal) maxKcal = tot.kcal;
  }

  const barW   = (W-PAD*2)/7;
  const innerW = barW*0.55;
  const goalY  = PAD + BAR_AREA_H*(1-calGoals.kcal/maxKcal);

  let html='';
  weekData.forEach((d,i) => {
    const x    = PAD + i*barW + barW/2;
    const pct  = maxKcal>0 ? d.kcal/maxKcal : 0;
    const barH = Math.max(2, BAR_AREA_H*pct);
    const barY = PAD + BAR_AREA_H - barH;
    const today = calIsToday(d.date);
    const isView= (calDateKey(d.date)===calDateKey(calViewDate));
    const color = isView ? '#4f6ef7' : today ? '#3ecfb2' : 'rgba(79,110,247,0.4)';

    html += `<rect x="${x-innerW/2}" y="${barY}" width="${innerW}" height="${barH}"
      rx="3" fill="${color}" style="transition:all .4s cubic-bezier(.4,0,.2,1)"/>`;
    html += `<text x="${x}" y="${PAD+BAR_AREA_H+12}" text-anchor="middle"
      font-family="Montserrat,sans-serif" font-size="9" fill="var(--text-muted)">${d.label}</text>`;
    if(d.kcal>0){
      html += `<text x="${x}" y="${barY-3}" text-anchor="middle"
        font-family="Montserrat,sans-serif" font-size="8" font-weight="700" fill="${color}">${d.kcal}</text>`;
    }
  });

  // Goal line
  const gLineY = Math.max(PAD+1, Math.min(PAD+BAR_AREA_H-1, goalY));
  html += `<line x1="${PAD}" y1="${gLineY}" x2="${W-PAD}" y2="${gLineY}"
    stroke="var(--border2)" stroke-width="1.5" stroke-dasharray="4 3"/>`;
  html += `<text x="${W-PAD+2}" y="${gLineY+4}" font-family="Montserrat,sans-serif"
    font-size="8" fill="var(--text-muted)">${tr.calGoalLine||'Goal'}</text>`;

  svg.innerHTML = html;

  // Weekly stats
  const statEl = document.getElementById('cal-weekly-stats');
  if(statEl) {
    const total   = weekData.reduce((s,d)=>s+d.kcal,0);
    const avgKcal = Math.round(total/7);
    statEl.innerHTML = `
      <div class="cal-ws-item"><span class="cal-ws-lbl">${tr.calWeekAvg||'Avg'}</span><span class="cal-ws-val">${avgKcal} kcal</span></div>
      <div class="cal-ws-item"><span class="cal-ws-lbl">${tr.calWeekTotal||'Total'}</span><span class="cal-ws-val">${total} kcal</span></div>`;
  }
}

// ── RENDER: macro distribution donut ──────────────────────────────
function calRenderMacroDist() {
  const svg   = document.getElementById('cal-dist-svg');
  const legEl = document.getElementById('cal-dist-legend');
  if(!svg) return;
  const day    = calGetDay(calViewDate);
  const totals = calDayTotals(day);
  const tr     = TRANSLATIONS[state.lang]||TRANSLATIONS.en;

  // kcal from each macro (protein=4 kcal/g, carbs=4, fat=9)
  const slices = [
    { label: tr.calProtein||'Protein', kcal: totals.protein*4, color:'#3ecfb2' },
    { label: tr.calCarbs||'Carbs',     kcal: totals.carbs*4,   color:'#f5a623' },
    { label: tr.calFat||'Fat',         kcal: totals.fat*9,     color:'#e05a9a' },
  ];
  const total = slices.reduce((s,x)=>s+x.kcal,0);

  if(total===0) {
    svg.innerHTML = `<circle cx="60" cy="60" r="46" fill="none" stroke="var(--border)" stroke-width="10"/>
      <text x="60" y="65" text-anchor="middle" font-family="Montserrat" font-size="10" fill="var(--text-muted)">—</text>`;
    if(legEl) legEl.innerHTML='';
    return;
  }

  let startAngle = -Math.PI/2;
  const CX=60, CY=60, R=46, SW=10;
  const CIRC2 = 2*Math.PI*R;
  let arcHTML='';

  slices.forEach(s => {
    const frac = s.kcal/total;
    const pct  = frac*CIRC2;
    arcHTML += `<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${s.color}" stroke-width="${SW}"
      stroke-dasharray="${pct} ${CIRC2}"
      stroke-dashoffset="${-startAngle*R}"
      style="transform:rotate(${startAngle}rad) rotate(0.5turn);transform-origin:${CX}px ${CY}px;"/>`;
    // Actually use proper dashoffset approach:
    const startDeg = startAngle*(180/Math.PI) + 90;
    arcHTML += '';
    startAngle += frac*2*Math.PI;
  });

  // Rebuild with proper arc segments using SVG paths
  arcHTML = '';
  let angle = -Math.PI/2;
  slices.forEach(s => {
    const frac      = s.kcal/total;
    const startA    = angle;
    const endA      = angle + frac*2*Math.PI;
    const laf       = frac>0.5?1:0;
    const x1 = CX + R*Math.cos(startA), y1 = CY + R*Math.sin(startA);
    const x2 = CX + R*Math.cos(endA),   y2 = CY + R*Math.sin(endA);
    arcHTML += `<path d="M${x1.toFixed(2)} ${y1.toFixed(2)} A${R} ${R} 0 ${laf} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}"
      fill="none" stroke="${s.color}" stroke-width="${SW}" stroke-linecap="round"/>`;
    angle = endA;
  });

  svg.innerHTML = arcHTML +
    `<text x="${CX}" y="${CY+4}" text-anchor="middle" font-family="Montserrat,sans-serif"
      font-size="11" font-weight="700" fill="var(--text)">${totals.kcal}</text>
    <text x="${CX}" y="${CY+16}" text-anchor="middle" font-family="Montserrat,sans-serif"
      font-size="9" fill="var(--text-muted)">kcal</text>`;

  if(legEl) {
    legEl.innerHTML = slices.map(s => {
      const pct = total>0 ? Math.round(s.kcal/total*100) : 0;
      return `<div class="cal-dist-leg-row">
        <div class="cal-dist-leg-dot" style="background:${s.color}"></div>
        <span class="cal-dist-leg-lbl">${s.label}</span>
        <span class="cal-dist-leg-pct">${pct}%</span>
      </div>`;
    }).join('');
  }
}

// ── RENDER: goals inputs ───────────────────────────────────────────
function calRenderGoalInputs() {
  const fields = ['kcal','protein','carbs','fat','water'];
  fields.forEach(k => {
    const el = document.getElementById(`cal-goal-inp-${k}`);
    if(el) el.value = calGoals[k];
  });
}

// ── RENDER: cycle-phase nutrition tip ───────────────────────────────
function calRenderCyclePhase() {
  const card = document.getElementById('cal-cycle-card');
  if (!card) return;
  if (!isCycleUser()) { card.style.display = 'none'; return; }
  const cd = state.cycleData || {};
  const anchor = (cd.periods||[]).slice().sort((a,b)=>new Date(a.start)-new Date(b.start)).pop();
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  if (!anchor || (cd.mode||'natural')!=='natural') {
    card.style.display = 'block';
    document.getElementById('cal-cycle-phase-label').textContent = '';
    document.getElementById('cal-cycle-phase-tip').textContent = tr.calPhaseTipDefault||'Set up your cycle on the Cycle tab to get personalized nutrition tips for each phase.';
    return;
  }
  const cycleLen = cd.cycleLen||28;
  const tag = getNaturalDayTag(calViewDate, anchor, cycleLen) || 'follicular';
  const map = {
    period:     { label: tr.calPhasePeriod,     tip: tr.calPhaseTipPeriod,     emoji:'🩸' },
    fertile:    { label: tr.calPhaseFertile,    tip: tr.calPhaseTipFertile,    emoji:'🌿' },
    ovulation:  { label: tr.calPhaseOvulation,  tip: tr.calPhaseTipOvulation,  emoji:'✨' },
    'pms-zone': { label: tr.calPhasePms,        tip: tr.calPhaseTipPms,        emoji:'🍫' },
    follicular: { label: tr.calPhaseFollicular, tip: tr.calPhaseTipFollicular, emoji:'🌱' },
  };
  const info = map[tag]||map.follicular;
  card.style.display = 'block';
  document.getElementById('cal-cycle-phase-label').textContent = `${info.emoji} ${info.label}`;
  document.getElementById('cal-cycle-phase-tip').textContent = info.tip;
}

// ── RENDER ALL ─────────────────────────────────────────────────────
function calRenderAll() {
  calRenderDateNav();
  calRenderMacroRow();
  calRenderMeals();
  calRenderWater();
  calRenderWeeklyChart();
  calRenderMacroDist();
  calRenderCyclePhase();
  applyTranslations();
}

// ── MODAL: open/close ──────────────────────────────────────────────
function calOpenModal(meal) {
  calActiveMeal = meal;
  const tr  = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const modal    = document.getElementById('cal-add-modal');
  const backdrop = document.getElementById('cal-modal-backdrop');
  const titleEl  = document.getElementById('cal-modal-title');
  if(!modal) return;

  const mealLabel = tr[`cal${meal.charAt(0).toUpperCase()+meal.slice(1)}`]||meal;
  if(titleEl) titleEl.textContent = (tr.calAddFood||'Add Food') + ' — ' + mealLabel;

  // reset form
  ['cal-food-name','cal-food-kcal','cal-food-protein','cal-food-carbs','cal-food-fat'].forEach(id => {
    const el = document.getElementById(id); if(el) el.value='';
  });
  const srvEl = document.getElementById('cal-food-serving'); if(srvEl) srvEl.value='100';
  const qtyEl = document.getElementById('cal-food-qty');     if(qtyEl) qtyEl.value='1';
  calUpdatePreview();

  // show quick tab
  calSwitchModalTab('quick');
  calRenderRecentList();

  modal.classList.remove('hidden');
  backdrop.classList.remove('hidden');
  setTimeout(()=>{ const n=document.getElementById('cal-food-name'); if(n) n.focus(); },80);
}
function calCloseModal() {
  document.getElementById('cal-add-modal')?.classList.add('hidden');
  document.getElementById('cal-modal-backdrop')?.classList.add('hidden');
}
function calSwitchModalTab(tab) {
  document.querySelectorAll('.cal-modal-tab').forEach(b => b.classList.toggle('active', b.dataset.mtab===tab));
  document.querySelectorAll('.cal-mtab-pane').forEach(p => p.classList.toggle('active', p.id===`cal-mtab-${tab}`));
}
function calUpdatePreview() {
  const kcal  = +(document.getElementById('cal-food-kcal')?.value)||0;
  const prot  = +(document.getElementById('cal-food-protein')?.value)||0;
  const carbs = +(document.getElementById('cal-food-carbs')?.value)||0;
  const fat   = +(document.getElementById('cal-food-fat')?.value)||0;
  const qty   = +(document.getElementById('cal-food-qty')?.value)||1;
  const pv    = document.getElementById('cal-preview-val');
  const pm    = document.getElementById('cal-preview-macros');
  if(pv) pv.textContent = Math.round(kcal*qty);
  if(pm) pm.textContent = `P: ${+(prot*qty).toFixed(1)}g · C: ${+(carbs*qty).toFixed(1)}g · F: ${+(fat*qty).toFixed(1)}g`;
}

function calRenderRecentList() {
  const el = document.getElementById('cal-recent-list');
  if(!el) return;
  const arr = calLoadRecent();
  const tr  = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  if(arr.length===0){
    el.innerHTML=`<div class="cal-recipe-placeholder" style="padding:20px 0;">${tr.calNoRecent||'No recent foods yet.'}</div>`;
    return;
  }
  el.innerHTML = arr.map((f,i) => `
    <div class="cal-recent-row" data-idx="${i}">
      <div class="cal-recent-name">${f.name}</div>
      <div class="cal-recent-info">${f.kcal} kcal · P${f.protein}g · C${f.carbs}g · F${f.fat}g</div>
      <button class="goal-add-btn cal-recent-add" data-idx="${i}" style="padding:5px 12px;font-size:11px;">+</button>
    </div>`).join('');

  el.querySelectorAll('.cal-recent-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const food = arr[+btn.dataset.idx];
      const qty  = 1;
      const day  = calGetDay(calViewDate);
      day.meals[calActiveMeal].push({ ...food, id: calFoodIdCtr++, qty });
      calSaveDay(day, calViewDate);
      calAddToRecent(food);
      calCloseModal();
      calRenderAll();
      showSaveIndicator();
    });
  });
}

function calAddFoodFromForm() {
  const name = (document.getElementById('cal-food-name')?.value||'').trim();
  if(!name) { document.getElementById('cal-food-name')?.focus(); return; }
  const kcal    = +(document.getElementById('cal-food-kcal')?.value)||0;
  const protein = +(document.getElementById('cal-food-protein')?.value)||0;
  const carbs   = +(document.getElementById('cal-food-carbs')?.value)||0;
  const fat     = +(document.getElementById('cal-food-fat')?.value)||0;
  const serving = +(document.getElementById('cal-food-serving')?.value)||100;
  const qty     = +(document.getElementById('cal-food-qty')?.value)||1;

  const food = { id:calFoodIdCtr++, name, kcal, protein, carbs, fat, serving, qty };
  const day  = calGetDay(calViewDate);
  day.meals[calActiveMeal].push(food);
  calSaveDay(day, calViewDate);

  // save to recent (strip id/qty)
  calAddToRecent({ name, kcal, protein, carbs, fat, serving });

  calCloseModal();
  calRenderAll();
  showSaveIndicator();
}

// ── SHOW SAVE INDICATOR ────────────────────────────────────────────
function showSaveIndicator() {
  const el = document.getElementById('save-indicator');
  if(!el) return;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(()=>el.classList.remove('show'), 1600);
}

// ── EVENT BINDINGS ─────────────────────────────────────────────────

// Date navigation
document.getElementById('cal-prev-day')?.addEventListener('click', () => {
  calViewDate.setDate(calViewDate.getDate()-1); calRenderAll();
});
document.getElementById('cal-next-day')?.addEventListener('click', () => {
  const today = new Date(); today.setHours(0,0,0,0);
  if(calViewDate < today) { calViewDate.setDate(calViewDate.getDate()+1); calRenderAll(); }
});
document.getElementById('cal-today-btn')?.addEventListener('click', () => {
  calViewDate = new Date(); calViewDate.setHours(0,0,0,0); calRenderAll();
});

// Meal add buttons & headers
document.querySelectorAll('.cal-meal-add-btn').forEach(btn => {
  btn.addEventListener('click', (e) => { e.stopPropagation(); calOpenModal(btn.dataset.meal); });
});
document.querySelectorAll('.cal-meal-header').forEach(hdr => {
  hdr.addEventListener('click', () => {
    const card = hdr.closest('.cal-meal-card');
    if(card) card.classList.toggle('collapsed');
    const chevron = hdr.querySelector('.cal-meal-chevron');
    if(chevron) chevron.textContent = card?.classList.contains('collapsed') ? '▸' : '▾';
  });
});

// Modal
document.getElementById('cal-modal-close')?.addEventListener('click', calCloseModal);
document.getElementById('cal-modal-cancel')?.addEventListener('click', calCloseModal);
document.getElementById('cal-modal-backdrop')?.addEventListener('click', calCloseModal);
document.getElementById('cal-modal-add')?.addEventListener('click', calAddFoodFromForm);

document.querySelectorAll('.cal-modal-tab').forEach(btn => {
  btn.addEventListener('click', () => calSwitchModalTab(btn.dataset.mtab));
});

// Live preview
['cal-food-kcal','cal-food-protein','cal-food-carbs','cal-food-fat','cal-food-qty'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', calUpdatePreview);
});
document.getElementById('cal-food-name')?.addEventListener('keydown', e => {
  if(e.key==='Enter') document.getElementById('cal-food-kcal')?.focus();
});

// Goals save
document.getElementById('cal-save-goals-btn')?.addEventListener('click', () => {
  calGoals.kcal    = +(document.getElementById('cal-goal-inp-kcal')?.value)||2000;
  calGoals.protein = +(document.getElementById('cal-goal-inp-protein')?.value)||150;
  calGoals.carbs   = +(document.getElementById('cal-goal-inp-carbs')?.value)||250;
  calGoals.fat     = +(document.getElementById('cal-goal-inp-fat')?.value)||65;
  calGoals.water   = +(document.getElementById('cal-goal-inp-water')?.value)||8;
  calSaveGoals();
  calRenderAll();
  showSaveIndicator();
  const btn = document.getElementById('cal-save-goals-btn');
  if(btn){ btn.textContent='✓ Saved!'; setTimeout(()=>{ btn.textContent=(TRANSLATIONS[state.lang]||TRANSLATIONS.en).calSaveGoals||'💾 Save Goals'; },1500); }
});

// Enter key in modal
document.getElementById('cal-add-modal')?.addEventListener('keydown', e => {
  if(e.key==='Enter' && !e.shiftKey) calAddFoodFromForm();
  if(e.key==='Escape') calCloseModal();
});

// ── INIT ───────────────────────────────────────────────────────────
calLoadGoals();
calRenderGoalInputs();
calRenderAll();

// Also remove the `soon` flag from the sidebar item when on this page
// (the sidebar is already built by this point; just ensure link works)
const sbCalBtn = document.querySelector('#sidebar a[href="calories.html"]');
if(sbCalBtn) { sbCalBtn.classList.remove('sb-soon'); sbCalBtn.style.pointerEvents=''; sbCalBtn.style.opacity=''; }

} // end if(CURRENT_PAGE === 'calories')

// ── Register calories in the sidebar nav (remove soon flag) for all pages ──
(function() {
  const el = document.querySelector('#sidebar a[href="calories.html"].sb-soon');
  if(el) {
    el.classList.remove('sb-soon');
    el.style.opacity = '';
    el.style.pointerEvents = '';
    const badge = el.querySelector('.sb-soon-badge');
    if(badge) badge.remove();
  }
})();

// ═══════════════════════════════════════════════════════════════════════════════
// ─── WORKOUT TRACKER ─────────────────────────────────────────────────────────
// Storage keys:
//   lt_workouts_{YYYY-MM}  → { sessions: [...], ctr: N }
//   lt_workout_templates   → [ ...template objects ]
// Each session: { id, date, exercises:[{...}], linkedHabit, totalVolume, totalDuration, note }
// Each exercise: { id, name, cat, type, sets, reps, weight, duration, distance, notes }
// ═══════════════════════════════════════════════════════════════════════════════

if (CURRENT_PAGE === 'workout') {

// ── Constants ──────────────────────────────────────────────────────────────
const WKT_CAT_COLORS = {
  strength:    '#4f6ef7',
  cardio:      '#3ecfb2',
  flexibility: '#e05a9a',
  sport:       '#f5a623',
  other:       '#a78bfa',
};
const WKT_CAT_ICONS = {
  strength:'💪', cardio:'🏃', flexibility:'🧘', sport:'⚽', other:'📦'
};

// ── State ───────────────────────────────────────────────────────────────────
let wktViewDate = new Date();
wktViewDate.setHours(0,0,0,0);

let wktIdCtr = 1;
let wktExIdCtr = 1;
let wktSessions = [];    // sessions for currently loaded month
let wktTemplates = [];   // saved templates (global)

// ── Storage helpers ─────────────────────────────────────────────────────────
function wktMonthKey(d) {
  return `lt_workouts_${d.getFullYear()}_${String(d.getMonth()+1).padStart(2,'0')}`;
}
function wktLoadMonth(d) {
  try {
    const raw = JSON.parse(localStorage.getItem(wktMonthKey(d)) || 'null');
    if (raw) { wktSessions = raw.sessions || []; wktIdCtr = raw.ctr || 1; }
    else { wktSessions = []; wktIdCtr = 1; }
  } catch(e) { wktSessions = []; wktIdCtr = 1; }
}
function wktSaveMonth(d) {
  try {
    localStorage.setItem(wktMonthKey(d), JSON.stringify({ sessions: wktSessions, ctr: wktIdCtr }));
  } catch(e) {}
}
function wktLoadTemplates() {
  try {
    const raw = JSON.parse(localStorage.getItem('lt_workout_templates') || 'null');
    if (raw) wktTemplates = raw;
  } catch(e) { wktTemplates = []; }
}
function wktSaveTemplates() {
  try { localStorage.setItem('lt_workout_templates', JSON.stringify(wktTemplates)); } catch(e) {}
}

function wktDateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function wktGetDaySessions(d) {
  const k = wktDateKey(d);
  return wktSessions.filter(s => s.date === k);
}

// ── Net calories cross-link ─────────────────────────────────────────────────
function wktGetNetCals(d) {
  // Reads from calorie tracker localStorage for the same date
  const mk = xCalMonthKey(d);
  try {
    const raw = JSON.parse(localStorage.getItem(mk) || 'null');
    if (!raw) return null;
    const dk = wktDateKey(d);
    const day = raw.days ? raw.days[dk] : raw[dk];
    if (!day) return null;
    // Sum all meals
    let totalKcal = 0;
    const meals = ['breakfast','lunch','dinner','snacks'];
    meals.forEach(m => { (day.meals[m]||[]).forEach(f => { totalKcal += (f.kcal||0)*(f.qty||1); }); });
    // Estimate burned from today's workout sessions
    const sessions = wktSessions.filter(s => s.date === dk);
    let burned = 0;
    sessions.forEach(s => { burned += s.estimatedBurn || 0; });
    return { intake: Math.round(totalKcal), burned: Math.round(burned), net: Math.round(totalKcal - burned) };
  } catch(e) { return null; }
}

// ── Streak calculation ──────────────────────────────────────────────────────
function wktCalcStreak() {
  // Walk backwards from today; count consecutive days with ≥1 session
  // We need to look across multiple month keys — scan last 90 days
  const today = new Date(); today.setHours(0,0,0,0);
  let streak = 0;
  for (let i = 0; i < 90; i++) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const mk = wktMonthKey(d);
    let sessions = [];
    try {
      const raw = JSON.parse(localStorage.getItem(mk) || 'null');
      if (raw) sessions = raw.sessions || [];
    } catch(e) {}
    const dk = wktDateKey(d);
    if (sessions.some(s => s.date === dk)) { streak++; }
    else if (i > 0) break; // gap → stop (skip today if no workout yet)
  }
  return streak;
}

// ── Estimate burn (rough MET-based) ────────────────────────────────────────
function wktEstimateBurn(cat, type, sets, reps, weight, duration, distance) {
  // Very rough: strength ~5 kcal/min, cardio ~8, flex ~3, sport ~7
  const metMap = { strength: 5, cardio: 8, flexibility: 3, sport: 7, other: 4 };
  const rate = metMap[cat] || 4;
  if (type === 'duration') return Math.round(rate * (duration || 0));
  if (type === 'distance') return Math.round(rate * ((distance||0) * 6)); // ~6 min/km rough
  // sets × reps: estimate ~1 min per set
  return Math.round(rate * (sets || 1));
}

// ── Volume calculation ──────────────────────────────────────────────────────
function wktExVolume(ex) {
  if (ex.type === 'sets') return (ex.sets||0) * (ex.reps||0) * (ex.weight||0);
  return 0;
}
function wktSessionVolume(session) {
  return session.exercises.reduce((s,e) => s + wktExVolume(e), 0);
}
function wktSessionDuration(session) {
  return session.exercises.reduce((s,e) => {
    if (e.type === 'duration') return s + (e.duration||0);
    if (e.type === 'distance') return s + Math.round((e.distance||0)*6);
    return s + (e.sets||1)*2; // rough: 2 min per set
  }, 0);
}

// ── Stats summary ────────────────────────────────────────────────────────────
function wktUpdateStats() {
  // Streak
  document.getElementById('wkt-streak-val').textContent = wktCalcStreak();

  // This month sessions (already loaded)
  document.getElementById('wkt-month-val').textContent = wktSessions.length;

  // Total volume this month
  const vol = wktSessions.reduce((s,sess) => s + wktSessionVolume(sess), 0);
  document.getElementById('wkt-volume-val').textContent = vol > 0 ? vol.toLocaleString() : '0';

  // Avg duration
  const durs = wktSessions.map(s => wktSessionDuration(s)).filter(d=>d>0);
  const avgDur = durs.length ? Math.round(durs.reduce((a,b)=>a+b,0)/durs.length) : 0;
  document.getElementById('wkt-duration-val').textContent = avgDur;

  // Net calories today
  const net = wktGetNetCals(wktViewDate);
  const netEl = document.getElementById('wkt-net-cal-val');
  if (net) {
    const color = net.net < 0 ? '#3ecfb2' : net.net > 500 ? '#e05a9a' : 'var(--text)';
    netEl.innerHTML = `<span style="color:${color};font-weight:800;">${net.net > 0 ? '+' : ''}${net.net}</span> <span style="font-size:11px;color:var(--text-muted);">kcal (${net.intake}in − ${net.burned}burned)</span>`;
  } else {
    netEl.textContent = '—';
  }
}

// ── Populate habit link selector ────────────────────────────────────────────
function wktPopulateHabits() {
  const sel = document.getElementById('wkt-habit-select');
  if (!sel) return;
  // state.habits is available from main app.js
  sel.innerHTML = '<option value="">— none —</option>';
  (state.habits || []).forEach((h, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = h;
    sel.appendChild(opt);
  });
  // Pre-select the user's configured default linked habit (Settings → Habit Linking)
  if (typeof userPrefs !== 'undefined' && userPrefs.defaultWorkoutHabit !== undefined && userPrefs.defaultWorkoutHabit !== null && userPrefs.defaultWorkoutHabit !== '') {
    if ((state.habits||[])[+userPrefs.defaultWorkoutHabit] !== undefined) {
      sel.value = userPrefs.defaultWorkoutHabit;
    }
  }
}

// ── Render sessions list for viewed date ───────────────────────────────────
function wktRenderSessionsList() {
  const list = document.getElementById('wkt-sessions-list');
  if (!list) return;
  const sessions = wktGetDaySessions(wktViewDate);

  if (sessions.length === 0) {
    list.innerHTML = `<div class="wkt-empty-day">
      <div style="font-size:36px;margin-bottom:8px;">🏋️</div>
      <div style="font-weight:700;color:var(--text);font-size:14px;">No workout logged yet</div>
      <div style="color:var(--text-muted);font-size:12px;margin-top:4px;">Add exercises below to start.</div>
    </div>`;
    return;
  }

  list.innerHTML = sessions.map(sess => {
    const vol = wktSessionVolume(sess);
    const dur = wktSessionDuration(sess);
    const cats = [...new Set(sess.exercises.map(e=>e.cat))];
    const catTags = cats.map(c => `<span class="wkt-cat-tag" style="background:${WKT_CAT_COLORS[c]||'#4f6ef7'}22;color:${WKT_CAT_COLORS[c]||'#4f6ef7'};border:1px solid ${WKT_CAT_COLORS[c]||'#4f6ef7'}44;">${WKT_CAT_ICONS[c]||''} ${c}</span>`).join('');

    const exHTML = sess.exercises.map(ex => {
      let metric = '';
      if (ex.type === 'sets')     metric = `${ex.sets}×${ex.reps}${ex.weight>0?' @ '+ex.weight+'kg':''}`;
      if (ex.type === 'duration') metric = `${ex.duration} min`;
      if (ex.type === 'distance') metric = `${ex.distance} km`;
      return `<div class="wkt-ex-row">
        <span class="wkt-ex-icon">${WKT_CAT_ICONS[ex.cat]||'💪'}</span>
        <span class="wkt-ex-name">${ex.name}</span>
        <span class="wkt-ex-metric">${metric}</span>
        <button class="wkt-ex-del" data-sessid="${sess.id}" data-exid="${ex.id}" title="Remove">✕</button>
      </div>`;
    }).join('');

    return `<div class="wkt-session-card" data-sessid="${sess.id}">
      <div class="wkt-session-header">
        <div class="wkt-session-cats">${catTags}</div>
        <div class="wkt-session-meta">
          ${vol>0?`<span class="wkt-meta-chip">⚖ ${vol.toLocaleString()} kg·vol</span>`:''}
          ${dur>0?`<span class="wkt-meta-chip">⏱ ~${dur} min</span>`:''}
          ${sess.estimatedBurn>0?`<span class="wkt-meta-chip">🔥 ~${sess.estimatedBurn} kcal</span>`:''}
        </div>
        <button class="wkt-session-del" data-sessid="${sess.id}" title="Delete session">🗑</button>
      </div>
      <div class="wkt-ex-list">${exHTML}</div>
      ${sess.linkedHabitName ? `<div class="wkt-linked-habit">✅ Linked habit: <strong>${sess.linkedHabitName}</strong></div>` : ''}
    </div>`;
  }).join('');

  // Event delegation for deletes
  list.querySelectorAll('.wkt-session-del').forEach(btn => {
    btn.addEventListener('click', () => {
      wktSessions = wktSessions.filter(s => s.id !== +btn.dataset.sessid);
      wktSaveMonth(wktViewDate);
      wktRenderAll();
    });
  });
  list.querySelectorAll('.wkt-ex-del').forEach(btn => {
    btn.addEventListener('click', () => {
      const sess = wktSessions.find(s => s.id === +btn.dataset.sessid);
      if (!sess) return;
      sess.exercises = sess.exercises.filter(e => e.id !== +btn.dataset.exid);
      if (sess.exercises.length === 0) {
        wktSessions = wktSessions.filter(s => s.id !== sess.id);
      } else {
        sess.totalVolume = wktSessionVolume(sess);
        sess.totalDuration = wktSessionDuration(sess);
        sess.estimatedBurn = sess.exercises.reduce((s,e) => s + wktEstimateBurn(e.cat,e.type,e.sets,e.reps,e.weight,e.duration,e.distance), 0);
      }
      wktSaveMonth(wktViewDate);
      wktRenderAll();
    });
  });
}

// ── Weekly bar chart ─────────────────────────────────────────────────────────
function wktRenderWeeklyChart() {
  const wrap = document.getElementById('wkt-weekly-chart');
  const legendWrap = document.getElementById('wkt-cat-legend');
  if (!wrap) return;

  // Build last 7 days
  const days = Array.from({length:7}, (_,i) => {
    const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()-6+i); return d;
  });

  // Gather sessions for each day (may span two months)
  const dayCounts = days.map(d => {
    const mk = wktMonthKey(d);
    let sessions = wktSessions;
    if (wktMonthKey(d) !== wktMonthKey(wktViewDate)) {
      try { const r = JSON.parse(localStorage.getItem(mk)||'null'); sessions = r ? r.sessions||[] : []; } catch(e){ sessions=[]; }
    }
    const dk = wktDateKey(d);
    return sessions.filter(s => s.date === dk);
  });

  const maxSess = Math.max(1, ...dayCounts.map(a=>a.length));
  const dayNames = ['Mo','Tu','We','Th','Fr','Sa','Su'];

  const barsHTML = days.map((d, i) => {
    const sessions = dayCounts[i];
    const isToday = wktDateKey(d) === wktDateKey(new Date());
    const h = sessions.length ? Math.max(8, Math.round((sessions.length/maxSess)*80)) : 0;
    const cats = sessions.length ? [...new Set(sessions.flatMap(s=>s.exercises.map(e=>e.cat)))] : [];
    const barColor = cats.length ? WKT_CAT_COLORS[cats[0]] : '#4f6ef7';
    const icons = cats.length ? cats.map(c => WKT_CAT_ICONS[c]||'💪').join('') : '';
    const dayName = dayNames[(d.getDay()+6)%7];
    return `<div class="wkt-bar-col${isToday?' wkt-bar-today':''}">
      <div class="wkt-bar-val" style="color:${sessions.length?barColor:'var(--text-muted)'}">${icons}</div>
      <div class="wkt-bar-outer">
        <div class="wkt-bar-inner" style="height:${h}px;background:${sessions.length?barColor:'var(--border)'};opacity:${sessions.length?'1':'.4'}"></div>
      </div>
      <div class="wkt-bar-day${isToday?' wkt-bar-day-today':''}">${dayName}</div>
    </div>`;
  }).join('');

  wrap.innerHTML = `<div class="wkt-bar-chart">${barsHTML}</div>`;

  // Legend — category icon instead of a colored dot
  legendWrap.innerHTML = Object.entries(WKT_CAT_COLORS).map(([cat,col]) =>
    `<span class="wkt-leg-item" style="color:${col}">${WKT_CAT_ICONS[cat]} ${cat}</span>`
  ).join('');
}

// ── Monthly heatmap ──────────────────────────────────────────────────────────
function wktRenderHeatmap() {
  const wrap = document.getElementById('wkt-heatmap');
  if (!wrap) return;
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  const daysInMonth = new Date(y,m+1,0).getDate();
  const firstDow = new Date(y,m,1).getDay(); // 0=Sun
  const offset = firstDow === 0 ? 6 : firstDow - 1; // Mon-start

  let html = '<div class="wkt-heatmap-grid">';
  // Day headers
  ['Mo','Tu','We','Th','Fr','Sa','Su'].forEach(d => { html += `<div class="wkt-hm-header">${d}</div>`; });
  // Empty cells before start
  for (let i=0;i<offset;i++) html += '<div class="wkt-hm-cell wkt-hm-empty"></div>';
  // Day cells
  for (let day=1; day<=daysInMonth; day++) {
    const d = new Date(y,m,day); d.setHours(0,0,0,0);
    const dk = wktDateKey(d);
    const count = wktSessions.filter(s=>s.date===dk).length;
    const intensity = count === 0 ? 0 : count === 1 ? 0.35 : count === 2 ? 0.65 : 1;
    const isToday = day === now.getDate();
    const bg = count > 0 ? `rgba(79,110,247,${intensity})` : 'var(--border)';
    const title = `${day}: ${count} session${count!==1?'s':''}`;
    html += `<div class="wkt-hm-cell${isToday?' wkt-hm-today':''}" style="background:${bg};" title="${title}">${count>0?`<span class="wkt-hm-num">${count}</span>`:''}</div>`;
  }
  html += '</div>';
  wrap.innerHTML = html;
}

// ── Personal Records ─────────────────────────────────────────────────────────
function wktRenderPRs() {
  const el = document.getElementById('wkt-prs');
  if (!el) return;

  // Scan all months from localStorage for PR data (last 6 months)
  const prMap = {}; // name → { maxWeight, maxVol, maxDist, maxDur }
  const now = new Date();
  for (let mi = 0; mi < 6; mi++) {
    const d = new Date(now.getFullYear(), now.getMonth()-mi, 1);
    const mk = wktMonthKey(d);
    let sessions = [];
    try { const r = JSON.parse(localStorage.getItem(mk)||'null'); sessions = r ? r.sessions||[] : []; } catch(e){}
    sessions.forEach(sess => {
      sess.exercises.forEach(ex => {
        if (!prMap[ex.name]) prMap[ex.name] = { name:ex.name, cat:ex.cat, maxWeight:0, maxVol:0, maxDist:0, maxDur:0 };
        const pr = prMap[ex.name];
        if (ex.type==='sets' && ex.weight > pr.maxWeight) pr.maxWeight = ex.weight;
        const vol = wktExVolume(ex);
        if (vol > pr.maxVol) pr.maxVol = vol;
        if (ex.type==='distance' && ex.distance > pr.maxDist) pr.maxDist = ex.distance;
        if (ex.type==='duration' && ex.duration > pr.maxDur) pr.maxDur = ex.duration;
      });
    });
  }

  const prs = Object.values(prMap);
  if (!prs.length) { el.innerHTML = '<div style="color:var(--text-muted);font-size:12px;padding:8px 0;">No records yet. Start logging!</div>'; return; }

  el.innerHTML = prs.slice(0,10).map(pr => {
    const col = WKT_CAT_COLORS[pr.cat]||'#4f6ef7';
    const metrics = [];
    if (pr.maxWeight>0) metrics.push(`🏆 ${pr.maxWeight} kg`);
    if (pr.maxDist>0)   metrics.push(`📏 ${pr.maxDist} km`);
    if (pr.maxDur>0)    metrics.push(`⏱ ${pr.maxDur} min`);
    return `<div class="wkt-pr-row">
      <span class="wkt-pr-icon" style="color:${col}">${WKT_CAT_ICONS[pr.cat]||'💪'}</span>
      <span class="wkt-pr-name">${pr.name}</span>
      <span class="wkt-pr-val">${metrics.join(' · ')}</span>
    </div>`;
  }).join('');
}

// ── Templates ────────────────────────────────────────────────────────────────
function wktRenderTemplates() {
  const list = document.getElementById('wkt-templates-list');
  const noTpl = document.getElementById('wkt-no-templates');
  if (!list) return;
  if (wktTemplates.length === 0) {
    list.innerHTML = '';
    if (noTpl) noTpl.style.display = '';
    return;
  }
  if (noTpl) noTpl.style.display = 'none';
  list.innerHTML = wktTemplates.map((tpl, i) => `
    <div class="wkt-tpl-row">
      <div class="wkt-tpl-info">
        <div class="wkt-tpl-name">${tpl.name}</div>
        <div class="wkt-tpl-meta">${tpl.exercises.length} exercise${tpl.exercises.length!==1?'s':''}</div>
      </div>
      <button class="goal-add-btn wkt-tpl-use" data-tplidx="${i}" style="padding:5px 12px;font-size:11px;">▶ Use</button>
      <button class="wkt-tpl-del" data-tplidx="${i}" title="Delete template">✕</button>
    </div>`).join('');

  list.querySelectorAll('.wkt-tpl-use').forEach(btn => {
    btn.addEventListener('click', () => {
      const tpl = wktTemplates[+btn.dataset.tplidx];
      if (!tpl) return;
      const dk = wktDateKey(wktViewDate);
      // Check if there's already a session today
      let sess = wktSessions.find(s => s.date === dk);
      if (!sess) {
        sess = { id: wktIdCtr++, date: dk, exercises: [], estimatedBurn: 0 };
        wktSessions.push(sess);
      }
      // Clone exercises (new IDs)
      tpl.exercises.forEach(ex => {
        sess.exercises.push({ ...ex, id: wktExIdCtr++ });
      });
      sess.totalVolume = wktSessionVolume(sess);
      sess.totalDuration = wktSessionDuration(sess);
      sess.estimatedBurn = sess.exercises.reduce((s,e)=>s+wktEstimateBurn(e.cat,e.type,e.sets,e.reps,e.weight,e.duration,e.distance),0);
      wktAutoCheckHabit(sess);
      wktSaveMonth(wktViewDate);
      wktRenderAll();
    });
  });
  list.querySelectorAll('.wkt-tpl-del').forEach(btn => {
    btn.addEventListener('click', () => {
      wktTemplates.splice(+btn.dataset.tplidx, 1);
      wktSaveTemplates();
      wktRenderTemplates();
    });
  });
}

// ── Save today as template ───────────────────────────────────────────────────
function wktSaveAsTemplate() {
  const sessions = wktGetDaySessions(wktViewDate);
  if (!sessions.length) { alert('No exercises logged today to save as a template.'); return; }
  const allExercises = sessions.flatMap(s => s.exercises);
  if (!allExercises.length) { alert('No exercises found.'); return; }
  const name = prompt('Template name:', `Workout ${wktTemplates.length+1}`);
  if (!name) return;
  wktTemplates.push({ name: name.trim(), exercises: allExercises.map(e => ({ ...e, id: 0 })) });
  wktSaveTemplates();
  wktRenderTemplates();
}

// ── Auto-check linked habit ──────────────────────────────────────────────────
function wktAutoCheckHabit(session) {
  if (session.linkedHabit === '' || session.linkedHabit === undefined) return;
  const hi = +session.linkedHabit;
  if (isNaN(hi)) return;
  // Date needs to match current tracker month
  const d = new Date(session.date + 'T00:00:00');
  if (d.getFullYear() === state.year && d.getMonth() === state.month) {
    const day = d.getDate();
    state.checked[`${hi}_${day}`] = true;
    saveAll();
  }
}

// ── Update date label ─────────────────────────────────────────────────────────
function wktUpdateDateLabel() {
  const el = document.getElementById('wkt-date-label');
  if (!el) return;
  const today = new Date(); today.setHours(0,0,0,0);
  const diff = Math.round((wktViewDate - today) / 86400000);
  if (diff === 0) el.textContent = 'Today';
  else if (diff === -1) el.textContent = 'Yesterday';
  else {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    el.textContent = `${months[wktViewDate.getMonth()]} ${wktViewDate.getDate()}, ${wktViewDate.getFullYear()}`;
  }
  // If we moved to a different month, reload that month's data
  wktLoadMonth(wktViewDate);
}

// ── Add exercise form ────────────────────────────────────────────────────────
function wktUpdateFormFields() {
  const type = document.getElementById('wkt-type-select')?.value;
  const cat  = document.getElementById('wkt-cat-select')?.value;

  // Auto-switch type based on category
  if (cat === 'cardio' && type === 'sets') {
    document.getElementById('wkt-type-select').value = 'duration';
  }

  const typeVal = document.getElementById('wkt-type-select')?.value;
  document.getElementById('wkt-sets-fields').style.display    = typeVal === 'sets'     ? 'contents' : 'none';
  document.getElementById('wkt-duration-fields').style.display = typeVal === 'duration' ? 'block'    : 'none';
  document.getElementById('wkt-distance-fields').style.display = typeVal === 'distance' ? 'block'    : 'none';
  wktUpdatePreview();
}

function wktUpdatePreview() {
  const prev = document.getElementById('wkt-preview');
  if (!prev) return;
  const name   = document.getElementById('wkt-name-input')?.value||'';
  const type   = document.getElementById('wkt-type-select')?.value;
  const sets   = +(document.getElementById('wkt-sets-input')?.value)||0;
  const reps   = +(document.getElementById('wkt-reps-input')?.value)||0;
  const weight = +(document.getElementById('wkt-weight-input')?.value)||0;
  const dur    = +(document.getElementById('wkt-dur-input')?.value)||0;
  const dist   = +(document.getElementById('wkt-dist-input')?.value)||0;
  const cat    = document.getElementById('wkt-cat-select')?.value||'strength';
  const burn   = wktEstimateBurn(cat, type, sets, reps, weight, dur, dist);

  let metric = '';
  if (type==='sets') metric = `${sets}×${reps}${weight>0?' @ '+weight+'kg':''} · vol ${(sets*reps*weight).toLocaleString()}kg`;
  if (type==='duration') metric = `${dur} min`;
  if (type==='distance') metric = `${dist} km`;

  prev.innerHTML = name ? `<span style="font-weight:700;">${name}</span> — ${metric} · ~${burn} kcal burned` : '';
}

function wktAddExercise() {
  const name = document.getElementById('wkt-name-input')?.value.trim();
  if (!name) { document.getElementById('wkt-name-input')?.focus(); return; }

  const cat    = document.getElementById('wkt-cat-select')?.value || 'strength';
  const type   = document.getElementById('wkt-type-select')?.value || 'sets';
  const sets   = +(document.getElementById('wkt-sets-input')?.value)||3;
  const reps   = +(document.getElementById('wkt-reps-input')?.value)||10;
  const weight = +(document.getElementById('wkt-weight-input')?.value)||0;
  const dur    = +(document.getElementById('wkt-dur-input')?.value)||30;
  const dist   = +(document.getElementById('wkt-dist-input')?.value)||5;
  const notesV = document.getElementById('wkt-notes-input')?.value.trim()||'';
  const habitIdx = document.getElementById('wkt-habit-select')?.value;

  const ex = { id:wktExIdCtr++, name, cat, type, sets, reps, weight, duration:dur, distance:dist, notes:notesV };

  // Find or create session for this day
  const dk = wktDateKey(wktViewDate);
  let sess = wktSessions.find(s => s.date === dk);
  if (!sess) {
    sess = { id:wktIdCtr++, date:dk, exercises:[], linkedHabit:'', linkedHabitName:'', estimatedBurn:0 };
    wktSessions.push(sess);
  }
  if (habitIdx !== '' && habitIdx !== undefined) {
    sess.linkedHabit = habitIdx;
    sess.linkedHabitName = (state.habits||[])[+habitIdx] || '';
  }
  sess.exercises.push(ex);
  sess.totalVolume = wktSessionVolume(sess);
  sess.totalDuration = wktSessionDuration(sess);
  const burn = wktEstimateBurn(cat, type, sets, reps, weight, dur, dist);
  sess.estimatedBurn = (sess.estimatedBurn||0) + burn;

  wktAutoCheckHabit(sess);
  wktSaveMonth(wktViewDate);

  // Reset form name & notes
  document.getElementById('wkt-name-input').value = '';
  document.getElementById('wkt-notes-input').value = '';

  wktRenderAll();
}

// ── Master render ────────────────────────────────────────────────────────────
function wktRenderAll() {
  wktUpdateDateLabel();
  wktRenderSessionsList();
  wktUpdateStats();
  wktRenderWeeklyChart();
  wktRenderHeatmap();
  wktRenderPRs();
  wktRenderTemplates();
  wktUpdatePreview();
}

// ── Init ─────────────────────────────────────────────────────────────────────
wktLoadMonth(wktViewDate);
wktLoadTemplates();
wktPopulateHabits();
wktRenderAll();

// Remove "soon" badge from sidebar
const sbWktBtn = document.querySelector('#sidebar a[href="workout.html"]');
if (sbWktBtn) {
  sbWktBtn.classList.remove('sb-soon');
  sbWktBtn.style.pointerEvents = '';
  sbWktBtn.style.opacity = '';
  const badge = sbWktBtn.querySelector('.sb-soon-badge');
  if (badge) badge.remove();
}

// ── Event bindings ────────────────────────────────────────────────────────────

// Date navigation
document.getElementById('wkt-prev-day')?.addEventListener('click', () => {
  wktViewDate.setDate(wktViewDate.getDate()-1);
  wktRenderAll();
});
document.getElementById('wkt-next-day')?.addEventListener('click', () => {
  const today = new Date(); today.setHours(0,0,0,0);
  if (wktViewDate < today) { wktViewDate.setDate(wktViewDate.getDate()+1); wktRenderAll(); }
});
document.getElementById('wkt-today-btn')?.addEventListener('click', () => {
  wktViewDate = new Date(); wktViewDate.setHours(0,0,0,0); wktRenderAll();
});

// Form interactivity
document.getElementById('wkt-cat-select')?.addEventListener('change', wktUpdateFormFields);
document.getElementById('wkt-type-select')?.addEventListener('change', wktUpdateFormFields);
['wkt-sets-input','wkt-reps-input','wkt-weight-input','wkt-dur-input','wkt-dist-input','wkt-name-input'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', wktUpdatePreview);
});

// Add exercise
document.getElementById('wkt-add-btn')?.addEventListener('click', wktAddExercise);
document.getElementById('wkt-name-input')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') wktAddExercise();
});

// Save as template
document.getElementById('wkt-save-template-btn')?.addEventListener('click', wktSaveAsTemplate);

// Init form field visibility
wktUpdateFormFields();

} // end if(CURRENT_PAGE === 'workout')

// ── Register workout in sidebar nav (remove soon flag) for all pages ──
(function() {
  const el = document.querySelector('#sidebar a[href="workout.html"].sb-soon');
  if (el) {
    el.classList.remove('sb-soon');
    el.style.opacity = '';
    el.style.pointerEvents = '';
    const badge = el.querySelector('.sb-soon-badge');
    if (badge) badge.remove();
  }
})();

// ═══════════════════════════════════════════════════════════════════════════
// RECIPE BOOK — recipes.html
// ═══════════════════════════════════════════════════════════════════════════
if (CURRENT_PAGE === 'recipes') {

// ── TRANSLATIONS ──────────────────────────────────────────────────
const REC_I18N = {
  en: {
    recTitle:'📖 Recipe Book', recNewBtn:'+ New Recipe', recSearchPh:'Search recipes…',
    recFilterAll:'All', recFilterBreakfast:'🌅 Breakfast', recFilterLunch:'☀️ Lunch',
    recFilterDinner:'🌙 Dinner', recFilterSnack:'🍎 Snack', recFilterMealPrep:'📦 Meal Prep',
    recServings:'Servings', recIngredientsShort:'ingredients',
    recLogMeal:'Log Meal', recAddToShopping:'Add to Shopping',
    recModalTitleNew:'New Recipe', recModalTitleEdit:'Edit Recipe',
    recNameLabel:'Recipe Name', recNamePh:'e.g. Veggie Stir Fry…',
    recTagLabel:'Category', recServingsLabel:'Servings',
    recMacrosTitle:'🔥 Macros per serving', recIngredientsTitle:'🧺 Ingredients',
    recIngNamePh:'Ingredient', recIngQtyPh:'Qty', recIngUnitPh:'unit',
    recAddIngredient:'+ Add Ingredient',
    recNotesLabel:'📝 Notes', recNotesPh:'Optional notes, prep steps…',
    recSave:'💾 Save Recipe', recEmptyIngredients:'No ingredients added yet.',
    recLogModalTitle:'Log Meal', recLogDateLabel:'Date', recLogMealLabel:'Meal',
    recLogServingsLabel:'Servings', recLogConfirm:'🍽 Log Meal',
    recDeleteConfirm:'Delete this recipe?',
    recNoRecipes:'No recipes yet. Create your first one!',
    recNoResults:'No recipes match your search.',
    dueYesterday:'Yesterday',
    calKcal:'Calories', calKcalLabel:'Calories (kcal)', calProteinLabel:'Protein (g)',
    calCarbsLabel:'Carbs (g)', calFatLabel:'Fat (g)',
    calBreakfast:'Breakfast', calLunch:'Lunch', calDinner:'Dinner', calSnacks:'Snacks',
    calTodayBtn:'Today', calCancel:'Cancel',
  },
  hu: {
    recTitle:'📖 Receptkönyv', recNewBtn:'+ Új recept', recSearchPh:'Receptek keresése…',
    recFilterAll:'Összes', recFilterBreakfast:'🌅 Reggeli', recFilterLunch:'☀️ Ebéd',
    recFilterDinner:'🌙 Vacsora', recFilterSnack:'🍎 Snack', recFilterMealPrep:'📦 Meal Prep',
    recServings:'Adagok', recIngredientsShort:'hozzávaló',
    recLogMeal:'Étkezés naplózása', recAddToShopping:'Bevásárlólistához',
    recModalTitleNew:'Új recept', recModalTitleEdit:'Recept szerkesztése',
    recNameLabel:'Recept neve', recNamePh:'pl. Zöldséges wok…',
    recTagLabel:'Kategória', recServingsLabel:'Adagok száma',
    recMacrosTitle:'🔥 Makrók adagonként', recIngredientsTitle:'🧺 Hozzávalók',
    recIngNamePh:'Hozzávaló', recIngQtyPh:'Menny.', recIngUnitPh:'egység',
    recAddIngredient:'+ Hozzávaló hozzáadása',
    recNotesLabel:'📝 Megjegyzések', recNotesPh:'Elkészítési lépések, megjegyzések…',
    recSave:'💾 Recept mentése', recEmptyIngredients:'Még nincs hozzávaló.',
    recLogModalTitle:'Étkezés naplózása', recLogDateLabel:'Dátum', recLogMealLabel:'Étkezés',
    recLogServingsLabel:'Adagok', recLogConfirm:'🍽 Naplózás',
    recDeleteConfirm:'Törlöd ezt a receptet?',
    recNoRecipes:'Még nincs recept. Hozd létre az elsőt!',
    recNoResults:'Nincs a keresésnek megfelelő recept.',
    dueYesterday:'Tegnap',
    calKcal:'Kalória', calKcalLabel:'Kalória (kcal)', calProteinLabel:'Fehérje (g)',
    calCarbsLabel:'Szénhidrát (g)', calFatLabel:'Zsír (g)',
    calBreakfast:'Reggeli', calLunch:'Ebéd', calDinner:'Vacsora', calSnacks:'Snack',
    calTodayBtn:'Ma', calCancel:'Mégse',
  },
  de: {
    recTitle:'📖 Rezeptbuch', recNewBtn:'+ Neues Rezept', recSearchPh:'Rezepte durchsuchen…',
    recFilterAll:'Alle', recFilterBreakfast:'🌅 Frühstück', recFilterLunch:'☀️ Mittagessen',
    recFilterDinner:'🌙 Abendessen', recFilterSnack:'🍎 Snack', recFilterMealPrep:'📦 Meal Prep',
    recServings:'Portionen', recIngredientsShort:'Zutaten',
    recLogMeal:'Mahlzeit eintragen', recAddToShopping:'Zur Einkaufsliste',
    recModalTitleNew:'Neues Rezept', recModalTitleEdit:'Rezept bearbeiten',
    recNameLabel:'Rezeptname', recNamePh:'z.B. Gemüsepfanne…',
    recTagLabel:'Kategorie', recServingsLabel:'Anzahl Portionen',
    recMacrosTitle:'🔥 Makros pro Portion', recIngredientsTitle:'🧺 Zutaten',
    recIngNamePh:'Zutat', recIngQtyPh:'Menge', recIngUnitPh:'Einheit',
    recAddIngredient:'+ Zutat hinzufügen',
    recNotesLabel:'📝 Notizen', recNotesPh:'Optionale Notizen, Zubereitungsschritte…',
    recSave:'💾 Rezept speichern', recEmptyIngredients:'Noch keine Zutaten hinzugefügt.',
    recLogModalTitle:'Mahlzeit eintragen', recLogDateLabel:'Datum', recLogMealLabel:'Mahlzeit',
    recLogServingsLabel:'Portionen', recLogConfirm:'🍽 Eintragen',
    recDeleteConfirm:'Dieses Rezept löschen?',
    recNoRecipes:'Noch keine Rezepte. Erstelle dein erstes!',
    recNoResults:'Keine Rezepte gefunden.',
    dueYesterday:'Gestern',
    calKcal:'Kalorien', calKcalLabel:'Kalorien (kcal)', calProteinLabel:'Eiweiß (g)',
    calCarbsLabel:'Kohlenhydrate (g)', calFatLabel:'Fett (g)',
    calBreakfast:'Frühstück', calLunch:'Mittagessen', calDinner:'Abendessen', calSnacks:'Snacks',
    calTodayBtn:'Heute', calCancel:'Abbrechen',
  },
  es: {
    recTitle:'📖 Libro de Recetas', recNewBtn:'+ Nueva Receta', recSearchPh:'Buscar recetas…',
    recFilterAll:'Todas', recFilterBreakfast:'🌅 Desayuno', recFilterLunch:'☀️ Almuerzo',
    recFilterDinner:'🌙 Cena', recFilterSnack:'🍎 Snack', recFilterMealPrep:'📦 Meal Prep',
    recServings:'Porciones', recIngredientsShort:'ingredientes',
    recLogMeal:'Registrar comida', recAddToShopping:'Añadir a la lista',
    recModalTitleNew:'Nueva Receta', recModalTitleEdit:'Editar Receta',
    recNameLabel:'Nombre de la receta', recNamePh:'ej. Salteado de verduras…',
    recTagLabel:'Categoría', recServingsLabel:'Número de porciones',
    recMacrosTitle:'🔥 Macros por porción', recIngredientsTitle:'🧺 Ingredientes',
    recIngNamePh:'Ingrediente', recIngQtyPh:'Cant.', recIngUnitPh:'unidad',
    recAddIngredient:'+ Añadir ingrediente',
    recNotesLabel:'📝 Notas', recNotesPh:'Notas opcionales, pasos de preparación…',
    recSave:'💾 Guardar receta', recEmptyIngredients:'Aún no hay ingredientes.',
    recLogModalTitle:'Registrar comida', recLogDateLabel:'Fecha', recLogMealLabel:'Comida',
    recLogServingsLabel:'Porciones', recLogConfirm:'🍽 Registrar',
    recDeleteConfirm:'¿Eliminar esta receta?',
    recNoRecipes:'Aún no hay recetas. ¡Crea la primera!',
    recNoResults:'No hay recetas que coincidan con tu búsqueda.',
    dueYesterday:'Ayer',
    calKcal:'Calorías', calKcalLabel:'Calorías (kcal)', calProteinLabel:'Proteína (g)',
    calCarbsLabel:'Carbohidratos (g)', calFatLabel:'Grasas (g)',
    calBreakfast:'Desayuno', calLunch:'Almuerzo', calDinner:'Cena', calSnacks:'Snacks',
    calTodayBtn:'Hoy', calCancel:'Cancelar',
  },
  fr: {
    recTitle:'📖 Livre de Recettes', recNewBtn:'+ Nouvelle Recette', recSearchPh:'Rechercher des recettes…',
    recFilterAll:'Toutes', recFilterBreakfast:'🌅 Petit-déjeuner', recFilterLunch:'☀️ Déjeuner',
    recFilterDinner:'🌙 Dîner', recFilterSnack:'🍎 Collation', recFilterMealPrep:'📦 Meal Prep',
    recServings:'Portions', recIngredientsShort:'ingrédients',
    recLogMeal:'Enregistrer le repas', recAddToShopping:'Ajouter aux courses',
    recModalTitleNew:'Nouvelle Recette', recModalTitleEdit:'Modifier la Recette',
    recNameLabel:'Nom de la recette', recNamePh:'ex. Sauté de légumes…',
    recTagLabel:'Catégorie', recServingsLabel:'Nombre de portions',
    recMacrosTitle:'🔥 Macros par portion', recIngredientsTitle:'🧺 Ingrédients',
    recIngNamePh:'Ingrédient', recIngQtyPh:'Qté', recIngUnitPh:'unité',
    recAddIngredient:'+ Ajouter un ingrédient',
    recNotesLabel:'📝 Notes', recNotesPh:'Notes facultatives, étapes de préparation…',
    recSave:'💾 Enregistrer la recette', recEmptyIngredients:'Aucun ingrédient ajouté.',
    recLogModalTitle:'Enregistrer le repas', recLogDateLabel:'Date', recLogMealLabel:'Repas',
    recLogServingsLabel:'Portions', recLogConfirm:'🍽 Enregistrer',
    recDeleteConfirm:'Supprimer cette recette ?',
    recNoRecipes:'Aucune recette pour le moment. Créez la première !',
    recNoResults:'Aucune recette ne correspond à votre recherche.',
    dueYesterday:'Hier',
    calKcal:'Calories', calKcalLabel:'Calories (kcal)', calProteinLabel:'Protéines (g)',
    calCarbsLabel:'Glucides (g)', calFatLabel:'Lipides (g)',
    calBreakfast:'Petit-déjeuner', calLunch:'Déjeuner', calDinner:'Dîner', calSnacks:'Collations',
    calTodayBtn:"Aujourd'hui", calCancel:'Annuler',
  },
};
Object.keys(TRANSLATIONS).forEach(lang => {
  if (REC_I18N[lang]) Object.assign(TRANSLATIONS[lang], REC_I18N[lang]);
});

function t(key) {
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  return tr[key]||TRANSLATIONS.en[key]||key;
}

// ── STORAGE: recipes ────────────────────────────────────────────────
const REC_KEY = 'lt_recipes';
let recRecipes = [];
let recIdCtr = 1;
let recIngIdCtr = 1;

function recLoad() {
  try {
    const d = JSON.parse(localStorage.getItem(REC_KEY)||'null');
    if (d) { recRecipes = d.recipes||[]; recIdCtr = d.ctr||1; }
  } catch(e) { recRecipes = []; recIdCtr = 1; }
}
function recSaveAll() {
  try { localStorage.setItem(REC_KEY, JSON.stringify({recipes:recRecipes, ctr:recIdCtr})); } catch(e) {}
}

// ── STORAGE: calorie log cross-link (mirrors calories.html) ────────
const REC_CAL_PREFIX = 'ht_calories_';
function recCalMonthKey(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function recCalStorageKey(d) { return REC_CAL_PREFIX + recCalMonthKey(d); }
function recCalDateKey(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function recCalLoadMonth(d) {
  try {
    const raw = localStorage.getItem(recCalStorageKey(d));
    return raw ? JSON.parse(raw) : { days: {} };
  } catch(e) { return { days: {} }; }
}
function recCalSaveMonth(data, d) {
  try { localStorage.setItem(recCalStorageKey(d), JSON.stringify(data)); } catch(e) {}
}
function recCalGetDay(d) {
  const data = recCalLoadMonth(d);
  const key  = recCalDateKey(d);
  return data.days[key] || { meals:{ breakfast:[], lunch:[], dinner:[], snacks:[] }, water:0 };
}
function recCalSaveDay(dayData, d) {
  const data = recCalLoadMonth(d);
  data.days[recCalDateKey(d)] = dayData;
  recCalSaveMonth(data, d);
}

// ── STATE ────────────────────────────────────────────────────────────
let recFilter = 'all';
let recEditingId = null;
let recModalIngredients = [];
let recLogRecipeId = null;

const REC_TAG_INFO = {
  breakfast: { color:'#f5a623' },
  lunch:     { color:'#4f6ef7' },
  dinner:    { color:'#a78bfa' },
  snack:     { color:'#3ecfb2' },
  mealprep:  { color:'#e05a9a' },
};
function recTagLabel(tag) {
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const map = { breakfast:tr.recFilterBreakfast, lunch:tr.recFilterLunch, dinner:tr.recFilterDinner, snack:tr.recFilterSnack, mealprep:tr.recFilterMealPrep };
  return map[tag]||tag;
}

// ── RENDER: recipe grid ─────────────────────────────────────────────
function recCardHTML(r) {
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const info = REC_TAG_INFO[r.tag]||REC_TAG_INFO.snack;
  const ingCount = (r.ingredients||[]).length;
  return `<div class="rec-card" data-rid="${r.id}">
    <div class="rec-card-head">
      <div class="rec-card-tag" style="background:${info.color}22;color:${info.color};">${recTagLabel(r.tag)}</div>
      <div class="rec-card-actions">
        <button class="rec-icon-btn" data-redit="${r.id}" title="Edit">✎</button>
        <button class="rec-icon-btn" data-rdel="${r.id}" title="Delete">🗑</button>
      </div>
    </div>
    <div class="rec-card-name">${r.name}</div>
    <div class="rec-card-macros">
      <span class="rec-macro-chip rec-chip-kcal">🔥 ${r.kcal||0} kcal</span>
      <span class="rec-macro-chip">P ${r.protein||0}g</span>
      <span class="rec-macro-chip">C ${r.carbs||0}g</span>
      <span class="rec-macro-chip">F ${r.fat||0}g</span>
    </div>
    <div class="rec-card-meta">
      <span>${tr.recServings||'Servings'}: ${r.servings||1}</span>
      <span>${ingCount} ${tr.recIngredientsShort||'ingredients'}</span>
    </div>
    <div class="rec-card-btns">
      <button class="goal-add-btn rec-log-btn" data-rlog="${r.id}">🍽 ${tr.recLogMeal||'Log Meal'}</button>
      <button class="goal-add-btn rec-shop-btn" data-rshop="${r.id}"${ingCount===0?' disabled':''}>🛒 ${tr.recAddToShopping||'Add to Shopping'}</button>
    </div>
  </div>`;
}

function recRenderGrid() {
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const grid = document.getElementById('rec-grid');
  if (!grid) return;
  const search = (document.getElementById('rec-search-input')?.value||'').toLowerCase().trim();
  let list = recRecipes.filter(r => recFilter==='all' || r.tag===recFilter);
  if (search) list = list.filter(r => r.name.toLowerCase().includes(search));

  if (list.length===0) {
    const msg = recRecipes.length===0 ? (tr.recNoRecipes||'No recipes yet. Create your first one!') : (tr.recNoResults||'No recipes match your search.');
    grid.innerHTML = `<div class="rec-empty"><div class="rec-empty-icon">📖</div><div>${msg}</div></div>`;
    return;
  }
  grid.innerHTML = list.map(recCardHTML).join('');
}

// ── MODAL: ingredient rows ──────────────────────────────────────────
function recRenderIngredientRows() {
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const wrap = document.getElementById('rec-ingredients-list');
  if (!wrap) return;
  if (recModalIngredients.length===0) {
    wrap.innerHTML = `<div class="rec-no-ing">${tr.recEmptyIngredients||'No ingredients added yet.'}</div>`;
    return;
  }
  wrap.innerHTML = recModalIngredients.map(ing => `
    <div class="rec-ing-row" data-ingid="${ing.id}">
      <input class="form-input rec-ing-name" data-field="name" value="${(ing.name||'').replace(/"/g,'&quot;')}" placeholder="${tr.recIngNamePh||'Ingredient'}"/>
      <input class="form-input rec-ing-qty" data-field="qty" type="number" min="0" step="0.1" value="${ing.qty!==undefined&&ing.qty!==''?ing.qty:''}" placeholder="${tr.recIngQtyPh||'Qty'}"/>
      <input class="form-input rec-ing-unit" data-field="unit" value="${(ing.unit||'').replace(/"/g,'&quot;')}" placeholder="${tr.recIngUnitPh||'unit'}"/>
      <button class="rec-ing-del" data-ingdel="${ing.id}" title="Remove">✕</button>
    </div>`).join('');
}

// ── MODAL: open/close (add/edit recipe) ─────────────────────────────
function recOpenModal(recipe) {
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  recEditingId = recipe ? recipe.id : null;
  document.getElementById('rec-modal-title').textContent = recipe ? (tr.recModalTitleEdit||'Edit Recipe') : (tr.recModalTitleNew||'New Recipe');
  document.getElementById('rec-name-input').value     = recipe?.name || '';
  document.getElementById('rec-tag-select').value     = recipe?.tag || 'breakfast';
  document.getElementById('rec-servings-input').value = recipe?.servings || 1;
  document.getElementById('rec-kcal-input').value      = recipe?.kcal    ?? '';
  document.getElementById('rec-protein-input').value   = recipe?.protein ?? '';
  document.getElementById('rec-carbs-input').value     = recipe?.carbs   ?? '';
  document.getElementById('rec-fat-input').value       = recipe?.fat     ?? '';
  document.getElementById('rec-notes-input').value     = recipe?.notes   || '';

  recModalIngredients = recipe
    ? (recipe.ingredients||[]).map(i => ({ id: recIngIdCtr++, name:i.name||'', qty:i.qty??'', unit:i.unit||'' }))
    : [];
  recRenderIngredientRows();

  document.getElementById('rec-recipe-modal').classList.remove('hidden');
  document.getElementById('rec-modal-backdrop').classList.remove('hidden');
  setTimeout(()=>{ document.getElementById('rec-name-input')?.focus(); }, 80);
}
function recCloseModal() {
  document.getElementById('rec-recipe-modal')?.classList.add('hidden');
  document.getElementById('rec-modal-backdrop')?.classList.add('hidden');
}

// ── SAVE / DELETE recipe ─────────────────────────────────────────────
function recSaveFromForm() {
  const name = (document.getElementById('rec-name-input')?.value||'').trim();
  if (!name) { document.getElementById('rec-name-input')?.focus(); return; }
  const tag      = document.getElementById('rec-tag-select')?.value || 'breakfast';
  const servings = Math.max(1, +(document.getElementById('rec-servings-input')?.value)||1);
  const kcal     = +(document.getElementById('rec-kcal-input')?.value)||0;
  const protein  = +(document.getElementById('rec-protein-input')?.value)||0;
  const carbs    = +(document.getElementById('rec-carbs-input')?.value)||0;
  const fat      = +(document.getElementById('rec-fat-input')?.value)||0;
  const notes    = (document.getElementById('rec-notes-input')?.value||'').trim();

  const ingredients = recModalIngredients
    .map(i => ({ name:(i.name||'').trim(), qty: i.qty===''?undefined:+i.qty, unit:(i.unit||'').trim() }))
    .filter(i => i.name);

  if (recEditingId) {
    const r = recRecipes.find(x => x.id===recEditingId);
    if (r) Object.assign(r, { name, tag, servings, kcal, protein, carbs, fat, notes, ingredients });
  } else {
    recRecipes.push({ id: recIdCtr++, name, tag, servings, kcal, protein, carbs, fat, notes, ingredients });
  }
  recSaveAll();
  recCloseModal();
  recRenderGrid();
  flashSaved();
}
function recDeleteRecipe(id) {
  const tr = TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  if (!confirm(tr.recDeleteConfirm||'Delete this recipe?')) return;
  recRecipes = recRecipes.filter(r => r.id!==id);
  recSaveAll();
  recRenderGrid();
}

// ── LOG MEAL MODAL ───────────────────────────────────────────────────
function recOpenLogModal(id) {
  recLogRecipeId = id;
  document.getElementById('rec-log-servings-input').value = 1;
  document.getElementById('rec-log-date-select').value = 'today';
  document.getElementById('rec-log-meal-select').value = 'breakfast';
  recUpdateLogPreview();
  document.getElementById('rec-log-modal').classList.remove('hidden');
  document.getElementById('rec-log-modal-backdrop').classList.remove('hidden');
}
function recCloseLogModal() {
  document.getElementById('rec-log-modal')?.classList.add('hidden');
  document.getElementById('rec-log-modal-backdrop')?.classList.add('hidden');
}
function recUpdateLogPreview() {
  const r = recRecipes.find(x => x.id===recLogRecipeId);
  if (!r) return;
  const qty = +(document.getElementById('rec-log-servings-input')?.value)||1;
  const pv = document.getElementById('rec-log-preview-val');
  const pm = document.getElementById('rec-log-preview-macros');
  if (pv) pv.textContent = Math.round((r.kcal||0)*qty);
  if (pm) pm.textContent = `P: ${+((r.protein||0)*qty).toFixed(1)}g · C: ${+((r.carbs||0)*qty).toFixed(1)}g · F: ${+((r.fat||0)*qty).toFixed(1)}g`;
}
function recConfirmLogMeal() {
  const r = recRecipes.find(x => x.id===recLogRecipeId);
  if (!r) return;
  const qty  = +(document.getElementById('rec-log-servings-input')?.value)||1;
  const meal = document.getElementById('rec-log-meal-select')?.value||'breakfast';
  const dateSel = document.getElementById('rec-log-date-select')?.value||'today';

  const d = new Date(); d.setHours(0,0,0,0);
  if (dateSel==='yesterday') d.setDate(d.getDate()-1);

  const day = recCalGetDay(d);
  if (!day.meals[meal]) day.meals[meal] = [];
  day.meals[meal].push({
    id: Date.now(),
    name: r.name,
    kcal: r.kcal||0, protein: r.protein||0, carbs: r.carbs||0, fat: r.fat||0,
    serving: 100, qty,
  });
  recCalSaveDay(day, d);

  recCloseLogModal();
  flashSaved();
}

// ── ADD TO SHOPPING LIST ─────────────────────────────────────────────
function recIngLabel(ing) {
  let label = ing.name;
  if (ing.qty) label += ` (${ing.qty}${ing.unit ? ' '+ing.unit : ''})`;
  else if (ing.unit) label += ` (${ing.unit})`;
  return label;
}
function recAddToShopping(id) {
  const r = recRecipes.find(x => x.id===id);
  if (!r || !(r.ingredients||[]).length) return;
  r.ingredients.forEach(ing => {
    state.shopItems.push({ id: state.shopIdCtr++, name: recIngLabel(ing), qty: 1, cat: 'grocery', done: false });
  });
  saveShop();
  flashSaved();
}

// ── EVENT BINDINGS ───────────────────────────────────────────────────
document.getElementById('rec-new-btn')?.addEventListener('click', () => recOpenModal(null));
document.getElementById('rec-modal-close')?.addEventListener('click', recCloseModal);
document.getElementById('rec-modal-cancel')?.addEventListener('click', recCloseModal);
document.getElementById('rec-modal-backdrop')?.addEventListener('click', recCloseModal);
document.getElementById('rec-modal-save')?.addEventListener('click', recSaveFromForm);
document.getElementById('rec-recipe-modal')?.addEventListener('keydown', e => {
  if (e.key==='Escape') recCloseModal();
});

document.getElementById('rec-add-ingredient-btn')?.addEventListener('click', () => {
  recModalIngredients.push({ id: recIngIdCtr++, name:'', qty:'', unit:'' });
  recRenderIngredientRows();
  const rows = document.querySelectorAll('.rec-ing-name');
  if (rows.length) rows[rows.length-1].focus();
});
document.getElementById('rec-ingredients-list')?.addEventListener('input', e => {
  const row = e.target.closest('.rec-ing-row');
  if (!row) return;
  const ing = recModalIngredients.find(i => i.id===+row.dataset.ingid);
  if (!ing) return;
  const field = e.target.dataset.field;
  if (field==='qty') ing.qty = e.target.value===''?'':+e.target.value;
  else ing[field] = e.target.value;
});
document.getElementById('rec-ingredients-list')?.addEventListener('click', e => {
  const del = e.target.closest('[data-ingdel]');
  if (!del) return;
  recModalIngredients = recModalIngredients.filter(i => i.id !== +del.dataset.ingdel);
  recRenderIngredientRows();
});

// Grid actions (edit, delete, log, shop)
document.getElementById('rec-grid')?.addEventListener('click', e => {
  const editBtn = e.target.closest('[data-redit]');
  if (editBtn) { recOpenModal(recRecipes.find(r => r.id===+editBtn.dataset.redit)); return; }
  const delBtn = e.target.closest('[data-rdel]');
  if (delBtn) { recDeleteRecipe(+delBtn.dataset.rdel); return; }
  const logBtn = e.target.closest('[data-rlog]');
  if (logBtn) { recOpenLogModal(+logBtn.dataset.rlog); return; }
  const shopBtn = e.target.closest('[data-rshop]');
  if (shopBtn && !shopBtn.disabled) { recAddToShopping(+shopBtn.dataset.rshop); return; }
});

// Filters & search
document.getElementById('rec-filter-row')?.addEventListener('click', e => {
  const btn = e.target.closest('[data-rectag]');
  if (!btn) return;
  document.querySelectorAll('[data-rectag]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  recFilter = btn.dataset.rectag;
  recRenderGrid();
});
document.getElementById('rec-search-input')?.addEventListener('input', recRenderGrid);

// Log meal modal
document.getElementById('rec-log-modal-close')?.addEventListener('click', recCloseLogModal);
document.getElementById('rec-log-modal-cancel')?.addEventListener('click', recCloseLogModal);
document.getElementById('rec-log-modal-backdrop')?.addEventListener('click', recCloseLogModal);
document.getElementById('rec-log-modal-confirm')?.addEventListener('click', recConfirmLogMeal);
document.getElementById('rec-log-servings-input')?.addEventListener('input', recUpdateLogPreview);
document.getElementById('rec-log-modal')?.addEventListener('keydown', e => {
  if (e.key==='Escape') recCloseLogModal();
});

// ── INIT ─────────────────────────────────────────────────────────────
recLoad();
recRenderGrid();
applyTranslations();

} // end if(CURRENT_PAGE === 'recipes')