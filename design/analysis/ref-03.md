# ref-03 — Art events (editorial, och kulrang)

Fayl: `references/ref-03-art-events.png` (735×551). Uchta telefon: kategoriyalar ro'yxati · pastel kartalar · "events upcoming".

## 1. Masshtab
Ramka (qora) runlari, y=300 qatori: 40–43 | 246–248 · 263–265 | 469–471 · 486–488 | 692–694. Vertikal: 53–56 … 495–497.

| Telefon | Ekran x | Ekran y | Kenglik |
|---|---|---|---|
| 1 Kategoriyalar | 44…245 | 57…494 | 202 px |
| 2 Pastel kartalar | 266…468 | ← | 203 px |
| 3 Events | 489…691 | ← | 203 px |

Nisbat 438/202.5 = 2.163 (iPhone ✓). **k = 393 / 202.5 = 1.941 pt/px.** Home indicator 69 px = 134 pt (iOS ✓).

## 2. Ranglar
| Element | HEX | Manba |
|---|---|---|
| Fon (1 va 3-ekran) | `#DBDADD` | (60,100), (200,370), (150,480), (600,370) |
| 2-ekran foni (kartalar orasi) | `#FFFAFF` / `#FBFFFF` | kartalar orasidagi 2–3 px tirqish |
| Aktiv ro'yxat elementi "paintings" | `#000000` | |
| Noaktiv ro'yxat: "art exibitions" / "cinema" | `#ABABAD` / `#B1B1B3` | ≈ fondan 30 daraja to'qroq |
| Xiralashgan: "music" / "master classes" | `#C1C0C3` / `#CAC9CC` | chetlarga qarab fonga eriydi |
| Pushti urg'u "galleries" | `#BF95AF` (pushti piksellar o'rtachasi, 311 px), yadro `#A67994` | AA bilan fonga aralashgan |
| Sarlavha "Categories", tab "All Events" | `#262628` / `#212123` | |
| Noaktiv tab "Music Fests" | `#B0B0B2` | |
| Mono caption | `#6D6D70` / `#606264` | |
| "(12)" | `#A6A5A8` | |
| Pill "Hi, Jerald!" | fon `#EEECEE`, matn `#484748` | |
| Pill "Menu >" | fon `#FEFEFE`, matn `#1F1F1F` | |
| Pastel karta 1 (teal) | tepa `#95CED0`/`#94CDCF` → o'rta `#AFD1D4` → past `#B1BCC0`/`#B3BCBE` | |
| Pastel karta 2 (pushti) | tepa `#DFAAC8` → o'rta `#CBADC9` → past `#D1C1CD`, o'ng past `#B2BCCE` | |
| Karta 1 sarlavhasi "The Shapes of soul" | `#124144` (karta rangining to'q tusi) | |

### k-means (k=10)
- 1-ekran: `#DDDCDE` 63.0% · `#D0CECF` 9.2% · `#1C1313` 5.5% · `#BDB6B3` 5.5% · `#432F2A` 4.6% · `#685049` 3.7% · `#A29392` 3.5% · `#807572` 3.2% · `#7C9BB8` 1.1% · `#BC7D56` 0.9%
- 2-ekran: `#D4B1CA` 21.2% · `#B1B2BF` 17.1% · `#F2EFF4` 13.6% · `#B2CDD1` 12.9% · `#91C9CC` 11.0% · `#859A9F` 9.1% · `#B3938F` 6.0% · `#37595B` 3.8% · `#B9796E` 3.3% · `#181B1B` 2.0%
- 3-ekran: `#DDDCDE` 51.6% · `#B7B0A9` 9.7% · `#C5C4C2` 7.5% · `#5B4A3E` 6.8% · `#9A938E` 6.2% · `#776C62` 5.5% · `#0D090A` 5.3% · `#382824` 4.9% · `#B78864` 1.4% · `#90C3C4` 1.1%

## 3. Gradientlar
- Pastel kartalar: vertikal, tepa to'yingan pastel → pastda kulrang-ko'kish (karta 1: `#95CED0` → `#B1BCC0`; karta 2: `#DFAAC8` → `#B2BCCE`), rasm kartaga erib ketadi.
- Ro'yxat xiralashishi: aktiv elementdan uzoqlashgan sari kontrast kamayadi (`#000000` → `#ABABAD` → `#C1C0C3`/`#CAC9CC` → fon `#DBDADD`).
- Pastki pill'lar zonasida kontent oq-kulrang fade ostida yo'qoladi.

## 4. Nur va soya
- Kolaj orqasida katta och-kulrang "soya kartasi" (`#CCD0D1`, fondan 14 daraja to'q, yumaloq to'rtburchak) — rasm guruhini fondan ajratadi.
- "Menu >" pill (y 456…476 px = 41 pt): ostida 1–3 px `#D6D6D6` (fondan ~5 daraja) → `0 2px 4px rgba(0,0,0,.04)` darajasidagi juda yengil soya.

## 5. Glass
Yo'q (yorug' tekis fon).

