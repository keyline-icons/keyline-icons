// For every tint / matched-fill outline subpath that the ROUNDED drawing
// proves is a plain offset of one closed stroke subpath, throw away the
// surgical version and rebuild it as the offset of the SOLVED sharp stroke.
//   node rebuild-offsets.mjs <duotone-mid|fill-mid> <icons/duotone|icons/fill>
// In-file strokes are preferred as the source; a fill with no stroke sibling
// falls back to the stroke style (mid/ solved with icons/stroke as reference).
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { segsOf, samplePts, maxOffsetErr, offsetClosed, signedArea, reverseD } from './offset-tint.mjs';

const DIR = process.argv[2], ROUND = process.argv[3];
const STROKE_R = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const KNOBBED = /^(sliders|toggle)/;
const TOL = 0.12;

const splitTags = (src) => [...src.matchAll(/<path[^>]*>/g)].map((m) => m[0]);
const dOf = (tag) => / d="([^"]+)"/.exec(tag)?.[1];
function classify(src) {
  const root = / stroke="currentColor"/.test(src.slice(0, src.indexOf('>')));
  return splitTags(src).map((tag) => {
    const stroked = root && !/ stroke="none"/.test(tag);
    const outline = / fill="currentColor"/.test(tag) && !stroked;
    return { tag, d: dOf(tag), stroked, outline };
  });
}
const closedSubs = (d) => {
  const runs = segsOf(d);
  return runs ? runs.filter((r) => r.closed && r.segs.length > 1) : [];
};
const subD = (d) => d.split(/(?=M)/).filter((x) => x.trim());

let rebuilt = 0, files = 0, skippedWinding = 0;
for (const f of readdirSync(DIR).filter((x) => x.endsWith('.svg'))) {
  if (KNOBBED.test(f)) continue;
  const rSrc = readFileSync(`${ROUND}/${f}`, 'utf8');
  const vSrc = readFileSync(`${DIR}/${f}`, 'utf8');
  const R = classify(rSrc), V = classify(vSrc);
  if (R.length !== V.length) continue;

  // candidate stroke sources: [roundedD, sharpD, label]
  const sources = [];
  for (let i = 0; i < R.length; i++) if (R[i].stroked && V[i].stroked) sources.push([R[i].d, V[i].d]);
  const extPath = `${STROKE_R}/${f}`, extSharp = `mid/${f}`;
  if (existsSync(extPath) && existsSync(extSharp)) {
    const er = [...readFileSync(extPath, 'utf8').matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
    const ev = [...readFileSync(extSharp, 'utf8').matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
    if (er.length === ev.length) for (let i = 0; i < er.length; i++) sources.push([er[i], ev[i]]);
  }
  if (!sources.length) continue;

  let touched = false;
  let out = vSrc;
  for (let i = 0; i < R.length; i++) {
    if (!R[i].outline || !V[i].outline || !R[i].d || !V[i].d) continue;
    const rSubs = subD(R[i].d), vSubs = subD(V[i].d);
    if (rSubs.length !== vSubs.length) continue;
    let changed = false;
    const newSubs = vSubs.map((vs, j) => {
      const rRuns = segsOf(rSubs[j]);
      if (!rRuns || rRuns.length !== 1 || !rRuns[0].closed) return vs;
      const rPts = samplePts(rRuns[0].segs, 8);
      // find the ONE rounded stroke subpath this subpath offsets
      let hit = null;
      for (const [srcR, srcV] of sources) {
        const rStrokeSubs = subD(srcR), vStrokeSubs = subD(srcV);
        if (rStrokeSubs.length !== vStrokeSubs.length) continue;
        for (let k = 0; k < rStrokeSubs.length; k++) {
          const rs = segsOf(rStrokeSubs[k]);
          if (!rs || rs.length !== 1 || !rs[0].closed || rs[0].segs.length < 2) continue;
          if (maxOffsetErr(rPts, rs[0].segs, 1) < TOL) {
            const sharp = segsOf(vStrokeSubs[k]);
            if (sharp && sharp.length === 1 && sharp[0].closed) { hit = sharp[0].segs; break; }
          }
        }
        if (hit) break;
      }
      if (!hit) return vs;
      let nd = offsetClosed(hit, 1);
      if (!nd || /NaN/.test(nd)) return vs;
      const oldRuns = segsOf(vs), newRuns = segsOf(nd);
      if (!oldRuns || !newRuns) return vs;
      if (Math.sign(signedArea(oldRuns[0].segs)) !== Math.sign(signedArea(newRuns[0].segs))) {
        nd = reverseD(nd);
        if (!nd || /NaN/.test(nd)) { skippedWinding++; return vs; }
      }
      // sanity only: NaN-free and inside the stroke's box grown by the offset.
      // (An offset-error self-check re-applies the corner artifact and vetoes
      // every acute glyph — the ones that need rebuilding most.)
      const chk = segsOf(nd);
      if (!chk || !chk.length) return vs;
      const pts = samplePts(chk[0].segs, 6), sp = samplePts(hit, 6);
      const bx = (P) => P.reduce((b, p) => [Math.min(b[0],p[0]),Math.min(b[1],p[1]),Math.max(b[2],p[0]),Math.max(b[3],p[1])], [1/0,1/0,-1/0,-1/0]);
      const nb = bx(pts), sb = bx(sp);
      if (nb[0] < sb[0]-1.35 || nb[1] < sb[1]-1.35 || nb[2] > sb[2]+1.35 || nb[3] > sb[3]+1.35) return vs;
      // and it must stay NEAR the surgical version it replaces: the surgery is
      // at worst a few tenths off, so a rebuild that wanders a unit away means
      // the drawn shape was never a plain offset (pencil-ruler's crossing
      // bodies) and the replacement would redraw the icon.
      const oldSegs = segsOf(vs)?.[0]?.segs;
      if (oldSegs) {
        const op = samplePts(oldSegs, 8), OS = [];
        for (let q = 0; q < op.length - 1; q++) OS.push([op[q], op[q + 1]]);
        let sum = 0, mx = 0;
        for (const p of pts) {
          let m = Infinity;
          for (const [a, b] of OS) {
            const v = [b[0]-a[0], b[1]-a[1]], L2 = v[0]*v[0]+v[1]*v[1];
            let t = L2 ? ((p[0]-a[0])*v[0]+(p[1]-a[1])*v[1]) / L2 : 0;
            t = Math.max(0, Math.min(1, t));
            const dd = Math.hypot(p[0]-a[0]-v[0]*t, p[1]-a[1]-v[1]*t);
            if (dd < m) m = dd;
          }
          sum += m; mx = Math.max(mx, m);
        }
        // 0.4 / 1.45: wide enough that a capsule head squaring into the rect
        // its sharp stroke became (corners differ by ~1.2) passes, and a union
        // outline replaced by one element's offset still fails on the mean
        if (sum / pts.length > 0.4 || mx > 1.45) return vs;
      }
      changed = true;
      return nd;
    });
    if (!changed) continue;
    const nd = newSubs.join('');
    out = out.replace(V[i].tag, V[i].tag.replace(/ d="[^"]+"/, ` d="${nd}"`));
    touched = true; rebuilt++;
  }
  if (touched) { writeFileSync(`${DIR}/${f}`, out); files++; }
}
console.log({ files, pathsRebuilt: rebuilt, skippedWinding });
