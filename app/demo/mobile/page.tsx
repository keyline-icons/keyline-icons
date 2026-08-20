import { loadIcons } from "@/lib/icons"
import { pickMobileIcons } from "@/lib/mobile-demo"
import { pageMetadata } from "@/lib/seo"
import { MobileShowcase } from "@/components/mobile-showcase"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"

/**
 * This page used to write the set name into its own title. That predates the
 * layout's title template, which appends the set name itself, so the two
 * together rendered it twice: `Mobile · Keyline Icons · Keyline Icons`. A page
 * passes its own name and nothing else.
 *
 * "Mobile demo" was the replacement, and it was the page's route talking
 * rather than the page. Nobody searches for a demo; they search for icons and
 * then want to see some on something.
 *
 * The title is the page's own heading, near enough word for word, which is the
 * rule about a title agreeing with what the page visibly leads with. It also
 * gives up "mobile app icons" as a phrase, deliberately: `/demo` reads
 * "Icons in a shadcn/ui dashboard" and this one "Icons on a phone screen", so
 * the two demos state what they are in the same shape. Two results that look
 * like a set beat two that each grab for a keyword.
 *
 * The description drops the word "demo" too and describes the thing on screen:
 * a whole phone app, drawn end to end, whose layout does not move when the
 * style changes. That last clause is the actual argument this page makes, and
 * it is the reason to click rather than a restatement of the title.
 *
 * No icon count here. The homepage carries that number; repeating it on a demo
 * spends the snippet on something the searcher can already see in the result
 * above.
 */
export const metadata = pageMetadata({
  path: "/demo/mobile",
  title: "Icons on a phone screen",
  description:
    "A whole phone app drawn end to end with Keyline Icons. Switch between " +
    "stroke, duotone and fill in place, and nothing in the layout moves.",
  socialDescription:
    "A whole phone app drawn end to end with Keyline Icons. Switch stroke, duotone and fill in place.",
})

export default async function Page() {
  const icons = await loadIcons()

  return (
    <>
      <SiteNav />
      <MobileShowcase
        icons={pickMobileIcons(icons)}
        totalIcons={icons.length}
      />
      <SiteFooter />
    </>
  )
}
