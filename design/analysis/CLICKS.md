# Har bir tugma testi (tools/click_test.js)

Har bir ekran yangidan yuklanib, har bir bosiladigan element markaziga bosildi. Natija: «→» boshqa ekran, «💬» bildirishnoma, «✎» holat oʻzgardi, «↕» scroll.

- Jami bosilgan: **658** (+ 32 ta allaqachon tanlangan element — qayta bosish holatni oʻzgartirmaydi)
- Oʻlik (hech narsa boʻlmadi): **0**
- Markazi boshqa element bilan yopilgan: **0**
- JS xatolari: yoʻq

### 01-onboarding
| Element | Natija |
|---|---|
| button.btn.btn--text «Oʻtkazib yuborish» | → 02-kirish |
| li.is-on «→ Romantika» | ✎ holat (5) |
| li.is-on «→ Milliarder / CEO» | ✎ holat (5) |
| li.is-on «→ Qasos» | ✎ holat (5) |
| li «Boʻri va vampir» | ✎ holat (4) |
| li «Shartnomali nikoh» | ✎ holat (4) |
| li «Oilaviy» | ✎ holat (4) |
| li «Komediya» | ✎ holat (4) |
| li «Triller» | ✎ holat (4) |
| li «Tarixiy» | ✎ holat (4) |
| li «Fantastika» | ✎ holat (4) |
| li «Maktab / universitet» | ✎ holat (4) |
| li «Koreys dramalari» | ✎ holat (4) |
| li «Turk seriallari» | ✎ holat (4) |
| li «Anime» | ✎ holat (4) |
| li «AI dramalar» | ✎ holat (4) |
| div.lang «Til, dublyaj va subtitr Oʻzb» | 💬 Til: Русский |
| span.chip.choice «Русский» | 💬 Til: Русский |
| span.chip.choice «English» | 💬 Til: English |
| div.guest.card--glass «Roʻyxatdan oʻtmasdan ham tom» | → 04-bosh-sahifa |
| button.btn.btn--primary «Davom etish · 3 ta tanlandi» | → 02-kirish |

### 02-kirish
| Element | Natija |
|---|---|
| div.scrim «» | → 04-bosh-sahifa |
| button.gbtn.gbtn--sm «Yopish» | → 04-bosh-sahifa |
| button.btn.btn--primary «Telefon raqam orqali» | ▤ oyna: Telefon raqam |
| button.btn.btn--glass «Telegram orqali» | 💬 Telegram orqali kirdingiz · +50 bonus coin |
| button.btn.btn--glass «Google» | 💬 Google orqali kirdingiz · +50 bonus coin |
| button.btn.btn--glass «Apple» | 💬 Apple orqali kirdingiz · +50 bonus coin |
| button.btn.btn--text «Mehmon sifatida davom etish» | → 04-bosh-sahifa |
| a «Foydalanish shartlari» | ▤ oyna: Foydalanish shartlari |
| a «Maxfiylik siyosati» | ▤ oyna: Maxfiylik siyosati |

### 03-sovga
| Element | Natija |
|---|---|
| div.scrim «» | → 04-bosh-sahifa |
| button.gbtn.gbtn--sm «Yopish» | → 04-bosh-sahifa |
| div.box.gift «» | 💬 Sovgʻa: 100 bonus coin · 7 kun amal qiladi |
| button.btn.btn--primary «Sovgʻani olish» | 💬 +100 coin hisobingizga tushdi |

### 04-bosh-sahifa
| Element | Natija |
|---|---|
| section.hero «105 LOGO 3 Treyler ovozli Mi» | → 10-drama |
| span.chip.coin-chip «105» | → 17-coin-dokoni |
| button.gbtn.gbtn--sm «Qidiruv» | → 06-qidiruv |
| button.gbtn.gbtn--sm «Bildirishnomalar» | → 26-bildirishnomalar |
| span.chip.trailer «Treyler ovozli» | 💬 Treyler ovozi oʻchirildi |
| span.chip «Haftaning hiti» | → 08-reyting |
| span.chip «Koʻrmoqda» | 💬 Hozir 1 240 kishi koʻrmoqda |
| button.btn.btn--primary «Tomosha qilish» | → 11-pleer |
| button.btn.btn--text «Roʻyxatda» | 💬 Roʻyxatdan olib tashlandi |
| i.is-on «» | ✎ holat (3) |
| i «» | ✎ holat (3) |
| i «» | ✎ holat (3) |
| i «» | ✎ holat (3) |
| i «» | ✎ holat (3) |
| span.seg__item «Ommabop» | ✎ holat (46) |
| span.seg__item «Yangi» | ✎ holat (28) |
| span.seg__item «Reyting» | → 08-reyting |
| span.seg__item «VIP» | ✎ holat (19) |
| span.seg__item «Oʻzbekcha» | ✎ holat (40) |
| span.seg__item «Tez kunda» | → 09-tez-kunda |
| span.seg__item «Janrlar» | → 07-janrlar |
| span.pill-more «Tarix» | → 24-royxatim |
| article.lcard «12 / 72-qismBoʻri qirolining» | → 11-pleer |
| span.gbtn.lcard__play «» | → 11-pleer |
| article.lcard «10 / 80-qismMilliarderning y» | → 11-pleer |
| span.gbtn.lcard__play «» | → 11-pleer |
| article.lcard «5 / 60-qismShartnoma boʻyich» | → 11-pleer |
| span.gbtn.lcard__play «» | → 11-pleer |
| article.lcard «30 / 66-qismImperatorning so» | 💬 Bu drama faqat VIP aʼzolar uchun |
| span.gbtn.lcard__play «» | 💬 Bu drama faqat VIP aʼzolar uchun |
| span.pill-more «Reyting» | → 08-reyting |
| div.top10__item «1Boʻri qirolining qasosiBoʻr» | → 10-drama |
| article.poster «Boʻri qirolining qasosiBoʻri» | → 10-drama |
| div.top10__item «2Ajrashgandan keyin boylikAj» | → 10-drama |
| article.poster «Ajrashgandan keyin boylikAjr» | → 10-drama |
| div.top10__item «3Direktorning sirli egizagiD» | → 10-drama |
| article.poster «Direktorning sirli egizagiDi» | → 10-drama |
| div.top10__item «4Milliarderning yashirin kel» | → 10-drama |
| article.poster «Milliarderning yashirin keli» | → 10-drama |
| div.top10__item «5Kelinning ikkinchi hayotiKe» | → 10-drama |
| article.poster «Kelinning ikkinchi hayotiKel» | → 10-drama |
| div.top10__item «6Vampir qoʻriqchisiVampir qo» | → 10-drama |
| article.poster «Vampir qoʻriqchisiVampir qoʻ» | → 10-drama |
| div.top10__item «7Qishloqdan kelgan merosxoʻr» | → 10-drama |
| article.poster «Qishloqdan kelgan merosxoʻrQ» | → 10-drama |
| div.top10__item «8Shartnoma boʻyicha xotinSha» | → 10-drama |
| article.poster «Shartnoma boʻyicha xotinShar» | → 10-drama |
| div.top10__item «9Uch yildan keyin qaytdimUch» | → 10-drama |
| article.poster «Uch yildan keyin qaytdimUch » | → 10-drama |
| div.top10__item «10Malika libosidagi xizmatko» | → 10-drama |
| article.poster «Malika libosidagi xizmatkorM» | → 10-drama |
| div.card.vip «VIP — hamma qismlar ochiq Re» | → 18-vip |
| button.btn.btn--primary «1-hafta −40%» | → 18-vip |
| span.pill-more «Hammasi» | → 07-janrlar |
| article.poster «Bepul 1–10Milliarderning yas» | → 10-drama |
| article.poster «YANGIDirektorning sirli egiz» | → 10-drama |
| article.poster «Uch yildan keyin qaytdim72 q» | → 10-drama |
| article.poster «VIPMalika libosidagi xizmatk» | → 10-drama |
| article.poster «OʻzbekchaQishloqdan kelgan m» | → 10-drama |
| article.poster «Sevgi va qasos oʻrtasida60 q» | → 10-drama |
| span.pill-more «Hammasi» | → 07-janrlar |
| article.poster «YANGIKelinning ikkinchi hayo» | → 10-drama |
| article.poster «YANGIImperatorning soʻnggi f» | → 10-drama |
| article.poster «YANGIOfisdagi yolgʻon nikohO» | → 10-drama |
| span.pill-more «Jadval» | → 09-tez-kunda |
| article.card «Taqdir toʻyiErtaga · 20:00Es» | → 09-tez-kunda |
| button.btn.btn--glass «Eslat» | 💬 Premyerada eslatamiz · 26-oktabr · 20:00 |
| article.card «Yashirin chempion28-oktEslat» | → 09-tez-kunda |
| button.btn.btn--xs «Eslatiladi» | 💬 Eslatma oʻchirildi |
| a.nav__item «Mukofot» | → 22-mukofotlar |
| a.nav__item «Lenta» | → 05-lenta |
| a.nav__item «Roʻyxatim» | → 24-royxatim |
| a.nav__item «Profil» | → 27-profil |

