// Bake each icon's dates and release into lib/icon-history.json.
//
//   node pipeline/build-history.mjs [--check]
//
// The preview panel states when an icon was added, when it last changed and
// which version it ships in. Git is not there at runtime, because a deployed
// image is the build output rather than the repository, so they are resolved
// here, once, and committed like every other generated artefact.
//
// This file is generated from two inputs, not one: this repository's git log,
// and its own previous contents. The second exists because the public history
// starts on 20 August 2026 and the set was drawn over the fortnight before it.
// See the merge below for what that means and why it is safe to re-run.
//
// Deliberately NOT in `icons:ci`. Every commit that touches a drawing changes
// its date, so a check would fail on the commit that makes the change and pass
// only after a second commit regenerating this — a loop that teaches people to
// ignore it. Run it with the icon build when you have changed drawings.

import { readdir, readFile, writeFile } from "node:fs/promises"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { execFileSync } from "node:child_process"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const OUT = join(ROOT, "lib", "icon-history.json")

/**
 * The hand-written half of the changelog, keyed by version plus `unreleased`.
 *
 * Everything else this file bakes is read off git, which is right for drawings:
 * a list of what was added or redrawn should never be typed. A release is not
 * always drawings, though. The corner treatment added a whole axis without
 * adding a single name, so git had nothing to report about it and the page
 * would have announced the redraws it happened to carry and nothing else.
 *
 * Read here rather than in the page, so the site, the Paper board and anything
 * else downstream all take the sentence from one place. Missing is fine and
 * common: most releases are drawings and describe themselves.
 */
const NOTES = JSON.parse(
  readFileSync(join(ROOT, "lib", "icon-release-notes.json"), "utf8")
)

/**
 * The counts a note is allowed to quote, filled in here rather than typed.
 *
 * A number in a sentence is a claim with an expiry date, and this repository
 * has shipped three stale ones on the install page and built a checker to stop
 * the fourth. The prose is the part a person writes; the arithmetic is not.
 *
 * `{names}` is drawings and `{files}` is SVGs on disk across both corner
 * treatments, which are different questions and the reason a note wants both:
 * the set gained no names at all when sharp landed and doubled its files.
 */
function fill(note) {
  if (!note) return null
  const names = Object.keys(icons).length
  let files = 0
  for (const corners of ["", "sharp/"])
    for (const style of STYLES) {
      const dir = join(ROOT, "icons", corners, style)
      if (!existsSync(dir)) continue
      files += readdirSync(dir).filter((f) => f.endsWith(".svg")).length
    }
  const values = { names, files }
  return note.replace(/\{(\w+)\}/g, (whole, key) =>
    key in values ? values[key].toLocaleString("en-US") : whole
  )
}
const check = process.argv.includes("--check")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const git = (...args) =>
  execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 64 << 20,
  })

/** The style folders, in the order a redraw is looked for. */
const STYLES = ["stroke", "duotone", "fill"]

/**
 * One file as a given ref had it, or null where that ref did not carry it.
 *
 * Quiet on purpose: a miss is an ordinary answer here, not a failure. An icon
 * can have gained a style inside the window being measured, and `git show` on a
 * path a tag never held exits non-zero and prints to stderr, which would fill
 * the build's output with lines that mean "no".
 */
