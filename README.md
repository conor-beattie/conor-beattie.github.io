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

Within **Electronics & Embedded Systems**, **Robot I/O Mapping & Hardware Abstraction** is a separate project linked in both directions to the **Modular Robot I/O & TeleOp Controller**. The cover image `assets/images/io-interface-contract.svg` is a simplified table of `io.*` interface calls. It is deliberately independent of physical pins and hardware connections.

The `ioMap` record and technical prose are editable in `assets/js/site-data.js`. The picture is an editable SVG asset, generated for display from the same representative interface examples. Click the image in the project page to view full size.

Upload the contents of the changes-only ZIP to the root of the GitHub Pages repository, preserving the `assets` directory. The complete ZIP is also available.

---

# New Electronics project — I/O mapping (25 October 2026)

This change uses the existing `project.html` layout. No standalone HTML page or new navigation category is required.

**New project**: `project.html?id=robot-io-mapping` — Robot I/O Mapping & Hardware Abstraction.
It appears under Electronics & Embedded Systems and in All Projects.

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
- **Project detail pages:** section numbering, "Individual contribution", Objectives and
  Design removed from the display; "Software" and linked software sections read
  "Software & Algorithms". The underlying project fields remain in `assets/js/site-data.js`.
- **3D-print pages:** the original CAD-plus-1–4-photo gallery, print settings and
  expandable printing/testing notes are preserved; Objectives and Design are no longer shown.
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

The top utility navigation contains **Home** and **About**. The main category navigation contains **All Projects**, Robotics, Mechanical Design & CAD, 3D Printing & Fabrication, **Electronics & Embedded Systems**, Software and Algorithms.

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

Essential fields: `id`, `title`, `type` (`Behaviour`, `Subroutine`, or `System`), `summary`, `image`, `status`, `robotIds` and `algorithmIds`. Add `objective`, `implementation`, `changes`, `lessons`, `testing`, `next`, `codeFiles` and `sourceUrl` for the detail page. Use a `flowchart` path when you have a matching SVG.

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
4. **Engineering notes:** The original `sections` fields (overview, objectives, design, construction, software, testing, iterations, results, lessons) remain in `site-data.js`. Longer technical notes now appear in expandable groups beneath the gallery.
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

For a local development preview, open `development.html` from a local copy (or serve the site on localhost). It lists both published and draft engineering projects. Click a draft to open `project.html?id=...&preview=drafts`. On the public GitHub Pages host, this query cannot unlock drafts, and `development.html` displays only a local-preview notice. This is **visibility control, not secrecy**: the public repository's `assets/js/site-data.js` and any uploaded draft images remain accessible to someone inspecting the source.

To publish the new gripper when ready, set its `published` field to `true`; to hide it during development, set `published: false` while retaining `featuredOrder: 1`.
