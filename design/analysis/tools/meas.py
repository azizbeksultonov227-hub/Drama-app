"""Measurement helpers for the reference analysis (Pillow + numpy only)."""
import numpy as np
from PIL import Image

REFS = {
    1: 'references/ref-01-letterboxd.webp',
    2: 'references/ref-02-netflix.webp',
    3: 'references/ref-03-art-events.png',
    4: 'references/ref-04-glass-social.webp',
    5: 'references/ref-05-luma-overview.png',
    6: 'references/ref-06-luma-home.png',
    7: 'references/ref-07-luma-player-styleguide.png',
}

def load(n):
    return np.asarray(Image.open(REFS[n]).convert('RGB')).astype(np.float64)

def hx(rgb):
    r, g, b = [int(round(max(0, min(255, c)))) for c in rgb]
    return '#%02X%02X%02X' % (r, g, b)

def sample(img, x, y, r=2):
    """Mean colour of a (2r+1)^2 patch (5x5 by default)."""
    p = img[int(y) - r:int(y) + r + 1, int(x) - r:int(x) + r + 1].reshape(-1, 3)
    return p.mean(0)

def s(img, x, y, r=2):
    return hx(sample(img, x, y, r))

def lum(rgb):
    rgb = np.asarray(rgb, dtype=np.float64)
    return 0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]

def row(img, y, x0, x1):
    return img[int(y), int(x0):int(x1)]

def col(img, x, y0, y1):
    return img[int(y0):int(y1), int(x)]

def kmeans(img, k=10, n=40000, iters=40, seed=1, mask=None):
    px = img.reshape(-1, 3) if mask is None else img[mask]
    rng = np.random.default_rng(seed)
    px = px[rng.choice(len(px), min(n, len(px)), replace=False)]
    # k-means++ init
    c = [px[rng.integers(len(px))]]
    for _ in range(1, k):
        d = np.min(((px[:, None] - np.array(c)[None]) ** 2).sum(-1), 1)
        c.append(px[rng.choice(len(px), p=d / d.sum())])
    c = np.array(c)
    for _ in range(iters):
        lab = np.argmin(((px[:, None] - c[None]) ** 2).sum(-1), 1)
        nc = np.array([px[lab == i].mean(0) if (lab == i).any() else c[i] for i in range(k)])
        if np.allclose(nc, c):
            break
        c = nc
    share = np.bincount(lab, minlength=k) / len(lab)
    order = np.argsort(-share)
    return [(hx(c[i]), round(float(share[i]) * 100, 1)) for i in order]

def alpha_over(fg, bg, comp):
    """Solve comp = a*fg + (1-a)*bg for a (per channel mean)."""
    fg, bg, comp = map(lambda v: np.asarray(v, float), (fg, bg, comp))
    d = fg - bg
    m = np.abs(d) > 8
    return float(np.mean((comp[m] - bg[m]) / d[m])) if m.any() else float('nan')

def srgb_to_lab(rgb):
    c = np.asarray(rgb, float) / 255
    c = np.where(c > 0.04045, ((c + 0.055) / 1.055) ** 2.4, c / 12.92)
    M = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = c @ M.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)

def deltaE(a, b):
    return float(np.linalg.norm(srgb_to_lab(a) - srgb_to_lab(b)))

def hex2rgb(h):
    h = h.lstrip('#')
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float)

def zoom(n, box, scale, out):
    im = Image.open(REFS[n]).convert('RGB').crop(box)
    im = im.resize((im.width * scale, im.height * scale), Image.NEAREST)
    im.save(out)
    return out

def edges(vals, thr):
    """Indices where |diff| of a 1-D luminance profile exceeds thr."""
    d = np.abs(np.diff(vals))
    return list(np.where(d > thr)[0])

def extent(img, axis, fixed, a, b, thr=12, ref=None):
    """Scan a line (axis='x': along row y=fixed; axis='y': along column x=fixed)
    from a to b; return (first, last) index whose colour differs from the colour
    at `a` (or `ref`) by more than thr (max channel diff). Sub-pixel by half step."""
    line = img[int(fixed), int(a):int(b)] if axis == 'x' else img[int(a):int(b), int(fixed)]
    base = line[0] if ref is None else np.asarray(ref, float)
    d = np.abs(line - base).max(1)
    idx = np.where(d > thr)[0]
    if len(idx) == 0:
        return None
    return (int(a) + idx[0], int(a) + idx[-1])

