# How the sharp variant was arrived at

Every version generated on 28 Aug 2026, in the order they were made, each with
the mistake that produced the next one. Kept because the wrong turns are more
instructive than the answer, and because two of them were only caught by eye.

All sets are the full 585 stroke drawings. `scripts/` holds every generator,
including the ones that were wrong.

---

## The question

Sharp meant "take the corners off". That turned out to be three separate
questions — what to do with the corner, what to do with the join, and what to do
with the size — and getting one right while another was wrong is most of what
follows.

## 1. `sharp/` — de-fillet, mitre join, butt caps, ends extended

The first idea. Every drawn fillet removed back to the vertex it was cut from,
`stroke-linecap` switched to butt, and each free end pushed out a unit so a butt
cap would paint where a round cap did.

**What was wrong:** nothing held the size. 74 drawings painted outside their own
box, `triangle-alert` by 2.7 units. And the cap rule was too eager: 8 drawings
had an end that used to land on another part of the drawing and now punched
through it. `home`'s door hangs 0.95 below the house base; `map`'s folds overrun
the body by 1.05. Also affected: `mail-open`, `globe-cursor`, `hammer`,
`package`, `git-arrow-right`, `volume-off`.

## 2. `sharp-roundcap/` — the same, with the house round cap kept

Written once the cap rule proved to be the cause of §1's second failure. This
set is the base every later version is built from.

## 3. `fitted/` — uniform scale to pull the vertices back in

The first attempt at holding the size: scale each drawing about (12,12) until
the vertices the de-fillet created sit back inside the rounded drawing's bounds.

**What was wrong:** it fits the wrong thing. Scaling about the centre moves
every edge, including the ones that were already correct, so a triangle that sat
on the floor now floats above it. Caught by drawing a rule across the drawings
and seeing that the base no longer touched. `triangle-alert` came out 20.64 by
17.91 where the rounded one is 22 by 20 — smaller than the drawing it replaces.

## 4. `solved/` — solve the painted box, whole drawing

The right target, found by working out what a stroke actually paints. Round
joins and caps make the painted box the geometry box grown by half the stroke;
a **mitre does not** — it reaches `1/sin(half the interior angle)` past its
vertex. Two-axis bisection on the geometry scale until the painted box matches
the rounded drawing's, then translate onto it.

Exact: every one of the 74 lands on its box, error 0.

**What was wrong:** it scales the whole drawing, so an element that was never at
fault gets dragged along. `skip-back` lost a quarter of its bar (14 units down
to 10.5) to fix a triangle the bar was not part of.

## 5. `r1/` — corners set to a 1-unit radius

Prompted by the observation that sharp does not have to mean radius 0. A fillet
reaches `(r + w) − r/sin(a)` past its vertex where a mitre reaches `w/sin(a)`,
which at a sharp apex goes negative — the arc paints *inside* the vertex. At
radius 1, 567 of 585 land on their box exactly, against 534 at radius 0.

**What was wrong, twice over:** the pass **set** every corner to 1 rather than
capping it there, so corners already tighter got rounded **up** — the cursor
family draws its arrow at 0.5 and its tip at 0.7. And it added fillets at
vertices that never had one, which is how `circle-check`'s tick and
`circle-activity`'s zigzag came out rounder than the originals.

## 6. `r1-parts/` — radius 1, fitted contour by contour

The fix for §4: match each subpath to its own counterpart in the rounded
drawing, so an element that was never wrong never moves. `skip-back` keeps its
`M5 5V19` bar, exactly 14 units. 18 drawings needed it; painted boxes match to
within 0.0012.

## 7. `r1-ends/` — terminal corners, first attempt

A corner arc at the **end** of an open path was skipped by every pass, because a
fillet was defined as a curve with a line on both sides and these have a line on
one side and a free end on the other. `copy`'s back sheet was the example.

**What was wrong:** it took the tangent at the free end as the outgoing
direction, which produced a diagonal spike. The path stops *part way* round the
corner — 45 degrees into a quarter turn on `copy` — so the tangent there is not
where the edge was heading.

## 8. `r1-ends2/` — terminal corners, correctly

Fit the circle the arc lies on, complete the turn to the corner the drawing
meant (a right angle unless the arc already turned further), take the outgoing
edge from that, fillet it, then run out along that edge to where the original
end projects. `copy`'s back sheet leaves its corner straight down from (16, 3)
to (16, 4). 71 corners across 46 drawings.

## 9. `sharp-final/` — the radius as a ceiling

`radius = min(original, 1)`. 1045 corners clamped down, **287 left exactly as
drawn** because they were already tighter, across 105 drawings.
`circle-cursor`'s glyph comes through byte-identical to the rounded file, which
is the right answer for something already sharper than the ceiling.

**What was still wrong:** everything above only ever touched *drawn* fillets,
and that was never the whole problem.

## 10. The root cause

`stroke-linejoin="round"`. **A vertex that is sharp in the geometry still paints
as a 1-unit round corner.** So no amount of work on drawn fillets could sharpen
a drawing whose corners were left to the join — the tick in `circle-check`, the
zigzag in `circle-activity`, the arrow elbows, the bell's bottom rail. Nine
versions in, and the attribute had never been touched.

## 11. `mid/` — the middle rung

Every drawn fillet removed, **round join kept**. Each corner paints at radius 1.
135 drawings needed a contour fit; painted boxes match exactly.

## 12. `sharp2/` — sharp

Every drawn fillet removed, join set to **mitre**. Corners are true points. 1468
fillets removed, across three classes, and the third is the one that had been
missing all along:

1. between two lines,
2. at a free end,
3. **between a line and a curve** — the bell's bottom corners, the shields, the
   map pins, `star`, `settings`, `wrench`, the `user` family. Those were the
   ~150 corners written off as needing a person; most did not.

278 drawings needed the contour fit. Worst painted-box error across all 585 is
**0.005**. Four drawings carry a mitre past the default limit of 4 and would
bevel: the `git-branch` family, at 16.1.

---

## What the arithmetic settled

A drawn fillet of radius `r` paints at `r + 1`, because the stroke adds half its
width. So at a 2px stroke **1 unit is the floor for a rounded corner**, and the
only thing below it is a true point. There is no half-unit corner to be had.
That leaves exactly three rungs:

| rung | geometry | join | painted corner |
| --- | --- | --- | --- |
| rounded | drawn fillets, house ladder | round | radius 4 at a body corner |
| middle | every fillet removed | round | radius 1 |
| sharp | every fillet removed | mitre | a point |

Which is the same ladder Hugeicons ships as Rounded / Standard / Sharp, reached
from the stroke arithmetic rather than by copying them.

## Still unsettled

- **The cap.** Round throughout here; Material's sharp uses butt.
- **The `git-branch` family**, which needs a raised `stroke-miterlimit` or a
  drawn corner.
- **Fill and duotone**, untouched. Both are outlined strokes with their caps and
  joins baked in, so they need a stroke outliner this repo does not have.

---

## 13. `fill-mid/` and `duotone-mid/` — the other two styles

Neither needed the stroke outliner. The same arithmetic that governs the stroke
governs them: a fill **is** the drawing offset outward by half the stroke width,
and offsetting adds that much to every outer corner radius and takes it off
every inner one. The middle rung's stroke corner is radius 0, so its fill corner
is **1 outside and 0 inside** — applied to the fills the set already has rather
than re-derived from the stroke.

Outer versus inner is decided by geometry, not by eye: at an outer corner the
vertex the fillet was cut from lies **outside** the filled region, at an inner
corner **inside**. 368 outer and 130 inner corners across the fills, 891 and 92
across the duotones.

