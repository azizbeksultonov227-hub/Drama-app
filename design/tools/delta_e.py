"""5-bosqich ΔE tekshiruvi: render qilingan dizayn ↔ referens sample. usage: python3 delta_e.py  -> analysis/DELTA_E.md
Har bir yuzani referensdagi bilan bir xil fon ustida render qiladi (Playwright), 5×5 o'rtacha bilan o'lchaydi."""
import os, sys, json, subprocess, tempfile
import numpy as np
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')
sys.path.insert(0, os.path.join(ROOT, 'analysis', 'tools'))
os.chdir(os.path.join(ROOT, '..'))
from meas import load, srgb_to_lab, hx

def de76(a, b):
    return float(np.sqrt(((srgb_to_lab(np.atleast_2d(np.asarray(a, float))) - srgb_to_lab(np.atleast_2d(np.asarray(b, float)))) ** 2).sum(1)).mean())
def h2r(h): h = h.lstrip('#'); return [int(h[i:i + 2], 16) for i in (0, 2, 4)]

# ---- test sahifasi: har bir yuza alohida blokda, ref'dagi fon ustida
W6, H6 = 336, 729            # ref-06 telefon ekrani (px), k = 1.170
BLOCKS = [
    # id, w, h, fon (ref'dagi tashqi rang), ichki markup
    ('glossy', 200, 52, '#010101', '<button class="btn btn--primary" style="width:200px"></button>'),
    ('nav', 357, 55, '#000000', '<nav class="nav" style="position:static;width:357px"></nav>'),
    ('card', 357, 200, '#000000', '<div class="card" style="height:200px"></div>'),
    ('gl_back', 59, 59, '#1B1109', '<span class="gbtn gbtn--lg" style="--d-glass-lg:59px"></span>'),
    ('gl_ctrl', 54, 54, '#BD5330', '<span class="gbtn" style="--d-glass:54px;background:var(--glass-bg-strong)"></span>'),
    ('gl_chip', 112, 33, '#B13900', '<span class="chip chip--glass" style="width:112px;height:33px;background:var(--glass-chip)"></span>'),
    ('gl_frost', 54, 54, '#AF4011', '<span class="gbtn gbtn--frost" style="--d-glass:54px"></span>'),
    ('gl_frost2', 54, 54, '#642214', '<span class="gbtn gbtn--frost" style="--d-glass:54px"></span>'),
    ('flame', 60, 30, '#000000', '<span style="display:block;width:60px;height:30px;background:var(--flame)"></span>'),
    ('warm', 393, 852, '#000000', '<div class="warm" style="width:393px;height:852px"><div class="ring"></div></div>'),
]
html = ['<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="%s/tokens.css"><link rel="stylesheet" href="%s/components.css">' % (os.path.abspath(ROOT), os.path.abspath(ROOT)),
        '<style>body{margin:0;background:#000} .b{position:relative;margin:0 0 20px 0;padding:20px;display:inline-block} .grain::after,.art::after{display:none}</style></head><body>']
for bid, w, h, bg, inner in BLOCKS:
    html.append(f'<div class="b" id="{bid}" style="background:{bg}">{inner}</div><br>')
if os.environ.get('CSS_OVERRIDE'): html.append('<style>' + os.environ['CSS_OVERRIDE'] + '</style>')
html.append('</body></html>')
tmp = tempfile.mkdtemp()
open(os.path.join(tmp, 't.html'), 'w').write(''.join(html))
js = """const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 800, height: 1600 } });
  await p.goto('file://%s/t.html'); await p.waitForTimeout(300);
  const boxes = await p.evaluate(() => [...document.querySelectorAll('.b')].map(e => { const c = e.firstElementChild.getBoundingClientRect(); return [e.id, c.left, c.top, c.width, c.height]; }));
  await p.screenshot({ path: '%s/t.png', fullPage: true }); console.log(JSON.stringify(boxes)); await b.close(); })();""" % (tmp, tmp)
open(os.path.join(HERE, '_de_tmp.js'), 'w').write(js)
boxes = json.loads(subprocess.check_output(['node', os.path.join(HERE, '_de_tmp.js')]).decode())
os.remove(os.path.join(HERE, '_de_tmp.js'))
R = np.asarray(Image.open(os.path.join(tmp, 't.png')).convert('RGB')).astype(float)
B = {b[0]: b[1:] for b in boxes}
def smp(bid, fx, fy, r=2):
    x, y, w, h = B[bid]; px, py = int(x + fx * w), int(y + fy * h)
    return R[py - r:py + r + 1, px - r:px + r + 1].reshape(-1, 3).mean(0)

rows = []
def add(name, ref, got, src):
    rows.append((name, hx(ref), hx(got), de76(ref, got), src))

