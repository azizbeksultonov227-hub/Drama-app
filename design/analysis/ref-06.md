# ref-06 — Luma bosh sahifa ("Hi, Amelia!")

Fayl: `references/ref-06-luma-home.png` (736×920). O'ngda ikkinchi ekranning bir qismi (o'lchanmagan).

## 1. Masshtab
Ekran: x 198.5 … 534.5 (336 px), y 96.5 … 825.5 (729 px). Nisbat 2.17 ✓. **k = 393 / 336 = 1.170 pt/px.** Ramka yo'q (tekis mockup, pushti fon `#DCB5A7`).

## 2. Ranglar
| Element | HEX | Manba |
|---|---|---|
| Fon — yuqori chap | `#641101` … `#691405` | (205–300, 105) |
| Fon — chap ustun (pastga) | `#761803` (150 pt) → `#8B1F04` (384) → `#90280A` (571) → `#8C290F` (712) → `#722610` (805) | x=205 |
| Fon — o'ng ustun (pastga) | `#490B03` (10 pt, halqa tashqarisi) → `#EF6C14` (197) → `#F07B1E` (291–384) → `#F18021` (431) → `#F5882C` (525) → `#F59132` (571) → `#F9993B` (618) → `#FAA649` (665) → `#F9BF74` (712) → `#FED979` (759, yorug'lik manbai) | x=505 |
| Markaz (218 pt, 431 pt) | `#DA560C` | |
| Halqa cheti (yadro) | `#FFD384` / `#FED794` / `#FFD38B` | y 264–300 px |
| Halqa yorqinligi (ichki) | `#FB9541` → `#FFB46D` | |
| "Hi," | `#FFF6E7` | |
| "Amelia!" (peach) | **`#FFB198`** (ekranda) | style guide'dagi `#FFDBC4` dan to'qroq — to'q-sariq fon ustida |
| Sarlavha "Relief Meditation" | `#FFF7DE` / `#FFF9DB` | iliq oq |
| Subtitle | `#FFB677` / `#FFB372` | peach-sariq |
| Chip "Recommended" matni | `#FFD5BE` | |
| "Listen" pill fon / matn | `#FFFDFF` / `#141014` | matn ≈ cocoa |
| Outline chip matni ("Music") | `#F79D85` | |
| Nav aktiv doira | `#FFFDFC` | |
| Status bar matni | `#FFE0CC` | |

### k-means (k=10, ekran ichi)
`#992E09` 21.0% · `#832107` 16.8% · `#B7440E` 13.1% · `#631608` 11.3% · `#F0761D` 11.1% · `#D8580E` 10.4% · `#F5943B` 7.5% · `#BA8470` 3.2% · `#FDF7F2` 2.9% · `#F1C38A` 2.6%  (manba: `kmeans_luma.txt`)

