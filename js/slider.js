const gone = m => {
    const s = m.closest('.slider'),
        d = s.querySelector('.dots i[data-i="' + m.dataset.i + '"]');
    if (d) d.remove();
    m.remove();
    s.dispatchEvent(new Event('refresh'))
};
window.slideMiss = m => { m.onerror = null; if (m.dataset.i == '0') { m.src = m.dataset.f } else gone(m) };

function slider(k, a, b, name, imgs, arrows) {
    let list;
    if (!imgs) list = [0, 1, 2].map(v => art(k, v, a, b));
    else if (imgs.length == 1) {
        const base = imgs[0].replace(/\.\w+$/, ''),
            ext = imgs[0].match(/\.\w+$/)[0];
        list = [imgs[0], base + '-2' + ext, base + '-3' + ext]
    } else list = imgs;
    return list.map((src, v) => `<img src="${src}" data-i="${v}" data-f="${art(k,v,a,b)}" onerror="slideMiss(this)" alt="${name}, photo ${v+1}" class="${v?'':'on'}">`).join('') +
        '<div class="dots">' + list.map((_, v) => `<i data-i="${v}" class="${v?'':'on'}"></i>`).join('') + '</div>' +
        (arrows ? '<button type="button" class="arr prev" aria-label="Previous photo">&#8249;</button><button type="button" class="arr next" aria-label="Next photo">&#8250;</button>' : '')
}

function bind(el, auto, manual) {
    let i = 0,
        t = null,
        x0 = null;
    const count = () => el.querySelectorAll('img').length;
    const show = n => {
        const im = el.querySelectorAll('img'),
            dt = el.querySelectorAll('.dots i');
        i = Math.min(n, Math.max(im.length - 1, 0));
        im.forEach((m, j) => m.classList.toggle('on', j == i));
        dt.forEach((m, j) => m.classList.toggle('on', j == i));
        el.querySelectorAll('.dots,.arr').forEach(x => x.style.display = im.length < 2 ? 'none' : '')
    };
    const next = () => { if (count() > 1) show((i + 1) % count()) };
    const move = d => {
        if (count() < 2) return;
        show((i + d + count()) % count());
        if (t) {
            clearInterval(t);
            t = setInterval(next, SLIDE_MS)
        }
    };
    const go = () => { if (!t) t = setInterval(next, SLIDE_MS) },
        stop = () => {
            clearInterval(t);
            t = null;
            show(0)
        };
    el.addEventListener('refresh', () => show(i));
    el.addEventListener('click', e => {
        const b = e.target.closest('.arr');
        if (!b) return;
        e.stopPropagation();
        move(b.classList.contains('next') ? 1 : -1)
    });
    el.addEventListener('touchstart', e => { x0 = e.touches[0].clientX }, { passive: true });
    el.addEventListener('touchend', e => {
        if (x0 == null) return;
        const dx = e.changedTouches[0].clientX - x0;
        x0 = null;
        if (Math.abs(dx) > 40) {
            el._sw = Date.now();
            move(dx < 0 ? 1 : -1)
        }
    });
    show(0);
    if (manual) return;
    if (auto) { go(); return }
    const host = el.closest('.prod,.cat') || el;
    host.addEventListener('pointerenter', e => { if (e.pointerType != 'touch') go() });
    host.addEventListener('pointerleave', e => { if (e.pointerType != 'touch') stop() });
    if (matchMedia('(hover:none)').matches && 'IntersectionObserver' in window)
        new IntersectionObserver(es => es.forEach(x => x.isIntersecting ? go() : stop()), { threshold: .6 }).observe(el);
}