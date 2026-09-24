<img src="https://keylineicons.com/icon.svg" width="56" height="56" alt="Keyline Icons logo">

# @keyline-icons/react-native

1,178 icons on one 24×24 grid, as React Native components. Works in Expo,
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
import { Bell } from "@keyline-icons/react-native"          // stroke,  1,178 icons
import { Bell } from "@keyline-icons/react-native/two-tone" // two-tone, 1,178 icons
import { Bell } from "@keyline-icons/react-native/duotone"  // duotone, 1,178 icons
import { Bell } from "@keyline-icons/react-native/fill"     // fill,    1,178 icons

import { Bell } from "@keyline-icons/react-native/sharp"           // the same four,
import { Bell } from "@keyline-icons/react-native/sharp/two-tone"  // cut sharp,
import { Bell } from "@keyline-icons/react-native/sharp/duotone"  // with butt caps and
import { Bell } from "@keyline-icons/react-native/sharp/fill"     // square corners
```

The entry points and export names are the same as `@keyline-icons/react`, so
code shared between a web app and a native one changes the package name and
nothing else.

**React Native 0.79 or Expo SDK 53, or newer.** The style entry points are
package `exports`, which Metro resolves by default from those versions on. On
an older Metro, set `resolver.unstable_enablePackageExports = true` in
`metro.config.js`; the root import works either way.

**Expo web works too.** `react-native-svg` renders to DOM SVG there, and the
icons carry nothing that only makes sense on a phone.

**Generated, not written.** The components come from the same SVGs as
`@keyline-icons/react`, in the same pass of `pipeline/build-react.mjs`, so a new
drawing reaches both packages or neither.

## Licence

MIT. Use them in anything, commercial included, without attribution. The licence
does not grant rights in the name "Keyline Icons".
