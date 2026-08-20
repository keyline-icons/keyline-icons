import type { MetadataRoute } from "next"

import { absoluteUrl } from "@/lib/seo"

/**
 * robots.txt: everything allowed, plus a pointer to the sitemap.
 *
 * Two things this deliberately does not do, both of which look like tidying up
 * and are self-inflicted ranking losses:
 *
 * - **It does not disallow `/_next/`.** Google renders the page before judging
 *   it, and the CSS and JS live under there. Block them and it renders an
 *   unstyled skeleton, a site that scores itself on a blank page.
 * - **It does not deindex anything.** `Disallow` is not `noindex`: a blocked
 *   URL can still be indexed from an inbound link, without a snippet, because
 *   the crawler was never allowed to read the `noindex` it would have found.
 *   Keeping a page out of search means `robots: { index: false }` in that
 *   page's metadata, which requires the page to stay crawlable.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  }
}
