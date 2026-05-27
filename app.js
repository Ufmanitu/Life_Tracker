// ─── MULTI-PAGE SETUP ────────────────────────────────────────────────────────
const CURRENT_PAGE = document.body.dataset.page || 'tracker';

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
    tabTracker:"📊 Tracker", tabDays:"Days", tabTasks:"✅ Tasks", tabAnalysis:"📈 Analysis",
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
    weekPrefix:"Week", weekShort:"Wk",
    session:"Session", focusTime:"Focus Time",
    pomodoroMode:"Pomodoro", shortBreak:"Short Break", longBreak:"Long Break",
    startBtn:"▶ Start", pauseBtn:"⏸ Pause", resetBtn:"↺ Reset",
    saved:"✓ Saved",
    completedStat:"completed", habitsStat:"habits", daysStat:"days",
    dueToday:"Today", dueTomorrow:"Tomorrow",
    dueOverdue:(n)=>`${n}d overdue`, dueFuture:(n)=>`In ${n} days`,
    langLabel:"EN 🇬🇧",
    tabTimetable:"🗓 Timetable", tabShopping:"🛒 Shop", tabCycle:"🌸 Cycle", tabFinance:"💰 Finance",
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
  },
  hu: {
    monthNames:["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"],
    monthShort:["Jan","Feb","Már","Ápr","Máj","Jún","Júl","Aug","Sze","Okt","Nov","Dec"],
    days:["H","K","Sze","Cs","P","Szo","V"],
    subtitle:"— Életkövető —",
    tabTracker:"📊 Nyomkövető", tabDays:"Napok", tabTasks:"✅ Feladatok", tabAnalysis:"📈 Elemzés",
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
    weekPrefix:"Hét", weekShort:"Hét",
    session:"Munkamenet", focusTime:"Fókusz idő",
    pomodoroMode:"Pomodoro", shortBreak:"Rövid szünet", longBreak:"Hosszú szünet",
    startBtn:"▶ Indítás", pauseBtn:"⏸ Szünet", resetBtn:"↺ Visszaállít",
    saved:"✓ Mentve",
    completedStat:"teljesítve", habitsStat:"szokás", daysStat:"nap",
    dueToday:"Ma", dueTomorrow:"Holnap",
    dueOverdue:(n)=>`${n} napja lejárt`, dueFuture:(n)=>`Még ${n} nap`,
    langLabel:"HU 🇭🇺",
    tabTimetable:"🗓 Órarend", tabShopping:"🛒 Bevásárlás", tabCycle:"🌸 Ciklus", tabFinance:"💰 Pénzügy",
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
  },
  de: {
    monthNames:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    monthShort:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
    days:["Mo","Di","Mi","Do","Fr","Sa","So"],
    subtitle:"— Leben Tracker —",
    tabTracker:"📊 Tracker", tabDays:"Tage", tabTasks:"✅ Aufgaben", tabAnalysis:"📈 Analyse",
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
    weekPrefix:"Woche", weekShort:"Wo",
    session:"Sitzung", focusTime:"Fokuszeit",
    pomodoroMode:"Pomodoro", shortBreak:"Kurze Pause", longBreak:"Lange Pause",
    startBtn:"▶ Start", pauseBtn:"⏸ Pause", resetBtn:"↺ Zurücksetzen",
    saved:"✓ Gespeichert",
    completedStat:"erledigt", habitsStat:"Gewohnheiten", daysStat:"Tage",
    dueToday:"Heute", dueTomorrow:"Morgen",
    dueOverdue:(n)=>`${n}T überfällig`, dueFuture:(n)=>`In ${n} Tagen`,
    langLabel:"DE 🇩🇪",
    tabTimetable:"🗓 Stundenplan", tabShopping:"🛒 Einkauf", tabCycle:"🌸 Zyklus", tabFinance:"💰 Finanzen",
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
  },
  es: {
    monthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    monthShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    days:["Lu","Ma","Mi","Ju","Vi","Sá","Do"],
    subtitle:"— Rastreador de Vida —",
    tabTracker:"📊 Rastreador", tabDays:"Días", tabTasks:"✅ Tareas", tabAnalysis:"📈 Análisis",
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
    weekPrefix:"Semana", weekShort:"Sem",
    session:"Sesión", focusTime:"Tiempo de Enfoque",
    pomodoroMode:"Pomodoro", shortBreak:"Descanso Corto", longBreak:"Descanso Largo",
    startBtn:"▶ Iniciar", pauseBtn:"⏸ Pausa", resetBtn:"↺ Reiniciar",
    saved:"✓ Guardado",
    completedStat:"completado", habitsStat:"hábitos", daysStat:"días",
    dueToday:"Hoy", dueTomorrow:"Mañana",
    dueOverdue:(n)=>`${n}d de retraso`, dueFuture:(n)=>`En ${n} días`,
    langLabel:"ES 🇪🇸",
    tabTimetable:"🗓 Horario", tabShopping:"🛒 Compras", tabCycle:"🌸 Ciclo", tabFinance:"💰 Finanzas",
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
  },
  fr: {
    monthNames:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
    monthShort:["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],
    days:["Lu","Ma","Me","Je","Ve","Sa","Di"],
    subtitle:"— Suivi de Vie —",
    tabTracker:"📊 Suivi", tabDays:"Jours", tabTasks:"✅ Tâches", tabAnalysis:"📈 Analyse",
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
    weekPrefix:"Semaine", weekShort:"Sem",
    session:"Séance", focusTime:"Temps de Focus",
    pomodoroMode:"Pomodoro", shortBreak:"Courte Pause", longBreak:"Longue Pause",
    startBtn:"▶ Démarrer", pauseBtn:"⏸ Pause", resetBtn:"↺ Réinitialiser",
    saved:"✓ Sauvegardé",
    completedStat:"complété", habitsStat:"habitudes", daysStat:"jours",
    dueToday:"Aujourd'hui", dueTomorrow:"Demain",
    dueOverdue:(n)=>`${n}j de retard`, dueFuture:(n)=>`Dans ${n} jours`,
    langLabel:"FR 🇫🇷",
    tabTimetable:"🗓 Emploi du temps", tabShopping:"🛒 Courses", tabCycle:"🌸 Cycle", tabFinance:"💰 Finances",
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

let saveTimer=null,editingHabit=null,taskFilter="all",taskScope="daily",trackerScope="weekly",currentWeekIdx=null,ttWeekIdx=null;
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
  habits:["Wake up at 05:00 ⏰","Gym 💪","Work on Side Hustle 🌿","Day Planning 📋","Budget Tracking 💰","Project Work 🎯","No Alcohol 🚫","Social Media Detox 🌱","Goal Journaling 📓","Cold Shower ❄️"],
  checked:{}, mindset:{},
  tasks:[
    {id:1,name:"Call Jack with idea",priority:"high",due:"",status:"inprogress",done:false,scope:"daily"},
    {id:2,name:"Look for new platforms",priority:"high",due:"",status:"inprogress",done:false,scope:"weekly"},
    {id:3,name:"Prepare necessary docs",priority:"medium",due:"",status:"notstarted",done:false,scope:"weekly"},
    {id:4,name:"Weekly review & log progress",priority:"medium",due:"",status:"inprogress",done:false,scope:"weekly"},
    {id:5,name:"Clean workspace",priority:"low",due:"",status:"notstarted",done:false,scope:"daily"},
  ],
  goals:[
    {id:1,name:"Complete all tasks ✅",progress:60},
    {id:2,name:"Gym 5x per week 💪",progress:80},
    {id:3,name:"Read 2 books 📚",progress:40},
    {id:4,name:"Save €500 💰",progress:25},
  ],
  tab:CURRENT_PAGE, taskIdCtr:6, goalIdCtr:5,
  shopItems:[], shopIdCtr:1,
  goalsDaily:[], goalsDailyCtr:1,
  goalsWeekly:[], goalsWeeklyCtr:1,
  goalsMonthly:[], goalsMonthlyCtr:1,
  goalsYearly:[], goalsYearlyCtr:1,
  todos:[], todoCtr:1,
  cycleData:{ periods:[], days:{}, cycleLen:28, mode:"natural", takenPills:{} },
  timetable:[], ttIdCtr:1
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
  }catch(e){}
  flashSaved();
}
function loadAll(){
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
}

