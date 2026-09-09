// Offsetting a closed path of free cubics, so a hand-drawn body can have a plate.
// Lifted into the repository from the icon-system skill, which is gitignored: a
// generator that imports out of `.claude/skills/` is a generator nobody else can
// run. `flame` is the one drawing here that needs it — its tongue is two free
// cubics, and the offset of a cubic is not a cubic, so this approximates and
// then `verify()` checks every sample sits `delta` from the original.

// and is trimmed to the crossing.
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const len = (a) => Math.hypot(a[0], a[1]);
const unit = (a) => mul(a, 1 / (len(a) || 1));
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
const f = (v) => { const s = (Math.round(v * 1e4) / 1e4).toFixed(4).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; };
const P = (p) => `${f(p[0])} ${f(p[1])}`;

const bez = (s, t) => {
  const [p0, p1, p2, p3] = s, u = 1 - t;
  return [u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
          u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1]];
};
const bezT = (s, t) => {
  const [p0, p1, p2, p3] = s, u = 1 - t;
  const d = [3*u*u*(p1[0]-p0[0]) + 6*u*t*(p2[0]-p1[0]) + 3*t*t*(p3[0]-p2[0]),
             3*u*u*(p1[1]-p0[1]) + 6*u*t*(p2[1]-p1[1]) + 3*t*t*(p3[1]-p2[1])];
  return len(d) > 1e-9 ? unit(d) : unit(sub(p3, p0));
};
/** Outward normal for a clockwise-on-screen ring: the left normal of travel. */
const nrm = (t, cw) => (cw ? [t[1], -t[0]] : [-t[1], t[0]]);

/** Walk a `d` of M/L/C/Z into one closed run of segments. */
export function parse(d) {
  const toks = d.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
  const segs = [];
  let i = 0, cmd = null, cur = null, start = null;
  const n = () => parseFloat(toks[i++]);
  while (i < toks.length) {
    if (/^[MLCZ]$/i.test(toks[i])) cmd = toks[i++].toUpperCase();
    if (cmd === 'M') { cur = [n(), n()]; start = cur; cmd = 'L'; }
    else if (cmd === 'L') { const p = [n(), n()]; segs.push({ line: [cur, p] }); cur = p; }
    else if (cmd === 'C') { const a = [n(), n()], b = [n(), n()], e = [n(), n()]; segs.push({ cubic: [cur, a, b, e] }); cur = e; }
    else if (cmd === 'Z') { if (len(sub(cur, start)) > 1e-9) segs.push({ line: [cur, start] }); cur = start; }
    else i++;
  }
  return segs;
}
const signedArea = (segs) => {
  let a = 0;
  for (const s of segs) {
    const pts = s.line ? [s.line[0], s.line[1]] : Array.from({ length: 9 }, (_, k) => bez(s.cubic, k / 8));
    for (let i = 0; i < pts.length - 1; i++) a += pts[i][0] * pts[i + 1][1] - pts[i + 1][0] * pts[i][1];
  }
  return a / 2;
};

/**
 * One offset segment. A line moves along its normal. A cubic keeps its two
 * endpoint tangents and has its handle lengths re-solved so the offset curve
 * passes through the offset MIDPOINT — which is what keeps the error at 1e-3
 * rather than the 1e-1 that offsetting the control points alone gives.
 */
function offsetSeg(s, d, cw) {
  if (s.line) {
    const t = unit(sub(s.line[1], s.line[0])), nv = mul(nrm(t, cw), d);
    return { line: [add(s.line[0], nv), add(s.line[1], nv)], t0: t, t1: t };
  }
  const c = s.cubic;
  const t0 = bezT(c, 0), t1 = bezT(c, 1);
  const q0 = add(c[0], mul(nrm(t0, cw), d));
  const q3 = add(c[3], mul(nrm(bezT(c, 1), cw), d));
  const mid = add(bez(c, 0.5), mul(nrm(bezT(c, 0.5), cw), d));
  // A cubic with endpoints q0,q3 and tangents t0,t1 has
  //   B(0.5) = (q0 + q3)/2 + 3/8*(h0*t0 - h1*t1)
  // so the two handle lengths follow from one 2x2 solve against the offset
  // midpoint. Offsetting the control points instead leaves an error two orders
  // of magnitude larger, which `verify` catches.
  const rhs = mul(sub(mid, mul(add(q0, q3), 0.5)), 8 / 3);
  const A = t0, B = mul(t1, -1);
  const det = cross(A, B);
  let h0, h1;
  if (Math.abs(det) > 1e-9) { h0 = cross(rhs, B) / det; h1 = cross(A, rhs) / det; }
  else { h0 = len(sub(c[1], c[0])); h1 = len(sub(c[3], c[2])); }
  const lo = len(sub(c[3], c[0])) * 2;
  if (!(h0 > 0) || h0 > lo) h0 = len(sub(c[1], c[0]));
  if (!(h1 > 0) || h1 > lo) h1 = len(sub(c[3], c[2]));
  return { cubic: [q0, add(q0, mul(t0, h0)), sub(q3, mul(t1, h1)), q3], t0, t1 };
}

