<img src="https://keylineicons.com/icon.svg" width="56" height="56" alt="Keyline Icons logo">

# @keyline-icons/cli

Search [Keyline Icons](https://keylineicons.com) and copy them into your project
from the terminal. No install, no dependencies, no network.

```bash
npx @keyline-icons/cli search arrow
npx @keyline-icons/cli add circle-arrow-down bell --out src/icons
npx @keyline-icons/cli show check > check.svg
```

## Commands

| | |
| --- | --- |
| `search <query>` | Find icons by name, ranked |
| `show <name>` | Print one icon's SVG to stdout |
| `add <name...>` | Write icons into a directory |
| `list` | Print every icon name |

| Option | |
| --- | --- |
| `-s, --style <s>` | `stroke`, `two-tone`, `duotone` or `fill`. Default `stroke`. |
| `-c, --corners <c>` | `regular` or `sharp`. Default `regular`. |
| `-o, --out <dir>` | Where `add` writes. Default `./icons`. |
| `-l, --limit <n>` | Max results for `search`. Default 25. |

## It pipes

`show` and `list` write only their payload to stdout. Counts, headings and
hints go to stderr, so redirecting gets you a file rather than a file with a
banner stuck to the top:

```bash
keyline-icons show check > check.svg
keyline-icons list | grep chart
keyline-icons show mail --style fill | pbcopy
```

Colour is switched off automatically when stdout is not a terminal.

## Notes

**`add` resolves every name before writing any of them.** A typo in the third of
five leaves nothing on disk, rather than two files and an error.

**A missing style is explained, not silently skipped.** `bar-chart` has no fill,
because it is three open strokes with no interior to fill. Duotone and fill need
a fillable region, from the glyph's own enclosed area or from a square/circle
container.

**Typos resolve.** `chekc` suggests `check`; `arow` suggests the `arrow-*`
family, even though there is no bare `arrow` icon.

## Custom icons

Need icons the set does not have, drawn for your own product?
[Custom sets](https://keylineicons.com/custom?ref=npm) are drawn on the same
grid and delivered as SVG, a Figma file and a React package.

## Licence

MIT.
