/**
 * The site bar's height, in px.
 *
 * The bar is `fixed`, so nothing below it reserves its space and several places
 * have to know how tall it is: the spacer that holds the page down, the scroll
 * target when a page turns, and the category rail's sticky offset. They were
 * three separate numbers and drifted every time the bar changed shape.
 *
 * It is a constant rather than a measurement because the bar is sized by its
 * contents — 12px of rail padding around a 44px panel — and reading that back
 * at runtime would mean laying out before anything could position against it.
 * Change the bar's padding or its controls' height and this moves with them.
 */
export const NAV_HEIGHT = 68

/**
 * The bar below `lg`, where its padding tightens to 4px (`py-1 lg:py-3` in
 * `site-nav-bar.tsx`): 4 + 44 + 4. The spacer under the bar (`h-13 lg:h-17`),
 * the browser's sticky Browse row and both of its scroll targets read this
 * height on narrow screens; change the collapsed padding and all of them move
 * through these two numbers.
 */
export const NAV_HEIGHT_NARROW = 52

/**
 * What the set is called.
 *
 * One constant because the name is rendered in five places — the nav's brand,
 * the hero's heading, and three route titles — and a rename that misses one of
 * them is the kind of thing nobody notices until it is on a screenshot.
 *
 * "Shadcn Icons" read as first-party rather than as compatible: it says whose
 * icons these are, not what they are for. The relationship belongs in the
 * tagline, where it can be stated exactly and claims nothing.
 *
 * Changing it here changes the whole site, and only the site. The GitHub repo,
 * the local folder and the Figma file were renamed separately, by hand — this
 * constant cannot reach any of them, so a future rename is four jobs and not
 * one.
 *
 * `SETTINGS_COOKIE` deliberately still carries the old name. See there.
 */
export const SET_NAME = "Keyline"

/** The full mark: the name plus the noun. */
export const SET_TITLE = `${SET_NAME} Icons`

/** What the set is for, stated so it claims compatibility and nothing more. */
export const SET_TAGLINE = "Built for shadcn/ui"

/**
 * How it was made, in the covers' words.
 *
 * Avoids "built", which the tagline already has: two of them either side of a
 * divider in one short line reads as a copy-paste rather than as a sentence.
 *
 * Nothing on the site renders this any more. The hero carried it and now names
 * the three weights instead, for the reason written down there. It stays
 * because `pipeline/build-cover.mjs` paints this exact sentence onto the Figma
 * and social covers, and a second wording of one claim is how two surfaces end
 * up disagreeing.
 */
export const SET_CREDIT = "An icon set crafted with AI"

/**
 * The licence, named in one place because three of them have to agree.
 *
 * The footer states it, the homepage's structured data declares it, and the
 * search copy calls the set "free" on the strength of it. That last one is the
 * reason this is a constant and not a string in a footer: "free" is a claim,
 * and a claim needs something behind it. Before the `LICENSE` file existed the
 * footer read "All rights reserved", which is the opposite of what the meta
 * description would have been promising.
 *
 * Change the licence and the whole chain has to move together, including the
 * word "free" in `lib/seo.ts` and on the social card.
 */
/**
 * The short identifier, for compounds and for the social card.
 *
 * Kept separate from `SET_LICENSE_NAME` because the two do different jobs and
 * one string cannot do both: this one has to read correctly inside
 * "MIT-licensed", where the full name would give "MIT License-licensed".
 */
export const SET_LICENSE = "MIT"

/** The proper noun, for prose and for the footer's link text. */
export const SET_LICENSE_NAME = `${SET_LICENSE} License`

/**
 * Where the licence is defined. Read by the footer link and by the JSON-LD.
 *
 * Points at the canonical text rather than at this repo's own `LICENSE`, which
 * would be the more useful destination for a person: it is the actual grant,
 * with the year in it. `LICENSE` is still in the repo for anyone who clones it,
 * and `SET_REPO_URL` now links it from the same footer.
 *
 * **This is the identifier, not the reading.** It is what `license` in the
 * JSON-LD has to be, because a machine matching licences matches on that URL
 * and not on a page of ours explaining one. People go to `LEGAL.license`
 * instead, which prints the same text with the part nobody can read out of it:
 * that the drawings are covered as well as the code, and that the name is not.
 * The footer link moved there for that reason; this constant did not move with
 * it, and the two are not interchangeable.
 */
