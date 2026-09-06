import history from "@/lib/icon-history.json"
import { SET_TITLE } from "@/lib/site-chrome"

/**
 * The writing about the set: one post per update, newest first.
 *
 * **Why this exists at all, given `/changelog`.** The changelog is generated.
 * It answers "what moved" off git and nothing else, which is the right answer
 * to that question and the only one it can keep true without anyone
 * maintaining it. What it structurally cannot carry is *why* something moved:
 * that a drawing was a duplicate of another under a second name, that a grey
 * plate was standing outside its own outline, that seven icons were drawn and
 * then turned down. None of that is derivable from a diff, and all of it is
 * the part a reader actually finds useful.
 *
 * So the two are deliberately different documents about the same events. The
 * changelog is the record. This is the account.
 *
 * **The body is data, not prose in a file.** There is no MDX here and adding a
 * markdown pipeline for it would be the wrong trade: the figures in these
 * posts are not images, they are the set's own drawings rendered from
 * `icons/`, and half the point of writing the post on this site rather than
 * somewhere else is that a figure showing `bell` shows whatever `bell` is
 * today. A markdown file would have to reference a PNG, which is a picture of
 * an icon and starts rotting the moment the icon is redrawn.
 *
 * The prose blocks carry plain strings. There is no inline markup and that is
 * on purpose: every post so far wants links and emphasis at paragraph level at
 * most, and a mini-markdown parser is how a content model grows a rendering
 * bug. `link` is a block, not a syntax.
 *
 * **Every icon list is a `*_ICON_NAMES` const.** `pipeline/check-demos.mjs`
 * finds those by name under `lib/` and resolves each one against `icons/`, so
 * a rename breaks CI here rather than leaving a hole in a published article.
 * Names written inline inside the blocks below would not be checked by
 * anything. If a figure needs icons, give the list a name up here first.
 */

/**
 * One drawing a `diagnostic` panel lays down, and which of its states to take.
 *
 * `before` and `after` are the two documents git holds for a redraw, out of
 * `lib/icon-history.json`. `before` is the only place a superseded drawing
 * still exists: this repository does not contain it any more, which is exactly
 * why a figure about a correction has to come from there rather than from
 * `icons/`.
 *
 * `current` is the drawing as it stands today. Use it for the *other* half of
 * a comparison between two different names, where there is no correction and
 * no history to take, only two things that either coincide or do not.
 */
export type DiagnosticRef = {
  name: string
  take: "before" | "after" | "current"
}

export type DiagnosticPanel = {
  /** What this panel is looking at. Printed above it. */
  title: string
  /** Painted first, in the first ink. */
  a: DiagnosticRef
  /** Painted over it, multiplied, in the second ink. */
  b: DiagnosticRef
  /**
   * The crop, in grid units. Omit for the whole 24 x 24.
   *
   * A figure usually wants two panels: the whole drawing, so a reader knows
   * where they are, then the crop, so they can see the thing at all. Pick the
   * crop by rendering candidates rather than by reasoning about coordinates.
   */
  viewBox?: string
  /** The finding, in three or four words, under the panel. */
  verdict?: { text: string; tone: "bad" | "good" }
}

