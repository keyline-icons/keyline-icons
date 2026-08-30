# Handover: ship sharp — `raw/`, the pipeline, and the Components page

Written 30 Aug 2026 at the end of the drawing work. **The geometry is done and
signed off; this document is the plumbing that has never been built.** Nothing
in it is started. Read `HISTORY.md` §§1–29 for how the drawings were arrived
at, and the `icon-system` skill (*The variant architecture*) for the rules the
pipeline has to learn.

## What is true right now

- **Figma is the source of truth and it is complete.** All 476 sets carry
  `Corners: regular | sharp`, 1497 variants of each, and every sharp variant
  holds its final approved drawing — the last corrections landed tonight
  (§§28–29 plus the `-off` true-clip pass and Zafar's own `calendar-off`).
- **`raw/` and `icons/` are rounded-only**, 1497 files each. That was Zafar's
  release call, not drift.
- **The repo's sharp geometry lives in `previews/sharp-history/solved-mid`
  (585), `solved-duotone` (480), `solved-fill` (432)** — 1497 files, the same
  count as the Figma sharp half. These are what was pushed; they are current
  and they are the input to step 1 below.
- **The pipeline predates the axis.** `pipeline/build.mjs:70` matches
  `Container=…, Style=….svg` and nothing else, so a fresh Figma export of the
  Components page — which now writes `, Corners=…` into every filename —
  matches **nothing** and lands 1497 rejected files. Do not refresh `raw/` from
  Figma before step 2.

## The job, in order

### 1. `raw/` gains the sharp half

`raw/<icon>/Container=<c>, Style=<s>, Corners=sharp.svg`, and the existing
1497 files gain `, Corners=regular`. Two ways in, and **the second is the one
to use**:

- ~~Export the Components page from Figma~~ — correct in principle, but it
  re-exports the rounded half too, and `raw/` drift is absorbed by the build
  (see the skill, *raw/ drifts from Figma without breaking anything*), so a
  full re-export churns 1497 files for no geometric gain and costs a full
  re-verification.
- **Copy from `solved-*`.** They are byte-identical in geometry to what Figma
  holds, in the shape `raw/` wants, and the `solved-mid → stroke`,
  `solved-duotone → duotone`, `solved-fill → fill` mapping is exactly
  `catalog-migration/repush.mjs`'s `DIRS`. Container-prefixed names
  (`circle-arrow-down.svg`) split back to `raw/arrow-down/Container=circle, …`
  the same way `repush.mjs`'s `setOf()` does it — **reuse that function, do not
  re-derive the split**; §25 records that `circle-alert` is the `alert` set at
  `Container=circle` and that the naive reading silently did nothing for six
  variants.

Verify: 2994 files under `raw/`, 1497 per corner treatment, every icon folder
holding matching counts per treatment.

### 2. The pipeline learns the axis

- **`build.mjs`** — the filename regex, and the output path. `icons/` is
  currently `<style>/<name>.svg`; sharp needs its own namespace. **This is a
  decision, not a detail, and it is Zafar's**: `icons/sharp/<style>/<name>.svg`
  keeps the existing paths untouched and every consumer's rounded imports
  working, which is the conservative read; `icons/<style>/<name>-sharp.svg`
  keeps one directory level but changes what a "name" is, and the set's naming
  rules (`[element]-[modifier]`) make a corner treatment in the name a lie.
  Recommend the first. Either way `--check` and the drift report have to cover
  both halves.
- **`lint.mjs`** — `STYLES` at line 24 is styles, not treatments; the rules
  themselves are corner-agnostic except where a fillet radius is measured.
  Expect `RADIUS` to fire across the whole sharp set (that is what sharp *is*)
  and decide the exemption deliberately: a treatment-aware skip, not a widened
  ladder. The 2.5 level-family precedent (README, *The ladder is not closed
  under the +1*) is the shape to copy. Baseline to hold: **0 errors, 31
  warnings** on the rounded half.
- **`check-figma.mjs`** — blind to the axis today; it will report the sharp
  variants it does not know exist. Teach it the third property before trusting
  a mismatch.
- **`build-react.mjs` / `build-data.mjs`** — `STYLES` lists at
  `build-data.mjs:34`; both need the treatment threaded through. The React
  export names (`ArrowDown`, `ArrowDownDuotone`) need a sharp convention, and
  **that is a public API decision** — see the `keyline-distribution` skill
  before choosing, because the five consumer surfaces have to agree and a
  rename is a breaking change (§ *The rename is a breaking change*, v0.2.0).

### 3. The site and the packages

Out of scope for the pipeline step but part of "add to page": the browser's
style switcher becomes two axes, `/install`, the icon pages, the MCP and CLI
listings, and the shadcn registry routes under `app/r/` all enumerate styles
today. `keyline-distribution` carries the invariants that tie those five
surfaces together and the two failures that have already shipped past CI.

### 4. Everything downstream of a count

The set doubles: 1497 → 2994 variants. Every surface that states a number
moves — the Figma Catalog cover, the paper boards, the covers, the changelog,
the FAQ. **Recompute, never increment** (the skill says this twice, and both
times it was learned the hard way).

## Traps that have already been paid for

- **A Figma export folds the container into the filename.** `circle-alert` is
  not a set. `repush.mjs:setOf()` is the only place that split is recorded.
- **`raw/` drift is normal and absorbed**; a byte diff against Figma proves
  nothing. Compare geometry, or re-export and confirm `icons/` does not change.
- **Sharp is not "rounded with a flag"** — 585 stroke, 480 duotone, 432 fill,
  the same coverage as rounded, but nine icons' sharp drawings differ
  structurally from their rounded siblings (the `-off` far pieces, the level
  wedges, the podium numerals' per-layer joins). Anything that regenerates
  sharp *from* rounded rather than copying `solved-*` will silently undo a
  month of decisions.
- **The `Corners=sharp` variants in Figma carry corrections `solved-*` also
  carries, and nothing else does.** If the two ever disagree, Figma is the
  authority for the drawing and `solved-*` is the authority for the repo —
  they were pushed from each other tonight and were identical at that moment.

## Not this job

- The Sharp page's deletion and the library publish are Zafar's calls
  (`HANDOVER.md`).
- New badges: a release never clears them; `lib/icon-badges.json` is Zafar's,
  stated explicitly, every time.
- `main` is never committed to directly.