export const SET_LICENSE_URL = "https://opensource.org/licenses/MIT"

/**
 * The public repo. Read by the footer.
 *
 * This was deliberately absent, on the grounds that a repo link puts the
 * author's GitHub handle on every page of the site. Moving the project to the
 * `keyline-icons` organisation removed the objection rather than answering it:
 * the URL now carries the project's name and no personal handle at all.
 *
 * Worth having back. It is the evidence behind the word "free" in the search
 * copy and on the card, better evidence than the canonical licence text, and
 * for an open-source set it is the one destination a visitor is most likely to
 * be looking for.
 *
 * `owner/repo` is the constant and the URL is built from it, because two very
 * different things need the same pair of names now: this link and the API path
 * `lib/github.ts` calls for the star count. Written out twice, they are free to
 * drift, and the failure that produces is a counter quietly reporting a
 * different repository than the link beside it opens.
 */
export const SET_REPO_SLUG = "keyline-icons/keyline-icons"

export const SET_REPO_URL = `https://github.com/${SET_REPO_SLUG}`

/**
 * The repo's issue tracker, which is the whole of the site's contact address.
 *
 * There is no support inbox and no contact form, and the legal pages name this
 * rather than printing a mailbox: a set with one maintainer and no company
 * behind it is reachable where the work is, and an address on the page is an
 * address in every scraper's list within a week.
 *
 * It is a *public* tracker, which is the one thing that has to travel with the
 * link. `/legal/privacy` says so where it asks people not to put personal
 * details in one.
 */
export const SET_ISSUES_URL = `${SET_REPO_URL}/issues`

/**
 * Where "request an icon" goes, from the grid's no-results state.
 *
 * A search that found nothing is the one moment the set's gaps are visible to
 * the person who cares, so it is the moment to ask — and an issue is where a
 * request survives long enough to be drawn, unlike a reply in a timeline.
 */
export const SET_REQUEST_URL = `${SET_ISSUES_URL}/new`

/*
  `SET_FEATURED_URL` lived here and pointed at a `featured_example.yml` issue
  form. Both are gone: the showcase takes submissions as public posts on X now,
  through `featuredIntent` below, and an issue template nothing links to is a
  path that rots unwatched.
*/

/**
 * The author's X account, linked from the bar.
 *
 * A personal handle, unlike `SET_REPO_URL`, which is deliberately the
 * organisation's. That is a change of policy for one link and not an accident:
 * the set has no account of its own, and an icon library with no way to reach
 * whoever draws it is harder to trust than one that names a person. If the
 * project ever gets its own account, this is the only line that moves.
 */
export const SET_X_HANDLE = "iszafar92"

export const SET_X_URL = `https://x.com/${SET_X_HANDLE}`

/**
 * What "post a screenshot" prefills, and the composer it opens.
 *
 * **The set is named before the handle.** The first version prefilled "Built
 * with @iszafar92", which says the wrong thing in the wrong order: read plainly
 * it credits a person for the reader's own work, and it never mentions the
 * library at all. The sentence has to carry the set's name, and the mention is
 * there to reach whoever curates, which is a separate job.
 *
 * **There is more than one of them.** A single prefill means every submission
 * on X arrives worded identically, which reads as a bot the tenth time someone
 * sees it and gives the maker nothing of their own to say. One is picked when
 * the button is clicked, so two people who post on the same day do not post the
 * same sentence.
 *
 * Each is a short, finishable opener rather than a finished post. A prefilled
 * paragraph in someone else's voice is the thing people select and delete; a
 * half-sentence is the thing they add to. The trailing space is deliberate: the
 * cursor lands after it, ready to keep typing.
 *
 * `intent/post` rather than the older `intent/tweet`, which still resolves but
 * redirects. Nothing here can tell whether it still will.
 *
 * The submission path is a public post rather than an issue because the people
 * with a screenshot worth showing are on X and not all of them have a GitHub
 * account, which was a real barrier on a page whose entire job is to be easy to
 * get into. What it costs is the explicit rights checkbox the issue form
 * carried. A public post tagging the account is weaker consent than a ticked
 * box, so the page says plainly that posting is what grants it, and every card
 * links back to the post it came from.
 */
