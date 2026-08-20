import Link from "next/link"

import { Check, CircleCheck, SquareCheck } from "@/components/icons"
import { PhoneToggleFace } from "@/components/phone-toggle"

/**
 * Three panels for the container section: one drawing, its two container forms,
 * and each one lifted out of a piece of real UI.
 *
 * The shape is Apple's product three-up: a panel carrying a scene, then a line
 * of copy under it whose first clause is in full-strength ink and whose
 * remainder is muted.
 *
 * **The subject is the glyph, and the interface is the setting.** This was
 * three UI scenes with the set's icons doing their job inside them, and the job
 * they did was disappear: at 16px in a menu row a glyph is furniture, and a
 * panel of furniture reads as a component library rather than as an icon set.
 * So each panel now does two things at once. The scene is there, real and at
 * the size it would really render, and the drawing is also pulled out of it at
 * a size you can actually see the construction of.
 *
 * Each does it differently, because three identical treatments would be a grid
 * of specimens again: the first gives the mark a whole confirmation screen to
 * carry, the second enlarges an interface until the mark is legible inside it,
 * the third puts it in the notification a real save produces and raises that
 * off the page it belongs to. Same idea, three readings of it.
 *
 * **One family across all three**, `check`, `square-check` and `circle-check`,
 * which is the argument the section is making: the container wraps the base
 * drawing rather than replacing it. Three unrelated glyphs would have shown
 * three icons. This shows one icon three ways, and the tick is identical in
 * every panel because it is the same drawing in each.
 */

/**
 * The panel and its caption. Nothing else in this file sets that geometry.
 *
 * The whole column is a link to the browser, filtered to the shelf the panel is
 * about: bare drawings, square ones, circle ones. It pointed at the three icon
 * pages first, `/icons/check` and its siblings, which is the more obvious
 * reading of "the card's contents" and the wrong one for this section. The
 * panel is not about that tick; it is about a *form* the whole set comes in,
 * and the honest destination is the hundred-odd other drawings that share it.
 *
 * `?shape=` is a seed rather than an address, the same as `?style=` on the
 * styles row above. See `app/icons/page.tsx`.
 */
function Column({
  href,
  label,
  children,
  lead,
  rest,
}: {
  /** The icon page this panel is about. */
  href: string
  /** The link's accessible name, since its own text is a whole sentence. */
  label: string
  /** The scene. Positioned against this box, which is why it is `relative`. */
  children: React.ReactNode
  /**
   * The clause in full-strength ink. A node rather than a string, because each
   * of these opens with a file name and a file name is set in mono.
   */
  lead: React.ReactNode
  rest: string
}) {
  return (
    <Link href={href} aria-label={label} className="group block">
      {/*
        `overflow-hidden` is the crop. Each scene is laid out larger than this
        box and runs off its edges, which is what makes it read as a piece of a
        real screen rather than as a widget centred on a card.

        A fixed aspect rather than a height, so the three stay a matched set at
        every width instead of being sized by whichever scene is tallest.

        The hover is on the panel's own fill, one step off the page. The scenes
        inside are pictures of interfaces, and hovering the card must not look
        like hovering the interface in it.
      */}
      <div className="relative aspect-5/4 overflow-hidden rounded-lg bg-muted transition-colors group-hover:bg-muted-hover">
        {children}
      </div>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">
        {lead} {rest}
      </p>
    </Link>
  )
}

/** The file name, which is what the reader would type into the search field. */
function Name({ children }: { children: string }) {
  return (
    <span className="font-medium text-foreground">
      <code className="font-mono">{children}</code>
    </span>
  )
}

/**
 * `check`, carrying a confirmation screen on its own.
 *
 * The end of a flow: the mark at 56px and the two lines saying what happened,
 * and nothing else. This is the use the bare drawing was made for, and the one
 * that shows what having no container costs and buys. A
 * tick with nothing around it needs space and a centred axis to read as a
 * statement rather than as a dropped mark; given them, it says "done" at a size
 * no framed version can, because a frame at 56px starts looking like a button.
 *
 * Two earlier drafts are worth not repeating. A "Sort by" menu with the chosen
 * row ticked is the other honest use of a bare check and the weaker one: a tick
 * at the end of a menu row means "this one", not "that worked". A field going
 * valid, with a loupe magnifying the tick inside it, put the drawing at a size
 * you could read but left it as a detail of somebody's form.
 *
 * It is deliberately not the toast in the third panel. A toast is what a
 * confirmation becomes when it has to arrive over something else, which is
 * exactly when the mark needs a container to hold it together at 20px. Two
 * panels showing one notification would have made the section argue with
 * itself; a full-page confirmation and a toast are the two ends of the same
 * job.
 *
 * The mark stays in the page's own ink. Every reference for this screen paints
 * it green, and green is not in this theme: the only colours here are
 * `--destructive` and the chart ramp, and inventing a success token for one
 * decorative panel is how a palette grows a colour it cannot use anywhere else.
 */
