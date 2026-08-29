import { readFileSync, writeFileSync } from 'node:fs';
const R='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons';
const names=process.argv.slice(2);
const body=names.map((nm)=>{
  const a=readFileSync(`${R}/stroke/${nm}.svg`,'utf8').replace(/<svg /,'<svg class="ic" ');
  const b=readFileSync(`sharp/${nm}.svg`,'utf8').replace(/<svg /,'<svg class="ic" ');
  const c=readFileSync(`fitted/${nm}.svg`,'utf8').replace(/<svg /,'<svg class="ic" ');
  return `<figure><div class="pair"><div class="big">${a}</div><div class="big sharp">${b}</div><div class="big fit">${c}</div></div>
  <div class="pair small"><div>${a}</div><div class="sharp">${b}</div><div class="fit">${c}</div></div>
  <figcaption>${nm}</figcaption></figure>`;
}).join('\n');
writeFileSync('sheet3.html', `<!doctype html><meta charset=utf-8><style>
body{background:#fff;color:#111;font:12px/1.4 ui-sans-serif,system-ui;margin:20px}
h1{font-size:14px;font-weight:600;margin:0 0 16px}
.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:18px}
figure{margin:0;text-align:center}
.pair{display:flex;gap:4px;justify-content:center;align-items:center}
.big .ic{width:60px;height:60px}
.small{margin-top:6px}.small .ic{width:20px;height:20px}
.sharp{background:#fff4f4}.fit{background:#f1fbf3}
figcaption{margin-top:6px;font-size:10px;color:#666;word-break:break-all}
</style><h1>rounded | sharp as generated (pink) | sharp fitted back inside the rounded bounds (green)</h1><div class="grid">${body}</div>`);
