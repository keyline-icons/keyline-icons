// Write previews/paper/ into the paper.design file.
//
//   node pipeline/import-paper.mjs [--file <id>] [--board <name>]... [--changed <rev>]
//                                  [--all] [--create] [--dry-run]
//
// `paper:build` writes the sheets. `paper:verify` says whether the file took
// them. This is the step in between, and until 24 Aug 2026 it was a person with
// Paper Desktop open working through the ten-line recipe in
// `previews/paper/manifest.json`. Which meant `ship` regenerated the sheets,
// printed a warning, and left the file behind until someone had an afternoon.
//
// It never needed a person. Paper Desktop listens on 127.0.0.1:29979 with no
// auth, which is how `check-paper.mjs` has always talked to it; the recipe is
// four tool calls per board. What it needs is Paper running with the file open,
// which is why this sits outside `icons:ci` alongside `paper:verify` and
// `icons:figma` rather than being trusted less.
//
// The recipe's traps are all still here, each one now in code rather than in a
// sentence someone has to remember:
//
//   - Replace the artboard's *child*, never the artboard. Deleting the artboard
//     loses its canvas position and nothing in the repo records it, so a board
//     deleted and recreated comes back at the origin.
//   - The replace mints a new node, so the card has to be re-read before its
//     rows container can be found for parts 2 and up.
//   - `update_styles` takes `nodeIds` plural, `rename_nodes` takes `nodeId`
//     singular, and each answers the other's shape with a schema complaint
//     inside a *successful* result. `call` reads `isError`, so those surface.
//   - Paper names every node it parses after its type, so the drawings arrive
//     as `SVG` and are renamed from the sheet, in document order. Match on
//     `component === "SVG"` exactly: the nested paths come back as
//     `SVGVisualElement` and a loose filter catches those too.

import { readFile } from "node:fs/promises"
import { execFileSync } from "node:child_process"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const SHEETS = join(ROOT, "previews", "paper")
const ENDPOINT = process.env.PAPER_MCP ?? "http://127.0.0.1:29979/mcp"

const argv = process.argv.slice(2)
const flag = (name) => argv.includes(name)
const values = (name) =>
  argv.flatMap((a, i) => (a === name && argv[i + 1] ? [argv[i + 1]] : []))