### 05-lenta
| Element | Natija |
|---|---|
| div.frame.art «» | 💬 Pauza |
| span.seg__item «Kuzatuvdagilar» | ✎ holat (6) |
| button.gbtn.gbtn--sm «Qidiruv» | → 06-qidiruv |
| div.toast.card--glass «Keyingi drama uchun yuqoriga» | ✎ holat (5) |
| span.gbtn.gbtn--side «61K» | 💬 Yoqtirishlardan olindi |
| span.gbtn.gbtn--side «610K» | 💬 Roʻyxatdan olib tashlandi |
| span.gbtn.gbtn--side «5.1K» | → 13-izohlar |
| span.gbtn.gbtn--side «Ulashish» | ▤ oyna: Ulashish |
| span.gbtn.gbtn--side «Qismlar» | → 12-qismlar |
| span.chip «Qasos» | → 07-janrlar |
| span.chip «Boʻrilar» | → 07-janrlar |
| span.chip.chip--flame «Bepul 1–10» | → 12-qismlar |
| h1.t-title-1 «Boʻri qirolining qasosi» | → 10-drama |
| p.t-footnote «1-qism / 72 · U toʻyda xiyon» | → 10-drama |
| button.btn.btn--primary «Butun serialni koʻrish · 72 » | → 11-pleer |
| a.nav__item «Bosh sahifa» | → 04-bosh-sahifa |
| a.nav__item «Mukofot» | → 22-mukofotlar |
| a.nav__item «Roʻyxatim» | → 24-royxatim |
| a.nav__item «Profil» | → 27-profil |

### 06-qidiruv
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| div.search «» | ⌨ yozish maydoni |
| input.proto-input «Drama, aktyor yoki janr…» | ⌨ yozish maydoni |
| button.btn.btn--text «Bekor» | → 04-bosh-sahifa |
| button.btn.btn--text «Tozalash» | 💬 Qidiruv tarixi tozalandi |
| span.chip.choice «milliarder» | ✎ holat (6) |
| span.chip.choice «boʻri» | ✎ holat (6) |
| span.chip.choice «qasos kelin» | ✎ holat (6) |
| span.chip.choice «koreys drama» | ✎ holat (3) |
| li «1Milliarderning yashirin kel» | → 10-drama |
| span.t «Milliarderning yashirin keli» | → 10-drama |
| span.chip.chip--flame «Hit» | → 10-drama |
| li «2Boʻri qirolining qasosiHit» | → 10-drama |
| span.t «Boʻri qirolining qasosi» | → 10-drama |
| span.chip.chip--flame «Hit» | → 10-drama |
| li «3Ajrashgandan keyin boylikYa» | → 10-drama |
| span.t «Ajrashgandan keyin boylik» | → 10-drama |
| span.chip.chip--sand «Yangi» | → 10-drama |
| li «4CEO3» | ✎ holat (37) |
| span.t «CEO» | ✎ holat (37) |
| span.chip.st «3» | ✎ holat (37) |
| li «5Shartnomali nikoh1» | ✎ holat (28) |
| span.t «Shartnomali nikoh» | ✎ holat (28) |
| span.chip.st «1» | ✎ holat (28) |
| li «6Vampir qoʻriqchisiYangi» | → 10-drama |
| span.t «Vampir qoʻriqchisi» | → 10-drama |
| span.chip.chip--sand «Yangi» | → 10-drama |
| li «7Oʻzbekcha dublyaj2» | ✎ holat (19) |
| span.t «Oʻzbekcha dublyaj» | ✎ holat (19) |
| span.chip.st «2» | ✎ holat (19) |
| li «8Turk seriallari5» | ✎ holat (19) |
| span.t «Turk seriallari» | ✎ holat (19) |
| span.chip.st «5» | ✎ holat (19) |
| span.gbtn.gbtn--sm «» | → 07-janrlar |
| div.genre «Romantika» | → 07-janrlar |
| div.genre «Qasos» | → 07-janrlar |
| div.genre «CEO» | → 07-janrlar |
| div.genre «Boʻrilar» | → 07-janrlar |
| div.genre «Oilaviy» | → 07-janrlar |
| div.genre «Komediya» | → 07-janrlar |

