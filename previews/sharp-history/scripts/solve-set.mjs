// Solve a sharp drawing so its PAINTED box equals the rounded drawing's.
//
// Match width and height, then translate onto the target: once both dimensions
// agree, every side coincides and there is no anchor left to argue about.
// The two scales are solved separately because a mitre tip moves with the
// angle, so the height depends on the width and vice versa.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
import { paintedBBox, readPaths, polylines } from './stroke-bbox.mjs';

const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
mkdirSync('solved', { recursive: true });
const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };

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
    else throw new Error('unexpected ' + cmd);
  }
  return out;
}

const SHARP = { join: 'miter', cap: 'butt' };
const ROUND = { join: 'round', cap: 'round' };

function solve(name) {
  const rounded = readPaths(readFileSync(`${K}/${name}.svg`, 'utf8'));
  const sharpSrc = readFileSync(`sharp/${name}.svg`, 'utf8');
  const sharp = readPaths(sharpSrc);
  const T = paintedBBox(rounded, ROUND);
  const tw = T[2] - T[0], th = T[3] - T[1];

  const measure = (sx, sy) => paintedBBox(sharp.map((p) => ({ ...p, d: xform(p.d, sx, sy, 0, 0) })), SHARP);
  let sx = 1, sy = 1;
  for (let i = 0; i < 60; i++) {
    let lo = 0.2, hi = 2;
    for (let j = 0; j < 80; j++) { const m = (lo + hi) / 2; const b = measure(m, sy); (b[2] - b[0] < tw ? lo = m : hi = m); }
    sx = (lo + hi) / 2;
    lo = 0.2; hi = 2;
    for (let j = 0; j < 80; j++) { const m = (lo + hi) / 2; const b = measure(sx, m); (b[3] - b[1] < th ? lo = m : hi = m); }
    sy = (lo + hi) / 2;
  }
  const b = measure(sx, sy);
  const tx = T[0] - b[0], ty = T[1] - b[1];
  const out = sharpSrc.replace(/ d="([^"]+)"/g, (_, d) => ` d="${xform(d, sx, sy, tx, ty)}"`);
  writeFileSync(`solved/${name}.svg`, out);
  const final = paintedBBox(readPaths(out), SHARP);
  const raw = paintedBBox(sharp, SHARP);

  // Worst mitre in the solved drawing, against the default limit of 4.
  let worst = 0;
  for (const p of readPaths(out)) {
    if (p.filled) continue;
    for (const { pts, closed } of polylines(p.d)) {
      const P = pts.filter((q, i) => i === 0 || Math.hypot(q[0] - pts[i-1][0], q[1] - pts[i-1][1]) > 1e-9);
      const m = P.length;
      for (let i = 0; i < (closed ? m : m - 2); i++) {
        const a = P[i], b2 = P[(i + 1) % m], c = P[(i + 2) % m];
        const u = [b2[0]-a[0], b2[1]-a[1]], v = [c[0]-b2[0], c[1]-b2[1]];
        const lu = Math.hypot(...u), lv = Math.hypot(...v);
        if (lu < 1e-9 || lv < 1e-9) continue;
        const turn = Math.acos(Math.max(-1, Math.min(1, (u[0]*v[0]+u[1]*v[1])/(lu*lv))));
        worst = Math.max(worst, 1 / Math.sin((Math.PI - turn) / 2));
      }
    }
  }
  const f = (v) => +v.toFixed(3);
  return { name, target: T.map(f), rawSharp: raw.map(f), solved: final.map(f),
    sx: +sx.toFixed(4), sy: +sy.toFixed(4), anisotropy: +Math.abs(sx / sy - 1).toFixed(4), worstMitre: +worst.toFixed(2) };
}

for (const name of ['play', 'navigation', 'tag', 'triangle-alert']) console.log(solve(name));
