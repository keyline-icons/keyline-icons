import fuzzysort from "fuzzysort"
import { componentName } from "@/lib/icon-code"
import { artOf, CORNERS, type Corners } from "@/components/glyph"
import { loadIcons, STYLES, type Icon, type Style } from "@/lib/icons"
import { absoluteUrl } from "@/lib/seo"
import { SET_TITLE } from "@/lib/site-chrome"

/**
 * What the shadcn registry routes under `app/r/` share.
 *
 * Items are served by the catch-all, whose header explains the registry. The
 * catalog has routes of its own, `registry.json` and bare `registry`, so that it
 * can stay one prerendered file while a search of it runs per request at
 * `registry/search`. `next.config.ts` decides which of the two a request gets.
 */

/** Served both as the catalog and as one item, so the shape is named once. */
export type RegistryItem = {
  $schema?: string
  name: string
  type: "registry:component"
  title: string
  description: string
  author?: string
  docs?: string
  dependencies?: string[]
  files?: {
    path: string
    content: string
    type: "registry:component"
    target: string
  }[]
  meta?: Record<string, unknown>
}

export const AUTHOR = `${SET_TITLE} <${absoluteUrl("/")}>`

/**
 * `bell` for stroke, `fill/bell` for a style, `sharp/fill/bell` for a treatment.
 *
 * The install name, the URL and the React entry point all agree, which is the
 * property worth having: someone who has read `@keyline-icons/react/sharp/fill`
 * can guess `@keyline/sharp/fill/bell` and be right.
 */
export const itemName = (name: string, style: Style, corners: Corners) =>
  [
    corners === "sharp" ? "sharp" : null,
    style === "stroke" ? null : style,
    name,
  ]
    .filter(Boolean)
    .join("/")

function describe(icon: Icon, style: Style, corners: Corners) {
  const styles = STYLES.filter((s) => artOf(icon, s, corners))
  return (
    `${componentName(icon.name)}, the ${style} drawing of ${icon.name} on a ` +
    `24×24 grid, with ${corners === "sharp" ? "squared" : "rounded"} corners. ` +
    `Available in ${styles.join(", ")}.`
  )
}

/**
 * Metadata only. The catalog is for `search`, so it carries no file bodies.
 *
 * And no `author` or `meta` either, though every item has both. `search` keeps
 * the name, title, type and description of a catalog entry and nothing else,
 * so on 9,736 entries those two fields were 37% of the catalog and reached
 * nobody: 38 KB of every `shadcn search @keyline` under brotli, measured on
 * 28 Sep 2026. They live on the item, where `add` and `view` do read them.
 * The server-side search below matches on the same three fields the CLI does,
 * so it never needed them either.
 */
export function summary(
  icon: Icon,
  style: Style,
  corners: Corners
): RegistryItem {
  return {
    name: itemName(icon.name, style, corners),
    type: "registry:component",
    title: componentName(icon.name),
    description: describe(icon, style, corners),
  }
}

export const CACHE_CONTROL =
  "public, max-age=3600, stale-while-revalidate=86400"

export const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      // Long-lived: an icon's markup never changes under its own name. A
      // redraw ships as a new build, and `stale-while-revalidate` means a CLI
      // never waits on that.
      "Cache-Control": CACHE_CONTROL,
    },
  })

let items: Promise<RegistryItem[]> | null = null

/** Every drawing in every corner, in the order the catalog has always listed. */
function catalogItems(): Promise<RegistryItem[]> {
  items ??= loadIcons().then((icons) =>
    icons.flatMap((icon) =>
      CORNERS.flatMap((k) =>
        STYLES.filter((s) => artOf(icon, s, k)).map((s) => summary(icon, s, k))
      )
    )
  )
  return items
}

const registry = () => ({
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "keyline",
  homepage: absoluteUrl("/"),
})

/** The whole catalog, which is what `/r/registry.json` serves. */
export async function catalog() {
  return { ...registry(), items: await catalogItems() }
}

/** `registry:component` and `component` are one type. So is `Component`. */
const bareType = (type: string) =>
  type
    .trim()
    .toLowerCase()
    .replace(/^registry:/, "")

/** A non-negative whole number, or the default. `limit=abc` is not an error. */
function count(value: string | null, fallback: number) {
  const n = value?.trim() ? Number(value) : NaN
  return Number.isSafeInteger(n) && n >= 0 ? n : fallback
}

/**
 * The catalog filtered by `type`, searched by `q`, and cut at `offset` and
 * `limit`, which are the four parameters shadcn 4.17.0 and later send.
 *
 * A response carrying `pagination` is taken verbatim: the CLI skips its own
 * type filter and its own search, so whatever this returns is the answer the
 * person at the terminal gets. That is why `q` is not a substring match. The
 * CLI has always searched this catalog itself with fuzzysort, over the same
 * three fields with the same threshold, and a substring match would have
 * quietly changed what `-q` means: `arw` stops finding `arrow-down`. So this
 * calls the same library the same way, over the list the CLI used to download
 * and in the same order, so a query ranks here exactly as it ranked there.
 *
 * The ranking is most of the answer. Every description ends by listing the
 * styles, so `arrow` fuzzy-matches every item in the set, as it always has on
 * the CLI, and what makes that useful is `arrow-up` coming first. A total equal
 * to the whole catalog is the CLI's own behaviour, not a bug here.
 *
 * `limit` defaults to 100 and `offset` to 0, as in shadcn's own example, and
 * `limit=0` means all of it, which is how the CLI reads `--limit 0` when it
 * pages locally. A request with no parameters at all never reaches here: see
 * `next.config.ts`.
 */
export async function searchCatalog(params: URLSearchParams) {
  const query = params.get("q") ?? ""
  const types = (params.get("type") ?? "")
    .split(",")
    .map(bareType)
    .filter(Boolean)
  const offset = count(params.get("offset"), 0)

  let found = await catalogItems()
  if (types.length > 0) {
    found = found.filter((i) => types.includes(bareType(i.type)))
  }
  if (query) {
    found = fuzzysort
      .go(query, found, {
        keys: ["name", "title", "description"],
        threshold: -10000,
        limit: found.length,
      })
      .map((result) => result.obj)
  }

  const limit = count(params.get("limit"), 100) || found.length
  return {
    ...registry(),
    items: found.slice(offset, offset + limit),
    pagination: {
      total: found.length,
      offset,
      limit,
      hasMore: offset + limit < found.length,
    },
  }
}
