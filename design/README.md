# Short-drama ilova — UI dizayn

Faqat HTML + CSS + minimal vanilla JS (prototip xatti-harakati — `app.js`). Framework va build yo'q. Ekran o'lchami 393 × 852 (iPhone 15 Pro), 1 pt = 1 CSS px. Barcha matnlar o'zbek lotinida.

## Qanday ochish
1. Repozitoriyni yuklab oling (yoki klonlang).
2. Chrome / Safari'da oching:
   - **`design/app.html`** — **interaktiv prototip**: faqat ilovaning o'zi, oynaga sig'adigan eng katta o'lchamda; Onboarding'dan boshlanadi. Istalgan ekranni alohida ochish — `index.html` dagi «Ochish».
   - **`design/index.html`** — 30 ekran iPhone 15 Pro ramkalarida, 6 bo'lim. Uzun ekranlarni ramka ichida aylantirish mumkin (status bar va nav joyida qoladi). Yuqoridagi panelda masshtab: 50 / 75 / 100 %.
   - **`design/styleguide.html`** — ref-07 formatidagi stil qo'llanmasi: shrift alifbolari va raqamlar, HEX doiralar, gradient namunalari, tipografiya shkalasi, effektlar, radiuslar, oraliqlar, ikonkalar.
   - **`design/components.html`** — barcha komponentlar va holatlari.
   - Alohida ekran: `design/screens/04-bosh-sahifa.html` va h.k. (393 px kenglikda).
