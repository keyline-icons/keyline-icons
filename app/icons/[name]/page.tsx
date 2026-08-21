import type { Metadata } from "next"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowLeft } from "@/components/icons"
import { BrandMark } from "@/components/brand-mark"
import { CopyName } from "@/components/copy-name"
import { DesignFileLinks } from "@/components/design-file-links"
import { Glyph } from "@/components/glyph"
import { Faq } from "@/components/faq"
import { IconDetail } from "@/components/icon-detail"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { Toaster } from "@/components/ui/sonner"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  avatarUrl,
  contributorsFor,
  initials,
  profileUrl,
} from "@/lib/icon-contributors"
import {
  containerFamily,
  iconDescription,
  iconFaq,
  iconHref,
  iconKeywords,
  iconMetaDescription,
  iconTitle,
  listOf,
  relatedIcons,
  stylesOf,
} from "@/lib/icon-pages"
import { parseSettings, SETTINGS_COOKIE } from "@/lib/browser-settings"
import { aliasesFor, categoryOf } from "@/lib/icon-taxonomy"
import { loadIcons, type Icon } from "@/lib/icons"
import { iconJsonLd, pageMetadata } from "@/lib/seo"
import { SET_LICENSE, SET_TITLE } from "@/lib/site-chrome"
import { cn } from "@/lib/utils"

/**
 * A page per drawing, which this site deliberately did not have.
 *
 * The route policy ruled these out for as long as they would have been thin:
 * 414 pages differing only by a glyph is the doorway pattern, and the policy's
 * own condition for allowing them was that each carry real content of its own —
 * usage, the three styles side by side, related icons. That is what this is, so
 * the policy now allows them and `references/route-policy.md` records it.
 *
 * `generateStaticParams` names every icon and `dynamicParams` shuts the route to
 * anything else, so a made-up name is a hard 404 rather than a rendered page
 * about an icon that does not exist — which is a soft 404, and the one failure
 * that would put this route in Google's "crawled, not indexed" bucket at scale.
 *
 * The pages render per request rather than at build, for one reason: the
 * settings cookie. Size, stroke and colour are shared with the grid, and the
 * only way a page can paint them correctly on the *first* frame is to read the
 * cookie the request carried. The alternative, reading it on the client, paints
 * the defaults and corrects them after hydration, which is the jump
 * `lib/browser-settings.ts` exists to avoid.
 *
 * That is the same trade `app/page.tsx` already makes, and it costs less than
 * it looks: `loadIcons` memoises for the life of the process, so a request is a
 * render rather than 840 file reads, and every crawler still receives complete
 * HTML.
 */
export const dynamicParams = false

export async function generateStaticParams() {
  return (await loadIcons()).map((icon) => ({ name: icon.name }))
}

/** The icon, or `undefined`. Shared by the metadata and the render. */
async function findIcon(name: string): Promise<Icon | undefined> {
  return (await loadIcons()).find((icon) => icon.name === name)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  const icon = await findIcon(name)

  // `dynamicParams` already makes this unreachable in production. It is here so
  // that a name typed into the dev server answers with a 404 rather than a
  // crash inside the metadata pass, where the stack points at Next rather than
  // at the missing icon.
  if (!icon) return {}

  return pageMetadata({
    path: iconHref(icon.name),
    // The name and the noun, nothing else. See `iconTitle`.
    title: iconTitle(icon.name),
    // The page's own sentence plus whatever synonyms the snippet has room for.
    description: iconMetaDescription(icon),
    // The card has less room and no keyword job: it says what the drawing is
    // and who it is for, and drops the three verbs.
    socialDescription:
      `The ${icon.name} icon in ${listOf(stylesOf(icon))}, ` +
      `drawn on a 24×24 grid for shadcn/ui.`,
  })
}

/** A titled block, matching the one on `/install`. */
function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t pt-12">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="mt-2 text-base text-muted-foreground">{description}</p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  )
}

/**
 * One icon in a row of links, drawn above its name.
 *
 * A real `<a href>`, not a tile that opens something: these are the route's
 * whole internal link graph. The family and the shelf link out of every page,
 * so a crawler that finds one icon finds the set without the sitemap having to
 * carry it alone.
 */
