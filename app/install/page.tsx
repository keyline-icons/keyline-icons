import Link from "next/link"

import { installFaq } from "@/lib/faq"
import { ICONIFY_PREFIX, ICONIFY_URL, importPath } from "@/lib/icon-code"
import { artOf, CORNERS } from "@/components/glyph"
import { loadIcons, STYLES } from "@/lib/icons"
import { faqJsonLd, pageMetadata } from "@/lib/seo"
import { SET_REPO_URL } from "@/lib/site-chrome"
import {
  ReactLogo,
  ShadcnLogo,
  SvelteLogo,
  ViteLogo,
  VueLogo,
} from "@/components/brand-logos"
import { Faq } from "@/components/faq"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { Button } from "@/components/ui/button"
import {
  ArrowInRightDashedPanel,
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  CircleQuestion,
  Copy,
  Download,
  PenLine,
  Plus,
  Settings,
  Shapes,
  Bin,
  User,
} from "@/components/icons"

/**
 * The page that says how to use the set, which the site did not have.
 *
 * Neither its URL nor its title chases "shadcn icons". The route policy gives
 * that phrase to `/`, and two pages on one site competing for one term is the
 * cannibalisation the policy exists to prevent. This one takes the how-to
 * intent instead: someone who already knows what the set is and wants it in
 * their project. Different searcher, different page, no overlap.
 *
 * That is also why it is no longer at `/shadcn`. The address carried the term
 * as loudly as a title would, and it described a third of what is here: copying
 * an SVG, the React package and its three entry points, sizing, stroke weight,
 * migrating off lucide. shadcn/ui is the context for all of that rather than
 * the subject, and "Install" is what someone types. `next.config.ts` keeps the
 * old URL alive as a permanent redirect.
 *
 * It is also the answer to whether a subdomain would have helped. A route
 * carries the same words with none of the split authority, and it is the page
 * a visitor actually needed either way.
 */
export const metadata = pageMetadata({
  path: "/install",
  // The verb someone searches, then the two things they are installing into.
  // It was "Install and use with shadcn/ui" at `/shadcn`, which named the
  // context rather than the job and put the term this page must not chase into
  // the URL as well as the title. See the route policy.
  title: "Install the icons in React or shadcn/ui",
  description:
    "How to add Keyline Icons to a shadcn/ui project: copy an SVG, import " +
    "the React components, size them inside Button and Sidebar, and swap out " +
    "lucide without touching your markup.",
  socialDescription:
    "Add Keyline Icons to a shadcn/ui project: copy an SVG, import the components, and swap out lucide.",
})

/**
 * Code blocks scroll rather than wrap. A wrapped import line reads as two
 * lines of code, and the one thing a snippet has to be is copyable by eye.
 */
function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-[13px] leading-relaxed">
      <code>{children}</code>
    </pre>
  )
}

/**
 * Every title leads with a mark, because the page is eleven sections of grey
 * prose and snippets and a reader scrolling for their framework had nothing to
 * catch on. A section about a product carries that product's logo, and the
 * rest carry a glyph from the set, so the titles still line up and the page's
 * own chrome stays drawn in its own icons.
 *
 * The mark sits in a box one line tall and the row aligns to the top, so a
 * title that wraps on a phone keeps its mark beside the first line rather than
 * centred between two.
 *
 * Each title is a link to itself, the way the changelog's release and section
 * titles are, so a reader can click one and share the address. `inline-flex`
 * rather than `flex` keeps the target to the words and the mark: a full-width
 * link turns the empty line beside a short title into something that jumps.
 */
