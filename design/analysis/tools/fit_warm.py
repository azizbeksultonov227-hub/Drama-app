"""Fit a CSS radial-gradient (ellipse, center, stops) to the ref-06 Luma background."""
import sys, os, json
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
from meas import load, srgb_to_lab, hx
im = load(6)
X0, Y0, W, H = 198.5, 96.5, 336, 729
# sample grid, skip UI (text/chip/pill/nav), skip light-ring rim and outside-ring corner
pts = []
for y in range(110, 815, 6):
    for x in range(204, 530, 6):
        xp, yp = (x - X0) / W, (y - Y0) / H
        if 0.30 < yp < 0.60 and xp > 0.38: continue      # chip/title/listen block
        if yp < 0.24 and xp > 0.78: continue             # menu circle + ring outside
        if 0.18 < yp < 0.23 and xp < 0.45: continue      # greeting
        if yp > 0.83: continue                            # chips + nav
        if xp > 0.86 and 0.2 < yp < 0.35: continue        # ring rim
        if 0.62 < yp < 0.83 and 0.40 < xp < 0.62: continue  # silhouette
        if xp > 0.78 and yp > 0.62: continue              # light beam
        c = im[y - 2:y + 3, x - 2:x + 3].reshape(-1, 3).mean(0)
        pts.append((xp, yp, c))
P = np.array([[p[0], p[1]] for p in pts]); C = np.array([p[2] for p in pts]); Lab = srgb_to_lab(C)
best = None
for cx in np.arange(0.7, 1.21, 0.05):
    for cy in np.arange(0.6, 1.11, 0.05):
        for rx in np.arange(0.9, 1.81, 0.1):
            for ry in np.arange(0.6, 1.31, 0.1):
                t = np.sqrt(((P[:, 0] - cx) / rx) ** 2 + ((P[:, 1] - cy) / ry * (H / W) * (W / H)) ** 2)
                # piecewise-linear colour vs t via binning
                bins = np.linspace(0, t.max() + 1e-6, 9)
                idx = np.digitize(t, bins) - 1
                pred = np.zeros_like(Lab)
                ok = True
                for b in range(8):
                    m = idx == b
                    if m.sum() < 3: continue
                    pred[m] = Lab[m].mean(0)
                err = np.sqrt(((pred - Lab) ** 2).sum(1)).mean()
                if best is None or err < best[0]:
                    best = (err, cx, cy, rx, ry)
err, cx, cy, rx, ry = best
t = np.sqrt(((P[:, 0] - cx) / rx) ** 2 + ((P[:, 1] - cy) / ry) ** 2)
order = np.argsort(t)
stops = []
for q in np.linspace(0, 1, 7):
    lo, hi = np.quantile(t, max(0, q - 0.08)), np.quantile(t, min(1, q + 0.08))
    m = (t >= lo) & (t <= hi)
    stops.append((round(float(np.quantile(t, q)), 3), hx(C[m].mean(0))))
print('mean dE (binned model):', round(err, 2), ' center', round(cx, 2), round(cy, 2), ' radii', round(rx, 2), round(ry, 2))
tmax = t.max()
css = ', '.join(f"{c} {round(tt / tmax * 100)}%" for tt, c in stops)
print('stops (t, colour):', stops)
print(f"CSS: radial-gradient({round(rx*100)}% {round(ry*100)}% at {round(cx*100)}% {round(cy*100)}%, {css})  [t normalised to farthest sample]")
json.dump(dict(dE=err, cx=cx, cy=cy, rx=rx, ry=ry, stops=stops, tmax=float(tmax)), open(os.path.join(os.path.dirname(__file__), '..', 'warm_fit.json'), 'w'), indent=1)
