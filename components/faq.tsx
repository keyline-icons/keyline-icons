import type { FaqEntry } from "@/lib/faq"
import { cn } from "@/lib/utils"

/**
 * A list of questions and answers, on any of the three pages that has one.
 *
 * It exists as a component because the alternative is three copies of the same
 * `dl`, and the markup is not arbitrary: `dt`/`dd` rather than `h3`/`p`, because
 * these are terms and their definitions. As headings they would give every page
 * an outline that runs h1, h2, then eight or ten h3s, which a screen reader
 * announces as eight subsections of the FAQ rather than as a list of pairs.
 *
 * Answers are plain strings, and that is load-bearing rather than lazy: each
 * page emits the same array as `FAQPage` structured data, which may only quote
 * what is actually rendered. A link or a `<code>` inside an answer would fork
 * the two, so anything that wants a link goes underneath the list.
 *
 * Two columns from `md` up. A single column of ten questions is a very long
 * thin list on a wide page, and a question is self-contained, so nothing is
 * lost by reading down one column and back up the next.
 */
export function Faq({
  items,
  className,
}: {
  items: FaqEntry[]
  className?: string
}) {
  return (
    <dl className={cn("grid gap-x-20 gap-y-12 md:grid-cols-2", className)}>
      {items.map((entry) => (
        <div key={entry.question} className="flex flex-col gap-1.5">
          {/*
            `text-foreground` explicitly, not by inheritance. `/install` wraps
            its sections in `text-muted-foreground`, so a question with no
            colour of its own came out the same grey as its answer and the pair
            stopped reading as a question and an answer.
          */}
          <dt className="text-base font-medium text-foreground">
            {entry.question}
          </dt>
          <dd className="text-base leading-relaxed text-muted-foreground">
            {entry.answer}
          </dd>
        </div>
      ))}
    </dl>
  )
}
