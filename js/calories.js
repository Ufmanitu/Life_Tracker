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
    calCyclePhaseTitle:'🌸 Zyklusphasen-Ernährung',
    calPhasePeriod:'Menstruationsphase', calPhaseFollicular:'Follikelphase', calPhaseFertile:'Fruchtbares Fenster', calPhaseOvulation:'Eisprung', calPhasePms:'Lutealphase',
    calPhaseTipPeriod:'Setze auf eisenreiche Lebensmittel (rotes Fleisch, Spinat, Linsen) und Magnesium, um Krämpfe zu lindern. Warme, wohltuende Mahlzeiten helfen ebenfalls.',
    calPhaseTipFollicular:'Die Energie steigt — mageres Eiweiß, frisches Gemüse und gesunde Kohlenhydrate unterstützen den steigenden Östrogenspiegel und das Training.',
    calPhaseTipFertile:'Leichte, energiespendende Mahlzeiten mit Antioxidantien (Beeren, Blattgemüse) und gesunden Fetten passen gut zu dieser aktiven Phase.',
    calPhaseTipOvulation:'Die Energie erreicht ihren Höhepunkt — tanke mit ausgewogenem Eiweiß, komplexen Kohlenhydraten und zinkreichen Lebensmitteln (Nüsse, Samen).',
    calPhaseTipPms:'Das Verlangen steigt — bevorzuge komplexe Kohlenhydrate, Magnesium (dunkle Schokolade, Nüsse) und reduziere Salz/Zucker, um Blähungen und Stimmungsschwankungen zu lindern.',
    calPhaseTipDefault:'Richte deinen Zyklus im Zyklus-Tab ein, um personalisierte Ernährungstipps für jede Phase zu erhalten.',
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
    calCyclePhaseTitle:'🌸 Nutrición por fase del ciclo',
    calPhasePeriod:'Fase menstrual', calPhaseFollicular:'Fase folicular', calPhaseFertile:'Ventana fértil', calPhaseOvulation:'Ovulación', calPhasePms:'Fase lútea',
    calPhaseTipPeriod:'Prioriza alimentos ricos en hierro (carne roja, espinacas, lentejas) y magnesio para aliviar los cólicos. Las comidas calientes y reconfortantes también ayudan.',
    calPhaseTipFollicular:'La energía aumenta — las proteínas magras, las verduras frescas y los carbohidratos saludables apoyan el aumento de estrógeno y el ejercicio.',
    calPhaseTipFertile:'Las comidas ligeras y energizantes con antioxidantes (bayas, verduras de hoja) y grasas saludables funcionan bien durante esta fase activa.',
    calPhaseTipOvulation:'La energía alcanza su punto máximo — alimenta tu cuerpo con proteínas equilibradas, carbohidratos complejos y alimentos ricos en zinc (nueces, semillas).',
    calPhaseTipPms:'Los antojos aumentan — prioriza carbohidratos complejos, magnesio (chocolate negro, nueces) y reduce la sal/azúcar para aliviar la hinchazón y los cambios de humor.',
    calPhaseTipDefault:'Configura tu ciclo en la pestaña Ciclo para recibir consejos de nutrición personalizados para cada fase.',
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
    calCyclePhaseTitle:'🌸 Nutrition selon la phase du cycle',
    calPhasePeriod:'Phase menstruelle', calPhaseFollicular:'Phase folliculaire', calPhaseFertile:'Fenêtre fertile', calPhaseOvulation:'Ovulation', calPhasePms:'Phase lutéale',
    calPhaseTipPeriod:'Privilégiez les aliments riches en fer (viande rouge, épinards, lentilles) et en magnésium pour soulager les crampes. Les repas chauds et réconfortants aident aussi.',
    calPhaseTipFollicular:"L'énergie augmente — les protéines maigres, les légumes frais et les glucides sains soutiennent la hausse d'œstrogène et l'entraînement.",
    calPhaseTipFertile:'Des repas légers et énergisants avec des antioxydants (baies, légumes verts) et de bonnes graisses conviennent bien à cette phase active.',
    calPhaseTipOvulation:"L'énergie atteint son pic — misez sur des protéines équilibrées, des glucides complexes et des aliments riches en zinc (noix, graines).",
    calPhaseTipPms:'Les envies augmentent — privilégiez les glucides complexes, le magnésium (chocolat noir, noix) et réduisez le sel/sucre pour atténuer les ballonnements et les sautes d\'humeur.',
    calPhaseTipDefault:'Configurez votre cycle dans l\'onglet Cycle pour obtenir des conseils nutritionnels personnalisés pour chaque phase.',
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
  tr: {
    calKcal:'Kalori', calProtein:'Protein', calCarbs:'Karbonhidrat', calFat:'Yağ',
    calWater:'Su', calWaterGlasses:'bardak',
    calBreakfast:'Kahvaltı', calLunch:'Öğle Yemeği', calDinner:'Akşam Yemeği', calSnacks:'Atıştırmalıklar',
    calGoalsTitle:'🎯 Günlük Hedefler', calSaveGoals:'💾 Hedefleri Kaydet',
    calWeeklyTitle:'📅 Bu Hafta', calGoalLine:'Hedef',
    calCyclePhaseTitle:'🌸 Döngü Fazı Beslenmesi',
    calPhasePeriod:'Adet Dönemi', calPhaseFollicular:'Foliküler Faz', calPhaseFertile:'Doğurganlık Penceresi', calPhaseOvulation:'Yumurtlama', calPhasePms:'Lüteal Faz',
    calPhaseTipPeriod:'Demir açısından zengin yiyeceklere ve magnezyuma odaklanın. Sıcak, rahatlatıcı yemekler de yardımcı olur.',
    calPhaseTipFollicular:'Enerji yükseliyor — yağsız proteinler, taze sebzeler ve sağlıklı karbonhidratlar östrojeni destekler.',
    calPhaseTipFertile:'Antioksidanlar ve sağlıklı yağlar içeren hafif, enerji verici öğünler bu aktif faz için uygundur.',
    calPhaseTipOvulation:'Enerji zirveye ulaşıyor — dengeli protein, kompleks karbonhidrat ve çinko açısından zengin gıdalar.',
    calPhaseTipPms:'Kompleks karbonhidratları ve magnezyumu tercih edin; şişkinlik ve ruh hali değişimlerini azaltmak için tuz/şekeri kısın.',
    calPhaseTipDefault:'Her faz için kişiselleştirilmiş beslenme ipuçları almak için Döngü sekmesinde döngünüzü ayarlayın.',
    calMacroDist:'🥧 Makro Dağılımı',
    calTodayBtn:'Bugün',
    calAddFood:'Yiyecek Ekle', calQuickAdd:'⚡ Hızlı Ekle',
    calFromRecipe:'📖 Tariften', calRecent:'🕐 Son Eklenenler',
    calFoodName:'Yiyecek Adı', calFoodNamePh:'örn. Tavuk göğsü…',
    calKcalLabel:'Kalori (kcal)', calServingSize:'Porsiyon',
    calServingUnit:'g / ml', calProteinLabel:'Protein (g)',
    calCarbsLabel:'Karbonhidrat (g)', calFatLabel:'Yağ (g)',
    calQtyLabel:'Miktar (porsiyon)',
    calRecipeSoon:'Tarif modülü çok yakında',
    calRecipeSoonDesc:'Tarif kitabınızdan yemekleri bağlayın ve makroları otomatik gönderin.',
    calCancel:'İptal', calAddBtn:'+ Ekle',
    calRemaining:'kalan', calOver:'hedefi aştı',
    calNoRecent:'Henüz son yiyecek yok.',
    calWeekAvg:'Ort', calWeekTotal:'Toplam',
    calKcalLeft: n => `${n} kcal kaldı`,
    calKcalOver: n => `${n} kcal aşıldı`,
    calDayLabels:['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'],
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
      const prevWater = d.water||0;
      // toggle: clicking filled glass at end removes, clicking empty adds
      d.water = (d.water===idx+1) ? idx : idx+1;
      calSaveDay(d, calViewDate);
      calRenderWater();
      const isViewingToday = calViewDate.toDateString() === new Date().toDateString();
      if(isViewingToday && d.water>prevWater) Duck.trigger('waterLogged');
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
  if(!name) { flagInvalidField('cal-food-name'); return; }
  const kcal    = +(document.getElementById('cal-food-kcal')?.value)||0;
  const protein = +(document.getElementById('cal-food-protein')?.value)||0;
  const carbs   = +(document.getElementById('cal-food-carbs')?.value)||0;
  const fat     = +(document.getElementById('cal-food-fat')?.value)||0;
  const serving = +(document.getElementById('cal-food-serving')?.value)||100;
  const qty     = +(document.getElementById('cal-food-qty')?.value)||1;

  const food = { id:calFoodIdCtr++, name, kcal, protein, carbs, fat, serving, qty };
  const day  = calGetDay(calViewDate);
  const prevKcal = calDayTotals(day).kcal;
  day.meals[calActiveMeal].push(food);
  calSaveDay(day, calViewDate);

  // save to recent (strip id/qty)
  calAddToRecent({ name, kcal, protein, carbs, fat, serving });

  if(calViewDate.toDateString() === new Date().toDateString()){
    Duck.trigger('foodLogged');
    const newKcal = calDayTotals(day).kcal;
    if(prevKcal<calGoals.kcal && newKcal>=calGoals.kcal) Duck.trigger('calorieGoalMet');
  }

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
