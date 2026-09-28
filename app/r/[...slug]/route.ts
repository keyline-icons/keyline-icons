import { registryComponent } from "@/lib/icon-code"
import { artOf, CORNERS, type Corners } from "@/components/glyph"
import { iconHref } from "@/lib/icon-pages"
import { loadIcons, STYLES, type Icon, type Style } from "@/lib/icons"
import {
  AUTHOR,
  itemName,
  json,
  summary,
  type RegistryItem,
} from "@/lib/registry"
import { absoluteUrl } from "@/lib/seo"

/**
 * The shadcn registry.
 *
 * Listed in shadcn's registry index since 21 Sep 2026 (shadcn-ui/ui#11976), so
 * the CLI resolves `@keyline` with no setup. On a CLI that predates the index,
 * a consumer adds one line to their own `components.json`:
 *
 *   "registries": { "@keyline": "https://keylineicons.com/r/{name}.json" }
 *
 * In `components.json` specifically. shadcn's docs describe a `package.json`
 * form as well, and its CLI does not read it: through 4.13.0 the same entry in
 * `package.json` fails with "Add the registry configuration to your
 * components.json file". This said `package.json` and "no components.json
 * required" until someone tried it.
 *
 *   npx shadcn add @keyline/bell
 *   npx shadcn add @keyline/fill/bell
 *   npx shadcn search @keyline
 *
 * This is the third way the set travels and it is not redundant with the other
 * two. The npm package is a dependency you import from; the CLI copies SVGs;
 * this hands you a component as *source in your own repo*, which is the shape
 * shadcn users already expect and the only one they can edit afterwards.
 *
 * A catch-all rather than `[name]`, because the style lives in the path. The
 * stroke drawing is the bare name, since it is the only style every icon has
 * and the one anyone means by "the icon"; the other two are prefixed, matching
 * the package's own subpath exports (`@keyline-icons/react/fill`).
 *
 * `.json` is optional on the way in. The convention is `/r/{name}.json` and
 * that is what the install line above uses, but shadcn's config also accepts a
 * bare `{name}` template, and a registry that 404s on half of its own
 * documented forms is a support burden for no benefit.
 *
 * Only items are answered here. The catalog `search` reads has routes of its
 * own beside this one, `registry.json` and `registry`, because it is searched
 * per request and the items are not: see `lib/registry.ts`.
 */

function item(icon: Icon, style: Style, corners: Corners): RegistryItem {
  const art = artOf(icon, style, corners)!
  // `@components/` resolves against components.json when the consumer has one
  // and falls back sanely when they do not, which is the case this whole route
  // exists to serve.
  // The treatment is a directory here rather than a suffix, so a project that
  // installs both gets two files instead of one overwriting the other.
  const target =
    `@components/icons/` +
    `${corners === "sharp" ? "sharp/" : ""}${style === "stroke" ? "" : `${style}/`}` +
    `${icon.name}.tsx`

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...summary(icon, style, corners),
    author: AUTHOR,
    meta: { style, corners, container: icon.container, base: icon.base },
    // The CLI prints this once an `add` finishes. The drawing's page rather
    // than a page per variant: it shows every style and both corners, which
    // is the reason to send someone there after they installed one of them.
    docs: `Every style and both corners of ${icon.name}: ${absoluteUrl(iconHref(icon.name))}`,
    // No npm dependencies on purpose. The emitted file imports a type from
    // react and nothing else, so it compiles in any React project without
    // pulling `@keyline-icons/react` in behind the consumer's back.
    dependencies: [],
    files: [
      {
        path: `registry/icons/${itemName(icon.name, style, corners)}.tsx`,
        content: registryComponent(icon.name, art),
        type: "registry:component",
        target,
      },
    ],
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const parts = [...slug]
  const last = parts.pop()?.replace(/\.json$/, "") ?? ""
  const icons = await loadIcons()

  // `sharp` leads when it is there, so what remains is the style segment the
  // route has always parsed.
  const corners: Corners = parts[0] === "sharp" ? "sharp" : "regular"
  if (corners === "sharp") parts.shift()

  const style = (parts[0] ?? "stroke") as Style
  if (parts.length > 1 || !STYLES.includes(style)) {
    return json(
      {
        error: "unknown-path",
        detail: `Unknown registry path: ${slug.join("/")}`,
      },
      404
    )
  }

  /*
    Every 404 is a short code in `error` and the sentence in `detail`, because
    that is the shape the shadcn CLI reads: it prints `detail` (or `message`)
    and brackets `error` in front of it. A body with only `error` printed the
    sentence in brackets followed by the word `undefined`, which is how every
    404 from this registry ended until 28 Sep 2026. Unknown keys such as
    `available` survive the CLI's parse and stay for anyone reading the route
    directly.
  */
  const icon = icons.find((i) => i.name === last)
  if (!icon) {
    return json(
      { error: "no-such-icon", detail: `No icon named "${last}".` },
      404
    )
  }
  if (!artOf(icon, style, corners)) {
    // The coverage rule, as an answer rather than a 404 with no reason: an open
    // glyph has nothing to fill, and saying so is what stops it reading as a
    // gap in the registry.
    const available = STYLES.filter((s) => artOf(icon, s, corners))
    return json(
      {
        error: "no-such-style",
        detail: `"${last}" has no ${style} style. It has: ${available.join(", ")}.`,
        available,
      },
      404
    )
  }

  return json(item(icon, style, corners))
}

/**
 * Every item is built, so the registry is static files rather than a function
 * a CLI waits on. `loadIcons` memoises, so the cost is one read of the icon
 * directories for the whole set rather than one per route.
 */
export async function generateStaticParams() {
  const icons = await loadIcons()
  return icons.flatMap((icon) =>
    CORNERS.flatMap((k) =>
      STYLES.filter((s) => artOf(icon, s, k)).map((s) => ({
        slug: [
          ...(k === "sharp" ? ["sharp"] : []),
          ...(s === "stroke" ? [] : [s]),
          `${icon.name}.json`,
        ],
      }))
    )
  )
}