## 3. Gradientlar
**Fon:** diagonal (≈ 135°, yuqori-chapdan past-o'ngga) to'q bordo → yorqin to'q-sariq/amber; yorug'lik manbai past-o'ngda (`#FED979`). Yuqori-o'ng burchak halqa tashqarisida qorong'i (`#490B03`).
CSS ekvivalenti (o'lchangan nuqtalar bo'yicha):
`radial-gradient(130% 95% at 100% 88%, #FED979 0%, #F9993B 14%, #F18021 27%, #DA560C 42%, #A9380A 58%, #8C2205 74%, #641101 100%)`.

**Nur halqasi (light ring):** ekranning o'ng chetidan o'tadigan juda katta aylana (uch nuqta (474,167), (533,300), (509,740) → markaz ekrandan chapda, r ≈ 1.9 × ekran kengligi). Chet profili (y = 250 px): ichkarida 108 → 128 (20 px = **23 pt** davomida yorqinlik oshadi) → halqa yadrosi 3–5 px = **4–6 pt** (`#FFD384`, L≈215) → tashqarida keskin tushish (82 → 57).
CSS: katta `radial-gradient` doirasi, cheti `#FFD384` 4 pt + ichki glow `#FB9541` 23 pt; tashqarisi qorong'i.

## 4. Nur va soya
- **"Listen" pill soyasi** (o'lchangan, iliq fonda): pill chetidan 1–2 px tashqarida fon ~10–12% to'qlashadi, 3 px da ~5%, 4 px dan keyin 0. Yuqorida ham, pastda ham bir xil (offset ≈ 0–1 px). → `box-shadow: 0 1px 4px rgba(25,18,9,.18)`. (Dastlabki taxmin `0 10px 28px .45` — o'lchov bilan tasdiqlanmadi.)
- Ekran chetlarida ichki qorayish (chap chet `#6F2308` vs ichkari `#7A1D01`) — yengil vinyetka.

## 5. Glass
Kanallar bo'yicha yechim (rang = a·c + (1−a)·fon):

| Element | Ichki vs tashqi | Yechim |
|---|---|---|
| Menyu doirasi (50 px = **58.5 pt**) | `#8C351B` vs `#801C00` | kulrang-oq **c≈208, a≈0.10–0.13**; chegara yuqori ~**17%**, yon ~15% |
| Nav glass doiralari (54 pt) | `#BB8D86` vs `#AF4011`; `#9C7569` vs `#642214` | **c≈215–227, a≈0.41–0.59** (kuchli, "frosted") |
| Chip "Recommended" (32.7 pt) | `#A55835` vs `#B13900`/`#BE4105` | **c≈148 (`#949494`), a≈0.36** — neytral kulrang, to'yinganlikni kamaytiradi |
| Outline chip ("Music", 38 pt) | ichi ≈ fon | fill yo'q; chegara 1–2 px oq ~20–30% |
| "Breath" chip | `#E88432` vs `#FB9938` | qora ~7% tint |

## 6. Radiuslar
Hammasi to'liq yumaloq: doiralar (58.5 / 54 pt), chip'lar (32.7 / 38 pt), "Listen" pill (59.7 pt baland → R 29.9 pt). Ekran burchagi ~55 pt (mockup).

## 7. Tipografiya ("Lao Muang Khong" — ekrandagi glif'lar gumanistik sans; IoU: Noto Sans 0.87, Open Sans 0.85, Inter 0.60 — `fonts.md`)
| Matn | o'lchov (px) | pt | O'lcham | Rang |
|---|---|---|---|---|
| "Hi, Amelia!" | cap 18 | 21.1 | **30** regular | `#FFF6E7` + `#FFB198` |
| "Recommended" | asc 8 | 9.4 | **13** regular | `#FFD5BE` |
| "Relief / Meditation" | cap 23–24, xh 16, baseline 395→425 | 27–28 / 18.7 / **35** | **36** regular, line-height **0.97** | `#FFF7DE` |
| Subtitle (2 qator) | asc 8–9 | 9.4–10.5 | **13–14** regular | `#FFB677` |
| "Listen" | asc 8 | 9.4 | **13** semibold | `#141014` |
| Chip matni | asc 8 | 9.4 | **13** | `#F79D85` |
| Status "11:30" | cap 8 | 9.4 | 13 (mockup) | `#FFE0CC` |

## 8. Layout (pt)
| Element | o'lcham | joylashuv |
|---|---|---|
| Matn chap cheti ("Hi,") | **20.5** | |
| Logo / menyu doirasi | logo ~47 pt; doira **58.5**, o'ng chetdan ~18 | |
| Kontent bloki (chip, sarlavha, Listen) | chap cheti **170** (o'ng yarmida) | |
| Chip "Recommended" | **112 × 33** | |
| "Listen" pill | **100.6 × 59.7** (taxmin 52) | |
| Progress chiziqchalari | aktiv **51.5 × 2.3** (oq ~48%), noaktivlar ~20 pt × 2.3 (oq ~20–25%), oraliq ~5 pt | |
| Kategoriya chip'lari | balandlik **38**, "Music" 62.6 keng, orasi ~5 pt, gorizontal scroll | |
| Pastki nav | 4 doira **54 pt**, oraliq ~1–2 pt (deyarli tegib turadi); aktiv — oq, qolganlari kuchli glass | pastdan ~24 pt |

## 9. Ikonkalar
Outline, stroke ~1.5 pt, round cap: uy, bosh+yulduz, oy, yurak+nuqta; "☰" (3 chiziq, glass doira ichida); "▷" (outline play) Listen'da. Logo — oq lotus (filled).

## 10. Tekstura
Yuqori chastota std: qorong'i maydon 1.34, chap-past 0.27, o'ng-o'rta 0.71 (pushti sahifa foni ref-07 da 0.19). Grain bor, lekin juda nozik (kichraytirilgan rasmda ~1 daraja). Bizning grain qatlamini shu darajaga kalibrlaymiz (5-bosqich: 3x skrinshotni ref k ga kichraytirib, std ≈ 1–1.9 bo'lishi kerak).
