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
