// star on whole paddings (26 Nov 2026). Zafar, over star and star-half both at 1 / 1.5 / 1 / 1.5: "apparently
// the default star is also broken in size. fix them both".
//
// Why it was 1.5: a regular five-point star 22 wide stands 22 - 0.093c tall (c the tip-fillet centres'
// radius), 21 here, and an odd height cannot sit centred on whole paddings. No fillet or inner radius
// fixes that (H = 21 at W = 22 needs a negative tip radius), so the box has to change: 22 x 22 (the
// house size for a round form, corners empty: 93 of 97 ship at 22), 22 x 20 or 20 x 20. 22 x 22 keeps
// today's width and the size class; its path aspect moves 5.3%, the same as 20 x 20 (which only shrinks
// the star) and 22 x 20 (which squats it into a horizontal rectangle). Turning it 9 degrees squares the
// box too (bot-star, star-shooting), but a rating star stands upright and star-half splits on the axis.
//
// Construction: the shipped star as its polygon and corner radii (polygonOf, as tools/batch-2-0-0 reads
// star and zap), the polygon stretched about the box centre until the PAINTED box is 1..23 both ways,
// the radii unchanged (tips 0.5, valleys as shipped), so every corner stays on the ladder and the offset
// fill stays exactly a unit out. Sharp keeps the tip fillets and squares the valleys, as sharp star does.
//
//   node tools/star-3-2-0/build.mjs --out=DIR [--sx=1 --sy=1] [--check]
//     --check   rebuild today's star (no stretch) and diff it against raw/star: proves the construction
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as L from '../batch-1-4-0/lib.mjs';
import * as A from '../batch-1-4-0/la.mjs';
import * as B from '../batch-1-4-0/bool.mjs';
import { doc } from '../batch-1-4-0/rawio.mjs';
import * as X from '../batch-1-5-0/lib15.mjs';
const { rawLayers, assert } = X;
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));

const bez = (p, t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]); };
function circ3(a, b, c) {
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  const q = (p) => p[0] * p[0] + p[1] * p[1];
  return { c: [(q(a) * (b[1] - c[1]) + q(b) * (c[1] - a[1]) + q(c) * (a[1] - b[1])) / d, (q(a) * (c[0] - b[0]) + q(b) * (a[0] - c[0]) + q(c) * (b[0] - a[0])) / d],
    get r() { return Math.hypot(a[0] - this.c[0], a[1] - this.c[1]); } };
}
// tools/batch-2-0-0/g20.mjs polygonOf, verbatim in effect: lines are the drawing, cubics between two lines a fillet
function polygonOf(d) {
  const run = L.parseRuns(d)[0].segs, lines = [], radii = [];
  let pending = [];
  for (const s of run) {
    if (s.t === 'L' && Math.hypot(s.p[1][0] - s.p[0][0], s.p[1][1] - s.p[0][1]) > 0.05) { lines.push(s.p); radii.push(pending); pending = []; }
    else if (s.t === 'C') pending.push(s);
  }
  radii[0] = [...pending, ...radii[0]];
  const meet = (a, b) => { const d1 = L.sub(a[1], a[0]), d2 = L.sub(b[1], b[0]); const t = L.cross(L.sub(b[0], a[0]), d2) / L.cross(d1, d2); return L.add(a[0], L.mul(d1, t)); };
  const V = lines.map((ln, i) => meet(lines[(i - 1 + lines.length) % lines.length], ln));
  const R = radii.map((cs) => {
    if (!cs.length) return 0;
    const main = cs.reduce((a, b) => (Math.hypot(...L.sub(b.p[3], b.p[0])) > Math.hypot(...L.sub(a.p[3], a.p[0])) ? b : a));
    const r = Math.round(circ3(main.p[0], bez(main.p, 0.5), main.p[3]).r / 0.05) * 0.05;
    return r;
  });
  return { V, R };
}
const SHIP = polygonOf(rawLayers('star', 'stroke', 'regular')[0].d);
const TIPS = (() => { const d = SHIP.V.map(([x, y]) => Math.hypot(x - 12, y - 12)), m = [...d].sort((a, b) => a - b)[4]; return d.map((v) => v > m); })(); // the five outer vertices
const C0 = (() => { const xs = SHIP.V.map((v) => v[0]), ys = SHIP.V.map((v) => v[1]); return [(Math.min(...xs) + Math.max(...xs)) / 2, 12]; })();

