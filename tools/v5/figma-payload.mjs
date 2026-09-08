/**
 * Emit a compact payload for `use_figma`: per icon, its variants as layer
 * lists. The plugin rebuilds the same SVG document `raw/` holds and imports it
 * with `createNodeFromSvg`, which is the one import path that does not re-base
 * geometry or drop H/V.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const KIND = (attrs) =>
  /stroke-opacity="0.4"/.test(attrs) ? 'm' : /fill-opacity="0.4"/.test(attrs) ? 'p' : /stroke="black"/.test(attrs) ? 's' : 'f';

export function payload(name) {
  const dir = `${ROOT}/raw/${name}`;
  const out = {};
  for (const f of readdirSync(dir)) {
    const m = /Style=(\w+), Corners=(\w+)\.svg$/.exec(f);
    if (!m) continue;
    const src = readFileSync(`${dir}/${f}`, 'utf8');
    out[`${m[2]}|${m[1]}`] = [...src.matchAll(/<path d="([^"]*)"([^>]*)\/>/g)].map((p) => [KIND(p[2]), p[1]]);
  }
  return out;
}

const names = process.argv.slice(2);
const all = {};
for (const n of names) all[n] = payload(n);
const text = JSON.stringify(all);
console.log(text);
console.error(`${text.length} chars for ${names.length} icon(s)`);
