#!/usr/bin/env node
/**
 * Geometry and consistency linter for icons/.
 *
 *   node pipeline/lint.mjs [--json]
 *
 * The rule that matters most is COVERAGE, which encodes the variant architecture:
 * duotone and solid require a fillable region, and a fillable region comes from
 * either the glyph enclosing area or from a square/circle container. So an icon
 * whose outline encloses area owes all three styles; an open-stroke glyph owes
 * only outline and gets its filled styles through the containered variants.
 *
 * That distinction is measured from the path data, never guessed by name.
 */

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { inspect } from './lib/svg.mjs';
import { outlines, minGap, roundedCorners, contains, diameter, subpaths, trimFreeEnds } from './lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const ICONS = join(ROOT, 'icons');
const STYLES = ['stroke', 'duotone', 'fill'];

/**
 * The corner treatments, linted as two independent sets.
 *
 * Every rule here is about one drawing or about one icon's styles agreeing, and
 * a treatment does not change either question: sharp owes the same coverage,
 * the same bounds across its own styles, the same spacing. So the two are keyed
 * apart rather than merged — merged, an icon would report six styles and every
 * COVERAGE and CONSISTENCY answer would be nonsense.
 *
 * The exemption lists stay keyed on the bare name, so `LEVEL`, `SKEW_KNOWN` and
 * the rest cover both treatments of an icon without being written out twice.
 */
const CORNERS = ['regular', 'sharp'];
const iconsDir = (corners, style) =>
  corners === 'regular' ? join(ICONS, style) : join(ICONS, corners, style);
const qualify = (corners, s) => (corners === 'regular' ? s : `${corners}/${s}`);

const json = process.argv.includes('--json');

/** Optical size bands, in grid units, keyed by container. */
const BANDS = {
  circle: [21.5, 22.5],
  square: [19.5, 20.5],
  bare:   [15.5, 22.5], // bare glyphs vary by form; the floor is what catches undersizing
};

/**
 * Optical shapes, and the ink each one is drawn to.
 *
 * A drawing is sized by the shape it reads as, not by the box it happens to
 * occupy: a disc has to run wider than a square to carry the same weight, since
 * its corners are missing. Measured across the set, the two square-ish classes
 * are already systems — 93 of 97 round forms sit at 22 and 86 of 94 boxes at 20.
 *
 *   circle      22 x 22      square    20 x 20
 *   horizontal  22 x 18      vertical  18 x 22
 *
 * Only the long axis is enforced on the rectangles. Their short axis is where an
 * object's own proportion legitimately lives — a credit card is not as deep as
 * an envelope — and the envelope guidance already covers it: go past 3 units of
 * padding only when the object is honestly narrow.
 */
const SHAPE_SIZES = { circle: [22, 22], square: [20, 20], horizontal: [22, null], vertical: [null, 22] };

/**
 * The narrow rectangle: 22 x 16 and 16 x 22.
 *
 * A fifth size, granted to objects that are honestly narrower than the house
 * rectangle. It exists because the alternative was worse: at 18 wide a phone
 * takes exactly `file`'s ink box and reads as a tablet. The long axis is still
 * 22, so these are held to the same rule as any other rectangle — the list is
 * here to record which drawings are allowed the 16, and why.
 */
const NARROW = new Set([
  'mic', 'smartphone', 'smartphone-horizontal',
  'smartphone-arrow-down', 'smartphone-arrow-down-left', 'smartphone-arrow-in-down-right',
  'smartphone-arrow-in-right', 'smartphone-arrow-in-up', 'smartphone-arrow-in-up-right',
  'smartphone-arrow-left', 'smartphone-arrow-up-left', 'smartphone-check',
  'smartphone-minus', 'smartphone-plus', 'smartphone-x',
]);

