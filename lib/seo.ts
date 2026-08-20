import type { Metadata } from "next"

import {
  SET_LICENSE,
  SET_LICENSE_URL,
  SET_NAME,
  SET_TITLE,
} from "@/lib/site-chrome"

/**
 * The one place the public origin is written down.
 *
 * Everything a crawler reads as an address resolves against this: canonicals,
 * `og:url`, the sitemap, the `Sitemap:` line in robots.txt, `metadataBase`. A
 * second copy of the host somewhere else is the bug that ships a canonical
 * pointing at a preview deployment, and a canonical is a strong enough signal
 * that Google will follow it off the production site entirely.
 *
 * Deliberately a constant and not `process.env.NEXT_PUBLIC_SITE_URL`. An env
 * override sounds convenient and is exactly how preview URLs leak into
 * production tags: the fallback is only correct while every environment
 * remembers to set it. Previews are allowed to declare production canonicals;
 * they are not meant to be indexed, and Vercel marks them `noindex` at the
 * edge.
 *
 * No trailing slash. `absoluteUrl` adds one only where a URL genuinely has it.
 */
export const SITE_URL = "https://keylineicons.com"

/**
 * A path on this site, as an absolute URL.
 *
 * `next.config.ts` does not set `trailingSlash`, so Next serves `/demo` and
 * redirects `/demo/` to it, meaning the canonical form carries no trailing
 * slash, with the single exception of the origin, where `new URL` supplies one
 * because a bare origin has one by definition.
 *
 * Every canonical, `og:url` and sitemap entry goes through here rather than
 * being concatenated at the call site, so the two forms cannot drift apart and
 * declare two URLs for the same page.
 *
 * The trailing slash `new URL` adds to a bare origin is stripped back off.
 * Next strips it from the canonical tag anyway, normalising against
 * `trailingSlash`, so leaving it on would only mean the JSON-LD and the
 * sitemap naming a URL one character different from the one the page declares
 * canonical. Same page, two addresses, for no reason.
 */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString().replace(/\/$/, "")
}

/**
 * The card fields that describe the *site* rather than the page.
 *
 * They live here because they have to be repeated, and they have to be
 * repeated because of the single most surprising thing about App Router
 * metadata: **objects are replaced, not deep-merged.** A page exporting
 * `openGraph: { title, description, url }` does not add to the layout's
 * `openGraph`. It overwrites it, and `og:type`, `og:site_name` and `og:locale`
 * simply stop being emitted. Nothing warns; the tags are just gone.
 *
 * The same rule cost `twitter:card` its value: a page setting a Twitter title
 * dropped the layout's `summary_large_image` back to the default `summary`,
 * which renders the 1200×630 card as a small square crop.
 *
 * So both objects are built from these constants, in the layout and in every
 * page, and the layout's copy is the fallback for a route that sets nothing.
 */
export const OG_DEFAULTS = {
  type: "website",
  siteName: SET_TITLE,
  locale: "en_US",
} as const

export const TWITTER_DEFAULTS = {
  card: "summary_large_image",
} as const

/**
 * The fallback description, used for any route that has not written its own.
 *
 * It describes the site rather than a page, which is the only thing a fallback
 * can honestly do. A page that ships with this text is a page missing its
 * description. See `pageMetadata`, which makes that hard to do by accident.
 */
export const SITE_DESCRIPTION =
  `${SET_TITLE} is a free, ${SET_LICENSE}-licensed 24×24 icon set built for ` +
  `shadcn/ui, drawn on one grid in three weights: stroke, duotone and fill.`

type PageMetadata = {
  /** Route path, e.g. `/demo`. Becomes the canonical and `og:url`. */
  path: string
  /**
   * The page's own name: "Dashboard demo", not "Dashboard demo · Keyline
   * Icons". The root layout's title template appends the set name, so writing
   * it here renders it twice. Pass `{ absolute }` to opt out of the template
   * entirely; only the homepage should.
   */
  title: string | { absolute: string }
  /** This page's description. Required, on purpose. */
  description: string
  /** Card title, if the social card should read differently from the search result. */
  socialTitle?: string
  /** Card description, if the card should be shorter than the snippet. */
  socialDescription?: string
}

