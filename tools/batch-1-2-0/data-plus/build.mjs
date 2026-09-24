/**
 * The 1.2.0 generator for group data-plus: database-plus, -minus, -check, -x,
 * the four arrows and -sparkles (database-extra.mjs), server-plus and -minus.
 * database-zap and server-zap live with the bolt family in ../zap.
 *
 *   node build.mjs --out=DIR   writes DIR/raw/<name>/*.svg, asserts every ink
 *                              box and the sign's clearances, prints a report
 *
 * Every compound is its shipped base, read from raw/, cut and at most
 * translated. Nothing here redraws a base. The construction is the corner-sign
 * family's (`tablet-*`, `smartphone-*`, `file-*`): a 6 sign box, the body opened
 * in an L 2 clear of the sign box's ink, cut ends on whole grid lines, and the
 * plate notched on the caps' far sides with an r=1 turn about each cap. Sharp is
 * the base's own sharp raw cut by the same rule: each cut end gets the house
 * stub (k = (1 - sin t)/cos t along its tangent) so its butt face's outer corner
 * lands on the notch line, and the plate runs flush along each face with square
 * corners, as `tablet-plus` and `map-pin-plus` do.
 *
 * Both take the set's escape (`map-pin-*`, `user-*`, `bell-*`): the sign sits
 * outside the body's ink corner and the compound is recentred. database moves 1
 * left, as map-pin does (compound 20 wide, 2 and 2); server moves 2 left, which
 * its x=12 dot forces. Each function's own comment carries the numbers.
 *
 * Styles are composed from the base's own shipped variants, so each keeps the
 * base's decisions: which counter a fill knocks out, which detail duotone
 * blackens, where a divider stops.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parse, emit, at, tangent, arc, line, fmt, add, sub, len,
  translateSegs, translateD, area, reverse, stub, clipX,
} from './lib/path.mjs';
import { strokedBBox, outlines, minGap } from '../../../pipeline/lib/geom.mjs';
import { ROOT, outDir } from '../paths.mjs';
import { sparkles as databaseSparkles, WANT as DB_SPARKLES_WANT } from './database-extra.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
// The shipped bases, from raw/ in this checkout.
const BASE_ROOT = ROOT;

const file = (style, corners) => `Container=regular, Style=${style}, Corners=${corners}.svg`;
const tags = (svg) => [...svg.matchAll(/<path[^>]*>/g)].map((m) => m[0]);
const dOf = (t) => t.match(/ d="([^"]+)"/)[1];
function base(name, style, corners) {
  return tags(readFileSync(join(BASE_ROOT, 'raw', name, file(style, corners)), 'utf8')).map((t) => ({
    d: dOf(t), stroked: / stroke="(?!none)/.test(t), muted: /opacity="0\.4"/.test(t), evenodd: /evenodd/.test(t),
  }));
}
const only = (layers, pred, what) => {
  const hit = layers.filter(pred);
  if (hit.length !== 1) throw new Error(`${what}: ${hit.length} layers`);
  return hit[0].d;
};
const near = (a, b, e = 1e-9) => Math.abs(a[0] - b[0]) < e && Math.abs(a[1] - b[1]) < e;

const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';
const capOf = (sharp) => (sharp ? 'butt' : 'round');
const strokeEl = (d, sharp) => `<path d="${d}" stroke="black" stroke-width="2" stroke-linecap="${capOf(sharp)}" stroke-linejoin="round"/>\n`;
const plateEl = (d) => `<path d="${d}" fill="black" fill-opacity="0.4"/>\n`;
const solidEl = (d) => `<path d="${d}" fill="black" fill-rule="evenodd" clip-rule="evenodd"/>\n`;
const blackEl = (d, evenodd = false) => `<path d="${d}" fill="black"${evenodd ? ' fill-rule="evenodd"' : ''}/>\n`;

/**
 * A sign in a 6 box with top-left (x, y), spelled as the shipped file-* signs
 * are. Sharp pushes each free end out: a unit on an axis, 0.4142 along a
 * diagonal (0.2929 a side, file-check's 13.7071), so a butt corner stays inside
 * the round cap's box. An arrow's tip is not a free end.
 */
