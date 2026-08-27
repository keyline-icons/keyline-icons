# @keyline-icons/react

585 icons on one 24×24 grid, as React components. Built for shadcn/ui, free
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

**Three weights, three entry points.**

```tsx
import { Bell } from "@keyline-icons/react"          // stroke,  585 icons
import { Bell } from "@keyline-icons/react/duotone"  // duotone, 480 icons
import { Bell } from "@keyline-icons/react/fill"     // fill,    432 icons
```

Separate imports rather than one component with a `weight` prop, because the
three styles do not cover the same icons. Duotone and fill need a region to
fill, and an open glyph like `bar-chart` has none. A single component taking a
weight would have to accept a combination that does not exist and decide what
to do at runtime; a missing import is a build error, which is the better time
to find out.

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
