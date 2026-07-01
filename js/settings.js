// ═══════════════════════════════════════════════════════════════════
// ── SETTINGS PAGE MODULE ───────────────────────────────────────────
// only ever loaded on settings.html. buildBackup/describeBackup stay
// in core.js since the cross-page settings MODAL also uses them.
// ═══════════════════════════════════════════════════════════════════
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

// ── INIT ──────────────────────────────────────────────────────────
initSettingsPage();
