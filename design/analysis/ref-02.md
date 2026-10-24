# ref-02 — Netflix konsepsiyasi (splash · bosh sahifa · serial sahifasi · davom ettirish/ro'yxat/janrlar)

Fayl: `references/ref-02-netflix.webp` (1200×694). Mockup generativ (AI) ko'rinishda: telefonlar kengligi bir xil emas, matnlarda artefaktlar bor → o'lchovlar ±2–3%.
Brend elementlari (qizil `#D41F17`, "N"/NETFLIX logosi) **faqat o'lchov uchun**, dizaynda ishlatilmaydi.

## 1. Masshtab
Ramka (telefon korpusi) ~4.5 px; 1-telefonda (rasm fonida) aniq ko'rinadi: tashqi 36…298, ekran 41…294.

| Telefon | Tashqi x | Ekran x | Ekran kengligi | k (pt/px) |
|---|---|---|---|---|
| 1 Splash | 36…298 | 41…294 | 254 px | 1.547 |
| 2 Bosh sahifa | 322…589 | 326.5…584.5 | 258 px | 1.523 |
| 3 Serial sahifasi | 612…879 | 616.5…874.5 | 258 px | 1.523 |
| 4 Ro'yxat/janrlar | 902…1166 | 906.5…1161.5 | 255 px | 1.541 |

