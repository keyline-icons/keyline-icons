// Pinch the check glyph's outer vertex to a true point in the SHARP fills.
//   node pinch-checks.mjs [--write] <name...>
//
// Zafar, 30 Aug, on shield-check: the sharp fill's check bottom was still a
// radius-1 arc, identical to the rounded fill's. §20's matched rule (radius 1
// outside, pinch inside) put it there; his report overrides it for the drawn
// MARK inside a knockout: a check's vertex goes to the true point. Body
// silhouette corners keep §20.
//
// Mechanics: in every knockout subpath (any subpath that is not the
// largest-area one in its path), find a run of consecutive cubics sitting
// between two straight edges whose intersection lies close to the run, and
// collapse the run to that intersection. Guards: all-curve rings (dots) are
// skipped, cap-like runs (antiparallel neighbours) are skipped, and a vertex
// further than 1.6 from the run is a shape, not a corner.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { segsOf, samplePts } from './offset-tint.mjs';

const H = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const WRITE = process.argv.includes('--write');
const names = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const area = (segs) => {
  const p = samplePts(segs, 6); let a = 0;
  for (let i = 0; i < p.length; i++) { const q = p[(i + 1) % p.length]; a += p[i][0] * q[1] - q[0] * p[i][1]; }
  return Math.abs(a / 2);
};
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const len = (a) => Math.hypot(a[0], a[1]);

function collapse(dSub) {
  const runs = segsOf(dSub);
  if (!runs || runs.length !== 1 || !runs[0].closed) return null;
  const segs = runs[0].segs, N = segs.length;
  if (segs.every((s) => s.t === 'c')) return null;              // a dot stays a dot
  const kill = [];
  for (let i = 0; i < N; i++) {
    if (segs[i].t !== 'l') continue;
    // scan the run of cubics after line i
    let j = (i + 1) % N, run = [];
    while (segs[j].t === 'c' && run.length < 4) { run.push(j); j = (j + 1) % N; }
    if (!run.length || segs[j].t !== 'l' || j === i) continue;
    const A = segs[i], B = segs[j];
    const u = sub(A.p1, A.p0), v = sub(B.p1, B.p0);
    const uu = [u[0] / len(u), u[1] / len(u)], vv = [v[0] / len(v), v[1] / len(v)];
    if (dot(uu, vv) < -0.94) continue;                          // cap between antiparallel edges
    const den = cross(u, v);
    if (Math.abs(den) < 1e-9) continue;
    const t = cross(sub(B.p0, A.p0), v) / den;
    const X = [A.p0[0] + u[0] * t, A.p0[1] + u[1] * t];
    const near = Math.min(len(sub(X, A.p1)), len(sub(X, B.p0)));
    if (near > 1.6) continue;                                   // a shape, not a corner
    kill.push({ i, run, j, X });
  }
  if (!kill.length) return null;
  const dead = new Set(kill.flatMap((k) => k.run));
  const vertexAfter = new Map(kill.map((k) => [k.i, k.X]));
  // rotate to start on a surviving segment so a dead run never wraps the seam
  let start = 0;
  while (dead.has(start)) start++;
  const order = Array.from({ length: N }, (_, k) => (start + k) % N).filter((i) => !dead.has(i));
  let d = `M${n(segs[order[0]].p0[0])} ${n(segs[order[0]].p0[1])}`;
  for (const i of order) {
    const s = segs[i];
    if (s.t === 'l') d += `L${n(s.p1[0])} ${n(s.p1[1])}`;
    else d += `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`;
    if (vertexAfter.has(i)) { const X = vertexAfter.get(i); d += `L${n(X[0])} ${n(X[1])}`; }
  }
  return { d: d + 'Z', hits: kill.map((k) => k.X.map((v) => +v.toFixed(3))) };
}

let changed = 0;
for (const name of names) {
  const p = `${H}/solved-fill/${name}.svg`;
  if (!existsSync(p)) { console.log(`${name}: no sharp fill`); continue; }
  const src = readFileSync(p, 'utf8');
  let out = src, touched = false;
  for (const m of src.matchAll(/ d="([^"]+)"/g)) {
    const dFull = m[1];
    const subs = dFull.split(/(?=M)/).filter(Boolean);
    if (subs.length < 2) continue;
    const areas = subs.map((s) => { const r = segsOf(s); return r && r[0] ? area(r[0].segs) : 0; });
    const bodyIdx = areas.indexOf(Math.max(...areas));
    let dirty = false;
    const next = subs.map((s, k) => {
      if (k === bodyIdx) return s;
      const r = collapse(s);
      if (!r) return s;
      console.log(`${name.padEnd(20)} sub${k}  vertex ${r.hits.map((h) => `(${h[0]}, ${h[1]})`).join(' ')}`);
      dirty = true;
      return r.d;
    });
    if (!dirty) continue;
    out = out.replace(` d="${dFull}"`, ` d="${next.join('')}"`);
    touched = true;
  }
  if (!touched) { console.log(`${name}: nothing to pinch`); continue; }
  changed++;
  if (WRITE) writeFileSync(p, out);
}
console.log({ filesChanged: changed, written: WRITE });
