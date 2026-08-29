
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