/** One drawing, shown at the size the set is used at. */
export type BlogFigure =
  /**
   * A row of drawings. The default reading of "show me the new icons", and
   * what most sections in a release post want.
   */
  | { kind: "grid"; names: readonly string[]; caption: string }
  /**
   * A redrawn icon as the change itself, before beside after.
   *
   * The two documents come out of git, via `lib/icon-history.json`, which is
   * the only place they exist: the "before" is a drawing this repository no
   * longer contains. See `redrawnPairs` in the renderer for the lookup, and
   * for the reason it searches the released entries as well as the unreleased
   * one.
   */
  | { kind: "pairs"; names: readonly string[]; caption: string }
  /**
   * Two drawings superimposed, so the difference between them paints itself.
   *
   * **This is the figure that actually explains a fault, and it replaced a
   * side-by-side crop that did not.** Before beside after asks a reader to
   * hold two pictures in their head and subtract one from the other, which
   * nobody does; at the sizes these faults live at there is nothing to see
   * anyway. Laid on top of each other there is no subtracting to do. What only
   * the first one painted comes out in one ink, what only the second painted
   * comes out in another, and everything both of them painted goes dark. The
   * fault is the coloured sliver, and it is the only coloured thing in the
   * frame.
   *
   * It reads either way round, which is why it is one figure kind and not two:
   * point it at one drawing's two states and the colour is a correction, point
   * it at two different drawings and the colour is the distance between them.
   * The second is how this post shows that `git-merge` and `git-branch` were
   * the same picture, and it is the strongest image in it, because a duplicate
   * overlaid on its original has no coloured sliver at all. A figure whose
   * finding is a blank is a finding nothing else states as plainly.
   *
   * `legend` is required rather than optional for that reason: the inks mean
   * whatever the panels are comparing, and a reader cannot guess which.
   */
  | {
      kind: "diagnostic"
      panels: readonly DiagnosticPanel[]
      caption: string
      /** What each of the three inks means in this figure. Three short phrases. */
      legend: { a: string; b: string; both: string }
    }

export type BlogBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string; id: string }
  | { kind: "list"; items: readonly string[] }
  /** A pulled-out line. Used for the one sentence a section is really about. */
  | { kind: "note"; text: string }
  | { kind: "link"; href: string; label: string; text: string }
  | { kind: "figure"; figure: BlogFigure }

export type BlogPost = {
  /**
   * The URL segment, and the one field that must never change once a post is
   * up. A slug rewrite is a 404 for every link anyone has already shared.
   *
   * Named for the story rather than for a version. The batch below is not
   * tagged yet — `0.3.0` is the newest tag on the day it went up — and a URL
   * announcing a version that has not been cut is a URL that has to be
   * corrected later.
   */
  slug: string
  /**
   * The `h1`, the `<title>` and the card headline, in that order of authority.
   * `pageMetadata` appends the set name to the tab title; this is the page's
   * own name and nothing else.
   */
  title: string
  /** The search snippet. Written for a result, so it says what is inside. */
  description: string
  /** The line under the heading. Shorter, and written for a reader who clicked. */
  standfirst: string
  /**
   * The release this post is about, if it is about one.
   *
   * Set it as soon as the batch has a version it is *going* to ship as, not
   * once it has shipped: nothing here announces it until the tag exists. See
   * `postHeadline` and `postVersionLabel`, which both check
   * `lib/icon-history.json` and print "Unreleased" in the meantime, the same
   * word `/changelog` heads untagged work with.
   *
   * Omit it for a post that is not about a release. There will be some.
   */
  version?: string
  /** ISO date. Drives `datePublished`, the printed date and the sitemap. */
  date: string
  /** ISO date of the last substantive edit, or the publication date. */
  updated: string
  /** Minutes, rounded. Printed on the index card, and honest rather than flattering. */
  readingMinutes: number
  /**
   * The drawings this post is about, most representative first.
   *
   * **Enough of them to be a picture.** The first version of this field held
   * six names and the index card drew them at 24px in a bar, which read as a
   * toolbar somebody had left at the top of the card rather than as an image
   * of anything. A card's picture has to be a picture: `BlogThumbnail` packs
   * the whole list into a full-bleed panel and lets it run off the edges, the
   * same argument `components/icon-wall.tsx` makes on the landing page, where
   * two hundred glyphs behind the headline are the evidence for a number that
   * would otherwise just be a claim.
   *
   * Forty or so is the working size: enough to fill three rows at the card's
   * width without the panel having to repeat anything. Fewer is fine and the
   * panel simply carries fewer rows.
   *
   * **The order is load-bearing at both ends.** The social card takes the
   * first six through `BLOG_SOCIAL_CARD_ICONS`, because a 1200x630 card has
   * room for six drawings at a size worth looking at and no more, so the six
   * that say which post this is go first. The panel takes all of them and
   * fades out at the top and bottom, so whatever is last is the half-row that
   * disappears into the edge.
   */
  thumbnail: readonly string[]
  /**
   * Terms this post is genuinely about, for the `keywords` property on the
   * JSON-LD node. Not a place to list things the post does not cover: a
   * keyword the page does not support is the oldest way to be ignored.
   */
  keywords: readonly string[]
  body: readonly BlogBlock[]
}

