import { readFileSync, writeFileSync } from 'node:fs';
const R='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const names=process.argv.slice(2);
const cell=(nm)=>{
  const a=readFileSync(`${R}/${nm}.svg`,'utf8').replace(/<svg /,'<svg class="ic" ');
  const b=readFileSync(`sharp/${nm}.svg`,'utf8').replace(/<svg /,'<svg class="ic" ');
  const c=readFileSync(`solved/${nm}.svg`,'utf8').replace(/<svg /,'<svg class="ic" ');
  return `<figure>
  <div class="pair big"><div class="box">${a}</div><div class="box sharp">${b}</div><div class="box solved">${c}</div></div>
  <div class="pair mid"><div class="box">${a}</div><div class="box sharp">${b}</div><div class="box solved">${c}</div></div>
  <div class="pair small"><div class="box">${a}</div><div class="box sharp">${b}</div><div class="box solved">${c}</div></div>
  <figcaption>${nm}</figcaption></figure>`;
};
writeFileSync('sheet4.html', `<!doctype html><meta charset=utf-8><style>
body{background:#fff;color:#111;font:12px/1.4 ui-sans-serif,system-ui;margin:24px}
h1{font-size:13px;font-weight:600;margin:0 0 4px}p{margin:0 0 18px;color:#666;font-size:11px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}
figure{margin:0;text-align:center}
.pair{display:flex;gap:6px;justify-content:center;align-items:center;margin-bottom:8px}
.box{padding:4px;position:relative}
.sharp{background:#fff4f4}.solved{background:#eef7ff}
.big .ic{width:96px;height:96px}.mid .ic{width:24px;height:24px}.small .ic{width:16px;height:16px}
figcaption{font-size:10px;color:#666}
</style><h1>rounded | de-filleted as generated (pink) | solved to the rounded painted box (blue)</h1>
<p>96, then 24, then 16.</p><div class="grid">${names.map(cell).join('')}</div>`);
