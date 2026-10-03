let filt = new URLSearchParams(location.search).get('cat') || 'All';

function renderFilters() { $('#filters').innerHTML = CATS.map(c => `<button class="chip ${c==filt?'on':''}" data-c="${c}">${c}</button>`).join('') }

function renderGrid() {
    $('#grid').innerHTML = P.filter(p => filt == 'All' || p.cat == filt).map(card).join('');
    bindCards($('#grid'));
}
$('#filters').addEventListener('click', e => {
    const c = e.target.dataset.c;
    if (c) {
        filt = c;
        renderFilters();
        renderGrid()
    }
});
renderFilters();
renderGrid();