**Two constructions live in these files** and they take different rules, which
cost a wrong first pass. `calendar`'s fill is an outline (`fill` plus
`stroke="none"`), so the 1-and-0 rule applies. `triangle-alert`'s is filled
**and** stroked, so it is still a centreline and follows the stroke rule.
Treating the second as the first sharpened one half of a knockout's rounded end
and left the other, which is how the cap guard was found: the other half of a
round cap is not a corner to be eaten, and the guard is that the curve a fillet
dies into must have a chord of at least 2.5 units.

111 fills and 114 duotones needed a contour fit. Painted box error across both
sets: 0.

## 14. `solved-mid/` — the one that sizes right

The set the Testing board now shows, and the first that answers "the sizes are
off" with a measurement instead of an argument. Same middle rung as `mid/`:
every drawn fillet gone, the house round join kept, so a corner paints at
radius 1 rather than 4.

The pipeline, in this order:

```
sharpen2.mjs   remove every fillet, recover the vertex
tidy.mjs       merge the collinear points that leaves behind
solve-growers.mjs  clamp only overshooting vertices to the rounded box
caps.mjs       butt caps, free ends pushed out a unit
tidy.mjs       merge again
```

Solving the growers **before** the caps step is not a preference. Run the other
way it clamps the extensions straight back off, and `alert`'s bar comes home to
5..15.

Three rules earned their place here:

**The turn guard is two-tiered.** Tangency proved on both sides is proof enough
of a fillet however hard it turns, so it may run to 175 degrees. `volume`'s cone
apex turns 142, and a flat 135 cap quietly left it round. The tight cap now
applies only where tangency is one-sided, which is the case where an arc could
be a feature rather than a fillet.

**A cap extension is clamped on curved ends only.** A round cap paints a disc of
radius 1; a butt cap paints a 2-wide bar. Off a straight line a full unit is
exact. Off an arc the straight stub leaves the turn and overshoots, which is
where `volume`'s waves gained 0.83. Straight ends take the whole unit even when
diagonal: trimming those to fit the box cost `volume-x` the symmetry of its X,
one arm short and the other not, which reads far worse than the overshoot.

**Freeness is about staying embedded, not about being near.** An end is held
only when something sits within 1.2 **and** is still within 1.2 after the
extension. `home`'s door ends on the base and stays there, so it is held. The
bar in `heart-hand` ends a unit below the palm's own start and grows away from
it, so it extends; the plain distance test held it and lost the unit.

Painted box against the rounded drawings, all 585: **424 exact, 161 within 0.45,
none beyond**. Every one of those 161 is the same number, `sqrt(2) - 1 = 0.41` —
a square end on a 45 degree diagonal, which is what a sharp cap is, not drift.

The scripts read the rounded set from an absolute path. They are kept as a
record of how this was solved, not as a build step.

## 15. `solved-fill/` and `solved-duotone/` — the other two styles, sized right

`fill-mid/` and `duotone-mid/` above were fitted contour by contour, which is a
rescale, and a rescale is exactly what was ruled out. These are the same two
styles built the way `solved-mid/` was: sharpen, then move only what sticks out.

Two things had to change first.

**Half the fill set was being read as strokes.** The classifier asked for
`stroke="none"` before it would treat a path as an outline, and 220 of the fill
paths never say it — their `<svg>` sets no stroke at all, so there is nothing to
turn off. Whether a path is stroked is a property of the file as much as the
path. Read the root first: 896 outer corners came through after the fix against
368 before, and `triangle-alert`'s fill had been coming out rounded.

**The clamp had to stop squashing.** A stroke can clamp a vertex outright — a
lone point moved in one axis is still a point. A fill cannot: its corners are
radius-1 arcs, because the fill IS the painted boundary and a sharp stroke with
the house round join paints a radius-1 turn. Clamping the arc's coordinates
flattens it, and `triangle-alert` grew a lid across its apex.

So `solve-growers-parts.mjs` translates the offending corner instead. Every
point that would fall outside moves by the same amount, which is the true
overshoot of the curve rather than of its control points, so the corner keeps
its shape and only the edges into it shift. It works **per path**, against that
path's own box in the rounded drawing: a duotone's tint and its stroke would
otherwise each move by their own overshoot and come apart from one another.

47 fills and 80 duotones needed it. Painted box against the rounded drawings:
**432 of 432 and 480 of 480 exact.**

## 16. Square ends for the other two styles

Section 15 sharpened the corners and left the ends alone, so `circle-check`'s
fill still had round ones while the stroke beside it had square. Two different
reasons, in the two constructions.

A **duotone**'s glyph is a stroke, so switching its cap is the renderer's job —
but the geometry still has to grow a unit at each free end or it paints short,
and that pass had only ever been run on the stroke set. 1978 ends extended.

A **fill**'s glyph is an outline, and its round cap is baked in: a semicircle of
radius 1 joining the two sides of the stroke. `caps-styles.mjs` finds that
U-turn — an arc between two ANTIPARALLEL lines whose chord is about one stroke
wide — and replaces it with a flat end pushed out a unit, which is exactly where
the semicircle's apex was, so the painted extent does not move. 533 flattened.

The join at a corner stays a radius-1 arc in both, and should: the fill is the
painted boundary, and a sharp stroke with the house round join paints a
radius-1 turn. Only the ends were wrong.

**A closed path can start in the middle of a cap**, splitting its arc across the
wrap. `battery`'s bars came out flat at one end and round at the other until the
pass rotated each closed run to start on a straight segment first.

Painted box, both styles: 350 of 432 fills and 373 of 480 duotones exact, the
rest within 0.45 and none beyond — the same diagonal square-end residual the
stroke set has.

## 17. The two that made the fill and duotone look undone

**`fill-rule` was being dropped on the way into Figma.** 193 of the 652 fill
paths carry `fill-rule="evenodd"`, and their holes only knock out under that
rule — battery's three bars, the calendar's header, circle-check's tick. The
SVG files were always right; the compact encoder that packs them into a plugin
call was not. Whatever re-serialises these paths has to carry `fill-rule` and
`clip-rule` with them.

**The fill and duotone never ran `tidy`.** sharpen2 leaves the fillet's two
tangent points behind as redundant points ON the straight edges — harmless,
because tidy merges collinear points, and the stroke pipeline runs it. Run the
size clamp first and it is no longer harmless: the clamp moves the recovered
vertex and leaves those points where they were, so what were collinear points
become **kinks**. triangle-alert's duotone came out as a nine-sided triangle.

The order is the whole fix, and it is the same order the stroke set uses:
`sharpen -> tidy -> solve the growers -> caps -> tidy`.

Both sharpeners also **rotate a closed subpath to start on a straight segment**.
393 subpaths in the stroke set start mid-fillet, 769 in the fill and 726 in the
duotone; when the fillet straddles the wrap, the vertex lands in the path while
the stale start point stays behind it. Shape-neutral for the stroke set, which
tidy was already rescuing, and needed everywhere else.

## 18. Why the tints came loose

Zafar zoomed in on `filter` and found a rounded grey funnel sitting behind a
sharp black one. Three faults in the outline sharpener, each hidden by the last.

**It only ever claimed a corner drawn as ONE cubic.** A corner in an offset
outline turns more than 90 degrees, so it is drawn as two or more; every one of
those stayed rounded while its stroke went sharp. Scan the whole RUN of
consecutive cubics between two lines instead.