### 07-janrlar
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| button.gbtn.gbtn--sm «Filtr» | 💬 Filtrlar yashirildi |
| span.chip.choice «Hammasi» | ✎ holat (112) |
| span.chip.choice «Romantika» | ✎ holat (58) |
| span.chip.choice «CEO» | ✎ holat (40) |
| span.chip.choice «Boʻrilar» | ✎ holat (13) |
| span.chip.choice «Oilaviy» | ✎ holat (22) |
| span.chip.choice «Hammasi» | ✎ holat (85) |
| span.chip.choice «Ruscha» | ✎ holat (58) |
| span.chip.choice «Inglizcha» | ✎ holat (4) |
| span.chip.choice «Tugallangan» | ✎ holat (58) |
| span.chip.choice «Davom etmoqda» | ✎ holat (31) |
| span.chip.choice «Yangi» | ✎ holat (85) |
| span.chip.choice «Reyting» | ✎ holat (85) |
| span.chip.choice «Koʻp saqlangan» | ✎ holat (85) |
| button.btn.btn--text «Tozalash» | 💬 Filtrlar tozalandi |
| div.res «Qishloqdan kelgan merosxoʻrO» | → 10-drama |
| article.poster «» | → 10-drama |
| span.gbtn.gbtn--sm «Tomosha qilish» | → 11-pleer |
| div.res «Boʻri qirolining qasosiQasos» | → 10-drama |
| article.poster «» | → 10-drama |
| span.gbtn.gbtn--sm «Tomosha qilish» | → 11-pleer |
| div.res «Milliarderning yashirin keli» | → 10-drama |
| article.poster «» | → 10-drama |
| span.gbtn.gbtn--sm «Tomosha qilish» | → 11-pleer |
| div.res «Qasos keliniQasos • Romantik» | → 10-drama |
| article.poster «» | → 10-drama |
| span.gbtn.gbtn--sm «Tomosha qilish» | → 11-pleer |
| div.res «Ajrashgandan keyin boylikQas» | → 10-drama |
| article.poster «» | → 10-drama |
| span.gbtn.gbtn--sm «Tomosha qilish» | → 11-pleer |
| div.res «Uch yildan keyin qaytdimQaso» | → 10-drama |
| article.poster «» | → 10-drama |
| span.gbtn.gbtn--sm «Tomosha qilish» | → 11-pleer |
| div.res «Kelinning ikkinchi hayotiQas» | → 10-drama |
| article.poster «» | → 10-drama |
| span.gbtn.gbtn--sm «Tomosha qilish» | → 11-pleer |
| div.res «VIPImperatorning soʻnggi far» | → 10-drama |
| article.poster «VIP» | → 10-drama |
| span.gbtn.gbtn--sm «Tomosha qilish» | 💬 Bu drama faqat VIP aʼzolar uchun |
| div.res «Sevgi va qasos oʻrtasidaQaso» | → 10-drama |
| article.poster «» | → 10-drama |
| span.gbtn.gbtn--sm «Tomosha qilish» | → 11-pleer |

### 08-reyting
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| span.utabs__item «Koʻp koʻrilgan» | ✎ holat (25) |
| span.utabs__item «Koʻp saqlangan» | ✎ holat (25) |
| span.utabs__item «Yangi hitlar» | ✎ holat (25) |
| span.seg__item «Hafta» | ✎ holat (25) |
| span.seg__item «Oy» | ✎ holat (25) |
| div.pod.card--ambient «2Ajrashgandan keyin boylik1.» | → 10-drama |
| div.pod.pod--first «1Boʻri qirolining qasosi2.9M» | → 10-drama |
| div.pod.card--ambient «3Direktorning sirli egizagi1» | → 10-drama |
| div.lrow «4Milliarderning yashirin kel» | → 10-drama |
| span.chip.mv «2» | → 10-drama |
| div.lrow «5Kelinning ikkinchi hayotiQa» | → 10-drama |
| span.chip.chip--sand «YANGI» | → 10-drama |
| div.lrow «6Vampir qoʻriqchisiFantastik» | → 10-drama |
| span.chip.mv «1» | → 10-drama |
| div.lrow «7Qishloqdan kelgan merosxoʻr» | → 10-drama |
| span.chip.mv «» | → 10-drama |

### 09-tez-kunda
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| div.date «Bugun25» | ✎ holat (4) |
| div.date «Sesh27» | ✎ holat (8) |
| div.date «Chor28» | ✎ holat (8) |
| div.date «Pay29» | ✎ holat (10) |
| div.date «Jum30» | ✎ holat (10) |
| article.item «Treyler Ertaga · 20:00 Taqdi» | → 10-drama |
| span.trailer «Treyler» | 💬 «Taqdir toʻyi» treyleri · 0:45 |
| i.gbtn «» | 💬 «Taqdir toʻyi» treyleri · 0:45 |
| button.btn.btn--glass «Eslatib qoʻy» | 💬 Premyerada eslatamiz · 26-oktabr · 20:00 |
| article.item «Treyler Ertaga · 21:00 Meros» | → 10-drama |
| span.trailer «Treyler» | 💬 «Merosxoʻrning qaytishi» treyleri · 0:45 |
| i.gbtn «» | 💬 «Merosxoʻrning qaytishi» treyleri · 0:45 |
| button.btn.btn--xs «Eslatiladi» | 💬 Eslatma oʻchirildi |
| article.item.wide «Treyler 28-okt · 19:00 Yashi» | → 10-drama |
| span.trailer «Treyler» | 💬 «Yashirin chempion» treyleri · 0:45 |
| i.gbtn «» | 💬 «Yashirin chempion» treyleri · 0:45 |
| button.btn.btn--xs «Eslatiladi» | 💬 Eslatma oʻchirildi |