const fileAt = (ref, path) => {
  try {
    return execFileSync("git", ["show", `${ref}:${path}`], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
  } catch {
    return null
  }
}

/**
 * What `icons/stroke/` actually held at a ref.
 *
 * **A release's membership is a fact about its tree, not about dates.** The
 * arithmetic this replaced asked whether each drawing's `added` date fell
 * inside the window, which is only the same question while no drawing is ever
 * retired. `megaphone` was drawn on 24 August, retired forty minutes before
 * v0.1.2 was tagged and drawn again on the 25th; its `added` is deliberately
 * held at the earlier date by the merge below, so the window counted it into
 * v0.1.2, v0.1.3 and v0.1.4 — three releases whose trees do not contain it, and
 * three published counts one too high. The Figma Changelog page, written by
 * hand off the tags, was right where all the generated surfaces were wrong.
 *
 * `git ls-tree` answers it exactly, at one subprocess per tag.
 */
const held = (ref) =>
  new Set(
    git("ls-tree", "-r", "--name-only", `${ref}:icons/stroke`)
      .split("\n")
      .filter((f) => f.endsWith(".svg"))
      .map((f) => f.slice(0, -4))
  )

/**
 * How many drawings a release actually shipped, across the whole of `icons/`.
 *
 * `held` counts *names*, off `icons/stroke/` alone, and that is the right unit
 * for "what is in the set" — but it is not the unit for "what landed". v0.3.0
 * added 1,497 drawings and not one new name, so every surface counting names
 * announced the largest release the set has had as "No new drawings", directly
 * under a note saying the file count had doubled.
 *
 * A treatment is the case that breaks the equivalence, and there will be
 * others: anything that draws the existing names a new way adds drawings
 * without adding names. So the entry carries both, and the sentence picks.
 */
const drawings = (ref) =>
  git("ls-tree", "-r", "--name-only", `${ref}:icons`)
    .split("\n")
    .filter((f) => f.endsWith(".svg")).length


/**
 * A redrawn icon as the two drawings a reader is being asked to compare.
 *
 * A changelog that only *names* what was redrawn is asking the reader to
 * remember what the icon used to look like, which nobody can do — and the
 * whole reason to publish a correction is that the drawing changed visibly.
 * So each redraw carries both documents, whole, and every surface prints them
 * side by side.
 *
 * **Both sides come out of the refs that bound the window, never off disk for
 * a released entry.** The "after" of v0.1.3 is the drawing v0.1.3 shipped; if
 * the same icon is redrawn again in v0.1.6, the earlier entry still has to
 * show the pair it was published with. Reading the working tree instead would
 * rewrite every past entry the moment an icon is touched twice, which is the
 * same class of defect as a rebuild that drops a release.
 *
 * `to` is null for the unreleased window, whose "after" is the working tree,
 * because that is what has actually been drawn and what the site renders.
 *
 * The style is the first one whose file genuinely differs across the window.
 * A drawing can be committed without changing — a rename, a reformat, a change
 * confined to one style — and printing two identical tiles under "before" and
 * "after" reads as a broken page rather than as a small change. Where nothing
 * differs, the pair is left null and the surfaces fall back to naming it.
 *
 * **Null means the window did not open with this drawing**, which makes it an
 * addition rather than a redraw however its dates read. `megaphone` is the
 * case: it was drawn on 24 August, retired the same day and drawn again on the
 * 25th, and the merge below holds `added` at the earlier date on purpose, so
 * the window arithmetic files it as changed. v0.1.4 does not carry it at all,
 * so calling it redrawn would put a "before" on the page that never shipped.
 */
const redrawn = (name, from, to) => {
  let existed = false
  for (const style of STYLES) {
    const path = `icons/${style}/${name}.svg`
    const before = fileAt(from, path)
    if (!before) continue
    existed = true
    const after = to
      ? fileAt(to, path)
      : (() => {
          try {
            return readFileSync(join(ROOT, path), "utf8")
          } catch {
            return null
          }
        })()
    if (!after || before === after) continue
    return { name, style, before: before.trim(), after: after.trim() }
  }
  return existed ? { name, style: null, before: null, after: null } : null
}

/** The redraws of a window, sorted, with anything the window did not carry dropped. */
const redraws = (candidates, from, to) =>
  candidates
    .map((name) => redrawn(name, from, to))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name))

/** The version an unreleased icon will first appear in. */
const current = JSON.parse(
  await readFile(join(ROOT, "packages", "react", "package.json"), "utf8")
).version

/**
 * Release tags with their dates, oldest first.
 *
 * Only semver-shaped tags count. This repo also carries `backup/pre-scrub`
 * tags, and a branch parked as a tag is not a release.
 */
const releases = git(
  "tag",
  "--list",
  "--format=%(refname:short) %(creatordate:iso-strict)"
)
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [tag, date] = line.split(" ")
    return { tag, date, version: tag.replace(/^v/, "") }
  })
  .filter((r) => /^\d+\.\d+\.\d+$/.test(r.version))
  .sort((a, b) => a.date.localeCompare(b.date))

/** Every tag's inventory, oldest first, resolved once. */
const inventory = new Map(releases.map((r) => [r.version, held(r.tag)]))

/**
 * One pass over the log, newest commit first.
 *
 * A `git log` per file would be 1,242 subprocesses. Walking one stream instead
 * means the first time a path appears is its newest commit and the last time is
 * its oldest, which is exactly `updated` and `added`.
 */
