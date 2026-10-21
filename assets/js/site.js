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
  const img = (path) => escape(path || "assets/images/robotics.webp");
  const text = (s) => escape(s || "");
  const category = (id) => data.categories.find(c => c.id === id);
  const paragraphs = (s) => String(s || "").split(/\n\s*\n/).filter(Boolean)
    .map(p => `<p>${text(p)}</p>`).join("");
  const projectUrl = (project) => `project.html?id=${encodeURIComponent(project.id)}`;

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
    const page = document.body.getAttribute("data-page");
    $$(`[data-nav="${page}"]`).forEach(el => el.setAttribute("aria-current", "page"));
  }

  function projectCard(p) {
    const cat = category(p.category);
    return `<article class="project-card">
      <a href="${projectUrl(p)}" class="project-card__image" aria-label="View project: ${text(p.title)}">
        <img src="${img(p.image)}" alt="${text(p.imageAlt || p.title)}" loading="lazy" />
      </a>
      <div class="project-card__body">
        <div class="eyebrow-row"><span class="eyebrow">${text(cat ? cat.title : "Engineering project")}</span>${data.settings.showTemplateNotice ? '<span class="sample-mark">EXAMPLE</span>' : ""}</div>
        <h3><a href="${projectUrl(p)}">${text(p.title)}</a></h3>
        <p>${text(p.summary)}</p>
        <div class="project-card__foot">
          <div class="tags">${(p.tags || []).slice(0, 3).map(t => `<span class="tag">${text(t)}</span>`).join("")}</div>
          <a href="${projectUrl(p)}" class="round-arrow" aria-label="Open ${text(p.title)}"><span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>`;
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
      <a href="projects.html?category=${encodeURIComponent(cat.id)}" class="category-tile">
        <div class="category-tile__image"><img src="${img(cat.image)}" alt="${text(cat.title)} example image" loading="lazy" /></div>
        <div class="category-tile__info"><span class="mini-index">0${index + 1} / EXPLORE</span><h3>${text(cat.title)}</h3><p>${text(cat.subtitle)}</p><span class="tile-arrow" aria-hidden="true">↗</span></div>
      </a>`).join("");
    const featured = $("#featured-projects");
    if (featured) {
      // Show up to two projects per discipline on the homepage, in category order.
      const picks = data.categories.flatMap(cat =>
        data.projects.filter(project => project.category === cat.id).slice(0, 2)
      );
      featured.innerHTML = picks.map(projectCard).join("");
    }
  }

  function projects() {
    const container = $("#project-list");
    const filterBar = $("#project-filters");
    const input = $("#project-search");
    const count = $("#project-count");
    let chosen = new URLSearchParams(location.search).get("category") || "all";
    if (chosen !== "all" && !category(chosen)) chosen = "all";
    filterBar.innerHTML = [
      {id: "all", title: "All projects"},
      ...data.categories.map(c => ({id: c.id, title: c.title}))
    ].map(c => `<button class="filter-button" data-filter="${text(c.id)}" aria-pressed="${c.id === chosen}">${text(c.title)}</button>`).join("");
    function refresh() {
      const term = (input.value || "").toLocaleLowerCase().trim();
      const results = data.projects.filter(p => {
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
    });
    input.addEventListener("input", refresh);
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
          <p class="eyebrow">${text(cat ? cat.title : "Engineering project")} ${p.date ? "· " + text(p.date) : ""}</p>
          <h1>${text(p.title)}</h1>
          <p class="project-lede">${text(p.summary)}</p>
          <div class="tags tags-large">${(p.tags || []).map(t => `<span class="tag">${text(t)}</span>`).join("")}</div>
        </div>
        <figure class="project-hero-media"><img src="${img(p.image)}" alt="${text(p.imageAlt || p.title)}" /><figcaption>${data.settings.showTemplateNotice ? "Illustrative placeholder — replace with your own project image." : text(p.title)}</figcaption></figure>
        <div class="detail-layout">
          <aside class="detail-aside">
            <p class="eyebrow">ON THIS PAGE</p>
            <nav aria-label="Project sections">${entries.map(([key, label]) => `<a href="#${key}">${label}</a>`).join("")}
              ${resources.length ? '<a href="#resources">Resources</a>' : ""}
            </nav>
            <div class="detail-callout"><strong>Individual contribution</strong><p>${text(p.contribution)}</p></div>
          </aside>
          <div class="detail-main">
            ${entries.map(([key, label], i) => `<section class="detail-section" id="${key}"><div class="detail-section__index">${String(i + 1).padStart(2, "0")}</div><div><h2>${label}</h2>${paragraphs(p.sections?.[key])}</div></section>`).join("")}
            ${resources.length ? `<section class="detail-section" id="resources"><div class="detail-section__index">10</div><div><h2>Technical resources</h2><div class="resource-links">${resources.join("")}</div></div></section>` : ""}
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
    if (page === "project") projectDetail();
    if (page === "about") about();
  });
})();
