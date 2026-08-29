// Local render, so a look costs a Chrome run rather than a Figma round trip.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const R = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons';
const names = process.argv.slice(2);
const ic = (p) => existsSync(p) ? readFileSync(p, 'utf8').replace(/<svg /, '<svg class="ic" ') : '<div class="ic"></div>';
const row = (n) => `<figure><div class=pair>
  <div class=box>${ic(`${R}/stroke/${n}.svg`)}</div>
  <div class="box s">${ic(`mid/${n}.svg`)}</div>
  <div class=box>${ic(`${R}/duotone/${n}.svg`)}</div>
  <div class="box s">${ic(`duotone-mid/${n}.svg`)}</div>
  <div class=box>${ic(`${R}/fill/${n}.svg`)}</div>
  <div class="box s">${ic(`fill-mid/${n}.svg`)}</div>
</div><figcaption>${n}</figcaption></figure>`;
writeFileSync('check.html', `<!doctype html><meta charset=utf-8><style>
body{background:#fff;margin:16px;font:11px ui-sans-serif,system-ui;color:#111}
.grid{display:grid;grid-template-columns:repeat(2,max-content);gap:20px 32px}
figure{margin:0;text-align:center}
.pair{display:flex;gap:4px;align-items:center}
.box{padding:3px;background:#fafafa}.s{background:#fff2f2}
.ic{width:88px;height:88px;color:#111}
figcaption{font-size:10px;color:#666;margin-top:4px}
</style><div class=grid>${names.map(row).join('')}</div>`);
console.log('wrote check.html');