function sign(kind, x, y, sharp) {
  const e = sharp ? 1 : 0, g = sharp ? 0.2929 : 0;
  const n = (v) => +v.toFixed(4);
  const P = (px, py) => `${n(px)} ${n(py)}`;
  const bar = `M${x - e} ${y + 3}${sharp ? `L${x + 6 + e} ${y + 3}` : `H${x + 6}`}`;
  const stem = `M${x + 3} ${y - e}${sharp ? `L${x + 3} ${y + 6 + e}` : `V${y + 6}`}`;
  switch (kind) {
    case 'plus': return stem + bar;
    case 'minus': return bar;
    case 'check': return `M${P(x - g, y + 3 - g)}L${P(x + 2, y + 5)}L${P(x + 6 + g, y + 1 - g)}`;
    case 'x': return `M${P(x - g, y - g)}L${P(x + 6 + g, y + 6 + g)}M${P(x + 6 + g, y - g)}L${P(x - g, y + 6 + g)}`;
    case 'arrow-down': return (sharp ? `M${x + 3} ${y - 1}L${x + 3} ${y + 6}` : `M${x + 3} ${y}V${y + 6}`)
      + `M${P(x - g, y + 3 - g)}L${P(x + 3, y + 6)}L${P(x + 6 + g, y + 3 - g)}`;
    case 'arrow-up': return (sharp ? `M${x + 3} ${y + 7}L${x + 3} ${y}` : `M${x + 3} ${y + 6}V${y}`)
      + `M${P(x - g, y + 3 + g)}L${P(x + 3, y)}L${P(x + 6 + g, y + 3 + g)}`;
    case 'arrow-left': return (sharp ? `M${x + 7} ${y + 3}L${x} ${y + 3}` : `M${x + 6} ${y + 3}H${x}`)
      + `M${P(x + 3 + g, y - g)}L${P(x, y + 3)}L${P(x + 3 + g, y + 6 + g)}`;
    case 'arrow-right': return (sharp ? `M${x - 1} ${y + 3}L${x + 6} ${y + 3}` : `M${x} ${y + 3}H${x + 6}`)
      + `M${P(x + 3 - g, y - g)}L${P(x + 6, y + 3)}L${P(x + 3 - g, y + 6 + g)}`;
    // The bolt is truck-electric's, drawn at size rather than a shrunk `zap`
    // (its r=1 corners go to a third of a unit): two 45 degree runs and a level
    // bar, the round join doing the corners. truck's is 5 tall in its 5 box, runs
    // 2.5; here the runs are 3 and the bar 4, so it is 4 wide against the box's 6.
    // It sits flush on the box's right edge, as a sign sits flush on the body's
    // ink corner: centred it would stop a unit short and leave the compound 2
    // and 3 (the alert's case, which instead stops at the body's own edge).
    case 'zap': return `M${P(x + 5 + g, y - g)}L${P(x + 2, y + 3)}L${P(x + 6, y + 3)}L${P(x + 3 - g, y + 6 + g)}`;
    default: throw new Error('no sign ' + kind);
  }
}

