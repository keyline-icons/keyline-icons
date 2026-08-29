// Third question: hold the top of the envelope (apex paints y=2) and the base
// (y=22), and let the triangle get WIDER until the bar clears by 2. How wide
// does it have to be, and does that still fit the canvas?
const W = 1, yb = 21;
const inr = (b, h) => (b * h) / (b + Math.hypot(b, h));
const halfWidth = (b, h) => { const r = inr(b, h); return b * (r + W) / r; };
const innerAt = (b, h, y) => 12 - b * (y - (yb - h)) / h + Math.hypot(b, h) / h;
const apexPaint = (b, h) => { const r = inr(b, h), k = (r + W) / r, yi = yb - r; return yi + (yb - h - yi) * k; };
const f = (v) => +v.toFixed(3);

let b = 10, h = 17;
for (let i = 0; i < 400; i++) {
  let lo = 1, hi = 40;                       // h so the apex paints at 2
  for (let j = 0; j < 90; j++) { const m = (lo + hi) / 2; (apexPaint(b, m) > 2 ? lo = m : hi = m); }
  h = (lo + hi) / 2;
  lo = 1; hi = 60;                           // b so the bar clears by 2
  for (let j = 0; j < 90; j++) { const m = (lo + hi) / 2; (innerAt(m, h, 8) > 9 ? hi = m : lo = m); }
  b = (lo + hi) / 2;
}
console.log('apex on the envelope, glyph clearing by 2:');
console.log({ b: f(b), h: f(h), apexY: f(yb - h) });
console.log('painted width', f(2 * halfWidth(b, h)), 'so x', [f(12 - halfWidth(b, h)), f(12 + halfWidth(b, h))]);
console.log('canvas is 24 wide:', 2 * halfWidth(b, h) <= 24 ? 'fits' : 'DOES NOT FIT');

// And the honest fallback: keep the envelope triangle, shrink the glyph to fit.
const b1 = 9.3087, h1 = 16.925, ya1 = 4.075;
const innerX = (y) => 12 - b1 * (y - ya1) / h1 + Math.hypot(b1, h1) / h1;
// A bar of half-width w paints 12±w; it needs innerX(top) <= 12 - w - 2.
for (const w of [1, 0.75, 0.5]) {
  let lo = ya1, hi = yb;
  for (let j = 0; j < 90; j++) { const m = (lo + hi) / 2; (innerX(m) > 12 - w - 2 ? lo = m : hi = m); }
  console.log(`bar ${2 * w} wide can start at y=${f(lo)}; floor for the dot is y=20`);
}
