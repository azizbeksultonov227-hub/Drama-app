# ref-05 — Luma overview (3 ekran)

Fayl: `references/ref-05-luma-overview.png` (736×920). Chapda bosh sahifa (ref-06 ning kichik nusxasi), markazda shaffof kulrang "Meditations" ekrani, o'ngda pleer (ref-07). Ekranlar bir-birining ustiga tushgan va **perspektivada qiyshaygan** — shuning uchun bu yerdan faqat rang va uslub olinadi, geometrik o'lchamlar ref-06/07 dan olinadi.

## 1. Masshtab
Markaziy ekran qisman chap/o'ng ekranlar ostida qolgan va perspektivada (kulrang piksellar ko'rinadigan oralig'i: y=400 da x 418–498, y=600 da x 321–481) — to'liq kengligini o'lchab bo'lmaydi, shuning uchun yagona k yo'q. O'lchamlar uchun ref-06 (k=1.170) va ref-07 (k=1.337) ishlatiladi.

## 2. Ranglar
| Element | HEX | Manba |
|---|---|---|
| Sahifa foni | `#E5C6B5` (tepa) → `#D69D8E` (past), `#DFB2A4` | (60,80), (700,880), (40,500) |
| Markaziy ekran (shaffof kulrang) | `#B4B4B4` / `#A9A9A9` / `#929292` | neytral |
| Filtr pill'lar (glass, och) | `#C2C2C2` … `#D5D5D5`, chet `#E1E1E1` | kulrang fon ustida oq ~25–35% |
| Ikki tusli sarlavha | to'q so'z `#878C8A`, och so'z `#A9A8A9` | past rezolyutsiya |

### k-means (k=10)
Butun rasm: `#D8A292` 31.0% · `#E4C3B3` 30.2% · `#A9A8A7` 7.9% · `#9B300A` 7.4% · `#6A2715` 6.3% · `#DE5F15` 4.8% · `#955943` 4.2% · `#E78D43` 4.0% · `#23160B` 3.1% · `#F8F3F1` 1.0%
Markaziy ekran: `#A7A2A1` 29.3% · `#BBB9B9` 22.7% · `#F1AB72` 14.7% · `#E9653A` 10.2% · `#6F5E5F` 6.8% · `#F4EADA` 6.6% · `#A75349` 5.0% · `#523838` 4.7%

## 3. Gradientlar
- Organik (blob) kartalar ichida rasm: to'q-sariq `#E9653A` → och `#F1AB72`, kartalar shakli — yumaloq to'rtburchaklar ustma-ust tushgan, bir burchagi "o'yilgan" (style guide'dagi L-shakl bilan bir xil DNK: ref-07 §3).
- Ikki tusli sarlavha: birinchi so'zlar to'q, qolgani kulrang ("Which mediations **will you choose today?**").

## 4. Nur va soya
Karta ostida yumshoq keng soya (kulrang ekran ustida to'qroq dog'). Aniq o'lchab bo'lmaydi (perspektiva + shaffoflik).

## 5. Glass
Filtr pill'lar: kulrang fon ustida oq ~25–35%, 1 px oq chet (`#E1E1E1`). "Listen" pill — oq, ref-06 bilan bir xil.

## 6. Radiuslar
Blob kartalar katta radiusli (vizual baho, perspektiva tufayli o'lchanmadi); pill'lar to'liq yumaloq.

## 7. Tipografiya
ref-06/07 bilan bir xil oila (gumanistik sans, regular). Ikki tusli sarlavha o'lchami vizual baho (~28 pt), perspektiva tufayli tasdiqlanmagan.

## 8. Layout
Filtr pill'lar gorizontal scroll; kartalar vertikal, bir-birining ustiga tushadi (vizual — o'lchanmadi).

## 9. Ikonkalar
ref-06/07 bilan bir xil to'plam.

## 10. Tekstura
Markaziy ekran yuqori chastota std 1.14 (rasm ichida), sahifa foni 0.37 → nozik grain.
