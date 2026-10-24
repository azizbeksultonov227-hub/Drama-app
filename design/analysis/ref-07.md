# ref-07 — Luma pleer + Style guide

Fayl: `references/ref-07-luma-player-styleguide.png` (736×920).

## 1. Masshtab
Pleer ekrani: x 40.5 … 334.5 (294 px), y 167.5 … 805.5 (638 px). Nisbat 2.17 ✓. **k = 393 / 294 = 1.337 pt/px.**

## 2. Ranglar
### Style guide palitrasi — yozilgan HEX vs doiradan o'lchangan (5×5)
| Yorliq | O'lchangan | ΔE76 | Rol (PROMPT) |
|---|---|---|---|
| `#F96430` | `#FC6532` | 0.95 | flame |
| `#E2BD99` | `#E3BD9A` | 0.64 | sand |
| `#9A462A` | `#9C452C` | 1.68 | ember |
| `#191209` | `#161308` | 2.23 | cocoa |
| `#D06D6D` | `#D26C6C` | 1.36 | rose |
| `#FFDBC4` | `#FFDBC3` | 0.51 | peach |
Barcha farqlar ΔE < 3 (webp/png siqish) → **yozilgan HEX qiymatlari tasdiqlandi**.

### Pleer ekrani
| Element | HEX |
|---|---|
| Yuqori qism (qorong'i) | `#1B1109` / `#171209` / `#20180B` |
| Sarlavha "Breath Awareness" | `#CBC3B8` |
| Glass orqaga doirasi ichi | `#48423D` (tashqi `#1B1109`) |
| Chip "Stress Relief" matni | `#FDE6C4` |
| "Take a deep breath..." | `#FFEBCF` |
| "5..4..3..2..." | `#FBB17B` (xira) |
| Slider label / qiymat | `#E6AF9D` "Volume", `#D49B84` "54", `#FFC7A2` "Theme", `#E7B59F` "Bright" |
| Vaqt "4:15" / "15:10" | `#ACA39C` / `#FAAA90` |
| Vertikal progress chizig'i (o'tgan qism) | `#FFE9DC` (tepada) → `#B8806A` → fonga eriydi |
| Play doira | `#FFFDFC` |

### k-means (k=10)
- Pleer ekrani: `#1B1409` 18.8% · `#DA8349` 14.4% · `#8A472E` 13.8% · `#B25634` 12.9% · `#703720` 10.2% · `#E7B164` 8.9% · `#321D0F` 7.8% · `#512E1E` 6.3% · `#AA6D59` 5.6% · `#F6E7DC` 1.3%
- Butun rasm: `#E5C4B4` 26.6% · `#D6A091` 22.7% · `#DFB3A4` 21.1% · `#22160B` 7.4% · `#8D4830` 5.7% · `#61331F` 4.9% · `#B26346` 4.7% · `#DB854E` 4.5% · `#EBB563` 2.2% · `#FCF9F5` 0.2%

## 3. Gradientlar (style guide namunalari, diagonal TL→BR bo'yicha 9 nuqta)
**A. flame → sand → ember** (135°):
`#F48159` 0% · `#F67040` 12% · `#EF8E64` 25% · `#EAAC86` 37% · `#DCB391` 50% · `#CA9775` 62% · `#B77558` 75% · `#A5583B` 87% · `#99472E` 100%
→ `linear-gradient(135deg, #F96430 0%, #F67040 12%, #E2BD99 48%, #B77558 75%, #9A462A 100%)`

**B. cocoa → rose → peach** (135°):
`#18100A` 0% · `#3D241B` 12% · `#79413E` 25% · `#AE5B5A` 37% · `#D37B77` 50% · `#E3958D` 62% · `#EBB0A2` 75% · `#F9CBB8` 87% · `#FFDBC5` 100%
→ `linear-gradient(135deg, #191209 0%, #79413E 25%, #D06D6D 48%, #EBB0A2 75%, #FFDBC4 100%)`

**Pleer foni:** yuqorida qorong'i (`#1B1409`), o'rtada siluet orqasidan yorug'lik (`#E7B164`, `#DA8349`), pastda to'q-sariq-qizil (`#B25634` → `#AE4C30`). Pastki qism (boshqaruv) ostida qora gradient yo'q — fon o'zi to'q-sariq.

