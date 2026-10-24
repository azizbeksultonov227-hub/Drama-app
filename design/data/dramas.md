# Dramalar va ularning rasmi

Har bir dramaga **bitta** rasm (va bitta ambient rang) biriktirilgan; u barcha ekranlarda aynan o'sha bo'ladi.
Hozircha `images.unsplash.com` bu muhitda tarmoq siyosati bilan bloklangan (proxy 403), shuning uchun PROMPT §3 dagi zaxira usuli ishlatiladi: **ambient rang + siluet + grain placeholder** (`.art` komponenti, `art.css`). Barcha placeholder'larga bir xil iliq color-grading (`--grade`) qo'yilgan.
Unsplash ochilganda har bir qatorga tanlangan rasm URL'i yoziladi va `.art` ichiga `<img>` qo'shiladi — siluet va ambient rang o'sha rasmning dominant rangiga moslanadi.

| # | Drama | Ambient token | Siluet (`.art--*`) | Kayfiyat | Qismlar | Unsplash (kutilmoqda) |
|---|---|---|---|---|---|---|
| D01 | Milliarderning yashirin kelini | `--amb-01` `#96220F` | couple | romantika · qasos | 80 | — |
| D02 | Boʻri qirolining qasosi | `--amb-02` `#416670` | profile | fantastika · qasos | 72 | — |
| D03 | Shartnoma boʻyicha xotin | `--amb-03` `#8B1D45` | couple | CEO · romantika | 60 | — |
| D04 | Ajrashgandan keyin boylik | `--amb-04` `#AC9746` | portrait | qasos · boylik | 70 | — |
| D05 | Direktorning sirli egizagi | `--amb-05` `#20377F` | duo | sir · CEO | 64 | — |
| D06 | Vampir qoʻriqchisi | `--amb-06` `#6A182B` | profile | fantastika · romantika | 56 | — |
| D07 | Uch yildan keyin qaytdim | `--amb-07` `#6C4933` | walk | drama · qaytish | 72 | — |
| D08 | Malika libosidagi xizmatkor | `--amb-08` `#A93D6D` | portrait | tarixiy · romantika | 58 | — |
| D09 | Qishloqdan kelgan merosxoʻr | `--amb-09` `#4A4918` | walk | oila · boylik | 90 | — |
| D10 | Sevgi va qasos oʻrtasida | `--amb-10` `#AD3936` | duo | qasos · romantika | 60 | — |
| D11 | Kelinning ikkinchi hayoti | `--amb-11` `#D06D6D` | portrait | romantika | 40 | — |
| D12 | Imperatorning soʻnggi farmoni | `--amb-12` `#773916` | profile | tarixiy | 66 | — |
| D13 | Ofisdagi yolgʻon nikoh | `--amb-13` `#37595B` | couple | ofis · romantika | 48 | — |
| D14 | Taqdir toʻyi | `--amb-14` `#B9796E` | couple | romantika (tez kunda) | — | — |
| D15 | Yashirin chempion | `--amb-15` `#57453C` | walk | jangari · qasos (tez kunda) | 56 | — |
| D16 | Qasos kelini | `--amb-16` `#A75349` | portrait | qasos · romantika | 80 | — |
| D17 | Merosxoʻrning qaytishi | `--amb-17` `#955943` | profile | qasos · CEO (tez kunda) | 70 | — |

Ambient ranglarning manbasi — referenslarda o'lchangan ranglar (`tokens.css` izohlari): ref-01 (Beating Hearts, Recent activity, profil foni), ref-03, ref-04, ref-05, ref-07.
