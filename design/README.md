# Short-drama ilova — UI dizayn

Faqat HTML + CSS (+ index/styleguide'da minimal vanilla JS). Framework va build yo'q. Ekran o'lchami 393 × 852 (iPhone 15 Pro), 1 pt = 1 CSS px. Barcha matnlar o'zbek lotinida.

## Qanday ochish
1. Repozitoriyni yuklab oling (yoki klonlang).
2. Chrome / Safari'da oching:
   - **`design/index.html`** — 30 ekran iPhone 15 Pro ramkalarida, 6 bo'lim. Uzun ekranlarni ramka ichida aylantirish mumkin (status bar va nav joyida qoladi). Yuqoridagi panelda masshtab: 50 / 75 / 100 %.
   - **`design/styleguide.html`** — ref-07 formatidagi stil qo'llanmasi: shrift alifbolari va raqamlar, HEX doiralar, gradient namunalari, tipografiya shkalasi, effektlar, radiuslar, oraliqlar, ikonkalar.
   - **`design/components.html`** — barcha komponentlar va holatlari.
   - Alohida ekran: `design/screens/04-bosh-sahifa.html` va h.k. (393 px kenglikda).
3. Shriftlar Google Fonts'dan yuklanadi (internet kerak): Anton, Gelasio (+ faqat ʻ ʼ uchun Noto Serif subset'i), Inter, Inter Tight, IBM Plex Mono.

## Ekranlar
| Bo'lim | Ekranlar |
|---|---|
| 1. Kirish | 01 Onboarding · 02 Kirish · 03 Sovg'a |
| 2. Kashf qilish | 04 Bosh sahifa (uzun) · 05 Lenta · 06 Qidiruv · 07 Janrlar · 08 Reyting · 09 Tez kunda |
| 3. Tomosha | 10 Drama sahifasi (uzun) · 11 Pleer · 12 Qismlar · 13 Izohlar · 14 Pleer sozlamalari · 15 Serial tugadi |
| 4. Monetizatsiya | 16 Paywall · 17 Coin do'koni (uzun) · 18 VIP (uzun) · 19 To'lov · 20 Maxsus taklif · 21 Reklama |
| 5. Mukofotlar | 22 Mukofotlar markazi (uzun) · 23 Do'stni taklif qilish |
| 6. Profil | 24 Ro'yxatim · 25 Yuklanganlar · 26 Bildirishnomalar · 27 Profil (uzun) · 28 Hamyon · 29 Sozlamalar (uzun) · 30 Yordam |

## Tuzilma
```
design/
├── index.html       4-bosqich: taqdimot (iPhone ramkalari, 6 bo'lim)
├── styleguide.html  4-bosqich: ref-07 formatidagi stil qo'llanmasi
├── components.html  komponentlar galereyasi
├── tokens.css       barcha ranglar, soyalar, radiuslar, o'lchamlar, shriftlar (har birining manbasi izohda)
├── components.css   komponentlar (icons.css va art.css ni import qiladi)
├── icons.css        bitta ikonka to'plami — 87 ta, stroke 1.75, round cap (tools/build_icons.py)
├── art.css          rasm placeholder'lari, grain, status bar glifi (tools/build_art.py)
├── screens/         01…30
├── data/dramas.md   har bir drama ↔ ambient rang + siluet (17 drama)
├── analysis/        1-bosqich: ref-01…07.md, SUMMARY.md, fonts.md
│                    5-bosqich: CHECKLIST.md (avtomatik audit), DELTA_E.md (render ↔ ref), DEVIATIONS.md
├── shots/           Playwright skrinshotlari, 3x (30 ta)
├── compare/         sketch | dizayn | ref montajlari (30 ta)
└── tools/           shoot.js, compare.py, audit.js + audit.py, delta_e.py, build_*.py
```

## Tekshiruv (5-bosqich)
```
node design/tools/shoot.js 3 design/shots design/screens/*.html        # 3x skrinshotlar
python3 design/tools/compare.py                                        # sketch | dizayn | ref montajlari
node design/tools/audit.js /tmp/aud design/screens/*.html && python3 design/tools/audit.py /tmp/aud   # → analysis/CHECKLIST.md
python3 design/tools/delta_e.py                                        # → analysis/DELTA_E.md
```
Audit tekshiradi: status bar / island / home indicator geometriyasi, nav joylashuvi va pikseli (5 ekran), touch ≥ 44 pt, matn kontrasti (matnsiz render ustida), tipografiya shkalasi, token radiuslari, 18 pt chekka, ikonka to'plami, iliq yuzalarda halqa + grain, har drama — bitta rasm, ekran CSS'idagi xom qiymatlar.

## Rasmlar haqida
`images.unsplash.com` hozirgi muhitda tarmoq siyosati bilan bloklangan, shuning uchun har bir drama uchun ambient rang + siluet + grain placeholder ishlatilgan (`data/dramas.md`). Unsplash ochilsa, `.art` elementi ichiga `<img>` qo'yiladi — color-grading (`--grade`) va grain saqlanadi.
