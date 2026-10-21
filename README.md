# Engineering Portfolio — GitHub Pages (updated)

This complete website package is based on the **previously repaired** repository and retains the edited portfolio name, descriptions, links and existing photographs.

## Changes in this version

- The category heading is now **Robotics** everywhere it is displayed. Existing project IDs and Bobbot's project title are unchanged.
- Four additional project entries have been added in `assets/js/site-data.js`: one each for **Robotics**, **Mechanical Design & CAD**, **3D Printing & Fabrication** and **Software & Electronics**.
- There are now **eight total projects**, two per category. The homepage shows two per category, and the Projects gallery provides searchable/filterable access to all eight.
- The four new projects are **editable examples** (marked as such), not statements that additional engineering projects have been completed.
- The existing JavaScript error fix is retained: the HTML does not contain embedded copies of old project data. `assets/js/site-data.js` remains the one authoritative content source.
- An updated asset URL version is used in the pages to avoid displaying old cached JavaScript immediately after deployment.

## Uploading to GitHub Pages

1. Download and extract the ZIP.
2. Open the extracted folder. Its **contents**, not an extra enclosing folder, belong at the root of `conor-beattie.github.io`.
3. Upload the four `.html` pages and the `assets` directory to the root of your existing GitHub repository. Overwrite existing versions when prompted.
4. Commit to the Pages branch (normally `main`). Wait for the Pages deployment in **Actions** to succeed.
5. Refresh the website. If an older cached version remains, press **Ctrl + Shift + R**.

The ZIP contains your existing images and other files as well as the revised code.

## Editing projects

Edit **`assets/js/site-data.js`**. Under `projects: [ ... ]`, each object represents a project. All the new entries are labelled `Project 2 — Add Title` and their summaries begin with `Example entry:`. Replace those titles, summaries, pictures and the nine documentation sections with actual work whenever ready.

You can update:
- Name and introduction: `owner`.
- Four engineering categories and their pictures: `categories`.
- Project titles, photos, summaries, individual contributions, descriptions, resource links: `projects`.

Keep `id` unique for each project. Keep `category` as one of `robotics`, `cad`, `fabrication`, `software`. Empty technical URLs under `links` remain hidden.

### Folder layout

```
index.html                   Homepage
projects.html                Searchable/filterable project gallery
project.html                 Reusable project detail page
about.html                   About page
assets/js/site-data.js       EDIT HERE for project content
assets/js/site.js            Shared page rendering code
assets/css/style.css         Styles
assets/images/               Your existing pictures and supplied examples
.nojekyll                    Static GitHub Pages publishing support
```

Avoid inadvertently deleting custom edits to the data file during later code updates. Keep JS strings correctly quoted; a syntax error in `site-data.js` now produces a visible warning instead of silently restoring old sample content.