### 10-drama
| Element | Natija |
|---|---|
| button.gbtn.gbtn--side «Orqaga» | → 04-bosh-sahifa |
| button.gbtn.gbtn--side «Ulashish» | ▤ oyna: Ulashish |
| button.gbtn.gbtn--side «Yana» | ▤ oyna: Milliarderning yashirin kelini |
| span.chip «4.8» | ▤ oyna: Dramani baholang |
| span.chip «2.4M koʻrish» | 💬 2.4M marta koʻrilgan · 534K saqlangan |
| span.chip «Oʻzbekcha dublyaj» | ▤ oyna: Ovoz va subtitr |
| button.btn.btn--primary «Davom ettirish · 10-qism» | → 11-pleer |
| div.act.is-on «Saqlangan534K» | 💬 Roʻyxatdan olib tashlandi |
| span.gbtn.gbtn--flame «» | 💬 Roʻyxatdan olib tashlandi |
| div.act «Eslatma» | 💬 Yangi qism chiqqanda eslatamiz |
| span.gbtn.gbtn--dark «» | 💬 Yangi qism chiqqanda eslatamiz |
| div.act «Izohlar3.4K» | → 13-izohlar |
| span.gbtn.gbtn--dark «» | → 13-izohlar |
| div.act «YuklashVIP» | 💬 Yuklab olish — VIP imkoniyati |
| span.gbtn.gbtn--dark «» | 💬 Yuklab olish — VIP imkoniyati |
| span.more «Koʻproq» | ✎ holat (3) |
| button.btn.btn--glass «Butun serialni ochish: 4 200» | 💬 Coin yetarli emas: kerak 3 200, sizda 105 |
| span.utabs__item «Oʻxshash» | ✎ holat (6) |
| span.utabs__item «Tafsilotlar» | ✎ holat (6) |
| span.chip.choice «31–60» | ✎ holat (106) |
| span.chip.choice «61–80» | ✎ holat (76) |
| span.ep.ep--watched «1» | → 11-pleer |
| span.ep.ep--watched «2» | → 11-pleer |
| span.ep.ep--watched «3» | → 11-pleer |
| span.ep.ep--watched «4» | → 11-pleer |
| span.ep.ep--watched «5» | → 11-pleer |
| span.ep.ep--watched «6» | → 11-pleer |
| span.ep.ep--watched «7» | → 11-pleer |
| span.ep.ep--watched «8» | → 11-pleer |
| span.ep.ep--watched «9» | → 11-pleer |
| span.ep.ep--open «11» | → 11-pleer |
| span.ep.ep--open «12» | → 11-pleer |
| span.ep.ep--locked «13» | → 11-pleer |
| span.ep.ep--locked «14» | → 11-pleer |
| span.ep.ep--locked «15» | → 11-pleer |
| span.ep.ep--locked «16» | → 11-pleer |
| span.ep.ep--locked «17» | → 11-pleer |
| span.ep.ep--locked «18» | → 11-pleer |
| span.ep.ep--locked «19» | → 11-pleer |
| span.ep.ep--locked «20» | → 11-pleer |
| span.ep.ep--locked «21» | → 11-pleer |
| span.ep.ep--locked «22» | → 11-pleer |
| span.ep.ep--locked «23» | → 11-pleer |
| span.ep.ep--locked «24» | → 11-pleer |
| span.ep.ep--locked «25» | → 11-pleer |
| span.ep.ep--locked «26» | → 11-pleer |
| span.ep.ep--locked «27» | → 11-pleer |
| span.ep.ep--locked «28» | → 11-pleer |
| span.ep.ep--locked «29» | → 11-pleer |
| span.ep.ep--locked «30» | → 11-pleer |
| article.poster «Shartnoma boʻyicha xotinShar» | → 10-drama |
| article.poster «Ofisdagi yolgʻon nikohOfisda» | → 10-drama |
| article.poster «Direktorning sirli egizagiDi» | → 10-drama |

### 11-pleer
| Element | Natija |
|---|---|
| div.frame.art «» | ✎ holat (3) |
| button.gbtn.gbtn--lg «Orqaga» | → 04-bosh-sahifa |
| button.gbtn.gbtn--lg «Yana» | → 14-pleer-sozlamalari |
| span.gbtn.gbtn--side «48K» | 💬 Yoqtirishlardan olindi |
| span.gbtn.gbtn--side «534K» | 💬 Roʻyxatdan olib tashlandi |
| span.gbtn.gbtn--side «326» | → 13-izohlar |
| span.gbtn.gbtn--side «Ulashish» | ▤ oyna: Ulashish |
| span.chip.chip--glass «Keyingi: 11-qism» | 💬 11-qism |
| div.scrub «Vaqt» | ✎ holat (4) |
| button.gbtn «5 soniya orqaga» | ✎ holat (4) |
| button.gbtn.gbtn--white «Ijro» | ✎ holat (3) |
| button.gbtn «5 soniya oldinga» | ✎ holat (4) |
| span.chip.choice «1.0x» | 💬 Tezlik: 1.25x |
| span.chip.choice «CC uz» | → 14-pleer-sozlamalari |
| span.chip.choice «720p» | → 14-pleer-sozlamalari |

### 12-qismlar
| Element | Natija |
|---|---|
| div.scrim «» | → 04-bosh-sahifa |
| button.gbtn.gbtn--sm «Yopish» | → 04-bosh-sahifa |
| div.auto.card--flat «Keyingi qismni avtomatik och» | 💬 Avto-ochish oʻchirildi |
| span.toggle.is-on «» | 💬 Avto-ochish oʻchirildi |
| span.utabs__item «31–60» | ✎ holat (98) |
| span.utabs__item «61–80» | ✎ holat (68) |
| span.ep.ep--free «1» | → 11-pleer |
| span.ep.ep--free «2» | → 11-pleer |
| span.ep.ep--free «3» | → 11-pleer |
| span.ep.ep--free «4» | → 11-pleer |
| span.ep.ep--free «5» | → 11-pleer |
| span.ep.ep--free «6» | → 11-pleer |
| span.ep.ep--free «7» | → 11-pleer |
| span.ep.ep--free «8» | → 11-pleer |
| span.ep.ep--free «9» | → 11-pleer |
| span.ep.ep--open «11» | → 11-pleer |
| span.ep.ep--open «12» | → 11-pleer |
| span.ep.ep--locked «13» | → 11-pleer |
| span.ep.ep--locked «14» | → 11-pleer |
| span.ep.ep--locked «15» | → 11-pleer |
| span.ep.ep--locked «16» | → 11-pleer |
| span.ep.ep--locked «17» | → 11-pleer |
| span.ep.ep--locked «18» | → 11-pleer |
| span.ep.ep--locked «19» | → 11-pleer |
| span.ep.ep--locked «20» | → 11-pleer |
| span.ep.ep--locked «21» | → 11-pleer |
| span.ep.ep--locked «22» | → 11-pleer |
| span.ep.ep--locked «23» | → 11-pleer |
| span.ep.ep--locked «24» | → 11-pleer |
| span.ep.ep--locked «25» | → 11-pleer |
| span.ep.ep--locked «26» | → 11-pleer |
| span.ep.ep--locked «27» | → 11-pleer |
| span.ep.ep--locked «28» | → 11-pleer |
| span.ep.ep--locked «29» | → 11-pleer |
| span.ep.ep--locked «30» | → 11-pleer |
| button.btn.btn--glass «Hammasini ochish · 3 200 coi» | 💬 Coin yetarli emas: kerak 3 200 |
| button.btn.btn--primary «VIP» | → 18-vip |

