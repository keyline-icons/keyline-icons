import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { loadIcons } from "@/lib/icons"
import { pageMetadata } from "@/lib/seo"
import {
  LEGAL,
  SET_FIGMA_URL,
  SET_ISSUES_URL,
  SET_LICENSE,
  SET_LICENSE_NAME,
  SET_LICENSE_URL,
  SET_PAPER_URL,
  SET_REPO_URL,
  SET_TITLE,
} from "@/lib/site-chrome"
import {
  LegalLink,
  LegalList,
  LegalPage,
  LegalSection,
} from "@/components/legal-page"

/**
 * What you may do with the set, in the words the licence text cannot use.
 *
 * The MIT text is 170 words and answers none of the questions an icon set is
 * actually asked, because it was written about software: whether the *drawings*
 * are covered as well as the code, whether a paid product may ship them,
 * whether attribution is owed, and whether the name comes with them. Every one
 * of those has an answer, and every one of them is a question somebody has to
 * decide before adopting the set. This page answers them and then prints the
 * text, rather than printing the text and leaving the reader to infer.
 *
 * A "No warranty" section put the text's last paragraph into ordinary words and
 * came out at the author's request. The paragraph itself is still on the page,
 * in the licence text at the bottom, which is the version that governs anyway.
 *
 * The one hard rule, stated on the page as well as here: **nothing here may add
 * a condition MIT does not impose.** A licence page that quietly narrows the
 * grant is worse than no page, because it is the one a reader will find first.
 * "Where this page and the file disagree" is on the page for that reason, and
 * it says the file wins.
 *
 * `updated` is the date the *terms* last changed, not the date this file was
 * last touched. Fixing a typo here does not move it. It is hand-kept for that
 * reason: a build-time date would be a claim that the licence changed every
 * time the site was deployed, which is the one thing a legal date must not do.
 */
export const metadata = pageMetadata({
  path: LEGAL.license,
  // "License" alone, matching the `h1` and the footer link. The template
  // appends the set name, so this reads "License · Keyline Icons" in a tab.
  title: "License",
  description:
    `${SET_TITLE} is free under the ${SET_LICENSE_NAME}: use the icons in ` +
    `personal and commercial work, modify them, and ship them in products you ` +
    `sell, with no attribution required and no limit on projects or seats.`,
  socialDescription: `Use the icons anywhere, commercially, with no attribution required. ${SET_LICENSE_NAME}.`,
})

/**
 * The licence text, read off disk rather than pasted in.
 *
 * A second copy of MIT in a `.tsx` file is a copy that drifts from the one the
 * repo actually ships, and the drift is silent: the two differ by a year or a
 * holder and nothing type-checks either. This is the same read `lib/icons.ts`
 * does for the drawings, for the same reason.
 *
 * The page uses no dynamic API, so Next prerenders it and this runs at build.
 * That matters if anything here ever becomes dynamic: the read would move to
 * request time, and `LICENSE` has to be in the deployed image for it. Keep the
 * page static.
 */
async function licenseText() {
  return (await readFile(join(process.cwd(), "LICENSE"), "utf8")).trim()
}

