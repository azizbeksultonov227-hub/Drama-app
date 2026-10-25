/* =====================================================================
   app.js — interaktiv prototip. Har bir ekran oxirida ulanadi.
   • Navigatsiya: har bir tarix yozuvi o'z orqaga stekini saqlaydi (history.state) —
     ilova ichidagi «orqaga», brauzerning orqaga / oldinga tugmalari, chap chetdan surish
     va Esc bir xil natija beradi; qaytilganda scroll joyi tiklanadi.
   • Holat (sessionStorage): coin, VIP, saqlanganlar, ochilgan qismlar, tarix, eslatmalar,
     vazifalar, sozlamalar — ekranlar orasida umumiy, har bir tugma shu holatni o'zgartiradi.
   • Scroll: gorizontal qatorlar va ichki ro'yxatlar barmoq / trackpad / sichqoncha bilan.
   • Statik rejim (navigator.webdriver yoki ?static): hech narsa ulanmaydi — skrinshotlar
     va index.html ko'rinishi dizayn bilan piksel-bir xil qoladi.
   ===================================================================== */
(() => {
  const screen = document.getElementById('screen');
  if (!screen) return;
  const ID = decodeURIComponent(location.pathname.split('/').pop()).replace(/\.html$/, '');
  const Q = new URLSearchParams(location.search);
  if (navigator.webdriver === true || Q.has('static')) { window.__dramaProto = ID; return; }
  const NOTIMERS = window.__protoNoTimers === true;   // testlar: taymerlar o'chiq, mantiq to'liq
  const HOME = '04-bosh-sahifa';
  const PRICE = 60;                                    // bitta qism narxi (coin)

  /* ---------- xotira: sessionStorage, bo'lmasa window.name ---------- */
  const mem = {};
  const store = {
    get(k) {
      try { const v = sessionStorage.getItem(k); return v == null ? null : JSON.parse(v); }
      catch (e) { try { const o = JSON.parse(window.name || '{}'); return k in o ? o[k] : null; } catch (e2) { return k in mem ? mem[k] : null; } }
    },
    set(k, v) {
      try { sessionStorage.setItem(k, JSON.stringify(v)); }
      catch (e) { try { const o = JSON.parse(window.name || '{}'); o[k] = v; window.name = JSON.stringify(o); } catch (e2) { mem[k] = v; } }
    },
  };

  /* ---------- yordamchilar ---------- */
  const $ = (sel, root = screen) => root.querySelector(sel);
  const $$ = (sel, root = screen) => [...root.querySelectorAll(sel)];
  const norm = s => (s || '').replace(/\s+/g, ' ').trim();
  const fold = s => norm(s).toLowerCase().replace(/[ʻʼ'`’‘]/g, '');
  const byText = (sel, text, root) => $$(sel, root).filter(e => norm(e.textContent).includes(text));
  const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const later = (ms, fn) => setTimeout(fn, ms);
  const pad = n => String(Math.max(0, n)).padStart(2, '0');
  const hash = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const toggleIn = (arr, v) => { const i = arr.indexOf(v); if (i < 0) arr.unshift(v); else arr.splice(i, 1); return i < 0; };
  const compact = k => k >= 1000 ? (k / 1000).toFixed(k >= 10000 ? 0 : 1).replace('.0', '') + 'M' : Math.round(k) + 'K';

  /* ---------- navigatsiya: orqaga steki har bir tarix yozuvida ---------- */
  const NAVK = 'drama-proto-nav', SK = 'drama-proto-state';
  const base = s => s.split('?')[0];
  const urlOf = s => base(s) + '.html' + (s.includes('?') ? s.slice(s.indexOf('?')) : '');
  const SELF = (() => { const p = new URLSearchParams(location.search); p.delete('reset'); const s = p.toString(); return ID + (s ? '?' + s : ''); })();
  const H = history.state && history.state.proto ? history.state : null;
  let stack = [], depth = 0;
  if (Q.has('reset')) store.set(SK, null);
  else if (H) { stack = H.stack || []; depth = H.depth || 0; }
  else { const p = store.get(NAVK); if (p && p.to === ID) { stack = p.stack || []; depth = p.depth || 0; } }
  store.set(NAVK, null);
  try { history.scrollRestoration = 'manual'; } catch (e) { /* eski brauzer */ }
  const setH = extra => { try { history.replaceState(Object.assign({}, history.state, { proto: 1, stack, depth }, extra), ''); } catch (e) { /* sandbox */ } };
  setH();
  const scrollers = () => $$('.xscroll, .hscroll, .yscroll');
  function saveScroll() { setH({ sy: scrollY, sx: scrollers().map(e => [e.scrollLeft, e.scrollTop]) }); }
  addEventListener('pagehide', saveScroll);
  addEventListener('pageshow', e => { if (e.persisted) location.reload(); });
  const open = (u, replace) => { saveScroll(); if (replace) location.replace(u); else location.assign(u); };
  const go = (t, o = {}) => {
    const ns = o.reset ? [] : o.replace ? stack.slice() : stack.concat(SELF);
    store.set(NAVK, { to: t, stack: ns, depth: o.reset ? 0 : o.replace ? depth : depth + 1 });
    open(t + '.html' + (o.q || ''), o.replace);
  };
  const back = (fallback = HOME) => {
    if (!stack.length) return go(fallback, { reset: true, replace: true });
    if (depth > 0) { saveScroll(); history.back(); return; }
    const t = stack[stack.length - 1];
    store.set(NAVK, { to: base(t), stack: stack.slice(0, -1), depth: 0 });
    open(urlOf(t), true);
  };
  const popTo = (t, fallback) => {
    const i = stack.map(base).lastIndexOf(t);
    if (i < 0) return go(fallback || t);
    const k = stack.length - i;
    if (depth >= k) { saveScroll(); history.go(-k); return; }
    store.set(NAVK, { to: t, stack: stack.slice(0, i), depth: 0 });
    open(urlOf(stack[i]), true);
  };
  // berilgan ekrandan oldingisiga qaytish (masalan VIP sotib olingach: 18 va 19 yopiladi)
  const popPast = t => { const i = stack.map(base).lastIndexOf(t); if (i <= 0) return back(); popTo(base(stack[i - 1])); };
  const to = (t, o) => () => go(t, o);
  try { parent !== window && parent.postMessage({ type: 'drama-proto', id: ID }, '*'); } catch (e) { /* mustaqil ochilgan */ }

  /* ---------- katalog: 17 drama (har biri bitta rasm: ambient + siluet) ---------- */
  const C = [
    { k: 'milliarder', t: 'Milliarderning yashirin kelini', a: '01', s: 'couple', g: ['Romantika', 'Qasos', 'CEO'], n: 80, st: 'Tugallangan', vn: 2400, svn: 534, cm: '3.4K', lk: '48K', r: 4.8, y: 2026, age: '16+', free: 10, dub: ['Oʻzbekcha', 'Ruscha'], d: 'Oddiy ofitsiant qiz toʻy kuni kuyovining xiyonatini koʻradi. Shu kecha u notanish milliarder bilan shartnoma tuzadi — lekin uning sirli oʻtmishi hammasini oʻzgartirib yuboradi...' },
    { k: 'bori', t: 'Boʻri qirolining qasosi', a: '02', s: 'profile', g: ['Qasos', 'Boʻrilar', 'Fantastika'], n: 72, st: 'Davom etmoqda', vn: 2900, svn: 610, cm: '5.1K', lk: '61K', r: 4.9, y: 2026, age: '16+', free: 10, dub: ['Oʻzbekcha', 'Ruscha'], d: 'U toʻyda xiyonatni koʻrdi... endi esa butun toʻda uning qoʻlida. Boʻrilar qiroli qasos uchun qaytdi.' },
    { k: 'shartnoma', t: 'Shartnoma boʻyicha xotin', a: '03', s: 'couple', g: ['CEO', 'Romantika', 'Shartnomali nikoh'], n: 60, st: 'Tugallangan', vn: 1600, svn: 402, cm: '2.2K', lk: '37K', r: 4.7, y: 2025, age: '12+', free: 10, dub: ['Oʻzbekcha', 'Ruscha'], d: 'Bir yillik shartnoma, ikki begona va bitta sir. Kim birinchi boʻlib sevib qoladi?' },
    { k: 'ajrash', t: 'Ajrashgandan keyin boylik', a: '04', s: 'portrait', g: ['Qasos', 'Drama'], n: 70, st: 'Tugallangan', vn: 1800, svn: 388, cm: '2.9K', lk: '40K', r: 4.7, y: 2025, age: '16+', free: 10, dub: ['Oʻzbekcha'], d: 'Ajrashgan kuni u milliardlik merosga ega boʻldi. Endi sobiq oilasi afsuslanadi.' },
    { k: 'direktor', t: 'Direktorning sirli egizagi', a: '05', s: 'duo', g: ['Sir', 'CEO'], n: 64, st: 'Davom etmoqda', vn: 980, svn: 210, cm: '1.4K', lk: '22K', r: 4.6, y: 2026, age: '12+', free: 10, dub: ['Ruscha', 'Inglizcha'], isNew: true, d: 'Kompaniya direktorining egizagi borligini faqat u biladi.' },
    { k: 'vampir', t: 'Vampir qoʻriqchisi', a: '06', s: 'profile', g: ['Fantastika', 'Romantika'], n: 50, st: 'Davom etmoqda', vn: 760, svn: 190, cm: '980', lk: '18K', r: 4.5, y: 2026, age: '16+', free: 10, dub: ['Ruscha', 'Inglizcha'], isNew: true, d: 'Yuz yillik vampir oddiy talaba qizni qoʻriqlashga qasam ichdi.' },
    { k: 'uch', t: 'Uch yildan keyin qaytdim', a: '07', s: 'walk', g: ['Qasos', 'Oilaviy', 'Drama'], n: 72, st: 'Tugallangan', vn: 1100, svn: 260, cm: '1.9K', lk: '29K', r: 4.6, y: 2025, age: '12+', free: 8, dub: ['Oʻzbekcha', 'Ruscha'], d: 'Uch yil oldin uni haydab yuborishdi. Endi u egasi sifatida qaytdi.' },
    { k: 'malika', t: 'Malika libosidagi xizmatkor', a: '08', s: 'portrait', g: ['Tarixiy', 'Romantika'], n: 58, st: 'Tugallangan', vn: 640, svn: 150, cm: '760', lk: '14K', r: 4.5, y: 2025, age: '12+', free: 0, vip: true, dub: ['Oʻzbekcha'], d: 'Saroy xizmatkori malika oʻrniga toʻyga yuboriladi.' },
    { k: 'qishloq', t: 'Qishloqdan kelgan merosxoʻr', a: '09', s: 'walk', g: ['Oilaviy', 'Qasos'], n: 90, st: 'Tugallangan', vn: 3200, svn: 720, cm: '6.3K', lk: '75K', r: 4.8, y: 2026, age: '12+', free: 10, dub: ['Oʻzbekcha'], uz: true, d: 'Qishloqdan kelgan yigit shahardagi eng katta kompaniyaning merosxoʻri boʻlib chiqadi.' },
    { k: 'sevgi', t: 'Sevgi va qasos oʻrtasida', a: '10', s: 'duo', g: ['Qasos', 'CEO'], n: 60, st: 'Tugallangan', vn: 512, svn: 120, cm: '640', lk: '11K', r: 4.4, y: 2025, age: '16+', free: 10, dub: ['Oʻzbekcha', 'Ruscha'], d: 'U qasos olish uchun keldi, lekin dushmanining oʻgʻlini sevib qoldi.' },
    { k: 'kelin', t: 'Kelinning ikkinchi hayoti', a: '11', s: 'portrait', g: ['Qasos', 'Romantika'], n: 40, st: 'Davom etmoqda', vn: 870, svn: 205, cm: '1.1K', lk: '19K', r: 4.6, y: 2026, age: '16+', free: 10, dub: ['Oʻzbekcha'], isNew: true, d: 'Toʻy kechasi xiyonat qurboni boʻlgan kelin bir yil oldinga qaytib uygʻonadi.' },
    { k: 'imperator', t: 'Imperatorning soʻnggi farmoni', a: '12', s: 'profile', g: ['Qasos', 'Tarixiy'], n: 66, st: 'Davom etmoqda', vn: 740, svn: 170, cm: '900', lk: '16K', r: 4.7, y: 2026, age: '16+', free: 0, vip: true, dub: ['Oʻzbekcha', 'Ruscha'], d: 'Imperatorning soʻnggi farmoni saroyni ikkiga boʻldi. Taxt kimga qoladi?' },
    { k: 'ofis', t: 'Ofisdagi yolgʻon nikoh', a: '13', s: 'couple', g: ['CEO', 'Romantika', 'Shartnomali nikoh'], n: 48, st: 'Davom etmoqda', vn: 450, svn: 98, cm: '520', lk: '9K', r: 4.4, y: 2026, age: '12+', free: 10, dub: ['Oʻzbekcha'], isNew: true, d: 'Boshligʻi bilan soxta nikoh — faqat bir oyga. Lekin hamkasblar shubhalanmoqda.' },
    { k: 'taqdir', t: 'Taqdir toʻyi', a: '14', s: 'couple', g: ['Romantika', 'Shartnomali nikoh'], n: 40, st: 'Tez kunda', vn: 0, svn: 0, cm: '0', lk: '0', r: 0, y: 2026, age: '12+', free: 10, dub: ['Oʻzbekcha'], soon: '26-oktabr · 20:00', wait: '12.4K', d: 'Ikki oila, bitta toʻy va kutilmagan almashinuv. Premyerada birinchi 10 qism bepul.' },
    { k: 'chempion', t: 'Yashirin chempion', a: '15', s: 'walk', g: ['Jangari', 'Qasos'], n: 56, st: 'Tez kunda', vn: 0, svn: 0, cm: '0', lk: '0', r: 0, y: 2026, age: '16+', free: 10, dub: ['Oʻzbekcha'], soon: '28-oktabr · 19:00', wait: '5.3K', d: 'Oddiy kuryer aslida yashirin jang chempioni.' },
    { k: 'qasoskelin', t: 'Qasos kelini', a: '16', s: 'portrait', g: ['Qasos', 'Romantika'], n: 80, st: 'Tugallangan', vn: 2100, svn: 480, cm: '3.0K', lk: '44K', r: 4.7, y: 2025, age: '16+', free: 10, dub: ['Oʻzbekcha', 'Ruscha'], d: 'Toʻy kuni sotilgan kelin besh yildan keyin qasos uchun qaytadi.' },
    { k: 'meros', t: 'Merosxoʻrning qaytishi', a: '17', s: 'profile', g: ['Qasos', 'CEO'], n: 70, st: 'Tez kunda', vn: 0, svn: 0, cm: '0', lk: '0', r: 0, y: 2026, age: '16+', free: 10, dub: ['Oʻzbekcha'], soon: '26-oktabr · 21:00', wait: '8.1K', d: 'Oilasidan quvilgan merosxoʻr kompaniyani qaytarib olish uchun keladi.' },
  ];
  const byT = t => C.find(d => d.t === t);
  const byK = k => C.find(d => d.k === k);
  const byA = a => C.find(d => d.a === a);
  const views = d => d.soon ? '' : compact(d.vn);
  const saves = d => d.soon ? '' : compact(d.svn);
  const dramaOf = el => {
    if (!el) return null;
    const txt = norm(el.textContent);
    const hit = C.filter(d => txt.includes(d.t)).sort((a, b) => b.t.length - a.t.length)[0];
    if (hit) return hit;
    const art = el.matches('.art') ? el : el.querySelector('.art');
    const m = art && (art.getAttribute('style') || '').match(/amb-(\d\d)/);
    return m ? byA(m[1]) : null;
  };
  const setArt = (el, d) => { if (!el || !d) return; el.className = el.className.replace(/art--(couple|profile|portrait|walk|duo)/, 'art--' + d.s); el.style.setProperty('--amb', `var(--amb-${d.a})`); };
  const lines = t => { const w = t.split(' '); let best = [t, ''], m = 1e9; for (let i = 1; i < w.length; i++) { const a = w.slice(0, i).join(' '), b = w.slice(i).join(' '), s = Math.max(a.length, b.length); if (s < m) { m = s; best = [a, b]; } } return best; };
  const fullPrice = d => Math.round((d.n - d.free) * PRICE * .76 / 100) * 100;
  const ranges = d => { const r = []; for (let a = 1; a <= d.n; a += 30) r.push([a, Math.min(d.n, a + 29)]); return r; };
  const similar = (d, k = 3) => C.filter(x => x !== d && !x.soon).map(x => [x, x.g.filter(g => d.g.includes(g)).length * 10000 + x.vn]).sort((a, b) => b[1] - a[1]).slice(0, k).map(x => x[0]);

  /* ---------- holat ---------- */
  const DEF = {
    paid: 20, bonus: 85, vip: false, auto: true, autoplay: true, notif: false, read: false, bought: false,
    saved: ['Milliarderning yashirin kelini', 'Boʻri qirolining qasosi', 'Shartnoma boʻyicha xotin', 'Imperatorning soʻnggi farmoni', 'Uch yildan keyin qaytdim', 'Vampir qoʻriqchisi'],
    liked: ['Boʻri qirolining qasosi', 'Milliarderning yashirin kelini'],
    remind: ['Merosxoʻrning qaytishi', 'Yashirin chempion'], follow: [], season: [],
    hist: ['Boʻri qirolining qasosi', 'Milliarderning yashirin kelini', 'Shartnoma boʻyicha xotin', 'Imperatorning soʻnggi farmoni', 'Uch yildan keyin qaytdim'],
    ep: { 'Milliarderning yashirin kelini': 10, 'Boʻri qirolining qasosi': 12, 'Shartnoma boʻyicha xotin': 5, 'Imperatorning soʻnggi farmoni': 30, 'Uch yildan keyin qaytdim': 72 },
    open: { 'Milliarderning yashirin kelini': [11, 12] }, full: ['Uch yildan keyin qaytdim'], done: ['Uch yildan keyin qaytdim'],
    dl: ['Boʻri qirolining qasosi', 'Milliarderning yashirin kelini', 'Taqdir toʻyi'],
    cur: 'Milliarderning yashirin kelini', checkin: false, rate: {}, rewarded: [],
    tasks: { watch3: 'todo', watch10: 'ready', share: 'todo', comment: 'done', notif: 'todo', tg: 'todo', phone: 'todo', rate: 'todo' },
    speed: '1.0x', quality: 'Avto', dub: 'Oʻzbekcha', sub: 'Oʻzbekcha', sleep: 'Oʻchiq', lang: 'Oʻzbekcha', theme: 'Tizim', dlq: '720p',
    method: 'Payme', tx: [], comments: [], recent: ['milliarder', 'boʻri', 'qasos kelin', 'koreys drama'], name: 'Foydalanuvchi', phone: '', pending: null, ads: 3, coinAds: 3,
  };
  const S = Object.assign(JSON.parse(JSON.stringify(DEF)), store.get(SK) || {});
  const save = () => store.set(SK, S);
  const total = () => S.paid + S.bonus;
  const spend = n => { if (total() < n) return false; const b = Math.min(S.bonus, n); S.bonus -= b; S.paid -= n - b; save(); return true; };
  const addTx = (title, sub, v) => { S.tx.unshift({ title, sub, v }); S.tx = S.tx.slice(0, 20); save(); };
  const earn = (n, title, sub = 'Bonus · 7 kun amal qiladi') => { S.bonus += n; addTx(title, sub, n); };
  const cur = () => byK(Q.get('d')) || byT(S.cur) || C[0];
  const setCur = d => { S.cur = d.t; save(); };
  const dq = d => '?d=' + d.k;
  const epNow = d => S.ep[d.t] || 1;
  const started = d => !!S.ep[d.t];
  const isOpen = (d, n) => S.vip || S.full.includes(d.t) || (!d.vip && n <= d.free) || (S.open[d.t] || []).includes(n);
  const unlock = (d, n) => { (S.open[d.t] = S.open[d.t] || []).includes(n) || S.open[d.t].push(n); save(); };
  const touch = d => { S.hist = [d.t].concat(S.hist.filter(t => t !== d.t)); save(); };
  // qismni ochishga urinish: ochiq → ok; VIP drama → 18; avto-ochish + coin yetarli → ochadi; aks holda paywall
  const tryOpen = (d, n, ok) => {
    if (d.soon) return toast(`Premyera: ${d.soon}`);
    if (isOpen(d, n)) return ok();
    if (d.vip) { toast('Bu drama faqat VIP aʼzolar uchun'); return later(600, () => go('18-vip')); }
    if (S.auto && spend(PRICE)) { unlock(d, n); addTx(`${n}-qism ochildi`, `${d.t} · avto-ochish`, -PRICE); toast(`${n}-qism ochildi · −${PRICE} coin`); return ok(); }
    go('16-paywall', { q: `${dq(d)}&e=${n}` });
  };
  const play = (d, n = epNow(d)) => tryOpen(d, n, () => { S.cur = d.t; S.ep[d.t] = n; touch(d); go('11-pleer'); });
  const toggleSaved = d => { const on = toggleIn(S.saved, d.t); save(); toast(on ? 'Roʻyxatga saqlandi' : 'Roʻyxatdan olib tashlandi'); return on; };
  const toggleLiked = d => { const on = toggleIn(S.liked, d.t); save(); toast(on ? 'Yoqdi' : 'Yoqtirishlardan olindi'); return on; };

  /* ---------- prototip uslublari (faqat tokenlar) ---------- */
  const css = document.createElement('style');
  css.textContent = `
    [hidden] { display: none !important; }
    #screen { -webkit-user-select: none; user-select: none; touch-action: pan-y; }
    #screen :is(.xscroll, .hscroll) { touch-action: pan-x pan-y; }
    #screen input { -webkit-user-select: text; user-select: text; }
    [data-tap], .chip, .seg__item, .utabs__item, .toggle, .check, .radio, .row { cursor: pointer; -webkit-tap-highlight-color: transparent; }
    [data-tap]:active { opacity: .82; }
    [data-tap]:focus-visible { outline: 2px solid var(--flame); outline-offset: 2px; }
    .proto-dragging, .proto-dragging * { cursor: grabbing !important; }
    .proto-fade { transition: opacity .22s ease; }
    .proto-toast { position: fixed; z-index: 300; top: 62px; left: 50%; max-width: calc(393px - 2 * var(--page-x)); width: max-content; padding: var(--s-12) var(--s-20);
      border-radius: var(--r-btn); background: color-mix(in srgb, var(--bg-2) 94%, transparent); box-shadow: inset 0 0 0 1px var(--line-2), var(--shadow-pill);
      -webkit-backdrop-filter: var(--glass-filter); backdrop-filter: var(--glass-filter); font: 500 var(--t-footnote)/1.3 var(--f-ui); color: var(--text-1); text-align: center;
      opacity: 0; transform: translate(-50%, -8px); transition: opacity .2s, transform .2s; pointer-events: none; }
    .proto-toast.is-on { opacity: 1; transform: translate(-50%, 0); }
    .proto-modal { position: absolute; z-index: 200; left: 0; right: 0; height: 852px; }
    .proto-modal .scrim { opacity: 0; transition: opacity .2s; }
    .proto-modal .sheet { max-height: calc(852px - 96px); overflow-y: auto; scrollbar-width: none; transform: translateY(100%); transition: transform .26s cubic-bezier(.2, .8, .2, 1); }
    .proto-modal.is-on .scrim { opacity: 1; }
    .proto-modal.is-on .sheet { transform: none; }
    .proto-sheet__text { margin-top: var(--s-8); color: var(--text-2); }
    .proto-sheet__rows { margin-top: var(--s-16); padding: 0; }
    .proto-sheet__body { margin-top: var(--s-16); }
    .proto-sheet__acts { display: flex; flex-direction: column; gap: var(--s-8); margin-top: var(--s-20); }
    .proto-stars { display: flex; justify-content: center; gap: var(--s-12); color: var(--sand); }
    .proto-input { flex: 1; min-width: 0; height: 100%; border: 0; outline: 0; background: none; padding: 0; margin: 0; font: inherit; color: var(--text-1); caret-color: var(--flame); }
    .proto-input::placeholder { color: var(--text-3); opacity: 1; }
    .proto-field { display: flex; align-items: center; height: var(--h-row); padding: 0 var(--s-16); border-radius: var(--r-tile); background: var(--bg-2); box-shadow: inset 0 0 0 1px var(--line-1); font: 400 var(--t-body)/1 var(--f-ui); }
    .proto-res { position: absolute; top: 134px; left: 0; right: 0; bottom: 0; padding: 0 var(--page-x) var(--s-40); }
    .proto-res__n { margin-bottom: var(--s-8); }
    .proto-row { display: flex; align-items: center; gap: var(--s-12); padding: var(--s-8) 0; }
    .proto-row + .proto-row { box-shadow: inset 0 1px 0 var(--line-1); }
    .proto-row .art { width: 44px; height: 62px; border-radius: var(--r-thumb); flex: none; }
    .proto-row__b { flex: 1; min-width: 0; }
    .proto-row__b p + p { margin-top: 2px; }
    .proto-empty { display: flex; flex-direction: column; align-items: center; gap: var(--s-6); padding: var(--s-40) var(--s-20); text-align: center; color: var(--text-2); }
    .proto-empty .ic { color: var(--text-3); margin-bottom: var(--s-6); }
    .proto-edge { position: fixed; z-index: 250; left: 0; width: 40px; height: 40px; margin-top: -20px; border-radius: 50%; display: grid; place-items: center;
      background: var(--glass-bg-strong); color: var(--text-1); box-shadow: inset 0 0 0 1px var(--glass-line); opacity: 0; pointer-events: none; transition: background .15s; }
    .proto-edge.is-armed { background: var(--flame); color: var(--on-flame); }
    .proto-pause { position: absolute; z-index: 4; left: 50%; top: 50%; width: 72px; height: 72px; margin: -36px 0 0 -36px; border-radius: 50%; display: grid; place-items: center;
      background: var(--glass-bg-strong); -webkit-backdrop-filter: var(--glass-filter); backdrop-filter: var(--glass-filter); color: var(--text-1); pointer-events: none; opacity: 0; transition: opacity .2s; }
    .proto-pause.is-on { opacity: 1; }
    .proto-x { position: absolute; z-index: 5; top: 6px; right: 6px; width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; background: var(--rose); color: var(--on-flame); box-shadow: var(--shadow-pill); }
    .proto-x .ic { width: 14px; height: 14px; }
    .proto-reply { margin: var(--s-10) 0 0 var(--s-16); padding-left: var(--s-12); box-shadow: inset 2px 0 0 var(--line-2); }
    .proto-reply + .proto-reply { margin-top: var(--s-8); }
    @media (prefers-reduced-motion: reduce) { .proto-toast, .proto-fade, .proto-modal .sheet, .proto-modal .scrim { transition: none; } }`;
  document.head.appendChild(css);

  /* ---------- bildirishnoma (toast) ---------- */
  const toast = msg => {
    let t = document.querySelector('.proto-toast');
    if (!t) { t = document.createElement('div'); t.className = 'proto-toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('is-on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('is-on'), 2200);
  };

  /* ---------- bosish: klaviatura bilan ham (Enter / Space), ichma-ich bosishda faqat ichkisi ---------- */
  const tap = (els, fn) => {
    const list = typeof els === 'string' ? $$(els) : [].concat(els);
    list.forEach(el => {
      if (!el || el.dataset.tap) return;
      el.dataset.tap = '1';
      if (!/^(BUTTON|A|INPUT)$/.test(el.tagName)) { el.setAttribute('role', el.getAttribute('role') || 'button'); el.tabIndex = 0; }
      el.addEventListener('click', e => { e.stopPropagation(); fn(el, e); });
    });
  };
  addEventListener('keydown', e => {
    const el = document.activeElement;
    if ((e.key === 'Enter' || e.key === ' ') && el && el.dataset && el.dataset.tap && !/^(BUTTON|A|INPUT)$/.test(el.tagName)) { e.preventDefault(); el.click(); }
  });

  /* ---------- pastki oyna (action sheet / tasdiqlash) ---------- */
  let modal = null;
  const sheet = ({ title = '', text = '', items = [], html = '', cancel = 'Bekor qilish', onOpen } = {}) => {
    if (modal) modal.close(true);
    const w = document.createElement('div');
    w.className = 'proto-modal';
    const long = document.documentElement.scrollHeight > innerHeight + 2 && innerHeight === 852;
    w.style.top = (long ? scrollY : 0) + 'px';
    w.innerHTML = `<div class="scrim"></div><section class="sheet" role="dialog" aria-modal="true" aria-label="${title}"><div class="sheet__handle"></div>
      ${title ? `<h2 class="t-serif-lg" style="font-size: var(--t-title-3)">${title}</h2>` : ''}${text ? `<p class="t-footnote proto-sheet__text">${text}</p>` : ''}
      ${html ? `<div class="proto-sheet__body">${html}</div>` : ''}
      ${items.length ? `<div class="card proto-sheet__rows">${items.map((it, i) => `<div class="row" data-i="${i}" role="button" tabindex="0">${it.icon ? `<i class="ic ic-${it.icon}"></i>` : ''}<span class="row__label"${it.danger ? ' style="color: var(--rose)"' : ''}>${it.label}</span>${it.value ? `<span class="row__value">${it.value}</span>` : ''}${it.on ? '<i class="ic ic-check c-flame"></i>' : ''}</div>`).join('')}</div>` : ''}
      ${cancel ? `<div class="proto-sheet__acts"><button class="btn btn--glass btn--block" data-x>${cancel}</button></div>` : ''}</section>`;
    screen.appendChild(w);
    document.documentElement.style.overflow = 'hidden';
    const close = now => { if (modal && modal.el === w) modal = null; document.documentElement.style.overflow = ''; if (now) return w.remove(); w.classList.remove('is-on'); later(260, () => w.remove()); };
    w.querySelector('.scrim').addEventListener('click', () => close());
    w.querySelectorAll('[data-x]').forEach(b => b.addEventListener('click', () => close()));
    w.querySelectorAll('.proto-sheet__rows .row').forEach(r => r.addEventListener('click', () => { const it = items[+r.dataset.i]; close(); it.fn && it.fn(); }));
    swipeDown(w.querySelector('.sheet'), () => close());
    modal = { el: w, close };
    requestAnimationFrame(() => requestAnimationFrame(() => w.classList.add('is-on')));
    onOpen && onOpen(w, close);
    return modal;
  };
  const ask = ({ title, text, ok = 'Tasdiqlash', danger = false }, fn) => sheet({
    title, text, cancel: 'Bekor qilish',
    html: `<button class="btn ${danger ? 'btn--glass' : 'btn--primary'} btn--block" data-ok${danger ? ' style="color: var(--rose)"' : ''}>${ok}</button>`,
    onOpen: (w, close) => w.querySelector('[data-ok]').addEventListener('click', () => { close(); fn(); }),
  });
  const shareSheet = (what, onShare) => sheet({
    title: 'Ulashish', text: what,
    items: [['send', 'Telegram'], ['video', 'Instagram'], ['comment', 'WhatsApp'], ['link', 'Havolani nusxalash']].map(([icon, label]) => ({
      icon, label, fn: () => { if (label.startsWith('Havola')) { try { navigator.clipboard.writeText('https://drama.uz/' + fold(what).replace(/\s+/g, '-')).catch(() => {}); } catch (e) { /* — */ } } toast(label.startsWith('Havola') ? 'Havola nusxalandi' : `${label} orqali ulashildi`); onShare && onShare(); },
    })),
  });
  const reportSheet = what => sheet({ title: 'Shikoyat', text: what, items: ['Spam yoki reklama', 'Haqoratli', 'Spoyler', 'Boshqa sabab'].map(label => ({ label, fn: () => toast('Shikoyat yuborildi · rahmat') })) });
  const starsSheet = (title, cur, fn) => sheet({
    title, cancel: 'Yopish',
    html: `<div class="proto-stars">${[1, 2, 3, 4, 5].map(k => `<span class="hit" data-k="${k}" role="button" tabindex="0" aria-label="${k} yulduz"><i class="ic ${k <= cur ? 'ic-star-fill' : 'ic-star'} ic--32"></i></span>`).join('')}</div>`,
    onOpen: (w, close) => w.querySelectorAll('[data-k]').forEach(s => s.addEventListener('click', () => { const k = +s.dataset.k; w.querySelectorAll('[data-k] .ic').forEach((i, j) => { i.classList.toggle('ic-star-fill', j < k); i.classList.toggle('ic-star', j >= k); }); later(350, () => { close(); fn(k); }); })),
  });
  const inputSheet = ({ title, text, ph, ok = 'Saqlash', value = '', type = 'text' }, fn) => sheet({
    title, text,
    html: `<label class="proto-field"><input class="proto-input" type="${type}" placeholder="${ph}" value="${value}"></label><div class="proto-sheet__acts" style="margin-top: var(--s-12)"><button class="btn btn--primary btn--block" data-ok>${ok}</button></div>`,
    onOpen: (w, close) => {
      const inp = w.querySelector('input'); later(280, () => inp.focus());
      const done = () => { const v = inp.value.trim(); if (!v) { toast('Maydonni toʻldiring'); return inp.focus(); } close(); fn(v); };
      w.querySelector('[data-ok]').addEventListener('click', done);
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') done(); });
    },
  });

  /* ---------- haqiqiy matn maydoni (placeholder span o'rniga input) ---------- */
  const makeInput = (box, enter = 'search') => {
    const span = box && box.querySelector('.search__ph, .field__ph');
    if (!span) return null;
    const inp = document.createElement('input');
    inp.className = 'proto-input'; inp.type = 'text'; inp.placeholder = norm(span.textContent); inp.enterKeyHint = enter;
    inp.setAttribute('aria-label', inp.placeholder); inp.autocomplete = 'off';
    span.replaceWith(inp);
    box.addEventListener('click', () => inp.focus());
    inp.addEventListener('keydown', e => { if (e.key === 'Escape') inp.blur(); });
    return inp;
  };

  /* ---------- surish: sichqoncha bilan sudrab aylantirish, chap chetdan orqaga ---------- */
  let drag = null, edge = null, eatClick = false;
  const eat = () => { eatClick = true; setTimeout(() => { eatClick = false; }, 0); };
  document.addEventListener('click', e => { if (eatClick) { e.stopPropagation(); e.preventDefault(); eatClick = false; } }, true);
  const pageScrolls = () => document.documentElement.scrollHeight > innerHeight + 2;
  const glide = (apply, v) => { let last = performance.now(); const step = now => { const dt = Math.min(32, now - last); last = now; v *= Math.pow(.95, dt / 16); if (Math.abs(v) < .02) return; apply(v * dt); requestAnimationFrame(step); }; requestAnimationFrame(step); };
  const canBack = () => !modal && (stack.length > 0 || !!$('[aria-label="Orqaga"], [aria-label="Yopish"], .sheet__close'));
  const edgeEl = document.createElement('div'); edgeEl.className = 'proto-edge'; edgeEl.innerHTML = '<i class="ic ic-chev-left ic--20"></i>'; document.body.appendChild(edgeEl);
  screen.addEventListener('pointerdown', e => {
    if (e.button > 0) return;
    if (e.clientX <= 16 && canBack()) { edge = { x: e.clientX, y: e.clientY }; edgeEl.style.top = e.clientY + 'px'; return; }
    if (e.pointerType !== 'mouse' || e.target.closest('input, .scrub, .gslider, [data-swipe], .proto-modal')) return;
    const sc = e.target.closest('.xscroll, .hscroll, .yscroll');
    drag = { sc, x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, t: e.timeStamp, vx: 0, vy: 0, axis: null };
  });
  addEventListener('pointermove', e => {
    if (edge) {
      const dx = Math.max(0, e.clientX - edge.x);
      edgeEl.style.opacity = Math.min(1, dx / 60); edgeEl.style.transform = `translateX(${Math.min(dx, 110) * .5}px)`; edgeEl.classList.toggle('is-armed', dx > 90);
      return;
    }
    if (!drag) return;
    if (!drag.axis) {
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.hypot(dx, dy) < 6) return;
      const horiz = Math.abs(dx) > Math.abs(dy);
      let sc = drag.sc;
      while (sc && sc.classList.contains('yscroll') === horiz) sc = sc.parentElement.closest('.xscroll, .hscroll, .yscroll');
      if (!sc && (horiz || !pageScrolls())) { drag = null; return; }
      drag.sc = sc; drag.axis = horiz ? 'x' : 'y'; drag.x = e.clientX; drag.y = e.clientY;
      drag.sl = sc ? sc.scrollLeft : 0; drag.st = sc ? sc.scrollTop : scrollY;
      if (sc) sc.style.scrollSnapType = 'none';
      document.documentElement.classList.add('proto-dragging');
    }
    const dt = Math.max(1, e.timeStamp - drag.t);
    drag.vx = (drag.lx - e.clientX) / dt; drag.vy = (drag.ly - e.clientY) / dt; drag.lx = e.clientX; drag.ly = e.clientY; drag.t = e.timeStamp;
    if (drag.axis === 'x') drag.sc.scrollLeft = drag.sl - (e.clientX - drag.x);
    else if (drag.sc) drag.sc.scrollTop = drag.st - (e.clientY - drag.y);
    else scrollTo(0, drag.st - (e.clientY - drag.y));
  });
  const endDrag = e => {
    if (edge) {
      const dx = e.clientX - edge.x, dy = Math.abs(e.clientY - edge.y); edge = null;
      edgeEl.style.opacity = 0; edgeEl.style.transform = ''; edgeEl.classList.remove('is-armed');
      if (dx > 90 && dy < 80) { eat(); back(); }
      return;
    }
    if (!drag) return;
    const d = drag; drag = null;
    if (!d.axis) return;
    eat(); document.documentElement.classList.remove('proto-dragging');
    const el = d.sc;
    if (d.axis === 'x') glide(s => { el.scrollLeft += s; }, d.vx);
    else if (el) glide(s => { el.scrollTop += s; }, d.vy);
    else glide(s => scrollBy(0, s), d.vy);
    if (el) later(500, () => { el.style.scrollSnapType = ''; });
  };
  addEventListener('pointerup', endDrag);
  addEventListener('pointercancel', () => { edge = null; drag = null; edgeEl.style.opacity = 0; document.documentElement.classList.remove('proto-dragging'); });

  // yo'nalishli surish (lenta, pleer, hero karusel, sheet'ni pastga yopish)
  const swipe = (el, h, { mark = true, min = 50 } = {}) => {
    if (!el) return;
    if (mark) el.dataset.swipe = '1';
    let s = null;
    el.addEventListener('pointerdown', e => { if (e.button > 0 || e.clientX <= 16) return; s = { x: e.clientX, y: e.clientY }; });
    el.addEventListener('pointerup', e => {
      if (!s) return;
      const dx = e.clientX - s.x, dy = e.clientY - s.y; s = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < min) return;
      const fn = Math.abs(dy) > Math.abs(dx) ? (dy < 0 ? h.up : h.down) : (dx < 0 ? h.left : h.right);
      if (fn) { eat(); fn(); }
    });
    el.addEventListener('pointercancel', () => { s = null; });
  };
  function swipeDown(sh, fn) {
    if (!sh) return;
    let s = null;
    sh.addEventListener('pointerdown', e => { const r = sh.getBoundingClientRect(); if (e.clientY - r.top > 72 || e.target.closest('button, input, .chip')) return; s = e.clientY; });
    sh.addEventListener('pointerup', e => { if (s == null) return; const dy = e.clientY - s; s = null; if (dy > 70) { eat(); fn(); } });
  }
  addEventListener('keydown', e => {
    if (e.key !== 'Escape' || (document.activeElement && document.activeElement.tagName === 'INPUT')) return;
    if (modal) modal.close(); else if (canBack()) back();
  });
  const toTop = () => { scrollTo({ top: 0, behavior: 'smooth' }); $$('.yscroll').forEach(s => s.scrollTo({ top: 0, behavior: 'smooth' })); };

  /* ---------- umumiy bo'laklar ---------- */
  const empty = (icon, title, sub = '') => `<div class="proto-empty"><i class="ic ic-${icon} ic--28"></i><p class="t-body-m">${title}</p>${sub ? `<p class="t-footnote c-3">${sub}</p>` : ''}</div>`;
  const rowHTML = d => `<div class="proto-row" data-k="${d.k}"><div class="art art--${d.s}" style="--amb: var(--amb-${d.a})"></div><div class="proto-row__b"><p class="t-body-m">${d.t}</p><p class="t-caption c-3">${d.g.slice(0, 2).join(' · ')} · ${d.soon ? 'Premyera ' + d.soon : d.n + ' qism'}</p></div><i class="ic ic-chev-right ic--18 c-3"></i></div>`;
  const posterTag = d => d.vip ? '<span class="tag tag--vip"><i class="ic ic-crown"></i>VIP</span>' : d.isNew ? '<span class="tag tag--new">YANGI</span>' : d.uz ? '<span class="tag tag--uz">Oʻzbekcha</span>' : '';
  const posterHTML = d => `<article class="poster"><div class="poster__media art art--${d.s}" style="--amb: var(--amb-${d.a})">${posterTag(d)}<span class="poster__name" style="bottom: 32px">${d.t}</span><span class="poster__eps"><span class="tag tag--eps">${d.n} qism</span></span></div><h3 class="poster__title">${d.t}</h3><p class="poster__meta"><i class="ic ic-eye"></i>${views(d)}</p></article>`;
  const wirePosters = root => tap($$('.poster, .proto-row, .res, .lrow, .pod', root).filter(p => !p.dataset.tap), p => { const d = byK(p.dataset.k) || dramaOf(p); if (d) { setCur(d); go('10-drama', { q: dq(d) }); } });
  const fitScreen = () => { if ($('.scroll-pad') || screen.hasAttribute('data-grow')) { screen.style.height = 'auto'; screen.style.minHeight = '852px'; } };
  const remindBtn = (btn, d, label) => {
    if (!btn || !d) return;
    btn.dataset.label = label;
    const paint = () => { const on = S.remind.includes(d.t); btn.classList.toggle('btn--done', on); btn.classList.toggle('btn--glass', !on); btn.innerHTML = on ? '<i class="ic ic-check ic--16"></i>Eslatiladi' : `<i class="ic ic-bell ic--16"></i>${label}`; };
    paint();
    tap(btn, () => { const on = toggleIn(S.remind, d.t); save(); paint(); toast(on ? `Premyerada eslatamiz · ${d.soon || ''}` : 'Eslatma oʻchirildi'); });
  };
  const epHTML = (d, n, style) => {
    const now = epNow(d), st = started(d);
    if (d.soon) return `<span class="ep ep--locked" data-n="${n}">${n}<i class="ic ic-lock"></i></span>`;
    if (st && n === now) return `<span class="ep ep--current" data-n="${n}">${n}${style === 12 ? '<i class="ic ic-play-fill"></i>' : ''}</span>`;
    if (st && n < now) return style === 12 && n <= d.free ? `<span class="ep ep--free has-label" data-n="${n}">${n}</span>` : `<span class="ep ep--watched" data-n="${n}">${n}<i class="ic ic-check"></i></span>`;
    if (isOpen(d, n)) return n <= d.free && !d.vip ? `<span class="ep ep--free${style === 12 ? ' has-label' : ''}" data-n="${n}">${n}</span>` : `<span class="ep ep--open" data-n="${n}">${n}</span>`;
    return d.vip ? `<span class="ep ep--vip" data-n="${n}">${n}<i class="ic ic-crown"></i></span>` : `<span class="ep ep--locked" data-n="${n}">${n}<i class="ic ic-lock"></i></span>`;
  };

  /* ---------- ekranlar ---------- */
  const NAV = { 'Bosh sahifa': '04-bosh-sahifa', 'Mukofot': '22-mukofotlar', 'Lenta': '05-lenta', 'Roʻyxatim': '24-royxatim', 'Profil': '27-profil' };
  const R = {};

  R['01-onboarding'] = () => {
    const items = $$('.list li'), cap = $('.cap'), cta = $('.cta');
    const names = () => items.filter(li => li.classList.contains('is-on')).map(li => norm(li.textContent).replace(/^→\s*/, ''));
    const update = () => {
      const n = names().length;
      cap.innerHTML = `Tanlandi: ${n} / ${items.length}<br>Pastga suring ↓`;
      cta.textContent = n >= 3 ? `Davom etish · ${n} ta tanlandi` : `Yana ${3 - n} ta janr tanlang`;
      cta.classList.toggle('is-disabled', n < 3);
    };
    tap(items, li => {
      const on = !li.classList.contains('is-on'), name = norm(li.textContent).replace(/^→\s*/, '');
      li.classList.toggle('is-on', on);
      li.innerHTML = on ? `→ ${name}<span class="dot"></span>` : name;
      update();
    });
    $$('.lang .chip').forEach(c => tap(c, () => {
      const prev = $('.lang .chip--selected'); if (prev === c) return;
      const mark = prev.querySelector('.ic-check'); prev.classList.remove('chip--selected'); c.classList.add('chip--selected'); if (mark) c.prepend(mark);
      S.lang = norm(c.textContent); save(); toast(`Til: ${S.lang}`);
    }));
    tap('.guest', () => { S.genres = names(); save(); go(HOME, { reset: true }); });
    tap(byText('.btn--text', 'Oʻtkazib'), to('02-kirish'));
    tap(cta, () => { if (names().length < 3) return toast('Kamida 3 ta janr tanlang'); S.genres = names(); save(); go('02-kirish'); });
  };

  R['02-kirish'] = () => {
    const login = how => { S.login = how; S.bonus += 50; addTx('Roʻyxatdan oʻtish bonusi', `${how} · bonus`, 50); toast(`${how} orqali kirdingiz · +50 bonus coin`); later(700, () => go('03-sovga')); };
    tap(byText('.btn', 'Telefon raqam'), () => inputSheet({ title: 'Telefon raqam', text: 'Tasdiqlash kodi SMS orqali yuboriladi', ph: '+998 90 123 45 67', ok: 'Kod olish', type: 'tel' }, v => { S.phone = v; save(); login('Telefon'); }));
    tap(byText('.btn', 'Telegram'), () => login('Telegram'));
    tap(byText('.btn', 'Google'), () => login('Google'));
    tap(byText('.btn', 'Apple'), () => login('Apple'));
    const guest = () => { S.login = null; save(); go(HOME, { reset: true }); };
    tap(byText('.btn', 'Mehmon'), guest);
    tap('.sheet__close', guest);
    tap('.scrim', guest);
    tap(byText('a', 'shartlari'), () => sheet({ title: 'Foydalanish shartlari', text: 'Ilovadan foydalanish, coin va obuna qoidalari, kontent huquqlari. Toʻliq matn huquqiy boʻlim tomonidan beriladi.', cancel: 'Yopish' }));
    tap(byText('a', 'siyosati'), () => sheet({ title: 'Maxfiylik siyosati', text: 'Qaysi maʼlumotlar yigʻiladi, qanday saqlanadi va qanday oʻchiriladi. Toʻliq matn huquqiy boʻlim tomonidan beriladi.', cancel: 'Yopish' }));
  };

  R['03-sovga'] = () => {
    tap(byText('.btn', 'Sovgʻani olish'), b => { b.classList.add('is-disabled'); earn(100, 'Yangi foydalanuvchi sovgʻasi'); toast('+100 coin hisobingizga tushdi'); later(900, () => go(HOME, { reset: true })); });
    tap('[aria-label="Yopish"]', to(HOME, { reset: true }));
    tap('.scrim', to(HOME, { reset: true }));
    tap('.gift', () => toast('Sovgʻa: 100 bonus coin · 7 kun amal qiladi'));
  };

  R['04-bosh-sahifa'] = () => {
    const chip = $('.coin-chip');
    chip.childNodes.forEach(n => { if (n.nodeType === 3 && /\d/.test(n.nodeValue)) n.nodeValue = fmt(total()); });
    tap(chip, to('17-coin-dokoni'));
    tap('[aria-label="Qidiruv"]', to('06-qidiruv'));
    tap('[aria-label="Bildirishnomalar"]', to('26-bildirishnomalar'));
    if (S.read) { const b = $('.badge-count'); b && b.remove(); }

    // hero karusel: 5 ta tanlangan drama, nuqtalar, surish va avto-almashish
    const FEAT = ['milliarder', 'bori', 'qishloq', 'ajrash', 'imperator'].map(byK);
    const hero = $('.hero'), media = $('.hero__media'), title = $('.hero__title'), meta = $('.hero__meta'), dashes = $$('.hero__dashes .dashes i');
    const saveBtn = byText('.hero .btn--text', 'Roʻyxat')[0];
    let hi = 0, hold = 0;
    [media, title, meta].forEach(e => e.classList.add('proto-fade'));
    const paintSave = () => { const on = S.saved.includes(FEAT[hi].t); saveBtn.innerHTML = on ? '<i class="ic ic-check"></i>Roʻyxatda' : '<i class="ic ic-plus"></i>Roʻyxatga'; };
    const setHero = i => {
      hi = (i + FEAT.length) % FEAT.length; const d = FEAT[hi];
      [media, title, meta].forEach(e => { e.style.opacity = '0'; });
      later(200, () => {
        setArt(media, d);
        const [a, b] = lines(d.t); title.innerHTML = b ? `${a}<br>${b}` : a;
        meta.textContent = `${d.g.slice(0, 2).join(' · ')} · ${d.n} qism · ${d.dub.includes('Oʻzbekcha') ? 'Oʻzbekcha dublyaj' : 'Subtitr bilan'}`;
        dashes.forEach((x, k) => x.classList.toggle('is-on', k === hi));
        paintSave();
        [media, title, meta].forEach(e => { e.style.opacity = ''; });
      });
    };
    paintSave();
    dashes.forEach((x, k) => tap(x, () => { hold = Date.now(); setHero(k); }));
    hero.style.touchAction = 'pan-y';
    swipe(hero, { left: () => { hold = Date.now(); setHero(hi + 1); }, right: () => { hold = Date.now(); setHero(hi - 1); } }, { mark: false });
    if (!NOTIMERS) setInterval(() => { if (!document.hidden && Date.now() - hold > 9000 && scrollY < 300) setHero(hi + 1); }, 6000);
    tap(byText('.hero .btn', 'Tomosha qilish'), () => play(FEAT[hi]));
    tap(saveBtn, () => { toggleSaved(FEAT[hi]); paintSave(); });
    tap('.trailer', b => { const on = b.classList.toggle('is-muted'); b.lastChild.nodeValue = on ? 'Treyler ovozsiz' : 'Treyler ovozli'; toast(on ? 'Treyler ovozi oʻchirildi' : 'Treyler ovozi yoqildi'); });
    tap(byText('.hero .chip', 'Haftaning hiti'), () => go('08-reyting'));
    tap(byText('.hero .chip', 'Koʻrmoqda'), () => toast(`Hozir ${fmt(1240 + hi * 87)} kishi koʻrmoqda`));
    tap(hero, () => { setCur(FEAT[hi]); go('10-drama', { q: dq(FEAT[hi]) }); });

    // segment tablar: ba'zilari bo'limga o'tadi, qolganlari «Siz uchun» qatorini filtrlaydi
    const seg = { 'Reyting': '08-reyting', 'Tez kunda': '09-tez-kunda', 'Janrlar': '07-janrlar' };
    const rec = byText('.sec', 'Siz uchun tavsiya')[0], recH = rec.querySelector('h2'), recRow = rec.querySelector('.hscroll'), recOrig = recRow.innerHTML;
    const LIST = {
      Ommabop: () => C.filter(d => !d.soon).sort((a, b) => b.vn - a.vn),
      Yangi: () => C.filter(d => !d.soon && (d.isNew || d.y === 2026)).sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)),
      VIP: () => C.filter(d => d.vip).concat(C.filter(d => !d.vip && !d.soon && d.r >= 4.8)),
      Oʻzbekcha: () => C.filter(d => !d.soon && d.dub.includes('Oʻzbekcha')).sort((a, b) => (b.uz ? 1 : 0) - (a.uz ? 1 : 0) || b.vn - a.vn),
    };
    $$('.seg__item').forEach(s => {
      const name = norm(s.textContent);
      if (seg[name]) return tap(s, to(seg[name]));
      tap(s, () => {
        $$('.seg__item').forEach(x => x.classList.toggle('is-active', x === s));
        recH.textContent = name === 'Tavsiya' ? 'Siz uchun tavsiya' : `${name} dramalar`;
        recRow.innerHTML = name === 'Tavsiya' ? recOrig : LIST[name]().map(posterHTML).join('');
        recRow.scrollLeft = 0; wirePosters(recRow);
        rec.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
    const more = { 'Tarix': ['24-royxatim', '?tab=tarix'], 'Reyting': ['08-reyting', ''], 'Jadval': ['09-tez-kunda', ''] };
    $$('.pill-more').forEach(p => {
      const name = norm(p.textContent), sec = norm(p.closest('.sec').querySelector('h2').textContent);
      const [t, q] = more[name] || ['07-janrlar', sec.startsWith('Yangi') ? '?s=Yangi' : ''];
      tap(p, () => go(t, { q }));
    });

    // «Davom ettirish»: tarixdagi tugallanmagan dramalar, oxirgi ko'rilgani birinchi
    const cont = byText('.sec', 'Davom ettirish')[0].querySelector('.hscroll');
    const hist = S.hist.map(byT).filter(d => d && !S.done.includes(d.t) && !d.soon).slice(0, 6);
    cont.innerHTML = hist.map(d => `<article class="lcard" data-k="${d.k}"><div class="lcard__media art art--${d.s}" style="--amb: var(--amb-${d.a})"><span class="gbtn lcard__play"><i class="ic ic-play-fill ic--18"></i></span><span class="shade-b"></span><span class="lcard__ep">${epNow(d)} / ${d.n}-qism</span><div class="progress" style="--p: ${Math.round(epNow(d) / d.n * 100)}%"><i></i></div></div><h3 class="lcard__title">${d.t}</h3></article>`).join('');
    tap($$('.lcard', cont), el => play(byK(el.dataset.k)));
    wirePosters(screen);
    tap($$('.top10__item'), el => { const d = dramaOf(el); setCur(d); go('10-drama', { q: dq(d) }); });
    const vip = $('.card.vip');
    if (S.vip) { vip.querySelector('h3').textContent = 'VIP faol — hamma qismlar ochiq'; vip.querySelector('.btn').textContent = 'Boshqarish'; }
    tap([vip.querySelector('.btn'), vip], to('18-vip'));
    $$('.soon article.card').forEach(a => { const d = dramaOf(a); remindBtn(a.querySelector('.btn--xs'), d, 'Eslat'); tap(a, () => go('09-tez-kunda')); });
  };

  R['05-lenta'] = () => {
    const ORDER = ['bori', 'milliarder', 'shartnoma', 'direktor', 'uch', 'ajrash', 'qishloq', 'kelin', 'vampir', 'qasoskelin', 'ofis', 'sevgi'].map(byK);
    let feed = ORDER, i = 0, busy = false, paused = false, p = 34;
    const frame = $('.frame'), info = $('.info'), prog = $('.vprog'), cta = $('.cta'), hint = $('.toast'), rail = $$('.rail .gbtn'), chips = $$('.info .chip');
    const glyph = document.createElement('div'); glyph.className = 'proto-pause'; glyph.innerHTML = '<i class="ic ic-play-fill ic--32"></i>'; screen.appendChild(glyph);
    [frame, info].forEach(e => e.classList.add('proto-fade'));
    const paintRail = () => {
      const d = feed[i];
      const h = rail[0].querySelector('.ic'), on = S.liked.includes(d.t); h.classList.toggle('ic-heart-fill', on); h.classList.toggle('ic-heart', !on); h.classList.toggle('c-rose', on);
      const b = rail[1].querySelector('.ic'), sv = S.saved.includes(d.t); b.classList.toggle('ic-bookmark-fill', sv); b.classList.toggle('ic-bookmark', !sv); b.classList.toggle('c-flame', sv);
      rail[0].querySelector('.gbtn__label').textContent = d.lk; rail[1].querySelector('.gbtn__label').textContent = saves(d); rail[2].querySelector('.gbtn__label').textContent = d.cm;
    };
    const paint = () => {
      const d = feed[i];
      setArt(frame, d);
      info.querySelector('h1').textContent = d.t;
      info.querySelector('p').textContent = `1-qism / ${d.n} · ${d.d}`;
      chips[0].textContent = d.g[0]; chips[1].textContent = d.g[1] || d.st; chips[2].textContent = d.vip ? 'Faqat VIP' : `Bepul 1–${d.free}`;
      cta.innerHTML = `<i class="ic ic-play-fill"></i>Butun serialni koʻrish · ${d.n} qism`;
      paintRail();
    };
    const show = dir => {
      if (busy || !feed.length) return; busy = true; if (hint) hint.hidden = true;
      i = (i + dir + feed.length) % feed.length; p = 0; paused = false; glyph.classList.remove('is-on');
      [frame, info].forEach(e => { e.style.opacity = '0'; });
      later(220, () => { paint(); prog.style.setProperty('--p', '0%'); [frame, info].forEach(e => { e.style.opacity = '1'; }); later(260, () => { busy = false; }); });
    };
    paintRail();
    screen.style.touchAction = 'none';
    swipe(screen, { up: () => show(1), down: () => show(-1) });
    let wheelAt = 0;
    screen.addEventListener('wheel', e => { if (modal) return; const now = Date.now(); if (now - wheelAt < 700 || Math.abs(e.deltaY) < 20) return; wheelAt = now; show(e.deltaY > 0 ? 1 : -1); }, { passive: true });
    addEventListener('keydown', e => { if (e.key === 'ArrowDown') show(1); if (e.key === 'ArrowUp') show(-1); if (e.key === ' ' && document.activeElement === document.body) { e.preventDefault(); frame.click(); } });
    if (hint) tap(hint, () => { hint.hidden = true; show(1); });
    tap('[aria-label="Qidiruv"]', to('06-qidiruv'));
    tap(rail[0], () => { toggleLiked(feed[i]); paintRail(); });
    tap(rail[1], () => { toggleSaved(feed[i]); paintRail(); });
    tap(rail[2], () => { setCur(feed[i]); go('13-izohlar'); });
    tap(rail[3], () => shareSheet(feed[i].t, () => { if (S.tasks.share === 'todo') { S.tasks.share = 'ready'; save(); } }));
    tap(rail[4], () => { setCur(feed[i]); go('12-qismlar'); });
    tap(chips[0], () => go('07-janrlar', { q: '?g=' + encodeURIComponent(chips[0].textContent) }));
    tap(chips[1], () => go('07-janrlar', { q: '?g=' + encodeURIComponent(chips[1].textContent) }));
    tap(chips[2], () => { const d = feed[i]; setCur(d); d.vip && !S.vip ? go('18-vip') : go('12-qismlar'); });
    tap(info.querySelector('h1'), () => { setCur(feed[i]); go('10-drama', { q: dq(feed[i]) }); });
    tap(info.querySelector('p'), () => { setCur(feed[i]); go('10-drama', { q: dq(feed[i]) }); });
    tap(cta, () => play(feed[i]));
    tap(frame, () => { paused = !paused; glyph.classList.toggle('is-on', paused); toast(paused ? 'Pauza' : 'Davom etmoqda'); });
    $$('.top .seg__item').forEach(s => tap(s, () => {
      if (s.classList.contains('is-active')) return;
      const follow = norm(s.textContent) === 'Kuzatuvdagilar';
      const list = follow ? S.saved.map(byT).filter(d => d && !d.soon) : ORDER;
      if (!list.length) return toast('Hali hech qaysi dramani saqlamagansiz');
      $$('.top .seg__item').forEach(x => x.classList.toggle('is-active', x === s));
      feed = list; i = -1; show(1);
    }));
    if (!NOTIMERS) setInterval(() => { if (paused || modal || document.hidden) return; p += .5; prog.style.setProperty('--p', p + '%'); if (p >= 100) show(1); }, 120);
  };

  R['06-qidiruv'] = () => {
    const body = $('.body'), inp = makeInput($('.top .search'));
    const res = document.createElement('div'); res.className = 'proto-res yscroll'; res.hidden = true; body.after(res);
    const search = term => {
      const f = fold(term);
      if (!f) { res.hidden = true; body.hidden = false; return; }
      const list = C.filter(d => fold(`${d.t} ${d.g.join(' ')} ${d.dub.join(' ')} ${d.st}`).includes(f));
      body.hidden = true; res.hidden = false; res.scrollTop = 0;
      res.innerHTML = list.length ? `<p class="t-footnote c-3 proto-res__n">${list.length} ta natija</p>${list.map(rowHTML).join('')}` : empty('search', 'Hech narsa topilmadi', `«${norm(term)}» boʻyicha natija yoʻq — boshqa soʻz bilan qidiring`);
      wirePosters(res);
    };
    const recent = $('.recent'), clearBtn = byText('.head .btn--text', 'Tozalash')[0];
    const paintRecent = () => {
      recent.innerHTML = S.recent.map(t => `<span class="chip choice choice--sm">${t}<i class="ic ic-close"></i></span>`).join('');
      clearBtn.hidden = !S.recent.length;
      if (!S.recent.length) recent.innerHTML = '<p class="t-footnote c-3">Qidiruv tarixi boʻsh</p>';
      $$('.chip', recent).forEach(c => tap(c, (el, e) => {
        const t = norm(c.textContent);
        if (e.target.closest('.ic-close')) { S.recent = S.recent.filter(x => x !== t); save(); return paintRecent(); }
        inp.value = t; search(t);
      }));
    };
    const remember = t => { t = norm(t); if (!t) return; S.recent = [t].concat(S.recent.filter(x => x !== t)).slice(0, 6); save(); paintRecent(); };
    paintRecent();
    inp.addEventListener('input', () => search(inp.value));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { remember(inp.value); inp.blur(); } });
    tap(clearBtn, () => { S.recent = []; save(); paintRecent(); toast('Qidiruv tarixi tozalandi'); });
    tap(byText('.top .btn--text', 'Bekor'), () => { if (inp.value) { inp.value = ''; search(''); inp.blur(); } else back(); });
    tap($$('.top-list li'), li => {
      const term = norm(li.querySelector('.t').textContent), d = byT(term);
      if (d) { remember(term); setCur(d); return go('10-drama', { q: dq(d) }); }
      inp.value = term; search(term); remember(term);
    });
    tap($$('.genre'), g => go('07-janrlar', { q: '?g=' + encodeURIComponent(norm(g.textContent)) }));
    tap($('.head .gbtn'), to('07-janrlar'));
  };

  R['07-janrlar'] = () => {
    const rows = $$('.frow'), found = $('.found .t-mono'), list = $('.results'), filters = $('.filters');
    const chipsOf = r => $$('.chip', r);
    const pick = (r, name) => { let c = chipsOf(r).find(x => norm(x.textContent) === name); if (!c && name) { c = document.createElement('span'); c.className = 'chip choice choice--sm'; c.textContent = name; chipsOf(r)[0].after(c); } chipsOf(r).forEach(x => x.classList.toggle('chip--selected', x === c)); };
    const g = Q.get('g'), l = Q.get('l'), s = Q.get('s');
    if (g) { pick(rows[0], g); pick(rows[1], 'Hammasi'); }
    if (l) pick(rows[1], l);
    if (s) { pick(rows[3], s); if (!g) pick(rows[0], 'Hammasi'); }
    const sel = () => rows.map(r => norm((r.querySelector('.chip--selected') || chipsOf(r)[0]).textContent));
    const resHTML = d => `<div class="res" data-k="${d.k}"><article class="poster"><div class="poster__media art art--${d.s}" style="--amb: var(--amb-${d.a})">${d.vip ? '<span class="tag tag--vip"><i class="ic ic-crown"></i>VIP</span>' : ''}</div></article><div class="res__body"><h3>${d.t}</h3><p class="t-footnote c-3">${d.g.slice(0, 2).join('  •  ')}</p><p class="t-footnote c-3">${d.n} qism · ${d.st} · ${views(d)}</p>${d.vip ? '<p class="t-footnote-m c-sand">Faqat VIP</p>' : `<p class="t-footnote-m c-flame">1–${d.free} qism bepul</p>`}</div><span class="gbtn gbtn--sm gbtn--dark" role="button" aria-label="Tomosha qilish"><i class="ic ic-play-fill ic--18"></i></span></div>`;
    const render = () => {
      const [gg, ll, st, so] = sel();
      const key = { Ommabop: d => -d.vn, Yangi: d => -(d.y * 10 + (d.isNew ? 1 : 0)), Reyting: d => -d.r, 'Koʻp saqlangan': d => -d.svn }[so] || (d => -d.vn);
      const r = C.filter(d => !d.soon && (gg === 'Hammasi' || d.g.includes(gg)) && (ll === 'Hammasi' || d.dub.includes(ll)) && (st === 'Hammasi' || d.st === st)).sort((a, b) => key(a) - key(b));
      found.textContent = `${r.length} ta drama topildi`;
      list.innerHTML = r.length ? r.map(resHTML).join('') : empty('filter', 'Mos drama topilmadi', 'Filtrlardan birini «Hammasi» ga oʻzgartiring');
      list.scrollTop = 0;
      tap($$('.res .gbtn', list), b => play(byK(b.closest('.res').dataset.k)));
      wirePosters(list);
    };
    rows.forEach(r => chipsOf(r).forEach(c => tap(c, () => { if (c.classList.contains('chip--selected')) return; chipsOf(r).forEach(x => x.classList.toggle('chip--selected', x === c)); render(); })));
    tap(byText('.btn--text', 'Tozalash'), () => { rows.forEach((r, k) => pick(r, k === 3 ? 'Ommabop' : 'Hammasi')); render(); toast('Filtrlar tozalandi'); });
    const st = document.createElement('style');
    st.textContent = '.is-collapsed .filters { display: none; } .is-collapsed .found { top: 112px; } .is-collapsed .results { top: 158px; } .is-collapsed [aria-label="Filtr"] { background: var(--text-1); color: var(--cocoa); }';
    document.head.appendChild(st);
    tap('[aria-label="Filtr"]', () => { const on = screen.classList.toggle('is-collapsed'); toast(on ? 'Filtrlar yashirildi' : 'Filtrlar koʻrsatildi'); });
    filters && render();
  };

  R['08-reyting'] = () => {
    const tabs = $$('.utabs__item'), per = $$('.period .seg__item'), pod = $('.podium'), list = $('.list');
    const DESIGN = ['bori', 'ajrash', 'direktor', 'milliarder', 'kelin', 'vampir', 'qishloq'].map(byK);
    const MULT = [1, 6.4, 24];
    const rank = (t, p) => {
      if (t === 0 && p === 0) return DESIGN;
      const pool = C.filter(d => !d.soon);
      const m = [d => d.vn * (1 + (hash(d.k + p) % 45) / 100), d => d.vn * (1 + (hash(d.k + 'v' + p) % 12) / 100), d => d.svn * (1 + (hash(d.k + 's' + p) % 12) / 100), d => (d.isNew ? 4000 : 0) + d.vn * (1 + (hash(d.k + 'n' + p) % 30) / 100)][t];
      return pool.sort((a, b) => m(b) - m(a)).slice(0, 7);
    };
    const num = (d, t, p, k) => t === 0 && p === 0 ? views(d) : compact((t === 2 ? d.svn : d.vn) * MULT[p] * (1 - k * .04));
    const move = (d, t, p) => { if (d.isNew && t !== 2) return '<span class="chip chip--sand mv">YANGI</span>'; const h = hash(d.k + t + p) % 7; if (h < 3) return `<span class="chip mv up"><i class="ic ic-arrow-up"></i>${h + 1}</span>`; if (h < 5) return `<span class="chip mv down"><i class="ic ic-arrow-down"></i>${h - 2}</span>`; return '<span class="chip mv"><i class="ic ic-minus"></i></span>'; };
    const podHTML = (d, n, first, nm) => `<div class="pod${first ? ' pod--first' : ''} card--ambient" data-k="${d.k}" style="--amb: var(--amb-${d.a})${n === 3 ? '; margin-bottom: 0' : ''}"><span class="pod__n">${n}</span><div class="art art--${d.s}" style="--amb: var(--amb-${d.a})"></div><h3>${d.t}</h3><p class="t-caption ${first ? 'c-2' : 'c-3'}">${nm}</p></div>`;
    const render = () => {
      const t = tabs.findIndex(x => x.classList.contains('is-active')), p = per.findIndex(x => x.classList.contains('is-active'));
      const r = rank(t, p);
      pod.innerHTML = podHTML(r[1], 2, false, num(r[1], t, p, 1)) + podHTML(r[0], 1, true, num(r[0], t, p, 0)) + podHTML(r[2], 3, false, num(r[2], t, p, 2));
      list.innerHTML = r.slice(3).map((d, k) => `<div class="lrow" data-k="${d.k}"><span class="lrow__n">${k + 4}</span><div class="art art--${d.s}" style="--amb: var(--amb-${d.a})"></div><div class="lrow__b"><p class="t-body-m">${d.t}</p><p class="t-caption c-3">${d.g[0]} · ${num(d, t, p, k + 3)}</p></div>${move(d, t, p)}</div>`).join('');
      wirePosters(screen);
    };
    tabs.forEach(x => tap(x, () => { if (x.classList.contains('is-active')) return; tabs.forEach(y => y.classList.toggle('is-active', y === x)); x.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' }); render(); }));
    per.forEach(x => tap(x, () => { if (x.classList.contains('is-active')) return; per.forEach(y => y.classList.toggle('is-active', y === x)); render(); }));
    wirePosters(screen);
  };

  R['09-tez-kunda'] = () => {
    const dates = $$('.date'), caps = $$('.cap'), mason = $('.mason'), wide = $('.wide'), sup = $('.title sup');
    const msg = document.createElement('div'); msg.style.cssText = 'position: absolute; top: 252px; left: 0; right: 0'; msg.hidden = true; msg.innerHTML = empty('calendar', 'Bu kundan keyin premyera yoʻq', 'Boshqa sanani tanlang'); screen.appendChild(msg);
    const render = day => {
      const a = day <= 26, b = day <= 28;
      caps[0].hidden = mason.hidden = !a; caps[1].hidden = wide.hidden = !b; msg.hidden = a || b;
      caps[1].style.top = a ? '618px' : '252px'; wide.style.top = a ? '' : '278px';
      sup.textContent = `(${(a ? 2 : 0) + (b ? 1 : 0)})`;
    };
    dates.forEach(x => tap(x, () => { dates.forEach(y => y.classList.toggle('is-on', y === x)); render(+x.querySelector('b').textContent); }));
    $$('.item').forEach(it => {
      const d = dramaOf(it);
      remindBtn(it.querySelector('.btn--xs'), d, 'Eslatib qoʻy');
      tap(it.querySelector('.trailer'), () => toast(`«${d.t}» treyleri · 0:45`));
      tap(it, () => { setCur(d); go('10-drama', { q: dq(d) }); });
    });
  };

  R['10-drama'] = () => {
    const d = cur(); setCur(d);
    const acts = $$('.act'), cta = byText('.head .btn', '')[0], grid = $('.eps'), rangeBox = $('.range'), utabs = $$('.utabs__item');
    let rIdx = Math.floor((epNow(d) - 1) / 30);
    if (d.k !== 'milliarder') {
      screen.style.setProperty('--amb', `var(--amb-${d.a})`);
      setArt($('.hero__media'), d);
      const [a, b] = lines(d.t); $('.head__title').innerHTML = b ? `${a}<br>${b}` : a;
      $('.meta').innerHTML = `<span>${d.y}</span><span>·</span><span class="outline-badge">${d.age}</span><span>·</span><span>${d.n} qism</span><span>·</span><span>${d.st}</span><span>·</span><span class="outline-badge">HD</span>`;
      const ch = $$('.head .chips .chip');
      ch[0].innerHTML = d.soon ? '<i class="ic ic-calendar"></i>' + d.soon.replace('oktabr', 'okt') : `<i class="ic ic-star-fill c-sand"></i>${d.r}`;
      ch[1].innerHTML = d.soon ? `<i class="ic ic-bell"></i>${d.wait} kutadi` : `<i class="ic ic-eye"></i>${views(d)} koʻrish`;
      ch[2].textContent = d.soon ? d.dub[0] : d.dub.includes('Oʻzbekcha') ? 'Oʻzbekcha dublyaj' : `${d.dub[0]} dublyaj`;
      byText('.head p', 'Subtitr')[0].textContent = `Subtitr: ${['oʻzbek', 'rus', 'ingliz'].filter((x, k) => !d.dub.includes(['Oʻzbekcha', 'Ruscha', 'Inglizcha'][k])).join(', ') || 'oʻzbek, rus'}`;
      $('.desc p.t-body').textContent = d.d;
      byText('.desc p', '•')[0].textContent = d.g.join('  •  ');
      acts[2].querySelector('p').innerHTML = `Izohlar<br>${d.soon ? '&nbsp;' : d.cm}`;
      acts[0].querySelector('p').innerHTML = `${S.saved.includes(d.t) ? 'Saqlangan' : 'Saqlash'}<br>${saves(d)}`;
      const pl = $('.price__line p');
      pl.innerHTML = d.vip ? 'Bu drama faqat VIP aʼzolar uchun · VIP bilan hamma qismlar ochiq' : d.soon ? `Premyera: ${d.soon} · birinchi ${d.free} qism bepul` : `1–${d.free} qism bepul · keyingi har bir qism <b class="c-flame" style="font-weight: 600">60 coin</b> · VIP bilan hammasi ochiq`;
      $('.head__title').closest('.head') && (utabs[0].textContent = `Qismlar (${d.n})`);
      const simRow = byText('.sec', 'Sizga yoqishi mumkin')[0].querySelector('.hscroll');
      simRow.innerHTML = similar(d).map(x => `<article class="poster" data-k="${x.k}"><div class="poster__media art art--${x.s}" style="--amb: var(--amb-${x.a})"><span class="poster__name">${x.t}</span></div><h3 class="poster__title">${x.t}</h3></article>`).join('');
    }
    // holatga bog'liq qismlar (har doim)
    const paintActs = () => {
      const sv = S.saved.includes(d.t), g0 = acts[0].querySelector('.gbtn');
      acts[0].classList.toggle('is-on', sv); g0.classList.toggle('gbtn--flame', sv); g0.classList.toggle('gbtn--dark', !sv);
      const i0 = g0.querySelector('.ic'); i0.classList.toggle('ic-bookmark-fill', sv); i0.classList.toggle('ic-bookmark', !sv);
      acts[0].querySelector('p').innerHTML = `${sv ? 'Saqlangan' : 'Saqlash'}<br>${saves(d)}`;
      const fl = d.soon ? S.remind.includes(d.t) : S.follow.includes(d.t);
      acts[1].classList.toggle('is-on', fl); acts[1].querySelector('p').innerHTML = `${fl ? 'Eslatiladi' : 'Eslatma'}<br>&nbsp;`;
      const dl = S.dl.includes(d.t);
      acts[3].querySelector('p').innerHTML = S.vip ? `${dl ? 'Yuklangan' : 'Yuklash'}<br>&nbsp;` : 'Yuklash<br><span class="c-sand">VIP</span>';
      cta.innerHTML = d.soon ? (S.remind.includes(d.t) ? '<i class="ic ic-check"></i>Premyerada eslatiladi' : '<i class="ic ic-bell"></i>Premyerada eslatish') : `<i class="ic ic-play-fill"></i>${started(d) ? `Davom ettirish · ${epNow(d)}-qism` : 'Boshlash · 1-qism'}`;
      const fb = byText('.price .btn', 'Butun serial')[0] || $('.price .btn');
      if (S.vip || S.full.includes(d.t) || d.vip || d.soon) { fb.innerHTML = S.vip || S.full.includes(d.t) ? '<i class="ic ic-check"></i>Butun serial ochiq' : d.vip ? '<i class="ic ic-crown"></i>VIP bilan ochish' : `Premyera: ${d.soon}`; fb.classList.toggle('is-disabled', !d.vip || S.vip); }
      else fb.innerHTML = `Butun serialni ochish: <span class="strike c-3" style="font-weight: 500">${fmt((d.n - d.free) * PRICE)}</span> ${fmt(fullPrice(d))} coin`;
    };
    const paintGrid = () => {
      const rs = ranges(d); rIdx = Math.min(rIdx, rs.length - 1);
      rangeBox.querySelectorAll('.chip').forEach(c => c.remove());
      const note = rangeBox.querySelector('.t-caption');
      rs.forEach(([a, b], k) => { const c = document.createElement('span'); c.className = 'chip choice choice--sm' + (k === rIdx ? ' chip--selected' : ''); c.textContent = `${a}–${b}`; rangeBox.insertBefore(c, note); tap(c, () => { rIdx = k; paintGrid(); }); });
      const [a, b] = rs[rIdx]; let h = ''; for (let n = a; n <= b; n++) h += epHTML(d, n, 10);
      grid.innerHTML = h;
      tap($$('.ep', grid), e => { const n = +e.dataset.n; tryOpen(d, n, () => { S.ep[d.t] = n; touch(d); go('11-pleer'); }); });
    };
    paintActs(); paintGrid();
    tap(cta, () => { if (d.soon) { toggleIn(S.remind, d.t); save(); paintActs(); return toast(S.remind.includes(d.t) ? `Premyerada eslatamiz · ${d.soon}` : 'Eslatma oʻchirildi'); } play(d); });
    tap(acts[0], () => { toggleSaved(d); paintActs(); });
    tap(acts[1], () => { const arr = d.soon ? S.remind : S.follow; const on = toggleIn(arr, d.t); save(); paintActs(); toast(on ? (d.soon ? `Premyerada eslatamiz · ${d.soon}` : 'Yangi qism chiqqanda eslatamiz') : 'Eslatma oʻchirildi'); });
    tap(acts[2], () => go('13-izohlar'));
    tap(acts[3], () => { if (!S.vip) { toast('Yuklab olish — VIP imkoniyati'); return later(500, () => go('18-vip')); } const on = toggleIn(S.dl, d.t); save(); paintActs(); toast(on ? 'Yuklab olinmoqda · Yuklanganlar boʻlimida' : 'Yuklanganlardan oʻchirildi'); });
    tap('[aria-label="Ulashish"]', () => shareSheet(d.t, () => { if (S.tasks.share === 'todo') { S.tasks.share = 'ready'; save(); } }));
    tap('[aria-label="Yana"]', () => sheet({ title: d.t, items: [
      { icon: 'eye-off', label: 'Qiziq emas', fn: () => { toast('Bunday dramalar kamroq koʻrsatiladi'); later(700, () => back()); } },
      { icon: 'flag', label: 'Shikoyat qilish', fn: () => reportSheet(d.t) },
      { icon: 'link', label: 'Havolani nusxalash', fn: () => toast('Havola nusxalandi') },
    ] }));
    const ch = $$('.head .chips .chip');
    tap(ch[0], () => d.soon ? toast(`Premyera: ${d.soon}`) : starsSheet('Dramani baholang', S.rate[d.t] || 0, k => { S.rate[d.t] = k; save(); toast(`Bahoingiz: ${k} / 5 · rahmat!`); }));
    tap(ch[1], () => toast(d.soon ? `${d.wait} kishi premyerani kutmoqda` : `${views(d)} marta koʻrilgan · ${saves(d)} saqlangan`));
    tap(ch[2], () => sheet({ title: 'Ovoz va subtitr', items: d.dub.map(x => ({ label: `${x} dublyaj`, on: S.dub === x, fn: () => { S.dub = x; save(); toast(`Ovoz: ${x}`); } })).concat([{ label: 'Original ovoz', on: S.dub === 'Original', fn: () => { S.dub = 'Original'; save(); toast('Ovoz: original'); } }]) }));
    const desc = $('.desc p.t-body'), more = $('.desc .more');
    tap(more, () => { const open = desc.style.webkitLineClamp === 'unset'; desc.style.webkitLineClamp = open ? '' : 'unset'; desc.style.overflow = open ? '' : 'visible'; more.innerHTML = open ? 'Koʻproq<i class="ic ic-chev-down ic--16"></i>' : 'Yopish<i class="ic ic-chev-up ic--16"></i>'; });
    const fb = $('.price .btn');
    tap(fb, () => {
      if (S.vip || S.full.includes(d.t)) return toast('Barcha qismlar ochiq');
      if (d.soon) return toast(`Premyera: ${d.soon}`);
      if (d.vip) return go('18-vip');
      const price = fullPrice(d);
      if (total() < price) { toast(`Coin yetarli emas: kerak ${fmt(price)}, sizda ${fmt(total())}`); return later(700, () => go('17-coin-dokoni')); }
      ask({ title: 'Butun serialni ochish', text: `${d.t} — ${d.n} qism. Balansdan ${fmt(price)} coin yechiladi.`, ok: `${fmt(price)} coin bilan ochish` }, () => { spend(price); S.full.push(d.t); addTx('Butun serial ochildi', d.t, -price); toast('Butun serial ochildi'); paintActs(); paintGrid(); });
    });
    // tablar: Qismlar / O'xshash / Tafsilotlar
    const sec = utabs[0].closest('.sec'), parts = [$('.range'), $('.eps-wrap')];
    const simP = document.createElement('div'); simP.className = 'eps-wrap'; simP.hidden = true;
    simP.innerHTML = `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-12)">${similar(d, 6).map(x => `<article class="poster" data-k="${x.k}" style="--pw: 100%"><div class="poster__media art art--${x.s}" style="--amb: var(--amb-${x.a})"></div><h3 class="poster__title">${x.t}</h3></article>`).join('')}</div>`;
    const detP = document.createElement('div'); detP.className = 'eps-wrap'; detP.hidden = true;
    detP.innerHTML = `<div class="card" style="padding: 0">${[['Yil', d.y], ['Janr', d.g.join(', ')], ['Qismlar', `${d.n} · har biri 1–2 daqiqa`], ['Holati', d.st], ['Dublyaj', d.dub.join(', ')], ['Yosh chegarasi', d.age], ['Bepul qismlar', d.vip ? 'Faqat VIP' : `1–${d.free}`]].map(([k, v]) => `<div class="row"><span class="row__label c-2">${k}</span><span class="row__value" style="color: var(--text-1)">${v}</span></div>`).join('')}</div>`;
    sec.append(simP, detP);
    utabs.forEach((u, k) => tap(u, () => { utabs.forEach(x => x.classList.toggle('is-active', x === u)); parts.forEach(p => { p.hidden = k !== 0; }); simP.hidden = k !== 1; detP.hidden = k !== 2; }));
    wirePosters(screen);
  };

  R['11-pleer'] = () => {
    const d = cur(); setCur(d);
    let n = epNow(d); S.ep[d.t] = n; touch(d);
    const title = $('.topbar__title b'), epCap = $('.topbar__title .t-caption'), next = byText('.chip', 'Keyingi')[0], pills = $$('.pills .chip'), sub = $('.subtitle');
    const prog = $('.scrub .progress'), knob = $('.scrub__knob'), time = $('.timerow > .t-caption'), playBtn = $('.play'), frame = $('.frame');
    const LINES = ['— Sen kim ekanimni hali bilmaysan.', '— Bu shartnoma faqat bir yilga.', '— Endi hammasi boshqacha boʻladi.'];
    const SPEEDS = ['0.75x', '1.0x', '1.25x', '1.5x', '2.0x'];
    let p = n === 10 && d.k === 'milliarder' ? 36 : 0, playing = false, timer;
    const len = 118;
    const paintMeta = () => {
      title.textContent = d.t; epCap.textContent = `${n}-qism / ${d.n}`; setArt(frame, d);
      next.innerHTML = n < d.n ? `Keyingi: ${n + 1}-qism<i class="ic ic-chev-right"></i>` : 'Yakunlash<i class="ic ic-chev-right"></i>';
      pills[0].innerHTML = `<i class="ic ic-list"></i>Qismlar ${n}/${d.n}`;
      pills[1].textContent = S.speed;
      pills[2].innerHTML = `<i class="ic ic-cc"></i>CC ${{ Oʻzbekcha: 'uz', Ruscha: 'ru', Inglizcha: 'en', Oʻchiq: 'oʻchiq' }[S.sub] || 'uz'}`;
      pills[3].textContent = S.quality === 'Avto' ? '720p' : S.quality;
      const h = $$('.rail .gbtn')[0].querySelector('.ic'), on = S.liked.includes(d.t); h.classList.toggle('ic-heart-fill', on); h.classList.toggle('ic-heart', !on); h.classList.toggle('c-rose', on);
      const b = $$('.rail .gbtn')[1].querySelector('.ic'), sv = S.saved.includes(d.t); b.classList.toggle('ic-bookmark-fill', sv); b.classList.toggle('ic-bookmark', !sv); b.classList.toggle('c-flame', sv);
      $$('.rail .gbtn__label')[0].textContent = d.lk; $$('.rail .gbtn__label')[1].textContent = saves(d);
    };
    const render = () => {
      prog.style.setProperty('--p', p + '%'); knob.style.left = `calc(${p}% - 9px)`;
      const s = Math.round(len * p / 100); time.innerHTML = `${Math.floor(s / 60)}:${pad(s % 60)} <span class="c-3">/ 1:58</span>`;
      sub.hidden = S.sub === 'Oʻchiq'; if (!sub.hidden) sub.textContent = LINES[Math.min(2, Math.floor(p / 40))];
    };
    const setPlay = on => {
      playing = on; clearInterval(timer);
      if (on && !NOTIMERS) timer = setInterval(() => { p = Math.min(100, p + 100 / len * parseFloat(S.speed)); render(); if (p >= 100) ended(); }, 1000);
      const i = playBtn.querySelector('.ic'); i.classList.toggle('ic-pause-fill', on); i.classList.toggle('ic-play-fill', !on); playBtn.setAttribute('aria-label', on ? 'Pauza' : 'Ijro');
    };
    const goEp = k => { n = k; S.ep[d.t] = n; save(); p = 0; paintMeta(); render(); toast(`${n}-qism`); setPlay(true); };
    const nextEp = () => { if (n >= d.n) { S.done = [d.t].concat(S.done.filter(t => t !== d.t)); save(); return go('15-serial-tugadi', { replace: true }); } setPlay(false); tryOpen(d, n + 1, () => goEp(n + 1)); };
    const prevEp = () => { if (n > 1) goEp(n - 1); else toast('Bu birinchi qism'); };
    function ended() { setPlay(false); if (S.autoplay || n >= d.n) later(600, nextEp); else toast('Qism tugadi · keyingisi uchun yuqoriga suring'); }
    paintMeta(); render(); setPlay(!NOTIMERS);
    tap(playBtn, () => setPlay(!playing));
    tap(frame, () => setPlay(!playing));
    tap('[aria-label="5 soniya orqaga"]', () => { p = Math.max(0, p - 500 / len); render(); });
    tap('[aria-label="5 soniya oldinga"]', () => { p = Math.min(99, p + 500 / len); render(); });
    const scrub = $('.scrub');
    const seek = e => { const r = scrub.getBoundingClientRect(); p = Math.max(0, Math.min(99.5, (e.clientX - r.left) / r.width * 100)); render(); };
    scrub.addEventListener('pointerdown', e => { scrub.setPointerCapture(e.pointerId); seek(e); scrub._on = true; });
    scrub.addEventListener('pointermove', e => { if (scrub._on) seek(e); });
    scrub.addEventListener('pointerup', () => { scrub._on = false; });
    scrub.setAttribute('role', 'slider'); scrub.setAttribute('aria-label', 'Vaqt'); scrub.tabIndex = 0;
    scrub.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { p = Math.min(99, p + 2); render(); } if (e.key === 'ArrowLeft') { p = Math.max(0, p - 2); render(); } });
    screen.style.touchAction = 'none';
    swipe(frame, { up: nextEp, down: prevEp });
    let wheelAt = 0;
    screen.addEventListener('wheel', e => { if (modal) return; const now = Date.now(); if (now - wheelAt < 800 || Math.abs(e.deltaY) < 30) return; wheelAt = now; e.deltaY > 0 ? nextEp() : prevEp(); }, { passive: true });
    addEventListener('keydown', e => {
      if (document.activeElement && document.activeElement !== document.body) return;
      if (e.key === ' ') { e.preventDefault(); setPlay(!playing); }
      if (e.key === 'ArrowRight') { p = Math.min(99, p + 500 / len); render(); }
      if (e.key === 'ArrowLeft') { p = Math.max(0, p - 500 / len); render(); }
      if (e.key === 'ArrowUp') prevEp();
      if (e.key === 'ArrowDown') nextEp();
    });
    tap(next, nextEp);
    const rail = $$('.rail .gbtn');
    tap(rail[0], () => { toggleLiked(d); paintMeta(); });
    tap(rail[1], () => { toggleSaved(d); paintMeta(); });
    tap(rail[2], () => go('13-izohlar'));
    tap(rail[3], () => shareSheet(`${d.t} · ${n}-qism`, () => { if (S.tasks.share === 'todo') { S.tasks.share = 'ready'; save(); } }));
    tap(pills[0], () => go('12-qismlar'));
    tap(pills[1], () => { S.speed = SPEEDS[(SPEEDS.indexOf(S.speed) + 1) % SPEEDS.length]; save(); paintMeta(); toast(`Tezlik: ${S.speed}`); setPlay(playing); });
    tap(pills[2], () => go('14-pleer-sozlamalari'));
    tap(pills[3], () => go('14-pleer-sozlamalari'));
    tap('[aria-label="Yana"]', () => go('14-pleer-sozlamalari'));
  };

  R['12-qismlar'] = () => {
    const d = cur(), grid = $('.eps5'), tabs = $$('.utabs__item'), auto = $('.auto .toggle');
    let rIdx = Math.floor((epNow(d) - 1) / 30);
    setArt($('.mini .art'), d); setArt($('.player-bg .art'), d);
    $('.mini h2').textContent = d.t;
    $('.mini p').textContent = d.soon ? `Premyera: ${d.soon}` : `${d.n} qism · ${d.st}${started(d) ? ` · ${epNow(d)}-qismda` : ''}`;
    auto.classList.toggle('is-on', S.auto);
    tap([auto, $('.auto')], () => { S.auto = !S.auto; save(); auto.classList.toggle('is-on', S.auto); toast(S.auto ? 'Avto-ochish yoqildi · har qism 60 coin' : 'Avto-ochish oʻchirildi'); });
    const rs = ranges(d);
    const paint = () => {
      tabs.forEach((t, k) => { t.hidden = k >= rs.length; if (rs[k]) t.textContent = `${rs[k][0]}–${rs[k][1]}`; t.classList.toggle('is-active', k === rIdx); });
      const [a, b] = rs[rIdx]; let h = ''; for (let k = a; k <= b; k++) h += epHTML(d, k, 12);
      grid.innerHTML = h;
      tap($$('.ep', grid), e => { const k = +e.dataset.n; tryOpen(d, k, () => { S.ep[d.t] = k; touch(d); popTo('11-pleer', '11-pleer'); }); });
      const fb = $('.bar .btn--glass');
      if (S.vip || S.full.includes(d.t) || d.vip || d.soon) fb.hidden = true; else fb.textContent = `Hammasini ochish · ${fmt(fullPrice(d))} coin`;
      $('.bar .btn--primary').innerHTML = S.vip ? '<i class="ic ic-crown"></i>VIP faol' : '<i class="ic ic-crown"></i>VIP';
    };
    tabs.forEach((t, k) => tap(t, () => { rIdx = k; paint(); }));
    paint();
    tap($('.bar .btn--glass'), () => {
      const price = fullPrice(d);
      if (total() < price) { toast(`Coin yetarli emas: kerak ${fmt(price)}`); return later(700, () => go('17-coin-dokoni')); }
      ask({ title: 'Hammasini ochish', text: `${d.t} — barcha ${d.n} qism. ${fmt(price)} coin yechiladi.`, ok: `${fmt(price)} coin bilan ochish` }, () => { spend(price); S.full.push(d.t); addTx('Butun serial ochildi', d.t, -price); toast('Barcha qismlar ochildi'); paint(); });
    });
    tap($('.bar .btn--primary'), to('18-vip'));
    tap($('.scrim'), () => back());
    swipeDown($('.sheet'), () => back());
  };

  R['13-izohlar'] = () => {
    const d = cur(), list = $('.cmts'), inp = makeInput($('.compose .search'), 'send'), spoil = $('.compose .check');
    setArt($('.player-bg .art'), d);
    $('.head h2').textContent = `Izohlar · ${d.cm}`;
    const AGE = { 'hozir': 0, '2 soat oldin': 2, '5 soat oldin': 5, 'kecha': 24 };
    $$('.cmt', list).forEach((c, k) => { c.dataset.ep = k < 2 ? '10' : k === 3 ? '1' : '0'; });
    const cmtHTML = (txt, sp, who = 'Siz', when = 'hozir') => `<div class="cmt" data-ep="${epNow(d)}" data-mine="1"><div class="art art--portrait" style="--amb: var(--amb-08)"></div><div class="cmt__b"><p class="cmt__who">${who} <span>· ${when}</span></p>${sp ? `<div class="spoiler card--glass"><span class="blurtext t-footnote">${txt}</span><i class="ic ic-eye-off ic--18" style="position: relative; z-index: 1"></i><span>Spoyler — koʻrish uchun bosing</span></div>` : `<p class="cmt__txt t-body">${txt}</p>`}<div class="cmt__act"><span class="row-flex gap-4"><i class="ic ic-heart"></i>0</span><span>Javob berish</span><span>Oʻchirish</span></div></div></div>`;
    const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    S.comments.filter(c => c.d === d.t).forEach(c => list.insertAdjacentHTML('afterbegin', cmtHTML(c.t, c.sp)));
    const wire = () => {
      $$('.cmt__act > span:first-child', list).forEach(l => tap(l, () => {
        const i = l.querySelector('.ic'), on = i.classList.contains('ic-heart'), num = l.lastChild;
        i.classList.toggle('ic-heart', !on); i.classList.toggle('ic-heart-fill', on); l.classList.toggle('c-rose', on);
        if (num && num.nodeType === 3 && /^\d+$/.test(num.nodeValue.trim())) num.nodeValue = +num.nodeValue + (on ? 1 : -1);
      }));
      $$('.cmt__act > span:not(:first-child)', list).forEach(l => tap(l, () => {
        const c = l.closest('.cmt'), who = norm(c.querySelector('.cmt__who').firstChild.nodeValue), act = norm(l.textContent);
        if (act === 'Shikoyat') return reportSheet(`${who} izohi`);
        if (act === 'Oʻchirish') return ask({ title: 'Izohni oʻchirish', text: 'Izohingiz butunlay oʻchiriladi.', ok: 'Oʻchirish', danger: true }, () => { const txt = norm(c.querySelector('.cmt__txt, .blurtext').textContent); S.comments = S.comments.filter(x => !(x.d === d.t && x.t === txt)); save(); c.remove(); toast('Izoh oʻchirildi'); });
        inp.value = `@${who} `; inp.focus();
      }));
      $$('.spoiler', list).forEach(sp => tap(sp, () => { const b = sp.querySelector('.blurtext'); if (!b) return; b.style.filter = 'none'; b.style.position = 'static'; b.style.padding = '0'; [...sp.children].forEach(c => { if (c !== b) c.remove(); }); }));
      $$('.cmt__more', list).forEach(m => tap(m, () => {
        const box = m.parentElement, open = box.querySelector('.proto-reply');
        if (open) { $$('.proto-reply', box).forEach(r => r.remove()); m.textContent = m.dataset.label; return; }
        m.dataset.label = m.textContent;
        m.insertAdjacentHTML('beforebegin', ['Rostdan ham, men ham yigʻlab yubordim', 'Keyingi qism ertaga chiqarkan!'].map(t => `<div class="proto-reply"><p class="cmt__who">Muxlis <span>· 1 soat oldin</span></p><p class="cmt__txt t-footnote">${t}</p></div>`).join(''));
        m.textContent = '— Javoblarni yashirish';
      }));
    };
    wire();
    const send = () => {
      const t = inp.value.trim(); if (!t) { inp.focus(); return toast('Avval izoh yozing'); }
      const sp = spoil.classList.contains('is-on');
      S.comments.push({ d: d.t, t: esc(t), sp }); if (S.tasks.comment !== 'done') S.tasks.comment = 'ready'; save();
      list.insertAdjacentHTML('afterbegin', cmtHTML(esc(t), sp)); wire(); list.scrollTop = 0;
      inp.value = ''; spoil.classList.remove('is-on'); inp.blur(); toast('Izohingiz joylandi');
    };
    tap('[aria-label="Yuborish"]', send);
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
    tap($('.compose label'), () => spoil.classList.toggle('is-on'));
    const sortChips = $$('.sort .chip');
    sortChips.forEach(c => tap(c, () => {
      if (c.classList.contains('chip--selected')) return;
      sortChips.forEach(x => x.classList.toggle('chip--selected', x === c));
      const mode = norm(c.textContent), all = $$('.cmt', list);
      const likes = el => { const v = norm(el.querySelector('.cmt__act > span').textContent); return parseFloat(v) * (v.includes('K') ? 1000 : 1); };
      const age = el => AGE[norm(el.querySelector('.cmt__who span').textContent).replace('· ', '')] ?? 24;
      all.forEach(el => { el.hidden = mode === 'Shu qism' && el.dataset.ep !== String(epNow(d)) && !el.dataset.mine; });
      all.sort((a, b) => mode === 'Yangi' ? age(a) - age(b) : likes(b) - likes(a)).forEach(el => list.appendChild(el));
      list.scrollTop = 0;
    }));
    tap($('.scrim'), () => back());
    swipeDown($('.sheet'), () => back());
  };

  R['14-pleer-sozlamalari'] = () => {
    const SP = ['0.75x', '1.0x', '1.25x', '1.5x', '2.0x'], POS = [5, 20, 45, 70, 95];
    const gs = $('.gslider'), ticks = $$('.ticks > *'), label = gs.querySelector('.t-body-m');
    setArt($('.player-bg .art'), cur());
    const paintSpeed = () => { const i = Math.max(0, SP.indexOf(S.speed)); gs.style.setProperty('--v', POS[i] + '%'); label.textContent = S.speed; ticks.forEach((t, k) => { const b = document.createElement(k === i ? 'b' : 'span'); b.textContent = SP[k]; t.replaceWith(b); ticks[k] = b; tap(b, () => setSpeed(k)); }); };
    const setSpeed = i => { S.speed = SP[i]; save(); paintSpeed(); toast(`Tezlik: ${S.speed}`); };
    if (S.speed !== '1.0x') paintSpeed(); else ticks.forEach((t, k) => tap(t, () => setSpeed(k)));
    const fromX = x => { const r = gs.getBoundingClientRect(), f = (x - r.left) / r.width * 100; return POS.reduce((best, v, k) => Math.abs(v - f) < Math.abs(POS[best] - f) ? k : best, 0); };
    gs.addEventListener('pointerdown', e => { gs.setPointerCapture(e.pointerId); gs._on = true; gs.style.setProperty('--v', Math.max(0, Math.min(100, (e.clientX - gs.getBoundingClientRect().left) / gs.offsetWidth * 100)) + '%'); });
    gs.addEventListener('pointermove', e => { if (gs._on) gs.style.setProperty('--v', Math.max(0, Math.min(100, (e.clientX - gs.getBoundingClientRect().left) / gs.offsetWidth * 100)) + '%'); });
    gs.addEventListener('pointerup', e => { gs._on = false; setSpeed(fromX(e.clientX)); });
    gs.setAttribute('role', 'slider'); gs.setAttribute('aria-label', 'Tezlik'); gs.tabIndex = 0;
    gs.addEventListener('keydown', e => { const i = SP.indexOf(S.speed); if (e.key === 'ArrowRight' && i < 4) setSpeed(i + 1); if (e.key === 'ArrowLeft' && i > 0) setSpeed(i - 1); });
    // guruhlar: sifat / ovoz / subtitr
    const grp = name => byText('.grp', name)[0];
    const bind = (g, key, map = x => x) => {
      const chips = $$('.chip', g);
      const mark = () => chips.forEach(c => { const on = map(norm(c.textContent)) === S[key]; c.classList.toggle('chip--selected', on); const ic = c.querySelector('.ic-check'); if (on && !ic) c.insertAdjacentHTML('afterbegin', '<i class="ic ic-check"></i>'); if (!on && ic) ic.remove(); });
      mark();
      chips.forEach(c => tap(c, () => {
        const v = map(norm(c.textContent));
        if (key === 'quality' && v === '1080p' && !S.vip) { toast('1080p — VIP imkoniyati'); return later(500, () => go('18-vip')); }
        if (S[key] === v) return;
        S[key] = v; save(); mark(); toast({ quality: 'Sifat', dub: 'Ovoz', sub: 'Subtitr' }[key] + ': ' + v);
      }));
    };
    bind(grp('Sifat'), 'quality', v => v.replace('VIP', '').trim());
    bind(grp('Ovoz'), 'dub');
    bind(grp('Subtitr'), 'sub');
    const auto = byText('.row', 'avtomatik')[0];
    auto.querySelector('.toggle').classList.toggle('is-on', S.autoplay);
    tap([auto.querySelector('.toggle'), auto], () => { S.autoplay = !S.autoplay; save(); auto.querySelector('.toggle').classList.toggle('is-on', S.autoplay); toast(S.autoplay ? 'Avto-ijro yoqildi' : 'Avto-ijro oʻchirildi'); });
    const sleep = byText('.row', 'Uyqu')[0], SL = ['Oʻchiq', '15 daqiqa', '30 daqiqa', '1 soat', 'Qism oxirida'];
    sleep.querySelector('.row__value').textContent = S.sleep;
    tap(sleep, () => sheet({ title: 'Uyqu taymeri', items: SL.map(v => ({ label: v, on: S.sleep === v, fn: () => { S.sleep = v; save(); sleep.querySelector('.row__value').textContent = v; toast(v === 'Oʻchiq' ? 'Uyqu taymeri oʻchirildi' : `Pleer ${v.toLowerCase()} keyin toʻxtaydi`); } })) }));
    tap(byText('.row', 'yuklab olish')[0], () => { if (!S.vip) { toast('Yuklab olish — VIP imkoniyati'); return later(500, () => go('18-vip')); } const d = cur(); if (!S.dl.includes(d.t)) S.dl.unshift(d.t); save(); toast('Qism yuklab olinmoqda · Yuklanganlar'); });
    tap(byText('.row', 'Muammo')[0], () => sheet({ title: 'Muammo haqida xabar', items: ['Video qotib qolyapti', 'Ovoz chiqmayapti', 'Subtitr notoʻgʻri', 'Boshqa muammo'].map(label => ({ label, fn: () => toast('Xabaringiz yuborildi · rahmat') })) }));
    tap($('.scrim'), () => back());
    swipeDown($('.sheet'), () => back());
  };

  R['15-serial-tugadi'] = () => {
    const d = cur(); setCur(d);
    if (!S.done.includes(d.t)) { S.done.unshift(d.t); save(); }
    setArt($('.player-bg .art'), d);
    byText('.modal p', 'qism')[0].textContent = `${d.t} · ${d.n} / ${d.n} qism`;
    const stars = $$('.stars .ic');
    const paintStars = k => stars.forEach((s, j) => { s.classList.toggle('ic-star-fill', j < k); s.classList.toggle('ic-star', j >= k); });
    if (S.rate[d.t]) paintStars(S.rate[d.t]);
    stars.forEach((s, j) => { s.setAttribute('aria-label', `${j + 1} yulduz`); tap(s, () => { S.rate[d.t] = j + 1; save(); paintStars(j + 1); toast(`Bahoingiz: ${j + 1} / 5 · rahmat!`); }); });
    const sim = d.k === 'milliarder' ? ['shartnoma', 'ofis', 'taqdir'].map(byK) : similar(d);
    if (d.k !== 'milliarder') $('.sim__row').innerHTML = sim.map((x, k) => `<article class="poster" data-k="${x.k}"><div class="poster__media art art--${x.s}" style="--amb: var(--amb-${x.a})">${k === 0 ? '<span class="cd-ring" style="--p: 100%">5</span>' : ''}</div><h3 class="poster__title">${x.t}</h3></article>`).join('');
    let left = 5, stop = false;
    const cap = byText('.next p', 'Keyingi drama')[0], ring = $('.cd-ring');
    tap('[aria-label="Yopish"]', to(HOME, { reset: true }));
    tap(byText('.btn', 'Ulashish'), () => shareSheet(d.t, () => { if (!S.rewarded.includes('share:' + d.t)) { S.rewarded.push('share:' + d.t); earn(20, 'Ulashish mukofoti', d.t); toast('+20 bonus coin · ulashganingiz uchun'); } }));
    const s2 = byText('.btn', '2-fasl')[0];
    const paintS2 = () => { const on = S.season.includes(d.t); s2.innerHTML = on ? '<i class="ic ic-check"></i>Eslatiladi' : '<i class="ic ic-bell"></i>2-fasl: eslat'; };
    paintS2();
    tap(s2, () => { const on = toggleIn(S.season, d.t); save(); paintS2(); toast(on ? '2-fasl chiqqanda eslatamiz' : 'Eslatma oʻchirildi'); });
    tap(byText('.btn--text', 'Bekor qilish'), b => { stop = true; b.hidden = true; if (cap) cap.textContent = 'Avtomatik oʻtish bekor qilindi'; if (ring) ring.hidden = true; });
    wirePosters(screen);
    if (!NOTIMERS) { const t = setInterval(() => { if (stop) return clearInterval(t); if (modal) return; left--; if (cap) cap.textContent = `Keyingi drama ${left} soniyada boshlanadi...`; if (ring) { ring.textContent = left; ring.style.setProperty('--p', left * 20 + '%'); } if (left <= 0) { clearInterval(t); setCur(sim[0]); go('10-drama', { q: dq(sim[0]), replace: true }); } }, 1000); }
  };

  R['16-paywall'] = () => {
    const d = cur(), e = +Q.get('e') || Math.min(d.n, epNow(d) + 1);
    if (isOpen(d, e)) { toast(`${e}-qism ochiq`); S.ep[d.t] = e; save(); return later(400, () => popTo('11-pleer', '11-pleer')); }
    setArt($('.player-bg .art'), d);
    $('.lock p').textContent = `${d.t} · ${e}-qism`;
    $('.sheet h2').textContent = `${e}-qism qulflangan`;
    const bal = $('.bal'), hint = bal.nextElementSibling, packs = $('.packs');
    bal.firstElementChild.innerHTML = `<i class="coin coin--sm"></i>Balans: ${fmt(total())} coin`;
    const enough = total() >= PRICE;
    if (enough) {
      hint.textContent = 'Balans yetarli — bir bosishda oching:';
      packs.outerHTML = `<button class="btn btn--primary btn--block proto-unlock" style="margin-top: var(--s-12)"><i class="ic ic-unlock"></i>${e}-qismni ochish · ${PRICE} coin</button>`;
      tap($('.proto-unlock'), () => { spend(PRICE); unlock(d, e); addTx(`${e}-qism ochildi`, d.t, -PRICE); S.ep[d.t] = e; save(); toast(`${e}-qism ochildi · −${PRICE} coin`); later(500, () => popTo('11-pleer', '11-pleer')); });
    } else {
      hint.textContent = `${PRICE - total()} coin yetmaydi — tez toʻldirish:`;
      tap($$('.pack'), pk => {
        $$('.pack').forEach(x => x.classList.toggle('pack--popular', x === pk));
        const amt = +norm(pk.querySelector('.pack__amt').textContent).replace(/\D/g, ''), bonus = +norm(pk.querySelector('.pack__bonus').textContent).replace(/\D/g, '');
        S.pending = { kind: 'coins', amt, bonus, first: !S.bought, then: { d: d.k, e } }; save();
        later(200, () => go('19-tolov'));
      });
    }
    const adCap = $('.ad .t-caption');
    adCap.textContent = S.ads > 0 ? `Bugun ${S.ads} / 5 ta qoldi · ~30 soniya` : 'Bugungi limit tugadi · ertaga yangilanadi';
    tap(byText('.ad .btn', 'Koʻrish'), () => { if (S.ads <= 0) return toast('Bugungi reklama limiti tugadi'); S.pending = { kind: 'ad', then: { d: d.k, e } }; save(); go('21-reklama', { q: '?for=ep' }); });
    tap([$('.card.vip .btn'), $('.card.vip')], () => { S.pending = { kind: 'vip', then: { d: d.k, e } }; save(); go('18-vip'); });
    const chk = $('.auto .check');
    chk.classList.toggle('is-on', S.auto);
    tap([chk, $('.auto')], () => { S.auto = !S.auto; save(); chk.classList.toggle('is-on', S.auto); toast(S.auto ? 'Keyingi qismlar avtomatik ochiladi' : 'Avto-ochish oʻchirildi'); });
    tap(byText('a', 'shartlari'), () => sheet({ title: 'Toʻlov shartlari', text: 'Ochilgan qism doimiy sizniki. Avval bonus coin, keyin pullik coin sarflanadi. Bonus coin 7 kun amal qiladi. Ishlatilmagan pullik coin 14 kun ichida qaytariladi.', cancel: 'Yopish' }));
    tap($$('.scrim, .lock'), () => back());
    swipeDown($('.sheet'), () => back());
  };

  R['17-coin-dokoni'] = () => {
    $('.bal .t-num').textContent = `${fmt(total())} coin`;
    byText('.bal p', 'Pullik')[0].textContent = `Pullik: ${fmt(S.paid)} · Bonus: ${fmt(S.bonus)} · 1 qism = ${PRICE} coin`;
    const first = $('.first');
    if (S.bought) first.hidden = true;
    tap(byText('.btn--text', 'Tarix'), to('28-hamyon'));
    tap($$('.pack'), pk => {
      const amt = +norm(pk.querySelector('.pack__amt').textContent).replace(/\D/g, ''), bonus = +norm(pk.querySelector('.pack__bonus').textContent).replace(/\D/g, '') || 0;
      S.pending = Object.assign({ kind: 'coins', amt, bonus, first: !S.bought }, S.pending && S.pending.then ? { then: S.pending.then } : {}); save();
      go('19-tolov');
    });
    tap(first, () => { S.pending = { kind: 'coins', amt: 1200, bonus: 240, first: true }; save(); go('19-tolov'); });
    tap('.vipb', to('18-vip'));
    tap(byText('a', 'Xaridlarni'), () => toast(S.bought ? 'Xaridlar tiklandi' : 'Tiklanadigan xarid topilmadi'));
    tap(byText('a', 'shartlari'), () => sheet({ title: 'Toʻlov shartlari', text: 'Coinlar faqat ilova ichida ishlatiladi. Bonus coin 7 kun amal qiladi. Ishlatilmagan pullik coin 14 kun ichida qaytariladi.', cancel: 'Yopish' }));
    tap(byText('a', 'Yordam'), to('30-yordam'));
    const pay = $$('.pay__chips .chip');
    const mark = () => pay.forEach(c => c.classList.toggle('chip--selected', norm(c.textContent).startsWith(S.method.split(' ')[0])));
    mark();
    pay.forEach(c => tap(c, () => { S.method = { 'Uzum': 'Uzum Bank', 'UzCard / Humo': 'Bank kartasi', 'Visa / MC': 'Bank kartasi' }[norm(c.textContent)] || norm(c.textContent); save(); mark(); toast(`Toʻlov usuli: ${norm(c.textContent)}`); }));
    if (!NOTIMERS) { const boxes = $$('.first .cd__box'); let t = 23 * 3600 + 59 * 60 + 12; setInterval(() => { t = Math.max(0, t - 1); [Math.floor(t / 3600), Math.floor(t / 60) % 60, t % 60].forEach((v, i) => { boxes[i].textContent = pad(v); }); }, 1000); }
  };

  R['18-vip'] = () => {
    const cta = $('.cta'), per = { Haftalik: 'hafta', Oylik: 'oy', Yillik: 'yil' };
    tap(byText('.btn--text', 'Xaridlarni'), () => toast(S.vip ? 'VIP obuna tiklandi' : 'Faol obuna topilmadi'));
    if (S.vip) {
      $('.hero p').textContent = 'VIP faol · keyingi toʻlov: 25-noyabr';
      $('.plans').hidden = true;
      cta.textContent = 'Obunani bekor qilish';
      tap(cta, () => ask({ title: 'Obunani bekor qilasizmi?', text: 'VIP joriy davr oxirigacha (25-noyabr) amal qiladi, keyin yangilanmaydi.', ok: 'Bekor qilish', danger: true }, () => { S.vip = false; save(); addTx('VIP obuna bekor qilindi', 'Joriy davr oxirigacha amal qiladi', 0); toast('Obuna bekor qilindi'); later(600, () => location.reload()); }));
    } else {
      const plans = $$('.plan');
      const pickPlan = row => { plans.forEach(r => { r.classList.toggle('is-on', r === row); r.classList.toggle('card--glass', r !== row); r.querySelector('.radio').classList.toggle('is-on', r === row); }); const n = norm(row.querySelector('.plan__b p').textContent); cta.textContent = `VIP olish · [narx] soʻm / ${per[n] || 'oy'}`; cta.dataset.plan = n; };
      tap(plans, pickPlan);
      tap(cta, () => { S.pending = Object.assign({ kind: 'vip', plan: cta.dataset.plan || 'Oylik' }, S.pending && S.pending.then ? { then: S.pending.then } : {}); save(); go('19-tolov'); });
    }
    tap(byText('a', 'Shartlar'), () => sheet({ title: 'Obuna shartlari', text: 'Obuna tanlangan davr uchun avtomatik yangilanadi. Profil → Obunani boshqarish orqali istalgan vaqtda bekor qilasiz; joriy davr oxirigacha amal qiladi.', cancel: 'Yopish' }));
    tap(byText('a', 'Maxfiylik'), () => sheet({ title: 'Maxfiylik siyosati', text: 'Toʻlov maʼlumotlari faqat toʻlov provayderida saqlanadi.', cancel: 'Yopish' }));
  };

  R['19-tolov'] = () => {
    const P = S.pending || { kind: 'coins', amt: 1200, bonus: 240, first: !S.bought };
    const order = $('.order'), btn = $('.pay'), methods = $$('.m');
    const [t1, t2] = $$('.order > div:nth-of-type(1) p');
    if (P.kind === 'vip') {
      order.querySelector('.coin').outerHTML = '<i class="ic ic-crown ic--28 crown"></i>';
      t1.textContent = `VIP · ${P.plan}`; t2.textContent = { Haftalik: '1-hafta −40%, keyin toʻliq narx', Oylik: 'har oy avto-yangilanadi', Yillik: 'oyiga eng arzon' }[P.plan] || 'har oy avto-yangilanadi'; t2.className = 't-caption c-sand';
    } else if (P.kind === 'offer') { t1.textContent = '1 200 coin + 800 bonus'; t2.textContent = 'Maxsus taklif · −60%'; }
    else { t1.textContent = `${fmt(P.amt)} coin${P.bonus ? ` + ${fmt(P.bonus)} bonus` : ''}`; t2.textContent = P.first ? 'Birinchi xarid chegirmasi −50%' : 'Bonus coin 7 kun amal qiladi'; t2.className = P.first ? 't-caption c-flame' : 't-caption c-3'; if (!P.first) $('.order__p .strike').hidden = true; }
    const pick = row => { methods.forEach(r => { r.classList.toggle('is-on', r === row); r.querySelector('.radio').classList.toggle('is-on', r === row); }); const n = norm(row.querySelector('.m__b p').textContent); btn.textContent = `${n} orqali toʻlash`; S.method = n; save(); };
    pick(methods.find(r => norm(r.querySelector('.m__b p').textContent) === S.method) || methods[0]);
    tap(methods, pick);
    const promo = makeInput($('.promo .field'), 'done');
    let disc = false;
    const apply = () => {
      const v = promo.value.trim().toUpperCase();
      if (!v) { promo.focus(); return toast('Promokodni kiriting'); }
      if (/^DRAMA(10)?$/.test(v)) { disc = true; promo.disabled = true; $('.promo .btn').textContent = 'Qoʻllandi'; toast('Promokod qoʻllandi · −10%'); }
      else toast('Promokod topilmadi yoki muddati oʻtgan');
    };
    tap(byText('.promo .btn', 'Qoʻllash'), apply);
    promo.addEventListener('keydown', e => { if (e.key === 'Enter') apply(); });
    tap(byText('a', 'Oferta'), () => sheet({ title: 'Ommaviy oferta', text: 'Toʻlov tasdiqlangach coin yoki obuna darhol hisobingizga qoʻshiladi. Qaytarish shartlari — Yordam markazida.', cancel: 'Yopish' }));
    tap(btn, () => {
      if (btn.classList.contains('is-disabled')) return;
      btn.classList.add('is-disabled'); btn.textContent = 'Toʻlanmoqda…';
      later(900, () => {
        const then = P.then && byK(P.then.d);
        if (P.kind === 'vip') { S.vip = true; addTx(`VIP obuna · ${P.plan}`, `${S.method} · [narx] soʻm`, 0); toast(`VIP faollashdi${disc ? ' · −10% promokod' : ''}`); }
        else { const amt = P.kind === 'offer' ? 1200 : P.amt, bonus = P.kind === 'offer' ? 800 : P.bonus; S.paid += amt; S.bonus += bonus; S.bought = true; addTx(`Coin xaridi · ${S.method}`, `${fmt(amt)} + ${fmt(bonus)} bonus · [narx] soʻm`, amt + bonus); toast(`Toʻlov tasdiqlandi · +${fmt(amt + bonus)} coin`); }
        S.pending = null; save();
        later(900, () => {
          if (then) { const e = P.then.e; if (!isOpen(then, e) && spend(PRICE)) { unlock(then, e); addTx(`${e}-qism ochildi`, then.t, -PRICE); } if (isOpen(then, e)) { S.cur = then.t; S.ep[then.t] = e; save(); } return popTo('11-pleer', '11-pleer'); }
          if (P.kind === 'vip') return popPast('18-vip');
          stack.map(base).includes('17-coin-dokoni') ? popTo('17-coin-dokoni') : back();
        });
      });
    });
  };

  R['20-maxsus-taklif'] = () => {
    tap(byText('.btn', 'Taklifni olish'), () => { S.pending = { kind: 'offer' }; save(); go('19-tolov'); });
    tap(byText('.btn--text', 'Yoʻq'), () => back());
    tap('.scrim', () => back());
    if (!NOTIMERS) { const boxes = $$('.cd__box'); let t = 2 * 3600 + 14 * 60 + 37; setInterval(() => { t = Math.max(0, t - 1); [Math.floor(t / 3600), Math.floor(t / 60) % 60, t % 60].forEach((v, i) => { boxes[i].textContent = pad(v); }); }, 1000); }
  };

  R['21-reklama'] = () => {
    const forCoin = Q.get('for') === 'coin', P = S.pending && S.pending.kind === 'ad' ? S.pending : null;
    const then = P && P.then ? byK(P.then.d) : cur(), e = P && P.then ? P.then.e : Math.min(then.n, epNow(then) + 1);
    const chip = byText('.chip', 'soniyadan')[0], ring = $('.cd-ring'), bar = $('.reward .progress'), reward = $('.reward .t-body-m span');
    reward.innerHTML = forCoin ? 'Oxirigacha koʻring — <span class="c-peach">+10 bonus coin</span>' : `Oxirigacha koʻring — <span class="c-peach">${e}-qism bepul ochiladi</span>`;
    byText('.reward p', 'limit')[0].textContent = forCoin ? `Bugun: ${10 - S.coinAds} / 10 reklama` : `Bugungi limit: ${5 - S.ads} / 5 reklama`;
    let left = 15, done = false;
    const finish = () => {
      if (done) return; done = true;
      if (forCoin) { S.coinAds = Math.max(0, S.coinAds - 1); earn(10, 'Reklama mukofoti'); toast('+10 bonus coin'); later(1000, () => back()); }
      else { S.ads = Math.max(0, S.ads - 1); unlock(then, e); S.cur = then.t; S.ep[then.t] = e; S.pending = null; addTx(`${e}-qism ochildi`, `${then.t} · reklama`, 0); toast(`${e}-qism bepul ochildi`); later(1100, () => popTo('11-pleer', '11-pleer')); }
    };
    const wait = () => done ? back() : toast(`Reklama ${left} soniyadan soʻng yopiladi`);
    tap(chip, wait); tap(ring, wait);
    tap(byText('.btn', 'Batafsil'), () => toast('Reklama beruvchi sahifasi brauzerda ochiladi'));
    tap($('.frame'), () => toast('Reklama beruvchi sahifasi brauzerda ochiladi'));
    tap('.adv', () => toast('Reklama beruvchi sahifasi brauzerda ochiladi'));
    if (NOTIMERS) return;
    const t = setInterval(() => {
      left--;
      chip.textContent = left > 0 ? `${left} soniyadan soʻng yopiladi` : 'Yopish';
      ring.textContent = Math.max(0, left); ring.style.setProperty('--p', (15 - left) / 15 * 100 + '%');
      bar.style.setProperty('--p', 34 + (15 - left) / 15 * 66 + '%');
      if (left <= 0) { clearInterval(t); finish(); }
    }, 1000);
  };

  R['22-mukofotlar'] = () => {
    const paintCoins = () => {
      const chip = $('.top .chip'); chip.childNodes.forEach(n => { if (n.nodeType === 3 && /\d/.test(n.nodeValue)) n.nodeValue = fmt(total()); });
      $('.bonus .t-num').textContent = `${fmt(S.bonus)} coin`;
    };
    paintCoins();
    tap(byText('.btn--text', 'Qoidalar'), () => sheet({ title: 'Mukofot qoidalari', text: 'Har kuni kirib bonus coin oling: 7 kun ketma-ket kirsangiz — +50 coin va 1 kun VIP. Bonus coin 7 kun amal qiladi va birinchi navbatda sarflanadi. Vazifalar har kuni 00:00 da yangilanadi.', cancel: 'Tushunarli' }));
    tap($('.top .chip'), to('28-hamyon'));
    tap([byText('.bonus .btn', 'Tarix')[0], $('.bonus')], to('28-hamyon'));
    const claim = $('.ci .btn--primary'), days = $$('.day'), today = days[2];
    const paintClaim = () => {
      if (!S.checkin) return;
      claim.classList.add('is-disabled'); claim.textContent = 'Ertaga +15 coin';
      today.classList.add('box--dim'); today.style.boxShadow = 'none'; today.style.setProperty('--box', 'var(--bg-3)');
      const tag = today.querySelector('.today-tag'); tag && tag.remove();
      const f = today.querySelector('.box__front'); f.textContent = '3-kun'; f.removeAttribute('style');
      today.querySelector('.done') || today.insertAdjacentHTML('beforeend', '<span class="done"><i class="ic ic-check"></i></span>');
      const k = $('.rslider'); k && k.style.setProperty('--v', '52%'); const kn = $('.rslider__knob'); kn && (kn.textContent = '4');
      $('.ci__head .t-caption').textContent = 'ketma-ket 3-kun · olindi';
    };
    const doClaim = () => {
      if (S.checkin) return toast('Bugungi mukofot olingan · ertaga +15 coin');
      S.checkin = true; earn(15, 'Kunlik check-in · 3-kun'); paintClaim(); paintCoins(); toast('+15 coin olindi · ketma-ket 3-kun');
    };
    paintClaim();
    tap(claim, doClaim);
    const DAY = [[1, 10, 'olingan'], [2, 10, 'olingan'], [3, 15, ''], [4, 15, 'ertaga'], [5, 20, '2 kundan keyin'], [6, 20, '3 kundan keyin'], [7, 50, '4 kundan keyin · +1 kun VIP']];
    days.forEach((x, k) => tap(x, () => { if (k === 2) return doClaim(); const [n, v, w] = DAY[k]; toast(`${n}-kun: +${v} coin · ${w}`); }));
    tap(byText('section.card .btn', 'Koʻrish'), () => { if (S.coinAds <= 0) return toast('Bugungi limit tugadi'); go('21-reklama', { q: '?for=coin' }); });
    const adCard = byText('section.card', 'Reklama koʻrib')[0];
    if (adCard) { adCard.querySelector('.t-caption').textContent = `har biri +10 coin · bugun ${10 - S.coinAds} / 10`; adCard.querySelector('.progress').style.setProperty('--p', (10 - S.coinAds) * 10 + '%'); }
    // vazifalar: todo → (bajarish) → ready → (olish) → done
    const T = [
      ['3 ta qism', 'watch3', 15, () => go('05-lenta')],
      ['10 daqiqa', 'watch10', 20, () => go('05-lenta')],
      ['doʻstga ulashing', 'share', 20, () => shareSheet('Doʻstingizga drama ulashing', () => { S.tasks.share = 'ready'; save(); paintTasks(); })],
      ['Izoh qoldiring', 'comment', 5, () => go('13-izohlar')],
      ['Bildirishnomalarni', 'notif', 30, () => ask({ title: 'Bildirishnomalarni yoqish', text: 'Yangi qismlar, eslatmalar va mukofotlar haqida xabar beramiz.', ok: 'Yoqish' }, () => { S.notif = true; S.tasks.notif = 'ready'; save(); paintTasks(); toast('Bildirishnomalar yoqildi'); })],
      ['Telegram', 'tg', 30, () => { toast('Telegram kanal ochildi'); S.tasks.tg = 'ready'; save(); later(400, paintTasks); }],
      ['Telefon raqamni', 'phone', 50, () => inputSheet({ title: 'Telefon raqamni bogʻlash', text: 'Kod SMS orqali yuboriladi', ph: '+998 90 123 45 67', ok: 'Bogʻlash', type: 'tel' }, v => { S.phone = v; S.tasks.phone = 'ready'; save(); paintTasks(); toast('Raqam bogʻlandi'); })],
      ['baholang', 'rate', 50, () => starsSheet('Ilovani baholang', 0, k => { S.tasks.rate = 'ready'; save(); paintTasks(); toast(`Rahmat! Bahoingiz: ${k} / 5`); })],
    ];
    if (S.notif && S.tasks.notif === 'todo') S.tasks.notif = 'ready';
    const rowOf = key => $$('.task').find(r => norm(r.textContent).includes(T.find(x => x[1] === key)[0]));
    function paintTasks() {
      T.forEach(([, key]) => {
        const row = rowOf(key), b = row && row.querySelector('.btn'); if (!b) return;
        const st = S.tasks[key];
        b.className = 'btn btn--xs ' + (st === 'done' ? 'btn--got' : st === 'ready' ? 'btn--primary' : 'btn--glass');
        b.innerHTML = st === 'done' ? '<i class="ic ic-check ic--16"></i>Olindi' : st === 'ready' ? 'Olish' : 'Bajarish';
      });
    }
    paintTasks();
    T.forEach(([, key, val, run]) => {
      const row = rowOf(key), b = row && row.querySelector('.btn'); if (!b) return;
      const act = () => {
        const st = S.tasks[key];
        if (st === 'done') return toast('Bu mukofot allaqachon olingan');
        if (st === 'ready') { S.tasks[key] = 'done'; earn(val, 'Vazifa mukofoti', norm(row.querySelector('.task__b p').textContent)); paintTasks(); paintCoins(); return toast(`+${val} coin olindi`); }
        run();
      };
      tap(b, act); tap(row, act);
    });
    tap([$('.invite .btn'), $('.invite')], to('23-dost-taklif'));
  };

  R['23-dost-taklif'] = () => {
    const copy = () => { try { navigator.clipboard.writeText('AZ7K29').catch(() => {}); } catch (e) { /* — */ } const b = byText('.code .btn', '')[0]; b.innerHTML = '<i class="ic ic-check"></i>Nusxalandi'; toast('Taklif kodi nusxalandi: AZ7K29'); later(2500, () => { b.innerHTML = '<i class="ic ic-copy"></i>Nusxa olish'; }); };
    tap($('.code .btn'), copy);
    tap($('.code'), copy);
    $$('.share > div').forEach(x => tap(x, () => { const n = norm(x.textContent); if (n === 'Boshqa') return shareSheet('Taklif havolasi: drama.uz/i/AZ7K29'); toast(`${n} orqali taklif yuborildi`); }));
    tap(byText('.pill-more', 'Roʻyxat'), () => sheet({ title: 'Taklif qilinganlar', text: 'Har biri uchun ikkalangizga +200 coin', cancel: 'Yopish', items: [['Madina', '+200 · 3 kun oldin'], ['Jasur', '+200 · 1 hafta oldin'], ['Dilnoza', '+200 · 2 hafta oldin']].map(([label, value]) => ({ icon: 'user', label, value })) }));
    tap($('.stats'), () => byText('.pill-more', 'Roʻyxat')[0].click());
    tap($('.pair .gbtn'), () => shareSheet('Doʻstingizni taklif qiling: drama.uz/i/AZ7K29'));
  };

  R['24-royxatim'] = () => {
    const tabs = $$('.utabs__item'), grid = $('.grid'), editBtn = byText('.top .btn--text', 'Tahrirlash')[0];
    let tab = Q.get('tab') === 'tarix' ? 1 : 0, edit = false;
    const counts = () => { tabs[0].textContent = `Saqlangan · ${S.saved.length}`; tabs[2].textContent = `Eslatmalar · ${S.remind.length}`; };
    const cardHTML = (d, meta, p, tag = '') => `<article class="poster" data-k="${d.k}"><div class="poster__media art art--${d.s}" style="--amb: var(--amb-${d.a})">${tag}${edit ? '<span class="proto-x" role="button" aria-label="Oʻchirish"><i class="ic ic-close"></i></span>' : ''}</div>${p == null ? '' : `<div class="progress" style="--p: ${p}%"><i></i></div>`}<h3 class="poster__title">${d.t}</h3><p class="poster__meta">${meta}</p></article>`;
    const metaOf = d => S.done.includes(d.t) ? '<i class="ic ic-check"></i>Tugatilgan' : started(d) ? (d.st === 'Davom etmoqda' && epNow(d) > 20 ? 'Davom etmoqda' : `${epNow(d)} / ${d.n}-qism`) : 'Boshlanmagan';
    const pct = d => S.done.includes(d.t) ? 100 : started(d) ? Math.round(epNow(d) / d.n * 100) : 0;
    const NEWTAG = { 'Milliarderning yashirin kelini': '+3 yangi qism', 'Shartnoma boʻyicha xotin': 'Yangi qism' };
    const render = () => {
      counts(); tabs.forEach((t, k) => t.classList.toggle('is-active', k === tab));
      let list = [];
      if (tab === 0) list = S.saved.map(byT).filter(Boolean).map(d => cardHTML(d, metaOf(d), pct(d), NEWTAG[d.t] ? `<span class="tag tag--new3">${NEWTAG[d.t]}</span>` : ''));
      if (tab === 1) list = S.hist.map(byT).filter(Boolean).map(d => cardHTML(d, metaOf(d), pct(d)));
      if (tab === 2) list = S.remind.map(byT).filter(Boolean).map(d => cardHTML(d, `Premyera: ${d.soon || 'tez kunda'}`, null, '<span class="tag tag--new">Tez kunda</span>'));
      grid.innerHTML = list.join('') || `<div style="grid-column: 1 / -1">${empty(tab === 2 ? 'bell' : tab === 1 ? 'clock' : 'bookmark', ['Saqlangan dramalar yoʻq', 'Tarix boʻsh', 'Eslatmalar yoʻq'][tab], ['Drama sahifasida «Saqlash» ni bosing', 'Koʻrgan dramalaringiz shu yerda chiqadi', 'Tez kunda boʻlimidan premyerani belgilang'][tab])}</div>`;
      editBtn.hidden = tab === 1 && !S.hist.length;
      tap($$('.proto-x', grid), x => {
        const d = byK(x.closest('.poster').dataset.k);
        if (tab === 0) toggleIn(S.saved, d.t); else if (tab === 1) S.hist = S.hist.filter(t => t !== d.t); else toggleIn(S.remind, d.t);
        save(); render(); toast('Roʻyxatdan olib tashlandi');
      });
      tap($$('.poster', grid), el => { if (edit) return; const d = byK(el.dataset.k); setCur(d); S.done.includes(d.t) ? go('15-serial-tugadi') : go('10-drama', { q: dq(d) }); });
    };
    tabs.forEach((t, k) => tap(t, () => { if (k === 3) return go('25-yuklanganlar'); tab = k; edit = false; editBtn.textContent = 'Tahrirlash'; render(); }));
    tap(editBtn, () => { edit = !edit; editBtn.textContent = edit ? 'Tayyor' : 'Tahrirlash'; render(); if (edit) toast('Oʻchirish uchun ✕ ni bosing'); });
    render();
    wirePosters($('.rec'));
    fitScreen();
  };

  R['25-yuklanganlar'] = () => {
    const vip = $('.vip'), editBtn = byText('.btn--text', 'Tahrirlash')[0], leg = $$('.bar__leg span')[0], bar = $('.bar i');
    if (!S.vip) { vip.innerHTML = '<i class="ic ic-crown ic--20"></i><span class="t-footnote-m" style="flex: 1">Oflayn koʻrish — VIP imkoniyati</span><i class="ic ic-chev-right ic--18"></i>'; tap(vip, to('18-vip')); }
    else tap(vip, () => toast('VIP faol · oflayn koʻrish yoqilgan'));
    const rows = () => $$('.dl');
    const paintStore = () => { const mb = rows().reduce((s, r) => s + (parseInt(norm(r.textContent).match(/(\d+) MB/) || [0, 0])[1], 10), 0); leg.lastChild.nodeValue = `Ilova: ${(0.7 + mb / 1000).toFixed(1)} GB`; bar.style.width = Math.max(1, Math.round(2 * (0.7 + mb / 1000) / 1.2)) + '%'; if (!rows().length) $('.list').innerHTML = empty('download', 'Yuklab olingan qismlar yoʻq', 'Drama sahifasida «Yuklash» ni bosing'); };
    // ro'yxat holatdan: o'chirilganlar chiqmaydi, keyin yuklanganlar (10 / 14-ekran) qo'shiladi
    rows().forEach(r => { const d = dramaOf(r); if (d && !S.dl.includes(d.t)) r.remove(); });
    S.dl.filter(t => !rows().some(r => dramaOf(r) === byT(t))).reverse().forEach(t => {
      const d = byT(t); if (!d) return;
      $('.list').insertAdjacentHTML('afterbegin', `<div class="dl card--glass" style="background: var(--glass-bg)"><div class="art art--${d.s}" style="--amb: var(--amb-${d.a})"></div><div class="dl__b"><p class="t-body-m">${d.t}</p><p class="t-caption c-3" style="margin-top: 2px">1 qism · 30 MB</p><p class="t-caption c-2" style="margin-top: var(--s-6); display: flex; gap: 4px; align-items: center"><i class="ic ic-check ic--16 c-flame"></i>Yuklangan</p></div><button class="gbtn gbtn--sm gbtn--dark" aria-label="Oʻchirish"><i class="ic ic-close ic--18"></i></button></div>`);
    });
    paintStore();
    const del = r => { const d = dramaOf(r); S.dl = S.dl.filter(t => t !== d.t); save(); r.remove(); paintStore(); toast('Yuklab olingan qism oʻchirildi'); };
    tap($$('[aria-label="Oʻchirish"], [aria-label="Bekor qilish"]'), b => del(b.closest('.dl')));
    tap($$('[aria-label="Pauza"]'), b => { const i = b.querySelector('.ic'), paused = i.classList.contains('ic-pause-fill'); i.classList.toggle('ic-pause-fill', !paused); i.classList.toggle('ic-play-fill', paused); b.setAttribute('aria-label', paused ? 'Davom ettirish' : 'Pauza'); const st = b.closest('.dl').querySelector('.c-flame, .c-3:last-child'); if (st) st.textContent = paused ? 'Toʻxtatildi · 45%' : 'Yuklanmoqda · 45%'; toast(paused ? 'Yuklash toʻxtatildi' : 'Yuklash davom etmoqda'); });
    tap(editBtn, () => {
      const on = editBtn.textContent.trim() === 'Tahrirlash'; editBtn.textContent = on ? 'Tayyor' : 'Tahrirlash';
      rows().forEach(r => { let x = r.querySelector('.proto-del'); if (on && !x && !r.querySelector('[aria-label="Oʻchirish"]')) { r.insertAdjacentHTML('beforeend', '<button class="gbtn gbtn--sm gbtn--dark proto-del" aria-label="Oʻchirish"><i class="ic ic-trash ic--18"></i></button>'); tap(r.querySelector('.proto-del'), () => del(r)); } else if (!on && x) x.remove(); });
    });
    tap(rows(), r => { const d = dramaOf(r); if (!S.vip) { toast('Oflayn koʻrish uchun VIP kerak'); return later(500, () => go('18-vip')); } if (/Navbatda|Yuklanmoqda|Toʻxtatildi/.test(r.textContent)) return toast('Yuklash tugagach koʻrish mumkin'); setCur(d); go('11-pleer'); });
    const q = byText('.row', 'Yuklash sifati')[0], QS = ['480p', '720p', '1080p'];
    q.querySelector('.row__value').textContent = S.dlq;
    tap(q, () => sheet({ title: 'Yuklash sifati', items: QS.map(v => ({ label: v, value: { '480p': '≈ 20 MB / qism', '720p': '≈ 30 MB / qism', '1080p': '≈ 55 MB / qism · VIP' }[v], on: S.dlq === v, fn: () => { S.dlq = v; save(); q.querySelector('.row__value').textContent = v; toast(`Yuklash sifati: ${v}`); } })) }));
  };

  R['26-bildirishnomalar'] = () => {
    const nts = $$('.nt'), feed = $('.feed');
    const TYPE = [['qirolining', 'Yangi qismlar'], ['Taqdir', 'Yangi qismlar'], ['Check-in', 'Tizim'], ['izohingizga', 'Javoblar'], ['Faqat bugun', 'Takliflar'], ['VIP', 'Takliflar']];
    const GO = [['qirolining', () => { const d = byK('bori'); setCur(d); go('10-drama', { q: dq(d) }); }], ['Taqdir', to('09-tez-kunda')], ['Check-in', to('22-mukofotlar')], ['izohingizga', () => { setCur(byK('milliarder')); go('13-izohlar'); }], ['Faqat bugun', to('20-maxsus-taklif')], ['VIP', to('18-vip')]];
    nts.forEach(n => { const t = TYPE.find(([k]) => n.textContent.includes(k)); n.dataset.type = t ? t[1] : 'Tizim'; });
    const markRead = n => { n.classList.remove('unread'); const dt = n.querySelector('.dot'); dt && dt.remove(); };
    if (S.read) nts.forEach(markRead);
    const perm = $('.perm');
    if (S.notif) perm.remove();
    tap(byText('.btn--text', 'Hammasi oʻqildi'), () => { nts.forEach(markRead); S.read = true; save(); toast('Hammasi oʻqildi'); });
    tap(byText('.perm .btn', 'Yoqish'), b => { S.notif = true; if (S.tasks.notif !== 'done') { S.tasks.notif = 'done'; earn(30, 'Bildirishnomalar yoqildi'); } save(); b.closest('.perm').remove(); toast('Bildirishnomalar yoqildi · +30 coin'); });
    nts.forEach(n => { const g = GO.find(([k]) => n.textContent.includes(k)); if (g) tap(n, () => { markRead(n); g[1](); }); });
    const msg = document.createElement('div'); msg.hidden = true; msg.innerHTML = empty('bell', 'Bu turdagi bildirishnoma yoʻq'); feed.appendChild(msg);
    $$('.filters .chip').forEach(c => tap(c, () => {
      if (c.classList.contains('chip--selected')) return;
      $$('.filters .chip').forEach(x => x.classList.toggle('chip--selected', x === c));
      const f = norm(c.textContent); let any = false;
      nts.forEach(n => { n.hidden = f !== 'Hammasi' && n.dataset.type !== f; any = any || !n.hidden; });
      $$('.grp', feed).forEach(g => { let el = g.nextElementSibling, vis = false; while (el && !el.classList.contains('grp')) { if (el.classList.contains('nt') && !el.hidden) vis = true; el = el.nextElementSibling; } g.hidden = !vis; });
      msg.hidden = any; feed.scrollTop = 0;
    }));
  };

  R['27-profil'] = () => {
    const nums = $$('.wallet .num'); nums[0].textContent = fmt(S.paid); nums[1].textContent = fmt(S.bonus);
    $('.name').textContent = S.name;
    const vipChip = byText('.chip', 'VIP')[0], vipCard = $('.card.vip');
    if (S.vip) { vipChip.innerHTML = '<i class="ic ic-crown"></i>VIP aʼzo'; vipCard.querySelector('.t-body-m').textContent = 'VIP faol'; vipCard.querySelector('.t-caption').textContent = 'Keyingi toʻlov: 25-noyabr · reklamasiz'; vipCard.querySelector('.btn').textContent = 'Boshqarish'; }
    const autoBadge = byText('.menu .row', 'Avto-ochish')[0].querySelector('.badge-sm');
    if (!S.auto) { autoBadge.textContent = 'Oʻchiq'; autoBadge.style.background = 'var(--bg-3)'; autoBadge.style.color = 'var(--text-2)'; }
    byText('.menu .row', 'Til va')[0].querySelector('.row__value').textContent = S.dub;
    tap('[aria-label="Sozlamalar"]', to('29-sozlamalar'));
    tap(byText('.chip', 'doʻst'), to('23-dost-taklif'));
    tap(vipChip, to('18-vip'));
    tap(byText('.chip', 'Telegram'), () => sheet({ title: 'Ulangan hisoblar', cancel: 'Yopish', items: [{ icon: 'send', label: 'Telegram', value: 'ulangan', on: true }, { icon: 'phone', label: 'Telefon raqam', value: S.phone || 'ulanmagan', fn: () => go('29-sozlamalar') }] }));
    tap(byText('.btn', 'Profilni tahrirlash'), () => inputSheet({ title: 'Profilni tahrirlash', text: 'Ismingiz boshqa foydalanuvchilarga izohlarda koʻrinadi', ph: 'Ism', value: S.name }, v => { S.name = v; save(); $('.name').textContent = v; toast('Profil saqlandi'); }));
    tap($('.head .box'), () => sheet({ title: 'Profil rasmi', items: [{ icon: 'video', label: 'Rasmga olish', fn: () => toast('Kamera ochiladi') }, { icon: 'grid', label: 'Galereyadan tanlash', fn: () => toast('Galereya ochiladi') }] }));
    tap('.dot-btn', () => sheet({ title: S.name, items: [{ icon: 'share', label: 'Profil havolasini ulashish', fn: () => shareSheet(`${S.name} · ID 10482733`) }, { icon: 'copy', label: 'ID ni nusxalash', fn: () => $('.id').click() }, { icon: 'logout', label: 'Chiqish', danger: true, fn: () => go('29-sozlamalar') }] }));
    tap($('.id'), () => { try { navigator.clipboard.writeText('10482733').catch(() => {}); } catch (e) { /* — */ } toast('ID nusxalandi: 10482733'); });
    tap(byText('.wallet .btn', 'Toʻldirish'), to('17-coin-dokoni'));
    tap('.wallet', to('28-hamyon'));
    tap([vipCard.querySelector('.btn'), vipCard], to('18-vip'));
    const quick = { 'Tarix': ['24-royxatim', '?tab=tarix'], 'Saqlangan': ['24-royxatim', ''], 'Yuklangan': ['25-yuklanganlar', ''], 'Mukofot': ['22-mukofotlar', ''] };
    $$('.quick .card').forEach(c => { const [t, q] = quick[norm(c.textContent)] || ['24-royxatim', '']; tap(c, () => go(t, { q })); });
    tap(byText('.pill-more', 'Hammasi'), to('24-royxatim'));
    wirePosters($('.fav'));
    const rows = [['Hamyon', to('28-hamyon')], ['Obunani', to('18-vip')], ['Avto-ochish', to('29-sozlamalar')], ['Doʻstni', to('23-dost-taklif')], ['Til va', to('29-sozlamalar')], ['Bildirishnomalar', to('26-bildirishnomalar')], ['Yordam', to('30-yordam')], ['Fikr', () => starsSheet('Ilovani baholang', 0, k => toast(`Rahmat! Bahoingiz: ${k} / 5`))], ['Shartlar', () => sheet({ title: 'Shartlar va maxfiylik', text: 'Foydalanish shartlari, toʻlov va obuna qoidalari, maxfiylik siyosati — huquqiy boʻlim tomonidan beriladi.', cancel: 'Yopish' })], ['Sozlamalar', to('29-sozlamalar')]];
    $$('.menu .row').forEach(r => { const m = rows.find(([k]) => r.textContent.includes(k)); if (m) tap(r, m[1]); });
  };

  R['28-hamyon'] = () => {
    const nums = $$('.bal .num'); nums[0].lastChild.nodeValue = fmt(S.paid); nums[1].lastChild.nodeValue = fmt(S.bonus);
    tap(byText('.btn', 'Coin toʻldirish'), to('17-coin-dokoni'));
    tap(byText('a', 'Qaytarish'), to('30-yordam'));
    tap($$('.bal'), b => toast(b.classList.contains('card--warm') ? 'Bonus coin 7 kun amal qiladi · avval shu sarflanadi' : 'Pullik coin muddatsiz'));
    const tx = $('.tx');
    if (S.tx.length) {
      const today = tx.querySelector('.grp');
      today.insertAdjacentHTML('afterend', S.tx.map(t => `<div class="t" data-new="1"><span class="t__ic${t.v > 0 ? ' plus' : ''}"><i class="ic ic-${t.v > 0 ? 'plus' : t.v < 0 ? 'minus' : 'check'} ic--18"></i></span><div class="t__b"><p class="t-body-m">${t.title}</p><p class="t-caption c-3">${t.sub} · hozir</p></div><span class="t__v${t.v > 0 ? ' plus' : ''}">${t.v > 0 ? '+' + fmt(t.v) : t.v < 0 ? '−' + fmt(-t.v) : '—'}</span></div>`).join(''));
    }
    const kind = r => { const s = norm(r.textContent), v = norm(r.querySelector('.t__v').textContent); return /xarid|VIP obuna/i.test(s) ? 'Toʻldirish' : v.startsWith('−') ? 'Sarflangan' : v.startsWith('+') ? 'Mukofotlar' : 'Boshqa'; };
    const rows = $$('.t', tx); rows.forEach(r => { r.dataset.kind = kind(r); });
    const msg = document.createElement('div'); msg.hidden = true; msg.innerHTML = empty('receipt', 'Bu turdagi tranzaksiya yoʻq'); tx.appendChild(msg);
    const tabs = $$('.utabs__item');
    tabs.forEach(t => tap(t, () => {
      tabs.forEach(x => x.classList.toggle('is-active', x === t));
      const f = norm(t.textContent); let any = false;
      rows.forEach(r => { r.hidden = f !== 'Hammasi' && r.dataset.kind !== f; any = any || !r.hidden; });
      $$('.grp', tx).forEach(g => { let el = g.nextElementSibling, vis = false; while (el && !el.classList.contains('grp')) { if (el.classList.contains('t') && !el.hidden) vis = true; el = el.nextElementSibling; } g.hidden = !vis; });
      msg.hidden = any; tx.scrollTop = 0;
    }));
    tap(rows, r => sheet({ title: norm(r.querySelector('.t__b p').textContent), cancel: 'Yopish', items: [{ label: 'Summa', value: norm(r.querySelector('.t__v').textContent) + ' coin' }, { label: 'Tafsilot', value: norm(r.querySelector('.t__b .t-caption').textContent) }, { label: 'Turi', value: r.dataset.kind }, { icon: 'help', label: 'Muammo bormi? Yordam', fn: () => go('30-yordam') }] }));
  };

  R['29-sozlamalar'] = () => {
    const row = t => byText('.row', t)[0];
    const val = (r, v) => { const x = r.querySelector('.row__value'); if (x) x.textContent = v; };
    const choose = (r, title, key, opts, label = v => v) => { val(r, label(S[key])); tap(r, () => sheet({ title, items: opts.map(v => ({ label: v, on: S[key] === v, fn: () => { if (key === 'quality' && v === '1080p' && !S.vip) { toast('1080p — VIP imkoniyati'); return later(500, () => go('18-vip')); } S[key] = v; save(); val(r, label(v)); toast(`${title}: ${v}`); } })) })); };
    if (S.phone) val(row('Telefon raqam'), S.phone.replace(/\d(?=\d{2})/g, '•'));
    tap(row('Telefon raqam'), () => inputSheet({ title: 'Telefon raqam', text: 'Yangi raqamga tasdiqlash kodi yuboriladi', ph: '+998 90 123 45 67', type: 'tel', ok: 'Kod olish' }, v => { S.phone = v; save(); val(row('Telefon raqam'), v.replace(/\d(?=\d{2})/g, '•')); toast('Raqam yangilandi'); }));
    tap(row('Ulangan hisoblar'), () => sheet({ title: 'Ulangan hisoblar', cancel: 'Yopish', items: [{ icon: 'send', label: 'Telegram', value: 'ulangan', on: true }, { icon: 'globe', label: 'Google', value: 'ulash', fn: () => toast('Google hisobi ulandi') }, { icon: 'user', label: 'Apple', value: 'ulash', fn: () => toast('Apple hisobi ulandi') }] }));
    tap(row('Qurilmalar'), () => sheet({ title: 'Qurilmalar · 2 / 3', cancel: 'Yopish', items: [{ icon: 'phone', label: 'iPhone 15 Pro', value: 'shu qurilma', on: true }, { icon: 'tv', label: 'Samsung TV', value: 'chiqarish', danger: true, fn: () => { val(row('Qurilmalar'), '1 / 3'); toast('Samsung TV dan chiqildi'); } }] }));
    choose(row('Standart sifat'), 'Standart sifat', 'quality', ['Avto', '480p', '720p', '1080p']);
    choose(row('Subtitr tili'), 'Subtitr tili', 'sub', ['Oʻzbekcha', 'Ruscha', 'Inglizcha', 'Oʻchiq']);
    choose(row('Dublyaj tili'), 'Dublyaj tili', 'dub', ['Oʻzbekcha', 'Ruscha', 'Original']);
    choose(row('Ilova tili'), 'Ilova tili', 'lang', ['Oʻzbekcha', 'Русский', 'English']);
    choose(row('Mavzu'), 'Mavzu', 'theme', ['Tizim', 'Qorongʻi', 'Yorugʻ']);
    const sub = row('Obunani boshqarish'); val(sub, S.vip ? 'VIP' : 'Yoʻq'); tap(sub, to('18-vip'));
    tap(row('Xaridlarni tiklash'), () => toast(S.bought || S.vip ? 'Xaridlar tiklandi' : 'Tiklanadigan xarid topilmadi'));
    tap(row('Keshni tozalash'), r => { if (norm(r.querySelector('.row__value').textContent) === '0 MB') return toast('Kesh allaqachon tozalangan'); ask({ title: 'Keshni tozalash', text: '128 MB vaqtinchalik fayl oʻchiriladi. Yuklab olingan qismlar saqlanib qoladi.', ok: 'Tozalash' }, () => { val(r, '0 MB'); toast('Kesh tozalandi · 128 MB'); }); });
    const bindT = (t, key, on, off) => { const r = row(t); const tg = r.querySelector('.toggle'); tg.classList.toggle('is-on', !!S[key]); tap([tg, r], () => { S[key] = !S[key]; save(); tg.classList.toggle('is-on', S[key]); toast(S[key] ? on : off); }); };
    bindT('avto-ijro', 'autoplay', 'Avto-ijro yoqildi', 'Avto-ijro oʻchirildi');
    bindT('Avto-ochish', 'auto', 'Avto-ochish yoqildi · har qism 60 coin', 'Avto-ochish oʻchirildi');
    tap(byText('.btn', 'Chiqish'), () => ask({ title: 'Hisobdan chiqasizmi?', text: 'Tomosha tarixi va coinlar hisobingizda saqlanib qoladi.', ok: 'Chiqish', danger: true }, () => { store.set(SK, null); toast('Hisobdan chiqildi'); later(700, () => go('02-kirish', { reset: true })); }));
    tap(byText('.btn', 'Hisobni oʻchirish'), () => ask({ title: 'Hisobni oʻchirish', text: 'Hisob, coinlar va obuna 30 kundan keyin butunlay oʻchiriladi. Bu amalni qaytarib boʻlmaydi.', ok: 'Hisobni oʻchirish', danger: true }, () => toast('Soʻrov qabul qilindi · SMS orqali tasdiqlang')));
    fitScreen();
  };

  R['30-yordam'] = () => {
    const FAQ = [
      ['Coinlarim qayerga ketdi?', 'Hamyon → Tarix boʻlimida har bir sarf koʻrinadi. Avto-ochish yoqilgan boʻlsa, qismlar oʻzi ochiladi — uni Sozlamalar → Toʻlovʼdan oʻchirishingiz mumkin.', ['Toʻlov', 'Coin']],
      ['VIP obunani qanday bekor qilaman?', 'Profil → Obunani boshqarish → Bekor qilish. Obuna joriy davr oxirigacha amal qiladi.', ['VIP', 'Toʻlov']],
      ['Pulimni qaytarib olsam boʻladimi?', 'Ishlatilmagan coin uchun 14 kun ichida «Qaytarish soʻrovi» yuboring — javob 3 ish kunida keladi.', ['Toʻlov']],
      ['Video qotib qolyapti', 'Pleer sozlamalarida sifatni 480p yoki «Avto» ga oʻtkazing va internet aloqasini tekshiring.', ['Tomosha']],
      ['Bonus coin qachon tugaydi?', 'Bonus coin olingan kundan 7 kun amal qiladi. Qolgan muddatni Hamyon sahifasida koʻrasiz.', ['Coin']],
      ['Qismni reklama koʻrib ochsa boʻladimi?', 'Ha, kuniga 5 tagacha qismni ~30 soniyalik reklama koʻrib bepul ochasiz.', ['Coin', 'Tomosha']],
      ['VIP qaysi qurilmalarda ishlaydi?', 'Bitta hisob bilan 3 tagacha qurilmada: telefon, planshet va televizor.', ['VIP']],
      ['Subtitr va dublyajni qanday almashtiraman?', 'Pleerda «CC» tugmasi yoki Sozlamalar → Tomosha boʻlimida.', ['Tomosha']],
      ['Telefon raqamni qanday almashtiraman?', 'Sozlamalar → Hisob → Telefon raqam. Yangi raqamga SMS kod yuboriladi.', ['Hisob']],
      ['Hisobni qanday oʻchiraman?', 'Sozlamalar → Hisobni oʻchirish. Hisob 30 kundan keyin butunlay oʻchiriladi.', ['Hisob']],
    ];
    const acc = $('.acc'), find = makeInput($('.find'));
    const qHTML = ([q, a], open) => `<div class="q"><span>${q}</span><i class="ic ${open ? 'ic-chev-up' : 'ic-chev-down'} ic--20"></i></div>${open ? `<p class="a t-footnote">${a}</p>` : ''}`;
    const wire = () => $$('.q', acc).forEach(q => tap(q, () => {
      let a = q.nextElementSibling && q.nextElementSibling.classList.contains('a') ? q.nextElementSibling : null;
      if (!a) { const f = FAQ.find(x => x[0] === norm(q.textContent)); a = document.createElement('p'); a.className = 'a t-footnote'; a.textContent = f ? f[1] : ''; a.hidden = true; q.after(a); }
      a.hidden = !a.hidden;
      const i = q.querySelector('.ic'); i.classList.toggle('ic-chev-up', !a.hidden); i.classList.toggle('ic-chev-down', a.hidden);
    }));
    const render = list => { acc.innerHTML = list.length ? list.map((f, k) => qHTML(f, k === 0)).join('') : empty('help', 'Javob topilmadi', 'Operator bilan chatda soʻrang'); wire(); };
    wire();
    const topics = $$('.topics .chip');
    topics.forEach(c => tap(c, () => { if (c.classList.contains('chip--selected')) return; topics.forEach(x => x.classList.toggle('chip--selected', x === c)); find.value = ''; render(FAQ.filter(f => f[2].includes(norm(c.textContent)))); }));
    find.addEventListener('input', () => { const f = fold(find.value); if (!f) { const t = $('.topics .chip--selected'); return render(FAQ.filter(x => x[2].includes(norm(t.textContent)))); } render(FAQ.filter(x => fold(x[0] + ' ' + x[1]).includes(f))); });
    tap(byText('.tile', 'Operator'), () => inputSheet({ title: 'Operator bilan chat', text: 'Oʻrtacha javob vaqti — 2 daqiqa', ph: 'Savolingizni yozing…', ok: 'Yuborish' }, () => toast('Xabaringiz yuborildi · operator tez orada javob beradi')));
    tap(byText('.tile', 'Qaytarish'), () => inputSheet({ title: 'Qaytarish soʻrovi', text: 'Qaysi toʻlov va nima sababdan? Javob 3 ish kunida keladi.', ph: 'Masalan: 1 200 coin xaridi, ishlatilmagan', ok: 'Yuborish' }, () => toast('Qaytarish soʻrovi yuborildi')));
    tap(byText('.tile', 'Fikr'), () => starsSheet('Fikr yuborish', 0, k => toast(`Rahmat! Bahoingiz: ${k} / 5`)));
    fitScreen();
  };

  (R[ID] || (() => {}))();
  fitScreen();

  /* ---------- umumiy xatti-harakatlar (ekran yo'nalishi bermagan elementlar) ---------- */
  const free = el => !el.dataset.tap;
  tap($$('[aria-label="Orqaga"], [aria-label="Yopish"], .sheet__close').filter(free), () => back());
  $$('.nav__item').forEach(n => {
    const t = NAV[norm(n.textContent)]; if (!t) return;
    tap(n, () => { if (n.classList.contains('is-active')) { if (scrollY > 0) toTop(); else toast('Siz shu boʻlimdasiz'); return; } go(t, { reset: true }); });
  });
  // iOS: status bar'ga bosish — tepaga (faqat aylanadigan uzun ekranlarda; aks holda ostidagi kontentni to'smaydi)
  const status = $('.status'); if (status && pageScrolls()) { status.style.pointerEvents = 'auto'; status.style.cursor = 'pointer'; status.addEventListener('click', toTop); }
  $$('.toggle').filter(free).forEach(tg => {
    const row = tg.closest('.row, .auto, .rem, .opt');
    const flip = () => { const on = !tg.classList.contains('is-on'); tg.classList.toggle('is-on', on); toast(on ? 'Yoqildi' : 'Oʻchirildi'); };
    tap(tg, flip); if (row && free(row)) tap(row, flip);
  });
  $$('.check').filter(free).forEach(c => { const host = c.closest('label, .auto'); const flip = () => c.classList.toggle('is-on'); tap(c, flip); if (host && free(host)) tap(host, flip); });
  $$('.chip').filter(free).forEach(c => {
    const row = c.parentElement;
    if (!row || !row.querySelector(':scope > .chip--selected')) return;
    tap(c, () => {
      const prev = row.querySelector(':scope > .chip--selected'); if (prev === c) return;
      const mark = prev && prev.querySelector('.ic-check');
      prev && prev.classList.remove('chip--selected'); c.classList.add('chip--selected');
      if (mark) c.prepend(mark);
    });
  });
  $$('.seg__item').filter(free).forEach(s => tap(s, () => { s.parentElement.querySelectorAll('.seg__item').forEach(x => x.classList.toggle('is-active', x === s)); }));
  $$('.utabs__item').filter(free).forEach(s => tap(s, () => { s.parentElement.querySelectorAll('.utabs__item').forEach(x => x.classList.toggle('is-active', x === s)); }));

  // scroll joyini tiklash (orqaga / oldinga qaytilganda)
  if (H && H.sy != null) requestAnimationFrame(() => { scrollTo(0, H.sy); const s = scrollers(); (H.sx || []).forEach(([l, t], i) => { if (s[i]) { s[i].scrollLeft = l; s[i].scrollTop = t; } }); });
  window.__dramaProto = ID;
})();
