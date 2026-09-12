/** Any piece a re-import would drop: a zero-length line or cubic, or a control point on its endpoint. */
import { readFileSync, readdirSync } from 'node:fs';
const ROOT = process.argv[2], names = process.argv.slice(3);
let bad = 0;
for (const n of names) for (const f of readdirSync(`${ROOT}/raw/${n}`)) {
  const src = readFileSync(`${ROOT}/raw/${n}/${f}`, 'utf8');
  for (const m of src.matchAll(/d="([^"]*)"/g)) {
    const toks = m[1].match(/[MLCZ]|-?\d*\.?\d+/g) || [];
    let cur = null, i = 0;
    while (i < toks.length) {
      const c = toks[i++];
      if (c === 'M' || c === 'L') {
        const p = [+toks[i++], +toks[i++]];
        if (c === 'L' && Math.hypot(p[0] - cur[0], p[1] - cur[1]) < 0.01) { bad++; console.log(n, f.slice(21, 40), 'short L', p.map((v) => v.toFixed(4)).join(',')); }
        cur = p;
      } else if (c === 'C') {
        const c1 = [+toks[i++], +toks[i++]], c2 = [+toks[i++], +toks[i++]], p = [+toks[i++], +toks[i++]];
        if (Math.hypot(p[0] - cur[0], p[1] - cur[1]) < 0.01) { bad++; console.log(n, f.slice(21, 40), 'short C', p.map((v) => v.toFixed(4)).join(',')); }
        cur = p;
      }
    }
  }
}
console.log(bad ? `${bad} piece(s) a re-import would drop` : 'no degenerate pieces');
