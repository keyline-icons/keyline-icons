import { componentName, registryComponent } from "@/lib/icon-code"
import { loadIcons, STYLES, type Icon, type Style } from "@/lib/icons"
import { absoluteUrl } from "@/lib/seo"
import { SET_TITLE } from "@/lib/site-chrome"

/**
 * The shadcn registry.
 *
 * A consumer adds one line to their own `components.json` and every icon becomes
 * installable:
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
 */

/** Served both as the catalog and as one item, so the shape is named once. */
type RegistryItem = {
  $schema?: string
  name: string
  type: "registry:component"
  title: string
  description: string
  author: string
  dependencies?: string[]
  files?: {
    path: string
    content: string
    type: "registry:component"
    target: string
  }[]
  meta?: Record<string, unknown>
}

const AUTHOR = `${SET_TITLE} <${absoluteUrl("/")}>`

/** `bell` for stroke, `fill/bell` otherwise. The install name and the URL agree. */
const itemName = (name: string, style: Style) =>
  style === "stroke" ? name : `${style}/${name}`

function describe(icon: Icon, style: Style) {
  const styles = STYLES.filter((s) => icon.art[s])
  return (
    `${componentName(icon.name)}, the ${style} drawing of ${icon.name} on a ` +
    `24×24 grid. Available in ${styles.join(", ")}.`
  )
}

/** Metadata only. The catalog is for `search`, so it carries no file bodies. */
function summary(icon: Icon, style: Style): RegistryItem {
  return {
    name: itemName(icon.name, style),
    type: "registry:component",
    title: componentName(icon.name),
    description: describe(icon, style),
    author: AUTHOR,
    meta: { style, container: icon.container, base: icon.base },
  }
}

function item(icon: Icon, style: Style): RegistryItem {
  const art = icon.art[style]!
  // `@components/` resolves against components.json when the consumer has one
  // and falls back sanely when they do not, which is the case this whole route
  // exists to serve.
  const target = `@components/icons/${style === "stroke" ? "" : `${style}/`}${icon.name}.tsx`

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...summary(icon, style),
    // No npm dependencies on purpose. The emitted file imports a type from
    // react and nothing else, so it compiles in any React project without
    // pulling `@keyline-icons/react` in behind the consumer's back.
    dependencies: [],
    files: [
      {
        path: `registry/icons/${itemName(icon.name, style)}.tsx`,
        content: registryComponent(icon.name, art),
        type: "registry:component",
        target,
      },
    ],
  }
}

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      // Long-lived: an icon's markup never changes under its own name. A
      // redraw ships as a new build, and `stale-while-revalidate` means a CLI
      // never waits on that.
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const parts = [...slug]
  const last = parts.pop()?.replace(/\.json$/, "") ?? ""
  const icons = await loadIcons()

  if (last === "registry" && parts.length === 0) {
    const items = icons.flatMap((icon) =>
      STYLES.filter((s) => icon.art[s]).map((s) => summary(icon, s))
    )
    return json({
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "keyline",
      homepage: absoluteUrl("/"),
      items,
    })
  }

  const style = (parts[0] ?? "stroke") as Style
  if (parts.length > 1 || !STYLES.includes(style)) {
    return json({ error: `Unknown registry path: ${slug.join("/")}` }, 404)
  }

  const icon = icons.find((i) => i.name === last)
  if (!icon) return json({ error: `No icon named "${last}"` }, 404)
  if (!icon.art[style]) {
    // The coverage rule, as an answer rather than a 404 with no reason: an open
    // glyph has nothing to fill, and saying so is what stops it reading as a
    // gap in the registry.
    //
    // The styles are named inside `error` as well as beside it, because the
    // shadcn CLI prints that one string and drops every sibling field. It read
    // `["bar-chart" has no fill style] undefined` at the terminal, so the half
    // of the answer worth having never reached the person who asked. `available`
    // stays for anyone reading the route directly.
    const available = STYLES.filter((s) => icon.art[s])
    return json(
      {
        error: `"${last}" has no ${style} style. It has: ${available.join(", ")}.`,
        available,
      },
      404
    )
  }

  return json(item(icon, style))
}

/**
 * Every item is built, so the registry is static files rather than a function
 * a CLI waits on. `loadIcons` memoises, so the cost is one read of the icon
 * directories for the whole set rather than one per route.
 */
export async function generateStaticParams() {
  const icons = await loadIcons()
  return [
    { slug: ["registry.json"] },
    ...icons.flatMap((icon) =>
      STYLES.filter((s) => icon.art[s]).map((s) => ({
        slug: s === "stroke" ? [`${icon.name}.json`] : [s, `${icon.name}.json`],
      }))
    ),
  ]
}