export const SET_FEATURED_MESSAGES = [
  `Built with ${SET_TITLE}`,
  `Shipped this with ${SET_TITLE}`,
  `Redrew our UI with ${SET_TITLE}`,
  `Every glyph here is ${SET_TITLE}`,
  `New screens, drawn with ${SET_TITLE}`,
  `Swapped our icon set for ${SET_TITLE}`,
] as const

/** One opener, wrapped in the composer URL that carries the mention. */
export const featuredIntent = (message: string) =>
  `https://x.com/intent/post?text=${encodeURIComponent(
    `${message} @${SET_X_HANDLE} `
  )}`

/**
 * Where the Figma button on an icon page goes.
 *
 * **The published Community file.** This stood at `@keylineicons`, the team
 * profile, for as long as the file was unpublished: a visitor clicking it from
 * `bell-x` landed on a profile with nothing on it. That was the one link on the
 * site knowingly ahead of reality, carried on the basis that publishing was
 * days away rather than months, and it now points at the file it was promising.
 *
 * The profile is still linked, from the bar and the footer, through
 * `SET_FIGMA_PROFILE_URL`. The two are different claims: this one is where the
 * set can be opened, that one is where the work comes from.
 *
 * Empty disables it. Everything that renders the button is gated on this being
 * a non-empty string rather than on a guess, because a dead "Open in Figma" on
 * 503 pages costs the click and the trust, and it is the kind of link nobody
 * re-tests once shipped.
 *
 * One link, not one per icon: a deep link into a Figma node needs that node's
 * id, and nothing in this repo records them. `pipeline/check-figma.mjs` reads
 * the file through the plugin API rather than storing a map of ids, so a
 * per-icon Figma URL would have to be generated first.
 */
export const SET_FIGMA_URL =
  "https://www.figma.com/community/file/1672255957017818239/keyline-icons"

/**
 * The Community plugin, which is the third Figma link on this site and the only
 * one that is not a place to look at the set.
 *
 * The three are worth keeping straight, because they answer three questions:
 * `SET_FIGMA_URL` is where the set can be opened, `SET_FIGMA_PROFILE_URL` is
 * who made it, and this one is how an icon gets onto a canvas without opening
 * either. A reader who wants an icon in the file they already have open wants
 * this one, and until it was published there was nothing on the site to give
 * them.
 *
 * **It updates on a different clock from everything else here.** The plugin
 * fetches `packages/figma-plugin/icons.json` from `@main` on jsDelivr rather
 * than bundling it, so what it serves is whatever `main` holds, while the site
 * renders whatever the deployed commit holds. The two agree in the normal case
 * and diverge for as long as a branch is unmerged, which is why nothing on this
 * site should ever quote a count *for the plugin*: it can only quote its own.
 *
 * Gated on being non-empty like the other two, for the reason `SET_FIGMA_URL`
 * gives.
 */
export const SET_FIGMA_PLUGIN_URL =
  "https://www.figma.com/community/plugin/1672557050316875938/keyline-icons"

/**
 * The set's Figma Community profile, linked from the bar and the footer.
 *
 * Deliberately not `SET_FIGMA_URL`. That constant means one specific thing, the
 * published Community file, and the icon page's "Open in Figma" button reads it
 * on that understanding.
 *
 * A profile is a different claim and belongs beside X and GitHub: it is where
 * the work comes from, not where the set can be opened. Both now resolve, so
 * the split is no longer about one of them being empty. The bar and the footer
 * keep pointing here because a row of publisher links is a row of publishers,
 * and someone following the Figma logo out of the chrome is asking who made
 * this rather than asking to open one file.
 *
 * `@keylineicons` is a team Community profile rather than the author's personal
 * one, which is the same choice the GitHub organisation and the npm scope make:
 * the publisher is the project. Figma has no way to move a published resource
 * between profiles, so this had to be settled before anything was published
 * rather than after.
 */
export const SET_FIGMA_PROFILE_URL = "https://www.figma.com/@keylineicons"

