import { postKindLabel, postVersionLabel, type BlogPost } from "@/lib/blog"
import { BookOpen } from "@/components/icons"

/**
 * The chip above a post's date, on the index and on the post: an update's
 * version, or a guide's kind.
 *
 * The two look different on purpose. A version is a fact in a series and
 * stays the quiet mono chip it always was; a guide is a different kind of
 * page, and a reader scanning the index should see that before reading its
 * title, so it takes the one colour the site has. One component because the
 * index and the post page must print the same thing in the same shape.
 */
export function PostLabel({ post }: { post: BlogPost }) {
  const version = postVersionLabel(post)
  if (version) {
    return (
      <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] tracking-tight text-foreground">
        {version}
      </span>
    )
  }

  const kind = postKindLabel(post)
  if (!kind) return null
  /*
    With the set's open book in front, so the chip is recognised before it is
    read, the way the comparison sheets lead each row with a logo.
  */
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 py-0.5 pr-2 pl-1.5 text-[11px] font-medium tracking-wide text-primary">
      <BookOpen aria-hidden="true" className="size-3.5" />
      {kind}
    </span>
  )
}