/**
 * Drawings that classify into a shape but are deliberately not at its size.
 *
 * Grouped by the reason, because a list this long is only defensible if every
 * entry has one:
 *
 * - **compact marks** — a caret is punctuation, not an object, and sizing it
 *   like one would make it shout. Same family as the CHEVRON exemption.
 *   `double-check` belongs here too, at 21 x 14. The odd extent gets raised as a
 *   defect and is not one: it sits on half-units, so its padding is 1.5 either
 *   side and it centres exactly. It is a mark sized against `check`, not a
 *   horizontal rectangle that fell a unit short of 22.
 *
 *   `question` joins them at 10 x 16. It is narrow, so the classifier reads it
 *   as a vertical rectangle and asks for 22 — which would make it the tallest
 *   mark in the set by five units, against `check` at 16 x 12, `plus` at 16 x 16,
 *   `caret-down` at 16 x 14 and `x` at 12 x 12. Drawn at 22 it towers over every
 *   one of them, which is what got it sent back. 16 is the band those four
 *   already occupy. Note the size cannot be split from the shape here: the dot
 *   and its 2-unit gap are absolute, so a taller glyph is a wider bowl, and at
 *   22 the bowl reaches 14 across.
 *
 *   `alert` is `question` again, and is here for the same reason rather than a
 *   new one: 2 x 16, so the classifier calls it a vertical rectangle and asks
 *   for 22. It is the same mark drawn against the same four, and the two have
 *   to match each other: a question mark and an exclamation mark sitting five
 *   units apart in a sentence of icons is the defect this would cause.
 * - **media controls** — `pause`, `skip-*` and `stop` are sized as a set against
 *   each other, not against the shape classes. `play` is **not** in that set: it
 *   grew to 18 x 22 and is now exactly the vertical size, so it needs no
 *   exemption. Do not re-add it.
 * - **diagram glyphs** — a git node or a terminal box is sized by the thing it
 *   contains rather than by its silhouette.
 * - **read as a box by the classifier, but not one** — the four diagonal arrows.
 *   `opticalShape` calls them `square` because their corner reach is tiny (0.62,
 *   against a rounded square's 1.66): a corner-to-corner shaft with a head on
 *   the end touches all four corners of its own box more closely than a square
 *   does. They should fall through to the spread floor instead, which is what
 *   actually governs a diagonal — and they clear it comfortably, with a hull of
 *   19.0 against a floor of 15.5. This is a known limit of the classifier, not
 *   an opinion about the drawings. An edge-midpoint test was tried as a fix and
 *   does not work: `outlines()` samples a straight edge only at its endpoints,
 *   so a square's own edge midpoint measures as far from ink as an arrow's.
 * - **answered objects** — each has a documented reason: `credit-card` is
 *   honestly shallower than a square and should not be stretched to 20 x 20,
 *   the octagons cover ~360 units at 20
 *   against a disc's ~380 at 22 and would be far too heavy at 22, `user` is
 *   pinned by H = W/2 + 2, and `settings` cannot be scaled at all — its 16
 *   tooth fillets are absolute tokens, so growing the gear is a redraw rather
 *   than a resize.
 * - **their own proportions** — `bell` and `paperclip` are drawn to a shape the
 *   size ladder cannot hold. A bell stretched to 22 reads as a long nose, and a
 *   paperclip is fixed by its wire: pitch 3.5 and bends of 1.75 / 3.5 / 5.25 are
 *   absolute, so filling 22 can only lengthen the straight runs, which stretches
 *   the clip rather than enlarging it. Both were tried at 22 and rejected on
 *   sight. Sizing follows the drawing here, not the other way round.
 * - **`repeat` and `repeat-1`, sized against the loop family they belong to.**
 *   Both classify as `circle`, and the classification is an artefact of their
 *   own symmetry rather than a reading of the drawing: `repeat` is 180-degree
 *   symmetric, so its two pairs of corners agree (4.43 at the hooks, 3.12 at
 *   the chevrons) and `hi - lo` falls to 1.31, under the 1.5 the circle test
 *   allows. `refresh-cw` and `rotate-cw` are the same idea drawn as an actual
 *   circle at the same 20 x 20, and they escape the bucket only because an
 *   arrowhead fills one corner and pushes `hi - lo` to 2.65. Same size, same
 *   family, opposite verdicts, decided by whether a tick happens to sit in a
 *   corner.
 *
 *   Which leaves the sibling comparison to settle it, and it is not close:
 *   `shuffle` — two rails and two 45-degree chevrons, the closest drawing in
 *   the set — is 20 x 20, as are `refresh-cw` and `rotate-cw`. Rendered beside
 *   the three at 40px, `repeat` at 20 matches them and `repeat` at 22 is
 *   visibly the largest glyph in the row. Sizing follows the family here.
 *
 * - **`wifi`, whose height is not a free axis.** The gap ladder fixes it
 *   completely: the origin mark paints 1, MIN_ELEMENT_GAP puts the first arc at
 *   r=4 and each next one 4 further out, so three arcs reach an ink radius of 13
 *   and the drawing is 13 + 1 = 14 tall, full stop. The only free number is the
 *   fan's half-angle, so `horizontal`'s 22 has to be bought by opening the fan
 *   to 113 degrees — drawn, and rejected as too wide. Reaching 22 x 18 honestly
 *   would need a fourth arc, which is a different icon. It ships at 18 x 14,
 *   sin(half-angle) = 2/3, which puts the outer tips on x = 4 and 20. The
 *   partial states are covered by LEVEL instead, and `wifi-x` classifies as
 *   nothing and answers to the spread floor, so neither needs listing here.
 *   `wifi-info` does need listing, and for the same reason as the base rather
 *   than a new one: its sign is narrow enough to sit inside the fan's own ink,
 *   so the compound measures the base's exact box, 18 x 14, and inherits the
 *   base's problem with it — as does `wifi-exclamation`, which carries the same
 *   sign inverted. Read the group together: a compound is listed here only when
 *   its sign is narrow enough to keep the base's box. `wifi-x` widens to 22 and
 *   drops out.
 *
 * - **`grip-vertical` and `grip-horizontal`, drawn to the proportions the
 *   handle is known by.** Six dots 4 across, on centres 6 apart and 7 down, which
 *   puts the ink at 10 x 18 and its transpose at 18 x 10. The long axis reaches
 *   22 only by opening the pitch to 9, which is 5 units of daylight between
 *   dots and reads as scattered marks rather than as a handle, or by adding a
 *   fourth row, which is a different drawing. A drag handle is the one glyph
 *   whose whole job is to look grippable, and the density is what does that.
 *   Both are listed, because the pair are exact transposes and one of them
 *   passing while the other warns would be the rule disagreeing with itself.
 */
const SIZE_KNOWN = new Set([
  'caret-down', 'caret-left', 'caret-right', 'caret-up', 'check', 'double-check',
  'alert', 'menu', 'minus', 'more-horizontal', 'more-vertical', 'question',
  'grip-horizontal', 'grip-vertical',
  'pause', 'skip-back', 'skip-forward', 'stop',
  'git-commit-horizontal', 'git-commit-vertical',
  'terminal', 'terminal-asterisk',
  'credit-card', 'octagon-alert', 'octagon-x', 'package', 'settings', 'user', 'x',
  'bell', 'paperclip', 'wifi', 'wifi-info', 'wifi-exclamation',
  'repeat', 'repeat-1',
  'arrow-down-left', 'arrow-down-right', 'arrow-up-left', 'arrow-up-right',
]);
const MIN_PAD = 1;

/**
 * What a squared cap is allowed to add to the box, on the sharp treatment only.
 *
 * Sharp keeps the drawing and squares the caps, and the endpoint moves out along
 * its own tangent by the half-width so the butt cap paints where the round cap's
 * disc reached. The tip therefore lands in exactly the same place. What does not
 * is the cap's two corners: a round cap reaches `h` from the endpoint in every
 * direction, and a butt bar reaches `h` across the tangent, so on an axis the
 * pair together reach `h·|sin θ| + h·|cos θ|`, worst at 45° where it is `h√2`.
 *
 * So a diagonal end can sit `h(√2 − 1)` further out than the rounded drawing it
 * came from, and no further. 145 of the sharp icons report a padding of exactly
 * 0.5858 for this reason, every one of them a 45° arrowhead, check or negation
 * slash whose rounded sibling sits exactly on the 1-unit floor: `bell-check`'s
 * tick, the `-off` slash at `M1.2929 1.2929`, the `arrow-*-narrow-wide` heads.
 *
 * Derived rather than chosen, which is the whole point. The floor still bites at
 * 0.5857, so a sharp drawing that genuinely crowds the canvas is still an error,
 * and the allowance cannot grow to cover one.
 */
