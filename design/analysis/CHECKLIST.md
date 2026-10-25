# 5-bosqich: avtomatik tekshiruv hisoboti

`node tools/audit.js <dir> screens/*.html && python3 tools/audit.py <dir>` bilan yaratilgan. Qo'lda tekshiriladigan bandlar oxirida.

## 1. Status bar · Dynamic Island · Home indicator
- 30 ekranning 30 tasida geometriya aynan bir xil.
- Namuna: {'.status__time': (0, 18, 140, 22), '.status__icons': (293, 23, 74, 13), '.island': (133.5, 11, 126, 37.33), '.home-ind': (129.5, 8, 134, 5)}

## 2. Nav (04, 05, 22, 24, 27)
- Nav bor ekranlar: 04, 05, 22, 24, 27
- Joylashuv (x, pastdan, w, h): bir xil (18, 36, 357, 55)
- Markup (is-active va to'ldirilgan ikonka hisobga olinmasa): bir xil
- Piksel (pill ichi, aktiv slotlar ±6 pt chiqarilgan), juftlar orasida max farq = **9** / 255

## 3. Touch target ≥ 44 pt
- Interaktiv elementlar: 390; 44 dan kichik (qator/karta ichida boʻlmagan): **0**

## 4. Matn kontrasti (WCAG: oddiy 4.5, katta 3.0)
Fon — matnsiz render (`*{color:transparent}`) piksellari; matn rangi alfa va ota-ona opacity bilan aralashtiriladi; koʻrsatkich — matn bbox'idagi eng yomon 10 % piksel (p10).

- Matn elementlari: 977; chegaradan past: **0** (+ 1 disabled / placeholder / mask bilan ataylab soʻndirilgan)
  - 01 `ul.list.t-edit > li` «Shartnomali nikoh» 44px — p10 2.78 < 3.0 (mask: ataylab soʻndirilgan)

## 5. Tipografiya shkalasi
- Shkala: [10, 11, 12, 13, 15, 17, 20, 24, 26, 28, 30, 32, 36, 40, 44, 53, 72, 96, 128]
- Shkaladan tashqari oʻlchamlar: yoʻq
- Shrift oilalari: Anton, Awesome Serif (+ Playfair Display: ʻ ʼ « » +), IBM Plex Mono, Inter, Inter Tight

## 6. Radiuslar
- Token radiuslari: [6, 10.2, 11, 12, 14, 16, 17, 20.7, 24, 28, 34.5, 40, 55, 999] (+ 50 % / pill)
- Tokendan tashqari: yoʻq

## 7. Chekka 18 pt
- Gorizontal scroll'dan tashqaridagi matn 18 pt chegaraga kirgan holatlar: **0**

## 7b. Ikonkalar
- `icons.css`: 87 ikonka, stroke-width ['2.4'], linecap ['round'] — bitta toʻplam (`tools/build_icons.py`)

## 7c. Nur halqasi + grain (iliq ekranlar 03, 05, 11, 15, 17, 18, 20 va iliq kartalar)
- 03: ekran: halqa ✓, grain ✓; iliq yuzalar 1 — hammasida halqa + grain ✓
- 05: ekran: halqa ✓, grain ✓; iliq karta yoʻq
- 11: ekran: halqa ✓, grain ✓; iliq karta yoʻq
- 15: ekran: halqa ✓, grain ✓; iliq yuzalar 1 — hammasida halqa + grain ✓
- 17: ekran: halqa ✓, grain ✓; iliq yuzalar 1 — hammasida halqa + grain ✓
- 18: ekran: halqa ✓, grain ✓; iliq karta yoʻq
- 20: ekran: halqa ✓, grain ✓; iliq yuzalar 1 — hammasida halqa + grain ✓
- 22: iliq yuzalar 1 — hammasida halqa + grain ✓
- 26: iliq yuzalar 1 — hammasida halqa + grain ✓
- 28: iliq yuzalar 1 — hammasida halqa + grain ✓
- Grain kuchi: bitta token `--grain-opacity` (hamma joyda bir xil); halqa: bitta `--ring-shadow`

## 7d. Har bir drama — bitta rasm (ambient + siluet)
- Nomi aniqlangan rasmlar: 54; dramalar: 17; nomuvofiq: **0**
  - Ajrashgandan keyin boylik: --amb-04 art--portrait
  - Boʻri qirolining qasosi: --amb-02 art--profile
  - Direktorning sirli egizagi: --amb-05 art--duo
  - Imperatorning soʻnggi farmoni: --amb-12 art--profile
  - Kelinning ikkinchi hayoti: --amb-11 art--portrait
  - Malika libosidagi xizmatkor: --amb-08 art--portrait
  - Merosxoʻrning qaytishi: --amb-17 art--profile
  - Milliarderning yashirin kelini: --amb-01 art--couple
  - Ofisdagi yolgʻon nikoh: --amb-13 art--couple
  - Qasos kelini: --amb-16 art--portrait
  - Qishloqdan kelgan merosxoʻr: --amb-09 art--walk
  - Sevgi va qasos oʻrtasida: --amb-10 art--duo
  - Shartnoma boʻyicha xotin: --amb-03 art--couple
  - Taqdir toʻyi: --amb-14 art--couple
  - Uch yildan keyin qaytdim: --amb-07 art--walk
  - Vampir qoʻriqchisi: --amb-06 art--profile
  - Yashirin chempion: --amb-15 art--walk

## 8. Ekran CSS'idagi xom qiymatlar (tokens.css'dan tashqari)
- Jami: **3**
  - 04 [font-size] `font-size: 36.4px; line-height: 38px`
  - 04 [font-size] `font-size: 66.7px; line-height: 60px`
  - 04 [font-size] `font-size: 98.5px; line-height: 86px`

## 9. PROMPT 5-bosqich ro'yxati — yakuniy holat
| Band | Holat | Dalil |
|---|---|---|
| Ranglar tokens'dan; ref sample bilan ΔE < 3 | ✓ (2 ta fizik istisno) | `DELTA_E.md`: glossy 0.41, nav 0.5, karta 0, flame 0.95, glass 0.61–1.32, iliq fon maydoni 2.81; istisnolar — halqa nuri zonasi va blur'li glass (DEVIATIONS S26–S27); §8: ekran CSS'ida xom rang yo'q |
| Bir turdagi elementlar radiusi bir xil | ✓ | §6: tokendan tashqari radius yoʻq |
| Sahifa cheti, bo'limlar orasi bir xil | ✓ (18 pt — DEVIATIONS S7) | §7: chekkaga kirgan matn 0; `--page-x`, `--gap-section` |
| Glossy pill ref-01 bilan farqsiz | ✓ | `DELTA_E.md`: 13 nuqtali profil, oʻrtacha ΔE 0.41, max 1.47 |
| Glass (blur, alfa, chegara) ref-04/05/06/07 bilan | ✓ | `DELTA_E.md`: bir xil fon ustida render; `--glass-filter` blur 24, saturate yoʻq (S10) |
| Nur halqasi va grain iliq ekranlarda, kuchi bir xil | ✓ | §7c; bitta `--ring-shadow`, bitta `--grain-opacity` |
| Tipografiya faqat shkaladan; oʻ/gʻ toʻgʻri | ✓ | §5; serif — Awesome Serif, unda yoʻq ʻ ʼ Playfair Display'dan toʻgʻri kenglikda (`fonts.md` §7b) |
| Ikonkalar bitta toʻplamdan, round cap | ✓ (stroke 2.4 — foydalanuvchi soʻrovi bilan qalinlashtirildi) | §7b |
| Bottom nav 5 ekranda piksel aniqligida bir joyda | ✓ | §2 |
| Status bar, Dynamic Island, home indicator bir xil | ✓ | §1 |
| Touch ≥ 44 pt; kontrast 4.5 / 3 | ✓ | §3, §4 (S23, S24, S28) |
| Har bir drama hamma ekranda oʻsha rasm bilan, grading bir xil | ✓ | §7d; `.art::after` — bitta `--grade` |
| Sketchdagi har bir element oʻz joyida | ✓ | `compare/NN.png` (sketch | dizayn | ref) 30 ta montaj koʻzdan kechirildi; farqlar DEVIATIONS E1–E26 |