const log = git(
  "log",
  "--diff-filter=AMR",
  "--name-only",
  "--format=commit %cI%x09%an%x09%ae",
  "--",
  "icons"
)

/** name -> { added, updated, by: Set<"name\temail"> }. Dates are ISO 8601. */
const dates = new Map()
let at = null
let who = null

for (const line of log.split("\n")) {
  if (line.startsWith("commit ")) {
    const [date, author, email] = line.slice(7).split("\t")
    at = date.trim()
    // Tab-separated, because a name can contain anything but a tab.
    who = `${author}\t${email}`
    continue
  }

  const name = /^icons\/(?:stroke|duotone|fill)\/(.+)\.svg$/.exec(line)?.[1]
  if (!name || !at) continue

  const entry = dates.get(name)
  if (!entry) dates.set(name, { added: at, updated: at, by: new Set([who]) })
  else {
    // Newest first, so anything later in the stream is older.
    entry.added = at
    entry.by.add(who)
  }
}

/**
 * The first release whose tree actually holds the drawing, or null if none does.
 *
 * It used to answer `current` for a drawing no tag covers, and that reads as a
 * fact rather than as a placeholder: `grip-vertical` was drawn twelve hours
 * after v0.1.4 was tagged and every surface said it shipped in v0.1.4, which
 * anyone installing that version from npm would find untrue. A drawing that is
 * in no release has no version, and the surfaces print "Unreleased".
 *
 * Asked of the tag's tree rather than of the dates, for the reason under
 * `held`: `megaphone` was drawn before v0.1.2 and retired before it was cut,
 * so a date comparison named a version whose tarball does not contain it —
 * which is the same untruth one drawing further along.
 */
const releaseFor = (name) =>
  releases.find((r) => inventory.get(r.version).has(name))?.version ?? null

/**
 * Formatted here rather than in the browser.
 *
 * `toLocaleDateString` gives the server and the client different answers when
 * their locales differ, which React reports as a hydration mismatch on a date
 * nobody looks at twice. One string, decided at build, cannot disagree.
 */
const show = (iso) => {
  /*
   * The date as it was in the zone the thing happened in, which `iso` already
   * carries as its offset. Converting to UTC first was deterministic and
   * wrong: v0.1.3 was tagged at 04:44 +05:00, which is 23:44 the previous day
   * in UTC, and the release went out labelled a day before it was cut. Anyone
   * working past midnight gets the day before on everything they touch.
   *
   * Taking the date straight off the string keeps the one property UTC was
   * there for — one string, decided at build, that the server and the client
   * cannot disagree about — without the shift.
   */
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number)
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)))
}

/**
 * Only names that still exist.
 *
 * The log remembers every icon this repo ever had, including the ones renamed
 * or dropped along the way — 58 of them — and a history entry for a drawing
 * nobody can find is dead weight in a file the page ships.
 */
const live = new Set(
  (await readdir(join(ROOT, "icons", "stroke")))
    .filter((f) => f.endsWith(".svg"))
    .map((f) => f.slice(0, -4))
)

/**
 * Everyone who has touched a drawing, once each, with the icons pointing at
 * them by index.
 *
 * By index because the alternative is writing the same name and address into
 * 414 entries, and this file is imported by the page — every repetition is
 * payload. One list, and `lib/icon-contributors.ts` decides what each git
 * identity is called on screen.
 */
const people = []
const indexOf = (who) => {
  const at = people.indexOf(who)
  return at === -1 ? people.push(who) - 1 : at
}