const CAP_CORNER = (2 / 2) * (Math.SQRT2 - 1);
const padFloor = (corners) => (corners === 'sharp' ? MIN_PAD - CAP_CORNER : MIN_PAD);
/**
 * Allowed difference between opposing paddings.
 *
 * The design guide asks for icons centred by visual weight, not by bounding box,
 * and this measures the bounding box — so it can only ever be an approximation.
 * A whole unit of slack is the price of that: on a 24 grid with integer
 * coordinates, any glyph whose total extent is odd cannot sit centred, and the
 * leftover unit has to fall on one side. Beyond a unit the glyph really is
 * pushed off to one side, which is what this is for.
 */
const MAX_SKEW = 1;

/**
 * Icons that were already off-centre when the equal-padding tier below was
 * added, listed by name so nothing new joins them by accident.
 *
 * Two are answered: `bell-*` and `user-*` are the documented cases where a
 * narrow body cannot reach its own ink corner, so the modifier sits outside it,
 * and `user`'s body geometry forces H = W/2 + 2 — an odd 19. The rest —
 * `git-graph`, `git-pull-request-arrow`, `terminal-cursor`, `signal-*` and
 * `circle-navigation` — predate the rule and have not been adjudicated. They are
 * silenced, not blessed; see *A fractional extent is almost always a defect*.
 *
 * `bin` used to be listed here at 18 x 21 with 2/1 padding. It was adjudicated
 * on 16 Aug 2026 and is now 18 x 22 with 3/3/1/1 — the vertical size, centred
 * exactly — so it is neither in this set nor a finding. Do not re-raise it.
 */
const SKEW_KNOWN = new Set([
  'bell-check', 'bell-dot', 'bell-minus', 'bell-plus', 'bell-x',
  'circle-navigation', 'git-graph', 'git-pull-request-arrow',
  'signal-high', 'signal-low', 'signal-medium', 'terminal-cursor',
  'user', 'user-check', 'user-minus', 'user-plus', 'user-x', 'users',
]);

/**
 * Minimum clear space between two separate elements, per the design guide.
 * Elements whose outlines cross are composites rather than neighbours and are
 * skipped, as are outlines lying on top of each other — that is how a duotone
 * carries a muted fill under its own stroke.
 */
const MIN_ELEMENT_GAP = 2;
const COINCIDENT = 0.1;
/** Slack for the spacing measurement itself. Distance is taken between chords
 *  standing in for curves, so an exact 2-unit gap measures a shade under it. */
const GAP_TOL = 0.02;

/**
 * Corner radii the set actually draws, in grid units.
 *
 * These are the house values, not the guide's. Lucide specifies 2 for shapes of
 * 8 units or more and 1 below that; this set runs rounder — 3 for containers,
 * 4 for panels — and does so consistently across hundreds of corners, so it
 * reads as a deliberate voice rather than drift. What this rule catches is a
 * corner that misses the ladder: a 3.92 or a 4.14 is nobody's decision, it is a
 * shape that was nudged off the grid.
 */
const CORNER_RADII = [0.5, 1, 1.5, 2, 3, 4, 5];
const RADIUS_TOL = 0.05;

/**
 * Dot sizes, in painted diameter. The radius ladder's counterpart for circles.
 *
 * Three roles, and the size is what says which:
 *
 *   2  mark   punctuation on a glyph — an exclamation's period, the tittle of
 *             `info`, a signal's origin. One stroke width, so it reads as a
 *             thickening of the drawing's own line.
 *   3  bead   a dot that is its own element — an ellipsis dot, `tag`'s eyelet,
 *             `lock`'s keyhole, a cart wheel too small to show a hole.
 *   8  node   a dot as an object or badge — a git node, `bell-dot`'s badge. Drawn
 *             as an r=3 ring, because a solid 8 is a blob and would collapse the
 *             stroke/fill axis. It is the 6-unit modifier box painted with the
 *             house stroke, which is where the number comes from.
 *
 * Only the filled sizes are checked. A node is a stroked circle, indistinguishable
 * by measurement from any other small ring — a truck wheel, a compass bezel — so
 * enforcing it here would fire on drawings that are not dots at all.
 *
 * The middle value is not a third size. A bead packed into a box is capped by its
 * wall and neighbour gaps: for three in a row inside a 20-unit body, A >= 6 + d/2
 * and A <= 10 - d collapse to 1.5d <= 4, so d <= 8/3. That is where the dice pips
 * and the contained `more-*` dots sit — a bead at its ceiling, not a free choice.
 */
const DOT_SIZES = [2, 8 / 3, 3];
const DOT_TOL = 0.05;
/**
 * Above this a filled circle is a drawn object rather than a dot — `map-pin`'s
 * knocked-out hole, `circle-user`'s head, a flower's petal — and it answers to
 * the drawing it belongs to rather than to this ladder.
 */
const DOT_MAX = 4;
/** Geometry tolerance in grid units. Cubic-extremum solving lands a few parts
 *  per million off exact integers; anything under a thousandth of a unit is far
 *  below what a 24px grid can express, let alone render. */
const EPS = 1e-3;
/** Tolerance for comparing one style's bounds against another's. Looser than EPS:
 *  a solid built by offsetting and unioning strokes lands a few thousandths off the
 *  outline it derives from. 0.05 units is invisible at any render size while still
 *  catching the real failure, which is off by a full stroke width (2 units). */
const SIZE_TOL = 0.05;

/** Duotone secondary layer opacity. Raised from 0.2 on 8 Aug 2026 — at 0.2 the
 *  muted layer was too faint to read as a second tone on light backgrounds. */
