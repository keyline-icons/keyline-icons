// Copied from tools/v8/c2/cutter.mjs (1.1.0 sparkle batch), imports pointed at this folder.
// Cut a base round a sparkle cluster the way his 59 drawings do: nothing of the
// base within 2 painted units of a star, and every cut end moved back to the
// next whole grid line (x or y an integer), so the stroke stops on the grid.
import { parse, at, segsToD } from './cut.mjs';
import { star } from './star.mjs';

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
export function slice(s, u0, u1) {
  if (s.t === 'L') return { t: 'L', p0: at(s, u0), p1: at(s, u1) };
  const split = (s, u) => { const [p0, c1, c2, p1] = [s.p0, s.c1, s.c2, s.p1];
    const a = add(p0, mul(sub(c1, p0), u)), b = add(c1, mul(sub(c2, c1), u)), c = add(c2, mul(sub(p1, c2), u));
    const d = add(a, mul(sub(b, a), u)), e = add(b, mul(sub(c, b), u)), g = add(d, mul(sub(e, d), u));
    return [{ t: 'C', p0, c1: a, c2: d, p1: g }, { t: 'C', p0: g, c1: e, c2: c, p1 }]; };
  const r = u0 > 1e-12 ? split(s, u0)[1] : s;
  return u1 < 1 - 1e-12 ? split(r, (u1 - u0) / (1 - u0))[0] : r;
}
export const polyOf = (d, per = 24) => parse(d).map((s) => { const q = [s.start]; for (const g of s.segs) { const k = g.t === 'L' ? 1 : per; for (let i = 1; i <= k; i++) q.push(at(g, i / k)); } return q; });
function segDist(p, a, b) { const ab = sub(b, a), L2 = ab[0] ** 2 + ab[1] ** 2; const u = L2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * ab[0] + (p[1] - a[1]) * ab[1]) / L2)) : 0; return Math.hypot(...sub(p, add(a, mul(ab, u)))); }
function inPoly(p, q) { let w = false; for (let i = 0, j = q.length - 1; i < q.length; j = i++) { const a = q[i], b = q[j]; if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) w = !w; } return w; }
/** Distance from p to a filled outline (0 inside). */
export function distTo(p, polys) { let m = Infinity; for (const q of polys) { if (inPoly(p, q)) return 0; for (let i = 0; i < q.length - 1; i++) m = Math.min(m, segDist(p, q[i], q[i + 1])); } return m; }
export const starPolys = (list) => list.map(({ c, R }) => polyOf(star(c, R), 16)[0]).map((q) => [q]);

const onGrid = (v) => Math.abs(v - Math.round(v)) < 1e-6;
/**
 * cut(strokesD, stars) -> { d, ends } : strokes minus everything within `air`
 * painted units of a star (centre line within air + 1), ends snapped back to the
 * grid, runs shorter than `keep` dropped.
 */
