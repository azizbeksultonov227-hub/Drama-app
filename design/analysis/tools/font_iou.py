"""Compare reference text crops with candidate Google Fonts by mask IoU.
usage: python3 font_iou.py  (renders via font_render.js, writes fonts_iou.json)"""
import sys, os, json, subprocess
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from meas import load, lum

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.environ.get('FONT_TMP', '/tmp'), 'font_iou')
os.makedirs(OUT, exist_ok=True)

SAMPLES = {
  'supreme':  dict(ref=1, box=(300, 326, 430, 374), light=True, text='SUPREME',
                   fonts=[('Anton',400),('Bebas Neue',400),('League Gothic',400),('Oswald',700),('Antonio',700),
                          ('Big Shoulders Display',900),('Six Caps',400),('Fjalla One',400),('Saira Extra Condensed',900),
                          ('Barlow Condensed',800),('Teko',700),('Archivo Narrow',700)]),
  'marty':    dict(ref=1, box=(300, 248, 430, 322), light=True, text='MARTY',
                   fonts=[('Anton',400),('Bebas Neue',400),('League Gothic',400),('Oswald',700),('Antonio',700),
                          ('Big Shoulders Display',900),('Six Caps',400),('Saira Extra Condensed',900),('Barlow Condensed',800)]),
  'sarah':    dict(ref=1, box=(755, 406, 915, 450), light=True, text='sarah.lg',
                   fonts=[('Instrument Serif',400),('Gelasio',400),('Libre Baskerville',400),('Source Serif 4',400),
                          ('Newsreader',400),('Playfair Display',400),('DM Serif Display',400),('Lora',400),
                          ('Crimson Pro',400),('Libre Caslon Text',400),('EB Garamond',400),('PT Serif',400),('Noto Serif',400)]),
  'beating':  dict(ref=1, box=(296, 706, 460, 734), light=True, text='Beating Hearts',
                   fonts=[('Inter',700),('Roboto',700),('Manrope',700),('DM Sans',700),('Figtree',700),('Instrument Sans',700),
                          ('Geist',700),('Noto Sans',700),('Open Sans',700)]),
  'meditation': dict(ref=6, box=(340, 400, 500, 432), light=True, text='Meditation',
                   fonts=[('Inter',400),('Noto Sans',400),('Open Sans',400),('Nunito Sans',400),('Mulish',400),('Figtree',400),
                          ('DM Sans',400),('Roboto',400),('Manrope',400)]),
  'artexib':  dict(ref=3, box=(47, 137, 185, 165), light=False, text='art exibitions',
                   fonts=[('Inter Tight',400),('Inter',400),('Manrope',400),('Hanken Grotesk',400),('Schibsted Grotesk',400),
                          ('Instrument Sans',400),('Geist',400),('Archivo',400),('Figtree',400)]),
  'upcoming': dict(ref=3, box=(493, 418, 660, 448), light=False, text='upcoming',
                   fonts=[('Inter Tight',400),('Inter',400),('Manrope',400),('Hanken Grotesk',400),('Schibsted Grotesk',400),
                          ('Instrument Sans',400),('Geist',400),('Archivo',400),('Figtree',400)]),
}


UI = [('Inter',None),('Roboto',None),('Figtree',None),('Instrument Sans',None),('Geist',None),('Open Sans',None),('Noto Sans',None),('DM Sans',None)]
def ui(w): return [(f, w) for f, _ in UI]
SAMPLES2 = {
  'addwatch': dict(ref=1, box=(270, 444, 380, 468), light=False, text='Add to watchlist', fonts=ui(600)),
  'friends':  dict(ref=1, box=(215, 628, 300, 650), light=True, text="Friend’s box", fonts=ui(400)),
  'recent':   dict(ref=1, box=(674, 738, 770, 756), light=True, text='Recent activity', fonts=ui(400)),
  'johnwick': dict(ref=1, box=(764, 800, 892, 824), light=True, text='John Wick 3', fonts=ui(700)),
  'results':  dict(ref=4, box=(68, 345, 175, 376), light=True, text='Results', fonts=ui(600)),
  'collect':  dict(ref=4, box=(68, 390, 168, 414), light=True, text='Collections', fonts=ui(400)),
  'solana':   dict(ref=4, box=(98, 272, 255, 300), light=True, text='Solana Monkeys', fonts=ui(400)),
  'relief':   dict(ref=6, box=(340, 368, 428, 400), light=True, text='Relief', fonts=ui(400)),
  'takedeep': dict(ref=7, box=(53, 564, 222, 588), light=True, text='Take a deep breath...', fonts=ui(400)),
}

