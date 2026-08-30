// Undo excl-fix.mjs everywhere except triangle-alert.
//   node unexcl.mjs [--write]
//
// excl-fix shortens an exclamation bar to its SOURCE length and slides it down
// one, so it paints 2 units less than the rounded original. HISTORY justified
// that by the painted gap to the dot; the arithmetic does not support it. A
// cap-extended butt bar already occupies exactly the round-capped bar's painted
// extent, so the plain conversion reads gap 2 as well — measured 2 in every
// rounded original, every plain conversion and every excl-fixed file. All the
// special case ever did was cut ink.
//
// Zafar's call, 30 Aug: it was triangle-alert's case alone. `wifi-info` is the
// proof sitting next to `wifi-exclamation` — same arcs, same dot, same 2-unit
// source mark, never listed in BARS, converted plainly, and correct.
//
// The revert is one number per bar: excl-fix wrote [s0+1, s1+1], the plain
// conversion is [s0-1, s1+1], so only the TOP moves, up by 2.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const H = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const WRITE = process.argv.includes('--write');

// name -> [x, excl-fix top, plain top, bottom]; triangle-alert deliberately absent
const REVERT = {
  'alert':            [12, 6, 4, 16],
  'circle-alert':     [12, 8, 6, 14],
  'square-alert':     [12, 8, 6, 14],
  'octagon-alert':    [12, 9, 7, 13],
  'wifi-exclamation': [17, 13, 11, 15],
};

let changed = 0, files = 0;
for (const [name, [x, from, to, b]] of Object.entries(REVERT)) {
  for (const dir of ['solved-mid', 'solved-duotone', 'solved-fill']) {
    const p = `${H}/${dir}/${name}.svg`;
    if (!existsSync(p)) continue;
    const src = readFileSync(p, 'utf8');
    let out = src;
    if (dir === 'solved-fill') {
      // the squared knockout: M{x-1} top L{x-1} b L{x+1} b L{x+1} top [L{x-1} top] Z
      const re = new RegExp(`M${x-1} ${from}L${x-1} ${b}L${x+1} ${b}L${x+1} ${from}(L${x-1} ${from})?`, 'g');
      out = out.replace(re, (_, tail) => `M${x-1} ${to}L${x-1} ${b}L${x+1} ${b}L${x+1} ${to}${tail ? `L${x-1} ${to}` : ''}`);
    } else {
      out = out.replace(new RegExp(`M${x} ${from}L${x} ${b}`, 'g'), `M${x} ${to}L${x} ${b}`);
    }
    if (out === src) { console.log(`${name} ${dir}: NO MATCH (already reverted, or the bar moved)`); continue; }
    console.log(`${name.padEnd(18)} ${dir.padEnd(15)} bar top ${from} -> ${to}   (paints ${b - from + 2} -> ${b - to + 2} units)`);
    changed++;
    if (WRITE) { writeFileSync(p, out); files++; }
  }
}
console.log({ pathsChanged: changed, filesWritten: files, written: WRITE, kept: 'triangle-alert' });
