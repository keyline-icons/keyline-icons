// Copied from tools/v8/halo.mjs (1.1.0 sparkle batch): sharpStar and the constants it
// needs, unchanged. The sharp star keeps his tip fillet (the round join) and takes
// each waist to the point where its two edges meet on the diagonal.
const T1 = [0.137312, -0.906532];
const T2 = [0.906532, -0.137312];
const D1 = norm([0.147024, 0.372728]);
function norm([x, y]) { const l = Math.hypot(x, y); return [x / l, y / l]; }
export const WAIST = (() => {
  // solve T1 + s D1 on x = -y
  const s = -(T1[0] + T1[1]) / (D1[0] + D1[1]);
  return [T1[0] + s * D1[0], T1[1] + s * D1[1]];
})();
const rot = ([x, y], k) => (k === 0 ? [x, y] : k === 1 ? [-y, x] : k === 2 ? [-x, -y] : [y, -x]);
export const fmt = (v) => { const s = (Math.round(v * 1e4) / 1e4).toFixed(4).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; };

/** The sharp star: tips keep his fillet (the round join), waists go to a point. */
export function sharpStar([cx, cy], R) {
  const f = fmt;
  const P = (p, k) => { const q = rot(p, k); return `${f(cx + q[0] * R)} ${f(cy + q[1] * R)}`; };
  // his tip fillet cubics, from star.mjs's Q
  const TIP = [
    [[0.962948, -0.11508], [1, -0.060612], [1, 0]],
    [[1, 0.060612], [0.962948, 0.11508], [0.906532, 0.137312]],
  ];
  let d = `M${P(T1, 0)}`;
  for (let k = 0; k < 4; k++) {
    d += `L${P(WAIST, k)}L${P(T2, k)}`;
    for (const seg of TIP) d += 'C' + seg.map((p) => P(p, k)).join(' ');
  }
  return `${d}Z`;
}