function BareScene() {
  return (
    // Set one step larger than a real screen would be, matching the task list
    // in the next panel. These are crops rather than screenshots, and a crop
    // that keeps the original type sizes reads as a small picture of a screen
    // instead of a close look at one.
    <div className="absolute inset-x-6 top-7 h-full rounded-lg bg-background px-5 pt-12 text-center sm:inset-x-8 sm:top-9">
      {/*
        1.5, not the set's 2. A 2px keyline scaled to 56px is a heavy mark when
        it is the only thing on a screen, and thinning it is safe *here*: this
        is a stroke drawing, which is nothing but its keyline, so the width is a
        setting the way the browser's slider treats it.

        It would not be safe on a duotone drawing. Those carry a plate baked to
        the outer contour of a 2-unit stroke, so anything under 2 leaves the
        plate proud of the keyline as a grey hairline. See the note on `STROKE`
        in `components/style-showcase.tsx`.
      */}
      <Check className="mx-auto size-14" strokeWidth={1.5} />

      {/*
        Tight to the mark, and one step down from what it was. The heading is
        the caption on a glyph rather than the title of a page: put six units
        of air under a 56px tick and the two stop being one object.
      */}
      <p className="mt-3 text-lg font-semibold tracking-tight">Request sent</p>
      {/*
        No `text-balance`. The measure is already set by `max-w-64`, and
        balancing on top of it evens the two lines by pulling the first one in,
        which reads as a short first line under a heading that is centred on
        neither. Two lines against a fixed measure break where they break.
      */}
      <p className="mx-auto mt-0.5 max-w-64 text-sm text-muted-foreground">
        Your ticket is logged. We will reply by email within a day.
      </p>

      {/*
        No buttons. There were two, "View ticket" and "Done", and they were the
        one thing in these panels doing no work: a picture of a CTA on a page
        whose actual CTAs are two sections above it, competing with them and
        clickable by nobody. What is left is the mark and the sentence it
        stands over, which is all this panel was ever showing.
      */}
    </div>
  )
}

/**
 * `square-check`, at the size a task list actually reads at.
 *
 * The third device, and the plainest: no loupe and no blur, just the list
 * enlarged until the mark is the biggest thing in the panel and cropped so it
 * runs off two edges. A checkbox is the one place a container form is doing
 * real work rather than decorating a row, and at 24px against 18px text the
 * drawing is legible enough that nothing has to be lifted out of it.
 *
 * It was the drawing at 112px over the same list out of focus. The blur was a
 * good device one panel too many: next to a loupe on one side and a
 * notification over a blurred page on the other, three panels all pushing their
 * own content away read as one effect applied three times.
 *
 * The third row is the same glyph at 40% rather than a different one. An empty
 * `square` would be the literal choice for an unticked task and would put a
 * second drawing in a panel about one.
 */
function ContainedScene() {
  return (
    // Off the right and the bottom, with `h-full` carrying the surface past
    // the frame. A card that ends inside the panel is a widget on a card; one
    // that leaves it is a screen.
    <div className="absolute top-7 -right-8 -bottom-8 left-7 h-full rounded-lg bg-background p-6 sm:top-9 sm:left-9">
      {[
        { label: "Draw the icon", done: true },
        { label: "Export the SVG", done: true },
        { label: "Ship it", done: false },
      ].map((row) => (
        <div
          key={row.label}
          className={
            "flex items-center gap-4 py-3.5 text-lg " +
            (row.done ? "" : "text-muted-foreground")
          }
        >
          <SquareCheck
            className={"size-6 shrink-0 " + (row.done ? "" : "opacity-40")}
          />
          {row.label}
        </div>
      ))}
    </div>
  )
}