export const BLOG_SEGMENT = "/blog"
export const postHref = (slug: string) => `${BLOG_SEGMENT}/${slug}`

/**
 * What the blog is, in one sentence, for the index page's description and for
 * the `Blog` node in its structured data.
 *
 * Here rather than in `lib/seo.ts` beside the other descriptions, because that
 * file imports this one for the route: the blog owns its own address and its
 * own sentence, and the SEO helpers read them. The other way round is a cycle.
 */
export const BLOG_DESCRIPTION =
  `How ${SET_TITLE} gets drawn: what shipped in each update, why a drawing ` +
  `was redrawn, and the faults that only show up at eight times size.`

/**
 * Every version that has actually been tagged, straight out of the generated
 * history.
 *
 * **The JSON rather than `SET_RELEASES` from `lib/icons.ts`, and this is a
 * trap worth knowing.** That module reads the icon directories off disk, so it
 * pulls `node:fs` in with it. This file is imported by `lib/seo.ts`, and
 * `lib/seo.ts` is imported by `components/share-dialog.tsx`, which is a client
 * component. Reaching for the tidier import would put `fs` in a browser bundle
 * and break the build somewhere that looks nothing like this line.
 *
 * The JSON is the same source `SET_RELEASES` is built from, so the two cannot
 * disagree about which versions exist.
 */
const RELEASED_VERSIONS: readonly string[] = (
  (history as { releases?: { version: string }[] }).releases ?? []
).map((release) => release.version)

export const isReleased = (version?: string) =>
  Boolean(version && RELEASED_VERSIONS.includes(version))

/**
 * The post's title as every surface prints it: the `h1`, the `<title>`, the
 * card headline, the index entry and the breadcrumb.
 *
 * **The version goes in front once, and only once the tag exists.** A post
 * about a release wants to be findable by that release, which is why
 * "Tailwind CSS v4.3: ..." is the shape every good release post uses. What it
 * must not do is name a version that has not been cut. This repository has
 * shipped that bug twice from the other direction, announcing work under a tag
 * it was not in, and the changelog's answer is to head untagged work
 * "Unreleased" until the tag lands.
 *
 * So the headline graduates on its own. Write `version: "0.3.1"` on the post
 * the day the branch is opened; the title stays bare until `0.3.1` appears in
 * `lib/icon-history.json`, and the next build after the tag adds the prefix
 * everywhere at once. Nobody has to remember to come back and edit it.
 *
 * **The prefix is the bare version, not "Keyline Icons v0.3.1".** The root
 * layout's title template already appends the set name, so spelling it out
 * here renders "Keyline Icons v0.3.1: ... · Keyline Icons" in the tab and on
 * every card. That was written the long way first and caught by rendering a
 * released version rather than by reading the code, which is the only way this
 * class of mistake ever surfaces.
 *
 * One function rather than a string on the post, because five surfaces print
 * this and a second spelling on any of them is a title that disagrees with the
 * page it is on, which is the one thing Google rewrites.
 */
export const postHeadline = (post: BlogPost) =>
  isReleased(post.version) ? `v${post.version}: ${post.title}` : post.title

/**
 * What the meta column prints above the date: the version, or the fact that
 * there is not one yet.
 *
 * Null for a post that is not about a release at all, which is not the same as
 * a release that has not happened.
 */
