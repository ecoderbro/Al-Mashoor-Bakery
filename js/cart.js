/* ---------- cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('am_cart') || '[]') } catch (e) {}
const save = () => {
    try { localStorage.setItem('am_cart', JSON.stringify(cart)) } catch (e) {}
    $('#cnt').textContent = cart.reduce((s, x) => s + x.q, 0)
};
const prod = id => P.find(x => x.id == id);

function unit(x) { const p = prod(x.id); if (!Array.isArray(p.p)) return p.p; return x.size == '1 pound' ? p.p[0] : x.size == '2 pound' ? p.p[1] : p.p[0] * x.lbs }
const label = x => x.size ? (x.size == 'Custom' ? `Custom, ${x.lbs} pound` : x.size) + (x.note ? ' · ' + x.note : '') : '';
const sub = () => cart.reduce((s, x) => s + unit(x) * x.q, 0);

save();