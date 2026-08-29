// Apply what the shipped sets do: keep the true point, and put the sharp
// polygon back on the grid instead of trimming it.
//
// The scale is solved off the vertices the de-fillet created, not off the
// whole drawing: each one is pulled back inside the rounded drawing's own
// bounds by a uniform scale about (12,12). Free ends are left out of the
// solve, since the generator already moved those by a unit on purpose to make
// a butt cap paint where a round cap did.
//
// The house guide says solve the parameters, never scale, so this previews the
// size question only. It is not the drawing anyone would ship.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { tokenize, pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';

const STROKE = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const SHARP = 'sharp', OUT = 'fitted';
mkdirSync(OUT, { recursive: true });

const n = (v) => { const r = +v.toFixed(5); return Object.is(r, -0) ? '0' : String(r); };
const par = (a, b) => { const la = Math.hypot(...a), lb = Math.hypot(...b); return la > 1e-6 && lb > 1e-6 && Math.abs((a[0] * b[1] - a[1] * b[0]) / (la * lb)) < 1e-2; };

function segsOf(d) {
  const runs = []; let segs = [], x = 0, y = 0, sx = 0, sy = 0;
  const flush = (c) => { if (segs.length) runs.push({ segs, closed: c }); segs = []; };
  for (const { cmd, args } of tokenize(d)) {
    const U = cmd.toUpperCase();
    if (U === 'M') { flush(false); x = args[0]; y = args[1]; sx = x; sy = y; }
    else if (U === 'L') { segs.push({ type: 'line', p0: [x, y], p1: [args[0], args[1]] }); x = args[0]; y = args[1]; }
    else if (U === 'H') { segs.push({ type: 'line', p0: [x, y], p1: [args[0], y] }); x = args[0]; }
    else if (U === 'V') { segs.push({ type: 'line', p0: [x, y], p1: [x, args[0]] }); y = args[0]; }
    else if (U === 'C') { segs.push({ type: 'cubic', p0: [x, y], p1: [args[0], args[1]], p2: [args[2], args[3]], p3: [args[4], args[5]] }); x = args[4]; y = args[5]; }
    else if (U === 'Z') { if (x !== sx || y !== sy) segs.push({ type: 'line', p0: [x, y], p1: [sx, sy] }); flush(true); x = sx; y = sy; }
  }
  flush(false);
  return runs;
}

/** The corner each fillet was cut from, in the rounded drawing. */
function vertices(d) {
  const out = [];
  for (const { segs, closed } of segsOf(d)) {
    const n2 = segs.length;
    for (let i = 0; i < n2; i++) {
      const cur = segs[i];
      if (cur.type !== 'cubic') continue;
      const prev = segs[(i - 1 + n2) % n2], next = segs[(i + 1) % n2];
      if ((!closed && (i === 0 || i === n2 - 1)) || prev.type !== 'line' || next.type !== 'line') continue;
      const u = [cur.p1[0] - cur.p0[0], cur.p1[1] - cur.p0[1]];
      const v = [cur.p3[0] - cur.p2[0], cur.p3[1] - cur.p2[1]];
      if (!par(u, [prev.p1[0] - prev.p0[0], prev.p1[1] - prev.p0[1]])) continue;
      if (!par(v, [next.p1[0] - next.p0[0], next.p1[1] - next.p0[1]])) continue;
      const den = u[0] * -v[1] - u[1] * -v[0];
      if (Math.abs(den) < 1e-9) continue;
      const t = ((cur.p3[0] - cur.p0[0]) * -v[1] - (cur.p3[1] - cur.p0[1]) * -v[0]) / den;
      out.push([cur.p0[0] + u[0] * t, cur.p0[1] + u[1] * t]);
    }
  }
  return out;
}

function scaled(d, s) {
  let out = '', x = 0, y = 0, sx = 0, sy = 0;
  const f = (v) => (v - 12) * s + 12;
  for (const { cmd, args } of tokenize(d)) {
    const U = cmd.toUpperCase();
    if (U === 'M' || U === 'L') { x = args[0]; y = args[1]; if (U === 'M') { sx = x; sy = y; } out += `${U}${n(f(x))} ${n(f(y))}`; }
    else if (U === 'H') { x = args[0]; out += `H${n(f(x))}`; }
    else if (U === 'V') { y = args[0]; out += `V${n(f(y))}`; }
    else if (U === 'C') { out += `C${n(f(args[0]))} ${n(f(args[1]))} ${n(f(args[2]))} ${n(f(args[3]))} ${n(f(args[4]))} ${n(f(args[5]))}`; x = args[4]; y = args[5]; }
    else if (U === 'Z') { out += 'Z'; x = sx; y = sy; }
  }
  return out;
}

const names = process.argv.slice(2);
const rows = [];
for (const name of names) {
  const rounded = readFileSync(`${STROKE}/${name}.svg`, 'utf8');
  const sharp = readFileSync(`${SHARP}/${name}.svg`, 'utf8');
  const rds = [...rounded.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const d of rds) { const b = pathBBox(d); x0 = Math.min(x0, b[0]); y0 = Math.min(y0, b[1]); x1 = Math.max(x1, b[2]); y1 = Math.max(y1, b[3]); }

  let s = 1;
  for (const d of rds) for (const [vx, vy] of vertices(d)) {
    if (vx > 12 && vx > x1) s = Math.min(s, (x1 - 12) / (vx - 12));
    if (vx < 12 && vx < x0) s = Math.min(s, (x0 - 12) / (vx - 12));
    if (vy > 12 && vy > y1) s = Math.min(s, (y1 - 12) / (vy - 12));
    if (vy < 12 && vy < y0) s = Math.min(s, (y0 - 12) / (vy - 12));
  }
  const out = sharp.replace(/ d="([^"]+)"/g, (_, d) => ` d="${scaled(d, s)}"`);
  writeFileSync(`${OUT}/${name}.svg`, out);
  rows.push([name, +s.toFixed(4)]);
}
rows.sort((a, b) => a[1] - b[1]);
console.log(rows.map(([a, b]) => `${b}  ${a}`).join('\n'));
