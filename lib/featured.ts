import type { StaticImageData } from "next/image"

/**
 * The showcase: screenshots of the set shipping in real interfaces, rendered on
 * `/examples` and, for the entries that earn it, on the landing page.
 *
 * **Submissions arrive as public posts on X**, tagging the account named by
 * `SET_X_HANDLE`. They land in that account's notifications like any other
 * mention, and are picked out of them by hand. That is the whole intake: there
 * is no API, no token and no script, deliberately.
 *
 * Reading mentions programmatically was costed and rejected. X discontinued its
 * free tier in February 2026, so `GET /2/users/{id}/mentions` now bills as an
 * owned read; the per-post price is small, but it means a funded developer
 * account and a credential to keep alive for a page that gets a handful of
 * submissions a month. Someone already reads those notifications for free.
 *
 * Auto-publishing them would have been worse than merely paid. It puts whatever
 * anyone tags onto the site, which is a spam surface with no moderation behind
 * it, and it makes every card depend on a post staying up: deleted post, broken
 * wall. CollectUI and recent.design both hand-pick for the same reason, and
 * neither publishes a raw feed.
 *
 * So this is a hand-kept list, like `lib/sponsors.ts`. Accepting a post is a
 * judgement and stays a person's; the bookkeeping after it does not, and
 * `pipeline/add-featured.mjs` does that part:
 *
 *     npm run featured:add -- ~/Downloads/shot.png \
 *       --title "Acme Console" --post https://x.com/adareyes/status/123 \
 *       --alt "An admin console: a sidebar beside a table of runs." \
 *       --url https://acme.com --name "Ada Reyes" --home
 *
 * It copies the screenshot to `public/featured/<slug>.png`, copies `--avatar`
 * to `public/featured/avatars/<handle>.jpg`, writes the imports and the entry
 * below, and runs the check. `--dry-run` prints all of it and writes nothing.
 * The handle and the date come off the post URL and the clock.
 *
 * By hand it is the same four steps: save the screenshot under the slug and the
 * face under the handle, import both at the top of this file, add an entry
 * below with `post` filled in, since it is the provenance and the permission at
 * once, set `home` only if it should take one of the landing page's three slots
 * and take the flag off whatever it replaces, then run
 * `node pipeline/check-featured.mjs`.
 *
 * Images are **static imports, never `<Image src="/featured/…">`**.
 * `components/figma-showcase.tsx` records both halves of the reason: typed
 * dimensions drift from the file, and the optimiser caches by source URL, so a
 * replaced file keeps serving its old pixels. A static import carries its own
 * width and height and lands at a content-hashed URL, which retires both. It
 * also means a deleted image fails the build instead of 404ing on the page.
 *
 * **Avatars are downloaded, not hot-linked.** An X profile picture lives on
 * pbs.twimg.com behind a URL that rotates, so pointing `next/image` at it would
 * mean a new `remotePatterns` host, a line on the privacy page, and a wall of
 * broken faces the day a URL changes. Pulling the file down at curation time
 * costs one small image per entry and leaves the page dependent on nothing.
 *
 * **It ships empty, and that is not a placeholder.** The set's own demos were
 * seeded here for a day and came out: a gallery of other people's work that
 * opens with three of our own screenshots is the page answering its own
 * question, and every visitor can tell.
 *
 * `pipeline/check-featured.mjs` reads this file as text, the way
 * `check-usage.mjs` reads `lib/icon-pages.ts`: it is TypeScript, and the
 * pipeline runs in plain node.
 */
export type FeaturedExample = {
  /** kebab-case id, and the image's filename under `public/featured/`. */
  slug: string
  /** The product or interface, as its maker names it. */
  title: string
  /**
   * Where it ships, if it ships anywhere the public can reach. Absolute for
   * someone else's product, a path for a page of this site.
   */
  url?: string
  /** What the screenshot shows, the arrangement rather than the pixels. */
  alt: string
  /** Who gets the credit, which is not always their handle. */
  name: string
  /** X handle, without the `@`. The credit links to the profile. */
  x?: string
  /**
   * The post this came from. It is the provenance and the permission at once,
   * so an entry taken off X should always carry one.
   */
  post?: string
  /** Their avatar, pulled down at curation time. Initials stand in without it. */
  avatar?: StaticImageData
  /** ISO date it was featured, e.g. "2026-08-28". Newest first on the page. */
  added: string
  /** Takes one of the landing page's three slots. */
  home?: true
  /** The screenshot, statically imported so its dimensions travel with it. */
  image: StaticImageData
}

/** Everyone featured, oldest first, like `SPONSORS`. */
export const FEATURED: FeaturedExample[] = []

/** The gallery's reading: everyone, newest first. */
export const allFeatured = () =>
  [...FEATURED].sort((a, b) => b.added.localeCompare(a.added))

/**
 * The landing page's reading: the flagged entries, capped at three. The cap is
 * the section's design rather than a suggestion, so it lives here and not in
 * the component that happens to render it today.
 */
export const homeFeatured = () =>
  allFeatured()
    .filter((entry) => entry.home)
    .slice(0, 3)

/**
 * Where a card's arrow goes. The product when there is one, and the post it
 * came from otherwise, because a screenshot of something unreleased is still
 * worth showing and the post is somewhere real to send people.
 */
export const featuredHref = (entry: FeaturedExample) => entry.url ?? entry.post
