// Har bir tugma testi: node tools/click_test.js [NN ...]  -> analysis/CLICKS.md
// Har bir ekran yangidan yuklanadi, har bir bosiladigan ko'rinishdagi element markaziga bosiladi va natija
// kuzatiladi: boshqa ekranga o'tish, bildirishnoma (toast), DOM o'zgarishi yoki scroll. Hech narsa bo'lmasa — «o'lik».
// Markazdagi nuqta boshqa element bilan yopilgan bo'lsa — «yopilgan» (joylashuv xatosi).
const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs');
const base = 'file://' + path.resolve('screens') + '/';
const only = process.argv.slice(2);
const files = fs.readdirSync('screens').filter(f => f.endsWith('.html')).sort().filter(f => !only.length || only.includes(f.slice(0, 2)));

// bosiladigan ko'rinishdagi elementlar (dizayn klasslari bo'yicha)
const CAND = [
  'button', 'a', 'input', '[role="button"]', '.btn', '.gbtn', '.chip', '.pill-more', '.dot-btn', '.poster', '.lcard', '.nav__item', '.seg__item', '.utabs__item',
  '.toggle', '.check', '.radio', '.row', '.pack', '.plan', '.m', '.ep', '.q', '.tile', '.share > div', '.search', '.field', '.nt', '.t', '.dl', '.res', '.pod', '.lrow',
  '.item', '.act', '.day', '.top-list li', '.list li', '.genre', '.cmt__act > span', '.spoiler', '.coin-chip', '.id', '.wallet', '.vipb', '.invite', '.quick .card',
  '.rail .gbtn', '.play', '.scrub', '.frame', '.cd-ring', '.sheet__close', '.opt', '.auto', '.rem', '.lang', '.avatar', '.task', '.card.vip', '.bonus', '.first',
].join(', ');

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 393, height: 852 } });
  // interaktiv rejim (statik emas), taymerlar o'chiq — natija faqat bosishdan
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); window.__protoNoTimers = true; });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(decodeURIComponent(p.url().split('/').pop()) + ': ' + e.message));
  const out = []; const w = s => out.push(s);
  let total = 0, dead = [], covered = [], active = 0;
  const load = async f => {
    // oldingi bosishdan qolgan kechiktirilgan o'tish yangi yuklashni bo'lmasin
    await p.goto('about:blank').catch(() => {});
    for (let k = 0; k < 3; k++) { try { await p.goto(base + f + '?reset=1', { waitUntil: 'load' }); break; } catch (e) { await p.waitForTimeout(300); } }
    await p.waitForFunction(() => window.__dramaProto, null, { timeout: 30000 });
  };
  for (const f of files) {
    const id = f.replace('.html', '');
    await load(f);
    const n = await p.evaluate(sel => {
      const S = document.getElementById('screen');
      const all = [...S.querySelectorAll(sel)];
      window.__cands = all;
      return all.length;
    }, CAND);
    const rows = [];
    for (let i = 0; i < n; i++) {
      if (i) await load(f);
      const pre = await p.evaluate(([sel, i]) => {
        const S = document.getElementById('screen');
        const el = [...S.querySelectorAll(sel)][i];
        if (!el) return { skip: 'yoʻq' };
        const cs = getComputedStyle(el), r0 = el.getBoundingClientRect();
        if (r0.width < 2 || r0.height < 2 || cs.visibility === 'hidden' || el.closest('[hidden]')) return { skip: 'koʻrinmas' };
        if (el.closest('[aria-hidden="true"]')) return { skip: 'bezak' };
        if (el.matches('.is-active, .chip--selected, .is-on.plan, .is-on.m, .is-on.date, .ep--current') && !el.matches('.toggle, .check')) return { skip: 'faol' };
        el.scrollIntoView({ block: 'center', inline: 'center' });
        return {};
      }, [CAND, i]);
      if (pre.skip) { if (pre.skip === 'faol') active++; continue; }
      await p.waitForTimeout(250);   // scroll-snap joyiga tushsin
      const info = await p.evaluate(([sel, i]) => {
        const S = document.getElementById('screen');
        const el = [...S.querySelectorAll(sel)][i];
        const r = el.getBoundingClientRect();
        const name = e => e.className && typeof e.className === 'string' ? e.tagName.toLowerCase() + '.' + e.className.trim().split(/\s+/)[0] : e.tagName.toLowerCase();
        // elementning ko'rinadigan (boshqa element bilan yopilmagan) nuqtasini topamiz: avval markaz, keyin 5×5 to'r
        const pts = [[.5, .5]]; for (const fy of [.08, .14, .2, .35, .5, .65, .8]) for (const fx of [.2, .35, .5, .65, .8]) pts.push([fx, fy]);
        let hit = null, cov = null;
        for (const [fx, fy] of pts) {
          const x = Math.max(1, Math.min(392, r.left + r.width * fx)), y = Math.max(1, Math.min(851, r.top + r.height * fy));
          const t = document.elementFromPoint(x, y);
          if (t && (el.contains(t) || t.contains(el))) { hit = [x, y]; break; }
          if (!cov && t) cov = name(t);
        }
        const desc = (el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '')) + ' «' + (el.getAttribute('aria-label') || el.textContent || el.placeholder || '').replace(/\s+/g, ' ').trim().slice(0, 28) + '»';
        window.__mut = 0; window.__focus = document.activeElement;
        window.__sc = [scrollY, ...[...S.querySelectorAll('*')].filter(e => e.scrollTop || e.scrollLeft).map(e => e.scrollTop + e.scrollLeft)].join(',');
        new MutationObserver(m => { window.__mut += m.filter(x => !(x.target.closest && x.target.closest('.proto-toast'))).length; }).observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });
        const c = hit || [Math.max(1, Math.min(392, r.left + r.width / 2)), Math.max(1, Math.min(851, r.top + r.height / 2))];
        return { cx: c[0], cy: c[1], desc, cov: hit ? null : cov };
      }, [CAND, i]);
      total++;
      let nav = null;
      const onNav = fr => { if (fr === p.mainFrame() && !fr.url().startsWith('about:')) nav = decodeURIComponent(fr.url().split('/').pop().split('?')[0]).replace('.html', ''); };
      p.on('framenavigated', onNav);
      await p.mouse.click(info.cx, info.cy);
      let res = null;
      for (let k = 0; k < 16 && !res; k++) {
        await p.waitForTimeout(100);
        if (nav) { res = '→ ' + nav; break; }
        res = await p.evaluate(() => {
          const t = document.querySelector('.proto-toast.is-on'), m = document.querySelector('.proto-modal');
          const S = document.getElementById('screen');
          const sc = [scrollY, ...[...S.querySelectorAll('*')].filter(e => e.scrollTop || e.scrollLeft).map(e => e.scrollTop + e.scrollLeft)].join(',');
          if (m) return '▤ oyna: ' + (m.querySelector('h2') ? m.querySelector('h2').textContent : '').slice(0, 30);
          if (t) return '💬 ' + t.textContent;
          if (document.activeElement !== window.__focus && document.activeElement.tagName === 'INPUT') return '⌨ yozish maydoni';
          if (window.__mut) return '✎ holat (' + window.__mut + ')';
          if (sc !== window.__sc) return '↕ scroll';
          return null;
        }).catch(() => null);
      }
      p.off('framenavigated', onNav);
      if (!res && nav) res = '→ ' + nav;
      if (!res) dead.push(`${id.slice(0, 2)} ${info.desc}`);
      if (info.cov) covered.push(`${id.slice(0, 2)} ${info.desc} — ustida ${info.cov}`);
      rows.push(`| ${info.desc.replace(/\|/g, '/')} | ${res ? res.replace(/\|/g, '/') : '**OʻLIK**'}${info.cov ? ' · yopilgan: ' + info.cov : ''} |`);
    }
    w(`\n### ${id}\n| Element | Natija |\n|---|---|\n` + rows.join('\n'));
    process.stdout.write(`${id}: ${rows.length} element, oʻlik ${rows.filter(r => r.includes('OʻLIK')).length}\n`);
  }
  await b.close();
  const head = [`# Har bir tugma testi (tools/click_test.js)`, '',
    `Har bir ekran yangidan yuklanib, har bir bosiladigan element markaziga bosildi. Natija: «→» boshqa ekran, «💬» bildirishnoma, «✎» holat oʻzgardi, «↕» scroll.`, '',
    `- Jami bosilgan: **${total}** (+ ${active} ta allaqachon tanlangan element — qayta bosish holatni oʻzgartirmaydi)`, `- Oʻlik (hech narsa boʻlmadi): **${dead.length}**`, ...dead.map(d => '  - ' + d),
    `- Markazi boshqa element bilan yopilgan: **${covered.length}**`, ...covered.map(d => '  - ' + d),
    `- JS xatolari: ${errs.length ? errs.join('; ') : 'yoʻq'}`];
  if (!only.length) fs.writeFileSync('analysis/CLICKS.md', head.join('\n') + '\n' + out.join('\n') + '\n');
  console.log(head.join('\n'));
})();
