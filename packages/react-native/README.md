<img src="https://keylineicons.com/icon.svg" width="56" height="56" alt="Keyline Icons logo">

# @keyline-icons/react-native

2,169 icons on one 24×24 grid, as React Native components. Works in Expo,
free under MIT.

[keylineicons.com](https://keylineicons.com) to browse the full set.

```bash
npm i @keyline-icons/react-native react-native-svg
```

In Expo, `npx expo install react-native-svg` picks the version your SDK
expects.

```tsx
import { ArrowUpRight, Check, Menu } from "@keyline-icons/react-native"

export function Example() {
  return (
    <>
      <Check />
      <ArrowUpRight size={16} color="#2563eb" />
      <Menu strokeWidth={1.5} />
    </>
  )
}
```

## Props

Every icon takes `react-native-svg`'s `SvgProps` plus `size`:

| Prop | Default | Notes |
| --- | --- | --- |
| `size` | `24` | Sets both `width` and `height`. |
| `color` | `#000` | Paints the drawing, plates included. |
| `strokeWidth` | `2` | The set is drawn at 2 on a 24 grid. |

A native view has no CSS to inherit a colour from, so pass `color` wherever the
icon should follow your theme. The two-tone and duotone plates are drawn at 40%
of that same colour, so one prop sets both tones.

Icons are hidden from VoiceOver and TalkBack with `aria-hidden`, since an icon
beside a label would otherwise be read twice. For an icon that stands alone,
pass `aria-hidden={false}` and an `aria-label`.

## Notes

**Four styles, two corner treatments, eight entry points.**

```tsx
import { Bell } from "@keyline-icons/react-native"          // stroke,  2,169 icons
import { Bell } from "@keyline-icons/react-native/two-tone" // two-tone, 2,169 icons
import { Bell } from "@keyline-icons/react-native/duotone"  // duotone, 2,169 icons
import { Bell } from "@keyline-icons/react-native/fill"     // fill,    2,169 icons

import { Bell } from "@keyline-icons/react-native/sharp"           // the same four,
import { Bell } from "@keyline-icons/react-native/sharp/two-tone"  // cut sharp,
import { Bell } from "@keyline-icons/react-native/sharp/duotone"  // with butt caps and
import { Bell } from "@keyline-icons/react-native/sharp/fill"     // square corners
```

The entry points and export names are the same as `@keyline-icons/react`, so
code shared between a web app and a native one changes the package name and
nothing else. That includes the `Icon`-suffixed twin every icon carries,
`CheckIcon` for `Check`.

**One path per icon, because Metro keeps everything.** Metro does not leave
out the icons a module exports and nobody imports, so
`import { Check } from "@keyline-icons/react-native"` bundles every stroke
drawing, about 1 MB minified, to show one. Each drawing also has a module of its
own, under the style it belongs to:

```tsx
import { Check } from "@keyline-icons/react-native/icons/check"
import { Folder } from "@keyline-icons/react-native/duotone/icons/folder"
import { Bell } from "@keyline-icons/react-native/sharp/fill/icons/bell"
```

The file is the icon's name as the site spells it, `circle-check` for
`CircleCheck`, and exports the drawing, its `Icon` twin and a default. Measured
in a production Metro bundle, `icons/check` adds under a kilobyte where the root
import adds 1,004 KB. Expo strips unused icons from production builds from SDK
54, where its docs still call that experimental; development builds and plain
React Native keep them all. The per-icon paths are native only, because web
bundlers already drop what nobody imports. Names renamed since 1.0 keep working
from the style imports, not from a path of their own.

**React Native 0.79 or Expo SDK 53, or newer.** The style entry points are
package `exports`, which Metro resolves by default from those versions on. On
an older Metro, set `resolver.unstable_enablePackageExports = true` in
`metro.config.js`; the root import works either way.

**Expo web works too.** `react-native-svg` renders to DOM SVG there, and the
icons carry nothing that only makes sense on a phone.

**Generated, not written.** The components come from the same SVGs as
`@keyline-icons/react`, in the same pass of `pipeline/build-react.mjs`, so a new
drawing reaches both packages or neither.

## Custom icons

Need icons the set does not have, drawn for your own product?
[Custom sets](https://keylineicons.com/custom?ref=npm) are drawn on the same
grid and delivered as SVG, a Figma file and a React package.

## Licence

MIT. Use them in anything, commercial included, without attribution. The licence
does not grant rights in the name "Keyline Icons".