export const postVersionLabel = (post: BlogPost) =>
  post.version
    ? isReleased(post.version)
      ? `v${post.version}`
      : "Unreleased"
    : null

/**
 * The set's own author, for the `author` node and the byline.
 *
 * One constant rather than a field per post: this is a project blog with one
 * writer, and a per-post author field would be four posts of the same string
 * waiting for one of them to be spelled differently.
 */
export const BLOG_AUTHOR = "Zafar Ismatullaev"

/* ------------------------------------------------------------------------ *
 * The 0.3.1 batch.
 * ------------------------------------------------------------------------ */

/**
 * The parcel's modifier set, which is the batch's clearest single argument:
 * which modifiers a base takes is a question the set already answers, and
 * these were read off the six bases that carry arrows rather than chosen.
 */
export const BLOG_PACKAGE_ICON_NAMES = [
  "package",
  "package-plus",
  "package-minus",
  "package-check",
  "package-x",
  "package-alert",
  "package-arrow-up",
  "package-arrow-down",
  "package-arrow-left",
  "package-arrow-right",
] as const

/** Both glasses, with the five signs each. `search-2` is the round lens. */
export const BLOG_SEARCH_ICON_NAMES = [
  "search-plus",
  "search-minus",
  "search-check",
  "search-x",
  "search-list",
  "search-2-plus",
  "search-2-minus",
  "search-2-check",
  "search-2-x",
  "search-2-list",
] as const

export const BLOG_CLOUD_ICON_NAMES = [
  "cloud-plus",
  "cloud-minus",
  "cloud-check",
  "cloud-x",
  "cloud-alert",
] as const

export const BLOG_APP_ICON_NAMES = [
  "app-plus",
  "app-minus",
  "app-check",
  "app-x",
  "app-dot",
] as const

/** The four that came out of one drawing: a canopy, a hem and a pole. */
export const BLOG_UMBRELLA_ICON_NAMES = [
  "umbrella",
  "umbrella-closed",
  "umbrella-off",
  "parasol",
] as const

/** The rest of the batch, the ones that belong to no family. */
export const BLOG_SINGLES_ICON_NAMES = [
  "briefcase",
  "bug",
  "crown",
  "flag",
  "flag-chequered",
  "traffic-light",
  "credit-card-2",
  "settings-dot",
  "replay",
  "move",
  "maximize-2",
  "circle-dashed-play",
  "circle-progress-play",
] as const

/**
 * The duplicate and the drawing it was a copy of, side by side.
 *
 * `git-branch` is here so the figure can make the point the prose makes: for
 * seven releases these two names rendered the same picture.
 */
export const BLOG_GIT_ICON_NAMES = ["git-branch", "git-merge"] as const

/** The bells whose plates were rebuilt as verified offsets. */
export const BLOG_BELL_ICON_NAMES = [
  "bell",
  "bell-dot",
  "bell-check",
  "bell-x",
  "bell-plus",
  "bell-minus",
  "bell-off",
] as const

/**
 * The batch itself, as the picture on its card.
 *
 * Forty-four names, which is what fills the card's panel past its own height:
 * forty-two of the batch's forty-six new drawings, plus two that are not new
 * and belong here anyway. `package` is the base the nine new parcel modifiers
 * hang off, and a family shown without it is nine variations on something the
 * reader has to picture; `git-merge` is a redraw rather than a new name and is
 * the post's best story.
 *
 * The four new drawings left out are an editorial call rather than a rule:
 * `circle-dashed-play` and `circle-progress-play` are rings, and a ring in a
 * dense field of drawings reads as a hole punched in it, while `move` and
 * `maximize-2` are arrow clusters that go to noise at 36px. All four are in
 * the post, in the singles grid, at the size where they read.
 *
 * **The first six are the social card**, in the order a reader meets them: a
 * parcel with an arrow for the family that drove the batch, a search glass for
 * the ten that took the most work, an umbrella because it is the one drawing
 * here nobody expects, a briefcase for Zafar's own, a traffic light for the
 * motorsport batch that mostly did not survive, and git-merge for the story.
 * Reordering this list changes what a shared link unfurls into.
 */
