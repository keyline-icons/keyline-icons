<!--
Say what changed and why. The why is the part that does not survive being
rediscovered from the diff a year later.
-->

## What this changes

## Why

## Checks

- [ ] `pnpm icons:ci` passes locally
- [ ] No generated file was hand-edited (`icons/`, `components/icons/`, `packages/*/src/`)

<!--
If this adds or redraws an icon:

- [ ] Drawn in Figma and exported to `raw/`, not written as path data by hand
- [ ] Carries every style the coverage rule says it owes (`pnpm icons:lint`)
- [ ] Looked at 16px, not only at 96px
- [ ] `pnpm icons:figma` run, if the Figma file changed
-->
