drama-app-design/
├── PROMPT.md                ← pastdagi promptni shu faylga saqlang
├── references/
│   ├── ref-01-letterboxd.jpg        (1-rasm: qora, 2 ta iPhone)
│   ├── ref-02-netflix.jpg           (2-rasm: 4 ta ekran)
│   ├── ref-03-art-events.jpg        (3-rasm: och kulrang, editorial)
│   ├── ref-04-glass-social.jpg      (4-rasm: NFT + aurora)
│   ├── ref-05-luma-overview.jpg     (5-rasm: 3 ta ekran)
│   ├── ref-06-luma-home.jpg         (6-rasm: "Hi, Amelia!")
│   └── ref-07-luma-player-styleguide.jpg (7-rasm: pleer + style guide)
└── sketch/                  ← canvas'dagi 30 ta ekranni PNG qilib saqlang (01…30)

# ROL
Sen 10+ yillik tajribaga ega senior product designer va pixel-perfect UI engineer'san. Sening ishing referenslarga "taxminan o'xshash" narsa emas, AYNAN BIR XIL vizual sifat. Har bir rang, nur, soya, blur, shaffoflik, burchak radiusi, chiziq qalinligi, shrift, o'lcham, interval va kartochka joylashuvi referensdan olinadi va o'lchab tasdiqlanadi.

# VAZIFA
Short-drama (vertikal mini-serial) streaming mobil ilovasining UI/UX dizaynini yarat — DramaBox, ReelShort, DramaWave turidagi ilova. Faqat dizayn: backend, mantiq, API yo'q.
- UX TUZILMASI = `sketch/` dagi 30 ta ekran va pastdagi "Ekranlar" bo'limi. Ekranlar, bo'limlar, kontent, ierarxiya va matnlar sketchdagidek bo'ladi. Ekran qo'shma ham, olib tashlama ham.
- VIZUAL TIL = `references/` dagi 7 ta dizayn konsepsiya. Ularni ishlatish MAJBURIY. Kod yozishdan oldin har birini o'zing ochib, piksel darajasida tahlil qilasan.
- TIL = barcha UI matnlari o'zbekcha (lotin).

# KIRISH MATERIALLARI
references/
- ref-01-letterboxd.jpg — qora fon, 2 ta iPhone: bosh sahifa ("MARTY SUPREME") va profil ("sarah.lg's box")
- ref-02-netflix.jpg — 4 ta ekran: splash, bosh sahifa, serial sahifasi, davom ettirish/ro'yxat/janrlar
- ref-03-art-events.jpg — och kulrang editorial uslub: kategoriyalar ro'yxati, pastel kartalar, "events upcoming"
- ref-04-glass-social.jpg — chapda qorong'i glassmorphism (NFT qidiruv), o'ngda oq "aurora" ijtimoiy lenta
- ref-05-luma-overview.jpg, ref-06-luma-home.jpg, ref-07-luma-player-styleguide.jpg — iliq to'q-sariq meditatsiya ilovasi va style guide (shrift + 6 ta HEX rang)

sketch/ — 30 ta ekranning wireframe'lari (01…30)

# OLTIN QOIDALAR
1. Referens — qonun. "O'xshash" emas, "bir xil".
2. Referensda yo'q element kerak bo'lsa, uni eng yaqin ref elementining "DNK"sidan yasaysan: o'sha radius, o'sha shaffoflik, o'sha soya. Qaysi ref'dan olganingni analysis'da yozasan.
3. O'zingdan bitta ham rang, soya, radius yoki shrift qo'shma. Hamma qiymat `tokens.css` dan olinadi.
4. Uslub olinadi, brend olinmaydi. Netflix "N" logosi va qizil rangi, Letterboxd nomi va logosi, referenslardagi film posterlari va aktyor suratlari ishlatilmaydi. Ilova nomi o'rniga "LOGO" yoziladi.

---

# 1-BOSQICH — PIKSEL DARAJASIDA TAHLIL (kod yozishdan OLDIN)
Har bir referensni ko'z bilan emas, Python (Pillow + numpy) bilan o'lchab tahlil qil:
1. MASSHTAB: har bir rasmda telefon ekranining chap va o'ng chegarasini top. Koeffitsiyent k = 393 / ekran_kengligi_px. Barcha o'lchamlarni pt'ga o'tkaz (maqsadli ekran: 393×852, iPhone 15 Pro).
2. RANGLAR: har bir element (fon, karta, chegara, 1/2/3-darajali matn, tugma, chip, ikonka, progress) uchun 5×5 px o'rtachasidan HEX ol. Har bir rasm bo'yicha k-means bilan 10 ta dominant rang chiqar.
3. GRADIENTLAR: yo'nalishini (gradusda), har bir stop rangi va pozitsiyasini (%) aniqla. Hero rasm ostidagi qora fade qayerda boshlanib qayerda tugashini o'lcha.
4. NUR VA SOYA: glow (Luma'dagi yorug'lik halqasi, NFT'dagi porlovchi tugma) va drop shadow uchun offset, blur, spread, rang va opacity'ni piksel profilidan hisobla.
5. GLASS: fon alpha'si, blur kuchi, 1px chegara alpha'si, ichki highlight.
6. RADIUSLAR: ekran, katta va kichik karta, poster, thumbnail, chip, tugma, squircle ikonka, bottom sheet — har birini egrilikdan o'lcha.
7. TIPOGRAFIYA: har bir matn uslubi uchun o'lcham (pt), qalinlik, line-height, letter-spacing, rang va case. Shrift oilasini glif shakllaridan aniqla (a, g, R, Q, 1, 7 harflariga qara) va eng yaqin bepul Google Fonts muqobilini tanla.
8. LAYOUT: chet bo'shliqlari, bo'limlar orasidagi masofa, karta ichki padding'i, elementlar orasidagi gap, poster o'lchami va nisbati. Qatorda nechta element ko'rinishini ham yoz (masalan, 3.5 ta poster, to'rtinchisi kesilgan).
9. IKONKALAR: uslubi (outline yoki filled), stroke qalinligi, o'lchami, chiziq uchlari (round cap).
10. TEKSTURA: grain yoki noise bormi va qanchalik kuchli.