3. Shriftlar: Anton, Inter, Inter Tight, IBM Plex Mono, Playfair Display — Google Fonts'dan (internet kerak). Serif sarlavhalar — **Awesome Serif** (tijoriy): fayllarni `design/fonts/` ga qo'ying (`AwesomeSerif-Regular.otf`, `AwesomeSerif-MediumRegular.otf`) yoki shriftni kompyuterga o'rnating. Bu papka `.gitignore`'da — ochiq repoda shrift yo'q; fayl bo'lmasa Playfair Display ko'rinadi.

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
├── app.html         interaktiv prototip (ilova qobig'i) · app.js — o'tishlar va holatlar
├── index.html       4-bosqich: taqdimot (iPhone ramkalari, 6 bo'lim)
├── styleguide.html  4-bosqich: ref-07 formatidagi stil qo'llanmasi
├── components.html  komponentlar galereyasi
├── tokens.css       barcha ranglar, soyalar, radiuslar, o'lchamlar, shriftlar (har birining manbasi izohda)
├── components.css   komponentlar (icons.css va art.css ni import qiladi)
├── icons.css        bitta ikonka to'plami — Lucide 0.460.0, 87 ta, stroke 2.4, round cap (tools/build_icons.py)
├── fonts/           Awesome Serif (litsenziyali, .gitignore — repoda yo'q)
├── art.css          rasm placeholder'lari, grain, status bar glifi (tools/build_art.py)
├── screens/         01…30
├── data/dramas.md   har bir drama ↔ ambient rang + siluet (17 drama)
├── analysis/        1-bosqich: ref-01…07.md, SUMMARY.md, fonts.md
│                    5-bosqich: CHECKLIST.md (avtomatik audit), DELTA_E.md (render ↔ ref), DEVIATIONS.md, CLICKS.md (har bir tugma)
├── shots/           Playwright skrinshotlari, 3x (30 ta)
├── compare/         sketch | dizayn | ref montajlari (30 ta)
└── tools/           shoot.js, compare.py, audit.js + audit.py, delta_e.py, flow_test.js, click_test.js, build_*.py
```

## Interaktiv prototip (`app.js`)
Har bir ekran oxirida `app.js` ulangan. Statik dizayn (skrinshot, `index.html` ramkalari — `?static`) o'zgarmaydi; `app.html` da va ekran alohida ochilganda to'liq mantiq ishlaydi.

**Holat — ekranlar orasida umumiy** (`sessionStorage`, `?reset` bilan tozalanadi; Sozlamalar → Chiqish ham tozalaydi):
- **Coin:** pullik + bonus (avval bonus sarflanadi). Kirish +50, sovg'a +100, check-in +15, vazifalar, reklama +10, xarid — hammasi balansga va Hamyon tarixiga (28) tushadi; bosh sahifa chipi, coin do'koni, mukofotlar, profil, hamyon bir xil raqamni ko'rsatadi.
- **Qismlar:** har dramaning 1–10 qismi bepul (ba'zilari 1–8; VIP dramalar faqat VIP). Qulflangan qism: avto-ochish yoqiq va coin yetarli → −60 coin bilan ochiladi; aks holda paywall (16): balans yetarli bo'lsa «N-qismni ochish · 60 coin», yetmasa paketlar → to'lov (19) → pleerga o'sha qism bilan qaytadi; yoki reklama (21, 15 s) → qism bepul ochiladi; yoki VIP.
- **VIP:** tarif → to'lov → barcha qismlar ochiq, 1080p va yuklab olish ochiladi, profil / sozlamalar / yuklanganlar VIP holatini ko'rsatadi; obunani bekor qilish mumkin.
- **Kontekst:** qaysi posterni bossangiz, drama sahifasi (10), pleer (11), qismlar (12), izohlar (13), paywall (16), «Serial tugadi» (15) o'sha drama bilan ochiladi (17 dramalik katalog, `data/dramas.md` bilan bir xil rasm).
- Saqlanganlar, tarix (oxirgi ko'rilgan birinchi), eslatmalar, yoqtirishlar, izohlar, qidiruv tarixi, pleer sozlamalari (tezlik, sifat, ovoz, subtitr, uyqu taymeri), vazifalar holati, bildirishnomalar «o'qildi» — barchasi saqlanadi va tegishli ekranlarda ko'rinadi.

**Navigatsiya:** har bir tarix yozuvi o'z orqaga stekini saqlaydi — ilova ichidagi «orqaga / yopish», brauzerning orqaga / oldinga tugmalari, chap chetdan o'ngga surish va **Esc** bir xil ishlaydi; qaytilganda vertikal va gorizontal scroll joyi tiklanadi. Pastki nav — 5 tab (faol tabni bosish → tepaga). Uzun ekranlarda status bar'ni bosish → tepaga.

**Scroll va imo-ishoralar:** barcha gorizontal qatorlar (tablar, posterlar, Top-10, filtrlar, chiplar) barmoq / trackpad / sichqoncha bilan sudrab suriladi (inersiya bilan); ichki ro'yxatlar (janrlar, natijalar, izohlar, bildirishnomalar, tranzaksiyalar) va uzun sahifalar vertikal aylanadi. Lenta va pleer: yuqoriga / pastga surish (g'ildirak, ↑↓) — keyingi drama / qism; bosh sahifa hero — chapga / o'ngga surish va nuqtalar; pastki oynalarni pastga surib yopish.

**Haqiqiy kiritish maydonlari:** qidiruv (06 — natijalar va bo'sh holat), izoh yozish (13 — spoyler bilan), promokod (19: `DRAMA10`), yordam qidiruvi (30), telefon raqam, profil ismi, operator chati.

**Pastki oynalar (action sheet):** «Yana» menyulari, ulashish, shikoyat sabablari, baholash yulduzlari, tasdiqlash (chiqish, hisobni o'chirish, butun serialni ochish), tranzaksiya tafsiloti, qurilmalar, ulangan hisoblar.

Barcha bosiladigan elementlar klaviatura bilan ham ishlaydi (Tab → Enter / Space).

**Testlar:**
```
node design/tools/flow_test.js    # 86 qadam: onboarding → coin → qism ochish → paywall → to'lov → reklama → VIP → mukofotlar → ro'yxat → qidiruv → filtr → izoh → bildirishnoma → hamyon → brauzer orqaga/oldinga, scroll tiklash, chetdan surish, Esc, klaviatura → chiqish
node design/tools/click_test.js   # har bir ekrandagi har bir tugmani bosadi → analysis/CLICKS.md (natijasiz yoki yopilgan element yo'qligi)
```

Bu — dizayn prototipi: video, to'lov va hisob haqiqiy serverga ulanmagan. App Store / Google Play uchun haqiqiy ilova (Flutter yoki React Native + backend) — alohida bosqich.

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
