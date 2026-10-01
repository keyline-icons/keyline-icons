// Write every variant of the 1.5.0 batch in raw/ format into --out=DIR (never into raw/ itself).
//
//   node tools/batch-1-5-0/gen15.mjs --out=DIR [name ...]
//   node tools/batch-1-5-0/check.mjs          regenerate them all and diff against raw/
//
// The drawings shadcn/create's icon previews still lacked (1 Oct 2026). Styles and the
// reasons for each are in g15.mjs.
import { STYLES } from './g15.mjs';
import { writeSet } from '../batch-1-4-0/rawio.mjs';
import { rmSync } from 'node:fs';
const args = process.argv.slice(2);
const out = args.find((a) => a.startsWith('--out='))?.slice(6);
if (!out) throw new Error('usage: gen15.mjs --out=DIR [name ...]');
const names = args.filter((a) => !a.startsWith('--'));
for (const name of names.length ? names : Object.keys(STYLES)) {
  rmSync(`${out}/raw/${name}`, { recursive: true, force: true });
  writeSet(out, name, { regular: STYLES[name](false), sharp: STYLES[name](true) });
}
