/* Product card, size/price block and "Add to cart" - shared by menu.html and product.html */
function buyBlock(p) {
    const cake = Array.isArray(p.p);
    return (cake ? `<div class="sizes" role="radiogroup" aria-label="Size">${['1 pound','2 pound','Custom'].map((s,i)=>`<label><input type="radio" name="s${p.id}" value="${s}" ${i?'':'checked'}><span>${s}</span></label>`).join('')}</div>
 <div class="cust"><label>Weight in pounds (minimum 3)<input type="number" class="lbs" min="3" step="0.5" value="3"></label><textarea class="note" placeholder="Flavour, design or message on the cake" maxlength="140"></textarea></div>`:'')
 +`<div class="price">${rs(cake?p.p[0]:p.p)}</div><button type="button" class="btn add">Add to cart</button>`}
function card(p){
 return `<article class="prod" data-id="${p.id}"><div class="slider">${slider(p.k,p.a,p.b,p.n,p.imgs,true)}</div><div class="pb"><h3><a href="product.html?id=${p.id}">${p.n}</a></h3><p>${p.d}</p>
 <a class="more" href="product.html?id=${p.id}">View details</a>${buyBlock(p)}</div></article>`}
function bindCards(root){root.querySelectorAll('.prod .slider').forEach(s=>bind(s))}
function priceOf(c){const p=prod(c.dataset.id);if(!Array.isArray(p.p))return;
 const s=c.querySelector('input:checked').value,l=Math.max(3,parseFloat(c.querySelector('.lbs').value)||3);
 c.querySelector('.cust').classList.toggle('on',s=='Custom');
 c.querySelector('.price').textContent=s=='Custom'?`${rs(p.p[0]*l)} (${rs(p.p[0])} per pound)`:rs(s=='1 pound'?p.p[0]:p.p[1])}
document.addEventListener('input',e=>{const c=e.target.closest('[data-id]');if(c)priceOf(c)});
document.addEventListener('click',e=>{
 const sl=e.target.closest('.prod .slider');
 if(sl&&!e.target.closest('.arr')){if(Date.now()-(sl._sw||0)>500)location.href='product.html?id='+sl.closest('.prod').dataset.id;return}
 const b=e.target.closest('.add');if(!b)return;const c=b.closest('[data-id]'),p=prod(c.dataset.id);let it={id:p.id,q:1};
 if(Array.isArray(p.p)){it.size=c.querySelector('input:checked').value;if(it.size=='Custom'){it.lbs=Math.max(3,parseFloat(c.querySelector('.lbs').value)||3);it.note=c.querySelector('.note').value.trim()}}
 const f=cart.find(x=>x.id==it.id&&x.size==it.size&&x.lbs==it.lbs&&(x.note||'')==(it.note||''));f?f.q++:cart.push(it);save();
 b.textContent='Added \u2713';setTimeout(()=>b.textContent='Add to cart',1200)});