/* ================================================================ database */
/*
 * database: ink 3..21 by 1..23, a cylinder of rx 8, ry 2 ellipses on (12,4),
 * a band on y=12 and the floor on y=20, both split at their low point x=12.
 *
 * Flush in the ink corner (box 14..20 by 16..22) the floor would have to stop
 * two left of its low point, so the minus, whose bar does not reach the box's
 * bottom, would paint to y=22.94 (sharp 22.99): a fractional pad, and sharp off
 * its rounded sibling. So the compound takes map-pin-plus's escape, on
 * map-pin-plus's numbers (his ruling there: 20 wide, 2 and 2): the base moves
 * 1 left (ink 2..20, ellipses on x=11), the sign box is path 15..21 by 16..22
 * (ink 14..22 by 15..23), and the compound paints 2..22 by 1..23 for both signs.
 *
 * The L notch is x=12 and y=13, 2 clear of the sign's ink:
 *   right wall  (19,4)..(19,12), its cap ink ending on y=13 (it met the band there)
 *   floor       (3,20) round to its low point (11,22), cap ink ending on x=12
 *   band        (3,12) round to its low point (11,14), cap on the same line
 * Floor and band are cut where the base already splits them, at their low
 * point, so each keeps its left half as shipped and nothing is re-sliced. The
 * floor keeps its lowest point (ink 23) under either sign. The band's right
 * half cannot survive anywhere: its quarter by the wall runs within 2 of the
 * stem's ink, and it would cross the notch on its way there. So the wall ends
 * free on y=12.
 *
 * Cut at the low point, both ends leave on a horizontal tangent, so in sharp
 * each stub is a whole unit along x and both butt faces lie ON the notch line
 * x=12 (floor 21..23, band 13..15). The plate and the fill run down that line
 * and so along both faces, square in sharp, with nothing past the black (the
 * round-one draft cut on a 3.7 degree tangent and left 0.13 wedges).
 *
 * The notch's own corner is r=1 about (13,14), not the family's r=3: the band's
 * cap sits flush on x=12, and an r=3 corner about (15,16) would lay grey 0.76
 * past it along the band's own line (the band's cut-away half). At r=1 the
 * corner circle and the cap are tangent at (12,14). Sharp keeps a hard corner.
 *
 * Duotone and fill stop the band 2 short of the notch line, on x=10, cut
 * straight as the base's own band ends on the walls' inner edges.
 */
