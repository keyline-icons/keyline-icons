# Icon pipeline

Turns raw Figma exports into publishable icons, then checks them against the
variant architecture. No dependencies — plain Node ESM.

One exception, and it is an external tool rather than a package: `build-brand.mjs`
rasterises a vector, which plain Node cannot do, so it drives headless Chrome.
Nothing else here needs it, and it tells you where to point `CHROME` if it cannot
find one.

```bash
pnpm icons:build     # raw/ -> icons/
pnpm icons:lint      # check icons/
pnpm icons:react     # icons/stroke/ -> components/icons/index.tsx
pnpm icons:demos     # check the demo pages against icons/
pnpm readmes:check   # check the counts typed into the READMEs against icons/
pnpm readmes:fix     # rewrite those counts in place
pnpm icons:figma     # check the Figma file against raw/ (two steps, see below)
pnpm icons:ci        # sync checks, lint, demo and README checks, typecheck (for CI)
pnpm brand:build     # public/logo/logo.svg -> app/ icons
pnpm paper:build     # icons/ -> previews/paper/ (sheets for paper.design)
pnpm paper:verify    # check the paper.design file against those sheets
```

`icons:figma` is the odd one out and is deliberately not in `icons:ci`: it needs
the Figma file, which CI does not have. Everything else here reads `icons/`, so
a defect that exists only in the design file passes every check — which is how
twelve `smartphone-<modifier>` fills once sat in Figma with their arrows and
ticks missing while the shipped SVGs were perfect. Run it after a drawing
session:

`brand:check` sits out of `icons:ci` for the same reason, and the reason is
worth naming precisely: not that the check is unimportant, but that it cannot
answer the question CI is asking. It rasterises through headless Chrome, so its
output depends on the renderer as much as on the mark — two Chrome versions can
disagree by a pixel on identical input. In CI that reads as "the logo changed"
when nothing did, and a check that cries wolf gets switched off, after which
the real drift ships too. Run it after touching the logo.

```bash
pnpm icons:figma --emit          # prints a snippet
                                 # run it through the Figma plugin API, save the output
pnpm icons:figma digest.txt      # diff that against raw/
```

The set is past what one plugin return can carry, so the snippet works in
chunks. It stops short of the limit and ends with `#NEXT=<name>`; put that name
in its `AFTER`, run it again, and append each run to the same file until no
`#NEXT` comes back. A file that still ends in one is refused rather than
diffed, because a part-digest otherwise reports every icon it never reached as
deleted from Figma, which is the loudest possible way to say "keep pasting".

Both generators take `--check`, which writes nothing and exits non-zero if the
output would differ — `build.mjs --check` for `icons/`, `build-react.mjs --check`
for `components/icons/index.tsx`. The second matters because a stale generated
module fails silently: the old component is still exported, so `tsc` happily
checks the app against a module the set no longer backs.

```bash
pnpm icons:react:check
```

## Layout

```
raw/<style>/<name>.svg      Figma exports, untouched
icons/<style>/<name>.svg    generated — do not hand-edit
pipeline/
  lib/geom.mjs              path parsing, exact bboxes, closed-subpath detection
  lib/svg.mjs               SVG reader + normalizer
  build.mjs                 raw/ -> icons/
  lint.mjs                  geometry + coverage rules
  build-react.mjs           icons/stroke/ -> components/icons/index.tsx
  build-brand.mjs           public/logo/logo.svg -> app/ icons
  build-paper.mjs           icons/ -> previews/paper/ HTML sheets
  check-paper.mjs           check the Paper file against previews/paper/
  build-community.mjs       icons/ -> previews/community/ carousel sheets
  check-search.mjs          the four searches agree, and are right
  check-versions.mjs        each package reports the version it ships as
  check-categories.mjs      every category label has an icon to draw it
```

`build-react` is a restatement, not a transform: it emits one component per
stroke SVG so app code can `import { Check } from "@/components/icons"`. Each
component spreads its own root attributes rather than a shared preset, because
some drawings in `icons/stroke/` carry no stroke of their own — `square-half`
and the other fraction sectors are solid by definition — and painting one on
would outline every knockout.

Styles are `stroke`, `duotone`, `fill`. One icon name lives in up to three
style folders — the folder is the disambiguator, so `square-arrow-down` is one
name with up to three files, matching how Hugeicons splits styles by package.

## What `build` does

Figma exports carry attributes that must never ship. Each is removed for a reason:

| Removed | Why |
| --- | --- |
| `preserveAspectRatio="none"` | lets the icon **distort** when width and height differ |
| `overflow="visible"` | permits painting outside the viewBox |
| `style="display:block"` | presentation belongs to the consumer |
| `id="Vector"`, `id="Container"` | Figma layer names leaking into output |
| `<g>` wrappers | no semantic value |

It then rewrites every concrete paint to `currentColor`, hoists
`stroke` / `stroke-width` / `stroke-linecap` / `stroke-linejoin` onto the root,
and preserves `fill-opacity` so duotone keeps its secondary relationship.

