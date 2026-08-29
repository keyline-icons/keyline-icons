// rounded stroke/duotone/fill vs sharp, at 120px, for the registration suspects
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const R = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons';
const names = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const ic = (p) => existsSync(p) ? readFileSync(p, 'utf8').replace(/<svg /, '<svg class="ic" ') : '<div class="ic"></div>';
const row = (n) => `<figure><div class=pair>
  <div class="box s">${ic(`mid/${n}.svg`)}</div>
  <div class="box s">${ic(`duotone-mid/${n}.svg`)}</div>
  <div class="box s">${ic(`fill-mid/${n}.svg`)}</div>
  <div class=box>${ic(`${R}/duotone/${n}.svg`)}</div>
</div><figcaption>${n}</figcaption></figure>`;
writeFileSync('big.html', `<!doctype html><meta charset=utf-8><style>
body{background:#fff;margin:14px;font:11px ui-sans-serif,system-ui;color:#111}
.grid{display:grid;grid-template-columns:repeat(2,max-content);gap:16px 26px}
figure{margin:0;text-align:center}
.pair{display:flex;gap:4px;align-items:center}
.box{padding:2px;background:#fafafa}.s{background:#fdf3f3}
.ic{width:120px;height:120px;color:#111}
figcaption{font-size:10px;color:#666;margin-top:2px}
</style><b>sharp S · D · F · rounded duotone ref</b><div class=grid>${names.map(row).join('')}</div>`);
console.log('wrote big.html', names.length);
