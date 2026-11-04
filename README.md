# Planned projects and category sections (2 November 2026)

Each engineering category now displays **Projects** (completed/in-progress work)
followed by **Future Projects**, only if any published planned entries exist.
The Software catalogue supports the same split; Algorithms remains a reference
library and is unchanged. All Projects uses the same two groups. Skill filters
show **demonstrated work only**, not planned activities. Homepage Selected
Projects also excludes planned work, even if `featuredOrder` is assigned.

Edit a project in `assets/js/site-data.js`:

```javascript
category: "cad",        // Keep the existing internal category ID.
categoryOrder: 4,       // Ordering within each section; gaps allowed.
status: "planned",     // planned | in-progress | completed | ""
targetStart: "",        // Optional: "Summer 2027" or "Year 12"; blank hides line.
skills: [],             // ALWAYS empty on planned projects.
```

`status: "planned"` moves the project to **Future Projects**;
`status: "in-progress"`, `"completed"` or `""` leaves it in **Projects**.
The position is still governed by the existing `categoryOrder` within each
group. The `targetStart` line appears below the project title/status rather
than over its photo, and only for planned projects. A missing date creates no
placeholder. Published/unpublished draft visibility remains unchanged.

For Software, use `projectStatus: "planned"` instead of changing the existing
`status` field, because software `status` records code/test evidence maturity.
All existing software records have a blank `projectStatus` and `targetStart`.

The gripper **Part 1: Contact Pads** remains *in progress* and unpublished;
**Part 2: Gripper Jaw Assembly** and **Part 3: Contact Sensing** are planned.
No unconfirmed starting dates were assigned. The existing internal
`electronics` category ID is unchanged, but the public title is now
**Embedded Control & Integration**, with the supplied description.

---

# Category listing order (1 November 2026)

You can now manually control how projects appear **within their own category**.
Edit `assets/js/site-data.js` and change the `categoryOrder` number of a project.
Each category starts at 1 independently:

```javascript
// Example from projects[] — Robotics
category: "robotics",
categoryOrder: 2, // Second item in Robotics

// Example from a different project — Mechanical Design & CAD
category: "cad",
categoryOrder: 1, // First item in Mechanical Design & CAD
```

- Use positive whole numbers (`1`, `2`, `3`, etc.). Numbers need not be consecutive.
- **Use unique numbers within a category** for predictable ordering. If numbers
  repeat, entries with the same number stay in their original file order.
- If `categoryOrder` is omitted, blank or invalid, the entry is listed after
  numbered entries, retaining its original order relative to other unnumbered entries.
- The field works for **published and draft projects**. Drafts stay hidden from
  public listings, but their order applies when viewed in development preview.
- `categoryOrder` is **independent of `featuredOrder`**. The latter alone controls
  the homepage's Selected Projects section.
- This changes the Robotics, Mechanical Design & CAD, 3D Printing & Fabrication,
  and Electronics category listings. The **All Projects** and **skill-search**
  listings retain their previous cross-category order.
- Software entries also have `categoryOrder`. The featured **Autonomous Return
  to Base** panel remains pinned above the Software cards; other Software cards
  use their ordering numbers. The Algorithms reference library is unchanged.
- Every current entry has a categoryOrder value matching the order already shown
  on the site, so this update does **not** unexpectedly rearrange the projects.

---

# Five-field project cards (30 October 2026)

Project cards now display **project area → title → optional subtitle → optional
progress status → short description**, in this order. This applies to the
Robotics, Mechanical Design & CAD, 3D Printing & Fabrication, Electronics,
Software and Algorithms listings, plus Selected Projects and development
preview. Existing cards, tags, links, sections, and publication settings remain.

Edit the corresponding entry in `assets/js/site-data.js`:

```javascript
category: "cad",                // Project area, from categories[]
title: "Project title",
subtitle: "",                   // e.g. "Part 2: Gripper Jaw Assembly"
status: "",                     // "Future", "In Progress" or "" (hidden)
summary: "Short description"
```

