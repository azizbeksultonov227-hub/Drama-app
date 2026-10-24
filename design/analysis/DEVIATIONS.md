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
| S19 | O'zbek belgisi: `ʻ` (U+02BB) va `ʼ` (U+02BC) | Tanlangan 5 shriftning barchasida bor — U+2019 ga o'tish shart emas (`fonts.md` §7) |
| S20 | Hero drama nomi "Anton 52" → **ref-01 justified lockup** (har qator o'z o'lchamida, bir xil kenglik; 04-ekranda 36.4 / 66.7 / 98.5 px, kenglik 220) | O'lchov: ref-01 "MARTY" cap 77.5 pt, "SUPREME" 50.5 pt, ikkalasi 121 pt kenglikda |
| S21 | Qidiruv maydoni balandligi 79 (ref-04 o'lchovi) → **60** | PROMPT §06 aniq 60 pt deydi; foydalanuvchi spetsifikatsiyasi ustun |
| S22 | Grain kuchi `--grain-opacity: .10` | Kalibrlash: 11-ekran ref-07 masshtabiga kichraytirilganda yuqori chastota std 1.7–2.1 (ref-07: 0.8–1.9) |

## Ekranlar bo'yicha (sketch ↔ PROMPT ziddiyatlari)
| # | Ekran | Farq | Sabab |
|---|---|---|---|
| E1 | 04 | Coin chip tepa qatorning **chap** tomonida (PROMPT: o'ngda) | Markazdagi LOGO + o'ngda 3 element 393 pt ga sig'maydi (o'ngdagi guruh ~174 pt, LOGO bilan ustma-ust tushadi) |
| E2 | 04 | Segmented tablar hero **ostida** (sketch: hero tepasida) | PROMPT §04 tartibi va ref-01 kompozitsiyasi |
| E3 | 04 | "Oʻzbekcha dublyaj" chip emas, sarlavha ostidagi meta qatorda (sketch meta qatori saqlandi) | 3 chip 13 pt da ham 357 pt ga sig'maydi (≈388 pt) |
| E4 | 04 | "Siz uchun tavsiya": sketch'dagi 2×3 grid → **gorizontal qator, 3.5 ta poster ko'rinadi** (6 tasi ham bor) | PROMPT §04 aniq ko'rsatmasi |
| E5 | 04, nav | Nav tartibi: Bosh sahifa · **Mukofot · Lenta** · Roʻyxatim · Profil (sketch: Bosh sahifa · Lenta · Mukofot …) | PROMPT: "Lenta markazda oq glossy doira" — markazda bo'lishi uchun 2- va 3-o'rin almashtirildi. **Tasdiq kerak.** |
| E6 | 10 | Sketch'dagi poster-chapda/nom-o'ngda tuzilma → tepada **~55% rasm** | PROMPT §10 (ref-02 serial sahifasi). Sketch ma'lumotlari saqlandi: janrlar "•" teglarda, subtitr qatori, barcha sonlar |
| E7 | 10 | PROMPT'dagi qo'shimcha glass "+ Roʻyxatga" tugmasi **qo'shilmadi** | Sketch'dagi "Saqlangan · 534K" harakati bilan bir xil funksiya; TAQIQ: sketch'da yo'q funksiya. **Tasdiq kerak.** |
| E8 | 11 | −5s / pauza / +5s ekran o'rtasidan (sketch) **pastga** | PROMPT §11: "Pastda ref-07 boshqaruvining aynan o'zi" |
| E9 | 11 | Pleer kadriga nur halqasi 55% kuchda qo'shildi | ref-07 pleerida halqa yo'q, lekin PROMPT: emotsional ekranlar (11) — iliq gradient + nur halqasi + grain |
| E10 | 10 | Qism tile "bepul" holati label o'rniga flame nuqta | 52 pt tile ichida 8 pt matn o'qib bo'lmaydi |
