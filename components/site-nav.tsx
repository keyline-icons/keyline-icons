import { repoStars } from "@/lib/github"
import { SiteNavBar } from "@/components/site-nav-bar"

/**
 * The site bar, with its GitHub star count already in it.
 *
 * All this does is fetch the number and hand it to `SiteNavBar`, which is the
 * whole bar and is a client component. The split exists so the count can be
 * server-rendered: it is in the first paint, it costs the browser no request,
 * and it cannot arrive late and shift the controls beside it.
 *
 * Doing it here rather than in each page keeps the call in one place. Four
 * pages render a bar, and `repoStars` caches for an hour across all of them,
 * so this is one request an hour for the site and not one per page.
 *
 * The pages are unchanged by any of it: they still render `<SiteNav />`.
 */
export async function SiteNav() {
  return <SiteNavBar stars={await repoStars()} />
}