**Leave optional values as `""` to hide them completely.** Empty subtitles,
statuses and summaries produce no placeholder text or blank lines. In software
entries, `status` already means *evidence maturity* (e.g. Code documented),
so use `cardStatus: ""` for optional visible progress. Algorithms use `status`
just like ordinary projects.

The three gripper investigations now share the main title
“Improving Gripper Reliability on an Autonomous Mobile Robot”; their part
labels and Future/In Progress statuses are separate editable fields.
The unpublished Part 1 remains unpublished until explicitly published.

---

# Project Portfolio — Journal-Style Reporting (2 November 2026)

Substantial investigations now follow the familiar **IMRaD** research-report
structure, extended with engineering development and portfolio links:

```javascript
sections: {
  abstract: "",           // Write last: only after findings and conclusions are known
  introduction: "",       // Problem, aims, context and relevant background sources
  materialsMethods: "",   // Design decisions, materials, apparatus and repeatable procedures
  results: "",            // Rendered within the shared Results and Discussion section
  discussion: "",         // Rendered below Results in that same section
  conclusions: "",        // Main finding and next steps based on evidence
  lessonsLearned: "",     // Personal engineering learning, distinct from Discussion
  relatedProjects: "",   // Optional prose; linked projects are generated automatically
  references: ""         // Optional notes, followed by numbered bibliography
},
engineeringSummary: {
  challenge: "", contribution: "", outcome: "", lessonsLearned: ""
},
references: []
```

All **nine report fields and four engineering-summary fields are optional** and
are hidden when empty. The four summary fields remain above the detailed report
and can capture progress without being labelled as a scientific Abstract. **Do
not write the Abstract until work is complete.** Simple 3D-print pages may use
neither the summary nor the detailed report. The site navigation lists only
sections that actually contain content.

The previous report content has been transferred into the closest journal
sections. Background and objectives now follow the former overview within
**Introduction**; design, manufacture and testing methods fall under
**Materials & Methods**; existing Results & Evaluation paragraphs remain in the separate `results` and
`discussion` source fields but now appear under **one Results and Discussion**
heading on the website, with labelled subsections to preserve the distinction
between findings and interpretation. Existing detailed tables, citations,
software subheadings, and the old `#results` and `#discussion` anchors have
been preserved. Review scientific claims against original
records before publishing additional results.

## Numbered inline citations and bibliography

Keep complete references **at the end** of the project page. Add an `id` to a
source in `references`, `surfaceStudy.sources`, or `investigation.sources`:

```javascript
references: [
  {
    id: "example-paper",
    name: "Example Author (2025) — Title of study",
    url: "https://doi.org/your-verified-doi",
    description: "Why the source is relevant."
  }
],
sections: {
  introduction: "Earlier research examines this method [@example-paper].",
  // ... other section keys as above
}
```

The text marker `[@example-paper]` appears on the site as a clickable **[1]**
link to the full reference. Citations are numbered by their first appearance
in the report, and the same source keeps its number wherever it is cited.
References already collected but not cited directly remain below under
**Further reading & resources**. The gripper study's existing sources now have
stable IDs, so inline citations can be added without manually renumbering them.
If there are no sources, the References section remains hidden unless you enter
other content there. `references` is always the final report section.

## Gripper Part 1 numbered working outline (3 November 2026)

The unpublished contact-pad investigation (`id: "gripper-contact-surfaces"`)
now defines its Introduction subsections **2.1–2.4** and Materials & Methods
subsections **3.1–3.6** in `sectionDetails`. Its existing introduction text
has been moved into 2.1–2.3; the existing material selection table sits inside
3.1, and the four illustrated test methods and equations sit inside 3.5.
The existing controlled-conditions sentence is under 3.6. Empty future
subsections currently display their headings only, in development preview.

