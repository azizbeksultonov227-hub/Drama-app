# ΔE: render ↔ referens

`python3 design/tools/delta_e.py` — har bir yuza referensdagi bilan bir xil fon ustida render qilinadi, 5×5 o'rtacha, CIE76.

| Yuza | Ref | Render | ΔE | Manba |
|---|---|---|---|---|
| Glossy pill 5% | `#FFFFFF` | `#FEFEFE` | 0.35 ✓ | ref-01 "Following" |
| Glossy pill 16% | `#ECECEC` | `#EBEBEB` | 0.35 ✓ | ref-01 "Following" |
| Glossy pill 24% | `#E1E1E1` | `#E0E0E0` | 0.35 ✓ | ref-01 "Following" |
| Glossy pill 32% | `#D6D6D6` | `#D6D6D6` | 0.00 ✓ | ref-01 "Following" |
| Glossy pill 40% | `#CBCBCB` | `#CBCBCB` | 0.00 ✓ | ref-01 "Following" |
| Glossy pill 50% | `#BEBEBE` | `#BDBDBD` | 0.36 ✓ | ref-01 "Following" |
| Glossy pill 53% | `#B7B7B7` | `#BBBBBB` | 1.47 ✓ | ref-01 "Following" |
| Glossy pill 68% | `#C5C5C5` | `#C5C5C5` | 0.00 ✓ | ref-01 "Following" |
| Glossy pill 79% | `#CCCCCC` | `#CECECE` | 0.72 ✓ | ref-01 "Following" |
| Glossy pill 84% | `#D7D7D7` | `#D6D6D6` | 0.36 ✓ | ref-01 "Following" |
| Glossy pill 87% | `#E3E3E3` | `#E4E4E4` | 0.35 ✓ | ref-01 "Following" |
| Glossy pill 92% | `#F1F1F1` | `#EFEFEF` | 0.70 ✓ | ref-01 "Following" |
| Glossy pill 95% | `#F7F7F7` | `#F6F6F6` | 0.35 ✓ | ref-01 "Following" |
| Nav foni (tepa) | `#1E1E1E` | `#1D1D1D` | 0.50 ✓ | ref-01 nav |
| Nav foni (past) | `#151515` | `#161616` | 0.53 ✓ | ref-01 nav |
| Karta (o'rta) | `#141414` | `#141414` | 0.00 ✓ | ref-01 Friend's box |
| Ekran foni | `#000000` | `#000000` | 0.00 ✓ | ref-01 |
| Flame | `#FC6532` | `#F96430` | 0.95 ✓ | ref-07 doira (o'lchangan) |
| Glass doira (qorongʻi fonda) | `#48423D` | `#463F3A` | 1.32 ✓ | ref-07 orqaga doira |
| Glass doira (toʻq-sariq fonda) | `#B46B5D` | `#AE6A53` | 5.10 ✗ | ref-07 "−10/+10" (blur chegarasi 4.63) |
| Glass chip | `#A55835` | `#A65935` | 0.61 ✓ | ref-06 "Recommended" |
| Glass frost (1) | `#BB8D86` | `#B68874` | 7.57 ✗ | ref-06 nav doirasi (blur chegarasi ~7) |
| Glass frost (2) | `#9C7569` | `#977B75` | 6.53 ✗ | ref-06 nav doirasi (blur chegarasi ~7) |

**Glossy pill profili:** oʻrtacha ΔE 0.41, max 1.47.

**Iliq fon (ref-06, 2389 nuqta; `.warm` + `.ring` 393×852 da render; status bar, logo, matn, siluet, nur va halqa cheti ±14 px chiqarilgan):** oʻrtacha ΔE 3.23, mediana 2.49, p90 6.20.

- Fon maydoni (halqadan > 45 pt, 2263 nuqta): oʻrtacha **2.81**, mediana 2.39
- Halqa nuri zonasi (≤ 45 pt, 126 nuqta): oʻrtacha 10.66 — fotografik nur vs CSS box-shadow (DEVIATIONS)
