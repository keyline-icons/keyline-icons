// One encoder for the Figma pushes, so the flags can never drift between
// payload generations again. Flags after '#': f fill, s stroked, e evenodd,
// o<val> fill-opacity, p<val> stroke-opacity. p was the missing one — 46
// duotone paths (signal's inactive bars, the dashed panels, wifi, sunrise)
// carry stroke-opacity="0.4" and were landing on the board full black.
import { readFileSync, existsSync } from 'node:fs';

export function compact(t) {
  const out = [];
  const root = / stroke="currentColor"/.test(t.slice(0, t.indexOf('>')));
  for (const m of t.matchAll(/<path ([^>]*)\/>/g)) {
    const a = m[1];
    const d = /d="([^"]*)"/.exec(a)[1].replace(/-?\d+\.\d+/g, (x) => String(+(+x).toFixed(2)));
    const st = root && !/stroke="none"/.test(a);
    const fl = /fill="currentColor"/.test(a);
    const eo = /fill-rule="evenodd"/.test(a);
    const fo = /fill-opacity="([^"]*)"/.exec(a);
    const so = /stroke-opacity="([^"]*)"/.exec(a);
    out.push(d + '#' + (fl ? 'f' : '') + (st ? 's' : '') + (eo ? 'e' : '')
      + (fo ? 'o' + fo[1] : '') + (so ? 'p' + so[1] : ''));
  }
  return out;
}

export function encodeSet(dir, names) {
  const o = {};
  for (const k of names) {
    const p = `${dir}/${k}.svg`;
    if (existsSync(p)) o[k] = compact(readFileSync(p, 'utf8').replace(/\n\s*/g, ''));
  }
  return o;
}

if (process.argv[1] && process.argv[1].endsWith('encode.mjs')) {
  const { writeFileSync } = await import('node:fs');
  const { s1, s2, s3 } = JSON.parse(readFileSync('sections.json', 'utf8'));
  const names = [...s1, ...s2, ...s3];
  for (const [dir, label] of [['mid', 'stroke'], ['fill-mid', 'fill'], ['duotone-mid', 'duotone']]) {
    const o = encodeSet(dir, names);
    writeFileSync('r-' + label + '.json', JSON.stringify(o));
    console.log(label, Object.keys(o).length, JSON.stringify(o).length,
      'p-flags:', Object.values(o).flat().filter((x) => /#[a-z0-9.]*p/.test(x)).length);
  }
}
