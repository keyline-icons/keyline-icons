<img src="app/icon.svg" width="56" height="56" alt="Keyline Icons logo">

# Keyline Icons

[![CI](https://github.com/keyline-icons/keyline-icons/actions/workflows/ci.yml/badge.svg)](https://github.com/keyline-icons/keyline-icons/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

**1,178 icons, drawn on one 24×24 grid, in four styles and two corner
treatments.** Built for shadcn/ui, free under MIT.

[**keylineicons.com**](https://keylineicons.com) to browse and copy.

| Style | Icons | What it is |
| --- | --- | --- |
| `stroke` | 1,178 | The full set. 2px keylines on a 24 grid. |
| `two-tone` | 1,178 | The stroke drawing over a flat plate at reduced opacity. |
| `duotone` | 1,178 | No outline: a grey body with the detail in full strength. |
| `fill` | 1,178 | Solid, with the detail knocked back out of the shape. |

`stroke` is the drawing every other style starts from, and since 1.0.0 every
name comes in all four. `two-tone` is what `duotone` meant until 0.9.0: the
outline kept, a 40% plate under it. `duotone` now drops the outline and decides
per icon which part is grey and which is black, so the thing that matters reads
first: the check on a badge, the liquid in a flask, the data rather than the
chart's axes. A glyph with nothing to fill, like `bar-chart`, carries its stroke
drawing in the filled styles, so no import ever comes up empty.

## Rounded and sharp

Every drawing in the table comes twice: rounded, with round caps and filleted
corners, and sharp, with butt caps and square corners. Same names, same
coverage, so 9,424 SVGs in total.

```
icons/stroke/bell.svg
icons/sharp/stroke/bell.svg
icons/sharp/fill/bell.svg
```

Sharp is a drawing of its own rather than a filter over the rounded one. Squaring
a corner moves the ink, and where that changes the silhouette the geometry was
solved again, so both treatments sit side by side in `raw/` and the build
converts neither into the other.

## Using them

**Copy one from the site.** [keylineicons.com](https://keylineicons.com) is the
browser: click any icon to open it, then take it as SVG, JSX, a React import or
an `npx` line, at whatever style, corners, stroke width and size you have set.
The panel keeps the last three icons you opened, so two candidates can be held
side by side. That is the fastest path and needs no install.

**Take the files.** `icons/<style>/<name>.svg` and
`icons/sharp/<style>/<name>.svg` are plain, normalised SVGs with no wrapper, no
`id`s and no classes. They are generated, so treat them as build output: to
change one, change the drawing in `raw/` and rebuild.

**Import them in React.** `@keyline-icons/react` exports one component per
icon, one entry point per style and corner treatment:

```bash
npm i @keyline-icons/react
```

```tsx
import { ArrowUpRight, Check, Menu } from "@keyline-icons/react"
import { Folder as FolderDuotone } from "@keyline-icons/react/duotone"
import { Folder as FolderFill } from "@keyline-icons/react/fill"
import { Folder as FolderSharp } from "@keyline-icons/react/sharp"
import { Folder as FolderSharpFill } from "@keyline-icons/react/sharp/fill"

<Check className="size-4" />
<ArrowUpRight size={16} />
```

Every component takes the usual `SVGProps` plus `size`, and colours from
`currentColor`. There is no theme, no context and no provider.

The style entry points are smaller than the stroke one and deliberately so.
`Check` is three open strokes with nothing to fill, so it exists in
`@keyline-icons/react` and `/sharp` and in none of the others; `Folder` has an
interior and exists in all six. The counts at the top of this file are the same
fact.

`components/icons/index.tsx` is the same set generated for this repo's own
site, and `@/components/icons` is the import to use inside it. Both come off
`icons/stroke/`, so they hold the same drawings; the package is the one to
install anywhere else.

**Import them in React Native.** `@keyline-icons/react-native` is the same
components drawn through `react-native-svg`, with the same entry points and
export names, so shared code changes the package name and nothing else. It
works in Expo, on the web through Expo too.

```bash
npm i @keyline-icons/react-native react-native-svg
```

```tsx
import { Check } from "@keyline-icons/react-native"
import { Folder } from "@keyline-icons/react-native/duotone"

<Check size={16} color="#2563eb" />
```

A native view has no CSS to inherit from, so colour is a `color` prop rather
than `currentColor`.

**Own the source with the shadcn CLI.** The registry is served by the site, so
adding the set to a project is one entry in `components.json`:

```json
"registries": {
  "@keyline": "https://keylineicons.com/r/{name}.json"
}
```

```bash
npx shadcn add @keyline/bell
npx shadcn add @keyline/fill/bell
npx shadcn add @keyline/sharp/fill/bell
```

Each icon arrives as a self-contained component that imports nothing from the
package, so it can be renamed, edited or folded into the project's own
conventions. Take the package to have the whole set behind one import; take the
registry to own a handful of files.

**Add one at a time from the terminal.** `@keyline-icons/cli` searches the set
and writes SVGs into a project without adding a dependency to it:

```bash
npx @keyline-icons/cli search arrow
npx @keyline-icons/cli add circle-arrow-down bell --out src/icons
npx @keyline-icons/cli add bell --style fill --corners sharp
```

**Give an agent the set.** `@keyline-icons/mcp` is an MCP server that searches
the set, returns SVG source in any style and corner treatment, and returns the
React import, so an assistant picks a real icon name rather than guessing one:

```bash
claude mcp add keyline-icons -- npx -y @keyline-icons/mcp
```

Anything else that speaks MCP over stdio runs the same command; the package's
own README has the JSON.

**Use them outside React.** The whole set is on
[Iconify](https://icon-sets.iconify.design/keyline-icons/) as `keyline-icons`,
which covers Vue, Svelte, Solid, web components and the Tailwind plugin. Stroke
is the bare name and everything else is a suffix on it:

```
keyline-icons:bell
keyline-icons:bell-fill
keyline-icons:bell-sharp-duotone
```

Iconify re-imports from this repository, so it carries whatever the last
release drew. The [install page](https://keylineicons.com/install) has the
snippet for each framework.

**Drop one onto a Figma canvas.** The
[Figma plugin](https://www.figma.com/community/plugin/1672557050316875938/keyline-icons)
inserts any icon in any style and either corner treatment into the file you
already have open, and the
[Community file](https://www.figma.com/community/file/1672255957017818239/keyline-icons)
is the whole set as components, with style, corners and container as variant
properties.

## Containers

60 icons come in a `square-` form and 65 in a `circle-` form, which wrap the
base drawing rather than replacing it:

```
icons/stroke/arrow-down.svg
icons/fill/square-arrow-down.svg
icons/sharp/duotone/circle-arrow-down.svg
```

A `square-` or `circle-` prefix does not always mean a container. `circle-half`
and `square-dashed` are shapes in their own right, with no base for them to
contain, so they are filed as regular icons. The rule is that the base has to
exist before the prefix means anything.

## Categories

Arrows, Chevrons & Carets, Git, Files, Time, Mail, Finance, Commerce, Maps,
Home, Media, Charts, Diagrams, Devices, Pointers, Text, Layout, Users, Gender,
Emoji, Actions, Controls, Education, AI, Science, Health, Sport, Food & Drink,
Art, Tools, Stationery, Shapes, Web, Weather, Transport, Nature and Animals,
plus the Square and Circle container groups.

What changed in each release, redraws included, is on the
[changelog](https://keylineicons.com/changelog).

## Layout

```
raw/<name>/            Figma exports, untouched. The source of truth.
icons/<style>/         Generated SVGs, rounded. Do not hand-edit.
icons/sharp/<style>/   Generated SVGs, sharp. Do not hand-edit.
components/icons/      Generated React components. Do not hand-edit.
pipeline/              The build, the linter and the checks.
app/, components/      The site at keylineicons.com.
packages/              Publishable packages.
```

## Working on it

Node 20.9 or newer, and pnpm.

```bash
pnpm install
pnpm dev            # the site
pnpm icons:build    # raw/ -> icons/
pnpm icons:react    # icons/ -> components/icons/ and packages/react/
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
