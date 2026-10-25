/* =====================================================================
   app.js — interaktiv prototip. Har bir ekran oxirida ulanadi.
   Ekranlar orasida o'tish (orqaga steki sessionStorage'da), pastki nav,
   toggle / chip / tab holatlari, taymerlar va qisqa bildirishnomalar.
   Avtomatlashtirilgan skrinshotda (navigator.webdriver) taymerlar ishlamaydi —
   statik dizayn piksel-bir xil qoladi.
   ===================================================================== */
(() => {
  const screen = document.getElementById('screen');
  if (!screen) return;
  const ID = decodeURIComponent(location.pathname.split('/').pop()).replace(/\.html$/, '');
  const HOME = '04-bosh-sahifa';
  const AUTO = navigator.webdriver === true;
  const KEY = 'drama-proto-stack';

  /* ---------- orqaga steki ---------- */
  let mem = [];
  const read = () => { try { return JSON.parse(sessionStorage.getItem(KEY) || '[]'); } catch (e) { return mem.slice(); } };
  const save = s => { mem = s.slice(); try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* xotirasiz rejim */ } };
  if (/[?&]reset\b/.test(location.search)) save([]);
  const open = t => { location.href = t + '.html'; };
  const go = (t, o = {}) => { const s = o.reset ? [] : read(); if (!o.reset && s[s.length - 1] !== ID) s.push(ID); save(s); open(t); };
  const back = (fallback = HOME) => { const s = read(); const t = s.pop(); save(s); open(t || fallback); };
  const popTo = (t, fallback) => { const s = read(); const i = s.lastIndexOf(t); if (i >= 0) { s.length = i; save(s); open(t); } else go(fallback || t); };
  try { parent !== window && parent.postMessage({ type: 'drama-proto', id: ID }, '*'); } catch (e) { /* mustaqil ochilgan */ }

  /* ---------- yordamchilar ---------- */
  const $$ = (sel, root = screen) => [...root.querySelectorAll(sel)];
  const norm = s => s.replace(/\s+/g, ' ').trim();
  const byText = (sel, text, root) => $$(sel, root).filter(e => norm(e.textContent).includes(text));
  const tap = (els, fn) => {
    const list = typeof els === 'string' ? $$(els) : [].concat(els);
    list.forEach(el => { if (!el || el.dataset.tap) return; el.dataset.tap = '1'; el.addEventListener('click', e => { e.stopPropagation(); fn(el, e); }); });
  };
  const to = (t, o) => () => go(t, o);

  const css = document.createElement('style');
  css.textContent = `
    [data-tap], .chip, .seg__item, .utabs__item, .toggle, .check, .radio, .row { cursor: pointer; -webkit-tap-highlight-color: transparent; }
    [data-tap]:active { opacity: .8; }
    .proto-toast { position: fixed; z-index: 300; top: 62px; left: 50%; max-width: calc(393px - 2 * var(--page-x)); width: max-content; padding: var(--s-12) var(--s-20);
      border-radius: var(--r-pill); background: color-mix(in srgb, var(--bg-2) 92%, transparent); box-shadow: inset 0 0 0 1px var(--line-2), var(--shadow-pill);
      -webkit-backdrop-filter: var(--glass-filter); backdrop-filter: var(--glass-filter); font: 500 var(--t-footnote)/1.3 var(--f-ui); color: var(--text-1); text-align: center;
      opacity: 0; transform: translate(-50%, -8px); transition: opacity .2s, transform .2s; pointer-events: none; }
    .proto-toast.is-on { opacity: 1; transform: translate(-50%, 0); }
    .proto-fade { transition: opacity .25s ease; }
    @media (prefers-reduced-motion: reduce) { .proto-toast, .proto-fade { transition: none; } }`;
  document.head.appendChild(css);
  const toast = msg => {
    let t = document.querySelector('.proto-toast');
    if (!t) { t = document.createElement('div'); t.className = 'proto-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('is-on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('is-on'), 2200);
  };
  const later = (ms, fn) => setTimeout(fn, ms);
  const pad = n => String(Math.max(0, n)).padStart(2, '0');

  // "Eslat" ↔ "Eslatiladi"
  const remind = btn => {
    if (!btn.dataset.label) btn.dataset.label = btn.classList.contains('btn--done') ? 'Eslatib qoʻy' : norm(btn.textContent);
    const on = !btn.classList.contains('btn--done');
    btn.classList.toggle('btn--done', on); btn.classList.toggle('btn--glass', !on);
    btn.innerHTML = on ? '<i class="ic ic-check ic--16"></i>Eslatiladi' : `<i class="ic ic-bell ic--16"></i>${btn.dataset.label}`;
    toast(on ? 'Premyerada eslatamiz' : 'Eslatma oʻchirildi');
  };
  // ikonka almashtirish (masalan yurak / bookmark)
  const swapIcon = (el, a, b, cls) => { const i = el.querySelector('.ic'); if (!i) return false; const on = i.classList.contains(a); i.classList.toggle(a, !on); i.classList.toggle(b, on); if (cls) i.classList.toggle(cls, !on); return !on; };
  // radio guruhi: qatorlar ichida bitta tanlov
  const pick = (rows, onPick) => tap(rows, row => {
    rows.forEach(r => { r.classList.toggle('is-on', r === row); const rd = r.querySelector('.radio'); if (rd) rd.classList.toggle('is-on', r === row); });
    onPick && onPick(row);
  });
  // taymer: [soat, daqiqa, soniya] kutilmasi
  const countdown = (boxes, start) => {
    if (AUTO || boxes.length < 3) return;
    let t = start;
    setInterval(() => { t = Math.max(0, t - 1); const v = [Math.floor(t / 3600), Math.floor(t / 60) % 60, t % 60]; boxes.forEach((b, i) => { b.textContent = pad(v[i]); }); }, 1000);
  };

  /* ---------- ekranlar ---------- */
  const NAV = { 'Bosh sahifa': '04-bosh-sahifa', 'Mukofot': '22-mukofotlar', 'Lenta': '05-lenta', 'Roʻyxatim': '24-royxatim', 'Profil': '27-profil' };
  const R = {};

  R['01-onboarding'] = () => {
    const items = $$('.list li'), cap = screen.querySelector('.cap'), cta = screen.querySelector('.cta');
    const update = () => {
      const n = items.filter(li => li.classList.contains('is-on')).length;
      if (cap) cap.innerHTML = `Tanlandi: ${n} / ${items.length}<br>Pastga suring ↓`;
      if (cta) cta.textContent = n ? `Davom etish · ${n} ta tanlandi` : 'Kamida 3 ta janr tanlang';
    };
    tap(items, li => {
      const on = !li.classList.contains('is-on'), name = norm(li.textContent).replace(/^→\s*/, '');
      li.classList.toggle('is-on', on);
      li.innerHTML = on ? `→ ${name}<span class="dot"></span>` : name;
      update();
    });
    tap(byText('.btn--text', 'Oʻtkazib'), to('02-kirish'));
    tap(cta, () => { const n = items.filter(li => li.classList.contains('is-on')).length; n >= 3 ? go('02-kirish') : toast('Kamida 3 ta janr tanlang'); });
  };

  R['02-kirish'] = () => {
    tap(byText('.btn', 'Mehmon'), to(HOME, { reset: true }));
    tap($$('.btn--primary, .btn--glass'), to('03-sovga'));
    tap(byText('a', 'shartlari').concat(byText('a', 'siyosati')), () => toast('Hujjat alohida sahifada ochiladi'));
  };

  R['03-sovga'] = () => {
    tap(byText('.btn', 'Sovgʻani olish'), () => { toast('+100 coin hisobingizga tushdi'); later(900, () => go(HOME, { reset: true })); });
    tap('[aria-label="Yopish"]', to(HOME, { reset: true }));
  };

  R['04-bosh-sahifa'] = () => {
    tap('.coin-chip', to('17-coin-dokoni'));
    tap('[aria-label="Qidiruv"]', to('06-qidiruv'));
    tap('[aria-label="Bildirishnomalar"]', to('26-bildirishnomalar'));
    tap(byText('.hero .btn', 'Tomosha qilish'), to('11-pleer'));
    tap(byText('.hero .btn--text', 'Roʻyxatga'), btn => {
      const on = !btn.classList.contains('is-saved'); btn.classList.toggle('is-saved', on);
      btn.innerHTML = on ? '<i class="ic ic-check"></i>Roʻyxatda' : '<i class="ic ic-plus"></i>Roʻyxatga';
      toast(on ? 'Roʻyxatga qoʻshildi' : 'Roʻyxatdan olib tashlandi');
    });
    tap(byText('.trailer', 'Treyler'), () => toast('Treyler ovozi yoqildi'));
    tap('.hero', to('10-drama'));
    const seg = { 'Reyting': '08-reyting', 'Tez kunda': '09-tez-kunda', 'Janrlar': '07-janrlar' };
    $$('.seg__item').forEach(s => { const t = seg[norm(s.textContent)]; if (t) tap(s, to(t)); });
    const more = { 'Tarix': '24-royxatim', 'Reyting': '08-reyting', 'Hammasi': '07-janrlar', 'Jadval': '09-tez-kunda' };
    $$('.pill-more').forEach(p => tap(p, to(more[norm(p.textContent)] || '07-janrlar')));
    tap('.lcard', to('11-pleer'));
    tap('.poster', to('10-drama'));
    tap($$('.card.vip, .card.vip .btn'), to('18-vip'));
    tap($$('article.card .btn--xs'), remind);
    tap($$('article.card').filter(a => a.querySelector('.btn--xs')), to('09-tez-kunda'));
  };

  R['05-lenta'] = () => {
    const D = [
      { t: 'Boʻri qirolining qasosi', amb: '02', sil: 'profile', g: ['Qasos', 'Boʻrilar'], n: 72, d: 'U toʻyda xiyonatni koʻrdi... endi esa butun toʻda uning qoʻlida.', p: 34 },
      { t: 'Milliarderning yashirin kelini', amb: '01', sil: 'couple', g: ['Romantika', 'CEO'], n: 80, d: 'Toʻy kuni xiyonatni koʻrgan qiz notanish milliarder bilan shartnoma tuzadi.', p: 12 },
      { t: 'Shartnoma boʻyicha xotin', amb: '03', sil: 'couple', g: ['CEO', 'Romantika'], n: 60, d: 'Bir yillik shartnoma, ikki begona va bitta sir.', p: 58 },
      { t: 'Direktorning sirli egizagi', amb: '05', sil: 'duo', g: ['Sir', 'CEO'], n: 64, d: 'Kompaniya direktorining egizagi borligini faqat u biladi.', p: 21 },
      { t: 'Uch yildan keyin qaytdim', amb: '07', sil: 'walk', g: ['Drama', 'Oilaviy'], n: 72, d: 'Uch yil oldin uni haydab yuborishdi. Endi u egasi sifatida qaytdi.', p: 46 },
    ];
    let i = 0, busy = false;
    const frame = screen.querySelector('.frame'), info = screen.querySelector('.info'), prog = screen.querySelector('.vprog'), cta = screen.querySelector('.cta'), hint = screen.querySelector('.toast');
    [frame, info].forEach(e => e && e.classList.add('proto-fade'));
    const show = dir => {
      if (busy) return; busy = true; if (hint) hint.hidden = true;
      i = (i + dir + D.length) % D.length; const d = D[i];
      [frame, info].forEach(e => { e.style.opacity = '0'; });
      later(220, () => {
        frame.className = `frame art art--${d.sil} art--soft proto-fade`; frame.style.setProperty('--amb', `var(--amb-${d.amb})`);
        info.querySelector('h1').textContent = d.t;
        info.querySelector('p').textContent = `1-qism / ${d.n} · ${d.d}`;
        const chips = info.querySelectorAll('.chip:not(.chip--flame)'); chips.forEach((c, k) => { c.textContent = d.g[k] || ''; });
        if (prog) prog.style.setProperty('--p', d.p + '%');
        if (cta) cta.innerHTML = `<i class="ic ic-play-fill"></i>Butun serialni koʻrish · ${d.n} qism`;
        [frame, info].forEach(e => { e.style.opacity = '1'; });
        later(260, () => { busy = false; });
      });
    };
    let y0 = null;
    screen.addEventListener('touchstart', e => { y0 = e.touches[0].clientY; }, { passive: true });
    screen.addEventListener('touchend', e => { if (y0 == null) return; const dy = e.changedTouches[0].clientY - y0; y0 = null; if (Math.abs(dy) > 50) show(dy < 0 ? 1 : -1); });
    let wheelAt = 0;
    screen.addEventListener('wheel', e => { const now = Date.now(); if (now - wheelAt < 700 || Math.abs(e.deltaY) < 20) return; wheelAt = now; show(e.deltaY > 0 ? 1 : -1); }, { passive: true });
    addEventListener('keydown', e => { if (e.key === 'ArrowDown') show(1); if (e.key === 'ArrowUp') show(-1); });
    if (hint) tap(hint, () => { hint.hidden = true; show(1); });
    tap('[aria-label="Qidiruv"]', to('06-qidiruv'));
    const rail = $$('.rail .gbtn');
    tap(rail[0], b => { const on = swapIcon(b, 'ic-heart', 'ic-heart-fill', 'c-rose'); toast(on ? 'Yoqdi' : 'Yoqtirishlardan olindi'); });
    tap(rail[1], b => { const on = swapIcon(b, 'ic-bookmark', 'ic-bookmark-fill', 'c-flame'); toast(on ? 'Roʻyxatga saqlandi' : 'Roʻyxatdan olindi'); });
    tap(rail[2], to('13-izohlar'));
    tap(rail[3], () => toast('Havola nusxalandi'));
    tap(rail[4], to('12-qismlar'));
    tap(info.querySelector('h1'), to('10-drama'));
    tap(cta, to('11-pleer'));
    tap(frame, to('11-pleer'));
  };

  R['06-qidiruv'] = () => {
    tap(byText('.btn--text', 'Bekor'), () => back());
    tap(byText('.btn--text', 'Tozalash'), btn => { const box = $$('.chip').filter(c => c.querySelector('.ic-close') || /^(milliarder|boʻri|qasos kelin|koreys drama)$/.test(norm(c.textContent))); box.forEach(c => c.remove()); btn.hidden = true; toast('Qidiruv tarixi tozalandi'); });
    $$('.chip').filter(c => !c.classList.contains('st')).forEach(c => tap(c, to('07-janrlar')));
    tap('.top-list li', to('10-drama'));
    tap($$('.genre, .head .gbtn'), to('07-janrlar'));
    tap('.search', () => toast('Klaviatura ochiladi'));
  };

  R['07-janrlar'] = () => {
    tap('[aria-label="Filtr"]', () => toast('Filtrlar yuqorida'));
    tap(byText('.btn--text', 'Tozalash'), () => {
      $$('.chip--selected').forEach(c => c.classList.remove('chip--selected'));
      [...new Set($$('.chip').map(c => c.parentElement))].forEach(row => { const f = row.querySelector('.chip'); f && f.classList.add('chip--selected'); });
      toast('Filtrlar tozalandi');
    });
    tap('.res .gbtn', to('11-pleer'));
    tap('.res', to('10-drama'));
  };

  R['08-reyting'] = () => { tap($$('.pod, .lrow'), to('10-drama')); };

  R['09-tez-kunda'] = () => {
    tap($$('.item .btn--xs'), remind);
    tap($$('.item .trailer, .item i.gbtn'), () => toast('Treyler ijro etilmoqda'));
    tap('.item', to('10-drama'));
  };

  R['10-drama'] = () => {
    tap('[aria-label="Ulashish"]', () => toast('Havola nusxalandi'));
    tap('[aria-label="Yana"]', () => toast('Shikoyat qilish · Qiziq emas'));
    tap(byText('.btn', 'Davom ettirish'), to('11-pleer'));
    const acts = $$('.act');
    tap(acts[0], a => { const on = !a.classList.contains('is-on'); a.classList.toggle('is-on', on); const g = a.querySelector('.gbtn'); g.classList.toggle('gbtn--flame', on); g.classList.toggle('gbtn--dark', !on); swapIcon(a, 'ic-bookmark-fill', 'ic-bookmark'); toast(on ? 'Roʻyxatga saqlandi' : 'Roʻyxatdan olindi'); });
    tap(acts[1], a => { const on = !a.classList.contains('is-on'); a.classList.toggle('is-on', on); toast(on ? 'Yangi qism chiqqanda eslatamiz' : 'Eslatma oʻchirildi'); });
    tap(acts[2], to('13-izohlar'));
    tap(acts[3], to('18-vip'));
    tap(byText('.btn', 'Butun serialni ochish'), to('17-coin-dokoni'));
    tap($$('.ep--watched, .ep--current, .ep--open, .ep--free'), to('11-pleer'));
    tap('.ep--locked', to('16-paywall'));
    tap('.poster', () => { scrollTo({ top: 0, behavior: 'smooth' }); toast('Oʻxshash drama'); });
  };

  R['11-pleer'] = () => {
    tap('[aria-label="Yana"]', to('14-pleer-sozlamalari'));
    const rail = $$('.rail .gbtn');
    tap(rail[0], b => { const on = swapIcon(b, 'ic-heart', 'ic-heart-fill', 'c-rose'); toast(on ? 'Yoqdi' : 'Yoqtirishlardan olindi'); });
    tap(rail[1], b => { const on = swapIcon(b, 'ic-bookmark', 'ic-bookmark-fill', 'c-flame'); toast(on ? 'Roʻyxatga saqlandi' : 'Roʻyxatdan olindi'); });
    tap(rail[2], to('13-izohlar'));
    tap(rail[3], () => toast('Havola nusxalandi'));
    tap(byText('.chip', 'Keyingi'), to('16-paywall'));
    const prog = screen.querySelector('.scrub .progress'), knob = screen.querySelector('.scrub__knob'), time = byText('*', '0:42 / 1:58').pop();
    let p = 36, playing = !AUTO, timer;
    const render = () => { prog && prog.style.setProperty('--p', p + '%'); if (knob) knob.style.left = `calc(${p}% - 9px)`; if (time && time.children.length === 0) { const s = Math.round(118 * p / 100); time.textContent = `${Math.floor(s / 60)}:${pad(s % 60)} / 1:58`; } };
    const tick = () => { p = Math.min(100, p + 100 / 118); render(); if (p >= 100) { clearInterval(timer); playing = false; later(400, () => go('16-paywall')); } };
    const play = screen.querySelector('.play');
    const setPlay = on => { playing = on; clearInterval(timer); if (on) timer = setInterval(tick, 1000); const i = play.querySelector('.ic'); i.classList.toggle('ic-pause-fill', on); i.classList.toggle('ic-play-fill', !on); play.setAttribute('aria-label', on ? 'Pauza' : 'Ijro'); };
    if (play) { tap(play, () => setPlay(!playing)); if (!AUTO) setPlay(true); }
    tap('[aria-label="5 soniya orqaga"]', () => { p = Math.max(0, p - 500 / 118); render(); });
    tap('[aria-label="5 soniya oldinga"]', () => { p = Math.min(99, p + 500 / 118); render(); });
    tap(byText('.chip', 'Qismlar'), to('12-qismlar'));
    tap($$('.chip').filter(c => /^(1\.0x|CC uz|720p)$/.test(norm(c.textContent))), to('14-pleer-sozlamalari'));
  };

  R['12-qismlar'] = () => {
    tap($$('.ep--free, .ep--current, .ep--open, .ep--watched'), () => popTo('11-pleer'));
    tap('.ep--locked', to('16-paywall'));
    tap(byText('.btn', 'Hammasini ochish'), to('17-coin-dokoni'));
    tap(byText('.btn--primary', 'VIP'), to('18-vip'));
  };

  R['13-izohlar'] = () => {
    tap('[aria-label="Yuborish"]', () => toast('Izohingiz yuborildi'));
    tap('.search', () => toast('Klaviatura ochiladi'));
    $$('.cmt__act > span:first-child').forEach(l => tap(l, () => {
      const i = l.querySelector('.ic'), on = i.classList.contains('ic-heart'), num = l.lastChild;
      i.classList.toggle('ic-heart', !on); i.classList.toggle('ic-heart-fill', on); l.classList.toggle('c-rose', on);
      if (num && num.nodeType === 3 && /^\d+$/.test(num.textContent.trim())) num.textContent = +num.textContent + (on ? 1 : -1);
    }));
    $$('.cmt__act > span:not(:first-child)').forEach(l => tap(l, () => toast(norm(l.textContent) === 'Shikoyat' ? 'Shikoyat yuborildi' : 'Javob yozish')));
    tap('.spoiler', sp => { const b = sp.querySelector('.blurtext'); if (b) { b.style.filter = 'none'; b.style.position = 'static'; b.style.padding = '0'; } [...sp.children].forEach(c => { if (c !== b) c.remove(); }); });
  };

  R['14-pleer-sozlamalari'] = () => {
    tap(byText('.chip', '1080p'), () => go('18-vip'));
    tap(byText('.row', 'Uyqu taymeri'), () => toast('Uyqu taymeri: 30 daqiqa'));
    tap(byText('.row', 'yuklab olish'), to('18-vip'));
    tap(byText('.row', 'Muammo'), () => toast('Xabaringiz yuborildi'));
  };

  R['15-serial-tugadi'] = () => {
    let left = 5, stop = false;
    const cap = byText('.next p', 'Keyingi drama').pop(), ring = screen.querySelector('.cd-ring');
    tap('[aria-label="Yopish"]', to(HOME, { reset: true }));
    tap(byText('.btn', 'Ulashish'), () => toast('Havola nusxalandi · +20 coin'));
    tap(byText('.btn', '2-fasl'), b => { const on = !b.classList.contains('is-saved'); b.classList.toggle('is-saved', on); b.innerHTML = on ? '<i class="ic ic-check"></i>Eslatiladi' : '<i class="ic ic-bell"></i>2-fasl: eslat'; toast(on ? '2-fasl chiqqanda eslatamiz' : 'Eslatma oʻchirildi'); });
    tap('.poster', to('10-drama'));
    tap(byText('.btn--text', 'Bekor qilish'), b => { stop = true; b.hidden = true; if (cap) cap.textContent = 'Avtomatik oʻtish bekor qilindi'; });
    if (!AUTO) { const t = setInterval(() => { if (stop) return clearInterval(t); left--; if (cap) cap.textContent = `Keyingi drama ${left} soniyada boshlanadi...`; if (ring) { ring.textContent = left; ring.style.setProperty('--p', left * 20 + '%'); } if (left <= 0) { clearInterval(t); go('10-drama'); } }, 1000); }
  };

  R['16-paywall'] = () => {
    tap('.player-bg', () => back());
    tap($$('.pack'), pk => { $$('.pack').forEach(x => x.classList.toggle('pack--popular', x === pk)); later(250, () => go('19-tolov')); });
    tap(byText('.btn', 'Koʻrish'), to('21-reklama'));
    tap($$('.card.vip, .card.vip .btn'), to('18-vip'));
    tap(byText('a', 'shartlari'), () => toast('Toʻlov shartlari'));
  };

  R['17-coin-dokoni'] = () => {
    tap(byText('.btn--text', 'Tarix'), to('28-hamyon'));
    tap($$('.pack'), to('19-tolov'));
    tap('.vipb', to('18-vip'));
    tap(byText('a', 'Xaridlarni'), () => toast('Xaridlar tiklandi'));
    tap(byText('a', 'shartlari'), () => toast('Toʻlov shartlari'));
    tap(byText('a', 'Yordam'), to('30-yordam'));
    tap($$('.chip').filter(c => c.closest('.pay, .methods') || /Payme|Click|Uzum|UzCard|Visa|App Store/.test(c.textContent)), c => toast(`${norm(c.textContent)} bilan toʻlash mumkin`));
    countdown($$('.first .cd__box'), 23 * 3600 + 59 * 60 + 12);
  };

  R['18-vip'] = () => {
    tap(byText('.btn--text', 'Xaridlarni'), () => toast('Xaridlar tiklandi'));
    const cta = screen.querySelector('.cta'), per = { Haftalik: 'hafta', Oylik: 'oy', Yillik: 'yil' };
    pick($$('.plan'), row => { const n = norm(row.querySelector('.plan__b p').textContent); if (cta) cta.textContent = `VIP olish · [narx] soʻm / ${per[n] || 'oy'}`; });
    tap(cta, to('19-tolov'));
    tap(byText('a', 'Shartlar').concat(byText('a', 'Maxfiylik')), () => toast('Hujjat alohida sahifada ochiladi'));
  };

  R['19-tolov'] = () => {
    const btn = screen.querySelector('.pay');
    pick($$('.m'), row => { const n = norm(row.querySelector('.m__b p').textContent); if (btn) btn.textContent = `${n} orqali toʻlash`; });
    tap(byText('.btn', 'Qoʻllash'), () => toast('Promokod kiriting'));
    tap('.field', () => toast('Klaviatura ochiladi'));
    tap(btn, () => { toast('Toʻlov tasdiqlandi · +1 440 coin'); later(1100, () => { const s = read(); s.includes('11-pleer') ? popTo('11-pleer') : go('28-hamyon'); }); });
    tap(byText('a', 'Oferta'), () => toast('Oferta matni'));
  };

  R['20-maxsus-taklif'] = () => {
    tap(byText('.btn', 'Taklifni olish'), to('19-tolov'));
    tap(byText('.btn--text', 'Yoʻq'), () => back());
    countdown($$('.cd__box'), 2 * 3600 + 14 * 60 + 37);
  };

  R['21-reklama'] = () => {
    tap(byText('.btn', 'Batafsil'), () => toast('Reklama beruvchi sahifasi'));
    if (AUTO) return;
    let left = 15;
    const chip = byText('.chip', 'soniyadan').pop(), ring = screen.querySelector('.cd-ring'), bar = screen.querySelector('.reward .progress');
    const t = setInterval(() => {
      left--;
      if (chip) chip.textContent = left > 0 ? `${left} soniyadan soʻng yopiladi` : 'Yopish';
      if (ring) { ring.textContent = Math.max(0, left); ring.style.setProperty('--p', (15 - left) / 15 * 100 + '%'); }
      if (bar) bar.style.setProperty('--p', (15 - left) / 15 * 100 + '%');
      if (left <= 0) { clearInterval(t); toast('11-qism bepul ochildi'); later(1200, () => { const s = read(); s.includes('11-pleer') ? popTo('11-pleer') : back(); }); }
    }, 1000);
  };

  R['22-mukofotlar'] = () => {
    tap(byText('.btn--text', 'Qoidalar'), () => toast('Coin 7 kun amal qiladi · avval bonus sarflanadi'));
    tap(byText('.top .chip', '105'), to('28-hamyon'));
    tap(byText('.bonus .btn', 'Tarix'), to('28-hamyon'));
    const claim = byText('.ci .btn--primary', 'coin').pop(), today = byText('.day', 'Bugun').pop();
    tap(claim, b => {
      if (b.classList.contains('is-disabled')) return;
      toast('+15 coin olindi · ketma-ket 3-kun');
      b.classList.add('is-disabled'); b.textContent = 'Ertaga +15 coin';
      if (today) { today.classList.add('box--dim'); today.style.boxShadow = 'none'; today.style.setProperty('--box', 'var(--bg-3)'); const tag = today.querySelector('.today-tag'); tag && tag.remove(); const f = today.querySelector('.box__front'); if (f) { f.textContent = '3-kun'; f.removeAttribute('style'); } today.insertAdjacentHTML('beforeend', '<span class="done"><i class="ic ic-check"></i></span>'); }
      const bal = byText('.top .chip', '1').pop(); if (bal) bal.innerHTML = '<i class="coin coin--sm"></i>120';
    });
    tap(byText('section.card .btn', 'Koʻrish'), to('21-reklama'));
    const tasks = { '3 ta qism': '05-lenta', 'doʻstga ulashing': '23-dost-taklif', 'Bildirishnomalarni': '26-bildirishnomalar' };
    $$('.task').forEach(row => {
      const b = row.querySelector('.btn'); if (!b) return;
      const route = Object.keys(tasks).find(k => norm(row.textContent).includes(k));
      tap(b, () => {
        if (b.classList.contains('btn--got')) return;
        if (norm(b.textContent) === 'Olish') { const v = (row.querySelector('.c-flame') || {}).textContent || ''; toast(`${v} coin olindi`); b.className = 'btn btn--xs btn--got'; b.innerHTML = '<i class="ic ic-check ic--16"></i>Olindi'; return; }
        route ? go(tasks[route]) : (toast('Vazifa bajarildi'), b.className = 'btn btn--primary btn--xs', b.textContent = 'Olish');
      });
    });
    tap($$('.invite, .invite .btn'), to('23-dost-taklif'));
  };

  R['23-dost-taklif'] = () => {
    tap(byText('.btn', 'Nusxa olish'), b => {
      const done = () => { b.innerHTML = '<i class="ic ic-check"></i>Nusxalandi'; toast('Taklif kodi nusxalandi: AZ7K29'); };
      try { navigator.clipboard.writeText('AZ7K29').then(done, done); } catch (e) { done(); }
    });
    $$('.share > div').forEach(d => tap(d, () => toast(`${norm(d.textContent)} orqali ulashish`)));
    tap(byText('.pill-more', 'Roʻyxat'), () => toast('3 doʻst qoʻshildi · 600 coin'));
    tap($$('.gbtn--flame'), () => toast('Kontaktlardan taklif qilish'));
  };

  R['24-royxatim'] = () => {
    tap(byText('.btn--text', 'Tahrirlash'), () => toast('Oʻchirish uchun posterlarni tanlang'));
    tap(byText('.utabs__item', 'Yuklanganlar'), to('25-yuklanganlar'));
    tap(byText('.poster', 'Tugatilgan'), to('15-serial-tugadi'));
    tap($$('.poster').filter(p => !p.dataset.tap), to('10-drama'));
  };

  R['25-yuklanganlar'] = () => {
    tap(byText('.btn--text', 'Tahrirlash'), () => toast('Oʻchirish uchun tanlang'));
    tap('[aria-label="Oʻchirish"], [aria-label="Bekor qilish"]', b => { const row = b.closest('.dl'); row && row.remove(); toast('Yuklab olingan qism oʻchirildi'); });
    tap('[aria-label="Pauza"]', b => { const on = swapIcon(b, 'ic-pause', 'ic-play'); const i = b.querySelector('.ic'); if (i && !i.classList.contains('ic-pause') && !i.classList.contains('ic-play')) swapIcon(b, 'ic-pause-fill', 'ic-play-fill'); toast(on ? 'Yuklash davom etmoqda' : 'Yuklash toʻxtatildi'); });
    tap($$('.dl'), to('11-pleer'));
    tap(byText('.row', 'Yuklash sifati'), () => toast('Yuklash sifati: 720p'));
  };

  R['26-bildirishnomalar'] = () => {
    tap(byText('.btn--text', 'Hammasi oʻqildi'), () => { $$('.nt.unread').forEach(n => n.classList.remove('unread')); $$('.nt .dot').forEach(d => d.remove()); toast('Hammasi oʻqildi'); });
    tap(byText('.perm .btn', 'Yoqish'), b => { b.closest('.perm').remove(); toast('Bildirishnomalar yoqildi · +30 coin'); });
    const map = [['qirolining', '10-drama'], ['Taqdir', '09-tez-kunda'], ['Check-in', '22-mukofotlar'], ['izohingizga', '13-izohlar'], ['Faqat bugun', '20-maxsus-taklif'], ['VIP obunangiz', '18-vip']];
    $$('.nt').forEach(n => { const m = map.find(([k]) => n.textContent.includes(k)); if (m) tap(n, () => { n.classList.remove('unread'); go(m[1]); }); });
  };

  R['27-profil'] = () => {
    tap('[aria-label="Sozlamalar"]', to('29-sozlamalar'));
    tap(byText('.chip', 'doʻst'), to('23-dost-taklif'));
    tap(byText('.chip', 'VIP emas'), to('18-vip'));
    tap(byText('.chip', 'Telegram'), () => toast('Telegram orqali kirgansiz'));
    tap(byText('.btn', 'Profilni tahrirlash'), () => toast('Ism va rasmni oʻzgartirish'));
    tap('.dot-btn', () => toast('Profil havolasini ulashish'));
    tap(screen.querySelector('.id'), () => { try { navigator.clipboard.writeText('10482733').catch(() => {}); } catch (e) { /* — */ } toast('ID nusxalandi'); });
    tap(byText('.wallet .btn', 'Toʻldirish'), to('17-coin-dokoni'));
    tap('.wallet', to('28-hamyon'));
    tap($$('.card.vip, .card.vip .btn'), to('18-vip'));
    const quick = { 'Tarix': '24-royxatim', 'Saqlangan': '24-royxatim', 'Yuklangan': '25-yuklanganlar', 'Mukofot': '22-mukofotlar' };
    $$('.quick .card').forEach(c => tap(c, to(quick[norm(c.textContent)] || '24-royxatim')));
    tap(byText('.pill-more', 'Hammasi'), to('24-royxatim'));
    tap('.fav .poster', to('10-drama'));
    const rows = [['Hamyon', '28-hamyon'], ['Obunani', '18-vip'], ['Avto-ochish', '29-sozlamalar'], ['Doʻstni', '23-dost-taklif'], ['Til va', '14-pleer-sozlamalari'], ['Bildirishnomalar', '26-bildirishnomalar'], ['Yordam', '30-yordam'], ['Fikr', '30-yordam'], ['Shartlar', null], ['Sozlamalar', '29-sozlamalar']];
    $$('.menu .row').forEach(r => { const m = rows.find(([k]) => r.textContent.includes(k)); if (m) tap(r, m[1] ? to(m[1]) : () => toast('Shartlar va maxfiylik siyosati')); });
  };

  R['28-hamyon'] = () => {
    tap(byText('.btn', 'Coin toʻldirish'), to('17-coin-dokoni'));
    tap(byText('a', 'Qaytarish'), to('30-yordam'));
    tap($$('.tx .t'), r => toast(norm(r.querySelector('.t__b p').textContent)));
  };

  R['29-sozlamalar'] = () => {
    tap(byText('.row', 'Obunani boshqarish'), to('18-vip'));
    tap(byText('.row', 'Keshni tozalash'), r => { const v = r.querySelector('.row__value'); if (v) v.textContent = '0 MB'; toast('Kesh tozalandi · 128 MB'); });
    tap(byText('.row', 'Xaridlarni tiklash'), () => toast('Xaridlar tiklandi'));
    $$('.row').filter(r => !r.dataset.tap && !r.querySelector('.toggle')).forEach(r => tap(r, () => toast(norm(r.querySelector('.row__label').textContent))));
    tap(byText('.btn', 'Chiqish'), () => { toast('Hisobdan chiqildi'); later(800, () => go('02-kirish', { reset: true })); });
    tap(byText('.btn', 'Hisobni oʻchirish'), () => toast('Tasdiqlash kodi SMS orqali yuboriladi'));
  };

  R['30-yordam'] = () => {
    const A = {
      'VIP obunani qanday bekor qilaman?': 'Profil → Obunani boshqarish → Bekor qilish. Obuna joriy davr oxirigacha amal qiladi.',
      'Pulimni qaytarib olsam boʻladimi?': 'Ishlatilmagan coin uchun 14 kun ichida «Qaytarish soʻrovi» yuboring — javob 3 ish kunida keladi.',
      'Video qotib qolyapti': 'Pleer sozlamalarida sifatni 480p yoki «Avto» ga oʻtkazing va internet aloqasini tekshiring.',
      'Bonus coin qachon tugaydi?': 'Bonus coin olingan kundan 7 kun amal qiladi. Qolgan muddatni Hamyon sahifasida koʻrasiz.',
    };
    $$('.q').forEach(q => tap(q, () => {
      let a = q.nextElementSibling && q.nextElementSibling.classList.contains('a') ? q.nextElementSibling : null;
      if (!a) { a = document.createElement('p'); a.className = 'a t-footnote'; a.textContent = A[norm(q.textContent)] || ''; a.hidden = true; q.after(a); }
      a.hidden = !a.hidden;
      const i = q.querySelector('.ic'); if (i) { i.classList.toggle('ic-chev-up', !a.hidden); i.classList.toggle('ic-chev-down', a.hidden); }
    }));
    tap('.search', () => toast('Klaviatura ochiladi'));
    tap(byText('.tile', 'Operator'), () => toast('Operator ulanmoqda · oʻrtacha 2 daqiqa'));
    tap(byText('.tile', 'Qaytarish'), () => toast('Qaytarish soʻrovi yuborildi'));
    tap(byText('.tile', 'Fikr'), () => toast('Fikringiz uchun rahmat'));
  };

  (R[ID] || (() => {}))();

  /* ---------- umumiy xatti-harakatlar (ekran yo'nalishi bermagan elementlar) ---------- */
  const free = el => !el.dataset.tap;
  tap($$('[aria-label="Orqaga"], [aria-label="Yopish"], .sheet__close').filter(free), () => back());
  $$('.nav__item').forEach(n => { const t = NAV[norm(n.textContent)]; if (t && !n.classList.contains('is-active')) tap(n, to(t, { reset: true })); });
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
  window.__dramaProto = ID;
})();
