// Re-offset the subpaths whose reflex corners were only CONNECTED, not trimmed.
//   node retrim-reflex.mjs [--write]
// offsetClosed used to solve a reflex crossing for line/line joins alone; every
// join with a curved arm fell through to "B.p0 = Aend", which drags the
// outgoing arm's start onto the incoming arm's end and collapses the corner
// into a spike. Nine icons carry one: heart's notch, the cloud shoulders, the
// message tails. Same pairing rule as rebuild-offsets.mjs — a subpath is only
// touched where the shipped geometry is still that offsetter's own output, so
// nothing from a later pass is overwritten.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { segsOf, samplePts, maxOffsetErr, offsetClosed, signedArea, reverseD } from './offset-tint.mjs';

const REPO = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons';
const H = `${REPO}/previews/sharp-history`;
const WRITE = process.argv.includes('--write');
const TOL = 0.12;
const NAMES = ['cloud', 'cloud-rain', 'heart', 'message', 'message-check',
               'message-minus', 'message-plus', 'message-x', 'messages'];

const splitTags = (s) => [...s.matchAll(/<path[^>]*>/g)].map((m) => m[0]);
const dOf = (t) => / d="([^"]+)"/.exec(t)?.[1];
function classify(src) {
  const root = / stroke="currentColor"/.test(src.slice(0, src.indexOf('>')));
  return splitTags(src).map((tag) => {
    const stroked = root && !/ stroke="none"/.test(tag);
    return { tag, d: dOf(tag), stroked, outline: / fill="currentColor"/.test(tag) && !stroked };
  });
}
const subD = (d) => d.split(/(?=M)/).filter((x) => x.trim());
const wind = (gen, like) => {
  const a = segsOf(like), b = segsOf(gen);
  if (!a || !b) return gen;
  return Math.sign(signedArea(a[0].segs)) !== Math.sign(signedArea(b[0].segs)) ? reverseD(gen) : gen;
};
// how far the replacement wanders from the geometry it replaces: a retrim
// moves the two arms at one corner and nothing else, so anything past a
// stroke width means this subpath was not the offsetter's own output
function drift(gen, old) {
  const a = segsOf(gen), b = segsOf(old);
  if (!a || !b) return Infinity;
  const pts = samplePts(a[0].segs, 8), op = samplePts(b[0].segs, 8), OS = [];
  for (let q = 0; q < op.length - 1; q++) OS.push([op[q], op[q + 1]]);
  let mx = 0;
  for (const p of pts) {
    let m = Infinity;
    for (const [u, v] of OS) {
      const w = [v[0] - u[0], v[1] - u[1]], L2 = w[0] * w[0] + w[1] * w[1];
      let t = L2 ? ((p[0] - u[0]) * w[0] + (p[1] - u[1]) * w[1]) / L2 : 0;
      t = Math.max(0, Math.min(1, t));
      m = Math.min(m, Math.hypot(p[0] - u[0] - w[0] * t, p[1] - u[1] - w[1] * t));
    }
    mx = Math.max(mx, m);
  }
  return mx;
}
const bbox = (d) => {
  const r = segsOf(d);
  return samplePts(r[0].segs, 24).reduce(
    (b, p) => [Math.min(b[0], p[0]), Math.min(b[1], p[1]), Math.max(b[2], p[0]), Math.max(b[3], p[1])],
    [Infinity, Infinity, -Infinity, -Infinity]);
};

let repaired = 0, filesWritten = 0, skipped = [];
for (const style of ['fill', 'duotone']) {
  const roundDir = `${REPO}/icons/${style}`, DIR = `${H}/solved-${style}`;
  for (const nm of NAMES) {
    const f = `${nm}.svg`;
    if (!existsSync(`${DIR}/${f}`) || !existsSync(`${roundDir}/${f}`)) continue;
    const vSrc = readFileSync(`${DIR}/${f}`, 'utf8');
    const R = classify(readFileSync(`${roundDir}/${f}`, 'utf8')), V = classify(vSrc);
    if (R.length !== V.length) continue;

    const sources = [];
    for (let i = 0; i < R.length; i++) if (R[i].stroked && V[i].stroked) sources.push([R[i].d, V[i].d]);
    const ep = `${REPO}/icons/stroke/${f}`, es = `${H}/solved-mid/${f}`;
    if (existsSync(ep) && existsSync(es)) {
      const er = [...readFileSync(ep, 'utf8').matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
      const ev = [...readFileSync(es, 'utf8').matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
      if (er.length === ev.length) for (let i = 0; i < er.length; i++) sources.push([er[i], ev[i]]);
    }
    if (!sources.length) continue;

    let out = vSrc, touched = false;
    for (let i = 0; i < R.length; i++) {
      if (!R[i].outline || !V[i].outline || !R[i].d || !V[i].d) continue;
      const rSubs = subD(R[i].d), vSubs = subD(V[i].d);
      if (rSubs.length !== vSubs.length) continue;
      let changed = false;
      const newSubs = vSubs.map((vs, j) => {
        const rRuns = segsOf(rSubs[j]);
        if (!rRuns || rRuns.length !== 1 || !rRuns[0].closed) return vs;
        const rPts = samplePts(rRuns[0].segs, 8);
        let hit = null;
        for (const [srcR, srcV] of sources) {
          const rk = subD(srcR), vk = subD(srcV);
          if (rk.length !== vk.length) continue;
          for (let k = 0; k < rk.length; k++) {
            const rs = segsOf(rk[k]);
            if (!rs || rs.length !== 1 || !rs[0].closed || rs[0].segs.length < 2) continue;
            if (maxOffsetErr(rPts, rs[0].segs, 1) < TOL) {
              const sh = segsOf(vk[k]);
              if (sh && sh.length === 1 && sh[0].closed) { hit = sh[0].segs; break; }
            }
          }
          if (hit) break;
        }
        if (!hit) return vs;
        const nd = wind(offsetClosed(hit, 1), vs);
        if (!nd || /NaN/.test(nd) || nd === vs) return vs;
        const before = bbox(vs), after = bbox(nd);
        const grew = Math.max(before[0] - after[0], before[1] - after[1],
                              after[2] - before[2], after[3] - before[3]);
        if (grew > 0.01) { skipped.push(`${nm} ${style} sub${j}: box grew ${grew.toFixed(3)}`); return vs; }
        const wander = drift(nd, vs);
        if (wander > 2) { skipped.push(`${nm} ${style} sub${j}: drift ${wander.toFixed(3)}`); return vs; }
        console.log(`${nm.padEnd(14)} ${style.padEnd(8)} sub${j}  retrimmed  drift ${wander.toFixed(3)}`);
        changed = true; repaired++;
        return nd;
      });
      if (!changed) continue;
      out = out.replace(V[i].tag, V[i].tag.replace(/ d="[^"]+"/, ` d="${newSubs.join('')}"`));
      touched = true;
    }
    if (touched && WRITE) { writeFileSync(`${DIR}/${f}`, out); filesWritten++; }
  }
}
console.log({ repaired, filesWritten, written: WRITE });
for (const s of skipped) console.log('skipped:', s);

