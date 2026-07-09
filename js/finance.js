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
        finSavingsGoals:'Savings Goals',
        finRatesTitle:'Exchange Rates', finRatesLive:'Live', finRatesOffline:'Offline — cached rates',
        finRatesLoading:'Loading rates…', finRatesError:'Could not load rates', finRatesUpdated:'Updated' },
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
        finSavingsGoals:'Megtakarítási célok',
        finRatesTitle:'Árfolyamok', finRatesLive:'Élő', finRatesOffline:'Offline — mentett árfolyamok',
        finRatesLoading:'Árfolyamok betöltése…', finRatesError:'Nem sikerült betölteni az árfolyamokat', finRatesUpdated:'Frissítve' },
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
        finSavingsGoals:'Sparziele',
        finRatesTitle:'Wechselkurse', finRatesLive:'Live', finRatesOffline:'Offline — gespeicherte Kurse',
        finRatesLoading:'Kurse werden geladen…', finRatesError:'Kurse konnten nicht geladen werden', finRatesUpdated:'Aktualisiert' },
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
        finSavingsGoals:'Metas de ahorro',
        finRatesTitle:'Tipos de cambio', finRatesLive:'En vivo', finRatesOffline:'Sin conexión — tasas guardadas',
        finRatesLoading:'Cargando tasas…', finRatesError:'No se pudieron cargar las tasas', finRatesUpdated:'Actualizado' },
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
        finSavingsGoals:"Objectifs d'épargne",
        finRatesTitle:'Taux de change', finRatesLive:'En direct', finRatesOffline:'Hors ligne — taux en cache',
        finRatesLoading:'Chargement des taux…', finRatesError:'Impossible de charger les taux', finRatesUpdated:'Mis à jour' },
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
  currency: 'EUR',
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
  Clothes:'#ec4899',Gifts:'#f43f5e',Travel:'#22d3ee',Pets:'#a3e635',
  Subscriptions:'#818cf8',Beauty:'#d946ef',
  Salary:'#3ecfb2',Freelance:'#7090f9',Gift:'#e05a9a',Other:'#8898aa',
};
function catClass(cat) {
  const map = {Food:'food',Health:'health',Transport:'transport',Entertainment:'entertainment',
    Utilities:'utilities',Home:'home',Development:'development',Investment:'investment',
    Clothes:'clothes',Gifts:'gifts',Travel:'travel',Pets:'pets',
    Subscriptions:'subscriptions',Beauty:'beauty',
    Salary:'salary',Freelance:'freelance',Gift:'gift',Other:'other'};
  return 'fin-cat-'+(map[cat]||'other');
}
// Maps canonical English key → i18n translation key
const CAT_I18N_KEY = {
  Food:'finCatFood', Health:'finCatHealth', Transport:'finCatTransport',
  Entertainment:'finCatEntertainment', Utilities:'finCatUtilities', Home:'finCatHome',
  Development:'finCatDevelopment', Investment:'finCatInvestment', Other:'finCatOther',
  Clothes:'finCatClothes', Gifts:'finCatGifts', Travel:'finCatTravel',
  Pets:'finCatPets', Subscriptions:'finCatSubscriptions', Beauty:'finCatBeauty',
  Salary:'finIncSalary', Freelance:'finIncFreelance', Gift:'finIncGift',
};
function catLabel(cat) {
  const key = CAT_I18N_KEY[cat];
  if (!key) return cat;
  const full = t(key) || cat;
  // Strip leading emoji + space ("🍔 Étel" → "Étel")
  return full.replace(/^.{1,2}\s/, '').trim() || cat;
}
// ── CURRENCIES ────────────────────────────────────────────────────
// suffix: symbol goes after the amount ("1200 Ft"); dec: default decimals
const CURRENCIES = {
  EUR:{symbol:'€'},                 USD:{symbol:'$'},
  GBP:{symbol:'£'},                 HUF:{symbol:'Ft', suffix:true, dec:0},
  CHF:{symbol:'CHF', suffix:true},  JPY:{symbol:'¥', dec:0},
  PLN:{symbol:'zł', suffix:true},   CZK:{symbol:'Kč', suffix:true, dec:0},
  SEK:{symbol:'kr', suffix:true},   TRY:{symbol:'₺'},
};
function curInfo() { return CURRENCIES[finState.currency] || CURRENCIES.EUR; }
function curSym() { return curInfo().symbol; }
function fmtAmt(n, decimals) {
  const c = curInfo();
  const d = decimals != null ? decimals : (c.dec != null ? c.dec : 2);
  const s = Number(n).toFixed(d);
  return c.suffix ? s+' '+c.symbol : c.symbol+s;
}
function fmtAmt0(n) { return fmtAmt(Math.round(n), 0); }

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
  document.getElementById('fin-stat-budget-used').textContent = fmtAmt0(budgetUsed);
  document.getElementById('fin-stat-budget-limit').textContent = budgetLimit > 0 ? fmtAmt0(budgetLimit) : '—';
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
          <span class="fin-entry-name">${esc(exp.desc)}</span>
        </div>
        <div class="fin-entry-date">${exp.date}</div>
      </div>
      <div class="fin-entry-amt">${fmtAmt(exp.amount)}</div>
      <div class="fin-entry-cat"><span class="fin-cat-badge ${catClass(exp.category)}">${catLabel(exp.category)}</span></div>
      <div class="fin-entry-actions">
        <button class="fin-entry-edit-btn" data-edit-exp="${exp.id}" title="Edit">✎</button>
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
          <span class="fin-entry-name">${esc(inc.desc)}</span>
        </div>
        <div class="fin-entry-date">${inc.date}</div>
      </div>
      <div class="fin-entry-amt">${fmtAmt(inc.amount)}</div>
      <div class="fin-entry-cat"><span class="fin-cat-badge ${catClass(inc.category)}">${catLabel(inc.category)}</span></div>
      <div class="fin-entry-actions">
        <button class="fin-entry-edit-btn" data-edit-inc="${inc.id}" title="Edit">✎</button>
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
          ${hasLimit ? `<span class="fin-envelope-sep">/</span><span class="fin-envelope-limit">${fmtAmt0(limit)}</span>` : ''}
          <div class="fin-envelope-edit-wrap">
            <button class="fin-envelope-edit-btn" data-editcat="${cat}" title="Set budget limit">✎</button>
            <div class="fin-envelope-input-pop hidden" data-pop="${cat}">
              <input class="fin-envelope-input" type="number" placeholder="limit ${curSym()}" min="0" step="1" value="${limit||''}"/>
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
               ? `⚠️ ${fmtAmt(Math.abs(remaining))} ${t('finOverBudget')||'over budget'}`
               : `✓ ${fmtAmt(remaining)} ${t('finLeftMonth')||'left this month'}`}
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
        <span class="fin-savings-goal-name">${esc(sav.name)}</span>
        <div class="fin-savings-goal-vals">
          <span class="fin-savings-goal-current">${fmtAmt0(sav.current||0)}</span>
          <span class="fin-savings-goal-sep">/</span>
          <span class="fin-savings-goal-target">${fmtAmt0(sav.target)}</span>
        </div>
      </div>
      <div class="fin-savings-track"><div class="fin-savings-fill" style="width:0%"></div></div>
      <div class="fin-savings-actions">
        <input class="fin-savings-contrib-input" type="number" placeholder="+${curSym()}" min="0" step="1" data-savid="${sav.id}" />
        <button class="fin-savings-contrib-btn" data-savcontrib="${sav.id}">+ Add</button>
        <button class="fin-savings-del-btn" data-savdel="${sav.id}">×</button>
      </div>`;
    el.appendChild(item);
    requestAnimationFrame(()=>setTimeout(()=>{ const f=item.querySelector('.fin-savings-fill');if(f)f.style.width=pct+'%'; },120));
  });
}

// ── LIVE EXCHANGE RATES ───────────────────────────────────────────
const RATES_KEY = 'ht_finance_rates_v1';   // ht_finance_ prefix → covered by Delete Data
const RATES_MAX_AGE = 30*60*1000;          // consider cache fresh for 30 min
let ratesCache = null;   // {base, rates:{USD:1.08,…}, prev:{…}|null, date, fetchedAt}
let ratesLive = false;
let ratesFetching = false;

function loadRatesCache() {
  try { ratesCache = JSON.parse(localStorage.getItem(RATES_KEY) || 'null'); } catch(e) {}
}

function fmtRate(r) {
  if (r >= 100) return r.toFixed(2);
  if (r >= 10) return r.toFixed(3);
  return r.toFixed(4);
}

// Rates are fetched as "1 [base] = rates[c] of c"; we display them inverted
// ("1 USD = 358 HUF"), so the arrow direction flips too: the foreign currency
// strengthened when rates[c] went DOWN.
function rateDelta(cur) {
  if (!ratesCache || !ratesCache.prev) return '';
  const now = ratesCache.rates[cur], old = ratesCache.prev[cur];
  if (!now || !old || now === old) return '';
  return now < old
    ? '<span class="fin-rate-up">▲</span>'
    : '<span class="fin-rate-down">▼</span>';
}
function invRate(cur) { return 1 / ratesCache.rates[cur]; }

function renderRates() {
  const listEl = document.getElementById('fin-rates-list');
  const tickerEl = document.getElementById('fin-rates-ticker');
  const statusEl = document.getElementById('fin-rates-status');
  if (!listEl) return;

  const base = finState.currency || 'EUR';
  const haveData = ratesCache && ratesCache.base === base && ratesCache.rates;

  if (!haveData) {
    listEl.innerHTML = '';
    tickerEl.innerHTML = '';
    statusEl.innerHTML = ratesFetching
      ? (t('finRatesLoading')||'Loading rates…')
      : `<span class="fin-live-dot offline"></span>${t('finRatesError')||'Could not load rates'}`;
    return;
  }

  const curs = Object.keys(CURRENCIES).filter(c => c !== base && ratesCache.rates[c] != null);

  // News-style ticker (content doubled for a seamless loop)
  const tickerItems = curs.map(c =>
    `<span class="fin-ticker-item"><span class="fin-ticker-cur">1 ${c}</span> ${fmtRate(invRate(c))} ${base} ${rateDelta(c)}</span>`
  ).join('');
  tickerEl.innerHTML = tickerItems + tickerItems;

  // Rate list
  listEl.innerHTML = curs.map(c => `
    <div class="fin-rate-row">
      <span class="fin-rate-pair">1 ${c} =</span>
      <span class="fin-rate-val">${fmtRate(invRate(c))} ${base} ${rateDelta(c)}</span>
    </div>`).join('');

  // Status line
  const when = ratesCache.fetchedAt
    ? new Date(ratesCache.fetchedAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})
    : (ratesCache.date || '');
  statusEl.innerHTML = ratesLive
    ? `<span class="fin-live-dot"></span>${t('finRatesLive')||'Live'} · ${t('finRatesUpdated')||'Updated'} ${when}`
    : `<span class="fin-live-dot offline"></span>${t('finRatesOffline')||'Offline — cached rates'}`;
}

async function fetchRates(force) {
  const base = finState.currency || 'EUR';
  if (!force && ratesCache && ratesCache.base === base &&
      Date.now() - (ratesCache.fetchedAt||0) < RATES_MAX_AGE) {
    ratesLive = true; renderRates(); return;
  }
  if (ratesFetching) return;
  ratesFetching = true;
  const btn = document.getElementById('fin-rates-refresh');
  if (btn) btn.classList.add('spinning');
  renderRates();

  const targets = Object.keys(CURRENCIES).filter(c => c !== base);
  try {
    let rates = null, dateStr = '';
    try {
      const r = await fetch(`https://api.frankfurter.dev/v1/latest?base=${base}&symbols=${targets.join(',')}`);
      if (!r.ok) throw new Error('http '+r.status);
      const j = await r.json();
      rates = j.rates; dateStr = j.date || '';
    } catch(e) {
      // Fallback provider
      const r = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      if (!r.ok) throw new Error('http '+r.status);
      const j = await r.json();
      rates = {};
      targets.forEach(c => { if (j.rates && j.rates[c] != null) rates[c] = j.rates[c]; });
      dateStr = j.time_last_update_utc || '';
    }
    const prev = (ratesCache && ratesCache.base === base) ? ratesCache.rates : null;
    ratesCache = { base, rates, prev, date: dateStr, fetchedAt: Date.now() };
    try { localStorage.setItem(RATES_KEY, JSON.stringify(ratesCache)); } catch(e) {}
    ratesLive = true;
  } catch(e) {
    ratesLive = false;
  }
  ratesFetching = false;
  if (btn) btn.classList.remove('spinning');
  renderRates();
}

