/* ---------- home ---------- */
function renderHome() {
    const f = P[0];
    $('#heroS').innerHTML = slider(f.k, f.a, f.b, f.n, f.imgs);
    bind($('#heroS'), true);
    const pick = { Cakes: P[3], Cookies: P[6], Cupcakes: P[8], Donuts: P[10], Brownies: P[12] };
    $('#cats').innerHTML = CATS.slice(1).map(c => { const p = pick[c]; return `<div class="cat" tabindex="0" role="link" data-c="${c}"><div class="slider">${slider(p.k,p.a,p.b,c,p.imgs)}</div>${c}</div>` }).join('');
    document.querySelectorAll('#cats .slider').forEach(s => bind(s));
}
$('#cats').addEventListener('click', e => { const c = e.target.closest('.cat'); if (c) location.href = 'menu.html?cat=' + c.dataset.c });
$('#cats').addEventListener('keydown', e => { if (e.key == 'Enter') e.target.click() });

renderHome();