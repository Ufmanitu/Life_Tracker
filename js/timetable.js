// ═══════════════════════════════════════════════════════════════════
// ── TIMETABLE MODULE (incl. Google Calendar ICS import) ───────────
// only ever loaded on timetable.html; declarations are top-level
// (not wrapped in a page guard) because core.js's shared header
// nav-arrow handler calls renderTimetable() when on this page.
// ═══════════════════════════════════════════════════════════════════
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
        badge.innerHTML=`<span class="tt-allday-title">${esc(ev.title)}</span><button class="tt-event-edit" data-tteditid="${ev.id}" title="Edit">✎</button><button class="tt-event-del" data-ttid="${ev.id}" title="Remove">×</button>`;
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
    el.innerHTML=`<span class="tt-event-title"><span class="tt-event-time">${esc(ev.start)}</span> ${esc(ev.title)}</span><button class="tt-event-edit" data-tteditid="${ev.id}" title="Edit">✎</button><button class="tt-event-del" data-ttid="${ev.id}" title="Remove">×</button>`;
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
  if(!title){flagInvalidField('tt-title-input');return;}
  const day=+document.getElementById('tt-day-select').value;
  const isAllDay=document.getElementById('tt-allday-check').checked;
  const start=isAllDay?'00:00':document.getElementById('tt-start-input').value;
  const end=isAllDay?'23:59':document.getElementById('tt-end-input').value;
  const cat=document.getElementById('tt-cat-select').value;
  if(!isAllDay&&(!start||!end||start>=end)){flagInvalidField(!start?'tt-start-input':!end?'tt-end-input':'tt-end-input');return;}
  if(!isAllDay){const startSlot=ttTimeToSlot(start),endSlot=ttTimeToSlot(end);if(startSlot<0||endSlot>TT_SLOTS||startSlot>=endSlot){flagInvalidField('tt-end-input');return;}}
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

// ── INIT ──────────────────────────────────────────────────────────
if (CURRENT_PAGE === 'timetable') {
  renderTimetable();
  const mon=ttWeekStart||getTTWeekMonday(new Date());
  document.getElementById('month-title').textContent=getMonthNames()[mon.getMonth()];
  document.getElementById('year-label').textContent=mon.getFullYear();
}
