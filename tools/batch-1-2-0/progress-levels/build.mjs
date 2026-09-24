// Drafts for Keyline Icons 1.2.0, group progress-levels:
//   hourglass-start, hourglass-half, hourglass-end, gauge-low, gauge-high
//
//   node build.mjs          writes raw/<name>/*.svg beside this file, 8 per name
//
// Reads only ./base/ (copies of the shipped raw/hourglass and raw/gauge) and
// writes only ./raw/. Every coordinate comes out of hourglass.mjs, gauge.mjs and
// geo.mjs; nothing is typed into an SVG by hand.
import { readFileSync, writeFileSync, mkdirSync, rmSync, realpathSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RAW, outDir } from '../paths.mjs';
import * as HG from './hourglass.mjs';
import * as GA from './gauge.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const base = (name) => (f) => readFileSync(join(RAW, name, f), 'utf8');

// Sand levels, centre line of the level line (null: that bulb holds no sand).
// Every line ends on a straight run of a wall (vertical 2..6.0633 and
// 17.9367..22, diagonal 7.5997..12 and 12..16.4003; the r=2 shoulder fillets lie
// between) and clears a bar by 2 painted. That leaves 6 and 8 in the upper bulb,
// 16 and 18 in the lower. 7 and 17 (the fillets) were drawn and set aside: they
// end on a curve, and they are the lines the second reference set draws in its
// own hourglass family. Half-units rendered blurred at 24px.
//
// hourglass-end sits at 18, his pick in round 2. At 16 the sand filled the
// lower bulb to 4.08 x 1.70 of air under the waist, so its fill was the plain
// hourglass fill plus a speck and the two read the same at 16px. At 18 the
// air is 3.70 tall (8.88 wide at its foot) and the lower sand is half's; what
// tells end from half is the upper bulb, empty here and holding half's funnel
// there. px16.mjs measures the 16px reading in Chrome's own render: against
// the plain hourglass the fill moves 6 pixels by a quarter or more at 1x (2
// at 16), against half 10; stroke 13 and 8, duotone 30 and 18.
export const HOURGLASS = {
  'hourglass-start': { up: 6, low: null },
  'hourglass-half': { up: 8, low: 18 },
  'hourglass-end': { up: null, low: 18 },
};
export const GAUGE = { 'gauge-low': 225, 'gauge-high': 315 };

// --- self-tests: the generators regenerate the base's own segments ----------
const nums = (d) => d.match(/-?\d*\.?\d+/g).map(Number);
function near(a, b, label, tol = 2e-4) {
  const x = nums(a), y = nums(b);
  if (x.length !== y.length || x.some((v, i) => Math.abs(v - y[i]) > tol))
    throw new Error(`${label}: regenerated\n  ${a}\nshipped\n  ${b}`);
}
for (const c of ['regular', 'sharp']) {
  const fill = base('hourglass')(`Container=regular, Style=fill, Corners=${c}.svg`);
  const hole = fill.match(/Z(M7 3[^Z]*Z)/)[1].replace(/L7 3Z$/, 'Z');
  near(HG.baseKnockout(c), hole, `hourglass ${c} upper knockout`);
  const gfill = base('gauge')(`Container=regular, Style=fill, Corners=${c}.svg`);
  near(GA.needleHole(270, c), gfill.match(/(M13 10\.2679[^Z]*Z)/)[1], `gauge ${c} needle hole`);
  const gstroke = base('gauge')(`Container=regular, Style=stroke, Corners=${c}.svg`);
  const marks = [180, 225, 315, 360].map((m) => GA.dot([12 + 6 * Math.cos(m * Math.PI / 180), 12 + 6 * Math.sin(m * Math.PI / 180)], true)).join('');
  const shippedMarks = gstroke.match(/<path d="M14 12C[^Z]*Z([^"]*)" fill="black"/)[1];
  if (marks !== shippedMarks) throw new Error(`gauge ${c} marks differ:\n${marks}\n${shippedMarks}`);
}

// --- assertions on the drawings themselves ---------------------------------
for (const [name, cfg] of Object.entries(HOURGLASS)) {
  // a level line ends on a straight run of the wall, and clears the bars by 2
  const onRun = (y, runs) => runs.some(([a, b]) => y >= a - 1e-9 && y <= b + 1e-9);
  if (cfg.up != null) {
    if (!onRun(cfg.up, [HG.RUNS.upperVertical, HG.RUNS.upperDiagonal])) throw new Error(`${name}: upper level ${cfg.up} on a fillet`);
    if ((cfg.up - 1) - 3 < 2 - 1e-9) throw new Error(`${name}: upper level ${cfg.up} within 2 of the bar`);
  }
  if (cfg.low != null) {
    if (!onRun(cfg.low, [HG.RUNS.lowerVertical, HG.RUNS.lowerDiagonal])) throw new Error(`${name}: lower level ${cfg.low} on a fillet`);
    if (21 - (cfg.low + 1) < 2 - 1e-9) throw new Error(`${name}: lower level ${cfg.low} within 2 of the bar`);
  }
}

// --- write, only when run as the command (a flag is not a guard) ---------
const OUT = join(outDir(), 'raw');
if (process.argv[1] && realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1])) {
const all = {};
for (const [name, cfg] of Object.entries(HOURGLASS)) all[name] = HG.build(cfg, base('hourglass'));
for (const [name, deg] of Object.entries(GAUGE)) all[name] = GA.build(deg, base('gauge'));
for (const [name, files] of Object.entries(all)) {
  if (Object.keys(files).length !== 8) throw new Error(`${name}: ${Object.keys(files).length} files`);
  if (new Set(Object.values(files)).size !== 8) throw new Error(`${name}: two variants identical`);
  const dir = join(OUT, name);
  mkdirSync(dir, { recursive: true });
  for (const [f, svg] of Object.entries(files)) writeFileSync(join(dir, f), svg);
}
console.log(`wrote ${Object.keys(all).length} names, ${Object.keys(all).length * 8} files to ${OUT}`);
}