/**
 * The set's paper.design file, which the landing page's Paper tab opens.
 *
 * Unlike `SET_FIGMA_URL` this is the file itself rather than a profile standing
 * in for one, because the file exists: 32 artboards built from
 * `previews/paper/` by the import in `pipeline/build-paper.mjs`'s manifest. It
 * is only a working link while the file stays shared, and nothing here can tell
 * whether it is — Paper's sharing is not visible to the repository, so this is
 * the one link on the site whose target has to be re-tested by opening it.
 *
 * One link, not one per icon, for the same reason the Figma constant gives: a
 * deep link needs a node id, and nothing records them.
 */
export const SET_PAPER_URL =
  "https://app.paper.design/file/01M0C1A8JM2Q96K8FTA6RS7WCX"

/**
 * Where the bar's primary button goes.
 *
 * It used to be "Get started", pointing at the icon grid one scroll below it,
 * which spent the loudest control on the page sending people somewhere they
 * had already arrived. Sponsorship is the one thing the site asks for and
 * cannot get any other way, so it takes the slot.
 *
 * The org's Sponsors page, matching `SET_REPO_URL`. GitHub answers this URL
 * with a 404 until Sponsors is enabled on the account, and nothing here can
 * detect that, so enabling it is a manual step that belongs with publishing
 * the repo.
 */
export const SET_SPONSOR_URL = "https://github.com/sponsors/keyline-icons"

/**
 * Who holds the copyright: the project, deliberately.
 *
 * `SET_TITLE` serves as the holder in both places that name one, the footer
 * notice and `LICENSE`, so the two agree. Naming the author personally would
 * be the more conventional choice for MIT, and it was briefly what this said,
 * but the author does not want their legal name in the repo or on the page.
 * Projects as copyright holders are common enough in practice that this costs
 * nothing worth having.
 *
 * If a company or a person ever needs to be named, change `LICENSE` and this
 * line together. A footer asserting a different holder than the licence file
 * is the kind of contradiction that only matters on the day it matters.
 *
 * The ™ stays on the name regardless. MIT grants rights in the code; it grants
 * nothing in what the set is called.
 */

/**
 * The three legal routes.
 *
 * Named here rather than typed at each call site because four things point at
 * them: `SITE_LINKS` below, each page's own `pageMetadata` and `LegalPage`, the
 * footer's licence link, and the cross-links the pages draw to each other. A
 * path written five times is a path that gets renamed four times.
 *
 * Under one folder rather than at the root. They are the only pages on the site
 * nobody arrives at on purpose, and grouping them says that in the URL: `/terms`
 * beside `/icons` and `/install` reads as a fourth thing the site does.
 */
export const LEGAL = {
  terms: "/legal/terms",
  privacy: "/legal/privacy",
  license: "/legal/license",
} as const

/**
 * Every destination on the site, in bar order.
 *
 * The bar and the footer both render this list. They were two literals for a
 * while, which is one list too many: a page added to the top of the site is
 * exactly the kind of change that lands in the bar and is forgotten at the
 * bottom, where nobody looks until the sitemap disagrees with the nav.
 *
 * `app/sitemap.ts` now reads it too, which closes that last gap: the sitemap
 * can no longer disagree with the nav because it is the same list. That is why
 * each entry carries its own `priority`: a route's weight in search is a fact
 * about the route, and the alternative is a second list of paths in the
 * sitemap that has to be kept in step by hand.
 *
 * A route that should stay out of search sets `sitemap: false` here *and*
 * `robots: { index: false }` in its own metadata. The two are not
 * interchangeable: leaving a page out of the sitemap hides it from a crawler
 * that was told where to look, but says nothing to one that arrives by link.
 */