**Which meant it could swallow a shape.** map-pin's head is a 270 degree arc
between the two lines of its tail — one run, by the letter of the rule, and
collapsing it to a vertex ate the pin. The guard is TOTAL TURNING, summed cubic
by cubic; the angle between a run's end tangents cannot tell 90 degrees from
270. Anything past 140 degrees is a shape, not a corner. A run covering every
segment but one is refused outright, which is what emptied the bells and clocks.

**And the inside test was asking the wrong question.** "Is the recovered vertex
in the ink" is only equivalent to "is this an outer corner" when the ink is the
shape. Where the shape is a KNOCKOUT the ink is on the outside and the answer
inverts, so circle-check's tick and circle-activity's trace came out as spikes
instead of radius-1 turns. Test containment against the corner's OWN subpath.

Outer corners claimed across the fill went 896 -> 1047, inner 267 -> 101, and
the sizes are unmoved: 350 of 432 fills and 373 of 480 duotones paint the
rounded box exactly, the rest within 0.45.

`check-sheet.mjs` renders any list of names as rounded-vs-sharp across all three
styles into one page for headless Chrome, which is how the last three of these
were caught. Looking is cheaper than measuring.

## 19. The day the fills went fully sharp

Zafar's call, 29 Aug: "why the fuck is fills rounded in sharp" — the radius-1
fill corner was my rationalisation, not his design. So the sharp FILL is now
fully sharp: every claimed corner goes to the true vertex, knockouts and
modifiers included. The duotone TINT alone keeps 1-outside-0-inside, because it
has to sit flush against a stroke whose round join still paints a radius-1 arc.

What it took to make that hold across 585 icons, three styles:

* **stroke-opacity carried end to end.** 46 duotone paths (signal's inactive
  bars, the dashed panels, wifi, sunrise) are 40-percent STROKES, and the Figma
  encoder dropped the attribute — they landed full black. encode.mjs is now the
  single encoder, flag for flag with the single svgOf.
* **Exclamation bars: size 4 from 6.** The butt bars keep their SOURCE geometry
  — no cap extension — across all six alert icons and all three styles
  (excl-fix.mjs, run last in every pipeline).
* **Held ends bury on the neighbour's centreline.** An end that stops short
  leaves a notch where the round cap used to bulge into its neighbour —
  arrow-down-left's elbow. Extend by min(1, distance-to-neighbour): the joint
  closes and nothing punches through. home's door, ON its base, still stays.
