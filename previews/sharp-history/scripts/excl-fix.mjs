// The exclamation bars, by Zafar's rule of 29 Aug: "size 4 from 6".
//
// A butt-capped bar that keeps the cap extension paints two units longer than
// the geometry it came from, and next to the fixed dot that reads heavy — the
// sharp mark should paint exactly the SOURCE geometry. So the bars lose the
// extension in the stroked styles, and the fill knockouts (which were drawn to
// the rounded PAINTED length, source plus one each end) come in to the source
// span too. The dot is untouched: circle stays circle.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const BARS = {
  'alert':            { x: 12, a: 5,  b: 15 },
  'circle-alert':     { x: 12, a: 7,  b: 13 },
  'square-alert':     { x: 12, a: 7,  b: 13 },
  'octagon-alert':    { x: 12, a: 8,  b: 12 },
  'triangle-alert':   { x: 12, a: 9,  b: 13 },
  'wifi-exclamation': { x: 17, a: 12, b: 14 },
};

let touched = 0;
for (const [name, { x, a, b }] of Object.entries(BARS)) {
  for (const dir of ['mid', 'duotone-mid']) {
    const p = `${dir}/${name}.svg`;
    if (!existsSync(p)) continue;
    const src = readFileSync(p, 'utf8');
    const re = new RegExp(`M${x} (\\d+)L${x} (\\d+)`, 'g');
    const out = src.replace(re, (m, ya, yb) => {
      const lo = Math.min(+ya, +yb), hi = Math.max(+ya, +yb);
      // only the bar: the span that brackets the source span
      if (lo > a || hi < b) return m;
      return `M${x} ${a}L${x} ${b}`;
    });
    if (out !== src) { writeFileSync(p, out); touched++; }
  }
  const p = `fill-mid/${name}.svg`;
  if (existsSync(p)) {
    const src = readFileSync(p, 'utf8');
    const L = x - 1, R = x + 1;
    const re = new RegExp(`M${L} (\\d+)L${L} (\\d+)L${R} \\2L${R} \\1(?:L${L} \\1)?Z`, 'g');
    const out = src.replace(re, (m, ya, yb) => {
      const lo = Math.min(+ya, +yb), hi = Math.max(+ya, +yb);
      if (lo > a || hi < b) return m;
      const [na, nb] = +ya < +yb ? [a, b] : [b, a];
      return `M${L} ${na}L${L} ${nb}L${R} ${nb}L${R} ${na}Z`;
    });
    if (out !== src) { writeFileSync(p, out); touched++; }
  }
}
console.log({ exclamationFilesTouched: touched });
