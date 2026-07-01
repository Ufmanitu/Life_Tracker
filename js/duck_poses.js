// ═══════════════════════════════════════════════════════════════════
// ── DUCK COMPANION — SVG poses ─────────────────────────────────────
// Each entry is a self-contained inline SVG string (viewBox 0 0 200 200)
// swapped into the DOM whenever Duck.getEmotion() changes (see
// duck_page.js and DuckPeek in core.js). Body/head/wings/feet/shadow
// are identical across poses so swapping emotion never makes the duck
// "jump" — only eyes, brows, beak and small accent props differ.
// ═══════════════════════════════════════════════════════════════════

const DUCK_POSES = {

  happy: `
<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="186" rx="46" ry="7" fill="var(--duck-shadow)"/>
  <ellipse cx="78" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <ellipse cx="122" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <path d="M48,118 Q28,140 42,170 Q58,172 63,150 Q61,128 48,118 Z" fill="var(--duck-body-dark)"/>
  <path d="M152,118 Q172,140 158,170 Q142,172 137,150 Q139,128 152,118 Z" fill="var(--duck-body-dark)"/>
  <ellipse cx="100" cy="146" rx="60" ry="44" fill="var(--duck-body)"/>
  <ellipse cx="100" cy="161" rx="37" ry="25" fill="var(--duck-belly)"/><g><circle cx="100" cy="80" r="48" fill="var(--duck-body)"/><ellipse cx="86" cy="56" rx="20" ry="12" fill="var(--duck-body-light)" opacity="0.55"/><path d="M70,94 Q100,82 130,94 Q116,109 100,109 Q84,109 70,94 Z" fill="var(--duck-beak)"/>
  <path d="M78,103 Q100,114 122,103 Q100,119 78,103 Z" fill="var(--duck-beak-dark)"/>
  <circle cx="92" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  <circle cx="108" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  <path d="M70,56 Q80,49 90,56" stroke="var(--duck-body-dark)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M110,56 Q120,49 130,56" stroke="var(--duck-body-dark)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="80" cy="70" r="9" fill="var(--duck-eye)"/><circle cx="83.5" cy="66.5" r="3" fill="#fff"/>
  <circle cx="120" cy="70" r="9" fill="var(--duck-eye)"/><circle cx="123.5" cy="66.5" r="3" fill="#fff"/>
  <ellipse cx="60" cy="92" rx="10" ry="6" fill="var(--duck-cheek)" opacity="0.7"/><ellipse cx="140" cy="92" rx="10" ry="6" fill="var(--duck-cheek)" opacity="0.7"/>
  </g>
  <path d="M150,38 l3,9 l9,3 l-9,3 l-3,9 l-3,-9 l-9,-3 l9,-3 Z" fill="#ffd54f"/>
</svg>
`,

  sad: `
<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="186" rx="46" ry="7" fill="var(--duck-shadow)"/>
  <ellipse cx="78" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <ellipse cx="122" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <path d="M48,118 Q28,140 42,170 Q58,172 63,150 Q61,128 48,118 Z" fill="var(--duck-body-dark)"/>
  <path d="M152,118 Q172,140 158,170 Q142,172 137,150 Q139,128 152,118 Z" fill="var(--duck-body-dark)"/>
  <ellipse cx="100" cy="146" rx="60" ry="44" fill="var(--duck-body)"/>
  <ellipse cx="100" cy="161" rx="37" ry="25" fill="var(--duck-belly)"/><g><circle cx="100" cy="80" r="48" fill="var(--duck-body)"/><ellipse cx="86" cy="56" rx="20" ry="12" fill="var(--duck-body-light)" opacity="0.55"/>
  <path d="M70,64 L90,53" stroke="var(--duck-body-dark)" stroke-width="3" stroke-linecap="round"/>
  <path d="M130,64 L110,53" stroke="var(--duck-body-dark)" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="80" cy="76" rx="8" ry="9.5" fill="var(--duck-eye)"/>
  <ellipse cx="120" cy="76" rx="8" ry="9.5" fill="var(--duck-eye)"/>
  <circle cx="83" cy="72" r="2.4" fill="#fff"/><circle cx="123" cy="72" r="2.4" fill="#fff"/>
  <path d="M76,87 Q70,99 76,108 Q82,99 76,87 Z" fill="var(--duck-accent-blue)" opacity="0.9"/>
  <path d="M70,94 Q100,82 130,94 Q116,109 100,109 Q84,109 70,94 Z" fill="var(--duck-beak)"/>
  <path d="M78,103 Q100,114 122,103 Q100,119 78,103 Z" fill="var(--duck-beak-dark)"/>
  <circle cx="92" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  <circle cx="108" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  <path d="M82,108 Q100,100 118,108" stroke="var(--duck-beak-dark)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>
</svg>
`,

  tired: `
<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="186" rx="46" ry="7" fill="var(--duck-shadow)"/>
  <ellipse cx="78" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <ellipse cx="122" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <path d="M48,118 Q28,140 42,170 Q58,172 63,150 Q61,128 48,118 Z" fill="var(--duck-body-dark)"/>
  <path d="M152,118 Q172,140 158,170 Q142,172 137,150 Q139,128 152,118 Z" fill="var(--duck-body-dark)"/>
  <ellipse cx="100" cy="146" rx="60" ry="44" fill="var(--duck-body)"/>
  <ellipse cx="100" cy="161" rx="37" ry="25" fill="var(--duck-belly)"/><g transform="rotate(-4 100 80)"><circle cx="100" cy="80" r="48" fill="var(--duck-body)"/><ellipse cx="86" cy="56" rx="20" ry="12" fill="var(--duck-body-light)" opacity="0.55"/>
  <ellipse cx="80" cy="73" rx="9" ry="9" fill="var(--duck-eye)"/>
  <ellipse cx="120" cy="73" rx="9" ry="9" fill="var(--duck-eye)"/>
  <path d="M68,73 Q80,57 92,73 Q80,66 68,73 Z" fill="var(--duck-body)"/>
  <path d="M108,73 Q120,57 132,73 Q120,66 108,73 Z" fill="var(--duck-body)"/>
  <path d="M70,84 Q80,89 90,84" stroke="var(--duck-body-dark)" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.8"/>
  <path d="M110,84 Q120,89 130,84" stroke="var(--duck-body-dark)" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.8"/>
  <path d="M70,94 Q100,82 130,94 Q116,109 100,109 Q84,109 70,94 Z" fill="var(--duck-beak)"/>
  <path d="M78,103 Q100,114 122,103 Q100,119 78,103 Z" fill="var(--duck-beak-dark)"/>
  <circle cx="92" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  <circle cx="108" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  </g>
  <text x="146" y="46" font-size="15" fill="var(--text-muted)" font-family="Arial, sans-serif" font-weight="700" opacity="0.85">z</text>
</svg>
`,

  sick: `
<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="186" rx="46" ry="7" fill="var(--duck-shadow)"/>
  <ellipse cx="78" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <ellipse cx="122" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <path d="M48,118 Q28,140 42,170 Q58,172 63,150 Q61,128 48,118 Z" fill="var(--duck-body-dark)"/>
  <path d="M152,118 Q172,140 158,170 Q142,172 137,150 Q139,128 152,118 Z" fill="var(--duck-body-dark)"/>
  <ellipse cx="100" cy="146" rx="60" ry="44" fill="var(--duck-body)"/>
  <ellipse cx="100" cy="161" rx="37" ry="25" fill="var(--duck-belly)"/>
  <ellipse cx="100" cy="150" rx="20" ry="14" fill="none" stroke="var(--duck-body-dark)" stroke-width="2" opacity="0.5"/>
  <g><circle cx="100" cy="80" r="48" fill="var(--duck-body)"/><ellipse cx="86" cy="56" rx="20" ry="12" fill="var(--duck-body-light)" opacity="0.55"/>
  <path d="M73,64 L89,80 M89,64 L73,80" stroke="var(--duck-eye)" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M111,64 L127,80 M127,64 L111,80" stroke="var(--duck-eye)" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M72,54 Q80,58 88,54" stroke="var(--duck-body-dark)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M112,54 Q120,58 128,54" stroke="var(--duck-body-dark)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="92" rx="10" ry="6" fill="var(--duck-cheek-sick)" opacity="0.65"/><ellipse cx="140" cy="92" rx="10" ry="6" fill="var(--duck-cheek-sick)" opacity="0.65"/>
  <path d="M70,94 Q100,82 130,94 Q116,109 100,109 Q84,109 70,94 Z" fill="var(--duck-beak)"/>
  <path d="M78,103 Q100,114 122,103 Q100,119 78,103 Z" fill="var(--duck-beak-dark)"/>
  <circle cx="92" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  <circle cx="108" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  </g>
  <ellipse cx="100" cy="112" rx="64" ry="82" fill="var(--duck-sick-tint)" opacity="0.16"/>
  <path d="M140,46 Q135,57 140,64 Q145,57 140,46 Z" fill="var(--duck-accent-blue)" opacity="0.7"/>
</svg>
`,

  grumpy: `
<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="186" rx="46" ry="7" fill="var(--duck-shadow)"/>
  <ellipse cx="78" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <ellipse cx="122" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <path d="M48,118 Q28,140 42,170 Q58,172 63,150 Q61,128 48,118 Z" fill="var(--duck-body-dark)"/>
  <path d="M152,118 Q172,140 158,170 Q142,172 137,150 Q139,128 152,118 Z" fill="var(--duck-body-dark)"/>
  <ellipse cx="100" cy="146" rx="60" ry="44" fill="var(--duck-body)"/>
  <ellipse cx="100" cy="161" rx="37" ry="25" fill="var(--duck-belly)"/><g><circle cx="100" cy="80" r="48" fill="var(--duck-body)"/><ellipse cx="86" cy="56" rx="20" ry="12" fill="var(--duck-body-light)" opacity="0.55"/>
  <path d="M68,56 L90,67" stroke="var(--duck-body-dark)" stroke-width="4" stroke-linecap="round"/>
  <path d="M132,56 L110,67" stroke="var(--duck-body-dark)" stroke-width="4" stroke-linecap="round"/>
  <path d="M72,73 L88,69" stroke="var(--duck-eye)" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M128,73 L112,69" stroke="var(--duck-eye)" stroke-width="4.5" stroke-linecap="round"/>
  <ellipse cx="60" cy="92" rx="10" ry="6" fill="var(--duck-cheek-angry)" opacity="0.55"/><ellipse cx="140" cy="92" rx="10" ry="6" fill="var(--duck-cheek-angry)" opacity="0.55"/>
  <path d="M70,94 Q100,82 130,94 Q116,109 100,109 Q84,109 70,94 Z" fill="var(--duck-beak)"/>
  <path d="M78,103 Q100,114 122,103 Q100,119 78,103 Z" fill="var(--duck-beak-dark)"/>
  <circle cx="92" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  <circle cx="108" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  <path d="M84,110 Q100,104 116,110" stroke="var(--duck-beak-dark)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>
  <path d="M140,40 L149,33 M145,47 L156,42 M136,49 L143,40" stroke="var(--duck-anger)" stroke-width="2.5" stroke-linecap="round"/>
</svg>
`,

  eating: `
<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="186" rx="46" ry="7" fill="var(--duck-shadow)"/>
  <ellipse cx="78" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <ellipse cx="122" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <path d="M48,118 Q28,140 42,170 Q58,172 63,150 Q61,128 48,118 Z" fill="var(--duck-body-dark)"/>
  <path d="M152,118 Q172,140 158,170 Q142,172 137,150 Q139,128 152,118 Z" fill="var(--duck-body-dark)"/>
  <ellipse cx="100" cy="146" rx="60" ry="44" fill="var(--duck-body)"/>
  <ellipse cx="100" cy="161" rx="37" ry="25" fill="var(--duck-belly)"/><g><circle cx="100" cy="80" r="48" fill="var(--duck-body)"/><ellipse cx="86" cy="56" rx="20" ry="12" fill="var(--duck-body-light)" opacity="0.55"/>
  <path d="M72,68 Q80,62 88,68" stroke="var(--duck-eye)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M112,68 Q120,62 128,68" stroke="var(--duck-eye)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="92" rx="10" ry="6" fill="var(--duck-cheek)" opacity="0.7"/><ellipse cx="140" cy="92" rx="10" ry="6" fill="var(--duck-cheek)" opacity="0.7"/>
  <path d="M70,90 Q100,76 130,90 Q120,96 100,98 Q80,96 70,90 Z" fill="var(--duck-beak)"/>
  <path d="M76,98 Q100,118 124,98 Q112,110 100,112 Q88,110 76,98 Z" fill="var(--duck-beak-dark)"/>
  <rect x="91" y="95" width="18" height="11" rx="3" fill="var(--duck-crumb)"/>
  </g>
  <circle cx="58" cy="112" r="2.2" fill="var(--duck-crumb)"/>
  <circle cx="144" cy="108" r="2.6" fill="var(--duck-crumb)"/>
  <circle cx="100" cy="126" r="2" fill="var(--duck-crumb)"/>
</svg>
`,

  drinking: `
<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="186" rx="46" ry="7" fill="var(--duck-shadow)"/>
  <ellipse cx="78" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <ellipse cx="122" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <path d="M48,118 Q28,140 42,170 Q58,172 63,150 Q61,128 48,118 Z" fill="var(--duck-body-dark)"/>
  <path d="M152,118 Q172,140 158,170 Q142,172 137,150 Q139,128 152,118 Z" fill="var(--duck-body-dark)"/>
  <ellipse cx="100" cy="146" rx="60" ry="44" fill="var(--duck-body)"/>
  <ellipse cx="100" cy="161" rx="37" ry="25" fill="var(--duck-belly)"/><g transform="rotate(-10 100 80)"><circle cx="100" cy="80" r="48" fill="var(--duck-body)"/><ellipse cx="86" cy="56" rx="20" ry="12" fill="var(--duck-body-light)" opacity="0.55"/>
  <path d="M72,68 Q80,62 88,68" stroke="var(--duck-eye)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M112,68 Q120,62 128,68" stroke="var(--duck-eye)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="92" rx="10" ry="6" fill="var(--duck-cheek)" opacity="0.7"/><ellipse cx="140" cy="92" rx="10" ry="6" fill="var(--duck-cheek)" opacity="0.7"/>
  <path d="M76,88 Q100,66 124,88 Q112,77 100,75 Q88,77 76,88 Z" fill="var(--duck-beak)"/>
  <path d="M82,90 Q100,99 118,90 Q108,84 100,84 Q92,84 82,90 Z" fill="var(--duck-beak-dark)"/>
  </g>
  <path d="M56,72 Q52,80 56,86 Q60,80 56,72 Z" fill="var(--duck-accent-blue)" opacity="0.85"/>
  <path d="M68,56 Q65,62 68,67 Q71,62 68,56 Z" fill="var(--duck-accent-blue)" opacity="0.7"/>
  <circle cx="48" cy="90" r="2.2" fill="var(--duck-accent-blue)" opacity="0.6"/>
</svg>
`,

  sleeping: `
<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="186" rx="46" ry="7" fill="var(--duck-shadow)"/>
  <ellipse cx="78" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <ellipse cx="122" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <path d="M48,118 Q28,140 42,170 Q58,172 63,150 Q61,128 48,118 Z" fill="var(--duck-body-dark)"/>
  <path d="M152,118 Q172,140 158,170 Q142,172 137,150 Q139,128 152,118 Z" fill="var(--duck-body-dark)"/>
  <ellipse cx="100" cy="146" rx="60" ry="44" fill="var(--duck-body)"/>
  <ellipse cx="100" cy="161" rx="37" ry="25" fill="var(--duck-belly)"/><g transform="rotate(-6 100 80)"><circle cx="100" cy="80" r="48" fill="var(--duck-body)"/><ellipse cx="86" cy="56" rx="20" ry="12" fill="var(--duck-body-light)" opacity="0.55"/>
  <path d="M70,73 Q80,78 90,73" stroke="var(--duck-eye)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M110,73 Q120,78 130,73" stroke="var(--duck-eye)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M70,94 Q100,82 130,94 Q116,109 100,109 Q84,109 70,94 Z" fill="var(--duck-beak)"/>
  <path d="M78,103 Q100,114 122,103 Q100,119 78,103 Z" fill="var(--duck-beak-dark)"/>
  <circle cx="92" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  <circle cx="108" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  </g>
  <path d="M38,34 Q31,43 38,52 Q27,47 27,34 Q27,21 38,34 Z" fill="var(--duck-accent-sleep)" opacity="0.75"/>
  <text x="142" y="50" font-size="20" fill="var(--duck-accent-sleep)" font-family="Arial, sans-serif" font-weight="700">Z</text>
  <text x="156" y="36" font-size="15" fill="var(--duck-accent-sleep)" font-family="Arial, sans-serif" font-weight="700" opacity="0.8">z</text>
  <text x="166" y="24" font-size="11" fill="var(--duck-accent-sleep)" font-family="Arial, sans-serif" font-weight="700" opacity="0.6">z</text>
</svg>
`,

  // Low thirst — panting, tongue out, a lone sweat drop. Distinct from
  // "drinking" (the brief transient celebration right after logging water).
  thirsty: `
<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="186" rx="46" ry="7" fill="var(--duck-shadow)"/>
  <ellipse cx="78" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <ellipse cx="122" cy="180" rx="13" ry="6" fill="var(--duck-feet)"/>
  <path d="M48,118 Q28,140 42,170 Q58,172 63,150 Q61,128 48,118 Z" fill="var(--duck-body-dark)"/>
  <path d="M152,118 Q172,140 158,170 Q142,172 137,150 Q139,128 152,118 Z" fill="var(--duck-body-dark)"/>
  <ellipse cx="100" cy="146" rx="60" ry="44" fill="var(--duck-body)"/>
  <ellipse cx="100" cy="161" rx="37" ry="25" fill="var(--duck-belly)"/><g><circle cx="100" cy="80" r="48" fill="var(--duck-body)"/><ellipse cx="86" cy="56" rx="20" ry="12" fill="var(--duck-body-light)" opacity="0.55"/>
  <path d="M70,68 Q80,73 90,68" stroke="var(--duck-eye)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M110,68 Q120,73 130,68" stroke="var(--duck-eye)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M74,55 Q82,50 90,55" stroke="var(--duck-body-dark)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M110,55 Q118,50 126,55" stroke="var(--duck-body-dark)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="94" rx="9" ry="5" fill="var(--duck-cheek)" opacity="0.55"/><ellipse cx="140" cy="94" rx="9" ry="5" fill="var(--duck-cheek)" opacity="0.55"/>
  <path d="M70,94 Q100,84 130,94 Q116,108 100,108 Q84,108 70,94 Z" fill="var(--duck-beak)"/>
  <path d="M78,102 Q100,113 122,102 Q100,118 78,102 Z" fill="var(--duck-beak-dark)"/>
  <circle cx="92" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  <circle cx="108" cy="91" r="2" fill="var(--duck-beak-dark)"/>
  <path d="M92,106 Q100,124 108,106 Q104,116 100,116 Q96,116 92,106 Z" fill="var(--duck-tongue)"/>
  </g>
  <path d="M138,44 Q133,55 138,62 Q143,55 138,44 Z" fill="var(--duck-accent-blue)" opacity="0.75"/>
</svg>
`,

};

const EMOTION_FALLBACK = {
  content:     'happy',
  excited:     'happy',
  working:     'tired',
  hungry:      'sad',
  celebrating: 'happy',
};

function getDuckPoseSVG(emotionKey) {
  return DUCK_POSES[emotionKey]
      || DUCK_POSES[EMOTION_FALLBACK[emotionKey]]
      || DUCK_POSES.happy;
}
