// The matched fill: same pipeline as fill-mid, but corners take the tint rule
// (1 outside, 0 inside) so the fill equals the round-join stroke's painted
// silhouette exactly. Built for a handful of icons as a Figma preview.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { sharpenFill } from './sharpen-fill.mjs';
import { sharpen2 } from './sharpen2.mjs';
const ROOT = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/fill';
const NAMES = process.argv.slice(2);
mkdirSync('matched', { recursive: true });
for (const n of NAMES) {
  const src = readFileSync(`${ROOT}/${n}.svg`, 'utf8');
  const rootStrokes = / stroke="currentColor"/.test(src.slice(0, src.indexOf('>')));
  const out = src.replace(/<path[^>]*>/g, (tag) => {
    const m = tag.match(/ d="([^"]+)"/);
    if (!m) return tag;
    const stroked = rootStrokes && !/ stroke="none"/.test(tag);
    const outline = / fill="currentColor"/.test(tag) && !stroked;
    const r = outline ? sharpenFill(m[1], 'tint') : sharpen2(m[1]);
    return r ? tag.replace(/ d="[^"]+"/, ` d="${r.d}"`) : tag;
  });
  writeFileSync(`matched/${n}.svg`, out);
  console.log(n, 'done');
}
