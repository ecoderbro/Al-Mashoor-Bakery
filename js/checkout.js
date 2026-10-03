/* ---------- cart page ---------- */
function renderCart() {
    const el = $('#cartBody');
    if (!cart.length) { el.innerHTML = '<p class="sub">Your cart is empty.</p><a class="btn" href="menu.html">Browse the menu</a>'; return }
    el.innerHTML = `<div class="two"><div class="box">${cart.map((x,i)=>{const p=prod(x.id);return `<div class="line"><div><b>${p.n}</b><small>${label(x)}</small><div class="qty"><button data-i="${i}" data-d="-1" aria-label="Decrease">−</button>${x.q}<button data-i="${i}" data-d="1" aria-label="Increase">+</button><button class="link" data-i="${i}" data-d="x">Remove</button></div></div><b>${rs(unit(x)*x.q)}</b></div>`}).join('')}</div>
 <div class="box"><h3 style="margin-bottom:12px">Checkout</h3>
 <div class="field"><label for="fn">Full name</label><input type="text" id="fn" autocomplete="name"></div>
 <div class="field"><label for="fp">Phone number</label><input type="tel" id="fp" placeholder="03XX XXXXXXX" autocomplete="tel"></div>
 <div class="field"><label for="fa">Delivery address</label><textarea id="fa" autocomplete="street-address"></textarea></div>
 <div class="field"><label for="fd">Delivery date and time (optional)</label><input type="text" id="fd" placeholder="e.g. Friday 6 pm"></div>
 <b>Payment</b><div class="pay"><span class="dot" aria-hidden="true"></span><div><b>Cash on delivery</b><br><small>Standard delivery, Rs ${DEL}. This is the only option.</small></div></div>
 <div class="tot"><span>Subtotal</span><span>${rs(sub())}</span></div><div class="tot"><span>Delivery (cash on delivery)</span><span>${rs(DEL)}</span></div>
 <div class="tot big"><span>Total to pay</span><span>${rs(sub()+DEL)}</span></div>
 <div class="err" id="err" role="alert"></div><button class="btn" id="place" style="width:100%">Place order</button></div></div>`}
$('#cartBody').addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.d){const i=+b.dataset.i,d=b.dataset.d;if(d=='x')cart.splice(i,1);else{cart[i].q+=+d;if(cart[i].q<1)cart.splice(i,1)}save();renderCart()}
 if(b.id=='place')place()});
function place(){
 const n=$('#fn').value.trim(),ph=$('#fp').value.replace(/[\s-]/g,''),ad=$('#fa').value.trim(),dd=$('#fd').value.trim(),er=$('#err');
 if(!n||!ad){er.textContent='Please enter your name and delivery address.';return}
 if(!/^(03\d{9}|\+923\d{9})$/.test(ph)){er.textContent='Enter a valid mobile number, like 03XX XXXXXXX.';return}
 const id='AM'+Math.floor(10000+Math.random()*90000),total=sub()+DEL;
 const lines=cart.map(x=>`- ${x.q} x ${prod(x.id).n}${x.size?' ('+label(x)+')':''}: ${rs(unit(x)*x.q)}`).join('\n');
 const msg=`New order ${id}\nName: ${n}\nPhone: ${ph}\nAddress: ${ad}\n${dd?'Delivery time: '+dd+'\n':''}\n${lines}\n\nSubtotal: ${rs(sub())}\nDelivery (cash on delivery): ${rs(DEL)}\nTotal to pay in cash: ${rs(total)}`;
 try{sessionStorage.setItem('am_order',JSON.stringify({id,msg,total}))}catch(e){}
 cart=[];save();location.href='confirmation.html'}

renderCart();