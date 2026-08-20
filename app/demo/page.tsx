import { pickDashboardIcons } from "@/lib/dashboard-demo"
import { loadIcons } from "@/lib/icons"
import { pageMetadata } from "@/lib/seo"
import { DashboardShowcase } from "@/components/dashboard-showcase"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"

import data from "../data.json"

/**
 * This page shipped with no metadata at all, which meant it inherited the
 * layout's fallback title and the site's description: a second page competing
 * with the homepage for the same result, saying the same thing about it.
 *
 * "Dashboard demo" replaced that, and it was the route talking rather than the
 * page. The title now matches `/demo/mobile`'s shape, "Icons in a X", so the
 * two demos read as a pair in the results rather than as two pages each
 * grabbing for a different keyword. It also agrees with the visible heading,
 * which is the single word "Dashboard" in `site-header.tsx`.
 *
 * The description names what is on screen and then makes the page's actual
 * argument: this is a dense UI at 16px, which is the size at which an icon set
 * either holds up or falls apart. Listing the parts alone describes a
 * screenshot; the size is the reason to look at it.
 *
 * 16px is not a guess. Every glyph here inherits `[&_svg]:size-4` from the
 * shadcn sidebar and header primitives.
 */
export const metadata = pageMetadata({
  path: "/demo",
  title: "Icons in a shadcn/ui dashboard",
  description:
    "A shadcn/ui dashboard drawn with Keyline Icons: sidebar, data table, " +
    "charts and stat cards. Dense UI at 16px, where an icon set either holds " +
    "up or does not.",
  socialDescription:
    "A shadcn/ui dashboard drawn with Keyline Icons: sidebar, data table, charts and stat cards.",
})

export default async function Page() {
  const icons = await loadIcons()

  return (
    <>
      <SiteNav />
      <DashboardShowcase
        icons={pickDashboardIcons(icons)}
        data={data}
        totalIcons={icons.length}
      />
      <SiteFooter />
    </>
  )
}
