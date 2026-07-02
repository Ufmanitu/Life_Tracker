// ═══════════════════════════════════════════════════════════════════════════════
// ─── WORKOUT TRACKER ─────────────────────────────────────────────────────────
// Storage keys:
//   lt_workouts_{YYYY-MM}  → { sessions: [...], ctr: N }
//   lt_workout_templates   → [ ...template objects ]
// Each session: { id, date, exercises:[{...}], linkedHabit, totalVolume, totalDuration, note }
// Each exercise: { id, name, cat, type, sets, reps, weight, duration, distance, notes }
// ═══════════════════════════════════════════════════════════════════════════════

if (CURRENT_PAGE === 'workout') {

// ── WORKOUT TRANSLATIONS ─────────────────────────────────────────────────
const WKT_I18N = {
  en: {
    wktStatStreak:'Streak', wktStatThisMonth:'This Month', wktStatSessionsUnit:'sessions',
    wktStatTotalVolume:'Total Volume', wktStatAvgDuration:'Avg Duration', wktStatMinUnit:'min',
    wktStatNetCalToday:'Net Calories Today',
    wktAddExerciseTitle:'+ Log Exercise',
    wktExerciseNameLabel:'Exercise Name', wktExerciseNamePh:'e.g. Bench Press, Running…',
    wktCategoryLabel:'Category',
    wktCatStrengthOpt:'💪 Strength', wktCatCardioOpt:'🏃 Cardio', wktCatFlexibilityOpt:'🧘 Flexibility',
    wktCatSportOpt:'⚽ Sport', wktCatOtherOpt:'📦 Other',
    wktTypeLabel:'Type', wktTypeSetsOpt:'Sets × Reps', wktTypeDurationOpt:'Duration', wktTypeDistanceOpt:'Distance',
    wktSetsLabel:'Sets', wktRepsLabel:'Reps', wktWeightLabel:'Weight (kg)',
    wktDurationLabel:'Duration (min)', wktDistanceLabel:'Distance (km)',
    wktLinkHabitLabel:'Link to Habit', wktNotesLabel:'Notes', wktNotesPh:'Optional notes…',
    wktWeeklyActivityTitle:'📊 Weekly Activity', wktMonthlyHeatmapTitle:'🗓 Monthly Heatmap',
    wktHeatmapRest:'Rest', wktHeatmapActive:'Active',
    wktPersonalRecordsTitle:'🏆 Personal Records', wktTemplatesTitle:'📋 Workout Templates',
    wktSaveTodayBtn:'💾 Save Today', wktNoTemplatesMsg:'No templates yet. Log a session and save it!',
    wktEmptyDayTitle:'No workout logged yet', wktEmptyDayHint:'Add exercises below to start.',
    wktDeleteSessionTitle:'Delete session', wktRemoveTitle:'Remove',
    wktLinkedHabitPrefix:'✅ Linked habit:',
    wktCatNameStrength:'Strength', wktCatNameCardio:'Cardio', wktCatNameFlexibility:'Flexibility',
    wktCatNameSport:'Sport', wktCatNameOther:'Other',
    wktNoRecordsMsg:'No records yet. Start logging!',
    wktUseTemplateBtn:'▶ Use', wktDeleteTemplateTitle:'Delete template',
    wktNetCalIn:'in', wktNetCalBurned:'burned', wktPreviewBurnedSuffix:'kcal burned',
    wktAlertNoExercisesToday:'No exercises logged today to save as a template.',
    wktAlertNoExercisesFound:'No exercises found.', wktPromptTemplateName:'Template name:',
    wktSessionsCountFn: n => `${n} session${n!==1?'s':''}`,
    wktExerciseCountFn: n => `${n} exercise${n!==1?'s':''}`,
    wktDefaultTemplateNameFn: n => `Workout ${n}`,
  },
  hu: {
    wktStatStreak:'Sorozat', wktStatThisMonth:'Ebben a hónapban', wktStatSessionsUnit:'edzés',
    wktStatTotalVolume:'Összes terhelés', wktStatAvgDuration:'Átlagos időtartam', wktStatMinUnit:'perc',
    wktStatNetCalToday:'Mai nettó kalória',
    wktAddExerciseTitle:'+ Edzés rögzítése',
    wktExerciseNameLabel:'Gyakorlat neve', wktExerciseNamePh:'pl. Fekvenyomás, Futás…',
    wktCategoryLabel:'Kategória',
    wktCatStrengthOpt:'💪 Erő', wktCatCardioOpt:'🏃 Kardió', wktCatFlexibilityOpt:'🧘 Nyújtás',
    wktCatSportOpt:'⚽ Sport', wktCatOtherOpt:'📦 Egyéb',
    wktTypeLabel:'Típus', wktTypeSetsOpt:'Szettek × ismétlés', wktTypeDurationOpt:'Időtartam', wktTypeDistanceOpt:'Távolság',
    wktSetsLabel:'Szettek', wktRepsLabel:'Ismétlés', wktWeightLabel:'Súly (kg)',
    wktDurationLabel:'Időtartam (perc)', wktDistanceLabel:'Távolság (km)',
    wktLinkHabitLabel:'Szokáshoz kapcsolás', wktNotesLabel:'Megjegyzések', wktNotesPh:'Opcionális megjegyzés…',
    wktWeeklyActivityTitle:'📊 Heti aktivitás', wktMonthlyHeatmapTitle:'🗓 Havi hőtérkép',
    wktHeatmapRest:'Pihenő', wktHeatmapActive:'Aktív',
    wktPersonalRecordsTitle:'🏆 Egyéni csúcsok', wktTemplatesTitle:'📋 Edzéssablonok',
    wktSaveTodayBtn:'💾 Mai mentése', wktNoTemplatesMsg:'Még nincs sablon. Rögzíts egy edzést, és mentsd el!',
    wktEmptyDayTitle:'Még nincs rögzített edzés', wktEmptyDayHint:'Adj hozzá gyakorlatokat alább a kezdéshez.',
    wktDeleteSessionTitle:'Edzés törlése', wktRemoveTitle:'Eltávolítás',
    wktLinkedHabitPrefix:'✅ Kapcsolt szokás:',
    wktCatNameStrength:'Erő', wktCatNameCardio:'Kardió', wktCatNameFlexibility:'Nyújtás',
    wktCatNameSport:'Sport', wktCatNameOther:'Egyéb',
    wktNoRecordsMsg:'Még nincs csúcs. Kezdj el rögzíteni!',
    wktUseTemplateBtn:'▶ Használat', wktDeleteTemplateTitle:'Sablon törlése',
    wktNetCalIn:'bevitel', wktNetCalBurned:'elégetve', wktPreviewBurnedSuffix:'kcal elégetve',
    wktAlertNoExercisesToday:'Mára nincs rögzített gyakorlat, amit sablonként menthetnél.',
    wktAlertNoExercisesFound:'Nem található gyakorlat.', wktPromptTemplateName:'Sablon neve:',
    wktSessionsCountFn: n => `${n} edzés`,
    wktExerciseCountFn: n => `${n} gyakorlat`,
    wktDefaultTemplateNameFn: n => `Edzés ${n}`,
  },
  de: {
    wktStatStreak:'Serie', wktStatThisMonth:'Dieser Monat', wktStatSessionsUnit:'Einheiten',
    wktStatTotalVolume:'Gesamtvolumen', wktStatAvgDuration:'Ø Dauer', wktStatMinUnit:'Min',
    wktStatNetCalToday:'Netto-Kalorien heute',
    wktAddExerciseTitle:'+ Übung protokollieren',
    wktExerciseNameLabel:'Übungsname', wktExerciseNamePh:'z.B. Bankdrücken, Laufen…',
    wktCategoryLabel:'Kategorie',
    wktCatStrengthOpt:'💪 Kraft', wktCatCardioOpt:'🏃 Cardio', wktCatFlexibilityOpt:'🧘 Flexibilität',
    wktCatSportOpt:'⚽ Sport', wktCatOtherOpt:'📦 Sonstiges',
    wktTypeLabel:'Typ', wktTypeSetsOpt:'Sätze × Wdh.', wktTypeDurationOpt:'Dauer', wktTypeDistanceOpt:'Distanz',
    wktSetsLabel:'Sätze', wktRepsLabel:'Wiederholungen', wktWeightLabel:'Gewicht (kg)',
    wktDurationLabel:'Dauer (Min.)', wktDistanceLabel:'Distanz (km)',
    wktLinkHabitLabel:'Mit Gewohnheit verknüpfen', wktNotesLabel:'Notizen', wktNotesPh:'Optionale Notizen…',
    wktWeeklyActivityTitle:'📊 Wöchentliche Aktivität', wktMonthlyHeatmapTitle:'🗓 Monatliche Heatmap',
    wktHeatmapRest:'Ruhe', wktHeatmapActive:'Aktiv',
    wktPersonalRecordsTitle:'🏆 Persönliche Bestleistungen', wktTemplatesTitle:'📋 Workout-Vorlagen',
    wktSaveTodayBtn:'💾 Heute speichern', wktNoTemplatesMsg:'Noch keine Vorlagen. Protokolliere eine Einheit und speichere sie!',
    wktEmptyDayTitle:'Noch kein Workout protokolliert', wktEmptyDayHint:'Füge unten Übungen hinzu, um zu starten.',
    wktDeleteSessionTitle:'Einheit löschen', wktRemoveTitle:'Entfernen',
    wktLinkedHabitPrefix:'✅ Verknüpfte Gewohnheit:',
    wktCatNameStrength:'Kraft', wktCatNameCardio:'Cardio', wktCatNameFlexibility:'Flexibilität',
    wktCatNameSport:'Sport', wktCatNameOther:'Sonstiges',
    wktNoRecordsMsg:'Noch keine Bestleistungen. Beginne mit dem Protokollieren!',
    wktUseTemplateBtn:'▶ Verwenden', wktDeleteTemplateTitle:'Vorlage löschen',
    wktNetCalIn:'Aufnahme', wktNetCalBurned:'verbrannt', wktPreviewBurnedSuffix:'kcal verbrannt',
    wktAlertNoExercisesToday:'Heute wurden keine Übungen protokolliert, die als Vorlage gespeichert werden könnten.',
    wktAlertNoExercisesFound:'Keine Übungen gefunden.', wktPromptTemplateName:'Vorlagenname:',
    wktSessionsCountFn: n => `${n} Einheit${n!==1?'en':''}`,
    wktExerciseCountFn: n => `${n} Übung${n!==1?'en':''}`,
    wktDefaultTemplateNameFn: n => `Workout ${n}`,
  },
  es: {
    wktStatStreak:'Racha', wktStatThisMonth:'Este mes', wktStatSessionsUnit:'sesiones',
    wktStatTotalVolume:'Volumen total', wktStatAvgDuration:'Duración media', wktStatMinUnit:'min',
    wktStatNetCalToday:'Calorías netas hoy',
    wktAddExerciseTitle:'+ Registrar ejercicio',
    wktExerciseNameLabel:'Nombre del ejercicio', wktExerciseNamePh:'ej. Press de banca, Correr…',
    wktCategoryLabel:'Categoría',
    wktCatStrengthOpt:'💪 Fuerza', wktCatCardioOpt:'🏃 Cardio', wktCatFlexibilityOpt:'🧘 Flexibilidad',
    wktCatSportOpt:'⚽ Deporte', wktCatOtherOpt:'📦 Otro',
    wktTypeLabel:'Tipo', wktTypeSetsOpt:'Series × repeticiones', wktTypeDurationOpt:'Duración', wktTypeDistanceOpt:'Distancia',
    wktSetsLabel:'Series', wktRepsLabel:'Repeticiones', wktWeightLabel:'Peso (kg)',
    wktDurationLabel:'Duración (min)', wktDistanceLabel:'Distancia (km)',
    wktLinkHabitLabel:'Vincular a un hábito', wktNotesLabel:'Notas', wktNotesPh:'Notas opcionales…',
    wktWeeklyActivityTitle:'📊 Actividad semanal', wktMonthlyHeatmapTitle:'🗓 Mapa de calor mensual',
    wktHeatmapRest:'Descanso', wktHeatmapActive:'Activo',
    wktPersonalRecordsTitle:'🏆 Récords personales', wktTemplatesTitle:'📋 Plantillas de entrenamiento',
    wktSaveTodayBtn:'💾 Guardar hoy', wktNoTemplatesMsg:'Aún no hay plantillas. ¡Registra una sesión y guárdala!',
    wktEmptyDayTitle:'Aún no hay entrenamiento registrado', wktEmptyDayHint:'Añade ejercicios abajo para empezar.',
    wktDeleteSessionTitle:'Eliminar sesión', wktRemoveTitle:'Eliminar',
    wktLinkedHabitPrefix:'✅ Hábito vinculado:',
    wktCatNameStrength:'Fuerza', wktCatNameCardio:'Cardio', wktCatNameFlexibility:'Flexibilidad',
    wktCatNameSport:'Deporte', wktCatNameOther:'Otro',
    wktNoRecordsMsg:'Aún no hay récords. ¡Empieza a registrar!',
    wktUseTemplateBtn:'▶ Usar', wktDeleteTemplateTitle:'Eliminar plantilla',
    wktNetCalIn:'ingerido', wktNetCalBurned:'quemado', wktPreviewBurnedSuffix:'kcal quemadas',
    wktAlertNoExercisesToday:'No hay ejercicios registrados hoy para guardar como plantilla.',
    wktAlertNoExercisesFound:'No se encontraron ejercicios.', wktPromptTemplateName:'Nombre de la plantilla:',
    wktSessionsCountFn: n => `${n} sesión${n!==1?'es':''}`,
    wktExerciseCountFn: n => `${n} ejercicio${n!==1?'s':''}`,
    wktDefaultTemplateNameFn: n => `Entrenamiento ${n}`,
  },
  fr: {
    wktStatStreak:'Série', wktStatThisMonth:'Ce mois-ci', wktStatSessionsUnit:'séances',
    wktStatTotalVolume:'Volume total', wktStatAvgDuration:'Durée moyenne', wktStatMinUnit:'min',
    wktStatNetCalToday:"Calories nettes aujourd'hui",
    wktAddExerciseTitle:'+ Enregistrer un exercice',
    wktExerciseNameLabel:"Nom de l'exercice", wktExerciseNamePh:'ex. Développé couché, Course…',
    wktCategoryLabel:'Catégorie',
    wktCatStrengthOpt:'💪 Force', wktCatCardioOpt:'🏃 Cardio', wktCatFlexibilityOpt:'🧘 Flexibilité',
    wktCatSportOpt:'⚽ Sport', wktCatOtherOpt:'📦 Autre',
    wktTypeLabel:'Type', wktTypeSetsOpt:'Séries × répétitions', wktTypeDurationOpt:'Durée', wktTypeDistanceOpt:'Distance',
    wktSetsLabel:'Séries', wktRepsLabel:'Répétitions', wktWeightLabel:'Poids (kg)',
    wktDurationLabel:'Durée (min)', wktDistanceLabel:'Distance (km)',
    wktLinkHabitLabel:'Associer à une habitude', wktNotesLabel:'Notes', wktNotesPh:'Notes facultatives…',
    wktWeeklyActivityTitle:'📊 Activité hebdomadaire', wktMonthlyHeatmapTitle:'🗓 Carte de chaleur mensuelle',
    wktHeatmapRest:'Repos', wktHeatmapActive:'Actif',
    wktPersonalRecordsTitle:'🏆 Records personnels', wktTemplatesTitle:"📋 Modèles d'entraînement",
    wktSaveTodayBtn:"💾 Enregistrer aujourd'hui", wktNoTemplatesMsg:"Aucun modèle pour l'instant. Enregistrez une séance et sauvegardez-la !",
    wktEmptyDayTitle:"Aucun entraînement enregistré pour l'instant", wktEmptyDayHint:'Ajoutez des exercices ci-dessous pour commencer.',
    wktDeleteSessionTitle:'Supprimer la séance', wktRemoveTitle:'Supprimer',
    wktLinkedHabitPrefix:'✅ Habitude associée :',
    wktCatNameStrength:'Force', wktCatNameCardio:'Cardio', wktCatNameFlexibility:'Flexibilité',
    wktCatNameSport:'Sport', wktCatNameOther:'Autre',
    wktNoRecordsMsg:'Pas encore de records. Commencez à enregistrer !',
    wktUseTemplateBtn:'▶ Utiliser', wktDeleteTemplateTitle:'Supprimer le modèle',
    wktNetCalIn:'ingéré', wktNetCalBurned:'brûlé', wktPreviewBurnedSuffix:'kcal brûlées',
    wktAlertNoExercisesToday:"Aucun exercice enregistré aujourd'hui pour être sauvegardé comme modèle.",
    wktAlertNoExercisesFound:'Aucun exercice trouvé.', wktPromptTemplateName:'Nom du modèle :',
    wktSessionsCountFn: n => `${n} séance${n!==1?'s':''}`,
    wktExerciseCountFn: n => `${n} exercice${n!==1?'s':''}`,
    wktDefaultTemplateNameFn: n => `Entraînement ${n}`,
  },
  tr: {
    wktStatStreak:'Seri', wktStatThisMonth:'Bu Ay',
    wktStatSessionsUnit:'antrenman', wktStatTotalVolume:'Toplam Yük',
    wktStatAvgDuration:'Ortalama Süre', wktStatMinUnit:'dk',
    wktStatNetCalToday:'Bugünün Net Kalori',
    wktAddExerciseTitle:'+ Egzersiz Kaydet',
    wktExerciseNameLabel:'Egzersiz Adı', wktExerciseNamePh:'örn. Bench Press, Koşu…',
    wktCategoryLabel:'Kategori',
    wktCatStrengthOpt:'💪 Güç', wktCatCardioOpt:'🏃 Kardiyo',
    wktCatFlexibilityOpt:'🧘 Esneklik', wktCatSportOpt:'⚽ Spor', wktCatOtherOpt:'📦 Diğer',
    wktTypeLabel:'Tür',
    wktTypeSetsOpt:'Set × Tekrar', wktTypeDurationOpt:'Süre', wktTypeDistanceOpt:'Mesafe',
    wktSetsLabel:'Set', wktRepsLabel:'Tekrar', wktWeightLabel:'Ağırlık (kg)',
    wktDurationLabel:'Süre (dk)', wktDistanceLabel:'Mesafe (km)',
    wktLinkHabitLabel:'Alışkanlığa Bağla',
    wktNotesLabel:'Notlar', wktNotesPh:'İsteğe bağlı notlar…',
    wktWeeklyActivityTitle:'📊 Haftalık Aktivite',
    wktMonthlyHeatmapTitle:'🗓 Aylık Isı Haritası',
    wktHeatmapRest:'Dinlenme', wktHeatmapActive:'Aktif',
    wktPersonalRecordsTitle:'🏆 Kişisel Rekorlar',
    wktTemplatesTitle:'📋 Antrenman Şablonları',
    wktSaveTodayBtn:'💾 Bugünü Kaydet',
    wktNoTemplatesMsg:'Henüz şablon yok. Bir antrenman kaydedin!',
    wktEmptyDayTitle:'Henüz antrenman kaydedilmemiş',
    wktEmptyDayHint:'Başlamak için aşağıya egzersiz ekleyin.',
    wktDeleteSessionTitle:'Antrenmanı sil', wktRemoveTitle:'Kaldır',
    wktLinkedHabitPrefix:'✅ Bağlı alışkanlık:',
    wktCatNameStrength:'Güç', wktCatNameCardio:'Kardiyo',
    wktCatNameFlexibility:'Esneklik', wktCatNameSport:'Spor', wktCatNameOther:'Diğer',
    wktNoRecordsMsg:'Henüz rekor yok. Kaydetmeye başlayın!',
    wktUseTemplateBtn:'▶ Kullan', wktDeleteTemplateTitle:'Şablonu sil',
    wktNetCalIn:'alınan', wktNetCalBurned:'yakılan',
    wktPreviewBurnedSuffix:'kcal yakıldı',
    wktAlertNoExercisesToday:'Bugün şablon olarak kaydedilecek egzersiz kaydedilmemiş.',
    wktAlertNoExercisesFound:'Egzersiz bulunamadı.',
    wktPromptTemplateName:'Şablon adı:',
    wktSessionsCountFn: n => `${n} antrenman`,
    wktExerciseCountFn: n => `${n} egzersiz`,
    wktDefaultTemplateNameFn: n => `Antrenman ${n}`,
  },
};
Object.keys(TRANSLATIONS).forEach(lang => {
  if (WKT_I18N[lang]) Object.assign(TRANSLATIONS[lang], WKT_I18N[lang]);
});

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
const WKT_CAT_NAME_KEYS = {
  strength:'wktCatNameStrength', cardio:'wktCatNameCardio', flexibility:'wktCatNameFlexibility',
  sport:'wktCatNameSport', other:'wktCatNameOther'
};
function wktCatLabel(c) { return t(WKT_CAT_NAME_KEYS[c]) || c; }

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
    netEl.innerHTML = `<span style="color:${color};font-weight:800;">${net.net > 0 ? '+' : ''}${net.net}</span> <span style="font-size:11px;color:var(--text-muted);">kcal (${net.intake} ${t('wktNetCalIn')} − ${net.burned} ${t('wktNetCalBurned')})</span>`;
  } else {
    netEl.textContent = '—';
  }
}

