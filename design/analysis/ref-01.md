# ref-01 — Letterboxd konsepsiyasi (bosh sahifa + profil)

Fayl: `references/ref-01-letterboxd.webp` (1199×966, RGB). O'lchov vositasi: `design/analysis/tools/meas.py` (Pillow + numpy).
Barcha rang namunalari — 5×5 px o'rtacha (agar boshqacha yozilmagan bo'lsa). pt = px × k.

## 1. Masshtab
| | Chap telefon (bosh sahifa) | O'ng telefon (profil) |
|---|---|---|
| Ekran x (px) | 190 … 539 | 658 … 1008 |
| Ekran y (px) | 104 … 862 | 104 … 862 |
| Ekran kengligi | 350 px | 350 px |
| Nisbat | 758/350 = 2.166 (iPhone 15 Pro 852/393 = 2.168) | ← |

**k = 393 / 350 = 1.1229 pt/px.**
Tekshiruv: Dynamic Island 110×32 px → 123.5×36 pt, tepadan 10.7 pt (iOS spec: 126×37.33, tepadan 11) ✓; "9:41" bosh harf balandligi 11 px = 12.4 pt → SF 17 pt ✓.
Rezolyutsiya: 1 px = 1.12 pt, shuning uchun matn o'lchamlari ±1 pt aniqlikda.

