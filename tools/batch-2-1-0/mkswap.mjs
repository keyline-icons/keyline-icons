// node mkswap.mjs OUTDIR name... > payload.js : a guarded in-place swap for the named sets, ss-*.js format
import fs from 'node:fs';
const [out, ...names] = process.argv.slice(2);
const D = [], idx = new Map(), JOBS = [];
const id = (d) => { if (!idx.has(d)) { idx.set(d, D.length); D.push(d); } return idx.get(d); };
for (const n of names) {
  const v = {};
  for (const f of fs.readdirSync(`${out}/raw/${n}`)) {
    const m = f.match(/Container=(\w+), Style=([\w-]+), Corners=(\w+)/);
    const key = (m[3] === 'sharp' ? 's' : 'r') + m[2][0] + m[1][0];
    const s = fs.readFileSync(`${out}/raw/${n}/${f}`, 'utf8');
    v[key] = [...s.matchAll(/<path ([^>]*)>/g)].map(([, a]) => {
      const d = a.match(/\bd="([^"]+)"/)[1];
      let k = /stroke=/.test(a) ? (/stroke-opacity="0\.4"/.test(a) ? 'm' : 's') : (/fill-opacity="0\.4"/.test(a) ? 'p' : 'f');
      if (/stroke-linejoin="miter"/.test(a)) k = k.toUpperCase();
      return k + id(d);
    });
  }
  JOBS.push({ n, x: 0, y: 0, v });
}
const h = (t) => { let h = 0x811c9dc5; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h; };
const tail = fs.readFileSync('ss-0.js', 'utf8').split('\n').slice(4).filter((l) => !l.startsWith('const JOBS') && !l.startsWith('if (((t)'));
const head = fs.readFileSync('ss-0.js', 'utf8').split('\n').slice(1, 4);
const body = [`const D = ${JSON.stringify(D)};`, ...head, `const JOBS = ${JSON.stringify(JOBS)};`,
  `if (((t) => { let h = 0x811c9dc5; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h; })(JSON.stringify(D) + JSON.stringify(JOBS)) !== ${h(JSON.stringify(D) + JSON.stringify(JOBS))}) throw new Error("payload checksum mismatch");`, ...tail].join('\n');
process.stdout.write(body);
