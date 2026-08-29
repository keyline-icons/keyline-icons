Board bookkeeping, saved for session handover (29 Aug 2026).

- `sections.json`: the Sharp page board's 106 icon names, by section.
- `r-stroke.json`, `r-duo-a.json` + `r-duo-b.json`, `r-fill.json`: the compact
  payloads currently ON the Figma board, one entry per cell, in encode.mjs's
  flag format (#f fill, s stroked, e evenodd, o/p opacities). Diff a fresh
  encodeSet() of the solved sets against these to get the cells to push.
- `mid-moves.json`: the corner moves the stroke solve recorded per icon.

The solved sets themselves are ../solved-mid, ../solved-fill, ../solved-duotone
(585/432/480 files) and are the CURRENT state of the sharp variant, matching
the board exactly as of commit time.
