// Re-solve the tangent stub at a CURVED free end so the butt cap paints where
// the rounded round cap did.
//   node solve-curved-caps.mjs [--write] <name...>
//
// caps.mjs pushes every free end out a full unit, which is exact off a straight
// line and wrong off an arc: the stub leaves the turn, so the square end lands
// past where the round cap's disc reached. §14 clamps this, not tightly enough.
// lightbulb's dome overshot 0.609 and ate the gap to its base bar, 2.000 down
// to 1.391, which is the house element gap broken in a way no rule measures.
//
// The stub direction is whatever caps.mjs already chose (it is tangent by
// construction, so moving the endpoint along it leaves the start tangent
// identical and only lengthens the first control leg). Only its LENGTH is
// re-solved, by bisection, against the rounded subpath's own painted box.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { paintedBBox } from './stroke-bbox.mjs';

const REPO = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons';
const H = `${REPO}/previews/sharp-history`;
const ROUND = { join: 'round', cap: 'round' }, SHARP = { join: 'round', cap: 'butt' };
const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const names = args.filter((a) => !a.startsWith('--'));
if (!names.length) { console.error('usage: node solve-curved-caps.mjs [--write] <name...>'); process.exit(1); }

const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const subs = (d) => d.split(/(?=M)/).filter(Boolean);
const nums = (s) => s.match(/-?\d*\.?\d+/g).map(Number);

let solved = 0, files = 0;
for (const name of names) {
  const rp = `${REPO}/icons/stroke/${name}.svg`, sp = `${H}/solved-mid/${name}.svg`;
  if (!existsSync(rp) || !existsSync(sp)) { console.log(`${name}: missing`); continue; }
  const rSrc = readFileSync(rp, 'utf8'), sSrc = readFileSync(sp, 'utf8');
  const rd = / d="([^"]+)"/.exec(rSrc)[1], sd = / d="([^"]+)"/.exec(sSrc)[1];
  const A = subs(rd), B = subs(sd);
  if (A.length !== B.length) { console.log(`${name}: subpath count differs`); continue; }

  const out = B.slice();
  let touched = false;
  for (let i = 0; i < A.length; i++) {
    if (/z/i.test(A[i]) || !/C/.test(A[i])) continue;          // closed, or no curve
    const target = paintedBBox([{ d: A[i], filled: false }], ROUND);
    const before = paintedBBox([{ d: B[i], filled: false }], SHARP);
    const over = Math.max(target[0]-before[0], target[1]-before[1], before[2]-target[2], before[3]-target[3]);
    if (over <= 0.01) continue;

    const ra = nums(A[i]), sa = nums(B[i]);
    const p0r = [ra[0], ra[1]], pNr = [ra[ra.length-2], ra[ra.length-1]];
    const p0s = [sa[0], sa[1]], pNs = [sa[sa.length-2], sa[sa.length-1]];
    const u0 = [p0s[0]-p0r[0], p0s[1]-p0r[1]], uN = [pNs[0]-pNr[0], pNs[1]-pNr[1]];
    const L0 = Math.hypot(...u0), LN = Math.hypot(...uN);
    if (L0 < 1e-6 && LN < 1e-6) continue;
    const build = (t) => {
      let d = B[i].replace(/^M\s*-?\d*\.?\d+\s+-?\d*\.?\d+/,
        `M${n(p0r[0] + (L0 ? u0[0]/L0*t : 0))} ${n(p0r[1] + (L0 ? u0[1]/L0*t : 0))}`);
      const tail = new RegExp(`(-?\\d*\\.?\\d+)\\s+(-?\\d*\\.?\\d+)\\s*$`);
      return d.replace(tail, `${n(pNr[0] + (LN ? uN[0]/LN*t : 0))} ${n(pNr[1] + (LN ? uN[1]/LN*t : 0))}`);
    };
    // Bisect the BINDING side, not the max of all four: an arc's box matches
    // the rounded one on the sides its own curvature sets, so a max over every
    // side never goes negative and collapses the search to a zero-length stub.
    const sideOver = (b, k) => (k < 2 ? target[k] - b[k] : b[k] - target[k]);
    const bind = [0, 1, 2, 3].reduce((best, k) =>
      sideOver(before, k) > sideOver(before, best) ? k : best, 0);
    let lo = 0, hi = Math.max(L0, LN);
    for (let k = 0; k < 60; k++) {
      const m = (lo + hi) / 2;
      const b = paintedBBox([{ d: build(m), filled: false }], SHARP);
      (sideOver(b, bind) < 0 ? lo = m : hi = m);
    }
    const t = (lo + hi) / 2;
    const nd = build(t);
    const after = paintedBBox([{ d: nd, filled: false }], SHARP);
    const err = Math.max(...after.map((v, k) => Math.abs(v - target[k])));
    console.log(`${name.padEnd(16)} sub${i}  stub ${L0.toFixed(3)} -> ${t.toFixed(4)}   overshoot ${over.toFixed(4)} -> ${err.toFixed(5)}`);
    out[i] = nd; touched = true; solved++;
  }
  if (!touched) { console.log(`${name}: nothing to solve`); continue; }
  if (WRITE) { writeFileSync(sp, sSrc.replace(/ d="[^"]+"/, ` d="${out.join('')}"`)); files++; }
}
console.log({ solved, filesWritten: files, written: WRITE });
