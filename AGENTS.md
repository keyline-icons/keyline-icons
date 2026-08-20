<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Keyline Icons

A 24×24 icon set in three styles, its build pipeline, the site that browses it,
and three packages. 414 icons, 1,059 SVGs, MIT.

## The one rule

**`icons/`, `components/icons/`, `packages/*/src/` and `packages/*/icons.json`
are generated. Never edit them.** The source of truth is `raw/`, which holds
Figma exports, and everything downstream is built from it:

```
raw/<name>/*.svg  ->  icons/<style>/<name>.svg  ->  components/icons/index.tsx
                                                ->  packages/react/src/*.tsx
                                                ->  packages/{mcp,cli,figma-plugin}/icons.json
                                                ->  previews/{figma-cover,social-preview}.svg
                                                ->  previews/paper/*.html
```

A hand-edit to any of those passes review and is destroyed by the next build.
`pnpm icons:ci` is what catches it.

## Before you finish

```bash
pnpm icons:ci
```

Exactly what CI runs: the five sync checks, the geometry linter, the demo
reference check and `tsc --noEmit`. Three checks sit outside it on purpose:
`icons:figma` needs the Figma file, `brand:check` rasterises through headless
Chrome where two versions disagree by a pixel, and `history:check` reads git.

**Changed a drawing? Use `pnpm ship -m "..."` rather than committing by hand.**

```bash
pnpm ship -m "Draw sun"
```

It regenerates, verifies, commits, and only then rebuilds `lib/icon-history.json`
and the Paper boards, folding both back into the same commit. That order is the
reason it exists. The dates come off `git log`, so the commit that changes a
drawing is the commit that makes its date stale: run the rebuild before
committing and it is wrong the moment it lands. Paper reads those same dates, so
it has to follow them. Neither ordering is something anyone remembers reliably,
and both fail silently, on the icon pages rather than in a check.

It pins the committer date across the amend, so `history:check` passes straight
after. Commit an icon by hand and it will not.

## Where the real documentation is

Long-form reasoning lives next to the thing it explains, not here.

| Topic | Read |
| --- | --- |
| Drawing standard, construction, variants, coverage | `pipeline/README.md` |
| How Figma exports are laid out | `raw/README.md` |
| Titles, canonicals, sitemap, route policy | `lib/seo.ts`, and each page's own `pageMetadata()` |
| Site components and tokens | `components/ui/`, `app/globals.css` |
| Contributing | `CONTRIBUTING.md` |

Anything under `.claude/skills/` is private and is not published with this
repository. Do not add it, quote it into a tracked file, or cite it as a path a
reader can open. Everything a contributor needs is in the table above.

## Traps that have already cost time

- **Which styles an icon owes is measured, not chosen.** Duotone and fill need
  a fillable region, from the glyph's enclosed area or a square/circle
  container. `bar-chart` is three open strokes and is correctly stroke-only.
- **`tsc` needs `next typegen` first on a clean checkout.** `next-env.d.ts` is
  gitignored and is what declares `*.png` imports, so a fresh clone fails with
  "Cannot find module '@/public/mockups/figma.png'" about a committed file.
  `next dev` writes it once locally and it never comes back, which is why this
  only ever shows up in CI. `icons:ci` and `typecheck` both run typegen now.
- **Generated files must stay out of Prettier.** `.prettierignore` covers them.
  Formatting one makes it disagree with its generator and fails CI on a repo
  where all anyone did was run the formatter. This has been hit three times.
- **JSX eats a leading space** on a text node that wraps to the next line.
  Write it as `{" "}`. This shipped as "size-4in their variants" once.
- **App Router metadata objects are replaced, not merged.** A page exporting
  `openGraph` drops the layout's `og:type` and `og:site_name` silently. Use
  `pageMetadata()` in `lib/seo.ts`.
- **`opengraph-image` does not inherit downward.** Every segment that should
  have a card needs its own re-export, or shared links unfurl blank.
- **Icons in the site's own chrome come from the set**, never another library.
  The site is the shop window; a borrowed glyph is a lie about coverage.

## House style

Comments explain *why*, not what, and are worth writing when the reasoning
would not survive being rediscovered from the diff. Commit messages do the same.

A subject line in the imperative saying what changed, then a body saying why,
what it was measured against, and what was ruled out. Not a restatement of the
diff. If a decision took an argument to reach, the message is where the argument
lives, because the next person to touch it will not have been in the room.

No spaced dashes in prose or UI copy. Commas, colons and full stops.
