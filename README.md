# Engineering Portfolio — GitHub Pages

A responsive static engineering portfolio based on the supplied `Portfolio.docx` outline. Uses plain HTML, CSS and JavaScript. No build tools, theme installations or paid hosting needed.

**The four starter images and four project descriptions are illustrative templates, NOT the student's actual work. Replace them before sharing widely.**

## Publish

1. Extract the ZIP file on your computer.
2. Open the existing GitHub repository named exactly `YOUR-GITHUB-USERNAME.github.io` (include any hyphens in the username).
3. In GitHub select **Add file → Upload files**; upload the **contents** of the extracted folder, including the `assets` directory. `index.html` must sit directly in the repository's root, NOT inside a further subfolder.
4. Commit to the `main` branch.
5. Under **Settings → Pages**, select **Deploy from a branch → main → /(root)** and save.
6. After deployment finishes, visit `https://YOUR-GITHUB-USERNAME.github.io/`.

If the GitHub repository already contains a README, you may replace it with this one. The published homepage is `index.html`.

## Edit the content

**Edit `assets/js/site-data.js`**. It contains almost everything you need to change:

- `owner.name`, `owner.initials`: public name and small logo.
- `owner.headline`, `owner.introduction`, `owner.shortAbout`, `owner.aboutParagraphs`: website text.
- `owner.githubUrl`, `owner.youtubeUrl`, `owner.linkedinUrl`, `owner.email`: optional links; blank values are hidden.
- `categories`: the four homepage areas — robotics, CAD, 3D printing and software.
- `projects`: individual projects. Each has a title, summary, image, category, tags, individual contribution and detailed project-page sections.

### Replace pictures

The four examples from your Word document are:

- `assets/images/robotics.webp`
- `assets/images/cad.webp`
- `assets/images/fabrication.webp`
- `assets/images/electronics.webp`

Either replace the corresponding image file, keeping its name, or upload a new `.jpg`, `.png`, or `.webp` picture and change its image path in `site-data.js`. Use your own photographs and renders, with permission to publish. Compressed landscape images around 1200 pixels wide work well.

The first project's image is used as the large homepage picture.

### Add or replace projects

In `site-data.js`, find `projects: [ ... ]`. Replace the four example entries with real projects, or duplicate one object to add a new entry. Give every project a unique `id` (e.g. `robot-arm-v2`). Its detail-page URL becomes `project.html?id=robot-arm-v2`.

Allowed categories: `robotics`, `cad`, `fabrication`, `software`.

Every project page follows the same engineering documentation structure: **Overview, Objectives, Design, Construction, Software, Testing, Iterations, Results, Lessons learned**. For an area that doesn't apply, simply state that.

Add public URLs to a project's `links` when ready. Empty links are hidden. Do not publish school-team code without permission.

### Remove the sample-content banner

After the material has been replaced, set `showTemplateNotice: false` in `site-data.js`, and update or clear `settings.imageCredit`.

## Files

```text
index.html                Home and main engineering categories
projects.html             Project gallery with search and filters
project.html              Reusable project detail page
about.html                About section
assets/css/style.css      Design and responsive layout
assets/js/site-data.js    EDIT THIS for text, links and pictures
assets/js/site.js         Display logic — normally leave unchanged
assets/images/            Four editable example images
.nojekyll                 GitHub Pages configuration helper
README.md                 These instructions
```

Check the site on desktop and mobile before sharing it. Avoid publicly including private contact information, school schedules, home addresses or identifiable real-time locations.