* **The corner guard is turn-aware.** A quarter-turn at radius 5 is a corner
  (the file bodies); a near-half-turn at radius 5 is a shape (bell's dome).
  orig ≤ 6.5 when the run turns ≤ 120 degrees, ≤ 4.6 otherwise, turn cap 176.
* **Knobs stay knobs, by name.** sliders* and toggle* keep capsule knobs that
  the sharp stroke keeps oval, so their fills and tints are exempt from the
  outline sharpener entirely. Every shape-based discriminator tried — arc
  fraction, endpoint bbox, stroke-corner proximity — either squared the knobs
  or un-sharpened calendar's notch; the honest rule is a two-entry list.
* **cursor-in-a-box clamps per subpath, by name.** circle-cursor's knockout
  tail runs 1/sin of its half-angle past the glyph and speared its own rim
  under the whole-path box. Per-subpath clamping everywhere regressed image's
  mountain peak, so it applies to circle-cursor and square-cursor alone.

A fifteen-agent render sweep read every icon against its rounded original and
caught what the numbers cleared: the caret bases, the globe bar steps, the
squared knob tints, the clock knockouts. Painted boxes: stroke 418 exact and
none past 0.45, fill 346/0, duotone 369/0, with the six alert icons
deliberately short.

## 20. The matched fill

Section 19 ended with an asymmetry: the fill went to true points while the
tint kept 1-outside-0-inside, so the three styles of one icon no longer shared
a silhouette. Shown the two options side by side, Zafar picked the matched
one, 29 Aug: the sharp FILL takes the tint's corner rule too. A fill built
that way is the round-join stroke's painted silhouette exactly — the tint
shape, filled black — so stroke, duotone and fill now speak one corner
language: radius 1 outside, pinched to the vertex inside.

The change is one line in the driver — fill-style outlines route through
'tint' mode instead of 'fill' — and the pipeline behind it did not move:
sharpen, tidy, solve the growers, square the caps, tidy, exclamation bars
last. Everything section 19 fought for holds: knockout bars keep source
length, knobs stay oval by name, the cursor pair still clamps per subpath.

Proof, three ways. 309 of the 432 fills now share their outline subpaths with
the duotone tint verbatim; the 123 that do not (circle and square plates,
carets, mail, smartphone) differ in the SOURCE drawings, not the corner rule,
and passed a render pass against those sources. Painted boxes: 346 exact, one
0.03 remainder, and the only new excursions are 0.01–0.02 arc bulges on
filter, list-video and star, the cubic's approximation of a true arc. On the
board, 75 of the 86 fill cells changed and were re-pushed; the other 11 had
no claimed corner to move.

## 21. The day it broke everywhere at once, and what was actually one bug family

Zafar's morning, 29 Aug: the exclamation gap reads 3 where the rounded's reads
2; list-video's angles are broken; filter's grey sticks out and its corner is
torn; cursor is broken in all three styles; square-navigation and circle-cursor
too; "this must be some universal problem." He was right, and it was FOUR:

* **The box fitters tore geometry.** clampPath projected coordinates and
  fitPath translated points past a bound: any corner arc STRADDLING that bound
  had half its points moved — the S-wiggles, the bent cursor tip, most of the
  poking tints. Replaced by solve-box.mjs, which moves whole corner units and
  re-solves the fillet at the moved vertex, tangency and radius intact.
* **tidy's collinearity was relative.** A leftover tangent point 0.0003 off the
  line survived 4-decimal rounding jitter, and the solver then bent the edge at
  it. The test is a perpendicular distance now, 0.02.
* **Surgery cannot register two layers.** Solving the tint to its box and the
  stroke to its box leaves them a few tenths apart on oblique glyphs. Where
  the ROUNDED file proves a tint subpath is one closed stroke subpath offset
  by 1, the sharp tint is now BUILT as that offset of the solved sharp stroke
  (offset-tint.mjs, rebuild-offsets.mjs): 315 duotone and 292 fill paths,
  registered by construction. The matched fill inherits it for free.
* **The emitted files still said mitre.** The board always imported with the
  round join; every local render painted spikes the board never had. The
  attribute now matches the decision.

And the bars: every exclamation slides DOWN one unit (triangle 10..14), so the
butt bar's painted gap to the dot is 2, the same as the rounded original's,
and the length Zafar set is kept.

A 42-agent sweep then read all 585 against the rounded originals and its
adversarial verify pass confirmed 16 more: contained glyphs (the circle and
square carets, cursors, navigations, play) whose stroke solved against the
file union box while their siblings solved per path — the stroke set solves
per PATH now; wifi and cast's shallow arcs claimed as corner dashes — the dash
clause now demands axis-aligned tangents; mic and megaphone capsules squared
in the stroke but kept round in the fill — the offset rebuild converts them
together; and the user family's shoulders, which now stay domed in every
style, by name, like bell's dome and the sliders' knobs.

Three union outlines no single-stroke offset can rebuild (megaphone,
pencil-ruler, cursor-off) take a snap pass: any corner unit standing proud of
the painted stroke moves onto it, except where the rounded drawing itself
stands proud (the -off clips). And megaphone's handle taught the sharpeners
one more guard: a circular fillet has equal control legs; an elliptical sweep
does not, and de-filleting one redraws the drawing.

All 1497 drawings paint inside the rounded envelope (worst 0.46, the diagonal
butt allowance); the bars sit at gap 2 in all styles; 117 board cells
re-pushed. The registration metric is saturated by its own corner artifact on
sharp geometry (an arc 1 from a VERTEX is not 1 from the segments), so eyes,
not that number, closed every finding.

## 21. Two reported defects, and the survivors they pointed at (29 Aug 2026)

Zafar reported both, and both were the same lesson wearing different hats:
pass 1 of the outline cap flattener only knew a cap as an arc between two
antiparallel LINES, and the signal dot was a circle nobody had asked to stay
one.

* **The question fills kept two round caps** — the ? glyph's stem and hook end
  sit between the glyph's own CURVES, so the line-neighbour detector never
  fired. Pass 2 reads the neighbours' end tangents instead: a 2-cubic window,
  chord one stroke wide, apex a unit off the chord, tangent-continuous into
  antiparallel neighbours. Circles are guarded by construction — every
  2-cubic window of an r1 dot *is* a chord-2 semicircle, so an all-cubic
  closed ring whose junctions sit equidistant from their centroid is never
  claimed.
* **The sweep found three more**: shopping-bag's handle ends and messages'
  band cut (both register exactly with the stroke's extended butt ends — the
  flat chord passes through the extended endpoint), and megaphone's handle
  interior, where the round bottom stood 0.27 proud of the stroke's inner
  wall and now sits on it.
* **captions' c terminals are the case the threshold cannot reach**: a c's
  curvature spreads the neighbour tangents to dot −0.80, and loosening the
  gate to take them also takes the −off clips, which are the authored plate
  device and stay. Name list beats shape heuristic, again: NAMED_CAPS in
  caps-styles.mjs carries the four butt-cap quads derived from the sharp
  stroke's own ends.
* **The signal family's first bar is a SQUARE.** The r1 dot at (2,20) read as
  a bar to Zafar, and a bar it is: the 2×2 square with the same painted box,
  by name, all styles of all four signal icons. The wifi and exclamation dots
  stay round.

The clock hands' centre arc was flagged and correctly refused — it is the
round JOIN of the two hands, not a cap, and it registers with the duotone's
polyline join. Same for the cursor tails and the −off clips: the strict
antiparallel gate is what tells a cap from a design. All 1482 non-alert
drawings still paint inside the rounded envelope, worst 0.4142.

## 22. The reflex corner that was connected instead of trimmed (30 Aug 2026)

Zafar, on the sharp heart fill: the notch had collapsed into a narrow hooked
sliver sitting to the RIGHT of centre, where the rounded fill has a symmetric
V. One icon reported, nine carrying it.

`offsetClosed` already knew a reflex corner from a convex one, and handled the
convex case properly — a radius-1 arc, which is what the round join paints. On
the reflex side it solved the crossing for **two straight arms only**; anything
with a curve fell through to a line reading `B.p0 = Aend`, "fallback: just
connect". That does not trim, it drags the outgoing arm's start onto the
incoming arm's end, which at the heart's notch is 1.27 away and at the cloud's
shoulders a full `2 * d` at a right angle. The arm then leaves in the wrong
direction from the wrong place, and the corner paints as a spike.

The tell was arithmetic rather than visual. The notch apex read
`(12.6361, 3.7284)`, and 0.6361 is exactly the y of the stroke's own unit
tangent at that vertex — so the point was the incoming arm's raw offset
endpoint, never intersected with anything. Its two control points, meanwhile,
were still mirror-symmetric about x=12. Correct handles on a displaced anchor
is what a missing trim looks like.

The fix is the general crossing: flatten both arms, take the polyline crossing
that trims the least, refine it with Newton on `A(tA) = B(tB)`, then split A at
`tA` and B at `tB` with de Casteljau. Tangency and curvature survive because
both arms keep their own geometry; only their ends move.

- **Line/line keeps its own branch.** It already worked, and routing it through
  the general path would have rewritten reflex corners across the whole set to
  chase nine icons.
- **34 joins, 18 subpaths, 9 icons**: `heart`, `cloud`, `cloud-rain`, the five
  `message-*` and `messages`. `retrim-reflex.mjs` re-derives just those, and
  refuses any subpath whose box grows or that wanders more than a stroke width
  from what it replaces — proof it was still the offsetter's own output and not
  something a later pass had authored.
- The heart's notch lands at `(12, 3.2568)` against the rounded fill's authored
  `(12, 3.2539)`. It should agree: the notch is a true cusp in both, so sharp
  has nothing to take off it.

Proof. Painted boxes are unchanged to four decimals, worst excursion past the
rounded envelope 0.0022, because a retrim only ever moves geometry inward at an
interior corner. And §20's registration metric went **8 of 9 to 9 of 9**:
`messages` now shares its fill outline with its duotone tint verbatim, having
been the one whose two styles were generated at different start points.

The general lesson is the one §18 and §21 keep paying for: a guard written for
the case in front of you silently becomes a **fallback for every case you did
not enumerate**. `A.t === 'l' && B.t === 'l'` reads as a fast path and behaves
as a filter. Where a branch has an `else` that quietly does something worse,
count what reaches it.

## 23. Four more from Zafar, 30 Aug 2026

**The lightbulb dome grew, and it was the cap extension off an arc.** caps.mjs
pushes every free end out a full unit. Off a straight line that is exact: a butt
cap paints a 2-wide bar where a round cap painted a disc, and the unit restores
the reach. Off an ARC the stub leaves the turn, so the square end lands past
where the disc reached. §14 already knew this and clamped it; the clamp is not
tight enough. `lightbulb`'s dome overshot **0.609** and `lightbulb-on`'s
**0.710**, which is invisible in the icon's own box (the base bars set that) and
plainly visible as the house element gap: dome to base bar, **2.000 down to
1.391**. Nothing measures an element gap, so nothing fired.

`solve-curved-caps.mjs` re-solves the stub LENGTH by bisection against the
rounded subpath's own painted box, keeping the direction caps.mjs chose (it is
tangent by construction, so the endpoint slides along it and the start tangent
never changes). 1.000 becomes **0.2005** and **0.0990**, both landing within
0.00004 of the rounded box.

One trap in the solver, worth the line it costs: **bisect the BINDING side, not
the max over all four.** An arc's painted box matches the rounded one exactly on
the sides its own curvature sets, so a max never goes negative and the search
collapses to a zero-length stub — which is a different wrong answer that also
looks like a solution.

**It is a family.** A sweep of every open stroke subpath against its rounded
counterpart finds **136 subpaths overshooting by more than 0.5, every one of
them a curved end and not one a straight end.** The largest are the `-off` clips
(file-off +3.7, cloud-off +3.1), which §21 says stand proud on purpose; the
dashed rings, the bells, the images and the wifi arcs are all in the 0.6–0.8
band. Only the two lightbulbs are solved here, because an overshoot only matters
where it eats a gap, and the gap is the thing to measure next. Do not batch-solve
the other 134 on the box number alone.

**Toggles and sliders-2 are square now.** §19 exempted `sliders*` and `toggle*`
from the outline sharpener by name, on the argument that a capsule knob the
sharp stroke keeps oval should stay oval. Zafar's call, 30 Aug: it should not.
Both families take rectangular bodies, knobs and handles in sharp, at the r=0.5
his code example carries — that radius is read as the definition of "square
shaped" and applied to both, so the two controls agree with each other rather
than one taking a code example and the other an image. A stroked r=0.5 rectangle
paints an outer contour at r=1.5, which is what the plates and the fill
knockouts carry. Boxes are unchanged: 12 files, every painted box still exactly
the rounded drawing's.