/**
 * What the previous run recorded, which is older than this repository's git.
 *
 * The set was drawn over 404 commits between 8 and 19 August 2026, and the
 * public repository opens with one commit dated the 20th: the history was
 * replaced for the open-source release, deliberately, and the drawing dates
 * went with it. Every icon's `added` collapsed to one day, and 503 drawings
 * claiming to have appeared simultaneously is not a fact about anything.
 *
 * So git is not the only input any more. This file's own previous answer is the
 * other, and the two are merged rather than one overwriting the other:
 *
 *   added   = the earlier of the two, because an icon cannot have been added
 *             after the first time anyone recorded it
 *   updated = the later, but only counting commits after the root, for the
 *             reason below
 *   by      = the union, so the rewrite does not drop a contributor
 *
 * **The root commit is not an edit.** It wrote all 1,286 SVGs at once, so git
 * reports every icon as modified on 20 August. Taking that as `updated` would
 * move all 503 to the same day and lose the fortnight a second time, in the
 * other column. It is a history replacement rather than anyone touching a
 * drawing, so it is ignored for icons that were already recorded. A commit
 * after it is a real edit and does count.
 *
 * That makes the merge idempotent and self-maintaining. An icon drawn tomorrow
 * has no recorded entry and takes git's dates unchanged; an icon edited
 * tomorrow is changed by a commit later than the root, so it takes the new
 * `updated` and keeps its true `added`. Nobody has to remember to freeze
 * anything, and `--check` still passes, because merging twice gives the same
 * answer as merging once.
 *
 * The dates are recoverable, not invented: `archive/pre-release-history` on the
 * archive remote still holds all 404 commits. If this file is ever lost, that
 * branch is where it comes back from, not this repository's log.
 */
const prior = JSON.parse(
  await readFile(OUT, "utf8").catch(() => '{"icons":{}}')
)
const priorPeople = prior.people ?? []

/** The commit the public history opens with. Everything predates it. */
const rootDate = git("log", "--reverse", "--format=%cI").split("\n")[0].trim()

for (const [name, was] of Object.entries(prior.icons ?? {})) {
  const now = dates.get(name)
  if (!now) continue

  if (was.added && was.added < now.added) now.added = was.added

  // Only a commit later than the root is someone actually editing the drawing.
  if (was.updated) {
    now.updated =
      now.updated > rootDate && now.updated > was.updated
        ? now.updated
        : was.updated
  }

  for (const i of was.by ?? []) {
    const p = priorPeople[i]
    if (p) now.by.add(`${p.name}\t${p.email}`)
  }
}

const entries = [...dates.entries()]
  .filter(([name]) => live.has(name))
  .sort(([a], [b]) => a.localeCompare(b))

const icons = Object.fromEntries(
  entries.map(([name, { added, updated, by }]) => [
    name,
    {
      added,
      addedLabel: show(added),
      updated,
      updatedLabel: show(updated),
      version: releaseFor(name),
      by: [...by].map(indexOf),
    },
  ])
)

/**
 * When the current version was actually cut, from its tag.
 *
 * The Paper boards used to date themselves by the newest drawing change and
 * print it under both "Last updated" and "Released", which made the second one
 * false the moment a release was tagged a day after the last icon was touched.
 * That is exactly what happened: the last drawing changed on 19 August and
 * v0.1.0 was tagged on the 20th.
 *
 * It is resolved here rather than there because this script already reads the
 * tags, and the boards already read this file. Giving `build-paper.mjs` its own
 * git access to answer a question this one has already answered would be a
 * second source for one fact.
 *
 * Null before the first tag, and the surfaces fall back to the drawing date,
 * which is the best available answer when nothing has been released.
 */
const cut = releases.find((r) => r.version === current) ?? releases.at(-1)

/**
 * The release before the current one, which is what "new" is measured against.
 *
 * Not a refinement: measuring against `cut` is what made a release erase the
 * drawings it had just shipped. `isNewSince` asks whether a drawing arrived
 * after a release, so handing it the release being cut answers "no" for
 * everything, every time, the instant the tag lands. The 24 drawings v0.1.1
 * announced lost their dot at the moment v0.1.1 was published.
 *
 * Against the *previous* tag it means what the badge is for: what this release
 * added. It still clears itself, one release later than before, which is the
 * whole reason the badge is derived rather than a list someone empties.
 *
 * Null before the second tag. Everything downstream falls back to `releasedAt`,
 * so a set with one release marks whatever has landed since it, which is the
 * best answer available when there is no earlier release to compare with.
 */
const previous = cut ? releases[releases.indexOf(cut) - 1] : undefined