/** The house sharp stub for a formerly round-capped free end: k = (1 - sin t)/cos t along the tangent, t off the nearer axis. */
function stubAt(segs) {
  const g = segs.at(-1), e = g.p1;
  let v = g.t === 'L' ? sub(g.p1, g.p0) : sub(g.p1, g.c2);
  if (Math.hypot(...v) < 1e-9 && g.t === 'C') v = sub(g.p1, g.c1);
  const l = Math.hypot(...v); v = [v[0] / l, v[1] / l];
  const a = Math.atan2(Math.abs(v[1]), Math.abs(v[0])), t = Math.min(a, Math.PI / 2 - a);
  const k = (1 - Math.sin(t)) / Math.cos(t);
  const p1 = [e[0] + v[0] * k, e[1] + v[1] * k];
  // a straight run carries on as one segment
  if (g.t === 'L') return [...segs.slice(0, -1), { t: 'L', p0: g.p0, p1 }];
  return [...segs, { t: 'L', p0: e, p1 }];
}
export function cut(strokesD, stars, { air = 2, keep = 1.5, snapMax = 1.6, box = 3, stub = false } = {}) {
  const SP = starPolys(stars);
  // the lead star (first) also clears a square of half-side R + box round its centre, as his corner cuts do
  const L0 = stars[0], H = box == null ? -1 : L0.R + box;
  const inBox = (p) => Math.abs(p[0] - L0.c[0]) < H - 1e-9 && Math.abs(p[1] - L0.c[1]) < H - 1e-9;
  const near = (p) => SP.some((P) => distTo(p, P) < air + 1 - 1e-9);
  // the box is for a star seated ON the stroke (its ink overlapping the line), as his corner seats are;
  // a star that only comes near a line gets the plain cut
  const nearLead = (p) => distTo(p, SP[0]) < 1 - 1e-9;
  const runs = []; // kept runs: arrays of segs, with flags for which ends were cut
  for (const sp of parse(strokesD)) {
    // the box clears only a subpath the lead star itself touches
    let touched = false;
    for (const g of sp.segs) { const k = g.t === 'L' ? Math.max(4, Math.ceil(Math.hypot(...sub(g.p1, g.p0)) / 0.05)) : 80; for (let i = 0; i <= k && !touched; i++) if (nearLead(at(g, i / k))) touched = true; if (touched) break; }
    const bad = (p) => (touched && inBox(p)) || near(p);
    let cur = null;
    const local = [];
    const close = (cutEnd) => { if (cur) { cur.cutEnd = cutEnd; local.push(cur); cur = null; } };
    for (const g of sp.segs) {
      const L = g.t === 'L' ? Math.hypot(...sub(g.p1, g.p0)) : 12;
      const k = Math.max(8, Math.ceil(L / 0.02));
      const B = []; for (let i = 0; i <= k; i++) B.push(bad(at(g, i / k)));
      // transitions refined by bisection
      const edge = (i) => { let lo = (i - 1) / k, hi = i / k; const b0 = B[i - 1]; for (let t = 0; t < 40; t++) { const m = (lo + hi) / 2; if (bad(at(g, m)) === b0) lo = m; else hi = m; } return (lo + hi) / 2; };
      let u = 0, state = B[0];
      if (!state && !cur) cur = { segs: [], cutStart: false };
      for (let i = 1; i <= k; i++) if (B[i] !== state) {
        const e = edge(i);
        if (!state) { cur.segs.push(slice(g, u, e)); close(true); }
        else { cur = { segs: [], cutStart: true }; }
        u = e; state = B[i];
      }
      if (!state) { if (!cur) cur = { segs: [], cutStart: true }; cur.segs.push(slice(g, u, 1)); }
    }
    if (cur) close(false);
    // a closed subpath whose first and last runs meet at the start point is one run
    if (sp.closed && local.length >= 2 && !local[0].cutStart && !local.at(-1).cutEnd) {
      const last = local.pop();
      local[0] = { segs: [...last.segs, ...local[0].segs], cutStart: last.cutStart, cutEnd: local[0].cutEnd };
    }
    // an uncut closed subpath stays closed (a lost Z leaves a notch at the start corner under butt caps)
    if (sp.closed && local.length === 1 && !local[0].cutStart && !local[0].cutEnd) local[0].closed = true;
    runs.push(...local);
  }
  // snap each cut end back to the next grid line within snapMax of arc length
  const out = [];
  for (const r of runs) {
    let segs = r.segs.filter((s) => s.t === 'C' || Math.hypot(...sub(s.p1, s.p0)) > 1e-9);
    if (!segs.length) continue;
    if (r.cutEnd) segs = snapEnd(segs, snapMax);
    if (segs && r.cutStart) segs = rev(snapEnd(rev(segs), snapMax));
    if (!segs || !segs.length) continue;
    segs = segs.filter((g) => segLen(g) > 1e-4); // a snap landing on a joint leaves a zero-length piece
    if (!segs.length || len(segs) < keep) continue;
    if (stub && r.cutEnd) segs = stubAt(segs);
    if (stub && r.cutStart) segs = rev(stubAt(rev(segs)));
    segs.closed = r.closed;
    out.push(segs);
  }
  return { d: out.map((g) => segsToD(g) + (g.closed ? 'Z' : '')).join(''), runs: out };
}
const rev = (segs) => segs && segs.slice().reverse().map((s) => (s.t === 'L' ? { t: 'L', p0: s.p1, p1: s.p0 } : { t: 'C', p0: s.p1, c1: s.c2, c2: s.c1, p1: s.p0 }));
const segLen = (s) => { if (s.t === 'L') return Math.hypot(...sub(s.p1, s.p0)); let l = 0, p = s.p0; for (let i = 1; i <= 32; i++) { const q = at(s, i / 32); l += Math.hypot(...sub(q, p)); p = q; } return l; };
const len = (segs) => segs.reduce((a, s) => a + segLen(s), 0);
/** Walk back from the last point of `segs` to the first whole grid crossing. */
function snapEnd(segs, max) {
  const last = segs.at(-1), end = last.p1;
  const t = (() => { const a = at(last, 0.999), v = sub(end, a), l = Math.hypot(...v) || 1; return [Math.abs(v[0] / l), Math.abs(v[1] / l)]; })();
  // on the grid only in a coordinate that moves along the stroke
  if ((t[0] > 0.3 && onGrid(end[0])) || (t[1] > 0.3 && onGrid(end[1]))) return segs;
  let walked = 0;
  for (let j = segs.length - 1; j >= 0; j--) {
    const s = segs[j], n = 400;
    let prev = at(s, 1);
    for (let i = n - 1; i >= 0; i--) {
      const u = i / n, p = at(s, u);
      walked += Math.hypot(...sub(p, prev));
      if (walked > max) return segs;
      const cx = Math.floor(prev[0] + 1e-9) !== Math.floor(p[0] + 1e-9), cy = Math.floor(prev[1] + 1e-9) !== Math.floor(p[1] + 1e-9);
      if (cx || cy) {
        // refine to the crossing
        const tgt = cx ? [0, Math.abs(p[0] - Math.round(p[0])) < Math.abs(prev[0] - Math.round(prev[0])) ? Math.round(p[0]) : Math.round(prev[0])] : [1, Math.abs(p[1] - Math.round(p[1])) < Math.abs(prev[1] - Math.round(prev[1])) ? Math.round(p[1]) : Math.round(prev[1])];
        let lo = u, hi = (i + 1) / n; const f = (w) => at(s, w)[tgt[0]] - tgt[1];
        const flo = f(lo);
        for (let t = 0; t < 50; t++) { const m = (lo + hi) / 2; if (Math.sign(f(m)) === Math.sign(flo) && Math.abs(flo) > 1e-12) lo = m; else hi = m; }
        const w = Math.abs(f(lo)) < Math.abs(f(hi)) ? lo : hi;
        const kept = segs.slice(0, j);
        if (w > 1e-9) kept.push(slice(s, 0, w));
        // exact grid value on the end point
        const last = kept.at(-1); if (last) last.p1 = tgt[0] === 0 ? [tgt[1], last.p1[1]] : [last.p1[0], tgt[1]];
        return kept;
      }
      prev = p;
    }
  }
  return segs;
}
