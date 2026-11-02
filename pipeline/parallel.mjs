#!/usr/bin/env node
/**
 * Run shell commands at the same time, and fail if any one of them fails.
 *
 *   node pipeline/parallel.mjs "<command>" "<command>" ...
 *
 * `icons:ci` ends in four checks that only read: `tsc` over the React package,
 * the geometry linter, `tsc` over the registry output and `tsc` over the site.
 * None reads what another writes, each is a single thread, and together they
 * were 120 of the 141 seconds the chain took on 2 Nov 2026. Run in a row they
 * cost the sum, run here they cost the slowest.
 *
 * They still run last, after every sync check has passed, so the chain keeps
 * its order where order matters: a stale generated file fails its `--check`
 * before `tsc` gets the chance to type-check it clean.
 *
 * Every command runs to the end even when another fails, so one run reports
 * every failure rather than the first. Output is held per command and printed
 * whole when it finishes, because four interleaved `tsc` logs are unreadable.
 */

import { spawn } from "node:child_process"

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const commands = process.argv.slice(2)
if (!commands.length) {
  console.error("usage: node pipeline/parallel.mjs <command> [<command> ...]")
  process.exit(2)
}

function run(command) {
  const started = Date.now()
  return new Promise((resolve) => {
    const child = spawn(command, {
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
    })
    const chunks = []
    child.stdout.on("data", (d) => chunks.push(d))
    child.stderr.on("data", (d) => chunks.push(d))
    child.on("close", (code, signal) => {
      const seconds = ((Date.now() - started) / 1000).toFixed(1)
      const failed = code !== 0
      const mark = failed ? c(31, "✗") : c(32, "✓")
      const why = signal ? ` (${signal})` : failed ? ` (exit ${code})` : ""
      process.stdout.write(`${mark} ${command} ${c(2, `${seconds}s`)}${why}\n`)
      const out = Buffer.concat(chunks).toString()
      if (out.trim())
        process.stdout.write(out.endsWith("\n") ? out : `${out}\n`)
      resolve(failed)
    })
  })
}

const failures = (await Promise.all(commands.map(run))).filter(Boolean).length
if (failures) {
  console.error(c(31, `${failures} of ${commands.length} failed`))
  process.exit(1)
}
