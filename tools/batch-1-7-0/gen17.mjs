// Write every variant of the 1.7.0 batch in raw/ format into --out=DIR (never into raw/ itself).
//
//   node tools/batch-1-7-0/gen17.mjs --out=DIR [name ...]
//   node tools/batch-1-7-0/check.mjs          regenerate them all and diff against raw/
import { STYLES } from './g17.mjs';
import { writeSet } from '../batch-1-4-0/rawio.mjs';
import { rmSync } from 'node:fs';
const args = process.argv.slice(2);
const out = args.find((a) => a.startsWith('--out='))?.slice(6);
if (!out) throw new Error('usage: gen17.mjs --out=DIR [name ...]');
const names = args.filter((a) => !a.startsWith('--'));
const strip = (o) => Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('_')));
for (const name of names.length ? names : Object.keys(STYLES)) {
  rmSync(`${out}/raw/${name}`, { recursive: true, force: true });
  writeSet(out, name, { regular: strip(STYLES[name](false)), sharp: strip(STYLES[name](true)) });
}