NATIJA: `design/analysis/ref-01.md … ref-07.md` va `design/analysis/SUMMARY.md` — barcha qiymatlar bitta jadvalda, har birining yonida manbasi (masalan, "ref-01, Add to watchlist tugmasi").

## Mening dastlabki o'lchovlarim
Bu qiymatlar boshlang'ich nuqta, ko'z bilan baholangan. O'zing o'lchab aniqlashtir; farq chiqsa, o'z o'lchovingni ol.

ref-01 Letterboxd:
- Fon deyarli qora (~#0A0A0A). Hero rasm ekranning yuqori ~48% ini egallaydi va pastga qarab fonga silliq erib ketadi; fade rasm balandligining ~55% idan boshlanadi.
- "MARTY SUPREME" sarlavhasi: ultra-condensed, qalin, bosh harflar, oq, ~56pt, line-height ~0.85, markazda, yuz ustida.
- Chiplar: ~26pt balandlik, to'liq yumaloq, fon qora ~60% shaffof, chegara 1px oq ~18%, matn 12–13pt. Avatarlar 18pt, bir-birining ustiga −6pt tushadi.
- "Add to watchlist" tugmasi — oq glossy pill: yuqoridan pastga oq → och kulrang gradient, tepasida ichki highlight, ostida yumshoq katta soya. Matn qora, 15pt semibold, chapda ikonka, balandlik ~44pt.
- "Reviews" tugmasi fonsiz: ikonka + oq matn.
- Segmented tablar: tanlangani to'q kulrang pill (~#262626, nozik 1px chegara), boshqalari kulrang matn (~#8E8E93).
- Kartalar: fon ~#141414, radius ~22pt, chegara 1px oq ~8%, padding ~12pt. Ichida rangli 3D "quti" squircle ikonkalar (~64pt, radius ~16): pastki qirrasi to'qroq va hajm beradi, pastida avatar badge turadi.
- "See all" pill va "…" doirasining foni ~#2C2C2E.
- "Beating Hearts" kartasi: posterning dominant rangidan olingan iliq gradient (to'q qizil → qora-jigarrang). Chapda poster (radius ~10), sarlavha 24pt bold, kamalak gradientli reyting slayderi (trek ~8pt) va raqamli oq glossy knob (~30pt).
- Pastki navigatsiya — suzuvchi pill: chetlardan ~12pt, balandligi ~58pt, fon to'q (~#1C1C1E, 92%) + blur. Tanlangan element ostida och rounded fon, markazda oq "+" doira.
- Profil foni posterlar kolajidan iborat: kuchli blur va rangli (yashil) tonlash. Markazda 3D squircle "quti" (~140pt) va avatar. Ism nafis serif shriftda, ~40pt. Chiplar qatorida "545 ML" ko'k tusli. "Following" oq glossy pill + "…" doira. Favorites kartasida posterlar (radius ~8). "Recent activity" — binafsha → pushti → to'q-sariq gradient karta.

ref-02 Netflix konsepsiyasi:
- Fon ~#0E0E0E.
- Splash: to'liq ekranli atmosferik foto, pastga qorayadi. Sarlavha ~26pt, 2 qator; subtitle ~15pt kulrang; sahifa nuqtalari; to'liq kenglikdagi tugma ~52pt, radius ~12.
- Bosh sahifa: chapda logo, o'ngda qidiruv va avatar. Aktiv tab oq matn + 2pt chiziq.
- Hero karta: radius ~16. Ichida kichik, harf oralig'i keng serial belgisi, serif displey sarlavha va 2 ta tugma: oq (play bilan) va shaffof to'q (+). Tugmalar radiusi ~8, balandligi ~40.
- Bo'lim sarlavhasi ~17pt semibold oq. Posterlar ~104×148, radius ~8, gap 8.
- Serial sahifasi: tepada ~55% balandlikdagi rasm, orqaga/cast/ulashish ikonkalari. Meta qator (yil, 16+ badge, mavsum, HD) ~13pt kulrang. To'liq kenglikdagi oq tugma, ostida to'q kulrang tugma. Tavsif ~14pt, teglar "•" bilan ajratilgan, aktiv tab tagi chizilgan.
- Qism qatori: thumbnail ~120×68 (radius 8) va play doira, nomi, davomiyligi, yuklab olish ikonkasi.
- "Davom ettirish": gorizontal kartalar ~160×90, markazda shaffof play doira, ostida 3pt progress chizig'i, meta "S1:E3 · 36 min" formatida.
- Janrlar: 3 ustunli grid, ~44pt balandlikdagi to'q kulrang (~#1F1F1F) tugmalar, radius ~10.

ref-03 Art events:
- Ulkan editorial ro'yxat: ~48pt, regular qalinlik, line-height ~0.95, manfiy letter-spacing. Aktiv element qora va "→" bilan, qolganlari och kulrang, bittasi pushti. Ro'yxat pastga qarab xiralashib ketadi.
- Rasmlar kolaji: radius ~18–20, −6°…+6° ga burilgan, bir-birining ustiga tushgan, yumshoq soya bilan.
- Mayda monospace caption'lar, bosh harflarda ("OUTSIDE: 9", "NOV 30, 2 PM"), ~10pt.
- Pastel gradient kartalar (radius ~28), ichida ulkan zich sarlavha.
- "events upcoming (12)": ~56pt kichik harflarda, qavsdagi son ingichka, kulrang, superscript.
- Pastda suzuvchi oq pill'lar: avatar + salom, qidiruv doirasi, "Menu >".

ref-04 chap (glass NFT):
- Fon qorong'i, kuchli blur qilingan rangli foto (to'q-sariq va binafsha dog'lar).
- Qidiruv maydoni: ~60pt, radius ~30, fon oq ~8%, chegara 1px oq ~20%, backdrop blur, ikonka o'ngda.
- "Results" ~28pt semibold; son badge'lari doira ichida.
- Avatar doiralar ~72pt; ustma-ust tushgan, ±6° burilgan glass kartalar (radius ~28); oq strelka doira ~64pt.
- Glass pastki navigatsiya ~72pt, markazidagi aktiv tugma porlaydi (glow); qizil son badge.

ref-04 o'ng (aurora):
- Yuqori qismida pushti tus. Turli o'lchamdagi suzuvchi avatar pufakchalari pastga qarab xiralashadi va chuqurlik beradi.
- Post: avatar 32pt + username; rasm radiusi ~24, pastki o'ng burchagida o'yilgan joy (inverted corner/notch) va unda ikonkalar; "liked by" qatori; caption.

ref-05/06/07 Luma:
- Style guide'da yozilgan ranglar: #F96430, #E2BD99, #9A462A, #191209, #D06D6D, #FFDBC4. Shrift: "Lao Muang Khong".
- To'liq ekranli iliq gradient fon, yorug'lik halqasi (light ring glow) va siluet; ustida grain tekstura.
- Glass doira tugmalar ~52pt: fon oq ~18%, chegara 1px oq ~30%, blur.
- "Hi, Amelia!" — ikki rangli salom: oq + shaftoli.
- "Recommended" glass chip ~28pt. Sarlavha ~34pt regular, line-height zich; subtitle ~13pt.
- "▷ Listen" oq pill: ~52pt balandlik, matni to'q (#191209).
- Progress chiziqchalardan iborat: aktivi uzun, qolganlari qisqa va xira.
- Pastki nav: 4 ta ~48pt doira; aktivi oq, qolganlari glass.
- Pleer: tepada markazda nom, glass chip, katta matn. Glass slayderlar (~44pt, to'liq radius, nuqtali shkala, chapda label, o'ngda qiymat). Vertikal progress chizig'i vaqt bilan. Pastda: glass −10 doira / oq play doira (~64pt) / glass +10 doira.
- Ikkinchi ekran: ikki tusli sarlavha (to'q + kulrang), filtr pill'lar, organik (blob) shakldagi kartalar.

---

# 2-BOSQICH — DIZAYN TIZIMI (sintez)
Referenslar har xil, sen ularni bitta yaxlit tilga birlashtirasan. Rollar taqsimoti quyidagicha va u o'zgarmaydi:

| Ref | Nimani belgilaydi |
|---|---|
| ref-01 | Asosiy skelet: qorong'i neytral fon, kartalar, oq glossy CTA pill, translucent chiplar, segmented tablar, suzuvchi bottom nav, profil ekrani, ambient gradientli kartalar, condensed displey sarlavhalar |
| ref-02 | Streaming UX patternlari: hero, poster qatorlari, "davom ettirish", drama sahifasi tuzilmasi, qismlar, janr grid |
| ref-03 | Editorial: ulkan tipografiya, kolaj, mono caption'lar (qorong'i fonga moslangan holda) |
| ref-04 chap | Qidiruv: glass search, natijalar, burilgan glass kartalar, glow tugma |
| ref-04 o'ng | Ijtimoiy qatlam: izohlar, avatar pufakchalari, notch'li karta (qorong'i versiyada) |
| ref-05/06/07 | Brend palitrasi, nur halqasi, grain, glass doiralar va chiplar, pleer va "emotsional" ekranlar |

Asosiy qarorlar:
- TEMA: qorong'i. Neytral ranglar ref-01'dan.
- AKSENT RANGLAR: faqat ref-07 palitrasidan. Netflix qizili ishlatilmaydi.
  - #F96430 flame — asosiy aksent: aktiv holat, progress, coin, tanlangan element chegarasi, "o'qilmagan" nuqtasi
  - #9A462A ember — gradientlarning to'q qismi
  - #E2BD99 sand — VIP va premium
  - #D06D6D rose — like (yurak), badge, yumshoq ogohlantirish
  - #FFDBC4 peach — ikkinchi darajali urg'u matni ("Hi, Amelia!" dagi kabi)
  - #191209 cocoa — oq tugmalardagi matn, iliq to'q fonlar
- TUGMALAR: 1-daraja — doim ref-01 oq glossy pill. 2-daraja — glass pill (ref-05). 3-daraja — fonsiz matn + ikonka (ref-01 "Reviews"). Bitta ekranda 1 tadan ortiq primary bo'lmaydi.
- EMOTSIONAL EKRANLAR (03, 05, 11, 15, 17, 18, 20) ref-05/07 atmosferasida: iliq gradient + nur halqasi + grain.
- AMBIENT RANG: har bir dramaning o'z rangi bor — posterning dominant rangi. U ref-01 profili va "Beating Hearts" kartasidagi kabi drama sahifasi foni, karta gradienti va blur fonda ishlatiladi.

## tokens.css (boshlang'ich qiymatlar; 1-bosqich o'lchovlari bilan almashtir)
Har bir qiymat yoniga manbasini izohda yoz, masalan /* ref-01: Add to watchlist */.
- Neytral (ref-01): --bg-0 #0A0A0A (ekran), --bg-1 #141414 (karta), --bg-2 #1F1F1F (tanlangan tab), --bg-3 #2C2C2E ("See all", "…"), --line-1 rgba(255,255,255,.08), --line-2 rgba(255,255,255,.16), --text-1 #FFFFFF, --text-2 rgba(255,255,255,.72), --text-3 rgba(255,255,255,.50)
- Brend (ref-07): --flame #F96430, --ember #9A462A, --sand #E2BD99, --rose #D06D6D, --peach #FFDBC4, --cocoa #191209
- Glass (ref-05/04): --glass-bg rgba(255,255,255,.12), --glass-bg-strong rgba(255,255,255,.18), --glass-line rgba(255,255,255,.22), --glass-filter blur(24px) saturate(160%)
- Glossy pill (ref-01): fon linear-gradient(180deg, #FFFFFF 0%, #E9E9E9 55%, #D6D6D6 100%); soya inset 0 1px 0 #FFF, inset 0 -2px 4px rgba(0,0,0,.10), 0 10px 28px rgba(0,0,0,.45)
- Iliq fon (ref-06): radial-gradient(120% 80% at 70% 35%, #FFD9B0 0%, #F96430 28%, #C4532A 52%, #6B2C17 78%, #191209 100%); nur halqasi 0 0 60px 12px rgba(255,170,110,.55); grain — SVG feTurbulence, opacity .08, mix-blend-mode overlay
- Radius: ekran 55, sheet 32, katta karta 24, karta 20, tile 14, squircle 18, poster 10, thumbnail 8, pill 999
- Spacing: sahifa cheti 16; shkala 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40; bo'limlar orasi 28
- Nav: balandlik 58, chetdan 12, home indicator'dan 8 yuqorida

Shriftlar (o'lchab tasdiqla; yaqinroq muqobil topsang, almashtir):
- Display condensed (ref-01 "MARTY SUPREME") → Anton: hero'dagi drama nomlari, posterdagi nomlar, Top-10 raqamlari, katta sonlar (coin, chegirma)
- Serif (ref-01 "sarah.lg", ref-02 serial nomi) → Instrument Serif: profil ismi, VIP, sovg'a, tabrik va sheet sarlavhalari
- UI sans (ref-01 interfeysi, ref-05 "Lao Muang Khong" lotin glifi) → Inter: barcha interfeys matnlari
- Editorial (ref-03) → Inter Tight 400, letter-spacing −0.04em
- Mono (ref-03 caption) → JetBrains Mono, bosh harflar, letter-spacing +0.04em
- O'zbek harflari: oʻ, gʻ (U+02BB) va ʼ har bir shriftda borligini tekshir. Yo'q bo'lsa, ' (U+2019) ishlat — lekin butun loyihada bitta variant.

Tip shkalasi (pt, o'lcham/line-height):
- display-hero: Anton 56/0.88
- display-num: Anton 72/0.9
- serif-xl: Instrument Serif 40/1.0
- serif-lg: Instrument Serif 32/1.05
- editorial: Inter Tight 44/0.95
- title-1: Inter 34/1.05, regular, −1.5% (ref-06 "Relief Meditation")
- title-2: Inter 28/1.1, semibold (ref-04 "Results")
- title-3: Inter 24/1.15, bold (ref-01 "Beating Hearts")
- headline: Inter 17/1.25, semibold (ref-02 bo'lim sarlavhasi)
- button: Inter 15, semibold
- body: Inter 15/1.4
- footnote: Inter 13/1.3
- caption: Inter 12/1.25, medium
- micro: Inter 10, medium (nav label)
- mono: JetBrains Mono 10

## Komponentlar → design/components.html (barcha holatlari bilan bitta galereya)
- Button: primary-glossy, secondary-glass, tertiary-text; holatlari default, pressed, disabled
- Chip: translucent (ref-01), glass (ref-05), selected (oq fon + cocoa matn), avatar-stack
- Tablar: segmented (ref-01), underline (ref-02, aktiv chizig'i flame 2pt)
- Floating bottom nav (ref-01), 5 element: Bosh sahifa · Lenta · Mukofot · Ro'yxatim · Profil. Lenta markazda oq glossy doira, ichida play ikonka (ref-01'dagi "+" o'rnida). Aktiv element: rounded fon + oq; qolganlari text-3.
- Glass doira tugma (ref-05): 44 / 52 / 64
- Poster: 2:3, radius poster, pastida Anton'da nom; badge'lar: "Bepul 1–10", "YANGI", "VIP" (sand), "O'zbekcha"
- Landscape "davom ettirish" kartasi (ref-02) + flame progress
- Karta turlari: default (ref-01), ambient-gradient (ref-01 "Beating Hearts"), warm-glow (ref-05), glass (ref-04)
- 3D squircle "quti" tile (ref-01 "Friend's box")
- Progress slayder + glossy raqamli knob (ref-01 shakli, gradient brenddan: ember → flame → peach)
- Nuqtali glass slayder (ref-07)
- Qism tile holatlari: ko'rilgan / hozirgi / bepul / ochilgan / qulflangan / VIP
- Toggle (yoqilganda trek flame), checkbox, radio
- Input: glass search (ref-04), oddiy maydon, promokod
- Bottom sheet: handle, tepa radiusi 32, fon bg-1, hairline
- Modal (warm-glow), list row (ikonka, label, qiymat, chevron), bo'lim sarlavhasi + "Hammasi" pill
- Badge: son (rose), nuqta (flame); countdown qutilari; coin ikonkasi (flame, hajmli); toj ikonkasi (sand)
- Avatar pufakchalari (ref-04 aurora)
- Status bar 9:41 (oq ikonkalar), Dynamic Island, home indicator — hamma ekranda bir xil

---

# 3-BOSQICH — EKRANLAR
Texnik format ("eng oddiy"):
- Faqat HTML + CSS; kerak bo'lsa minimal vanilla JS. Framework, build, npm yo'q (tekshiruv uchun Playwright bundan mustasno).
- Har bir ekran alohida fayl: design/screens/01-onboarding.html … 30-yordam.html. Ekran o'lchami 393×852.
- Uzun ekranlar (04, 10, 17, 18, 22, 27, 29) to'liq uzunligida chiziladi.
- Hammasi design/tokens.css va design/components.css'ga ulanadi. Shriftlar Google Fonts orqali.
- Rasmlar: Unsplash'dan (bepul litsenziya) kinematografik, iliq tonli portret, juftlik va drama kadrlari — to'g'ridan-to'g'ri images.unsplash.com URL'lari bilan. Haqiqiy serial posterlari va logolar yo'q.
- Har bir dramaga bitta rasm biriktiriladi va u hamma ekranda o'sha rasm bo'ladi; ro'yxatini design/data/dramas.md ga yoz. Barcha rasmlarga bir xil iliq color-grading overlay qo'y. Internet bo'lmasa, ambient rangdan gradient + grain placeholder ishlat.
- Narxlar "[narx] so'm" ko'rinishida; coin miqdorlari sketchdagidek.

Ekranlar (tuzilma sketchdan, ko'rinish ko'rsatilgan ref'dan):

01 · Onboarding — janr va til · ref-03 (1-ekran) + ref-01 tugma
- Tepada ref-05 progress chiziqchalari (2 qadam), o'ngda tertiary "O'tkazib yuborish".
- Sarlavha Instrument Serif 40: "Qaysi dramalar sizga yoqadi?" ("sizga yoqadi?" peach rangda); ostida izoh text-2.
- Janrlar ref-03 ro'yxati kabi: Inter Tight 40. Tanlanganlari oq + "→" + flame nuqta, qolganlari text-3; ro'yxat pastga qarab xiralashadi.
- Ro'yxat orasida 3–4 ta burilgan kolaj rasm; o'ngda mono caption "TANLANDI: 3 / 15".
- Til uchun glass chiplar: O'zbekcha (tanlangan), Русский, English. Mehmon rejimi haqida kichik glass qator.
- Pastda glossy pill: "Davom etish · 3 ta tanlandi".

02 · Kirish · ref-01 + ref-05
- Fon: blur qilingan bosh sahifa (blur 30 + qora 55%).
- Bottom sheet; sarlavha Instrument Serif 34: "Kiring va +50 bonus coin oling" ("+50 bonus coin" flame).
- "Telefon raqam orqali" — primary glossy. "Telegram orqali" — glass. Google va Apple — yonma-yon glass pill'lar.
- "yoki" ajratuvchisi, tertiary "Mehmon sifatida davom etish", huquqiy caption text-3 rangida havolalar bilan.

03 · Yangi foydalanuvchi sovg'asi · ref-05/06
- Xira bosh sahifa ustida warm-glow modal (radius 32): nur halqasi, grain, glass yopish doirasi.
- 3D squircle sovg'a ikonkasi (flame); "Xush kelibsiz!" Instrument Serif 40; glass chip "Yangi foydalanuvchi sovg'asi"; "+100 coin" Anton 72.
- Check ikonkali 3 qator; glossy "Sovg'ani olish"; caption "Bonus coinlar 7 kun amal qiladi".

04 · Bosh sahifa · ref-01 bosh sahifa + ref-02 bosh sahifa
- Hero to'liq kenglikda, ekranning ~52%, fonga erib ketadi.
- Tepada: markazda "LOGO" (ref-01 wordmark joyida); o'ngda glass coin chip ("120 +"), glass qidiruv doirasi, rose badge'li qo'ng'iroq doirasi.
- Drama nomi Anton 52, markazda, 3 qatorgacha.
- Chiplar: "Haftaning hiti", "O'zbekcha dublyaj", "Ko'rmoqda" + avatar stack.
- Glossy "▶ Tomosha qilish" + tertiary "+ Ro'yxatga"; ostida karusel chiziqchalari.
- Segmented tablar: Tavsiya · Ommabop · Yangi · Reyting · VIP · O'zbekcha · Tez kunda.
- "Davom ettirish": ref-02 landscape kartalari, flame progress, "12/72-qism".
- "Bugun Top 10": posterlar ustiga chiqib turgan Anton outline raqamlar.
- VIP banner: ambient-gradient karta (sand → ember), toj ikonkasi, glossy "1-hafta −40%".
- "Siz uchun tavsiya" (3.5 ta poster ko'rinadi), "Yangi chiqqanlar", "Tez kunda" (glass "Eslat" tugmasi bilan).
- Floating nav, Bosh sahifa aktiv.

05 · Lenta · ref-06 + ref-05
- To'liq ekranli video kadri, pastki 45% qora gradient, grain.
- Tepada glass segmented "Kuzatuvdagilar | Siz uchun" va glass qidiruv doirasi.
- Birinchi kirishda markazda glass toast: "Keyingi drama uchun yuqoriga suring".
- O'ngda 48pt glass doiralar: yurak (rose) 48K, saqlash 534K, izoh 1.2K, ulashish, qismlar.
- Chap-pastda glass teg chiplar ("Bepul 1–10" flame), nom Inter 34 regular, "1-qism / 72 · …".
- Ingichka video progress; glossy "▶ Butun serialni ko'rish · 72 qism"; nav, Lenta aktiv.

06 · Qidiruv · ref-04 chap
- Fon: qorong'i, blur qilingan iliq dog'lar (flame, ember, rose).
- Glass qidiruv maydoni (60pt, radius 30), yonida "Bekor".
- "Oxirgi qidiruvlar": × belgili glass chiplar + "Tozalash".
- "Ko'p qidirilayotgan": sarlavha 28 semibold + son badge; ro'yxatda Anton raqamlar va holat chiplari (Hit / Yangi / ↑3).
- "Janr bo'yicha": 72pt rasmli doiralar + nomi + glass strelka doirasi.

07 · Janrlar va filtr · ref-02 + ref-01 chiplar + ref-03 sarlavha
- Sarlavha Inter Tight 40 kichik harflarda: "janrlar"; yonida glass filtr doirasi.
- 4 qator filtr chiplari: Janr, Til, Holati, Saralash. Tanlangan chip oq fonda cocoa matn bilan.
- Mono caption "1 284 TA DRAMA" + "Tozalash".
- Natija qatorlari: poster 76×108, nom 17 semibold, teglar "•" bilan, meta, "1–10 qism bepul" flame rangda, o'ngda glass play doira.

08 · Reyting · ref-01 + ref-03
- Underline tablar: Trendda · Ko'p ko'rilgan · Ko'p saqlangan · Yangi hitlar; segmented: Bugun · Hafta · Oy.
- Podium: 3 ta ambient-gradient karta. 1-o'rin markazda va baland: sand chegara + glow. O'rin raqamlari Anton'da.
- 4–10-o'rinlar karta ichidagi qatorlarda: harakat chipi (↑2 / YANGI / ↓1).

09 · Tez kunda · ref-03 (3-ekran)
- Sarlavha Inter Tight 56: "tez kunda" + ingichka text-3 "(3)".
- Sana lentasi glass pill'larda.
- Masonry rasmlar (radius 20); ostida mono caption "ERTAGA · 20:00", nom va "12.4K kutmoqda".
- "Eslatib qo'y" glass pill; yoqilgani flame fonda: "Eslatiladi ✓".

10 · Drama sahifasi · ref-02 serial sahifasi + ref-01 ambient
- Tepada ~55% rasm, fonga erib ketadi; butun fon ambient rang bilan xira tonlangan.
- Glass doiralar: orqaga, ulashish, "…".
- Nom Anton 48; meta: "2026 · 16+ · 80 qism · Tugallangan · HD" (16+ va HD outline badge).
- Chiplar: ★ 4.8 · 2.4M · O'zbekcha dublyaj.
- Glossy to'liq kenglik "▶ Davom ettirish · 10-qism"; ostida glass to'liq kenglik "+ Ro'yxatga".
- 4 ta harakat: Saqlangan (flame), Eslatma, Izohlar, Yuklash · VIP.
- Tavsif + "Ko'proq"; teglar "•" bilan.
- Narx kartasi: "1–10 qism bepul · keyingisi 60 coin · VIP bilan hammasi ochiq"; glass pill "Butun serial: 4 200 (ustidan chizilgan) → 3 200 coin".
- Underline tablar: Qismlar (80) · O'xshash · Tafsilotlar; diapazon chiplari.
- Qism grid 6 ustunli, tile holatlari komponentdagidek, ostida legenda. Oxirida "Sizga yoqishi mumkin".

11 · Pleer · ref-07 pleer
- To'liq ekranli kadr + grain, yuqorida va pastda qora gradient.
- Tepada: glass orqaga doirasi, markazda nom 14pt + "10-qism / 80", glass "…".
- O'ngda 05-ekrandagi glass doiralar.
- Subtitr Inter 20, oq, yumshoq soya bilan.
- Pastda ref-07 boshqaruvining aynan o'zi: vaqt "0:42 / 1:58"; progress (flame to'lgan qism + glossy knob); glass −5s (52) / oq pauza (64) / glass +5s (52).
- Glass pill'lar qatori: "Qismlar 10/80", "1.0x", "CC uz", "720p"; alohida "Keyingi: 11-qism ›".

12 · Qismlar (sheet)
- Xira pleer ustida sheet: mini sarlavha (poster + nom), avto-ochish toggle'i va "har biri 60 coin" izohi.
- Diapazon tablar; 5 ustunli tile grid.
- Glass "Hammasini ochish · 3 200 coin" va glossy "VIP" (toj ikonkasi sand rangda).

13 · Izohlar · ref-04 o'ng (qorong'i versiya)
- Sheet tepasida suhbatdoshlarning avatar pufakchalari.
- Saralash chiplari: Ommabop · Yangi · Shu qism.
- Izoh qatorlari: avatar, ism · vaqt, matn, yurak soni, "Javob berish", "Shikoyat".
- Spoyler — blur qilingan glass blok: "Spoyler — ko'rish uchun bosing".
- Pastda glass input + "Spoyler" checkbox + flame yuborish doirasi.

14 · Pleer sozlamalari · ref-07 slayderlar
- Tezlik — nuqtali glass slayder (0.75–2.0x).
- Sifat / Ovoz / Subtitr — segmented chiplar; "1080p" yonida sand VIP badge.
- Toggle'lar va ro'yxat qatorlari: Avto-ijro, Uyqu taymeri, Yuklab olish, Xabar berish.

15 · Serial tugadi · ref-05
- Warm-glow karta; Instrument Serif "Tabriklaymiz!"; 5 ta sand yulduz.
- Glass "Ulashish +20 coin" va "2-fasl: eslat".
- O'xshash posterlar; birinchisida flame countdown halqasi "5"; "Bekor qilish".

16 · Qulflangan qism (paywall) · ref-01 + ref-05
- Xira pleer ustida qulf ikonkasi; sheet: sarlavha "11-qism qulflangan".
- Glass balans qatori: "Balans: 20 coin · Kerak: 60".
- 3 ta coin paket kartasi; "Ommabop" kartasida flame chegara + glow.
- Reklama ko'rib ochish qatori ("Bugun 3/5").
- VIP kartasi: ambient-gradient (sand → ember) + glossy "VIP olish".
- "Keyingi qismlarni ham avtomatik ochish" checkbox'i va huquqiy caption.

17 · Coin do'koni · ref-06
- Tepa qism iliq glow + grain; balans Anton 64.
- Birinchi xarid taymeri glass qutilarda.
- 2 ustunli paket kartalari (radius 24) va hajmli flame coin ikonkasi; "Ommabop" — flame chegara + glow, "Eng foydali" — sand.
- VIP banner, to'lov usullari chiplari (Payme, Click, Uzum, UzCard/Humo, Visa, App Store/Google Play), havolalar.

18 · VIP · ref-06, sand varianti
- To'liq ekranli gradient (#E2BD99 → #9A462A → #191209), nur halqasi, grain; toj ikonkasi; Instrument Serif 44 "VIP a'zolik".
- 2 ustunli imtiyozlar ro'yxati.
- Glass tarif kartalari; tanlangani oq glossy fonda, matni cocoa (ref-01 "Following" pill'i kabi).
- Glass taqqoslash jadvali; glossy CTA; avto-yangilanish shartlari aniq yozilgan.

19 · To'lov · ref-01
- Buyurtma kartasi; to'lov usullari radio qatorlari (radius 18, glass); promokod maydoni.
- "Jami" yozuvi va glossy "Payme orqali to'lash".

20 · Maxsus taklif popup · ref-05
- Warm-glow karta, tepasida "FAQAT BUGUN" lentasi; "−60%" Anton 96.
- Glass countdown qutilari; glossy "Taklifni olish"; tertiary "Yo'q, rahmat".

21 · Reklama ko'rib ochish
- To'liq ekranli reklama kadri; tepada glass "Reklama" chipi va flame countdown halqasi.
- Mukofot glass kartasi + progress: "11-qism bepul ochiladi · 4/5".
- Pastda reklama beruvchining glass paneli.

22 · Mukofotlar · ref-01 + ref-05
- Bonus balansi warm-gradient kartada.
- Check-in — 7 ta 3D squircle tile (ref-01 "Friend's box" uslubi): bugungisi flame, o'tganlari xira, 7-kun sand rangda va sovg'a bilan. Ostida glossy knob'li progress slayder; glossy "Bugungi +15 coin'ni olish"; eslatma toggle'i.
- Reklama kartasi (3/10).
- Vazifalar ro'yxati; tugmalari: Olish = glossy, Bajarish = glass, Olindi = xira.
- Do'st taklifi banneri; nav, Mukofot aktiv.

23 · Do'stni taklif qilish · ref-04 o'ng
- Tepada avatar pufakchalari; Instrument Serif "Do'st chaqiring — ikkalangiz +200 coin".
- 3 qadam; kod glass qutida mono "AZ7K29" + "Nusxa olish".
- Glass ulashish doiralari; statistika kartasi.

24 · Mening ro'yxatim · ref-01 + ref-02
- Underline tablar: Saqlangan · Tarix · Eslatmalar · Yuklanganlar.
- Poster grid; flame badge "+3 yangi qism"; ingichka flame progress.
- "Sizga yoqishi mumkin"; nav, Ro'yxatim aktiv.

25 · Yuklab olinganlar
- Sand VIP qatori; segmentli xotira chizig'i.
- Glass ro'yxat qatorlari: yuklangan / yuklanmoqda (%) / navbatda.
- Toggle'lar: Faqat Wi-Fi, avto-o'chirish.

26 · Bildirishnomalar
- Ruxsat banneri — kichik warm-glow karta + glossy "Yoqish +30".
- Filtr chiplari; "Bugun" / "Kecha" guruhlari; o'qilmaganlarida flame nuqta; thumbnail'lar (radius 10).

27 · Profil · ref-01 o'ng — AYNAN shu kompozitsiya
- Fon: sevimli dramalar posterlari kolaji, blur va ambient rang bilan tonlangan.
- 3D squircle avatar qutisi (140pt) + avatar badge; ism Instrument Serif 40; mono "ID: 10482733" + nusxa olish.
- Chiplar qatori: "Telegram", "12 do'st", sand "VIP emas".
- Glossy "Profilni tahrirlash" + "…" doira.
- Hamyon kartasi (Coin 20 · Bonus 85 + glossy "To'ldirish"); VIP ambient kartasi; "★ Sevimlilar" poster kartasi; menyu ro'yxati; nav, Profil aktiv.

28 · Hamyon
- Balans: pullik coin (bg-1 karta) va bonus coin (warm-gradient karta, "40 tasi 3 kunda tugaydi").
- Glossy "Coin to'ldirish"; underline tablar.
- Kunlar bo'yicha guruhlangan tranzaksiyalar; "Qaytarish so'rovi" havolasi.

29 · Sozlamalar
- Guruhlangan kartalar (radius 20, bg-1, hairline), qatorlar 52pt, flame toggle'lar.
- Bo'limlar: Hisob, Tomosha, To'lov, Bildirishnomalar, Ilova.
- Pastda glass "Chiqish" va tertiary "Hisobni o'chirish".

30 · Yordam markazi
- Glass qidiruv; mavzu chiplari.
- Accordion karta (birinchi savol ochiq holatda).
- 3 ta glass aloqa tile'i: Operator chati (flame), Qaytarish so'rovi, Fikr yuborish.

---

# 4-BOSQICH — TAQDIMOT
- design/index.html: ref-01'dagi kabi qora fon, iPhone 15 Pro ramkalari (to'q titan, ingichka och qirra). 6 ta guruh qator-qator: 1. Kirish · 2. Kashf qilish · 3. Tomosha · 4. Monetizatsiya · 5. Mukofotlar · 6. Profil; har bir guruh tepasida sarlavha.
- design/styleguide.html — ref-07 style guide formatida: shriftlar alifbosi va raqamlar, HEX yozilgan rang doiralari, gradient namunalari.
- design/components.html — barcha komponentlar barcha holatlari bilan.

# 5-BOSQICH — O'Z-O'ZINI TEKSHIRISH (majburiy)
1. Playwright bilan har bir ekranni 3x masshtabda skrinshot qil → design/shots/.
2. Pillow bilan har bir ekranni o'zining manba ref'i va sketch ekrani bilan yonma-yon montaj qil → design/compare/.
3. Quyidagi ro'yxat bo'yicha solishtir. Farq topilsa — tuzat va qayta skrinshot qil; farq qolmaguncha takrorla.
   - [ ] Ranglar tokens'dan; ref'dagi sample bilan farq ΔE < 3
   - [ ] Bir turdagi elementlarning radiusi butun loyihada bir xil
   - [ ] Sahifa cheti hamma ekranda 16pt, bo'limlar orasi bir xil
   - [ ] Glossy pill (gradient, highlight, soya) ref-01 bilan yonma-yon qo'yilganda farqsiz
   - [ ] Glass (blur, alpha, chegara) ref-05 / ref-04 bilan bir xil
   - [ ] Nur halqasi va grain iliq ekranlarning hammasida bor va kuchi bir xil
   - [ ] Tipografiya faqat shkaladan; o'zbekcha matnlar sig'adi, kesilmaydi, oʻ/gʻ to'g'ri ko'rinadi
   - [ ] Ikonkalar bitta to'plamdan: stroke 1.75–2, round cap
   - [ ] Bottom nav 5 ta asosiy ekranda piksel aniqligida bir joyda
   - [ ] Status bar, Dynamic Island va home indicator hamma ekranda bir xil
   - [ ] Touch target ≥ 44pt; kontrast: oddiy matn ≥ 4.5:1, katta matn ≥ 3:1
   - [ ] Har bir drama hamma ekranda o'sha rasm bilan, color-grading bir xil
   - [ ] Sketchdagi har bir element o'z joyida
4. Ataylab qilingan har bir farqni (masalan, Netflix qizili o'rniga flame) sababi bilan design/analysis/DEVIATIONS.md ga yoz.

# ISH TARTIBI
1-bosqich → SUMMARY'ni qisqa ko'rsat → 2-bosqich → 3 ta kalit ekran (04 Bosh sahifa, 10 Drama sahifasi, 11 Pleer) → ularning skrinshotlarini ko'rsat va MENING TASDIG'IMNI KUT → qolgan 27 ta ekran → 4-bosqich → 5-bosqich.

# TAQIQLAR
- Brend logolari, haqiqiy posterlar, emoji, lorem ipsum
- tokens.css'da yo'q rang, soya yoki radius
- Standart iOS ko'ki (#007AFF), Tailwind/Material default soyalari, binafsha-ko'k "AI" gradientlar, chap chegarali kartalar
- Teksturasiz (grain'siz) tekis iliq fonlar
- Rasm ustidagi matn himoya gradientisiz
- Sketchda yo'q ekran yoki funksiya

# YAKUNIY NATIJA
design/
├── analysis/ (ref-01…07.md, SUMMARY.md, DEVIATIONS.md)
├── tokens.css, components.css
├── components.html, styleguide.html, index.html
├── screens/ (01…30.html)
├── data/dramas.md
├── shots/, compare/
└── README.md (qanday ochish va ko'rish)
