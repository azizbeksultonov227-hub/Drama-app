# Shriftlarni aniqlash (IoU taqqoslash + glif qamrovi)

Usul (`tools/font_iou.py`, `tools/font_render.js`): referensdagi so'z kesiladi va binarlanadi (fon va siyoh o'rtasidagi chegara); har bir nomzod Google Fonts'dan Playwright'da 200 px da chiziladi, ref balandligiga **bir xil masshtabda** kichraytiriladi va chapdan tekislab maskalar kesishmasi/birlashmasi (IoU) hisoblanadi.
- **IoU** — shakl + kenglik (harf oralig'i, proportsiya) birgalikda.
- **IoU (free-x)** — nomzod ref kengligiga cho'zilgandan keyin, faqat shakl.
- **width ratio** — nomzod kengligi / ref kengligi (1.00 = ideal).
Natijalar: `fonts_iou.json`, `fonts_iou_ui.json`, `fonts_inter_tracking.json`.
Cheklov: ref so'zlari 10–69 px baland — kichik matnlarda IoU shovqinli; qarorlar bir nechta namunaga tayanadi.

## 1. Displey condensed ("MARTY" / "SUPREME", ref-01)
| Shrift | IoU SUPREME | IoU MARTY | free-x S / M | width S / M |
|---|---|---|---|---|
| **Anton** | **0.325** (1-o'rin) | 0.299 | 0.541 / 0.565 | 1.62 / 1.86 |
| League Gothic | 0.311 | 0.343 | 0.566 / **0.703** | 1.39 / 1.62 |
| Saira Extra Condensed 900 | 0.301 | 0.276 | 0.563 / 0.630 | 1.70 / 2.06 |
| Bebas Neue | 0.290 | 0.358 | 0.507 / 0.623 | 1.60 / 1.87 |
| Antonio 700 | 0.270 | 0.359 | 0.526 / 0.542 | 1.53 / 1.73 |
| Six Caps | 0.271 | 0.321 | 0.499 / 0.581 | 0.77 / 0.89 |
| Oswald 700 | 0.249 | 0.233 | 0.573 / 0.699 | 1.90 / 2.15 |
Ref harflari har qanday shriftdan siqiqroq (poster wordmark — gorizontal siqilgan). Anton va League Gothic eng yaqin; **League Gothic'da U+02BB (ʻ) yo'q** → **Anton** (PROMPT tanlovi tasdiqlandi). Ref'dagi usul: qatorlar bir xil kenglikka **justify** qilinadi (har qatorga o'z o'lchami), line-height ≈ 0.86.

## 2. Serif ("sarah.lg", ref-01)
| Shrift | IoU | free-x | width | ʻ U+02BB |
|---|---|---|---|---|
| **Gelasio** | 0.147 | **0.626** (1-o'rin) | 0.81 | ✓ |
| Noto Serif | 0.178 | 0.564 | 0.87 | ✓ |
| Libre Caslon Text | 0.220 | 0.552 | 0.75 | — |
| DM Serif Display | 0.210 | 0.540 | 0.88 | ✗ |
| Source Serif 4 | 0.208 | 0.538 | 0.90 | ✓ |
| Lora | 0.123 | 0.535 | 0.81 | — |
| Instrument Serif (PROMPT) | 0.153 | **0.393** | **0.65** | **✗** |
Ref — keng, katta x-height'li, Georgia tipidagi transitional serif (ikki qavatli 'a' va 'g', tomchi terminal). Instrument Serif siqiq displey serif: shakl o'xshashligi past (0.393) va 35% torroq, hamda **ʻ glifi yo'q**. → **Gelasio** (Georgia metrikasiga mos, eng yuqori shakl IoU, ʻ bor). Kenglik farqi (0.81) → `letter-spacing: +0.02em` bilan yaqinlashtiriladi.

## 3. UI sans (ref-01, ref-04)
| Namuna | Roboto | Inter | Figtree | Instrument Sans | Noto Sans |
|---|---|---|---|---|---|
| Beating Hearts (700) | **0.732** w1.00 | 0.381 w1.04 | 0.525 | 0.363 | 0.337 |
| Add to watchlist (600) | 0.295 | 0.347 | **0.432** | 0.378 | 0.427 |
| Friend's box (400) | 0.205 | **0.598** | 0.257 | 0.435 | 0.244 |
| Recent activity (400) | **0.460** | 0.329 | 0.369 | 0.330 | 0.237 |
| John Wick 3 (700) | **0.718** w1.00 | 0.254 w1.07 | 0.255 | 0.311 | 0.188 |
| Results (600, ref-04) | **0.759** w1.00 | 0.395 w1.09 | 0.372 | 0.350 | 0.512 |
| Collections (400, ref-04) | **0.335** | 0.204 | 0.234 | 0.236 | 0.270 |
| Solana Monkeys (400, ref-04) | 0.203 | **0.267** | 0.237 | 0.235 | 0.182 |
Faqat shakl (free-x): Inter ≥ Roboto ko'p namunada (John Wick 0.794 vs 0.718, Solana 0.787 vs 0.575, Add 0.689 vs 0.640). Ya'ni farq asosan **kenglikda**: Inter SF'dan 3–9% kengroq.
Inter + tracking sinovi (`fonts_inter_tracking.json`): regular matn uchun 0 … −0.02 em eng yaxshi (Recent activity 0.329 → **0.654** −0.02 da); qalin sarlavhalar uchun −0.03 em (John Wick 0.254 → **0.458**, Results 0.395 → **0.475**).
**Roboto'da U+02BB (ʻ) yo'q.** → **Inter** (PROMPT tanlovi tasdiqlandi) + o'lchamga bog'liq tracking: body −0.01 em, headline −0.02 em, title −0.03 em.

## 4. Luma ekran matni (ref-06/07)
| Namuna | Noto Sans | Open Sans | DM Sans | Roboto | Inter |
|---|---|---|---|---|---|
| Relief (400) | **0.866** | 0.848 | 0.711 | 0.686 | 0.601 |
| Meditation (400) | 0.377 (free-x **0.837**) | **0.666** | 0.274 | 0.346 | 0.413 |
Luma ekranlaridagi matn gumanistik sans (Noto/Open Sans), style guide namunasi esa grotesk ko'rinishda. Tizimda **bitta UI oilasi** saqlanadi (Inter) — iliq ekranlarda ham. Bu ataylab qilingan farq → `DEVIATIONS.md` (#F2).

## 5. Editorial (ref-03)
| Namuna | Inter Tight | Inter | Archivo | Schibsted | Geist |
|---|---|---|---|---|---|
| art exibitions | 0.308 (free-x 0.654, w0.93) | 0.277 (0.656) | **0.439** (0.576) | 0.338 (0.648) | 0.238 (0.646) |
| upcoming | 0.160 (0.331) | 0.160 (0.297) | 0.148 | 0.131 | **0.178** |
Natijalar yaqin (shakl IoU 0.65 atrofida hammasida). → **Inter Tight** (PROMPT tanlovi; Inter bilan bir oila, ʻ bor), letter-spacing −0.04 em.

## 6. Mono (ref-03 caption)
Bosh harf balandligi 4–5 px — glif shaklini aniqlab bo'lmaydi. O'lchangan xossalar: monospace (qadam ~3.7 px = 7.2 pt → 0.6 em da ~12 pt), CAPS, light/regular, rang `#6D6D70`. JetBrains Mono'da **U+02BB yo'q** → **IBM Plex Mono** (ʻ bor, neytral grotesk-mono).

## 7. Glif qamrovi (`tools/glyph_check.js` — glif kengligi ikki xil fallback bilan bir xil bo'lsa = shriftda bor)
| Shrift | ʻ U+02BB | ʼ U+02BC | ’ U+2019 |
|---|---|---|---|
| Anton | ✓ | ✓ | ✓ |
| Gelasio | ✓ | ✓ | ✓ |
| Inter / Inter Tight | ✓ | ✓ | ✓ |
| IBM Plex Mono | ✓ | ✓ | ✓ |
| Noto Sans, Source Serif 4 | ✓ | ✓ | ✓ |
| League Gothic, Instrument Serif, Space Mono, DM Serif Display | ✗ | ✗ | ✓ |
| JetBrains Mono, Roboto | ✗ | ✓ | ✓ |

**Qaror: butun loyihada to'g'ri o'zbek belgisi `ʻ` (U+02BB) — oʻ, gʻ — va tutuq belgisi `ʼ` (U+02BC) ishlatiladi.** Tanlangan 5 shriftning barchasida bor, shuning uchun U+2019 ga o'tish shart emas.

## Yakuniy shrift to'plami
| Rol | Shrift | PROMPT'dan farqi |
|---|---|---|
| Displey condensed | **Anton** 400 | — |
| Serif | **Gelasio** 400/500 | Instrument Serif → Gelasio (IoU + ʻ) |
| UI | **Inter** 400/500/600/700 | — (tracking qo'shildi) |
| Editorial | **Inter Tight** 400 | — |
| Mono | **IBM Plex Mono** 400/500 | JetBrains Mono → IBM Plex Mono (ʻ) |
