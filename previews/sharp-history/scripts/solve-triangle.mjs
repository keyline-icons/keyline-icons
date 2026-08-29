// Solve triangle-alert's sharp vertices so the PAINTED outline lands on the
// same envelope the rounded drawing paints: x 1..23, y 2..22.
//
// For a triangle, stroking with mitre joins offsets every edge outward by half
// the stroke width, and the outer boundary of that is the same triangle scaled
// about its incentre by (r+1)/r. So the painted box is exact, no sampling.
//
// Unknowns: half-base b and height h, with the base line fixed so the painted
// bottom stays at 22 (yb = 21, since a horizontal edge paints one unit below).
const W = 1;                 // half the house stroke width
const TARGET = { top: 2, bottom: 22, halfWidth: 11 };
const yb = TARGET.bottom - W;

const inradius = (b, h) => (b * h) / (b + Math.hypot(b, h));

function painted(b, h) {
  const r = inradius(b, h), k = (r + W) / r;
  const yi = yb - r;                    // incentre sits r above the base
  return {
    top: yi + (yb - h - yi) * k,        // apex, scaled about the incentre
    bottom: yb + W,
    half: b * k,
    r,
  };
}

// Two equations, two unknowns; Newton on a 2x2 is overkill, bisect each in turn.
let b = 11, h = 19;
for (let i = 0; i < 200; i++) {
  // b: painted half-width -> 11
  let lo = 1, hi = 20;
  for (let j = 0; j < 80; j++) { const m = (lo + hi) / 2; (painted(m, h).half < TARGET.halfWidth ? lo = m : hi = m); }
  b = (lo + hi) / 2;
  // h: painted apex -> 2
  lo = 1; hi = 30;
  for (let j = 0; j < 80; j++) { const m = (lo + hi) / 2; (painted(b, m).top > TARGET.top ? lo = m : hi = m); }
  h = (lo + hi) / 2;
}
const p = painted(b, h);
const ya = yb - h;
console.log({ b: +b.toFixed(4), h: +h.toFixed(4), apexY: +ya.toFixed(4), baseY: yb,
  cornersX: [+(12 - b).toFixed(4), +(12 + b).toFixed(4)], inradius: +p.r.toFixed(4) });
console.log('painted box:', { x: [+(12 - p.half).toFixed(4), +(12 + p.half).toFixed(4)], y: [+p.top.toFixed(4), +p.bottom.toFixed(4)] });

// Apex interior angle, to check the mitre against the default limit of 4.
const half = Math.atan2(b, h);
const miter = 1 / Math.sin(half);
console.log('apex interior angle:', +(2 * half * 180 / Math.PI).toFixed(2), 'deg; mitre ratio', +miter.toFixed(3),
  miter <= 4 ? '(inside the default limit)' : '(EXCEEDS the default limit)');
const baseAngle = Math.PI / 2 - half;
console.log('base corner angle:', +(baseAngle * 180 / Math.PI).toFixed(2), 'deg; mitre ratio', +(1 / Math.sin(baseAngle / 2)).toFixed(3));

const f = (v) => +v.toFixed(4);
console.log(`\npath: M12 ${f(ya)}L${f(12 - b)} ${yb}H${f(12 + b)}Z`);