Vertikal: ekran 66…635 (570 px) → nisbat 2.19–2.24 (iPhone 15 Pro 2.168 dan cho'ziqroq). Dynamic Island yo'q (tekis mockup).

## 2. Ranglar
| Element | HEX | Manba nuqta |
|---|---|---|
| Ekran foni | `#050505`–`#0A0A0A` (o'rtacha `#070707`) | p2 (330,140) #010504, (580,390) #030603; p3 (620,450) #040503; p4 (912,330) #090909, (1000,500) #070707 |
| Oq tugma ("Смотреть") | `#E9E5E1` / `#E8E6E5` (tekis, iliq oq) | p2 x345, p3 x640; yuqori chet `#ECECEC`/`#EEEEEE`, past chet `#FCFCF9` |
| Oq tugma matni | `#100C08` | |
| To'q tugma ("Мой список") | `#222222` / `#212121` (tekis) | yuqori chet `#252525` |
| Janr tugmasi | `#1F1F1F` | p4 x925 (taxmin ✓) |
| Janr matni | `#D6D6D6` | |
| Aktiv tab matni | `#E8EAE9` / `#F2F2F2` | |
| Noaktiv tab | `#999999` (p2), `#C5C5C5` (p3) | |
| Aktiv tab chizig'i | `#A14849` (brend qizil, AA) | → bizda flame |
| Bo'lim sarlavhasi | `#F0F1F0` / `#FAF9FA` | |
| Tavsif (2-daraja) | `#D3D3D3` / `#C6C9C9` | ≈ oq 78–83% |
| Meta / teglar / davomiylik (3-daraja) | `#818181` / `#949494` / `#767676` / `#797979` | ≈ oq 46–58% |
| Nav label aktiv / noaktiv | `#B5B5B5` / `#70706F` | |
| Progress (brend) | `#A25958` (AA) | → bizda flame |

### k-means (k=10)
- Butun rasm: `#070706` 36.4% · `#6C4933` 19.6% · `#553624` 13.2% · `#1E140E` 10.4% · `#2A2521` 9.2% · `#474846` 3.4% · `#836856` 3.4% · `#E6E3E0` 1.7% · `#B5A18F` 1.6% · `#CA231B` 1.3%
- Bosh sahifa: `#060706` 59.3% · `#1E1714` 11.1% · `#322823` 8.9% · `#47403A` 5.6% · `#6E594C` 3.8% · `#6E3D2A` 3.2% · `#8E7565` 2.4% · `#E8E6E4` 2.4% · `#AC9684` 1.9% · `#C4B5A8` 1.2%
- Serial sahifasi: `#050606` 49.4% · `#212323` 13.3% · `#101212` 11.0% · `#353737` 8.2% · `#514E4B` 5.7% · `#6F645E` 4.5% · `#E5E3E0` 4.4% · `#8C837E` 1.5% · `#B0AEAD` 1.2% · `#F1F1EF` 0.8%

## 3. Gradientlar
- Splash: to'liq ekranli foto, pastga qorayadi (suv qismi `#1E140E`), CTA ostida deyarli qora.
- Serial sahifasi: rasm ~0 … 45% balandlik, sarlavha (≈273–308 px) rasm ustida; fade ~40%→52% (meta qatori ostida to'liq `#050505`).
- Bosh sahifa hero kartasi: rasm ichida pastki chapda qora fade (matn himoyasi).
- Tugmalar tekis — gradient yo'q (ref-01 glossy'dan farqi).

## 4. Nur va soya
Soya yo'q: tugma/karta chetidan keyin darhol fon (`#030303`–`#060606`).

## 5. Glass
Yo'q (bu konsepsiyada shaffof element yo'q; "Мой список" to'q tugmasi opaque `#222222`).

## 6. Radiuslar
| Element | R (px) | R (pt) |
|---|---|---|
| To'liq kenglikdagi oq tugma (p3) | 8.5–8.75 | **13** |
| To'liq kenglikdagi to'q tugma (p3) | 6.5 | **10** |
| Hero tugmalari (p2) | 7.0–7.25 | **11** |
| Janr tugmasi | 6.25–6.75 | **10** (taxmin ✓) |
| Splash CTA | ~13 (fit xatosi 0.6) | ~**20** (shubhali) |
| Hero karta (p2) | ~5–6 | ~**8** (karta deyarli edge-to-edge) |

## 7. Tipografiya (Kirill matn; cap ≈ 0.72 em, x ≈ 0.53 em)
| Matn | o'lchov | pt | Shrift | Rang |
|---|---|---|---|---|
| Splash sarlavha | cap 13 px, baseline oralig'i 24/23 px | 20 / 36 | sans **28**, line-height **1.29**, 3 qator | `#FFF8ED` |
| Splash subtitle | cap 7–9 px | 11–14 | sans **15**, 2 qator | `#CFC6BF` |
| Tab (p2) | cap 8, xh 6 | 12.2 / 9.1 | sans **16–17** medium | `#E8EAE9` / `#999999` |
| "СЕРИАЛ" belgisi | cap 5 | 7.6 | sans **10–11**, letter-spacing keng (~0.3 em), CAPS | `#DBDDDE` |
| Hero sarlavha "УЭНСДЕЙ" (p2) | cap 27 | 41 | yuqori kontrastli **condensed serif**, CAPS | `#FCFDFD` |
| Hero tavsif | cap 7 | 10.7 | sans **15** | `#C6C9C9` |
| Tugma matni | cap 8 | 12.2 | sans **16** semibold | `#100C08` |
| Bo'lim sarlavhasi | cap 8–9 | 12.2–13.9 | sans **17–19** semibold | `#F0F1F0` |
| Meta (p3) | cap 7 | 10.7 | sans **14–15** | `#818181` |
| Tavsif (p3) | cap 7, xh 5 | 10.7 / 7.6 | sans **14–15** | `#D3D3D3` |
| Teglar "Загадочный • Фэнтези" | cap 6 | 9.1 | sans **13** | `#949494` |
| Qism nomi / davomiyligi | cap 7 / 5 | 10.7 / 7.6 | sans **15** / **11–12** | `#E6E6E6` / `#767676` |
| Davom ettirish: nom / meta | cap 6 | 9.2 | sans **13** | `#E7E7E7` / `#797979` |
| Janr matni | cap 7 | 10.8 | sans **15** | `#D6D6D6` |
| Nav label | cap 5–6 | 8–9 | sans **11** | `#B5B5B5` / `#70706F` |

Shrift: UI — SF Pro'ga o'xshash neo-grotesk (→ Inter). Serial nomi — yuqori kontrastli, siqiq displey serif (o'tkir serif'lar) → serif nomzodlari `fonts.md` da.

## 8. Layout (pt)
| Element | o'lcham | izoh |
|---|---|---|
| Sahifa cheti | **16** (p2 posterlar, p4 posterlar 16.2); 19–22 (tugmalar, p4 kartalar); splash matni ~33 | generativ mock — nomuvofiq; median ≈ 19 |
| Hero karta (p2) | ekran kengligida, tepasi 162 px | |
| Hero tugmalari | oq **148 × 44**, to'q **192 × 43**, oraliq **13.7** | |
| To'liq kenglik tugmalar (p3) | **350 × 44** (oq), **347 × 44** (to'q), oraliq **10.7** | |
| Splash CTA | **~340 × 54–56** | |
| Poster (p2) | **107 × 164** (2:3 ≈ 1.54), gap **12**, qatorda **3.3** ta ko'rinadi | taxmin 104×148 |
| Poster (p4 "Мой список") | **111 × 162** (1.46), gap 13 | |
| Davom ettirish kartasi (p4) | **193 × 128** (3:2), qatorda **1.7** ta; markazda play doira ~36 pt | taxmin 160×90 |
| Progress chizig'i | **3** (2 px yadro) — kartaning pastki chetida va meta ostida | taxmin 3 ✓ |
| Qism thumbnail (p3) | **145** keng (16:9 → 82 baland), play doira ~30 pt | taxmin 120×68 |
| Underline tab chizig'i | **75 × 3** | |
| Janr tugmasi | **111 × 52**, 3 ustun, gap **9** (ustun va qator) | taxmin 44 baland |
| Tugmalar orasida vertikal | 10.7 | |

## 9. Ikonkalar
Outline, stroke ~1.5–2 pt, round cap: orqaga strelka, cast, ulashish, qidiruv (lupa), play (filled uchburchak oq doira ichida — doira 1.5 pt chiziq), yuklab olish (strelka + chiziq), nav: uy (filled aktiv), yangiliklar, qidiruv, "+" doira.

## 10. Tekstura
Grain yo'q (generativ rasm, faqat siqish shovqini).
