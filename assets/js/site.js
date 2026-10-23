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
      return chosen === "software" ? "software" : chosen === "algorithms" ? "algorithms" : chosen;
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
        (page === 'about' && el.dataset.nav === 'about') ||
        (page === 'projects' && !current && el.dataset.nav === 'projects');
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
      <a class="software-card__image" href="${softwareUrl(item)}" aria-label="Read ${text(item.title)}"><img src="${img(item.image)}" alt="${text(item.imageAlt || item.title)}" loading="lazy"></a>
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
    const media = item.flowchart ? `<figure class="flowchart-figure" id="flowchart"><a href="${img(item.flowchart)}" target="_blank" rel="noopener" title="Open flowchart at full size"><img src="${img(item.flowchart)}" alt="${text(item.imageAlt || `${item.title} control flowchart`)}" loading="eager"></a><figcaption>Code-derived control flowchart, simplified for presentation. Select it to view the full-size SVG.</figcaption></figure>` :
      `<figure class="project-hero-media"><img src="${img(item.image)}" alt="${text(item.imageAlt || item.title)}" loading="lazy"></figure>`;
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
    setText("#hero-eyebrow", data.owner.eyebrow);
    setText("#hero-headline", data.owner.headline);
    setText("#hero-intro", data.owner.introduction);
    setText("#about-teaser", data.owner.shortAbout);
    const imgEl = $("#home-hero-image");
    if (imgEl) imgEl.src = data.projects[0]?.image || data.categories[0]?.image;
    const catGrid = $("#category-grid");
    if (catGrid) catGrid.innerHTML = data.categories.map((cat, index) => `
      <a href="${cat.id === "software" ? "software.html" : cat.id === "algorithms" ? "algorithms.html" : `projects.html?category=${encodeURIComponent(cat.id)}`}" class="category-tile">
        <div class="category-tile__image"><img src="${img(cat.image)}" alt="${text(cat.title)}" loading="lazy" /></div>
        <div class="category-tile__info"><span class="mini-index">0${index + 1} / EXPLORE</span><h3>${text(cat.title)}</h3><p>${text(cat.subtitle)}</p><span class="tile-arrow" aria-hidden="true">↗</span></div>
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
    const title = $('#listing-title');
    const intro = $('#listing-intro');
    const eyebrow = $('#listing-eyebrow');
    if (!title || !intro) return;
    const cat = category(chosen);
    if (cat) {
      title.textContent = cat.title;
      intro.textContent = cat.subtitle;
      if (eyebrow) eyebrow.textContent = chosen === 'fabrication' ? '3D PRINTS & FABRICATION' : 'ENGINEERING DISCIPLINES';
      document.title = `${cat.title} · ${data.owner.name}`;
    } else {
      title.textContent = 'Projects, designs & prints.';
      intro.textContent = 'Browse robots, designs, printed parts, electronics and software development in one place.';
      if (eyebrow) eyebrow.textContent = 'THE PORTFOLIO ARCHIVE';
      document.title = `Portfolio archive · ${data.owner.name}`;
    }
  }

  function projects() {
    const container = $("#project-list");
    const filterBar = $("#project-filters");
    const input = $("#project-search");
    const count = $("#project-count");
    let chosen = new URLSearchParams(location.search).get("category") || "all";
    if (chosen === "software") { location.replace("software.html"); return; }
    if (chosen === "algorithms") { location.replace("algorithms.html"); return; }
    if (chosen !== "all" && !category(chosen)) chosen = "all";
    filterBar.innerHTML = [
      {id: "all", title: "All projects"},
      ...data.categories.filter(c => !["software", "algorithms"].includes(c.id)).map(c => ({id: c.id, title: c.title}))
    ].map(c => `<button class="filter-button" data-filter="${text(c.id)}" aria-pressed="${c.id === chosen}">${text(c.title)}</button>`).join("");
    function refresh() {
      const term = (input.value || "").toLocaleLowerCase().trim();
      const results = data.projects.filter(p => !["software"].includes(p.category)).filter(p => {
        const searchable = [p.title, p.summary, ...(p.tags || [])].join(" ").toLocaleLowerCase();
        return (chosen === "all" || p.category === chosen) && searchable.includes(term);
      });
      container.innerHTML = results.length ? results.map(projectCard).join("") : `<div class="empty-state"><h3>No matching projects</h3><p>Try clearing the search or choosing another category.</p></div>`;
      count.textContent = `${results.length} project${results.length === 1 ? "" : "s"}`;
      $$("[data-filter]", filterBar).forEach(button => button.setAttribute("aria-pressed", String(button.dataset.filter === chosen)));
    }
    filterBar.addEventListener("click", (e) => {
      const button = e.target.closest("[data-filter]");
      if (!button) return;
      chosen = button.dataset.filter;
      const url = new URL(location.href);
      if (chosen === "all") url.searchParams.delete("category");
      else url.searchParams.set("category", chosen);
      history.replaceState({}, "", url);
      refresh();
      updateNavState();
      updateListingIntro(chosen);
    });
    input.addEventListener("input", refresh);
    updateListingIntro(chosen);
    refresh();
  }

  function projectDetail() {
    const id = new URLSearchParams(location.search).get("id");
    const p = data.projects.find(item => item.id === id);
    const root = $("#project-content");
    if (!p) {
      root.innerHTML = `<div class="not-found"><p class="eyebrow">PROJECT NOT FOUND</p><h1>That project isn't in this portfolio yet.</h1><p>Check the link or return to the project gallery.</p><a class="button button-primary" href="projects.html">Browse projects <span aria-hidden="true">↗</span></a></div>`;
      return;
    }
    document.title = `${p.title} · ${data.owner.name}`;
    const cat = category(p.category);
    const entries = [
      ["overview", "Overview"], ["objectives", "Objectives"], ["design", "Design"],
      ["construction", "Construction"], ["software", "Software"], ["testing", "Testing"],
      ["iterations", "Iterations"], ["results", "Results"], ["lessons", "Lessons learned"]
    ];
    const usedDemos = demosForProject(p.id);
    const linkedSoftware = softwareItems.filter(item => (item.robotIds || []).includes(p.id));
    if (linkedSoftware.length) entries.push(["robot-software", "Software behaviours"]);
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
        <figure class="project-hero-media"><img src="${img(p.image)}" alt="${text(p.imageAlt || p.title)}" /><figcaption>${text(p.title)}</figcaption></figure>
        <div class="detail-layout">
          <aside class="detail-aside">
            <p class="eyebrow">ON THIS PAGE</p>
            <nav aria-label="Project sections">${entries.map(([key, label]) => `<a href="#${key}">${label}</a>`).join("")}
              ${resources.length ? '<a href="#resources">Resources</a>' : ""}
            </nav>
            <div class="detail-callout"><strong>Individual contribution</strong><p>${text(p.contribution)}</p></div>
          </aside>
          <div class="detail-main">
            ${entries.filter(([key]) => !["algorithm-demonstrations", "robot-software"].includes(key)).map(([key, label], i) => `<section class="detail-section" id="${key}"><div class="detail-section__index">${String(i + 1).padStart(2, "0")}</div><div><h2>${label}</h2>${paragraphs(p.sections?.[key])}</div></section>`).join("")}
            ${linkedSoftware.length ? `<section class="detail-section" id="robot-software"><div class="detail-section__index">10</div><div><h2>Software behaviours</h2><p>Software systems documented for this robot. Each entry links to the relevant algorithms without requiring a video.</p><div class="related-list">${linkedSoftware.map(item => `<a class="related-item" href="${softwareUrl(item)}"><strong>${text(item.title)}</strong><span>${text(item.summary)} ↗</span></a>`).join("")}</div></div></section>` : ""}
            ${usedDemos.length ? `<section class="detail-section" id="algorithm-demonstrations"><div class="detail-section__index">11</div><div><h2>Video demonstrations</h2><div class="demo-grid">${usedDemos.map(item => demoMarkup(item,true)).join("")}</div></div></section>` : ""}
            ${resources.length ? `<section class="detail-section" id="resources"><div class="detail-section__index">${linkedSoftware.length && usedDemos.length ? "12" : linkedSoftware.length || usedDemos.length ? "11" : "10"}</div><div><h2>Technical resources</h2><div class="resource-links">${resources.join("")}</div></div></section>` : ""}
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
