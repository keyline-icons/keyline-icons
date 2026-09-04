# Keyline Icons

[![CI](https://github.com/keyline-icons/keyline-icons/actions/workflows/ci.yml/badge.svg)](https://github.com/keyline-icons/keyline-icons/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

**627 icons, drawn on one 24×24 grid, in three weights.** Built for shadcn/ui,
crafted with AI, free under MIT.

[**keylineicons.com**](https://keylineicons.com) to browse and copy.

| Style | Icons | What it is |
| --- | --- | --- |
| `stroke` | 627 | The full set. 2px keylines on a 24 grid. |
| `duotone` | 520 | The stroke drawing over a flat plate at reduced opacity. |
| `fill` | 472 | Solid, with the detail knocked back out of the shape. |

The table is one corner treatment. Every drawing is also cut with sharp corners,
so 3,238 SVGs in total.

`stroke` is complete by definition: it is the drawing every other style is
derived from. `duotone` and `fill` need a region to fill, and not every glyph
has one. `bar-chart` is three open strokes with no interior, so it
carries stroke only, while `square-bar-chart` puts the same glyph in a container
and gains both. Fillability is measured off the outline rather than guessed from
the name, which is why the counts are what they are.

## Using them

**Copy one from the site.** [keylineicons.com](https://keylineicons.com) is the
browser: click any icon to open it, then take it as SVG, JSX, a React import or
an `npx` line — at whatever stroke width and size you have set. The panel keeps
the last three icons you opened, so two candidates can be held side by side.
That is the fastest path and needs no install.

**Take the files.** `icons/<style>/<name>.svg` are plain, normalised SVGs with
no wrapper, no `id`s and no classes. They are generated, so treat them as build
output: to change one, change the drawing in `raw/` and rebuild.

**Import them in React.** `@keyline-icons/react` exports one component per
icon, one entry point per style:

```bash
npm i @keyline-icons/react
```

```tsx
import { ArrowUpRight, Check, Menu } from "@keyline-icons/react"
import { Folder as FolderDuotone } from "@keyline-icons/react/duotone"
import { Folder as FolderFill } from "@keyline-icons/react/fill"

<Check className="size-4" />
<ArrowUpRight size={16} />
```

Every component takes the usual `SVGProps` plus `size`, and colours from
`currentColor`. There is no theme, no context and no provider.

The two style entry points are smaller than the stroke one and deliberately so.
`Check` is three open strokes with nothing to fill, so it exists in
`@keyline-icons/react` and in neither of the others; `Folder` has an interior
and exists in all three. The counts at the top of this file are the same fact.

`components/icons/index.tsx` is the same set generated for this repo's own
site, and `@/components/icons` is the import to use inside it. Both come off
`icons/stroke/`, so they hold the same drawings; the package is the one to
install anywhere else.

**Add one at a time from the terminal.** `@keyline-icons/cli` searches the set
and writes SVGs into a project without adding a dependency to it:

```bash
npx @keyline-icons/cli search arrow
npx @keyline-icons/cli add circle-arrow-down bell --out src/icons
```

**Give an agent the set.** `@keyline-icons/mcp` is an MCP server that searches
the set, returns SVG source and returns the React import, so an assistant picks
a real icon name rather than guessing one:

```bash
claude mcp add keyline-icons -- npx -y @keyline-icons/mcp
```

Anything else that speaks MCP over stdio runs the same command; the package's
own README has the JSON.

**Drop one onto a Figma canvas.** The
[Figma plugin](https://www.figma.com/community/plugin/1672557050316875938/keyline-icons)
inserts any icon in any style into the file you already have open, and the
[Community file](https://www.figma.com/community/file/1672255957017818239/keyline-icons)
is the whole set as components.

## Containers

55 icons come in a `square-` form and 54 in a `circle-` form, which wrap the
base drawing rather than replacing it:

```
icons/stroke/arrow-down.svg
icons/fill/square-arrow-down.svg
icons/duotone/circle-arrow-down.svg
```

A `square-` or `circle-` prefix does not always mean a container. `circle-half`
and `square-dashed` are shapes in their own right, with no base for them to
contain, so they are filed as regular icons. The rule is that the base has to
exist before the prefix means anything.

## Categories

Arrows, Git, Files, Time, Mail, Commerce, Maps, Media, Charts, Devices,
Pointers, Layout, Users, Actions, Shapes, Web, plus the Square and Circle
container groups.

## Layout

```
raw/<name>/           Figma exports, untouched. The source of truth.
icons/<style>/        Generated SVGs. Do not hand-edit.
components/icons/     Generated React components. Do not hand-edit.
pipeline/             The build, the linter and the checks.
app/, components/     The site at keylineicons.com.
packages/             Publishable packages.
```

## Working on it

Node 20.9 or newer, and pnpm.

```bash
pnpm install
pnpm dev            # the site
pnpm icons:build    # raw/ -> icons/
pnpm icons:react    # icons/stroke/ -> components/icons/index.tsx
pnpm icons:lint     # geometry and coverage rules
pnpm icons:ci       # everything CI runs
```

`pipeline/README.md` is the real documentation: what the build normalises, every
rule the linter enforces and why, how the Figma check works, and the standard a
new drawing has to meet. Read it before adding an icon. The drawing standard is
not a matter of taste here, it is measured, and the linter will tell you the
number it wanted.

Two checks deliberately sit outside CI. `icons:figma` needs the Figma file,
which CI does not have. `brand:check` rasterises through headless Chrome, where
two versions disagree by a pixel on identical input, and a check that cries wolf
gets switched off. Run both locally.

## Sponsors

<!-- SPONSORS:start -->

[Preline](https://preline.co), since August 2026.

<!-- SPONSORS:end -->

The set is free, has no paid tier, and is not getting one. Sponsorship pays for
the hours rather than unlocking anything, so every icon added is added for
everyone.

[Sponsoring on GitHub](https://github.com/sponsors/keyline-icons) from $25 a
month puts your name in this section, and from $100 a month on
[keylineicons.com](https://keylineicons.com) as well. `lib/sponsors.ts` is the
list both read from.

## Licence

MIT. See [LICENSE](LICENSE). Use them in anything, commercial included, without
attribution.

The licence covers the icons and the code. It does not grant rights in the name
"Keyline Icons".
