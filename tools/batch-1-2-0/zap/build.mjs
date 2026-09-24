/**
 * The -zap family (1.2.0), his ask of 24 Sep 2026 on seeing database-zap: "what
 * other icons can have zap modifier? add them this kind of zap too."
 *
 * The bolt is truck-electric's, drawn at the sign size: two 45 degree runs and a
 * level bar, 4 wide in the 6 box, CENTRED on the box like every other sign (his
 * call, 24 Sep 2026: flush right "looks wrong in all cases"). It lies inside the
 * x's footprint, and every corner family sizes its notch for the x (the one sign
 * that reaches all four box corners), so a -zap is its family's -plus with the
 * sign swapped: same body, same notch, same plate. Families without an x (server,
 * home, database) are measured rather than assumed.
 *
 * Where the body reaches the box's outer edge (calendar, clock, file, folder,
 * mail, smartphone, tablet, package) the body sets the ink box and centring costs
 * nothing. Where the sign sits OUTSIDE the body (user, server, home, database)
 * the plus's ink set the right edge, and a centred bolt stops a unit short. There
 * the whole body shifts a unit right (SHIFT): the bolt's left ink moved right by
 * the same unit, so every gap to the body is the plus's own, and the compound
 * is even again on whole units. bell keeps its body: its plus left it 2 and 1,
 * the centred bolt makes it 2 and 2.
 *
 * Each file is the shipped (or drafted) <base>-plus variant with the plus's two
 * runs replaced by the bolt in the same path. Asserted per variant: exactly one
 * plus found, ink box unchanged, the bolt 2 painted units clear of every other
 * stroke and 2 of every filled area (regular; sharp's stubs double-count).
 *
 *   node build.mjs   writes raw/<base>-zap/*.svg and prints the gaps
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findPlus, subpaths, src } from './scan.mjs';
import { outDir } from '../paths.mjs';
import { strokedBBox, pathBBox, outlines, minGap } from '../../../pipeline/lib/geom.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(outDir(), 'raw');
export const BASES = ['calendar', 'clock', 'file', 'folder', 'mail', 'smartphone', 'tablet', 'user', 'package', 'bell', 'server', 'home', 'database'];
const SHIFT = { user: 1, server: 1, home: 1, database: 1 };
// credit-card is left out: its shipped sharp plus is an older spelling (runs 6, not pushed a unit
// out as every other family's are), so a bolt there would disagree with its own sibling.
const STYLES = ['stroke', 'two-tone', 'duotone', 'fill'];
const file = (s, c) => `Container=regular, Style=${s}, Corners=${c}.svg`;
const f = (v) => { const s = (Math.round(v * 1e4) / 1e4).toFixed(4).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; };

/** The bolt centred in the 6 box with top-left (x, y); sharp pushes the two free ends 0.2929 a side. */
export function zap(x, y, sharp) {
  const g = sharp ? 0.2929 : 0;
  return `M${f(x + 4 + g)} ${f(y - g)}L${f(x + 1)} ${f(y + 3)}L${f(x + 5)} ${f(y + 3)}L${f(x + 2 - g)} ${f(y + 6 + g)}`;
}

/** Shift a path's x coordinates by dx, token by token, keeping its own spelling (H stays H). */
function shiftX(d, dx) {
  if (!dx) return d;
  let cmd = null, i = 0;
  return d.replace(/([MLHVCZ])|(-?\d*\.?\d+(?:e-?\d+)?)/g, (tok, c, n) => {
    if (c) { cmd = c; i = 0; return tok; }
    const isX = cmd === 'H' || ((cmd === 'M' || cmd === 'L' || cmd === 'C') && i % 2 === 0);
    i++;
    if (!isX) return tok;
    const dec = (tok.split('.')[1] || '').length;
    const v = (+tok + dx).toFixed(dec);
    return dec ? v.replace(/\.?0+$/, '') || '0' : v;
  });
}

function inkOf(svg, sharp) {
  let b = null;
  for (const m of svg.matchAll(/<path([^>]*)>/g)) {
    const a = m[1], d = a.match(/ d="([^"]+)"/)[1];
    const q = / stroke="black"/.test(a) ? strokedBBox(d, 1, sharp ? 'butt' : 'round') : pathBBox(d);
    b = b ? [Math.min(b[0], q[0]), Math.min(b[1], q[1]), Math.max(b[2], q[2]), Math.max(b[3], q[3])] : q;
  }
  return b;
}
const gap = (a, b) => { let m = Infinity; for (const p of outlines(a, 64)) for (const q of outlines(b, 64)) m = Math.min(m, minGap(p, q)); return m; };