function database(kind) {
  const out = {};
  const DX = -1, box = [15, 16], NX = 12, NY = 13, CUT = 11, WALL = 19;
  const mv = (d) => parse(d).map((sp) => ({ ...sp, segs: translateSegs(sp.segs, DX, 0) }));
  for (const corners of ['regular', 'sharp']) {
    const sharp = corners === 'sharp';
    const [S1, S2, S3] = mv(only(base('database', 'stroke', corners), (l) => l.stroked, 'database stroke'));
    // S2: M3 4 L3 20 C(floor, left half) C(floor, right half) L19 4
    const [wallL, floorL, floorR, wallR] = S2.segs;
    if (!(near(floorL.p1, [CUT, 22]) && floorR.p1[0] === WALL && wallR.p1[1] === 4)) throw new Error('database: unexpected floor');
    // S3: the band, two halves meeting at its low point
    const [bandL, bandR] = S3.segs;
    if (!(near(bandL.p1, [CUT, 14]) && near(bandR.p1, [WALL, 12]))) throw new Error('database: unexpected band');
    const floorEnd = floorL.p1, floorDir = tangent(floorL, 1), bandEnd = bandL.p1, bandDir = tangent(bandL, 1);
    if (!(near(floorDir, [1, 0], 1e-6) && near(bandDir, [1, 0], 1e-6))) throw new Error('database: cut tangents not horizontal');
    let floorRun = [wallL, floorL];
    let bandRun = [bandL];
    let wallRun = [line([WALL, 12], [WALL, 4])];
    let fStub = null, bStub = null;
    if (sharp) {
      fStub = stub(floorEnd, floorDir);
      bStub = stub(bandEnd, bandDir);
      floorRun = [...floorRun, line(floorEnd, fStub.p)];
      bandRun = [...bandRun, line(bandEnd, bStub.p)];
      wallRun = [line([WALL, NY], [WALL, 4])];
    }
    const body = emit(S1.segs, { closed: true }) + emit(floorRun) + emit(wallRun) + emit(bandRun);
    const sg = sign(kind, ...box, sharp);
    const strokeD = body + sg;

    // --- plate: the base's own plate, moved, with the notch cut in
    const [plateSrc] = mv(only(base('database', 'two-tone', corners), (l) => l.muted, 'database plate'));
    const low = [CUT, 23];
    const iRight = plateSrc.segs.findIndex((s) => s.t === 'L' && s.p0[0] === WALL + 1 && s.p1[0] === WALL + 1);
    const iLow = plateSrc.segs.findIndex((s) => near(s.p0, low, 1e-6));
    if (iRight < 0 || iLow < 0 || !(iLow > iRight)) throw new Error(`database plate: right edge ${iRight}, low point ${iLow}`);
    const top = plateSrc.segs[iRight].p0;
    if (!near(top, [WALL + 1, 4])) throw new Error('database plate right edge moved');
    let notch;
    if (!sharp) {
      notch = [
        line(top, [WALL + 1, 12]),
        ...arc([WALL, 12], 1, 0, 90),            // the wall's cap, (20,12) -> (19,13)
        line([WALL, NY], [NX + 1, NY]),
        ...arc([NX + 1, NY + 1], 1, 270, 180),     // the notch's corner, (13,13) -> (12,14), tangent to the band's cap
        line([NX, NY + 1], [NX, floorEnd[1]]),
        ...arc(floorEnd, 1, 0, 90, low),         // the floor's cap, onto the shipped plate's low point
      ];
    } else {
      // every butt face in the notch: the wall's on y=13, the band's and the floor's on x=12
      const nUp = [0, -1], nDown = [0, 1];
      const faces = [
        [add(bStub.p, nUp), add(bStub.p, nDown)],
        [add(fStub.p, nUp), add(fStub.p, nDown)],
      ];
      for (const [a, b] of faces) if (Math.abs(a[0] - NX) > 1e-9 || Math.abs(b[0] - NX) > 1e-9) throw new Error(`database sharp face off the notch line: ${a} ${b}`);
      if (!near(faces[0][0], [NX, NY])) throw new Error('database sharp band face does not start on the notch corner');
      const floorOut = faces[1][1];                 // (12,23), the floor face's outer corner
      notch = [
        line(top, [WALL + 1, NY]),
        line([WALL + 1, NY], [NX, NY]),              // along the wall's face and on
        line([NX, NY], floorOut),                    // down the band's face, the notch line, the floor's face
        line(floorOut, low),                         // the floor stub's outer edge, onto the plate's low point
      ];
    }
    const ring = [...plateSrc.segs.slice(0, iRight), ...notch, ...plateSrc.segs.slice(iLow)];
    for (let i = 1; i < ring.length; i++) if (len(sub(ring[i].p0, ring[i - 1].p1)) > 2e-4) throw new Error(`database plate gap at ${i}: ${ring[i - 1].p1} -> ${ring[i].p0}`);
    if (len(sub(ring[0].p0, ring[ring.length - 1].p1)) > 2e-4) throw new Error('database plate does not close');
    const plateD = emit(ring, { closed: true });

    // --- duotone and fill detail: the top face's counter as shipped, the band stopped 2 short of the notch
    const detail = mv(only(base('database', 'duotone', corners), (l) => !l.muted, 'database duotone detail'));
    if (detail.length !== 2) throw new Error('database duotone detail: two subpaths expected');
    const [counter, bandRegion] = detail;
    // The shipped band knockout closes 0.0014 short of its start (4.9991 11.8255 against 5 11.8244);
    // re-emitted as a clipped ring that left a hairline Z. Close it on its own first point.
    const closeOnStart = (segs) => {
      const first = segs[0].p0, last = segs[segs.length - 1];
      const miss = len(sub(last.p1, first));
      if (last.closing && len(sub(last.p0, first)) < 0.01) {
        const prev = segs[segs.length - 2];
        return [...segs.slice(0, -2), { ...prev, p1: first }];
      }
      if (miss > 1e-9 && miss < 0.01) return [...segs.slice(0, -1), { ...last, p1: first }];
      return segs;
    };
    const bandKnock = closeOnStart(clipX(bandRegion.segs, { xmax: NX - 2 }));
    const detailD = emit(counter.segs, { closed: true }) + emit(bandKnock, { closed: true });
    const fillSrc = mv(only(base('database', 'fill', corners), () => true, 'database fill'));
    if (fillSrc.length !== 3) throw new Error('database fill: three subpaths expected');
    if (emit(fillSrc[1].segs, { closed: true }) !== emit(counter.segs, { closed: true })) throw new Error('database fill counter differs from duotone');
    const fillBand = closeOnStart(clipX(fillSrc[2].segs, { xmax: NX - 2 }));
    for (const k of [bandKnock, fillBand]) {
      for (const s of k) if (s.t === 'L' && len(sub(s.p1, s.p0)) < 0.01) throw new Error(`database band knockout keeps a ${len(sub(s.p1, s.p0))} segment`);
      if (Math.max(...k.map((s) => Math.max(s.p0[0], s.p1[0]))) > NX - 2 + 1e-9) throw new Error('database band knockout past x=10');
    }
    const pa = area(ring);
    for (const h of [counter.segs, fillBand]) if (Math.sign(area(h)) === Math.sign(pa)) throw new Error('database knockout wound with the plate');
    const fillD = plateD + emit(fillSrc[1].segs, { closed: true }) + emit(fillBand, { closed: true });

    out[corners] = {
      stroke: strokeEl(strokeD, sharp),
      'two-tone': plateEl(plateD) + strokeEl(strokeD, sharp),
      duotone: plateEl(plateD) + blackEl(detailD, true) + strokeEl(sg, sharp),
      fill: solidEl(fillD) + strokeEl(sg, sharp),
      meta: { strokeD, body, sign: sg, plateD, fillD, detailD },
    };
  }
  return out;
}