function IconLink({ icon, current }: { icon: Icon; current?: boolean }) {
  const art = icon.art.stroke ?? icon.art[stylesOf(icon)[0]!]!

  return (
    <Link
      href={iconHref(icon.name)}
      aria-current={current ? "page" : undefined}
      className={cn(
        "group flex flex-col items-center justify-center gap-2 rounded-lg p-2 transition-colors",
        current
          ? "bg-background shadow-sm ring-1 ring-border"
          : "bg-muted hover:bg-muted-hover"
      )}
    >
      <span className="flex h-12 items-center justify-center text-foreground">
        <Glyph art={art} size={24} stroke={2} />
      </span>
      <span className="w-full truncate text-center text-xs leading-tight text-muted-foreground group-hover:text-foreground">
        {icon.name}
      </span>
    </Link>
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const icons = await loadIcons()
  const icon = icons.find((candidate) => candidate.name === name)

  // The same read the grid does, so an icon opened from it is drawn at the size,
  // stroke and colour you left it at rather than back at the defaults.
  const settings = parseSettings((await cookies()).get(SETTINGS_COOKIE)?.value)

  if (!icon) notFound()

  const category = categoryOf(icon.base)
  const aliases = aliasesFor(icon.base)
  const family = containerFamily(icon, icons)
  const related = relatedIcons(icon, icons)
  const credits = contributorsFor(icon.name, icon.history)
  const description = iconDescription(icon)
  // Built once and used twice: the section renders it, the `FAQPage` node
  // quotes it. Two calls would be two chances for them to say different things.
  const faq = iconFaq(icon, icons)

  return (
    <>
      {/*
        Server-rendered in the body, like the homepage's. `metadata` has no
        field for structured data and Google reads it from either place, so it
        goes where it can be written from the same values the page renders.
      */}
      <script
        type="application/ld+json"
        // Built in `lib/seo.ts` from the icon's own name and this repo's
        // constants. No user input reaches it: the route is closed to any name
        // that is not a file on disk.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            iconJsonLd({
              name: icon.name,
              title: `${iconTitle(icon.name)} · ${SET_TITLE}`,
              // The same string the `<meta>` carries, so a consumer reading
              // both is not handed two descriptions of one page.
              description: iconMetaDescription(icon),
              keywords: iconKeywords(icon),
              faq,
              path: iconHref(icon.name),
            })
          ),
        }}
      />

      <SiteNav />

      {/*
        The site's page container, exactly: padding inside `max-w-360`, the same
        box the bar, the grid and the footer use. It has to be that literal box
        and not a narrower measure centred inside it — this page is reached from
        the grid and leads back to it, and a column that agrees with the bar up
        to 1440px and then drifts away from it reads as two different sites.

        `/install` is the exception rather than the model: it is prose, and prose
        past about 75 characters stops being readable. Nothing here is prose at
        that length. The width instead goes to the two things that can use it —
        the code block, where a 24×24 path fits on one line rather than
        scrolling, and the related grid, which fills out to the browser's own
        column count.
      */}
      <main className="mx-auto w-full max-w-360 px-6 pb-16 lg:px-8">
        <Breadcrumb className="pt-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/icons" />}>
                Icons
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-mono">{icon.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="flex flex-col gap-6 pt-5 pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-col gap-3">
            {/*
              The heading is the file name, in the mono face it is written in
              everywhere else on the site. It has to be the name and not a
              prettified "Bell X": the name is what goes in an import, in a CLI
              argument and in the search field, and a heading that disagrees
              with the title is one Google rewrites.
            */}
            {/* One step down on a phone, like the hero. The longest name in the
                set is 35 characters, and at 4xl in a mono face that is four
                lines of heading before the drawing is even on screen. */}
            <h1 className="font-mono text-3xl font-semibold tracking-tight sm:text-4xl">
              {/* The same click as the dock's, from the same component: the
                  name is what you came to take, and selecting it out of a
                  heading by hand is the thing this removes. */}
              <CopyName name={icon.name} iconClassName="size-6" />
            </h1>

            {/* The same sentence as the meta description, on purpose: a
                snippet the page does not back up is one Google replaces. */}
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <span className="rounded-md bg-muted px-2 py-0.5">
                {category}
              </span>
              {icon.history && (
                <span className="flex flex-wrap items-center gap-x-2 tabular-nums">
                  <span>v{icon.history.version}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    Added{" "}
                    <time dateTime={icon.history.added}>
                      {icon.history.addedLabel}
                    </time>
                  </span>
                  {icon.history.updated !== icon.history.added && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>
                        Updated{" "}
                        <time dateTime={icon.history.updated}>
                          {icon.history.updatedLabel}
                        </time>
                      </span>
                    </>
                  )}
                </span>
              )}
            </div>
          </div>

          {/*
            The right of the header: where this drawing came from, and where to
            open it. Who drew it is a line of text; the design files are
            buttons, because they leave the site.
          */}
          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            {/*
              The two design files, as marks with the label in a tooltip.

              It was one wide "Open in Figma" button until Paper's file existed
              too, and a second button in that shape would have put two labelled
              outline controls above a line of grey credit. `DesignFileLinks`
              is where the gating on each URL lives, and where the reasoning for
              dropping the words is written down.

              `icon-lg` so the pair matches the height of the `lg` controls the
              specimen column starts with, rather than shrinking against them.
            */}
            <DesignFileLinks
              size="icon-lg"
              className="flex items-center gap-2"
            />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Drawn by</span>
              {credits.map((person) => {
                const avatar = avatarUrl(person)
                const profile = profileUrl(person)

                const face =
                  person.mark === "brand" ? (
                    <BrandMark className="size-5 rounded-[5px]" />
                  ) : avatar ? (
                    <Image
                      src={avatar}
                      alt=""
                      width={40}
                      height={40}
                      className="size-5 rounded-full bg-muted"
                    />
                  ) : (
                    <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[9px] font-medium text-foreground">
                      {initials(person.name)}
                    </span>
                  )

                return profile ? (
                  <a
                    key={person.id}
                    href={profile}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                  >
                    {face}
                    {person.name}
                  </a>
                ) : (
                  <span key={person.id} className="flex items-center gap-1.5">
                    {face}
                    {person.name}
                  </span>
                )
              })}
            </div>
          </div>
        </header>

        <IconDetail icon={icon} initialSettings={settings} />

        <div className="mt-16 flex flex-col gap-14">
          {aliases.length > 0 && (
            <Section
              title="Also called"
              description="What someone searching for this drawing would have typed instead. These are the words the browser's search matches on."
            >
              {/*
                Text, not links. The obvious destination is
                `/icons?icon=<alias>`, which is a query-string variant of the
                browser and canonicals back to it; internal links point at
                canonical URLs only, so a row of them here would be 400-odd
                links into one page's duplicate address.
              */}
              <ul className="flex flex-wrap gap-2">
                {aliases.map((alias) => (
                  <li
                    key={alias}
                    className="rounded-md bg-muted px-3 py-1.5 text-base text-muted-foreground"
                  >
                    {alias}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {family.length > 1 && (
            <Section
              title="Containers"
              description="The same drawing boxed differently. Each is its own icon, with its own name."
            >
              <div className="grid grid-cols-[repeat(auto-fill,minmax(116px,1fr))] gap-2">
                {family.map((variant) => (
                  <IconLink
                    key={variant.name}
                    icon={variant}
                    current={variant.name === icon.name}
                  />
                ))}
              </div>
            </Section>
          )}

          {related.length > 0 && (
            <Section
              title="Related icons"
              description={`The rest of the ${icon.base.split("-")[0]} family first, then the ${category} shelf.`}
            >
              <div className="grid grid-cols-[repeat(auto-fill,minmax(116px,1fr))] gap-2">
                {related.map((other) => (
                  <IconLink key={other.name} icon={other} />
                ))}
              </div>
            </Section>
          )}

          {/*
            The questions this page is actually asked, answered from this icon's
            own facts. It replaces a "Use it" block that said two of these
            things in prose: the same content is worth more as the question
            somebody typed than as a paragraph they have to find it in.

            Answers are read straight out of `iconFaq` and rendered as text,
            because the `FAQPage` markup quotes the same array. Anything inline
            here — a link, a `<code>` — would make the markup a description of a
            page that does not exist, so the section's one link sits under the
            grid.
          */}
          <Section
            title="FAQ"
            description={`Common questions about the ${icon.name} icon, and about using the set it comes from.`}
          >
            <Faq items={faq} />

            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              <Link
                href="/install"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Installing the set in a shadcn/ui project
              </Link>{" "}
              covers the React package and the CLI in full, and the{" "}
              {SET_LICENSE} licence is stated in the footer of every page.
            </p>
          </Section>
        </div>

        {/*
          Back to the grid, at the bottom where the page runs out. The
          breadcrumb at the top says the same thing; this one is for the visitor
          who has read to the end and is now looking for the next icon rather
          than for where they came from.
        */}
        <div className="mt-10">
          <Link
            href="/icons"
            className="inline-flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Browse all {icons.length} icons
          </Link>
        </div>
      </main>

      {/*
        The surface the copy failures are drawn on, and it was missing.

        Two things on this page call `toast.error` when the clipboard refuses:
        the name in the heading and the Copy button in the panel. Without a
        Toaster on the route both fired into nothing — the toast was created and
        had nowhere to render — so a refused copy looked exactly like a silent
        one. `/demo` carries the same note for the same reason: it is mounted per
        route, not in the layout, and every route that calls `toast` needs its
        own.
      */}
      <Toaster />

      <SiteFooter />
    </>
  )
}
