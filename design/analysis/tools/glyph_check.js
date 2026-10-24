// Checks whether each font really contains U+02BB / U+02BC / U+2019 (not a fallback):
// the glyph's advance must be identical with two very different fallback stacks.
const { chromium } = require('playwright');
const fams = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const q = fams.map(f => 'family=' + f.replace(/ /g, '+')).join('&');
  await p.setContent(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${q}&display=block"><div id=x></div>`, { waitUntil: 'networkidle' });
  const res = await p.evaluate(async (fams) => {
    const out = {};
    for (const f of fams) {
      await document.fonts.load(`40px "${f}"`, 'oʻgʻʼ’');
      const r = {};
      for (const ch of ['ʻ', 'ʼ', '’', 'oʻ', 'Gʻ']) {
        const w = (fb) => { const s = document.createElement('span'); s.style.font = `100px "${f}", ${fb}`; s.textContent = ch; document.body.appendChild(s); const v = s.getBoundingClientRect().width; s.remove(); return v; };
        r[ch] = Math.abs(w('monospace') - w('serif')) < 0.01 ? 'yes' : 'NO';
      }
      out[f] = r;
    }
    return out;
  }, fams);
  console.log(JSON.stringify(res, null, 1)); await b.close();
})();
