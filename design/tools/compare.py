"""Side-by-side montage: sketch | our screen (3x shot) | source reference crops -> design/compare/NN.png
usage: python3 compare.py [NN ...]   (argumentsiz — hammasi)"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
REF = {1: 'ref-01-letterboxd.webp', 2: 'ref-02-netflix.webp', 3: 'ref-03-art-events.png', 4: 'ref-04-glass-social.webp',
       5: 'ref-05-luma-overview.png', 6: 'ref-06-luma-home.png', 7: 'ref-07-luma-player-styleguide.png'}
# screen crops (x0,y0,x1,y1) of each phone in the references
PH = {'01L': (1, (190, 104, 540, 862)), '01R': (1, (658, 104, 1008, 862)), '02a': (2, (41, 66, 295, 636)), '02b': (2, (327, 66, 585, 636)),
      '02c': (2, (617, 66, 875, 636)), '02d': (2, (907, 66, 1162, 636)), '03a': (3, (44, 57, 246, 495)), '03b': (3, (266, 57, 469, 495)),
      '03c': (3, (489, 57, 692, 495)), '04L': (4, (51, 153, 473, 1063)), '04R': (4, (506, 150, 928, 1060)), '05': (5, (0, 0, 736, 920)),
      '06': (6, (198, 96, 535, 826)), '07': (7, (40, 167, 335, 806))}
SCREENS = {  # PROMPT "Ekranlar" bo'limidagi manba ref'lar; ref'i yo'q ekranlarda eng yaqin uslub manbasi
    '01': ('01-onboarding', ['03a', '01L']), '02': ('02-kirish', ['01L', '05']), '03': ('03-sovga', ['05', '06']),
    '04': ('04-bosh-sahifa', ['01L', '02b']), '05': ('05-lenta', ['06', '05']), '06': ('06-qidiruv', ['04L']),
    '07': ('07-janrlar', ['02d', '03a']), '08': ('08-reyting', ['01R', '03b']), '09': ('09-tez-kunda', ['03c']),
    '10': ('10-drama', ['02c', '01R']), '11': ('11-pleer', ['07', '06']), '12': ('12-qismlar', ['07']),
    '13': ('13-izohlar', ['04R']), '14': ('14-pleer-sozlamalari', ['07']), '15': ('15-serial-tugadi', ['05']),
    '16': ('16-paywall', ['01L', '05']), '17': ('17-coin-dokoni', ['06']), '18': ('18-vip', ['06']),
    '19': ('19-tolov', ['01R']), '20': ('20-maxsus-taklif', ['05']), '21': ('21-reklama', ['07']),
    '22': ('22-mukofotlar', ['01R', '05']), '23': ('23-dost-taklif', ['04R']), '24': ('24-royxatim', ['01L', '02d']),
    '25': ('25-yuklanganlar', ['02d']), '26': ('26-bildirishnomalar', ['04R']), '27': ('27-profil', ['01R']),
    '28': ('28-hamyon', ['01R']), '29': ('29-sozlamalar', ['01R']), '30': ('30-yordam', ['04L'])}
H = 1200
def fit(im, h=H):
    return im.resize((round(im.width * h / im.height), h), Image.LANCZOS)
def label(im, text):
    d = ImageDraw.Draw(im)
    try: f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 26)
    except Exception: f = ImageFont.load_default()
    d.rectangle([0, 0, im.width, 40], fill=(20, 20, 20)); d.text((12, 6), text, fill=(235, 235, 235), font=f)
    return im
for n in (sys.argv[1:] or sorted(SCREENS)):
    name, refs = SCREENS[n]
    sk = Image.open(os.path.join(ROOT, 'sketch', f'{n}.png')).convert('RGB')
    sh = Image.open(os.path.join(ROOT, 'design', 'shots', f'{name}@3x.png')).convert('RGB')
    # long screens: show the first viewport (852 pt) for ref parity, plus full-length thumbnail
    top = sh.crop((0, 0, sh.width, min(sh.height, 852 * 3)))
    sk_top = sk.crop((0, 0, sk.width, min(sk.height, round(sk.width * 852 / 393))))
    panels = [label(fit(sk_top), f'sketch {n}'), label(fit(top), f'dizayn {n}')]
    if sh.height > 852 * 3:
        panels.append(label(fit(sh), 'toʻliq uzunlik'))
    for r in refs:
        idx, box = PH[r]
        panels.append(label(fit(Image.open(os.path.join(ROOT, 'references', REF[idx])).convert('RGB').crop(box)), f'ref-{r}'))
    W = sum(p.width for p in panels) + 24 * (len(panels) - 1)
    out = Image.new('RGB', (W, H), (12, 12, 12)); x = 0
    for p in panels: out.paste(p, (x, 0)); x += p.width + 24
    out.save(os.path.join(ROOT, 'design', 'compare', f'{n}.png'))
    print('compare', n, out.size)
