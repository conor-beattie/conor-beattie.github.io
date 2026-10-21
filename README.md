# Engineering Portfolio — Robotics, Software & Algorithms

This is the updated GitHub Pages portfolio built **from the uploaded repository**. It preserves the existing design, owner information, eight earlier project entries, photographs, CSS and JavaScript architecture.

## What's new

- Five engineering disciplines: **Robotics**, **Mechanical Design & CAD**, **3D Printing & Fabrication**, **Software & Algorithms**, and **Electronics & Embedded Systems**.
- Existing combined Software & Electronics entries are assigned to the appropriate new sections. Two extra editable starter projects were added so that the homepage still shows **two project cards per discipline** (10 cards in total).
- New **Software & Algorithms** page (`algorithms.html`) and reusable algorithm page (`algorithm.html?id=ibvs`).
- Starter reference entries for IBVS, PBVS, PID and Pure Pursuit (technical descriptions, **not** claims of completed implementations).
- Video demonstrations, when added to an algorithm, automatically appear **both** on the algorithm page and on the corresponding robot's project page.
- All existing project IDs are retained. Neither the Bobbot description nor the user-supplied photographs have been replaced.

## Publish to GitHub Pages

1. Unzip the archive on your computer.
2. Open the extracted folder and select **its contents**, not the folder itself.
3. In the `conor-beattie.github.io` GitHub repository, upload the HTML files and the `assets/` folder into the repository root. Commit changes to `main`.
4. Keep the `.nojekyll` file. Check Settings → Pages is configured for `main` and `/ (root)`.
5. Wait for the Pages deployment, then refresh the site with `Ctrl+Shift+R` if the previous version is still cached.

These files must sit together at the root: `index.html`, `projects.html`, `project.html`, `about.html`, **`algorithms.html`** and **`algorithm.html`**. If only the edited JavaScript is uploaded, links to the new algorithm pages will not work.

## Routine editing — ONE file

Edit `assets/js/site-data.js` for virtually all routine changes. It includes:

- `owner` — profile details and links
- `categories` — all five homepage disciplines
- `projects` — robot, CAD, fabrication, software and electronics project pages
- `algorithms` — method descriptions plus reusable demonstrations

The layout and navigation live in `assets/js/site.js`; visual styling lives in `assets/css/style.css`. You generally don't need to edit either to add a project, algorithm or video.

**Photos:** Upload to `assets/images/`; use their paths in `image` fields. The original `.jpg` filenames with spaces still work, but lowercase names with hyphens are easier to maintain for future files.

## Project IDs — do not accidentally change these

A robot's project has a unique `id`, used both in its own URL and in the video links.

| Robot page | `projects[].id` |
|---|---|
| Current Bobbot entry | `autonomous-mobile-robot` |
| Current second robot template (rename to Robbot if appropriate) | `robotics-project-2` |

You may change a project's displayed `title` without changing its `id`. This keeps existing bookmarks and demonstration references intact.

The previous eight project IDs are preserved. New template project IDs are `software-project-2` and `embedded-project-2`.

## Add short videos (MP4)

Use **H.264 MP4**, ideally 720p, 5–30 seconds and reasonably compressed. Use `preload="none"` (already configured) so clips are not all downloaded on page load.

Suggested file layout:

```text
assets/videos/
  bobbot/
    ibvs-demo.mp4
    pbvs-demo.mp4
  robbot/
    ibvs-demo.mp4
```

**Each video is stored only once**, in its physical robot's folder. There is no need to duplicate files under an algorithm folder.

### Link a video from IBVS to Bobbot

1. Upload `ibvs-demo.mp4` to `assets/videos/bobbot/`.
2. In `assets/js/site-data.js`, find the `algorithms` entry with `id: "ibvs"`.
3. Replace `demos: []` with:

```js
demos: [
  {
    robotId: "autonomous-mobile-robot",
    title: "IBVS — Bobbot",
    description: "Describe what the robot does and the test conditions.",
    video: "assets/videos/bobbot/ibvs-demo.mp4",
    poster: "",  // Optional thumbnail path in assets/images/
    results: "Enter actual measured performance, if available."
  }
]
```

The demonstration now appears automatically on:

- `algorithm.html?id=ibvs` (all IBVS demonstrations)
- `project.html?id=autonomous-mobile-robot` (all linked demonstrations on Bobbot)

**For a second robot:** Add a second object in the same `demos` array, with `robotId: "robotics-project-2"` and the appropriate `assets/videos/robbot/...` file. You can do this even if you rename the second robot's displayed title to Robbot.

**For a new algorithm:** Duplicate an entry under `algorithms`, choose a unique `id` (e.g. `odometry`), enter its technical description and start with `demos: []`. The gallery and detail page are generated automatically. Do not add an untested implementation as though it is complete.

## New pages

- `algorithms.html` — all algorithm summaries **plus software project cards**.
- `algorithm.html?id=ibvs` — IBVS detail and available demonstrations.
- `algorithm.html?id=pbvs` — PBVS detail.
- `algorithm.html?id=pid` — PID detail.
- `algorithm.html?id=pure-pursuit` — Pure Pursuit detail.

The normal project gallery remains at `projects.html`, now with five filterable categories. The new Electronics & Embedded Systems section has its own category filter.

## Notes

The uploaded `assets/videos/temp.mp4` is only one byte long; it is **not a working video** and has not been linked to the website. Upload real MP4s before creating live demonstration records.

The four initial algorithm descriptions are general introductory content. None of the robot/algorithm links are enabled until a real demonstration is configured.

No new account, server, framework, service or payment is required; this remains a static GitHub Pages website.