// ── CURRENCY SELECTOR ─────────────────────────────────────────────
function initCurrencySelect() {
  const sel = document.getElementById('fin-currency-select');
  if (!sel) return;
  sel.innerHTML = Object.keys(CURRENCIES).map(c =>
    `<option value="${c}">${c} ${CURRENCIES[c].symbol}</option>`).join('');
  sel.value = CURRENCIES[finState.currency] ? finState.currency : 'EUR';
  sel.addEventListener('change', () => {
    finState.currency = sel.value;
    saveFinance();
    renderFinance();
    fetchRates(true);
  });
}

function renderFinance() {
  renderFinanceStats();
  renderExpenseList();
  renderIncomeList();
  renderEnvelopes();
  renderSavings();
  renderRates();
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
  if (!desc) { flagInvalidField('fin-exp-desc'); return; }
  if (isNaN(amt) || amt <= 0) { flagInvalidField('fin-exp-amt'); return; }
  const cat = document.getElementById('fin-exp-cat').value;
  finState.expenses.push({id:finState.idCtr++,emoji:expEmoji,desc,amount:amt,category:cat,date:fmtDate(new Date())});
  document.getElementById('fin-exp-desc').value='';
  document.getElementById('fin-exp-amt').value='';
  saveFinance(); renderFinance();
  Duck.trigger('expenseLogged');
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
  if (!desc) { flagInvalidField('fin-inc-desc'); return; }
  if (isNaN(amt) || amt <= 0) { flagInvalidField('fin-inc-amt'); return; }
  const cat = document.getElementById('fin-inc-cat').value;
  finState.incomes.push({id:finState.idCtr++,emoji:incEmoji,desc,amount:amt,category:cat,date:fmtDate(new Date())});
  document.getElementById('fin-inc-desc').value='';
  document.getElementById('fin-inc-amt').value='';
  saveFinance(); renderFinance();
}
on('fin-inc-add-btn','click',addIncome);
on('fin-inc-desc','keydown',e=>{ if(e.key==='Enter') addIncome(); });
on('fin-inc-amt','keydown',e=>{ if(e.key==='Enter') addIncome(); });

