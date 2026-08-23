# Community listing copy

Everything the Figma publish modal asks for, written out so it survives the
session it was drafted in. This file is the source; the modal is a copy of it.

Counts here are checked by `pipeline/check-readmes.mjs`, so they cannot drift
away from `icons/` without CI failing.

## Where the modal is

Figma logo, upper left, then `Plugins` → `Manage plugins`. Select the plugin,
choose `Publish`. Four pages:

1. **Describe your resource.** Name, tagline, description. Both name and tagline
   are capped at 100 characters, counted live in the modal. Figma's help page
   also lists a category on this page; the modal did not show one in August 2026.
2. **Choose some images.** Icon, thumbnail, an optional playground file, carousel.
3. **Data security.** The disclosure form. Optional.
4. **Add the final details.** Where to publish, contributors, support contact,
   the network access review, pricing.

Sizes below are the ones Figma's own help page states: 128 × 128 for the icon,
1920 × 1080 for the thumbnail, up to nine carousel images or videos.

Afterwards the listing carries an `In review` badge and the decision arrives by
email. Figma publishes no target turnaround, only that "approval times vary
depending on current volume and the team's availability", so do not promise
anyone a date.

---

## Name

```
Keyline Icons
```

## Tagline

```
527 icons in three styles, searchable inside Figma and FigJam.
```

Capped at 100 characters. The line above is 62, so there is room. A shorter
alternative if it ever needs one:

```
527 icons in three styles, drawn on one 24 × 24 grid.
```

## Description

```
Search 527 icons and drop one on the canvas. No library to publish, no file to
duplicate, no plan requirement.

Three styles
  stroke    527 icons, 2px, round caps and joins
  duotone   437 icons, a 40% plate under the line
  fill      389 icons, solid where the glyph has a region to fill

55 icons also come in a square- form and 54 in a circle- form, so a container
is a search away rather than a second drawing.

Search knows more than the file names. 409 icons carry curated words, so
"south" finds arrow-down, "hamburger" finds menu and "trash" finds bin. Paste a
component name straight out of your code and it resolves: CheckCircle2 finds
circle-check.

In a design file an insert arrives as a 24 × 24 frame, which is what makes a row
of icons line up. In FigJam it arrives as a group, so FigJam's colour control
reaches the drawing instead of painting a box around it. Double-click into one
and every path takes its own colour, which is how a gift gets a red box and a
yellow bow, and how duotone keeps both of its tones.

Every drawing sits on one 24 × 24 grid with a shared keyline, so icons of
different weights still read as one family at the same size.

MIT licensed. The set, the site and this plugin are all open source.

keylineicons.com
github.com/keyline-icons/keyline-icons
```

## Category

```
Icon Packs
```

## Tags

**Five custom tags, no more.** The modal refuses a sixth and outlines the field
in red. There is also a Recommended row Figma populates itself, App, Social
media, 3D and Vector at the time of writing; `Vector` is worth taking and
appears not to count against the five, though that is unverified.

```
figjam
duotone
ui icons
open source
design system
```

Chosen against what the listing already says elsewhere. `icons`, `icon set` and
`svg` are implied by the name and by the Icon Packs category, so a slot spent
restating them buys little. `stroke` and `outline icons` are the default
expectation for an icon set. `free icons` overlaps `open source`, and page four
marks the plugin Free natively.

That leaves the five that actually distinguish it: FigJam support is rare among
icon plugins, 437 duotone drawings are rare among icon sets, and the rest name
the audience rather than the artefact.

`lucide alternative` is deliberately absent. It is the highest-intent term
available and Figma's review criteria mention trademark compliance, so a
competitor's project name in the tags is a grey area not worth a rejection
cycle on a first submission. Worth revisiting once published.

## Release notes

Republishing shows a **Release notes** field. It is the one part of the listing
that is per-version rather than standing copy, so each release adds an entry
here and the modal takes the top one.

**Before republishing, check whether you need to.** The icon set is fetched from
jsDelivr at run time rather than bundled, so new drawings reach every user
without a plugin update or a review cycle. A republish is only required when the
plugin's own code changes, or when the listing copy goes stale, which it does
every time the counts move. jsDelivr serves the repository, so the drawings have
to be **pushed** before any of this is true for anyone but you.

### 0.1.1

