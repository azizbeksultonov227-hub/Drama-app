// Screenshots design screens. usage: node shoot.js <scale> <outDir> <file1.html> [file2.html ...]
// Prints the natural content height (bottom of .scroll-pad or last child) for long screens.
const { chromium } = require('playwright');
const path = require('path');
const [,, scale, outDir, ...files] = process.argv;
(async () => {
  const browser = await chromium.launch();
  for (const f of files) {
    const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: +scale });
    const page = await ctx.newPage();
    const msgs = [];
    page.on('console', m => msgs.push(m.text()));
    page.on('requestfailed', r => msgs.push('FAILED ' + r.url().slice(0, 90)));
    await page.goto('file://' + path.resolve(f), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const info = await page.evaluate(() => {
      const s = document.getElementById('screen') || document.querySelector('.screen');
      const pad = s.querySelector('.scroll-pad');
      const natural = pad ? Math.ceil(pad.getBoundingClientRect().bottom - s.getBoundingClientRect().top) : null;
      const fontsOk = ['Anton', 'Playfair Display', 'Inter', 'Inter Tight', 'IBM Plex Mono'].map(n => n + ':' + document.fonts.check(`16px "${n}"`));
      return { h: s.getBoundingClientRect().height, natural, fontsOk };
    });
    await page.setViewportSize({ width: 393, height: Math.ceil(info.h) });
    const name = path.basename(f, '.html') + (scale === '1' ? '' : '@' + scale + 'x') + '.png';
    await page.locator('.screen').first().screenshot({ path: path.join(outDir, name) });
    console.log(name, 'height', info.h, 'content', info.natural, info.fontsOk.join(' '), msgs.length ? '\n  ' + msgs.join('\n  ') : '');
    await ctx.close();
  }
  await browser.close();
})();