def _cross(vals, lo, hi):
    """Sub-pixel index where a monotone-ish profile first crosses the midpoint
    between lo (outside) and hi (inside)."""
    mid = (lo + hi) / 2.0
    s = np.sign(hi - lo)
    for i in range(len(vals)):
        if s * (vals[i] - mid) >= 0:
            if i == 0:
                return 0.0
            a, b = vals[i - 1], vals[i]
            return i - 1 + (mid - a) / (b - a) if b != a else float(i)
    return float('nan')

def corner_radius(img, corner, x_edge, y_edge, span, out_l, in_l):
    """Fit the radius (px) of a rounded corner.
    corner: 'tl','tr','bl','br'. x_edge/y_edge: pixel-index position of the
    straight edges (e.g. 205.5 = boundary between px 205 and 206).
    span: px sampled along the edge. out_l/in_l: luminance outside/inside."""
    L = lum(img)
    pts = []
    sy = 1 if corner in ('tl', 'tr') else -1
    sx = 1 if corner in ('tl', 'bl') else -1
    for i in range(span):
        y = int(np.floor(y_edge + 0.5)) + i if sy > 0 else int(np.floor(y_edge + 0.5)) - 1 - i
        t = abs((y + 0.5) - (y_edge + 0.5))
        x0 = int(np.floor(x_edge + 0.5))
        if sx > 0:
            prof = L[y, x0 - 3:x0 + span + 3]
            c = _cross(prof, out_l, in_l)            # index of boundary between px
            e = (x0 - 3 + c + 0.5) - (x_edge + 0.5)
        else:
            prof = L[y, x0 - span - 3:x0 + 3][::-1]   # walks leftwards from x0+2
            c = _cross(prof, out_l, in_l)
            e = (x_edge + 0.5) - ((x0 + 2) - c + 0.5)
        pts.append((t, e))
    pts = np.array([p for p in pts if np.isfinite(p[1])])
    best = None
    for R in np.arange(1.0, span, 0.25):
        t = pts[:, 0]
        model = np.where(t < R, R - np.sqrt(np.maximum(0, R ** 2 - (R - t) ** 2)), 0.0)
        err = np.mean((model - pts[:, 1]) ** 2)
        if best is None or err < best[1]:
            best = (R, err)
    return round(float(best[0]), 2), round(float(best[1]), 3), pts

def text_metrics(img, box, light=True, thr=None):
    """Ink metrics of a single text line inside box=(x0,y0,x1,y1).
    Returns dict: top, baseline, cap(px), xh(px, estimate), color (hex of
    the 10% most extreme ink pixels), bg (median of non-ink)."""
    x0, y0, x1, y1 = box
    sub = img[y0:y1, x0:x1]
    L = lum(sub)
    bgv = np.median(L)
    ext = L.max() if light else L.min()
    t = thr if thr is not None else (bgv + ext) / 2
    ink = L > t if light else L < t
    rows = ink.sum(1)
    if rows.max() == 0:
        return None
    on = np.where(rows > 0)[0]
    top, bot = on[0], on[-1]
    dens = rows / rows.max()
    body = np.where(dens > 0.25)[0]
    base = body[-1]
    # x-height: first row from top where density exceeds 45% of the body peak
    xh_top = np.where(dens > 0.45)[0][0]
    pix = sub[ink]
    lp = lum(pix)
    sel = pix[lp >= np.percentile(lp, 90)] if light else pix[lp <= np.percentile(lp, 10)]
    cols = np.where(ink.sum(0) > 0)[0]
    return dict(top=y0 + top, base=y0 + base, bottom=y0 + bot, cap=base - top + 1,
                xh=base - xh_top + 1, left=x0 + cols[0], right=x0 + cols[-1],
                color=hx(sel.mean(0)), bg=hx(np.median(sub[~ink], 0)))

def grain(img, box):
    """High-pass noise: std of (L - 3x3 box blur) inside box, plus raw std."""
    x0, y0, x1, y1 = box
    L = lum(img[y0 - 1:y1 + 1, x0 - 1:x1 + 1])
    blur = sum(L[1 + dy:L.shape[0] - 1 + dy, 1 + dx:L.shape[1] - 1 + dx]
               for dy in (-1, 0, 1) for dx in (-1, 0, 1)) / 9.0
    hp = L[1:-1, 1:-1] - blur
    return round(float(hp.std()), 2), round(float(L[1:-1, 1:-1].std()), 2), round(float(L[1:-1, 1:-1].mean()), 1)
