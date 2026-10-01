// Six more shields for 1.5.0, all four styles in both corners, 1 Oct 2026:
// shield-alert, shield-off, shield-user, shield-lock, shield-question and
// shield-heart, picked off a sheet of nine (his call: "do the shield as your
// recommendation"). Every member takes `shield`'s own raw outlines and plates
// in both corners, as shield-check and shield-key do, and each sign comes from
// the shipped sibling that already carries it inside a hollow body:
//
//   shield-alert     circle-alert's stem and dot, unmoved (2.23 clear)
//   shield-question  circle-question's, half a unit down: in the circle it sits
//                    1.87 from the shield's sloping top edge, 2.31 lowered
//   shield-heart     map-pin-heart's heart, centred on 12 (0.75 down); fill
//                    knocks it out solid, as map-pin-heart's does
//   shield-user      circle-user's head and torso; the torso's sides run down
//                    into the shield as they run into the ring. Two-tone and
//                    duotone carry the person solid, fill knocks it out, the
//                    torso closed along the shield's inner edge
//   shield-lock      a padlock in the sign box: body 7 x 4 at r=1 (r + 1 stays
//                    on the ladder), shackle r=2.5 on 1.5 legs so its counter is
//                    2 tall, no keyhole (a bead in a 2-high body leaves under 1).
//                    2.13 clear, 1.73 sharp (a butt corner may lean 0.414). Fill
//                    knocks the padlock out solid with the shackle's counter kept
//   shield-off       the house slash (drawing-a-new-icon.md, "The slash is M2 2L22
//                    22") cut as heart-off is: near side on u = 0, far side at
//                    u = 4 sqrt 2; plates near on u = 0, far traced round each
//                    cap onto u = 3 sqrt 2; two-tone drops the far strokes,
//                    duotone greys all but the slash, fill is the solids. Sharp:
//                    far ends run out until the nearest butt corner sits on
//                    u = 4 sqrt 2 - 2, plates true-clipped on u = 0 and that line
//
// Tried on the sheet and dropped: an asterisk (1.59 from the walls), a half
// (the inset right half is a 4-wide bar, not half a shield), an ellipsis (its
// beads shrink to marks to clear the walls and read as noise), and a `-dot`
// badge (an r=3 badge in the shield's own box cuts away its peak).
//
//   node tools/shields/build.mjs [--out=<dir>]     writes raw/<name>/ for all six (default: this checkout)
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, emitSegs, at, tan, split, splitU, runsOf, arcSegs, offsetCubic, closest, footprint, translate, f, P, add, sub, mul, len, unit, u, deg, roots } from './geo.mjs';
import { outlines, minGap } from '../../pipeline/lib/geom.mjs';

