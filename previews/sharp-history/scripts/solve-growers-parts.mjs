// Fix the size of a fill or a duotone without flattening the corner.
//
// The stroke set can clamp a vertex outright: a lone point moved in one axis is
// still a point. A fill cannot. Its corners are radius-1 arcs — the fill IS the
// painted boundary, and the painted boundary of a sharp stroke with the house
// round join is a radius-1 turn — so clamping the arc's coordinates squashes it
// into a flat segment. triangle-alert grew a lid that way.
//
// So translate the offending corner instead of squashing it. Every point that
// would fall outside the target moves by the same amount, which is the true
// overshoot of the curve, not of its control points. The corner keeps its shape
// exactly and the edges into it shift, which is what moving a vertex does on
// the stroke side too.
//
// Per PATH, against that path's own box in the rounded drawing: a duotone's
// tint and its stroke would otherwise each move by their own overshoot and come
// apart from one another.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { tokenize, pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';

const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const ds = (s) => [...s.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);

// axis: 0 = x, 1 = y. Move every point beyond `bound` by `delta`.
function shift(d, axis, bound, sign, delta) {
  const past = (v) => (sign > 0 ? v < bound - 1e-9 : v > bound + 1e-9);
  const f = (v) => (past(v) ? v + sign * delta : v);
  const X = axis === 0 ? f : (v) => v, Y = axis === 1 ? f : (v) => v;
  let out = '';
  for (const { cmd, args } of tokenize(d)) {
    const U = cmd.toUpperCase();
    if (U === 'M' || U === 'L') out += `${U}${n(X(args[0]))} ${n(Y(args[1]))}`;
    else if (U === 'H') out += `H${n(X(args[0]))}`;
    else if (U === 'V') out += `V${n(Y(args[0]))}`;
    else if (U === 'C') out += `C${n(X(args[0]))} ${n(Y(args[1]))} ${n(X(args[2]))} ${n(Y(args[3]))} ${n(X(args[4]))} ${n(Y(args[5]))}`;
    else if (U === 'Z') out += 'Z';
    else return null;
  }
  return out;
}

export function fitPath(d, T) {
  let cur = d;
  // two rounds: the first translation can expose a second corner on the same side
  for (let pass = 0; pass < 3; pass++) {
    let moved = false;
    for (const [axis, idx, sign] of [[0, 0, 1], [0, 2, -1], [1, 1, 1], [1, 3, -1]]) {
      const B = pathBBox(cur);
      if (!B) return cur;
      const over = sign > 0 ? T[idx] - B[idx] : B[idx] - T[idx];
      if (over <= 0.001) continue;
      const next = shift(cur, axis, T[idx], sign, over);
      if (next === null) return cur;
      cur = next; moved = true;
    }
    if (!moved) break;
  }
  return cur;
}

if (process.argv[1].endsWith('solve-growers-parts.mjs')) {
  const DIR = process.argv[2], ROUND = process.argv[3];
  let solved = 0, worst = 0, worstName = '', skipped = [];
  for (const f of readdirSync(DIR).filter((x) => x.endsWith('.svg'))) {
    const rSrc = readFileSync(`${ROUND}/${f}`, 'utf8'), vSrc = readFileSync(`${DIR}/${f}`, 'utf8');
    const R = ds(rSrc), V = ds(vSrc);
    if (R.length !== V.length) { skipped.push(f); continue; }
    let touched = false, i = 0;
    const out = vSrc.replace(/ d="([^"]+)"/g, (m, d) => {
      const T = pathBBox(R[i++]);
      if (!T) return m;
      const fixed = fitPath(d, T);
      if (fixed !== d) touched = true;
      return ` d="${fixed}"`;
    });
    if (!touched) continue;
    writeFileSync(`${DIR}/${f}`, out);
    solved++;
    let j = 0;
    for (const d of ds(out)) {
      const T = pathBBox(R[j++]), B = pathBBox(d);
      if (!T || !B) continue;
      const e = Math.max(T[0]-B[0], B[2]-T[2], T[1]-B[1], B[3]-T[3], 0);
      if (e > worst) { worst = e; worstName = f; }
    }
  }
  console.log({ solved, worstRemaining: +worst.toFixed(3), worstName, skipped: skipped.length });
}
