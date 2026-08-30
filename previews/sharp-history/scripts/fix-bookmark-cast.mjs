// Two hand-solved sharp repairs.
//   node fix-bookmark-cast.mjs [--write]
//
// CAST. The rounded middle wave is a quarter arc, `M2 16C4.20914 16 6 17.79086
// 6 20`. The sharpener claimed it as a corner and replaced it with a right
// angle, `M1 16L6 16L6 21`. §21 tightened the dash clause for exactly this
// ("wifi and cast's shallow arcs claimed as corner dashes") and this one still
// got through. Restored as stub + arc + stub: the arc is the rounded one
// untouched, with a 1-unit tangent stub at each free end so the butt caps paint
// where the round caps did.
//
// BOOKMARK. The ribbon tail is an r=1 fillet centred (19,21), and r=1 is
// already the ladder's floor, so its painted bottom sits at exactly 23. Remove
// it and the true vertex lands at (20, 22.655), which paints to 23.655 — past
// the ink limit. The box solver clamped the vertex to y=22 and left the notch
// diagonal where it was, so the tail became a 1.5-unit horizontal stub instead
// of a point. Solved by running the diagonal TO the clamped vertex: true points
// at (4,22) and (20,22), a true V at the de-filleted notch apex (12, 18.4223).
// That pivots the diagonal about the notch, so the tail angle shallows from
// slope 0.529 to 0.447. The alternative is to keep the angle and deepen the
// notch to y=17.768; the third is to keep the r=1 fillet, which is what heart's
// and shield's tips do in sharp. Zafar's call if he wants one of those instead.
import { readFileSync, writeFileSync } from 'node:fs';
import { segsOf, offsetClosed } from './offset-tint.mjs';

const H = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const WRITE = process.argv.includes('--write');

const STROKE_HEAD = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="round">';
const PLAIN_HEAD = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">';
const doc = (head, paths) => `${head}\n${paths.map((p) => '  ' + p).join('\n')}\n</svg>\n`;

const files = {};

// ---- cast: restore both waves ----------------------------------------------
// The middle wave was squared into a right angle. The big wave kept its curve
// but took its cap extension by MOVING the endpoint, which lengthens the
// control leg and bulges the arc: 0.332 outside the rounded box on two sides.
// Both are rebuilt as stub + rounded arc + stub. Where a free end's tangent is
// AXIS-ALIGNED, a 1-unit straight stub is exact — the butt cap's bar then lies
// parallel to the box side the round cap's disc touched, so the painted extreme
// lands in the same place and the arc itself is never touched. (Off an oblique
// tangent it is not exact, which is what solve-curved-caps.mjs bisects for.)
{
  const p = `${H}/solved-mid/cast.svg`;
  let src = readFileSync(p, 'utf8');
  const subs = [
    ['M1 16L6 16L6 21',                        'M1 16L2 16C4.2091 16 6 17.7909 6 20L6 21'],
    ['M1 12C6.4183 12 10 15.5817 10 21',       'M1 12L2 12C6.4183 12 10 15.5817 10 20L10 21'],
  ];
  for (const [from, to] of subs) {
    if (!src.includes(from)) { console.log(`cast: "${from.slice(0, 24)}…" already fixed`); continue; }
    src = src.replace(from, to);
  }
  files['solved-mid/cast.svg'] = src;
}

// ---- bookmark: true tails, true notch, plate derived by offset --------------
{
  const BODY = 'M4 2L20 2L20 22L12 18.4223L4 22L4 2Z';
  const runs = segsOf(BODY);
  const plate = offsetClosed(runs[0].segs, 1);
  files['solved-mid/bookmark.svg'] = doc(STROKE_HEAD, [`<path d="${BODY}"/>`]);
  files['solved-duotone/bookmark.svg'] = doc(STROKE_HEAD, [
    `<path d="${plate}" fill="currentColor" fill-opacity="0.4" stroke="none"/>`,
    `<path d="${BODY}"/>`]);
  files['solved-fill/bookmark.svg'] = doc(PLAIN_HEAD, [`<path d="${plate}" fill="currentColor"/>`]);
}

for (const [rel, body] of Object.entries(files)) {
  const before = readFileSync(`${H}/${rel}`, 'utf8');
  console.log(`${rel.padEnd(30)} ${before === body ? 'unchanged' : 'rewritten'}`);
  if (WRITE) writeFileSync(`${H}/${rel}`, body);
}
console.log({ files: Object.keys(files).length, written: WRITE });