### 13-izohlar
| Element | Natija |
|---|---|
| div.scrim «» | → 04-bosh-sahifa |
| button.gbtn.gbtn--sm «Yopish» | → 04-bosh-sahifa |
| span.chip.choice «Yangi» | ✎ holat (10) |
| span.chip.choice «Shu qism» | ✎ holat (12) |
| span.row-flex.gap-4 «1.2K» | ✎ holat (3) |
| span «Javob berish» | ⌨ yozish maydoni |
| span «Shikoyat» | ▤ oyna: Shikoyat |
| p.cmt__more «— 24 ta javobni koʻrish» | ✎ holat (3) |
| div.spoiler.card--glass «Milliarder aslida uning bola» | ✎ holat (5) |
| span.row-flex.gap-4 «860» | ✎ holat (4) |
| span «Javob berish» | ⌨ yozish maydoni |
| span «Shikoyat» | ▤ oyna: Shikoyat |
| span.row-flex.gap-4 «412» | ✎ holat (4) |
| span «Javob berish» | ⌨ yozish maydoni |
| span «Shikoyat» | ▤ oyna: Shikoyat |
| p.cmt__more «— 3 ta javobni koʻrish» | ✎ holat (3) |
| span.row-flex.gap-4 «95» | ✎ holat (4) |
| span «Javob berish» | ⌨ yozish maydoni |
| span «Shikoyat» | ▤ oyna: Shikoyat |
| div.search «» | ⌨ yozish maydoni |
| input.proto-input «Izoh yozing…» | ⌨ yozish maydoni |
| label «Spoyler» | ✎ holat (1) |
| span.check «» | ✎ holat (1) |
| button.gbtn.gbtn--sm «Yuborish» | 💬 Avval izoh yozing |

### 14-pleer-sozlamalari
| Element | Natija |
|---|---|
| div.scrim «» | → 04-bosh-sahifa |
| button.gbtn.gbtn--sm «Yopish» | → 04-bosh-sahifa |
| span «0.75x» | 💬 Tezlik: 0.75x |
| b «1.0x» | 💬 Tezlik: 1.0x |
| span «1.25x» | 💬 Tezlik: 1.25x |
| span «1.5x» | 💬 Tezlik: 1.5x |
| span «2.0x» | 💬 Tezlik: 2.0x |
| span.chip.choice «480p» | 💬 Sifat: 480p |
| span.chip.choice «720p» | 💬 Sifat: 720p |
| span.chip.choice «1080pVIP» | 💬 1080p — VIP imkoniyati |
| span.vipb «VIP» | 💬 1080p — VIP imkoniyati |
| span.chip.choice «Original» | 💬 Ovoz: Original |
| span.chip.choice «Ruscha» | 💬 Ovoz: Ruscha |
| span.chip.choice «Oʻchiq» | 💬 Subtitr: Oʻchiq |
| span.chip.choice «Ruscha» | 💬 Subtitr: Ruscha |
| span.chip.choice «Inglizcha» | 💬 Subtitr: Inglizcha |
| div.row «Keyingi qismni avtomatik ijr» | 💬 Avto-ijro oʻchirildi |
| span.toggle.is-on «» | 💬 Avto-ijro oʻchirildi |
| div.row «Uyqu taymeriOʻchiq» | ▤ oyna: Uyqu taymeri |
| div.row «Shu qismni yuklab olishVIP» | 💬 Yuklab olish — VIP imkoniyati |
| span.vipb «VIP» | 💬 Yuklab olish — VIP imkoniyati |
| div.row «Muammo haqida xabar berish» | ▤ oyna: Muammo haqida xabar |

### 15-serial-tugadi
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Yopish» | → 04-bosh-sahifa |
| i.ic.ic-star-fill «1 yulduz» | 💬 Bahoingiz: 1 / 5 · rahmat! |
| i.ic.ic-star-fill «2 yulduz» | 💬 Bahoingiz: 2 / 5 · rahmat! |
| i.ic.ic-star-fill «3 yulduz» | 💬 Bahoingiz: 3 / 5 · rahmat! |
| i.ic.ic-star-fill «4 yulduz» | 💬 Bahoingiz: 4 / 5 · rahmat! |
| i.ic.ic-star «5 yulduz» | 💬 Bahoingiz: 5 / 5 · rahmat! |
| button.btn.btn--glass «Ulashish +20 coin» | ▤ oyna: Ulashish |
| button.btn.btn--glass «2-fasl: eslat» | 💬 2-fasl chiqqanda eslatamiz |
| article.poster «5Shartnoma boʻyicha xotin» | → 10-drama |
| span.cd-ring «5» | → 10-drama |
| article.poster «Ofisdagi yolgʻon nikoh» | → 10-drama |
| article.poster «Taqdir toʻyi» | → 10-drama |
| button.btn.btn--text «Bekor qilish» | ✎ holat (3) |

### 16-paywall
| Element | Natija |
|---|---|
| div.pack «300+0 bonus[narx] soʻm» | → 11-pleer |
| div.pack.pack--popular «Ommabop600+60 bonus[narx] so» | → 11-pleer |
| div.pack «1 200+240 bonus[narx] soʻm» | → 11-pleer |
| button.btn.btn--glass «Koʻrish» | → 11-pleer |
| div.vip.card «VIP: hamma qismlar + reklama» | → 11-pleer |
| button.btn.btn--primary «VIP olish» | → 11-pleer |
| div.auto «Keyingi qismlarni ham avtoma» | → 11-pleer |
| span.check.is-on «» | → 11-pleer |
| a «Toʻlov shartlari» | → 11-pleer |

