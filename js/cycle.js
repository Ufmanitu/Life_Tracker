// ═══════════════════════════════════════════════════════════════════
// ── MENSTRUAL CYCLE TRACKER v2 MODULE ─────────────────────────────
// (data load/save — saveCycle/loadCycle — lives in core.js since it
// must run on every page via loadAll(); this file holds rendering,
// only ever loaded on cycle.html)
// ═══════════════════════════════════════════════════════════════════
const SYMPTOMS_EN = ["🤕 Cramps","😴 Fatigue","🤢 Nausea","🎭 Mood Swings","🍫 Cravings","💧 Bloating","🤯 Headache","💔 Breast Tenderness","😰 Anxiety","🥵 Hot Flashes","💤 Insomnia","✨ High Energy"];
const MOODS = ["😊","😌","😢","😠","😤","🥰","😶","🤩"];
const MOOD_LABELS_EN = ["Happy","Calm","Sad","Irritable","Stressed","Loving","Numb","Energetic"];
function getSymptoms(){ return (TRANSLATIONS[state.lang]||TRANSLATIONS.en).cycleSymptoms || SYMPTOMS_EN; }
function getMoodLabels(){ return (TRANSLATIONS[state.lang]||TRANSLATIONS.en).cycleMoodLabels || MOOD_LABELS_EN; }

let cycleCalYear = NOW.getFullYear(), cycleCalMonth = NOW.getMonth();
let todaySymptoms = [], todayMood = "";
let cycleMode = "natural"; // "natural" | "pill"
let hoveredPillIdx = -1; // which pill (0-27) is hovered

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
        if(state.cycleData.takenPills[dk]){
          delete state.cycleData.takenPills[dk];
        } else {
          state.cycleData.takenPills[dk]=true;
          if(dk===todayKey()) Duck.trigger('pillTaken');
        }
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
  if(!start){flagInvalidField("cycle-start-trigger");return;}
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

// ── INIT ──────────────────────────────────────────────────────────
if (CURRENT_PAGE === "cycle") { renderCycleTracker(); }