# 1. glossy pill: ref-01 "Following" vertikal profili (analysis/ref-01.md)
FOL = [(0.05, '#FFFFFF'), (0.16, '#ECECEC'), (0.24, '#E1E1E1'), (0.32, '#D6D6D6'), (0.40, '#CBCBCB'), (0.50, '#BEBEBE'), (0.53, '#B7B7B7'), (0.68, '#C5C5C5'), (0.79, '#CCCCCC'), (0.84, '#D7D7D7'), (0.87, '#E3E3E3'), (0.92, '#F1F1F1'), (0.95, '#F7F7F7')]
g = [de76(h2r(c), smp('glossy', .5, f, 0)) for f, c in FOL]
for f, c in FOL: add(f'Glossy pill {round(f * 100)}%', h2r(c), smp('glossy', .5, f, 0), 'ref-01 "Following"')
# 2. nav, karta, qora fon
add('Nav foni (tepa)', h2r('#1E1E1E'), smp('nav', .2, .12, 1), 'ref-01 nav → U6: liquid glass (ataylab shaffof, orqa kontent koʻrinadi)')
add('Nav foni (past)', h2r('#151515'), smp('nav', .2, .88, 1), 'ref-01 nav → U6: liquid glass (ataylab shaffof, orqa kontent koʻrinadi)')
add('Karta (o\'rta)', h2r('#141414'), smp('card', .5, .55), 'ref-01 Friend\'s box')
add('Ekran foni', h2r('#000000'), [0, 0, 0], 'ref-01')
add('Flame', h2r('#FC6532'), smp('flame', .5, .5), 'ref-07 doira (o\'lchangan)')
# 3. glass — ref'dagi bilan bir xil fon ustida
add('Glass doira (qorongʻi fonda)', h2r('#48423D'), smp('gl_back', .5, .62), 'ref-07 orqaga doira')
add('Glass doira (toʻq-sariq fonda)', h2r('#B46B5D'), smp('gl_ctrl', .5, .62), 'ref-07 "−10/+10" (blur chegarasi 4.63)')
add('Glass chip', h2r('#A55835'), smp('gl_chip', .5, .5), 'ref-06 "Recommended"')
add('Glass frost (1)', h2r('#BB8D86'), smp('gl_frost', .5, .62), 'ref-06 nav doirasi (blur chegarasi ~7)')
add('Glass frost (2)', h2r('#9C7569'), smp('gl_frost2', .5, .62), 'ref-06 nav doirasi (blur chegarasi ~7)')
# 4. iliq fon — ref-06 bilan bir xil nuqtalar (fit_warm.py maskasi)
im = load(6); X0, Y0 = 198.5, 96.5
# halqa (ekranimizdagi .ring: markaz (-314, 458) pt, r 738 pt) ref px'da: k = 1.170
RC, RR = (-314 / 1.170, 458 / 1.170), 738 / 1.170
pts = []
for y in range(110, 815, 6):
    for x in range(204, 530, 6):
        xp, yp = (x - X0) / W6, (y - Y0) / H6
        if yp < 0.065: continue                                 # status bar
        if xp < 0.24 and 0.08 < yp < 0.17: continue             # lotus logo
        if 0.18 < yp < 0.235 and xp < 0.50: continue            # "Hi, Amelia!"
        if xp > 0.78 and 0.08 < yp < 0.17: continue             # menyu doirasi
        if 0.30 < yp < 0.60 and xp > 0.38: continue             # chip / sarlavha / Listen
        if 0.58 < yp < 0.62: continue                           # progress chiziqchalari
        if 0.62 < yp < 0.83 and 0.46 < xp < 0.74: continue      # siluet
        if xp > 0.74 and yp > 0.60: continue                    # nur (siluet o'ngida)
        if yp > 0.83: continue                                  # chip'lar + nav
        if abs(np.hypot(x - X0 - RC[0], y - Y0 - RC[1]) - RR) < 14: continue   # halqa cheti (±14 px glow)
        pts.append((xp, yp, im[y - 2:y + 3, x - 2:x + 3].reshape(-1, 3).mean(0)))
ref = np.array([p[2] for p in pts]); got = np.array([smp('warm', p[0], p[1]) for p in pts])
dW = np.sqrt(((srgb_to_lab(ref) - srgb_to_lab(got)) ** 2).sum(1))
X, Y = np.array([p[0] for p in pts]) * 393, np.array([p[1] for p in pts]) * 852
sd = np.abs(np.hypot(X + 314, Y - 458) - 738)
field, halo = dW[sd > 45], dW[sd <= 45]
np.save(os.path.join(tmp, 'warm_err.npy'), np.c_[[p[0] for p in pts], [p[1] for p in pts], dW, ref, got])

out = ['# ΔE: render ↔ referens', '', '`python3 design/tools/delta_e.py` — har bir yuza referensdagi bilan bir xil fon ustida render qilinadi, 5×5 o\'rtacha, CIE76.', '',
       '| Yuza | Ref | Render | ΔE | Manba |', '|---|---|---|---|---|']
for n, a, b, d, s in rows: out.append(f'| {n} | `{a}` | `{b}` | {d:.2f} {"✓" if d < 3 else "✗"} | {s} |')
out += ['', f'**Glossy pill profili:** oʻrtacha ΔE {np.mean(g):.2f}, max {np.max(g):.2f}.', '',
        f'**Iliq fon (ref-06, {len(pts)} nuqta; `.warm` + `.ring` 393×852 da render; status bar, logo, matn, siluet, nur va halqa cheti ±14 px chiqarilgan):** oʻrtacha ΔE {dW.mean():.2f}, mediana {np.median(dW):.2f}, p90 {np.percentile(dW, 90):.2f}.', '',
        f'- Fon maydoni (halqadan > 45 pt, {len(field)} nuqta): oʻrtacha **{field.mean():.2f}**, mediana {np.median(field):.2f}', f'- Halqa nuri zonasi (≤ 45 pt, {len(halo)} nuqta): oʻrtacha {halo.mean():.2f} — fotografik nur vs CSS box-shadow (DEVIATIONS)']
open(os.path.join(ROOT, 'analysis', 'DELTA_E.md'), 'w').write('\n'.join(out) + '\n')
print('\n'.join(out))
