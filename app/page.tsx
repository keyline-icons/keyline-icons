import type { Metadata } from "next"
import Link from "next/link"

import { GitHubLogo } from "@/components/brand-logos"
import { ArrowRight } from "@/components/icons"
import { Glyph } from "@/components/glyph"
import { HomeSearch } from "@/components/home-search"
import { IconWall } from "@/components/icon-wall"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { Button } from "@/components/ui/button"
import { DashboardShowcase } from "@/components/dashboard-showcase"
import { Faq } from "@/components/faq"
import { FigmaShowcase } from "@/components/figma-showcase"
import { FrameworkInstaller } from "@/components/framework-installer"
import { KeylineShowcase } from "@/components/keyline-showcase"
import { MobileShowcase } from "@/components/mobile-showcase"
import { StyleShowcase } from "@/components/style-showcase"
import dashboardData from "@/app/data.json"
import { pickDashboardIcons } from "@/lib/dashboard-demo"
import { homeFaq } from "@/lib/faq"
import {
  HERO_FACT_ICON_NAMES,
  INSTALL_EXAMPLE_ICON_NAMES,
  SPONSOR_ICON_NAMES,
} from "@/lib/home"
import { pickMobileIcons } from "@/lib/mobile-demo"
import { loadIcons, STYLES, type Icon } from "@/lib/icons"
import { searchSuggestions } from "@/lib/search-suggestions"
import { cn } from "@/lib/utils"
import { homeJsonLd, pageMetadata } from "@/lib/seo"
import {
  SET_LICENSE,
  SET_LICENSE_NAME,
  SET_SPONSOR_URL,
  SET_TITLE,
  SITE_LINKS,
} from "@/lib/site-chrome"
import { siteSponsors, sponsorHref } from "@/lib/sponsors"

/**
 * The landing page, at the origin.
 *
 * Nothing rendered here for a while: the browser moved to `/icons` so that it
 * and the 414 icon pages would sit under one folder, and `/` was left as a 308
 * to it. That was a real cost, recorded at the time in `next.config.ts`, and
 * this page is what takes it back. The redirect is gone in the same change,
 * because two ways to reach one page is the duplication the route policy
 * exists to prevent, and a page behind a redirect is a page nobody sees.
 *
 * What it is *for* decides everything on it. Someone arriving at the bare
 * domain has not decided to use the set yet, so this page answers the questions
 * that come before the grid does: how many icons, in what styles, under what
 * licence, and what it looks like in something real. The grid answers a
 * different question, "is the icon I need in here", and it is one click and one
 * search field away.
 *
 * Every number on it is read off disk. `loadIcons()` is the same memoised read
 * the browser and the sitemap use, so the counts here cannot disagree with the
 * set, and there is no figure typed into a string anywhere on the page.
 */
export async function generateMetadata(): Promise<Metadata> {
  const total = (await loadIcons()).length

  return pageMetadata({
    path: "/",
    /*
      The one page that opts out of the layout's `%s · Keyline Icons` template,
      because the brand has to lead here rather than trail. This is the page the
      set should be found by name on, Google weights the front of a title, and
      it is the address every inbound link to the bare domain lands on.

      The title that used to be on `/icons` is this one, moved rather than
      copied. Two pages competing for "shadcn icons" is the cannibalisation the
      route policy exists to prevent, so the browser took a browse-intent title
      in the same change. See `references/route-policy.md` in the `keyline-seo`
      skill.
    */
    title: {
      absolute: `${SET_TITLE}: ${total} free shadcn/ui icons, crafted with AI`,
    },
    description:
      `${total} free ${SET_LICENSE}-licensed icons for shadcn/ui, drawn on ` +
      `one 24×24 grid in three weights: stroke, duotone and fill. Search the ` +
      `set, copy any icon as SVG or JSX, or import the React components.`,
    socialDescription: `${total} free icons for shadcn/ui, in stroke, duotone and fill. ${SET_LICENSE} licensed.`,
  })
}

/** The page container, repeated exactly. Padding inside the max width. */
const CONTAINER = "mx-auto w-full max-w-360 px-6 lg:px-8"