To fill a subsection, edit its `text` field. The `id` of the **3.1** and **3.5**
items is used to position their original material/test tables immediately below
the matching text; preserve those IDs. The material rows, test images,
calculations and citations remain editable in their original data arrays.
This change does not publish the draft or create experimental results.

The `references: []` list is separate from the string field
`sections.references`. Existing links for source code, videos, CAD and
technical files appear within Materials & Methods under Project files & media,
rather than becoming invented academic citations.

**Special layouts are preserved:** fabrication CAD and photograph galleries,
research tables, gripper test cards, I/O tables, software flowcharts and
algorithms. All old project IDs, draft visibility, skills filters, ordering,
progress statuses and links retain their original behaviour.

**Development mode:** `https://conor-beattie.github.io/development.html`
(unlisted but not private); the `preview=drafts` flag is retained across pages.

---

# Optional Influences & Inspiration (27 October 2026)

The bottom of `about.html` now has an optional **Influences & Inspiration** section.
The data is maintained under `owner.influences` in `assets/js/site-data.js`.
Each item can contain `name`, `focus` (optional), `description` and `url` (optional):

```javascript
influences: [
  {
    name: "Madoca1977",
    focus: "LEGO Technic MOCs",
    description: "I admire Madoca1977's LEGO Technic creations for their inventive mechanisms and thoughtful mechanical design.",
    url: "https://rebrickable.com/users/Madoca1977/mocs/"
  }
],
```

Copy the object to add further influences, separating entries with commas. The list
has no fixed maximum. The name links to the referenced website in a new tab.
If the array is empty (`influences: []`), the entire section, including its
heading and padding, disappears. No photos are required. All existing About
copy, images, projects and featured ordering are preserved from the latest
user-supplied repository `(11).zip`.

---

# Optional About-page photo galleries (27 October 2026)

The **How It All Began** and **Outside Engineering** sections can each display
**up to four photographs**. On wide screens they appear in a compact four-column
row; on narrow screens, two columns. Photographs are **not cropped** and can be
clicked for a large view with arrow navigation, Escape to close, and captions.

**No images are necessary.** Both arrays are initially empty, so the page is
complete and attractive with only text. There are no blank gallery blocks,
placeholder images or unused gallery spacing.

To add photographs:

1. Copy your own JPEG/PNG/WebP photographs into `assets/images/`.
2. In `assets/js/site-data.js`, under `owner`, populate `aboutHistoryPhotos`
   and/or `outsideEngineeringPhotos`. Example:

```javascript
aboutHistoryPhotos: [
  { src: "assets/images/lego-42055.jpg", caption: "Building the Bucket Wheel Excavator" },
  { src: "assets/images/lego-collection.jpg", caption: "My LEGO Technic collection" }
],
outsideEngineeringPhotos: [
  { src: "assets/images/glorney-cup.jpg", caption: "At the Glorney Cup" },
  { src: "assets/images/bikepacking.jpg", caption: "Bikepacking trip" }
],
```

(The filenames above are illustrative, not included files. Use the actual
uploaded names and precise letter case.) Captions can be omitted, and optional
`alt` can provide a more detailed image description. More than four entries
will display only the first four valid image paths in each section.

If photographs show other children, check permission before publishing them.

---

# About page — personal introduction, history and interests (27 October 2026)

The About page now has three main parts: the introduction, **How It All Began**
(LEGO Technic), and **Outside Engineering** (chess). It retains the existing
Areas of Interest sidebar and the wider site's appearance.

Edit the text in `assets/js/site-data.js` under `owner`:
- `aboutParagraphs` — introduction, mechanical engineering interests and ambitions.
- `aboutHistoryParagraphs` — LEGO Technic history; the student can add his chosen favourite models here.
- `outsideEngineeringParagraphs` — chess achievement and other personal interests.

The earlier engineering philosophy, gripper constraints table and separate future
ambitions sections are no longer displayed on the About page. Those technical
subjects are better covered by the project pages.

---

# Selected Projects — manual ordering (25 October 2026)

