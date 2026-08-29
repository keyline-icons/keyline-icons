import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const R='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons';
const names = process.argv.slice(3);
const title = process.argv[2];
const body = names.map((nm) => {
  const a = readFileSync(`${R}/stroke/${nm}.svg`,'utf8').replace(/<svg /,'<svg class="ic" ');
  const b = readFileSync(`${R}/sharp/${nm}.svg`,'utf8').replace(/<svg /,'<svg class="ic" ');
  return `<figure><div class="pair"><div class="big">${a}</div><div class="big sharp">${b}</div></div>
  <div class="pair small"><div>${a}</div><div class="sharp">${b}</div></div>
  <figcaption>${nm}</figcaption></figure>`;
}).join('\n');
writeFileSync('sheet.html', `<!doctype html><meta charset=utf-8><style>
body{background:#fff;color:#111;font:12px/1.4 ui-sans-serif,system-ui;margin:20px}
h1{font-size:14px;font-weight:600;margin:0 0 16px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:18px}
figure{margin:0;text-align:center}
.pair{display:flex;gap:6px;justify-content:center;align-items:center}
.big .ic{width:64px;height:64px}
.small{margin-top:6px}
.small .ic{width:20px;height:20px}
.sharp{background:#fff4f4}
figcaption{margin-top:6px;font-size:10px;color:#666;word-break:break-all}
</style><h1>${title} — left rounded, right sharp (pink)</h1><div class="grid">${body}</div>`);
console.log('sheet.html', names.length);
