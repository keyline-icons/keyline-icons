// Fill / duotone growers, final form. The stroked layers of a file solve to
// their rounded path boxes and RECORD every corner move; the tints and
// outlines of the same file then take exactly those moves, so the pair can
// never shear. A fill with no stroked sibling falls back to the moves the
// stroke-style solve recorded (mid-moves.json). Nothing else moves outlines.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
import { solveBox } from './solve-box.mjs';
const DIR = process.argv[2], ROUND = process.argv[3];
const MID_MOVES = existsSync('mid-moves.json') ? JSON.parse(readFileSync('mid-moves.json', 'utf8')) : {};
const splitTags = (src) => [...src.matchAll(/<path[^>]*>/g)].map((m) => m[0]);
let solvedStrokes = 0, followedOutlines = 0;
for (const f of readdirSync(DIR).filter((x) => x.endsWith('.svg'))) {
  const rSrc = readFileSync(`${ROUND}/${f}`, 'utf8');
  let vSrc = readFileSync(`${DIR}/${f}`, 'utf8');
  const root = / stroke="currentColor"/.test(vSrc.slice(0, vSrc.indexOf('>')));
  const rD = [...rSrc.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  const vTags = splitTags(vSrc);
  if (rD.length !== vTags.length) continue;
  const rec = [];
  // pass 1: solve the stroked layers, recording their corner moves
  vTags.forEach((tag, i) => {
    const stroked = root && !/ stroke="none"/.test(tag);
    if (!stroked) return;
    const d = / d="([^"]+)"/.exec(tag)?.[1];
    const T = pathBBox(rD[i]);
    if (!d || !T) return;
    const c = solveBox(d, T, { record: rec });
    if (c !== null && c !== d) {
      vSrc = vSrc.replace(tag, tag.replace(/ d="[^"]+"/, ` d="${c}"`));
      solvedStrokes++;
    }
  });
  // pass 2: outlines and tints solve to their own rounded path boxes. (An
  // imposed-moves variant that dragged tint corners by the stroke's recorded
  // deltas was tried and reverted: on union outlines like pencil-ruler the
  // crossing corners belong to no single stroke and were dragged wrongly.)
  {
    let i = -1;
    for (const tag of splitTags(vSrc)) {
      i++;
      const stroked = root && !/ stroke="none"/.test(tag);
      if (stroked || !/ fill="currentColor"/.test(tag)) continue;
      const d = / d="([^"]+)"/.exec(tag)?.[1];
      const T = pathBBox(rD[i]);
      if (!d || !T) continue;
      const B = pathBBox(d);
      const over = Math.max(T[0] - B[0], B[2] - T[2], T[1] - B[1], B[3] - T[3], 0);
      if (over <= 0.001) continue;
      const c = solveBox(d, T);
      if (c !== null && c !== d) {
        vSrc = vSrc.replace(tag, tag.replace(/ d="[^"]+"/, ` d="${c}"`));
        followedOutlines++;
      }
    }
  }
  writeFileSync(`${DIR}/${f}`, vSrc);
}
console.log({ solvedStrokes, followedOutlines });
