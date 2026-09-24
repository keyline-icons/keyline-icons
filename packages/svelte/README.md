<img src="https://keylineicons.com/icon.svg" width="56" height="56" alt="Keyline Icons logo">

# @keyline-icons/svelte

1,114 icons on one 24×24 grid, as Svelte components. Free under MIT.

[keylineicons.com](https://keylineicons.com) to browse the full set.

```bash
npm i @keyline-icons/svelte
```

```svelte
<script>
  import { ArrowUpRight, Check, Menu } from "@keyline-icons/svelte"
</script>

<Check class="size-4" />
<ArrowUpRight size={16} />
<Menu strokeWidth={1.5} />
```

## Props

Every icon takes standard SVG attributes plus `size`:

| Prop | Default | Notes |
| --- | --- | --- |
| `size` | `24` | Sets both `width` and `height`. Takes a number or a CSS length. |
| `strokeWidth` | `2` | The set is drawn at 2 on a 24 grid. |
| `class` | | Tailwind's `size-*` overrides `size`, since it wins on specificity. |

Colour comes from `currentColor`, so the icons inherit whatever `text-*` is in
scope. There is no provider, no context and no theme object.

## Notes

**Four styles, two corner treatments, eight entry points.**

```svelte
import { Bell } from "@keyline-icons/svelte"          // stroke,  1,114 icons
import { Bell } from "@keyline-icons/svelte/two-tone" // two-tone, 1,114 icons
import { Bell } from "@keyline-icons/svelte/duotone"  // duotone, 1,114 icons
import { Bell } from "@keyline-icons/svelte/fill"     // fill,    1,114 icons

import { Bell } from "@keyline-icons/svelte/sharp"           // the same four,
import { Bell } from "@keyline-icons/svelte/sharp/two-tone"  // cut sharp,
import { Bell } from "@keyline-icons/svelte/sharp/duotone"  // with butt caps and
import { Bell } from "@keyline-icons/svelte/sharp/fill"     // square corners
```

Sharp covers exactly the names the rounded entry point beside it does, and the
export is called the same thing in both, so switching a file over is a change
to the import path and nothing else.

Separate imports rather than one component with a `weight` prop, so an app
ships only the styles it imports.

**Each icon carries its own root attributes** rather than inheriting a shared
preset. Some drawings are solid by definition, `square-half` and the other
fraction sectors among them, and forcing a stroke onto those paints an outline
over every knockout.

**`sideEffects: false` and ESM.** Named imports from the single entry point
tree-shake in any modern bundler, so an app importing three icons ships three.

**Generated, not written.** The components come from `icons/stroke/*.svg` via
`pipeline/build-svelte.mjs`, which emits this package.

## Licence

MIT. Use them in anything, commercial included, without attribution. The licence
does not grant rights in the name "Keyline Icons".
