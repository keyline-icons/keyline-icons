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
  // 20 by 20 of ink, which is the square size, and it is the POCKET that
  // forces it. On the card's 22 by 18 envelope the body is 10 of interior, a
  // pocket clearing 2 top and bottom is 4 tall, and 4 tall leaves 2 of white
  // inside it: in the filled style that paints as a dash rather than a pocket.
  // At 20 by 20 the pocket is 6 tall with 4 of white, and it reads.
  x: [3, 21], y: [3, 21], r: 3,
  fold: { top: 3, h: 4 },
  pocket: { x: 13, y: [11, 17], r: 3 },
};

const foldCentre = () => [WALLET.x[0] + WALLET.fold.h / 2, WALLET.fold.top + WALLET.fold.h / 2];

/**
 * The silhouette, CLOSED, with the fold's semicircle as its top-left corner.
 *
 * Drawn as a fold-strip plus a body it was two open runs, and `COVERAGE` was
 * right to call that a glyph with nothing to fill: the region a reader sees is
 * enclosed by two paths together and by neither on its own. The object is one
 * outline, and the fold is a line across it.
 */
export function walletOutline({ sharp = false } = {}) {
  const r = sharp ? 0 : WALLET.r;
  const [x0, x1] = WALLET.x, y1 = WALLET.y[1], top = WALLET.fold.top;
  const c = foldCentre(), fr = c[0] - x0;
  if (sharp) {
    return polyContour([[x0, top], [x1, top], [x1, y1], [x0, y1]], [0, 0, 0, 0]);
  }
  return new Path().M([c[0], top])
    .corner([x1, top], [x1, y1], r)
    .corner([x1, y1], [x0, y1], r)
    .corner([x0, y1], [x0, c[1]], r)
    .L([x0, c[1]])
    .A(c, 180, 270, 1)
    .Z();
}