const out =
  JSON.stringify(
    {
      $comment: "GENERATED BY pipeline/build-history.mjs — DO NOT EDIT.",
      version: current,
      released: releases.length > 0,
      /* The version that tag actually cut, which is not `version` once work
         has started on the next one: the surfaces head one entry by each. */
      releasedVersion: cut?.version ?? null,
      releasedAt: cut?.date ?? null,
      releasedLabel: cut ? show(cut.date) : null,
      /* What "new" is measured against. See the note on `previous`. */
      previousReleasedAt: previous?.date ?? null,
      previousReleasedVersion: previous?.version ?? null,
      previousReleasedLabel: previous ? show(previous.date) : null,
      /**
       * Every release, newest first, with what each one added.
       *
       * The scalars above are this release and the one before it, and for a
       * long time that was the whole file. It reads as sufficient right up to
       * the third release, when the surfaces built on it start dropping the
       * oldest entry off the bottom and relabelling whatever is left as the
       * initial one. Cutting v0.1.2 deleted v0.1.0 from the changelog and
       * announced v0.1.1 as the first cut of the set.
       *
       * **A changelog only ever grows.** Nothing here may narrow with age: an
       * entry that has been published is a record of what happened, and a
       * generator that recomputes the whole board from the current tag has to
       * be able to rebuild every earlier entry exactly as it was published.
       * That is what this array is for, and why the counts are as-of each tag
       * rather than today.
       *
       * Windows are half-open on the left, so a drawing belongs to exactly one
       * release: after the previous tag, up to and including this one. Every
       * window is closed at its tag, the newest included.
       *
       * The newest used to be left open above, so that work committed after
       * the tag showed against the release it was heading for. That is the
       * right idea and the wrong place for it: the entry is already headed
       * "Released" with the tag's own date, so an icon drawn hours later was
       * announced as part of a version that had shipped without it. Work after
       * the newest tag goes in `unreleased` below, which says exactly that.
       */
      releases: [...releases]
        .reverse()
        .map((r, i, all) => {
          const before = all[i + 1]
          /* What each tag's tree actually holds, which is the only honest
             answer to what a release contained. See `held`. */
          const now = inventory.get(r.version)
          const was = before ? inventory.get(before.version) : new Set()
          /*
           * Drawings that already existed and were redrawn in this release.
           *
           * A release is not always drawings added. v0.1.3 adds none at all
           * and is entirely corrections — queue resized, repeat-1's numeral —
           * and an entry that could only count what was *added* announced it
           * as "0 drawings added", which is true and tells the reader nothing
           * about what they are being asked to upgrade for.
           *
           * The dates only nominate candidates here, cheaply: a redraw is a
           * drawing both tags carry whose file differs between them, and
           * `redrawn` is what settles it. Running it over all 547 names would
           * be 1,600 subprocesses to answer what two dates rule out in one
           * pass.
           */
          const updated = redraws(
            Object.entries(icons)
              .filter(
                ([name, h]) =>
                  before &&
                  was.has(name) &&
                  now.has(name) &&
                  h.updated > before.date &&
                  h.updated <= r.date
              )
              .map(([name]) => name),
            before?.tag,
            r.tag
          )
          /* Named only where the drawing still exists, since the surfaces draw
             it; `count` below is the whole tree, retired drawings included,
             because that is what the release actually shipped. */
          const names = [...now]
            .filter((name) => !was.has(name) && live.has(name))
            .sort((a, b) => a.localeCompare(b))
          return {
            version: r.version,
            date: r.date,
            label: show(r.date),
            /* Absent unless someone wrote one; every surface treats it as
               optional prose above the tiles rather than instead of them. */
            note: fill(NOTES[r.version]),
            /* The oldest tag, and only ever the oldest. The surfaces print
               "Initial release" off this instead of assuming the second entry
               on the board is the first one that happened. */
            initial: !before,
            /* What the set held at that tag, not what it holds now. */
            count: now.size,
            /* Drawings rather than names: the two moved together until the
               corners axis, and a surface that only has `count` cannot tell a
               release that added a treatment from one that added nothing. */
            files: drawings(r.tag),
            previousFiles: before ? drawings(before.tag) : 0,
            names,
            /* Kept beside `updated` because five surfaces already count off it
               and a name is all a count needs. */
            updatedNames: updated.map((u) => u.name),
            /*
             * The redraws with both drawings attached — what the icon looked
             * like at the previous tag and what it looked like at this one, so
             * the entry can show the change rather than assert it.
             */
            updated,
          }
        }),
      /**
       * Work since the newest tag, which belongs to no release yet.
       *
       * Every release window closes at its own tag, so this is where a drawing
       * lands between a release and the next one. It is deliberately not an
       * entry in `releases`: that array is the published record, every item of
       * it has a version and a date, and anything looking a version up in it
       * would find a row that is neither.
       *
       * `count` is the set as it stands, which is what a reader of an
       * unreleased entry is asking about — not what any tag holds.
       */
      unreleased: (() => {
        const since = releases.at(-1)
        const was = since ? inventory.get(since.version) : new Set()
        /* "After" is the working tree here rather than a tag, because nothing
           has tagged it yet. */
        const updated = redraws(
          Object.entries(icons)
            .filter(
              ([name, h]) => since && was.has(name) && h.updated > since.date
            )
            .map(([name]) => name),
          since?.tag,
          null
        )
        const names = Object.keys(icons)
          .filter((name) => !was.has(name))
          .sort((a, b) => a.localeCompare(b))
        /* A note keeps the section alive on its own. Work that adds an axis
           rather than a drawing leaves both lists empty, and returning null
           there would drop the announcement along with them. */
        const note = fill(NOTES.unreleased)
        if (!names.length && !updated.length && !note) return null
        return {
          note,
          since: since?.version ?? null,
          sinceDate: since?.date ?? null,
          sinceLabel: since ? show(since.date) : null,
          count: Object.keys(icons).length,
          names,
          updatedNames: updated.map((u) => u.name),
          updated,
        }
      })(),
      people: people.map((who) => {
        const [name, email] = who.split("\t")
        return { name, email }
      }),
      icons,
    },
    null,
    0
  ) + "\n"