/** The offset ring, with arcs at convex corners and trims at reflex ones. */
export function offsetPath(d, delta) {
  const segs = parse(d);
  const cw = signedArea(segs) > 0;
  const off = segs.map((s) => offsetSeg(s, delta, cw));
  const out = [];
  const endOf = (o) => (o.line ? o.line[1] : o.cubic[3]);
  const startOf = (o) => (o.line ? o.line[0] : o.cubic[0]);
  const emit = (o) => (o.line ? `L${P(o.line[1])}` : `C${P(o.cubic[1])} ${P(o.cubic[2])} ${P(o.cubic[3])}`);
  let dd = `M${P(startOf(off[0]))}`;
  for (let i = 0; i < off.length; i++) {
    dd += emit(off[i]);
    const nx = off[(i + 1) % off.length];
    const turn = cross(off[i].t1, nx.t0);
    const gap = len(sub(startOf(nx), endOf(off[i])));
    if (gap < 1e-4) continue;
    const convex = cw ? turn > 0 : turn < 0;
    if (convex) {
      // An arc of the offset radius about the ORIGINAL vertex closes the gap.
      const v = segs[i].line ? segs[i].line[1] : segs[i].cubic[3];
      const a0 = Math.atan2(endOf(off[i])[1] - v[1], endOf(off[i])[0] - v[0]);
      let a1 = Math.atan2(startOf(nx)[1] - v[1], startOf(nx)[0] - v[0]);
      while (a1 - a0 > Math.PI) a1 -= 2 * Math.PI;
      while (a1 - a0 < -Math.PI) a1 += 2 * Math.PI;
      // Split on the cardinals rather than emitting the whole turn as one
      // cubic. A join can sweep most of a half turn — the flame's tip does —
      // and one cubic over that arc passes 0.003 inside the circle it stands
      // for, which is a plate 0.003 short of the ink and a PADDING error on a
      // drawing that measures exactly 1.
      const R = Math.abs(delta), q = Math.PI / 2;
      const stops = [a0];
      const dir = a1 > a0 ? 1 : -1;
      for (let m = Math.ceil(Math.min(a0, a1) / q) * q; m <= Math.max(a0, a1) + 1e-12; m += q)
        if (Math.abs(m - a0) > 1e-9 && Math.abs(m - a1) > 1e-9) stops.push(m);
      stops.push(a1);
      stops.sort((x, y) => (dir > 0 ? x - y : y - x));
      for (let m = 0; m + 1 < stops.length; m++) {
        const s0 = stops[m], s1 = stops[m + 1];
        if (Math.abs(s1 - s0) < 1e-9) continue;
        const k = (4 / 3) * Math.tan((s1 - s0) / 4) * R;
        const q0 = [v[0] + R * Math.cos(s0), v[1] + R * Math.sin(s0)];
        const q1 = [v[0] + R * Math.cos(s1), v[1] + R * Math.sin(s1)];
        dd += `C${P([q0[0] - Math.sin(s0) * k, q0[1] + Math.cos(s0) * k])} ${P([q1[0] + Math.sin(s1) * k, q1[1] - Math.cos(s1) * k])} ${P(q1)}`;
      }
    } else {
      dd += `L${P(startOf(nx))}`;         // reflex: run to the crossing
    }
  }
  return dd + 'Z';
}

/** Every sampled point of the offset must sit `delta` from the original. */
export function verify(orig, offs, delta, tol = 0.03) {
  const os = parse(orig), fs = parse(offs);
  const pts = (segs, n) => segs.flatMap((s) => Array.from({ length: n }, (_, k) =>
    s.line ? [s.line[0][0] + (s.line[1][0] - s.line[0][0]) * k / n, s.line[0][1] + (s.line[1][1] - s.line[0][1]) * k / n] : bez(s.cubic, k / n)));
  const A = pts(os, 24), B = pts(fs, 24);
  let worst = 0;
  for (const b of B) {
    let m = Infinity;
    for (const a of A) m = Math.min(m, len(sub(a, b)));
    worst = Math.max(worst, Math.abs(m - Math.abs(delta)));
  }
  return { worst, ok: worst <= tol };
}
