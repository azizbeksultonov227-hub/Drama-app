// Prototip oqim testi: node tools/flow_test.js
// Haqiqiy foydalanuvchi yo'llari bo'ylab bosiladi va har qadamda natija tekshiriladi:
// ekran, matn, coin balansi, holat (sessionStorage), orqaga / oldinga, scroll va klaviatura.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const base = 'file://' + path.resolve('screens') + '/';
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 393, height: 852 } });
  await ctx.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(decodeURIComponent(p.url().split('/').pop()) + ': ' + e.message));
  const here = () => decodeURIComponent(p.url().split('/').pop().split('?')[0]).replace('.html', '');
  const ready = id => p.waitForFunction(i => window.__dramaProto === i, id, { timeout: 30000 });
  const at = async (id, ms = 30000) => { await p.waitForURL(u => u.toString().includes(id + '.html'), { timeout: ms, waitUntil: 'commit' }); await ready(id); await p.waitForTimeout(200); };
  const open = async (f, q = '') => { await p.goto(base + f + '.html' + q); await ready(f); await p.waitForTimeout(150); };
  const loc = (sel, text) => text ? p.locator(sel, { hasText: text }).first() : p.locator(sel).first();
  const click = async (sel, text) => { const l = loc(sel, text); await l.scrollIntoViewIfNeeded().catch(() => {}); await l.click(); };
  const txt = async (sel, text) => (await loc(sel, text).innerText()).replace(/\s+/g, ' ').trim();
  const S = () => p.evaluate(() => JSON.parse(sessionStorage.getItem('drama-proto-state') || '{}'));
  const total = async () => { const s = await S(); return s.paid + s.bonus; };
  const expect = (cond, msg) => { if (!cond) throw new Error(msg); };
  let ok = 0, fail = 0;
  const step = async (desc, fn) => {
    try { await fn(); ok++; process.stdout.write('✓ ' + desc + '\n'); }
    catch (e) { fail++; console.log('✗', desc, '— hozir:', here(), '·', e.message.split('\n')[0]); }
  };

  // 0) har bir ekran xatosiz yuklanadi
  for (const f of fs.readdirSync('screens').filter(x => x.endsWith('.html')).sort()) await step('yuklanadi: ' + f, () => open(f.replace('.html', ''), '?reset=1'));

  // A) onboarding → kirish → sovg'a
  await open('01-onboarding', '?reset=1');
  await step('01 janr tanlash: 4 / 15', async () => { await click('.list li', 'Boʻri va vampir'); expect((await txt('.cap')).includes('4 / 15'), await txt('.cap')); });
  await step('01 til tanlash', async () => { await click('.lang .chip', 'English'); expect((await S()).lang === 'English', 'lang'); await click('.lang .chip', 'Oʻzbekcha'); });
  await step('01 janr ro\'yxati aylanadi', async () => { await p.mouse.move(150, 400); await p.mouse.wheel(0, 300); await p.waitForTimeout(300); expect(await p.evaluate(() => document.querySelector('.list').scrollTop) > 50, 'scrollTop 0'); });
  await step('01 → 02', async () => { await click('.cta'); await at('02-kirish'); });
  await step('02 Telegram → 03 (+50 bonus)', async () => { await click('.btn', 'Telegram'); await at('03-sovga'); expect((await S()).bonus === 135, 'bonus ' + (await S()).bonus); });
  await step('03 sovg\'a → 04, balans 255', async () => { await click('.btn', 'Sovgʻani olish'); await at('04-bosh-sahifa'); expect((await txt('.coin-chip')).includes('255'), await txt('.coin-chip')); });

  // B) bosh sahifa: hero karusel, saqlash, tomosha
  await step('04 hero: 2-nuqta → Boʻri', async () => { await p.locator('.hero__dashes .dashes i').nth(1).click(); await p.waitForTimeout(400); expect((await txt('.hero__title')).includes('Boʻri'), await txt('.hero__title')); });
  await step('04 hero: Roʻyxatda ↔ Roʻyxatga', async () => {
    const btn = '.hero .btn--text'; expect((await txt(btn)).includes('Roʻyxatda'), await txt(btn));
    await click(btn); expect((await txt(btn)).includes('Roʻyxatga'), 'toggle'); expect(!(await S()).saved.includes('Boʻri qirolining qasosi'), 'state');
    await click(btn); expect((await S()).saved.includes('Boʻri qirolining qasosi'), 'state back');
  });
  await step('04 hero: surish → keyingi drama', async () => { const a = await txt('.hero__title'); await p.mouse.move(330, 250); await p.mouse.down(); await p.mouse.move(80, 255, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(450); expect(a !== await txt('.hero__title'), 'oʻzgarmadi'); });
  await step('04 hero: 1-nuqta → Tomosha → 11 (10-qism)', async () => { await p.locator('.hero__dashes .dashes i').nth(0).click(); await p.waitForTimeout(400); await click('.hero .btn', 'Tomosha qilish'); await at('11-pleer'); expect((await txt('.topbar__title')).includes('10-qism / 80'), await txt('.topbar__title')); });
  await step('11 ilova ichida orqaga → 04', async () => { await click('[aria-label="Orqaga"]'); await at('04-bosh-sahifa'); });

  // C) drama sahifasi, avto-ochish
  await step('04 Top-10 «Vampir» → 10', async () => { await click('.top10__item', 'Vampir'); await at('10-drama'); expect((await txt('.head__title')).includes('Vampir'), await txt('.head__title')); expect((await txt('.head .btn')).includes('Boshlash'), await txt('.head .btn')); });
  await step('10 qulf 11 (avto-ochish) → 11, −60', async () => { const t0 = await total(); await click('.ep', '11'); await at('11-pleer'); expect((await txt('.topbar__title')).includes('11-qism / 50'), await txt('.topbar__title')); expect(await total() === t0 - 60, 'coin'); });
  await step('11 Keyingi → 12-qism (avto-ochish)', async () => { const t0 = await total(); await click('.chip', 'Keyingi'); await p.waitForTimeout(300); expect((await txt('.topbar__title')).includes('12-qism / 50'), await txt('.topbar__title')); expect(await total() === t0 - 60, 'coin'); });
  await step('11 tezlik pill 1.0x → 1.25x', async () => { await click('.pills .chip', '1.0x'); expect((await txt('.pills .chip:nth-child(2)')) === '1.25x', await txt('.pills .chip:nth-child(2)')); });
  await step('11 orqaga → 10: «Davom ettirish · 12-qism»', async () => { await click('[aria-label="Orqaga"]'); await at('10-drama'); expect((await txt('.head .btn')).includes('12-qism'), await txt('.head .btn')); });
  await step('10 tablar: Oʻxshash / Tafsilotlar / Qismlar', async () => { await click('.utabs__item', 'Tafsilotlar'); expect(await loc('.row', 'Yosh chegarasi').isVisible(), 'tafsilot'); expect(!(await loc('.range').isVisible()), 'range koʻrinmoqda'); await click('.utabs__item', 'Oʻxshash'); await click('.utabs__item', 'Qismlar'); expect(await loc('.eps').isVisible(), 'eps'); });
  await step('10 Koʻproq / Yopish', async () => { await click('.desc .more'); expect((await txt('.desc .more')).includes('Yopish'), 'yopish'); await click('.desc .more'); });

  // D) paywall: avto-ochish o'chiq, coin bilan ochish
  await step('10 → 11 → 12, avto-ochishni oʻchirish', async () => { await click('.head .btn'); await at('11-pleer'); await click('.pills .chip', 'Qismlar'); await at('12-qismlar'); await click('.auto .toggle'); expect((await S()).auto === false, 'auto'); });
  await step('12 qulf 13 → 16 (balans yetarli)', async () => { await click('.ep', '13'); await at('16-paywall'); expect((await txt('.sheet h2')).includes('13-qism'), await txt('.sheet h2')); expect(await loc('.proto-unlock').isVisible(), 'ochish tugmasi yoʻq'); });
  await step('16 coin bilan ochish → 11 (13-qism)', async () => { const t0 = await total(); await click('.proto-unlock'); await at('11-pleer'); expect((await txt('.topbar__title')).includes('13-qism'), await txt('.topbar__title')); expect(await total() === t0 - 60, 'coin'); });
  await step('11 → 14 → 16 → ochish', async () => { await click('.chip', 'Keyingi'); await at('16-paywall'); await click('.proto-unlock'); await at('11-pleer'); expect((await txt('.topbar__title')).includes('14-qism'), 'ep'); expect(await total() === 15, 'balans ' + await total()); });
  await step('11 → 15 → 16: coin yetmaydi, paketlar', async () => { await click('.chip', 'Keyingi'); await at('16-paywall'); expect((await txt('.bal')).includes('15 coin'), await txt('.bal')); expect((await txt('.sheet .t-caption', 'yetmaydi')).includes('45 coin'), 'yetmaydi'); expect(await p.locator('.pack').count() === 3, 'paketlar'); });

  // E) xarid: paket → to'lov → qism ochiladi
  await step('16 paket 600 → 19', async () => { await click('.pack', '600'); await at('19-tolov'); expect((await txt('.order')).includes('600 coin + 60 bonus'), await txt('.order')); });
  await step('19 usul Click + promokod', async () => { await click('.m', 'Click'); expect((await txt('.pay')).includes('Click'), await txt('.pay')); await p.locator('.promo input').fill('drama10'); await click('.promo .btn'); expect((await txt('.promo .btn')).includes('Qoʻllandi'), 'promo'); });
  await step('19 toʻlash → 11 (15-qism), balans 615', async () => { await click('.pay'); await at('11-pleer', 10000); expect((await txt('.topbar__title')).includes('15-qism'), await txt('.topbar__title')); expect(await total() === 615, 'balans ' + await total()); expect((await S()).bought === true, 'bought'); });

  // F) reklama bilan ochish (15 soniya taymer)
  await step('11 → 16 → reklama → 11 (16-qism)', async () => { await click('.chip', 'Keyingi'); await at('16-paywall'); await click('.ad .btn', 'Koʻrish'); await at('21-reklama'); await at('11-pleer', 25000); expect((await txt('.topbar__title')).includes('16-qism'), await txt('.topbar__title')); expect((await S()).ads === 2, 'ads'); });

  // G) VIP
  await step('nav Profil → 27 → VIP → 18', async () => { await open('27-profil'); await click('.card.vip .btn'); await at('18-vip'); });
  await step('18 Yillik → 19 → toʻlash → 27 (VIP aʼzo)', async () => {
    await click('.plan', 'Yillik'); expect((await txt('.cta')).includes('/ yil'), await txt('.cta'));
    await click('.cta'); await at('19-tolov'); expect((await txt('.order')).includes('VIP · Yillik'), await txt('.order'));
    await click('.pay'); await at('27-profil', 10000); expect((await txt('.chips')).includes('VIP aʼzo'), await txt('.chips')); expect((await S()).vip === true, 'vip');
  });
  await step('VIP: «Imperator» 40-qism toʻlovsiz ochiladi', async () => { await open('10-drama', '?d=imperator'); const t0 = await total(); await click('.range .chip', '31–60'); await click('.ep', '40'); await at('11-pleer'); expect((await txt('.topbar__title')).includes('40-qism / 66'), await txt('.topbar__title')); expect(await total() === t0, 'coin yechildi'); });

  // H) mukofotlar
  await step('22 check-in +15', async () => { await open('22-mukofotlar'); const t0 = await total(); await click('.ci .btn--primary'); expect((await txt('.ci .btn--primary')).includes('Ertaga'), 'tugma'); expect(await total() === t0 + 15, 'coin'); expect((await txt('.top .chip')).includes(String(t0 + 15).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')), await txt('.top .chip')); });
  await step('22 vazifa «10 daqiqa» Olish → Olindi', async () => { const t0 = await total(); await click('.task', '10 daqiqa'); expect((await txt('.task', '10 daqiqa')).includes('Olindi'), 'olindi'); expect(await total() === t0 + 20, 'coin'); });
  await step('22 «Bildirishnomalar» Bajarish → Yoqish → Olish', async () => { await click('.task', 'Bildirishnomalarni'); await click('.proto-modal [data-ok]'); await p.waitForTimeout(300); expect((await txt('.task', 'Bildirishnomalarni')).includes('Olish'), 'olish'); const t0 = await total(); await click('.task', 'Bildirishnomalarni'); expect(await total() === t0 + 30, 'coin'); });
  await step('22 reklama → 21 → 22 (+10 bonus)', async () => { const t0 = await total(); await click('section.card .btn', 'Koʻrish'); await at('21-reklama'); await at('22-mukofotlar', 25000); expect(await total() === t0 + 10, 'coin'); });

  // I) ro'yxatim
  await step('24 Saqlangan soni holat bilan bir xil', async () => { await open('24-royxatim'); const s = await S(); expect((await txt('.utabs__item')).includes(String(s.saved.length)), await txt('.utabs__item')); expect(await p.locator('.grid .poster').count() === s.saved.length, 'grid'); });
  await step('24 Tahrirlash → ✕ → bitta kamaydi', async () => { const n = await p.locator('.grid .poster').count(); await click('.top .btn--text'); await click('.proto-x'); expect(await p.locator('.grid .poster').count() === n - 1, 'kamaymadi'); await click('.top .btn--text', 'Tayyor'); });
  await step('24 Tarix: oxirgi koʻrilgan birinchi', async () => { await click('.utabs__item', 'Tarix'); expect((await txt('.grid .poster')).includes('Imperatorning'), await txt('.grid .poster')); });
  await step('24 → 25 (VIP banner) → orqaga', async () => { await click('.utabs__item', 'Yuklanganlar'); await at('25-yuklanganlar'); expect((await txt('.vip')).includes('VIP'), await txt('.vip')); await click('[aria-label="Orqaga"]'); await at('24-royxatim'); });

  // J) qidiruv va janrlar
  await step('06 qidiruv «bori» → 1 natija → 10', async () => { await open('06-qidiruv'); await p.locator('.top input').fill('bori'); await p.waitForTimeout(200); expect(await p.locator('.proto-row').count() === 1, 'natija'); await click('.proto-row'); await at('10-drama'); expect((await txt('.head__title')).includes('Boʻri'), 'drama'); });
  await step('06 janr «Qasos» → 07 filtr', async () => { await open('06-qidiruv'); await click('.genre', 'Qasos'); await at('07-janrlar'); expect((await txt('.frow .chip--selected')) === 'Qasos', await txt('.frow .chip--selected')); const n = await p.locator('.res').count(); expect((await txt('.found')).toLowerCase().includes(n + ' ta'), await txt('.found')); });
  await step('07 «Tugallangan» → soni oʻzgaradi, Tozalash', async () => { const a = await p.locator('.res').count(); await click('.frow .chip', 'Tugallangan'); const c = await p.locator('.res').count(); expect(c < a, `${a} → ${c}`); await click('.found .btn--text'); expect(await p.locator('.res').count() >= a, 'tozalash'); });
  await step('07 natijalar aylanadi', async () => { await p.mouse.move(200, 600); await p.mouse.wheel(0, 400); await p.waitForTimeout(300); expect(await p.evaluate(() => document.querySelector('.results').scrollTop) > 50, 'scrollTop'); });
  await step('07 filtr qatori gorizontal suriladi (sichqoncha)', async () => { const y = (await p.locator('.frow').first().boundingBox()).y + 18; await p.mouse.move(340, y); await p.mouse.down(); await p.mouse.move(140, y, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(200); expect(await p.evaluate(() => document.querySelector('.frow').scrollLeft) > 40, 'scrollLeft'); });

  // K) izohlar
  await step('13 izoh yozish va yuborish', async () => { await open('13-izohlar'); await p.locator('.compose input').fill('Ajoyib qism!'); await click('[aria-label="Yuborish"]'); expect((await txt('.cmt')).includes('Ajoyib qism!'), await txt('.cmt')); });
  await step('13 saralash «Yangi»', async () => { await click('.sort .chip', 'Yangi'); expect((await txt('.cmt')).includes('Siz'), await txt('.cmt')); });

  // L) bildirishnomalar
  await step('26 filtr «Takliflar» → 2 ta', async () => { await open('26-bildirishnomalar'); await click('.filters .chip', 'Takliflar'); expect(await p.locator('.nt:visible').count() === 2, 'soni ' + await p.locator('.nt:visible').count()); });
  await step('26 Hammasi oʻqildi → 04 badge yoʻq', async () => { await click('.btn--text', 'Hammasi oʻqildi'); await open('04-bosh-sahifa'); expect(await p.locator('.badge-count').count() === 0, 'badge'); });

  // M) hamyon
  await step('28 yangi tranzaksiyalar va «Sarflangan» filtri', async () => { await open('28-hamyon'); expect((await txt('.tx .t')).length > 0, 'tx'); await click('.utabs__item', 'Sarflangan'); const vis = await p.locator('.tx .t:visible .t__v').allInnerTexts(); expect(vis.length && vis.every(v => v.startsWith('−')), vis.join(',')); });

  // N) navigatsiya: brauzer orqaga / oldinga, scroll tiklash, chetdan surish, Esc
  await step('04 scroll → 10 → brauzer orqaga: scroll tiklanadi', async () => {
    await open('04-bosh-sahifa'); await p.mouse.move(200, 400); await p.mouse.wheel(0, 900); await p.waitForTimeout(500);
    const y0 = await p.evaluate(() => scrollY); await click('.top10__item', 'Ajrashgandan'); await at('10-drama');
    await p.goBack(); await ready('04-bosh-sahifa'); await p.waitForTimeout(300);
    const y1 = await p.evaluate(() => scrollY); expect(Math.abs(y1 - y0) < 40, `${y0} → ${y1}`);
  });
  await step('brauzer oldinga → 10, ilova orqaga → 04', async () => { await p.goForward(); await ready('10-drama'); await click('[aria-label="Orqaga"]'); await at('04-bosh-sahifa'); });
  await step('chap chetdan surish → orqaga', async () => { await click('.top10__item', 'Ajrashgandan'); await at('10-drama'); await p.mouse.move(6, 420); await p.mouse.down(); await p.mouse.move(200, 425, { steps: 10 }); await p.mouse.up(); await at('04-bosh-sahifa'); });
  await step('Esc → orqaga', async () => { await click('.top10__item', 'Ajrashgandan'); await at('10-drama'); await p.keyboard.press('Escape'); await at('04-bosh-sahifa'); });
  await step('04 «Siz uchun» qatori sichqoncha bilan suriladi', async () => {
    const row = p.locator('.sec', { hasText: 'Siz uchun tavsiya' }).locator('.hscroll'); await row.scrollIntoViewIfNeeded(); const bb = await row.boundingBox();
    await p.mouse.move(330, bb.y + 60); await p.mouse.down(); await p.mouse.move(80, bb.y + 62, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(700);
    expect(await row.evaluate(e => e.scrollLeft) > 100, 'scrollLeft');
  });
  await step('04 status bar → tepaga', async () => { await p.mouse.wheel(0, 600); await p.waitForTimeout(400); await p.mouse.click(60, 22); await p.waitForTimeout(1600); expect(await p.evaluate(() => scrollY) < 5, 'scrollY'); });
  await step('klaviatura: Tab + Enter', async () => { await open('29-sozlamalar'); await p.locator('.row', { hasText: 'Mavzu' }).focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(300); expect(await p.locator('.proto-modal').count() === 1, 'oyna'); await p.keyboard.press('Escape'); await p.waitForTimeout(300); expect(await p.locator('.proto-modal').count() === 0, 'yopilmadi'); });

  // O) chiqish
  await step('29 Chiqish → tasdiq → 02, holat tozalandi', async () => { await click('.btn', 'Chiqish'); await click('.proto-modal [data-ok]'); await at('02-kirish'); const st = await p.evaluate(() => sessionStorage.getItem('drama-proto-state')); expect(st === null || st === 'null', 'holat ' + st); });

  console.log(`\noqim: ${ok} ✓, ${fail} ✗; JS xatolari: ${errs.length ? errs.join(' | ') : 'yoʻq'}`);
  await b.close();
  process.exit(fail || errs.length ? 1 : 0);
})();