// ── Populate habit link selector ────────────────────────────────────────────
function wktPopulateHabits() {
  const sel = document.getElementById('wkt-habit-select');
  if (!sel) return;
  // state.habits is available from main app.js
  sel.innerHTML = `<option value="">${t('settingsDefaultHabitNone')}</option>`;
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
      <div style="font-weight:700;color:var(--text);font-size:14px;">${t('wktEmptyDayTitle')}</div>
      <div style="color:var(--text-muted);font-size:12px;margin-top:4px;">${t('wktEmptyDayHint')}</div>
    </div>`;
    return;
  }

  list.innerHTML = sessions.map(sess => {
    const vol = wktSessionVolume(sess);
    const dur = wktSessionDuration(sess);
    const cats = [...new Set(sess.exercises.map(e=>e.cat))];
    const catTags = cats.map(c => `<span class="wkt-cat-tag" style="background:${WKT_CAT_COLORS[c]||'#4f6ef7'}22;color:${WKT_CAT_COLORS[c]||'#4f6ef7'};border:1px solid ${WKT_CAT_COLORS[c]||'#4f6ef7'}44;">${WKT_CAT_ICONS[c]||''} ${wktCatLabel(c)}</span>`).join('');

    const exHTML = sess.exercises.map(ex => {
      let metric = '';
      if (ex.type === 'sets')     metric = `${ex.sets}×${ex.reps}${ex.weight>0?' @ '+ex.weight+'kg':''}`;
      if (ex.type === 'duration') metric = `${ex.duration} min`;
      if (ex.type === 'distance') metric = `${ex.distance} km`;
      return `<div class="wkt-ex-row">
        <span class="wkt-ex-icon">${WKT_CAT_ICONS[ex.cat]||'💪'}</span>
        <span class="wkt-ex-name">${esc(ex.name)}</span>
        <span class="wkt-ex-metric">${metric}</span>
        <button class="wkt-ex-del" data-sessid="${sess.id}" data-exid="${ex.id}" title="${t('wktRemoveTitle')}">✕</button>
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
        <button class="wkt-session-del" data-sessid="${sess.id}" title="${t('wktDeleteSessionTitle')}">🗑</button>
      </div>
      <div class="wkt-ex-list">${exHTML}</div>
      ${sess.linkedHabitName ? `<div class="wkt-linked-habit">${t('wktLinkedHabitPrefix')} <strong>${esc(sess.linkedHabitName)}</strong></div>` : ''}
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
  const dayNames = t('days');

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
    `<span class="wkt-leg-item" style="color:${col}">${WKT_CAT_ICONS[cat]} ${wktCatLabel(cat)}</span>`
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
  t('days').forEach(d => { html += `<div class="wkt-hm-header">${d}</div>`; });
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
    const title = `${day}: ${t('wktSessionsCountFn')(count)}`;
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
  if (!prs.length) { el.innerHTML = `<div style="color:var(--text-muted);font-size:12px;padding:8px 0;">${t('wktNoRecordsMsg')}</div>`; return; }

  el.innerHTML = prs.slice(0,10).map(pr => {
    const col = WKT_CAT_COLORS[pr.cat]||'#4f6ef7';
    const metrics = [];
    if (pr.maxWeight>0) metrics.push(`🏆 ${pr.maxWeight} kg`);
    if (pr.maxDist>0)   metrics.push(`📏 ${pr.maxDist} km`);
    if (pr.maxDur>0)    metrics.push(`⏱ ${pr.maxDur} min`);
    return `<div class="wkt-pr-row">
      <span class="wkt-pr-icon" style="color:${col}">${WKT_CAT_ICONS[pr.cat]||'💪'}</span>
      <span class="wkt-pr-name">${esc(pr.name)}</span>
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
        <div class="wkt-tpl-meta">${t('wktExerciseCountFn')(tpl.exercises.length)}</div>
      </div>
      <button class="goal-add-btn wkt-tpl-use" data-tplidx="${i}" style="padding:5px 12px;font-size:11px;">${t('wktUseTemplateBtn')}</button>
      <button class="wkt-tpl-del" data-tplidx="${i}" title="${t('wktDeleteTemplateTitle')}">✕</button>
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
  if (!sessions.length) { alert(t('wktAlertNoExercisesToday')); return; }
  const allExercises = sessions.flatMap(s => s.exercises);
  if (!allExercises.length) { alert(t('wktAlertNoExercisesFound')); return; }
  const name = prompt(t('wktPromptTemplateName'), t('wktDefaultTemplateNameFn')(wktTemplates.length+1));
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
  if (diff === 0) el.textContent = t('journalToday');
  else if (diff === -1) el.textContent = t('journalYesterday');
  else {
    const months = t('monthShort');
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

  prev.innerHTML = name ? `<span style="font-weight:700;">${esc(name)}</span> — ${metric} · ~${burn} ${t('wktPreviewBurnedSuffix')}` : '';
}

function wktAddExercise() {
  const name = document.getElementById('wkt-name-input')?.value.trim();
  if (!name) { flagInvalidField('wkt-name-input'); return; }

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
  if(wktDateKey(wktViewDate) === wktDateKey(new Date())) Duck.trigger('workoutDone');

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
  applyTranslations();
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