function Section({
  id,
  title,
  mark,
  children,
}: {
  id: string
  title: string
  mark: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t pt-10">
      <h2 className="text-xl font-semibold tracking-tight">
        <a
          href={`#${id}`}
          className="group inline-flex items-start gap-2.5 text-foreground"
        >
          <span className="flex h-7 shrink-0 items-center gap-1.5 [&_svg]:size-5">
            {mark}
          </span>
          <span className="underline-offset-4 group-hover:underline">
            {title}
          </span>
        </a>
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

export default async function Page() {
  const faq = installFaq()

  /**
   * The per-style counts in the import sample, read off disk.
   *
   * They were typed in, and by the time anyone noticed they said 414, 340 and
   * 305 against an actual 441, 352 and 317. That is the failure this repo
   * already knows by name: a number typed into a string is a claim with an
   * expiry date, and nothing in the build will ever catch it going stale.
   * `loadIcons` memoises for the life of the process, so this costs nothing the
   * page was not already paying.
   *
   * The comment column is aligned by measuring rather than by typed spaces, so
   * it stays aligned when a style crosses into four digits, and `importPath`
   * comes from `lib/icon-code.ts` so the sample cannot name an entry point the
   * package does not export.
   */
  const icons = await loadIcons()
  const lines = CORNERS.flatMap((corners) =>
    STYLES.map((style) => ({
      label: corners === "sharp" ? `sharp ${style}` : style,
      code: `import { Bell } from "${importPath(style, corners)}"`,
      count: icons.filter((icon) => artOf(icon, style, corners)).length,
    }))
  )
  /*
    What Iconify serves, summed from the same eight counts rather than typed. It
    is the one number the frameworks section states, and the repo has already
    shipped three stale counts on this page by typing them.
  */
  const published = lines.reduce((n, l) => n + l.count, 0)
  const codeWidth = Math.max(...lines.map((l) => l.code.length))
  const labelWidth = Math.max(...lines.map((l) => l.label.length))
  const importSample = lines
    .map(
      ({ label, code, count }) =>
        `${code.padEnd(codeWidth + 2)}// ${`${label},`.padEnd(labelWidth + 1)} ${count.toLocaleString("en-US")}`
    )
    .join("\n")

  return (
    <>
      {/*
        Server-rendered in the body, like the homepage's and the icon pages'.
        `metadata` has no field for structured data, and this is built from the
        same array the section renders, so the markup cannot describe answers
        the page does not show.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd({ faq, path: "/install" })),
        }}
      />
      <SiteNav />

      {/*
        A narrower measure than the icon grid uses. The grid wants every pixel
        of a wide screen; prose past about 75 characters stops being readable,
        and this page is mostly prose and snippets.
      */}
      <main className="mx-auto w-full max-w-3xl px-6 pb-16 lg:px-8">
        <header className="pt-6 pb-12">
          {/* Word for word the `<title>`. Google rewrites a title that does
              not match what the page visibly leads with, and the rewrite is
              usually worse than the one you wrote. */}
          <h1 className="text-4xl font-semibold tracking-tight">
            Install the icons in React or shadcn/ui
          </h1>
          <p className="mt-3 text-base text-balance text-muted-foreground">
            The set is drawn on the same 24 grid and the same 2px keyline that
            shadcn/ui&apos;s defaults assume, so it drops in without any
            adjustment to your components.
          </p>
        </header>

        <div className="flex flex-col gap-10">
          <Section id="copy" title="Copy a single icon" mark={<Copy />}>
            <p>
              The fastest path, and it needs no install. Click any icon on the{" "}
              {/*
                `Link`, not an anchor. An `<a>` to a route in this app
                is a full page load rather than a client navigation, and the
                Next lint rule fails the build over it.
              */}
              <Link
                href="/icons"
                className="underline underline-offset-2 hover:text-foreground"
              >
                browser
              </Link>{" "}
              and its SVG goes to your clipboard, at whatever size and stroke
              width you have set there. Paste it straight into a component.
            </p>
            <p>
              Every drawing takes its colour from <code>currentColor</code>, so
              it inherits whatever <code>text-*</code> is in scope and needs no
              fill or stroke attribute of your own.
            </p>
          </Section>

          <Section
            id="install"
            title="Install the React package"
            mark={<ReactLogo />}
          >
            <p>
              Every icon is also a React component, generated from the same
              SVGs, so the two can never disagree.
            </p>
            <Code>{`npm i @keyline-icons/react`}</Code>
            <Code>{`import { Check, Plus, Settings } from "@keyline-icons/react"

<Check className="size-4" />
<Plus size={16} />
<Settings strokeWidth={1.5} />`}</Code>
          </Section>

          {/*
            Neither section carries a "not published yet" note any more. This one
            never did: the registry is served by this site, from
            `app/r/[...slug]/route.ts`, so it has always worked for anyone who
            can read this page. The React section above carried one until
            `@keyline-icons/react` went to npm, and it came out with the publish
            rather than later, because a caveat that outlives its reason sends
            people to copy files they could have installed.
          */}
          <Section
            id="registry"
            title="Install with the shadcn CLI"
            mark={<ShadcnLogo />}
          >
            {/*
              This named `package.json` first until someone ran it. shadcn's
              CLI reads registries from `components.json` only: through 4.13.0
              the same entry in `package.json` fails with "Add the registry
              configuration to your components.json file", which is a confusing
              way to be told the instructions were wrong.
            */}
            {/*
              `@keyline` has been in shadcn's registry index since 21 Sep 2026
              (shadcn-ui/ui#11976), so the CLI resolves it with no setup. The
              `components.json` entry stays below for CLIs that predate the
              index, and for anyone who wants the URL pinned in their repo.
            */}
            <p>
              Keyline is listed in shadcn&apos;s registry index, so the CLI
              already knows <code>@keyline</code>. Add icons by name:
            </p>
            <Code>{`npx shadcn add @keyline/bell
npx shadcn add @keyline/fill/bell         # any style but stroke is prefixed
npx shadcn add @keyline/sharp/fill/bell   # sharp corners lead the path
npx shadcn search @keyline                # browse the whole set`}</Code>
            <p>
              Any shadcn project already has a <code>components.json</code>, and
              this needs one: each icon arrives at{" "}
              <code>@components/icons/&lt;name&gt;.tsx</code>, and the alias is
              what puts it wherever you actually keep components rather than
              somewhere this set picked. In a project without one, the CLI
              offers to run <code>init</code> first.
            </p>
            <p>
              On an older CLI that does not read the index, add the registry to
              your <code>components.json</code> yourself:
            </p>
            <Code>{`"registries": {
  "@keyline": "https://keylineicons.com/r/{name}.json"
}`}</Code>
            <p>
              This is the path that gives you <strong>source</strong> rather
              than a dependency. Each icon arrives as a self-contained component
              that imports nothing from <code>@keyline-icons/react</code>, so
              you can rename it, edit the drawing, or fold it into whatever
              conventions your project already has.
            </p>
            <p>
              Which to choose is a question about ownership rather than about
              size. Take the package if you want the whole set behind one import
              and want redraws to arrive with a version bump. Take the registry
              if you want a handful of icons and would rather own the files than
              track someone else&apos;s releases.
            </p>
          </Section>

          {/*
            Ours, unlike the section below it, and generated in the same pass as
            the React package, so it carries the same names and entry points.
            The colour paragraph is the one difference worth a sentence: every
            snippet above leans on `className`, and a native reader copying one
            gets an icon that ignores their theme.
          */}
          <Section
            id="react-native"
            title="Install in React Native"
            mark={<ReactLogo />}
          >
            <p>
              The same components, drawn through{" "}
              <code>react-native-svg</code>, with the same entry points and
              export names. It works in Expo, web included.
            </p>
            <Code>{`npm i @keyline-icons/react-native react-native-svg`}</Code>
            <Code>{`import { Check } from "@keyline-icons/react-native"
import { Folder } from "@keyline-icons/react-native/duotone"

<Check size={16} color="#2563eb" />
<Folder color={theme.colors.primary} />`}</Code>
            <p>
              A native view has no CSS to inherit from, so colour is a{" "}
              <code>color</code> prop rather than <code>currentColor</code>. It
              defaults to black, and the two-tone and duotone plates follow it.
            </p>
          </Section>

          {/*
            The section that stops this page reading as React-only.
 
            It sits after both install paths and before everything below, which
            is React-specific from here down: sizing inside Button, stroke
            weight, the lucide swap. A reader who is not on React should meet
            their answer before the page stops being about them, rather than
            after five sections that assume a `className`.
 
            **None of these packages are ours, and the section says so.** They
            are Iconify's, reading the set from its published copy, which is
            also why there is no `@keyline-icons/vue` to look for on npm. A page
            that showed a Vue install without naming whose package it was would
            send the next reader hunting for the matching scope.
          */}
          <Section
            id="frameworks"
            title="Vue, Svelte and everything else"
            mark={
              <>
                <VueLogo />
                <SvelteLogo />
              </>
            }
          >
            <p>
              The whole set is published on{" "}
              <a
                href={ICONIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-foreground"
              >
                Iconify
                <ArrowUpRight className="size-3" />
                <span className="sr-only">{" (opens in a new tab)"}</span>
              </a>{" "}
              as <code>{ICONIFY_PREFIX}</code>, all {published.toLocaleString()}{" "}
              drawings, which is how every framework without a package here gets
              it. Iconify re-imports from the repository, so it carries whatever
              the last release drew.
            </p>
            <Code>{`npm i @iconify/vue      # Vue 3
npm i @iconify/svelte   # Svelte 5`}</Code>
            {/*
              The two imports differ and the comment is the point: Vue exports
              `Icon` by name and Svelte exports it as its default, which was
              read off each package's own type definitions rather than
              remembered. Getting it backwards puts a line on this page that
              does not compile.
            */}
            <Code>{`import { Icon } from "@iconify/vue"   // named
import Icon from "@iconify/svelte"    // default

<Icon icon="${ICONIFY_PREFIX}:bell" />
<Icon icon="${ICONIFY_PREFIX}:bell-fill" width="16" />
<Icon icon="${ICONIFY_PREFIX}:bell-sharp-two-tone" />`}</Code>
            <p>
              Names carry the style rather than the path doing it, which is
              Iconify&apos;s convention for a set with weights and not a choice
              made here: stroke is the bare name, and everything else is a
              suffix on it. <code>-two-tone</code>, <code>-duotone</code>,{" "}
              <code>-fill</code>, <code>-sharp</code>,{" "}
              <code>-sharp-two-tone</code>, <code>-sharp-duotone</code>,{" "}
              <code>-sharp-fill</code>.
            </p>
            <p>
              Anywhere with no framework package, including Angular, Solid and
              plain HTML, there is a web component. And for a project with no
              build step at all, the Tailwind plugin renders each icon as a
              mask, so it takes <code>text-*</code> like any glyph here:
            </p>
            <Code>{`npm i iconify-icon
<iconify-icon icon="${ICONIFY_PREFIX}:bell"></iconify-icon>

npm i -D @iconify/tailwind4
@plugin "@iconify/tailwind4";
<span class="icon-[${ICONIFY_PREFIX}--bell] size-4"></span>`}</Code>
            <p>
              Note the doubled hyphen in the class. Tailwind cannot take a colon
              inside a bracket, so Iconify spells the separator <code>--</code>{" "}
              there and <code>:</code> everywhere else.
            </p>
            <p>
              These fetch icon data from Iconify&apos;s API on demand rather
              than bundling it, which is the trade against the React package:
              nothing ships in your bundle, and a drawing arrives over the
              network the first time it renders. Every one of them has an
              offline entry point if that is the wrong trade for you.
            </p>
          </Section>

          {/*
            The other side of that trade, and the reason there is still no
            `@keyline-icons/vue`. unplugin-icons reads the same Iconify copy
            from `@iconify-json/keyline-icons` at build time and compiles each
            import into a component for whichever framework it is told, so a
            Vue, Svelte or Solid app gets per-icon imports, bundled and typed,
            with no package of ours to publish every release. A native Vue and
            Svelte package was offered in keyline-icons#4 and declined for
            exactly that reason.

            The compiler names and the default export on `~icons/*` were read
            off unplugin-icons 24.0.0's README and its `types/` declarations
            rather than remembered. `types/svelte` is Svelte 5; 4 and 3 have
            entries of their own.
          */}
          <Section
            id="unplugin-icons"
            title="Bundle them at build time"
            mark={<ViteLogo />}
          >
            <p>
              To ship the drawings inside your bundle instead,{" "}
              <a
                href="https://github.com/unplugin/unplugin-icons"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-foreground"
              >
                unplugin-icons
                <ArrowUpRight className="size-3" />
                <span className="sr-only">{" (opens in a new tab)"}</span>
              </a>{" "}
              reads the same Iconify copy at build time and compiles each icon
              you import into a component for your framework. Only what you
              import is bundled, and nothing is fetched at runtime.
            </p>
            <Code>{`npm i -D unplugin-icons @iconify-json/${ICONIFY_PREFIX}`}</Code>
            <Code>{`// vite.config.ts
import Icons from "unplugin-icons/vite"

plugins: [
  Icons({ compiler: "vue3" }),   // or "svelte", "solid"
]`}</Code>
            <Code>{`import IconBell from "~icons/${ICONIFY_PREFIX}/bell"
import IconBellSharpFill from "~icons/${ICONIFY_PREFIX}/bell-sharp-fill"

<IconBell class="size-4" />
<IconBellSharpFill />`}</Code>
            <p>
              Names take the same suffixes as above. Webpack, Rollup, esbuild
              and Nuxt have entry points of their own beside <code>/vite</code>.
              In TypeScript, add <code>unplugin-icons/types/vue</code> or{" "}
              <code>unplugin-icons/types/svelte</code> to{" "}
              <code>compilerOptions.types</code> so the <code>~icons/</code>{" "}
              imports resolve.
            </p>
            <p>
              An icon with no size of its own renders at 1.2em, the
              plugin&apos;s default, so it follows the text around it rather
              than the 24px the React package draws at. Pass{" "}
              <code>scale: 1</code> to make that 1em.
            </p>
          </Section>

          <Section
            id="sizing"
            title="Sizing inside shadcn components"
            mark={<ShadcnLogo />}
          >
            <p>
              {/*
                Spaces around `<code>` are written as expressions, not typed. A
                text node that wraps to the next line loses the whitespace it
                starts with, which rendered as "size-4in their variants" here.
                `site-footer.tsx` documents the same trap.
              */}
              shadcn/ui&apos;s primitives size their own icons, and Button does
              it conditionally. Its base class is{" "}
              <code>{`[&_svg:not([class*='size-'])]:size-4`}</code>, which
              reads: make any nested SVG 16px, unless it already carries a{" "}
              <code>size-*</code> class of its own.
            </p>
            <p>
              So there are two answers, and which you get depends on how you
              ask:
            </p>
            <Code>{`<Button>
  <Plus />                     {/* 16px. The variant sized it. */}
  <Plus size={32} />           {/* still 16px: the prop sets a width
                                  attribute, and the class beats it. */}
  <Plus className="size-6" />  {/* 24px. The :not() stands down. */}
</Button>`}</Code>
            <p>
              The size variants disagree on the number, which is worth checking
              against your own buttons rather than assuming: <code>xs</code> is
              12px, <code>sm</code> is 14px, and the default is 16px. The
              buttons below are <code>sm</code>, so their icons are 14.
            </p>
            <p>
              The primitives do not all agree, which is worth knowing before you
              debug one. DropdownMenu carries the same <code>:not()</code>{" "}
              clause Button does, so your own <code>size-*</code> wins there
              too. Sidebar does not: it uses <code>{`[&>svg]:size-4`}</code>,
              with no exception and on a direct child rather than any
              descendant, so a class of your own is ignored there.
            </p>
            <div className="flex flex-wrap items-center gap-3 rounded-lg border p-4 text-foreground">
              <Button size="sm">
                <Plus />
                New
              </Button>
              <Button variant="outline" size="sm">
                <Download />
                Export
              </Button>
              <Button variant="ghost" size="sm">
                <Settings />
                Settings
              </Button>
              <Button variant="destructive" size="sm">
                <Bin />
                Delete
              </Button>
            </div>
          </Section>

          <Section
            id="weight"
            title="Stroke width at small sizes"
            mark={<PenLine />}
          >
            <p>
              The set is drawn at 2 units on a 24 grid, which is where it is
              tested and where it should stay. At 16px that is the weight the
              drawings were checked at, including the ones that had to be opened
              up to survive it.
            </p>
            <p>
              Lighter weights work for large, decorative use. Below 16px they
              start to break the drawings up rather than refine them, because
              the gaps between elements were measured against a 2-unit keyline.
            </p>
            <div className="flex flex-wrap items-end gap-6 rounded-lg border p-4 text-foreground">
              {[1, 1.5, 2, 2.5].map((w) => (
                <div key={w} className="flex flex-col items-center gap-2">
                  <Bell size={32} strokeWidth={w} />
                  <span className="text-[11px] text-muted-foreground">{w}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="lucide"
            title="Coming from lucide"
            mark={<ArrowInRightDashedPanel />}
          >
            <p>
              shadcn/ui ships with lucide, and both sets are 24×24 with a 2px
              keyline and a <code>currentColor</code> stroke, so the swap is an
              import change rather than a markup change. This site is drawn
              entirely with its own icons, which is the same migration done end
              to end.
            </p>
            <Code>{`- import { Check, Menu } from "lucide-react"
+ import { Check, Menu } from "@keyline-icons/react"`}</Code>
            <p>
              Names mostly match, since both follow the same convention. Where
              they differ, the difference is usually a compound reading
              base-first: <code>mail-check</code> rather than{" "}
              <code>check-mail</code>. Search the browser for the base word to
              find the family.
            </p>
            <p>
              One prop difference worth knowing: lucide&apos;s{" "}
              <code>absoluteStrokeWidth</code> has no equivalent here. The
              stroke scales with the icon, which is what keeps an enlarged
              keyline looking drawn rather than hairline.
            </p>
          </Section>

          <Section id="styles" title="Four styles, one name" mark={<Shapes />}>
            <p>
              Every icon comes in all four styles. Stroke is the drawing.
              Two-tone keeps that outline over a 40% plate, which is what
              duotone meant until 0.9.0. Duotone drops the outline: a grey body
              with the detail in black. Fill is solid.
            </p>
            <div className="flex flex-wrap items-center gap-6 rounded-lg border p-4 text-foreground">
              {[
                { icon: User, label: "user" },
                { icon: Check, label: "check" },
                { icon: ChevronDown, label: "chevron-down" },
                { icon: Bell, label: "bell" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon size={28} />
                  <span className="text-[11px] text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <p>
              Each style is its own entry point in the package, so an app ships
              only the styles it imports. Code that imported duotone before
              1.0.0 and wants the outlined look changes the path to two-tone. The sharp
              corner treatment is one segment further along, and the export is
              called the same thing at either path:
            </p>
            <Code>{importSample}</Code>
            <p>
              A name that does not exist is a build error rather than a blank
              glyph, which is the better time to find out. Every style is
              also on disk as plain SVG in the{" "}
              <a
                href={SET_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-foreground"
              >
                repository
                <ArrowUpRight className="size-3" />
                <span className="sr-only">{" (opens in a new tab)"}</span>
              </a>
              .
            </p>
          </Section>

          <Section id="faq" title="FAQ" mark={<CircleQuestion />}>
            <p>
              The short answers, for scanning. Each one is a section above in
              longer form.
            </p>
            {/*
              Not the homepage's list. The obvious way to add an FAQ to a second
              page is to render the first one again, and that puts a duplicate
              block on two of the site's four hand-written pages. `/` answers
              whether the set is worth taking; this one answers questions asked
              with an editor already open. Only the licence appears in both.
            */}
            {/*
              One column here, unlike the icon pages. This page's measure is
              `max-w-3xl` because it is prose, and splitting that in two gives
              answers a 340px column: eight questions of narrow, tall text
              beneath a page of full-width paragraphs.
            */}
            <Faq items={faq} className="gap-y-12 md:grid-cols-1" />
          </Section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
