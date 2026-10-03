/* ---------- product art (inline SVG, 3 views each) ---------- */
function rnd(s) { return () => { s = Math.sin(s) * 1e4; return s - Math.floor(s) } }

function dots(n, seed, cx, cy, R, r, f) {
    const q = rnd(seed);
    let o = '';
    for (let i = 0; i < n; i++) {
        const a = q() * 6.28,
            d = Math.sqrt(q()) * R;
        o += `<circle cx="${(cx+Math.cos(a)*d).toFixed(1)}" cy="${(cy+Math.sin(a)*d).toFixed(1)}" r="${r}" fill="${f}"/>`
    }
    return o
}
const E = (x, y, rx, ry, f, x2 = '') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${x2}/>`;
const C = (x, y, r, f) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`;
const R = (x, y, w, h, f, rx = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}"/>`;
const SH = 'rgba(0,0,0,.12)';

function cup(a, b, x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M62 118h76l-10 48H72z" fill="${b}"/>${C(100,108,34,a)}${C(100,86,26,a)}${C(100,66,16,a)}${C(100,52,6,'#C62839')}<path d="M70 118h60" stroke="rgba(255,255,255,.4)" stroke-width="3"/></g>` }

function don(a, b, x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})">${C(100,100,66,'#DDA668')}${C(100,100,58,a)}${dots(26,x+y+3,100,100,54,2.4,b)}${C(100,100,18,'#00000033')}${C(100,100,15,'#F5E6D8')}</g>` }

function art(k, v, a, b) {
    const bg = ['#F7D9D3', '#FBE8B8', '#CFE5D8'][v];
    let s = `<rect width="200" height="200" fill="${bg}"/>`;
    if (k == 'cake') {
        if (v == 0) s += E(100, 160, 82, 12, '#fff') + R(48, 96, 104, 60, a, 8) + R(48, 120, 104, 9, b, 0) + E(100, 96, 52, 14, b) + E(100, 94, 46, 10, a) + C(100, 84, 7, '#C62839') + C(78, 90, 4, b) + C(122, 90, 4, b);
        if (v == 1) {
            s += E(100, 168, 70, 8, SH);
            for (let i = 0; i < 3; i++) s += R(46, 78 + i * 26, 108, 26, i == 1 ? b : a, 3);
            s += C(100, 68, 9, '#C62839') + C(70, 74, 4, b) + C(130, 74, 4, b)
        }
        if (v == 2) s += C(100, 100, 78, '#fff') + C(100, 100, 68, a) + C(100, 100, 52, b) + C(100, 100, 44, a) + dots(14, 7, 100, 100, 36, 3, b) + [0, 1, 2, 3, 4, 5, 6, 7].map(i => C(100 + Math.cos(i * .785) * 60, 100 + Math.sin(i * .785) * 60, 5, '#C62839')).join('')
    }
    if (k == 'cupcake') {
        if (v == 0) s += E(100, 170, 60, 8, SH) + cup(a, b, 0, 0, 1);
        if (v == 1) s += C(100, 100, 76, b) + C(100, 100, 64, a) + C(100, 100, 46, '#fff4') + C(100, 100, 30, a) + C(100, 100, 14, '#fff6') + C(100, 100, 6, '#C62839');
        if (v == 2) s += E(100, 172, 80, 8, SH) + cup(a, b, -34, 20, .62) + cup(a, b, 56, 20, .62) + cup(a, b, 11, -6, .62)
    }
    if (k == 'cookie') {
        const ck = (x, y, r, i) => C(x, y, r, b) + C(x, y, r - 5, '#00000014') + dots(11, i, x, y, r - 12, r / 9, a);
        if (v == 0) s += E(100, 172, 60, 7, SH) + ck(100, 100, 64, 2);
        if (v == 1) { s += E(100, 170, 70, 8, SH); for (let i = 0; i < 3; i++) s += E(100, 138 - i * 26, 66, 22, b) + dots(7, i + 9, 100, 138 - i * 26, 46, 3, a) }
        if (v == 2) s += ck(70, 72, 40, 3) + ck(134, 86, 40, 5) + ck(92, 136, 40, 8)
    }
    if (k == 'donut') {
        if (v == 0) s += don(a, b, 0, 0, 1);
        if (v == 1) s += E(100, 172, 72, 8, SH) + E(100, 118, 72, 36, '#DDA668') + E(100, 108, 66, 30, a) + E(100, 108, 22, 9, '#00000033') + dots(24, 4, 100, 106, 56, 2.4, b).replace(/<circle/g, '<circle') + E(100, 108, 20, 7, bg);
        if (v == 2) s += don(a, b, -34, -34, .55) + don(a, b, 66, -12, .55) + don(a, b, 6, 52, .55)
    }
    if (k == 'brownie') {
        const sq = (x, y, w) => R(x, y, w, w, a, 6) + R(x + 5, y + 5, w - 10, w - 10, b, 4) + dots(9, x + y, x + w / 2, y + w / 2, w / 2 - 12, 3.2, '#C9A16A');
        if (v == 0) s += E(100, 170, 66, 8, SH) + sq(44, 48, 112);
        if (v == 1) { s += E(100, 176, 70, 8, SH); for (let i = 0; i < 3; i++) s += R(40, 126 - i * 30, 120, 32, i % 2 ? b : a, 6) + dots(4, i, 100, 142 - i * 30, 50, 2.6, '#C9A16A') }
        if (v == 2) s += sq(22, 22, 74) + sq(104, 22, 74) + sq(22, 104, 74) + sq(104, 104, 74)
    }
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">${s}</svg>`)
}