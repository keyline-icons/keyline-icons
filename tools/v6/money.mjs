/**
 * The 9 Sep money batch: a wallet, the card's four signs, and seven currencies.
 *
 * `credit-card` is already drawn and shipped, so the four compounds are the
 * shipped body cut for a sign rather than a new drawing. Its numbers are read
 * off `icons/stroke/credit-card.svg` and restated here as constants, because a
 * generator that reads a built file builds nothing when the file is absent.
 */
import { Path, polyContour, onArc, n, sub, add, mul, len, unit } from '../v5/geom.mjs';
import { arcFrom } from './icons.mjs';
import { strokedBBox } from '../../pipeline/lib/geom.mjs';
import { sharpEndIn } from '../v5/icons.mjs';

const deg = (r) => (r * 180) / Math.PI;
const ang = (c, p) => deg(Math.atan2(p[1] - c[1], p[0] - c[0]));

/* ------------------------------------------------------------ credit-card */

export const CARD = {
  x: [2, 22], y: [4, 20], r: 3,
  stripe: 9,
  // The modifier's INK ends on the body's ink corner, which is (23, 21), so the
  // sign's BOX is that less the unit of stroke either side: 16..22 by 14..20.
  sign: { x: [16, 22], y: [14, 20] },
};

/** The card body, whole or cut open for a sign in its bottom-right corner. */
export function cardBody({ sharp = false, cut = false } = {}) {
  const r = sharp ? 0 : CARD.r;
  const [x0, x1] = CARD.x, [y0, y1] = CARD.y;
  if (!cut) return polyContour([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [r, r, r, r]);
  // Along the bottom the cut ends 4 short of the sign's box, which is the 2
  // units of white the guide asks for once both round caps are counted;
  // `calendar-*` is the same subtraction and the reason it is 4 and not 3.
  //
  // The right wall does NOT take that number. Four short of the sign puts its
  // end on 10, one unit under the stripe, and a one-unit stub below a crossing
  // line reads as a nub rather than as an end. It stops ON the stripe instead,
  // so the card's right edge is terminated by a line that is already there.
  // That leaves 3 of white to the sign rather than 2, which is a floor.
  const endX = CARD.sign.x[0] - 4, endY = CARD.stripe;
  return new Path().M([x1, endY])
    .L([x1, y0 + r])
    .corner([x1, y0], [x0, y0], r)
    .corner([x0, y0], [x0, y1], r)
    .corner([x0, y1], [x1, y1], r)
    .L([endX, y1]);
}

export const cardStripe = () => new Path().M([CARD.x[0], CARD.stripe]).L([CARD.x[1], CARD.stripe]);

/** The whole card, sharpened as one drawing so every free end is solved together. */
export const card = ({ sharp = false, cut = false } = {}) =>
  glyph([cardBody({ sharp, cut }), cardStripe()], sharp);

/** The eight signs, on whatever box they are handed. */
export function sign(kind, box = CARD.sign) {
  const [a, b] = box.x, [c, d] = box.y;
  const mx = (a + b) / 2, my = (c + d) / 2;
  switch (kind) {
    case 'plus': return `M${n(mx)} ${n(c)}V${n(d)}M${n(a)} ${n(my)}H${n(b)}`;
    case 'minus': return `M${n(a)} ${n(my)}H${n(b)}`;
    // 6 wide by 4 tall, inset a unit top and bottom of the box, which is the
    // geometry `calendar-check` and `file-check` share.
    case 'check': return `M${n(a)} ${n(my)}L${n(mx - 1)} ${n(my + 2)}L${n(b)} ${n(my - 2)}`;
    case 'x': return `M${n(a)} ${n(c)}L${n(b)} ${n(d)}M${n(b)} ${n(c)}L${n(a)} ${n(d)}`;
    default: throw new Error(`no sign ${kind}`);
  }
}

/** The card's plate: the body grown a unit, so its corner is r + 1. */
export function cardPlate({ sharp = false, cut = false } = {}) {
  const r = (sharp ? 0 : CARD.r) + 1;
  const [x0, x1] = CARD.x, [y0, y1] = CARD.y;
  if (!cut) return polyContour([[x0 - 1, y0 - 1], [x1 + 1, y0 - 1], [x1 + 1, y1 + 1], [x0 - 1, y1 + 1]], [r, r, r, r]);
  // Cut, the plate turns the sign's corner out of itself. The notch sits 2
  // clear of the sign's INK, which is the box grown by its own stroke, so it
  // lands on the box less 3 on both axes. `calendar-plus` is the same step,
  // with the same r=1 ends and the same r=3 inner turn.
  const sx = CARD.sign.x[0] - 3, sy = CARD.sign.y[0] - 3;
  return polyContour(
    [[x0 - 1, y0 - 1], [x1 + 1, y0 - 1], [x1 + 1, sy], [sx, sy], [sx, y1 + 1], [x0 - 1, y1 + 1]],
    [r, r, 1, sharp ? 0 : 3, 1, r],
  );
}

/** The stripe's own knockout: its ink, squared off inside the plate. */
export const cardStripeHole = () =>
  polyContour(
    [[CARD.x[0] + 1, CARD.stripe - 1], [CARD.x[1] - 1, CARD.stripe - 1],
     [CARD.x[1] - 1, CARD.stripe + 1], [CARD.x[0] + 1, CARD.stripe + 1]],
    [0, 0, 0, 0],
  );



/* ----------------------------------------------------------------- wallet */

/**
 * A wallet is a FOLDED thing, and that is the whole drawing.
 *
 * The first one here was the card's envelope with a pocket cut into it, which
 * is a card with a slot: it has no fold, so nothing in it says leather rather
 * than plastic. The feature that carries the object is a strip across the top
 * whose LEFT end is a semicircle — the cover coming over the spine — with the
 * body hanging below it. Same class of miss as the book, where the spine's roll
 * was the difference between a book and a card with a line on it.
 *
 * The strip runs the full width and both its ends land on the body's right
 * wall, so they are T-junctions rather than free ends. Stopped short it leaves
 * a four-unit gap against the wall that reads as an unfinished slot.
 *
 * The pocket stays, moved down under the fold, and its clearances are exactly
 * the house 2 at both ends: the fold's inner ink is 9 and the body's is 19, the
 * pocket's outer ink 11 and 17.
 */
export const WALLET = {
  // 20 by 20 of ink, the square size. The flap stops 3 short of the right wall
  // and the body's shoulder steps out below it, which is the notch his 9 Sep
  // drawing turns on: a strip running the full width is a card with a line on
  // it, and the step is what says the cover closes over something.
  x: [3, 21], y: [3, 21], r: 3,
  fold: { top: 3, h: 4 },              // the roll, and the line it hands across
  flap: 18,                            // where the flap's right edge falls
  pocket: { x: 16, y: [12, 16], r: 2 },
};

const foldCentre = () => [WALLET.x[0] + WALLET.fold.h / 2, WALLET.fold.top + WALLET.fold.h / 2];
const FOLD = () => WALLET.fold.top + WALLET.fold.h;   // 7

/**
 * The silhouette, CLOSED, with the roll as its top-left corner and the flap's
 * step as a reflex on the right.
 *
 * Drawn as a fold-strip plus a body it was two open runs, and `COVERAGE` was
 * right to call that a glyph with nothing to fill: the region a reader sees is
 * enclosed by two paths together and by neither on its own. The object is one
 * outline, and the fold is a line across it.
 *
 * The roll survives sharp for the reason the book's does: what sharp takes out
 * is a fillet, and a cover wrapping a spine is the drawing rather than a corner
 * treatment. Only the four body corners and the flap's shoulder go square.
 */
export function walletOutline({ sharp = false } = {}) {
  const r = sharp ? 0 : WALLET.r;
  const [x0, x1] = WALLET.x, y1 = WALLET.y[1], top = WALLET.fold.top;
  const c = foldCentre(), f = WALLET.flap, fold = FOLD();
  return new Path().M([c[0], top])
    .corner([f, top], [f, fold], r)          // the flap's own shoulder
    .L([f, fold])
    .corner([x1, fold], [x1, y1], r)         // the body's, one step out and down
    .corner([x1, y1], [x0, y1], r)
    .corner([x0, y1], [x0, c[1]], r)
    .L([x0, c[1]])
    .A(c, 180, 270, 1)
    .Z();
}

/** The fold itself: the roll's lower half, then straight across to the step. */
export function walletFold() {
  const c = foldCentre(), [x0] = WALLET.x;
  return new Path().M([x0, c[1]]).A(c, 180, 90, -1).L([WALLET.flap, FOLD()]);
}

/** The card pocket, open to the wall so its two ends are T-junctions. */
export function walletPocket({ sharp = false } = {}) {
  const r = sharp ? 0 : WALLET.pocket.r;
  const { x, y } = WALLET.pocket, wall = WALLET.x[1];
  return new Path().M([wall, y[0]]).L([x + r, y[0]])
    .corner([x, y[0]], [x, y[1]], r)
    .corner([x, y[1]], [wall, y[1]], r)
    .L([wall, y[1]]);
}

export const wallet = ({ sharp = false } = {}) =>
  String(walletOutline({ sharp })) + String(walletFold()) + String(walletPocket({ sharp }));

/** The band of white the flap encloses, from the top edge's inner ink down. */
export function walletFoldHole({ sharp = false } = {}) {
  const r = sharp ? 0 : WALLET.r - 1, [x0] = WALLET.x;
  const top = WALLET.fold.top, fold = FOLD(), f = WALLET.flap;
  const rr = foldCentre()[0] - x0 - 1;
  return polyContour(
    [[x0 + 1, top + 1], [f - 1, top + 1], [f - 1, fold - 1], [x0 + 1, fold - 1]],
    [rr, r, 0, rr],
  );
}

/**
 * The pocket's white, which is the pocket's OWN footprint rather than its inner
 * ink, with only the wall side pulled in to the body's inner edge.
 *
 * Taken at the inner ink it is 3 by 2 and paints as a nick; the pocket is the
 * one thing on the drawing that says wallet rather than pouch. `store`'s
 * doorway is the same subtraction for the same reason: the opening is the shape
 * the object has, and only the side the body closes comes in a unit.
 */
export function walletPocketHole({ sharp = false } = {}) {
  const r = sharp ? 0 : WALLET.pocket.r;
  const { x, y } = WALLET.pocket, wall = WALLET.x[1];
  return polyContour([[x, y[0]], [wall - 1, y[0]], [wall - 1, y[1]], [x, y[1]]], [r, 0, 0, r]);
}

/* ------------------------------------------------------------- currencies */

/**
 * Seven currency glyphs on one metric.
 *
 * These are letterforms, and the set already has three: `bold`, `italic` and
 * `underline` all sit on a cap that paints 20 tall, ink 2..22, which is the
 * height used here. A glyph with a through-bar (`dollar-sign`, `bitcoin`)
 * carries the cap on the BAR and lets the letter sit inside it, which is what
 * type does and why the dollar's S is shorter than the euro's bowl rather than
 * the two being drawn to one height.
 *
 * Width is each glyph's own business, as §1 says of the short axis, but the ink
 * is centred on 12 in every one of them: the euro's bars hang left of its bowl
 * and the whole glyph is shifted to pay for it rather than sitting off-centre.
 */
/**
 * The cap is 2..22, which paints 22 tall.
 *
 * It was 20, matching `bold`, and every narrow glyph in the family warned
 * OPTICAL for it: a vertical drawing is drawn 22 in this set and five of the
 * seven read as vertical rectangles. Zafar's 9 Sep dollar is on 2..22, and it
 * is the house number rather than the one `bold` happens to sit on, so the
 * whole family moved to it and the warnings went with them.
 *
 * A glyph with a through-bar carries the cap on the BAR and lets the letter sit
 * inside at 4..20, which is what type does: the dollar's S is shorter than the
 * euro's bowl because the bar is what reaches, not because the two were drawn
 * to different heights.
 */
export const CAP = { top: 2, bottom: 22 };
const THROUGH = { letter: [4, 20] };

/** A straight run, as a Path, so every glyph below is a list of Paths. */
const run = (...pts) => { const p = new Path().M(pts[0]); for (const q of pts.slice(1)) p.L(q); return p; };

/**
 * Sharpen a glyph: butt caps paint nothing past the end, so every free end is
 * carried on by `sharpEndIn` along the tangent it already had.
 *
 * Done on the segments rather than on the string, which is what makes it
 * mechanical: a run's first and last segment each give a direction, and the
 * stub is a straight L on it whatever the segment was. `cpu`'s pins were the
 * lesson — each end has to be solved at its OWN point, because the clamp that
 * keeps the cap's corners inside the box is a function of where the end is.
 */
function sharpen(runs, box) {
  return runs.map((r) => {
    const segs = r.segs;
    if (!segs.length) return r;
    const at = (g, end) => {
      if (g.type === 'L') { const d = end ? sub(g.p1, g.p0) : sub(g.p0, g.p1); return unit(d); }
      const a = end ? g.a1 : g.a0, s = Math.sign(g.a1 - g.a0) * (end ? 1 : -1);
      return unit(mul([-Math.sin((a * Math.PI) / 180), Math.cos((a * Math.PI) / 180)], s));
    };
    const first = segs[0], last = segs[segs.length - 1];
    const p0 = first.type === 'L' ? first.p0 : onArc(first.c, first.r, first.a0);
    const p1 = last.type === 'L' ? last.p1 : onArc(last.c, last.r, last.a1);
    if (len(sub(p0, p1)) < 1e-9) return r;
    const d0 = at(first, false), d1 = at(last, true);
    const k0 = sharpEndIn(p0, d0, box), k1 = sharpEndIn(p1, d1, box);
    const out = new Path().M(add(p0, mul(d0, k0)));
    out.L(p0);
    for (const g of segs) {
      if (g.type === 'L') out.L(g.p1);
      else out.A(g.c, g.a0, g.a1, Math.sign(g.a1 - g.a0));
    }
    return out.L(add(p1, mul(d1, k1)));
  });
}

/**
 * The sharp half is clamped to the ROUNDED drawing's own ink, not to the
 * canvas, which is what `sharpEndIn` defaults to. On an axis-aligned end the
 * two agree; on a diagonal they do not, and the yen's two arms came out 0.05
 * wide of their rounded box before this was passed.
 */
const glyph = (runs, sharp) => {
  const round = runs.map(String).join('');
  if (!sharp) return round;
  return sharpen(runs, strokedBBox(round, 1, 'round')).map(String).join('');
};

export const dollarSign = ({ sharp = false } = {}) => {
  const [t, b] = THROUGH.letter, mid = (t + b) / 2, R = (mid - t) / 2;   // 4, 20, 12, 4
  const lc = [10, t + R], rc = [14, b - R];
  const s = new Path().M([16, t]).L([lc[0], t]).A(lc, -90, 90, -1)
    .L([rc[0], mid]).A(rc, -90, 90, 1).L([8, b]);
  return glyph([run([12, CAP.top], [12, CAP.bottom]), s], sharp);
};

/*
 * Zafar's 9 Sep drawing, coordinate for coordinate.
 *
 * The bowl had been redrawn onto the family's 2..22 cap without being asked,
 * which moved it and left the bars where they were. His answer keeps the cap
 * and settles the two against each other instead: the bowl sits on 15 and the
 * bars run the full 3..17, so the glyph paints 2..22 across and the bars reach
 * past the bowl's own ink rather than stopping short of it.
 */
export const euro = ({ sharp = false } = {}) => {
  const c = [15, 12], R = 10, th = deg(Math.acos(6 / R));   // the 3-4-5 angle
  const bowl = new Path().M(onArc(c, R, th)).A(c, th, 360 - th, 1);
  return glyph([bowl, run([3, 10], [17, 10]), run([3, 14], [17, 14])], sharp);
};

export const japaneseYen = ({ sharp = false } = {}) => glyph([
  run([5, CAP.top], [12, 10], [19, CAP.top]),
  run([12, 10], [12, CAP.bottom]),
  // 4 apart, and the binding clearance is the upper bar against the V's
  // junction on (12, 10), which paints to 11.
  run([6, 14], [18, 14]), run([6, 18], [18, 18]),
], sharp);

/**
 * The bowl is r 4 on (13, 6), so its top lands on 2 and its ink on 1 with the
 * rest of the family, and its 180 degree point IS the stem: one number places
 * the curl and the upright at once instead of two that have to agree.
 */
export const poundSterling = ({ sharp = false } = {}) => {
  const R = 4, c = [13, 6], stem = c[0] - R;               // 9
  const spine = new Path().M([stem, CAP.bottom]).L([stem, c[1]]).A(c, 180, 30, 1);
  return glyph([spine, run([6, 15], [15, 15]), run([4, CAP.bottom], [20, CAP.bottom])], sharp);
};

export const indianRupee = ({ sharp = false } = {}) => {
  const top = CAP.top, bar = 7, waist = 11;
  const a = arcFrom([15, top], [0, 1], [9, waist]);
  const leg = new Path().M([15, top]).A(a.c, ang(a.c, [15, top]), ang(a.c, [9, waist]), a.dir)
    .L([6, waist]).L([16, CAP.bottom]);
  return glyph([run([6, top], [18, top]), run([6, bar], [18, bar]), leg], sharp);
};

/** An F with the franc's own bar through its stem, and nothing else. */
export const swissFranc = ({ sharp = false } = {}) => glyph([
  new Path().M([18, CAP.top]).L([9, CAP.top]).L([9, CAP.bottom]),
  run([9, 11], [16, 11]), run([6, 16], [14, 16]),
], sharp);

/**
 * A B on a 5 stem with two bowls, and the four stubs that make it a bitcoin.
 * The stem and the bar are one solve: the stubs need 2 clear of the stem's ink
 * and 2 of each other, and `stem + bowl right = 24` centres the ink, which is
 * what puts them on 5 and 15.5 rather than on two numbers picked to look right.
 * The right stub lands ON the bar; at half a unit off it read as a floating tick.
 */
export const bitcoin = ({ sharp = false } = {}) => {
  const t = 5, b = 19, mid = (t + b) / 2, stem = 5, R = 3.5, bar = 15.5;
  const upper = new Path().M([stem, b]).L([stem, t]).L([bar, t]).A([bar, t + R], -90, 90, 1).L([stem, mid]);
  const lower = new Path().M([stem, mid]).L([bar, mid]).A([bar, mid + R], -90, 90, 1).L([stem, b]);
  const stubs = [[10, CAP.top, 10, t], [bar, CAP.top, bar, t],
                 [10, b, 10, CAP.bottom], [bar, b, bar, CAP.bottom]]
    .map(([x0, y0, x1, y1]) => run([x0, y0], [x1, y1]));
  return glyph([upper, lower, ...stubs], sharp);
};

export const CURRENCIES = {
  'dollar-sign': dollarSign, euro, 'japanese-yen': japaneseYen,
  'pound-sterling': poundSterling, 'indian-rupee': indianRupee,
  'swiss-franc': swissFranc, bitcoin,
};

/* --------------------------------------------------- currencies, circled */

/**
 * The same seven letters, re-solved to sit inside the ring.
 *
 * Not the standalone glyph scaled: a scale keeps the 2 unit stroke while the
 * counters close up, and it drops the wide-footed ones far below the ring's
 * size, because a bottom bar is the point that reaches the circle first. Each
 * is drawn on the ring's own cap instead, 5 to 19, and every horizontal is
 * pulled in by the circle it sits in rather than by a margin.
 *
 * That cap keeps ONE unit against the ring's inner ink of 9, not the guide's
 * two, and it is a deliberate exception on his word of 9 Sep. Two is the gap
 * between two elements a reader has to tell apart; a container is not a
 * neighbour, it is the frame, and holding the letter off it by two shrinks the
 * letter to about half the well and reads as a mistake rather than as spacing.
 * Eighteen shipped `circle-` icons stop at 7 of ink because their glyphs are
 * marks, not letterforms; a letterform needs the room.
 *
 * `bitcoin` is not here and cannot be. Its four stubs stand outside the letter
 * at both ends, on the part of the circle with no room, and they need 4 clear
 * of the stem as well; solve both and the B shrinks until its bowls carry 1
 * unit of white where the guide asks for 2.
 */
const crun = (...pts) => { const p = new Path().M(pts[0]); for (const q of pts.slice(1)) p.L(q); return p; };

export const CIRCLED = {
  'dollar-sign': () => {
    // His 9 Sep size: the stem is 6 to 18, so the ink lands on 5 to 19 like the
    // other five, and the S sits inside it on a letter box of 7 to 17. That
    // makes the bowl 2.5 and the stem's overhang 1 at each end.
    // The bowl's own reach sets the width: its far edge sits at `a + R` from
    // the middle, and his drawing puts that on 4 so the ink lands on 7 and 17
    // with the rest of the family. That is 2.5 and 1.5 rather than the bare
    // drawing's R and R/2 — the connector between the bowls carries the extra.
    const [t, b] = [7, 17], mid = 12, R = 2.5, a = 1.5;
    return [
      crun([12, 6], [12, 18]),
      new Path().M([mid + R, t]).L([mid - a, t]).A([mid - a, t + R], -90, 90, -1)
        .L([mid + a, mid]).A([mid + a, mid + R], -90, 90, 1).L([mid - R, b]),
    ];
  },
  euro: () => {
    // His 9 Sep centring, and it is OPTICAL rather than the box's.
    //
    // Centred on the ink the bowl sits left of the middle, because the two free
    // ends reach a unit and a half further right than the bowl reaches left and
    // the box counts them at full weight. They are two cap ends; the bowl is
    // the whole mass of the letter. Centring the BOWL leaves the box 1.1 out
    // and the drawing looks right, which is the way round that matters.
    const c = [12.2, 12], R = 6, th = deg(Math.acos(0.6));   // the 3-4-5 angle
    return [
      new Path().M(onArc(c, R, th)).A(c, th, 360 - th, 1),
      crun([6, 10], [c[0] + 2, 10]), crun([6, 14], [c[0] + 2, 14]),
    ];
  },
  /**
   * His 9 Sep yen. Two things move, and the second is the one that was wrong.
   *
   * The bars come to 3 apart from 4, and sit 3 below the V's junction rather
   * than 4 — the same 1 of daylight the ring gets, taken inside the letter for
   * the same reason. That buys the room for the stem to carry on 2 BELOW the
   * bottom bar, which it has to: ended on the bar it reads as a yen with its
   * descender cut off, and the bare drawing runs 4 past.
   *
   */
  'japanese-yen': () => [
    crun([8.5, 6], [12, 10], [15.5, 6]),
    crun([12, 10], [12, 18]),
    crun([8.5, 13], [15.5, 13]), crun([8.5, 16], [15.5, 16]),
  ],
  'pound-sterling': () => {
    const R = 2, c = [12, 8], stem = c[0] - R;
    return [
      new Path().M([stem, 18]).L([stem, c[1]]).A(c, 180, 30, 1),
      crun([8.5, 14], [14, 14]), crun([8.5, 18], [15.5, 18]),
    ];
  },
  'indian-rupee': () => {
    // His 9 Sep drawing puts the WAIST back. I had merged it into the second
    // bar, which is what a rupee looks like with a floor missing: the curl has
    // to come off the top bar, cross the second and land on its own horizontal
    // before the leg leaves. Three bars in the well is what the 1-unit
    // clearance buys.
    const a = arcFrom([13.25, 6], [0, 1], [9.75, 11.4]);
    return [
      crun([8, 6], [15, 6]), crun([8, 9], [15, 9]),
      new Path().M([13.25, 6]).A(a.c, ang(a.c, [13.25, 6]), ang(a.c, [9.75, 11.4]), a.dir)
        .L([8, 11.4]).L([13.8333, 18]),
    ];
  },
  'swiss-franc': () => [
    crun([15.5, 6], [9.5, 6], [9.5, 18]),
    crun([9.5, 10], [15, 10]), crun([8.5, 14], [14, 14]),
  ],
};

/** The circled letter, sharpened against its own rounded ink like the bare one. */
export function circled(name, { sharp = false } = {}) {
  const runs = CIRCLED[name]();
  if (!sharp) return runs;
  const round = runs.map(String).join('');
  return sharpen(runs, strokedBBox(round, 1, 'round'));
}
