// Measures text widths for given font specs (used to size justified Anton title lockups).
// usage: node measure_text.js '<json array of {text,font}>'
const { chromium } = require('playwright');
(async () => {
  const items = JSON.parse(process.argv[2]);
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Gelasio:wght@400;500&family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@400&family=IBM+Plex+Mono&display=block">`, { waitUntil: 'networkidle' });
  const r = await p.evaluate(async (items) => {
    await document.fonts.ready;
    const out = [];
    for (const it of items) {
      await document.fonts.load(it.font, it.text);
      const s = document.createElement('span'); s.style.font = it.font; s.style.whiteSpace = 'pre'; s.textContent = it.text;
      if (it.ls) s.style.letterSpacing = it.ls;
      document.body.appendChild(s); out.push({ text: it.text, font: it.font, w: +s.getBoundingClientRect().width.toFixed(2) }); s.remove();
    }
    return out;
  }, items);
  console.log(JSON.stringify(r)); await b.close();
})();
