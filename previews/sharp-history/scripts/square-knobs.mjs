// Square the toggle bodies/knobs and the sliders-2 handles in the SHARP set.
//   node square-knobs.mjs [--write]
//
// §19 exempted `sliders*` and `toggle*` from the outline sharpener by name, so
// their sharp variants came through as verbatim copies of the rounded capsules.
// Zafar's call, 30 Aug: "toggles in sharp must be square shaped" and "in sharp
// handlers must be square shaped", with a code example whose handles are 8 x 6
// rectangles at r=0.5. That radius is taken as the definition of "square
// shaped" here and applied to both families, so the two controls agree.
//
// Boxes are unchanged: only the corner treatment moves, so every painted box
// still matches the rounded drawing exactly. A stroked r=0.5 rectangle paints
// an outer contour at r=1.5, which is what the plates and knockouts carry.
import { writeFileSync, readFileSync } from 'node:fs';

const H = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const WRITE = process.argv.includes('--write');
const R = 0.5;                       // drawn corner, from Zafar's example
const K = 0.5522847498;
const n = (v) => { const q = +v.toFixed(4); return Object.is(q, -0) ? '0' : String(q); };

/** Rounded rectangle as M/L/C/Z, clockwise from the top-left corner's end. */
function rrect([x0, y0, x1, y1], r) {
  if (r <= 0) return `M${n(x0)} ${n(y0)}L${n(x1)} ${n(y0)}L${n(x1)} ${n(y1)}L${n(x0)} ${n(y1)}Z`;
  const k = r * K;
  return `M${n(x0 + r)} ${n(y0)}L${n(x1 - r)} ${n(y0)}`
    + `C${n(x1 - r + k)} ${n(y0)} ${n(x1)} ${n(y0 + r - k)} ${n(x1)} ${n(y0 + r)}`
    + `L${n(x1)} ${n(y1 - r)}`
    + `C${n(x1)} ${n(y1 - r + k)} ${n(x1 - r + k)} ${n(y1)} ${n(x1 - r)} ${n(y1)}`
    + `L${n(x0 + r)} ${n(y1)}`
    + `C${n(x0 + r - k)} ${n(y1)} ${n(x0)} ${n(y1 - r + k)} ${n(x0)} ${n(y1 - r)}`
    + `L${n(x0)} ${n(y0 + r)}`
    + `C${n(x0)} ${n(y0 + r - k)} ${n(x0 + r - k)} ${n(y0)} ${n(x0 + r)} ${n(y0)}Z`;
}
const grow = ([x0, y0, x1, y1], d) => [x0 - d, y0 - d, x1 + d, y1 + d];

const STROKE_HEAD = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="round">';
const PLAIN_HEAD = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">';
const doc = (head, paths) => `${head}\n${paths.map((p) => '  ' + p).join('\n')}\n</svg>\n`;

const TOGGLE = { body: [2, 6, 22, 18], knob: { 'toggle-on': [14, 10, 18, 14], 'toggle-off': [6, 10, 10, 14] } };
const SLIDERS = {
  'sliders-2-horizontal': {
    handles: [[6, 4, 14, 10], [10, 14, 18, 20]],
    railsStroke: 'M2 7L6 7M14 7L22 7M2 17L10 17M18 17L22 17',
    railsFill: 'M2 7L7 7M13 7L22 7M2 17L11 17M17 17L22 17',
  },
  'sliders-2-vertical': {
    handles: [[4, 6, 10, 14], [14, 10, 20, 18]],
    railsStroke: 'M7 2L7 6M7 14L7 22M17 2L17 10M17 18L17 22',
    railsFill: 'M7 2L7 7M7 13L7 22M17 2L17 11M17 17L17 22',
  },
};

const files = {};
for (const name of ['toggle-on', 'toggle-off']) {
  const body = rrect(TOGGLE.body, R), knob = rrect(TOGGLE.knob[name], R);
  const plate = rrect(grow(TOGGLE.body, 1), R + 1);
  const hole = rrect(grow(TOGGLE.knob[name], 1), R + 1);
  files[`solved-mid/${name}.svg`] = doc(STROKE_HEAD, [`<path d="${body}"/>`, `<path d="${knob}"/>`]);
  files[`solved-duotone/${name}.svg`] = doc(STROKE_HEAD, [
    `<path d="${plate}" fill="currentColor" fill-opacity="0.4" stroke="none"/>`,
    `<path d="${body}"/>`, `<path d="${knob}"/>`]);
  files[`solved-fill/${name}.svg`] = doc(PLAIN_HEAD, [
    `<path d="${plate}${hole}" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>`]);
}
for (const [name, S] of Object.entries(SLIDERS)) {
  const handles = S.handles.map((h) => rrect(h, R)).join('');
  const plates = S.handles.map((h) => rrect(grow(h, 1), R + 1)).join('');
  files[`solved-mid/${name}.svg`] = doc(STROKE_HEAD, [`<path d="${handles}${S.railsStroke}"/>`]);
  files[`solved-duotone/${name}.svg`] = doc(STROKE_HEAD, [
    `<path d="${plates}" fill="currentColor" fill-opacity="0.4" stroke="none"/>`,
    `<path d="${handles}${S.railsStroke}"/>`]);
  files[`solved-fill/${name}.svg`] = doc(STROKE_HEAD, [
    `<path d="${plates}" fill="currentColor" stroke="none"/>`,
    `<path d="${S.railsFill}"/>`]);
}

for (const [rel, body] of Object.entries(files)) {
  const before = readFileSync(`${H}/${rel}`, 'utf8');
  console.log(`${rel.padEnd(38)} ${before === body ? 'unchanged' : 'rewritten'}`);
  if (WRITE) writeFileSync(`${H}/${rel}`, body);
}
console.log({ files: Object.keys(files).length, written: WRITE });
