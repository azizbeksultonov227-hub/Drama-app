"""Montage of several sketch screens side by side (for review). usage: sketch_montage.py out.png 01 02 03"""
import sys, os
from PIL import Image
ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
out, nums = sys.argv[1], sys.argv[2:]
H = int(os.environ.get('H', 1000))
ims = []
for n in nums:
    im = Image.open(os.path.join(ROOT, 'sketch', f'{n}.png')).convert('RGB')
    ims.append(im.resize((round(im.width * H / im.height), H), Image.LANCZOS))
W = sum(i.width for i in ims) + 16 * (len(ims) - 1)
o = Image.new('RGB', (W, H), (40, 40, 40)); x = 0
for i in ims: o.paste(i, (x, 0)); x += i.width + 16
o.save(out)
