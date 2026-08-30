// Four sharp repairs around capsule-ended bodies.
//   node capsules.mjs [--write]
//
// MIC / MIC-OFF. The sharpener squared the capsule in the STROKE layer while
// the fill and the duotone's plate kept it round, so the duotone drew a rounded
// grey capsule with a squared black outline on top — a contradiction inside one
// drawing. Zafar's call, 30 Aug: "the mic isn't affected by the shape, fill is
// the right approach for all three". The capsule is restored in the stroke; the
// butt caps and the extended base bar stay sharp.
//
// HEADPHONES / HEADSET. The sharpener squared all four corners of each earpad.
// Zafar's call: "the inner part of the pads must be squared only, doesn't
// include the outer". The outer side of a pad continues the headband's curve
// and keeps its r=2; the inner side goes to a true vertex. Plates are derived
// by offsetClosed rather than authored, so the outer corner comes out at r=3
// and the inner at r=1, which is what a round join paints over a vertex.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { segsOf, offsetClosed } from './offset-tint.mjs';

const H = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const WRITE = process.argv.includes('--write');

// --- literal substitutions in the stroke layer (appears in mid and duotone) ---
const SUBS = {
  mic: [[
    'M9 2L15 2L15 14L9 14L9 2Z',
    'M9 5C9 3.3431 10.3431 2 12 2C13.6569 2 15 3.3431 15 5L15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11L9 5Z',
  ]],
  'mic-off': [
    ['C9.8081 2.6753 10.8252 2 12 2L15 2L15 10.3431',
     'C9.8081 2.6753 10.8252 2 12 2C13.6569 2 15 3.3431 15 5L15 10.3431'],
    ['C13.1069 13.8398 12.5722 14 12 14L9 14L9 9',
     'C13.1069 13.8398 12.5722 14 12 14C10.3431 14 9 12.6569 9 11L9 9'],
  ],
};

// --- earpads: [x0,y0,x1,y1] of the pad box, and which side is OUTER ---
const PADS = {
  headphones: { r: 2, pads: [[3, 10, 7, 21, 'left'], [17, 10, 21, 21, 'right']],
                square: ['M3 10L7 10L7 21L3 21L3 10Z', 'M17 10L21 10L21 21L17 21L17 10Z'] },
  headset:    { r: 2, pads: [[4, 8, 8, 18, 'left'], [16, 8, 20, 18, 'right']],
                square: ['M4 8L8 8L8 18L4 18L4 8Z', 'M16 8L20 8L20 18L16 18L16 8Z'] },
};
const K = 0.5522847498;
const n = (v) => { const q = +v.toFixed(4); return Object.is(q, -0) ? '0' : String(q); };

/** A pad: r on the OUTER side's two corners, a true vertex on the inner two. */
function pad([x0, y0, x1, y1, side], r) {
  const k = r * K;
  if (side === 'left') {                                   // outer edge is x0
    return `M${n(x0)} ${n(y0 + r)}`
      + `C${n(x0)} ${n(y0 + r - k)} ${n(x0 + r - k)} ${n(y0)} ${n(x0 + r)} ${n(y0)}`
      + `L${n(x1)} ${n(y0)}L${n(x1)} ${n(y1)}L${n(x0 + r)} ${n(y1)}`
      + `C${n(x0 + r - k)} ${n(y1)} ${n(x0)} ${n(y1 - r + k)} ${n(x0)} ${n(y1 - r)}`
      + `L${n(x0)} ${n(y0 + r)}Z`;
  }
  return `M${n(x1)} ${n(y0 + r)}`                          // outer edge is x1
    + `C${n(x1)} ${n(y0 + r - k)} ${n(x1 - r + k)} ${n(y0)} ${n(x1 - r)} ${n(y0)}`
    + `L${n(x0)} ${n(y0)}L${n(x0)} ${n(y1)}L${n(x1 - r)} ${n(y1)}`
    + `C${n(x1 - r + k)} ${n(y1)} ${n(x1)} ${n(y1 - r + k)} ${n(x1)} ${n(y1 - r)}`
    + `L${n(x1)} ${n(y0 + r)}Z`;
}

let changed = 0;
const touch = (rel, fn) => {
  const p = `${H}/${rel}`;
  if (!existsSync(p)) return;
  const src = readFileSync(p, 'utf8');
  const out = fn(src);
  if (out === src) { console.log(`${rel.padEnd(34)} no change`); return; }
  console.log(`${rel.padEnd(34)} rewritten`);
  changed++;
  if (WRITE) writeFileSync(p, out);
};

for (const [name, subs] of Object.entries(SUBS)) {
  for (const dir of ['solved-mid', 'solved-duotone']) {
    touch(`${dir}/${name}.svg`, (s) => subs.reduce((a, [f, t]) => a.split(f).join(t), s));
  }
}

for (const [name, cfg] of Object.entries(PADS)) {
  const fresh = cfg.pads.map((p) => pad(p, cfg.r));
  const plate = fresh.map((d) => offsetClosed(segsOf(d)[0].segs, 1)).join('');
  for (const dir of ['solved-mid', 'solved-duotone']) {
    touch(`${dir}/${name}.svg`, (s) => cfg.square.reduce((a, sq, i) => a.split(sq).join(fresh[i]), s));
  }
  // plate: the first path of duotone and of fill is the two pads' outer contour
  for (const dir of ['solved-duotone', 'solved-fill']) {
    touch(`${dir}/${name}.svg`, (s) => s.replace(/ d="[^"]+"/, ` d="${plate}"`));
  }
}
console.log({ filesChanged: changed, written: WRITE });
