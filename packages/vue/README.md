<img src="https://keylineicons.com/icon.svg" width="56" height="56" alt="Keyline Icons logo">

# @keyline-icons/vue

1,114 icons on one 24×24 grid, as Vue 3 components. Free under MIT.

[keylineicons.com](https://keylineicons.com) to browse the full set.

```bash
npm i @keyline-icons/vue
```

```vue
<script setup>
import { ArrowUpRight, Check, Menu } from "@keyline-icons/vue"
</script>

<template>
  <Check class="size-4" />
  <ArrowUpRight :size="16" />
  <Menu :stroke-width="1.5" />
</template>
```

## Props

Every icon takes standard SVG attributes plus `size`:

| Prop | Default | Notes |
| --- | --- | --- |
| `size` | `24` | Sets both `width` and `height`. Takes a number or a CSS length. |
| `strokeWidth` / `stroke-width` | `2` | The set is drawn at 2 on a 24 grid. |
| `class` | | Tailwind's `size-*` overrides `size`, since it wins on specificity. |

Colour comes from `currentColor`, so the icons inherit whatever `text-*` is in
scope. There is no provider, no context and no theme object.

## Notes

**Four styles, two corner treatments, eight entry points.**

```vue
import { Bell } from "@keyline-icons/vue"          // stroke,  1,114 icons
import { Bell } from "@keyline-icons/vue/two-tone" // two-tone, 1,114 icons
import { Bell } from "@keyline-icons/vue/duotone"  // duotone, 1,114 icons
import { Bell } from "@keyline-icons/vue/fill"     // fill,    1,114 icons

import { Bell } from "@keyline-icons/vue/sharp"           // the same four,
import { Bell } from "@keyline-icons/vue/sharp/two-tone"  // cut sharp,
import { Bell } from "@keyline-icons/vue/sharp/duotone"  // with butt caps and
import { Bell } from "@keyline-icons/vue/sharp/fill"     // square corners
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
`pipeline/build-vue.mjs`, which emits this package.

## Licence

MIT. Use them in anything, commercial included, without attribution. The licence
does not grant rights in the name "Keyline Icons".
