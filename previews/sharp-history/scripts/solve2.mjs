// Second solve: hold the GLYPH instead of the envelope.
// The exclamation bar paints 11..13 and its top is at y=8, and the house rule
// is 2 units of painted daylight between elements, so the triangle's inner
// wall must be at x=9 there. Keep the painted width at 22 as before and let
// the apex paint wherever that forces.
const W = 1, yb = 21;
const inr = (b, h) => (b * h) / (b + Math.hypot(b, h));
const halfWidth = (b, h) => { const r = inr(b, h); return b * (r + W) / r; };
const innerAt = (b, h, y) => 12 - b * (y - (yb - h)) / h + Math.hypot(b, h) / h;
const apexPaint = (b, h) => { const r = inr(b, h), k = (r + W) / r, yi = yb - r; return yi + (yb - h - yi) * k; };

let b = 10, h = 20;
for (let i = 0; i < 300; i++) {
  let lo = 1, hi = 20;
  for (let j = 0; j < 90; j++) { const m = (lo + hi) / 2; (halfWidth(m, h) < 11 ? lo = m : hi = m); }
  b = (lo + hi) / 2;
  lo = 1; hi = 60;
  for (let j = 0; j < 90; j++) { const m = (lo + hi) / 2; (innerAt(b, m, 8) > 9 ? lo = m : hi = m); }
  h = (lo + hi) / 2;
}
const f = (v) => +v.toFixed(4);
console.log({ b: f(b), h: f(h), apexY: f(yb - h), corners: [f(12 - b), f(12 + b)] });
console.log('painted: x', [f(12 - halfWidth(b, h)), f(12 + halfWidth(b, h))], ' top y', f(apexPaint(b, h)), ' bottom y', yb + W);
console.log('clearance at the bar top:', f(11 - innerAt(b, h, 8)), 'units');
const half = Math.atan2(b, h);
console.log('apex angle', f(2 * half * 180 / Math.PI), 'deg; mitre', f(1 / Math.sin(half)));
console.log(`\npath: M12 ${f(yb - h)}L${f(12 - b)} ${yb}H${f(12 + b)}Z`);

// And the same question asked of the first solve, for the record.
const b1 = 9.3087, h1 = 16.925;
console.log('\nenvelope solve clearance at the bar top:', f(11 - innerAt(b1, h1, 8)), 'units');