## 4. Nur va soya
- Siluet orqasidagi yorug'lik — keng diffuz glow (`#E7B164` yadro), qattiq halqa yo'q (ref-06 dagi halqadan farqli).
- Play doira soyasi: chetdan tashqarida 1–2 px to'qroq halqa (`#8D584A`/`#754439` vs fon `#A44F28`) → ref-06 "Listen" bilan bir xil yengil soya.

## 5. Glass (kanallar bo'yicha yechim)
| Element | Ichki vs tashqi | Yechim |
|---|---|---|
| Orqaga doira (qorong'i fonda), 44 px = **58.8 pt** | `#48423D` vs `#1B1109` | **c≈215, a≈0.25** (≈ oq 20%); yuqori chet +13 daraja (chegara ~25–30%) |
| "−10" / "+10" doiralar (to'q-sariq fonda), ~40 px = **54 pt** | `#B46B5D` vs `#BD5330` | **c≈193, a≈0.31** |
| Chip "Stress Relief" (**38.8 pt**) | `#C69861` vs `#E7B761` | **c≈97 (`#616161`), a≈0.25** — qorong'ilashtiradi |
| Slider (to'ldirilmagan qism) | `#854C31` vs `#804028` | oq ~5% |
| Slider (to'ldirilgan qism) | `#B5776A` vs `#B55E45` | oq ~16% |

## 6. Radiuslar
Doiralar 50%; slider va chip'lar to'liq yumaloq (slider balandligi 41–43 px = **55–57 pt** → R ≈ 28 pt).

## 7. Tipografiya
| Matn | o'lchov | pt | O'lcham | Rang |
|---|---|---|---|---|
| "Breath Awareness" (markazda) | asc 7 | 9.4 | **13** regular | `#CBC3B8` |
| Chip "Stress Relief" | asc 7 | 9.4 | **13** | `#FDE6C4` |
| "Take a deep breath..." | cap 14, xh 9 | 18.7 / 12.0 | **24** regular | `#FFEBCF` |
| "5..4..3..2..." | 9 px | 12 | **11–12** | `#FBB17B` |
| Slider label/qiymat | asc 5–6 | 6.7–8.0 | **10–11** | `#E6AF9D` … |
| Vaqt | 6 px | 8.0 | **11** | `#ACA39C` / `#FAAA90` |

Style guide sarlavhasi "Lao Muang Khong" va alifbo namunasi: neo-grotesk (ikki qavatli 'a', bir qavatli 'g', 'R' to'g'ri oyoq, 'Q' dumi kesib o'tadi). Ekrandagi matnlar (ref-06 "Relief") esa gumanistik — `fonts.md`.

## 8. Layout (pt)
| Element | o'lcham | joylashuv |
|---|---|---|
| Orqaga / "…" glass doiralar | **58.8** | chetdan 18 pt, tepadan ~75 pt |
| Sarlavha | markazda, doiralar bilan bir qatorda | |
| Chip "Stress Relief" | **99 × 38.8** | chapdan 20 pt |
| Katta matn | chapdan **19.4** | |
| Slider'lar | **313 × 55**, ikkitasi, oraliq ~ 12 pt; chap label, o'ng qiymat, o'rtada nuqtali shkala (nuqtalar 2 px, oraliq ~**30 pt**), ingichka vertikal "knob" chizig'i | chapdan 9 pt (ekran chetiga yaqin) |
| Vertikal progress | 1–2 px = **1.3–2.7 pt** keng, ekran o'ng chetidan ~22 pt; tepada "4:15", pastda "15:10" | |
| Boshqaruv | glass −10 **54** · oq play **56** · glass +10 **54**, oraliq ~3 pt | pastdan ~30 pt |

## 9. Ikonkalar
Outline, stroke ~1.5 pt, round cap: "<" chevron, "•••", aylanma strelka + "10", "▷" (outline play) qora.

## 10. Tekstura
Pleer rasmida grain **bor**: yuqori chastota std 0.82 / 1.87 / 1.46 (tekis sahifa foni 0.19 — ya'ni grain fondan 4–10× kuchli). Kichraytirilgan rasmda ~1–2 daraja.
