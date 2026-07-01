// ═══════════════════════════════════════════════════════════════════
// ── DUCK PEEK — ambient floating widget ────────────────────────────
// A small floating button (bottom-left, opposite the assistant FAB)
// showing the duck's current mood on every page, linking to duck.html.
// Loaded after duck.js + duck_poses.js on every page except duck.html
// itself (which already shows the full duck).
// ═══════════════════════════════════════════════════════════════════

const DuckPeek = (() => {
  let btn = null;

  function render() {
    if (!btn) return;
    btn.innerHTML = `<span class="duck-peek-svg-wrap">${getDuckPoseSVG(Duck.getEmotion())}</span>`;
  }

  function init() {
    if (CURRENT_PAGE === 'duck') return;
    btn = document.createElement('button');
    btn.id = 'duck-peek-btn';
    btn.type = 'button';
    const tr = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[state.lang]) || (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS.en) || {};
    btn.title = tr.duckPeekTitle || 'Visit your duck';
    btn.setAttribute('aria-label', btn.title);
    btn.addEventListener('click', () => { window.location.href = 'duck.html'; });
    document.body.appendChild(btn);
    render();
  }

  return { init, render };
})();

DuckPeek.init();