/* ================================================================== server */
/*
 * server: two slabs 4..20 on r=2, dots on x=8 and 12. Flush in the ink corner
 * (box 14..20 by 16..22) the lower slab keeps only 4..10 and its x=12 dot
 * clears the sign by 0.24; the top-right is the same corner mirrored (the
 * x=12 dot 0.24 from the sign again). So the compound takes the set's escape
 * (bell, user, map-pin): the base moves 2 left (ink 1..19), the sign sits
 * outside its ink corner in box 16..22 by 16..22, compound ink 1..23 by 1..23.
 * The notch is then the single line x=13 through the lower slab (its top is
 * already on y=13): both walls cut on x=12, both dots kept, the x=10 dot 2
 * clear of the notch in the fill and 4.08 from the sign.
 */
function server(kind) {
  const out = {};
  const DX = -2, box = [16, 16], NX = 13, CUT = 12;
  for (const corners of ['regular', 'sharp']) {
    const sharp = corners === 'sharp';
    const strokeLayers = base('server', 'stroke', corners);
    const [top, low] = parse(only(strokeLayers, (l) => l.stroked, 'server slabs')).map((sp) => ({ ...sp, segs: translateSegs(sp.segs, DX, 0) }));
    const dotsD = translateD(only(strokeLayers, (l) => !l.stroked, 'server dots'), DX, 0);
    // the lower slab's ring, kept from the bottom cut round the left side to the top cut
    const segs = low.segs;
    const iTop = segs.findIndex((s) => s.t === 'L' && s.p0[1] === 14 && s.p1[1] === 14 && s.p1[0] > s.p0[0]);
    const iBot = segs.findIndex((s) => s.t === 'L' && s.p0[1] === 22 && s.p1[1] === 22 && s.p1[0] < s.p0[0]);
    if (iTop < 0 || iBot < 0) throw new Error('server: slab walls not found');
    const e = sharp ? 1 : 0;
    const ringFromBot = [...segs.slice(iBot), ...segs.slice(0, iBot)];
    const kept = [];
    for (const s of ringFromBot) {
      if (s === segs[iBot]) kept.push(line([CUT + e, 22], s.p1));
      else if (s === segs[iTop]) { kept.push(line(s.p0, [CUT + e, 14])); break; }
      else kept.push(s);
    }
    const body = emit(top.segs, { closed: true }) + emit(kept);
    const sg = sign(kind, ...box, sharp);
    const strokeD = body + sg;

    // plate: the base's own plates moved, the lower one cut on x=13
    const [pTop, pLow] = parse(only(base('server', 'two-tone', corners), (l) => l.muted, 'server plate')).map((sp) => translateSegs(sp.segs, DX, 0));
    const lowRing = pLow;
    const iPT = lowRing.findIndex((s) => s.t === 'L' && s.p0[1] === 13 && s.p1[1] === 13);
    const iPB = lowRing.findIndex((s) => s.t === 'L' && s.p0[1] === 23 && s.p1[1] === 23);
    if (iPT < 0 || iPB < 0) throw new Error('server plate edges not found');
    const notch = sharp
      ? [line([lowRing[iPT].p0[0], 13], [NX, 13]), line([NX, 13], [NX, 23]), line([NX, 23], lowRing[iPB].p1)]
      : [line(lowRing[iPT].p0, [CUT, 13]), ...arc([CUT, 14], 1, 270, 360), line([NX, 14], [NX, 22]), ...arc([CUT, 22], 1, 0, 90), line([CUT, 23], lowRing[iPB].p1)];
    const rest = [...lowRing.slice(iPB + 1), ...lowRing.slice(0, iPT)];
    const lowPlate = [...notch, ...rest];
    for (let i = 1; i < lowPlate.length; i++) if (len(sub(lowPlate[i].p0, lowPlate[i - 1].p1)) > 2e-4) throw new Error(`server plate gap ${i}`);
    const plateD = emit(pTop, { closed: true }) + emit(lowPlate, { closed: true });
    // the fill's dots wound against the slab, so nonzero and evenodd agree (the shipped
    // fill winds them with the slab and leans on evenodd alone; deep-audit reads that as LOOPS)
    const slabArea = area(pLow);
    const holes = parse(dotsD).map((sp) => (Math.sign(area(sp.segs)) === Math.sign(slabArea) ? reverse(sp.segs) : sp.segs));
    const fillD = plateD + holes.map((h) => emit(h, { closed: true })).join('');
    out[corners] = {
      stroke: strokeEl(strokeD, sharp) + blackEl(dotsD),
      'two-tone': plateEl(plateD) + strokeEl(strokeD, sharp) + blackEl(dotsD),
      duotone: plateEl(plateD) + strokeEl(sg, sharp) + blackEl(dotsD),
      fill: solidEl(fillD) + strokeEl(sg, sharp),
      meta: { strokeD, body, sign: sg, plateD, fillD, dotsD },
    };
  }
  return out;
}

