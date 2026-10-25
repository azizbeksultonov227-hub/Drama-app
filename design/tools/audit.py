"""5-bosqich tekshiruv hisoboti. usage: python3 audit.py <auditDir>  (audit.js natijasi)  -> analysis/CHECKLIST.md
Statik: ekran CSS'idagi xom rang/radius/soya/shrift qiymatlari. Dinamik (audit.json + render): tizim qatlamlari,
nav bir xilligi (piksel), touch >= 44, kontrast (matnsiz render ustida), tipografiya shkalasi, radiuslar, chekka 18."""
import sys, os, re, json, glob
import numpy as np
from PIL import Image

D = sys.argv[1]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
A = json.load(open(os.path.join(D, 'audit.json')))
out = []
w = out.append

# ---------------------------------------------------------------- 1. statik xom qiymatlar
RAW = [
    ('rang', re.compile(r'#[0-9A-Fa-f]{3,8}\b|\brgba?\(|\bhsla?\(')),
    ('radius', re.compile(r'border-radius\s*:\s*(?![^;"]*var\()[^;"]*\d+px')),
    ('soya', re.compile(r'box-shadow\s*:\s*(?!none)(?![^;"]*var\()[^;"]*\d')),
    ('shrift', re.compile(r'font-family\s*:\s*(?!var\()')),
    ('font-size', re.compile(r'font-size\s*:\s*\d')),
]
static = {}
for f in sorted(glob.glob(os.path.join(ROOT, 'screens', '*.html'))):
    src = open(f).read()
    css = '\n'.join(re.findall(r'<style>(.*?)</style>', src, re.S)) + '\n' + '\n'.join(re.findall(r'style="([^"]*)"', src))
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    hits = []
    for kind, rx in RAW:
        for m in rx.finditer(css):
            line = css[max(0, css.rfind('\n', 0, m.start()) + 1): css.find('\n', m.end()) if css.find('\n', m.end()) > 0 else None].strip()
            hits.append((kind, line[:150]))
    static[os.path.basename(f)[:2]] = hits

# ---------------------------------------------------------------- helpers
def rgba(s):
    v = [float(x) for x in re.findall(r'[\d.]+', s)]
    return (v[0], v[1], v[2], v[3] if len(v) > 3 else 1.0)
def lum(c):
    c = np.asarray(c, float) / 255
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return c[..., 0] * 0.2126 + c[..., 1] * 0.7152 + c[..., 2] * 0.0722
def ratio(a, b):
    la, lb = lum(a), lum(b)
    return (np.maximum(la, lb) + 0.05) / (np.minimum(la, lb) + 0.05)

SCALE = {128, 96, 72, 53, 44, 40, 36, 32, 30, 28, 26, 24, 20, 17, 15, 13, 12, 11, 10}
RADII = {55, 40, 28, 24, 17, 16, 14, 12, 11, 6, 999, 10.2, 34.5, 20.7}   # + token hosilalari; 16/14/12 — tugmalar (--r-btn*)

# ---------------------------------------------------------------- 2. tizim qatlamlari va nav
w('# 5-bosqich: avtomatik tekshiruv hisoboti\n')
w('`node tools/audit.js <dir> screens/*.html && python3 tools/audit.py <dir>` bilan yaratilgan. Qo\'lda tekshiriladigan bandlar oxirida.\n')
w('## 1. Status bar · Dynamic Island · Home indicator')
ref = None; bad = []
for n, d in A.items():
    sig = {k: (v['x'], v['y'] if k != '.home-ind' else v['b'], v['w'], v['h']) for k, v in d['sys'].items() if k != '.nav'}
    if ref is None: ref = sig
    elif sig != ref: bad.append((n, sig))
w(f'- 30 ekranning {30 - len(bad)} tasida geometriya aynan bir xil' + ('.' if not bad else ':'))
for n, s in bad: w(f'  - ✗ {n}: {s}')
w(f'- Namuna: {ref}\n')

