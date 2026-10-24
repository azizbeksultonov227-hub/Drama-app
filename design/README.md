# Short-drama ilova — UI dizayn

Faqat HTML + CSS (framework/build yo'q). Ekran o'lchami 393 × 852 (iPhone 15 Pro), 1 pt = 1 CSS px.

## Qanday ochish
1. Repozitoriyni yuklab oling.
2. Chrome/Safari'da istalgan ekranni oching: `design/screens/04-bosh-sahifa.html` va h.k. Brauzer oynasini kamida 393 px qiling.
3. Komponentlar galereyasi: `design/components.html`.
4. Shriftlar Google Fonts'dan yuklanadi (internet kerak): Anton, Gelasio, Inter, Inter Tight, IBM Plex Mono.

> `index.html` (iPhone ramkalaridagi taqdimot) va `styleguide.html` 4-bosqichda qo'shiladi.

## Tuzilma
```
design/
├── analysis/      1-bosqich: ref-01…07.md, SUMMARY.md, fonts.md, DEVIATIONS.md, tools/ (o'lchov skriptlari)
├── tokens.css     barcha ranglar, soyalar, radiuslar, o'lchamlar, shriftlar (manbasi izohda)
├── components.css komponentlar (icons.css va art.css ni import qiladi)
├── icons.css      bitta ikonka to'plami (tools/build_icons.py yaratadi)
├── art.css        rasm placeholder'lari, grain, status bar glifi (tools/build_art.py yaratadi)
├── components.html
├── screens/       01…30 (hozircha 04, 10, 11)
├── data/dramas.md har bir drama ↔ rasm/ambient rang
├── shots/         Playwright skrinshotlari (3x)
├── compare/       sketch | dizayn | ref montajlari
└── tools/         shoot.js, compare.py, build_*.py, measure_text.js
```

## Skrinshot va montaj
```
node design/tools/shoot.js 3 design/shots design/screens/04-bosh-sahifa.html
python3 design/tools/compare.py 04 10 11
```

## Rasmlar haqida
`images.unsplash.com` hozirgi muhitda tarmoq siyosati bilan bloklangan, shuning uchun har bir drama uchun ambient rang + siluet + grain placeholder ishlatilgan (`data/dramas.md`). Unsplash ochilsa, `.art` elementi ichiga `<img>` qo'yiladi — grading va grain saqlanadi.
