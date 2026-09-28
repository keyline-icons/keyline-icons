import Link from "next/link"

import { Compass } from "@/components/icons"
import { Button } from "@/components/ui/button"

/**
 * The site's own 404, for every address that has no page.
 *
 * Next's built-in one had no way back into the set, and its own inline
 * black-on-white sat over whatever theme the layout had just applied, so in
 * dark mode a mistyped icon name was a white page. This one is drawn in the
 * site's tokens, under the root layout's theme and fonts, with a way back.
 *
 * **No site bar and no footer, and that is measured, not taste.** The root
 * not-found is not only served on a miss: the App Router serialises it into
 * every page's payload as the layout's fallback. With `SiteNav` and
 * `SiteFooter` in it, every page on the site grew by 8 to 10 KB (`/legal/terms`
 * by a fifth), and the nav's GitHub and icon-count reads ran once per page at
 * build, which took static generation from 8 s to 63 s. Measured on
 * 28 Sep 2026. Keep this small.
 *
 * No `metadata` export either. `pageMetadata()` writes a canonical, and a
 * canonical is wrong on the one page that answers for every dead address. The
 * title falls back to the layout's `title.default`, which is there for exactly
 * a route that sets none. And nothing here may read cookies or headers: a
 * not-found that renders per request streams with a 200, a soft 404, which is
 * the failure `dynamicParams = false` on the icon pages exists to prevent.
 */
export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-360 flex-1 flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
      <Compass className="size-10 text-muted-foreground" />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance">
        Nothing drawn here
      </h1>
      <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
        This address has no page. Every drawing in the set is in the browser,
        and its search finds an icon by any name it goes by.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button render={<Link href="/icons" />} nativeButton={false}>
          Browse the icons
        </Button>
        <Button
          variant="outline"
          render={<Link href="/" />}
          nativeButton={false}
        >
          Home
        </Button>
      </div>
    </main>
  )
}
