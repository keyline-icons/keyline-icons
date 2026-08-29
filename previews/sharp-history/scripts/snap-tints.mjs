// Union-outline tints (megaphone, pencil-ruler, cursor-off) cannot be rebuilt
// as a single-stroke offset, and box solving leaves their corners a few tenths
// off the solved stroke. Snap: any corner unit standing PROUD of the painted
// stroke moves onto it. Regions the ROUNDED drawing itself draws proud (the
// -off clip edges) are exempt: proud there is the design, not a defect.
//   node snap-tints.mjs <dir> <roundedDir> <name> [name...]
import { readFileSync, writeFileSync } from 'node:fs';
import { segsOf, samplePts } from './offset-tint.mjs';
import { solveBox } from './solve-box.mjs';       // not used to solve; just parity of parsing
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';

const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const DIR = process.argv[2], ROUND = process.argv[3], NAMES = process.argv.slice(4);

const split = (src) => {
  const root = / stroke="currentColor"/.test(src.slice(0, src.indexOf('>')));
  const outlines = [], strokes = [];
  for (const m of src.matchAll(/<path[^>]*>/g)) {
    const tag = m[0], d = / d="([^"]+)"/.exec(tag)?.[1];
    if (!d) continue;
    const st = root && !/ stroke="none"/.test(tag);
    if (st) strokes.push(d);
    else if (/ fill="currentColor"/.test(tag)) outlines.push({ tag, d });
  }
  return { outlines, strokes };
};
const segsList = (ds, per) => {
  const S = [];
  for (const d of ds) for (const r of segsOf(d) ?? []) {
    const pts = samplePts(r.segs, per);
    for (let i = 0; i < pts.length - 1; i++) S.push([pts[i], pts[i + 1]]);
  }
  return S;
};
const nearest = (p, S) => {
  let m = Infinity, q = null;
  for (const [a, b] of S) {
    const v = [b[0]-a[0], b[1]-a[1]], L2 = v[0]*v[0]+v[1]*v[1];
    let t = L2 ? ((p[0]-a[0])*v[0]+(p[1]-a[1])*v[1]) / L2 : 0;
    t = Math.max(0, Math.min(1, t));
    const c = [a[0]+v[0]*t, a[1]+v[1]*t];
    const dd = Math.hypot(p[0]-c[0], p[1]-c[1]);
    if (dd < m) { m = dd; q = c; }
  }
  return { m, q };
};

for (const name of NAMES) {
  const rSrc = readFileSync(`${ROUND}/${name}.svg`, 'utf8');
  let vSrc = readFileSync(`${DIR}/${name}.svg`, 'utf8');
  const R = split(rSrc), V = split(vSrc);
  let rStrokes = R.strokes, vStrokes = V.strokes;
  if (!vStrokes.length) {
    // a fill file with no stroked sibling: reference the duotone build's
    // strokes, which the tint this fill must equal was snapped against
    try {
      const dv = split(readFileSync(`duotone-mid/${name}.svg`, 'utf8'));
      const dr = split(readFileSync(`${ROUND.replace(/\/fill$/, '/duotone')}/${name}.svg`, 'utf8'));
      vStrokes = dv.strokes; rStrokes = dr.strokes;
    } catch {}
  }
  const rS = segsList(rStrokes, 14), vS = segsList(vStrokes, 14);
  if (!rS.length || !vS.length) { console.log(name, 'no strokes'); continue; }
  // where the rounded outline itself stands proud: exempt zones
  const exempt = [];
  for (const { d } of R.outlines) for (const r of segsOf(d) ?? [])
    for (const p of samplePts(r.segs, 10)) if (nearest(p, rS).m - 1 > 0.15) exempt.push(p);
  const isExempt = (p) => exempt.some((e) => Math.hypot(e[0]-p[0], e[1]-p[1]) < 0.8);

  let snapped = 0;
  for (const { tag, d } of V.outlines) {
    const runs = segsOf(d);
    if (!runs) continue;
    let moved = false;
    for (let pass = 0; pass < 2; pass++) {
      for (const run of runs) {
        const N = run.segs.length;
        // units: cubic groups and line-line vertices, same shapes solveBox uses
        let i = 0;
        while (i < N) {
          if (run.segs[i].t === 'c') {
            let j = i; while (j + 1 < N && run.segs[j + 1].t === 'c') j++;
            const pts = samplePts(run.segs.slice(i, j + 1), 8);
            let worst = 0, wp = null;
            for (const p of pts) { const { m } = nearest(p, vS); if (m - 1 > worst) { worst = m - 1; wp = p; } }
            if (worst > 0.1 && worst < 2.0 && wp && !isExempt(wp)) {
              const { q } = nearest(wp, vS);
              const L = Math.hypot(wp[0]-q[0], wp[1]-q[1]);
              const delta = [ (q[0]-wp[0]) / L * worst, (q[1]-wp[1]) / L * worst ];
              for (let k = i; k <= j; k++) {
                const s = run.segs[k];
                s.p0 = [s.p0[0]+delta[0], s.p0[1]+delta[1]]; s.p1 = [s.p1[0]+delta[0], s.p1[1]+delta[1]];
                s.p2 = [s.p2[0]+delta[0], s.p2[1]+delta[1]]; s.p3 = [s.p3[0]+delta[0], s.p3[1]+delta[1]];
              }
              const prv = run.segs[(i - 1 + N) % N], nxt = run.segs[(j + 1) % N];
              if (prv && prv.t === 'l' && (run.closed || i > 0)) prv.p1 = run.segs[i].p0;
              if (nxt && nxt.t === 'l' && (run.closed || j < N - 1)) nxt.p0 = run.segs[j].p3;
              moved = true; snapped++;
            }
            i = j + 1;
          } else {
            const s = run.segs[i], b = run.segs[(i + 1) % N];
            const isVertex = b && b.t === 'l' && (run.closed || i < N - 1);
            if (isVertex) {
              const p = s.p1;
              const { m, q } = nearest(p, vS);
              if (m - 1 > 0.1 && m - 1 < 2.0 && !isExempt(p)) {
                const L = Math.hypot(p[0]-q[0], p[1]-q[1]);
                const np = [p[0] + (q[0]-p[0]) / L * (m - 1), p[1] + (q[1]-p[1]) / L * (m - 1)];
                s.p1 = np; b.p0 = np;
                moved = true; snapped++;
              }
            }
            i++;
          }
        }
      }
    }
    if (!moved) continue;
    let out = '';
    for (const { segs, closed } of runs) {
      let d2 = `M${n(segs[0].p0[0])} ${n(segs[0].p0[1])}`;
      for (const s of segs) {
        if (s.t === 'l') d2 += `L${n(s.p1[0])} ${n(s.p1[1])}`;
        else d2 += `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`;
      }
      out += closed ? d2 + 'Z' : d2;
    }
    vSrc = vSrc.replace(tag, tag.replace(/ d="[^"]+"/, ` d="${out}"`));
  }
  writeFileSync(`${DIR}/${name}.svg`, vSrc);
  console.log(name, { snapped });
}
