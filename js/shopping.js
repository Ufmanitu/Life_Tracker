// ═══════════════════════════════════════════════════════════════════
// ── SHOPPING LIST MODULE ───────────────────────────────────────────
// (data load/save — saveShop/loadShop — lives in core.js since it must
// run on every page via loadAll(); this file holds rendering, only
// ever loaded on shopping.html)
// ═══════════════════════════════════════════════════════════════════
const SHOP_CATS = {
  grocery: {label:"🥦 Grocery", color:"#3ecfb2"},
  household: {label:"🏠 Household", color:"#4f6ef7"},
  personal: {label:"💄 Personal", color:"#e05a9a"},
  other: {label:"📦 Other", color:"#f5a623"},
};
let shopFilter = "all";

function renderShoppingList(){
  const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
  const SHOP_CATS_LABELS = {
    grocery: tr.shopGrocery||"🥦 Grocery",
    household: tr.shopHousehold||"🏠 Household",
    personal: tr.shopPersonal||"💄 Personal",
    other: tr.shopOther||"📦 Other",
  };
  const cats = shopFilter === "all" ? Object.keys(SHOP_CATS) : [shopFilter];
  const wrap = document.getElementById("shop-lists");
  wrap.innerHTML = "";
  cats.forEach(cat=>{
    const items = state.shopItems.filter(i=>i.cat===cat);
    if(shopFilter==="all" && items.length===0) return;
    const catInfo = SHOP_CATS[cat];
    const card = document.createElement("div");
    card.className = "shop-category-card";
    card.innerHTML = `<div class="shop-category-title" style="color:${catInfo.color};">${SHOP_CATS_LABELS[cat]}</div><div class="shop-items-list" data-cat="${cat}"></div>`;
    const list = card.querySelector(".shop-items-list");
    if(items.length===0){
      list.innerHTML = `<div style="font-size:12px;color:var(--text-muted);padding:6px 0;">${tr.shopNoItemsCat||"No items yet."}</div>`;
    } else {
      items.forEach(item=>{
        const row = document.createElement("div");
        row.className = "shop-item";
        row.dataset.sid = item.id;
        row.innerHTML = `
          <div class="shop-cb ${item.done?"checked":""}" data-sid="${item.id}">
            <svg viewBox="0 0 20 20" fill="none" stroke="#3ecfb2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,10 8,14 16,6"/></svg>
          </div>
          <span class="shop-item-name ${item.done?"checked-name":""}">${esc(item.name)}</span>
          <span class="shop-item-qty">×${item.qty}</span>
          <button class="shop-edit-btn" data-esid="${item.id}" title="Edit">✎</button>
          <button class="shop-remove-btn" data-rsid="${item.id}">✕</button>`;
        list.appendChild(row);
      });
    }
    wrap.appendChild(card);
  });
  if(wrap.innerHTML === ""){
    wrap.innerHTML = `<div style="font-size:13px;color:var(--text-muted);padding:20px 0;">${tr.shopNoItems||"No items yet. Add some below!"}</div>`;
  }
}

if(CURRENT_PAGE==="shopping"){ document.getElementById("add-shop-btn").addEventListener("click",()=>{
  const name = document.getElementById("shop-name-input").value.trim();
  if(!name){flagInvalidField("shop-name-input");return;}
  const qty = Math.max(1,parseInt(document.getElementById("shop-qty-input").value)||1);
  const cat = document.getElementById("shop-cat-select").value;
  state.shopItems.push({id:state.shopIdCtr++, name, qty, cat, done:false});
  document.getElementById("shop-name-input").value="";
  document.getElementById("shop-qty-input").value="1";
  saveShop(); renderShoppingList();
});
document.getElementById("shop-name-input").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("add-shop-btn").click();});
document.getElementById("clear-checked-shop-btn").addEventListener("click",()=>{
  state.shopItems = state.shopItems.filter(i=>!i.done);
  saveShop(); renderShoppingList();
});
document.getElementById("shop-lists").addEventListener("click",e=>{
  const cb = e.target.closest(".shop-cb[data-sid]");
  if(cb){
    const it=state.shopItems.find(x=>x.id===+cb.dataset.sid);
    if(it)it.done=!it.done;
    saveShop();renderShoppingList();
    if(it&&it.done&&state.shopItems.length&&state.shopItems.every(x=>x.done)) Duck.trigger('shoppingDone');
    return;
  }

  // Edit button — expand row into inline edit form
  const eb = e.target.closest(".shop-edit-btn[data-esid]");
  if(eb){
    const id=+eb.dataset.esid;
    const it=state.shopItems.find(x=>x.id===id);
    if(!it)return;
    const row=eb.closest(".shop-item");
    if(row.classList.contains("editing"))return;
    row.classList.add("editing");
    const tr=TRANSLATIONS[state.lang]||TRANSLATIONS.en;
    const catOpts=[
      {v:"grocery",l:tr.shopGrocery||"🥦 Grocery"},
      {v:"household",l:tr.shopHousehold||"🏠 Household"},
      {v:"personal",l:tr.shopPersonal||"💄 Personal"},
      {v:"other",l:tr.shopOther||"📦 Other"},
    ];
    row.innerHTML=`
      <div class="shop-edit-wrap">
        <input class="shop-edit-input shop-edit-name" value="${it.name.replace(/"/g,'&quot;')}" placeholder="Item name" data-field="name"/>
        <input class="shop-edit-input shop-edit-qty" type="number" min="1" value="${it.qty}" data-field="qty"/>
        <select class="shop-edit-cat" data-field="cat">${catOpts.map(o=>`<option value="${o.v}"${it.cat===o.v?" selected":""}>${o.l}</option>`).join("")}</select>
        <button class="shop-edit-save" data-savesid="${id}">✓ Save</button>
        <button class="shop-edit-cancel" data-cancelsid="${id}">✕</button>
      </div>`;
    row.querySelector('.shop-edit-input').focus();
    return;
  }

  // Save inline edit
  const sb = e.target.closest(".shop-edit-save[data-savesid]");
  if(sb){
    const id=+sb.dataset.savesid;
    const row=sb.closest(".shop-item");
    const name=row.querySelector('[data-field="name"]').value.trim();
    const qty=Math.max(1,parseInt(row.querySelector('[data-field="qty"]').value)||1);
    const cat=row.querySelector('[data-field="cat"]').value;
    if(name){const it=state.shopItems.find(x=>x.id===id);if(it){it.name=name;it.qty=qty;it.cat=cat;}}
    saveShop();renderShoppingList();
    return;
  }

  // Cancel inline edit
  const xb = e.target.closest(".shop-edit-cancel[data-cancelsid]");
  if(xb){saveShop();renderShoppingList();return;}

  const rb = e.target.closest(".shop-remove-btn[data-rsid]");
  if(rb){state.shopItems=state.shopItems.filter(x=>x.id!==+rb.dataset.rsid);saveShop();renderShoppingList();}
});
document.getElementById("shop-filter-row").addEventListener("click",e=>{
  const btn = e.target.closest("[data-shopcat]");
  if(!btn)return;
  document.querySelectorAll("[data-shopcat]").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  shopFilter = btn.dataset.shopcat;
  renderShoppingList();
});

// ── INIT ──────────────────────────────────────────────────────────
renderShoppingList();
} // end CURRENT_PAGE shopping