const report = {};
for (const base of BASES) {
  const name = `${base}-zap`, dir = join(OUT, name);
  mkdirSync(dir, { recursive: true });
  const r = {};
  for (const c of ['regular', 'sharp']) for (const s of STYLES) {
    const sharp = c === 'sharp';
    const svg = readFileSync(`${src(base + '-plus')}${file(s, c)}`, 'utf8');
    const hits = findPlus(svg);
    if (hits.length !== 1) throw new Error(`${base}-plus ${s} ${c}: ${hits.length} pluses`);
    const [h] = hits;
    if (h.len !== (sharp ? 8 : 6)) throw new Error(`${base}-plus ${s} ${c}: plus runs ${h.len} long`);
    const bolt = zap(h.cx - 3, h.cy - 3, sharp);
    const dx = SHIFT[base] || 0;
    const subs = subpaths(h.d);
    const first = Math.min(h.vi, h.hi);
    const kept = subs.filter((_, i) => i !== h.vi && i !== h.hi).map((sp) => shiftX(sp, dx));
    const d2 = [...kept.slice(0, first), bolt, ...kept.slice(first)].join('');
    // every other path moves with the body; the sign's own path takes the bolt
    let out = svg.replace(/<path([^>]*) d="([^"]+)"([^>]*)>/g, (m, a, d, b) => `<path${a} d="${d === h.d ? d2 : shiftX(d, dx)}"${b}>`);
    if (!out.includes(bolt)) throw new Error(`${name} ${s} ${c}: nothing replaced`);
    // A plus has no corners, so some shipped -plus files leave the join off the path
    // it rides (smartphone-plus's fill): the bolt has two, and the SVG default would
    // mitre them. Give that path the house's round join and touch nothing else.
    out = out.replace(/<path([^>]*) d="([^"]+)"([^>]*)>/g, (m, a, d, b) =>
      d === d2 && / stroke="black"/.test(a + b) && !/stroke-linejoin/.test(a + b) ? `<path${a} d="${d}"${b.replace(/\/$/, ' stroke-linejoin="round"/')}>` : m);
    // paddings: whole, even across; the plus's own vertical (bell and user carry a
    // vertical skew as their -plus does, in SKEW_KNOWN)
    const b0 = inkOf(svg, sharp), b1 = inkOf(out, sharp);
    const pad = (b) => [b[0], b[1], 24 - b[2], 24 - b[3]];
    const p0 = pad(b0), p1 = pad(b1);
    if (p1.some((v) => Math.abs(v - Math.round(v)) > 1e-3)) throw new Error(`${name} ${s} ${c}: pads ${p1.map(f)}`);
    if (Math.abs(p1[0] - p1[2]) > 1e-3) throw new Error(`${name} ${s} ${c}: horizontal pads ${f(p1[0])} and ${f(p1[2])}`);
    if (Math.abs(p1[1] - p0[1]) > 1e-3 || Math.abs(p1[3] - p0[3]) > 1e-3) throw new Error(`${name} ${s} ${c}: vertical pads moved from the plus's`);
    r.pads = p1.map(f).join(' ');
    // clearance, on the rounded drawing
    if (!sharp) {
      let strokeGap = Infinity, areaGap = Infinity;
      for (const m of out.matchAll(/<path([^>]*)>/g)) {
        const a = m[1], d = a.match(/ d="([^"]+)"/)[1];
        const others = subpaths(d).filter((sp) => sp !== bolt).join('');
        if (!others) continue;
        if (/ stroke="black"/.test(a)) strokeGap = Math.min(strokeGap, gap(bolt, others) - 2);
        else areaGap = Math.min(areaGap, gap(bolt, others) - 1);
      }
      if (strokeGap < 1.98 || areaGap < 1.98) throw new Error(`${name} ${s}: bolt clears strokes by ${strokeGap.toFixed(3)}, areas by ${areaGap.toFixed(3)}`);
      r[s] = `${Number.isFinite(strokeGap) ? strokeGap.toFixed(2) : '-'} / ${Number.isFinite(areaGap) ? areaGap.toFixed(2) : '-'}`;
    }
    writeFileSync(join(dir, file(s, c)), out);
  }
  report[name] = r;
  console.log(name.padEnd(16), 'pads', r.pads, '| gap to strokes / areas:', Object.entries(r).filter(([k]) => k !== 'pads').map(([k, v]) => `${k} ${v}`).join('  '));
}
writeFileSync(join(outDir(), 'zap.report.json'), JSON.stringify(report, null, 1) + '\n');