export type SiteLink = {
  href: string
  label: string
  /**
   * The sitemap's `<priority>`. Relative weight within this site only. It says
   * nothing about how this site ranks against another, and Google largely
   * ignores it. Set anyway because other crawlers read it and it costs nothing.
   */
  priority: number
  /** Set `false` to keep a linked route out of the sitemap. Omit otherwise. */
  sitemap?: false
  /**
   * Set `false` to keep a route out of the bar and the phone menu. Omit
   * otherwise.
   *
   * The three legal routes use it for the obvious reason: nobody navigates to a
   * privacy policy from a bar, and three more entries would push the pages
   * people came for off a phone's menu. They are linked from the footer, which
   * is where small print is looked for.
   *
   * `/` uses it too, and for a different reason: the bar already links home:
   * the brand at the left edge is the home link on every site anyone has used.
   * A "Home" row beside it would be a second control pointing at the same page,
   * which is the kind of thing that makes a bar longer without making it more
   * useful.
   *
   * It stays in `SITE_LINKS` regardless, because this list is also what
   * `app/sitemap.ts` reads, and a homepage missing from the sitemap is the one
   * omission that would be actively embarrassing. The footer lists it too: a
   * footer has the room, and it is the bottom of a long page, which is exactly
   * where a way back to the top of the site belongs.
   */
  bar?: false
  /**
   * The bar menu this route hangs under, if any. A route with no `group` is a
   * link in the bar; routes sharing one are gathered into a dropdown named by
   * it.
   *
   * Only the *bar* reads this. The footer still lists every route flat, because
   * a footer has the room the bar does not and a menu at the bottom of a page
   * is a click asking to be a link. The sitemap ignores it entirely: how a
   * route is presented has nothing to do with whether it is indexed.
   */
  group?: string
  /**
   * One line on what the page is, for the menu that shows it. Only routes in a
   * `group` need one — a bar link has its label and the page behind it.
   */
  description?: string
  /**
   * Set `true` for a legal page. Only the footer reads it, and only to put
   * these links in their own small row beside the copyright rather than in the
   * row that lists the site.
   *
   * A flag rather than a second array, because the sitemap has to keep reading
   * one list: a legal page is exactly the kind of route that would be added to
   * a `LEGAL_LINKS` literal and never reach `app/sitemap.ts`, and nothing would
   * fail. The rest of the chrome ignores it.
   */
  legal?: true
}

export const SITE_LINKS: readonly SiteLink[] = [
  // The landing page. It is the set's own address and the first entry rather
  // than an afterthought at the end, because this list is read in order by the
  // footer and by the sitemap.
  //
  // For a while there was no such page: the browser moved off `/` and the
  // origin forwarded to it. `next.config.ts` records why the redirect went
  // away. `bar: false` because the brand mark is already the way home.
  { href: "/", label: "Home", priority: 1, bar: false },
  // The browser, and every icon's own page under it. It was `/` until the set
  // was gathered under one folder, and it keeps the weight it earned there:
  // still 1.0, because the grid is the page most visitors actually want, and
  // the landing page's job is to send them to it.
  { href: "/icons", label: "Icons", priority: 1 },
  // Above the demos at 0.9: the demos show the set working, this one is the
  // page that tells someone how to use it, which is what most visitors arriving
  // from a search for "shadcn icons" actually came for.
  //
  // It lived at `/shadcn`, labelled "shadcn/ui", and both were too narrow for
  // what the page is. It covers copying an SVG, the React package, sizing,
  // stroke weight, migrating off lucide and the three styles; shadcn/ui is the
  // context for that, not the subject. A keyword in the URL was also the wrong
  // side of the line the route policy draws: "shadcn icons" belongs to `/`, and
  // a second page carrying the term in its address is how two pages end up
  // competing for one query. `next.config.ts` redirects the old URL.
  { href: "/install", label: "Install", priority: 0.9 },
  // Both demos moved under one bar menu. Four links across the bar made the two
  // that are the same kind of thing look like two more places to go, and the
  // labels could not say what either page was: "Mobile" and "Dashboard" name a
  // screen size and a layout, not what is being shown. A menu has room for the
  // sentence that fixes that.
  //
  // Mobile first. This list is read in three places, so the order set here is
  // the order of the menu, the footer row and the sitemap at once.
  {
    href: "/demo/mobile",
    label: "Mobile",
    priority: 0.8,
    group: "Examples",
    description: "Phone screens, at the sizes icons ship in",
  },
  {
    href: "/demo",
    label: "Dashboard",
    priority: 0.8,
    group: "Examples",
    description: "A full shadcn admin drawn with the set",
  },
  // The community gallery, third in the menu the demos already share: all
  // three answer "what does it look like in use", the demos with pages this
  // repo builds and this one with screenshots other people send in. Below the
  // demos at 0.7 because its content is theirs rather than ours, and the page
  // is only as good as what has been submitted.
  //
  // Labelled for what it is rather than for the folder it sits in: "Examples"
  // is the menu, and a row repeating the menu's own name says nothing about
  // which of the three it is.
  {
    href: "/examples",
    label: "Showcase",
    priority: 0.7,
    group: "Examples",
    description: "Interfaces built with the set, sent in by their makers",
  },
  // What changed and when, off the same commit dates every icon page prints.
  //
  // Last, and lowest of the hand-written pages. It is worth indexing and worth
  // linking, and it is nobody's landing page: the searches it could take are
  // the set's own name and an icon's, and both are spoken for. Below the icon
  // pages at 0.6 for the same reason: a drawing is what someone came for, and
  // this is the page you read once you already have the set.
  { href: "/changelog", label: "Changelog", priority: 0.5 },
  /*
    The legal pages, last and lowest.

    Indexed rather than hidden, which is the choice worth stating because the
    instinct is the other way. A licence page is genuinely searched for, by
    people deciding whether they may ship a set in a paid product, and it is one
    of the few pages here that answers a question `/icons` cannot. A privacy
    policy nobody can find is also worth less than one they can, since its
    entire job is to be checkable. So they carry `sitemap` and `robots` defaults
    like every other page, and take 0.3: real content, and never the answer to
    anything anyone types about icons.

    Terms first, then privacy, then the licence, which is the order they are
    read in and the order the footer prints them.
  */
  { href: LEGAL.terms, label: "Terms", priority: 0.3, bar: false, legal: true },
  {
    href: LEGAL.privacy,
    label: "Privacy",
    priority: 0.3,
    bar: false,
    legal: true,
  },
  {
    href: LEGAL.license,
    label: "License",
    priority: 0.3,
    bar: false,
    legal: true,
  },
]