Two details worth knowing:

- **`stroke-linejoin="round"` is added.** No Figma export carried it. Corners are
  currently hand-rounded with béziers, which works at stroke-width 2 but freezes
  the corner radius — a real join scales with stroke width, a drawn one doesn't.
  Declaring the join is what makes a `strokeWidth` prop safe to expose.
- **Fill-only shapes get an explicit `stroke="none"`.** Once the root carries a
  stroke, a shape that had none would otherwise inherit one. This is the duotone
  background plate and the filled body of any mixed fill/stroke icon.
- **Shapes carrying both paints are split in two.** A duotone drawn in Figma as
  one vector with a muted fill and a full-strength stroke ships as two paths:
  the plate, then the outline. They are different things that happen to share a
  contour, and a consumer cannot restyle or animate a tone that is not its own
  element. Rendering is unchanged — one element paints fill then stroke, and two
  adjacent elements do the same in the same order. It costs about 3% in bytes.
- **Neighbouring shapes that paint identically are merged.** Three bars drawn as
  three layers become one path with three subpaths, so output does not depend on
  whether anyone flattened in Figma. A shape *enclosing* another never merges
  (that is a container holding a glyph) and neither do overlapping fills (one
  winding rule across both would let them cancel).

## What `lint` checks

Geometry, measured from the path data — cubic extrema solved exactly, so a
rounded vertex is measured at the curve rather than at its endpoints or control
points:

| Rule | Severity | Checks |
| --- | --- | --- |
| `VIEWBOX` | error | exactly `0 0 24 24` |
| `COLOR` | error | no paint other than `currentColor` / `none` |
| `EXPORT` | error | no `preserveAspectRatio`, ids, groups, or unflattened primitives |
| `JOIN` | error | stroked icons declare `stroke-linejoin` |
| `LAYERS` | error | no shape carries both a fill and a stroke |
| `PADDING` | error | at least 1 unit of clearance on every side |
| `COVERAGE` | error | style obligations are met (below) |
| `SOLID` | error | the stroke style is drawn with stroke, not a filled silhouette (a drawing that is nothing but dots is exempt: a dot is filled at every size, so `more-*` has no stroke to carry) |
| `DUOTONE` | error | two tones present, secondary at exactly 0.4 |
| `CONSISTENCY` | error | every style of an icon shares the stroke's bounds |
| `OPTICAL` | warn | the drawing sits at its optical shape's size; else true extent above the floor, box within the ceiling |
| `SPACING` | warn | 2 units of painted clearance between separate elements |
| `RADIUS` | warn | corner radii land on the set's ladder |
| `DOT` | warn | filled dots land on the dot ladder (below) |
| `CENTERING` | warn | opposing paddings equal; and, separately, within 1 unit |
| `ARC` | warn | `A` commands, whose bounds are approximated |

### Spacing

Measured between **painted** edges, not paths. A 2-unit stroke puts a unit of
ink either side of its own line, so two paths three units apart leave only one
unit of daylight. Distance is taken segment to segment — a straight edge is
stored as two endpoints, and sampling vertices alone would measure to the far
end of an edge instead of to the edge.

Gaps and overlaps are measured at different granularities, because they fail
differently:

- a **gap** under 2 units is wrong wherever it appears, so subpaths are compared
  individually. Whether three bars ship as three `<path>`s or one path with
  three subpaths is a grouping decision, and the daylight between them is the
  same either way.
- **overlapping ink** is only wrong between separate elements. Inside one
  element it is nearly always a deliberate join — an arrow's head meeting its
  own shaft — so per-subpath overlap just reports the drawing back at you.

Two pairs are skipped either way: outlines that cross (a composite, not two
neighbours) and a filled shape that wholly contains another (a muted duotone
disc is a backdrop, not a neighbour). Only the tightest pair per icon is
reported — an icon that crowds in one place usually crowds in several, and
listing every pair buries the icon that needs redrawing.

### Corner radius

The set's ladder, in grid units:

```
0.5  small chamfers        1.5  tight corners        4  panels, brackets
1    inner insets          3    square containers    5  large rounded forms
```

This deliberately differs from the Lucide guide, which specifies 2 for shapes of
8 units or more and 1 below. `4` and `3` account for over 700 of this set's
corners, so it is a house voice rather than drift, and the rule enforces the
ladder instead of the guide. What it catches is a corner landing *near* a ladder
value without hitting it — `3.92`, `4.14`, `0.57` — which is always a shape
nudged off the grid rather than a decision.

Only corners where two straight edges meet through a fillet are measured. A
curve arriving into a fillet is a dome or a lozenge, whose radius is the drawing
itself rather than a corner treatment.