const REPO = join(import.meta.dirname, '..', '..');
const OUT = process.argv.find((a) => a.startsWith('--out='))?.slice(6) ?? REPO;
const R2 = Math.SQRT2;
const CORNERS = ['regular', 'sharp'];
const assert = (ok, msg) => { if (!ok) throw new Error(msg); };
const raw = (name, style, corners, container = 'regular') => readFileSync(join(REPO, 'raw', name, `Container=${container}, Style=${style}, Corners=${corners}.svg`), 'utf8');
const layersOf = (svg) => [...svg.matchAll(/<path([^>]*)\/>/g)].map((m) => ({ d: m[1].match(/ d="([^"]+)"/)[1], muted: /fill-opacity="0.4"/.test(m[1]), stroked: / stroke="black"/.test(m[1]) }));
const subpaths = (d) => d.split(/(?=M)/);

/* ---------------------------------------------------------------- the body */
const SHIELD = Object.fromEntries(CORNERS.map((c) => [c, layersOf(raw('shield', 'stroke', c))[0].d]));
const PLATE = Object.fromEntries(CORNERS.map((c) => [c, layersOf(raw('shield', 'two-tone', c)).find((l) => l.muted).d]));

/* ---------------------------------------------------- signs from a sibling */
/** A circle-container sign: its stroke and dot layers, and its fill's knockouts. */
function circleSign(name, corners, dy) {
  const isRing = (d) => /^M12 [12]C/.test(d) || /^M2[23] 12C/.test(d);
  const st = layersOf(raw(name, 'stroke', corners, 'circle')).filter((l) => !isRing(l.d));
  const fill = layersOf(raw(name, 'fill', corners, 'circle'))[0].d;
  return {
    stroke: st.filter((l) => l.stroked).map((l) => translate(l.d, 0, dy)).join(''),
    dots: st.filter((l) => !l.stroked).map((l) => translate(l.d, 0, dy)).join(''),
    knock: subpaths(fill).slice(1).map((d) => translate(d, 0, dy)).join(''),
  };
}
function heartSign(corners) {
  const st = layersOf(raw('map-pin-heart', 'stroke', corners))[0].d;
  const fill = layersOf(raw('map-pin-heart', 'fill', corners))[0].d;
  return { stroke: translate(subpaths(st)[1], 0, 0.75), dots: '', knock: subpaths(fill).slice(1).map((d) => translate(d, 0, 0.75)).join('') };
}

/* ---------------------------------------------------------------- the lock */
// body 7 x 4 at r = 1 (r + 1 stays on the ladder), shackle r = 2.5 on 1.5 legs:
// its counter is 2 tall and 3 wide, the body's 2 tall, so neither closes at 16px
const LOCK = { x0: 8.5, x1: 15.5, y0: 11.5, y1: 15.5, r: 1, rs: 2.5, cy: 10 };   // shackle centre (12, cy)
function lockSign(corners) {
  const sharp = corners === 'sharp', { x0, x1, y0, y1, r, rs, cy } = LOCK;
  const rect = (a0, b0, a1, b1, rr) => (rr > 0
    ? emitSegs([
      { k: 'L', a: [a0 + rr, b0], b: [a1 - rr, b0] }, ...arcSegs([a1 - rr, b0 + rr], rr, -90, 0),
      { k: 'L', a: [a1, b0 + rr], b: [a1, b1 - rr] }, ...arcSegs([a1 - rr, b1 - rr], rr, 0, 90),
      { k: 'L', a: [a1 - rr, b1], b: [a0 + rr, b1] }, ...arcSegs([a0 + rr, b1 - rr], rr, 90, 180),
      { k: 'L', a: [a0, b1 - rr], b: [a0, b0 + rr] }, ...arcSegs([a0 + rr, b0 + rr], rr, 180, 270)], true)
    : `M${P([a0, b0])}L${P([a1, b0])}L${P([a1, b1])}L${P([a0, b1])}Z`);
  const shackle = emitSegs([{ k: 'L', a: [12 - rs, y0], b: [12 - rs, cy] }, ...arcSegs([12, cy], rs, 180, 360), { k: 'L', a: [12 + rs, cy], b: [12 + rs, y0] }]);
  const body = rect(x0, y0, x1, y1, sharp ? 0 : r);
  // the knockout: the padlock's painted silhouette with the shackle's counter
  // kept. The shackle's outer legs (x = 12 -+ (rs + 1)) run down from cy onto the
  // body's outer corner arcs (r + 1 regular; sharp's round join paints r = 1).
  const R = rs + 1, ro = sharp ? 1 : r + 1, X0 = x0 - 1, X1 = x1 + 1, Y0 = y0 - 1, Y1 = y1 + 1;
  assert(Y0 > cy, 'the shackle legs must reach the body');
  const cTL = [X0 + ro, Y0 + ro], cTR = [X1 - ro, Y0 + ro];
  const meet = (c, x) => { const dx = x - c[0]; assert(Math.abs(dx) <= ro + 1e-9, 'leg misses the corner'); return [x, c[1] - Math.sqrt(Math.max(0, ro * ro - dx * dx))]; };
  const mL = meet(cTL, 12 - R), mR = meet(cTR, 12 + R);
  const aL = (deg(sub(mL, cTL)) + 360) % 360, aR = (deg(sub(mR, cTR)) + 360) % 360;
  const outer = emitSegs([
    { k: 'L', a: mL, b: [12 - R, cy] }, ...arcSegs([12, cy], R, 180, 360), { k: 'L', a: [12 + R, cy], b: mR },
    ...arcSegs(cTR, ro, aR, 360), { k: 'L', a: [X1, Y0 + ro], b: [X1, Y1 - ro] }, ...arcSegs([X1 - ro, Y1 - ro], ro, 0, 90),
    { k: 'L', a: [X1 - ro, Y1], b: [X0 + ro, Y1] }, ...arcSegs([X0 + ro, Y1 - ro], ro, 90, 180),
    { k: 'L', a: [X0, Y1 - ro], b: [X0, Y0 + ro] }, ...arcSegs(cTL, ro, 180, aL)].filter((g) => g.k !== 'L' || len(sub(g.a, g.b)) > 1e-6), true);
  const ri = rs - 1;
  const counter = emitSegs([{ k: 'L', a: [12 - ri, Y0], b: [12 - ri, cy] }, ...arcSegs([12, cy], ri, 180, 360), { k: 'L', a: [12 + ri, cy], b: [12 + ri, Y0] }], true);
  return { stroke: shackle + body, dots: '', knock: outer + counter };
}

/* ---------------------------------------------------------------- the user */
// circle-user's head and torso; the torso's sides end where x = 7 and 17 meet
// the shield's centre line (the same curve in both corners)
const meetX = (d, x) => {
  for (const s of parse(d)[0].segs) for (const t of roots(s, (p) => p[0] - x)) { const p = at(s, t); if (p[1] > 15) return p[1]; }
  throw new Error('x = ' + x + ' misses the shield');
};
function userSign(corners) {
  const cu = (style) => layersOf(raw('user', style, corners, 'circle'));
  const stroke = cu('stroke').find((l) => l.stroked && !/^M12 2C/.test(l.d)).d;      // head ring + torso
  const [head, torsoD] = subpaths(stroke);
  // each side on its own crossing: the raw outline is symmetric to 1e-5, not exactly
  const yR = meetX(SHIELD[corners], 17), yL = meetX(SHIELD[corners], 7);
  assert(Math.abs(yR - yL) < 1e-3, 'the shield is not symmetric at 7 / 17');
  // circle-user's torso runs from (17, 20.66) on its ring; ours from the shield's line
  const torso = torsoD.replace(/^M17 20\.6603/, `M17 ${f(yR)}`).replace(/20\.6603$/, f(yL));
  assert(torso !== torsoD, 'torso ends not found');
  const disc = subpaths(cu('two-tone').find((l) => !l.muted && !l.stroked).d)[0];   // the solid head
  // the solid torso: its outer edge (r = 5 about (11,19) and (13,19)) closed along
  // the shield's inner edge, the centre line moved 1 in
  const inner = innerEdge(corners);
  const arcR = (c, from) => (q) => len(sub(q, c)) - 5;
  const hitR = crossing(inner, [13, 19], 5, 'right'), hitL = crossing(inner, [11, 19], 5, 'left');
  const segs = [
    ...arcSegs([11, 19], 5, 360 + deg(sub(hitL.p, [11, 19])), 270), { k: 'L', a: [11, 14], b: [13, 14] },
    ...arcSegs([13, 19], 5, 270, 360 + deg(sub(hitR.p, [13, 19]))),
    ...between(inner, hitR, hitL),
  ];
  const torsoSolid = emitSegs(segs, true);
  return { stroke: head + torso, solid: disc + torsoSolid };
}
/** The shield's centre line moved 1 inward, as fitted cubics, lower half only. */
function innerEdge(corners) {
  const segs = parse(SHIELD[corners])[0].segs.filter((s) => s.k === 'C' && Math.min(s.a[1], s.b[1]) > 15);
  // the outline runs clockwise on screen, so inward is the right of travel: offset by -1
  return segs.flatMap((s) => offsetCubic(s, -1));
}
/** Where the inner edge crosses the circle (c, r) on the given side. */
function crossing(segs, c, r, side) {
  for (let i = 0; i < segs.length; i++) for (const t of roots(segs[i], (q) => len(sub(q, c)) - r)) {
    const p = at(segs[i], t);
    if ((side === 'right' ? p[0] > 12 : p[0] < 12) && p[1] < 19) return { i, t, p };
  }
  throw new Error('the torso edge misses the shield on the ' + side);
}
/** The inner edge from crossing a to crossing b, in the edge's own direction. */
function between(segs, a, b) {
  const out = [];
  for (let i = a.i; i <= b.i; i++) {
    let s = segs[i];
    if (i === a.i && i === b.i) { s = split(split(s, b.t)[0], a.t / b.t)[1]; }
    else if (i === a.i) s = split(s, a.t)[1];
    else if (i === b.i) s = split(s, b.t)[0];
    out.push(s);
  }
  return out;
}

/* ---------------------------------------------------------------- the -off */
const U4 = 4 * R2, U3 = 3 * R2, US = 4 * R2 - 2;
const SLASH = { regular: 'M2 2L22 22', sharp: 'M1.7071 1.7071L22.2929 22.2929' };
function offParts(corners) {
  const sharp = corners === 'sharp';
  const line = parse(SHIELD[corners])[0], plate = parse(PLATE[corners])[0];
  const pieces = splitU(line.segs, [0, U4]);
  const near = runsOf(pieces, (p) => u(p) <= 1e-9);
  const far = runsOf(pieces, (p) => u(p) >= U4 - 1e-9);
  assert(near.length === 1 && far.length === 1, `cut into ${near.length} near and ${far.length} far runs`);
  let farRun = far[0];
  if (sharp) {
    // each far end runs on along its tangent until the butt face's nearer corner sits on u = US
    const stub = (p, t) => { const m = [-t[1], t[0]]; const s = (Math.abs(u(m)) - 2) / u(t); assert(s > 0, 'stub ' + s); return add(p, mul(t, s)); };
    const s0 = farRun[0], s1 = farRun[farRun.length - 1];
    const t0 = mul(tan(s0, 0), -1), t1 = tan(s1, 1);
    farRun = [{ k: 'L', a: stub(s0.a, t0), b: s0.a }, ...farRun, { k: 'L', a: s1.b, b: stub(s1.b, t1) }];
  }
  const stroke = { near: emitSegs(near[0]), far: emitSegs(farRun) };
  // plates
  const pp = splitU(plate.segs, sharp ? [0, US] : [0]);
  const nearPlate = runsOf(pp, (p) => u(p) <= 1e-9);
  assert(nearPlate.length === 1, 'near plate in pieces');
  const np = nearPlate[0];
  const nearD = emitSegs([...np, { k: 'L', a: np[np.length - 1].b, b: np[0].a }], true);
  let farD;
  if (sharp) {
    const fp = runsOf(pp, (p) => u(p) >= US - 1e-9);
    assert(fp.length === 1, 'far plate in pieces');
    farD = emitSegs([...fp[0], { k: 'L', a: fp[0][fp[0].length - 1].b, b: fp[0][0].a }], true);
  } else {
    // round each cut end: leave the plate 1 from the stroke's end, trace its cap
    // (r = 1 about the end) onto u = 3 sqrt 2, and close along that line
    const E1 = far[0][0].a, E2 = far[0][far[0].length - 1].b;
    const o1 = mul(tan(far[0][0], 0), -1), o2 = tan(far[0][far[0].length - 1], 1);   // out of the run
    const T1 = add(E1, [-1 / R2, 1 / R2]), T2 = add(E2, [-1 / R2, 1 / R2]);
    const cap = (E, from, to, out) => {
      let a0 = deg(sub(from, E)), a1 = deg(sub(to, E)), dd = a1 - a0;
      while (dd > 180) dd -= 360; while (dd <= -180) dd += 360;
      const mid = ((a0 + dd / 2) * Math.PI) / 180;
      if (Math.cos(mid) * out[0] + Math.sin(mid) * out[1] < 0) dd += dd > 0 ? -360 : 360;
      return arcSegs(E, 1, a0, a0 + dd);
    };
    // the plate's points 1 from each end, on the outer side
    const segsP = plate.segs;
    const c1 = closest(segsP, add(E1, mul([tan(far[0][0], 0)[1], -tan(far[0][0], 0)[0]], 1)));
    const c2 = closest(segsP, add(E2, mul([tan(far[0][far[0].length - 1], 1)[1], -tan(far[0][far[0].length - 1], 1)[0]], 1)));
    // the shipped plate is the stroke's outer edge to the plate rule's 0.02
    assert(c1.dist < 0.02 && c2.dist < 0.02, `plate is not 1 from the stroke ends: ${c1.dist}, ${c2.dist}`);
    // walk the plate from c1 to c2 the far way (u large)
    const walk = (from, to) => {
      const out = []; const n = segsP.length;
      let i = from.i, first = true;
      for (let guard = 0; guard <= n + 1; guard++) {
        let s = segsP[i];
        const startT = first ? from.t : 0;
        if (i === to.i && (!first || to.t > from.t)) { const [a] = split(s, to.t); s = startT > 0 ? split(a, startT / to.t)[1] : a; out.push(s); return out; }
        if (startT > 0) s = split(s, startT)[1];
        out.push(s); first = false; i = (i + 1) % n;
      }
      throw new Error('plate walk lost');
    };
    let run = walk(c1, c2);
    if (u(at(run[Math.floor(run.length / 2)], 0.5)) < U4) run = walk(c2, c1);     // took the near way round
    const startE = len(sub(run[0].a, c1.p)) < 1e-6 ? E1 : E2, endE = startE === E1 ? E2 : E1;
    const tStart = startE === E1 ? T1 : T2, tEnd = startE === E1 ? T2 : T1;
    const oStart = startE === E1 ? o1 : o2, oEnd = startE === E1 ? o2 : o1;
    // snap the run's ends onto the caps' circles (they sit within 0.0023 of them)
    const onCap = (E, p) => add(E, unit(sub(p, E)));
    const first = run[0], last = run[run.length - 1];
    const q0 = onCap(startE, first.a), q1 = onCap(endE, last.b);
    const shiftA = (sg, q) => (sg.k === 'C' ? { ...sg, a: q, c1: add(sg.c1, sub(q, sg.a)) } : { ...sg, a: q });
    const shiftB = (sg, q) => (sg.k === 'C' ? { ...sg, b: q, c2: add(sg.c2, sub(q, sg.b)) } : { ...sg, b: q });
    run[0] = shiftA(first, q0);
    run[run.length - 1] = shiftB(run[run.length - 1], q1);
    farD = emitSegs([...cap(startE, tStart, q0, oStart), ...run, ...cap(endE, q1, tEnd, oEnd), { k: 'L', a: tEnd, b: tStart }], true);
  }
  return { stroke, plates: nearD + farD, slash: SLASH[corners] };
}


/** A polyline walked in from both ends by `by`. */
function trimEnds(pts, by) {
  const cut = (q) => { let left = by, i = 0; while (i + 1 < q.length) { const d = len(sub(q[i + 1], q[i])); if (d >= left) { const p = add(q[i], mul(sub(q[i + 1], q[i]), left / d)); return [p, ...q.slice(i + 1)]; } left -= d; i++; } return q.slice(-1); };
  return cut(cut(pts).reverse()).reverse();
}


/**
 * A fill path wound so both fill rules agree: the plate one way, every knockout
 * against it, a counter inside a knockout with it again. The knockouts lifted
 * from circle-container siblings were wound for their disc and came out with
 * the shield's plate, which evenodd still cuts but the deep audit reads as loops.
 */
function windAgainst(d) {
  const subs = parse(d);
  const poly = (sp) => outlines(emitSegs(sp.segs, sp.closed), 64)[0];
  const area = (pts) => pts.reduce((a, p, i) => { const q = pts[(i + 1) % pts.length]; return a + p[0] * q[1] - q[0] * p[1]; }, 0) / 2;
  const inside = (pts, [x, y]) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
  const polys = subs.map(poly);
  const plateSign = Math.sign(area(polys[0]));
  const reverse = (sp) => { const segs = sp.segs.slice().reverse().map((g) => (g.k === 'L' ? { k: 'L', a: g.b, b: g.a } : { k: 'C', a: g.b, c1: g.c2, c2: g.c1, b: g.a })); return { ...sp, segs }; };
  return subs.map((sp, i) => {
    const depth = polys.filter((q, j) => j !== i && inside(q, sp.segs[0].a)).length;
    const want = depth % 2 === 0 ? plateSign : -plateSign;
    return Math.sign(area(polys[i])) === want ? sp : reverse(sp);
  }).map((sp) => emitSegs(sp.segs, sp.closed)).join('');
}

/* ---------------------------------------------------------------- writing */
const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';
const S = (d, sharp) => `<path d="${d}" stroke="black" stroke-width="2" stroke-linecap="${sharp ? 'butt' : 'round'}" stroke-linejoin="round"/>\n`;
const G = (d) => `<path d="${d}" fill="black" fill-opacity="0.4"/>\n`;
const F = (d) => `<path d="${d}" fill="black"/>\n`;
const K = (d) => `<path fill-rule="evenodd" clip-rule="evenodd" d="${windAgainst(d)}" fill="black"/>\n`;
function signFiles(sign, corners) {
  const sharp = corners === 'sharp', body = SHIELD[corners], plate = PLATE[corners];
  return {
    stroke: S(body + sign.stroke, sharp) + (sign.dots ? F(sign.dots) : ''),
    'two-tone': G(plate) + S(body + sign.stroke, sharp) + (sign.dots ? F(sign.dots) : ''),
    duotone: G(plate) + S(sign.stroke, sharp) + (sign.dots ? F(sign.dots) : ''),
    fill: K(plate + sign.knock),
  };
}
function userFiles(corners) {
  const sharp = corners === 'sharp', s = userSign(corners);
  return {
    stroke: S(SHIELD[corners] + s.stroke, sharp),
    'two-tone': G(PLATE[corners]) + S(SHIELD[corners], sharp) + F(s.solid),
    duotone: G(PLATE[corners]) + F(s.solid),
    fill: K(PLATE[corners] + s.solid),
  };
}
function offFiles(corners) {
  const sharp = corners === 'sharp', o = offParts(corners);
  return {
    stroke: S(o.stroke.near + o.stroke.far + o.slash, sharp),
    'two-tone': G(o.plates) + S(o.stroke.near + o.slash, sharp),
    duotone: G(o.plates) + S(o.slash, sharp),
    fill: F(o.plates) + S(o.slash, sharp),
  };
}
const MEMBERS = {
  'shield-alert': (c) => signFiles(circleSign('alert', c, 0), c),
  'shield-question': (c) => signFiles(circleSign('question', c, 0.5), c),
  'shield-heart': (c) => signFiles(heartSign(c), c),
  'shield-lock': (c) => signFiles(lockSign(c), c),
  'shield-user': userFiles,
  'shield-off': offFiles,
};

const report = [];
for (const [name, build] of Object.entries(MEMBERS)) {
  const dir = join(OUT, 'raw', name);
  mkdirSync(dir, { recursive: true });
  for (const corners of CORNERS) {
    const files = build(corners);
    for (const [style, body] of Object.entries(files)) writeFileSync(join(dir, `Container=regular, Style=${style}, Corners=${corners}.svg`), HEAD + body + '</svg>\n');
    // what each sign promises: its ink 2 clear of the shield's (a butt corner may lean 0.414)
    if (name !== 'shield-off' && name !== 'shield-user') {
      const stroke = layersOf(HEAD + files.stroke + '</svg>');
      const shield = outlines(SHIELD[corners]);
      let g = Infinity;
      for (const l of stroke) {
        const parts = subpaths(l.d).filter((d) => d !== subpaths(SHIELD[corners])[0]);
        for (const d of parts) for (const o of outlines(d)) {
          // a butt end paints the bar its round cap would overhang: measure the
          // run shortened by the half width, as lint's trimFreeEnds does
          const closedRun = len(sub(o[0], o[o.length - 1])) < 1e-6;
          const run = corners === 'sharp' && l.stroked && !closedRun ? trimEnds(o, 1) : o;
          for (const so of shield) g = Math.min(g, minGap(so, run) - (l.stroked ? 2 : 1));
        }
      }
      const floor = corners === 'sharp' ? 2 - 0.414 : 2;
      assert(g >= floor - 2e-3, `${name} ${corners}: the sign clears the shield by ${g.toFixed(3)}`);
      report.push(`${name.padEnd(16)} ${corners.padEnd(7)} sign clears ${g.toFixed(2)}`);
    } else report.push(`${name.padEnd(16)} ${corners.padEnd(7)} written`);
  }
}
console.log(report.join('\n'));
