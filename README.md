# Engineering Portfolio – repaired GitHub Pages version

This fixes the missing styling, pictures and project galleries shown in the screenshot.
All pages contain their own CSS and a fallback copy of the JavaScript and four example images.
Even an incomplete upload will no longer produce the browser's default unstyled appearance.

## IMPORTANT – exactly which files go where

GitHub repository root (same level as your existing README.md):

    index.html
    projects.html
    project.html
    about.html
    assets/
        css/style.css
        js/site-data.js
        js/site.js
        images/robotics.webp
        images/cad.webp
        images/fabrication.webp
        images/electronics.webp

**There must not be an extra `engineering_portfolio_fixed/` or `engineering_portfolio_github_pages/` folder around these files on GitHub.**

To correct a site with the wrong directory:
1. Extract the ZIP on your computer.
2. Open the *inside* of the extracted folder.
3. Select the four HTML files and the `assets` folder, then drag them into the **root** of your GitHub repository under `Add file > Upload files`.
4. Commit the replacement files to `main`. Wait for Actions > pages build and deployment to finish.
5. Refresh https://YOUR-USERNAME.github.io/ (force refresh: Ctrl+F5).

If GitHub's file uploader skips folders or you cannot upload them: the four HTML pages in this package also work independently. Upload just the four `.html` files for a functioning preview with the four built-in sample images. You can upload the `assets` folder later for easy customisation.

## Edit content

Edit `assets/js/site-data.js` to change name, categories, summaries, project cards and URLs.
Replace or add pictures in `assets/images/`, and change references in `site-data.js` if you change the names. The embedded samples are only safety fallbacks.

The old site used several CSS and JS asset references. The new pages contain their own styles and logic so missing asset files do not collapse the design.

## Check live paths

- https://YOUR-USERNAME.github.io/ → home
- https://YOUR-USERNAME.github.io/projects.html → searchable project list
- https://YOUR-USERNAME.github.io/about.html → about page
- https://YOUR-USERNAME.github.io/assets/js/site-data.js → editable content source (if uploaded)

All initial projects, captions and illustrations are placeholders. Replace before treating them as real student work.