**And sliders-2 is broken in the ROUNDED set, which is where it starts.** The
stroke draws the handle as a capsule — 8 x 6 with r=3, so the ends are true
semicircles — while the duotone plate and the fill draw a **10 x 8 rounded
rectangle at r=3**. The offset of that capsule is 10 x 8 at **r=4**. Right box,
wrong corner, a whole unit out on each end cap, which is why the grey sits
inside the black with the ends too flat and the flanks too thin. Both
orientations, duotone and fill. The sharp set inherited it verbatim through the
`KNOBBED` exemption and is fixed here as a side effect of squaring; `raw/` and
`icons/` still carry it and that is a shipped-set repair, not sharp work.

## 24. The exclamation special case, undone; and two curved ends (30 Aug 2026)

**`excl-fix` was written for triangle-alert and applied to six icons.** Zafar's
call, 30 Aug. The survey that settled it is worth keeping, because the
justification this file gave was checkable and wrong:

`BARS` held six literal names — `alert`, `circle-alert`, `square-alert`,
`octagon-alert`, `triangle-alert`, `wifi-exclamation` — writing each bar as
`[s0+1, s1+1]` of its SOURCE span, where the plain conversion is `[s0-1, s1+1]`.
So the top slid down 2 and every bar painted **2 units shorter than the rounded
original**. §19 and §21 justified that by the painted gap to the dot. Measured,
**the gap is 2 in every rounded original, 2 in every plain conversion, and 2 in
every excl-fixed file**: a cap-extended butt bar occupies exactly the
round-capped bar's painted extent, so the gap was never at risk. The special
case only ever cut ink.

The counterexample was sitting next to it the whole time. **`wifi-info` was
never in `BARS`**, has the same arcs, the same dot and the same 2-unit source
mark as `wifi-exclamation`, took the plain conversion, and is correct.
`wifi-exclamation` had been cut from 4 painted units to 2, which is why it reads
as a square blob rather than a mark.

`unexcl.mjs` reverts the five and keeps `triangle-alert`. Twelve paths across
three styles; the revert is one number per bar, since only the top moved. Also
worth recording against a wrong guess: **the dots were never squared.** Both
wifi dots are byte-identical between rounded and sharp. The squares §21 mentions
are the `signal*` family's first bar and nothing else.

**`cast` had both its waves broken, in two different ways.** The middle wave was
claimed as a corner and replaced with a right angle, which §21 tightened the
dash clause for and which still got through. The big wave kept its curve but
took its cap extension by **moving the endpoint**, which lengthens the control
leg and bulges the arc: 0.332 outside the rounded box on two sides.

Both are now stub + rounded arc + stub, and that construction is the general
rule this cost: **where a free end's tangent is AXIS-ALIGNED, extend with a
1-unit straight `L` stub and do not touch the curve.** The butt cap's bar then
lies parallel to the box side the round cap's disc touched, so the painted
extreme lands in the same place, exactly. Moving the endpoint instead is what
reshapes the arc. Off an OBLIQUE tangent the stub is not exact either, and that
is the case `solve-curved-caps.mjs` bisects for (§23). Between the two, most of
the 136-subpath curved-end family should come out mechanically.

**`bookmark`'s tails are a genuine grower.** The ribbon tail is an r=1 fillet
centred (19,21), and r=1 is already the ladder's floor, so it paints its bottom
at exactly 23. De-fillet it and the true vertex lands at **(20, 22.655)**, which
paints to 23.655, past the ink limit. The box solver clamped the vertex to y=22
and left the notch diagonal where it was, so the tail became a 1.5-unit
horizontal **stub** instead of a point — the tell that a clamp moved a vertex
without moving what runs into it.

Solved by running the diagonal to the clamped vertex: true points at (4,22) and
(20,22), a true V at the de-filleted notch apex (12, 18.4223), and the plate
derived by `offsetClosed` rather than authored. That pivots the diagonal about
the notch, so the tail angle shallows from slope 0.529 to 0.447. Two
alternatives were available and are Zafar's if he wants them: keep the angle and
deepen the notch to y=17.768, or keep the r=1 fillet, which is what `heart`'s
and `shield`'s tips already do in sharp.

## 25. Capsules, earpads, and the day it all went to Figma (30 Aug 2026)

**mic and mic-off contradicted themselves.** The sharpener squared the capsule
in the STROKE layer while the fill and the duotone's PLATE kept it round, so the
duotone drew a rounded grey capsule with a squared black outline sitting on top
of it. Zafar's call: "the mic isn't affected by the shape, fill is the right
approach for all three." The capsule is restored in the stroke; butt caps and
the extended base bar stay sharp. Worth reading as the general test: when one
style of an icon disagrees with another about what the SHAPE is, that is a bug
however defensible each half looks alone.

**Earpads square on the inside only.** `headphones` and `headset` had all four
corners of each pad squared. Zafar's call: "the inner part of the pads must be
squared only, doesn't include the outer." The outer side of a pad continues the
headband's curve and keeps its r=2; the inner side goes to a true vertex. Plates
are derived by `offsetClosed` rather than authored, which is what puts the outer
corner at r=3 and the inner at r=1 without anyone choosing those numbers. Boxes
unchanged. `headphones-off` and `headset-off` still carry the old all-square
pads and belong with the `-off` job below.

**Sixty variants went into Figma**, the first sharp corrections to reach the
file since the migration: the reflex retrim (9 icons), the lightbulb domes, the
squared toggles and sliders-2, the exclamation revert, bookmark, cast, the mic
pair and the two headsets. `repush.mjs` replaces the children of an existing
`Corners=sharp` variant rather than adding one, so component ids survive and
every catalog cell follows on its own. Eight were exported back and diffed
against the repo; Figma re-spells an axis-aligned `L` as `H`/`V`, which is
cosmetic, and every coordinate matched.

**One trap in the pusher, and it is the export naming.** `circle-alert` and
`square-alert` are not sets. They are the `alert` SET at `Container=circle` and
`Container=square`, because an exported file name folds the container into the
name. The first push reported them as missing sets and silently did nothing for
six variants. `repush.mjs` now recovers the pair from `raw/`, which is the only
place the split is recorded — never assume the file name is the set name.

### Still open, with the diagnosis already done

- **The `-off` plate family.** All 20 rendered with the plate recoloured. In
  sharp, `file-off`, `calendar-off`, `camera-off` and `monitor-off` plates are
  not cut by the slash at all; `monitor-off` and `map-pin-off` leak in the
  ROUNDED set too. `monitor-off`'s sharp plate is a hybrid — bottom-left
  sharpened to r=1, top-left left at the rounded r=4 — which is also why its
  sharp fill's angles read wrong. Each plate wants deriving as the offset of its
  sharp stroke and then clipping to the slash.
- **`cloud-off`'s base line runs to the canvas edge.** Rounded stops at (18,19)
  and curves onto the slash at (18.8986, 18.8986); sharp runs `L22 19L22
  17.9009`, a corner at the boundary. The fill's plate is clipped correctly, so
  the stroke and the duotone's stroke layer are the two to fix.
