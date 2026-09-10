/**
 * Emit the badge family into raw/ (or --out=DIR/raw).
 *   node tools/badge/build.mjs [name ...] [--out=DIR]
 *
 * The badge is a scalloped ring: eight bumps of r=4.5 whose centres sit at
 * radius 5.5 about (12,12), so the peaks land on radius 10 and the ink on the
 * circle size, 1..23, while the notches between bumps fall on 9.06. The peak
 * is the circle size; the count and radius are Zafar's, settled 10 Sep 2026
 * after two rounds. The first cut was eight bumps of r=4 on 6, the deepest
 * that clears the signs, and that is Lucide's badge to the number: it was
 * measured before drawing and the "derivation" landed on it, so it went. Ten
 * bumps of r=3.5 followed and were swapped again for this, which keeps the
 * eight-lobe rosette at a shallower scallop than theirs. A badge is a
 * container, so it carries the `circle` signs
 * verbatim, read out of each base's own circle variant: stroke, duotone and
 * fill, both treatments, with the disc swapped for the badge. The currency
 * marks clear by 1, the letterform allowance the circled marks already take.
 *
 * Nothing in it has a fillet or a free end, so sharp and rounded share the
 * ring; only the signs change treatment, and they come from the sharp circle
 * files. The cusps between bumps are true reflex vertices, `cloud`'s notch,
 * and the plate trims there.
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { offsetContour, contourPath, verify, flatten } from '../v5/offset.mjs';
import { onArc, sub, len } from '../v5/geom.mjs';
import { strokedBBox, outlines } from '../../pipeline/lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const flag = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? Number(a.slice(k.length + 3)) : d; };
/**
 * A bump count divisible by four puts a peak on every cardinal, so the ring
 * lands on 1..23 both ways as drawn. Any other count cannot (a peak on the x
 * axis means a notch on the y axis), so it is turned half a pitch off the
 * axes, which makes the pattern symmetric both ways, and scaled about the
 * centre by the hair that lands the ink on the box. Off-grid parameters,
 * on-grid extremes: the arc is what paints.
 */
const BUMPS = flag('bumps', 8), R0 = flag('r', 4.5), C = [12, 12];
const ROT = BUMPS % 4 === 0 ? 0 : 180 / BUMPS / 2;
const K = 10 / ((10 - R0) * Math.cos((ROT * Math.PI) / 180) + R0);
const R = R0 * K, CR = (10 - R0) * K;

/* ------------------------------------------------------------ the ring */

