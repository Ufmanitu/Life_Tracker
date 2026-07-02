// ═══════════════════════════════════════════════════════════════════
// ── TASKS PAGE MODULE ──────────────────────────────────────────────
// only ever loaded on tasks.html
// ═══════════════════════════════════════════════════════════════════
function renderTasksView(){
  const list=document.getElementById("tasks-list");list.innerHTML="";
  // Scope title
  const scopeTitles={daily:"☀️ Daily Tasks",weekly:"📅 Weekly Tasks",monthly:"🗓 Monthly Tasks",yearly:"📆 Yearly Tasks"};
  document.getElementById('tasks-title').textContent=scopeTitles[taskScope]||t('tasksThisWeek');
  // Update scope btn active state
  document.querySelectorAll('.tasks-scope-btn').forEach(b=>b.classList.toggle('active',b.dataset.scope===taskScope));
  document.querySelectorAll('.task-filter-btn[data-i18n]').forEach(b=>{
    const key=b.dataset.i18n;const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
    if(tr[key])b.textContent=tr[key];
  });
  // Scope hierarchy: daily < weekly < monthly < yearly
  // A task is shown if its own scope is <= the current view scope,
  // OR its due date falls within the current scope's time window.
  const SCOPE_ORDER=['daily','weekly','monthly','yearly'];
  function scopeIncludes(taskScp,viewScp){
    const ti=SCOPE_ORDER.indexOf(taskScp||'daily');
    const vi=SCOPE_ORDER.indexOf(viewScp);
    return ti<=vi;
  }
  function dueWithinScope(dueStr,viewScp){
    if(!dueStr)return false;
    const due=new Date(dueStr+'T00:00:00');
    const today=new Date();today.setHours(0,0,0,0);
    const diff=Math.round((due-today)/86400000);
    if(viewScp==='daily') return diff<=0;
    if(viewScp==='weekly') return diff<=6;
    if(viewScp==='monthly'){
      const endOfMonth=new Date(today.getFullYear(),today.getMonth()+1,0);
      return diff<=Math.round((endOfMonth-today)/86400000);
    }
    if(viewScp==='yearly'){
      const endOfYear=new Date(today.getFullYear(),11,31);
      return diff<=Math.round((endOfYear-today)/86400000);
    }
    return false;
  }
  const filtered=state.tasks.filter(t=>{
    const scopeMatch = scopeIncludes(t.scope,taskScope) || dueWithinScope(t.due,taskScope);
    const priMatch = taskFilter==="all"||t.priority===taskFilter;
    return scopeMatch && priMatch;
  });
  if(!filtered.length){
    list.innerHTML=`<div style="text-align:center;color:#4a6a9a;padding:30px;font-size:14px;font-weight:600;">${t('noTasks')}</div>`;return;
  }
  const pClass={high:"priority-high",medium:"priority-medium",low:"priority-low"};
  const pLabel={high:t('priorityHigh'),medium:t('priorityMedium'),low:t('priorityLow')};
  const sClass={inprogress:"status-inprogress",notstarted:"status-notstarted",completed:"status-completed"};
  const sLabel={inprogress:t('statusInProgress'),notstarted:t('statusNotStarted'),completed:t('statusCompleted')};
  filtered.forEach((task,idx)=>{
    const item=document.createElement("div");item.className="task-item"+(task.done?" completed":"");
    item.style.animationDelay=`${idx*.05}s`;
    const due=getDueLabel(task.due);
    const dueHTML=due?`<span class="task-due ${due.overdue?'overdue':''}">${due.text}</span>`:"";
    item.innerHTML=`
      <div class="task-cb ${task.done?'checked':''}" data-tid="${task.id}">
        ${task.done?`<svg viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#3ecfb2" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`:""}
      </div>
      <span class="task-name ${task.done?'done':''}">${task.name}</span>
      <span class="priority-badge ${pClass[task.priority]}">${pLabel[task.priority]}</span>
      ${dueHTML}
      <span class="status-badge ${sClass[task.status]||'status-notstarted'}">${sLabel[task.status]||task.status}</span>
      <button class="task-edit-btn" data-etid="${task.id}" title="Edit">✎</button>
      <button class="task-remove-btn" data-rtid="${task.id}">×</button>`;
    list.appendChild(item);
  });
}
// ── TASKS PAGE ────────────────────────────────────────────────────────────────
if(CURRENT_PAGE==="tasks"){
  on("tasks-section","click",e=>{
    const cb=e.target.closest(".task-cb[data-tid]");
    if(cb){const task=state.tasks.find(x=>x.id===+cb.dataset.tid);if(task){task.done=!task.done;task.status=task.done?"completed":"inprogress";if(task.done)Duck.trigger('taskDone');}saveAll();renderTasksView();render(false);return;}
    const editBtn=e.target.closest(".task-edit-btn[data-etid]");
    if(editBtn){
      const task=state.tasks.find(x=>x.id===+editBtn.dataset.etid);
      if(task){
        editingTaskId=task.id;
        document.getElementById("task-name-input").value=task.name;
        document.getElementById("task-priority-select").value=task.priority||"medium";
        document.getElementById("task-due-input").value=task.due||"";
        document.getElementById("task-status-select").value=task.status||"notstarted";
        document.getElementById("add-task-btn").textContent="✓ Update Task";
        document.getElementById("task-edit-banner").classList.add("show");
        document.getElementById("add-task-form").classList.add("editing");
        document.getElementById("task-name-input").focus();
        document.getElementById("task-name-input").scrollIntoView({behavior:"smooth",block:"nearest"});
      }
      return;
    }
    const rem=e.target.closest("[data-rtid]");
    if(rem){state.tasks=state.tasks.filter(task=>task.id!==+rem.dataset.rtid);saveAll();renderTasksView();render(false);}
  });
  document.querySelectorAll(".task-filter-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".task-filter-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");taskFilter=btn.dataset.filter;renderTasksView();
    });
  });
  document.querySelectorAll(".tasks-scope-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{ taskScope=btn.dataset.scope; renderTasksView(); });
  });
  function taskCancelEdit(){
    editingTaskId=null;
    document.getElementById("add-task-btn").textContent="+ Add Task";
    document.getElementById("task-name-input").value="";
    document.getElementById("task-due-input").value="";
    document.getElementById("task-edit-banner").classList.remove("show");
    document.getElementById("add-task-form").classList.remove("editing");
  }
  on("task-cancel-edit","click",taskCancelEdit);
  on("add-task-btn","click",()=>{
    const name=document.getElementById("task-name-input").value.trim();if(!name){flagInvalidField("task-name-input");return;}
    const priority=document.getElementById("task-priority-select").value;
    const due=document.getElementById("task-due-input").value;
    const status=document.getElementById("task-status-select").value;
    if(editingTaskId!==null){
      const task=state.tasks.find(x=>x.id===editingTaskId);
      if(task){task.name=name;task.priority=priority;task.due=due;task.status=status;}
      taskCancelEdit();saveAll();renderTasksView();render(false);return;
    }
    state.tasks.push({id:state.taskIdCtr++,name,priority,due,status,done:false,scope:taskScope});
    document.getElementById("task-name-input").value="";document.getElementById("task-due-input").value="";
    saveAll();renderTasksView();render(false);
  });
  on("task-name-input","keydown",e=>{
    if(e.key==="Enter")document.getElementById("add-task-btn").click();
    if(e.key==="Escape"&&editingTaskId!==null)taskCancelEdit();
  });
}

// ── INIT ──────────────────────────────────────────────────────────
if (CURRENT_PAGE === 'tasks') { renderTasksView(); }
