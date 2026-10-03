const p = prod(new URLSearchParams(location.search).get('id')),
    el = $('#pdp');
if (!p) { el.innerHTML = '<h2>Product not found</h2><p class="sub">This item is not on our menu.</p><a class="btn" href="menu.html">Back to the menu</a>' } else {
    document.title = p.n + ' | Al Mashoor Bakery';
    const i = p.info || {},
        more = P.filter(x => x.cat == p.cat && x.id != p.id).slice(0, 3);
    el.innerHTML = `<div class="pdp"><div class="slider big" id="pS">${slider(p.k,p.a,p.b,p.n,p.imgs,true)}</div>
 <div class="buy" data-id="${p.id}"><p class="crumb">${p.cat}</p><h1>${p.n}</h1><p class="lead">${p.d}</p>${buyBlock(p)}
 <dl class="det"><dt>Ingredients</dt><dd>${i.ing||''}</dd><dt>${Array.isArray(p.p)?'Serves':'Pack size'}</dt><dd>${i.serves||''}</dd><dt>Allergens</dt><dd>${i.all||''} Made in a kitchen that handles nuts.</dd><dt>Storage</dt><dd>${i.keep||''}</dd><dt>Delivery</dt><dd>Cash on delivery only, flat Rs ${DEL}.</dd></dl></div></div>
 ${more.length?`<h2 style="margin-top:48px">More ${p.cat.toLowerCase()}</h2><div class="grid" id="more">${more.map(card).join('')}</div>`:''}`;
 bind($('#pS'),false,true);
 if(more.length)bindCards($('#more'));
}