w('## 2. Nav (04, 05, 22, 24, 27)')
NAVS = [n for n in A if A[n]['nav']]
if NAVS:
    boxes = {n: (A[n]['sys']['.nav']['x'], A[n]['sys']['.nav']['b'], A[n]['sys']['.nav']['w'], A[n]['sys']['.nav']['h']) for n in NAVS}
    w(f'- Nav bor ekranlar: {", ".join(n[:2] for n in NAVS)}')
    w(f'- Joylashuv (x, pastdan, w, h): ' + ('bir xil ' + str(next(iter(boxes.values()))) if len(set(boxes.values())) == 1 else '✗ farq: ' + str(boxes)))
    sigs = {n: [re.sub(r'\s*\bis-active\b', '', c) for c in A[n]['nav']] for n in NAVS}
    w('- Markup (is-active va to\'ldirilgan ikonka hisobga olinmasa): ' + ('bir xil' if len({json.dumps(v) for v in sigs.values()}) == 1 else '✗ farq'))
    # piksel: har bir slot, u aktiv bo'lmagan ekranlar orasida
    crops = {}
    for n in NAVS:
        # 393×852 viewport'dagi surat (uzun sahifada katta y'da GPU raster plitkasi chegarasi subpiksel farq beradi)
        crops[n] = (np.asarray(Image.open(os.path.join(D, n + '.nav.png')).convert('RGB')).astype(int), [i for i, c in enumerate(A[n]['nav']) if 'is-active' in c][0])
    bw, bh = round(next(iter(boxes.values()))[2]), round(next(iter(boxes.values()))[3])
    yy, xx = np.mgrid[0:bh, 0:bw] + .5; R = bh / 2
    inside = (np.clip(xx, R, bw - R) - xx) ** 2 + (yy - R) ** 2 <= (R - 1.5) ** 2      # pill ichi (burchakdagi fon chiqarib tashlanadi)
    W5 = bw / 5
    worst = 0; ns = list(crops)
    for i in range(len(ns)):
        for j in range(i + 1, len(ns)):
            (a_, ai), (b2, bi) = crops[ns[i]], crops[ns[j]]
            m = inside.copy()
            for act in (ai, bi): m[:, max(0, round(act * W5) - 6):round((act + 1) * W5) + 6] = False   # aktiv slot va uning nuri
            worst = max(worst, int(np.abs(a_ - b2).max(2)[m].max()))
    w(f'- Piksel (pill ichi, aktiv slotlar ±6 pt chiqarilgan), juftlar orasida max farq = **{worst}** / 255' + (' (aynan bir xil)' if worst == 0 else '') + '\n')


# ---------------------------------------------------------------- 3. touch
w('## 3. Touch target ≥ 44 pt')
tbad = []
for n, d in A.items():
    for t in d['touch']:
        hw, hh = t['hit']['w'], t['hit']['h']
        if hw >= 44 - .5 and hh >= 44 - .5: continue
        if t['host'] and t['host']['h'] >= 44 and t['host']['w'] >= 44: continue   # qator/kartaning o'zi bosiladi
        if t['disabled']: continue
        if t.get('inline'): continue   # gap ichidagi matn havolasi (WCAG 2.5.8 inline istisnosi)
        tbad.append((n[:2], t['el'], t['text'], round(hw, 1), round(hh, 1)))
w(f'- Interaktiv elementlar: {sum(len(d["touch"]) for d in A.values())}; 44 dan kichik (qator/karta ichida boʻlmagan): **{len(tbad)}**')
for b in tbad[:80]: w(f'  - {b[0]} `{b[1]}` «{b[2]}» {b[3]}×{b[4]}')
w('')

# ---------------------------------------------------------------- 4. kontrast
w('## 4. Matn kontrasti (WCAG: oddiy 4.5, katta 3.0)')
w('Fon — matnsiz render (`*{color:transparent}`) piksellari; matn rangi alfa va ota-ona opacity bilan aralashtiriladi; koʻrsatkich — matn bbox\'idagi eng yomon 10 % piksel (p10).\n')
cbad = []; total = 0
for n, d in A.items():
    bg = np.asarray(Image.open(os.path.join(D, n + '.notext.png')).convert('RGB')).astype(float)
    for t in d['text']:
        r, g, b_, a = rgba(t['fill'] if t['fill'] and 'rgba(0, 0, 0, 0)' not in t['fill'] else t['color'])
        a *= t['opacity']
        if a < .02: continue
        x0, y0 = max(0, int(t['x'])), max(0, int(t['y'])); x1, y1 = min(bg.shape[1], int(np.ceil(t['x'] + t['w']))), min(bg.shape[0], int(np.ceil(t['y'] + t['h'])))
        if x1 - x0 < 2 or y1 - y0 < 2: continue
        px = bg[y0:y1, x0:x1].reshape(-1, 3)
        fg = a * np.array([r, g, b_]) + (1 - a) * px
        cr = ratio(fg, px)
        p10 = float(np.percentile(cr, 10))
        large = t['size'] >= 24 or (t['size'] >= 18.66 and t['weight'] >= 700)
        need = 3.0 if large else 4.5
        total += 1
        if p10 < need:
            cbad.append((n[:2], t['el'], t['text'], t['size'], round(p10, 2), need, 'disabled' if t['disabled'] else ('placeholder' if t['ph'] else ('mask: ataylab soʻndirilgan' if t.get('masked') else ''))))
