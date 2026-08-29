# Catalog matrix migration — COMPLETE, 29 Aug 2026

The migration this document used to hand over is finished. All 20 cards are on
the matrix layout, every cell in both groups is a component instance, and the
library carries sharp as a variant axis. This file stays as the record of what
was built and what is still Zafar's call.

## The architecture, as settled

Zafar chose **Corners as a third variant property on the existing component
sets**, not parallel sharp sets. Every set on the Components page now reads:

```
Container   regular | square | circle
Style       stroke  | duotone | fill
Corners     regular | sharp
```

- Existing variants were renamed in place (`, Corners=regular` appended), so
  component ids survived and every published instance kept its link.
- 1497 `Corners=sharp` variants were added across all 476 sets, mirroring each
  regular variant's position translated down by `max(regular y) + 48`.
  Verified: 476 sets, 1497 regular = 1497 sharp, zero untagged children, zero
  sets out of balance.
- Default variant stays `Container=regular, Style=stroke, Corners=regular`.
- Sharp internals match the house recipe: SCALE constraints, strokeAlign
  CENTER, strokeJoin ROUND, strokeCap NONE (butt), muted layers named `Plate`.
- The Components page was re-flowed (sets doubled in height): row step =
  tallest set in row + 56, first row 64 below its heading, 176 from a band's
  last row bottom to the next heading. Page bottom is now 15984, verified
  zero overlapping nodes.

## The catalog, as built

All 20 cards: 585 rows, 1497 regular cells + 1497 sharp cells, every one an
INSTANCE (regular cells clone-harvested as before; sharp cells are
`createInstance()` of the Corners=sharp variants). Verified per card against
plan.json: rows, regular count, sharp count all exact, zero plain-art frames,
zero `__matrix` leftovers. Badges preserved throughout.

- The 12 cards migrated before the component rule existed were retrofitted in
  place with `gen.mjs retrofit <Card>` (976 cells swapped art for instances).
- Media was rebuilt from scratch (old half-built tmp deleted first).
- The 7 remaining cards ran through the rewritten batch + final flow.

## The tooling (this directory)

- `plan.mjs` → `plan.json`: unchanged, still the source of truth for coverage.
- `gen.mjs`, rewritten for the instance world:
  - `batch <Card> <start> <count>`: sharp arm places instances from the
    Components page (per-set `children.find`, cached; never a full-page walk);
    regular arm still harvests from the card's own old rows, keyed with the
    `, Corners=regular` suffix the rename added. No SVG payloads anymore, so
    batches are small and fast.
  - `retrofit <Card>`: swaps any plain-art child of a filled
    `cell/<name>/sharp/<style>` for an instance. Idempotent (INSTANCE child =
    already done). All 12 retrofits matched their expected counts exactly.
  - `final <Card>`: unchanged (swap, stripe, legend, header, HUG).

## Still open, in Zafar's hands

- **The Sharp page (`16256:2445`, ZOOM frame `16286:3085`) still exists.** The
  catalog no longer needs it; deleting it is Zafar's call now that everything
  is verified.
- Two stray tiny `Vector` nodes sit on the Components page at (-5991,-5990),
  7x5 and 6x4, debris from some earlier import. Harmless, off-canvas, left in
  place.
- The export/check pipeline does not know the Corners property yet:
  `check-figma`, the exporter and the variant-to-path mapping all predate the
  axis. That is release work, not catalog work, but it lands the moment sharp
  ships to `raw/`.
- Design calls still open: -off fill clip ends stay authored-round,
  user-family shoulders domed, mic duotone inner capsule.

## Standing constraints

- Branch `release/0.3.0-sharp`. Phase 1 (question fill caps, signal square
  dot) committed at `57887be3`.
- Do NOT touch the paper boards or the site.
- Never drop New badges; clearing one is Zafar's explicit call.
- Sharp SVG sources: `previews/sharp-history/solved-{mid,duotone,fill}`
  (585/480/432 files). ROUNDED sources are read-only.
