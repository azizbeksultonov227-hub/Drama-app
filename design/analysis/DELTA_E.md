# ΔE: render ↔ referens

`python3 design/tools/delta_e.py` — har bir yuza referensdagi bilan bir xil fon ustida render qilinadi, 5×5 o'rtacha, CIE76.

| Yuza | Ref | Render | ΔE | Manba |
|---|---|---|---|---|
| Glossy pill 5% | `#FFFFFF` | `#FEFEFE` | 0.35 ✓ | ref-01 "Following" |
| Glossy pill 16% | `#ECECEC` | `#ECECEC` | 0.00 ✓ | ref-01 "Following" |
| Glossy pill 24% | `#E1E1E1` | `#E2E2E2` | 0.35 ✓ | ref-01 "Following" |
| Glossy pill 32% | `#D6D6D6` | `#D6D6D6` | 0.00 ✓ | ref-01 "Following" |
| Glossy pill 40% | `#CBCBCB` | `#CACACA` | 0.36 ✓ | ref-01 "Following" |
| Glossy pill 50% | `#BEBEBE` | `#BDBDBD` | 0.36 ✓ | ref-01 "Following" |
| Glossy pill 53% | `#B7B7B7` | `#BBBBBB` | 1.47 ✓ | ref-01 "Following" |
| Glossy pill 68% | `#C5C5C5` | `#C5C5C5` | 0.00 ✓ | ref-01 "Following" |
| Glossy pill 79% | `#CCCCCC` | `#CCCCCC` | 0.00 ✓ | ref-01 "Following" |
| Glossy pill 84% | `#D7D7D7` | `#D6D6D6` | 0.36 ✓ | ref-01 "Following" |
| Glossy pill 87% | `#E3E3E3` | `#E3E3E3` | 0.00 ✓ | ref-01 "Following" |
| Glossy pill 92% | `#F1F1F1` | `#F1F1F1` | 0.00 ✓ | ref-01 "Following" |
| Glossy pill 95% | `#F7F7F7` | `#F7F7F7` | 0.00 ✓ | ref-01 "Following" |
| Nav foni (tepa) | `#1E1E1E` | `#2D2D2D` | 7.16 ✗ | ref-01 nav → U6: liquid glass (ataylab shaffof, orqa kontent koʻrinadi) |
| Nav foni (past) | `#151515` | `#1D1D1D` | 4.16 ✗ | ref-01 nav → U6: liquid glass (ataylab shaffof, orqa kontent koʻrinadi) |
| Karta (o'rta) | `#141414` | `#141414` | 0.00 ✓ | ref-01 Friend's box |
| Ekran foni | `#000000` | `#000000` | 0.00 ✓ | ref-01 |
| Flame | `#FC6532` | `#F96430` | 0.95 ✓ | ref-07 doira (o'lchangan) |
| Glass doira (qorongʻi fonda) | `#48423D` | `#463F3A` | 1.32 ✓ | ref-07 orqaga doira |
| Glass doira (toʻq-sariq fonda) | `#B46B5D` | `#AE6A53` | 5.10 ✗ | ref-07 "−10/+10" (blur chegarasi 4.63) |
| Glass chip | `#A55835` | `#A65935` | 0.61 ✓ | ref-06 "Recommended" |
| Glass frost (1) | `#BB8D86` | `#B68874` | 7.57 ✗ | ref-06 nav doirasi (blur chegarasi ~7) |
| Glass frost (2) | `#9C7569` | `#977B75` | 6.53 ✗ | ref-06 nav doirasi (blur chegarasi ~7) |

**Glossy pill profili:** oʻrtacha ΔE 0.25, max 1.47.

**Iliq fon (ref-06, 2389 nuqta; `.warm` + `.ring` 393×852 da render; status bar, logo, matn, siluet, nur va halqa cheti ±14 px chiqarilgan):** oʻrtacha ΔE 3.23, mediana 2.50, p90 6.23.

- Fon maydoni (halqadan > 45 pt, 2263 nuqta): oʻrtacha **2.81**, mediana 2.39
- Halqa nuri zonasi (≤ 45 pt, 126 nuqta): oʻrtacha 10.65 — fotografik nur vs CSS box-shadow (DEVIATIONS)
