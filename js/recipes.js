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
  tr: {
    recTitle:'📖 Tarif Kitabı', recNewBtn:'+ Yeni Tarif', recSearchPh:'Tarif ara…',
    recFilterAll:'Tümü', recFilterBreakfast:'🌅 Kahvaltı', recFilterLunch:'☀️ Öğle Yemeği',
    recFilterDinner:'🌙 Akşam Yemeği', recFilterSnack:'🍎 Atıştırmalık', recFilterMealPrep:'📦 Yemek Hazırlık',
    recServings:'Porsiyon', recIngredientsShort:'malzeme',
    recLogMeal:'Öğünü Kaydet', recAddToShopping:'Alışverişe Ekle',
    recModalTitleNew:'Yeni Tarif', recModalTitleEdit:'Tarif Düzenle',
    recNameLabel:'Tarif Adı', recNamePh:'örn. Sebzeli Kavurma…',
    recTagLabel:'Kategori', recServingsLabel:'Porsiyon Sayısı',
    recMacrosTitle:'🔥 Porsiyon Başına Makrolar',
    recIngredientsTitle:'🧺 Malzemeler',
    recIngNamePh:'Malzeme', recIngQtyPh:'Miktar', recIngUnitPh:'birim',
    recAddIngredient:'+ Malzeme Ekle',
    recNotesLabel:'📝 Notlar', recNotesPh:'İsteğe bağlı notlar, hazırlık adımları…',
    recSave:'💾 Tarifi Kaydet',
    recEmptyIngredients:'Henüz malzeme eklenmemiş.',
    recLogModalTitle:'Öğünü Kaydet', recLogDateLabel:'Tarih',
    recLogMealLabel:'Öğün', recLogServingsLabel:'Porsiyon',
    recLogConfirm:'🍽 Öğünü Kaydet',
    recDeleteConfirm:'Bu tarif silinsin mi?',
    recNoRecipes:'Henüz tarif yok. İlkini oluşturun!',
    recNoResults:'Aramanızla eşleşen tarif bulunamadı.',
    dueYesterday:'Dün',
    calKcal:'Kalori', calKcalLabel:'Kalori (kcal)',
    calProteinLabel:'Protein (g)', calCarbsLabel:'Karbonhidrat (g)', calFatLabel:'Yağ (g)',
    calBreakfast:'Kahvaltı', calLunch:'Öğle Yemeği', calDinner:'Akşam Yemeği', calSnacks:'Atıştırmalıklar',
    calTodayBtn:'Bugün', calCancel:'İptal',
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
    <div class="rec-card-name">${esc(r.name)}</div>
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
      <input class="form-input rec-ing-name" data-field="name" value="${esc(ing.name||'')}" placeholder="${tr.recIngNamePh||'Ingredient'}"/>
      <input class="form-input rec-ing-qty" data-field="qty" type="number" min="0" step="0.1" value="${ing.qty!==undefined&&ing.qty!==''?ing.qty:''}" placeholder="${tr.recIngQtyPh||'Qty'}"/>
      <input class="form-input rec-ing-unit" data-field="unit" value="${esc(ing.unit||'')}" placeholder="${tr.recIngUnitPh||'unit'}"/>
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
  if (!name) { flagInvalidField('rec-name-input'); return; }
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

} // end if(CURRENT_PAGE === 'recipes')
