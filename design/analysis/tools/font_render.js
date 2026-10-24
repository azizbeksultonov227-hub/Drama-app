// Renders text samples in candidate Google Fonts to PNG (black on white) for IoU comparison.
// usage: node font_render.js <jobs.json> <outdir>
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const [,, jobsFile, outDir] = process.argv;
const jobs = JSON.parse(fs.readFileSync(jobsFile, 'utf8'));
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 2400, height: 400 }, deviceScaleFactor: 1 });
  for (const j of jobs) {
    const fam = j.family.replace(/ /g, '+');
    const axis = j.weight ? `:wght@${j.weight}` : '';
    const ital = j.italic ? ':ital@1' : '';
    const href = `https://fonts.googleapis.com/css2?family=${fam}${axis || ital}&display=block`;
    const html = `<!doctype html><html><head><link rel="stylesheet" href="${href}">
      <style>body{margin:0;background:#fff}#t{position:absolute;left:40px;top:40px;font-family:'${j.family}';
      font-weight:${j.weight||400};font-size:${j.size||200}px;line-height:1.3;letter-spacing:${j.ls||0}em;white-space:pre;color:#000;
      ${j.transform ? 'text-transform:' + j.transform + ';' : ''}}</style></head>
      <body><span id="t">${j.text.replace(/</g,'&lt;')}</span></body></html>`;
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const ok = await page.evaluate((f) => document.fonts.check(`200px "${f}"`), j.family);
    const out = path.join(outDir, j.id + '.png');
    const el = await page.$('#t');
    await el.screenshot({ path: out });
    console.log(j.id, ok ? 'ok' : 'FONT-NOT-LOADED');
  }
  await browser.close();
})();
