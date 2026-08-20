import type { MetadataRoute } from "next"

import { iconHref } from "@/lib/icon-pages"
import { loadIcons } from "@/lib/icons"
import { absoluteUrl } from "@/lib/seo"
import { SITE_LINKS } from "@/lib/site-chrome"

/**
 * The sitemap, derived from the same list the nav and the footer render.
 *
 * A second literal of routes here is the obvious way to write this and the
 * wrong one: a page added to the bar and forgotten in the sitemap is a page
 * Google is never told about, and nothing fails: the sitemap stays valid,
 * just short. Reading `SITE_LINKS` makes that impossible, and is why each
 * entry carries its own `priority`.
 *
 * `lastModified` is build time for every URL. That is honest for a site whose
 * content is files on disk: the pages genuinely change when it is rebuilt.
 * Per-page timestamps would be more precise-looking and less true, and a
 * `lastmod` that moves without the content moving is one crawlers learn to
 * ignore.
 *
 * Nothing here reads a request-time API, so Next prerenders this at build
 * rather than regenerating it per crawl.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const pages = SITE_LINKS.filter((link) => link.sitemap !== false).map(
    (link) => ({
      url: absoluteUrl(link.href),
      lastModified,
      // Both of these are hints. Google ignores them; Bing and smaller crawlers
      // read them. Never treat either as a lever on ranking.
      // The browser is the one page that changes whenever an icon is drawn.
      changeFrequency:
        link.href === "/icons" ? ("weekly" as const) : ("monthly" as const),
      priority: link.priority,
    })
  )

  /*
    The icon pages, read off disk rather than listed.

    They are the one set of URLs that cannot come from `SITE_LINKS`: they are
    not in the nav and never will be, since a bar with 414 entries in it is not
    a bar. The same argument that makes `SITE_LINKS` the source for everything
    else applies here anyway — the list has to be derived, not typed, or it goes
    stale the first time an icon is drawn or renamed. `loadIcons` is the same
    read the route's `generateStaticParams` does, so the sitemap and the
    generated pages cannot disagree about which icons exist.

    Each one's `lastModified` is its drawing's own commit date, not build time.
    For the pages above, build time is honest: they genuinely change when the
    site is rebuilt. An icon page is the opposite case — it is about one file
    that has a real history, and git already knows when that file last moved.

    Priority sits under every hand-written page. These are leaves: real content,
    worth indexing, and not what anyone should land on first for the set's name.
  */
  const icons = (await loadIcons()).map((icon) => ({
    url: absoluteUrl(iconHref(icon.name)),
    lastModified: icon.history ? new Date(icon.history.updated) : lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...pages, ...icons]
}
