# Catalog matrix migration — handover, 29 Aug 2026

Stopped mid-run at Zafar's request, with one new requirement that changes the
architecture: **the sharp drawings placed in the catalog are plain vector art,
and they must be global components.** Everything below is the state, the flow
that built it, and what the requirement means for what is already in the file.

## The new requirement, first

Every sharp cell filled so far holds a frame from `createNodeFromSvg`: loose
VECTOR nodes, no component behind them. Zafar's instruction: they **must be
global components**, like the regular cells, which are instances of the
component sets on the Components page.

What that implies:

1. **Create components for the sharp drawings** before placing any more cells.
   Two shapes are possible and Zafar has not chosen between them:
   - a new property on the existing component sets (e.g. `Corners
     round | sharp`), which doubles every set in place but changes the
     property surface of every published instance;
   - parallel sharp component sets (own sets, or an own page/section), which
     leaves the existing sets untouched.
   Ask before building; this decides the library's public shape.
2. **Retrofit the cells already placed.** The 12 swapped cards plus Media's
   `__matrix` tmp hold plain art in their sharp cells. The cell frames and
   their names (`cell/<name>/sharp/<style>`) are correct and stay; only each
   cell's child swaps for an instance. `plan.json` records exactly which cells
   are filled (`sharp.stroke/duotone/fill` per row). For Media it may be
   simpler to delete the tmp and rebuild once components exist.
3. **Rewrite `gen.mjs`'s sharp branch** (the `createNodeFromSvg` arm) to place
   `component.createInstance()` instead, for the 7 remaining cards and the
   rest of Media.

The sharp SVG payloads themselves are correct and verified; the geometry does
not change, only what kind of node carries it.

## State of the file (Figma `MH38XMqFN24kGYSQu4epxT`, Catalog page 14483:2)

- **12 of 20 cards fully swapped** to the matrix layout, 398 of 585 rows:
  Sport, Actions, Arrows, Charts, Commerce, Controls, Devices, Files, Git,
  Layout, Mail, Maps. Every final call returned the expected row and cell
  counts, zero missing regular instances, badges preserved.
- **Media is half-built**: its `__matrix` tmp frame inside `Category / Media`
  holds rows 0–15 of 62 (audio-lines … headset-2). The old rows are still in
  place; nothing user-visible changed. Remaining batches would have been
  `batch Media 16 16`, `batch Media 32 16`, `batch Media 48 14`, then
  `final Media` (expects 62).
- **7 cards untouched**: Pointers 10, Shapes 41, Time 31, Tools 4, Users 8,
  Weather 8, Web 23 rows.
- The **Sharp page (`16256:2445`, with its ZOOM frame `16286:3085`) still
  exists** and is deleted only at the very end, after the catalog is complete
  and verified.
- The regular cells everywhere are clones of harvested instances and keep
  their `mainComponent` links; they are done and correct.

## The tooling in this directory

- `plan.mjs` → `plan.json`: 20 cards, 585 rows in catalog order, each row
  `{name, set, container, badge, reg, sharp}` with per-style coverage flags.
  Validates itself against `raw/` and `icons/stroke` and throws on any
  mismatch. 82 badge rows; never drop a New badge.
- `gen.mjs` emits **complete** `use_figma` call code:
  - `node gen.mjs batch <Card> <start> <count>` — appends rows to the card's
    `__matrix` tmp. Guards: page assert, FNV-1a checksum over SPECS (refuses
    corrupted transcription; it fired twice, on Git 25 and Mail 13 — split the
    batch smaller and re-paste faithfully), first-row idempotency check so a
    dropped-socket retry is safe. 13–17 rows per call is comfortable.
  - `node gen.mjs final <Card>` — verifies tmp row count, swaps old rows out,
    restripes alternating white/#F5F5F5, inserts Legend + column header once,
    forces the card back to HUG. Returns counts to compare against plan.json.
- Regular instances are harvested from the card's own old rows
  (`variantsOf`), never by walking the Components page — a full-page walk
  kills the plugin socket. Note the swap destroys the harvest source, so
  retrofitting a swapped card cannot re-harvest from it (it doesn't need to;
  regular cells are done).
- Badge frames need `layoutSizingHorizontal/Vertical = 'HUG'` **after**
  appendChild (already in gen.mjs; the Sport card shipped a 100px badge before
  this).

## Standing constraints

- Branch `release/0.3.0-sharp`. Phase 1 of the handover (question fill caps,
  signal square dot) is done and committed at `57887be3`.
- Do NOT touch the paper boards or the site.
- Never drop New badges; clearing one is Zafar's explicit call.
- Sharp SVG sources: `previews/sharp-history/solved-{mid,duotone,fill}`
  (585/480/432 files). ROUNDED sources are read-only.
- Figma butt cap on stroked vectors: `strokeCap = 'NONE'`, `strokeJoin =
  'ROUND'`.
- Design calls still open for Zafar: -off fill clip ends stay authored-round,
  user-family shoulders domed, mic duotone inner capsule.