TRACK = [0, -0.01, -0.02, -0.03]
SAMPLES3 = {k: dict(v, fonts=[('Inter', v['fonts'][0][1])]) for k, v in SAMPLES2.items() if v['ref'] in (1, 4)}

def ref_mask(n, box, light):
    im = load(n)
    x0, y0, x1, y1 = box
    L = lum(im[y0:y1, x0:x1])
    bg = np.median(L)
    ext = L.max() if light else L.min()
    t = (bg + ext) / 2
    m = L > t if light else L < t
    ys, xs = np.where(m)
    return m[ys.min():ys.max() + 1, xs.min():xs.max() + 1]

def cand_mask(path):
    a = np.asarray(Image.open(path).convert('L')).astype(float)
    m = a < 128
    ys, xs = np.where(m)
    return a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]

def iou(refm, cgray, free_x=False):
    h, w = refm.shape
    ch, cw = cgray.shape
    if free_x:
        nw = w
    else:
        nw = max(1, int(round(cw * h / ch)))
    img = Image.fromarray(cgray.astype(np.uint8)).resize((nw, h), Image.LANCZOS)
    cm = np.asarray(img).astype(float) < 128
    W = max(w, nw)
    A = np.zeros((h, W), bool); B = np.zeros((h, W), bool)
    A[:, :w] = refm; B[:, :nw] = cm
    inter = (A & B).sum(); uni = (A | B).sum()
    return inter / uni, nw / w

def main_track():
    jobs = []
    for key, sp in SAMPLES3.items():
        for t in TRACK:
            jobs.append(dict(id=f"trk_{key}_{t}", family='Inter', weight=sp['fonts'][0][1], text=sp['text'], size=200, ls=t))
    jf = os.path.join(OUT, 'jobs_trk.json'); json.dump(jobs, open(jf, 'w'))
    subprocess.run(['node', os.path.join(HERE, 'font_render.js'), jf, OUT], check=True, stdout=subprocess.DEVNULL)
    out = {}
    for key, sp in SAMPLES3.items():
        refm = ref_mask(sp['ref'], sp['box'], sp['light'])
        row = []
        for t in TRACK:
            u, wr = iou(refm, cand_mask(os.path.join(OUT, f"trk_{key}_{t}.png")))
            row.append((t, round(float(u), 3), round(float(wr), 3)))
        out[key] = row
        print(key, row)
    json.dump(out, open(os.path.join(HERE, '..', 'fonts_inter_tracking.json'), 'w'), indent=1)

def main():
    jobs = []
    S = SAMPLES2 if os.environ.get('SET2') else SAMPLES
    for key, sp in S.items():
        for fam, wt in sp['fonts']:
            jobs.append(dict(id=f"{key}__{fam.replace(' ', '_')}_{wt}", family=fam, weight=wt, text=sp['text'], size=200))
    jf = os.path.join(OUT, 'jobs.json')
    json.dump(jobs, open(jf, 'w'))
    if not os.environ.get('SKIP_RENDER'):
        subprocess.run(['node', os.path.join(HERE, 'font_render.js'), jf, OUT], check=True)
    res = {}
    for key, sp in S.items():
        refm = ref_mask(sp['ref'], sp['box'], sp['light'])
        rows = []
        for fam, wt in sp['fonts']:
            p = os.path.join(OUT, f"{key}__{fam.replace(' ', '_')}_{wt}.png")
            cg = cand_mask(p)
            u, wr = iou(refm, cg)
            fx, _ = iou(refm, cg, free_x=True)
            rows.append(dict(font=fam, weight=wt, iou=round(float(u), 3), iou_free_x=round(float(fx), 3), width_ratio=round(float(wr), 3)))
        rows.sort(key=lambda r: -r['iou'])
        res[key] = dict(ref=sp['ref'], box=sp['box'], text=sp['text'], ref_px=list(refm.shape), results=rows)
        print('\n==', key, sp['text'], 'ref mask', refm.shape)
        for r in rows:
            print(f"  {r['font']:24s} {r['weight']}  IoU {r['iou']:.3f}  IoU(free-x) {r['iou_free_x']:.3f}  width ratio {r['width_ratio']:.2f}")
    json.dump(res, open(os.path.join(HERE, '..', 'fonts_iou%s.json' % ('_ui' if os.environ.get('SET2') else '')), 'w'), indent=1)

if __name__ == '__main__':
    main_track() if os.environ.get('TRACK') else main()
