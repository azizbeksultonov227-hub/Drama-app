"""Generates design/icons.css: one icon set — Lucide 0.460.0 (ISC, tools/icons-src/), stroke 2.4, round cap/join.
Foydalanuvchi so'rovi: ikonkalar qalinroq va sifatliroq (avvalgi o'z chizgan to'plam, stroke 1.75 o'rniga).
Icons are CSS masks (data-URI SVG) so they inherit currentColor and work from file://.
"-fill" variantlari: shakl to'ldiriladi (+ kontur), uy ikonkasida eshik evenodd bilan kesiladi."""
import urllib.parse, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'icons-src', 'lucide-0.460.0')
SW = 2.4
G = f'<g fill="none" stroke="#000" stroke-width="{SW}" stroke-linecap="round" stroke-linejoin="round">'

# nom → (lucide fayli, to'ldirish: None | 'all' | [element indekslari] | 'evenodd')
MAP = {
  'home': ('house', None), 'home-fill': ('house', 'evenodd'),
  'play': ('play', None), 'play-fill': ('play', 'all'),
  'gift': ('gift', None), 'bookmark': ('bookmark', None), 'bookmark-fill': ('bookmark', 'all'),
  'user': ('user', None), 'search': ('search', None), 'bell': ('bell', None), 'bell-plus': ('bell-plus', None),
  'plus': ('plus', None), 'minus': ('minus', None), 'close': ('x', None), 'check': ('check', None),
  'chev-left': ('chevron-left', None), 'chev-right': ('chevron-right', None), 'chev-down': ('chevron-down', None), 'chev-up': ('chevron-up', None),
  'arrow-right': ('arrow-right', None), 'arrow-up': ('arrow-up', None), 'arrow-down': ('arrow-down', None),
  'share': ('forward', None), 'share-box': ('share', None),
  'more': ('ellipsis', None), 'more-v': ('ellipsis-vertical', None),
  'heart': ('heart', None), 'heart-fill': ('heart', 'all'),
  'comment': ('message-square', None), 'comment-fill': ('message-square', 'all'),
  'download': ('download', None), 'lock': ('lock', None), 'lock-fill': ('lock', [0]), 'unlock': ('lock-open', None),
  'eye': ('eye', None), 'eye-off': ('eye-off', None), 'star': ('star', None), 'star-fill': ('star', 'all'),
  'crown': ('crown', None), 'list': ('list', None), 'grid': ('layout-grid', None), 'filter': ('sliders-horizontal', None),
  'pause-fill': ('pause', 'all'), 'rewind': ('rotate-ccw', None), 'forward': ('rotate-cw', None),
  'clock': ('clock', None), 'calendar': ('calendar', None), 'moon': ('moon', None), 'copy': ('copy', None),
  'send': ('send', None), 'send-fill': ('send', 'all'), 'phone': ('phone', None), 'info': ('info', None), 'help': ('circle-help', None),
  'edit': ('pencil', None), 'wallet': ('wallet', None), 'card': ('credit-card', None), 'logout': ('log-out', None),
  'users': ('users', None), 'user-plus': ('user-plus', None), 'trophy': ('trophy', None), 'sparkle': ('sparkles', None), 'flame': ('flame', None),
  'settings': ('settings', None), 'globe': ('globe', None), 'wifi': ('wifi', None), 'trash': ('trash-2', None), 'ticket': ('ticket', None),
  'megaphone': ('megaphone', None), 'video': ('video', None), 'film': ('film', None), 'refresh': ('refresh-cw', None), 'shield': ('shield', None),
  'link': ('link', None), 'gauge': ('gauge', None), 'volume': ('volume-2', None), 'tv': ('tv', None), 'flag': ('flag', None),
  'receipt': ('receipt', None), 'percent': ('percent', None), 'cast': ('cast', None), 'swipe-up': ('arrow-up-to-line', None),
  'sort': ('arrow-up-down', None), 'subtitles': ('captions', None), 'sliders': ('sliders-vertical', None),
}
# Lucide'da yo'q — xuddi shu to'r va kontur bilan chizilgan
CUSTOM = {
  'cc': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10.5 10.2a2.1 2.1 0 1 0 0 3.6M16.5 10.2a2.1 2.1 0 1 0 0 3.6"/>',
  'hd': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7.5 9.5v5M10.5 9.5v5M7.5 12h3M13.5 9.5v5h1.25a2.5 2.5 0 0 0 0-5z"/>',
}
EL = re.compile(r'<(path|circle|rect|line|polyline|polygon|ellipse)\b([^>]*?)/?>', re.S)

def elements(name):
    svg = open(os.path.join(SRC, name + '.svg')).read()
    return [(t, ' '.join(a.split())) for t, a in EL.findall(svg)]

def build(name, mode):
    els = elements(name)
    if mode == 'evenodd':   # barcha path'lar bitta shaklga, ichki kontur (eshik) teshik bo'ladi
        ds = [re.search(r'd="([^"]+)"', a).group(1) for t, a in els if t == 'path']
        ds = sorted(ds, key=len, reverse=True)
        return f'<path fill="#000" fill-rule="evenodd" d="{" ".join(d if d.rstrip().endswith("z") else d + "z" for d in ds)}"/>'
    out = []
    for i, (t, a) in enumerate(els):
        fill = mode == 'all' or (isinstance(mode, list) and i in mode)
        out.append(f'<{t} {a}{" fill=\"#000\"" if fill else ""}/>')
    return ''.join(out)

def uri(inner):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">{G}{inner}</g></svg>'
    return 'url("data:image/svg+xml,' + urllib.parse.quote(svg, safe=' =:/"<>.,-#').replace('#', '%23').replace('"', "'") + '")'

icons = {n: build(f, m) for n, (f, m) in MAP.items()}
icons.update(CUSTOM)
out = [f'/* icons.css — tools/build_icons.py tomonidan yaratiladi. Bitta to\'plam: Lucide 0.460.0 (ISC litsenziya — tools/icons-src/),\n   24 pt to\'r, stroke {SW}, round cap/join; aktiv holatda to\'ldirilgan variant. */',
       '.ic{display:inline-block;flex:none;width:24px;height:24px;background-color:currentColor;-webkit-mask:var(--i) center/contain no-repeat;mask:var(--i) center/contain no-repeat;vertical-align:middle}',
       '.ic--16{width:16px;height:16px}.ic--18{width:18px;height:18px}.ic--20{width:20px;height:20px}.ic--22{width:22px;height:22px}.ic--26{width:26px;height:26px}.ic--28{width:28px;height:28px}.ic--32{width:32px;height:32px}']
for name in sorted(icons, key=lambda n: list(MAP).index(n) if n in MAP else 999):
    out.append(f'.ic-{name}{{--i:{uri(icons[name])}}}')
p = os.path.join(HERE, '..', 'icons.css')
open(p, 'w').write('\n'.join(out) + '\n')
print('icons:', len(icons), '->', os.path.abspath(p))