**The ladder is not closed under the +1 an outline adds.** A duotone plate or a
solid is the stroke drawing outlined by one unit, and outlining raises every
corner radius by one. So a shape that is itself on the ladder can still produce
a plate that is not: `git-connection`'s node box was a correct `1.5`, and its
plate came out at `2.5`. Pick from the radii whose successor is also on the
ladder — `0.5`, `1`, `2`, `3`, `4` — for anything that gains a filled style.
`1.5` and `5` are safe only on a shape that stays an outline.

Two consequences worth knowing when reading a `RADIUS` report:

- the rule measures line-curve-line, so a fillet that *ends* a path is invisible
  to it. `git-fork`'s second elbow sat at `2.769` unreported while its first was
  flagged at `3.231`. Fixing only what is reported can leave one connector
  turning two different corners.
- an elbow has two radii, and they can disagree. Several git corners were
  elliptical — `3.34` by `3.03` — which is why they measured at values nobody
  would choose. Rebuild from the corner vertex at the target radius rather than
  nudging control points, or the arc stays elliptical at a tidier size.

### Dot size

The circle ladder, in painted diameter, and each size means a role rather than
being a free choice:

```
2  mark   punctuation on a glyph — an exclamation's period, the tittle of
          `info`, `signal`'s origin. One stroke width, so it reads as a
          thickening of the drawing's own line.
3  bead   a dot that is its own element — an ellipsis dot, `tag`'s eyelet,
          `lock`'s keyhole, a cart wheel too small to show a hole.
8  node   a dot as an object or a badge — a git node, `bell-dot`. Drawn as an
          r=3 ring: a solid 8 is a blob, and it is the 6-unit modifier box
          painted with the house stroke, which is where 8 comes from.
```

Both filled sizes are drawn as filled circles, and a filled circle paints its own
width — so the diameter *is* the measurement, with no stroke to add. Only those
two are enforced. A node is a stroked circle, and no measurement separates one
from a truck's wheel or a compass bezel, so a rule over them would fire on
drawings that are not dots at all.

**`2.67` is not a third size, it is a bead at its ceiling.** A bead packed into a
box is capped by its wall and neighbour gaps: for three in a row inside a
20-unit body, `A >= 6 + d/2` and `A <= 10 - d` collapse to `1.5d <= 4`, so
`d <= 8/3`. That is where the dice pips and the contained `more-*` dots sit. A
box with different walls caps at a different number, and that case wants an
exemption written down rather than a wider tolerance.

Above 4 units a filled circle is a drawn object — `map-pin`'s knocked-out hole,
`circle-user`'s head, a petal — and answers to its drawing, not to this ladder.

One consequence worth knowing: a dot drawn as a *stroked hairline circle* paints
solid, and paints two units wider than its path. That is how `lock`'s keyhole and
`shopping-cart`'s wheels shipped at 4 across while measuring r=1, and neither the
`SOLID` rule nor a scan of filled subpaths could see them. If a dot measures off
the ladder by exactly 2, suspect the construction before the size.

### Optical size

A drawing is sized by the **shape it reads as**, not by the box it happens to
occupy. A disc has to run wider than a square to carry the same weight, because
its corners are missing — so the classes carry different sizes:

```
circle      22 x 22          square    20 x 20
horizontal  22 x 18          vertical  18 x 22
  narrow    22 x 16            narrow  16 x 22
```

These are measurements, not preferences: 93 of 97 round forms already sat at 22
and 86 of 94 boxes at 20. The circle-to-square ratio, 22/20 = 1.10, is the
standard optical compensation for a disc against a box — so the set was already
doing this by habit.

**Only the long axis is enforced on the rectangles.** Their short axis is where
an object's own proportion legitimately lives, and the envelope guidance already
governs it: go past 3 units of padding only when the object is honestly narrow.
The **narrow** row is that permission written down — 22x16 for objects narrower
than the house rectangle. It exists because forcing the alternative was worse: at
18 wide a phone takes exactly `file`'s ink box and reads as a tablet. `NARROW`
lists the fifteen drawings allowed it.

**Classification is by corner reach** — how far the box's corners sit from the
nearest ink. Fullness cannot do the job, because a drawing of four corner
brackets empties its box exactly as a disc does. Corner reach is cleanly bimodal
across the set: 104 icons at 1.5–2.0, which is what a rounded square's r=4 ink
corner leaves, and 129 at 4.5–5.0, which is `r(√2 − 1)` for a disc of r=11.
Nothing legitimate falls between, so the thresholds are the measurement rather
than a judgement.

A drawing that reads as **none** of the four — a diagonal, a loose arrangement of
strokes — falls back to the floor-and-ceiling band below, which is all a bounding
box can say about it.

The floor measures the drawing's **true extent** — the largest distance between
any two points — because that is how big a glyph reads. A diagonal arrow drawn
at 14x14 spans 19 units along its own axis, and diagonal glyphs are deliberately
drawn smaller so they do not look oversized next to axis-aligned ones. Measuring
their bounding box punishes exactly that compensation.

The ceiling still measures the bounding box, since overflowing the canvas is a
question about the box rather than about how the glyph reads.