## 6. Radiuslar
| Element | R (px) | R (pt) |
|---|---|---|
| Pastel karta (2-ekran), bl/br | 20.0 / 20.0 (xato 0.25) | **39** (taxmin 28) |
| Masonry rasm, kichik (3-ekran) | 11.5 (xato 0.02) | **22** |
| Masonry rasm, katta (3-ekran) | ~15.75 (xato 2.7, shubhali) | ~**30** |
| Kolaj rasmlari (1-ekran) | vizual ~10 px | ~**20** |
| Pill'lar | to'liq yumaloq | 999 |

## 7. Tipografiya (neo-grotesk, x-height ≈ 0.545 em — Inter Tight/Helvetica Now tipi)
| Matn | o'lchov (px) | pt | Shrift | Rang |
|---|---|---|---|---|
| Ro'yxat ("art exibitions", "cinema") | asc 16–17, xh 12 | 31–33 / 23.3 | grotesk **44** regular, letter-spacing manfiy (~−0.04 em), lowercase | `#ABABAD` |
| Ro'yxat qatorlari oralig'i | baseline'lar 157 → 189 px | **62** | line-height ≈ **1.41** (taxmin 0.95 — o'lchov boshqacha) | |
| Aktiv "→ paintings" | ← | ← | ← + "→" strelka, chap tomonda 52 pt | `#000000` |
| "events upcoming" | xh ~15, baseline 412 → 439 px | 29 / **52** | grotesk **53** regular, line-height **0.98**, lowercase | `#000000` |
| "(12)" | 17 px | 33 | ingichka serif, superscript (tepasi "events" bilan bir chiziqda) | `#A6A5A8` |
| "The Shapes of soul" | asc 20, xh 16 | 38.8 / 31.1 | grotesk **57**, letter-spacing juda manfiy, line-height ~0.85 | `#124144` |
| "Categories" / tab | asc 6 | 11.6 | **15** medium/semibold | `#262628` |
| Mono caption ("OUTSIDE: 9", "NOV 30, 2 PM") | cap 4–5 | 7.8–9.7 | monospace **11**, CAPS, o'ngga tekislangan, qator oralig'i 9.3 px = 18 pt | `#6D6D70` |
| Pill matni | asc 5 | 9.7 | **13** | `#484748` / `#1F1F1F` |

Glif tahlili: ro'yxat shrifti — 'a' ikki qavatli, 'g' bir qavatli (paintings, galleries), 't' qiya kesik, 'e' gorizontal terminal, juda zich harf oralig'i → Inter Tight / Helvetica Now Display tipi. Mono — slab'siz, 0'da nuqta yo'q, ':' kvadrat nuqtalar → JetBrains Mono / IBM Plex Mono tipi (IoU taqqoslash `fonts.md` da).

## 8. Layout (pt)
| Element | o'lcham |
|---|---|
| Ro'yxat chap cheti | **10** (5 px) — editorial matn chetga yaqin |
| Mono caption o'ng cheti | ~6 pt (o'ngga tekislangan) |
| Pastel kartalar | ekran chetidan **6**, kartalar orasi **6** |
| Masonry (3-ekran) | 2 ustun, ustunlar orasi ~10 pt; rasmlar 16 pt chetdan |
| Kolaj rasmlari (1-ekran) | 3–4 ta, bir-birining ustiga tushgan, burilish ~±5° (top edge slope 0.09) |
| Pastki pill'lar | "Hi, Jerald!" **105 × 39**, qidiruv doira **39**, "Menu >" **87 × 39**; chetdan 16, pastdan ~30 |
| Home indicator | 134 × 5 |

## 9. Ikonkalar
Outline lupa (stroke ~1.5), "→" strelka (matn glifi), ">" chevron. Kam ikonka — tipografiya asosiy.

## 10. Tekstura
Grain yo'q — tekis fon (`#DBDADD`, 3-ekran) yuqori chastota std = **0.19**.