/**
 * Title, description, canonical and social tags for one route, together.
 *
 * The point of the helper is not brevity, it is that the canonical cannot be
 * forgotten. In the App Router, `alternates` set on a layout is inherited by
 * every route below it that does not set its own, so the tempting fix, a
 * canonical in `app/layout.tsx`, quietly makes every page in the site declare
 * itself as the homepage. Google treats `rel="canonical"` as a strong signal
 * and sitemap inclusion as a weak one, so the sitemap cannot argue back: the
 * site collapses to one indexed URL. Root sets `metadataBase` and no
 * `alternates`; pages call this and get a canonical whether or not they were
 * thinking about one.
 *
 * `og:url` is set here for the same reason and always equals the canonical.
 */
export function pageMetadata({
  path,
  title,
  description,
  socialTitle,
  socialDescription,
}: PageMetadata): Metadata {
  const url = absoluteUrl(path)
  const cardTitle =
    socialTitle ??
    (typeof title === "string" ? `${title} · ${SET_TITLE}` : title.absolute)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...OG_DEFAULTS,
      title: cardTitle,
      description: socialDescription ?? description,
      url,
    },
    twitter: {
      ...TWITTER_DEFAULTS,
      title: cardTitle,
      description: socialDescription ?? description,
    },
  }
}

/**
 * One `FAQPage` node, for folding into a page's graph.
 *
 * Three pages emit one now, so it is written once. The rule is the same on all
 * three and is the whole reason this takes the rendered array rather than
 * building its own: **the markup quotes the page.** Structured data describing
 * answers a visitor cannot see is the violation, and it is what happens the
 * moment the two are written twice.
 *
 * Worth knowing before adding one to a fourth page: Google cut FAQ rich results
 * back to well-known health and government sites in August 2023, so this
 * changes nothing about how the result looks. It is emitted because the
 * questions are genuinely on the page, and because other engines and the
 * assistants people now ask instead of searching do read it.
 */
export function faqNode({
  faq,
  path,
}: {
  faq: { question: string; answer: string }[]
  path: string
}) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  }
}

/**
 * The same node as a document of its own, for a page whose only structured data
 * is its questions. `/install` is the one; `/` and the icon pages fold the node
 * into a graph that already declares the context.
 */
export const faqJsonLd = (args: Parameters<typeof faqNode>[0]) => ({
  "@context": "https://schema.org",
  ...faqNode(args),
})

/**
 * One icon page's JSON-LD, as one `@graph`.
 *
 * Three nodes, and none of them is `SoftwareApplication`. That node describes
 * the *set*, it lives on `/` with the zero-price offer that makes "free"
 * machine-readable, and repeating it on 414 pages would be 414 claims to be the
 * application rather than one page inside it. `isPartOf` is how this page says
 * what it actually is: a page about one drawing, belonging to the set described
 * at `#icon-set`.
 *
 * The breadcrumb is the node with a visible payoff: Google renders it in place
 * of the URL in the result, so a result for this page reads
 * `Keyline Icons › Icons › bell-x` rather than a truncated path. It has to
 * mirror the breadcrumb the page actually draws, which is why both are built
 * from the same two links.
 *
 * `FAQPage` is the third, and it is the one with *no* payoff in Google: FAQ rich
 * results were cut back to well-known health and government sites in August
 * 2023, so this will not put questions under the result. It is emitted anyway
 * because the questions are genuinely on the page and other consumers read it,
 * and the rule that keeps it honest is that the strings come from the same array
 * the section renders. Markup quoting an answer the page does not show is the
 * violation, and it is the failure mode of every FAQ block written for the
 * markup rather than for the reader.
 *
 * No `ImageObject`. It is the tempting node for an icon page and it wants a
 * `contentUrl` pointing at a real image file. The drawing is inline SVG in the
 * markup and the card is a generated route whose production URL carries a build
 * hash, so any URL written here would be a guess. Structured data may only
 * describe what is actually there, and a broken `contentUrl` is worse than an
 * absent node.
 */