`SIZE_KNOWN` holds the drawings that classify into a shape and are deliberately
not at its size, grouped by reason: compact marks (a caret is punctuation, not an
object, `double-check` sits on half-units so its odd 21 still centres, and
`question` is drawn 10 x 16 with the other marks rather than the 22 its narrow
box asks for), the
media controls (sized as a set against each other — `play` is not among them, it
grew to 18 x 22 and is on-system), diagram glyphs (a git node is sized by what it
contains), the two drawings with proportions the ladder cannot hold (`bell` and
`paperclip`), the four diagonal arrows (the classifier reads a corner-to-corner
shaft as a box; the spread floor is what really governs them, and their hull of
19.0 clears it), `repeat` and `repeat-1` (read as a circle only because they are
180-degree symmetric, so both pairs of corners agree and `hi - lo` falls under
the test's 1.5; `refresh-cw` and `rotate-cw` are the same idea drawn as a real
circle at the same 20 x 20 and escape only because an arrowhead fills one
corner — so the family, `shuffle` included, is what sets the size), and four
answered objects — `credit-card` is honestly shallower
than a square, `octagon-alert` covers ~360 units at 20 against a
disc's ~380 at 22 and would be far too heavy at 22, `user` is pinned by
`H = W/2 + 2`, and `settings` cannot be scaled at all: its 16 tooth fillets are
absolute tokens, so growing the gear is a redraw rather than a resize.

### Chevrons are exempt from the optical floor

Every `chevron-*` icon is one repeated unit, so the unit has to be sized by the
tightest arrangement it appears in. That is `chevrons-up-down`, where two units
point away from each other. Above about 12 units wide their ends close up and
the pair stops reading as two chevrons — it reads as a diamond.

The floor wants more than that. A chevron has no depth to borrow from, so its
true extent is just its width, and clearing 15.5 would need a unit 13.5 wide —
comfortably inside the range that produces the diamond. The family uses 12 and
takes the warning.

### CENTERING has two tiers, and the strict one is the real standard

The 1-unit tier is the old one, and on its own it was misleading: it exists so
that a glyph whose extent is genuinely odd can park its spare unit somewhere,
and it kept getting read as a unit of licence for any placement. The `map-pin`
compounds shipped 2 units of padding on the left against 1 on the right, at a
skew of exactly 1, and the build stayed silent.

