import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
import { paintedBBox, readPaths, polylines } from './stroke-bbox.mjs';

const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
mkdirSync('solved', { recursive: true });
const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const SHARP = { join: 'miter', cap: 'butt' }, ROUND = { join: 'round', cap: 'round' };

function xform(d, sx, sy, tx, ty) {
  const X = (v) => n(v * sx + tx), Y = (v) => n(v * sy + ty);
  let out = '', x = 0, y = 0, sxp = 0, syp = 0;
  for (const { cmd, args } of tokenize(d)) {
    const U = cmd.toUpperCase();
    if (U === 'M' || U === 'L') { x = args[0]; y = args[1]; if (U === 'M') { sxp = x; syp = y; } out += `${U}${X(x)} ${Y(y)}`; }
    else if (U === 'H') { x = args[0]; out += `H${X(x)}`; }
    else if (U === 'V') { y = args[0]; out += `V${Y(y)}`; }
    else if (U === 'C') { out += `C${X(args[0])} ${Y(args[1])} ${X(args[2])} ${Y(args[3])} ${X(args[4])} ${Y(args[5])}`; x = args[4]; y = args[5]; }
    else if (U === 'Z') { out += 'Z'; x = sxp; y = syp; }
    else return null;
  }
  return out;
}

function worstMitre(paths) {
  let worst = 0;
  for (const p of paths) {
    if (p.filled) continue;
    for (const { pts, closed } of polylines(p.d, 8)) {
      const P = pts.filter((q, i) => i === 0 || Math.hypot(q[0] - pts[i-1][0], q[1] - pts[i-1][1]) > 1e-9);
      const m = P.length;
      for (let i = 0; i < (closed ? m : m - 2); i++) {
        const a = P[i], b = P[(i+1)%m], c = P[(i+2)%m];
        const u = [b[0]-a[0], b[1]-a[1]], v = [c[0]-b[0], c[1]-b[1]];
        const lu = Math.hypot(...u), lv = Math.hypot(...v);
        if (lu < 1e-9 || lv < 1e-9) continue;
        const turn = Math.acos(Math.max(-1, Math.min(1, (u[0]*v[0]+u[1]*v[1])/(lu*lv))));
        worst = Math.max(worst, 1 / Math.sin((Math.PI - turn) / 2));
      }
    }
  }
  return worst;
}

const names = readFileSync('grew.txt', 'utf8').trim().split('\n');
const rows = [];
for (const name of names) {
  const rounded = readPaths(readFileSync(`${K}/${name}.svg`, 'utf8'));
  const src = readFileSync(`sharp/${name}.svg`, 'utf8');
  const sharp = readPaths(src);
  const T = paintedBBox(rounded, ROUND);
  const tw = T[2] - T[0], th = T[3] - T[1];
  const before = paintedBBox(sharp, SHARP);

  const measure = (sx, sy) => paintedBBox(sharp.map((p) => ({ ...p, d: xform(p.d, sx, sy, 0, 0) })), SHARP);
  let sx = 1, sy = 1, bad = false;
  for (let i = 0; i < 14 && !bad; i++) {
    let lo = 0.2, hi = 1.6;
    for (let j = 0; j < 44; j++) { const m = (lo + hi) / 2; const b = measure(m, sy); if (!b || !isFinite(b[0])) { bad = true; break; } (b[2]-b[0] < tw ? lo = m : hi = m); }
    sx = (lo + hi) / 2;
    lo = 0.2; hi = 1.6;
    for (let j = 0; j < 44; j++) { const m = (lo + hi) / 2; const b = measure(sx, m); if (!b || !isFinite(b[1])) { bad = true; break; } (b[3]-b[1] < th ? lo = m : hi = m); }
    sy = (lo + hi) / 2;
  }
  const b = measure(sx, sy);
  const out = src.replace(/ d="([^"]+)"/g, (_, d) => ` d="${xform(d, sx, sy, T[0] - b[0], T[1] - b[1])}"`);
  writeFileSync(`solved/${name}.svg`, out);
  const after = paintedBBox(readPaths(out), SHARP);
  const err = Math.max(...after.map((v, i) => Math.abs(v - T[i])));
  rows.push({ name, sx: +sx.toFixed(4), sy: +sy.toFixed(4),
    aniso: +Math.abs(sx / sy - 1).toFixed(4), err: +err.toFixed(4),
    grewBy: +Math.max(T[0]-before[0], before[2]-T[2], T[1]-before[1], before[3]-T[3]).toFixed(2),
    mitre: +worstMitre(readPaths(out)).toFixed(2) });
}
writeFileSync('solve-all.json', JSON.stringify(rows, null, 1));
const f = (x) => +x.toFixed(3);
console.log('solved', rows.length, 'files');
console.log('max box error:', f(Math.max(...rows.map(r => r.err))));
console.log('no-op (already matched):', rows.filter(r => r.sx > 0.9995 && r.sy > 0.9995).map(r => r.name).join(', ') || 'none');
console.log('uniform within 1%:', rows.filter(r => r.aniso <= 0.01).length);
console.log('anisotropy over 5%:', rows.filter(r => r.aniso > 0.05).map(r => `${r.name} ${r.sx}/${r.sy}`).join(', '));
console.log('mitre over the default limit of 4:', rows.filter(r => r.mitre > 4).map(r => `${r.name} ${r.mitre}`).join(', ') || 'none');
console.log('smallest scales:', rows.slice().sort((a,b)=>Math.min(a.sx,a.sy)-Math.min(b.sx,b.sy)).slice(0,8).map(r=>`${r.name} ${Math.min(r.sx,r.sy)}`).join(', '));