const dry = flag("--dry-run")
const create = flag("--create")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`
const ok = (s) => console.log(`  ${c(32, "✓")} ${s}`)
const warn = (s) => console.log(`  ${c(33, "!")} ${s}`)

/* ------------------------------------------------------------- transport */

/* Lifted from check-paper.mjs, deliberately: one MCP session for the run, the
   transport answers as SSE with one `data:` line carrying the JSON-RPC body,
   and the session id comes back on the first call. */
let session = null

async function rpc(method, params) {
  const headers = {
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
  }
  if (session) headers["mcp-session-id"] = session

  let res
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    })
  } catch {
    throw new Error(
      `${c(31, "Paper is not listening")} on ${ENDPOINT}.\n` +
        `Open Paper Desktop with the file, or set PAPER_MCP to its endpoint.`
    )
  }

  session ??= res.headers.get("mcp-session-id")
  const text = await res.text()
  const line = text.split("\n").find((l) => l.startsWith("data:"))
  if (!line) throw new Error(`unreadable answer from ${method}: ${text.slice(0, 200)}`)
  return JSON.parse(line.slice(5).trim())
}

async function call(name, args) {
  const out = await rpc("tools/call", { name, arguments: args })
  if (out.error) throw new Error(`${name}: ${JSON.stringify(out.error).slice(0, 200)}`)
  const body = (out.result?.content ?? [])
    .filter((x) => x.type === "text")
    .map((x) => x.text)
    .join("\n")
  /* A refusal arrives as a sentence in a successful result rather than as an
     error, so a caller that only checks `error` reads a schema complaint as
     data and reports a write that never happened as done. */
  if (out.result?.isError) throw new Error(`${name}: ${body.split("\n")[0]}`)
  return body
}

/** Every tool here answers JSON as text, except when it answers prose. */
const json = (body) => {
  try {
    return JSON.parse(body)
  } catch {
    throw new Error(`expected JSON, got: ${body.slice(0, 200)}`)
  }
}

/* ------------------------------------------------------------ the inputs */

/**
 * The file to write into, taken from the constant the site already links to.
 * Same call `check-paper.mjs` makes: `SET_PAPER_URL` is the file the landing
 * page's Paper tab opens, so it is by definition the file that has to match.
 */
async function fileId() {
  const [explicit] = values("--file")
  if (explicit) return explicit

  const src = await readFile(join(ROOT, "lib", "site-chrome.ts"), "utf8")
  const url = /SET_PAPER_URL\s*=\s*\n?\s*"([^"]+)"/.exec(src)?.[1]
  const id = url && /\/file\/([^/?#]+)/.exec(url)?.[1]
  if (!id) {
    throw new Error(
      "no Paper file id: SET_PAPER_URL in lib/site-chrome.ts did not parse. Pass --file <id>."
    )
  }
  return id
}

const manifest = JSON.parse(await readFile(join(SHEETS, "manifest.json"), "utf8"))

/** Sheets grouped into the artboard they are written into, in part order. */
const boards = new Map()
for (const sheet of manifest.sheets) {
  if (!boards.has(sheet.artboard)) boards.set(sheet.artboard, [])
  boards.get(sheet.artboard).push(sheet)
}
for (const parts of boards.values()) parts.sort((a, b) => (a.part ?? 1) - (b.part ?? 1))

/** The layer names for one sheet's drawings, in document order. */
async function drawingNames(file) {
  const html = await readFile(join(SHEETS, file), "utf8")
  return [...html.matchAll(/data-icon="([^"]+)" data-style="([^"]+)"/g)].map(
    ([, name, style]) => `${name} ${style}`
  )
}

/* ------------------------------------------------------- what to import */

/**
 * Which boards to write, and why this is not just "the ones the commit
 * touched".
 *
 * Two sources, unioned, because neither sees what the other does. The check
 * compares the *file* to the sheets, so it catches a board that was never
 * imported, imported from an older sheet, or half-renamed, including drift
 * this commit had nothing to do with. But it compares composition only: a
 * drawing redrawn under the same name in the same place is invisible to it, and
 * that is exactly what a redraw commit is. Git sees those, and sees nothing
 * about the state of the file.
 *
 * Union means re-importing a board that was already current, which costs a few
 * seconds and is otherwise harmless: the write is a replace, so it is
 * idempotent.
 */
async function selection() {
  const named = values("--board")
  if (named.length) return new Set(named)
  if (flag("--all")) return new Set(boards.keys())

  const wanted = new Set()

  /* Reuse the check rather than reimplementing its comparison. It exits 1 when
     it has findings, which is the normal case here, so the status is ignored
     and the JSON is what matters. */
  let report
  try {
    report = JSON.parse(
      execFileSync("node", [join(ROOT, "pipeline", "check-paper.mjs"), "--json"], {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 64 << 20,
        stdio: ["ignore", "pipe", "pipe"],
      })
    )
  } catch (err) {
    /* A non-zero exit still carries the JSON on stdout. A missing stdout is a
       real failure, Paper closed most likely, and should not be swallowed into
       "nothing to import". */
    if (!err.stdout) throw new Error(`could not read the Paper check: ${err.message}`)
    report = JSON.parse(err.stdout)
  }

  for (const f of report.findings) {
    /* ORPHAN is a board in the file that no sheet builds. Importing cannot fix
       it and deleting it is not this script's call. */
    if (f.kind !== "ORPHAN") wanted.add(f.board)
  }

  for (const rev of values("--changed")) {
    const touched = execFileSync(
      "git",
      ["show", "--name-only", "--format=", rev, "--", "previews/paper"],
      { cwd: ROOT, encoding: "utf8" }
    )
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => p.slice("previews/paper/".length))

    for (const [name, parts] of boards) {
      if (parts.some((s) => touched.includes(s.file))) wanted.add(name)
    }
  }

  return wanted
}

/* ------------------------------------------------------------- the write */

const id = await fileId()

/* Probe before the first write. Paper being closed is not a failure, it is a
   step waiting on someone to open an app, and the two want different words from
   `ship`, so they get different exit codes: 2 for unreachable, 1 for an import
   that was attempted and went wrong. */
try {
  await fetch(ENDPOINT, { method: "POST", headers: { "content-type": "application/json" } })
} catch {
  console.error(
    `${c(31, "Paper is not listening")} on ${ENDPOINT}.\n` +
      `Open Paper Desktop with the file, or set PAPER_MCP to its endpoint.`
  )
  process.exit(2)
}

await rpc("initialize", {
  protocolVersion: "2025-06-18",
  capabilities: {},
  clientInfo: { name: "keyline-import-paper", version: "1" },
})

const opened = json(await call("open_file", { fileId: id }))

/* Every page, because the file keeps the Changelog on its own and a board
   looked for on the wrong page reads as missing. */
const pages = json(await call("get_basic_info", { fileId: id })).pages ?? []
const found = new Map()
for (const page of pages) {
  await call("open_file", { fileId: id, pageId: page.id })
  const info = json(await call("get_basic_info", { fileId: id }))
  for (const board of info.artboards) found.set(board.name, { ...board, page })
}

const wanted = await selection()
console.log(
  `${opened.fileName ?? id}: ${wanted.size} board${wanted.size === 1 ? "" : "s"} to import` +
    ` of ${boards.size}`
)

if (!wanted.size) {
  ok("the file already matches previews/paper/")
  process.exit(0)
}

const children = async (nodeId) =>
  json(await call("get_children", { nodeId, fileId: id })).children ?? []

/** Rename this write's drawings from the sheet, in document order. */
async function renameDrawings(created, names, board) {
  const drawings = created.filter((n) => n.component === "SVG")
  if (drawings.length !== names.length) {
    throw new Error(
      `${board}: Paper made ${drawings.length} drawings where the sheet has ${names.length}`
    )
  }
  if (!drawings.length) return 0
  await call("rename_nodes", {
    fileId: id,
    updates: drawings.map((n, i) => ({ nodeId: n.id, name: names[i] })),
  })
  return drawings.length
}

/** What `write_html` says it made. The key has moved before; look in both. */
const madeBy = (body) => {
  const out = json(body)
  return out.createdNodes ?? out.nodes ?? []
}

const failed = []

for (const boardName of wanted) {
  const parts = boards.get(boardName)
  if (!parts) {
    warn(`${boardName}: no sheet builds this board, skipped`)
    continue
  }

  let board = found.get(boardName)
  if (!board && !create) {
    /* Nothing in the repo records where a board sits on the canvas, so one
       created here lands at the origin on whatever page is active and someone
       has to place it. That is a decision, not a step, so it is opt-in. */
    warn(
      `${boardName}: not in the file. Re-run with --create to make it, then place it by hand.`
    )
    failed.push(boardName)
    continue
  }

  if (dry) {
    console.log(`  would import ${boardName} from ${parts.map((p) => p.file).join(", ")}`)
    continue
  }

  try {
    let fresh = false
    if (!board) {
      fresh = true
      await call("open_file", { fileId: id, pageId: pages[0].id })
      const made = json(
        await call("create_artboard", {
          fileId: id,
          name: boardName,
          styles: { width: `${parts[0].width}px`, height: "800px" },
        })
      )
      board = { id: made.nodeId ?? made.id, page: pages[0] }

      /* `create_artboard` paints the board white and ignores a background asked
         for in `styles`, so it has to be set again here. An opaque board is a
         square rectangle behind a rounded card, which reads as a card rounded on
         top and square at the bottom. */
      await call("update_styles", {
        fileId: id,
        updates: [{ nodeIds: [board.id], styles: { backgroundColor: "transparent" } }],
      })
      warn(`${boardName}: created on ${pages[0].name} at the origin; place it by hand`)
    }

    await call("open_file", { fileId: id, pageId: board.page.id })

    /* Part 1 replaces the existing card: the artboard keeps its id, its name and
       its canvas position, and only its child is swapped. A board created a
       moment ago has no child to replace, so its first part goes in as a child
       instead. Getting this wrong is not subtle, it is "expected one child,
       found 0" on the one path that cannot be tested without making a board. */
    let target = board.id
    let mode = "insert-children"

    if (!fresh) {
      const kids = await children(board.id)
      if (kids.length !== 1) {
        throw new Error(
          `expected one child on the artboard, found ${kids.length}. Look at it before re-running.`
        )
      }
      target = kids[0].id
      mode = "replace"
    }

    let drawn = 0
    const first = await readFile(join(SHEETS, parts[0].file), "utf8")
    const made = madeBy(
      await call("write_html", { fileId: id, html: first, targetNodeId: target, mode })
    )
    drawn += await renameDrawings(made, await drawingNames(parts[0].file), boardName)

    if (parts.length > 1) {
      /* The write minted a new card, so any id read before it is gone. Rows go
         into the card's last child. */
      const [card] = await children(board.id)
      const inner = await children(card.id)
      const rows = inner[inner.length - 1]
      if (!rows) throw new Error("the card has no rows container to append to")

      for (const part of parts.slice(1)) {
        const html = await readFile(join(SHEETS, part.file), "utf8")
        const rest = madeBy(
          await call("write_html", {
            fileId: id,
            html,
            targetNodeId: rows.id,
            mode: "insert-children",
          })
        )
        drawn += await renameDrawings(rest, await drawingNames(part.file), boardName)
      }
    }

    /* An artboard clips rather than hugs, so without this the board keeps
       whatever height it had and a grown category is cut off at the bottom. */
    await call("update_styles", {
      fileId: id,
      updates: [{ nodeIds: [board.id], styles: { height: "fit-content" } }],
    })

    /* Counted from what was written, not from the manifest's `variants`, which
       is 0 on the sheets that are prose with drawings in them. */
    ok(`${boardName}: ${parts.length} sheet${parts.length === 1 ? "" : "s"}, ${drawn} drawings`)
  } catch (err) {
    console.log(`  ${c(31, "✗")} ${boardName}: ${err.message}`)
    failed.push(boardName)
  }
}

if (dry) process.exit(0)

if (failed.length) {
  console.log(
    `\n${c(31, `${failed.length} board${failed.length === 1 ? "" : "s"} did not import`)}: ${failed.join(", ")}`
  )
  process.exit(1)
}

console.log(`\n${c(32, "imported")}  confirm with:  pnpm paper:verify`)
