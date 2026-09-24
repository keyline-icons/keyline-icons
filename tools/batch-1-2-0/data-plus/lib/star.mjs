// Copied from tools/v8/star.mjs (1.1.0 sparkle batch): his star, unchanged.
/**
 * The AI sparkle, read back off Zafar's own drawings in `refs/` (20 Sep 2026).
 *
 * It is NOT the set's `sparkleStar`: this one is fatter and much rounder, which
 * is what lets it read at R=2. Measured from his files, normalised by each
 * star's own half-extent, all 33 of them are one shape to 1e-6:
 *
 *   waist   0.5 R      (sparkleStar's default is 0.4)
 *   tip     fillet 0.1486 R, extreme ON R (the polygon vertex sits at 1.2546 R)
 *   waist   fillet 0.4419 R
 *
 * So the shape is stored as he drew it, at R=1 about the origin, and any size
 * is that scaled. He used R 2, 2.5, 3, 3.5 and 4, and no other, with centres on
 * the half unit. A cluster is two stars, three where the drawing has room.
 */
const round = (v, dp) => { const s = v.toFixed(dp).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; };
const f = (v) => round(Math.round(v * 1e4) / 1e4, 4);

// One quadrant, at R=1 about the origin, starting on the edge below the top tip
// and running clockwise: straight to the waist, the waist fillet, straight to
// the next tip, the tip fillet in two cubics. The other three are this rotated.
const Q = [
  ['L', [0.284336, -0.533804]],
  ['C', [0.329328, -0.419668], [0.419668, -0.329328], [0.533804, -0.284336]],
  ['L', [0.906532, -0.137312]],
  ['C', [0.962948, -0.11508], [1, -0.060612], [1, 0]],
  ['C', [1, 0.060612], [0.962948, 0.11508], [0.906532, 0.137312]],
];
const START = [0.137312, -0.906532];
const rot = ([x, y], k) => (k === 0 ? [x, y] : k === 1 ? [-y, x] : k === 2 ? [-x, -y] : [y, -x]);

/** The sparkle of half-extent `R` centred on `c`, as a closed filled path. */
export function star([cx, cy], R) {
  const P = (p, k) => { const q = rot(p, k); return `${f(cx + q[0] * R)} ${f(cy + q[1] * R)}`; };
  let d = `M${P(START, 0)}`;
  for (let k = 0; k < 4; k++) for (const [cmd, ...pts] of Q) d += cmd + pts.map((p) => P(p, k)).join(' ');
  return `${d}Z`;
}

/**
 * The same star at R=1 about the origin, carried to `dp` places. The Figma
 * payload scales THIS rather than shipping 52 path strings, and 4 places is
 * not enough to scale from: it drifts 2e-4, which is past the 1e-4 the file's
 * own comparisons call noise.
 */
export function unitStar(dp = 6) {
  const P = (p, k) => { const q = rot(p, k); return `${round(q[0], dp)} ${round(q[1], dp)}`; };
  let d = `M${P(START, 0)}`;
  for (let k = 0; k < 4; k++) for (const [cmd, ...pts] of Q) d += cmd + pts.map((p) => P(p, k)).join(' ');
  return `${d}Z`;
}

/** A cluster: `[[x, y, R], ...]`, biggest first is how he writes them. */
export const stars = (list) => list.map(([x, y, R]) => star([x, y], R));
export const solid = (d) => `<path d="${d}" fill="black"/>`;