// ── INLINE EDIT ───────────────────────────────────────────────────
// Turns an entry row into an edit form. Category options are cloned from
// the matching add-form select so labels stay translated.
function enterEntryEdit(row, entry, type) {
  if (row.classList.contains('editing')) return;
  row.classList.add('editing');
  const srcSel = document.getElementById(type === 'exp' ? 'fin-exp-cat' : 'fin-inc-cat');
  const opts = [...srcSel.options].map(o =>
    `<option value="${o.value}"${o.value === entry.category ? ' selected' : ''}>${esc(o.textContent)}</option>`).join('');
  row.innerHTML = `
    <div class="fin-edit-wrap">
      <span class="fin-entry-emoji">${entry.emoji || (type === 'exp' ? '💳' : '💵')}</span>
      <input class="fin-edit-input fin-edit-desc" value="${esc(entry.desc)}" data-field="desc" placeholder="${esc(t(type==='exp'?'finDescPlaceholder':'finSourcePlaceholder')||'Description…')}"/>
      <input class="fin-edit-input fin-edit-amt" type="number" min="0" step="0.01" value="${entry.amount}" data-field="amount"/>
      <select class="fin-edit-cat" data-field="category">${opts}</select>
      <input class="fin-edit-input fin-edit-date" type="date" value="${entry.date}" data-field="date"/>
      <button class="fin-edit-save" data-save-${type}="${entry.id}" title="Save">✓</button>
      <button class="fin-edit-cancel" data-cancel-edit="1" title="Cancel">✕</button>
    </div>`;
  const desc = row.querySelector('.fin-edit-desc');
  desc.focus(); desc.select();
  row.addEventListener('keydown', e => {
    if (e.key === 'Enter') row.querySelector('.fin-edit-save').click();
    if (e.key === 'Escape') row.querySelector('.fin-edit-cancel').click();
  });
}
function saveEntryEdit(btn, entry) {
  const row = btn.closest('.fin-entry-row');
  const desc = row.querySelector('[data-field="desc"]').value.trim();
  const amt = parseFloat(row.querySelector('[data-field="amount"]').value);
  const cat = row.querySelector('[data-field="category"]').value;
  const date = row.querySelector('[data-field="date"]').value;
  if (!desc) { flagInvalidField(row.querySelector('[data-field="desc"]')); return; }
  if (isNaN(amt) || amt <= 0) { flagInvalidField(row.querySelector('[data-field="amount"]')); return; }
  entry.desc = desc; entry.amount = amt; entry.category = cat;
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) entry.date = date;
  saveFinance(); renderFinance();
}

