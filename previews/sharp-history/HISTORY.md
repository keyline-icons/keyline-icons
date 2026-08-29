
## 17. The two that made the fill and duotone look undone

Zafar spotted both at zoom: every sharp fill with a knockout was a solid slab,
and the duotone tints sat crooked against their own strokes.

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

```
sharpen -> tidy -> solve the growers -> caps -> tidy
```

Both sharpeners also now **rotate a closed subpath to start on a straight
segment**. 393 subpaths in the stroke set start mid-fillet, 769 in the fill and
726 in the duotone; when the fillet straddles the wrap, the vertex lands in the
path while the stale start point stays behind it. It is shape-neutral for the
stroke set, which tidy was already rescuing, and needed everywhere else.

Tint against stroke across the duotones: **477 of 480 register exactly**, the
other three by at most 0.8.

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
