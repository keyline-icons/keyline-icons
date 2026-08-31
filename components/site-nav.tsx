import { artOf } from "@/components/glyph"
import { repoStars } from "@/lib/github"
import { CORNERS, loadIcons, STYLES } from "@/lib/icons"
import { SiteNavBar } from "@/components/site-nav-bar"

/**
 * The site bar, with its GitHub star count and its share counts already in it.
 *
 * All this does is gather two server-only facts and hand them to `SiteNavBar`,
 * which is the whole bar and is a client component. The split exists so both
 * can be server-rendered: they are in the first paint, they cost the browser no
 * request, and neither can arrive late and shift the controls beside it.
 *
 * Doing it here rather than in each page keeps the calls in one place. Four
 * pages render a bar, `repoStars` caches for an hour across all of them and
 * `loadIcons` is memoised per request, so this is one GitHub call an hour for
 * the site and no extra disk read at all.
 *
 * The pages are unchanged by any of it: they still render `<SiteNav />`.
 */
export async function SiteNav() {
  const [stars, icons] = await Promise.all([repoStars(), loadIcons()])

  return (
    <SiteNavBar
      stars={stars}
      /*
        What the share menu puts in a post, counted off disk rather than typed.

        This is the site's standing rule about numbers in prose, reaching one
        component deeper than it used to. `lib/share.ts` is a client module and
        cannot read the icon directories, so the figures have to be handed down
        from a server component, and this is the only server component the bar
        has.

        `files` is not `icons * 6`. Stroke is complete by definition, duotone
        and fill are not: they need a region to paint, and an open drawing like
        `bar-chart` has no interior. Both corner treatments are in it, because
        the claim is about how many SVGs the set holds and since sharp landed
        it holds each drawing twice.

        Counted exactly as `app/page.tsx` counts the same figure for the
        landing page, so a post and the page it links to can never quote
        different numbers. That promise was already broken once, quietly: the
        page learned to count the treatments and this did not, so a share said
        half what the page it linked to said.
      */
      counts={{
        icons: icons.length,
        files: icons.reduce(
          (sum, icon) =>
            sum +
            CORNERS.reduce(
              (n, corners) =>
                n +
                STYLES.filter((style) => artOf(icon, style, corners)).length,
              0
            ),
          0
        ),
      }}
    />
  )
}
