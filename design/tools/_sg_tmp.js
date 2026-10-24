const { chromium } = require('playwright');
const path = require('path');
const out = process.argv[2];
(async () => {
  const b = await chromium.launch();
  for (const [w, h, name] of [[1280, 900, 'sg-desk'], [393, 852, 'sg-mob']]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto('file://' + path.resolve('styleguide.html'), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(2000);
    await p.screenshot({ path: out + '/' + name + '.png', fullPage: true });
    console.log(name, errs, await p.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.scrollHeight]));
    await ctx.close();
  }
  await b.close();
})();
