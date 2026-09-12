/**
 * Reading a handed-over drawing as lines and circular arcs.
 *
 * Zafar's three refs of 12 Sep 2026 are drawn with r=1 fillets and, on the
 * plane, two big nose arcs; every cubic in them fits a circle to better than
 * 0.004, so the whole drawing can be read back as the lines-and-arcs form
 * `tools/v5/offset.mjs` offsets exactly. That is what lets his stroke ship
 * byte-for-byte while the plate is still a verified offset rather than an
 * approximation of one.
 */
export function tokenize(d) { return d.match(/[MLCZHV]|-?\d*\.?\d+(?:e-?\d+)?/gi) || []; }

/** His `d` as subpaths of {type:'L'|'A'} segments, cubics fitted to arcs. */
export function readSubpaths(d, tol = 0.01) {
  const t = tokenize(d);
  let i = 0, cur = null, start = null;
  const subs = []; let segs = null;
  const push = (s) => segs.push(s);
  while (i < t.length) {
    const c = t[i++];
    if (c === 'M') { if (segs && segs.length) subs.push(segs); cur = [+t[i++], +t[i++]]; start = cur; segs = []; }
    else if (c === 'L') { const p = [+t[i++], +t[i++]]; push({ type: 'L', p0: cur, p1: p }); cur = p; }
    else if (c === 'H') { const p = [+t[i++], cur[1]]; push({ type: 'L', p0: cur, p1: p }); cur = p; }
    else if (c === 'V') { const p = [cur[0], +t[i++]]; push({ type: 'L', p0: cur, p1: p }); cur = p; }
    else if (c === 'C') {
      const c1 = [+t[i++], +t[i++]], c2 = [+t[i++], +t[i++]], p = [+t[i++], +t[i++]];
      push(arcOf({ a: cur, c1, c2, b: p }, tol)); cur = p;
    } else if (c === 'Z' || c === 'z') { if (Math.hypot(cur[0] - start[0], cur[1] - start[1]) > 1e-9) push({ type: 'L', p0: cur, p1: start }); cur = start; }
  }
  if (segs && segs.length) subs.push(segs);
  return subs;
}

const at = (s, u) => {
  const v = 1 - u;
  return [0, 1].map((k) => v * v * v * s.a[k] + 3 * v * v * u * s.c1[k] + 3 * v * u * u * s.c2[k] + u * u * u * s.b[k]);
};
const deg = (r) => (r * 180) / Math.PI;

/** A cubic as a circular arc, or a throw if it is not one. */
export function arcOf(s, tol = 0.01) {
  const P = [at(s, 0), at(s, 0.5), at(s, 1)];
  const [x1, y1] = P[0], [x2, y2] = P[1], [x3, y3] = P[2];
  const a = x1 * (y2 - y3) - y1 * (x2 - x3) + x2 * y3 - x3 * y2;
  if (Math.abs(a) < 1e-9) throw new Error('cubic is straight, not an arc');
  const b = (x1 * x1 + y1 * y1) * (y3 - y2) + (x2 * x2 + y2 * y2) * (y1 - y3) + (x3 * x3 + y3 * y3) * (y2 - y1);
  const c = (x1 * x1 + y1 * y1) * (x2 - x3) + (x2 * x2 + y2 * y2) * (x3 - x1) + (x3 * x3 + y3 * y3) * (x1 - x2);
  const C = [-b / (2 * a), -c / (2 * a)];
  const r = Math.hypot(x1 - C[0], y1 - C[1]);
  let worst = 0;
  for (let k = 0; k <= 40; k++) { const q = at(s, k / 40); worst = Math.max(worst, Math.abs(Math.hypot(q[0] - C[0], q[1] - C[1]) - r)); }
  if (worst > tol) throw new Error(`cubic is not an arc: off by ${worst.toFixed(4)}`);
  let a0 = deg(Math.atan2(s.a[1] - C[1], s.a[0] - C[0]));
  let a1 = deg(Math.atan2(s.b[1] - C[1], s.b[0] - C[0]));
  // the short way round: a fillet never sweeps more than half a turn
  while (a1 - a0 > 180) a1 -= 360;
  while (a0 - a1 > 180) a1 += 360;
  return { type: 'A', c: C, r, a0, a1 };
}

/** Where two lines through segments cross, for recovering a filleted vertex. */
export function lineCross(s1, s2) {
  const d1 = [s1.p1[0] - s1.p0[0], s1.p1[1] - s1.p0[1]];
  const d2 = [s2.p1[0] - s2.p0[0], s2.p1[1] - s2.p0[1]];
  const den = d1[0] * d2[1] - d1[1] * d2[0];
  if (Math.abs(den) < 1e-12) return null;
  const t = ((s2.p0[0] - s1.p0[0]) * d2[1] - (s2.p0[1] - s1.p0[1]) * d2[0]) / den;
  return [s1.p0[0] + d1[0] * t, s1.p0[1] + d1[1] * t];
}

/**
 * The polygon behind a run: every `L A L` becomes one vertex, so a drawing can
 * be re-emitted at another radius (sharp wants zero) from the same skeleton.
 */
export function skeletonOf(segs) {
  const pts = [{ p: segs[0].p0, r: 0 }];
  for (let k = 0; k < segs.length; k++) {
    const s = segs[k];
    if (s.type === 'L') {
      const next = segs[k + 1];
      // a line into a line is a plain vertex with the round join doing the
      // corner, which is what `tag`'s point and this plane's wing roots are
      if (!next) pts.push({ p: s.p1, r: 0 });
      else if (next.type === 'L') pts.push({ p: s.p1, r: 0 });
      continue;
    }
    const prev = segs[k - 1], next = segs[k + 1];
    if (prev && prev.type === 'L' && next && next.type === 'L') pts.push({ p: lineCross(prev, next), r: s.r, arc: s });
    else pts.push({ p: null, r: s.r, arc: s, keep: true });   // a free arc, not a fillet
  }
  return pts;
}

/**
 * The same skeleton with every fillet taken out, and each vertex pulled in
 * along its own bisector so the TRUE POINT paints where the fillet's arc did.
 *
 * A fillet of radius r at a vertex of half-angle phi sits its centre
 * `r / sin phi` inside, so the rounded drawing's painted extreme is
 * `r + 1 - r/sin phi` outside the vertex, while a sharp corner's round join
 * paints a full unit outside it. Pulling the vertex in by the difference makes
 * the two treatments paint the same box by construction, which is what the
 * house asks for and what a bare de-fillet breaks: the plane's wingtip alone
 * would otherwise stand 0.53 outside its rounded sibling.
 */
export function deFillet(pts) {
  return pts.map((q, i) => {
    if (!q.p || !q.r) return { ...q, r: 0 };
    const A = pts[i - 1] && pts[i - 1].p, B = pts[i + 1] && pts[i + 1].p;
    if (!A || !B) return { ...q, r: 0 };
    const u = norm([A[0] - q.p[0], A[1] - q.p[1]]);
    const w = norm([B[0] - q.p[0], B[1] - q.p[1]]);
    const half = Math.acos(Math.max(-1, Math.min(1, u[0] * w[0] + u[1] * w[1]))) / 2;
    const pull = q.r / Math.sin(half) - q.r;
    const bis = norm([u[0] + w[0], u[1] + w[1]]);            // points INTO the shape
    return { p: [q.p[0] + bis[0] * pull, q.p[1] + bis[1] * pull], r: 0 };
  });
}
const norm = (v) => { const L = Math.hypot(v[0], v[1]); return [v[0] / L, v[1] / L]; };
