// 5-bosqich DOM auditi. usage: node audit.js <outDir> <screen.html ...>
// Har bir ekran uchun: tizim qatlamlari va nav geometriyasi, touch target'lar, matn elementlari
// (rang, o'lcham, bbox), radiuslar; hamda ikki render: oddiy va matnsiz (kontrast foni uchun).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const [,, outDir, ...files] = process.argv;
const INTERACTIVE = 'button, a, .btn, .gbtn, .chip, .seg__item, .utabs__item, .nav__item, .dot-btn, .pill-more, .ep, .pack, .toggle, .check, .radio, .search, .field';
(async () => {
  const browser = await chromium.launch();
  const all = {};
  for (const f of files) {
    const name = path.basename(f, '.html');
    const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto('file://' + path.resolve(f), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    // nav: 393×852 viewport'da (uzun ekranlarda ramka rejimi — nav fixed) bir xil joyda suratga olinadi
    // nav liquid glass — orqadagi kontentga bog'liq; o'zini solishtirish uchun orqa fon yashiriladi
    if (await page.$('.nav')) {
      const hide = await page.addStyleTag({ content: '#screen > :not(.nav) { visibility: hidden !important; }' });
      const nb = await page.evaluate(() => { const r = document.querySelector('.nav').getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height }; });
      await page.waitForTimeout(80);
      await page.screenshot({ path: path.join(outDir, name + '.nav.png'), clip: nb });
      await hide.evaluate(el => el.remove());
    }
    const h = await page.evaluate(() => document.getElementById('screen').getBoundingClientRect().height);
    await page.setViewportSize({ width: 393, height: Math.ceil(h) });
    await page.waitForTimeout(150);
    const data = await page.evaluate((SEL) => {
      const scr = document.getElementById('screen'), S = scr.getBoundingClientRect();
      const box = el => { const r = el.getBoundingClientRect(); return { x: +(r.left - S.left).toFixed(2), y: +(r.top - S.top).toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2), b: +(S.bottom - r.bottom).toFixed(2) }; };
      const q = s => scr.querySelector(s);
      const sys = {};
      for (const s of ['.status__time', '.status__icons', '.island', '.home-ind', '.nav']) { const e = q(s); if (e) sys[s] = box(e); }
      const nav = q('.nav') ? [...q('.nav').children].map(c => c.className + '|' + c.textContent.trim()) : null;
      const visible = el => { const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
      const opacityChain = el => { let o = 1; for (let e = el; e && e !== document.documentElement; e = e.parentElement) o *= +getComputedStyle(e).opacity; return o; };
      const path = el => { const p = []; for (let e = el; e && e !== scr; e = e.parentElement) p.unshift((e.tagName.toLowerCase()) + (e.classList.length ? '.' + [...e.classList].join('.') : '')); return p.slice(-3).join(' > '); };
      const hscroll = el => { for (let e = el.parentElement; e && e !== scr; e = e.parentElement) { const ox = getComputedStyle(e).overflowX; if ((ox === 'auto' || ox === 'scroll' || ox === 'hidden') && e.scrollWidth > e.clientWidth + 1) return true; } return false; };
      // touch
      const touch = [...scr.querySelectorAll(SEL)].filter(visible).map(el => {
        const b = box(el); const pb = getComputedStyle(el, '::before');
        const hit = pb.content !== 'none' && pb.position === 'absolute' ? { w: Math.max(b.w, parseFloat(pb.width) || 0), h: Math.max(b.h, parseFloat(pb.height) || 0) } : { w: b.w, h: b.h };
        let host = null; for (let e = el.parentElement; e && e !== scr; e = e.parentElement) { if (e.matches('.row, .task, .t, .nt, .dl, .q, .opt, .plan, .pay, .auto, .m, .rem, label')) { host = box(e); break; } }
        return { el: path(el), text: el.textContent.trim().slice(0, 28), ...b, hit, host, disabled: !!el.closest('.is-disabled'), inline: el.tagName === 'A' && !!el.closest('p') };
      });
      // text
      const text = [];
      for (const el of scr.querySelectorAll('*')) {
        if (!visible(el)) continue;
        const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
        if (!own) continue;
        const cs = getComputedStyle(el);
        // matn bbox: faqat to'g'ridan-to'g'ri matn tugunlari
        const rng = document.createRange(); let r0 = null;
        for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) { rng.selectNodeContents(n); for (const r of rng.getClientRects()) { r0 = r0 ? { l: Math.min(r0.l, r.left), t: Math.min(r0.t, r.top), r: Math.max(r0.r, r.right), b: Math.max(r0.b, r.bottom) } : { l: r.left, t: r.top, r: r.right, b: r.bottom }; } }
        if (!r0) continue;
        // ota-onalar overflow kesimi: ko'rinadigan ulush; mask-image (ataylab so'ndirish) belgisi
        let cl = { ...r0 }, masked = false;
        for (let e = el.parentElement; e && e !== scr; e = e.parentElement) { const ec = getComputedStyle(e); if (ec.maskImage && ec.maskImage !== 'none' || ec.webkitMaskImage && ec.webkitMaskImage !== 'none') masked = true; if (ec.overflow !== 'visible' || ec.overflowY !== 'visible') { const rr = e.getBoundingClientRect(); cl = { l: Math.max(cl.l, rr.left), t: Math.max(cl.t, rr.top), r: Math.min(cl.r, rr.right), b: Math.min(cl.b, rr.bottom) }; } }
        const visFrac = Math.max(0, cl.r - cl.l) * Math.max(0, cl.b - cl.t) / ((r0.r - r0.l) * (r0.b - r0.t) || 1);
        if (visFrac < .5) continue;
        text.push({ el: path(el), text: el.textContent.trim().slice(0, 32), color: cs.color, fill: cs.webkitTextFillColor, size: parseFloat(cs.fontSize), weight: +cs.fontWeight, family: cs.fontFamily.split(',')[0].replace(/['"]/g, ''),
          opacity: opacityChain(el), x: r0.l - S.left, y: r0.t - S.top, w: r0.r - r0.l, h: r0.b - r0.t, disabled: !!el.closest('.is-disabled'), ph: !!el.closest('.search__ph, .field__ph'), inH: hscroll(el), masked, lockup: !!el.closest('.t-display, .lockup') });
      }
      // radii
      const radii = [];
      for (const el of scr.querySelectorAll('*')) {
        if (!visible(el)) continue;
        const cs = getComputedStyle(el); const r = cs.borderTopLeftRadius;
        if (r && r !== '0px') { const b = el.getBoundingClientRect(); radii.push({ el: path(el), r: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius], w: b.width, h: b.height }); }
      }
      // drama ↔ rasm: har bir .art (--amb) uchun eng yaqin ota-onadagi drama nomi
      const TITLES = ['Milliarderning yashirin kelini', 'Boʻri qirolining qasosi', 'Shartnoma boʻyicha xotin', 'Ajrashgandan keyin boylik', 'Direktorning sirli egizagi', 'Vampir qoʻriqchisi', 'Uch yildan keyin qaytdim', 'Malika libosidagi xizmatkor', 'Qishloqdan kelgan merosxoʻr', 'Sevgi va qasos oʻrtasida', 'Kelinning ikkinchi hayoti', 'Imperatorning soʻnggi farmoni', 'Ofisdagi yolgʻon nikoh', 'Taqdir toʻyi', 'Yashirin chempion', 'Qasos kelini', 'Merosxoʻrning qaytishi'];
      const arts = [];
      for (const a of scr.querySelectorAll('.art')) {
        const amb = (a.getAttribute('style') || '').match(/--amb:\s*var\((--amb-\d+)\)/); if (!amb) continue;
        const sil = [...a.classList].find(c => /^art--(portrait|couple|walk|duo|profile)$/.test(c)) || '';
        let title = null;
        for (let e = a, k = 0; e && e !== scr && k < 5 && !title; e = e.parentElement, k++) {
          const t = e.textContent; const hits = TITLES.filter(x => t.includes(x));
          if (hits.length === 1) title = hits[0]; else if (hits.length > 1) break;
        }
        arts.push({ amb: amb[1], sil, title, el: path(a) });
      }
      // iliq yuzalar: grain va halqa
      const warm = [...scr.querySelectorAll('.warm, .card--warm')].map(w => ({ el: path(w), grain: w.classList.contains('grain') || !!w.closest('.grain'), ring: !!w.querySelector('.ring') }));
      const screenWarm = { grain: scr.classList.contains('grain') || !!scr.querySelector(':scope > .grain, .warm.grain, .card--warm.grain'), ring: !!scr.querySelector('.ring') };
      return { h: S.height, sys, nav, touch, text, radii, arts, warm, screenWarm };
    }, INTERACTIVE);
    await page.locator('#screen').screenshot({ path: path.join(outDir, name + '.png') });
    await page.addStyleTag({ content: '*, *::before, *::after { color: transparent !important; -webkit-text-fill-color: transparent !important; text-shadow: none !important; caret-color: transparent !important; }' });
    await page.waitForTimeout(100);
    await page.locator('#screen').screenshot({ path: path.join(outDir, name + '.notext.png') });
    all[name] = data;
    await ctx.close();
    process.stdout.write(name + ' ');
  }
  fs.writeFileSync(path.join(outDir, 'audit.json'), JSON.stringify(all));
  console.log('\nok');
  await browser.close();
})();