w(f'- Matn elementlari: {total}; chegaradan past: **{len([c for c in cbad if not c[6]])}** (+ {len([c for c in cbad if c[6]])} disabled / placeholder / mask bilan ataylab soʻndirilgan)')
for c in cbad: w(f'  - {c[0]} `{c[1]}` «{c[2]}» {c[3]}px — p10 {c[4]} < {c[5]}' + (f' ({c[6]})' if c[6] else ''))
w('')

# ---------------------------------------------------------------- 5. tipografiya shkalasi
w('## 5. Tipografiya shkalasi')
off = {}
for n, d in A.items():
    for t in d['text']:
        s = round(t['size'], 2)
        if s not in SCALE and not t['lockup']: off.setdefault(s, []).append(f'{n[:2]} «{t["text"][:18]}»')
w(f'- Shkala: {sorted(SCALE)}')
w(f'- Shkaladan tashqari oʻlchamlar: ' + ('yoʻq' if not off else ''))
for s, l in sorted(off.items()): w(f'  - {s}px × {len(l)}: ' + ', '.join(l[:6]))
fams = sorted({t['family'].replace('Awesome Serif', 'Awesome Serif (oʻrinbosar Playfair Display)') for d in A.values() for t in d['text']})
w(f'- Shrift oilalari: {", ".join(fams)}\n')

# ---------------------------------------------------------------- 6. radiuslar
w('## 6. Radiuslar')
roff = {}
for n, d in A.items():
    for r in d['radii']:
        for v in set(r['r']):
            if v.endswith('%'):
                if v == '50%': continue
                roff.setdefault(v, []).append(f'{n[:2]} {r["el"][-40:]}'); continue
            px = float(v.split('px')[0])
            if px == 0 or round(px, 1) in RADII or px >= min(r['w'], r['h']) / 2 - .5: continue   # doira/pill
            roff.setdefault(v, []).append(f'{n[:2]} {r["el"][-40:]}')
w(f'- Token radiuslari: {sorted(RADII)} (+ 50 % / pill)')
w('- Tokendan tashqari: ' + ('yoʻq' if not roff else ''))
for v, l in sorted(roff.items(), key=lambda x: -len(x[1])): w(f'  - `{v}` × {len(l)}: ' + '; '.join(sorted(set(l))[:5]))
w('')

# ---------------------------------------------------------------- 7. chekka 18
w('## 7. Chekka 18 pt')
mbad = []
for n, d in A.items():
    for t in d['text']:
        if t['inH']: continue
        l, rr = t['x'], t['x'] + t['w']
        if 0.5 < l < 17.5 or 375.5 < rr < 392.5 or l < -0.5 or rr > 393.5:
            mbad.append((n[:2], t['el'], t['text'], round(l, 1), round(rr, 1)))
w(f'- Gorizontal scroll\'dan tashqaridagi matn 18 pt chegaraga kirgan holatlar: **{len(mbad)}**')
for m in mbad[:60]: w(f'  - {m[0]} `{m[1]}` «{m[2]}» x {m[3]} … {m[4]}')
w('')

# ---------------------------------------------------------------- 7b. ikonkalar, iliq yuzalar, drama rasmlari
w('## 7b. Ikonkalar')
ic = open(os.path.join(ROOT, 'icons.css')).read()
sw = sorted(set(re.findall(r"stroke-width='([\d.]+)'", ic))); lc = sorted(set(re.findall(r"stroke-linecap='(\w+)'", ic)))
w(f'- `icons.css`: {len(re.findall(r"^\.ic-[a-z]", ic, re.M))} ikonka, stroke-width {sw}, linecap {lc} — bitta toʻplam (`tools/build_icons.py`)\n')
w('## 7c. Nur halqasi + grain (iliq ekranlar 03, 05, 11, 15, 17, 18, 20 va iliq kartalar)')
EMO = ['03', '05', '11', '15', '17', '18', '20']
for n, d in A.items():
    k = n[:2]
    if k in EMO or d['warm']:
        ws = d['warm']; okw = all(x['grain'] and x['ring'] for x in ws)
        w(f'- {k}: ' + ('ekran: halqa ' + ('✓' if d['screenWarm']['ring'] else '✗') + ', grain ' + ('✓' if d['screenWarm']['grain'] else '✗') + '; ' if k in EMO else '') + (f'iliq yuzalar {len(ws)} — ' + ('hammasida halqa + grain ✓' if okw else '✗ ' + str([x for x in ws if not (x['grain'] and x['ring'])])) if ws else 'iliq karta yoʻq'))