/**
 * One drawing by name, or nothing.
 *
 * The names this page asks for are declared in `lib/home.ts` and checked
 * against the icons on disk by `pipeline/check-demos.mjs`, so a miss here means
 * a rename landed without the check running. It renders as a gap rather than as
 * a 500: a landing page that crashes on a renamed icon is a worse failure than
 * one drawing missing from a row of six.
 */
function find(icons: Icon[], name: string) {
  return icons.find((icon) => icon.name === name)
}

/*
  `StyleGlyph` used to live here, drawing one icon in one style with a fallback
  to stroke. The style cards were its only caller and it moved into
  `components/style-showcase.tsx` with them.
*/

/**
 * A section's heading block: the name, then one line under it.
 *
 * Centred, and the whole page with it. Every section led from the left margin
 * while the hero above them was centred, so the page changed its mind about its
 * own axis after the first screen. The content under these headings is full
 * width and mostly symmetrical — three cards, three panels, a terminal — and a
 * heading hard against the left edge of a symmetrical block reads as a caption
 * that slipped.
 *
 * `max-w-2xl` on the lead and `mx-auto` on the pair: a centred paragraph set to
 * the full column is unreadable past about 75 characters, and centred text with
 * ragged edges on both sides needs a tighter measure than left-aligned text
 * does, not a looser one.
 *
 * The lead is optional. A section whose controls introduce themselves does not
 * need a sentence saying it is about to show them.
 */
function SectionHead({
  title,
  lead,
  className,
}: {
  title: string
  lead?: string
  className?: string
}) {
  return (
    <div className={cn("text-center", className)}>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {lead && (
        <p className="mx-auto mt-3 max-w-2xl text-base text-balance text-muted-foreground">
          {lead}
        </p>
      )}
    </div>
  )
}

/*
  `Code` used to live here, wrapping the two snippets this page showed. Both
  moved into `components/install-switcher.tsx` with the panes they belong to,
  and the copy there is `bg-muted` rather than `bg-background`, because a pane
  is white now and a white block on a white pane is invisible.
*/

