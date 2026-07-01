// ═══════════════════════════════════════════════════════════════════
// ── COACH BANNER — light-touch tip on the Home page ─────────────────
// Shows the single highest-priority Coach insight as a dismissible
// card at the top of menu.html. Self-guards to the menu page only —
// mirrors duck_peek.js's inverse self-skip (that one hides on its own
// page; this one only shows on one specific page).
// ═══════════════════════════════════════════════════════════════════

(function () {
  if (CURRENT_PAGE !== 'menu') return;

  function dismissKey(id) { return 'coach_banner_dismissed_' + id; }

  function render() {
    const tip = Coach.getTopInsight();
    const existing = document.getElementById('coach-banner');
    if (existing) existing.remove();
    if (!tip) return;
    try { if (sessionStorage.getItem(dismissKey(tip.id))) return; } catch (e) {}

    const tr = (typeof TRANSLATIONS !== 'undefined' && (TRANSLATIONS[state.lang] || TRANSLATIONS.en)) || {};
    const seeAllLabel = tr.coachSeeAllTips || 'See all tips';

    const el = document.createElement('div');
    el.id = 'coach-banner';
    el.innerHTML = `
      <span class="coach-banner-icon">${tip.icon}</span>
      <span class="coach-banner-text">${tip.text}</span>
      <a class="coach-banner-link" href="coach.html">${seeAllLabel} →</a>
      <button class="coach-banner-dismiss" title="Dismiss" aria-label="Dismiss">✕</button>
    `;
    el.querySelector('.coach-banner-dismiss').addEventListener('click', () => {
      try { sessionStorage.setItem(dismissKey(tip.id), '1'); } catch (e) {}
      el.remove();
    });

    const section = document.getElementById('menu-section');
    if (section) section.insertBefore(el, section.firstChild);
  }

  render();
})();