const SECONDARY_OPACITY = 0.4;

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`;

/**
 * Painted diameters of the filled circles in a drawing.
 *
 * A filled circle paints its own width, so the diameter is the measurement — no
 * stroke to add. Circularity is tested against the subpath's own samples rather
 * than trusted from the command list, since a circle here is four cubics and
 * nothing declares itself round.
 */
function dotSizes(src) {
  const out = [];
  for (const m of src.matchAll(/<path\b([^>]*)\/>/g)) {
    const tag = m[1];
    if (!/fill="currentColor"/.test(tag)) continue;
    const d = tag.match(/ d="([^"]+)"/)?.[1];
    if (!d) continue;
    for (const s of subpaths(d, 32).subs) {
      if (!s.closed) continue;
      const w = s.max[0] - s.min[0], h = s.max[1] - s.min[1];
      if (Math.abs(w - h) > 0.02 || w >= DOT_MAX) continue;
      const cx = (s.min[0] + s.max[0]) / 2, cy = (s.min[1] + s.max[1]) / 2;
      let lo = Infinity, hi = 0;
      for (const [x, y] of s.pts) {
        const r = Math.hypot(x - cx, y - cy);
        lo = Math.min(lo, r); hi = Math.max(hi, r);
      }
      if (hi - lo > 0.02 * hi + 0.01) continue; // a rounded square, not a circle
      out.push(lo + hi);
    }
  }
  return out;
}

/**
 * Is every painted shape here a dot?
 *
 * Both filled dot sizes are drawn as filled circles, so a glyph that is nothing
 * but dots carries no stroke anywhere — `more-horizontal` is three beads and no
 * line. That is not the filled silhouette SOLID exists to catch: there is no
 * outline being skipped, because there is no shape to outline, only points.
 */
function onlyDots(src) {
  const paths = [...src.matchAll(/<path\b([^>]*)\/>/g)];
  if (!paths.length) return false;
  let dots = 0;
  for (const [, tag] of paths) {
    const d = tag.match(/ d="([^"]+)"/)?.[1] ?? '';
    dots += subpaths(d).subs.length;
  }
  return dots > 0 && dotSizes(src).length === dots;
}

const container = (name) =>
  name.startsWith('circle-') ? 'circle' : name.startsWith('square-') ? 'square' : 'bare';

/**
 * Level indicators: glyphs whose whole job is to show a partial state.
 *
 * `circle-quarter`'s outline IS a 7x7 wedge sitting in one corner, and its
 * solid IS the whole disc — that is the icon, not a drawing error. `signal-low`
 * is one lit bar of three, so it is 16 units off-centre by design. Three rules
 * assume a glyph fills its canvas and that every style covers the same ground,
 * and all three are wrong here:
 *
 *   CONSISTENCY  the solid legitimately covers far more than the outline
 *   CENTERING    a partial state is meant to sit off to one side
 *   OPTICAL      a quarter is meant to be a quarter of the size
 *
 * Everything else still applies — they are held to the same paint, padding,
 * spacing and coverage rules as any other icon.
 */
const LEVEL = /^(?:circle-|square-)?(?:full|half|quarter|three-quarter)$|^signal-(?:low|medium|high)$|^wifi-(?:low|medium)$|^volume-low$/;   // volume-low is signal-low's case: one wave instead of two, and wifi-* is signal's ladder drawn as arcs
const isLevel = (name) => LEVEL.test(name);

/**
 * The complete state of a level family, which is the one duotone allowed to
 * carry nothing muted: every element is lit by definition, so there is nothing
 * left to reduce.
 *
 * `signal` and `wifi` are the whole ladder. Their partial states — `signal-low`,
 * `-medium`, `-high` and `wifi-low`, `-medium` — *do* mute their unlit units, so
 * they are deliberately not exempt: a missing muted layer on one of those is a
 * real defect.
 *
 * Kept separate from LEVEL and applied only to DUOTONE. LEVEL also waives
 * OPTICAL, CENTERING and CONSISTENCY, and both full states are full-size
 * drawings that should still answer to all three.
 */
const FULL_LEVEL = /^(?:signal|wifi)$/;

/**
 * Chevrons are exempt from the optical floor.
 *
 * The floor measures the centreline diameter, so a lone chevron only ever
 * spans its own width — it has no depth to borrow from. Clearing 15.5 would
 * mean a chevron 13.5 wide, and two of those pointing apart no longer read as
 * two chevrons: the ends close up and `chevrons-up-down` becomes a diamond.
 * Since every chevron-* icon is built from one repeated unit, the unit is
 * sized by the tightest case, which is that facing-apart pair. 12 wide is the
 * largest unit that survives it, and the whole family uses it.
 */
const CHEVRON = /^chevrons?-(?:up|down|left|right)(?:-(?:down|right))?$/;

/**
 * Icons whose container is deliberately open on one side.
 *
 * `navigation`'s frame is an arc that stops short of the bottom, and that gap
 * is the drawing, not a shape left unfinished. (`cursor-gauge` was the other
 * one; it turned out to be the same icon and was folded into this one.)
 *
 * Two rules read that gap as a defect, because both infer the drawing's extent
 * from its bounding box:
 *
 * - CONSISTENCY assumes a fill is the outline filled to its own edge, which
 *   holds only when the outline already encloses the shape. A solid built from
 *   an open arc has to close it, so it covers more ground than the outline.
 * - CENTERING measures padding on all four sides. On the open side the box
 *   stops where the outline stops rather than where the container would be, so
 *   it reports the gap as a glyph pushed to one side. `circle-navigation` reads
 *   as centred because the eye completes the arc; the box cannot.
 *
 * Named explicitly so nothing else inherits either exemption by accident. The
 * failures these rules exist to catch — a *smaller* fill, a glyph genuinely
 * shoved into a corner — are unaffected.
 */
const OPEN_CONTAINER = /^(?:circle-|square-)navigation$/;

/**
 * Dashed level indicators are complete at stroke and duotone.
 *
 * In the solid family the wedge is already filled in every style — `circle-half`'s
 * stroke IS a solid wedge, not an outline — because a progress indicator has to
 * show a filled portion to read as progress. What the three styles actually vary
 * is the container: stroke has none, duotone mutes a disc behind the wedge, fill
 * draws the ring around it.
 *
 * A dashed container is a stroke by definition, so it is already present and
 * unmuted in the stroke variant. That leaves a fill nothing to add — it would be
 * a byte-for-byte copy of the stroke — so these owe only the two styles they can
 * tell apart. `circle-dashed-check` reached the same shape for the same reason.
 *
 * Narrow on purpose: it excuses a missing fill and nothing else, so a dashed
 * level that loses its duotone still fails.
 */
const DASHED_LEVEL = /^(?:circle|square)-dashed-(?:full|half|quarter|three-quarter)$/;

/**
 * A closed shape that is a counter rather than a body.
 *
 * `at`'s bowl encloses 50 square units, so `enclosesArea` is right that it is
 * closed. What it encloses is the counter of a letterform-derived mark, which
 * is white by definition. Filled, the @ becomes a ring with a blob in it;
 * muted, the blob reads as a highlight rather than as a second tone, since
 * there is no second *part* to tone against. Both were drawn and both were
 * rejected on sight.
 *
 * This is the same distinction the set already makes for `question` and the
 * other marks, which simply have no closed counter to expose it. Do not read it
 * as a waiver for objects: a body that encloses a region still owes its filled
 * styles, and everything else here still applies to `at`.
 *
 * `percent` joined on 27 Aug 2026 for the same reason rather than a new one:
 * its two rings are the counters the sign is read by, and a percent with them
 * filled is two beads on a slash — which is the mark `coupon` carries at a
 * sixth of the size, not this glyph. Where a percent does want a solid, the
 * container supplies it and the sign is knocked out of the disc, exactly as
 * `circle-check` does with its mark.
 */
const COUNTER = new Set(['at', 'percent']);

/**
 * A compound's fillability comes from its base.
 *
 * `smartphone` is a closed rounded rect, so it is fillable. `smartphone-check`
 * is that same phone with its bottom-right corner opened for the tick — the
 * modifier convention is to cut a gap rather than stack — so no subpath closes
 * and `enclosesArea` measures it as an open glyph. The form is plainly still
 * closed, and its fill paints a 195-unit region, so the measurement is what is
 * wrong, not the drawing.
 *
 * Strips one trailing segment at a time and asks whether that base is a real
 * icon with a fillable outline. Suffix-only, so a container prefix can never
 * grant this: `bar-chart-down` finds `bar-chart`, which is three open strokes,
 * and stays unfillable — correctly.
 *
 * This only suppresses the warning. It never makes an icon *owe* a duotone or
 * fill, so a compound cannot be dragged into a COVERAGE error by its base.
 */
function inheritedFill(set, name) {
  for (let i = name.lastIndexOf('-'); i > 0; i = name.lastIndexOf('-', i - 1)) {
    const base = name.slice(0, i);
    if (set.has(base) && set.get(base).fillable) return base;
  }
  return null;
}

const findings = [];
const add = (sev, rule, icon, msg) => findings.push({ sev, rule, icon, msg });

/**
 * Every drawn element as a flattened outline plus how far its paint reaches
 * past that outline — half a stroke width, or nothing when the shape is filled.
 *
 * Spacing has to be judged between painted edges rather than between the paths,
 * because a 2-unit stroke puts a whole unit of ink on each side of its own line:
 * two paths three units apart leave only one unit of daylight.
 */
function elements(src) {
  const rootStroked = /stroke="currentColor"/.test(src);
  const sw = parseFloat(src.match(/stroke-width="([\d.]+)"/)?.[1] ?? '2');
  const cap = src.match(/stroke-linecap="([a-z]+)"/)?.[1] ?? 'butt';
  const out = [];
  for (const m of src.matchAll(/<path d="([^"]+)"([^/>]*)\/>/g)) {
    const stroked = /stroke="none"/.test(m[2]) ? false : rootStroked;
    // A single `reach` describes a round cap exactly and a butt one only across
    // the line: at a free end a butt cap paints nothing past the endpoint, so
    // subtracting the half-width there invents a unit of daylight that is not
    // in the drawing. `alert` reported 1.00 between its stem and its dot, for a
    // gap that measures 2.00 on the canvas and 2.00 on its rounded sibling.
    // Trimming the free ends back by the half-width and keeping the reach puts
    // the paint where it actually is, exact except at the cap's two corners.
    const subs = subpaths(m[1], 48).subs;
    out.push({
      polys: stroked && cap === 'butt' ? trimFreeEnds(subs, sw / 2) : subs.map((x) => x.pts),
      reach: stroked ? sw / 2 : 0,
      filled: /fill="currentColor"/.test(m[2]),
    });
  }
  for (const m of src.matchAll(/<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="([\d.]+)"([^/>]*)\/>/g)) {
    const cx = +m[1], cy = +m[2], r = +m[3];
    const pts = [];
    for (let i = 0; i <= 256; i++) {
      const a = (i / 256) * 2 * Math.PI;
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    const stroked = /fill="currentColor"|stroke="none"/.test(m[4]) ? false : rootStroked;
    out.push({ polys: [pts], reach: stroked ? sw / 2 : 0, filled: /fill="currentColor"/.test(m[4]) });
  }
  return out;
}

/**
 * Which optical shape a drawing reads as, from the ink in its box's corners.
 *
 * Fullness cannot tell a round form from a merely sparse one — a drawing of four
 * corner brackets empties its box exactly as a disc does. What separates them is
 * whether the ink reaches the CORNERS, and that measurement is cleanly bimodal
 * across the set: 104 icons sit at 1.5-2.0, which is what a rounded square's
 * r=4 ink corner leaves, and 129 at 4.5-5.0, which is r(sqrt2 - 1) for a disc of
 * r=11. Nothing legitimate falls between, so the thresholds are the measurement
 * rather than a judgement.
 *
 * Returns null for a drawing that reads as neither — a diagonal, a loose
 * arrangement of strokes — which is held to the spread floor instead, since a
 * bounding box understates those by a third.
 */
function opticalShape(els, g) {
  const x0 = 24 - g.pads.right - g.width, y0 = 24 - g.pads.bottom - g.height;
  const corners = [[x0, y0], [x0 + g.width, y0], [x0, y0 + g.height], [x0 + g.width, y0 + g.height]];
  const reach = corners.map(([cx, cy]) => {
    let best = Infinity;
    for (const e of els)
      for (const poly of e.polys)
        for (const [px, py] of poly) best = Math.min(best, Math.max(0, Math.hypot(px - cx, py - cy) - e.reach));
    return best;
  });
  const hi = Math.max(...reach), lo = Math.min(...reach);
  const ratio = g.width / g.height;
  if (ratio > 1.12) return 'horizontal';
  if (ratio < 1 / 1.12) return 'vertical';
  if (hi <= 2.2) return 'square';
  if (hi >= 3.8 && hi <= 5.4 && hi - lo <= 1.5) return 'circle';
  return null;
}

/** Is `inner` sitting on top of a filled `outer` rather than beside it? */
function layered(outer, inner) {
  if (!outer.filled) return false;
  return outer.polys.some((o) => inner.polys.every((p) => p.length && contains(o, p[0])));
}

async function main() {
  if (!existsSync(ICONS)) { console.error('No icons/ — run: node pipeline/build.mjs'); process.exit(1); }

  const set = new Map(); // name -> { styles:Set, geom:{} }

  for (const corners of CORNERS) {
  for (const style of STYLES) {
    const dir = iconsDir(corners, style);
    if (!existsSync(dir)) continue;
    for (const file of (await readdir(dir)).filter((f) => f.endsWith('.svg')).sort()) {
      const name = file.replace(/\.svg$/, '');
      const key = qualify(corners, name);
      const src = await readFile(join(dir, file), 'utf8');
      const id = qualify(corners, `${style}/${name}`);

      if (/stroke="(?!currentColor|none)[^"]+"/.test(src) || /fill="(?!none|currentColor)[^"]+"/.test(src))
        add('error', 'COLOR', id, 'hardcoded paint — must be currentColor');
      if (src.includes('preserveAspectRatio'))
        add('error', 'EXPORT', id, 'preserveAspectRatio present — icon can distort');
      if (/\sid="/.test(src) || /<g[\s>]/.test(src))
        add('error', 'EXPORT', id, 'layer ids or group wrappers survived normalization');
      // A primitive renders fine, but it is a second kind of shape every
      // consumer has to handle, and rare enough that most won't.
      {
        const prims = [...src.matchAll(/<(circle|rect|ellipse|line|polyline|polygon)\b/g)]
          .map((m) => m[1]);
        if (prims.length)
          add('error', 'EXPORT', id, `unflattened ${[...new Set(prims)].join(', ')} — every shape must be a <path>`);
      }
      if (src.includes('stroke=') && !src.includes('stroke-linejoin'))
        add('error', 'JOIN', id, 'stroked icon without stroke-linejoin');

      // One shape, one job. A duotone's muted plate and its full-strength
      // outline share geometry but are different things, and a consumer cannot
      // restyle, recolour or animate a tone that isn't its own element.
      {
        const rootStroked = /stroke="currentColor"/.test(src);
        for (const m of src.matchAll(/<path([^>]*)\/>/g)) {
          const a = m[1];
          const fills = /fill="(?!none)[^"]+"/.test(a);
          const strokes = rootStroked && !/stroke="none"/.test(a);
          if (fills && strokes) {
            add('error', 'LAYERS', id, 'a shape carries both fill and stroke — split the tones into separate paths');
            break;
          }
        }
      }

      // Duotone must be two tones at the agreed secondary opacity. A drawing
      // where every element is reduced is not a style — it is the solid at low
      // opacity, and reads as "disabled".
      if (style === 'duotone') {
        // A single shape can carry both tones — a reduced fill *and* a full-strength
        // stroke. Count the two channels separately rather than classifying the
        // shape, or the compact one-shape duotone reads as all-muted.
        // Muting can ride on either channel. A glyph with a fillable interior
        // mutes its fill; an open-stroke glyph has no interior, so it mutes one
        // of its strokes instead (double-check greys one tick, keeps the other).
        // Counting only fill-opacity misses the second form entirely.
        let muted = 0, full = 0;
        const opacities = new Set();
        for (const sh of src.matchAll(/<(?:path|circle|rect|ellipse)\b([^>]*?)\/?>/g)) {
          const a = Object.fromEntries([...sh[1].matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
          const hasFill = a.fill && a.fill !== 'none';
          const hasStroke = a.stroke !== 'none'; // absent means inherited from root
          const fo = a['fill-opacity'] ? parseFloat(a['fill-opacity']) : 1;
          const so = a['stroke-opacity'] ? parseFloat(a['stroke-opacity']) : 1;
          if (hasFill) { if (fo < 1) { muted++; opacities.add(fo); } else full++; }
          if (hasStroke) { if (so < 1) { muted++; opacities.add(so); } else full++; }
        }
        // A duotone with nothing muted is a mistake everywhere except the
        // complete state of a level family — every bar lit, nothing left to
        // reduce — and dropping that variant would break a consumer switching
        // style across levels. Named in FULL_LEVEL rather than waved through
        // with a warning, so that anything else losing its muted layer is still
        // reported instead of joining a line of accepted noise.
        if (muted === 0 && !FULL_LEVEL.test(name))
          add('warn', 'DUOTONE', id, 'no reduced-opacity layer — only the complete state of a level family may do this');
        else if (full === 0) add('error', 'DUOTONE', id, 'every layer is reduced — reads as a faded solid, not a two-tone icon');
        for (const op of opacities)
          if (Math.abs(op - SECONDARY_OPACITY) > 1e-9)
            add('error', 'DUOTONE', id, `secondary opacity ${op} — the set uses ${SECONDARY_OPACITY} (stale export?)`);
      }

      let g;
      try { g = inspect(src, id); } catch (e) { add('error', 'PARSE', id, e.message); continue; }
      if (!g) { add('error', 'PARSE', id, 'no measurable geometry'); continue; }

      if (g.viewBox !== '0 0 24 24') add('error', 'VIEWBOX', id, `viewBox is "${g.viewBox}", expected "0 0 24 24"`);
      if (g.hasArc) add('warn', 'ARC', id, 'uses arc commands — bounds are approximated');
      const floor = padFloor(corners);
      if (g.minPad < floor - EPS)
        add('error', 'PADDING', id, `padding ${g.minPad.toFixed(2)} < ${floor.toFixed(2)} (geometry too close to the edge)`);
      if (g.skew > MAX_SKEW + EPS && !isLevel(name) && !OPEN_CONTAINER.test(name))
        add('warn', 'CENTERING', id, `off-centre by ${g.skew.toFixed(3)} units`);

      // MAX_SKEW's unit of slack exists for extents that are genuinely odd, and
      // it was being read as a licence to park a spare unit anywhere: the
      // map-pin compounds shipped 2 and 1 at a skew of exactly 1, silently.
      // An even extent can always be centred, so for one there is no slack at
      // all — and where the padding is uneven the fault is usually the extent
      // rather than the placement. See "A linter threshold is a floor, not a
      // target" in SKILL.md.
      // MAX_SKEW's unit of slack was being read as a licence to park a spare
      // unit anywhere. The set's actual standard is exact symmetry, so this
      // tier asks for it: opposing paddings equal, no allowance. An odd extent
      // is not a defence — 21 units centres perfectly well on half-units — and
      // where it cannot, the extent is the thing to fix, not the placement.
      //
      // The tolerance is 0.05 rather than EPS because `plus` sits 0.01 out on a
      // known rounding artefact and fillet tangents quantise at a similar
      // scale. A real placement error is a whole unit, so nothing is missed in
      // between.
      if (!isLevel(name) && !OPEN_CONTAINER.test(name) && !SKEW_KNOWN.has(name)) {
        for (const [axis, a, b] of [
          ['horizontally', g.pads.left, g.pads.right],
          ['vertically', g.pads.top, g.pads.bottom],
        ]) {
          // A squared cap on one side and not the other is a difference the
          // drawing did not make: sharp keeps the rounded placement and moves
          // each free end out along its own tangent, so an arrowhead pointing
          // left puts CAP_CORNER of extra box on the left and none on the
          // right. Allowed once, so a genuinely off-centre sharp drawing still
          // reports.
          if (Math.abs(a - b) > 0.05 + (corners === 'sharp' ? CAP_CORNER : 0))
            add('warn', 'CENTERING', id,
              `${axis} ${a.toFixed(2)} vs ${b.toFixed(2)} — opposing padding must be equal`);
        }
      }

      const band = BANDS[container(name)];
      const size = Math.max(g.width, g.height);
      // The floor asks whether a glyph reads big enough, so it measures the
      // drawing's true extent — a diagonal arrow at 14x14 spans 19 along its own
      // axis. The ceiling asks whether it overflows the canvas, which is a
      // question about the box.
      const els0 = elements(src);
      const reach = Math.max(0, ...els0.map((e) => e.reach));
      const spread = diameter(els0.flatMap((e) => e.polys.flat())) + 2 * reach;
      // The shape a drawing reads as decides the size it is held to; only a
      // drawing that reads as none of them falls back to the floor-and-ceiling
      // band, which is all a diagonal or a loose stroke arrangement can answer.
      const shape = container(name) === 'bare' ? opticalShape(els0, g) : null;
      if (isLevel(name)) { /* a partial state is meant to be partial */ }
      else if (CHEVRON.test(name)) { /* sized by the facing-apart pair — see CHEVRON */ }
      else if (shape && !SIZE_KNOWN.has(name) && !OPEN_CONTAINER.test(name)) {
        const [tw, th] = SHAPE_SIZES[shape];
        // Twice CAP_CORNER, because a drawing can carry a diagonal free end at
        // each extreme of an axis: `arrow-down-narrow-wide` measures 22.83 for
        // the 22-unit glyph its rounded sibling draws exactly.
        const sizeTol = SIZE_TOL + (corners === 'sharp' ? 2 * CAP_CORNER : 0);
        for (const [axis, got, want] of [['wide', g.width, tw], ['tall', g.height, th]])
          if (want !== null && Math.abs(got - want) > sizeTol)
            add('warn', 'OPTICAL', id,
              `${got.toFixed(2)} units ${axis} — a ${shape} icon is drawn ${want}` +
              (NARROW.has(name) ? ' (narrow: 16 on the short axis)' : ''));
      } else if (spread < band[0] - EPS)
        add('warn', 'OPTICAL', id, `spans ${spread.toFixed(2)} units — below the ${band[0]} floor for ${container(name)} icons`);
      else if (size > band[1] + EPS)
        add('warn', 'OPTICAL', id, `${size.toFixed(2)} units wide — above the ${band[1]} ceiling for ${container(name)} icons`);

      // Clear space, measured at two different granularities because the two
      // failures mean different things.
      //
      // A *gap* under 2 units is wrong wherever it appears, so it is measured
      // between subpaths. Whether the three bars of a signal indicator ship as
      // three <path>s or one with three subpaths is a grouping decision; the
      // daylight between them is the same either way.
      //
      // *Overlapping* ink is only wrong between separate elements. Within one
      // element it is almost always a deliberate join — an arrow's head meets
      // its own shaft — so measuring overlap per subpath just reports the
      // drawing back at you.
      //
      // Only the tightest pair is reported: an icon that crowds in one place
      // usually crowds in several, and listing every pair buries the icon that
      // needs redrawing.
      const els = elements(src);
      const parts = els.flatMap((e) => e.polys.map((p) => ({ ...e, polys: [p] })));
      const closest = (list, keep) => {
        let best = null;
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            let centre = Infinity;
            for (const a of list[i].polys)
              for (const b of list[j].polys) centre = Math.min(centre, minGap(a, b));
            if (centre <= COINCIDENT) continue; // crossing, or drawn one over the other
            if (layered(list[i], list[j]) || layered(list[j], list[i])) continue;
            const gap = centre - list[i].reach - list[j].reach;
            if (keep(gap) && (best === null || gap < best)) best = gap;
          }
        }
        return best;
      };

      const overlap = closest(els, (g) => g < -EPS);
      const gap = closest(parts, (g) => g >= -EPS && g < MIN_ELEMENT_GAP - GAP_TOL);
      if (overlap !== null)
        add('warn', 'SPACING', id, `elements overlap by ${(-overlap).toFixed(2)} units`);
      else if (gap !== null)
        add('warn', 'SPACING', id, `${gap.toFixed(2)} units between elements — the guide asks for ${MIN_ELEMENT_GAP}`);

      const offLadder = new Set();
      for (const m of src.matchAll(/<path d="([^"]+)"/g))
        for (const { radius } of roundedCorners(m[1])) {
          // A level indicator's duotone/fill inner solid is the stroke
          // drawing's painted contour, so its corners sit at r+1 of the
          // stroke's r=1.5 — 2.5 by arithmetic, not by drift. Derived, not
          // drawn: the ladder measures decisions, and this one is a
          // consequence. (2026-08-30, the family re-run.)
          if (style !== 'stroke' && (isLevel(name) || DASHED_LEVEL.test(name)) && Math.abs(radius - 2.5) <= RADIUS_TOL)
            continue;
          const near = CORNER_RADII.reduce((a, b) => (Math.abs(b - radius) < Math.abs(a - radius) ? b : a));
          if (Math.abs(near - radius) > RADIUS_TOL) offLadder.add(radius.toFixed(2));
        }
      if (offLadder.size)
        add('warn', 'RADIUS', id,
          `corner radius ${[...offLadder].sort().join(', ')} — off the set's ladder (${CORNER_RADII.join(', ')})`);

      const offDot = new Set();
      // A mark drawn as a short diagonal run measures its own box: squared, the
      // signal family's 2-unit mark spans 2√2. Same allowance, same reason.
      const dotTol = DOT_TOL + (corners === 'sharp' ? 2 * CAP_CORNER : 0);
      for (const d of dotSizes(src))
        if (!DOT_SIZES.some((s) => Math.abs(s - d) <= dotTol)) offDot.add(d.toFixed(2));
      if (offDot.size)
        add('warn', 'DOT', id,
          `dot ${[...offDot].sort().join(', ')} units across — the ladder is 2 (mark) or 3 (bead), ` +
          'or 2.67 where a box caps the bead');

      if (!set.has(key))
        set.set(key, { corners, name, styles: new Set(), fillable: null, dims: {}, solid: false });
      set.get(key).styles.add(style);
      set.get(key).dims[style] = [g.width, g.height];
      if (style === 'stroke') {
        set.get(key).fillable = g.fillable;
        // A drawing with no stroke anywhere is a solid silhouette. It has no
        // outline to fill, so there is nothing to derive a second or third
        // style from — and it reads as a heavy block beside its neighbours.
        // The set now contains none; see the SOLID rule below. A drawing that is
        // nothing but dots is the one exception, and it is a real one rather than
        // a waiver: a dot is filled at every size on the ladder, so `more-*` has
        // no stroke to carry and no outline anyone declined to draw.
        set.get(key).solid = !/stroke="currentColor"/.test(src) && !onlyDots(src);
      }
    }
  }
  }

  // Coverage — the architecture rule.
  for (const [key, info] of [...set].sort()) {
    const { name } = info;
    if (!info.styles.has('stroke')) { add('error', 'COVERAGE', key, 'no stroke style — stroke is the base of every icon'); continue; }
    const missing = STYLES.filter((s) => !info.styles.has(s));
    // The stroke style has to be drawn with stroke. A filled silhouette has no
    // outline to derive duotone or fill from, ignores stroke-width, gives the
    // style picker nothing to vary, and reads as a solid block among outlines.
    // `move-*` were the last four; they were dropped rather than redrawn,
    // because a solid double-arrow has no faithful 2-unit-stroke form. Enforced
    // so the next one cannot arrive unnoticed the way those did.
    if (info.solid)
      add('error', 'SOLID', key,
        'stroke style is a filled silhouette with no stroke — draw it as an outline, or let a container carry the solid');

    if (info.solid && missing.length) {
      // Already reported above; no second complaint about the styles it lacks.
    } else if (DASHED_LEVEL.test(name) && missing.length === 1 && missing[0] === 'fill') {
      // The dashed ring is already unmuted in the stroke; a fill would repeat it.
    } else if (COUNTER.has(name)) {
      // The enclosed region is the mark's counter, not a fillable body.
    } else if (info.fillable && missing.length)
      add('error', 'COVERAGE', key, `outline encloses a fillable region but ${missing.join(' and ')} ${missing.length > 1 ? 'are' : 'is'} missing`);
    // An open-stroke glyph has no interior, so it cannot carry a solid — that
    // comes from a container. It CAN carry a duotone by muting one stroke
    // against another, which is only meaningful when the glyph has separable
    // parts (double-check greys one tick). That is a drawing judgement, so a
    // duotone here is accepted rather than required.
    if (!info.fillable && info.styles.has('fill') && !inheritedFill(set, key))
      add('warn', 'COVERAGE', key, 'open-stroke glyph has a fill — nothing to fill; fills should come from a container');

    // Every style of an icon must occupy the same visual bounds. A solid is the
    // outline filled to its stroke's OUTER edge, so it matches the outline exactly
    // — build it from the inner path instead and it lands a full stroke-width small,
    // which reads as a size change when a UI swaps styles.
    const ref = info.dims.stroke;
    if (ref) {
      for (const s of ['duotone', 'fill']) {
        const d = info.dims[s];
        if (!d) continue;
        const dw = d[0] - ref[0], dh = d[1] - ref[1];
        // A fill is the stroke filled to its outer edge, so it must match exactly —
        // a mismatch there means it was built from the inner path and is a full
        // stroke-width small. A duotone may legitimately be LARGER, because its
        // muted layer can show context the stroke omits (signal-low's empty bars).
        // Larger duotone: warn. Smaller duotone, or any fill mismatch: error.
        // On sharp the stroke carries caps and a solid does not, so a filled
        // style is legitimately shorter by the cap corners its outline sticks
        // out — up to one at each end of an axis. `map-pin-check`'s stroke
        // measures 22.41 against its fill's 22.00, which is that and nothing
        // else. A fill built from the inner path is a whole stroke width small,
        // so the allowance cannot hide one.
        const capSlack = info.corners === 'sharp' ? 2 * CAP_CORNER : 0;
        if (capSlack && dw <= SIZE_TOL && dh <= SIZE_TOL
            && Math.max(-dw, -dh) <= capSlack + SIZE_TOL) continue;
        const duotoneGrew = s === 'duotone' && dw >= -SIZE_TOL && dh >= -SIZE_TOL;
        if (isLevel(name)) continue; // the solid shows the whole, the outline a part
        // An open container has to close before it can be filled, and closing
        // it adds area the outline never covered.
        if (OPEN_CONTAINER.test(name) && dw >= -SIZE_TOL && dh >= -SIZE_TOL) continue;
        if (Math.abs(dw) > SIZE_TOL || Math.abs(dh) > SIZE_TOL)
          add(duotoneGrew ? 'warn' : 'error', 'CONSISTENCY', qualify(info.corners, `${s}/${name}`),
            `${d[0].toFixed(2)}×${d[1].toFixed(2)} vs stroke ${ref[0].toFixed(2)}×${ref[1].toFixed(2)} ` +
            `(${dw >= 0 ? '+' : ''}${dw.toFixed(2)}, ${dh >= 0 ? '+' : ''}${dh.toFixed(2)}) — styles must share bounds`);
      }
    }
  }

  if (json) { console.log(JSON.stringify({ findings, icons: set.size }, null, 2)); process.exit(findings.some((f) => f.sev === 'error') ? 1 : 0); }

  const errors = findings.filter((f) => f.sev === 'error');
  const warns = findings.filter((f) => f.sev === 'warn');

  console.log(`\nLinted ${set.size} icon${set.size === 1 ? '' : 's'} across ${STYLES.length} styles\n`);
  for (const group of [['error', 31, errors], ['warn', 33, warns]]) {
    const [label, colour, list] = group;
    if (!list.length) continue;
    console.log(c(colour, `${label.toUpperCase()} (${list.length})`));
    for (const f of list) console.log(`  ${c(colour, f.rule.padEnd(10))} ${f.icon.padEnd(30)} ${f.msg}`);
    console.log();
  }
  if (!findings.length) console.log(c(32, 'Clean.\n'));
  else console.log(`${errors.length} error(s), ${warns.length} warning(s)\n`);

  process.exit(errors.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
