// Where the 1.2.0 generators read and write. Bases come from raw/ in the
// checkout this file sits in; output goes where --out (or OUT) says, under
// <out>/raw/<name>/, and never into raw/ itself.
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
export const ROOT = resolve(import.meta.dirname, '../..');
export const RAW = join(ROOT, 'raw');
const arg = process.argv.find((a) => a.startsWith('--out='));
const OUT = arg ? resolve(arg.slice(6)) : process.env.OUT ? resolve(process.env.OUT) : null;
export function outDir() {
  if (!OUT) throw new Error('say where to write: --out=DIR (never raw/)');
  if (OUT === RAW || OUT === ROOT) throw new Error('--out must not be the checkout or its raw/');
  mkdirSync(join(OUT, 'raw'), { recursive: true });
  return OUT;
}
