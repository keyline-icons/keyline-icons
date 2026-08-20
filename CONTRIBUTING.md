# Contributing

Thanks for considering it. This is a small project with an unusually strict
drawing standard, so the most useful thing to know up front is where the rules
live and which files you are allowed to edit.

## The one rule that saves the most time

**`icons/`, `components/icons/` and `packages/*/src/` are generated. Do not edit
them.** The source of truth is `raw/`, and everything else is built from it:

```
raw/<name>/*.svg   ->  icons/<style>/<name>.svg   ->  components/icons/index.tsx
                                                  ->  packages/react/src/index.tsx
```

A hand-edit to a generated file passes review, gets committed, and is silently
destroyed the next time anyone runs the build. `pnpm icons:ci` catches it, which
is why that command is the gate on every pull request.

## Setup

Node 20.9 or newer, and pnpm.

```bash
pnpm install
pnpm dev
```

## Committing a drawing

```bash
pnpm ship -m "Draw sun"
```

Use this rather than `git commit` for anything that touches `raw/`. It
regenerates every derived file, runs the checks, commits, and then rebuilds the
icon dates and the Paper boards into that same commit. The dates are read from
`git log`, so they can only be right after the commit exists, which is an order
no one keeps by hand and which fails quietly on the icon pages.

Anything you have already staged is kept.

## Before you open a pull request

```bash
pnpm icons:ci
```

That is exactly what CI runs: the sync checks for `icons/`, the React modules and
the Figma cover, then the geometry linter, the demo reference check and
`tsc --noEmit`. If it passes locally it passes on GitHub.

Two checks sit outside it deliberately and are worth running by hand if you have
touched what they cover:

- `pnpm icons:figma` compares the Figma file against `raw/`. CI has no Figma
  file, so a defect that exists only in the design passes everything else.
- `pnpm brand:check` rasterises the logo through headless Chrome. Two Chrome
  versions disagree by a pixel on identical input, so in CI it would report "the
  logo changed" when nothing did.

## Adding an icon

Read `pipeline/README.md` first, particularly **Adding icons** and **The
coverage rule**. The standard is measured rather than eyeballed: the ink
envelope, the corner-radius table, the circle sizes, the 2-unit gap between
elements, the 6-unit modifier box. The linter will tell you the number it wanted
and which rule it came from.

The parts that catch people out:

- **Which styles an icon owes is not a choice.** Duotone and fill need a
  fillable region, which comes from the glyph's own enclosed area or from a
  square/circle container. `bar-chart` is three open strokes with no interior,
  so it is stroke-only and correct. Fillability is measured off the outline, not
  guessed from the name.
- **Draw it in Figma and export**, rather than writing path data by hand.
  `raw/README.md` covers the export layout, and the variant properties in the
  filename are what the build reads.
- **Check it at 16px.** The demo pages exist for this. A glyph that reads at 96
  and fills in at 16 is not finished; `handbag` had its handle opened for
  exactly this reason.

New icons should carry every style the coverage rule says they owe. `pnpm
icons:lint` will fail the build if one is missing.

## Changing the site

`app/` and `components/` are an ordinary Next.js App Router site. Two things are
not ordinary and are documented where they live:

- Routes have a policy. Adding one means adding it to the table in the SEO
  reference, to `SITE_LINKS` in `lib/site-chrome.ts`, and giving the page its own
  `pageMetadata()`. `SITE_LINKS` drives the nav, the footer and the sitemap
  together, on purpose.
- Icons in the chrome come from the set itself, never from another icon library.
  The site is the library's shop window, so a borrowed glyph is a small lie about
  coverage.

## Commits

Write a subject line in the imperative that says what changed, then a body that
says why, especially when the reasoning would not survive being rediscovered
from the diff. Say what you measured against and what you ruled out. A message
that only restates the diff is one the diff already told us.

## Reporting things

Open an issue. For a drawing that looks wrong, a screenshot at the size it looks
wrong at is worth more than a description, and saying which style and which
container you were using narrows it immediately.

## Licence

By contributing you agree that your work is licensed under the MIT licence in
[LICENSE](LICENSE).
