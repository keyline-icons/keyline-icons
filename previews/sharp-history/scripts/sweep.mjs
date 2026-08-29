// Render every icon, all three styles, rounded beside sharp, in numbered
// sheets — so a set of eyes can sweep the whole 585 instead of the dozen that
// happened to be zoomed. Looking is cheaper than measuring, and the last
// three rounds of bugs all got past the measurements.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const R = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ic = (p) => existsSync(p) ? readFileSync(p, 'utf8').replace(/<svg /, '<svg class="ic" ') : '<div class="ic miss"></div>';
const row = (n) => `<figure><div class=pair>
  <div class=box>${ic(`${R}/stroke/${n}.svg`)}</div><div class="box s">${ic(`mid/${n}.svg`)}</div>
  <div class=box>${ic(`${R}/duotone/${n}.svg`)}</div><div class="box s">${ic(`duotone-mid/${n}.svg`)}</div>
  <div class=box>${ic(`${R}/fill/${n}.svg`)}</div><div class="box s">${ic(`fill-mid/${n}.svg`)}</div>
</div><figcaption>${n}</figcaption></figure>`;
const CSS = `<style>body{background:#fff;margin:12px;font:11px ui-sans-serif;color:#111}
.grid{display:grid;grid-template-columns:repeat(2,max-content);gap:14px 28px}
figure{margin:0;text-align:center}.pair{display:flex;gap:3px;align-items:center}
.box{padding:2px;background:#fafafa}.s{background:#fff2f2}.miss{background:#ffe;opacity:.3}
.ic{width:72px;height:72px;color:#111}figcaption{font-size:10px;color:#666;margin-top:2px}</style>`;
const names = readdirSync('mid').filter((x) => x.endsWith('.svg')).map((x) => x.replace('.svg', '')).sort();
const PER = 40;
for (let i = 0; i * PER < names.length; i++) {
  const chunk = names.slice(i * PER, (i + 1) * PER);
  writeFileSync(`sweep2-${i}.html`, `<!doctype html><meta charset=utf-8>${CSS}<div class=grid>${chunk.map(row).join('')}</div>`);
  execFileSync(CHROME, ['--headless', '--disable-gpu', `--screenshot=sweep2-${i}.png`,
    '--window-size=1120,1700', '--hide-scrollbars', `sweep2-${i}.html`], { stdio: 'ignore' });
  console.log(`sweep2-${i}.png: ${chunk[0]} .. ${chunk[chunk.length - 1]}`);
}