/* ================================================================= checks */
const inkOf = (svg, sharp) => {
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const t of tags(svg)) {
    const d = dOf(t), stroked = / stroke="black"/.test(t);
    const q = stroked ? strokedBBox(d, 1, capOf(sharp)) : strokedBBox(d, 0, 'butt');
    for (let i = 0; i < 4; i++) b[i] = i < 2 ? Math.min(b[i], q[i]) : Math.max(b[i], q[i]);
  }
  return b;
};
/** Painted gap between two stroked drawings (outline to outline, less a unit each). */
function strokeGap(a, b) {
  let m = Infinity;
  for (const p of outlines(a, 96)) for (const q of outlines(b, 96)) m = Math.min(m, minGap(p, q));
  return m - 2;
}
/** Painted gap from a filled area (its outline) to a stroked drawing. */
function areaGap(area, strokeD) {
  let m = Infinity;
  for (const p of outlines(area, 96)) for (const q of outlines(strokeD, 96)) m = Math.min(m, minGap(p, q));
  return m - 1;
}

const NAMES = {
  'database-plus': () => database('plus'), 'database-minus': () => database('minus'),
  // His ask, 24 Sep 2026: "do the database with modifiers". The container
  // families' full set (calendar, clock, file, folder): check and x beside the
  // plus and minus, and the four arrows, which read as import and export. All
  // share the plus's notch; the x reaches every corner of the box, so it is the
  // tightest and the build's 2-unit asserts cover the rest.
  // database-zap moved to ../zap/build.mjs with the rest of the -zap family (centred bolt,
  // body shifted a unit right), 24 Sep 2026; the 'zap' case in sign() stays as history.
  ...Object.fromEntries(['check', 'x', 'arrow-down', 'arrow-up', 'arrow-left', 'arrow-right']
    .map((k) => [`database-${k}`, () => database(k)])),
  'database-sparkles': () => databaseSparkles(),
  'server-plus': () => server('plus'), 'server-minus': () => server('minus'),
  // table-2, -plus, -minus, -sparkles: DROPPED on his word, 24 Sep 2026 ("we are trying to fix/add
  // modifiers the table wrong way"); the table's modifiers are redrawn on the default
  // table in ../table-ops, rows and columns added, removed and merged at an edge.
};
const WANT = { database: [2, 1, 22, 23], server: [1, 1, 23, 23] };