const deg = (c, p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
const NOTCH = CR * Math.cos(Math.PI / BUMPS) + Math.sqrt(R * R - (CR * Math.sin(Math.PI / BUMPS)) ** 2);
export function badgeSegs() {
  const segs = [];
  for (let k = 0; k < BUMPS; k++) {
    const a = (k * 360) / BUMPS + ROT;
    const c = onArc(C, CR, a);
    const p0 = onArc(C, NOTCH, a - 180 / BUMPS), p1 = onArc(C, NOTCH, a + 180 / BUMPS);
    for (const p of [p0, p1]) if (Math.abs(len(sub(p, c)) - R) > 1e-9) throw new Error('notch off the bump');
    let a0 = deg(c, p0), a1 = deg(c, p1);
    while (a1 <= a0) a1 += 360;
    segs.push({ type: 'A', c, r: R, a0, a1 });
  }
  return segs;
}
const RING = badgeSegs();
const PLATE = offsetContour(RING, 1);
verify(RING, PLATE, 1);
const ringD = contourPath(RING), plateD = contourPath(PLATE);

/* ------------------------------------------------------------ the signs */

const SIGNS = ['check', 'x', 'plus', 'minus', 'alert', 'info', 'question', 'percent'];
const MARKS = ['dollar-sign', 'euro', 'pound-sterling', 'japanese-yen', 'indian-rupee', 'swiss-franc'];

/**
 * `info` has no circle variant of its own: the reference defines it as the
 * alert glyph inverted about the box's centre line, so the badge takes the
 * alert's circle layers turned over about y = 12, dot up and stem down.
 */
const flipY = (d) => d.replace(/([MLCHV])([^MLCHVZ]*)/g, (m, cmd, nums) => {
  const v = nums.trim().split(/[\s,]+/).filter(Boolean).map(Number);
  if (cmd === 'H') return cmd + v.join(' ');
  if (cmd === 'V') return cmd + v.map((y) => num(24 - y)).join(' ');
  return cmd + v.map((n, i) => (i % 2 ? num(24 - n) : num(n))).join(' ');
});
const num = (v) => String(Math.round(v * 1e4) / 1e4);

/** The layers of a base's circle variant with the disc taken out. */
function signLayers(base, style, corners) {
  if (base === 'info') return signLayers('alert', style, corners).map((l) => ({ ...l, d: flipY(l.d) }));
  const src = readFileSync(join(ROOT, 'raw', base, `Container=circle, Style=${style}, Corners=${corners}.svg`), 'utf8');
  const isDisc = (d) => { const b = strokedBBox(d, 0, 'butt'); return b[2] - b[0] > 19 && b[3] - b[1] > 19; };
  const out = [];
  for (const m of src.matchAll(/<path ([^>]*)>/g)) {
    const attrs = m[1];
    const d = /d="([^"]*)"/.exec(attrs)[1];
    const plate = /fill-opacity="0.4"/.test(attrs);
    const stroked = /stroke="black"/.test(attrs) && !/stroke-opacity/.test(attrs);
    if (plate) continue;                       // the disc's plate: the badge brings its own
    const subs = d.split(/(?=M)/).filter((s) => !isDisc(s));
    if (!subs.length) continue;                // the stroked disc itself
    if (subs.length !== d.split(/(?=M)/).length && stroked) throw new Error(`${base} ${style} ${corners}: a stroke shares a path with the disc`);
    out.push({ kind: stroked ? 'stroke' : style === 'fill' ? 'hole' : 'solid', d: subs.join('') });
  }
  if (!out.length) throw new Error(`${base} ${style} ${corners}: no sign found`);
  return out;
}

/** The painted gap between the ring and a sign's layers; a solid reaches 0, a stroke 1. */
function clearance(layers) {
  const ring = outlines(ringD, 200).flat();
  let best = Infinity;
  for (const l of layers) {
    const reach = l.kind === 'stroke' ? 1 : 0;
    for (const p of outlines(l.d, 60).flat()) {
      let m = Infinity;
      for (const q of ring) m = Math.min(m, len(sub(p, q)));
      best = Math.min(best, m - 1 - reach);
    }
  }
  return best;
}

/* ---------------------------------------------------------- the writer */

const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
const paint = (l, cap) => l.kind === 'stroke'
  ? `<path d="${l.d}" fill="none" stroke="black" stroke-width="2" stroke-linecap="${cap}" stroke-linejoin="round"/>`
  : l.kind === 'plate' ? `<path d="${l.d}" fill="black" fill-opacity="0.4"/>`
  : l.kind === 'evenodd' ? `<path d="${l.d}" fill="black" fill-rule="evenodd" clip-rule="evenodd"/>`
  : `<path d="${l.d}" fill="black"/>`;
function writeSet(root, name, variants) {
  const dir = join(root, 'raw', name);
  mkdirSync(dir, { recursive: true });
  for (const [key, layers] of Object.entries(variants)) {
    const [style, corners] = key.split('.');
    const cap = corners === 'sharp' ? 'butt' : 'round';
    writeFileSync(join(dir, `Container=regular, Style=${style}, Corners=${corners}.svg`), [HEAD, ...layers.map((l) => paint(l, cap)), '</svg>', ''].join('\n'));
  }
}