export default async function Page() {
  /*
    The count moved out of a lead paragraph and into the one section that turns
    on it: "the drawings are covered too" is a claim about how many things the
    grant reaches, and it is the sentence a reader checks. Counted from
    `loadIcons()` rather than typed, like every other number in this site's
    prose. `loadIcons` memoises, so it costs nothing the build was not already
    paying.
  */
  const [text, icons] = await Promise.all([licenseText(), loadIcons()])

  return (
    <LegalPage path={LEGAL.license} title="License" updated="2026-08-23">
      <LegalSection id="allowed" title="What you can do">
        <p>
          Everything below is granted by the licence, not offered as a
          concession. No sign-up, no invoice, no seat count, and nothing to
          apply for.
        </p>
        <LegalList>
          <li>
            Use the icons in personal projects, commercial products, client
            work, and anything in between.
          </li>
          <li>
            Ship them in something you charge for: an app, a theme, a template,
            a design file, a printed thing.
          </li>
          <li>
            Modify them. Recolour, restyle, redraw, combine two into one, rename
            them, fork the whole set.
          </li>
          <li>
            Redistribute them, on their own or inside a larger set, as long as
            the notice below travels with the copy.
          </li>
          <li>
            Use them without crediting anyone. Attribution is welcome and is not
            a condition.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="condition" title="The one condition">
        <p>
          MIT asks for exactly one thing: the copyright notice and the
          permission text go with any copy of the work, or any substantial part
          of it.
        </p>
        <p>
          In practice that means keeping the{" "}
          <LegalLink href={`${SET_REPO_URL}/blob/main/LICENSE`}>
            LICENSE
          </LegalLink>{" "}
          file if you vendor the SVGs into your own repository, or leaving the
          package&apos;s licence in place if you install it from npm, which
          every package manager does for you. Dropping a handful of icons into a
          product&apos;s interface is the ordinary use of an icon set, and it is
          what the grant is for.
        </p>
      </LegalSection>

      <LegalSection id="artwork" title="The drawings are covered too">
        <p>
          Worth saying plainly, because MIT was written about software and an
          icon set is mostly artwork. The licence here covers both: all{" "}
          {icons.length} drawings, the React components, the build pipeline and
          this site are one work under one grant. There is no separate asset
          licence, no free tier and no paid tier.
        </p>
        <p>
          The same drawings are published in several places, and the licence
          does not change between them: the{" "}
          <LegalLink href={SET_REPO_URL}>repository</LegalLink>, the npm
          packages, the{" "}
          <LegalLink href={SET_FIGMA_URL}>Figma Community file</LegalLink> and
          the <LegalLink href={SET_PAPER_URL}>paper.design file</LegalLink> all
          carry the same set on the same terms. Each of those platforms has its
          own terms of use for the platform itself, which are theirs and not
          ours.
        </p>
      </LegalSection>

      <LegalSection id="name" title="What the licence does not cover">
        <p>
          The name and the mark. MIT grants rights in a work; it grants nothing
          in what the work is called, which is why the footer&apos;s notice
          carries a ™ next to a licence that gives everything else away.
        </p>
        <LegalList>
          <li>
            Say your product uses {SET_TITLE}. That is accurate and nobody needs
            permission for it.
          </li>
          <li>
            Do not name a fork, a redraw or a competing set {SET_TITLE}, or
            anything close enough to be mistaken for it.
          </li>
          <li>
            Do not use the wordmark or the logo in a way that suggests we made,
            reviewed or endorsed your product.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="conflict" title="If this page and the licence disagree">
        <p>
          The licence wins. Nothing on this page is a further condition, and
          nothing here narrows what MIT grants. If a sentence above reads like a
          restriction the text does not impose, that sentence is badly written:{" "}
          <LegalLink href={SET_ISSUES_URL}>tell us</LegalLink> and it will be
          fixed.
        </p>
        <p>
          This is a plain-language reading by the people who publish the set,
          not legal advice. If the answer matters to your business, ask someone
          who gives it professionally.
        </p>
      </LegalSection>

      <LegalSection id="text" title={`The ${SET_LICENSE} License`}>
        <p>
          The file this repository ships, printed here word for word rather than
          summarised, and also readable as the{" "}
          <LegalLink href={SET_LICENSE_URL}>canonical text</LegalLink>.
        </p>
        {/*
          `whitespace-pre-wrap` rather than the install page's scrolling `pre`.
          A licence is read, not copied into a terminal, and the MIT text is
          hard-wrapped at 80 columns: left to scroll horizontally it would sit
          in a box the reader has to drag through, on a page whose entire job is
          to be read.
        */}
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-[13px] leading-relaxed whitespace-pre-wrap">
          <code>{text}</code>
        </pre>
      </LegalSection>
    </LegalPage>
  )
}
