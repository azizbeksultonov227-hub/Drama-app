"""Generates design/art.css: drama placeholder silhouettes (cocoa #191209 + peach #FFDBC4 rim
light, both brand tokens), the SVG grain texture and the iOS status-bar glyphs.
Used while images.unsplash.com is unreachable (PROMPT §3: ambient gradient + grain placeholder)."""
import urllib.parse, os

def uri(svg):
    return 'url("data:image/svg+xml,' + urllib.parse.quote(svg, safe=' =:/"<>.,-()').replace('"', "'") + '")'

COCOA, PEACH = '#191209', '#FFDBC4'
def sil(shape, vb='0 0 100 140', blur=2.4, glow=.95):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" preserveAspectRatio="xMidYMax slice">'
            f'<defs><filter id="g" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="{blur}"/></filter></defs>'
            f'<g fill="{PEACH}" opacity="{glow}" filter="url(#g)">{shape}</g><g fill="{COCOA}">{shape}</g></svg>')

# simple cinematic silhouettes (viewBox 100x140, anchored to the bottom)
SHAPES = {
  # single portrait, head & shoulders, slight turn
  'portrait': '<ellipse cx="52" cy="58" rx="15" ry="19"/><path d="M45 72h13l2 12c14 3 26 12 30 32l3 24H7l3-24c4-20 16-29 31-32z"/>'
              '<path d="M37 52c0-16 10-27 22-25 10 2 16 10 15 22-5-6-12-9-20-9-7 0-12 5-17 12z"/>',
  # couple, foreheads close (romance)
  'couple':   '<ellipse cx="37" cy="60" rx="11" ry="14" transform="rotate(14 37 60)"/>'
              '<path d="M24 58c-2-14 6-18 14-16s12 8 10 16l-2 6c-2 10 0 22 4 32H26c-6-12-4-28-2-38z"/>'
              '<path d="M30 72l12 4 2 10c8 4 12 12 13 26l1 28H-4l2-28c2-14 12-24 28-26z"/>'
              '<ellipse cx="62" cy="52" rx="12.5" ry="15.5" transform="rotate(-10 62 52)"/>'
              '<path d="M50 48c0-12 10-16 18-12 6 3 8 10 6 16-4-6-12-8-18-6z"/>'
              '<path d="M56 66h12l1 10c15 3 27 12 31 30l4 34H46l1-32c1-16 5-26 10-31z"/>',
  # small walking figure (Luma style), centred low
  'walk':     '<ellipse cx="50" cy="83" rx="4.6" ry="5.4"/><path d="M44.5 89c-3 1-5 4-5.6 9l-1.6 15 3 .6 1.4 26h3.4l1.6-20 1.8 20h3.4l1.2-26 3-.6-1.4-15c-.6-5-2.6-8-5.6-9z"/>',
  # two figures standing apart (conflict / revenge)
  'duo':      '<ellipse cx="28" cy="70" rx="9" ry="11"/><path d="M22 80c-9 2-14 9-15 20l-3 40h48l-3-40c-1-11-6-18-15-20z"/>'
              '<ellipse cx="74" cy="64" rx="10" ry="12"/><path d="M67 75c-10 2-15 10-16 22l-3 43h52l-3-43c-1-12-6-20-16-22z"/>',
  # close-up profile face (thriller / mystery)
  'profile':  '<path d="M64 20c-18-2-32 12-33 30-1 9 2 15 4 20l-5 9c-1 2 0 3 2 3h4l-1 6c0 3 2 4 5 4l-1 5c0 3 3 4 6 4h6l2 13c-14 3-25 10-30 26h88V70c0-26-14-48-37-50z"/>',
}
out = ['/* art.css — tools/build_art.py tomonidan yaratiladi.\n   Rasm placeholder\'lari (Unsplash bloklangan): ambient rang + siluet (cocoa #191209) + peach #FFDBC4 kontur nuri + grain. */']
for k, v in SHAPES.items():
    out.append(f'.art--{k}::before{{background-image:{uri(sil(v))}}}')

# grain: fractal noise, alpha-only; strength via --grain-opacity
grain = ('<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n" x="0" y="0">'
         '<feTurbulence type="fractalNoise" baseFrequency=".92" numOctaves="2" stitchTiles="stitch"/>'
         '<feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 1.6 -.3"/></filter>'
         '<rect width="180" height="180" filter="url(#n)"/></svg>')
out.append(f':root{{--grain-img:{uri(grain)}}}')

# iOS status bar glyphs (white); dark variant via filter
sig = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12"><g fill="#000">'
       '<rect x="0" y="8" width="3" height="4" rx=".7"/><rect x="5" y="5.5" width="3" height="6.5" rx=".7"/>'
       '<rect x="10" y="3" width="3" height="9" rx=".7"/><rect x="15" y="0" width="3" height="12" rx=".7"/></g></svg>')
wifi = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 12"><g fill="#000">'
        '<path d="M8.5 2.3c2.4 0 4.6.9 6.3 2.5l1.2-1.2A10.6 10.6 0 0 0 8.5.6 10.6 10.6 0 0 0 1 3.6l1.2 1.2a8.9 8.9 0 0 1 6.3-2.5z"/>'
        '<path d="M8.5 5.6c1.5 0 2.9.6 4 1.6l1.2-1.2a7.4 7.4 0 0 0-10.4 0l1.2 1.2c1.1-1 2.5-1.6 4-1.6z"/>'
        '<path d="M8.5 8.9c.7 0 1.3.3 1.8.7L8.5 11.4 6.7 9.6c.5-.4 1.1-.7 1.8-.7z"/></g></svg>')
batt = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 13"><g fill="#000">'
        '<rect x=".5" y=".5" width="23" height="12" rx="3.6" fill="none" stroke="#000" stroke-opacity=".38"/>'
        '<rect x="2" y="2" width="20" height="9" rx="2.2"/><path d="M25 4.4v4.2c.8-.3 1.4-1.1 1.4-2.1s-.6-1.8-1.4-2.1z" fill-opacity=".45"/></g></svg>')
out.append(f':root{{--sb-signal:{uri(sig)};--sb-wifi:{uri(wifi)};--sb-battery:{uri(batt)}}}')
p = os.path.join(os.path.dirname(__file__), '..', 'art.css')
open(p, 'w').write('\n'.join(out) + '\n')
print('art.css written', os.path.abspath(p))
