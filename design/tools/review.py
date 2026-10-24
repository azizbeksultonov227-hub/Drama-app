"""Montage of rendered 1x screen shots for quick review. usage: review.py out.png shot1.png shot2.png ..."""
import sys
from PIL import Image
out, files = sys.argv[1], sys.argv[2:]
H = 852
ims = [Image.open(f).convert('RGB') for f in files]
ims = [i.crop((0, 0, i.width, min(i.height, int(sys.argv[0] and 99999)))) for i in ims]
ims = [i.resize((round(i.width * min(1, H / i.height) if i.height > H * 1.05 else i.width), min(H, i.height) if i.height <= H * 1.05 else H)) if False else i for i in ims]
maxh = max(i.height for i in ims)
W = sum(i.width for i in ims) + 12 * (len(ims) - 1)
o = Image.new('RGB', (W, maxh), (60, 60, 60)); x = 0
for i in ims: o.paste(i, (x, 0)); x += i.width + 12
o.save(out)
