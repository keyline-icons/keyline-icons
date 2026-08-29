// Stroke set growers, per PATH: a glyph inside a container must solve to its
// own rounded path box exactly as its duotone and fill siblings do, or the
// sharp stroke caret outgrows the caret every other style shows. Records
// corner moves per file into mid-moves.json.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
import { solveBox } from './solve-box.mjs';
const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const ds = (s) => [...s.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
const MOVES = {};
let solved = 0, worst = 0, worstName = '';
for (const f of readdirSync('mid').filter((x) => x.endsWith('.svg'))) {
  const rSrc = readFileSync(`${K}/${f}`, 'utf8'), vSrc = readFileSync(`mid/${f}`, 'utf8');
  const R = ds(rSrc), V = ds(vSrc);
  if (R.length !== V.length) continue;
  const rec = [];
  let i = 0, touched = false;
  const out = vSrc.replace(/ d="([^"]+)"/g, (m, d) => {
    const T = pathBBox(R[i++]);
    if (!T) return m;
    const B = pathBBox(d);
    if (!B) return m;
    const over = Math.max(T[0] - B[0], B[2] - T[2], T[1] - B[1], B[3] - T[3], 0);
    if (over <= 0.001) return m;
    const c = solveBox(d, T, { record: rec });
    if (c === null) return m;
    touched = true;
    return ` d="${c}"`;
  });
  if (!touched) continue;
  if (rec.length) MOVES[f.replace('.svg', '')] = rec;
  writeFileSync(`mid/${f}`, out);
  solved++;
  let j = 0;
  for (const d of ds(out)) {
    const T2 = pathBBox(R[j++]), B2 = pathBBox(d);
    if (!T2 || !B2) continue;
    const left = Math.max(T2[0] - B2[0], B2[2] - T2[2], T2[1] - B2[1], B2[3] - T2[3], 0);
    if (left > worst) { worst = left; worstName = f; }
  }
}
writeFileSync('mid-moves.json', JSON.stringify(MOVES));
console.log({ solved, worstRemaining: +worst.toFixed(3), worstName, movesSaved: Object.keys(MOVES).length });
