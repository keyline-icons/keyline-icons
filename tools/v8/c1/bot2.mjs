/**
 * bot-2, his standalone drawing (not a sparkle compound), in the house styles
 * he showed on 21 Sep 2026: two-tone a grey disc under the ring and eyes,
 * duotone the grey disc with black eyes, fill a black disc with the eyes
 * knocked out. Sharp keeps the ring round (circles stay circles) and gives the
 * eyes butt caps, each end run out along its tangent by the cap cut,
 * k = (1 - sin t) / cos t, t the angle off the nearer axis (sharp.md).
 *
 *   node tools/v8/c1/bot2.mjs <outDir>          his drawing from C1_REFS or refs/
 */
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { REFS } from './kit.mjs';

const OUT = process.argv[2];
const f = (v) => { const s = (Math.round(v * 1e4) / 1e4).toFixed(4).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; };
const ref = readFileSync(join(REFS, 'bot-2.svg'), 'utf8');
const ds = [...ref.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
const ring = ds.find((d) => /Z\s*$/.test(d));
const eyesD = ds.find((d) => d !== ring);
const eyes = [...eyesD.matchAll(/M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)/g)].map((m) => [[+m[1], +m[2]], [+m[3], +m[4]]]);
// the ring: centre and radius off his path
const nums = ring.match(/-?[\d.]+/g).map(Number);
const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1);
const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2, r = (Math.max(...xs) - Math.min(...xs)) / 2;
const K = 0.5522847498;
const circle = (x, y, R, cw = true) => {
  const k = K * R;
  return cw
    ? `M${f(x)} ${f(y - R)}C${f(x + k)} ${f(y - R)} ${f(x + R)} ${f(y - k)} ${f(x + R)} ${f(y)}C${f(x + R)} ${f(y + k)} ${f(x + k)} ${f(y + R)} ${f(x)} ${f(y + R)}C${f(x - k)} ${f(y + R)} ${f(x - R)} ${f(y + k)} ${f(x - R)} ${f(y)}C${f(x - R)} ${f(y - k)} ${f(x - k)} ${f(y - R)} ${f(x)} ${f(y - R)}Z`
    : `M${f(x)} ${f(y - R)}C${f(x - k)} ${f(y - R)} ${f(x - R)} ${f(y - k)} ${f(x - R)} ${f(y)}C${f(x - R)} ${f(y + k)} ${f(x - k)} ${f(y + R)} ${f(x)} ${f(y + R)}C${f(x + k)} ${f(y + R)} ${f(x + R)} ${f(y + k)} ${f(x + R)} ${f(y)}C${f(x + R)} ${f(y - k)} ${f(x + k)} ${f(y - R)} ${f(x)} ${f(y - R)}Z`;
};
const unit = ([a, b]) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); return [dx / L, dy / L]; };
/** The painted footprint of a 2-wide stroke from a to b: round caps (a capsule) or butt (a bar). */
function footprint([a, b], round) {
  const u = unit([a, b]), n = [-u[1], u[0]];
  const p = (q, s, t) => [q[0] + n[0] * s + u[0] * t, q[1] + n[1] * s + u[1] * t];
  const P = (q) => `${f(q[0])} ${f(q[1])}`;
  if (!round) return `M${P(p(a, 1, 0))}L${P(p(b, 1, 0))}L${P(p(b, -1, 0))}L${P(p(a, -1, 0))}Z`;
  // written out directly: around b from +n to +u to -n, around a from -n to -u to +n
  const q = (c, s, t) => P(p(c, s, t));
  return `M${q(a, 1, 0)}L${q(b, 1, 0)}C${q(b, 1, K)} ${q(b, K, 1)} ${q(b, 0, 1)}C${q(b, -K, 1)} ${q(b, -1, K)} ${q(b, -1, 0)}L${q(a, -1, 0)}C${q(a, -1, -K)} ${q(a, -K, -1)} ${q(a, 0, -1)}C${q(a, K, -1)} ${q(a, 1, -K)} ${q(a, 1, 0)}Z`;
}
/** Butt ends run out by the cap cut along the tangent. */
function sharpen([a, b]) {
  const u = unit([a, b]);
  const ang = Math.atan2(Math.abs(u[1]), Math.abs(u[0])); // 0 flat, pi/2 upright
  const th = Math.min(ang, Math.PI / 2 - ang);             // off the nearer axis
  const k = (1 - Math.sin(th)) / Math.cos(th);
  return [[a[0] - u[0] * k, a[1] - u[1] * k], [b[0] + u[0] * k, b[1] + u[1] * k]];
}
const line = (e) => `M${f(e[0][0])} ${f(e[0][1])}L${f(e[1][0])} ${f(e[1][1])}`;
const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';
const st = (d, sharp) => `<path d="${d}" stroke="black" stroke-width="2" stroke-linecap="${sharp ? 'butt' : 'round'}" stroke-linejoin="round"/>\n`;
const plate = (op) => `<path d="${circle(cx, cy, r + 1)}" fill="black"${op < 1 ? ` fill-opacity="${op}"` : ''}/>\n`;
const out = {};
for (const corners of ['regular', 'sharp']) {
  const sharp = corners === 'sharp';
  const es = sharp ? eyes.map(sharpen) : eyes;
  const eyeD = sharp ? es.map(line).join('') : eyesD; // regular: his lines verbatim
  const ringD = ring; // his ring, verbatim in both corners (circles stay circles)
  const holes = es.map((e) => footprint(e, !sharp)).join('');
  out[`Container=regular, Style=stroke, Corners=${corners}.svg`] = HEAD + st(ringD, sharp) + st(eyeD, sharp) + '</svg>\n';
  out[`Container=regular, Style=two-tone, Corners=${corners}.svg`] = HEAD + plate(0.4) + st(ringD, sharp) + st(eyeD, sharp) + '</svg>\n';
  out[`Container=regular, Style=duotone, Corners=${corners}.svg`] = HEAD + plate(0.4) + st(eyeD, sharp) + '</svg>\n';
  out[`Container=regular, Style=fill, Corners=${corners}.svg`] = HEAD + `<path fill-rule="evenodd" clip-rule="evenodd" d="${circle(cx, cy, r + 1)}${holes}" fill="black"/>\n` + '</svg>\n';
}
// shipped as bot-2, renamed bot-circle in 1.5.0 (lib/icon-renames.json)
const dir = join(OUT, 'raw', 'bot-circle');
mkdirSync(dir, { recursive: true });
for (const [n, s] of Object.entries(out)) writeFileSync(join(dir, n), s);
console.log(`ring c ${f(cx)},${f(cy)} r ${f(r)}; eyes ${eyes.map(line).join(' ')}; sharp ${eyes.map(sharpen).map(line).join(' ')}`);