export function buildAll() {
  const res = {};
  for (const [name, fn] of Object.entries(NAMES)) res[name] = fn();
  return res;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const OUT = join(outDir(), 'raw');
  const all = buildAll();
  const report = {};
  for (const [name, v] of Object.entries(all)) {
    const want = name === 'database-sparkles' ? DB_SPARKLES_WANT : WANT[name.split('-')[0]];
    const dir = join(OUT, name); mkdirSync(dir, { recursive: true });
    const r = { ink: {}, gap: {} };
    for (const corners of ['regular', 'sharp']) {
      const sharp = corners === 'sharp';
      for (const style of ['stroke', 'two-tone', 'duotone', 'fill']) {
        const svg = HEAD + v[corners][style] + '</svg>\n';
        const b = inkOf(svg, sharp);
        const off = Math.max(...b.map((x, i) => Math.abs(x - want[i])));
        if (off > 2e-3) throw new Error(`${name} ${style} ${corners}: ink ${b.map(fmt)} should be ${want}`);
        r.ink[`${style}/${corners}`] = b.map(fmt).join(',');
        writeFileSync(join(dir, file(style, corners)), svg);
      }
      // gaps on the rounded drawing only: sharp's butt stubs double-count here (lint's SPACING trims them)
      if (sharp) continue;
      const m = v[corners].meta;
      if (!m.sign) continue;
      r.gap[corners] = {
        signToBody: +strokeGap(m.sign, m.body).toFixed(3),
        signToPlate: +areaGap(m.plateD, m.sign).toFixed(3),
      };
      if (m.dotsD) {
        let g = Infinity;
        for (const p of outlines(m.dotsD, 96)) for (const q of outlines(m.sign, 96)) g = Math.min(g, minGap(p, q));
        r.gap[corners].dotToSign = +(g - 1).toFixed(3);
      }
    }
    // the two assertions the set holds every corner sign to, on the rounded drawing
    if (r.gap.regular) {
      if (r.gap.regular.signToBody < 2 - 0.02) throw new Error(`${name}: sign clears the body by ${r.gap.regular.signToBody}`);
      if (r.gap.regular.signToPlate < 2 - 0.02) throw new Error(`${name}: plate within ${r.gap.regular.signToPlate} of the sign`);
    }
    report[name] = r;
  }
  writeFileSync(join(outDir(), 'data-plus.report.json'), JSON.stringify(report, null, 1) + '\n');
  console.log(JSON.stringify(report, null, 1));
}