The homepage **Selected Projects** section is now controlled exclusively by
`featuredOrder` in `assets/js/site-data.js`, and not by category order or by
project position within the array.

For any entry inside `projects: [...]` **or** `software: [...]`, add:

```javascript
featuredOrder: 3,
```

- `featuredOrder: 1` appears first; `2` appears next; and so on.
- **No `featuredOrder` field** means the entry does **not** appear in Selected Projects.
- Only positive whole numbers work; use **unique** numbers. Duplicates sort by
  title as a predictable fallback.
- The entry still appears in its existing Robotics/CAD/Fabrication/Electronics or
  Software listing even when not featured.
- The homepage no longer automatically includes the Return to Base software
  entry or the first two projects from each category. Software entries only
  appear when given `featuredOrder`, just like normal projects.
- Numbers do **not** need to be consecutive; `1`, `5`, `20` is valid.

The currently selected entries have been given numbers `1–9` to preserve the
previously visible homepage order. To change it, edit those numbers; to hide
an entry, remove the entire `featuredOrder: N,` line. To add another entry,
add that property to its record.

**Files edited:** `assets/js/site-data.js`, `assets/js/site.js`, and the HTML
script version strings (cache refresh). All existing images, descriptions,
project detail pages, navigation and category listings remain unchanged.

---

# Project Journal — 25 October 2026 update

The top utility navigation is now **Home · Selected Projects · About** on every page. “Selected Projects” opens the existing gallery at `index.html#featured`; the second row still provides All Projects and the individual engineering disciplines.

Within **Embedded Control & Integration**, **Robot I/O Mapping & Hardware Abstraction** is a separate project linked in both directions to the **Modular Robot I/O & TeleOp Controller**. The cover image `assets/images/io-interface-contract.svg` is a simplified table of `io.*` interface calls. It is deliberately independent of physical pins and hardware connections.

The `ioMap` record and technical prose are editable in `assets/js/site-data.js`. The picture is an editable SVG asset, generated for display from the same representative interface examples. Click the image in the project page to view full size.

Upload the contents of the changes-only ZIP to the root of the GitHub Pages repository, preserving the `assets` directory. The complete ZIP is also available.

---

# New Electronics project — I/O mapping (25 October 2026)

This change uses the existing `project.html` layout. No standalone HTML page or new navigation category is required.

**New project**: `project.html?id=robot-io-mapping` — Robot I/O Mapping & Hardware Abstraction.
It appears under Embedded Control & Integration and in All Projects.

The existing Arduino Mega project (`project.html?id=robot-control-electronics`) and the new project link to each other automatically via `relatedProjectIds`.

The new project includes a nine-row representative I/O table drawn from the engineering mapping provided in the chat. It groups multiple device properties into one row and omits migration, firmware, and alternative-backend columns, without claiming all hardware has been tested. Change its text, rows, and columns under `projects[].ioMap` in `assets/js/site-data.js`.

For now the new project uses the existing Arduino Mega wiring diagram as its image, with a caption explaining that it is the hardware reference. Replace its `image` and `imageCaption` in `site-data.js` if a dedicated diagram is available later.

**Changed files:** `assets/js/site-data.js`, `assets/js/site.js`, `assets/css/style.css`, all root HTML files (cache version references), and this README. Other project content, photographs, galleries and navigation remain unchanged.

To upload, extract the changed-files ZIP and replace the matching files in the GitHub Pages repository; or use the complete ZIP and upload its contents. Commit and refresh after deployment.

---

# Project Journal — simplified page layout (25 October 2026)

This release is based on the most recently supplied GitHub repository ZIP. The original
photographs, project records, print galleries, video, algorithms and navigation are retained.

- **Home:** headline "Project Journal", shorter introduction, discipline heading "Projects",
  the existing discipline/selected-work galleries and photographs. Introductory labels,
  overlay annotation, Explore buttons, category numbering, process and about sections removed.