/* ------------------------------------------------------------ the sets */

export const SETS = {};
export const SHORT = [];
SETS.badge = () => {
  const out = {};
  for (const key of ['regular', 'sharp']) {
    out[`stroke.${key}`] = [{ kind: 'stroke', d: ringD }];
    out[`duotone.${key}`] = [{ kind: 'plate', d: plateD }, { kind: 'stroke', d: ringD }];
    out[`fill.${key}`] = [{ kind: 'solid', d: plateD }];
  }
  return out;
};
for (const base of [...SIGNS, ...MARKS]) SETS[`badge-${base}`] = () => {
  const out = {};
  const want = MARKS.includes(base) ? 1 : 2;      // a letterform clears its frame by 1
  for (const corners of ['regular', 'sharp']) {
    const stroke = signLayers(base, 'stroke', corners);
    // measured on the ROUNDED sign: a sharp end is pushed out along its
    // tangent and paints a bar, so a disc reach there double-counts the unit
    const gap = clearance(signLayers(base, 'stroke', 'regular'));
    // A mark that does not clear is not drawn: the circled marks were drawn for
    // the circle's well of 9 at 1 of clearance, and the badge's well is 8.06 at
    // the notches, so a wide letter cannot be given the badge without scaling,
    // which the gap ladder forbids. Report the number and leave the set out.
    if (gap < want - 0.02) { SHORT.push(`badge-${base} clears ${gap.toFixed(2)}, wants ${want}`); return null; }
    const duo = signLayers(base, 'duotone', corners);
    const fill = signLayers(base, 'fill', corners);
    if (fill.some((l) => l.kind === 'stroke')) throw new Error(`badge-${base}: a stroked layer in the fill`);
    out[`stroke.${corners}`] = [{ kind: 'stroke', d: ringD }, ...stroke];
    out[`duotone.${corners}`] = [{ kind: 'plate', d: plateD }, ...duo];
    // the circle fills are evenodd, so every subpath after the disc is a knockout
    out[`fill.${corners}`] = [{ kind: 'evenodd', d: plateD + fill.map((l) => l.d).join('') }];
  }
  return out;
};

/* ------------------------------------------------------------------ main */

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
function main() {
  const args = process.argv.slice(2);
  const outArg = args.find((a) => a.startsWith('--out='));
  const root = outArg ? resolve(outArg.slice(6)) : ROOT;
  const want = args.filter((a) => !a.startsWith('--'));
  const names = want.length ? want : Object.keys(SETS);
  console.log(`ring: ${BUMPS} bumps r=${R.toFixed(4)} at ${CR.toFixed(4)}, turned ${ROT}, notch ${NOTCH.toFixed(3)}`);
  for (const name of names) {
    if (!SETS[name]) throw new Error(`no such set: ${name}`);
    const variants = SETS[name]();
    if (!variants) { console.log(name.padEnd(22), 'not drawn:', SHORT[SHORT.length - 1]); continue; }
    writeSet(root, name, variants);
    const inkOf = (layers, cap) => {
      let b = null;
      for (const l of layers) {
        const q = strokedBBox(l.d, l.kind === 'stroke' ? 1 : 0, cap);
        b = b ? [Math.min(b[0], q[0]), Math.min(b[1], q[1]), Math.max(b[2], q[2]), Math.max(b[3], q[3])] : q;
      }
      return b;
    };
    const box = inkOf(variants['stroke.regular'], 'round'), sbox = inkOf(variants['stroke.sharp'], 'butt');
    const base = name.replace(/^badge-?/, '');
    const gap = base ? clearance(signLayers(base, 'stroke', 'regular')).toFixed(2) : '-';
    console.log(name.padEnd(22), 'ink', box.map((v) => v.toFixed(2).padStart(6)).join(' '), ' sharp', sbox.map((v) => v.toFixed(2).padStart(6)).join(' '), ' gap', gap);
  }
}