- **`megaphone`'s sharp fill, two corners.** The body's top right collapsed into
  a wedge, `M22.6792 3.3539L23 17.4292 … L21.5249 2.3659C22.1314 2.2712 22.6792
  2.7401 22.6792 3.3539`, where the rounded turns a proper corner at x=23. And
  the handle knockout's rounded bottom was flattened to a chord from
  (9.0027, 20.0247) to (7.0134, 19.9847), so it no longer follows the stroke.
- **`cursor-off`'s upper fragment closes along the slash.** Its first subpath is
  closed, so a third edge is drawn where the reference has an open V. Dropping
  the closure is the fix, in both treatments.
- **`wrench` should follow `hammer`'s fill.** `hammer` keeps its handle as an
  open stroke over a filled head; `wrench` fills solid throughout. Zafar wants
  the wrench's handle to stay whole the same way, in both corner treatments,
  which means changing the ROUNDED fill as well as the sharp one.
- **The fill band standard.** Surveyed: 11 files use the card format (the band
  reaching the wall) but they collapse to three drawings — `credit-card`, one
  `panel-*` divider mirrored four ways, one `globe*` graticule reused six times.
  19 files use the bun format, across 12 independent drawings, and
  `references/drawing-a-new-icon.md` §13 already specifies it in writing:
  interior detail ends on the body's walls, inset 2 for the rim. The sharpest
  contradiction is `credit-card` against `gift` — the same 2-unit bar at the
  same y 8..10 inside the same horizontal body, run 2..22 in one and 3..21 in
  the other. Recommendation: bun everywhere, which moves `credit-card`, the four
  `panel-*` and the six `globe*`.

## 26. The full-session ledger day (30 Aug 2026, second half)

Zafar's instruction: go through every report from the session start, fix,
improve, push. A nine-agent workflow did the bespoke plate rebuilds with an
adversarial verify per icon; the mechanical fixes ran inline. Everything below
is IN the Figma file, both corner treatments where both changed, replaced in
place so component ids and catalog instances survived.

**Corrections to this file's own record:**
- §22-era check pinch REVERTED. Zafar's shield-check report meant the opposite
  of what was built: the fill's r=1 check vertex was the RIGHT shape; the sharp
  fill must follow the sharp stroke/duotone (r=1 round-join vertex), and the
  REGULAR stroke/duotone were the broken ones — their Figma nodes carried MITER
  joins and painted a spike. Root cause: the whole 27 Aug shield-batch import
  arrived MITER. 34 stroked vectors across 16 sets (hammer, power, circles,
  plug, shield x5, circles-dashed, circle-square x2, cursor-off,
  tag-horizontal x3) normalised to ROUND/ROUND in their regular variants.
  Nothing shipped wrong — normalize() writes round joins on export — this was
  the canvas lying about the shipped drawing, the §"looks right in export"
  class inverted.
- The Figma REGULAR lightbulb and lightbulb-on were STALE DRAWINGS — bulb r=6.5
  at (12,9.3), bars y=17/21 — an earlier iteration than the repo's shipped
  r=8 at (12,10), bars 18/22. The sharp fix made the mismatch visible
  ("lightbulbs are in 2 different sizes"). Regular variants re-pushed from
  raw/. Lesson: a stale regular variant is invisible until its sharp sibling is
  correct; check-figma has not run since the Corners axis landed and cannot yet.

**Landed and pushed, by report:**
- -off plate family: monitor-off (both treatments; the rounded's cut edge now
  starts on the cap's top point (9.657,3) and runs parallel to the slash with a
  cap-flush jog at y=14), file-off, calendar-off, camera-off (sharp plates
  slash-clipped, cap-flush), map-pin-off (both; sharp stroke arcs restored
  verbatim + 1-unit stubs), cloud-off (base line buried at (19,19), two arc
  bulges reverted to stub form), cursor-off (open V both treatments),
  headphones-off/headset-off (inner-square pads matching the base icons).
- megaphone sharp: plate/fill rebuilt as offsetClosed of the sharp stroke loop;
  flare corner back at x=23, handle knockout follows the stroke's inner wall.
- wrench: hammer-style fill in both treatments — solid head disc (r=7.5 at
  (15.5,8.5)) + the stroke's shaft path stroked, ends buried under the head.
- bun standard applied everywhere the survey flagged: panels x4, credit-card,
  globe family x6 — band knockouts stop 2 clear of the walls, square-ended, in
  both treatments. The survey's numbers: bun was already 12:3 by drawings (19:11 by files) and
  the documented rule; card was three drawings reused as eleven files.
- sliders-2 rounded plates: r=4 capsules (were 10x8 r=3 — right box, wrong
  corner, one unit off at every end cap).
- bell family sharp plates: rail corners hug the squared rail; dome stays.

**Tooling that carried it:** repush.mjs gained --corners=regular (reads raw/,
normalises the bare-root paint spelling, emits round caps/joins) — the regular
variants are now pushable the same way as sharp. Token replacement in its
emitter must run STROKECAP_TOKEN before CAP_TOKEN; the collision emitted
'STROKEbutt' once.

State: every surface that moved is Figma + raw/ + icons/ (rebuilt, 0 errors,
29 baseline warnings). NOT moved: npm bundles/React module regeneration,
covers, paper boards, catalog counts — release work, untouched deliberately.

## 27. The -off structure, authored (30 Aug 2026, evening)

Zafar drew the fixed file-off sharp duotone himself and made it the spec:
"check the 2px spacings, I might got them wrong, but this is how they must
work — now check every off icon in sharp and make them follow the same
structure, that includes monitor."

His drawing, taken verbatim (float noise snapped, 15.34 restored to the
shipped 15.3431 constant), encodes four rules that now govern every sharp
-off icon:

1. **No fragments.** A piece the slash reduces to a stub is deleted. The old
   file-off kept 0.35 units of top edge stranded on the far side of the slash;
   his version simply has no upper-left corner.
2. **Bury on the centreline.** A lower-left edge that meets the slash ends
   with its butt endpoint exactly at y=x: his left wall at (4,4), bottom wall
   at (20,20). The previous convention buried "somewhere under the band",
   which left 0.16-unit overshoots like monitor-off's (4.2203,3.9999).