export const BLOG_BATCH_THUMBNAIL_ICON_NAMES = [
  "package-arrow-down",
  "search-check",
  "umbrella",
  "briefcase",
  "traffic-light",
  "git-merge",
  "package",
  "package-plus",
  "package-minus",
  "package-check",
  "package-x",
  "package-alert",
  "package-arrow-up",
  "package-arrow-left",
  "package-arrow-right",
  "search-plus",
  "search-minus",
  "search-x",
  "search-list",
  "search-2-plus",
  "search-2-minus",
  "search-2-check",
  "search-2-x",
  "search-2-list",
  "cloud-plus",
  "cloud-minus",
  "cloud-check",
  "cloud-x",
  "cloud-alert",
  "app-plus",
  "app-minus",
  "app-check",
  "app-x",
  "app-dot",
  "umbrella-closed",
  "umbrella-off",
  "parasol",
  "crown",
  "flag",
  "flag-chequered",
  "bug",
  "credit-card-2",
  "settings-dot",
  "replay",
] as const

/**
 * What the 1200x630 card draws: the head of a post's list.
 *
 * Six, and the number is a measurement rather than a taste: at 1200px wide
 * with the padding the other cards in this repo use, six tiles at 132px is the
 * row that fits. A seventh makes every drawing smaller than the point at which
 * it is still recognisable in a feed.
 */
export const BLOG_SOCIAL_CARD_ICONS = 6