- **All Projects:** the "All Projects" heading remains; category-specific listings rely
  on the active top navigation and do not repeat a large category heading.
- **Project detail pages (historical note):** older project-specific navigation was
  later replaced by the ten consistent report headings documented at the top of
  this README. Detailed technical content remains under named subheadings.
- **3D-print pages:** the CAD and finished-print gallery plus print settings
  remain. The report text now uses the same optional section headings as other projects.
- **All pages:** the repeated footer name/tagline block is removed. Compact copyright
  and any configured social links remain.

Upload the files *inside* the extracted `conor-beattie.github.io-main` folder to the
root of the GitHub Pages repository, then commit. The HTML pages include refreshed
asset cache versions so updated styles/scripts appear without requiring a hard refresh.

---

# Engineering Portfolio — navigation revision (23 October 2026)

This is a **complete GitHub Pages website**, built from the latest supplied site ZIP.
No build tools, hosting account changes, external libraries or separate deployment services are required.

## Upload to GitHub Pages

1. Download and unzip the ZIP.
2. Open the included `conor-beattie.github.io-main` folder.
3. In the existing GitHub repository, replace the matching top-level HTML files and `assets/` contents with those in this folder, **including the new files**. It is easiest to drag and drop the complete contents at the repository root, with directory structure preserved. The main `index.html` must remain at the repository root.
4. Commit the upload. Reload the published GitHub Pages URL after deployment (hard-refresh if your browser has cached old JavaScript/CSS).

Do not upload only `index.html`: the new Software pages depend on the updated JS, CSS and diagram files.

## Navigation (revised)

The top utility navigation contains **Home** and **About**. The main category navigation contains **All Projects**, Robotics, Mechanical Design & CAD, 3D Printing & Fabrication, **Embedded Control & Integration**, Software and Algorithms.

The gallery no longer repeats category filter buttons: use the main navigation to choose a category. Search and result counts remain available. All Projects shows the physical projects; Software and Algorithms retain dedicated catalogues.

## Structure

- `index.html` — home; six discipline cards
- `projects.html`, `project.html` — robotics, CAD, fabrication, electronics (existing records preserved)
- `software.html` — software behaviour/system gallery
- `software-detail.html?id=return-to-base` — reusable software detail template
- `algorithms.html` — grouped algorithm library
- `algorithm.html?id=ibvs` — reusable algorithm detail template
- `about.html` — About
- `assets/js/site-data.js` — **edit content here**
- `assets/js/site.js` — rendering and link logic; normally no edits necessary
- `assets/css/style.css` — visual styling
- `assets/diagrams/bobbot-return-to-base.svg` — real Return-to-Base flowchart (editable SVG)
- `assets/images/*-cover.svg` — editable small illustrations for software cards

## Adding a software behaviour

Open `assets/js/site-data.js` and duplicate one object under **`software: []`**. Keep the `id` unique, for example `return-to-base`.

Essential fields: `id`, `title`, `type` (`Behaviour`, `Subroutine`, or `System`), `summary`, `image`, `status`, `robotIds` and `algorithmIds`. Edit the ten shared `sections` fields (and optional `sectionDetails`) for the detail page; add `codeFiles`, `sourceUrl`, and optional `references` as relevant. Use a `flowchart` path when you have a matching SVG.

- `robotIds: ["autonomous-mobile-robot"]` links automatically to the existing Bobbot robot project.
- `algorithmIds: ["wall-following", "distance-angle-control"]` shows algorithm links automatically. **No video is required for these links.**
- The matching algorithm pages automatically list software entries that reference them.
- `demos: []` is optional and can remain empty. Only add true public video links when recordings are available.

## Adding an algorithm

Duplicate an entry under **`algorithms: []`** in `site-data.js`. Give it a unique ID, and fill `title`, `shortName`, `group`, `summary`, `overview`, `method`, `considerations`, `implementation`. It will appear automatically under its group's heading and will support automatic backlinks from software.