3. **Stand off by the grid.** An upper-right cut stops where its nearest ink
   corner sits ~2.5 perpendicular from the centreline — which is 2 units of
   white counted on the grid axis, the way he audits. His constants: top edge
   cut at x=6.5, wall cut at y=15.3431 (the shipped rounded's own number).
4. **Plates flush, one straight cut.** Plate termini land exactly on the cap
   bars (`L21 15.3431L19 15.3431` runs along the cap), the cut between them is
   one straight line parallel to the slash within a few hundredths (his own
   slope is 0.987 — fitted, not re-derived), and lower-left pieces close along
   y=x exactly.

file-off itself went in verbatim and was pushed at once. The remaining 18
sharp -off icons were conformed by an eight-group agent sweep with an
adversarial verify per group, pushed in waves as each landed — per the new
standing rule that the Figma file is the progress bar, never the working tree.

§27 completion note: the sweep finished in two runs (the first lost half its
agents to a session limit mid-flight; the resume replayed the finished half
from cache and re-ran the rest against the possibly half-edited files, auditing
from scratch). All eight groups verified: six clean, two with residuals that
were then dispositioned — mic-off's plate termini moved onto the butt-cap bars
(black had poked 0.29 past the plate at the capsule cap), and map-pin-off's
2.731 stand-off corners kept as authored (0.031 past the R3 band; Zafar's own
endpoints, and the axis-measured white of 1.86 is nearer the spec than
file-off's own 1.5/1.66). All 20 sharp -off icons — 60 variants — pushed to
Figma in three batches, replaced in place. headset-2 was caught by Zafar as a
missed family member the same hour and conformed too: pads inner-square,
mic capsule rounded, boom squared.

## 28. Eight reports across both treatments (30 Aug 2026, late)

Zafar reviewed the file and sent eight numbered reports at once. Three of them
reached past the sharp set into the shipped rounded drawings, which is the
first time this branch has moved the regular variants on design grounds rather
than to repair staleness.

- **ban**: the sharp slash had taken the full 1-unit diagonal butt extension,
  so its end corners reached 10.05 from centre and crowded the ring. Zafar's
  "the left is mine" was the regular variant. The sharp slash now keeps SOURCE
  length — butt faces through the rounded cap centres (5.636/18.364) — the
  exclamation-bar rule again: a diagonal butt extension buys box fidelity and
  spends legibility.
- **file-off fill was missing the fold hole in BOTH treatments**, not just
  sharp; the duotone drew the flap in strokes while the fill shipped a solid
  slab. The hole subpath is copied verbatim from each treatment's own `file`
  fill, winding checked by signed area.
- **music-note-off drops the upper plate sliver** (the lens of the second
  head's disc stranded above the slash), duotone and fill, both treatments —
  "leaving only what's in circle". The §27 sweep had independently re-cut that
  sliver flush minutes earlier; Zafar's instruction supersedes it, and the
  sweep's other refinements (the stroke stubs, the longer beam) are kept.
- **The level-indicator family was crossed**: regular duotone/fill inner
  solids had zero-sharp chord corners while sharp had the r1-rounded
  silhouette. Resolved by derivation, not by taste: the REGULAR inner solid is
  now the stroke wedge's painted contour (r+1 outer corners, r1 chord corners,
  flat side at 11 — "the plate takes the outer contour", which these solids
  had never obeyed), and the SHARP inner solid is the zero-cornered
  centreline form. 14 names re-ran: circle/square × half/quarter/
  three-quarter/full × plain/dashed, 21 regular + 3 sharp variants. The
  square family's contour corner is 2.5 — the shipped stroke's r1.5 plus one —
  so `RADIUS` now skips exactly that value on exactly those names
  (README updated); the ladder stays closed everywhere else.
- **pencil-ruler's ruler goes sharp**: the blocks are true 45° diamonds. The
  r3 end fillets de-fillet to vertices that would overshoot the box by 1.24,
  and clamping vertices bends the walls (the bookmark trade) — for a ruler,
  bent walls beside a 45° pencil are the one thing that cannot ship, so the
  END is trimmed instead: walls stay exactly 45°, the end face lands where
  the box does, and the block gives up 1.76 of length the old fillets were
  already rounding away. Plates rebuilt as 1-offset diamonds, r1 corners.
- **wrench's jaw goes straight**: the r2.5 circular bottom becomes a flat
  face perpendicular to the walls, tangent to the old circle's deep point, so
  the slot keeps its width (5) and depth exactly. Horn tips de-fillet onto the
  r6.5 head circle ((17.9749,2.4895), (21.5105,6.0251)). The plate's horn
  corners are r1 arcs CENTRED ON the stroke's own vertices — the fillet
  centre falls on the horn vertex by construction (7.5−6.5 = 1), which is the
  round join's paint drawn explicitly. Jaw inner corners pinch to vertices.
- **podiums went truly sharp, as an experiment**: the sharp four take MITER
  joins (`stroke-linejoin="miter"` in the solved files, `strokeJoin: 'MITER'`
  on the Figma vectors), the first departure from the set-wide round-join
  language. 90° steps miter at 1.41; the numerals' worst corner (the 3's, 50°)
  reaches 2.37, under the default limit. Zafar said "let's try" — reverting is
  one attribute.
- **globe-off's cut ends close like #4**: everything on the channel lands on
  ONE line, y = x − 4.2426 — the fill's blessed cut. The ring's two ends are
  re-ended as true r10 arcs at solved angles (the r9 cap corner sits exactly
  on the line: 9(sin θ − cos θ) = −4.2426, θ = 25.53°/244.47°), the equator
  bar starts at 17.2426 (corner on the line), both meridians are trimmed by
  bisection on their own cubics. The plate is four vertices — the two radial
  cap faces joined by the straight cut — per file-off's rule 4, achievable
  as ONE straight line only because the caps were first moved onto it. The
  §27 sweep had conformed the plate to the ragged caps (a jogged polyline)
  the same hour; this construction replaces it, since "closed like 4" names
  the straight cut.

The session overlapped the §27 sweep's later waves on music-note-off and
globe-off — both files changed underneath between read and fix, caught by
anchors failing rather than by luck. The resolution both times: re-apply the
newer instruction on top of the sweep's file, keep what it fixed, replace what
it decided differently, and say so here.

Surfaces moved: Figma (41 variants replaced in place: 24 sharp + 17 regular,
plus 12 join flips), raw/ (17 files), icons/ (24 rebuilt, 0 errors, 32
warnings baseline), the solved-* sources, `lint.mjs` + `pipeline/README.md`
(the RADIUS exemption). Not moved, deliberately: npm bundles, React module,
covers, paper boards, catalog counts — release work.

An eight-agent adversarial render sweep then re-read every fix and refuted
two of them. The podium miter spiked exactly where the numerals turn acute:
the 1's 47° apex mitered off the canvas and rendered clipped, and the 3's
elbow spike sealed its aperture into a blob — so the numerals moved onto
their own round-join layer while the stairs keep the miter, which is also
the first two-join icon in the sharp set. And globe-off's fill had lost the
ink between the meridians and the channel to my cap-corner chords: the
rounded fill already kept every cut edge ON the channel line, so the fill
went back to that structure with only the two rim corners sharpened. The
other six groups passed with sub-0.1 nits only, recorded in the sweep
transcripts.

Follow-up on ban: the REGULAR fill takes the pull-back too — the round-capped
knockout's cap centres moved from r=9 to r=8, so the white tip lands on the
ring's inner edge (r=9) exactly where the sharp fill's butt face does. raw/,
icons/ and the Figma regular fill variant all moved; stroke and duotone stay
merged into the ring as authored.

And the level family's SHARP stroke variants follow: their outlined wedges
still painted r=1 corners through the set-wide round join while the solids
beside them had gone dead sharp — the styles disagreeing about the subject.
The wedge path now carries a miter join in all 14 sharp stroke variants (the
podium mechanism: per-layer join, containers and dashes stay round), so the
outlined wedge's corners are true points too. The REGULAR strokes were never
wrong: their round joins paint exactly the r=1 silhouette the regular solids
now carry, which is why the re-run had nothing to change there.

## 29. The wall learns the file-off constant (30 Aug 2026, night)

Two more grey-layer reports closed the day: cursor-off regular's plate
overshot its caps, and monitor-off's plate left a grey foot below the wall's
cut end in both treatments.

- **cursor-off regular**: the plate's cut edges now TRACE the cap circles —
  r=1 arcs centred on the stroke's cut endpoints, entered and left where the
  cut line meets the circle — replacing straight cuts that ran past the ink
  and painted grey on white. This is §8's "land on the cap" rule executed in
  the rounded treatment: butt bars in sharp, cap-circle arcs in rounded.
- **monitor-off, both treatments**: cutting the right wall at y=14 is
  unsolvable. The plate's slope-1 cut is fixed by the lower cap, and it
  crosses the wall's line at y=15.3431 no matter what, so any flush-looking
  straight cut still leaves a grey foot below the cap bar. The wall now
  stops at y=15.3431 = 21 − 4√2 — file-off's own wall constant — and the
  construction locks with nothing left over: the sharp plate jogs
  `L23 15.3431L21 15.3431` along the butt bar, the regular closes
  `C23 14.8954 22.5523 15.3431 22 15.3431` onto the cap. An
  authored-geometry change to a shipped rounded drawing, justified the way
  ban's was in §28: the numbers lock only there.
- **The catch before the push**: every raw style file embeds its own copy of
  the stroke layer, and the first edit moved only the standalone stroke's
  wall — the duotone's embedded stroke still read `V13` beside a plate at
  15.3431, and it surfaced in the generated push payload, not in any render.
  When a constant moves, grep the whole `raw/<set>/` directory for the old
  value; fixing one file fixes one layer.

Eight variants replaced in place (monitor-off ×6 across both treatments,
cursor-off regular duotone + fill); raw/, icons/ and the solved sources
rebuilt; renders clean on both treatments. Still undispositioned: the four
0.57 SPACING warnings the bun normalisation added on the open-quadrant globe
fills (globe-check, globe-cursor, globe-plus, globe-x) — tighten the
construction or write the exemption, Zafar's call.

## 29. The -off duotone, redrawn by hand (30 Aug 2026, night)

Zafar redrew the -off duotones himself — 18 icons, both corner treatments —
and handed them over as Figma exports in `handoff/`. The design supersedes
§27's derived plates: the far side of the slash is now MUTED, as its plate
silhouette or as 40% strokes or both, chosen per icon ("you need an
individual approach to each"), while the near side keeps the full-strength
drawing. These two devices are the standing -off duotone language from now
on. Duotone only; stroke and fill variants unchanged.

Adopted verbatim: rounded exports straight into raw/ (they are already the
raw shape), sharp ones normalised into the solved-duotone spelling, with the
§27 float-noise snap — a 2dp export value is restored to the old file's 4dp
constant when exactly one matches, else kept. One slip found and dropped: the
sharp headset-off carried a 40% duplicate of the slash under the full one,
invisible but noise. Not in the handoff, so unchanged: camera-off, link-off,
route-off.

Surfaces: raw/ (18), icons/ (18 rebuilt, 0 errors, 31 warnings — one off the
baseline, resolved by the redraws), solved-duotone/ (18), Figma (36 duotone
variants replaced in place). The muted-stroke layers land in Figma named
Vector, like the dashed levels' — the Plate name still keys on fill opacity.

§29 follow-up: the sharp handoff drawings carried rounded-inherited termini —
the plates' cut ends were the rounded soft caps flattened in place into
two-segment chamfers, the defect Zafar circled on map-pin-off. An audit
separated them from the shapes (domes, rings, lobes keep their curves; the
ring pieces' radial cap faces in circle-off and globe-off are the correct
construction, not chamfers): six icons carried real ones — bell-off,
cloud-off, heart-off, map-pin-off, message-off, mic-off, eleven ends in all.
Each resolves by dropping the chamfer's middle point, leaving ONE straight
terminus face between the outline end and the cut edge — file-off's own
spec language. headset-off's flagged pair was the mic boom's genuine
right-angle step and stays. Sharp solved-duotone only; the rounded files
keep their soft caps by design. Six variants re-pushed in place.

camera-off and route-off then joined the §29 language (link-off is
stroke-only and has no duotone to move). Each followed its nearest sibling:
camera-off takes monitor-off's device pattern — the far side's strokes drop
and its plate silhouette carries it alone — and route-off takes
music-note-off's — the far vertical and arrowhead become 40% strokes while
the near dot and connector stay full. Both treatments, raw/ + icons/ +
solved-duotone + four Figma variants replaced in place.

heart-off's sharp far piece then went the other way, on Zafar's call, for
this icon alone: the two dechamfered faces still read as bites, so the piece
now fills to the TRUE clip — the cut edge extended along its own line to
meet the heart's silhouette at real vertices: the left corner splits the
sharp base heart plate's lobe curve at the line (P1 6.0,2.31), the right
extends the outline's end tangent to it (P2 19.52,16.0). The single-face
terminus stays the rule for the other five; this one is a per-icon call.
The sharp FILL followed: its far piece was still the old chamfered clip, and
it now carries the identical filled-clip subpath, so fill and duotone share
the far silhouette verbatim again.
eye-off's sharp fill carried the same chamfered clip and took the same
treatment: cut edge extended to the base eye's upper-lid cubic (split at
P1 7.64,3.92) and the right lid's end tangent run out to the line
(P2 20.66,17.15). The eye-off duotone needed nothing — its far side is
muted strokes, no plate to clip.
A sweep of the remaining sharp -off FILLS then closed the class: bell, cloud,
map-pin, message and mic still carried the raw chamfers their duotones had
already lost, and took the same single-face termini, so fill and duotone
agree per icon again. Two survivors triaged as correct: pen-off's flagged
run is collinear points on the cut line plus a legitimate face, and
volume-off's is the wave stubs' own structure. circle-off and globe-off's
radial cap faces, and headset-off's boom steps, remain the constructions
they are.

The corner question then settled for the whole family at once: Zafar named
eleven more icons with the same issue, which made the rule explicit — a
sharp -off far piece is its BASE silhouette clipped exactly ON the cut
line, corners at true intersections; no terminus faces, no radial jogs, no
standoff shaping. A generic half-plane clipper rebuilt monitor, calendar,
camera, cloud, bell, message, mic, map-pin, circle and globe from their
base sharp plates (map-pin's hole clipped as an evenodd subpath, the two
discs falling out of the same machinery as segments); cursor-off, whose
silhouette is its own drawing, took the same treatment by extending its two
wing edges to the line. The earlier single-face termini and radial cap
faces are all superseded. 22 variants replaced (11 duotone + 11 fill),
sharp only — the rounded -off duotones keep Zafar's soft-capped handoff
drawings. The far pieces now derive from the base plates, so bell's and
cloud's far side gained the skirt-rail and lower-lobe regions their
hand-drawn pieces had left out, and the sub-0.2 proportion drift between a
base and its -off (bell's dome, cloud's lobes) resolves toward the base.
calendar-off's sharp duotone then came back from Zafar's own hand and went in
verbatim (noise snapped): same true-clip far plate, but the far STROKES drop
entirely — no top peg, no far edges — the monitor-off tone pattern. The
sharp fill dropped its orphaned far peg stroke to match; the sharp stroke
variant keeps the full drawing, as stroke variants do.

## 30. Handover: shipping sharp (30 Aug 2026, end of the drawing work)

The drawing work is done. What remains is plumbing — teaching `raw/`, the
build, the linter and the five consumer surfaces the `Corners` axis — and it
is handed over rather than started: `SHIPPING-SHARP.md`, beside this file.

The one instruction that matters most is written there twice: **`raw/`'s
sharp half is copied from `solved-*`, never regenerated from the rounded
drawings.** Nine icons' sharp geometry now differs structurally from its
rounded sibling — the `-off` far pieces are base-silhouette true clips, the
level wedges are zero-cornered centreline solids, the podium numerals carry
their own round join beside mitred stairs — and any converter run fresh over
`raw/` would quietly undo all of it.

Two counts to carry in: 1497 sharp files in `solved-mid`/`solved-duotone`/
`solved-fill` (585/480/432), matching the 1497 `Corners=sharp` variants in
Figma exactly; and 0 errors / 31 warnings as the rounded lint baseline any
axis-aware linter must still produce.