So the strict tier asks for what the set actually does — **opposing paddings
equal, no allowance**. Measured over 381 icons, only 19 fail it, and they are
listed by name in `SKEW_KNOWN` rather than covered by a threshold, so nothing
new joins them by accident. `bell-*` and `user-*` are answered there (a narrow
body that cannot reach its own ink corner, and `user`'s H = W/2 + 2); the rest
are silenced pending a decision, not blessed.

An odd extent is not a defence. 21 units centres perfectly well if the drawing
sits on half-units, and where it genuinely cannot, the extent is the thing to
fix — see *A linter threshold is a floor, not a target* in the skill.

The tolerance is 0.05 rather than `EPS`, because `plus` sits 0.01 out on a known
rounding artefact and fillet tangent points quantise at a similar scale. A real
placement error is a whole unit, so nothing is missed in between.

### An open container is exempt from CONSISTENCY and CENTERING

`navigation` has a frame that is open in the outline — an arc that stops short
of the bottom. The gap is the drawing rather than a shape left unfinished, and
both `circle-` and `square-` forms are affected. (`cursor-gauge` was the other
one; it was the same icon under a second name and has been folded into this.)

Two rules read that gap as a defect, because both infer the drawing's extent
from its bounding box:

- `CONSISTENCY` assumes a fill is the outline filled to its own edge, and that
  holds only when the outline already encloses the shape. A solid built from an
  open arc has to close it, so it covers more ground than the outline does.
- `CENTERING` measures padding on all four sides. On the open side the box stops
  where the outline stops rather than where the container would be, so it
  reports the gap as a glyph pushed to one side. `circle-navigation` leaves 1
  unit above and 3 below, yet reads as centred, because the eye completes the
  arc where the box cannot.

Matched on an explicit list of names, so nothing else inherits either exemption
by accident. The failures the rules exist to catch — a *smaller* fill, a glyph
genuinely shoved into a corner — are unaffected.

### Level indicators are exempt from three rules

`circle-full/half/quarter/three-quarter`, their `square-` counterparts and
`signal-low/medium/high` exist to show a *partial* state. `circle-quarter`'s
outline is a 7x7 wedge in one corner and its solid is the whole disc; that is
the icon, not a mistake. Three rules assume a glyph fills its canvas and that
every style covers the same ground, so they are skipped for these:

| Rule | Why it would fire |
| --- | --- |
| `CONSISTENCY` | the solid legitimately covers far more than the outline |
| `CENTERING` | a partial state is meant to sit off to one side |
| `OPTICAL` | a quarter is meant to be a quarter of the size |

Everything else still applies. They are held to the same paint, padding,
spacing and coverage rules as any other icon, and the exemption is matched on
an explicit list of names rather than inferred, so a new icon cannot fall into
it by accident.

### Centering

This measures the bounding box, but the design guide asks for centring by visual
weight — so it is an approximation and carries a full unit of slack. On a 24
grid with integer coordinates, a glyph whose total extent is odd cannot sit
centred and the spare unit has to fall on one side. Only offsets beyond a unit
mean the glyph is genuinely pushed to one side.

## The coverage rule

This is the architecture, encoded:

> Duotone and solid require a fillable region. A fillable region comes from
> either the glyph enclosing area, or from a square/circle container.

```
open glyph   + no container   ->  stroke only
open glyph   + square/circle  ->  stroke + duotone + fill
closed glyph + no container   ->  stroke + duotone + fill
closed glyph + square/circle  ->  stroke + duotone + fill
```

That table says what an icon **owes**, not the most it may have. A duotone
needs two tones, and a fill is only one way to get the muted one — a *stroke*
at 0.4 works just as well, and `DUOTONE` counts `stroke-opacity` alongside
`fill-opacity` for exactly that reason.

So an open glyph with no fillable region can still carry a duotone whenever it
has a secondary element worth muting, even though it owes none:

- `signal-low` and `signal-medium` mute the bars above the current level
- the 16 `*-dashed-panel` icons mute the panel and leave the arrow at full
  strength, which suits a shape that already reads as a boundary

Neither gains a fill — there is still nothing to fill. `cursor-dashed-panel`
is the exception in that family: its glyph *is* fillable, so it takes the
ordinary muted-plate duotone and mutes the cursor rather than the panel.

Fillability is **measured, never guessed from the name**: the linter walks the
outline's subpaths and asks whether any closed one encloses more than 8 square
units. The threshold ignores incidental closed dots — a lock's keyhole, an
alert's period — which are closed but are not what makes a glyph fillable.

This distinction is easy to get wrong by eye. `bar-chart` is
`M19 15V20M12 4V20M5 9V20` — three open strokes with no interior. It *looks*
fillable; it isn't. Outline-only is correct there, and the containered
`square-bar-chart` is how that glyph gets its filled styles.

`triangle-alert`, by contrast, closes with `...L9.35439 3.54683Z` around a real
interior. It owes a duotone and a solid, and the linter says so.

### A compound inherits its base's fillability

Measuring the outline has one blind spot, and the modifier convention causes it.
A compound cuts a gap in the base rather than stacking on top, so the base's
outline stops being closed. `smartphone` is a closed rounded rect;
`smartphone-check` is the same phone with its bottom-right corner opened for the
tick, and no subpath closes. Measured literally it is an open-stroke glyph, and
its perfectly good fill — a 195-unit region — looks like a mistake.

So when a glyph measures unfillable, the linter strips one trailing segment at a
time and asks whether that base is a real icon with a fillable outline.
`smartphone-arrow-in-up-right` finds `smartphone`; `bar-chart-down` finds
`bar-chart`, which is three open strokes, and stays unfillable — correctly.

Two limits keep this from doing more than it should. It is suffix-only, so a
container prefix can never grant fillability. And it only suppresses the
warning: it never makes an icon *owe* a duotone or a fill, so no compound can be
dragged into a `COVERAGE` error by its base.

### A counter is not a fillable body

`at`'s bowl encloses 50 square units, so `enclosesArea` is right that the glyph
closes. What it closes around is the counter of a letterform-derived mark, which
is white by definition. Fill it and the @ becomes a ring with a blob in it;
mute it and the blob reads as a highlight rather than a second tone, because
there is no second *part* to tone against. Both were drawn and both were
rejected on sight, so `COUNTER` excuses the two filled styles by name.

Read it narrowly. It is the distinction the set already makes for `question`
and the other marks, which simply have no closed counter to expose it; it is not
a waiver for objects. A body that encloses a region still owes its filled
styles, and every other rule still applies to `at`.

### A dashed level indicator is complete at stroke and duotone

`circle-half`'s stroke variant is a *solid* wedge, not an outline, because a
progress indicator has to show a filled portion to read as progress. So the
three styles do not vary the glyph at all — they vary what sits behind it:
stroke has nothing, duotone mutes a disc, fill draws the ring.

A dashed container is a stroke by definition, so it is already present and
unmuted in the stroke variant. A fill would add nothing and land byte-for-byte
identical, so `circle-dashed-*` and `square-dashed-*` owe only the two styles
they can tell apart. `circle-dashed-check` arrived at the same shape.

`DASHED_LEVEL` excuses a missing `fill` and nothing else, so one of these that
loses its duotone still fails.

A useful consequence: since the wedge stays solid it also stays the same size,
and every dashed level reuses its solid sibling's path unchanged. An outlined
wedge would have cleared the ring by only 1 instead of 2 — the outline puts a
unit of ink outside the path — and would have had to shrink to fit.

## Settled decisions

Recorded 8 Aug 2026. These are what the linter enforces — change the rule here
and in `lint.mjs` together, never one alone.

**Not every icon comes in all three styles.** That was the founding question and
the answer is no. Obligation is derived from geometry, per the coverage rule
above. Many glyphs — `smartphone`, `lock`, `cursor` — have a natural form that a
square or circle container would fight, so they carry their filled styles
directly and never gain a container.

**Containers apply only to simple glyphs.** No `square-user-check`. Wrapping an
already-compound icon crowds the 24-unit grid: the modifier would have to shrink
below what a 2px stroke can render legibly. Compounds carry the three styles
directly. Lucide takes the same position.

**Duotone secondary opacity is `0.4`.** Raised from `0.2`, where the muted layer
was too faint on light backgrounds to read as a second tone — which is what made
the all-muted duotones look like a disabled state. Enforced by `SECONDARY_OPACITY`
in `lint.mjs`; a stale `0.2` export now fails the build.

**Duotone is the outline drawing plus a muted fill behind it.** Never the solid
at reduced opacity. At least one layer stays at full strength. `lock` was already
the correct model; `user` and `circle` were not.

**Modifiers sit bottom-right.** A compound is a base glyph plus a small modifier
(`user-check`, `user-lock`), and the modifier occupies the bottom-right corner in
every icon, at a fixed size, defined once in the Figma component so it cannot
drift. Where it overlaps the base, cut a knockout gap equal to the stroke width
rather than stacking — the solid `circle-user` already does this with
`fill-rule="evenodd"`.

> Not yet linted: the bottom-right rule is a drawing convention until the first
> compound is drawn in all three styles. Writing the check before there is
> anything to test it against would ship an unverified rule.

## What `check-demos` checks

The demo pages under `app/demo/` name the glyphs they draw as literal arrays in
`lib/*-demo.ts` — `MOBILE_ICON_NAMES` — and type their screen
data against that union. TypeScript therefore already guarantees every *use*
site matches the list. It cannot know whether the list matches `icons/`, because
those are strings resolved against the filesystem when the page renders.

That gap is exactly what a rename opens, and it has already bitten once:
`circle-trending-up-2` became `circle-trending-2-up` in the set and the demo
kept the old name, taking down `/demo/mobile`.

| | |
|---|---|
| `UNKNOWN` | the name is not in the set. `pickMobileIcons` throws on this, so the page 500s — loud, but only once someone opens it |
| `NOSTROKE` | the name exists but has no stroke drawing |
| `NOTCONST` | the list lost its `as const`, so the screen data silently stopped being checked against it |

## What `check-readmes` checks

Eleven numbers, spread across `README.md` and `packages/react/README.md`: the
icon count, the three per-style counts, the SVG total and the two container
counts, plus the four the React package repeats.

They are the only counts in the project that are *prose*. The site calls
`loadIcons()` per request, the Figma cover and the paper sheets are generated,
and the Figma file has `check-figma`. A README has none of that, so it sat at
414 icons and 1,059 SVGs while the set grew past 500. Nothing failed and nothing
warned; the first line of the repo's front page was simply wrong.

Two things about how it is written:

- **It matches the sentence, not the digits.** Each claim is a regex with one
  capture group around the number, so a reworded line reports `MISSING` rather
  than quietly ceasing to be checked. That failure is not fixable by `--fix` and
  is not meant to be: the pattern has to follow the new wording.
- **`--fix` substitutes digits and touches nothing else.** It also keeps the
  formatting it found, so `1,286 SVGs` stays comma'd and a bare table cell stays
  bare. A generated README would invite someone to correct a stale number by
  rewriting the paragraph around it; this cannot.

Adding a claim is one row in `CLAIMS`.

## What `check-figma` checks

Every variant is reduced to a **segment-set signature** on both sides, and the
two are diffed. Every segment the geometry draws — with its Bezier controls — is
written in one canonical spelling, bucketed by paint, deduplicated, sorted and
hashed.

| | |
|---|---|
| the signature differs | **real.** The two are not the same drawing |
| a stroke is not `CENTER`-aligned | **real.** SVG strokes are always centred, so anything else renders in Figma differently from what ships — and on an *open* subpath `INSIDE` renders as nothing at all |
| a variant is missing | **real.** One side has a style the other does not |

Bounds are still reported, but only inside the message, so a hit reads as
something rather than a bare "differs".

This replaced a digest of layer count, subpath count and painted bounds. That
digest passed **176 drifted variants**, because all three can hold still while
the drawing moves. `git-check`'s duotone stored its ring at r=4 — the *plate's*
radius — instead of the r=3 centreline: same outer bounds as the plate beside it,
same counts, but painted the ring overshot the plate and the stem's cap landed
inside the muted fill as a black notch. `git-commit-horizontal`'s duotone still
had both side bars in its geometry and rendered neither, because the layer
carried `strokeAlign: INSIDE`.

A signature over the geometry has to ignore the four ways Figma and `raw/`
disagree without meaning anything. Each of these cost a false-positive round:

- **Direction.** Figma may store a segment end-to-start. Canonical spelling.
- **Grouping.** Figma's vector network splits polylines at shared vertices, and
  `build` merges sibling layers. Segments pool per paint bucket, not per subpath
  or per layer.
- **Float32.** Figma stores `11.995` as `11.994999885`. Rounding to 0.1 lands
  both on one value; 0.01 does not, because they straddle a boundary.
- **Duplicates.** `raw/` often closes a shape with `V<y>Z`, a run back to the
  start that Figma leaves to `Z`. A set that ignores duplicates reconciles them.

Paint buckets are keyed by what is painted, not how it is layered, which is what
absorbs the `<path fill stroke>` vs two-stacked-layers disagreement: a path
carrying both contributes to both buckets.

What it deliberately does *not* ignore is connectivity. An earlier attempt
compared bare point sets and gave all four of `file-arrow-{up,down,left,right}`
the same signature — same four vertices, different joins — so an arrow pointing
the wrong way would have sailed through.

One measurement trap is baked in: the Figma side takes bounds from
`absoluteRenderBounds`, not from `x`/`width` plus half a stroke. The latter
assumes every stroke is centre-aligned, which is exactly the property this file
lost once and no longer guarantees on its own.

`NOSTROKE` is the one nothing else catches. `PhoneIcon` resolves
art as `art[style] ?? art.stroke` and render `null` when that misses too, so an
icon with no stroke does not fail — it disappears. Stroke being the base of
every icon is what makes it a safe fallback, and what makes its absence a bug
rather than a gap.

Because a rename is the expected cause, a failure reports the likely new name:
same tokens in a different order first, then the longest shared prefix.

New demos are picked up automatically — any `export const <X>_ICON_NAMES` under
`lib/` is checked, so this does not need editing when a page is added.

## What `build-paper` emits

The set as HTML, for paper.design. One sheet per catalogue section, plus a
manifest, under `previews/paper/`.

```bash
pnpm paper:build
pnpm paper:check     # in icons:ci, so a redrawn icon fails here
```

Paper's canvas is HTML and CSS rather than a scene graph, and the only write its
MCP server exposes is `write_html`, so the unit it imports is a document. There
is no "import 1,231 SVGs" call to aim at; a sheet of inline drawings is what the
tool accepts, which is why this is a generator rather than a pointer at
`icons/`.

Three things about the output are decisions rather than defaults:

- **The sheets are fragments with every rule inline**, no doctype and no
  `<style>` block. `write_html` places a fragment into a node and parses inline
  styles only: the first import that carried a stylesheet arrived as a single
  unstyled column, with the drawings themselves perfect, so nothing about the
  result named the CSS as the cause. A browser wraps a fragment on its own, so
  they still open locally for review.
- **The card is Figma's card, measured rather than designed.** 742 wide, 28 of
  padding, a 14 corner; a header with the icon count pushed right, the
  category's `blurb` from `lib/icon-taxonomy.ts`, a hairline, then rows. Rows
  are 38 tall on a 10 corner, striped `#f5f5f5` on the even ones, and read left
  to right as the bare drawing, its name, then every other variant of it pushed
  right. The ink is `#111111`, which is Figma's rather than the site's
  `#0a0a0a`. All of it was read out of `Category / Core Interface` with the
  plugin API: the two surfaces are meant to be indistinguishable and only one of
  them gets to decide.
- **One card per category**, cut into parts only for the wire. The first part
  carries the card and an empty rows container; the rest are bare rows the
  importer appends into that container, so the board holds one card however many
  calls built it.
- **The artboard behind a card must be transparent**, and `create_artboard`
  ignores that and paints white. It has to be set again with `update_styles`
  afterwards or the card reads as rounded on top and square at the bottom, since
  an opaque board is a square rectangle filling the corners back in.

## What `check-paper` checks

`paper:check` proves the sheets match `icons/`. It says nothing about the file
they were written into, and that is where the drift lives: an artboard is
written once and then sits there while the set moves under it. A board of 48
icons against a sheet of 51 looks exactly like a board that is up to date.

```bash
pnpm paper:verify              # needs Paper Desktop open with the file
pnpm paper:verify --json
```

Not in `icons:ci`, for the reason `icons:figma` and `brand:check` are not: it
needs an application CI does not have. Unlike `icons:figma` it is one step
rather than two, because Paper's MCP server is local HTTP with no auth, so the
script talks to it directly instead of emitting a snippet to paste. The file it
checks is the one `SET_PAPER_URL` points at, read out of `lib/site-chrome.ts`;
`--file <id>` overrides it and `PAPER_MCP` overrides the endpoint.

Six findings, and the distinction between them is the useful part:

| | |
| --- | --- |
| `MISSING` | a sheet's artboard is not in the file |
| `ORPHAN` | an artboard no sheet builds |
| `STALE` | the board holds a different number of drawings than its sheet |
| `DRIFT` | same count, different icons, reported with the first disagreement |
| `UNNAMED` | written but never named, so every layer still reads `SVG` |
| `UNREADABLE` | the tree summary came back partial, so nothing can be concluded |

**What it cannot see is the drawings.** Paper will not hand geometry back:
`get_jsx` returns the layout with the paths stripped, and `export` answers a
node with an empty list. So this compares composition and names, which catches
an icon added, removed, renamed, a category re-split and a board built from an
older sheet, but not a drawing redrawn under the same name in the same place.
That is a real hole and it is better stated than papered over: `icons:figma`
compares geometry, this compares inventory.

Categories come from `lib/icon-taxonomy.ts`, parsed rather than copied, and the
parse asserts it read a pattern for every label. Without that check a regex
written across two lines hands its whole category to `Other`, which looks like a
grouping decision rather than a broken read.

## Adding icons

1. In Figma, select the **Components** page and Export → SVG.
2. Drop the result into `raw/`.
3. `pnpm icons:lint` and fix what it reports.
4. `pnpm ship -m "Draw sun"`

`ship` does the rest: every generator, the checks, the commit, and then the icon
dates and the Paper boards folded into it. Step 3 is separate only because a
drawing that fails the linter should be fixed before it is committed, not after.

Figma exports component-set variants as one folder per set, with the variant
properties as the filename:

```
raw/arrow-down/Container=regular, Style=stroke.svg   ->  icons/stroke/arrow-down.svg
raw/arrow-down/Container=square, Style=fill.svg      ->  icons/fill/square-arrow-down.svg
raw/arrow-down/Container=circle, Style=duotone.svg   ->  icons/duotone/circle-arrow-down.svg
```

The build reads the icon name from the folder and the container/style from the
filename, so there is no renaming step. Hand-authored icons can still go
straight into `raw/<style>/<name>.svg`; defining the same icon in both layouts
fails the build rather than letting one silently win.

> Export from the Components page, not the catalogue. The catalogue's frames
> carry no style information — that is what the component sets encode.

## Cutting a release

Nothing in the pipeline does this. `ship` deliberately stops at the commit, so
the steps below are the only record of the order, and the order is the whole
difficulty.

**The version is not typed anywhere.** `build-history.mjs` reads it from
`packages/react/package.json`, and takes the release *date* from the git tag. So
a release is a tag plus a rebuild, and bumping the React package is what decides
what the next version is called.

```bash
git checkout main && git pull
git tag v0.1.1 && git push origin v0.1.1
pnpm history:build          # releasedVersion and releasedAt, off the new tag
pnpm paper:build            # the boards are dated by the release
pnpm icons:ci
```

Then commit `lib/icon-history.json` and `previews/paper/`, re-import the changed
Paper sheets, and run `pnpm paper:verify`.

**The tag cannot contain the file the tag produces**, and this reads as a
mistake every time. `history:build` needs the tag to exist before it can date
the release, so the history commit necessarily lands after the tag and the tag
does not include it. That is not a corner anyone cut: `git show
v0.1.0:lib/icon-history.json` says `released: false`, because at the moment
v0.1.0 was tagged it was true.

**A release clears every "new" dot, and that is the point.** `isNewSince`
compares each drawing's added date against `releasedAt`, so moving that date
forward empties the badge from the grid, the changelog and the Paper boards in
one step. Expect the diff to be visible on every surface rather than in one
file, and do not go looking for the list that needs emptying: there isn't one,
which is why the badge is derived rather than kept.

**`paper:check` is the only check that drifts** when the date moves. The rest,
`cover`, `data`, `community` and `readmes`, are counted off `icons/` and do not
care when the release was.

### Publishing the packages

Separate from the tag, and needed only when a package's contents changed. The
CLI and the MCP server each bundle their own `icons.json`, so new drawings mean
a new version of both; React ships its components and needs one too.

There is no npm `workspaces` field in the root manifest, only a
`pnpm-workspace.yaml`, so `npm publish --workspace` does not work. Publish from
each directory:

```bash
cd packages/react && npm publish && cd ../..
cd packages/cli && npm publish && cd ../..
cd packages/mcp && npm publish && cd ../..
```

Two things that cost time when they go wrong:

- **A version bump is two edits per package.** The manifest is what npm reads;
  the `VERSION` constant in `src/index.mjs` is what the binaries answer with.
  0.1.1 shipped with the two disagreeing. `check-versions` exists for that.
- **npm reports a rejected publish as `E404`, not `401`.** A 404 on a `PUT` to a
  package that plainly exists means the token was refused, not that the package
  is missing. Check with `npm whoami` before believing the error, and re-run
  `npm login` if it answers 401.

`react` builds its `dist/` from `prepublishOnly`, so the directory is
gitignored and never commits; a stale local build cannot ship. `npm publish
--dry-run` runs that build and prints the tarball without authenticating, which
makes it a real check of the contents and no check at all of the credentials.