The algorithm library contains background study topics as well as documented methods. **A page or software link is not proof of physical testing.** Add measured results and any genuine public code/video URLs only when available.

## Project / software / algorithm distinctions

- **Projects** describe physical robots, CAD designs, prints and electronics.
- **Software** describes behaviours, modules, design iterations and evidence.
- **Algorithms** explains reusable techniques and limitations. One algorithm can be linked from many software modules.

Two unused, generic template Software Project placeholders from the supplied website are replaced by substantive software entries. All substantive existing robotics, CAD, fabrication and electronics projects and original image files are retained.

## Return-to-Base caveats

The flowchart summarises program structure; it is **not** full end-to-end test evidence. The Oct 2026 source includes a provisional hard-coded `Drive(750 mm)` fallback. The portfolio diagram deliberately names the category **open-loop return control** instead of presenting 750 mm as an engineered constant. Code is not changed by this website update.

The accompanying notes distinguish implementation, prior development, current test evidence and work still to verify. Source URLs and performance metrics are left unset rather than invented.


## 3D Printing & Fabrication pages — new photo galleries

Each 3D-print project now has its own page style, inspired by print-sharing sites.

1. **CAD render at the top:** `image: "assets/images/your-CAD.png"` (unchanged).
2. **Real photographs immediately below:** `printPhotos` accepts **1–4** actual photographs (`.jpg`, `.jpeg`, `.png`, `.webp`). The first is large, additional photos appear beside it. Clicking a photo opens a full-size viewer with arrow navigation. If the list is empty, a neutral placeholder appears instead.
3. **Print profile:** Optional `printDetails` fields for material, printer, layer height, infill, supports and print time. Blank entries are not shown as fabricated settings.
4. **Engineering notes:** All ten standard `sections` fields are present in `site-data.js`. Nonempty content appears under the consistent headings below the gallery; multiple former technical notes are retained as editable `sectionDetails`.
5. **Technical file links:** Existing `links.cad`, `links.downloads`, etc., appear on the 3D-print page if supplied. No downloads are invented.

Example to place **inside any 3D-print project** in `assets/js/site-data.js`:

```javascript
image: "assets/images/my-pulley-cad.png", // Main CAD design image
printPhotos: [
  { src: "assets/images/printed-pulley-front.jpeg", caption: "Front view" },
  { src: "assets/images/printed-pulley-side.jpeg", caption: "Side view" },
  { src: "assets/images/printed-pulley-installed.jpeg", caption: "Fitted to robot" }
],
printDetails: {
  material: "PETG", printer: "Bambu P1S", layerHeight: "0.2 mm",
  infill: "20%", supports: "No", printTime: ""
},
```

This is **illustrative**, not a statement that the provided designs used these settings.

The existing Pulleys entry uses the real `IMG_2788 3d print pulley.jpg` as its first `printPhotos` item, instead of incorrectly displaying its file path as text under Results. Other 3D prints have empty `printPhotos` arrays until you add photographs.

## Gripper projects (27 October 2026)

Two independent Mechanical Design & CAD project entries are deliberately maintained:

- `project.html?id=mechanical-gripper` — **Bobbot Gripper — Original Design**, the first gripper built for Bobbot. Its project ID and homepage `featuredOrder: 6` are unchanged.
- `project.html?id=robotic-gripper-grasp-detection` — **Robotic Gripper — Grasp Detection Investigation**, an additional design investigation using the original as a comparison baseline. This has no `featuredOrder` by default, so it is available in Mechanical Design & CAD / All Projects but is not added to Selected Projects automatically.

The new project's `investigation` object in `assets/js/site-data.js` holds design criteria, alternative jaw/detection concepts and a planned trial table. Empty `media` and `sources` arrays can be filled with genuine drawings/photos and references. Do not add results as completed until tested. Its hero image currently shows the **original** gripper as a reference, not the new design.


## Draft and selected-project controls (October 2026)

