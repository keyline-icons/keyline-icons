// Fit each subpath to its own counterpart in the rounded drawing, not the icon
// to the icon. skip-back's bar was never the problem, so it must not move: only
// the contour that grew gets touched, and it keeps its own place on the grid.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { pathBBox, tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
import { refillet } from './refillet-lib.mjs';
const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
mkdirSync('r1-parts', { recursive: true });
const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };

/** Split a `d` into its subpaths, keeping each one's own string. */
function splitSubpaths(d) {
  const parts = [];
  let cur = '';
  for (const { cmd, args } of tokenize(d)) {
    const piece = cmd + args.map((a) => n(a)).join(' ');
    if (cmd.toUpperCase() === 'M' && cur) { parts.push(cur); cur = ''; }
    cur += piece;
  }
  if (cur) parts.push(cur);
  return parts;
}
function xform(d, sx, sy, tx, ty) {
  const X = (v) => n(v * sx + tx), Y = (v) => n(v * sy + ty);
  let out = '', x = 0, y = 0, mx = 0, my = 0;
  for (const { cmd, args } of tokenize(d)) {
    const U = cmd.toUpperCase();
    if (U === 'M' || U === 'L') { x = args[0]; y = args[1]; if (U === 'M') { mx = x; my = y; } out += `${U}${X(x)} ${Y(y)}`; }
    else if (U === 'H') { x = args[0]; out += `H${X(x)}`; }
    else if (U === 'V') { y = args[0]; out += `V${Y(y)}`; }
    else if (U === 'C') { out += `C${X(args[0])} ${Y(args[1])} ${X(args[2])} ${Y(args[3])} ${X(args[4])} ${Y(args[5])}`; x = args[4]; y = args[5]; }
    else if (U === 'Z') { out += 'Z'; x = mx; y = my; }
    else return null;
  }
  return out;
}
const size = (b) => [b[2]-b[0], b[3]-b[1]];

const names = JSON.parse(readFileSync('radius-test.json','utf8')).filter(r => r['1'] > 0.001).map(r => r.name);
const report = [];
for (const name of names) {
  const rSrc = readFileSync(`${K}/${name}.svg`, 'utf8');
  const vSrc = readFileSync(`sharp-roundcap/${name}.svg`, 'utf8');
  const rPaths = [...rSrc.matchAll(/ d="([^"]+)"/g)].map(m => m[1]);
  const vPaths = [...vSrc.matchAll(/ d="([^"]+)"/g)].map(m => m[1]);
  if (rPaths.length !== vPaths.length) { report.push({ name, skipped: 'path count differs' }); continue; }

  let moved = 0, kept = 0, ok = true;
  const outPaths = vPaths.map((vd, i) => {
    const rSubs = splitSubpaths(rPaths[i]), vSubs = splitSubpaths(vd);
    if (rSubs.length !== vSubs.length) { ok = false; return vd; }
    return vSubs.map((vs, j) => {
      const T = pathBBox(rSubs[j]);
      let s = vs, sx = 1, sy = 1, tx = 0, ty = 0;
      for (let k = 0; k < 30; k++) {
        const f = refillet(xform(vs, sx, sy, tx, ty), 1);
        if (f === null) return vs;
        const b = pathBBox(f);
        const err = Math.max(...b.map((v, q) => Math.abs(v - T[q])));
        if (err < 0.002) { s = f; break; }
        const [bw, bh] = size(b), [tw, th] = size(T);
        if (bw > 1e-6) sx *= tw / bw;
        if (bh > 1e-6) sy *= th / bh;
        const b2 = pathBBox(refillet(xform(vs, sx, sy, 0, 0), 1));
        tx = T[0] - b2[0]; ty = T[1] - b2[1];
        s = refillet(xform(vs, sx, sy, tx, ty), 1);
      }
      if (Math.abs(sx - 1) > 0.002 || Math.abs(sy - 1) > 0.002) moved++; else kept++;
      return s;
    }).join('');
  });
  if (!ok) { report.push({ name, skipped: 'subpath count differs' }); continue; }
  let idx = 0;
  const out = vSrc.replace(/ d="([^"]+)"/g, () => ` d="${outPaths[idx++]}"`);
  writeFileSync(`r1-parts/${name}.svg`, out);
  report.push({ name, contoursMoved: moved, contoursUntouched: kept });
}
console.log(report.map(r => r.skipped ? `${r.name.padEnd(28)} skipped: ${r.skipped}` : `${r.name.padEnd(28)} moved ${r.contoursMoved}, left alone ${r.contoursUntouched}`).join('\n'));
