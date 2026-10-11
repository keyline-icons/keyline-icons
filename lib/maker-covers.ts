import type { StaticImageData } from "next/image"

import overflow from "@/public/maker/overflow.jpg"
import preline from "@/public/maker/preline.png"

/**
 * Each of the maker's projects' own social card, for its card on the landing
 * page, filed under the project's `id` in `MAKER_PROJECTS`.
 *
 * The image each site already publishes as its `og:image`, not one drawn for
 * this page: it is the picture the project chose to be seen by, and the one a
 * link to it unfurls as anywhere else. When a project changes its card, copy
 * the new file over the old one here; the static import moves the hashed URL
 * with it.
 *
 * Copied rather than hot-linked, for the reason `lib/featured.ts` gives for
 * avatars: an image fetched from the other site is a `remotePatterns` host, a
 * request the privacy page would have to name, and a broken card the day that
 * site renames the file.
 *
 * Here rather than beside the list in `lib/site-chrome.ts`, which imports
 * nothing so that the client bar can read it, and only the landing page shows
 * pictures. A project with no entry here gets a card without one.
 */
export const MAKER_COVERS: Partial<Record<string, StaticImageData>> = {
  overflow,
  preline,
}