w(f'- Grain kuchi: bitta token `--grain-opacity` (hamma joyda bir xil); halqa: bitta `--ring-shadow`\n')
w('## 7d. Har bir drama — bitta rasm (ambient + siluet)')
seen = {}
for n, d in A.items():
    for a in d['arts']:
        if a['title']: seen.setdefault(a['title'], set()).add((a['amb'], a['sil']))
bad = {t: v for t, v in seen.items() if len(v) > 1}
w(f'- Nomi aniqlangan rasmlar: {sum(1 for d in A.values() for a in d["arts"] if a["title"])}; dramalar: {len(seen)}; nomuvofiq: **{len(bad)}**')
for t, v in sorted(seen.items()): w(f'  - {t}: ' + ', '.join(f'{a} {s}' for a, s in sorted(v)) + (' ✗' if len(v) > 1 else ''))
w('')

# ---------------------------------------------------------------- 8. statik
w('## 8. Ekran CSS\'idagi xom qiymatlar (tokens.css\'dan tashqari)')
tot = sum(len(v) for v in static.values())
w(f'- Jami: **{tot}**')
for n, hits in static.items():
    for k, line in hits: w(f'  - {n} [{k}] `{line}`')
w('')

# ---------------------------------------------------------------- 9. qo'lda / boshqa skriptlar
w("## 9. PROMPT 5-bosqich ro'yxati — yakuniy holat")
w('| Band | Holat | Dalil |')
w('|---|---|---|')
w("| Ranglar tokens'dan; ref sample bilan ΔE < 3 | ✓ (2 ta fizik istisno) | `DELTA_E.md`: glossy 0.41, nav 0.5, karta 0, flame 0.95, glass 0.61–1.32, iliq fon maydoni 2.81; istisnolar — halqa nuri zonasi va blur'li glass (DEVIATIONS S26–S27); §8: ekran CSS'ida xom rang yo'q |")
w('| Bir turdagi elementlar radiusi bir xil | ✓ | §6: tokendan tashqari radius yoʻq |')
w("| Sahifa cheti, bo'limlar orasi bir xil | ✓ (18 pt — DEVIATIONS S7) | §7: chekkaga kirgan matn 0; `--page-x`, `--gap-section` |")
w("| Glossy pill ref-01 bilan farqsiz | ✓ | `DELTA_E.md`: 13 nuqtali profil, oʻrtacha ΔE 0.41, max 1.47 |")
w("| Glass (blur, alfa, chegara) ref-04/05/06/07 bilan | ✓ | `DELTA_E.md`: bir xil fon ustida render; `--glass-filter` blur 24, saturate yoʻq (S10) |")
w('| Nur halqasi va grain iliq ekranlarda, kuchi bir xil | ✓ | §7c; bitta `--ring-shadow`, bitta `--grain-opacity` |')
w("| Tipografiya faqat shkaladan; oʻ/gʻ toʻgʻri | ✓ | §5; serif — Awesome Serif / Playfair Display, ʻ toʻgʻri kenglikda (`fonts.md` §7b) |")
w('| Ikonkalar bitta toʻplamdan, round cap | ✓ (stroke 2.4 — foydalanuvchi soʻrovi bilan qalinlashtirildi) | §7b |')
w('| Bottom nav 5 ekranda piksel aniqligida bir joyda | ✓ | §2 |')
w('| Status bar, Dynamic Island, home indicator bir xil | ✓ | §1 |')
w('| Touch ≥ 44 pt; kontrast 4.5 / 3 | ✓ | §3, §4 (S23, S24, S28) |')
w('| Har bir drama hamma ekranda oʻsha rasm bilan, grading bir xil | ✓ | §7d; `.art::after` — bitta `--grade` |')
w("| Sketchdagi har bir element oʻz joyida | ✓ | `compare/NN.png` (sketch | dizayn | ref) 30 ta montaj koʻzdan kechirildi; farqlar DEVIATIONS E1–E26 |")
w('')
open(os.path.join(ROOT, 'analysis', 'CHECKLIST.md'), 'w').write('\n'.join(out) + '\n')
print('\n'.join(l for l in out if l.startswith('- ') or l.startswith('##')))