function getDaysInMonth(y,m){return new Date(y,m+1,0).getDate();}
function getFirstDayOffset(y,m){const d=new Date(y,m,1).getDay();return d===0?6:d-1;}
function getDow(y,m,d){const w=new Date(y,m,d).getDay();return w===0?6:w-1;}
function getWeekIdx(d,offset){return Math.floor((d-1+offset)/7);}
function isChecked(hi,d){return!!state.checked[`${hi}_${d}`];}
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
  if(CURRENT_PAGE==="tracker"){
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
      row.innerHTML=`<span class="habit-name-text">${h}</span>
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
      else{const today=isToday(d);cell.innerHTML=`<div class="day-dow" style="color:${wcolor}">${DAYS_ARR[dow]}</div><div class="day-num ${today?'today-num':''}">${d}</div>`;}
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
          box.dataset.hi=hi;box.dataset.d=d;
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

  if(state.tab==="tracker"&&trackerScope==="daily")renderDaysView(animate);
  else if(state.tab==="tracker"&&trackerScope==="weekly")renderWeeklyView(animate);
  else if(state.tab==="tasks")renderTasksView();
  else if(state.tab==="analysis")renderAnalysis(days,total,done,pct,hp,wg,wt,dt);
}

function renderDaysView(animate){
  const total=getDaysInMonth(state.year,state.month);
  const grid=document.getElementById("days-grid");grid.innerHTML="";
  for(let d=total;d>=1;d--){
    const pct=calcDayPct(d);const color=pctColor(pct);
    const today=isToday(d);const future=isFuture(d);
    const card=document.createElement("div");
    card.className="day-card"+(today?" is-today":"")+(future?" future":"");
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
    const mtypes=[
      {key:"energy",label:t('energy'),icon:"⚡",cols:["#2a3d5e","#f5a62388","#f5a623bb","#f5a623","#ffbe4a"]},
      {key:"focus",label:t('focus'),icon:"🎯",cols:["#2a3d5e","#4f6ef788","#4f6ef7bb","#4f6ef7","#7090f9"]},
      {key:"motivation",label:t('mood'),icon:"🔥",cols:["#2a3d5e","#e05a9a88","#e05a9abb","#e05a9a","#f07ab0"]},
    ];
    let mHTML=`<div class="mindset-section"><div class="mindset-title">${t('mindsetTitle')}</div>`;
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
    const ms=getMonthShort();
    card.innerHTML=`
      <div class="day-card-top">
        <span class="day-card-label">${t('thisDay')}</span>
        ${today?`<span class="day-card-today-badge">${t('todayBadge')}</span>`:""}
      </div>
      <div class="day-card-date">${ms[state.month]} ${d}</div>
      <div class="day-card-progress-row">
        <span class="day-card-pct" style="color:${color}">${pct}%</span>
        <div class="day-card-track"><div class="day-card-fill" style="width:0%;background:${color};"></div></div>
      </div>
      <div class="day-habits-list">${habHTML}</div>
      ${mHTML}`;
    grid.appendChild(card);
    const delay=(total-d)*.035;
    setTimeout(()=>{card.style.animation=`scalePop .38s ${delay}s cubic-bezier(.4,0,.2,1) both`;},10);
    requestAnimationFrame(()=>{setTimeout(()=>{const fill=card.querySelector(".day-card-fill");if(fill)fill.style.width=pct+"%";},80+(total-d)*30);});
  }
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
  renderMindsetChart(days);renderGoals();
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
      row.innerHTML=`<span class="weekly-habit-name-text">${h}</span>
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
        cb.dataset.hi=hi;cb.dataset.d=d;
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
    // Intimacy dot indicator
    const dayEntry=(state.cycleData.days||{})[dk]||{};
    const intArr=dk===todayKey()?todayIntimacy:(dayEntry.intimacy||[]);
    if(intArr.length) cell.classList.add("has-intimacy");
    cell.textContent=d;
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
    li.innerHTML=`<div class="int-legend-dot" style="background:${INTIMACY_COLORS[k]||'#888'}"></div>${types[i]||k}`;
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

  // Base phase risk score
  const phaseScore={period:0.02,fertile:0.30,ovulation:0.45,null:0.05,"pms-zone":0.03}[tag]??0.05;

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

  // Score computation
  let score=phaseScore;
  if(hasUnprotected) score*=1.0;    // full
  else if(hasProtected) score*=0.15; // ~15% of base
  else if(hasOral||hasKiss) score*=0.01; // negligible
  else score=0;                           // no contact

  if(pillActive) score*=0.01; // 99% effective

  // Clamp
  score=Math.min(1,Math.max(0,score));
  const level=score<0.005?"none":score<0.05?"low":score<0.15?"medium":score<0.35?"high":"very_high";

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

  const pctDisplay=Math.round(risk.score*100);

  el.innerHTML=`
    <div class="preg-risk-gauge">
      <div class="preg-gauge-arc">
        <svg viewBox="0 0 120 66" xmlns="http://www.w3.org/2000/svg">
          <path d="M 14 60 A 46 46 0 0 1 106 60" fill="none" stroke="var(--border)" stroke-width="11" stroke-linecap="round"/>
          <path d="M 14 60 A 46 46 0 0 1 106 60" fill="none" stroke="${color}" stroke-width="11" stroke-linecap="round"
            stroke-dasharray="${dash}" style="transition:stroke-dasharray .7s cubic-bezier(.4,0,.2,1);"/>
        </svg>
      </div>
      <div class="preg-risk-label preg-risk-hoverable" style="color:${color};" data-pct="${pctDisplay}%">
        <span class="preg-label-text">${label}</span>
        <span class="preg-label-pct">${pctDisplay}%</span>
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
        <div class="preg-factor-badge ${risk.hasUnprotected||risk.hasProtected||risk.hasKiss||risk.hasOral?"preg-badge-med":"preg-badge-low"}">${risk.hasUnprotected?"🔥 Yes":risk.hasProtected?"🛡 Yes":risk.hasKiss||risk.hasOral?"💜 Yes":"—"}</div>
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
  if(langDropOpen && !langDropdown.contains(e.target) && e.target!==langBtn){
    closeLangDrop();
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
  b.classList.toggle("active",!w.classList.contains("hidden"));
}

document.getElementById("pomo-toggle").addEventListener("click",togglePomoWidget);
document.getElementById("pomo-close-btn").addEventListener("click",()=>{
  document.getElementById("pomo-widget").classList.add("hidden");
  document.getElementById("pomo-backdrop").classList.add("hidden");
  document.getElementById("pomo-toggle").classList.remove("active");
});
// Click backdrop to close
document.getElementById("pomo-backdrop").addEventListener("click",()=>{
  document.getElementById("pomo-widget").classList.add("hidden");
  document.getElementById("pomo-backdrop").classList.add("hidden");
  document.getElementById("pomo-toggle").classList.remove("active");
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
      ttWeekIdx=null;ttWeekStart=null;loadMonthData();render(true);applyTranslations();
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
      ttWeekIdx=null;ttWeekStart=null;loadMonthData();render(true);applyTranslations();
    }
  }
});
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click",()=>switchTab(btn.dataset.tab));
});

// ── TRACKER PAGE ──────────────────────────────────────────────────────────────
if(CURRENT_PAGE==="tracker"){
  on("tracker-section","click",e=>{
    const cb=e.target.closest(".day-habit-cb");
    if(cb){toggleCheck(+cb.dataset.hi,+cb.dataset.d);return;}
    const star=e.target.closest(".mindset-star[data-d]");
    if(star){
      const d=+star.dataset.d,type=star.dataset.type,val=+star.dataset.val;
      const cur=getMindset(d,type);setMindset(d,type,cur===val?0:val);renderDaysView(false);
      return;
    }
    const wcb=e.target.closest(".weekly-cb[data-hi]");
    if(wcb){wcb.classList.add("checking");setTimeout(()=>wcb.classList.remove("checking"),320);toggleCheck(+wcb.dataset.hi,+wcb.dataset.d);return;}
    const scopeBtn=e.target.closest(".tracker-scope-btn");
    if(scopeBtn){applyTrackerScope(scopeBtn.dataset.tscope);return;}
    const box=e.target.closest(".checkbox:not(.invisible)");
    if(box){box.classList.add("checking");setTimeout(()=>box.classList.remove("checking"),320);toggleCheck(+box.dataset.hi,+box.dataset.d);return;}
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

// ── ANALYSIS PAGE ─────────────────────────────────────────────────────────────
if(CURRENT_PAGE==="analysis"){
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
  document.addEventListener('click',e=>{if(open&&!dropdown.contains(e.target)&&e.target!==btn)closeDrop();});
  dropdown.querySelectorAll('.theme-option').forEach(opt=>{
    opt.addEventListener('click',e=>{e.stopPropagation();applyTheme(opt.dataset.theme);closeDrop();});
  });
})();

// ─── INIT ─────────────────────────────────────────────────────────────────────
loadAll();
applyTranslations();
updatePomoDisplay();

// Mark active tab link
document.querySelectorAll('.tab-btn').forEach(b=>{
  b.classList.toggle('active', b.dataset.tab===CURRENT_PAGE);
});

// Page-specific initialisation
if(CURRENT_PAGE==='tracker'){
  render(true);
  applyTrackerScope(trackerScope);
} else if(CURRENT_PAGE==='tasks'){
  renderTasksView();
} else if(CURRENT_PAGE==='analysis'){
  const{days,total,done,pct}=calcStats();const wg=getWeekGroups();
  renderAnalysis(days,total,done,pct,calcHabitPcts(),wg,calcWeekTotals(wg),calcDowTotals());
} else if(CURRENT_PAGE==='shopping'){
  renderShoppingList();
} else if(CURRENT_PAGE==='cycle'){
  renderCycleTracker();
} else if(CURRENT_PAGE==='timetable'){
  renderTimetable();
  const mon=ttWeekStart||getTTWeekMonday(new Date());
  document.getElementById('month-title').textContent=getMonthNames()[mon.getMonth()];
  document.getElementById('year-label').textContent=mon.getFullYear();
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
    this.popup.addEventListener('click', e => e.stopPropagation());
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

    this.popup.addEventListener('click', e => {
      const act = e.target.closest('[data-act]')?.dataset?.act;
      if (act === 'prev') { this.viewMonth--; if (this.viewMonth<0){this.viewMonth=11;this.viewYear--;} this._render(); return; }
      if (act === 'next') { this.viewMonth++; if (this.viewMonth>11){this.viewMonth=0;this.viewYear++;} this._render(); return; }
      if (act === 'years') { this.mode='years'; this._render(); return; }
      if (act === 'today') {
        const t=new Date(); this._pick(t.getFullYear(), t.getMonth(), t.getDate()); return;
      }
      if (act === 'clear') { this.setValue(''); this.input.dispatchEvent(new Event('change',{bubbles:true})); this.closePopup(); return; }
      const day = e.target.closest('.dp-day');
      if (day) { this._pick(+day.dataset.y, +day.dataset.m, +day.dataset.d); }
    }, { once: true });
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
    this.popup.addEventListener('click', e => {
      if (e.target.closest('[data-act="back"]')) { this.mode='days'; this._render(); return; }
      const yi = e.target.closest('.dp-year-item');
      if (yi) { this.viewYear=+yi.dataset.year; this.mode='days'; this._render(); }
    }, { once: true });
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
        finSavingsGoals:'Savings Goals' },
  hu: { tabFinance:'💰 Pénzügy', finTotalExpenses:'Összes kiadás', finTotalIncome:'Összes bevétel',
        finBalance:'Egyenleg', finMonthlyBudget:'Havi keret', finExpenses:'Kiadások',
        finIncome:'Bevételek', finDescription:'Megnevezés', finAmount:'Összeg',
        finCategory:'Kategória', finSource:'Forrás', finNoExpenses:'Még nincs kiadás.',
        finNoIncome:'Még nincs bevétel.', finDescPlaceholder:'Megnevezés…',
        finSourcePlaceholder:'Forrás…', finAddEntry:'+ Hozzáad', finToday:'Ma',
        finThisWeek:'Ez a hét', finThisMonth:'Ez a hónap', finAll:'Mind',
        finBudgetBreakdown:'Kategóriák', finTotalSpent:'Összesen',
        finSavingsGoals:'Megtakarítási célok' },
  de: { tabFinance:'💰 Finanzen', finTotalExpenses:'Gesamtausgaben', finTotalIncome:'Gesamteinnahmen',
        finBalance:'Saldo', finMonthlyBudget:'Monatsbudget', finExpenses:'Ausgaben',
        finIncome:'Einnahmen', finNoExpenses:'Noch keine Ausgaben.', finNoIncome:'Noch keine Einnahmen.',
        finDescPlaceholder:'Beschreibung…', finSourcePlaceholder:'Quelle…', finAddEntry:'+ Hinzufügen',
        finToday:'Heute', finThisWeek:'Diese Woche', finThisMonth:'Dieser Monat', finAll:'Alle',
        finBudgetBreakdown:'Ausgaben nach Kategorie', finTotalSpent:'Gesamt ausgegeben',
        finSavingsGoals:'Sparziele' },
  es: { tabFinance:'💰 Finanzas', finTotalExpenses:'Total gastos', finTotalIncome:'Total ingresos',
        finBalance:'Balance', finMonthlyBudget:'Presupuesto mensual', finExpenses:'Gastos',
        finIncome:'Ingresos', finNoExpenses:'Sin gastos aún.', finNoIncome:'Sin ingresos aún.',
        finDescPlaceholder:'Descripción…', finSourcePlaceholder:'Fuente…', finAddEntry:'+ Añadir',
        finToday:'Hoy', finThisWeek:'Esta semana', finThisMonth:'Este mes', finAll:'Todo',
        finBudgetBreakdown:'Desglose', finTotalSpent:'Total gastado',
        finSavingsGoals:'Metas de ahorro' },
  fr: { tabFinance:'💰 Finances', finTotalExpenses:'Total dépenses', finTotalIncome:'Total revenus',
        finBalance:'Solde', finMonthlyBudget:'Budget mensuel', finExpenses:'Dépenses',
        finIncome:'Revenus', finNoExpenses:'Aucune dépense encore.', finNoIncome:'Aucun revenu encore.',
        finDescPlaceholder:'Description…', finSourcePlaceholder:'Source…', finAddEntry:'+ Ajouter',
        finToday:"Aujourd'hui", finThisWeek:'Cette semaine', finThisMonth:'Ce mois', finAll:'Tout',
        finBudgetBreakdown:'Répartition', finTotalSpent:'Total dépensé',
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

// Sample data if empty
function maybeAddSampleData() {
  if (finState.expenses.length > 0 || finState.incomes.length > 0) return;
  const today = fmtDate(new Date());
  finState.expenses = [
    {id:finState.idCtr++,emoji:'💊',desc:'Pharmacy',amount:39,category:'Health',date:today},
    {id:finState.idCtr++,emoji:'📗',desc:'Books',amount:13,category:'Entertainment',date:today},
    {id:finState.idCtr++,emoji:'⛽',desc:'Fuel',amount:80,category:'Transport',date:today},
    {id:finState.idCtr++,emoji:'🥪',desc:'Lunch cafe',amount:37.65,category:'Food',date:today},
    {id:finState.idCtr++,emoji:'🚻',desc:'Park toilet',amount:0.79,category:'Utilities',date:today},
    {id:finState.idCtr++,emoji:'📒',desc:'New book',amount:25.99,category:'Development',date:today},
    {id:finState.idCtr++,emoji:'🥤',desc:'Cola + snacks',amount:3.74,category:'Food',date:today},
    {id:finState.idCtr++,emoji:'🥇',desc:'1 gram of Gold',amount:127,category:'Investment',date:today},
  ];
  saveFinance();
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
      <div class="fin-entry-cat"><span class="fin-cat-badge ${catClass(exp.category)}">${exp.category}</span></div>
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
      <div class="fin-entry-cat"><span class="fin-cat-badge ${catClass(inc.category)}">${inc.category}</span></div>
      <div class="fin-entry-actions">
        <button class="fin-entry-del-btn" data-del-inc="${inc.id}" title="Delete">×</button>
      </div>`;
    list.appendChild(row);
  });
}