/**
 * What the footer's main row lists: every page except the legal ones, which get
 * their own row under the copyright notice.
 *
 * The split is about weight rather than about tidiness. A footer row is read as
 * "here is the site", and Terms sitting between Dashboard and Changelog offers
 * a privacy policy as though it were somewhere to go next.
 */
export const SITE_FOOTER_LINKS = SITE_LINKS.filter((link) => !link.legal)

/** The legal row, in the order `SITE_LINKS` declares them. */
export const SITE_LEGAL_LINKS = SITE_LINKS.filter((link) => link.legal)

/**
 * Every route the chrome offers: the whole list, minus what `bar: false` holds
 * back. The phone menu renders this flat, since it is the whole bar below `md`.
 */
export const SITE_NAV_LINKS = SITE_LINKS.filter((link) => link.bar !== false)

/** The bar's own reading of it: the plain links, then each menu. */
export const SITE_BAR_LINKS = SITE_NAV_LINKS.filter((link) => !link.group)

/**
 * Grouped routes, keyed by the menu they belong to, in the order they appear.
 *
 * A `Map` rather than an object so the menus come out in the order the list
 * declares them, which is the order the bar draws them in.
 */
export const SITE_BAR_MENUS = SITE_LINKS.reduce((menus, link) => {
  if (!link.group) return menus
  menus.set(link.group, [...(menus.get(link.group) ?? []), link])
  return menus
}, new Map<string, SiteLink[]>())

/**
 * The one link that counts as current: the longest whose path contains this
 * one.
 *
 * `/demo/mobile` sits under `/demo`, so a plain prefix test lights both at once
 * — the page looks like it is two places. Picking the most specific match keeps
 * a parent lit on its own deeper routes while a listed child takes precedence
 * over it. The `+ "/"` matters too: without it `/demo` also claims a
 * `/demonstration`.
 *
 * Lives here rather than in `site-nav.tsx` because the dashboard renders its
 * own chrome and needs the same answer. It was copied there first, and the copy
 * reintroduced the double-lit bug this function exists to fix.
 *
 * There was a branch here for `/`, which had to claim `/icons/<name>` by hand
 * because a prefix test on `/` matches every route on the site. Moving the
 * browser to `/icons` deleted it: an icon's page is now genuinely under the
 * link that owns it, so the same rule that keeps `/demo` lit on `/demo/mobile`
 * covers it, and one function does the whole bar.
 *
 * `/` is back in `SITE_LINKS` as the landing page, and it needs no branch of
 * its own: the prefix test appends a slash, so `/` only ever matches by the
 * equality test, and `//` matches nothing. The old bug came from testing
 * `startsWith(href)` without it.
 */
export function currentHref(pathname: string) {
  return SITE_LINKS.map((link) => link.href)
    .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0]
}
