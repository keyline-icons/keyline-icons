// Regenerate every 1.2.0 drawing into a scratch directory and compare it byte
// for byte with raw/. A difference means raw/ has moved away from the generator
// that made it: a hand edit, or a redraw whose rule belongs in the generator.
//
//   node tools/batch-1-2-0/check.mjs
//
// Each generator also runs on its own, `node <group>/build.mjs --out=DIR`, and
// writes DIR/raw/<name>/. Bases are read from raw/ in this checkout.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { RAW } from './paths.mjs';

const GENERATORS = [
  'cloud-terminal/build', 'commerce-plus/build', 'data-plus/build', 'grids-plus/build',
  'panels/build', 'panels/dashed', 'progress-circle/build', 'progress-levels/build',
  'table-more/build', 'table-ops/build', 'zap/build',
];
const out = mkdtempSync(join(tmpdir(), 'keyline-1.2.0-'));
try {
  for (const g of GENERATORS)
    execFileSync(process.execPath, [join(import.meta.dirname, `${g}.mjs`), `--out=${out}`], { stdio: ['ignore', 'ignore', 'inherit'] });
  const names = readdirSync(join(out, 'raw')), differ = [];
  let files = 0;
  for (const n of names) for (const f of readdirSync(join(out, 'raw', n))) {
    files++;
    let have = null;
    try { have = readFileSync(join(RAW, n, f), 'utf8'); } catch {}
    if (have !== readFileSync(join(out, 'raw', n, f), 'utf8')) differ.push(`${n}/${f}`);
  }
  if (differ.length) { console.error(`${differ.length} of ${files} files differ from raw/:\n  ${differ.join('\n  ')}`); process.exitCode = 1; }
  else console.log(`${names.length} names, ${files} files: raw/ matches its generators`);
} finally {
  rmSync(out, { recursive: true, force: true });
}