/** The fold itself: the semicircle's lower half, then straight across. */
export function walletFold({ sharp = false } = {}) {
  const { top, h } = WALLET.fold, c = foldCentre(), [x0, x1] = WALLET.x;
  if (sharp) return new Path().M([x0, top + h]).L([x1, top + h]);
  return new Path().M([x0, c[1]]).A(c, 180, 90, -1).L([x1, top + h]);
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
  String(walletOutline({ sharp })) + String(walletFold({ sharp })) + String(walletPocket({ sharp }));

/** The plate: the silhouette grown a unit, so the fold's corner is r + 1 too. */
export function walletPlate({ sharp = false } = {}) {
  const r = (sharp ? 0 : WALLET.r) + 1;
  const [x0, x1] = WALLET.x, y1 = WALLET.y[1], top = WALLET.fold.top;
  const c = foldCentre(), fr = c[0] - x0 + 1;
  if (sharp) return polyContour([[x0 - 1, top - 1], [x1 + 1, top - 1], [x1 + 1, y1 + 1], [x0 - 1, y1 + 1]], [1, 1, 1, 1]);
  return new Path().M([c[0], top - 1])
    .corner([x1 + 1, top - 1], [x1 + 1, y1 + 1], r)
    .corner([x1 + 1, y1 + 1], [x0 - 1, y1 + 1], r)
    .corner([x0 - 1, y1 + 1], [x0 - 1, c[1]], r)
    .L([x0 - 1, c[1]])
    .A(c, 180, 270, 1)
    .Z();
}

/** The band of white the fold encloses, from the top edge's inner ink down. */
export function walletFoldHole({ sharp = false } = {}) {
  const { top, h } = WALLET.fold, c = foldCentre(), [x0, x1] = WALLET.x;
  const r = sharp ? 0 : c[0] - x0 - 1;
  return polyContour(
    [[x0 + 1, top + 1], [x1 - 1, top + 1], [x1 - 1, top + h - 1], [x0 + 1, top + h - 1]],
    [r, 0, 0, r],
  );
}

/** The pocket's white, bounded by its own inner ink and the body's wall. */
export function walletPocketHole({ sharp = false } = {}) {
  const r = sharp ? 0 : WALLET.pocket.r - 1;
  const { x, y } = WALLET.pocket, wall = WALLET.x[1];
  return polyContour([[x + 1, y[0] + 1], [wall - 1, y[0] + 1], [wall - 1, y[1] - 1], [x + 1, y[1] - 1]], [r, 0, 0, r]);
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
export const CAP = { top: 3, bottom: 21 };
const THROUGH = { letter: [5, 19] };

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
    if (len(sub(p0, p1)) < 1e-9) return r;              // closed: no free end to carry
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
 * wide of their rounded box before this was passed. That is §"the sharp
 * diagonal end" in one line: a butt cap's corner sits further along a diagonal
 * than the disc it replaces, so the box has to bind.
 */
const glyph = (runs, sharp) => {
  const round = runs.map(String).join('');
  if (!sharp) return round;
  return sharpen(runs, strokedBBox(round, 1, 'round')).map(String).join('');
};

export const dollarSign = ({ sharp = false } = {}) => {
  const [t, b] = THROUGH.letter, mid = (t + b) / 2;
  const R = 3.5, lc = [9.5, t + R], rc = [14.5, b - R];
  const s = new Path().M([16, t]).L([lc[0], t]).A(lc, -90, 90, -1)
    .L([rc[0], mid]).A(rc, -90, 90, 1).L([8, b]);
  return glyph([run([12, CAP.top], [12, CAP.bottom]), s], sharp);
};

export const euro = ({ sharp = false } = {}) => {
  const c = [14, 12], R = 9, th = deg(Math.acos(6 / R));
  const bowl = new Path().M(onArc(c, R, th)).A(c, th, 360 - th, 1);
  return glyph([bowl, run([4, 10], [16, 10]), run([4, 14], [16, 14])], sharp);
};

export const japaneseYen = ({ sharp = false } = {}) => glyph([
  run([5, CAP.top], [12, 11], [19, CAP.top]),
  run([12, 11], [12, CAP.bottom]),
  // 15 and 19, not 14 and 17. The binding clearance is not between the two
  // bars, it is between the upper one and the V: the arms' junction on (12, 11)
  // paints to 12, so a bar on 14 leaves 1 unit of white above it.
  run([6, 15], [18, 15]), run([6, 19], [18, 19]),
], sharp);

/**
 * The bowl is r 4 on (13, 7), so its top lands on 3 and its ink on 2 with the
 * rest of the family, and its 180 degree point IS the stem: one number places
 * the curl and the upright at once instead of two that have to agree.
 */
export const poundSterling = ({ sharp = false } = {}) => {
  const R = 4, c = [13, 7], stem = c[0] - R;
  const spine = new Path().M([stem, CAP.bottom]).L([stem, c[1]]).A(c, 180, 30, 1);
  return glyph([spine, run([6, 15], [15, 15]), run([4, CAP.bottom], [20, CAP.bottom])], sharp);
};

export const indianRupee = ({ sharp = false } = {}) => {
  const top = CAP.top, bar = 7.5, waist = 10.5;
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
 * A B on a 7 stem with two bowls, and the four stubs that make it a bitcoin.
 * The stem and the lower bowl's reach are solved together: `stem + right = 24`
 * is what centres the ink on 12, which is why they are 7 and 17 and not two
 * numbers picked to look right.
 *
 * It is two OPEN runs sharing the stem, which is how `bold` draws the same
 * letter and is not a stylistic echo: closed, the two bowls are subpaths
 * enclosing more than 8 square units, so `COVERAGE` would ask this glyph for a
 * fill, and a filled B is a blob with two dots in it. The bowls are counters.
 */
export const bitcoin = ({ sharp = false } = {}) => {
  // Its own letter box, shorter than the dollar's, and that is what the stubs
  // buy: the four of them need 3 units each at top and bottom, so the B gives
  // up two of its own. R then falls out as 3, since a bowl spans half of 12.
  // stem 6 and bar 15 are one solve, not two choices: the stubs need 2 clear of
  // the stem's ink and 2 of each other, which puts them on 10 and 15, and the
  // right one has to land ON the bar. `stem + bowl right = 24` then centres the
  // ink, so the bowls sit on 15 with R 3 and reach 18.
  const t = 6, b = 18, mid = (t + b) / 2, stem = 6, R = 3, bar = 15;
  const upper = new Path().M([stem, b]).L([stem, t]).L([bar, t]).A([bar, t + R], -90, 90, 1).L([stem, mid]);
  const lower = new Path().M([stem, mid]).L([bar, mid]).A([bar, mid + R], -90, 90, 1).L([stem, b]);
  // Both stubs land ON a bar rather than beside it. At 13.5 the right pair
  // missed the letter by half a unit and read as two floating ticks.
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
