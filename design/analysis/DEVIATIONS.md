# Ataylab qilingan farqlar (DEVIATIONS)

Har bir farq: nima → nimaga · sababi · manba. "O'lchov" — 1-bosqichda referensdan o'lchangan qiymat.

## Tizim darajasida
| # | Farq | Sabab |
|---|---|---|
| S1 | Netflix qizili (`#D41F17`, `#A14849`) → **flame `#F96430`** (aktiv tab chizig'i, progress) | PROMPT: aksentlar faqat ref-07 palitrasidan; brend olinmaydi |
| S2 | Netflix "N"/NETFLIX, Letterboxd wordmark → **"LOGO"** | PROMPT oltin qoida 4 |
| S3 | Serif: Instrument Serif → **Gelasio** | IoU (free-x) 0.626 vs 0.393, kenglik 0.81 vs 0.65; Instrument Serif'da `ʻ` (U+02BB) yo'q — `fonts.md` §2 |
| S4 | Mono: JetBrains Mono → **IBM Plex Mono** | JetBrains Mono'da `ʻ` yo'q; ref-03 mono glifi 4–5 px — shakl bo'yicha ajratib bo'lmaydi — `fonts.md` §6 |
| S5 | Luma ekranlaridagi gumanistik sans (Noto/Open Sans, IoU 0.87) → **Inter** | Tizimda bitta UI oilasi; Inter ref-01/04 (skelet) bilan mos — `fonts.md` §4 |
| S6 | Inter'ga tracking qo'shildi (body −0.01, headline −0.02, title −0.03 em) | SF'dan 3–9% keng; tracking bilan IoU oshdi — `fonts_inter_tracking.json` |
| S7 | Sahifa cheti 16 → **18** | O'lchov: ref-01 18, ref-04 18.6 |
| S8 | Karta radiusi 20 → **28**, katta karta/sheet 24/32 → **40**, poster 10 → **11**, thumbnail 8 → **6**, squircle 18 → **17** | O'lchov (`SUMMARY.md` §6) |
| S9 | Glossy pill: oddiy oq→kulrang gradient + `0 10px 28px .45` soya → **12 nuqtali qavariq kapsula** + `0 1px 4px .18` | O'lchov: ref-01 "Following" profili; soya ref-01 da o'lchab bo'lmaydi (sof qora fon) — ref-06 "Listen" pill'idan olindi |
| S10 | `--glass-filter: blur(24px) saturate(160%)` → **`blur(24px)`** | O'lchov: ref-06/07 glass to'yinganlikni **kamaytiradi** (kulrang overlay c≈148–215) |
| S11 | Chip fon "qora 60%" → **oq 8%** | O'lchov: ref-01 chip fondan ochroq (oq 7–7.5%) |
| S12 | Chip matni 15 pt (ref-01) → **13 pt** | O'zbekcha matnlar uzunroq ("Oʻzbekcha dublyaj", "Koʻrmoqda") — 15 pt da bir qatorga sig'maydi |
| S13 | Glass doira o'lchamlari 44/52/64 → **44/52/58**, play 64 → **56** | O'lchov: ref-06/07 58.5–58.8, play 56, boshqaruv 54 |
| S14 | Editorial line-height 0.95 → ro'yxat **1.41**, displey **0.98**; 01/07-ekrandagi 40 pt → shkaladagi **44** | O'lchov: ref-03 (qatorlar oralig'i 62 pt) |
| S15 | Nav noaktiv label `text-3` → **oq 90%** | O'lchov: ref-01 noaktiv label `#E5E5E5` |
| S16 | Nav markaziy glossy doira 42 → **34** | Sketch'dagi "Lenta" labeli doira ostiga sig'ishi uchun (55 pt nav ichida) |
| S17 | Sheet tutqichi rangi (`--handle`, oq 30%) | Referenslarda bottom sheet yo'q — iOS grabber |
| S18 | Rasmlar: Unsplash → **ambient rang + siluet + grain placeholder** | `images.unsplash.com` bu muhitda bloklangan (proxy 403). PROMPT §3 zaxira usuli. Katta kadrlarda siluetga 2.5 px fokus-blur (`.art--soft`) |
| S19 | O'zbek belgisi: `ʻ` (U+02BB) va `ʼ` (U+02BC); serif stekida **Noto Serif subset (faqat ʻ ʼ) Gelasio'dan oldin** | 5 shriftning barchasida glif bor, lekin 5-bosqichda topildi: Gelasio'da `ʻ` kengligi 0 («Oʻz» → «Ož»). Google Fonts `text=ʻʼ` subset'i faqat shu ikki belgini almashtiradi (`fonts.md` §7a) |
| S20 | Hero drama nomi "Anton 52" → **ref-01 justified lockup** (har qator o'z o'lchamida, bir xil kenglik; 04-ekranda 36.4 / 66.7 / 98.5 px, kenglik 220) | O'lchov: ref-01 "MARTY" cap 77.5 pt, "SUPREME" 50.5 pt, ikkalasi 121 pt kenglikda |
| S21 | Qidiruv maydoni balandligi 79 (ref-04 o'lchovi) → **60** | PROMPT §06 aniq 60 pt deydi; foydalanuvchi spetsifikatsiyasi ustun |
| S22 | Grain kuchi `--grain-opacity: .10` | Kalibrlash: 11-ekran ref-07 masshtabiga kichraytirilganda yuqori chastota std 1.7–2.1 (ref-07: 0.8–1.9) |

### 5-bosqich tekshiruvidan keyingi o'zgarishlar
| # | Farq | Sabab (o'lchov — `CHECKLIST.md`, `DELTA_E.md`) |
|---|---|---|
| S23 | Flame / rose fondagi kichik matn oq → **cocoa** (`--on-flame`): Bepul teg, chip--flame, joriy qism, Ommabop badge, son badge, «Faqat bugun» lentasi, 23 qadam raqami, 30 asosiy plitka | Oq matn flame ustida 3.05:1, rose ustida 3.45:1 (AA 4.5 dan past); cocoa 6.1:1 / 5.4:1. Ikonkalar oqligicha (non-text 3:1 ✓) |
| S24 | Iliq **karta/modal** fonida yorug' yadro o'ng chetga surildi (`--warm-card`, `--warm-light-card`) — to'liq ekran `.warm` o'zgarmadi | Yadro (`#EC731E`) ustida krem matn 2.8:1 edi. Rang stoplari ref-06 fit'iniki, faqat geometriya; matn endi ≥ 4.5 |
| S25 | Halqa tashqarisidagi qorong'ilashtirish cocoa → **`#490B03`** (rgba 73, 11, 3, .5) | ref-06 o'lchovi (token izohida allaqachon `#490B03` edi); tashqarida ΔE 12.8 → 8.0 |
| S26 | `--glass-bg-strong` (215, .25) → **(148, .36)**; `--glass-bg-frost` (220, .45) → **(188, .58)** | Render ↔ ref ΔE: ref-07 orqaga doira 1.32, ref-06 chip 0.61; to'q-sariq fondagi doira 5.10 va frost ~7.0 — ikkalasi **sof alfa modelining fizik chegarasida** (4.63 / 7.07): ref sample'ga blur atrofdagi rangni ham tortadi, buni hech qanday (c, a) takrorlay olmaydi |
| S27 | Iliq fon ΔE: fon maydoni **2.81** ✓, halqa nuri zonasi (≤ 45 pt) **10.7** | ref-06 halqasi — fotografik keng nur; CSS `box-shadow` (yadro 4 + glow 14 + ichki 23) uni taxminan beradi. Kengroq ichki glow sinaldi — ΔE yomonlashdi, shuning uchun o'lchangan qiymatlar qoldirildi |
| S28 | Bosish maydoni: vizual kichik boshqaruvlar (chip 26, pill 29–43, glass doira 40) ko'rinmas `::before` bilan **44×44** ga kengaytirildi (`--hit`) | HIG 44 pt; vizual o'lchamlar ref'dan o'zgarmadi. Gap ichidagi matn havolalari (shartlar, oferta) — WCAG 2.5.8 inline istisnosi |
| S29 | Himoya gradientlari tokenlashtirildi: `--shade-player` (05, 11, 21 — o'ng rail himoyasi qo'shildi), `--shade-top` (08 podium raqamlari, 10 hero tepasi) | TAQIQ: rasm ustidagi matn himoyasiz bo'lmaydi; ekran CSS'ida xom `rgba()` qolmasin |
| S30 | Shkalaga moslash: 04 LOGO 22 → **20**, Top-10 raqami → `--t-rank` **128** (yangi token), 06 ro'yxat raqami 22 → **24**, 11 sarlavha 14 → **13**, 11 «5» 9 → **10**, 10 drama nomi 48 → **44** | «Faqat shkaladan» — audit shkaladan tashqari o'lcham topmasin. Yagona istisno: 04 justified lockup (S20) |
| S31 | Taqdimot ramkasida uzun ekranlar aylantiriladi: status bar, island, home indicator va nav faqat **393×852 viewport**da `fixed`; aylantirilganda status ostida iOS «scroll edge» xiralashuvi | Mustaqil ochilganda va skrinshotda geometriya o'zgarmaydi (852-ekranlar piksel-bir xil tekshirildi) |

## Ekranlar bo'yicha (sketch ↔ PROMPT ziddiyatlari)
| # | Ekran | Farq | Sabab |
|---|---|---|---|
| E1 | 04 | Coin chip tepa qatorning **chap** tomonida (PROMPT: o'ngda) | Markazdagi LOGO + o'ngda 3 element 393 pt ga sig'maydi (o'ngdagi guruh ~174 pt, LOGO bilan ustma-ust tushadi) |
| E2 | 04 | Segmented tablar hero **ostida** (sketch: hero tepasida) | PROMPT §04 tartibi va ref-01 kompozitsiyasi |
| E3 | 04 | "Oʻzbekcha dublyaj" chip emas, sarlavha ostidagi meta qatorda (sketch meta qatori saqlandi) | 3 chip 13 pt da ham 357 pt ga sig'maydi (≈388 pt) |
| E4 | 04 | "Siz uchun tavsiya": sketch'dagi 2×3 grid → **gorizontal qator, 3.5 ta poster ko'rinadi** (6 tasi ham bor) | PROMPT §04 aniq ko'rsatmasi |
| E5 | 04, nav | Nav tartibi: Bosh sahifa · **Mukofot · Lenta** · Roʻyxatim · Profil (sketch: Bosh sahifa · Lenta · Mukofot …) | PROMPT: "Lenta markazda oq glossy doira" — markazda bo'lishi uchun 2- va 3-o'rin almashtirildi. **Foydalanuvchi tasdiqladi.** |
| E6 | 10 | Sketch'dagi poster-chapda/nom-o'ngda tuzilma → tepada **~55% rasm** | PROMPT §10 (ref-02 serial sahifasi). Sketch ma'lumotlari saqlandi: janrlar "•" teglarda, subtitr qatori, barcha sonlar |
| E7 | 10 | PROMPT'dagi qo'shimcha glass "+ Roʻyxatga" tugmasi **qo'shilmadi** | Sketch'dagi "Saqlangan · 534K" harakati bilan bir xil funksiya; TAQIQ: sketch'da yo'q funksiya. **Foydalanuvchi tasdiqladi.** |
| E8 | 11 | −5s / pauza / +5s ekran o'rtasidan (sketch) **pastga** | PROMPT §11: "Pastda ref-07 boshqaruvining aynan o'zi" |
| E9 | 11 | Pleer kadriga nur halqasi 55% kuchda qo'shildi | ref-07 pleerida halqa yo'q, lekin PROMPT: emotsional ekranlar (11) — iliq gradient + nur halqasi + grain |
| E10 | 10 | Qism tile "bepul" holati label o'rniga flame nuqta | 52 pt tile ichida 8 pt matn o'qib bo'lmaydi |
| E11 | 02 | Google / Apple tugmalari **faqat matn** (sketch: logo doirasi) | TAQIQ: brend logolari |
| E12 | 01 | Janr chiplari (sketch) → **ref-03 tahririy ro'yxati**, pastga qarab mask bilan so'nadi; ko'rinishdan pastdagi qatorlar kontrast tekshiruvidan chiqarilgan | PROMPT §01 aniq ko'rsatmasi; so'nish — «pastda yana bor» ishorasi |
| E13 | 06 | «Janr bo'yicha» 2×3 katakchalar (sketch) → **72 pt rasmli doiralar qatori + glass strelka** | PROMPT §06 |
| E14 | 08 | Ro'yxatda 4–7-o'rinlar (PROMPT: 4–10) | Sketch'da 7 tagacha; ekranga sig'adigani shu, qolgani scroll |
| E15 | 09 | Sketch ro'yxati → **masonry** (bitta keng element bilan) | PROMPT §09 (ref-03 3-ekran) |
| E16 | 16, 17 | Coin paketlari: 16 da 3 ta (sketch), 17 da 2 ustunli 6 ta; «300» paketida bonus o'rnida **«bonussiz»** | PROMPT §16/17; bo'sh joy o'rniga holat yozuvi |
| E17 | 19 | To'lov usuli qatorlari radiusi 18 → **17** (`--r-squircle`) | Tokendan tashqari radius taqiqlangan |
| E18 | 29 | Guruh kartalari radiusi 20 → **28** (`--r-card`) | ← |
| E19 | 23 | Telegram / Instagram / WhatsApp ulashish doiralarida **umumiy ikonkalar** (send, video, comment) | TAQIQ: brend logolari |
| E20 | 24 | 4 ta underline tab 15 pt da 357 pt ga sig'maydi → tab qatori **gorizontal scroll** (08 dagidek); tavsiyalar nav ostidan o'tadi | O'zbekcha nomlar uzun; sketch matnlari qisqartirilmadi |
| E21 | 27 | Tez kirish plitkalari (Tarix, Saqlangan, Yuklangan, Mukofot) va «★ Sevimlilar» kartasi | Sketch elementlari, ref-01 profil kompozitsiyasida joylashtirildi |
| E22 | 18 | «Xaridlarni tiklash» **chapga**, yopish doirasi o'ngga; hero matni krem; fon gradientida ember 30 → **26 %** | O'ng tepada halqa yoyi va tashqi qorong'ilik matn kontrastini 3.9 ga tushirardi |
| E23 | 15 | «Keyingi drama 5 soniyada…» va «Bekor qilish» **markazda ustma-ust**; modal halqasi `.ring--tall` (yoy o'ng chetga yaqin) | Baland modalda halqa yoyi o'xshash dramalar va «Bekor qilish» ustidan o'tib, kontrastni 2.8 ga tushirardi |
| E24 | 05, 11 | O'ng rail chetdan **22 pt** (14 edi) | «Ulashish» labeli 18 pt chegaradan chiqmasligi uchun |
| E25 | 08 | Podium raqamlari ostida `--shade-top` himoya gradienti | Oq / sand raqam yorug' ambient poster ustida 2.3:1 edi |
| E26 | 22 | Bugungi check-in plitkasining old qismi tekis flame (pastki to'qlashish olib tashlandi), matn cocoa | Gradientning to'q qismida cocoa ham, oq ham 4.5 ga yetmasdi |
