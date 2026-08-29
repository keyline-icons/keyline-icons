import Link from "next/link"

import {
  FeaturedGallery,
  FeaturedGalleryPlaceholder,
} from "@/components/featured-gallery"
import { PostOnX } from "@/components/post-on-x"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { allFeatured } from "@/lib/featured"
import { pageMetadata } from "@/lib/seo"
import { SET_TITLE } from "@/lib/site-chrome"

/**
 * The showcase: screenshots of the set in shipped interfaces, submitted as
 * public posts on X and picked by hand into `lib/featured.ts`.
 *
 * It is the third answer to "what does it look like in use", after the two
 * demos it shares the bar's Examples menu with, and the one the repo cannot
 * write itself: the demos show what the set can do, this page shows what people
 * did with it.
 *
 * **The page is a heading, an ask, and the wall.** It carried a panel of three
 * numbered steps between the two, with a rendered thumbnail each, and the whole
 * block came out: submitting is one action, and a page that explains a single
 * button in three illustrated steps is instructions for something nobody found
 * hard. The lead says where to post and the button opens the composer, which is
 * the whole of it.
 *
 * **It ships with nothing on the wall.** The placeholder below is dashed rather
 * than filled: the grid is the readers' work, and seeding it with our own
 * screenshots is the page answering its own question. See `lib/featured.ts`.
 *
 * The gallery takes the wide container rather than `/install`'s prose measure:
 * the content is screenshots, and a 768px column would render three-abreast
 * masonry as a single stack of stamps.
 */
export const metadata = pageMetadata({
  path: "/examples",
  /* Word for word the `h1` below. Google rewrites a title that disagrees with
     what the page visibly leads with. */
  title: "Showcase",
  description:
    "Products and interfaces built with Keyline Icons, sent in by the " +
    "people who made them. Post a screenshot on X to be featured.",
  socialDescription:
    "Products built with Keyline Icons, sent in by the people who made them.",
})

export default function Page() {
  const entries = allFeatured()

  return (
    <>
      <SiteNav />
      <main className="mx-auto w-full max-w-360 px-6 pb-16 lg:px-8">
        {/*
          Centred, which is the two demos' header and not `/install`'s. This
          page belongs to that group: they are the three routes under Examples,
          they open on a picture rather than on prose, and a left-aligned title
          over a centred wall would be the odd one of the three. The prose
          pages keep their left margin because a measure of text reads from it.
        */}
        <header className="mx-auto max-w-2xl pt-6 pb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance">
            Showcase
          </h1>
          <p className="mt-3 text-pretty text-muted-foreground">
            Interfaces built with {SET_TITLE}, sent in by the people who made
            them. Post a screenshot on X, and the ones picked out land here.
          </p>

          {/*
            The ask, directly under the sentence that explains it. It sat at the
            foot of a panel below the wall for a while, which put the one thing
            this page wants a reader to do behind everything else on it.
          */}
          <div className="mt-7 flex justify-center">
            <PostOnX />
          </div>
        </header>

        {/*
          The wall, drawn empty until there is something real on it. The ghosts
          carried a caption, "Accepted screenshots land here", and it came out:
          the lead above already ends on that exact sentence, and saying it
          twice in one screen made the second one read as a label on a broken
          grid rather than as a promise.
        */}
        {entries.length > 0 ? (
          <FeaturedGallery entries={entries} />
        ) : (
          <FeaturedGalleryPlaceholder />
        )}

        {/*
          The way back into the set, in prose rather than a second button: the
          page's one raised control should be the ask at the top.
        */}
        <p className="mt-8 text-sm text-muted-foreground">
          Not using the set yet? Every drawing is in{" "}
          <Link
            href="/icons"
            prefetch={false}
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            the browser
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