export function build(sx = 1, sy = 1, dy = 0) {
  const V = SHIP.V.map(([x, y]) => [C0[0] + (x - C0[0]) * sx, C0[1] + (y - C0[1]) * sy + dy]);
  const reg = A.polyLA(V, SHIP.R), shp = A.polyLA(V, SHIP.R.map((r, i) => (TIPS[i] ? r : 0)));
  const fillOf = (segs) => { const o = A.offsetLA(segs, 1); A.verifyOffset(segs, o, 1); return B.emitShape([A.toGeo(o)]); };
  const out = {};
  for (const [corners, segs] of [['regular', reg], ['sharp', shp]]) {
    const s = A.dLA(segs), f = fillOf(segs);
    out[corners] = { stroke: [{ kind: 'stroke', d: s }], 'two-tone': [{ kind: 'plate', d: f }, { kind: 'stroke', d: s }], duotone: [{ kind: 'stroke', d: s }], fill: [{ kind: 'solid', d: f }] };
  }
  return out;
}
/** Painted box of the regular stroke (path box + 1, curves sampled). */
export function inkBox(set) {
  const d = set.regular.stroke[0].d, pts = [];
  for (const seg of L.parseRuns(d)[0].segs) for (let k = 0; k <= 64; k++) pts.push(seg.t === 'C' ? bez(seg.p, k / 64) : L.add(seg.p[0], L.mul(L.sub(seg.p[1], seg.p[0]), k / 64)));
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  return [Math.min(...xs) - 1, Math.min(...ys) - 1, Math.max(...xs) + 1, Math.max(...ys) + 1];
}
/** Solve the stretch: painted box exactly 1..23 on both axes. */
export function solve(W = 22, H = 22) {
  let sx = 1, sy = 1, dy = 0;
  for (let it = 0; it < 40; it++) {
    const b = inkBox(build(sx, sy, dy));
    sx *= (W - 2) / (b[2] - b[0] - 2); sy *= (H - 2) / (b[3] - b[1] - 2);
    const b2 = inkBox(build(sx, sy, dy)); dy += 12 - (b2[1] + b2[3]) / 2;
  }
  return { sx, sy, dy, box: inkBox(build(sx, sy, dy)) };
}
const write = (root, set) => { const dir = join(root, 'raw', 'star'); mkdirSync(dir, { recursive: true });
  for (const [corners, styles] of Object.entries(set)) for (const [style, layers] of Object.entries(styles))
    writeFileSync(join(dir, `Container=regular, Style=${style}, Corners=${corners}.svg`), doc(layers, corners === 'sharp' ? 'butt' : 'round')); };

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('shipped polygon radii', SHIP.R.map((r) => +r.toFixed(2)).join(' '), 'centre', C0.map((v) => +v.toFixed(4)).join(','));
  if (args.check) {
    const flat = (d) => { const P = []; for (const r of L.parseRuns(d)) { const pts = []; for (const seg of r.segs) for (let k = 0; k <= 24; k++) pts.push(seg.t === 'C' ? bez(seg.p, k / 24) : L.add(seg.p[0], L.mul(L.sub(seg.p[1], seg.p[0]), k / 24))); P.push(pts); } return P; };
    const segd = (q, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], l = dx * dx + dy * dy; let t = l ? ((q[0] - a[0]) * dx + (q[1] - a[1]) * dy) / l : 0; t = Math.max(0, Math.min(1, t)); return Math.hypot(q[0] - a[0] - t * dx, q[1] - a[1] - t * dy); };
    const one = (A_, B_) => { let w = 0; for (const p of A_.flat()) { let b = 1e9; for (const r of B_) for (let k = 0; k + 1 < r.length; k++) b = Math.min(b, segd(p, r[k], r[k + 1])); w = Math.max(w, b); } return w; };
    const set = build();
    for (const [corners, styles] of Object.entries(set)) for (const [style, layers] of Object.entries(styles)) {
      const now = rawLayers('star', style, corners);
      const kinds = layers.map((l) => l.kind).join(',') === now.map((l) => l.kind).join(',');
      const h = layers.map((l, i) => { const a = flat(l.d), b = flat(now[i].d); return Math.max(one(a, b), one(b, a)); });
      console.log(`${corners}/${style}`.padEnd(18), 'kinds ' + (kinds ? 'same' : 'DIFFER ' + now.map((l) => l.kind)), 'hausdorff', h.map((v) => v.toFixed(4)).join(' '));
    }
    process.exit(0);
  }
  const W = +(args.w ?? 22), H = +(args.h ?? 22);
  const s = solve(W, H); console.log('solved', JSON.stringify(s));
  if (args.out) { write(args.out, build(s.sx, s.sy, s.dy)); console.log('wrote', args.out + '/raw/star (8 regular-container files)'); }
}