/**
 * A settings row, out of focus. Its silhouette is all that has to survive.
 *
 * The switch is `PhoneToggleFace`, the site's own, not a rounded div with a
 * white dot in it. That shortcut was here first and it is exactly the failure
 * the `site-ui` skill's reuse table exists to prevent: a second switch, at its
 * own proportions, on a page that already has one. A blurred mock is the
 * easiest place in the world to justify a fake control and the easiest place to
 * get caught, since the mock is a picture of what this set looks like in use.
 */
function SettingRow({ label, on }: { label: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t py-3 first:border-t-0 first:pt-0">
      <span className="text-sm">{label}</span>
      <PhoneToggleFace on={Boolean(on)} />
    </div>
  )
}

/**
 * `circle-check`, in the notification a real save produces.
 *
 * The panel is a settings form out of focus with the toast sharp on top of it,
 * and the form is the part that took the most rewriting. It was a 256px glyph
 * bled off the corner with the toast on an empty field, which made a handsome
 * panel and a meaningless one: a "Changes saved" message floating over nothing
 * is a sticker, and the reader has no idea what was saved or why the mark is
 * there. A switch, a field and a Save button is the shortest form that puts the
 * message in a sentence.
 *
 * **This is the one raised element on the site, and it is raised because it is
 * a toast.** Everything in the site's own chrome is flat by rule; a
 * notification is the one component whose entire job is to be over the page
 * rather than in it, and inside a mock of somebody else's screen the shadow is
 * describing their UI, not ours.
 */
function CircleScene() {
  return (
    <>
      {/*
        Running off three edges, so it reads as a page continuing past the
        frame rather than as a card sitting in the middle of one.

        2px of blur, not 4. At 4 the form was mush and the panel read as a
        notification on a texture; at 2 the switch, the field and the Save
        button are all still legible as themselves, which is the whole reason
        the page is back there. Enough to push it behind the toast, not enough
        to stop it being a settings page.
      */}
      <div className="absolute inset-x-4 -top-2 -bottom-2 blur-[2px] sm:inset-x-6">
        {/*
          Sized by its content, not `h-full`. Stretched to the frame the form
          left a field of empty white between the Save button and the toast,
          which is a lot of nothing in the one panel that has the most in it.
          Ending where it ends puts the toast on the grey below the card, and a
          notification below a short page is exactly where a bottom-anchored
          toast sits on a real screen.
        */}
        <div className="rounded-lg bg-background p-4">
          <p className="text-sm font-medium">Preferences</p>

          {/*
            One switch, not two. The second was there to make the form look
            like a form, and past the first row it stopped adding anything: a
            switch, a field and a Save button is already every kind of control
            a settings page has, and the shorter card leaves the toast room.
          */}
          <div className="mt-3">
            <SettingRow label="Email notifications" on />
          </div>

          <div className="mt-1 border-t pt-3">
            <p className="text-xs text-muted-foreground">Display name</p>
            <div className="mt-1.5 rounded-md border px-2.5 py-1.5 text-sm">
              Keyline Icons
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <span className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
              Save changes
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-6 rounded-lg bg-background p-3 shadow-lg sm:inset-x-7 sm:bottom-8">
        <div className="flex items-start gap-2.5">
          {/*
            20px, not the 16 a body row would take. A toast's icon sits against
            two lines rather than one and carries the status on its own, which
            is the size difference every notification component ships with.
          */}
          <CircleCheck className="size-5 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium">Changes saved</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Your settings are up to date.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export function KeylineShowcase() {
  return (
    // Three across only at `lg`. At `md` the columns are about 230px, which
    // crops the scenes past the point of being readable; below that they stack
    // full width and each one gets the room it was drawn at.
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-8">
      <Column
        href="/icons?shape=regular"
        label="Browse the icons with no container"
        lead={<Name>check</Name>}
        rest="is the drawing with nothing around it, which is what lets it grow. At 56px on a confirmation screen it is the whole message, and at 16 it slips into a row of text without interrupting it."
      >
        <BareScene />
      </Column>

      <Column
        href="/icons?shape=square"
        label="Browse the square icons"
        lead={<Name>square-check</Name>}
        rest="is that same tick inside a container, which gives it the weight to lead a row rather than end one. Nothing about the tick changes."
      >
        <ContainedScene />
      </Column>

      <Column
        href="/icons?shape=circle"
        label="Browse the circle icons"
        lead={<Name>circle-check</Name>}
        rest="is the third form. A circle reads softer than a square at the same size, which is why it is the one that ends up in confirmations."
      >
        <CircleScene />
      </Column>
    </div>
  )
}
