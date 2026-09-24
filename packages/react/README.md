<img src="https://keylineicons.com/icon.svg" width="56" height="56" alt="Keyline Icons logo">

# @keyline-icons/react

1,178 icons on one 24×24 grid, as React components. Built for shadcn/ui, free
under MIT.

[keylineicons.com](https://keylineicons.com) to browse the full set.

```bash
npm i @keyline-icons/react
```

```tsx
import { ArrowUpRight, Check, Menu } from "@keyline-icons/react"

export function Example() {
  return (
    <>
      <Check className="size-4" />
      <ArrowUpRight size={16} />
      <Menu strokeWidth={1.5} />
    </>
  )
}
```

## Props

Every icon takes the standard `SVGProps<SVGSVGElement>` plus `size`:

| Prop | Default | Notes |
| --- | --- | --- |
| `size` | `24` | Sets both `width` and `height`. Takes a number or a CSS length. |
| `strokeWidth` | `2` | The set is drawn at 2 on a 24 grid. |
| `className` | | Tailwind's `size-*` overrides `size`, since it wins on specificity. |

Colour comes from `currentColor`, so the icons inherit whatever `text-*` is in
scope. There is no provider, no context and no theme object.

## Notes

**Four styles, two corner treatments, eight entry points.**

```tsx
import { Bell } from "@keyline-icons/react"          // stroke,  1,178 icons
import { Bell } from "@keyline-icons/react/two-tone" // two-tone, 1,178 icons
import { Bell } from "@keyline-icons/react/duotone"  // duotone, 1,178 icons
import { Bell } from "@keyline-icons/react/fill"     // fill,    1,178 icons

import { Bell } from "@keyline-icons/react/sharp"           // the same four,
import { Bell } from "@keyline-icons/react/sharp/two-tone"  // cut sharp,
import { Bell } from "@keyline-icons/react/sharp/duotone"  // with butt caps and
import { Bell } from "@keyline-icons/react/sharp/fill"     // square corners
```

Sharp covers exactly the names the rounded entry point beside it does, and the
export is called the same thing in both, so switching a file over is a change
to the import path and nothing else.

Separate imports rather than one component with a `weight` prop, so an app
ships only the styles it imports. Since 1.0.0 all four cover every name.
`two-tone` is what `/duotone` exported until 0.9.0, the outline over a 40%
plate; `/duotone` now has no outline, a grey body with the detail at full
strength. If you imported `/duotone` before 1.0.0 and want the old look, change
the path to `/two-tone`.

**Each icon carries its own root attributes** rather than inheriting a shared
preset. Some drawings are solid by definition, `square-half` and the other
fraction sectors among them, and forcing a stroke onto those paints an outline
over every knockout.

**`sideEffects: false` and ESM.** Named imports from the single entry point
tree-shake in any modern bundler, so an app importing three icons ships three.

**Generated, not written.** The components come from `icons/stroke/*.svg` via
`pipeline/build-react.mjs`, which emits this package and the site's own module
in one pass so the two cannot drift.

## Licence

MIT. Use them in anything, commercial included, without attribution. The licence
does not grant rights in the name "Keyline Icons".
