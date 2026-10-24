# 1-bosqich — SUMMARY (barcha o'lchovlar bitta jadvalda)

Har bir ref'ning to'liq tahlili: `ref-01.md … ref-07.md`; shriftlar: `fonts.md`; o'lchov skriptlari: `tools/`.
Ustunlar: **O'lchov** — referensdan olingan qiymat · **Manba** — ref va element · **Qaror** — `tokens.css` dagi qiymat.

## 0. Masshtablar
| Ref | Ekran (px) | k (pt/px) | Tekshiruv |
|---|---|---|---|
| ref-01 | 350 × 758 | 1.1229 | Dynamic Island 123.5×36 pt (iOS 126×37.33) ✓ |
| ref-02 | 254–258 × 570 | 1.523–1.547 | generativ mock, nisbat 2.19–2.24 (±2–3%) |
| ref-03 | 202.5 × 438 | 1.941 | home indicator 134 pt ✓ |
| ref-04 | 422 × 918 | 0.931 | balandlik 855 pt ✓ |
| ref-05 | perspektiva | — | faqat rang/uslub |
| ref-06 | 336 × 729 | 1.170 | nisbat 2.17 ✓ |
| ref-07 | 294 × 638 | 1.337 | nisbat 2.17 ✓ |

## 1. Ranglar
| Token | O'lchov | Manba | Qaror |
|---|---|---|---|
| Ekran foni | `#000000`–`#020101` | ref-01, 6 nuqta | `--bg-0: #000000` |
| Ekran foni (alternativ) | `#050505`–`#0A0A0A` | ref-02 | ishlatilmaydi (ref-01 skelet) |
| Karta foni | `#0A0B08` → `#141414` → `#161616` (vertikal) | ref-01 Friend's box, Favorites | `--bg-1: #141414`, `--card-fill: linear-gradient(180deg,#0B0B0B 0%,#141414 55%,#161616 100%)` |
| Tanlangan segmented tab | `#111111` | ref-01 "Today" | `--surface-tab: #111111` |
| "See all" / "…" | `#242424`, `#2B2B2B`, `#353535` | ref-01 | `--bg-3: #2B2B2B` |
| Janr tugmasi / to'q tugma | `#1F1F1F` / `#212121`–`#222222` | ref-02 | `--bg-2: #1F1F1F` |
| Nav foni | `#1E1E1E` → `#151515` | ref-01 | `--nav-fill: linear-gradient(180deg,#1E1E1E,#151515)` |
| Nav aktiv | `#2B2B2B` → `#313131` | ref-01 | `--nav-active: linear-gradient(90deg,#2B2B2B,#313131)` |
| Hairline (yuqori/yon) | oq 9% (`#171717` qora ustida) | ref-01 karta | `--line-1: rgba(255,255,255,.09)` |
| Hairline (past / kuchli) | oq 13–16% (`#212121`, `#292929`) | ref-01 karta past chet | `--line-2: rgba(255,255,255,.14)` |
| Matn 1 | `#FFFFFF`/`#FEFEFE` | ref-01 | `--text-1: #FFFFFF` |
| Matn 2 | `#B4B4B4` (71%), `#AAAAAA` | ref-01 Friend's box, bio | `--text-2: rgba(255,255,255,.71)` |
| Noaktiv tab | `#A3A3A3` (64%) | ref-01 | `--text-tab: rgba(255,255,255,.64)` |
| Matn 3 | `#818181`, `#797979`, `#767676` (46–51%) | ref-02 meta | `--text-3: rgba(255,255,255,.50)` |
| flame | `#F96430` (o'lch. `#FC6532`, ΔE 0.95) | ref-07 style guide | `--flame: #F96430` |
| ember | `#9A462A` (ΔE 1.68) | ref-07 | `--ember: #9A462A` |
| sand | `#E2BD99` (ΔE 0.64) | ref-07 | `--sand: #E2BD99` |
| rose | `#D06D6D` (ΔE 1.36) | ref-07 | `--rose: #D06D6D` |
| peach | `#FFDBC4` (ΔE 0.51) | ref-07 | `--peach: #FFDBC4` |
| cocoa | `#191209` (ΔE 2.23) | ref-07 | `--cocoa: #191209` |
| Peach matn iliq fonda | `#FFB198` | ref-06 "Amelia!" | `--peach-warm: #FFB198` |
| Iliq oq sarlavha | `#FFF7DE` / `#FFF9DB` | ref-06 "Relief Meditation" | `--warm-text-1: #FFF7DE` |
| Iliq subtitle | `#FFB677` / `#FFB372` | ref-06 | `--warm-text-2: #FFB677` |
| Halqa yadrosi | `#FFD384` / `#FED794` | ref-06 | `--ring-core: #FFD384` |
| Halqa glow | `#FB9541` / `#FFB46D` | ref-06 | `--ring-glow: #FB9541` |
| Yorug'lik manbai | `#FED979` | ref-06 o'ng-past | `--light-source: #FED979` |
| Glossy pill matni | `#010000`/`#010101` | ref-01 | `--cocoa` (PROMPT qarori: cocoa) |
| Oq pill (Luma) | `#FFFDFF`, matn `#141014` | ref-06 "Listen" | `--white-pill: #FFFDFF` |
| Qizil badge (ref) | `#DB471E` | ref-04 | → `--rose` (brend) |

## 2. Gradientlar
| Gradient | O'lchov | Manba | Qaror |
|---|---|---|---|
| Hero fade | hero 0…420 pt (ekranning 49%); fade hero balandligining **60%** dan boshlanadi; nisbiy yorqinlik 100/87/66/41/25/11/9/0 % (247→422 pt) | ref-01 | `--hero-fade: linear-gradient(180deg, rgba(0,0,0,0) 58%, rgba(0,0,0,.35) 68%, rgba(0,0,0,.6) 75%, rgba(0,0,0,.89) 86%, #000 100%)` |
| Glossy pill | 12 stop, qavariq kapsula: `#FFF` 0–10% → `#B7B7B7` 53–56% → `#F7F7F7` 96% | ref-01 "Following" (neytral) | `--glossy-fill` (§5) |
| Ambient karta | yuqori-o'ng yorqin `#96220F` → 45% `#3F130F` → past `#100B0A` | ref-01 Beating Hearts | `--ambient-card: radial-gradient(120% 90% at 75% 0%, var(--amb) 0%, color-mix(in srgb, var(--amb) 72%, #100B0A) 30%, color-mix(in srgb, var(--amb) 36%, #100B0A) 55%, #100B0A 100%)` — BH misolida `--amb: #96220F` → 30% `#722012`, 55% `#3F160E` (o'lchov `#3F130F` ✓); har drama o'z `--amb` rangi bilan |
| Iliq fon | 135° diagonal; radial fit (o'rtacha ΔE 5.6): `170% 110% at 90% 60%, #EC731E 0%, #C24809 34%, #A73406 40%, #962A05 45%, #8B2406 50%, #7E1D05 55%, #7B2D1C 74%` | ref-06 (`warm_fit.json`) | `--warm-bg` + yorug'lik manbai qatlami + halqa |
| flame → sand → ember | 135°: `#F96430` 0 · `#F67040` 12% · `#E2BD99` 48% · `#B77558` 75% · `#9A462A` 100% | ref-07 swatch A | `--grad-sunset` |
| cocoa → rose → peach | 135°: `#191209` 0 · `#79413E` 25% · `#D06D6D` 48% · `#EBB0A2` 75% · `#FFDBC4` 100% | ref-07 swatch B | `--grad-dusk` |
| VIP (sand varianti) | `#E2BD99 → #9A462A → #191209` | PROMPT §18 (ref-07 palitrasi) | `--grad-vip` |

## 3. Nur va soya
| Effekt | O'lchov | Manba | Qaror |
|---|---|---|---|
| Oq pill soyasi | 1–2 px da −10…12%, 3 px da −5%, offset ≈0 | ref-06 "Listen", ref-07 play | `--shadow-pill: 0 1px 4px rgba(25,18,9,.18)` |
| Glossy pill soyasi (ref-01) | o'lchab bo'lmaydi (sof qora fon) | ref-01 | `--shadow-pill` dan foydalaniladi |
| Glow tugma | doira 50 pt; nur asosan pastga, ~11 pt da so'nadi, yarim intensivlik 4–5 px | ref-04 nav markazi | `--glow-flame: 0 6px 16px rgba(249,100,48,.55)` |
| Nur halqasi | yadro 4–6 pt `#FFD384`, ichki glow 23 pt `#FB9541`, tashqarisi keskin qorong'i; r ≈ 1.9× ekran kengligi | ref-06 | `.ring` qatlami (radial-gradient) |
| Karta soyasi | yo'q | ref-01 | — |
| Kolaj "soya kartasi" | `#CCD0D1` (fondan 14 daraja), yumaloq to'rtburchak | ref-03 | qorong'i versiyada: `--line-1` to'ldirilgan blok |

## 4. Glass
| Tur | O'lchov | Manba | Qaror |
|---|---|---|---|
| Qorong'i UI glass (input, chip) | fill oq 7–8%, chegara oq 17–20% (yuqori), 8% (yon) | ref-04 qidiruv, ref-01 chip | `--glass-bg: rgba(255,255,255,.08)`, `--glass-line: rgba(255,255,255,.18)`, `--glass-line-soft: rgba(255,255,255,.08)` |
| Glass doira (rasm ustida) | c≈215, a≈0.25 (qorong'i fonda ≈ oq 20%); c≈193, a≈0.31 (to'q-sariq fonda) | ref-07 orqaga, −10/+10 | `--glass-bg-strong: rgba(215,215,215,.25)` |
| Frosted (nav doiralari) | c≈215–227, a≈0.41–0.59 | ref-06 nav | `--glass-bg-frost: rgba(220,220,220,.45)` |
| Glass chip (rasm ustida) | c≈148, a≈0.36 (to'yinganlikni kamaytiradi) | ref-06 "Recommended" | `--glass-chip: rgba(148,148,148,.36)` |
| To'q glass karta | qora ~32% tint, chet oq 12–15% | ref-04 NFT kartalar | `--glass-dark: rgba(0,0,0,.32)` |
| Nav glass (qorong'i) | fill oq 6–7%, yuqori chet 15% | ref-04 | `--glass-bg` + `--glass-line` |
| Blur kuchi | to'g'ridan-to'g'ri o'lchab bo'lmaydi (orqa fon allaqachon blur); glass orqali shakllar tanib bo'lmaydi | ref-04, ref-06 | `--glass-filter: blur(24px)` (saturate qo'shilmaydi — o'lchov to'yinganlik **kamayishini** ko'rsatdi) |

## 5. Glossy pill (to'liq)
`--glossy-fill: linear-gradient(180deg, #FFFFFF 0%, #FDFDFD 10%, #ECECEC 16%, #E1E1E1 24%, #D6D6D6 32%, #CBCBCB 40%, #BEBEBE 50%, #B7B7B7 56%, #C5C5C5 68%, #CCCCCC 79%, #D7D7D7 84%, #E3E3E3 87%, #F1F1F1 92%, #F7F7F7 96%)` — ref-01 "Following" (12 nuqta). Yuqori 1 px `#FFFFFF` (inset highlight), balandlik 43–52 pt.

## 6. Radiuslar
| Element | O'lchov (pt) | Manba | Qaror |
|---|---|---|---|
| Ekran | iOS spec | iPhone 15 Pro | `--r-screen: 55` |
| Sheet / katta karta / modal | 41 (glass karta), 39 (pastel karta) | ref-04, ref-03 | `--r-sheet: 40`, `--r-card-lg: 40` |
| Karta | 27.8–28.9 | ref-01 Friend's box | `--r-card: 28` |
| Media (post, kolaj, masonry) | 24.2 (post), 22.3 (masonry) | ref-04, ref-03 | `--r-media: 24` |
| 3D squircle tile | 16.8 (72 pt tile → 23%) | ref-01 Friend's box | `--r-squircle: 17` (katta tile'larda 23%) |
| Tile / to'rtburchak tugma / janr | 10–13 | ref-02 | `--r-tile: 11` |
| Poster | 11.0 (ref-02), 9 (ref-01 BH) | ref-02, ref-01 | `--r-poster: 11` |
| Thumbnail | 6.2 | ref-02 davom ettirish kartasi | `--r-thumb: 6` |
| Pill / chip / doira | to'liq | hammasi | `--r-pill: 999px` |

## 7. Tipografiya (shriftlar — `fonts.md`)
| Uslub | O'lchov | Manba | Qaror (shrift o'lcham/lh, tracking) |
|---|---|---|---|
| display-hero | MARTY cap 77.5 pt, SUPREME cap 50.5 pt, ikkala qator 121 pt kenglikka justify, lh ≈ 0.86 | ref-01 | Anton, qatorlar justify (har qatorga o'z o'lchami), lh 0.86 |
| display-num | — (ref'da yo'q) | PROMPT | Anton 72/0.9 |
| serif-xl | 40 (asc 30.3, xh 19.1) | ref-01 "sarah.lg" | Gelasio 40/1.0, +0.02em |
| serif-lg | — | PROMPT | Gelasio 32/1.05, +0.02em |
| editorial | 44, qatorlar oralig'i 62 pt (lh 1.41), −0.04em | ref-03 ro'yxat | Inter Tight 44/1.41, −0.04em |
| editorial-xl | 53, lh 0.98 | ref-03 "events upcoming" | Inter Tight 53/0.98, −0.04em |
| title-1 | 36, lh 0.97 | ref-06 "Relief Meditation" | Inter 36/0.97, regular, −0.015em |
| greeting | 30 | ref-06 "Hi, Amelia!" | Inter 30/1.1 regular |
| title-2 | 26–28 semibold | ref-04 "Results" | Inter 28/1.1, 600, −0.03em |
| title-3 | 24–28 bold | ref-01 Beating Hearts / John Wick | Inter 26/1.15, 700, −0.03em |
| title-4 | 24 regular | ref-07 "Take a deep breath..." | Inter 24/1.2, 400, −0.01em |
| subtitle (pleer) | — | PROMPT §11 | Inter 20/1.3, 500 |
| headline | 17–19 semibold | ref-02 bo'lim sarlavhasi | Inter 17/1.25, 600, −0.02em |
| button | 15 semibold (16–17 "Following") | ref-01 | Inter 15, 600, −0.01em |
| body | 15 (ref-01 UI matni deyarli hammasi 15) | ref-01 | Inter 15/1.4, −0.01em |
| footnote | 13 | ref-02 teglar, ref-04 "liked by", ref-06 chip | Inter 13/1.3 |
| caption | 11–12 | ref-02 nav, ref-07 vaqt | Inter 12/1.25, 500 |
| micro | 10 | ref-01 nav label | Inter 10, 500 |
| mono | ~11–12, CAPS | ref-03 | IBM Plex Mono 11, +0.04em, CAPS |
| status bar | 17 semibold | ref-01 "9:41" | Inter 17, 600 |

## 8. Layout
| O'lchov | Qiymat | Manba | Qaror |
|---|---|---|---|
| Sahifa cheti | **18** (ref-01 kartalar/nav), **18.6** (ref-04 qidiruv/nav/post), 16–22 (ref-02) | ref-01, ref-04 | `--page-x: 18` |
| Kartalar orasi | 14.6 | ref-01 | `--gap-card: 14` |
| Bo'limlar orasi | 27–35 | ref-02 | `--gap-section: 28` |
| Sarlavha → kontent | ~15 | ref-02 | `--gap-title: 14` |
| Poster | 107 × 164 (2:3), gap 12, 3.3 ta ko'rinadi | ref-02 | 104×156 (2:3), gap 12, 3.5 ta ko'rinadi (PROMPT §04) |
| Landscape karta | 193 × 128, progress 3 pt | ref-02 | 200×112 (16:9) — sketch "Davom ettirish" uchun, progress 3 |
| Glossy pill | 173 × 52 (Add to watchlist), 123.5 × 43 (Following) | ref-01 | balandlik `--h-pill: 52`, kichik `--h-pill-sm: 43` |
| Chip | 25–27 (ref-01), 32.7 (ref-06 glass), 38 (ref-06 outline) | | `--h-chip: 26`, `--h-chip-glass: 33` |
| Tab pill | 30 | ref-01 | `--h-tab: 30` |
| See all / … | 29 | ref-01 | `--h-pill-xs: 29` |
| Glass doiralar | 48 (ref-01), 54 (ref-07 boshqaruv), 58.5–58.8 (ref-06/07 orqaga) | | `--d-glass-sm: 44`, `--d-glass: 52`, `--d-glass-lg: 58` (PROMPT 44/52/64 → o'lchov bo'yicha) |
| Play doira | 56 | ref-07 | `--d-play: 56` |
| Nav | 356 × 55, chetdan 18, home indicator'dan 22 yuqori, aktiv 70 × 49 | ref-01 | `--nav-h: 55`, `--nav-x: 18`, `--nav-bottom: 36` |
| Nav markaziy doira | 42 | ref-01 "+" | `--nav-center: 42` |
| Qidiruv maydoni | 356 × 79 | ref-04 | `--h-search: 60` (PROMPT) vs o'lchov 79 → 60 saqlanadi (DEVIATIONS F5) |
| 3D quti tile | 72 × 70, old panel 63% balandlikda | ref-01 | `--tile-box: 72` |
| Profil quti | 162 × 175 | ref-01 profil | 150 × 162 (sketch matni sig'ishi uchun) |
| Avatar pufakchalari | 56 / 43 / 27 / 19.5; pastdagilar opacity ~0.5 | ref-04 aurora | shu o'lchamlar |
| Slider trek / knob | 18 / 36 | ref-01 | `--slider-h: 18`, `--knob: 36` |
| Glass slider | 313 × 55, nuqtalar oralig'i 30 | ref-07 | `--gslider-h: 55` |
| Progress chiziqchalari | aktiv 51.5 × 2.3, noaktiv ~20 | ref-06 | shu |
| Home indicator | 134 × 5 | ref-03, iOS | 134 × 5 |
| Dynamic Island | 126 × 37.33, tepadan 11 | iOS (ref-01 tasdiqladi) | shu |

## 9. Ikonkalar
Barcha ref'larda outline, stroke 1.5–2 pt, round cap/join; aktiv holatda filled. **Qaror:** bitta inline-SVG to'plami (`components.css` ichida emas — `design/icons.svg` sprite), 24 pt grid, stroke 1.75, round cap/join; aktiv nav ikonkasi filled.

## 10. Tekstura (yuqori chastota std, L − 3×3 blur)
| Ref | Qiymat | Xulosa |
|---|---|---|
| ref-01 / 02 / 03 / 04 | 0.13–1.39 / 0.08–0.46 / 0.19 / 0.24 | grain yo'q |
| ref-05 / 06 / 07 | 1.14 / 0.27–1.34 / 0.82–1.87 (sahifa foni 0.19–0.37) | **nozik grain** (fondan 4–10×) |
**Qaror:** iliq ekranlarda SVG feTurbulence grain; kuchi 5-bosqichda kalibrlanadi (3x skrinshot → ref k ga kichraytirilganda std ≈ 1–1.9).

## Dastlabki taxminlardan asosiy farqlar (o'lchov ustun)
| Element | Taxmin | O'lchov |
|---|---|---|
| ref-01 fon | `#0A0A0A` | `#000000` |
| Karta radiusi | 22 | **28** |
| Glossy pill | oq → `#E9E9E9` → `#D6D6D6`, soya `0 10px 28px .45` | qavariq kapsula (eng to'q `#B7B7B7` 55% da, pastda yorug' halqa), soya `0 1px 4px .18` |
| Glossy pill balandligi | 44 | **52** (Following 43) |
| Chip foni | qora 60% | **oq 7–8%** (fondan ochroq) |
| Slider trek / knob | 8 / 30 oq | **18 / 36** shisha sfera |
| Nav | 58 | **55**, home indicator'dan 22 |
| Sahifa cheti | 16 | **18** |
| Profil quti | 140 | **162** |
| Qidiruv maydoni | 60 | **79** |
| Pastel karta radiusi | 28 | **39** |
| Glass karta (NFT) | 28 | **41** |
| Luma pleer play | 64 | **56** (glass 54) |
| Editorial line-height | 0.95 | ro'yxat **1.41**, "events upcoming" **0.98** |
| Serif | Instrument Serif | **Gelasio** (IoU + ʻ glifi) |
| Mono | JetBrains Mono | **IBM Plex Mono** (ʻ glifi) |
