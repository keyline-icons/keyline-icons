// Write every variant of the 1.4.0 batch in raw/ format into --out=DIR (never into raw/ itself).
//
//   node tools/batch-1-4-0/gen14.mjs --out=DIR [name ...]
//   node tools/batch-1-4-0/check.mjs          regenerate all sixteen and diff them against raw/
//
// Eleven names from a banking app's menu (28 Sep 2026) plus the five money-bag signs he asked for,
// centred in the bag. Styles and their reasons are in g14.mjs; the objects' geometry in d14.mjs;
// bagsigns.mjs measures how big each sign can grow in the bag (the cloud rule).
import { STYLES } from './g14.mjs';
import { writeSet } from './rawio.mjs';
import { rmSync } from 'node:fs';
const args = process.argv.slice(2);
const out = args.find((a) => a.startsWith('--out='))?.slice(6);
if (!out) throw new Error('usage: gen14.mjs --out=DIR [name ...]');
const names = args.filter((a) => !a.startsWith('--'));
for (const name of names.length ? names : Object.keys(STYLES)) {
  rmSync(`${out}/raw/${name}`, { recursive: true, force: true });
  writeSet(out, name, { regular: STYLES[name](false), sharp: STYLES[name](true) });
}
