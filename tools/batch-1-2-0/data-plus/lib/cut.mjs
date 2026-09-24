// Copied from tools/v8/cut.mjs (1.1.0 sparkle batch): parse, at, segsToD for the cutter.
/**
 * Opening a base around the AI sparkle cluster.
 *
 * Every drawing in `refs/` is the shipped base with its ink cut back to two
 * painted units from the cluster (measured: 2.05 on eleven of them), so the cut
 * is not a judgement, it is that number. This does it exactly rather than by
 * eye: the base's centre line is split where it comes within 1 + 2 of the
 * cluster's outline, and a cubic split by de Casteljau is still the same cubic,
 * so nothing is flattened and no arc sags.
 *
 * `H`/`V` shorthand is expanded on the way through, which is why a trimmed path
 * reads longer than the base it came from.
 */
const f = (v) => { const s = (Math.round(v * 1e4) / 1e4).toFixed(4).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; };
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const len = (a) => Math.hypot(a[0], a[1]);

/** A path string as subpaths of L and C segments. */
export function parse(d) {
  const t = d.match(/[MLCHVZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
  let i = 0, c, cur = [0, 0], start = [0, 0];
  const subs = []; let s = null;
  const n = () => +t[i++];
  while (i < t.length) {
    if (/^[MLCHVZ]$/i.test(t[i])) c = t[i++].toUpperCase();
    if (c === 'M') { cur = [n(), n()]; start = cur; s = { start: cur, segs: [], closed: false }; subs.push(s); c = 'L'; }
    else if (c === 'L' || c === 'H' || c === 'V') {
      const p = c === 'L' ? [n(), n()] : c === 'H' ? [n(), cur[1]] : [cur[0], n()];
      if (len(sub(p, cur)) > 1e-9) s.segs.push({ t: 'L', p0: cur, p1: p });
      cur = p;
    } else if (c === 'C') { const c1 = [n(), n()], c2 = [n(), n()], p = [n(), n()]; s.segs.push({ t: 'C', p0: cur, c1, c2, p1: p }); cur = p; }
    else if (c === 'Z') { if (len(sub(cur, start)) > 1e-9) s.segs.push({ t: 'L', p0: cur, p1: start }); s.closed = true; cur = start; }
    else i++;
  }
  return subs;
}
export const at = (s, u) => {
  if (s.t === 'L') return add(s.p0, mul(sub(s.p1, s.p0), u));
  const v = 1 - u;
  return [v*v*v*s.p0[0] + 3*v*v*u*s.c1[0] + 3*v*u*u*s.c2[0] + u*u*u*s.p1[0],
          v*v*v*s.p0[1] + 3*v*v*u*s.c1[1] + 3*v*u*u*s.c2[1] + u*u*u*s.p1[1]];
};
/** de Casteljau: a cubic's part is a cubic, so a split loses nothing. */
function slice(s, u0, u1) {
  if (s.t === 'L') return { t: 'L', p0: at(s, u0), p1: at(s, u1) };
  const right = (s, u) => { // the part after u
    const [p0, c1, c2, p1] = [s.p0, s.c1, s.c2, s.p1];
    const a = add(p0, mul(sub(c1, p0), u)), b = add(c1, mul(sub(c2, c1), u)), c = add(c2, mul(sub(p1, c2), u));
    const d = add(a, mul(sub(b, a), u)), e = add(b, mul(sub(c, b), u));
    const g = add(d, mul(sub(e, d), u));
    return { t: 'C', p0: g, c1: e, c2: c, p1 };
  };
  const left = (s, u) => {
    const [p0, c1, c2, p1] = [s.p0, s.c1, s.c2, s.p1];
    const a = add(p0, mul(sub(c1, p0), u)), b = add(c1, mul(sub(c2, c1), u)), c = add(c2, mul(sub(p1, c2), u));
    const d = add(a, mul(sub(b, a), u)), e = add(b, mul(sub(c, b), u));
    const g = add(d, mul(sub(e, d), u));
    return { t: 'C', p0, c1: a, c2: d, p1: g };
  };
  return left(right(s, u0), (u1 - u0) / (1 - u0));
}
/** Sample a path string as a closed polyline (the cluster's own outline). */
export function polyline(d, per = 28) {
  const pts = [];
  for (const s of parse(d)) for (const g of s.segs) {
    const k = g.t === 'L' ? 1 : per;
    for (let i = 0; i < k; i++) pts.push(at(g, i / k));
  }
  return pts;
}
const distTo = (poly, p) => {
  let m = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const ab = sub(b, a), L2 = ab[0]*ab[0] + ab[1]*ab[1];
    const u = L2 ? Math.max(0, Math.min(1, ((p[0]-a[0])*ab[0] + (p[1]-a[1])*ab[1]) / L2)) : 0;
    m = Math.min(m, len(sub(p, add(a, mul(ab, u)))));
  }
  return m;
};
export function segsToD(segs) {
  let d = `M${f(segs[0].p0[0])} ${f(segs[0].p0[1])}`;
  let cur = segs[0].p0;
  for (const s of segs) {
    if (len(sub(s.p0, cur)) > 1e-7) d += `M${f(s.p0[0])} ${f(s.p0[1])}`;
    d += s.t === 'L' ? `L${f(s.p1[0])} ${f(s.p1[1])}`
      : `C${f(s.c1[0])} ${f(s.c1[1])} ${f(s.c2[0])} ${f(s.c2[1])} ${f(s.p1[0])} ${f(s.p1[1])}`;
    cur = s.p1;
  }
  return d;
}
/**
 * `d` cut back to `gap` painted units from the ink of `cluster` (a list of
 * closed path strings). `keep` drops surviving runs shorter than that, which is
 * what stops a cut corner leaving a floating crumb.
 */
export function trim(d, cluster, { gap = 2, half = 1, keep = 0.75 } = {}) {
  const polys = cluster.map((c) => polyline(c));
  const clear = (p) => Math.min(...polys.map((q) => distTo(q, p))) - (gap + half);
  const out = [];
  for (const sp of parse(d)) {
    const pieces = [];
    for (const g of sp.segs) {
      const ts = [];
      const steps = 120;
      for (let i = 0; i < steps; i++) {
        let a = i / steps, b = (i + 1) / steps;
        if (clear(at(g, a)) * clear(at(g, b)) < 0) {
          for (let k = 0; k < 60; k++) { const m = (a + b) / 2; if (clear(at(g, a)) * clear(at(g, m)) <= 0) b = m; else a = m; }
          ts.push((a + b) / 2);
        }
      }
      let u0 = 0;
      for (const u of ts) { pieces.push(slice(g, u0, u)); u0 = u; }
      pieces.push(slice(g, u0, 1));
    }
    // A closed subpath is a ring: rotate it so a run cut open is contiguous.
    const live = pieces.map((s) => clear(at(s, 0.5)) > 0);
    // a closed ring nothing cut stays closed: its start is a join, not two ends
    if (sp.closed && live.every(Boolean)) { out.push({ ring: pieces }); continue; }
    let order = pieces.map((_, i) => i);
    if (sp.closed && live[0] && live[live.length - 1]) {
      const k = live.lastIndexOf(false);
      if (k >= 0) order = [...order.slice(k + 1), ...order.slice(0, k + 1)];
    }
    let run = [];
    const flush = () => {
      if (!run.length) return;
      const L = run.reduce((a, s) => a + len(sub(s.p1, s.p0)), 0);
      if (L >= keep) out.push(run);
      run = [];
    };
    for (const i of order) { if (live[i]) run.push(pieces[i]); else flush(); }
    flush();
  }
  return out.map((r) => (r.ring ? segsToD(r.ring) + 'Z' : segsToD(r))).join('').replace(/^M/, 'M');
}
