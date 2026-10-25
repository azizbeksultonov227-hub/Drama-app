// Prototip oqim testi: node tools/flow_test.js  — har bir qadamda bosiladi va kutilgan ekran tekshiriladi
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const base = 'file://' + path.resolve('screens') + '/';
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 393, height: 852 } });
  await ctx.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(p.url().split('/').pop() + ': ' + e.message));
  // 1) har bir ekran xatosiz yuklanadi
  for (const f of fs.readdirSync('screens').sort()) { await p.goto(base + f + '?reset=1'); await p.waitForFunction(() => window.__dramaProto, null, { timeout: 30000 }).catch(() => errs.push(f + ': app.js ishga tushmadi')); }
  const here = () => decodeURIComponent(p.url().split('/').pop().split('?')[0]).replace('.html', '');
  let ok = 0, fail = 0;
  const step = async (desc, action, expect) => {
    try { process.stdout.write('· ' + desc + '\n'); await action(); if (expect) await p.waitForURL(u => u.toString().includes(expect + '.html'), { timeout: 60000, waitUntil: 'commit' }); await p.waitForFunction(() => window.__dramaProto, null, { timeout: 90000 }); await p.waitForTimeout(150); ok++; }
    catch (e) { fail++; console.log('✗', desc, '— hozir:', here(), e.message.split('\n')[0]); }
  };
  const click = (sel, text) => async () => { const loc = text ? p.locator(sel, { hasText: text }).first() : p.locator(sel).first(); await loc.click({ force: true }); };
  await p.goto(base + '01-onboarding.html?reset=1'); await p.waitForFunction(() => window.__dramaProto);
  await step('janr tanlash', async () => { await click('.list li', 'Boʻri va vampir')(); const t = await p.locator('.cap').innerText(); if (!t.includes('4 / 15')) throw new Error('cap: ' + t); });
  await step('01 → 02', click('.cta'), '02-kirish');
  await step('02 → 03', click('.btn', 'Telefon raqam'), '03-sovga');
  await step('03 → 04', click('.btn', 'Sovgʻani olish'), '04-bosh-sahifa');
  await step('04 poster → 10', click('.poster'), '10-drama');
  await step('10 → 11', click('.btn', 'Davom ettirish'), '11-pleer');
  await step('11 pauza', async () => { await click('.play')(); const l = await p.locator('.play').getAttribute('aria-label'); if (l !== 'Ijro') throw new Error('label ' + l); });
  await step('11 → 12', click('.chip', 'Qismlar'), '12-qismlar');
  await step('12 qulf → 16', click('.ep--locked'), '16-paywall');
  await step('16 paket → 19', click('.pack'), '19-tolov');
  await step('19 usul tanlash', async () => { await click('.m', 'Click')(); const t = await p.locator('.pay').innerText(); if (!t.includes('Click')) throw new Error(t); });
  await step('19 toʻlash → 11', click('.pay'), '11-pleer');
  await step('11 orqaga → 10', click('[aria-label="Orqaga"]'), '10-drama');
  await step('10 orqaga → 04', click('[aria-label="Orqaga"]'), '04-bosh-sahifa');
  await step('04 nav Profil → 27', click('.nav__item', 'Profil'), '27-profil');
  await step('27 Hamyon → 28', click('.menu .row', 'Hamyon'), '28-hamyon');
  await step('28 → 17', click('.btn', 'Coin toʻldirish'), '17-coin-dokoni');
  await step('17 → 18', click('.vipb'), '18-vip');
  await step('18 tarif', async () => { await click('.plan', 'Yillik')(); const t = await p.locator('.cta').innerText(); if (!t.includes('/ yil')) throw new Error(t); });
  await step('18 yopish → 17', click('[aria-label="Yopish"]'), '17-coin-dokoni');
  await step('17 orqaga → 28', click('[aria-label="Orqaga"]'), '28-hamyon');
  await step('28 orqaga → 27', click('[aria-label="Orqaga"]'), '27-profil');
  await step('27 Yordam → 30', click('.menu .row', 'Yordam'), '30-yordam');
  await step('30 akkordeon', async () => { await click('.q', 'VIP obunani')(); if (!(await p.locator('.a', { hasText: 'Obunani boshqarish' }).isVisible())) throw new Error('javob yoʻq'); });
  await step('30 orqaga → 27', click('[aria-label="Orqaga"]'), '27-profil');
  await step('nav Mukofot → 22', click('.nav__item', 'Mukofot'), '22-mukofotlar');
  await step('22 check-in', async () => { await click('.ci .btn--primary')(); const t = await p.locator('.ci .btn--primary').innerText(); if (!t.includes('Ertaga')) throw new Error(t); });
  await step('22 → 23', click('.invite .btn'), '23-dost-taklif');
  await step('23 orqaga → 22', click('[aria-label="Orqaga"]'), '22-mukofotlar');
  await step('nav Lenta → 05', click('.nav__item', 'Lenta'), '05-lenta');
  await step('05 svayp', async () => { const a = await p.locator('.info h1').innerText(); await p.mouse.move(200, 400); await p.mouse.wheel(0, 120); await p.waitForTimeout(700); const c = await p.locator('.info h1').innerText(); if (a === c) throw new Error('oʻzgarmadi'); });
  await step('05 → 13', async () => { await p.locator('.rail .gbtn').nth(2).click({ force: true }); }, '13-izohlar');
  await step('13 yopish → 05', click('[aria-label="Yopish"]'), '05-lenta');
  await step('nav Roʻyxatim → 24', click('.nav__item', 'Roʻyxatim'), '24-royxatim');
  await step('24 → 25', click('.utabs__item', 'Yuklanganlar'), '25-yuklanganlar');
  await step('25 orqaga → 24', click('[aria-label="Orqaga"]'), '24-royxatim');
  await step('24 → 15', click('.poster', 'Tugatilgan'), '15-serial-tugadi');
  await step('15 → 04', click('[aria-label="Yopish"]'), '04-bosh-sahifa');
  await step('04 → 26', click('[aria-label="Bildirishnomalar"]'), '26-bildirishnomalar');
  await step('26 → 20', click('.nt', 'Faqat bugun'), '20-maxsus-taklif');
  await step('20 → 26', click('.btn--text', 'Yoʻq'), '26-bildirishnomalar');
  await step('26 orqaga → 04', click('[aria-label="Orqaga"]'), '04-bosh-sahifa');
  await step('04 → 06', click('[aria-label="Qidiruv"]'), '06-qidiruv');
  await step('06 → 07', click('.genre'), '07-janrlar');
  await step('07 → 10', click('.res'), '10-drama');
  await step('10 → 16 (qulf)', click('.ep--locked'), '16-paywall');
  await step('16 → 21', click('.btn', 'Koʻrish'), '21-reklama');
  await step('21 taymer (15 s) → orqaga', async () => { await p.waitForTimeout(17500); }, '16-paywall');
  console.log(`oqim: ${ok} ✓, ${fail} ✗; JS xatolari: ${errs.length ? errs.join(' | ') : 'yoʻq'}`);
  await b.close();
})();
