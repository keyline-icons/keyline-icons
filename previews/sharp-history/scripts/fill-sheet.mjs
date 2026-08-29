// rounded fill · old sharp fill (0) · NEW matched fill · sharp duotone
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const R = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons';
const names = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const ic = (p) => existsSync(p) ? readFileSync(p, 'utf8').replace(/<svg /, '<svg class="ic" ') : '<div class="ic"></div>';
const row = (n) => `<figure><div class=pair>
  <div class=box>${ic(`${R}/fill/${n}.svg`)}</div>
  <div class="box s">${ic(`fill-mid-0/${n}.svg`)}</div>
  <div class="box m">${ic(`fill-mid/${n}.svg`)}</div>
  <div class=box>${ic(`duotone-mid/${n}.svg`)}</div>
</div><figcaption>${n}</figcaption></figure>`;
writeFileSync('fill-check.html', `<!doctype html><meta charset=utf-8><style>
body{background:#fff;margin:16px;font:11px ui-sans-serif,system-ui;color:#111}
h1{font-size:12px;font-weight:600}
.grid{display:grid;grid-template-columns:repeat(3,max-content);gap:18px 28px}
figure{margin:0;text-align:center}
.pair{display:flex;gap:4px;align-items:center}
.box{padding:3px;background:#fafafa}.s{background:#fff2f2}.m{background:#eef7ee}
.ic{width:72px;height:72px;color:#111}
figcaption{font-size:10px;color:#666;margin-top:3px}
</style><h1>rounded fill · old sharp (pink) · matched (green) · sharp duotone</h1><div class=grid>${names.map(row).join('')}</div>`);
console.log('wrote fill-check.html', names.length);