Every project record has `published: true` by default. Change it to `published: false` to omit it from **all public project lists, the homepage, direct project URLs, and related-project links**. You can keep `featuredOrder` assigned while the item is a draft; when you republish it, its place in Selected Projects returns. `featuredOrder` is a positive integer; entries without it are never featured. The separate grasp-detection gripper is now featured at position **1** and the former numbered selections are shifted by **+1**.

For a live development preview, open **`https://conor-beattie.github.io/development.html`** (bookmark this address). The unlisted page includes published and draft projects. While exploring a draft, category, homepage, About, software or other internal pages, the URL carries `preview=drafts` automatically. This preview mode is maintained across navigation and refreshes. Use **All development projects** to return to the listing, or **Exit to public view** to return to the normal public homepage. No local repository is required to review drafts.

The development page is **unlisted, not password-protected**. Anyone with its URL or a `preview=drafts` link can view drafts; the public source and uploaded draft images are also accessible. It should not contain sensitive or confidential material.

To publish the new gripper when ready, set its `published` field to `true`; to hide it during development, set `published: false` while retaining `featuredOrder: 1`.


### Gripper contact-surface investigation (draft)

A separate Mechanical Design & CAD project now has ID `gripper-contact-surfaces`.
Its research, requirements, material shortlist and test protocol are defined in
`assets/js/site-data.js` under `surfaceStudy`. It is initially `published: false`,
so it is absent from public galleries and direct URLs, and can be previewed on the live site
from `development.html` (or `project.html?id=gripper-contact-surfaces&preview=drafts`).
Set `published: true` when ready to release. No featured position was added.

The image is the original Bobbot gripper as a labelled baseline, not a new pad.
Test measurements and manufacturing outcomes are intentionally not invented.
The linked technical sources are background and are not evidence that the selected
commercial filaments have already passed the cardboard comparison.


### Project skills and optional engineering summary (November 2026)

All engineering projects and software entries have two new data fields in `assets/js/site-data.js`:

- `skills: ["CAD", "3D Printing"]` — use the **same exact skill name** everywhere, and list only abilities actually demonstrated by the work. Clicking a skill opens `projects.html?skill=cad` (or similar), showing matching published projects **and software** across categories; development preview persists. Earlier `tags` are retained as archival data but no longer shown or used for filtering.
- `engineeringSummary: { challenge: "", contribution: "", outcome: "", lessonsLearned: "" }` — these four *optional* short descriptions appear beneath a project image/flowchart **only if populated**. None are prefilled. They are distinct from the optional ten long-form `sections` fields.

All 14 fields can remain blank for short projects, such as a straightforward 3D-printed mount. No empty heading or empty ON THIS PAGE panel should appear.

The short `outcome` is additionally shown on listing cards when present. Only the new `skills` field controls clickable skill badges; the older `tags` values are retained in source for reference.


## Proposal-stage project planning (4 November 2026)

`projectPlan: ""` is available on every engineering project and software entry.
When populated, **Project Plan** displays after Materials & Methods and before
Results and Discussion. All sections remain optional and hidden when empty.

For Gripper Contact Pads (Part 1), the proposal currently displays:
- Introduction: Background, Literature Review, Study Aim, Objectives.
- Materials & Methods: Material Selection (existing 10-row table), Contact-Pad
  Design, 3D Printed Specimens, Sliding Friction Test, Gripper Pull-Out Test,
  Robot Pickup Test (each test includes its existing diagram and formula).
- Project Plan: Schedule, Budget, Contingencies.
- Related Projects and References, with source links and citations retained.

Abstract remains empty until results and conclusions can be summarised. Study-
stage Results and Discussion, Conclusions and Lessons Learned also remain blank.
Short provisional subsection text should be replaced with project-specific plans
and then actual methodology as work progresses. The previously proposed cardboard
damage test is still retained in `testMethods` data but not displayed in the
current three-test proposal outline. The standard engineering project detail
page no longer has the bottom Explore More / More engineering projects / All
projects promotional panel; normal navigation is unchanged.
