(function () {
  "use strict";
  const data = window.PORTFOLIO_DATA;
  if (!data || !data.owner || !Array.isArray(data.projects)) {
    document.addEventListener("DOMContentLoaded", () => {
      const target = document.querySelector("main") || document.body;
      const notice = document.createElement("div");
      notice.className = "template-banner";
      notice.textContent = "Portfolio information could not load. Check assets/js/site-data.js for a JavaScript syntax error or missing file.";
      target.prepend(notice);
    });
    return;
  }
  const $ = (selector, base = document) => base.querySelector(selector);
  const $$ = (selector, base = document) => Array.from(base.querySelectorAll(selector));
  const escape = (str) => String(str == null ? "" : str).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const href = (url) => {
    if (!url) return "";
    try {
      const u = new URL(url, document.baseURI);
      return ["http:", "https:", "mailto:"].includes(u.protocol) ? u.href : "";
    } catch (_) { return ""; }
  };
  const img = (path) => escape(path || "assets/images/IMG_2627 Bobbot.jpg");
  const text = (s) => escape(s || "");
  const category = (id) => data.categories.find(c => c.id === id);
  const kindLabel = (p) => p.category === "fabrication" ? "3D PRINT" : (category(p.category)?.title || "Portfolio entry");
  const navCategory = () => {
    const page = document.body.dataset.page;
    if (page === "software" || page === "software-detail") return "software";
    if (page === "algorithms" || page === "algorithm") return "algorithms";
    if (page === "project") {
      const id = new URLSearchParams(location.search).get("id");
      return data.projects.find(p => p.id === id)?.category || "";
    }
    if (page === "projects") {
      const chosen = new URLSearchParams(location.search).get("category") || "";
      return chosen === "software" ? "software" : chosen === "algorithms" ? "algorithms" : (category(chosen) ? chosen : "all");
    }
    return "";
  };
  function updateNavState() {
    const current = navCategory();
    const page = document.body.dataset.page;
    $$('[data-category-nav]').forEach(el => {
      if (el.dataset.categoryNav === current) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
    $$('[data-nav]').forEach(el => {
      const selected = (page === 'home' && el.dataset.nav === 'home') ||
        (page === 'about' && el.dataset.nav === 'about');
      if (selected) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
  }
  const paragraphs = (s) => String(s || "").split(/\n\s*\n/).filter(Boolean)
    .map(p => `<p>${text(p)}</p>`).join("");
  const projectUrl = (project) => `project.html?id=${encodeURIComponent(project.id)}`;
  const algorithmUrl = (algorithm) => `algorithm.html?id=${encodeURIComponent(algorithm.id)}`;
  const algorithms = Array.isArray(data.algorithms) ? data.algorithms : [];
  const algorithm = (id) => algorithms.find(a => a.id === id);
  const demosForProject = (projectId) => algorithms.flatMap(a =>
    (a.demos || []).filter(d => d.robotId === projectId && d.video)
      .map(d => ({ algorithm: a, demo: d }))
  );
  // Do not show a robot/algorithm link until a real video has been assigned.
  const localMedia = (path) => {
    if (!path || typeof path !== "string" || !/^assets\/(videos|images)\/[a-zA-Z0-9_ ./()-]+\.(mp4|webm|webp|png|jpe?g)$/i.test(path) || path.includes("..")) return "";
    return escape(path);
  };

  function setText(selector, value) { $$(selector).forEach(el => el.textContent = value); }
  function linkMarkup(url, label, cls = "text-link") {
    const safe = href(url);
    return safe ? `<a class="${cls}" href="${escape(safe)}" target="_blank" rel="noopener noreferrer">${escape(label)} <span aria-hidden="true">↗</span></a>` : "";
  }

  function siteShell() {
    setText("[data-owner-name]", data.owner.name);
    setText("[data-owner-initials]", data.owner.initials);
    setText("[data-portfolio-title]", data.owner.portfolioTitle);
    setText("[data-year]", new Date().getFullYear().toString());
    const pageTitle = document.querySelector("[data-page-title]");
    document.title = `${pageTitle ? pageTitle.getAttribute("data-page-title") + " · " : ""}${data.owner.name} — ${data.owner.portfolioTitle}`;
    const notice = $("#template-notice");
    if (notice) notice.hidden = !data.settings.showTemplateNotice;
    const imageNote = $("#image-disclaimer");
    if (imageNote) imageNote.textContent = data.settings.imageCredit || "";
    const social = $("#footer-social");
    if (social) {
      social.innerHTML = [linkMarkup(data.owner.githubUrl, "GitHub"), linkMarkup(data.owner.youtubeUrl, "YouTube"), linkMarkup(data.owner.linkedinUrl, "LinkedIn")].filter(Boolean).join("");
    }
    const mobileToggle = $("#nav-toggle");
    const nav = $("#main-nav");
    if (mobileToggle && nav) {
      mobileToggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        mobileToggle.setAttribute("aria-expanded", String(open));
      });
      $$("a", nav).forEach(a => a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        mobileToggle.setAttribute("aria-expanded", "false");
      }));
    }
    updateNavState();
  }

  function projectCard(p) {
    return `<article class="project-card">
      <a href="${projectUrl(p)}" class="project-card__image" aria-label="View project: ${text(p.title)}">
        <img src="${img(p.image)}" alt="${text(p.imageAlt || p.title)}" loading="lazy" />
      </a>
      <div class="project-card__body">
        <div class="eyebrow-row"><span class="eyebrow">${text(kindLabel(p))}</span></div>
        <h3><a href="${projectUrl(p)}">${text(p.title)}</a></h3>
        <p>${text(p.summary)}</p>
        <div class="project-card__foot">
          <div class="tags">${(p.tags || []).slice(0, 3).map(t => `<span class="tag">${text(t)}</span>`).join("")}</div>
          <a href="${projectUrl(p)}" class="round-arrow" aria-label="Open ${text(p.title)}"><span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>`;
  }

  function algorithmCard(a) {
    const count = softwareForAlgorithm(a.id).length;
    return `<article class="algorithm-card">
      <div class="algorithm-card__top"><span class="eyebrow">${text(a.group)}</span><span class="algorithm-short">${text(a.shortName)}</span></div>
      <div class="algorithm-card__body">
        <h3><a href="${algorithmUrl(a)}">${text(a.title)}</a></h3>
        <p>${text(a.summary)}</p>
        <div class="algorithm-card__bottom"><span>${count ? `${count} linked software entr${count === 1 ? "y" : "ies"}` : "Reference / exploration"}</span><a href="${algorithmUrl(a)}" class="round-arrow" aria-label="View ${text(a.shortName)}"><span aria-hidden="true">↗</span></a></div>
      </div>
    </article>`;
  }

  function demoMarkup(item, showAlgorithmTitle = false) {
    const d = item.demo, a = item.algorithm;
    const robot = data.projects.find(p => p.id === d.robotId);
    const path = localMedia(d.video);
    if (!path || !robot) return ""; // Avoid broken links and unassigned implementations.
    const poster = localMedia(d.poster);
    return `<article class="demo-card">
      <div class="demo-card__head"><div><span class="eyebrow">${showAlgorithmTitle ? text(a.shortName) : "ROBOT DEMONSTRATION"}</span><h3>${text(d.title || a.title)}</h3></div></div>
      <video class="demo-player" controls playsinline preload="none" ${poster ? `poster="${poster}"` : ""} aria-label="${text(d.title || a.title)}"><source src="${path}" type="${path.toLowerCase().endsWith("webm") ? "video/webm" : "video/mp4"}"/>Your browser does not support HTML video.</video>
      ${d.description ? `<p>${text(d.description)}</p>` : ""}
      ${d.results ? `<p class="demo-results"><strong>Results:</strong> ${text(d.results)}</p>` : ""}
      <div class="demo-card__links"><a class="text-link" href="${projectUrl(robot)}">${text(robot.title)} ↗</a>${showAlgorithmTitle ? `<a class="text-link" href="${algorithmUrl(a)}">Algorithm details ↗</a>` : ""}</div>
    </article>`;
  }

  const softwareItems = Array.isArray(data.software) ? data.software : [];
  const softwareById = (id) => softwareItems.find(s => s.id === id);
  const softwareUrl = (s) => `software-detail.html?id=${encodeURIComponent(s.id)}`;
  const softwareForAlgorithm = (id) => softwareItems.filter(s => (s.algorithmIds || []).includes(id));
  const relatedAlgorithms = (ids) => (ids || []).map(algorithm).filter(Boolean);
  const chipLinks = (entries, makeUrl) => entries.map(item =>
    `<a class="method-chip" href="${makeUrl(item)}">${text(item.shortName || item.title)} <span aria-hidden="true">↗</span></a>`
  ).join("");
  const detailSection = (id, title, value) => value ? `<section class="detail-section" id="${id}"><div class="detail-section__index" aria-hidden="true">•</div><div><h2>${title}</h2>${paragraphs(value)}</div></section>` : "";

  function softwareCard(item) {
    return `<article class="software-card">
      <div class="software-card__body"><div class="eyebrow-row"><span class="eyebrow">${text(item.type || "Software")}</span><span class="maturity-note">${text(item.status || "")}</span></div>
      <h3><a href="${softwareUrl(item)}">${text(item.title)}</a></h3><p>${text(item.summary)}</p>
      <div class="software-card__bottom"><span class="muted-small">${(item.algorithmIds || []).length} linked methods</span><a class="round-arrow" href="${softwareUrl(item)}" aria-label="Open ${text(item.title)}"><span aria-hidden="true">↗</span></a></div></div>
    </article>`;
  }
  function software() {
    const root = $("#software-grid");
    if (!root) return;
    const featured = softwareItems.find(s => s.id === "return-to-base");
    const others = softwareItems.filter(s => s.id !== "return-to-base");
    root.innerHTML = (featured ? `<div class="software-feature">${softwareCard(featured)}<div class="software-feature__copy"><span class="eyebrow">FEATURED SOFTWARE</span><h2>From a fixed return to adaptive navigation.</h2><p>Explore how the October 2026 Python controller coordinates AprilTag routes, obstacle avoidance, guide recovery and wall following.</p><a class="text-link" href="${softwareUrl(featured)}">Open the annotated flowchart ↗</a></div></div>` : "") +
      `<div class="software-card-grid">${others.map(softwareCard).join("")}</div>`;
  }
  function softwareDetail() {
    const id = new URLSearchParams(location.search).get("id");
    const item = softwareById(id);
    const root = $("#software-content");
    if (!item) {
      root.innerHTML = `<div class="container not-found"><p class="eyebrow">SOFTWARE NOT FOUND</p><h1>No software entry has that ID.</h1><a class="button button-primary" href="software.html">Browse Software ↗</a></div>`; return;
    }
    document.title = `${item.title} · ${data.owner.name}`;
    const related = relatedAlgorithms(item.algorithmIds);
    const robots = (item.robotIds || []).map(id => data.projects.find(p => p.id === id)).filter(Boolean);
    const source = linkMarkup(item.sourceUrl, "View public source code");
    // Display meaningful flowcharts where available; omit decorative cover imagery.
    const media = item.flowchart ? `<figure class="flowchart-figure" id="flowchart"><a href="${img(item.flowchart)}" target="_blank" rel="noopener" title="Open flowchart at full size"><img src="${img(item.flowchart)}" alt="${text(item.imageAlt || `${item.title} control flowchart`)}" loading="eager"></a><figcaption>Code-derived control flowchart, simplified for presentation. Select it to view the full-size SVG.</figcaption></figure>` : "";
    root.innerHTML = `<div class="container"><div class="breadcrumb"><a href="software.html">Software</a><span aria-hidden="true">/</span><span>${text(item.title)}</span></div>
      <div class="project-intro"><p class="eyebrow">${text(item.type || "Software")} · ${text(item.status)}</p><h1>${text(item.title)}</h1><p class="project-lede">${text(item.summary)}</p><div class="tags tags-large">${(item.tags || []).map(tag => `<span class="tag">${text(tag)}</span>`).join("")}</div></div>
      ${media}
      <div class="detail-layout"><aside class="detail-aside"><p class="eyebrow">ON THIS PAGE</p><nav aria-label="Software sections"><a href="#objective">Objective</a><a href="#implementation">Implementation</a><a href="#development">What changed</a><a href="#lessons">Lessons learned</a><a href="#testing">Testing &amp; evidence</a><a href="#methods">Related algorithms</a><a href="#source-files">Code structure</a></nav>
      <div class="detail-callout"><strong>Evidence status</strong><p>${text(item.status)} — implementation and test results should be distinguished.</p></div></aside>
      <div class="detail-main">${detailSection("objective", "Objective", item.objective)}${detailSection("implementation", "How the software works", item.implementation)}${detailSection("development", "Development and iterations", item.changes)}${detailSection("lessons", "What was learned", item.lessons)}${detailSection("testing", "Testing and evidence", item.testing)}
      ${detailSection("next", "Further work", item.next)}
      <section class="detail-section" id="methods"><div class="detail-section__index">•</div><div><h2>Algorithms &amp; methods</h2><p>These reference pages explain the techniques behind this behaviour. A link does not imply every separate method has been individually validated.</p><div class="method-chip-row">${chipLinks(related,algorithmUrl) || '<span class="muted-small">Methods not yet linked.</span>'}</div></div></section>
      <section class="detail-section" id="source-files"><div class="detail-section__index">•</div><div><h2>Code structure</h2><p>Relevant source modules (paths are informational until a public repository URL is added).</p><ul class="code-file-list">${(item.codeFiles || []).map(f => `<li><code>${text(f)}</code></li>`).join("")}</ul>${source ? `<div class="resource-links">${source}</div>` : ""}</div></section>
      ${robots.length ? `<section class="detail-section"><div class="detail-section__index">•</div><div><h2>Robots using this software</h2><div class="related-list">${robots.map(p => `<a href="${projectUrl(p)}" class="related-item"><strong>${text(p.title)}</strong><span>Robot project ↗</span></a>`).join("")}</div></div></section>` : ""}
      </div></div><div class="next-action"><div><p class="eyebrow">EXPLORE MORE</p><h2>Other software behaviours</h2></div><a class="button button-outline" href="software.html">Software library ↗</a></div></div>`;
  }
  function algorithmsPage() {
    const gallery = $("#algorithm-groups");
    if (!gallery) return;
    const groups = [...new Set(algorithms.map(a => a.group || "Other"))];
    gallery.innerHTML = groups.map(group => {
      const subset = algorithms.filter(a => (a.group || "Other") === group);
      return `<section class="algorithm-group"><div class="algorithm-group__head"><h2>${text(group)}</h2><span>${subset.length} method${subset.length === 1 ? "" : "s"}</span></div><div class="algorithm-grid">${subset.map(algorithmCard).join("")}</div></section>`;
    }).join("");
    const count = $("#algorithm-count");
    if (count) count.textContent = `${algorithms.length} methods · ${groups.length} areas`;
  }
  function algorithmDetail() {
    const id = new URLSearchParams(location.search).get("id");
    const a = algorithm(id);
    const root = $("#algorithm-content");
    if (!a) { root.innerHTML = `<div class="container not-found"><p class="eyebrow">ALGORITHM NOT FOUND</p><h1>No algorithm has that ID.</h1><a class="button button-primary" href="algorithms.html">Browse algorithms ↗</a></div>`; return; }
    document.title = `${a.title} · ${data.owner.name}`;
    const implementations = softwareForAlgorithm(a.id);
    const videos = (a.demos || []).filter(d => d.video && data.projects.some(p => p.id === d.robotId)).map(d => ({algorithm:a,demo:d}));
    const source = linkMarkup(a.sourceUrl,"Reference / source link");
    root.innerHTML = `<div class="container"><div class="breadcrumb"><a href="algorithms.html">Algorithms</a><span aria-hidden="true">/</span><span>${text(a.shortName)}</span></div>
      <div class="project-intro"><p class="eyebrow">${text(a.group)} · ALGORITHM</p><h1>${text(a.title)}</h1><p class="project-lede">${text(a.summary)}</p></div>
      <div class="algorithm-detail-stack"><section><h2>What it does</h2>${paragraphs(a.overview)}</section><section><h2>How it works</h2>${paragraphs(a.method)}</section><section><h2>Limitations and considerations</h2>${paragraphs(a.considerations)}</section>
      <section><h2>Where it appears in the software</h2>${implementations.length ? `<p>The following software entries explicitly reference this method. See each implementation for its own evidence status and design history.</p><div class="related-list">${implementations.map(item => `<a class="related-item" href="${softwareUrl(item)}"><strong>${text(item.title)}</strong><span>${text(item.status)} · ${text(item.type)} ↗</span></a>`).join("")}</div>` : `<p>No software entry has been linked to this method yet. This is a general engineering reference, not a claim of implementation.</p>`}</section>
      ${a.implementation ? `<section><h2>Implementation notes</h2>${paragraphs(a.implementation)}</section>` : ""}
      ${videos.length ? `<section><h2>Recorded demonstrations</h2><div class="demo-grid">${videos.map(item=>demoMarkup(item)).join("")}</div></section>` : ""}
      ${source ? `<section><h2>Technical resources</h2>${source}</section>` : ""}</div>
      <div class="next-action"><div><span class="eyebrow">EXPLORE MORE</span><h2>More algorithms</h2></div><a class="button button-outline" href="algorithms.html">Algorithms library ↗</a></div></div>`;
  }

  function home() {
    setText("#hero-headline", data.owner.homeHeadline || data.owner.headline);
    setText("#hero-intro", data.owner.introduction);
    const imgEl = $("#home-hero-image");
    if (imgEl) imgEl.src = data.projects[0]?.image || data.categories[0]?.image;
    const catGrid = $("#category-grid");
    if (catGrid) catGrid.innerHTML = data.categories.map((cat) => `
      <a href="${cat.id === "software" ? "software.html" : cat.id === "algorithms" ? "algorithms.html" : `projects.html?category=${encodeURIComponent(cat.id)}`}" class="category-tile">
        <div class="category-tile__image"><img src="${img(cat.image)}" alt="${text(cat.title)}" loading="lazy" /></div>
        <div class="category-tile__info"><h3>${text(cat.title)}</h3><p>${text(cat.subtitle)}</p><span class="tile-arrow" aria-hidden="true">↗</span></div>
      </a>`).join("");
    const featured = $("#featured-projects");
    if (featured) {
      // Show up to two projects per discipline on the homepage, in category order.
      const picks = data.categories.filter(c => !["software", "algorithms"].includes(c.id)).flatMap(cat =>
        data.projects.filter(project => project.category === cat.id).slice(0, 2)
      );
      const returnEntry = softwareItems.find(item => item.id === "return-to-base");
      featured.innerHTML = (returnEntry ? softwareCard(returnEntry) : "") + picks.map(projectCard).join("");
    }
  }

  function updateListingIntro(chosen) {
    const title = $("#listing-title");
    const section = $(".page-top");
    const listing = $("#project-list")?.closest("section");
    const cat = category(chosen);
    if (title) title.textContent = cat ? cat.title : "All Projects";
    // The active navigation already names the discipline. Keep the heading in
    // the document for accessibility without repeating it above each gallery.
    if (section) section.classList.toggle("page-top--category", Boolean(cat));
    if (listing) listing.classList.toggle("section--category-list", Boolean(cat));
    document.title = `${cat ? cat.title : "All Projects"} · ${data.owner.name}`;
  }

  function projects() {
    const container = $("#project-list");
    const input = $("#project-search");
    const count = $("#project-count");
    let chosen = new URLSearchParams(location.search).get("category") || "all";
    if (chosen === "software") { location.replace("software.html"); return; }
    if (chosen === "algorithms") { location.replace("algorithms.html"); return; }
    if (chosen !== "all" && !category(chosen)) chosen = "all";
    function refresh() {
      const term = (input.value || "").toLocaleLowerCase().trim();
      const results = data.projects.filter(p => !["software"].includes(p.category)).filter(p => {
        const searchable = [p.title, p.summary, ...(p.tags || [])].join(" ").toLocaleLowerCase();
        return (chosen === "all" || p.category === chosen) && searchable.includes(term);
      });
      container.innerHTML = results.length ? results.map(projectCard).join("") : `<div class="empty-state"><h3>No matching projects</h3><p>Try clearing the search or choosing another category.</p></div>`;
      count.textContent = `${results.length} project${results.length === 1 ? "" : "s"}`;
    }
    input.addEventListener("input", refresh);
    updateListingIntro(chosen);
    refresh();
  }

  // 3D-print entries have a MakerWorld-inspired gallery and compact technical details.
  // Other engineering projects continue using the standard project template.
  function printDetail(p) {
    const root = $("#project-content");
    const photos = (Array.isArray(p.printPhotos) ? p.printPhotos : []).slice(0, 4)
      .map((entry) => typeof entry === "string" ? { src: entry, caption: "" } : entry)
      .filter(entry => entry && localMedia(entry.src))
      .map(entry => ({src: localMedia(entry.src), caption: String(entry.caption || ""), alt: String(entry.alt || entry.caption || `Actual printed ${p.title}`)}));
    const details = p.printDetails && typeof p.printDetails === "object" ? p.printDetails : {};
    const labels = [
      ["material", "Material"], ["printer", "Printer"],
      ["layerHeight", "Layer height"], ["infill", "Infill"],
      ["supports", "Supports"], ["printTime", "Print time"]
    ];
    const specs = labels.filter(([key]) => String(details[key] || "").trim());
    const resources = [
      linkMarkup(p.links?.cad, "CAD model"),
      linkMarkup(p.links?.downloads, "Download / print files"),
      linkMarkup(p.links?.github, "Source / design files"),
      linkMarkup(p.links?.video, "Demonstration video")
    ].filter(Boolean);
    const section = p.sections || {};
    // Older unfinished entries have instructional template text in `overview`.
    // Prefer the real project summary/date until the overview has been personalised.
    const overview = String(section.overview || "").trim();
    const unfinishedOverview = /^(Identify the component or family of parts|Explain the purpose of the second printed component)/i.test(overview);
    const aboutDescription = (!unfinishedOverview && overview) ? overview : (p.summary || p.date || "");
    const note = (label, value) => String(value || "").trim()
      ? `<div class="print-note"><h4>${text(label)}</h4>${paragraphs(value)}</div>` : "";
    const optionalNotes = [
      ["Printing & assembly", [note("Manufacture / assembly", section.construction), note("CAD & software", section.software)]],
      ["Testing & improvements", [note("Testing", section.testing), note("Revisions", section.iterations), note("Results", section.results), note("Lessons learned", section.lessons)]]
    ].filter(([,notes])=>notes.some(Boolean));
    const cards = photos.map((photo,index)=>`<button type="button" class="print-photo-tile" data-print-photo="${index}" aria-label="Open print photo ${index+1} of ${photos.length}">
      <img src="${photo.src}" alt="${text(photo.alt)}" loading="${index===0?'eager':'lazy'}" />
      <span class="print-photo-zoom" aria-hidden="true">↗</span>
    </button>`).join("");
    document.title = `${p.title} · 3D Printing · ${data.owner.name}`;
    root.innerHTML = `<div class="container print-detail-page">
      <div class="breadcrumb"><a href="projects.html?category=fabrication">3D Printing &amp; Fabrication</a><span aria-hidden="true">/</span><span>${text(p.title)}</span></div>
      <div class="project-intro print-intro"><p class="eyebrow">3D PRINT${p.date ? " · "+text(p.date) : ""}</p><h1>${text(p.title)}</h1>
        ${p.summary ? `<p class="project-lede">${text(p.summary)}</p>` : ""}
        <div class="tags tags-large">${(p.tags || []).map(tag=>`<span class="tag">${text(tag)}</span>`).join("")}</div>
      </div>
      <figure class="print-cad-figure" id="cad-design"><div class="print-media-label">CAD MODEL</div><img src="${img(p.image)}" alt="${text(p.imageAlt || `${p.title} CAD model`)}" /></figure>
      <section class="print-gallery-panel" id="finished-photos" aria-labelledby="print-gallery-title">
        <div class="print-gallery-heading"><div><p class="eyebrow">FROM DIGITAL TO PHYSICAL</p><h2 id="print-gallery-title">The finished print</h2><p>Photographs of the actual manufactured part.</p></div>
          ${photos.length ? `<span class="print-photo-count">${photos.length} photo${photos.length===1?'':'s'}</span>` : ""}
        </div>
        ${photos.length ? `<div class="print-photo-grid" data-count="${photos.length}">${cards}</div>` :
          `<div class="print-photo-empty"><span class="print-photo-placeholder" aria-hidden="true">▧</span><div><strong>Finished-print photos</strong><p>Add 1–4 actual print photographs in <code>site-data.js</code> to display them here.</p></div></div>`}
      </section>
      <div class="print-content-layout">
        <div class="print-main-info">
          <section class="print-about" id="description"><span class="eyebrow">DESIGN NOTES</span><h2>About this print</h2>
            ${aboutDescription ? paragraphs(aboutDescription) : '<p>Further design details can be added here.</p>'}
          </section>
          ${optionalNotes.length ? `<section class="print-more-details" id="engineering-notes"><h2>Design, printing &amp; testing</h2>
            <p class="print-notes-intro">Expand a section for the engineering decisions and test notes behind this part.</p>
            ${optionalNotes.map(([title,notes])=>`<details class="print-accordion"><summary>${text(title)}<span aria-hidden="true">+</span></summary><div class="print-accordion-body">${notes.join("")}</div></details>`).join("")}
          </section>` : ""}
        </div>
        <aside class="print-side-info" aria-label="Print information">
          <div class="print-spec-card"><p class="eyebrow">3D PRINT INFORMATION</p><h3>Print profile</h3>
            ${specs.length ? `<dl class="print-spec-list">${specs.map(([key,label])=>`<div><dt>${text(label)}</dt><dd>${text(details[key])}</dd></div>`).join("")}</dl>` : `<p class="print-settings-empty">Printer, material and settings can be added in <code>site-data.js</code>.</p>`}
          </div>
          ${resources.length ? `<div class="print-spec-card" id="print-downloads"><p class="eyebrow">FILES</p><h3>Model &amp; resources</h3><div class="resource-links">${resources.join("")}</div></div>` : ""}
        </aside>
      </div>
      <div class="next-action"><div><span class="eyebrow">SEE MORE</span><h2>More 3D prints &amp; fabrication</h2></div><a class="button button-outline" href="projects.html?category=fabrication">Browse 3D prints ↗</a></div>
      <dialog class="print-lightbox" id="print-lightbox" aria-label="Full size print photograph"><button type="button" class="print-lightbox-close" aria-label="Close full-size photograph">×</button>
        <div class="print-lightbox-stage"><button type="button" class="print-lightbox-prev" aria-label="Previous photograph">‹</button><img alt=""/><button type="button" class="print-lightbox-next" aria-label="Next photograph">›</button></div>
        <div class="print-lightbox-footer"><span class="print-lightbox-count"></span><span class="print-lightbox-caption"></span></div>
      </dialog>
    </div>`;
    if (!photos.length) return;
    const modal = $("#print-lightbox", root);
    const viewerImage = $(".print-lightbox-stage img", modal);
    const counter = $(".print-lightbox-count", modal);
    const caption = $(".print-lightbox-caption", modal);
    let current = 0;
    const updatePhoto = (index) => {
      current = (index + photos.length) % photos.length;
      viewerImage.src = photos[current].src;
      viewerImage.alt = photos[current].alt;
      caption.textContent = photos[current].caption;
      counter.textContent = `${current+1} / ${photos.length}`;
      $(".print-lightbox-prev", modal).hidden = photos.length===1;
      $(".print-lightbox-next", modal).hidden = photos.length===1;
    };
    $$("[data-print-photo]",root).forEach(button=>button.addEventListener("click",()=>{
      updatePhoto(Number(button.dataset.printPhoto));
      modal.showModal();
    }));
    $(".print-lightbox-close",modal).addEventListener("click",()=>modal.close());
    $(".print-lightbox-prev",modal).addEventListener("click",()=>updatePhoto(current-1));
    $(".print-lightbox-next",modal).addEventListener("click",()=>updatePhoto(current+1));
    modal.addEventListener("click",(event)=>{if(event.target===modal) modal.close();});
    modal.addEventListener("keydown",(event)=>{
      if(event.key==="ArrowLeft") {event.preventDefault();updatePhoto(current-1);}
      if(event.key==="ArrowRight") {event.preventDefault();updatePhoto(current+1);}
    });
  }

  function projectDetail() {
    const id = new URLSearchParams(location.search).get("id");
    const p = data.projects.find(item => item.id === id);
    const root = $("#project-content");
    if (!p) {
      root.innerHTML = `<div class="not-found"><p class="eyebrow">PROJECT NOT FOUND</p><h1>That project isn't in this portfolio yet.</h1><p>Check the link or return to the project gallery.</p><a class="button button-primary" href="projects.html">Browse projects <span aria-hidden="true">↗</span></a></div>`;
      return;
    }
    if (p.category === "fabrication") {
      printDetail(p);
      return;
    }
    document.title = `${p.title} · ${data.owner.name}`;
    const cat = category(p.category);
    // Optional sections are displayed only when a project provides their content.
    // Individual projects may override labels (for example, Firmware & TeleOp).
    const sectionOptions = [
      ["overview", "Overview"], ["architecture", "System architecture"],
      ["hardware", "Electrical interfaces"], ["io-map", "Representative I/O map"], ["construction", "Construction"],
      ["software", "Software"], ["testing", "Testing"],
      ["iterations", "Iterations"], ["results", "Results"],
      ["lessons", "Lessons learned"]
    ];
    const entries = sectionOptions
      .filter(([key]) => key === "io-map" ? Boolean(p.ioMap?.rows?.length) : Boolean(String(p.sections?.[key] || "").trim()))
      .map(([key, fallback]) => [key, p.sectionLabels?.[key] || fallback]);
    const usedDemos = demosForProject(p.id);
    const linkedSoftware = softwareItems.filter(item => (item.robotIds || []).includes(p.id));
    if (linkedSoftware.length) entries.push(["robot-software", "Software & Algorithms"]);
    const linkedProjects = (p.relatedProjectIds || []).map(id => data.projects.find(item => item.id === id)).filter(item => item && item.id !== p.id);
    if (linkedProjects.length) entries.push(["related-projects", "Related projects"]);
    if (p.category === "robotics" && usedDemos.length) entries.push(["algorithm-demonstrations", "Video demonstrations"]);
    const resources = [
      linkMarkup(p.links?.github, "Source code / GitHub"),
      linkMarkup(p.links?.cad, "CAD / 3D model"),
      linkMarkup(p.links?.video, "Demonstration video"),
      linkMarkup(p.links?.downloads, "Technical files")
    ].filter(Boolean);
    root.innerHTML = `
      <div class="container">
        <div class="breadcrumb"><a href="projects.html">Projects</a><span aria-hidden="true">/</span><span>${text(p.title)}</span></div>
        <div class="project-intro">
          <p class="eyebrow">${text(kindLabel(p))} ${p.date ? "· " + text(p.date) : ""}</p>
          <h1>${text(p.title)}</h1>
          <p class="project-lede">${text(p.summary)}</p>
          <div class="tags tags-large">${(p.tags || []).map(t => `<span class="tag">${text(t)}</span>`).join("")}</div>
        </div>
        <figure class="project-hero-media"><img src="${img(p.image)}" alt="${text(p.imageAlt || p.title)}" /><figcaption>${text(p.imageCaption || p.title)}</figcaption></figure>
        <div class="detail-layout">
          <aside class="detail-aside">
            <p class="eyebrow">ON THIS PAGE</p>
            <nav aria-label="Project sections">${entries.map(([key, label]) => `<a href="#${key}">${label}</a>`).join("")}
              ${resources.length ? '<a href="#resources">Resources</a>' : ""}
            </nav>
          </aside>
          <div class="detail-main">
            ${entries.filter(([key]) => !["algorithm-demonstrations", "robot-software", "related-projects"].includes(key)).map(([key, label]) => key === "io-map"
              ? `<section class="detail-section detail-section--clean" id="io-map"><div><h2>${text(label)}</h2><p>${text(p.ioMap.intro || "")}</p><div class="io-map-scroll"><table class="io-map-table"><thead><tr>${(p.ioMap.columns || []).map(col => `<th scope="col">${text(col)}</th>`).join("")}</tr></thead><tbody>${(p.ioMap.rows || []).map(row => `<tr>${row.map((cell, i) => `<td>${i === 1 ? `<code>${text(cell)}</code>` : text(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${p.ioMap.note ? `<p class="io-map-note">${text(p.ioMap.note)}</p>` : ""}</div></section>`
              : `<section class="detail-section detail-section--clean" id="${key}"><div><h2>${text(label)}</h2>${paragraphs(p.sections?.[key])}</div></section>`).join("")}
            ${linkedSoftware.length ? `<section class="detail-section detail-section--clean" id="robot-software"><div><h2>Software &amp; Algorithms</h2><p>Software systems documented for this robot. Each entry links to the relevant algorithms without requiring a video.</p><div class="related-list">${linkedSoftware.map(item => `<a class="related-item" href="${softwareUrl(item)}"><strong>${text(item.title)}</strong><span>${text(item.summary)} ↗</span></a>`).join("")}</div></div></section>` : ""}
            ${usedDemos.length ? `<section class="detail-section detail-section--clean" id="algorithm-demonstrations"><div><h2>Video demonstrations</h2><div class="demo-grid">${usedDemos.map(item => demoMarkup(item,true)).join("")}</div></div></section>` : ""}
            ${linkedProjects.length ? `<section class="detail-section detail-section--clean" id="related-projects"><div><h2>Related ${linkedProjects.length === 1 ? "project" : "projects"}</h2><div class="related-list">${linkedProjects.map(item => `<a class="related-item" href="${projectUrl(item)}"><strong>${text(item.title)}</strong><span>${text(item.summary)} ↗</span></a>`).join("")}</div></div></section>` : ""}
            ${resources.length ? `<section class="detail-section detail-section--clean" id="resources"><div><h2>Technical resources</h2><div class="resource-links">${resources.join("")}</div></div></section>` : ""}
          </div>
        </div>
        <div class="next-action"><div><span class="eyebrow">EXPLORE MORE</span><h2>More engineering projects</h2></div><a class="button button-outline" href="projects.html">All projects <span aria-hidden="true">↗</span></a></div>
      </div>`;
  }

  function about() {
    setText("#about-name", data.owner.name);
    setText("#about-headline", data.owner.headline);
    const paragraphsEl = $("#about-paragraphs");
    if (paragraphsEl) paragraphsEl.innerHTML = (data.owner.aboutParagraphs || []).map(s => `<p>${text(s)}</p>`).join("");
    const links = $("#about-links");
    if (links) {
      const list = [linkMarkup(data.owner.githubUrl, "GitHub profile"),linkMarkup(data.owner.youtubeUrl,"Project videos"),linkMarkup(data.owner.linkedinUrl,"LinkedIn")].filter(Boolean);
      const mail = data.owner.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.owner.email) ? `<a class="text-link" href="mailto:${text(data.owner.email)}">Email ↗</a>` : "";
      if (mail) list.push(mail);
      links.innerHTML = list.length ? list.join("") : `<span class="muted-small">External links can be added later in <code>assets/js/site-data.js</code>.</span>`;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    siteShell();
    const page = document.body.dataset.page;
    if (page === "home") home();
    if (page === "projects") projects();
    if (page === "software") software();
    if (page === "software-detail") softwareDetail();
    if (page === "algorithms") algorithmsPage();
    if (page === "algorithm") algorithmDetail();
    if (page === "project") projectDetail();
    if (page === "about") about();
  });
})();
