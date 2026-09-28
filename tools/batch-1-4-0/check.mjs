// Regenerate every 1.4.0 drawing into a scratch directory and compare it byte for byte with
// raw/. A difference means raw/ has moved away from the generator that made it: a hand edit, or
// a redraw whose rule belongs in the generator.
//
//   node tools/batch-1-4-0/check.mjs
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const RAW = resolve(import.meta.dirname, '../../raw');
const out = mkdtempSync(join(tmpdir(), 'keyline-1.4.0-'));
try {
  execFileSync(process.execPath, [join(import.meta.dirname, 'gen14.mjs'), `--out=${out}`], { stdio: ['ignore', 'ignore', 'inherit'] });
  const names = readdirSync(join(out, 'raw')), differ = [];
  let files = 0;
  for (const n of names) for (const f of readdirSync(join(out, 'raw', n))) {
    files++;
    let have = null;
    try { have = readFileSync(join(RAW, n, f), 'utf8'); } catch {}
    if (have !== readFileSync(join(out, 'raw', n, f), 'utf8')) differ.push(`${n}/${f}`);
  }
  if (differ.length) { console.error(`${differ.length} of ${files} files differ from raw/:\n  ${differ.join('\n  ')}`); process.exitCode = 1; }
  else console.log(`${names.length} names, ${files} files: raw/ matches its generator`);
} finally {
  rmSync(out, { recursive: true, force: true });
}
