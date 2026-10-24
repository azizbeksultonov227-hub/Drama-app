# ref-04 — Glass NFT (chap, qorong'i) + "aurora" ijtimoiy lenta (o'ng, oq)

Fayl: `references/ref-04-glass-social.webp` (980×1225) — eng yuqori rezolyutsiyali referens (1 px = 0.93 pt).

## 1. Masshtab
| | Chap (NFT) | O'ng (aurora) |
|---|---|---|
| Ekran x | 51 … 472 | 506 … 927 |
| Kenglik | 422 px | 422 px |
| Ekran y | 153 … 1062 (918 px → 855 pt ✓) | ~146 … 1059 |

**k = 393 / 422 = 0.931 pt/px.** Telefon korpusi och kumush (ramka ~6 px).

## 2. Ranglar
| Element | HEX | Manba |
|---|---|---|
| NFT fon (blur foto) | `#131C20` (ko'kish, tepa) · `#171414`/`#342B25` (k-means asosiy) · to'q-sariq dog' `#773916`/`#6E2E13` · pushti `#A93D6D` | |
| Qidiruv maydoni ichi | `#252D31` … `#2B3339` | tashqarisi `#131C20` / `#161A22` → **+18…21 daraja = oq ~8%** |
| Qidiruv chegarasi | yuqori `#4A5256`, past `#465156`, chap `#63939E` (ko'k fon ustida), o'ng `#424242` | → **oq ~18–20%** |
| Glass nav ichi | `#2D2926` (iliq) | tashqi `#1D1914` / `#161111` → oq ~6–7%; yuqori chet `#4F4B46` (~15%) |
| Glass strelka doira | `#3D3634` | atrofi `#231815` → oq ~10–12% |
| Glass karta ichi (NFT) | `#4D1E0E` (tashqi `#6E2E13`), `#2E2815` (tashqi `#453F2D`) | **fondan to'qroq**: × ~0.68 → qora ~32% tint + blur |
| Glass karta cheti | `#824C37` (tepa), `#655F4C` (chap) | → oq ~12–15% |
| Son badge ("8") | fon `#424244`, raqam `#FCFCFD` | glass kulrang |
| Qizil son badge ("5") | `#DB471E` / `#D53F22`, raqam oq | |
| Glow tugma yadrosi | `#8367E7` / `#8960DB` (binafsha) | → bizda **flame** (binafsha taqiqlangan) |
| Oq strelka doira | `#FFFFFF` | |
| Matn (qorong'i) | `#FAFFFF` (Results), `#F3FEFF` (Collections), `#FCFEFF` (input) | |
| Aurora lenta foni | `#FFFFFF` / `#FFFFFE` | |
| Aurora header foni | `#FDF2EF` / `#FBF3EF` / `#FEF7F5` (pushti tus) | |
| Aurora matn: username / caption / "liked by" | `#060605` / `#2D2D2D` / `#6E6E6E` | |

### k-means (k=10)
- Chap: `#171414` 31.4% · `#342B25` 29.8% · `#57453C` 10.6% · `#773916` 8.4% · `#416670` 5.7% · `#C4ABB8` 4.0% · `#F5F5F6` 3.3% · `#957E69` 3.1% · `#A93D6D` 2.5% · `#6A2FA5` 1.1%
- O'ng: `#FDFAF8` 43.8% · `#353929` 9.7% · `#DCDCDC` 8.5% · `#699DCF` 7.1% · `#969D9D` 7.0% · `#BBBFC2` 7.0% · `#746A37` 5.7% · `#5D706B` 5.1% · `#141408` 4.9% · `#285B8D` 1.3%

## 3. Gradientlar
- NFT fon: blur qilingan foto — yuqori chapda ko'kish (`#396974`), o'rtada to'q-sariq dog' (`#773916`), pastda iliq qora (`#161111`). Bu "blurred blobs" usuli: aniq gradient emas, katta radial dog'lar.
- Aurora: tepada pushti tus (`#FDF2EF`) → oq (`#FFFFFF`), avatar pufakchalari zonasida.
- Aurora pastki nav: qavariq "tepalik" shaklidagi oq glass panel, yuqorida shaffofroq (`#C5C1AE` rasm ustida) → pastda `#EFEFEF`.

## 4. Nur va soya
**Glow tugma (nav markazi):** binafsha doira 54 px = **50 pt**; nur asosan **pastga**: doira pastidan (B−G) ortiqchaligi 53 → 31 → 16 → 4 (1024 → 1036 px), ya'ni ~12 px = **11 pt** da so'nadi, yarim intensivlik ~4–5 px. Chapda/tepada deyarli yo'q.
→ CSS: `box-shadow: 0 6px 16px rgba(<rang>, .55)` (offset-y 6 pt, blur 16 pt, rang = tugma rangi ~55%).
Oq strelka doira: nav glass'i ostida qoladi (pastki qismi `#B0AFAB` — glass orqali ko'rinadi).

## 5. Glass (o'lchangan)
| Komponent | Fill | Chegara | Blur |
|---|---|---|---|
| Qidiruv maydoni | oq **8%** | oq **18–20%**, 1 px, yuqori/past bir xil | kuchli (orqadagi foto tanib bo'lmaydi) |
| Nav | oq **6–7%** | yuqori oq **15%** | kuchli |
| Glass doira (strelka) | oq **10–12%** | sezilarsiz | kuchli |
| Glass karta (NFT) | **qora ~32%** (to'q tint) | oq **12–15%** | kuchli |
| Son badge | `#424244` ≈ oq 20% | — | |

## 6. Radiuslar
| Element | R | Izoh |
|---|---|---|
| Qidiruv maydoni | balandlik 85 px → **to'liq pill** (≈40 pt) | |
| Nav | 79 px balandlik → to'liq pill | |
| Glass karta (NFT) | ~44 px → **41 pt** (qo'lda fit, nuqtalar: t=4.5→e=26 … t=32.5→e=2) | taxmin 28 — o'lchov 41 |
| Aurora post rasmi (tr) | 26.0 px (xato 0.07) → **24 pt** | taxmin 24 ✓ |
| Doiralar | 50% | |

Aurora post rasmi: chap chet x=526.5, tepasi y=446.5, pastki chet y=680.5 (x=600). Pastki-o'ng burchakda **o'yilgan joy (notch)**: x 811…893 (83 px = **77 pt** keng), y 662…680 (19 px = **18 pt** chuqur), ikki tomonida teskari (konkav) burchaklar; ichida ulashish (kulrang) va yurak (qora) ikonkalari. Chap-yuqori burchakda avatar uchun o'yiq (avatar oq halqa bilan rasm ustiga chiqadi).

## 7. Tipografiya (SF Pro tipi → Inter)
| Matn | o'lchov | pt | O'lcham | Rang |
|---|---|---|---|---|
| "Results" | cap 20, xh 14 | 18.6 / 13.0 | **26–28** semibold (taxmin 28 ✓) | `#FAFFFF` |
| "Collections" | asc 13, xh 9 | 12.1 / 8.4 | **16–17** regular | `#F3FEFF` |
| "Top - Seller NFT" | cap 14 | 13.0 | **18** regular | `#FEFAF0` |
| Input "Solana Monkeys" | cap 14, xh 11 | 13 / 10.2 | **18–19** regular | `#FCFEFF` |
| "5 SOL" / "12 SOL" | cap 16 | 14.9 | **21** semibold | `#FFFFFE` |
| "Hawaii" (burilgan) | xh 24 | 22.4 | **~44** bold | `#FEFDFE` |
| Son badge raqami | 11 px | 10.2 | **14** | `#FCFCFD` |
| "aurora" | xh 13 | 12.1 | **22–23** bold | `#010000` |
| Username "todd.curtis" | asc 11, xh 8 | 10.2 / 7.5 | **14** medium | `#060605` |
| "liked by" / ismlar | xh 7 | 6.5 | **13** regular / semibold | `#6E6E6E` / `#080908` |
| Caption | xh 8 | 7.5 | **14** regular, 2 qator | `#2D2D2D` |

## 8. Layout (pt)
| Element | o'lcham | joylashuv |
|---|---|---|
| Sahifa cheti | **18.6** (qidiruv, nav, post rasmi 19) | ref-01 bilan mos (18) |
| Matn cheti (Results, Collections) | 20.5 | |
| Qidiruv maydoni | **356 × 79** (taxmin 60 — o'lchov 79); ikonka o'ngda, matn chapdan 50 pt | |
| Avatar doiralar | **66** (71 px), 3 ta + strelka doira **67**, orasi ~11 pt | taxmin 72 |
| Son badge | **25.6** doira | |
| Glass kartalar | ~**261 × 291**, ikkinchisi ~−6° burilgan va ustiga tushgan | |
| Oq strelka doira | **65** | |
| Nav | **355 × 73.5**, chetdan 18.6 | taxmin 72 ✓ |
| Nav markaziy glow tugma | **50** | |
| Qizil badge | **17.7** | |
| Aurora markaziy avatar | **56** (+ badge 19) | |
| Avatar pufakchalari | **43 / 27 / 19.5** (turli o'lcham) | yuqoridagilar to'liq kontrast (std 34), pastdagilar yuvilgan (std 19–23, min 173) → **opacity ≈ 0.5** |
| Post avatar | **31** (taxmin 32 ✓), username yonida 82 pt chapdan | |
| Post rasmi | **355 × 218** | |
| Aurora "+" tugma | **31.6** qora doira | |

## 9. Ikonkalar
Outline, stroke ~1.75 pt, round cap/join (person+, chat, chart, chat-badge, lupa); aktiv/urg'u ikonka filled (yurak, ulashish samolyoti, uy). O'lcham ~24 pt.

## 10. Tekstura
Grain yo'q: NFT blur foni yuqori chastota std = **0.24**.
