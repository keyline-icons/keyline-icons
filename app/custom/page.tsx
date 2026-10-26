import { readFile } from "node:fs/promises"
import { join } from "node:path"
import Image from "next/image"

import { CustomInquiry, CustomView } from "@/components/custom-inquiry"
import { Faq } from "@/components/faq"
import { Glyph } from "@/components/glyph"
import { Check, SquareDashed } from "@/components/icons"
import { SectionHead } from "@/components/section-head"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { Button } from "@/components/ui/button"
import {
  CASE_STUDY,
  CASE_STUDY_COUNT,
  CUSTOM_CLOSE_ICON_NAMES,
  CUSTOM_DELIVERY,
  CUSTOM_DELIVERY_ICON_NAMES,
  CUSTOM_EMAIL,
  CUSTOM_FAQ,
  CUSTOM_OFFERS,
  CUSTOM_SAMPLE_ICON_NAMES,
  CUSTOM_SAMPLE_SIZES,
  CUSTOM_SAMPLE_STATES,
  CUSTOM_SEE_ALSO,
  CUSTOM_STEP_ICON_NAMES,
  CUSTOM_STEPS,
} from "@/lib/custom"
import { loadIcons } from "@/lib/icons"
import { pageMetadata } from "@/lib/seo"
import { MAKER_PROJECTS, SET_X_URL } from "@/lib/site-chrome"
import makerFace from "@/public/featured/avatars/zafarlab.jpg"

/**
 * The paid offer: icon sets drawn for one product, on the set's own grid.
 *
 * Built from the landing page's parts rather than a pricing template, so it
 * reads as part of the same site: the centred hero, `SectionHead`, and the
 * muted fact card in three jobs (what you get, the offers, the steps). The
 * closing card is the sponsor card's shape, the one other ask on the site.
 *
 * A plain link in the bar, "Custom", after Icons and Install: text like its
 * neighbours, never a button, so it is findable by anyone looking and in the
 * way of nobody who came for the icons. The footer keeps the full name.
 */
export const metadata = pageMetadata({
  path: "/custom",
  title: "Custom icon sets for product teams",
  description:
    "Custom icons for software and AI products, drawn on the Keyline Icons grid " +
    "in every size and state, delivered as SVG, a Figma file and a React " +
    "package. A 3-icon style test for $150, or 30 icons in 7 days for $1,500.",
  socialDescription:
    "Icons drawn for your product on the Keyline grid, delivered as SVG, Figma and React.",
})

/** The page container, the landing page's exactly. */
const CONTAINER = "mx-auto w-full max-w-360 px-6 lg:px-8"

/**
 * The case study's drawings, inlined so a monochrome SVG takes the theme's ink
 * through `currentColor` the way every other drawing on the site does. Read at
 * build, like `LICENSE` on the licence page.
 */
async function readArt(paths: readonly string[]) {
  return Promise.all(
    paths.map((path) => readFile(join(process.cwd(), "public", path), "utf8"))
  )
}