## 2. Ranglar (5×5 o'rtacha)
| Element | HEX | Izoh |
|---|---|---|
| Ekran foni (hero ostida) | `#000000`–`#020101` | 6 nuqta: (198,600) #000001, (198,700) #000000, (360,670) #020101, (530,760) #000000 … Dastlabki taxmin #0A0A0A emas — sof qora |
| Karta foni (Friend's box) | yuqori `#0A0B08` → o'rta `#141414` → past `#151515` | vertikal gradient; Favorites kartasi ham xuddi shunday: `#080808` → `#161616` |
| Karta chegarasi | yuqori `#171717`, yon `#161616`, past `#212121`/`#292929` | qora ustida = oq 9% (yuqori/yon) … 13–16% (past) |
| Segmented tab — tanlangan fon | `#111111` | chegara yuqori `#383838`/`#252525`, past `#161616` |
| Tab matni — tanlangan | `#FEFEFE` | |
| Tab matni — tanlanmagan | `#A3A3A3` | dastlabki taxmin #8E8E93 — o'lchov ochroq |
| "Friend's box" (2-daraja matn) | `#B4B4B4` | ≈ oq 71% |
| Bio "I love getting into trouble" | `#AAAAAA` | ≈ oq 67% |
| "See all" pill foni | `#242424` (home), `#161616`…`#242424` (profil) | matn `#F5F5F5` |
| "…" doira foni | `#353535` (profil), `#2B2B2B` (home) | |
| Chip foni (rasm ustida) | ichki `#2A1F1C` vs tashqi `#271A15`/`#140B0A` | chip fondan **ochroq**: oq ~7% + blur (qora 60% emas) |
| Chip foni (qora ustida, profil) | `#131313` | = oq 7.5% qora ustida ✓ |
| Chip chegarasi | yuqori `#4D403D` (rasm ustida), `#2D2D2D` (qora ustida) | = oq ~17% yuqorida, yonlarda ~8% → yuqoridan yoritilgan |
| Chip matni | `#D0C3C1` (rasm ustida), `#B6B6B6` (qora ustida) | ≈ oq 72–80% |
| "545 ML" chip | fon `#2A385F`/`#253456`, chet `#647097`, matn `#ECFDFF` | ko'k tusli — bizda sand "VIP" chipiga o'tadi |
| Glossy pill matni | `#010000` | qora |
| "Reviews" (tertiary) matni | `#E2DDDC` | |
| BH karta: "Popular this week" | `#EAADA0` | karta rangidan tuslangan oq |
| BH karta: sarlavha | `#FFFBF6` | |
| RA karta: "Latest rating" | `#F8C99C` | |
| Nav foni | yuqori `#1E1E1E` → past `#151515`/`#161616` | yuqori chet `#211F1D` |
| Nav aktiv element foni | `#2B2B2B` → `#313131` | chapdan o'ngga biroz ochiladi |
| Nav label — aktiv | `#F1F1F1` | |
| Nav label — noaktiv | `#E5E5E5` | noaktivlar ham deyarli oq (kulrang emas) |
| Profil sarlavhasi "sarah.lg's box" | `#EEFED2` | yashil fon ustida shaffof oq |

### k-means (k=10, 40 000 px)
- Bosh sahifa ekrani: `#040303` 25.6% · `#1A1213` 25.1% · `#3A251D` 17.8% · `#524239` 8.6% · `#F5F3F1` 6.3% · `#BEB0AA` 5.1% · `#926D72` 4.6% · `#8C2615` 4.0% · `#2A53A6` 1.5% · `#A8BB2F` 1.3%
- Profil ekrani: `#050503` 41.8% · `#232B0B` 20.2% · `#4A4918` 12.3% · `#6A182B` 5.0% · `#AD3936` 4.2% · `#E5D9D1` 4.1% · `#7FBF1C` 3.4% · `#CA985E` 3.1% · `#20377F` 3.1% · `#798296` 2.8%
- Butun rasm: `#010101` 64.7% · `#191512` 11.3% · `#383418` 9.5% · `#414358` 3.1% · `#7C7686` 2.5% · `#772321` 2.4% · `#F2F0EE` 2.0% · `#C7AFA3` 2.0% · `#BE5136` 1.3% · `#8DC120` 1.1%

## 3. Gradientlar
### Hero fade (bosh sahifa)
Har bir qatorda (x 195…535, oq UI piksellarisiz) yorqinlikning 90-persentili:

| y (pt, ekran tepasidan) | 247 | 274 | 294 | 314 | 348 | 362 | 382 | 422 |
|---|---|---|---|---|---|---|---|---|
| p90 yorqinlik | 175 | 152 | 115 | 71 | 43 | 20 | 15 | 3 |
| nisbiy | 100% | 87% | 66% | 41% | 25% | 11% | 9% | 0% |

- Hero bloki 0 … ~420 pt (= ekranning **49%**).
- Fade **~254 pt da boshlanadi = hero balandligining 60%** (taxmin 55%), **~420 pt da to'liq qora**.
- CSS ekvivalenti: `linear-gradient(180deg, transparent 58%, rgba(0,0,0,.35) 68%, rgba(0,0,0,.6) 75%, rgba(0,0,0,.89) 86%, #000 100%)` (hero bloki ustida).

### Glossy pill ("Add to watchlist", markaziy ustun x=268/312, 46 px)
| pozitsiya | 0–9% | 13% | 20% | 28% | 37% | 46% | 60% | 63–75% | 80% | 87% | 92% | 96% | 100% |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| rang | `#FFFFFF` | `#F3F0F1` | `#E9E7E6` | `#DEDCDA` | `#D6D3D4` | `#C9C6C7` | `#B7B4B8` | `#B5B2B3` | `#C3C0C1` | `#D6D3D4` | `#E1DFE0` | `#F4F1F2` | `#E7E5E5` |

"Following" (profil, 38 px) — neytral kulrang, xuddi shu shakl: `#FFFFFF` 0–10% · `#ECECEC` 16% · `#E1E1E1` 24% · `#D6D6D6` 32% · `#CBCBCB` 40% · `#BEBEBE` 50% · `#B7B7B7` 53% · `#C5C5C5` 68% · `#CCCCCC` 79% · `#D7D7D7` 84% · `#E3E3E3` 87% · `#F1F1F1` 92% · `#F7F7F7` 95%.
**Xulosa:** bu oddiy oq→kulrang emas — **qavariq kapsula**: yuqorida ~4.5 pt oq highlight band, eng to'q joyi 55–75% da (`#B5B5B5`), pastda yana yorug' halqa (`#F4F4F4`). "Add to watchlist"dagi pushti tus — hero rasmning aksi; asosiy (neytral) variant — "Following".

### "Beating Hearts" ambient karta (5×5 to'r)
| y \ x | 298 | 330 | 370 | 410 | 450 | 490 |
|---|---|---|---|---|---|---|
| 680 (tepa) | `#65180B` | `#5A1509` | `#731B0F` | `#922610` | `#96220F` | `#911E0E` |
| 690 | `#682117` | `#5E1B16` | `#6E1D12` | `#8A2210` | `#8C210F` | `#8B1D10` |
| 735 (o'rta) | `#2E100C` | `#2B0E09` | `#341512` | `#3F130F` | `#40130B` | `#3E130C` |
| 760 | `#1C0D0A` | — | — | — | — | `#1D0C0A` |
| 775 (past) | `#100B0A` | — | — | `#120B09` | `#130A0A` | — |

→ tepada to'yingan qizil (posterning dominant rangi `#8C2615`, k-means), **yuqori-o'ngda eng yorug'** (`#96220F`), ~45% da `#3F130F`, pastda `#100B0A`. CSS: `radial-gradient(120% 90% at 75% 0%, #96220F 0%, #6E1D12 30%, #3F130F 55%, #100B0A 100%)`.

### "Recent activity" karta (profil)
Gorizontal: chap oltin `#7F7549`/`#AC9746` → o'rta to'q-sariq `#BE8E2F`/`#B35E2D` → o'ng qizil-binafsha `#9E3137` → `#8B1D45` → `#6C0C3B`; vertikal: pastga qarab qora (`#030303`, 858 px). Posterning ranglaridan olingan.

### Profil foni
Posterlar kolaji, kuchli blur va yashil tonlash (k-means `#232B0B`, `#4A4918`), pastga qarab qora (ism atrofida, y≈410 px, `#060702`). Glass orqaga tugmasi ostida fon `#354615`.

## 4. Nur va soya
- Glossy pill soyasi **o'lchab bo'lmaydi**: pill sof qora (`#010101`) fonda turibdi, ostida 474–498 px oralig'ida fon farqi 0. Soya tokeni ref-06 "Listen" pill'idan (iliq fonda) olinadi.
- Kartalarda tashqi soya yo'q (chegara tashqarisida darhol `#000000`/`#010101`).
- Slider knob — shisha sfera: tepasi karta rangini aks ettiradi (`#92716C`), o'rtasi trek rangini sindiradi (`#71B9E9`), pastda oq halqa (`#CCC0C0`).

## 5. Glass
| Element | Ichki rang vs atrof | Chegara | Xulosa |
|---|---|---|---|
| Chip (rasm ustida) | `#2A1F1C` vs `#271A15`…`#140B0A` | yuqori `#4D403D`, yon `#362D2C` | fill oq ~7% + backdrop blur; chegara oq ~17% (yuqori) → ~8% (yon) |
| Chip (qora ustida) | `#131313` | yuqori `#2D2D2D` | fill oq 7.5%, chegara oq ~17% |
| Orqaga doira (profil, 43 px = 48 pt) | `#364716` vs `#2F400F`/`#213201` | yuqori `#627342`, yon `#465827`/`#5D692E` | fill oq ~6–8%, chegara oq ~23% (yuqori) → ~10% (yon) |
| Nav | `#1E1E1E` → `#151515` | yuqori `#211F1D` | deyarli shaffof emas (karta ustida ham neytral) → ~92%+ |

## 6. Radiuslar (aylana bo'yicha least-squares fit, sintetik test aniqligi ±0.25 px)
| Element | R (px) | R (pt) | Izoh |
|---|---|---|---|
| Karta (Friend's box) tl/tr/bl/br | 24.75 / 24.75 / 25.0 / 25.75 | **27.8–28.9 → 28** | taxmin 22 — o'lchov 28 |
| Nav | 24.5 (bl) | 27.5 | balandlik 49 px → **to'liq pill** |
| BH poster | 8.0 | **9** | |
| Chip | balandlik 22–24 px | to'liq pill | |
| See all | 26 px balandlik | to'liq pill | |
| Tab "Today" | 27 px balandlik | to'liq pill | |
| Glossy pill | 46 px balandlik | to'liq pill (R 23 px = 25.8 pt) | |

## 7. Tipografiya
SF Pro metrikalari: cap 0.705 em, x-height 0.526 em, ascender ('l') 0.742 em. Ink-bbox bo'yicha:

| Matn | o'lchov (px) | pt | Shrift / o'lcham | Rang |
|---|---|---|---|---|
| "9:41" | cap 11 | 12.4 | SF 17 semibold | `#FFFDFA` |
| "MARTY" | cap 69, kenglik 108 | 77.5 / 121 | ultra-condensed heavy, CAPS | `#FFFFFE` |
| "SUPREME" | cap 45, kenglik 108 | 50.5 / 121 | ← (ikkala qator bir xil kenglikka justify qilingan) | |
| qatorlar orasi | 5 px | 5.6 | line-height ≈ 0.86 (kichik qator bo'yicha) | |
| Chip matni | asc 10, xh 7 | 11.2 / 7.9 | SF **15** regular | `#D0C3C1` |
| "Add to watchlist" | asc 10, xh 8 | 11.2 / 9.0 | SF **15** semibold | `#010000` |
| "Following" | asc 11 | 12.4 | SF **16–17** semibold | `#010101` |
| Tab "Today" / "Reviews" | asc 10, xh 7 | 11.2 / 7.9 | SF **15** medium / regular | `#FEFEFE` / `#A3A3A3` |
| "Friend's box", "Favorites", "Recent activity", "See all" | asc 10 | 11.2 | SF **15** regular | `#B4B4B4` / `#FBFBFB` / `#FCFCFC` / `#F5F5F5` |
| BH "Popular this week" / RA "Latest rating" | asc 10 | 11.2 | SF **15** regular | `#EAADA0` / `#F8C99C` |
| "Beating Hearts" | cap 18, xh 13 | 20.2 / 14.6 | SF **28** bold | `#FFFBF6` |
| "John Wick 3" | cap 15 | 16.8 | SF **24** bold | `#FFFCE9` |
| "sarah.lg" | asc 27, xh 17 | 30.3 / 19.1 | serif **40** regular (x-height 0.48 em) | `#FFFFFE` |
| Bio | asc 9 | 10.1 | SF **14** regular | `#AAAAAA` |
| Nav label | cap 6–7, xh 4–5 | 6.7–7.9 | SF **10** medium | `#F1F1F1` / `#E5E5E5` |

### Shrift oilalari (glif tahlili)
- **UI:** SF Pro (iOS tizim shrifti): 'a' ikki qavatli, 'g' bir qavatli, 'R' to'g'ri oyoq, '1' bayroqli, '7' to'g'ri. Eng yaqin bepul muqobil — **Inter** (ikkalasi ham neo-grotesk, deyarli bir xil proportsiya).
- **Displey sarlavha "MARTY SUPREME":** ultra-condensed, juda qalin, kontrastsiz grotesk, CAPS; 'M' yon tomonlari tik, 'R' oyog'i to'g'ri, 'S' tor. Harf kengligi/cap nisbati 0.31 (MARTY) … 0.34 (SUPREME). Nomzodlar IoU bilan solishtirilgan — `fonts.md` ga qarang.
- **Ism "sarah.lg":** keng proportsiyali transitional serif — ikki qavatli 'a' (tomchi terminal), ikki qavatli 'g' (o'ngga qaragan quloq), qavsli serif'lar, o'rta kontrast, katta x-height (asc'ga nisbati 0.63). Georgia tipidagi shrift. **Instrument Serif'ga o'xshamaydi** (u siqiq/condensed). Nomzodlar — `fonts.md`.

## 8. Layout (pt)
| Element | o'lcham | joylashuv |
|---|---|---|
| Sahifa cheti (karta/nav chap-o'ng) | **18** (16 px; Favorites kartasida 17.5 px = 19.6) | taxmin 16 — o'lchov 18 |
| Friend's box kartasi | 357 × 142.6 | |
| Kartalar orasidagi masofa | 13 px = **14.6** | |
| 3D quti tile | 64 × 62 px = **72 × 70** | qatorda 4 ta, to'liq ko'rinadi |
| BH poster | 73 × 102 px = **82 × 114.5** (nisbat 1.40) | karta ichida chap tomonda |
| Chip "Popular this week" | 135 × **25** (profil: 27) | 2 ta chip yonma-yon, orasi 8 px = 9 pt |
| Avatar (chip ichida) | 18 px = **20** | ustma-ust ~ −6 px = −7 pt |
| Glossy pill "Add to watchlist" | **173 × 52** | |
| "Following" pill | **123.5 × 43** | yonida "…" doira 26 px = **29** |
| Tab "Today" pill | 67 × **30** | |
| "See all" pill / "…" doira | 74 × **29** / **29** | |
| Slider trek | balandlik 16 px = **18**, to'liq yumaloq | chap uchi fondan erib chiqadi |
| Slider knob | 32 px = **36** | raqam ichida |
| Nav | 356 × **55** (pill) | chetdan 18, pastdan 32 px = 36; home indicator'dan 20 px = **22** yuqorida |
| Nav aktiv fon | 62 × 44 px = **70 × 49** | nav ichida ~3 pt inset |
| Nav "+" doira | 38 px = **42** | |
| Home indicator | 129 × 6 px → iOS spec **134 × 5** | |
| Profil 3D quti (avatar) | 144 × 156 px = **162 × 175** (old yuz + chuqurlik) | taxmin 140 — o'lchov 162 |
| Profil avatar badge | 47 px = **53** | |
| Profil orqaga doira | 43 px = **48** | |
| Favorites posterlari | 71 × 105 px = **80 × 118** (nisbat 1.48), qatorda 3.6 ta ko'rinadi | |

## 9. Ikonkalar
SF Symbols uslubi: nav'da filled (house.fill, aktiv) va outline (magnifyingglass, bell, archivebox) aralash, ~20 pt, stroke ~1.75 pt, round cap. "Add to watchlist" ikonkasi 17 pt outline. Bizning tizimda: bitta outline to'plami, stroke 1.75–2, round cap (PROMPT qoidasi).

## 10. 3D "quti" tile anatomiyasi (Friend's box)
Ustun x=225 (tepadan pastga): tepa halqa `#223D78`…`#2E50A2` (yorug' qirra, 4 px) → ichki chuqurlik (orqa devor) `#0E0E39` → `#042066` → `#00247E` (pastga qarab ko'karadi) → **old panel 63% balandlikda boshlanadi**: yuqori highlight `#275AD2`/`#2862E3` → asosiy `#1849C3` → pastga to'qlashadi `#143FA5` → `#11378C` → past qirra `#041C51`. Gorizontal: chap/o'ng qirralar ochroq (`#22468E`, `#2C55C2`). Avatar badge old panel markazida, 1.5 px halqa bilan.

## 11. Tekstura
Grain **yo'q**. Yuqori chastotali shovqin (L − 3×3 blur, std): qora fon 0.23, karta ichi 0.13, profil yashil foni 1.39 (blur qilingan rasm + webp). Taqqoslash uchun ref-06/07 qiymatlari `ref-06.md`/`ref-07.md` da.
