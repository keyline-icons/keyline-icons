/**
 * database-sparkles (1.2.0, data-plus group), his ask of 24 Sep 2026: "can
 * database come with sparkles and zap too?". database-zap is a corner sign and
 * lives in build.mjs's database(); this file holds the sparkles.
 *
 * The 1.1.0 construction exactly (after tools/v8/c2/build.mjs): the shipped database stroke, regular and sharp,
 * moved whole by the seat's shift and cut round his two stars by the c2 cutter;
 * sharp cut ends get the stub. Two-tone = duotone = object black, lead black,
 * second at 0.4 (database's two-tone rides a plate, so c2's stroke split does not
 * apply). Fill = stroke. The seat is seat-a's search with the lid protected: an
 * ellipse cut open no longer reads as the top of a cylinder, and the lid is what
 * tells a database from a jar or a battery.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { translateD } from './lib/path.mjs';
import { cut } from './lib/cutter.mjs';
import { star } from './lib/star.mjs';
import { sharpStar } from './lib/sharpstar.mjs';
import { seatA, AIR } from './seat.mjs';
import { ROOT } from '../paths.mjs';

const BASE_ROOT = ROOT;
const file = (style, corners) => `Container=regular, Style=${style}, Corners=${corners}.svg`;
const strokeOf = (corners) => readFileSync(join(BASE_ROOT, 'raw', 'database', file('stroke', corners)), 'utf8').match(/ d="([^"]+)"/)[1];
const strokeEl = (d, sharp) => `<path d="${d}" stroke="black" stroke-width="2" stroke-linecap="${sharp ? 'butt' : 'round'}" stroke-linejoin="round"/>\n`;
const blackEl = (d, op = 1) => `<path d="${d}" fill="black"${op < 1 ? ` fill-opacity="${op}"` : ''}/>\n`;
const mv = (d, [dx, dy]) => (dx || dy ? translateD(d, dx, dy) : d);

export const REG = strokeOf('regular');
export const SHARP = strokeOf('sharp');
/** Subpath order in the shipped stroke: 0 the lid, 1 the walls and floor, 2 the band. */
export const LID = 0, BAND = 2;

export const findSeat = (protect = [LID], opts) => seatA(REG, SHARP, protect, opts);

/*
 * The seat, from findSeat([LID]) (3 minutes; its top six are on the probe sheet):
 * lead flush bottom right at (19,19), second star up-left at (13.5,14.5) on the
 * diagonal like calendar-sparkles and the rest of the AI shelf, database moved
 * (-2,0), paddings 1 all round. It cuts the band's and the floor's right halves,
 * which database-plus drops too. Protecting the band as well leaves no seat at
 * all. Runner-up (29.37 against 29.28): the second star at (20.5,10.5), both
 * stars stacked outside the body on the right; the other corners read as a P.
 */
export const SEAT = { lead: [19, 19, 4], small: [13.5, 14.5, 2.5], shift: [-2, 0] };
export const WANT = [1, 1, 23, 23];

export function sparkles(spec = SEAT) {
  const stars = [spec.lead, spec.small].map(([x, y, R]) => ({ c: [x, y], R }));
  const out = {};
  for (const corners of ['regular', 'sharp']) {
    const sharp = corners === 'sharp';
    const moved = mv(sharp ? SHARP : REG, spec.shift);
    const runsD = cut(moved, stars, { air: AIR, box: 3, keep: 1.5, stub: sharp }).d;
    const leadOnly = cut(moved, [stars[0]], { air: AIR, box: 3, keep: 1.5, stub: sharp }).d;
    const lid = moved.match(/M[^M]+/g)[LID];
    if (!runsD.includes(lid)) throw new Error(`database-sparkles ${corners}: the lid is cut`);
    const starsD = stars.map((s) => (sharp ? sharpStar(s.c, s.R) : star(s.c, s.R)));
    const plain = strokeEl(runsD, sharp) + blackEl(starsD.join(''));
    const toned = strokeEl(runsD, sharp) + blackEl(starsD[0]) + blackEl(starsD[1], 0.4);
    out[corners] = {
      stroke: plain, 'two-tone': toned, duotone: toned, fill: plain,
      meta: { runsD, starsD, stars, moved, smallCuts: leadOnly !== runsD },
    };
  }
  return out;
}
