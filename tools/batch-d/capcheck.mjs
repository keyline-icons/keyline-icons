import { add, sub, mul, unit, len } from '../v5/geom.mjs';
const bezAt = (k, t) => { const u = 1 - t; return [0, 1].map((i) => u*u*u*k[0][i] + 3*u*u*t*k[1][i] + 3*u*t*t*k[2][i] + t*t*t*k[3][i]); };
const bezTan = (k, t) => { const u = 1 - t; return unit([0, 1].map((i) => 3*u*u*(k[1][i]-k[0][i]) + 6*u*t*(k[2][i]-k[1][i]) + 3*t*t*(k[3][i]-k[2][i]))); };
const leftOf = (t) => [t[1], -t[0]];
const cross2 = (a, b) => a[0] * b[1] - a[1] * b[0];
function offsetCubic(k, d) {
  const t0 = unit(sub(k[1], k[0])), t1 = unit(sub(k[3], k[2]));
  const q0 = add(k[0], mul(leftOf(t0), d)), q3 = add(k[3], mul(leftOf(t1), d));
  const m = add(bezAt(k, 0.5), mul(leftOf(bezTan(k, 0.5)), d));
  const v = mul(sub(m, mul(add(q0, q3), 0.5)), 8 / 3);
  const nt1 = mul(t1, -1);
  const det = cross2(t0, nt1);
  return [q0, add(q0, mul(t0, cross2(v, nt1) / det)), sub(q3, mul(t1, cross2(t0, v) / det)), q3];
}
const K = [[16, 13], [16.5, 15.5], [15, 18], [12, 18]];
for (const d of [1, -1]) {
  const o = offsetCubic(K, d);
  let worst = 0, at = 0;
  for (let i = 0; i <= 40; i++) {
    const q = bezAt(o, i / 40);
    let m = Infinity;
    for (let j = 0; j <= 400; j++) m = Math.min(m, len(sub(q, bezAt(K, j / 400))));
    if (Math.abs(m - 1) > worst) { worst = Math.abs(m - 1); at = i / 40; }
  }
  console.log(`offset ${d > 0 ? '+1 (left)' : '-1 (right)'}: worst error ${worst.toFixed(4)} at t=${at.toFixed(2)}`);
  console.log('   handles', o.map((p) => p.map((v) => +v.toFixed(3)).join(',')).join('  '));
}
