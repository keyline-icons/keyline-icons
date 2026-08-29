// Of the 363 that keep a curve, how many are actually damaged?
//
// A curve in a contour of its own is fine: a circle, a dot, a bell's body. The
// defect is a curve in the SAME contour as a fillet that was removed, because
// then one corner of that outline stays round while the rest goes sharp. Count
// contours, not files.
import { readFileSync, readdirSync } from 'node:fs';
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const par = (a, b) => { const la = Math.hypot(...a), lb = Math.hypot(...b); return la > 1e-6 && lb > 1e-6 && Math.abs((a[0]*b[1] - a[1]*b[0]) / (la*lb)) < 1e-2; };

function segsOf(d) {
  const runs = []; let segs = [], x = 0, y = 0, sx = 0, sy = 0;
  const flush = (c) => { if (segs.length) runs.push({ segs, closed: c }); segs = []; };
  for (const { cmd, args } of tokenize(d)) {
    const rel = cmd === cmd.toLowerCase(), U = cmd.toUpperCase();
    const ax = (i) => rel ? x + args[i] : args[i], ay = (i) => rel ? y + args[i] : args[i];
    if (U === 'M') { flush(false); x = ax(0); y = ay(1); sx = x; sy = y; }
    else if (U === 'L' || U === 'H' || U === 'V') {
      const nx = U === 'V' ? x : U === 'H' ? (rel ? x + args[0] : args[0]) : ax(0);
      const ny = U === 'H' ? y : U === 'V' ? (rel ? y + args[0] : args[0]) : ay(1);
      segs.push({ t: 'l', p0: [x, y], p1: [nx, ny] }); x = nx; y = ny;
    } else if (U === 'C') {
      const p3 = [ax(4), ay(5)];
      segs.push({ t: 'c', p0: [x, y], p1: [ax(0), ay(1)], p2: [ax(2), ay(3)], p3 }); x = p3[0]; y = p3[1];
    } else if (U === 'Z') { if (x !== sx || y !== sy) segs.push({ t: 'l', p0: [x, y], p1: [sx, sy] }); flush(true); x = sx; y = sy; }
    else { flush(false); }
  }
  flush(false); return runs;
}

let clean = 0, mixed = 0, curvesOnly = 0, none = 0;
const mixedNames = [];
for (const file of readdirSync(K).filter((f) => f.endsWith('.svg'))) {
  const src = readFileSync(`${K}/${file}`, 'utf8');
  let anyMixed = false, anyKept = false, anyRemoved = false;
  for (const m of src.matchAll(/ d="([^"]+)"/g)) {
    for (const { segs, closed } of segsOf(m[1])) {
      let rem = 0, kept = 0;
      const n = segs.length;
      for (let i = 0; i < n; i++) {
        const cur = segs[i]; if (cur.t !== 'c') continue;
        const prev = segs[(i-1+n)%n], next = segs[(i+1)%n];
        const edge = !closed && (i === 0 || i === n-1);
        if (edge || prev.t !== 'l' || next.t !== 'l') { kept++; continue; }
        const u = [cur.p1[0]-cur.p0[0], cur.p1[1]-cur.p0[1]], v = [cur.p3[0]-cur.p2[0], cur.p3[1]-cur.p2[1]];
        if (par(u, [prev.p1[0]-prev.p0[0], prev.p1[1]-prev.p0[1]]) && par(v, [next.p1[0]-next.p0[0], next.p1[1]-next.p0[1]])) rem++;
        else kept++;
      }
      if (rem && kept) anyMixed = true;
      if (kept) anyKept = true;
      if (rem) anyRemoved = true;
    }
  }
  if (anyMixed) { mixed++; mixedNames.push(file.replace('.svg','')); }
  else if (anyKept && !anyRemoved) curvesOnly++;
  else if (anyKept) clean++;
  else none++;
}
console.log({
  total: clean + mixed + curvesOnly + none,
  mixedContour: mixed,
  curvesButNothingRemoved: curvesOnly,
  separateContours: clean,
  noCurvesAtAll: none,
});
console.log('\nmixed contour (a round corner left beside sharp ones):');
console.log(mixedNames.join(', '));
