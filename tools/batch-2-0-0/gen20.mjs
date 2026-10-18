// Write every variant of the 2.0.0 batch (g20.mjs) in raw/ format into --out=DIR (never into raw/
// itself). A name drawn here is written whole; a container added to a shipped set (zap, star, dot)
// writes only its own Container=square and Container=circle files beside the set's shipped ones.
//
//   node tools/batch-2-0-0/gen20.mjs --out=DIR [name ...]
//   node tools/batch-2-0-0/check.mjs          regenerate them all and diff against raw/
import { STYLES, CONTAINERS } from './g20.mjs';
import { writeVariants } from './rawio20.mjs';
import { rmSync } from 'node:fs';
const args = process.argv.slice(2);
const out = args.find((a) => a.startsWith('--out='))?.slice(6);
if (!out) throw new Error('usage: gen20.mjs --out=DIR [name ...]');
const names = args.filter((a) => !a.startsWith('--'));
const strip = (o) => Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('_')));
const want = (n) => !names.length || names.includes(n);
for (const name of Object.keys(STYLES).filter(want)) {
  rmSync(`${out}/raw/${name}`, { recursive: true, force: true });
  writeVariants(out, name, 'regular', { regular: strip(STYLES[name](false)), sharp: strip(STYLES[name](true)) });
}
for (const [base, byContainer] of Object.entries(CONTAINERS)) for (const [container, f] of Object.entries(byContainer)) {
  if (!want(base) && !want(`${container}-${base}`)) continue;
  writeVariants(out, base, container, { regular: strip(f(false)), sharp: strip(f(true)) });
}