// Entry actions delegation (edit / save / cancel / delete)
on('fin-expense-list','click',e=>{
  const eb = e.target.closest('[data-edit-exp]');
  if(eb){ const exp=finState.expenses.find(x=>x.id===+eb.dataset.editExp); if(exp) enterEntryEdit(eb.closest('.fin-entry-row'), exp, 'exp'); return; }
  const sb = e.target.closest('[data-save-exp]');
  if(sb){ const exp=finState.expenses.find(x=>x.id===+sb.dataset.saveExp); if(exp) saveEntryEdit(sb, exp); return; }
  if(e.target.closest('[data-cancel-edit]')){ renderExpenseList(); applyTranslations(); return; }
  const btn = e.target.closest('[data-del-exp]');
  if(btn){ finState.expenses=finState.expenses.filter(x=>x.id!==+btn.dataset.delExp); saveFinance(); renderFinance(); }
});
on('fin-income-list','click',e=>{
  const eb = e.target.closest('[data-edit-inc]');
  if(eb){ const inc=finState.incomes.find(x=>x.id===+eb.dataset.editInc); if(inc) enterEntryEdit(eb.closest('.fin-entry-row'), inc, 'inc'); return; }
  const sb = e.target.closest('[data-save-inc]');
  if(sb){ const inc=finState.incomes.find(x=>x.id===+sb.dataset.saveInc); if(inc) saveEntryEdit(sb, inc); return; }
  if(e.target.closest('[data-cancel-edit]')){ renderIncomeList(); applyTranslations(); return; }
  const btn = e.target.closest('[data-del-inc]');
  if(btn){ finState.incomes=finState.incomes.filter(x=>x.id!==+btn.dataset.delInc); saveFinance(); renderFinance(); }
});

// Budget modal
const budgetBackdrop = document.getElementById('fin-budget-backdrop');
const budgetModal = document.getElementById('fin-budget-modal');
function openBudgetModal() {
  const lbl = document.querySelector('#fin-budget-modal .fin-modal-label');
  if (lbl) lbl.textContent = (t('finBudgetLabel')||'Budget limit (€)').replace(/\([^)]*\)\s*$/, '('+curSym()+')');
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

// Refresh rates manually
on('fin-rates-refresh','click',()=>fetchRates(true));

// ── INIT ─────────────────────────────────────────────────────────
loadFinance();
loadRatesCache();
initCurrencySelect();
renderFinance();
fetchRates(false);
setInterval(()=>fetchRates(true), 10*60*1000); // keep the widget live

} // end if(CURRENT_PAGE === 'finance')