export default async function Page() {
  const icons = await loadIcons()
  const art = (name: string) =>
    icons.find((icon) => icon.name === name)?.art.stroke
  const total = icons.length.toLocaleString("en-US")
  const samples = Object.fromEntries(
    CUSTOM_SAMPLE_ICON_NAMES.map((name) => [
      name,
      icons.find((icon) => icon.name === name),
    ])
  )

  /*
    Shown once both rows have art. Until then, placeholders in development so
    the layout can be judged, and nothing in production, where an empty frame
    reads as a page left unfinished.
  */
  const caseReady = CASE_STUDY.before.length > 0 && CASE_STUDY.after.length > 0
  const caseDraft = !caseReady && process.env.NODE_ENV !== "production"
  const [before, after] = caseReady
    ? await Promise.all([readArt(CASE_STUDY.before), readArt(CASE_STUDY.after)])
    : [[], []]
  const credit = CASE_STUDY.app.name
    ? `: ${CASE_STUDY.app.name} as it ships, ${CASE_STUDY.app.license}`
    : ": the app's own icons, credited here with its licence"

  // The address the footer's maker row already links, not a second copy of it.
  const preline = MAKER_PROJECTS.find((project) => project.id === "preline")
    ?.href
  const [closeIcon] = CUSTOM_CLOSE_ICON_NAMES
  const closeArt = art(closeIcon)

  return (
    <>
      <CustomView />
      <SiteNav />

      <main>
        {/*
          No bottom padding: the sample row ends the hero, and the next
          section's own top padding is the whole gap. Hero and section both
          padding the seam left 192px of nothing between the buttons and the
          first heading.
        */}
        <section className={`${CONTAINER} pt-8 lg:pt-14`}>
          <div className="mx-auto max-w-3xl text-center">
            {/* Word for word the `<title>`, as on every other page. */}
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Custom icon sets for product teams,{" "}
              <span className="text-muted-foreground">
                drawn on the Keyline grid
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-balance text-muted-foreground sm:text-lg">
              For software and AI products that have outgrown a borrowed set.
              Drawn by the designer of all {total} Keyline icons, to the same
              standard, in every size and state your interface uses.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <CustomInquiry place="hero">Email the brief</CustomInquiry>
              <Button
                size="lg"
                variant="ghost"
                render={<a href="#offers" />}
                nativeButton={false}
              >
                See the offers
              </Button>
            </div>
          </div>

          {/*
            Real drawings before any description of them: the page was all
            text until the case study. The sizes are drawn at their actual
            pixels, not scaled up, because how a set holds at 16 is the claim.
          */}
          <div className="mx-auto mt-14 grid max-w-3xl gap-6 rounded-lg bg-muted p-6 sm:grid-cols-2">
            {[
              {
                title: "Sizes",
                tiles: CUSTOM_SAMPLE_SIZES.map((size) => ({
                  label: `${size}px`,
                  art: samples.bell?.art.stroke,
                  size,
                })),
              },
              {
                title: "States",
                tiles: CUSTOM_SAMPLE_STATES.map((state) => ({
                  label: state.label,
                  art: samples[state.name]?.art[state.style],
                  size: 24,
                })),
              },
            ].map((group) => (
              <figure key={group.title} className="flex flex-col gap-3">
                <figcaption className="text-sm font-medium">
                  {group.title}
                </figcaption>
                <ul className="grid grid-cols-3 gap-2">
                  {group.tiles.map((tile) => (
                    <li
                      key={tile.label}
                      className="flex h-24 flex-col items-center justify-center gap-3 rounded-md bg-background"
                    >
                      <span className="flex size-6 items-center justify-center">
                        {tile.art && (
                          <Glyph art={tile.art} size={tile.size} stroke={2} />
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {tile.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </figure>
            ))}
          </div>
        </section>

        <section className={`${CONTAINER} py-16 lg:py-24`}>
          <SectionHead
            title="What you get"
            lead="One set, drawn to one standard, in every format the team works in."
          />
          <ul className="mx-auto mt-10 grid max-w-5xl gap-3 text-left md:grid-cols-3">
            {CUSTOM_DELIVERY.map((fact, i) => {
              const glyph = art(CUSTOM_DELIVERY_ICON_NAMES[i])
              return (
                <li
                  key={fact.lead}
                  className="flex flex-col gap-6 rounded-lg bg-muted p-6"
                >
                  {glyph && <Glyph art={glyph} size={28} stroke={2} />}
                  <p className="text-lg leading-snug font-medium tracking-tight text-balance text-muted-foreground">
                    <span className="text-foreground">{fact.lead}</span>
                    {fact.rest}
                  </p>
                </li>
              )
            })}
          </ul>
        </section>

        {/* `scroll-mt` clears the fixed bar, so the hero's link lands the
            heading under it rather than behind it. */}
        <section
          id="offers"
          className={`${CONTAINER} scroll-mt-15 py-16 lg:scroll-mt-19 lg:py-24`}
        >
          <SectionHead
            title="Two fixed offers"
            lead="Start with three icons to see the fit, or go straight to the set."
          />
          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 md:grid-cols-2">
            {CUSTOM_OFFERS.map((offer) => (
              <li
                key={offer.id}
                className="flex flex-col gap-6 rounded-lg bg-muted p-6"
              >
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {offer.name}
                  </p>
                  <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-4xl font-semibold tracking-tight">
                      {offer.price}
                    </span>
                    <span className="text-base text-muted-foreground">
                      {offer.summary}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-base text-balance text-muted-foreground">
                    {offer.description}
                  </p>
                  {offer.note && (
                    <p className="text-base font-medium text-balance">
                      {offer.note}
                    </p>
                  )}
                </div>
                <ul className="mt-auto flex flex-col gap-2 border-t pt-6 text-sm">
                  {offer.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check aria-hidden="true" className="mt-0.5 size-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/*
            Who draws it, beside what it costs: the one fact a buyer weighs
            against the price. The X avatar the showcase already carries, so
            the face here is the face on the account the name links to.
          */}
          <p className="mx-auto mt-8 flex max-w-3xl items-center gap-3 text-sm text-balance text-muted-foreground">
            <Image
              src={makerFace}
              alt=""
              sizes="40px"
              className="size-10 shrink-0 rounded-full object-cover"
            />
            <span>
              Drawn by{" "}
              <a
                href={SET_X_URL}
                target="_blank"
                rel="noopener"
                className="font-medium text-foreground underline underline-offset-2 hover:no-underline"
              >
                Zafar Ismatullaev
                <span className="sr-only">{" (opens in a new tab)"}</span>
              </a>
              , head designer at{" "}
              <a
                href={preline}
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Preline UI
                <span className="sr-only">{" (opens in a new tab)"}</span>
              </a>{" "}
              and the designer of all {total} Keyline icons.
            </span>
          </p>
        </section>

        {(caseReady || caseDraft) && (
          <section
            id="case-study"
            className={`${CONTAINER} scroll-mt-15 py-16 lg:scroll-mt-19 lg:py-24`}
          >
            <SectionHead
              title="Twelve icons, one system"
              lead="Twelve icons from an open-source app as they ship today, and the same twelve redrawn on one grid."
            />
            <div className="mx-auto mt-10 grid max-w-5xl gap-3 md:grid-cols-2">
              {[
                { label: "Before", note: credit, drawings: before },
                {
                  label: "After",
                  note: ": the same twelve, redrawn on the Keyline grid",
                  drawings: after,
                },
              ].map((row) => (
                <figure
                  key={row.label}
                  className="flex flex-col gap-6 rounded-lg bg-muted p-6"
                >
                  <ul className="grid grid-cols-4 gap-2">
                    {Array.from({ length: CASE_STUDY_COUNT }, (_, i) => (
                      <li
                        key={i}
                        className="flex aspect-square items-center justify-center rounded-md bg-background [&>svg]:size-8"
                      >
                        {row.drawings[i] ? (
                          <span
                            className="contents"
                            dangerouslySetInnerHTML={{
                              __html: row.drawings[i],
                            }}
                          />
                        ) : (
                          <SquareDashed
                            aria-hidden="true"
                            className="text-muted-foreground/40"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                  <figcaption className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {row.label}
                    </span>
                    {row.note}
                  </figcaption>
                </figure>
              ))}
            </div>
            {caseDraft && (
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Placeholder, shown in development only. Fill{" "}
                <code>CASE_STUDY</code> in <code>lib/custom.ts</code> to
                publish it.
              </p>
            )}
          </section>
        )}

        <section className={`${CONTAINER} py-16 lg:py-24`}>
          <SectionHead title="How it works" />
          <ol className="mx-auto mt-10 grid max-w-5xl gap-3 text-left md:grid-cols-3">
            {CUSTOM_STEPS.map((step, i) => {
              const glyph = art(CUSTOM_STEP_ICON_NAMES[i])
              return (
                <li
                  key={step.title}
                  className="flex flex-col gap-6 rounded-lg bg-muted p-6"
                >
                  <div className="flex items-center justify-between">
                    {glyph && <Glyph art={glyph} size={28} stroke={2} />}
                    <span className="text-sm text-muted-foreground tabular-nums">
                      Step {i + 1}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-lg leading-snug font-medium tracking-tight">
                      {step.title}
                    </p>
                    <p className="text-base text-balance text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        <section className={`${CONTAINER} py-16 lg:py-24`}>
          <SectionHead title="FAQ" />
          <Faq items={CUSTOM_FAQ} className="mx-auto mt-10 max-w-5xl" />
          {/* Under the list, as on `/`: an answer cannot carry a link. */}
          <p className="mx-auto mt-10 max-w-5xl text-base text-muted-foreground">
            Need custom work beyond icons? See also{" "}
            <a
              href={CUSTOM_SEE_ALSO.href}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              {CUSTOM_SEE_ALSO.label}
              <span className="sr-only">{" (opens in a new tab)"}</span>
            </a>
            .
          </p>
        </section>

        {/*
          The sponsor card's shape and padding, for the same reason it has them
          on `/`: the page closes on one small ask rather than a slab of prose
          with a button under it. The address is printed as well as linked,
          because a mailto does nothing on a machine with no mail app set up.
        */}
        <section className={`${CONTAINER} py-8 lg:py-12`}>
          <div className="mx-auto flex max-w-md flex-col gap-6 rounded-lg bg-muted p-6">
            {closeArt && <Glyph art={closeArt} size={28} stroke={2} />}
            <p className="text-lg leading-snug font-medium tracking-tight text-balance text-muted-foreground">
              <span className="text-foreground">See the fit first</span>
              {`: the style test is three of your icons for ${CUSTOM_OFFERS[0].price}, drawn before any set is ordered.`}
            </p>
            <CustomInquiry place="close" className="self-start">
              Email the brief
            </CustomInquiry>
            <p className="border-t pt-6 text-sm text-muted-foreground">
              No mail app? Write to{" "}
              <span className="font-medium text-foreground select-all">
                {CUSTOM_EMAIL}
              </span>
              .
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