export default async function Page() {
  const icons = await loadIcons()

  const total = icons.length
  /*
    Per style, counted rather than declared. `stroke` is complete by definition
    and the other two are not: they need a region to fill, and `bar-chart` is
    three open strokes with no interior. Those gaps are the reason the three
    numbers differ, and stating them is more honest than a "three styles" claim
    that implies 3× the count.
  */
  const perStyle = STYLES.map((style) => ({
    style,
    count: icons.filter((icon) => icon.art[style]).length,
  }))
  const files = perStyle.reduce((sum, entry) => sum + entry.count, 0)
  const contained = icons.filter((icon) => icon.container !== "regular").length
  /* Split by form as well as counted together: the containers section states the
     total, and the FAQ's answer about square and circle states each. Both come
     off the same array rather than from a number typed into either. */
  const containers = {
    square: icons.filter((icon) => icon.container === "square").length,
    circle: icons.filter((icon) => icon.container === "circle").length,
  }

  /* The hero's three glyphs, named in `lib/home.ts` so `check-demos` can hold
     them to what is on disk. Destructured rather than indexed at the call site,
     so which drawing belongs to which sentence is readable there. */
  const [countGlyph, weightGlyph, licenceGlyph] = HERO_FACT_ICON_NAMES

  /* The drawing the install terminal's `cli add` line names, from the same
     kind of checked list, so a rename cannot leave a command that 404s. */
  const [installExample] = INSTALL_EXAMPLE_ICON_NAMES

  /*
    The questions, built once. `components/faq.tsx` renders this array and
    `homeJsonLd` quotes it into a `FAQPage` node, and that is the whole reason it
    is one variable rather than two calls: the markup may only describe what the
    page shows, and two calls is how the two start to disagree.
  */
  const faq = homeFaq({ total, byStyle: perStyle, containers })

  /* The closing sponsor card's glyph, resolved here beside the hero's three
     rather than at the bottom of the tree, so every drawing this page names is
     looked up in one place. */
  const sponsorIcon = find(icons, SPONSOR_ICON_NAMES[0])

  /* Only the tier that was promised placement here. `lib/sponsors.ts` is the
     list, and the README carries everyone rather than just this tier. */
  const sponsors = siteSponsors()

  /* The demo routes, read from the one list the nav, the footer and the
     sitemap already share, so a renamed demo cannot leave a dead card here. */
  const examples = SITE_LINKS.filter((link) => link.group === "Examples")
  /*
    The two demos, built here so the page reads them the way `/demo` and
    `/demo/mobile` do: the same components, the same pickers, the same counts.
    Elements rather than component types, because each takes different props.
  */
  const EXAMPLE_DEMOS: Record<string, React.ReactNode> = {
    "/demo": (
      <DashboardShowcase
        icons={pickDashboardIcons(icons)}
        data={dashboardData}
        totalIcons={total}
        heading={false}
      />
    ),
    "/demo/mobile": (
      <MobileShowcase
        icons={pickMobileIcons(icons)}
        totalIcons={total}
        heading={false}
      />
    ),
  }

  return (
    <>
      {/*
        The set's structured data, which belongs on this page and could not be
        here while nothing rendered at `/`. It declares two entities, the
        website and the icon set itself, and the icon pages' `isPartOf` already
        points at the first of them by `@id`. It moved off `/icons` in this
        change: `SoftwareApplication` describes the application, and the browser
        is one page inside it.

        Server-rendered in the body. Google reads it from either place and
        `metadata` has no field for it.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd({ total, styles: STYLES, faq })),
        }}
      />
      <SiteNav />

      <main>
        {/*
          The hero, with the set drawn behind it.

          `overflow-hidden` is what lets the wall run to both edges of the
          window while the text stays in the page's own box: the wall is wider
          than the column and would otherwise put a horizontal scrollbar on the
          page.
        */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
          <IconWall
            icons={icons}
            /*
              Hidden below `md`, and that is the wall's own rule rather than a
              breakpoint picked to taste. The clear centre is a fraction of the
              layer, so it shrinks with the window while the headline does not:
              at 375px the words run the full width of the page and the hole
              cannot be made wide enough to clear them without erasing the wall
              it is cut out of. A phone gets the headline on the background, and
              loses nothing but decoration.
            */
            className="pointer-events-none absolute inset-x-0 -top-4 hidden h-[40rem] select-none md:block"
          />

          {/*
            `relative` and nothing else: the wall is the only positioned layer
            here, so the content just has to be in the same stacking context to
            sit above it. A `z-` value would be a number nothing else is
            measured against.
          */}
          <div className={`relative ${CONTAINER}`}>
            <div className="mx-auto max-w-3xl text-center">
              {/*
                Word for word the subject of the `<title>`. Google rewrites a
                title that disagrees with what the page visibly leads with, and
                the rewrite is usually worse than the one you wrote.
              */}
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Free icons for shadcn/ui,{" "}
                {/*
                  The second clause in muted ink rather than on its own line:
                  it is the smaller of the two facts, and stacking them would
                  give a two-line headline where the second line is the weaker
                  one. `text-muted-foreground` on a heading is the same device
                  the hero's tagline uses, one level up.
                */}
                <span className="text-muted-foreground">crafted with AI</span>
              </h1>

              {/*
                The line under the heading has been three things, and each
                failure is worth keeping:

                It was the count, the three weights and the licence, which is
                word for word what the three cards below say. Two statements of
                the same facts four inches apart make the second look like a
                summary of the first.

                Then it was "made for interface work rather than for
                illustration: one grid, one keyline weight, and no styling of
                their own to override". That defines the set by what it is not,
                against a suspicion nobody arrives with — no one lands on an
                icon set wondering whether it is illustrations — and its middle
                clause still repeated the first card.

                What it says now is the argument for using a *set* rather than
                collecting glyphs: consistency is a promise about the future, not
                a property of the grid. The rules are real and documented in the
                `icon-system` skill, so this is a claim the repo can back.
              */}
              <p className="mx-auto mt-5 max-w-2xl text-base text-balance text-muted-foreground sm:text-lg">
                Every drawing follows the same rules, so two icons picked months
                apart still look like they belong together.
              </p>

              {/*
                The field first, the buttons under it. Someone who arrives
                knowing the icon they need should not have to find the browser
                first and the search second, and this is the same field the
                browser has, so the trip is continuous rather than a page that
                starts over.
              */}
              {/*
                The suggestions are resolved here rather than in the field: the
                set is already loaded on this page, and `HomeSearch` is a client
                component that should not be handed 414 icons to find eight.
              */}
              <HomeSearch
                suggestions={searchSuggestions(icons)}
                className="mx-auto mt-8 max-w-xl"
              />

              {/*
                This pair is where the site's prefetching now lives, and the
                only in-page link on the landing page that keeps it is the
                first button.

                Next loads a route as soon as its link enters the viewport. The
                landing page names `/icons` seven times and `/install` five,
                across the buttons, the prose and the two mockups, and every one
                of them was loading the page behind it for a reader who had
                merely scrolled past. Thirteen route loads per view, for four
                addresses, on a plan that meters requests.

                So: the bar keeps its prefetch, this button keeps its prefetch,
                and every other link to those pages sets `prefetch={false}` and
                loads when someone actually clicks. The one that stays is the
                one the page is built to be clicked on.
              */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <Button
                  size="lg"
                  render={<Link href="/icons" />}
                  nativeButton={false}
                >
                  Browse all {total} icons
                  <ArrowRight data-icon="inline-end" />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  render={<Link href="/install" prefetch={false} />}
                  nativeButton={false}
                >
                  Install
                </Button>
              </div>
            </div>

            {/*
              The three facts, as sentences rather than as figures.

              This was four tiles, each a number over a word: 414 Icons, 1,059
              SVG files, 3 Styles, MIT Licensed. A figure with a label under it
              is a scoreboard, and a scoreboard makes every number look equally
              important, which is how "1,059 SVG files" ended up the same size as
              the licence. It is also the least interesting way to say any of
              them: the file count is a consequence of the other two and not a
              thing anyone is choosing a set on.

              So the count is a clause inside the sentence it belongs to, and
              each card states one fact in full. The shape is Apple's
              environment cards: a glyph on top, then a line where the phrase
              carrying the fact is the one in full-strength ink. Emphasis by ink
              rather than by hue, because this site is drawn in one colour and a
              purple, an orange and a teal in the hero would be the only three
              on it. If accents are ever wanted, this is the one place they
              would go, and it is three class names.

              The glyphs are from the set, drawn through `Glyph` like everything
              else, so the row is also a small demonstration of what it is
              describing.
            */}
            <ul className="mx-auto mt-14 grid max-w-5xl gap-3 text-left md:grid-cols-3">
              {[
                {
                  name: countGlyph,
                  lead: `${total.toLocaleString("en-US")} icons`,
                  rest: ", all drawn on the same 24×24 grid.",
                },
                {
                  name: weightGlyph,
                  lead: `${STYLES.length} weights`,
                  // The file count, kept as the clause it always was. Dropping
                  // its tile is not the same as dropping the fact, and it reads
                  // as a consequence here rather than as a score.
                  rest: ` per drawing: stroke, duotone and fill, ${files.toLocaleString("en-US")} files in all.`,
                },
                {
                  name: licenceGlyph,
                  lead: `Free under the ${SET_LICENSE_NAME}`,
                  rest: ", in commercial work as much as personal.",
                },
              ].map((fact) => {
                const icon = find(icons, fact.name)

                return (
                  <li
                    key={fact.name}
                    className="flex flex-col gap-6 rounded-lg bg-muted p-6"
                  >
                    {icon?.art.stroke && (
                      <Glyph art={icon.art.stroke} size={28} stroke={2} />
                    )}
                    {/*
                      `text-balance` rather than a fixed measure: these are two
                      or three lines each and the break lands differently in
                      every one, so evening them out is the only way three cards
                      of different lengths look like one row.
                    */}
                    <p className="text-lg leading-snug font-medium tracking-tight text-balance text-muted-foreground">
                      <span className="text-foreground">{fact.lead}</span>
                      {fact.rest}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* The three styles, each shown rather than described. */}
        <section className={`${CONTAINER} py-16 lg:py-24`}>
          <SectionHead
            /*
              The three names, and nothing else. It read "Three weights, one
              drawing", which is a shape rather than a subject: the section
              below it was "One drawing, three frames", and two headings built
              from the same four words in a different order are two headings a
              reader has to stop and tell apart.

              Naming the styles also does the one job a heading on this page can
              do in search. "Duotone icons" is a phrase people type; "three
              weights" is not, and the page's own description already promises
              stroke, duotone and fill, so the heading is where the page makes
              good on it visibly. The `keyline-seo` skill's copy rules put it as
              leading with the noun someone would search for rather than with a
              mood.
            */
            title="Stroke, duotone and fill"
            // The lead no longer opens by repeating all three names back, now
            // that the heading above it is those three names.
            lead="Stroke is the drawing; the other two are derived from it. A family stays recognisable whichever weight a surface calls for."
          />

          {/*
            Three arrangements rather than one repeated three times. The row was
            the same six drawings in every card, which proved the styles differ
            and said nothing about what any of them is for. See
            `components/style-showcase.tsx`, which owns the scatter, the plates
            and the grid, and `lib/home.ts` for the three lists behind them.
          */}
          <div className="mt-10">
            <StyleShowcase icons={icons} perStyle={perStyle} />
          </div>
        </section>

        {/*
          Containers, which is the one thing about the set that has to be shown
          rather than stated.

          The section has been three things. It was a two-column block of
          bullets beside a sample card, where two of the three claims had
          nothing to look at. Then it was three panels of real UI with the set
          working inside them, which failed in the more interesting way: at 16px
          in a menu row a glyph is furniture, so the panels read as a component
          library rather than as an icon set. It is now one drawing in its three
          forms, each lifted out of a scene at a size you can see it at. See
          `components/keyline-showcase.tsx`.

          The title moved with the content. "One grid, one keyline" is a true
          sentence about the set and was the wrong heading over three panels
          about containers, and the grid is stated twice above this anyway, in
          the hero's first card and in the styles blurbs.
        */}
        <section className={`${CONTAINER} py-16 lg:py-24`}>
          <SectionHead
            /*
              Named for the two shapes, which is what a visitor would call them
              and what they would search. It read "One drawing, three frames",
              the mirror image of the styles heading above, and the pair took a
              second to tell apart every time.

              This is also the only place on the page where the word "container"
              appears above the fold of its own section, and the set's
              containers are the thing it has that most free sets do not.
            */
            title="Square and circle containers"
            // The counts are interpolated, not typed. An earlier draft of this
            // lead read "414" while the set was already 425, which is the whole
            // reason nothing on this page states a number it has not counted.
            lead={`${contained} of the ${total} icons have one. The container wraps the base drawing rather than replacing it, so swapping forms changes the emphasis and nothing else.`}
          />

          <div className="mt-10 lg:mt-12">
            <KeylineShowcase />
          </div>
        </section>

        {/* How the icons actually get into a project. */}
        <section className={`${CONTAINER} py-16 lg:py-24`}>
          <SectionHead
            title="Works in your stack"
            // The lead came out for a while, on the argument that the controls
            // introduce themselves. They do not: the framework picker is inside
            // the terminal now, so the heading stands alone over a card and the
            // section loses the one line that says what the card is for.
            lead="One React component per icon, generated from the same files as the SVGs."
          />

          {/*
            The stack first, then what it costs: a framework row over a
            terminal, with the frameworks that do not exist yet disabled rather
            than hidden. This was two cards side by side, an SVG and an install,
            which asked the reader to compare two things instead of picking the
            one that applies. See `components/framework-installer.tsx`.

            `mt-10` again, matching the sections above, now that this heading
            has its lead back. It was `mt-5` for as long as the heading stood
            alone: 40px under a single line left the card floating.
          */}
          <div className="mt-10">
            <FrameworkInstaller example={installExample} />
          </div>
        </section>

        {/*
          Where the set is drawn, straight after where it is installed. The two
          are the same question asked by the two people who ask it: the section
          above is for whoever is about to import a component, this one is for
          whoever is about to place a glyph in a frame, and putting the design
          file after the terminal keeps the code path as the page's first answer
          on a site whose search traffic arrives looking for shadcn/ui.

          Before the demos rather than after them, because the demos are the
          payoff and the page ends on them. See `components/figma-showcase.tsx`
          for what this section may and may not claim. The file is published now, so
          the button opens it rather than the profile it was promising.
        */}
        <section className={`${CONTAINER} py-16 lg:py-24`}>
          <SectionHead
            /*
              Named for the files, not for a tool, and not for a plugin or a kit
              either. It read "Drawn in Figma" while Figma was the only thing in
              the section; the picker under it now names a second tool, so a
              heading that says Figma contradicts the control directly below it.

              "Design files" is also the flattest of the options considered, on
              purpose. Anything warmer, "Design where you work", is a claim
              about the reader's tool. The scope is three surfaces now rather
              than the two this note was written for: the Figma file the set is
              drawn in, the Paper one generated from `icons/`, and the plugin,
              which is neither a file nor drawn in but is where someone already
              working in Figma reaches the set. The heading still fits, at the
              cost of the plugin being filed under "files". The lead still says
              "drawn in Figma" because that is the half that stayed true; the
              other two are downstream of it.
            */
            title="Design files"
            lead="The set is drawn in Figma: one component set per icon, and an export step that changes nothing about the drawing. What ships here is what is in the file."
          />

          <div className="mt-10">
            <FigmaShowcase icons={icons} />
          </div>
        </section>

        {/* The set working in something that is not a grid of icons. */}
        <section className={`${CONTAINER} py-16 lg:py-24`}>
          <SectionHead
            title="See it in a real interface"
            lead="A grid of icons flatters every set. These are the pages that do not: a full shadcn dashboard and a set of phone screens, drawn entirely with the library at the sizes it ships at."
          />

          {/*
            The demos themselves, stacked, rather than pictures of them.

            This was two cards with hand-built miniatures in them: a small phone
            and a small browser window, drawn to look like the pages they link
            to. They were a fake of a thing that already exists in this repo and
            they read as one. `MobileShowcase` and `DashboardShowcase` are the
            same components `/demo/mobile` and `/demo` render, given the same
            props from the same helpers, so what is on this page is the demo and
            not a drawing of it.

            Stacked, because neither is a card. Both are built to hold a page's
            width: the phone sits on a 460px stage with a settings panel beside
            it, and the dashboard is a browser window with its own. Side by side
            they would each get half a column and neither would be legible.

            Both are rendered with `heading={false}`. Each carries its own `h1`
            and lead on its own route, and stacked under this section's heading
            that made three titles down the middle of one block. The demo routes
            keep theirs, where the heading is what the `<title>` promises.

            No "Open the demo" link under either. Both showcases end with their
            own "Browse all icons" button, and the nav's Examples menu is how
            someone reaches the pages themselves; a third link per demo was one
            control too many in a block that is already interactive.
          */}
          {/*
            The negative margin cancels this section's own `px-6` below `lg`.
            Each showcase is a page section in its own right and carries
            `mx-auto max-w-[1400px] px-6 py-12`, so embedded here the two
            paddings stacked: 48px a side on a 390px phone, an eighth of the
            screen spent twice on the same gutter. Above `lg` there is room for
            both and the wider container reads as a deliberate inset, so the
            cancel stops there.
          */}
          <div className="-mx-6 mt-10 flex flex-col gap-16 lg:mx-0 lg:gap-24">
            {examples.map((example) => {
              const Demo = EXAMPLE_DEMOS[example.href]

              return <div key={example.href}>{Demo}</div>
            })}
          </div>
        </section>

        {/*
          The questions, last, and the same array the page's `FAQPage` node
          quotes.

          Its position is the argument for it: this is the page a visitor reaches
          before deciding to use the set, so the questions are the ones asked
          before taking one at all, and they belong after the page has made its
          case rather than interrupting it. Every answer compresses a section
          above: the count and the styles, the licence, shadcn/ui, containers,
          Figma. `lib/faq.ts` records that mapping question by question, so
          dropping a section means dropping its question in the same change.

          Not `/install`'s list. That page's own note says why: rendering one FAQ
          on two of four hand-written pages is a duplicate block, and the two
          answer different questions. `/` answers whether the set is worth
          taking; `/install` answers what to type with an editor already open.
          Only the licence appears in both, deliberately, because it is the
          question asked in both moods.

          Before the sponsor card rather than after it. The ask is the last thing
          the page says, and a list of questions under it would bury it.
        */}
        <section className={`${CONTAINER} py-16 lg:py-24`}>
          <SectionHead
            /*
              "FAQ" is what `/install` and all 414 icon pages call this section,
              and one name for one thing is worth more here than a warmer
              heading: a reader scanning for it is looking for those three
              letters, and so is anything reading the page's outline.
            */
            title="FAQ"
            lead="The questions asked before taking a set: what it covers, what it costs, and what it works with."
          />

          {/*
            `max-w-5xl` rather than the full column. `Faq` is two columns from
            `md` up, and at the page's own 1376px that gives each answer a 600px
            measure, which is half again past where a line stops being readable.
            The icon pages get the same component inside a narrower page and need
            no cap; this is the one place it does.
          */}
          <Faq items={faq} className="mx-auto mt-10 max-w-5xl" />

          {/*
            The section's one link, under the list rather than inside an answer.
            `components/faq.tsx` takes plain strings because the `FAQPage` node
            quotes them, so a link in an answer would fork the markup from the
            page; the install answer says "the install page covers how to get
            it", and this is where that becomes clickable.
          */}
          <p className="mx-auto mt-10 max-w-5xl text-base text-muted-foreground">
            More on installing, importing and switching from another set:{" "}
            <Link
              href="/install"
              prefetch={false}
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              How to install
            </Link>
            .
          </p>
        </section>

        {/*
          The ask, and nothing else.

          There was a licence section here, and then a licence section plus a
          separate `SponsorCallout` below the `main`, and every version of it
          restated what the hero's third fact card already says: free under the
          MIT License, in commercial work as much as personal. A page that ends
          by repeating its own opening has no ending, and the licence text
          itself is one click away in the footer, on every page rather than
          only this one.

          So the last thing the page does is ask, once, in the smallest shape
          that can carry it. Both larger versions of this block were the same
          mistake at different sizes: a centred slab of prose with a button
          under it, which is a wall to read before finding out what it wants.

          The ask lives on this page alone, which was `SponsorCallout`'s reason
          for existing: rendered from `SiteFooter` it sat under the grid, under
          `/install` and under all 414 icon pages, and an ask repeated
          everywhere is furniture rather than a request. Nothing is lost on
          those pages, because the footer's own row still links "Sponsor",
          which is the right weight for something that appears everywhere.
        */}
        {/*
          Half the padding every other section on this page carries, and the one
          place on it that does. The page's rhythm is 96px above and below each
          section, which is right for a block that has a heading and a lead and
          something full width under it: it is the air that says a new subject
          has started. This card is a footnote to the page rather than a subject
          of its own, and at 96 it floated in the middle of a screen of nothing,
          which is what put it as far from the demos above as the demos are from
          each other. 48 keeps it clear of the last section and lets it settle
          onto the footer, where an ask belongs.
        */}
        <section className={`${CONTAINER} py-8 lg:py-12`}>
          {/*
            The hero fact card, reused as the closing card: `--muted` at the
            same radius and padding, a mark on top, then one sentence with the
            phrase that carries it in full-strength ink and the rest in muted.
            Three of these open the page and one closes it, which is what makes
            the ask look like part of the set rather than a banner dropped on
            the end of it.

            Light, like every other surface here. An inverted `--primary` panel
            was tried and it read as a dark box bolted to a light page.

            One card at fact-card scale, centred: `max-w-md` is about the width
            of one of the hero's three, so the shape is recognisably the same
            card rather than a stretched version of it.

            The card holds a button rather than being one big link. It was the
            anchor itself for a moment, on the argument that a button is most of
            a card this size, and a card-shaped link has no visible place to
            click: the sentence was the only invitation and nothing in it said
            it was clickable. A button also cannot be nested inside an anchor,
            so it is one or the other, and it is the button.
          */}
          <div className="mx-auto flex max-w-md flex-col gap-6 rounded-lg bg-muted p-6">
            {/*
              A drawing from the set at the fact cards' own 28px and 2px, so the
              card at the bottom of the page is the same object as the three at
              the top. GitHub's mark stood here first, on the argument that it
              says where the click lands: it is a solid logo, and solid beside a
              keyline set only passes at 16px, which `components/brand-logos.tsx`
              says in as many words. At 28 it was the heaviest thing on the page,
              and it is on the button now, at the size that works.
            */}
            {sponsorIcon?.art.stroke && (
              <Glyph art={sponsorIcon.art.stroke} size={28} stroke={2} />
            )}

            {/*
              `text-balance` and the same type as the fact cards, so the three
              at the top and this one at the bottom set identically.

              "Keep the set free" leads, in full ink, rather than "Become a
              sponsor": that is what the button says two lines below, and a card
              whose sentence opens with its own button's label reads as a stutter.
            */}
            <p className="text-lg leading-snug font-medium tracking-tight text-balance text-muted-foreground">
              <span className="text-foreground">Keep the set free</span>
              {
                ": sponsorship is what pays for the hours the next hundred take."
              }
            </p>

            {/*
              `self-start`, not full width. A stretched button in a 448px card is
              a dialog's footer, and the card is left aligned throughout, so the
              control starts on the same edge as the glyph and the sentence.

              `Button` with an anchor rendered into it rather than a styled link,
              which is the site's one definition of this treatment, and
              `nativeButton={false}` because Base UI logs on every render for a
              `Button` that is not a `<button>`. A plain anchor and not `Link`:
              the destination is github.com, which `Link` would try to prefetch
              as a route.
            */}
            <Button
              size="lg"
              className="self-start"
              render={
                <a
                  href={SET_SPONSOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              nativeButton={false}
            >
              {/*
                The mark alone. An outbound arrow after the label as well put
                two glyphs on one small button, and the arrow is the one that
                says least: the mark already names where the click lands, and the
                new-tab warning is the screen-reader note under it, which is the
                same call the footer's outbound links make.
              */}
              <GitHubLogo data-icon="inline-start" className="size-4" />
              Become a sponsor
              <span className="sr-only">{" (opens in a new tab)"}</span>
            </Button>

            {/*
              The names the `$100 a month` tier promises, and the empty state
              that tier makes necessary.

              The tier was published before this existed, so the promise was
              live with nowhere to keep it. It is a list rather than a logo wall
              because a wall of one logo looks worse than a sentence, and
              because the set is drawn in keylines: a row of full-colour company
              marks under a page arguing for consistent weight would be the one
              thing on it that ignores its own rule.

              It renders when empty rather than hiding, so the slot is visibly
              real. A section that appears only once someone has paid asks
              people to trust a promise they cannot see being kept.
            */}
            <div className="flex flex-col gap-2 border-t pt-6 text-sm">
              <p className="font-medium text-foreground">Sponsors</p>
              {sponsors.length === 0 ? (
                <p className="text-muted-foreground">
                  Nobody yet. Yours would be the first name here.
                </p>
              ) : (
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-muted-foreground">
                  {sponsors.map((sponsor) => (
                    <li key={sponsor.login}>
                      <a
                        href={sponsorHref(sponsor)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-foreground"
                      >
                        {sponsor.name}
                        <span className="sr-only">
                          {" (opens in a new tab)"}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
