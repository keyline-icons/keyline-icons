import { pageMetadata, SITE_URL } from "@/lib/seo"
import {
  LEGAL,
  SET_ISSUES_URL,
  SET_LICENSE_NAME,
  SET_REPO_URL,
  SET_TITLE,
} from "@/lib/site-chrome"
import { LegalLink, LegalPage, LegalSection } from "@/components/legal-page"

/**
 * The terms for using the site, which are deliberately short.
 *
 * Two decisions shaped it, and both were taken against the boilerplate:
 *
 * - **No governing law and no jurisdiction clause.** The usual paragraph names
 *   a country and a court, and here it would name the maintainer's home address
 *   in all but words, in exchange for a clause that is unenforceable anyway
 *   against a reader who accepted nothing, paid nothing and signed nothing. A
 *   free set with no accounts and no payments has no dispute to route.
 * - **No indemnity, no arbitration, no class-action waiver and no
 *   "by using this site you agree" banner.** They belong to a service that has
 *   users and revenue. This one has readers.
 *
 * What is left is the part that is actually true and actually needed: the set is
 * licensed separately and these terms do not narrow that, the name is not part
 * of the grant, and there is one place to raise anything.
 *
 * Two sections were written and then removed at the author's request, and they
 * are worth naming so they are not helpfully reinstated by the next person:
 *
 * - **"The site comes as is"**, disclaiming warranty and availability. The
 *   disclaimer it restated is in the licence text and on `/legal/license`, and
 *   Liability below still covers the site.
 * - **"Using the site fairly"**, asking readers not to hammer it and pointing
 *   bulk users at the repo and the npm package. A rule nobody is going to
 *   enforce, addressed to an audience that is not the problem.
 * - **"Other people's services"**, disclaiming GitHub, npm, Figma, paper.design
 *   and X. `/legal/privacy` already says that following a link puts you under
 *   someone else's rules, which is the part a reader needs.
 *
 * The licence section is the one to be careful with. **Terms may not add a
 * condition MIT does not impose**, so it links to `/legal/license` and states
 * that it takes nothing back, rather than restating the grant in words that
 * could drift from it.
 *
 * `updated` is hand-kept: the date the terms last changed, not the date the
 * file was last touched.
 */
export const metadata = pageMetadata({
  path: LEGAL.terms,
  title: "Terms",
  description:
    `The terms for using the ${SET_TITLE} site: what it promises, what it ` +
    `does not, and how to take the whole set without hammering it. The icons ` +
    `themselves are covered by the ${SET_LICENSE_NAME}.`,
  socialDescription:
    "What you can expect from the site, and what it expects from you.",
})

export default function Page() {
  const host = SITE_URL.replace(/^https:\/\//, "")

  return (
    <LegalPage path={LEGAL.terms} title="Terms" updated="2026-08-23">
      <LegalSection id="scope" title="What these terms cover">
        <p>
          The website at {host}: these pages, the icon browser, the demos and
          the registry it serves. They are the terms on which the site is
          offered, and they apply while you use it.
        </p>
        <p>
          They do not cover the icons themselves. Those are licensed, which is a
          different thing from terms of use, and the licence is not conditional
          on this page.
        </p>
        <p>
          What the site records while you read it is a separate question, and it
          has its own page: <LegalLink href={LEGAL.privacy}>Privacy</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection id="license" title="The icons are licensed separately">
        <p>
          {SET_TITLE} is free under the{" "}
          <LegalLink href={LEGAL.license}>{SET_LICENSE_NAME}</LegalLink>, and
          nothing in these terms adds a condition to that grant, withdraws part
          of it, or makes it depend on your agreement to anything here. If the
          two ever appear to conflict, the licence governs what you may do with
          the drawings and the code.
        </p>
      </LegalSection>

      <LegalSection id="name" title="The name and the mark">
        <p>
          {SET_TITLE}, the wordmark and the logo are not part of what the
          licence gives away. Say that your product uses the set, by all means.
          Do not name a fork after it, and do not present the mark in a way that
          suggests we made or endorsed something we did not. The reasoning is on
          the <LegalLink href={LEGAL.license}>License</LegalLink> page.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="Liability">
        <p>
          To the fullest extent the law allows, nobody involved in publishing
          this site is liable for any loss or damage arising from using it or
          the icons on it, whether that is downtime, a drawing that turned out
          to be wrong for the job, or anything that follows from either. This
          matches the last paragraph of the licence, which says the same thing
          about the set.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="Changes">
        <p>
          These terms can change. The date at the top is the day they last did,
          and every revision is in the public{" "}
          <LegalLink href={SET_REPO_URL}>repository&apos;s</LegalLink> commit
          history, with the reason in the message.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="Getting in touch">
        <p>
          There is no support inbox. Questions, corrections and notices go to
          the repository&apos;s{" "}
          <LegalLink href={SET_ISSUES_URL}>issue tracker</LegalLink>, which is
          where the work is and where an answer stays readable for the next
          person asking.
        </p>
        <p>
          It is public. Do not put personal details in an issue: say what the
          problem is, not who you are.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