const BATCH_0_3_1: BlogPost = {
  slug: "46-new-icons-and-30-redraws",
  /* The version this batch will ship as. Every branch behind it is named
     `release/0.3.1-*`, and no tag exists yet, so every surface prints
     "Unreleased" until one does. */
  version: "0.3.1",
  title: "46 new icons, 30 redraws, and a duplicate that shipped seven times",
  description:
    "Inside the newest batch of Keyline Icons: the parcel, search, cloud " +
    "and app families, a redrawn bell whose plate was standing outside its " +
    "own outline, and the day git-merge turned out to be git-branch under a " +
    "second name.",
  standfirst:
    "Everything that landed since v0.3.0, and what each of it was actually " +
    "for. Free SVG icons for shadcn/ui, drawn on one 24×24 grid.",
  date: "2026-09-06",
  updated: "2026-09-06",
  readingMinutes: 7,
  thumbnail: BLOG_BATCH_THUMBNAIL_ICON_NAMES,
  keywords: [
    "icon set update",
    "free svg icons",
    "shadcn/ui icons",
    "package icons",
    "search icons",
    "cloud icons",
    "icon redraw",
    "sharp icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Forty-six new drawings have landed since v0.3.0, and thirty existing " +
        "ones were redrawn. The changelog will tell you that much on its own, " +
        "off the commit dates, without anyone having to write it down. What it " +
        "cannot tell you is why any of it happened, and that turns out to be " +
        "the more interesting half. So here it is: the families, the faults, " +
        "and the drawings that were made and then turned down.",
    },
    {
      kind: "p",
      text:
        "None of this is on npm yet. It is in the repository and in the design " +
        "files, and it goes out with the next release.",
    },

    {
      kind: "h2",
      text: "Four families, not forty-six decisions",
      id: "families",
    },
    {
      kind: "p",
      text:
        "Most of a batch this size is not forty-six separate calls. It is four " +
        "or five, applied consistently. The parcel is the clearest example, " +
        "and it is the one where the set answered the question for us.",
    },
    {
      kind: "p",
      text:
        "Which modifiers a base is allowed to take is not a matter of taste " +
        "here, it is something you can read off the drawings that already " +
        "ship. Six bases carry the four arrows: calendar, clock, file, folder, " +
        "image and smartphone. Every one of them holds content that moves in " +
        "and out. A parcel is the thing that moves. Its absence from that list " +
        "was a gap rather than a decision, so it got the arrows, plus the plus, " +
        "minus, check, x and alert that every container base carries.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_PACKAGE_ICON_NAMES,
        caption:
          "The parcel base and its nine modifiers. Nine of these ten are new.",
      },
    },
    {
      kind: "p",
      text:
        "The same test, applied the other way, is why the app tile did not get " +
        "arrows. No base outside those six carries one, a tile is not a " +
        "container of moving things, and its verbs are install, remove and " +
        "approve, which plus, minus and check already say. It got the dot " +
        "instead, which is what a notification looks like everywhere else in " +
        "the set.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_APP_ICON_NAMES,
        caption:
          "The app tile's five. No arrows, on purpose: download already " +
          "exists as its own word.",
      },
    },
    {
      kind: "p",
      text:
        "Search got ten, five on each glass. The construction came out of the " +
        "existing search icon rather than being invented for the batch: the " +
        "plate is the lens disc, the fill is that disc solid with the handle " +
        "still stroked, and the sharp treatment pushes the handle a unit along " +
        "its own diagonal.",
    },
    {
      kind: "p",
      text:
        "One of the five would not cooperate. The signs are sized so that each " +
        "one's furthest point lands on a path radius of 3, which is forced " +
        "rather than chosen: the glass's inner ink edge is at 6, the gap the " +
        "set keeps between elements takes 2, and the sign's own ink takes 1. " +
        "The plus and the minus already sat exactly there. The list did not " +
        "fit at any size that also cleared the 2-unit gap between its bars, so " +
        "it is redrawn on a pitch of 4, which caps the bars at a radius of " +
        "2.236. Both glasses take the same signs, sized for the smaller of the " +
        "two, because two sizes of check would read as two different checks.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_SEARCH_ICON_NAMES,
        caption:
          "Ten new search icons. The top row is the angled glass, the bottom " +
          "row the round one.",
      },
    },
    {
      kind: "p",
      text:
        "The cloud took the same five signs on the same reasoning, and the " +
        "umbrella turned into four drawings out of one: the canopy with its " +
        "hem, the same canopy closed and stood upright, the canopy with a " +
        "slash across it, and a parasol, which is the umbrella with a pole " +
        "where the hook should be.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_CLOUD_ICON_NAMES,
        caption: "Five for the cloud.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_UMBRELLA_ICON_NAMES,
        caption:
          "One canopy, four icons. The parasol differs by its pole and by " +
          "nothing else.",
      },
    },
    {
      kind: "p",
      text: "And then the ones that belong to nothing, which is the rest of it.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_SINGLES_ICON_NAMES,
        caption:
          "Thirteen singles, including two that came back from the dead.",
      },
    },

    {
      kind: "h2",
      text: "git-merge was git-branch under a second name",
      id: "duplicate",
    },
    {
      kind: "p",
      text: "This is the one worth reading if you maintain an icon set of your own.",
    },
    {
      kind: "p",
      text:
        "While checking something unrelated, git-merge and git-branch turned " +
        "out to be the same drawing. Not similar. The same. Byte-identical in " +
        "fill, and in the other four variants identical but for the winding " +
        "direction of the circles, which is a difference no renderer can show " +
        "you on a stroke or on non-overlapping fills. Put side by side at any " +
        "size, they were pixel-identical.",
    },
    {
      kind: "p",
      text:
        "Both were drawn on 8 August. The fault was found on 4 September, by " +
        "which point it had gone out in every release the set has ever cut: " +
        "v0.1.0 through v0.3.0, seven of them, on npm, in the Figma library " +
        "and in the plugin. Nobody reported it, and I would not expect anyone " +
        "to have. You reach for git-merge, you get a picture of some lines " +
        "joining, and it looks like a merge because you were already thinking " +
        "about merging.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "git-merge as it shipped, laid over git-branch",
            a: { name: "git-merge", take: "before" },
            b: { name: "git-branch", take: "current" },
            verdict: {
              text: "Nothing to see. That is the finding.",
              tone: "bad",
            },
          },
          {
            title: "git-merge as it ships now, laid over git-branch",
            a: { name: "git-merge", take: "current" },
            b: { name: "git-branch", take: "current" },
            verdict: { text: "Two drawings", tone: "good" },
          },
        ],
        caption:
          "Each panel is one drawing painted on top of the other. Anywhere " +
          "the two disagree, one of them keeps its colour. The left panel " +
          "has no colour in it anywhere, which is what a duplicate looks " +
          "like: every mark either drawing makes, the other makes too.",
        legend: {
          a: "git-merge only",
          b: "git-branch only",
          both: "ink the two share",
        },
      },
    },
    {
      kind: "note",
      text:
        "A duplicate that renders identically is invisible to every check that " +
        "looks at the picture. It is only visible to one that looks at the path.",
    },
    {
      kind: "p",
      text:
        "Which of the two was wrong is answerable from the drawing itself. The " +
        "shared picture has its junction at the top node, one arm carrying on " +
        "down the trunk and the other running out to a leaf: one line becoming " +
        "two, flowing down. That is a branch. So git-branch keeps it, and " +
        "git-merge is the one that had been copied.",
    },
    {
      kind: "p",
      text:
        "It is now that drawing mirrored about the horizontal centre line, so " +
        "the trunk keeps its node at the bottom, the branch node moves to the " +
        "top right, and both arms converge into the bottom node: two strands " +
        "into one, going down. Closing the gap in git-pull-request was the " +
        "other candidate and was rejected, because that gap is this family's " +
        "spelling of a proposed rejoin, and a merge drawn four units of line " +
        "away from it trades one collision for another.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_GIT_ICON_NAMES,
        caption:
          "The two, as they now ship. One line becoming two, and two becoming one.",
      },
    },

    { kind: "h2", text: "Grey where there should be none", id: "plates" },
    {
      kind: "p",
      text:
        "The duotone style paints a grey plate behind the black outline. The " +
        "plate is supposed to be the outline's own offset, one unit inside the " +
        "stroke, all the way around. On every bell in the set, it was not: each " +
        "plate's flank had been sampled by hand rather than offset, and along " +
        "about two thirds of its length it ran outside the ink.",
    },
    {
      kind: "p",
      text:
        "Zafar found it by recolouring the plate in Figma, which is the only " +
        "way anyone was ever going to. The worst of it was 0.10 of a grid " +
        "unit, on the plain bell in sharp. The grid is 24 units across and the " +
        "icon is 24 pixels across, so that is a tenth of a pixel. Which is why " +
        "it shipped, and why it kept shipping.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "The whole bell, old plate over new",
            a: { name: "bell", take: "before" },
            b: { name: "bell", take: "after" },
            verdict: { text: "Nothing visible at this size", tone: "good" },
          },
          {
            title: "Three units of its left flank, same two plates",
            a: { name: "bell", take: "before" },
            b: { name: "bell", take: "after" },
            viewBox: "3.2 11 3 3",
            verdict: { text: "0.054 of a unit outside the ink", tone: "bad" },
          },
        ],
        caption:
          "The same two drawings in both panels, one painted over the other. " +
          "The rose down the edge of the second panel is the whole fault: " +
          "plate the old drawing put outside the outline it was meant to sit " +
          "one unit inside. The first panel is that same rose at the size the " +
          "icon ships at, which is to say invisible, which is how it survived " +
          "fourteen files and seven releases. There is no emerald in either " +
          "panel, and that is a finding too: the correction never added " +
          "plate anywhere, it only ever pulled it back.",
        legend: {
          a: "plate as it shipped",
          b: "plate as it is now",
          both: "ink that did not move",
        },
      },
    },
    {
      kind: "p",
      text:
        "Twenty-one such runs across fourteen files were rebuilt as real " +
        "offsets: endpoints and end tangents held, handle lengths solved from " +
        "the midpoint, each piece split until every sample sits at exactly one " +
        "unit from the stroke. Worst error is now 0.0026, down from 0.10. Five " +
        "of the runs are the rounded sign bells, which leave the notch at the " +
        "point one unit above the stroke's cut and turn onto the offset along " +
        "the cap's own circle; that turn was 0.0145 loose and is now the arc it " +
        "was always meant to be.",
    },
    {
      kind: "figure",
      figure: {
        kind: "pairs",
        names: BLOG_BELL_ICON_NAMES,
        caption:
          "The seven bells, before and after. At this size the fix is invisible, " +
          "which was the whole problem.",
      },
    },
    {
      kind: "p",
      text:
        "The rest of the thirty redraws are the same shape of fault in the " +
        "sharp treatment, found the same way: sharp caps standing outside the " +
        "ink on the music notes, the map pins and the message dot; the clock " +
        "rings sitting off their own circle; the database cylinder's plate " +
        "offset the way the bells' now are. A treatment applied across three " +
        "thousand files finds you the drawings that were approximately right.",
    },

    { kind: "h2", text: "The ones that did not ship", id: "dropped" },
    {
      kind: "p",
      text:
        "A batch that started as motorsport ended up mostly not being one. " +
        "Eleven drawings came out of it: a crown, two flags, a traffic light, " +
        "a tyre, an engine, a helmet, a hard hat, a car, a racing car and a " +
        "bug. Zafar reviewed them and kept four. The tyre, the engine, the " +
        "helmet, the hard hat, the car and the racing car went, and so, at " +
        "first, did the chequered flag.",
    },
    {
      kind: "p",
      text:
        "He redrew the flag himself, and it went in coordinate for coordinate " +
        "rather than being re-derived, because two things about his version are " +
        "better than the one it replaced. The wave's phase runs the other way, " +
        "trough at the pole and crest at the tip, which is how a blown flag " +
        "actually hangs. And it is one continuous run, so the pole carries the " +
        "flag's left edge instead of the body closing over it. The chequered " +
        "flag was then rebuilt on that same wave, which is how it came back.",
    },
    {
      kind: "p",
      text:
        "Coins was drawn later in the same batch, on a premise that turned out " +
        "not to hold, and dropped the next morning. That is a normal week. " +
        "Roughly a fifth of what gets drawn here does not ship, and the ones " +
        "that do not are usually not the ones you would guess.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "p",
      text:
        "Everything above is in the browser now, in stroke, duotone and fill, " +
        "rounded or sharp, free under the MIT licence. The npm packages follow " +
        "at the next release.",
    },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the set",
      text: "every drawing, filterable by style, corner treatment and category.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install it",
      text: "the React package, the CLI, the shadcn registry and the plain SVGs.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "the same events without the commentary, generated off the commits.",
    },
  ],
}

/**
 * Every post, newest first.
 *
 * The order is the array's, not a sort: a sort on `date` would silently
 * reorder the page the day two posts share one, and there is nothing to gain
 * from deriving an order that is already visible here.
 */
export const BLOG_POSTS: readonly BlogPost[] = [BATCH_0_3_1]

export const findPost = (slug: string) =>
  BLOG_POSTS.find((post) => post.slug === slug)

/**
 * The date, as the site prints dates elsewhere: "6 September 2026".
 *
 * `en-GB` and an explicit UTC zone. The dates in this file are plain ISO days,
 * which `Date` reads as midnight UTC, so a build machine west of Greenwich
 * would otherwise print the day before.
 */
export const postDateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