function renderBreakdown() {
  const el = document.getElementById('fin-breakdown-list');
  const totalEl = document.getElementById('fin-breakdown-total');
  const monthExp = finState.expenses.filter(e => inScope(e.date,'month'));
  const totals = {};
  monthExp.forEach(e => { totals[e.category] = (totals[e.category]||0)+Number(e.amount); });
  const total = Object.values(totals).reduce((s,v)=>s+v,0);
  totalEl.textContent = fmtAmt(total);
  const sorted = Object.entries(totals).sort((a,b)=>b[1]-a[1]);
  if (!sorted.length) { el.innerHTML = '<div class="fin-empty-msg" style="font-size:12px;">No data this month.</div>'; return; }
  el.innerHTML = '';
  sorted.forEach(([cat, amt]) => {
    const pct = total > 0 ? Math.round(amt/total*100) : 0;
    const color = CAT_COLORS[cat]||'#8898aa';
    const item = document.createElement('div');
    item.className = 'fin-breakdown-item';
    item.innerHTML = `
      <div class="fin-breakdown-dot" style="background:${color}"></div>
      <div class="fin-breakdown-label">${cat}</div>
      <div class="fin-breakdown-bar-wrap"><div class="fin-breakdown-bar-fill" style="width:0%;background:${color}"></div></div>
      <div class="fin-breakdown-pct">${pct}%</div>
      <div class="fin-breakdown-amt">${fmtAmt(amt)}</div>`;
    el.appendChild(item);
    requestAnimationFrame(()=>setTimeout(()=>{ const f=item.querySelector('.fin-breakdown-bar-fill');if(f)f.style.width=pct+'%'; },80));
  });
}

function renderSavings() {
  const el = document.getElementById('fin-savings-list');
  if (!finState.savings.length) {
    el.innerHTML = '<div class="fin-empty-msg" style="font-size:12px;">No savings goals yet.</div>';
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
  renderBreakdown();
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
maybeAddSampleData();
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