export function iconJsonLd({
  name,
  title,
  description,
  keywords,
  faq,
  path,
}: {
  /** The icon's own name, which is the page's heading. */
  name: string
  /** The rendered page title, so the node and the tab agree. */
  title: string
  description: string
  keywords: string[]
  /** The questions the page renders, verbatim. See the note above. */
  faq: { question: string; answer: string }[]
  path: string
}) {
  const url = absoluteUrl(path)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: "en",
        keywords: keywords.join(", "),
        // The drawing is what the page is about; the set is what it belongs to.
        about: { "@type": "Thing", name: `${name} icon` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        license: SET_LICENSE_URL,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Icons",
            // The browser, which is genuinely this page's parent now that both
            // live under `/icons`. A crumb pointing at a URL that 308s, which
            // `/` does, is a crumb Google drops.
            item: absoluteUrl("/icons"),
          },
          // The last crumb carries no `item`. It is the page you are on, and a
          // self-link in the trail is what makes Google drop the whole thing.
          { "@type": "ListItem", position: 2, name },
        ],
      },
      // Plain text, because that is what the page renders. The bare node, not
      // the document: this graph declares the context already.
      faqNode({ faq, path }),
    ],
  }
}

/**
 * The homepage's JSON-LD, as one `@graph`.
 *
 * Two nodes, because the page is two things at once: a website with a name and
 * an origin, and the icon set itself. They are linked by `@id` so a consumer
 * reads one entity described twice rather than two unrelated ones.
 *
 * What is deliberately *not* here:
 *
 * - `SearchAction`. The browser filters in place; there is no URL that runs a
 *   search, so declaring one would advertise an address that 404s.
 * - `AggregateRating`. Nothing on the page rates the set, and structured data
 *   may only describe what is actually there.
 * `FAQPage` is here again, and its history is the rule this file keeps repeating.
 * There was one, built from the array the page rendered under the icon grid; the
 * section was dropped and the node went with it, because a `FAQPage` quoting
 * answers that are not on the page is the violation an FAQ written for the
 * crawler always commits. The section is back on `/`, with a question per section
 * of the page, so the node is back too, and it is built from the array the page
 * renders, passed in for exactly that reason rather than assembled here.
 *
 * Remove the section again and remove `faq` from this call in the same change.
 *
 * `offers` at price 0 is what makes "free" machine-readable rather than a word
 * in a sentence. It is the field Google reads to render a free-application
 * result. It is only honest because there is a `LICENSE` file and the footer
 * says the same thing; the `license` property points at the licence that backs
 * it. A zero-price offer on a set that was not actually free would be a
 * structured-data violation, not a marketing choice.
 *
 * The counts are passed in rather than typed, so the markup cannot outlive the
 * set it describes.
 */
export function homeJsonLd({
  total,
  styles,
  faq,
}: {
  total: number
  styles: readonly string[]
  /** The questions the page renders, verbatim. See the note above. */
  faq: { question: string; answer: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: absoluteUrl("/"),
        name: SET_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#icon-set`,
        name: SET_TITLE,
        alternateName: SET_NAME,
        // The set's own address is the origin again. It was `/icons` for as
        // long as nothing rendered at the root and the browser was the only
        // page that could stand for the set; `app/page.tsx` is the page that
        // describes it now, and this graph is emitted from there, so a node
        // pointing anywhere else would name a URL other than the one it is on.
        url: absoluteUrl("/"),
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        description: SITE_DESCRIPTION,
        keywords: [
          "free icons",
          "icon set",
          "svg icons",
          "shadcn/ui",
          "react icons",
          "24px icons",
          ...styles.map((style) => `${style} icons`),
        ].join(", "),
        license: SET_LICENSE_URL,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        // The one number worth stating in markup: it is the page's headline
        // fact and it is read straight off disk.
        numberOfItems: total,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      // The bare node rather than `faqJsonLd`, which is the document form: this
      // graph declares the context already. Same call the icon pages make.
      faqNode({ faq, path: "/" }),
    ],
  }
}