```
24 new drawings, and a Sport category.

Sport      trophy, award, and podium with 1, 2 and 3 place variants
Devices    monitor, monitor-off, bluetooth, and battery at four levels
Layout     layout-dashboard, and grid in 2x2, 2x3, 3x2 and 3x3
Also       alert, in bare, circle and square forms; building; loader; heart-hand

Search picked up the words for all of them, so "screen" finds monitor,
"spinner" finds loader and "office" finds building.
```

Kept to the shelves rather than a flat list of 24, because the shelf is what
tells a reader whether the release covers anything they were missing. The full
list by name is on `/changelog` and on the Changelog page of the Figma file.

## Support contact

```
https://github.com/keyline-icons/keyline-icons/issues
```

---

## Assets

| Field | File | Size |
| --- | --- | --- |
| Plugin icon | `packages/figma-plugin/icon.png` | 128 × 128 |
| Cover art | `previews/plugin-cover.png` | 1920 × 1080 |
| Carousel | `previews/community/1-styles.png` | 1920 × 1080 |
| Carousel | `previews/community/2-containers.png` | 1920 × 1080 |
| Carousel | `previews/community/3-range.png` | 1920 × 1080 |
| Carousel | `previews/community/4-figjam-board.png` | 1920 × 1080 |
| Carousel | `previews/community/5-figjam-colour.png` | 1920 × 1080 |
| Carousel | `previews/community/6-figjam-two-tone.png` | 1920 × 1080 |

The icon is generated by `pipeline/build-brand.mjs`, the cover by
`pipeline/build-cover.mjs` and the carousel by `pipeline/build-community.mjs`.
None of them are drawn by hand, so all of them can be regenerated.

Figma takes up to nine carousel images or videos, so all six fit. Keep them in
this order: styles and containers are the argument for the set, and the three
FigJam sheets are the argument for the plugin over a library.

## Data security

Page three. Optional, but a material update triggers re-review and the same five
questions come back, so the answers are here with what makes each one true.

**1. Do you host a backend service?**
`No, I do not host a backend service for my plugin/widget.`
Two `fetch` calls, both to jsDelivr, a third-party CDN serving a static file out
of this repository. Nothing here is hosted by us.

**2. Does it make network requests with services you do not host?**
`Makes network requests for static assets eg. fonts, images. None of these
requests include data read/derived from Figma's plugin API.`
A bare GET for `icons.json`: no body, no credentials, no query string. Nothing
from the document leaves. Not analytics, and not the "not captured by the above"
option, because a static JSON file on a CDN is exactly this category.

**3. Does it use any user authentication?**
`No, my plugin/widget does not require or use any user authentication.`
No credentials of any kind. `ui.html` and `code.js` contain no reference to
auth, tokens, login, or OAuth.

**4. Does it store data read/derived from Figma's plugin API?**
`No, my plugin/widget does not store any data read/derived from Figma's plugin
API.`
No `figma.clientStorage`, no `localStorage`, no `setPluginData`. The only
mention of `clientStorage` in the repository is in this package's README, under
"Not done yet".

The judgement call, so it is not re-made from scratch next time: `code.js` keeps
`OURS`, an in-memory map of node ids, so a second insert does not land inside
the first. Those ids are derived from the plugin API. It is still `No`, because
that object is program state for the lifetime of one run, and every example the
option gives is a persistence mechanism.

**5. How do you manage updates?**
`I am a solo developer. I manage and update my plugin/widget myself.`

## The network access review

Page four, and the manifest already answers it with one domain:

```json
"networkAccess": {
  "allowedDomains": ["https://cdn.jsdelivr.net"],
  "reasoning": "The icon set is read from the repository over jsDelivr, so a new icon release reaches everyone without a plugin update going through review."
}
```

That `reasoning` field is the answer. The long version, if a reviewer asks:

The plugin fetches one JSON file, the icon set, from jsDelivr. It is fetched
rather than bundled so that adding an icon does not require a plugin update and
a second trip through review. Nothing is sent anywhere: the fetch is a GET with
no body, no credentials and no query string. The plugin reads no user data,
stores nothing, and the only other URL in it is the footer link to
keylineicons.com, which is an anchor the user clicks rather than a request.

`pipeline/check-search.mjs` and `pipeline/build-data.mjs --check` both run in CI
and would fail if that URL changed.