### 17-coin-dokoni
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| button.btn.btn--text «Tarix» | → 28-hamyon |
| div.first.card--glass «Birinchi xarid: −50%faqat ya» | → 19-tolov |
| div.pack «300bonussiz[narx] soʻm» | → 19-tolov |
| div.pack «600+60 bonus[narx] soʻm» | → 19-tolov |
| div.pack.pack--popular «Ommabop1 200+240 bonus[narx]» | → 19-tolov |
| div.pack.pack--best «Eng foydali2 400+600 bonus[n» | → 19-tolov |
| div.pack «6 000+2 000 bonus[narx] soʻm» | → 19-tolov |
| div.pack «12 000+5 000 bonus[narx] soʻ» | → 19-tolov |
| div.vipb.card «Koʻp koʻrasizmi? VIP coinʼda» | → 18-vip |
| span.chip.choice «Click» | 💬 Toʻlov usuli: Click |
| span.chip.choice «Uzum» | 💬 Toʻlov usuli: Uzum |
| span.chip.choice «UzCard / Humo» | 💬 Toʻlov usuli: UzCard / Humo |
| span.chip.choice «Visa / MC» | 💬 Toʻlov usuli: Visa / MC |
| span.chip.choice «App Store / Google Play» | 💬 Toʻlov usuli: App Store / Google Play |
| a.hit «Xaridlarni tiklash» | 💬 Tiklanadigan xarid topilmadi |
| a.hit «Toʻlov shartlari» | ▤ oyna: Toʻlov shartlari |
| a.hit «Yordam» | → 30-yordam |

### 18-vip
| Element | Natija |
|---|---|
| button.btn.btn--text «Xaridlarni tiklash» | 💬 Faol obuna topilmadi |
| button.gbtn.gbtn--sm «Yopish» | → 04-bosh-sahifa |
| div.plan.card--glass «Haftalik1-hafta −40%, keyin » | ✎ holat (8) |
| span.radio «» | ✎ holat (8) |
| span.radio.is-on «» | ✎ holat (2) |
| div.plan.card--glass «Eng tejamkorYillikoyiga ≈ [n» | ✎ holat (8) |
| span.radio «» | ✎ holat (8) |
| button.btn.btn--primary «VIP olish · [narx] soʻm / oy» | → 19-tolov |
| a «Shartlar» | ▤ oyna: Obuna shartlari |
| a «Maxfiylik» | ▤ oyna: Maxfiylik siyosati |

### 19-tolov
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| span.radio.is-on «» | ✎ holat (1) |
| div.m.card--glass «CClickilovada tasdiqlash» | ✎ holat (5) |
| span.radio «» | ✎ holat (5) |
| div.m.card--glass «UUzum Bankilovada tasdiqlash» | ✎ holat (5) |
| span.radio «» | ✎ holat (5) |
| div.m.card--glass «Bank kartasiUzCard · Humo · » | ✎ holat (5) |
| span.radio «» | ✎ holat (5) |
| div.m.card--glass «App Store / Google Playdoʻko» | ✎ holat (5) |
| span.radio «» | ✎ holat (5) |
| div.field «» | ⌨ yozish maydoni |
| input.proto-input «Promokod» | ⌨ yozish maydoni |
| button.btn.btn--glass «Qoʻllash» | 💬 Promokodni kiriting |
| button.btn.btn--primary «Payme orqali toʻlash» | ✎ holat (2) |
| a «Oferta» | ▤ oyna: Ommaviy oferta |

### 20-maxsus-taklif
| Element | Natija |
|---|---|
| div.scrim «» | → 04-bosh-sahifa |
| button.gbtn.gbtn--sm «Yopish» | → 04-bosh-sahifa |
| button.btn.btn--primary «Taklifni olish» | → 19-tolov |
| button.btn.btn--text «Yoʻq, rahmat» | → 04-bosh-sahifa |

### 21-reklama
| Element | Natija |
|---|---|
| div.frame.art «» | 💬 Reklama beruvchi sahifasi brauzerda ochiladi |
| span.chip «15 soniyadan soʻng yopiladi» | 💬 Reklama 15 soniyadan soʻng yopiladi |
| span.cd-ring.cd-ring--sm «15» | 💬 Reklama 15 soniyadan soʻng yopiladi |
| div.adv.card--glass «[Reklama beruvchi]Reklama ta» | 💬 Reklama beruvchi sahifasi brauzerda ochiladi |
| button.btn.btn--primary «Batafsil» | 💬 Reklama beruvchi sahifasi brauzerda ochiladi |

### 22-mukofotlar
| Element | Natija |
|---|---|
| button.btn.btn--text «Qoidalar» | ▤ oyna: Mukofot qoidalari |
| span.chip «105» | → 28-hamyon |
| div.bonus.card--warm «Bonus coinlaringiz85 coin40 » | → 28-hamyon |
| button.btn.btn--glass «Tarix» | → 28-hamyon |
| div.box.box--dim «+101-kun» | 💬 1-kun: +10 coin · olingan |
| div.box.box--dim «+102-kun» | 💬 2-kun: +10 coin · olingan |
| div.box.day «Bugun+15olish» | 💬 +15 coin olindi · ketma-ket 3-kun |
| div.box.day «+154-kun» | 💬 4-kun: +15 coin · ertaga |
| div.box.day «+205-kun» | 💬 5-kun: +20 coin · 2 kundan keyin |
| div.box.day «+206-kun» | 💬 6-kun: +20 coin · 3 kundan keyin |
| div.box.day «+507-kun · sovgʻa · +1 kun V» | 💬 7-kun: +50 coin · 4 kundan keyin · +1 kun VIP |
| button.btn.btn--primary «Bugungi +15 coinʼni olish» | 💬 +15 coin olindi · ketma-ket 3-kun |
| div.rem «Har kuni 20:00 da eslatish» | 💬 Oʻchirildi |
| span.toggle.is-on «» | 💬 Oʻchirildi |
| button.btn.btn--glass «Koʻrish» | → 21-reklama |
| div.task «3 ta qism tomosha qiling+15 » | → 05-lenta |
| button.btn.btn--xs «Bajarish» | → 05-lenta |
| div.task «10 daqiqa tomosha qiling+20 » | 💬 +20 coin olindi |
| button.btn.btn--xs «Olish» | 💬 +20 coin olindi |
| div.task «Dramani doʻstga ulashing+20 » | ▤ oyna: Ulashish |
| button.btn.btn--xs «Bajarish» | ▤ oyna: Ulashish |
| div.task «Izoh qoldiring+5 · 1 / 1Olin» | 💬 Bu mukofot allaqachon olingan |
| button.btn.btn--xs «Olindi» | 💬 Bu mukofot allaqachon olingan |
| div.task «Bildirishnomalarni yoqing+30» | ▤ oyna: Bildirishnomalarni yoqish |
| button.btn.btn--xs «Bajarish» | ▤ oyna: Bildirishnomalarni yoqish |
| div.task «Telegram kanalga aʼzo boʻlin» | 💬 Telegram kanal ochildi |
| button.btn.btn--xs «Bajarish» | 💬 Telegram kanal ochildi |
| div.task «Telefon raqamni bogʻlang+50 » | ▤ oyna: Telefon raqamni bogʻlash |
| button.btn.btn--xs «Bajarish» | ▤ oyna: Telefon raqamni bogʻlash |
| div.task «Ilovani baholang+50 · bir ma» | ▤ oyna: Ilovani baholang |
| button.btn.btn--xs «Bajarish» | ▤ oyna: Ilovani baholang |
| div.card.card--ambient «Doʻstni taklif qilinghar bir» | → 23-dost-taklif |
| button.btn.btn--primary «Taklif qilish» | → 23-dost-taklif |
| a.nav__item «Bosh sahifa» | → 04-bosh-sahifa |
| a.nav__item «Lenta» | → 05-lenta |
| a.nav__item «Roʻyxatim» | → 24-royxatim |
| a.nav__item «Profil» | → 27-profil |

### 23-dost-taklif
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| span.gbtn.gbtn--sm «» | ▤ oyna: Ulashish |
| div.code.card--glass «Taklif kodingizAZ7K29 Nusxa » | 💬 Taklif kodi nusxalandi: AZ7K29 |
| button.btn.btn--primary «Nusxa olish» | 💬 Taklif kodi nusxalandi: AZ7K29 |
| div «Telegram» | 💬 Telegram orqali taklif yuborildi |
| span.gbtn.gbtn--dark «» | 💬 Telegram orqali taklif yuborildi |
| div «Instagram» | 💬 Instagram orqali taklif yuborildi |
| span.gbtn.gbtn--dark «» | 💬 Instagram orqali taklif yuborildi |
| div «WhatsApp» | 💬 WhatsApp orqali taklif yuborildi |
| span.gbtn.gbtn--dark «» | 💬 WhatsApp orqali taklif yuborildi |
| div «Boshqa» | ▤ oyna: Ulashish |
| span.gbtn.gbtn--dark «» | ▤ oyna: Ulashish |
| div.card.stats «Taklif qilinganlar: 3Topilga» | ▤ oyna: Taklif qilinganlar |
| span.pill-more «Roʻyxat» | ▤ oyna: Taklif qilinganlar |

### 24-royxatim
| Element | Natija |
|---|---|
| button.btn.btn--text «Tahrirlash» | 💬 Oʻchirish uchun ✕ ni bosing |
| span.utabs__item «Tarix» | ✎ holat (21) |
| span.utabs__item «Eslatmalar · 2» | ✎ holat (12) |
| span.utabs__item «Yuklanganlar» | → 25-yuklanganlar |
| article.poster «+3 yangi qismMilliarderning » | → 10-drama |
| article.poster «Boʻri qirolining qasosi12 / » | → 10-drama |
| article.poster «Yangi qismShartnoma boʻyicha» | → 10-drama |
| article.poster «Imperatorning soʻnggi farmon» | → 10-drama |
| article.poster «Uch yildan keyin qaytdimTuga» | → 15-serial-tugadi |
| article.poster «Vampir qoʻriqchisiBoshlanmag» | → 10-drama |
| article.poster «» | → 10-drama |
| article.poster «» | → 10-drama |
| article.poster «» | → 10-drama |
| article.poster «» | → 10-drama |
| a.nav__item «Bosh sahifa» | → 04-bosh-sahifa |
| a.nav__item «Mukofot» | → 22-mukofotlar |
| a.nav__item «Lenta» | → 05-lenta |
| a.nav__item «Profil» | → 27-profil |

### 25-yuklanganlar
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| button.btn.btn--text «Tahrirlash» | ✎ holat (5) |
| div.vip «Oflayn koʻrish — VIP imkoniy» | → 18-vip |
| div.dl.card--glass «Boʻri qirolining qasosi8 qis» | 💬 Oflayn koʻrish uchun VIP kerak |
| button.gbtn.gbtn--sm «Oʻchirish» | 💬 Yuklab olingan qism oʻchirildi |
| div.dl.card--glass «Milliarderning yashirin keli» | 💬 Oflayn koʻrish uchun VIP kerak |
| button.gbtn.gbtn--sm «Pauza» | 💬 Yuklash toʻxtatildi |
| div.dl.card--glass «Taqdir toʻyi5 qism · 150 MBN» | 💬 Oflayn koʻrish uchun VIP kerak |
| button.gbtn.gbtn--sm «Bekor qilish» | 💬 Yuklab olingan qism oʻchirildi |
| div.row «Faqat Wi-Fi orqali yuklash» | 💬 Oʻchirildi |
| span.toggle.is-on «» | 💬 Oʻchirildi |
| div.row «Yuklash sifati720p» | ▤ oyna: Yuklash sifati |
| div.row «Koʻrilgandan 7 kun keyin oʻc» | 💬 Yoqildi |
| span.toggle «» | 💬 Yoqildi |

### 26-bildirishnomalar
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| button.btn.btn--text «Hammasi oʻqildi» | 💬 Hammasi oʻqildi |
| button.btn.btn--primary «Yoqish +30» | 💬 Bildirishnomalar yoqildi · +30 coin |
| span.chip.choice «Yangi qismlar» | ✎ holat (8) |
| span.chip.choice «Takliflar» | ✎ holat (8) |
| span.chip.choice «Javoblar» | ✎ holat (9) |
| span.chip.choice «Tizim» | ✎ holat (9) |
| div.nt.unread «Boʻri qirolining qasosi: 3 t» | → 10-drama |
| div.nt.unread «Eslatma: «Taqdir toʻyi» erta» | → 09-tez-kunda |
| div.nt «Check-in mukofoti kutmoqda+1» | → 22-mukofotlar |
| div.nt «Madina izohingizga javob ber» | → 13-izohlar |
| div.nt «Faqat bugun: −60%1 200 coin » | → 20-maxsus-taklif |
| div.nt «VIP: 1-hafta −40%Reklamasiz,» | → 18-vip |

### 27-profil
| Element | Natija |
|---|---|
| button.gbtn.gbtn--side «Sozlamalar» | → 29-sozlamalar |
| div.box.box--lg «» | ▤ oyna: Profil rasmi |
| p.id.t-mono «ID: 10482733» | 💬 ID nusxalandi: 10482733 |
| span.chip «Telegram orqali» | ▤ oyna: Ulangan hisoblar |
| span.chip «12 doʻst» | → 23-dost-taklif |
| span.chip.chip--sand «VIP emas» | → 18-vip |
| button.btn.btn--primary «Profilni tahrirlash» | ▤ oyna: Profilni tahrirlash |
| span.dot-btn «» | ▤ oyna: Foydalanuvchi |
| div.card.wallet «Coin20 Bonus coin85 Toʻldiri» | → 28-hamyon |
| button.btn.btn--primary «Toʻldirish» | → 17-coin-dokoni |
| div.card.vip «VIP emassiz1-hafta −40% · re» | → 18-vip |
| button.btn.btn--primary «VIP olish» | → 18-vip |
| div.card «Tarix» | → 24-royxatim |
| div.card «Saqlangan» | → 24-royxatim |
| div.card «Yuklangan» | → 25-yuklanganlar |
| div.card «Mukofot» | → 22-mukofotlar |
| span.pill-more «Hammasi» | → 24-royxatim |
| article.poster «Milliarderning yashirin keli» | → 10-drama |
| article.poster «Boʻri qirolining qasosi» | → 10-drama |
| article.poster «Shartnoma boʻyicha xotin» | → 10-drama |
| article.poster «Uch yildan keyin qaytdim» | → 10-drama |
| div.row «Hamyon va tranzaksiyalar» | → 28-hamyon |
| div.row «Obunani boshqarish» | → 18-vip |
| div.row «Avto-ochish (coin bilan)Yoqi» | → 29-sozlamalar |
| div.row «Doʻstni taklif qilish+200 co» | → 23-dost-taklif |
| div.row «Til va dublyajOʻzbekcha» | → 29-sozlamalar |
| div.row «Bildirishnomalar» | → 26-bildirishnomalar |
| div.row «Yordam markazi» | → 30-yordam |
| div.row «Fikr bildirish» | ▤ oyna: Ilovani baholang |
| div.row «Shartlar va maxfiylik» | ▤ oyna: Shartlar va maxfiylik |
| div.row «Sozlamalar» | → 29-sozlamalar |
| a.nav__item «Bosh sahifa» | → 04-bosh-sahifa |
| a.nav__item «Mukofot» | → 22-mukofotlar |
| a.nav__item «Lenta» | → 05-lenta |
| a.nav__item «Roʻyxatim» | → 24-royxatim |

### 28-hamyon
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| div.card.bal «Pullik coin20muddatsiz» | 💬 Pullik coin muddatsiz |
| div.card.bal «Bonus coin8540 tasi 3 kunda » | 💬 Bonus coin 7 kun amal qiladi · avval shu sarflanadi |
| button.btn.btn--primary «Coin toʻldirish» | → 17-coin-dokoni |
| span.utabs__item «Toʻldirish» | ✎ holat (8) |
| span.utabs__item «Sarflangan» | ✎ holat (6) |
| span.utabs__item «Mukofotlar» | ✎ holat (6) |
| div.t «11-qism ochildiMilliardernin» | ▤ oyna: 11-qism ochildi |
| div.t «Reklama mukofotiBonus · 10:0» | ▤ oyna: Reklama mukofoti |
| div.t «Kunlik check-in · 2-kunBonus» | ▤ oyna: Kunlik check-in · 2-kun |
| div.t «Coin xaridi · Payme1 200 + 2» | ▤ oyna: Coin xaridi · Payme |
| div.t «Butun serial ochildiUch yild» | ▤ oyna: Butun serial ochildi |
| a «Qaytarish soʻrovi» | → 30-yordam |

### 29-sozlamalar
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| div.row «Telefon raqam+998 •• ••• •• » | ▤ oyna: Telefon raqam |
| div.row «Ulangan hisoblarTelegram» | ▤ oyna: Ulangan hisoblar |
| div.row «Qurilmalar2 / 3» | ▤ oyna: Qurilmalar · 2 / 3 |
| div.row «Keyingi qismni avto-ijro» | 💬 Avto-ijro oʻchirildi |
| span.toggle.is-on «» | 💬 Avto-ijro oʻchirildi |
| div.row «Standart sifatAvto» | ▤ oyna: Standart sifat |
| div.row «Mobil internetni tejash» | 💬 Yoqildi |
| span.toggle «» | 💬 Yoqildi |
| div.row «Subtitr tiliOʻzbekcha» | ▤ oyna: Subtitr tili |
| div.row «Dublyaj tiliOʻzbekcha» | ▤ oyna: Dublyaj tili |
| div.row «Avto-ochish (coin bilan)» | 💬 Avto-ochish oʻchirildi |
| span.toggle.is-on «» | 💬 Avto-ochish oʻchirildi |
| div.row «Obunani boshqarishYoʻq» | → 18-vip |
| div.row «Xaridlarni tiklash» | 💬 Tiklanadigan xarid topilmadi |
| div.row «Yangi qismlar» | 💬 Oʻchirildi |
| span.toggle.is-on «» | 💬 Oʻchirildi |
| div.row «Eslatmalar» | 💬 Oʻchirildi |
| span.toggle.is-on «» | 💬 Oʻchirildi |
| div.row «Chegirma va takliflar» | 💬 Yoqildi |
| span.toggle «» | 💬 Yoqildi |
| div.row «Check-in eslatmasi» | 💬 Oʻchirildi |
| span.toggle.is-on «» | 💬 Oʻchirildi |
| div.row «Ilova tiliOʻzbekcha» | ▤ oyna: Ilova tili |
| div.row «MavzuTizim» | ▤ oyna: Mavzu |
| div.row «Keshni tozalash128 MB» | ▤ oyna: Keshni tozalash |
| div.row «18+ kontentni yashirish» | 💬 Oʻchirildi |
| span.toggle.is-on «» | 💬 Oʻchirildi |
| button.btn.btn--glass «Chiqish» | ▤ oyna: Hisobdan chiqasizmi? |
| button.btn.btn--text «Hisobni oʻchirish» | ▤ oyna: Hisobni oʻchirish |

### 30-yordam
| Element | Natija |
|---|---|
| button.gbtn.gbtn--sm «Orqaga» | → 04-bosh-sahifa |
| div.find.search «» | ⌨ yozish maydoni |
| input.proto-input «Savolingizni yozing…» | ⌨ yozish maydoni |
| span.chip.choice «Coin» | ✎ holat (12) |
| span.chip.choice «VIP» | ✎ holat (9) |
| span.chip.choice «Tomosha» | ✎ holat (12) |
| span.chip.choice «Hisob» | ✎ holat (9) |
| div.q «Coinlarim qayerga ketdi?» | ✎ holat (3) |
| div.q «VIP obunani qanday bekor qil» | ✎ holat (4) |
| div.q «Pulimni qaytarib olsam boʻla» | ✎ holat (4) |
| div.q «Video qotib qolyapti» | ✎ holat (4) |
| div.q «Bonus coin qachon tugaydi?» | ✎ holat (4) |
| div.tile.is-main «Operator bilan chat» | ▤ oyna: Operator bilan chat |
| div.tile.card--glass «Qaytarish soʻrovi» | ▤ oyna: Qaytarish soʻrovi |
| div.tile.card--glass «Fikr yuborish» | ▤ oyna: Fikr yuborish |