/**
 * A changelog only ever grows.
 *
 * Every surface that prints releases is generated, which means every release
 * is redrawn from scratch on every build, which means a bug in the shape of
 * the data silently deletes history rather than failing. That is exactly what
 * happened: the file carried the current release and the previous one, the
 * board drew those two, and cutting v0.1.2 erased v0.1.0 and announced v0.1.1
 * as the initial release. Nobody sees a deletion in a regenerated file.
 *
 * So the file that is already committed is the record, and the rebuild has to
 * account for every release in it. A tag is not allowed to quietly disappear
 * from the history — if one is genuinely being retracted, delete the entry
 * here deliberately and say so in the commit, which is a decision with a name
 * on it rather than a diff nobody reads.
 */
const before = JSON.parse(await readFile(OUT, "utf8").catch(() => "{}"))
const lost = (before.releases ?? [])
  .map((r) => r.version)
  .filter((v) => !releases.some((r) => r.version === v))
if (lost.length) {
  console.error(
    c(31, "✗") +
      ` lib/icon-history.json already records ${lost.join(", ")}, and this ` +
      `build does not.\n  A published release cannot be dropped by a rebuild. ` +
      `Restore the tag (\`git tag v${lost[0]} <commit>\`), or retract the ` +
      `entry deliberately.`
  )
  process.exit(1)
}

/**
 * Nor can a published release lose a redraw.
 *
 * The same argument one level down: an entry's redraws are read off git every
 * build, so anything that makes a window unreadable — a tag moved, a style
 * file renamed, a bug in `redrawn` — quietly publishes an entry announcing
 * fewer corrections than it announced yesterday, in a generated diff nobody
 * reads. The written file is the record for these too.
 */
const written = JSON.parse(out).releases ?? []
const thinned = (before.releases ?? [])
  .map((was) => ({
    version: was.version,
    was: (was.updated ?? []).length,
    now: (written.find((r) => r.version === was.version)?.updated ?? []).length,
  }))
  .filter((r) => r.now < r.was)
if (thinned.length) {
  console.error(
    c(31, "✗") +
      ` lib/icon-history.json would publish fewer redraws than it already ` +
      `records:\n` +
      thinned
        .map((r) => `  ${r.version}: ${r.was} recorded, ${r.now} rebuilt`)
        .join("\n") +
      `\n  A published entry keeps what it announced. Find what stopped ` +
      `reading, rather than committing the shorter file.`
  )
  process.exit(1)
}

if (check) {
  const have = await readFile(OUT, "utf8").catch(() => "")
  if (have !== out) {
    console.error(
      c(31, "✗") +
        ` lib/icon-history.json is stale — run \`npm run history:build\``
    )
    process.exit(1)
  }
  console.log(
    c(32, "✓") +
      ` lib/icon-history.json up to date (${Object.keys(icons).length} icons)`
  )
} else {
  await writeFile(OUT, out)
  console.log(
    c(32, "✓") +
      ` lib/icon-history.json — ${Object.keys(icons).length} icons, ` +
      `${releases.length} release${releases.length === 1 ? "" : "s"}, current ${current}`
  )
}
