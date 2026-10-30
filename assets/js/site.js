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
  const kindLabel = (p) => category(p.category)?.title || "";
  const nonempty = (value) => typeof value === "string" && value.trim().length > 0;
  // Optional card fields do not produce markup or spacing when left blank.
  const optionalCardText = (value, cls, tag = "div") => nonempty(value) ?
    `<${tag} class="${cls}">${text(value.trim())}</${tag}>` : "";
  const optionalDetailText = (value, cls, tag = "p") => nonempty(value) ?
    `<${tag} class="${cls}">${text(value.trim())}</${tag}>` : "";
  const detailSubStatus = (item, key = "status") =>
    optionalDetailText(item.subtitle, "project-intro__subtitle") +
    optionalDetailText(item[key], "project-intro__status");
  // Unlisted development mode can be started on the live site from development.html.
  // A preview=drafts query parameter carries it across pages and direct project links.
  // This hides drafts from ordinary visitors; it is not access control or privacy.
  const previewDrafts = document.body.dataset.page === "development" ||
    new URLSearchParams(location.search).get("preview") === "drafts";
  const previewUrl = (url) => {
    if (!previewDrafts) return url;
    const parsed = new URL(url, document.baseURI);
    if (parsed.searchParams.get("preview") === "drafts") return url;
    const hashIndex = url.indexOf("#");
    const prefix = hashIndex < 0 ? url : url.slice(0, hashIndex);
    const fragment = hashIndex < 0 ? "" : url.slice(hashIndex);
    return prefix + (prefix.includes("?") ? "&" : "?") + "preview=drafts" + fragment;
  };
  function previewNavigation() {
    if (!previewDrafts) return;
    // Only internal HTML pages receive the flag. External, media and section
    // anchor links are not rewritten. A public-view link explicitly exits.
    $$('a[href]').forEach(anchor => {
      if (anchor.hasAttribute('data-preview-exit')) return;
      const raw = anchor.getAttribute('href');
      if (!raw || raw[0] === '#' || /^(?:mailto:|tel:|javascript:)/i.test(raw)) return;
      let target;
      try { target = new URL(raw, document.baseURI); } catch (_) { return; }
      if (target.origin !== location.origin || !/\.html$/i.test(target.pathname)) return;
      anchor.setAttribute('href', previewUrl(raw));
    });
  }
  function previewBanner() {
    if (!previewDrafts) return;
    const bar = document.createElement('div');
    bar.className = 'development-preview-bar';
    bar.setAttribute('role', 'status');
    bar.innerHTML = `<div class="container development-preview-bar__inner"><div><strong>Development preview</strong><span>Draft projects are visible</span></div><div class="development-preview-bar__links"><a href="development.html">All development projects</a><a href="index.html" data-preview-exit>Exit to public view ↗</a></div></div>`;
    const header = $('.site-header');
    if (header) header.insertAdjacentElement('afterend', bar);
    // Ask crawlers not to index a preview URL. It is still openly accessible.
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex,nofollow';
    document.head.appendChild(robots);
  }
  const isPublished = item => item && item.published !== false;
  const canShow = item => Boolean(item && (isPublished(item) || previewDrafts));
  const visibleProjects = () => data.projects.filter(canShow);
  const missingProject = '<div class="not-found"><p class="eyebrow">PROJECT NOT AVAILABLE</p><h1>This project is not currently published.</h1><p>Browse the published projects instead.</p><a class="button button-primary" href="projects.html">Browse projects ↗</a></div>';
  const navCategory = () => {
    const page = document.body.dataset.page;
    if (page === "software" || page === "software-detail") return "software";
    if (page === "algorithms" || page === "algorithm") return "algorithms";
    if (page === "project") {
      const id = new URLSearchParams(location.search).get("id");
      return visibleProjects().find(p => p.id === id)?.category || "";
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
      const featured = page === 'home' && location.hash === '#featured';
      const selected = (page === 'home' && el.dataset.nav === 'home' && !featured) ||
        (featured && el.dataset.nav === 'selected') ||
        (page === 'about' && el.dataset.nav === 'about');
      if (selected) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
  }
  const paragraphs = (s) => String(s || "").split(/\n\s*\n/).filter(Boolean)
    .map(p => `<p>${text(p)}</p>`).join("");
  const projectUrl = (project) => previewUrl(`project.html?id=${encodeURIComponent(project.id)}`);
  const algorithmUrl = (algorithm) => previewUrl(`algorithm.html?id=${encodeURIComponent(algorithm.id)}`);
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
    window.addEventListener("hashchange", updateNavState);
  }

  function projectCard(p) {
    return `<article class="project-card">
      <a href="${projectUrl(p)}" class="project-card__image" aria-label="View project: ${text(p.title)}">
        <img src="${img(p.image)}" alt="${text(p.imageAlt || p.title)}" loading="lazy" />
      </a>
      <div class="project-card__body">
        <div class="eyebrow-row">${optionalCardText(kindLabel(p), "eyebrow", "span")}${previewDrafts && !isPublished(p) ? '<span class="preview-draft-tag">DRAFT</span>' : ''}</div>
        ${nonempty(p.title) ? `<h3 class="project-card__title"><a href="${projectUrl(p)}">${text(p.title)}</a></h3>` : ""}
        ${optionalCardText(p.subtitle, "project-card__subtitle")}
        ${optionalCardText(p.status, "project-card__status")}
        ${optionalCardText(p.summary, "project-card__summary", "p")}
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
        ${nonempty(a.title) ? `<h3><a href="${algorithmUrl(a)}">${text(a.title)}</a></h3>` : ""}
        ${optionalCardText(a.subtitle, "project-card__subtitle")}
        ${optionalCardText(a.status, "project-card__status")}
        ${optionalCardText(a.summary, "algorithm-card__summary", "p")}
        <div class="algorithm-card__bottom"><span>${count ? `${count} linked software entr${count === 1 ? "y" : "ies"}` : "Reference / exploration"}</span><a href="${algorithmUrl(a)}" class="round-arrow" aria-label="View ${text(a.shortName)}"><span aria-hidden="true">↗</span></a></div>
      </div>
    </article>`;
  }

  function demoMarkup(item, showAlgorithmTitle = false) {
    const d = item.demo, a = item.algorithm;
    const robot = visibleProjects().find(p => p.id === d.robotId);
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

  const softwareItems = (Array.isArray(data.software) ? data.software : []).filter(canShow);
  const softwareById = (id) => softwareItems.find(s => s.id === id);
  const softwareUrl = (s) => previewUrl(`software-detail.html?id=${encodeURIComponent(s.id)}`);
  const softwareForAlgorithm = (id) => softwareItems.filter(s => (s.algorithmIds || []).includes(id));
  const relatedAlgorithms = (ids) => (ids || []).map(algorithm).filter(Boolean);
  const chipLinks = (entries, makeUrl) => entries.map(item =>
    `<a class="method-chip" href="${makeUrl(item)}">${text(item.shortName || item.title)} <span aria-hidden="true">↗</span></a>`
  ).join("");
  const detailSection = (id, title, value) => value ? `<section class="detail-section" id="${id}"><div class="detail-section__index" aria-hidden="true">•</div><div><h2>${title}</h2>${paragraphs(value)}</div></section>` : "";

  function softwareCard(item) {
    // Use an existing documented flowchart as the card image when available.
    // Other software cards retain their original text-only layout.
    const flowchart = String(item.flowchart || "").trim();
    const cover = flowchart ? `<a href="${softwareUrl(item)}" class="project-card__image" aria-label="View ${text(item.title)}">
      <img src="${img(flowchart)}" alt="${text(item.imageAlt || `${item.title} flowchart`)}" loading="lazy" />
    </a>` : "";
    return `<article class="software-card">
      ${cover}
      <div class="software-card__body"><div class="eyebrow-row"><span class="eyebrow">SOFTWARE${nonempty(item.type) ? " · " + text(item.type) : ""}</span></div>
      ${nonempty(item.title) ? `<h3><a href="${softwareUrl(item)}">${text(item.title)}</a></h3>` : ""}
      ${optionalCardText(item.subtitle, "project-card__subtitle")}
      ${optionalCardText(item.cardStatus, "project-card__status")}
      ${optionalCardText(item.summary, "software-card__summary", "p")}
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
    const id=new URLSearchParams(location.search).get('id');
    const item=softwareById(id), root=$('#software-content');
    if(!item){root.innerHTML=`<div class="container not-found"><p class="eyebrow">SOFTWARE NOT FOUND</p><h1>No software entry has that ID.</h1><a class="button button-primary" href="software.html">Browse Software ↗</a></div>`;return;}
    document.title=`${item.title} · ${data.owner.name}`;
    const rows=sectionLayouts(item,softwareExtras(item));
    const media=item.flowchart ? `<figure class="flowchart-figure" id="flowchart"><a href="${img(item.flowchart)}" target="_blank" rel="noopener" title="Open flowchart at full size"><img src="${img(item.flowchart)}" alt="${text(item.imageAlt||`${item.title} control flowchart`)}" loading="eager"></a><figcaption>Code-derived control flowchart, simplified for presentation. Select it to view the full-size SVG.</figcaption></figure>`:'';
    root.innerHTML=`<div class="container"><div class="breadcrumb"><a href="software.html">Software</a><span aria-hidden="true">/</span><span>${text(item.title)}</span></div>
      <div class="project-intro"><p class="eyebrow">SOFTWARE${nonempty(item.type) ? ' · '+text(item.type) : ''}${nonempty(item.status) ? ' · '+text(item.status) : ''}</p><h1>${text(item.title)}</h1>${detailSubStatus(item,"cardStatus")}${optionalDetailText(item.summary,"project-lede")}<div class="tags tags-large">${(item.tags||[]).map(tag=>`<span class="tag">${text(tag)}</span>`).join('')}</div></div>
      ${media}<div class="detail-layout">${sectionSidebar(rows,'Software sections',`<div class="detail-callout"><strong>Evidence status</strong><p>${text(item.status)} — implementation and test results should be distinguished.</p></div>`)}<div class="detail-main">${sectionMarkup(rows)}</div></div>
      <div class="next-action"><div><span class="eyebrow">EXPLORE MORE</span><h2>More software systems</h2></div><a class="button button-outline" href="software.html">Software archive ↗</a></div></div>`;
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
    const videos = (a.demos || []).filter(d => d.video && visibleProjects().some(p => p.id === d.robotId)).map(d => ({algorithm:a,demo:d}));
    const source = linkMarkup(a.sourceUrl,"Reference / source link");
    root.innerHTML = `<div class="container"><div class="breadcrumb"><a href="algorithms.html">Algorithms</a><span aria-hidden="true">/</span><span>${text(a.shortName)}</span></div>
      <div class="project-intro"><p class="eyebrow">${text(a.group)} · ALGORITHM</p><h1>${text(a.title)}</h1>${detailSubStatus(a)}${optionalDetailText(a.summary,"project-lede")}</div>
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
    if (imgEl) imgEl.src = visibleProjects()[0]?.image || data.categories[0]?.image;
    const catGrid = $("#category-grid");
    if (catGrid) catGrid.innerHTML = data.categories.map((cat) => `
      <a href="${cat.id === "software" ? "software.html" : cat.id === "algorithms" ? "algorithms.html" : `projects.html?category=${encodeURIComponent(cat.id)}`}" class="category-tile">
        <div class="category-tile__image"><img src="${img(cat.image)}" alt="${text(cat.title)}" loading="lazy" /></div>
        <div class="category-tile__info"><h3>${text(cat.title)}</h3><p>${text(cat.subtitle)}</p><span class="tile-arrow" aria-hidden="true">↗</span></div>
      </a>`).join("");
    const featured = $("#featured-projects");
    if (featured) {
      // Only explicitly numbered entries appear here. Normal project listings
      // are independent of this order; software entries can also be featured.
      const isFeatured = item => Number.isInteger(item.featuredOrder) && item.featuredOrder > 0;
      const selected = [
        ...visibleProjects().filter(isFeatured).map(item => ({ item, kind: "project" })),
        ...softwareItems.filter(isFeatured).map(item => ({ item, kind: "software" }))
      ].sort((a, b) => a.item.featuredOrder - b.item.featuredOrder ||
        a.item.title.localeCompare(b.item.title));
      featured.innerHTML = selected.map(({ item, kind }) =>
        kind === "software" ? softwareCard(item) : projectCard(item)
      ).join("");
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
    if (chosen === "software") { location.replace(previewUrl("software.html")); return; }
    if (chosen === "algorithms") { location.replace(previewUrl("algorithms.html")); return; }
    if (chosen !== "all" && !category(chosen)) chosen = "all";
    function refresh() {
      const term = (input.value || "").toLocaleLowerCase().trim();
      const results = visibleProjects().filter(p => !["software"].includes(p.category)).filter(p => {
        const searchable = [p.title, p.subtitle, p.status, p.summary, ...(p.tags || [])].join(" ").toLocaleLowerCase();
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
    const printResources=[
      linkMarkup(p.links?.cad,'CAD model'), linkMarkup(p.links?.downloads,'Download / print files'),
      linkMarkup(p.links?.github,'Source / design files'),linkMarkup(p.links?.video,'Demonstration video')
    ].filter(Boolean);
    const printExtras=projectExtras(p);
    // Preserve the previous 3D-print behaviour: generic instructional draft
    // overviews are kept in source data, but a visitor sees the actual summary.
    const rawOverview=String(p.sections?.overview||'').trim();
    const useSummaryInstead=/^(Identify the component or family of parts|Explain the purpose of the second printed component)/i.test(rawOverview);
    const printEntry=useSummaryInstead ? {...p,sections:{...p.sections,overview:p.summary||p.date||''}} : p;
    const rows=sectionLayouts(printEntry,printExtras);
    const printSidebar=`<div class="print-spec-card"><p class="eyebrow">3D PRINT INFORMATION</p><h3>Print profile</h3>
      ${specs.length ? `<dl class="print-spec-list">${specs.map(([key,label])=>`<div><dt>${text(label)}</dt><dd>${text(details[key])}</dd></div>`).join('')}</dl>` : `<p class="print-settings-empty">Printer, material and settings can be added in <code>site-data.js</code>.</p>`}</div>`;
    root.innerHTML=`<div class="container print-detail-page">
      <div class="breadcrumb"><a href="projects.html?category=fabrication">3D Printing &amp; Fabrication</a><span aria-hidden="true">/</span><span>${text(p.title)}</span></div>
      <div class="project-intro print-intro"><p class="eyebrow">${text(kindLabel(p))}${p.date ? ' · '+text(p.date):''}</p><h1>${text(p.title)}</h1>
      ${detailSubStatus(p)}${optionalDetailText(p.summary,"project-lede")}
      <div class="tags tags-large">${(p.tags||[]).map(tag=>`<span class="tag">${text(tag)}</span>`).join('')}</div></div>
      <figure class="print-cad-figure"><div class="print-media-label">CAD MODEL</div><img src="${img(p.image)}" alt="${text(p.imageAlt||`${p.title} CAD model`)}"/></figure>
      <section class="print-gallery-panel" aria-labelledby="print-gallery-title"><div class="print-gallery-heading"><div><p class="eyebrow">FROM DIGITAL TO PHYSICAL</p><h2 id="print-gallery-title">The finished print</h2><p>Photographs of the actual manufactured part.</p></div>
        ${photos.length ? `<span class="print-photo-count">${photos.length} photo${photos.length===1?'':'s'}</span>`:''}</div>
        ${photos.length ? `<div class="print-photo-grid" data-count="${photos.length}">${cards}</div>` : `<div class="print-photo-empty"><span class="print-photo-placeholder" aria-hidden="true">▧</span><div><strong>Finished-print photos</strong><p>Add 1–4 actual print photographs in <code>site-data.js</code> to display them here.</p></div></div>`}
      </section>
      <div class="detail-layout">${sectionSidebar(rows,'Project sections',printSidebar)}<div class="detail-main">${sectionMarkup(rows)}</div></div>
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

  // Optional design-investigation evidence is data-driven and appears only on
  // projects that provide the investigation object; the other project pages
  // keep their existing layout.
  function investigationSection(p, key, label) {
    const inv = p.investigation || {};
    const head = `<section class="detail-section detail-section--clean" id="${key}"><div><h2>${text(label)}</h2>`;
    if (key === "investigation-criteria") {
      return head + `<p>These are planned criteria and verification methods. Targets without numbers must be defined before comparative trials.</p><div class="investigation-table-wrap"><table class="investigation-table"><thead><tr><th scope="col">Requirement</th><th scope="col">Verification method</th><th scope="col">Target / evidence</th></tr></thead><tbody>${(inv.criteria || []).map(row => `<tr>${row.map(cell => `<td>${text(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div></section>`;
    }
    if (key === "concept-study") {
      const rows = (items,descriptionKey,title) => `<h3>${title}</h3><div class="investigation-concepts">${items.map(item => `<article class="investigation-concept"><div class="investigation-concept-head"><h4>${text(item.name)}</h4>${item.status ? `<span>${text(item.status)}</span>` : ""}</div><p>${text(item[descriptionKey] || "")}</p>${item.tradeoff ? `<p><strong>To evaluate:</strong> ${text(item.tradeoff)}</p>` : ""}${item.risk ? `<p><strong>Potential limitation:</strong> ${text(item.risk)}</p>` : ""}</article>`).join("")}</div>`;
      const gallery = (inv.media || []).filter(m => localMedia(m.src)).slice(0,4).map(m => `<figure class="investigation-media"><a href="${localMedia(m.src)}" target="_blank" rel="noopener noreferrer"><img src="${localMedia(m.src)}" alt="${text(m.caption || "Gripper design study")}" loading="lazy" /></a><figcaption>${text(m.caption || "")}</figcaption></figure>`).join("");
      return head + `<p>The jaw-motion mechanism and the contact/load sensing mechanism are separate design choices. Each combination must be evaluated rather than assuming one option solves both problems.</p>${rows(inv.jawOptions || [],"strength","Jaw movement")}${rows(inv.detectionOptions || [],"principle","Grasp-detection approaches")}${gallery ? `<h3>Design sketches and prototypes</h3><div class="investigation-media-grid">${gallery}</div>` : ""}</div></section>`;
    }
    if (key === "trial-plan") {
      return head + `<p>The experiment must separate contact, secure grasp and retention rather than reporting a single success/failure value.</p><div class="investigation-table-wrap"><table class="investigation-table"><thead><tr>${(inv.trialColumns || []).map(h=>`<th scope="col">${text(h)}</th>`).join("")}</tr></thead><tbody>${(inv.trialRows || []).map(row=>`<tr>${row.map(cell=>`<td>${text(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div></section>`;
    }
    return "";
  }


  // Research tables on the independent contact-surface investigation.
  // Keeps the full evidence record in site-data.js; nothing is shown for other projects.
  function surfaceStudySection(p, key, label) {
    const study = p.surfaceStudy || {};
    const head = `<section class="detail-section detail-section--clean" id="${key}"><div><h2>${text(label)}</h2>`;
    const table = (headers, rows, className = "") => `<div class="investigation-table-wrap surface-table-wrap"><table class="investigation-table surface-table ${className}"><thead><tr>${headers.map(h => `<th scope="col">${text(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${text(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    if (key === "surface-benchmarks") {
      return head + `<p>The current rubber-band gripper is the benchmark. Greater retention is the leading objective; cardboard damage and reliable manufacture remain necessary checks. Robot operation is an optional follow-up, not a mandatory pass condition.</p>` + table(["Criterion", "Benchmark", "Proposed pass condition"], study.benchmarks || [], "surface-benchmark-table") + `</div></section>`;
    }
    if (key === "surface-materials") {
      const rows = (study.materials || []).map(m => [String(m.rank), m.name, m.decision, m.printing, m.relevance, m.reason]);
      return head + `<p>The first three are the planned comparison group. Substitutes are available contingencies, and excluded candidates are deliberately outside the initial scope. Shore hardness alone does not establish friction against cardboard.</p>` + table(["Rank", "Material", "Decision", "P1S printing", "Research relevance", "Why included / excluded"], rows, "surface-materials-table") + `</div></section>`;
    }
    if (key === "surface-tests") {
      const tests = study.tests || [];
      const card = t => `<article class="surface-test-card"><div class="surface-test-card__head"><div><span class="surface-test-number">${text(String(t.rank))}</span><h3>${text(t.name)}</h3></div><span class="surface-test-priority">${text(t.priority)}</span></div>
        <p>${text(t.measures)}</p><dl class="surface-test-details">
        <div><dt>Equipment</dt><dd>${text(t.equipment)}</dd></div><div><dt>Minimum</dt><dd>${text(t.minimum)}</dd></div>
        <div><dt>Result to record</dt><dd>${text(t.result)}</dd></div><div><dt>Controlled variables</dt><dd>${text(t.controls)}</dd></div>
        <div><dt>Assessment</dt><dd>${text(t.assess)}</dd></div><div><dt>Extension / fallback</dt><dd>${text(t.extension)}</dd></div>
        </dl><p class="surface-test-note"><strong>Method note:</strong> ${text(t.notes)}</p><div class="surface-test-reference">Reference: ${text(t.reference)}</div></article>`;
      return head + `<p>At least five runs per material for the two primary force tests. Inspect cardboard after retention tests; no separate large damage programme is needed. An application-level robot trial is optional.</p><h3>Core and secondary tests</h3><div class="surface-test-list">${tests.filter(t => t.rank <= 4).map(card).join("")}</div><h3>Alternative and follow-on methods</h3><p>These are available if the initial evidence identifies a need. Surface sensing belongs to a different future investigation.</p><div class="surface-test-list">${tests.filter(t => t.rank > 4).map(card).join("")}</div></div></section>`;
    }
    if (key === "surface-failures") {
      return head + `<p>The responses below are hypotheses drawn from relevant research, not guaranteed improvements. Re-test a changed surface against the original flat sample under the same load.</p>` + table(["Potential failure", "Possible cause", "Design response", "Improvement to test", "Literature"],study.failures || [],"surface-failure-table") + `</div></section>`;
    }
    if (key === "surface-sources") {
      return referenceList(study.sources || []);
    }
    return "";
  }


  // One schema for all project and software entries. Every record contains all
  // ten keys; a key is displayed only when it has text or structured content.
  const STANDARD_SECTIONS = [
    ["overview", "Overview"],
    ["objectivesRequirements", "Objectives & Requirements"],
    ["backgroundResearch", "Background & Research"],
    ["designDevelopment", "Design & Development"],
    ["testingValidation", "Testing & Validation"],
    ["resultsEvaluation", "Results & Evaluation"],
    ["conclusionsNextSteps", "Conclusions & Next Steps"],
    ["lessonsLearned", "Lessons Learned"],
    ["referencesResources", "References & Resources"],
    ["relatedProjects", "Related Projects"]
  ];
  const hasText = value => typeof value === "string" && value.trim().length > 0;
  const subheading = (label, body) => body ? `<div class="standard-subsection"><h3>${text(label)}</h3>${body}</div>` : "";
  const sectionShell = (key, label, content) => content ?
    `<section class="detail-section detail-section--clean" id="${key}"><div><h2>${text(label)}</h2>${content}</div></section>` : "";
  const sectionNavigation = (entries, label="Project sections") =>
    `<nav aria-label="${text(label)}">${entries.map(([key,title]) => `<a href="#${key}">${text(title)}</a>`).join("")}</nav>`;
  const sectionLayouts = (entry, extras={}) => STANDARD_SECTIONS.map(([key,label]) => {
    const base = hasText(entry.sections?.[key]) ? paragraphs(entry.sections[key]) : "";
    const details = (entry.sectionDetails?.[key] || []).map(item =>
      subheading(item.heading || "Further details", paragraphs(item.text || ""))).join("");
    const content = base + details + (extras[key] || "");
    return {key,label,content};
  }).filter(row => row.content.trim());
  const sectionMarkup = rows => rows.map(row => sectionShell(row.key,row.label,row.content)).join("");
  const sectionSidebar = (rows,label="Project sections", extra="") =>
    `<aside class="detail-aside"><p class="eyebrow">ON THIS PAGE</p>${sectionNavigation(rows.map(r=>[r.key,r.label]),label)}${extra}</aside>`;

  // The existing detailed investigation tables are reused unmodified, with
  // their individual labels presented as h3 subheadings inside standard sections.
  function nestedEvidence(markup, heading) {
    if (!markup) return "";
    const inner = markup.replace(/^<section\b[^>]*><div><h2>[^<]*<\/h2>/,"<div class=\"standard-subsection\"><h3>"+text(heading)+"</h3>")
      .replace(/<\/div><\/section>$/, "</div>");
    return inner;
  }
  function ioMapMarkup(p) {
    const map = p.ioMap;
    if (!map?.rows?.length) return "";
    return subheading(p.sectionLabels?.['io-map'] || 'I/O interface contract',
      `${map.intro ? paragraphs(map.intro) : ""}<div class="io-map-scroll"><table class="io-map-table"><thead><tr>${(map.columns || []).map(col=>`<th scope="col">${text(col)}</th>`).join("")}</tr></thead><tbody>${map.rows.map(row=>`<tr>${row.map((cell,i)=>`<td>${i===1 ? `<code>${text(cell)}</code>` : text(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${map.note ? `<p class="io-map-note">${text(map.note)}</p>` : ""}`);
  }
  function referenceList(items) {
    const entries = (items || []).map(item => {
      if (!item) return "";
      const name = item.name || item.title || item.label || item.url || '';
      const url = href(item.url);
      return name ? `<li><strong>${url ? `<a href="${text(url)}" target="_blank" rel="noopener noreferrer">${text(name)} ↗</a>` : text(name)}</strong>${item.use || item.description ? `<p>${text(item.use || item.description)}</p>` : ""}</li>` : "";
    }).filter(Boolean);
    return entries.length ? `<ul class="surface-reference-list">${entries.join("")}</ul>` : "";
  }
  function projectExtras(p) {
    const inv=p.investigation||{}, surface=p.surfaceStudy||{};
    const extra={};
    const add=(key,content)=>{ if(content) extra[key]=(extra[key]||"")+content; };
    const structured=(key,label,fn)=>nestedEvidence(fn(p,key,label),label);
    if(inv.criteria?.length) add('objectivesRequirements',structured('investigation-criteria','Engineering criteria',investigationSection));
    if(surface.benchmarks?.length) add('objectivesRequirements',structured('surface-benchmarks','Success criteria against rubber bands',surfaceStudySection));
    if(surface.materials?.length) add('backgroundResearch',structured('surface-materials','Material shortlist and decisions',surfaceStudySection));
    if(inv.jawOptions?.length || inv.detectionOptions?.length) add('designDevelopment',structured('concept-study','Mechanism concepts',investigationSection));
    if(p.ioMap?.rows?.length) add('designDevelopment',ioMapMarkup(p));
    if(surface.failures?.length) add('designDevelopment',structured('surface-failures','Failure analysis and design responses',surfaceStudySection));
    if(inv.trialRows?.length) add('testingValidation',structured('trial-plan','Experimental test plan',investigationSection));
    if(surface.tests?.length) add('testingValidation',structured('surface-tests','Experimental test programme',surfaceStudySection));
    const demos=demosForProject(p.id);
    if(demos.length) add('testingValidation',subheading('Video demonstrations',`<div class="demo-grid">${demos.map(d=>demoMarkup(d,true)).join("")}</div>`));
    if(surface.sources?.length) add('referencesResources',surfaceStudySection(p,'surface-sources',''));
    if(inv.sources?.length) add('referencesResources',subheading('Mechanism research sources',referenceList(inv.sources)));
    if(p.references?.length) add('referencesResources',subheading('Project references & inspiration',referenceList(p.references)));
    const resources=[
      linkMarkup(p.links?.github,'Source code / GitHub'),
      linkMarkup(p.links?.cad,'CAD / 3D model'),
      linkMarkup(p.links?.video,'Demonstration video'),
      linkMarkup(p.links?.downloads,'Technical files')
    ].filter(Boolean);
    if(resources.length) add('referencesResources',`<div class="resource-links">${resources.join("")}</div>`);
    const linked=(p.relatedProjectIds||[]).map(id=>visibleProjects().find(item=>item.id===id)).filter(item=>item&&item.id!==p.id);
    if(linked.length) add('relatedProjects',`<div class="related-list">${linked.map(item=>`<a class="related-item" href="${projectUrl(item)}"><strong>${text(item.title)}</strong><span>${text(item.summary)} ↗</span></a>`).join("")}</div>`);
    const linkedSoftware=softwareItems.filter(item=>(item.robotIds||[]).includes(p.id));
    if(linkedSoftware.length) add('relatedProjects',subheading('Related software and algorithms',`<div class="related-list">${linkedSoftware.map(item=>`<a class="related-item" href="${softwareUrl(item)}"><strong>${text(item.title)}</strong><span>${text(item.summary)} ↗</span></a>`).join("")}</div>`));
    return extra;
  }
  function softwareExtras(item) {
    const extras={};
    const add=(key,content)=>{if(content)extras[key]=(extras[key]||"")+content;};
    const algos=relatedAlgorithms(item.algorithmIds);
    if(algos.length) add('relatedProjects',subheading('Algorithms & methods',`<p>Reference pages for the techniques used by this software. Links do not imply separate physical validation of every method.</p><div class="method-chip-row">${chipLinks(algos,algorithmUrl)}</div>`));
    const robots=(item.robotIds||[]).map(id=>visibleProjects().find(p=>p.id===id)).filter(Boolean);
    if(robots.length) add('relatedProjects',subheading('Robots using this software',`<div class="related-list">${robots.map(p=>`<a class="related-item" href="${projectUrl(p)}"><strong>${text(p.title)}</strong><span>${text(p.summary)} ↗</span></a>`).join("")}</div>`));
    if(item.codeFiles?.length) add('referencesResources',subheading('Code structure',`<p>Relevant source modules (paths are informational until a public repository URL is supplied).</p><ul class="code-file-list">${item.codeFiles.map(f=>`<li><code>${text(f)}</code></li>`).join("")}</ul>`));
    if(item.references?.length) add('referencesResources',subheading('References & inspiration',referenceList(item.references)));
    const source=linkMarkup(item.sourceUrl,'View public source code');
    if(source) add('referencesResources',`<div class="resource-links">${source}</div>`);
    return extras;
  }

  function projectDetail() {
    const id=new URLSearchParams(location.search).get('id');
    const p=visibleProjects().find(item=>item.id===id);
    const root=$('#project-content');
    if(!p){root.innerHTML=missingProject;return;}
    if(p.category==='fabrication'){printDetail(p);return;}
    document.title=`${p.title} · ${data.owner.name}`;
    const rows=sectionLayouts(p,projectExtras(p));
    root.innerHTML=`<div class="container">
      <div class="breadcrumb"><a href="projects.html">Projects</a><span aria-hidden="true">/</span><span>${text(p.title)}</span></div>
      <div class="project-intro"><p class="eyebrow">${text(kindLabel(p))} ${p.date ? '· '+text(p.date):''} ${previewDrafts&&!isPublished(p) ? ' · DRAFT':''}</p>
        <h1>${text(p.title)}</h1>${detailSubStatus(p)}${optionalDetailText(p.summary,"project-lede")}<div class="tags tags-large">${(p.tags||[]).map(t=>`<span class="tag">${text(t)}</span>`).join('')}</div></div>
      <figure class="project-hero-media ${p.imageFullSize ? 'project-hero-media--diagram':''}">${p.imageFullSize ? `<a href="${img(p.image)}" target="_blank" rel="noopener noreferrer" aria-label="Open the diagram at full size"><img src="${img(p.image)}" alt="${text(p.imageAlt||p.title)}"/></a>` : `<img src="${img(p.image)}" alt="${text(p.imageAlt||p.title)}"/>`}<figcaption>${text(p.imageCaption||p.title)}</figcaption></figure>
      ${p.investigation?.question ? `<div class="investigation-question"><strong>Engineering question</strong><p>${text(p.investigation.question)}</p>${p.investigation.status?`<span>${text(p.investigation.status)}</span>`:''}</div>`:''}
      <div class="detail-layout">${sectionSidebar(rows)}<div class="detail-main">${sectionMarkup(rows)}</div></div>
      <div class="next-action"><div><span class="eyebrow">EXPLORE MORE</span><h2>More engineering projects</h2></div><a class="button button-outline" href="projects.html">All projects <span aria-hidden="true">↗</span></a></div>
    </div>`;
  }

  function about() {
    setText("#about-name", data.owner.name);
    setText("#about-headline", data.owner.headline);
    const paragraphsEl = $("#about-paragraphs");
    if (paragraphsEl) paragraphsEl.innerHTML = (data.owner.aboutParagraphs || []).map(s => `<p>${text(s)}</p>`).join("");
    const historyEl = $("#about-history");
    if (historyEl) historyEl.innerHTML = (data.owner.aboutHistoryParagraphs || []).map(s => `<p>${text(s)}</p>`).join("");
    const outsideEl = $("#about-outside-engineering");
    if (outsideEl) outsideEl.innerHTML = (data.owner.outsideEngineeringParagraphs || []).map(s => `<p>${text(s)}</p>`).join("");

    // Optional, compact About galleries. With no photos, nothing is rendered at all.
    // A single viewer is shared by both sections; each section retains its own photo sequence.
    const groups = [
      { target: $("#about-history-gallery"), items: data.owner.aboutHistoryPhotos, name: "How It All Began" },
      { target: $("#about-outside-gallery"), items: data.owner.outsideEngineeringPhotos, name: "Outside Engineering" }
    ];
    const prepared = groups.map(group => ({
      ...group,
      photos: (Array.isArray(group.items) ? group.items : [])
        .filter(item => item && localMedia(item.src))
        .slice(0, 4)
        .map((item, index) => ({
          src: localMedia(item.src),
          caption: String(item.caption || ""),
          alt: String(item.alt || item.caption || `${group.name} photograph ${index + 1}`)
        }))
    }));
    const hasPhotos = prepared.some(group => group.photos.length > 0);
    if (hasPhotos) {
      const modal = document.createElement("dialog");
      modal.className = "about-photo-dialog";
      modal.setAttribute("aria-label", "Full-size About photograph");
      modal.innerHTML = `
        <div class="about-photo-dialog__top"><button class="about-photo-dialog__close" type="button" aria-label="Close photograph">×</button></div>
        <div class="about-photo-dialog__stage">
          <button class="about-photo-dialog__prev" type="button" aria-label="Previous photograph">‹</button>
          <img alt="" />
          <button class="about-photo-dialog__next" type="button" aria-label="Next photograph">›</button>
        </div>
        <div class="about-photo-dialog__footer"><span class="about-photo-dialog__count"></span><span class="about-photo-dialog__caption"></span></div>`;
      document.body.appendChild(modal);
      const viewerImg = $(".about-photo-dialog__stage img", modal);
      const counter = $(".about-photo-dialog__count", modal);
      const caption = $(".about-photo-dialog__caption", modal);
      const prev = $(".about-photo-dialog__prev", modal);
      const next = $(".about-photo-dialog__next", modal);
      let activePhotos = [];
      let current = 0;
      const showPhoto = index => {
        current = (index + activePhotos.length) % activePhotos.length;
        const photo = activePhotos[current];
        viewerImg.src = photo.src;
        viewerImg.alt = photo.alt;
        caption.textContent = photo.caption;
        counter.textContent = `${current + 1} / ${activePhotos.length}`;
        prev.hidden = next.hidden = activePhotos.length < 2;
      };
      const openPhoto = (photos, index) => {
        activePhotos = photos;
        showPhoto(index);
        modal.showModal();
      };
      $(".about-photo-dialog__close", modal).addEventListener("click", () => modal.close());
      prev.addEventListener("click", () => showPhoto(current - 1));
      next.addEventListener("click", () => showPhoto(current + 1));
      modal.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft" && activePhotos.length > 1) { event.preventDefault(); showPhoto(current - 1); }
        if (event.key === "ArrowRight" && activePhotos.length > 1) { event.preventDefault(); showPhoto(current + 1); }
      });
      modal.addEventListener("click", event => { if (event.target === modal) modal.close(); });
      prepared.forEach(group => {
        if (!group.target || !group.photos.length) return;
        group.target.innerHTML = `<div class="about-photo-grid" aria-label="${text(group.name)} photographs">${group.photos.map((photo, index) => `
          <figure class="about-photo-tile">
            <button type="button" class="about-photo-trigger" aria-label="View full-size photograph: ${text(photo.alt)}" data-photo-index="${index}">
              <img src="${photo.src}" alt="${text(photo.alt)}" loading="lazy" decoding="async" />
            </button>
            ${photo.caption ? `<figcaption title="${text(photo.caption)}">${text(photo.caption)}</figcaption>` : ""}
          </figure>`).join("")}</div>`;
        $$(".about-photo-trigger", group.target).forEach((button, index) => {
          button.addEventListener("click", () => openPhoto(group.photos, index));
        });
      });
    }
    // Optional engineering influences: a compact linked list at the bottom of About.
    // The entire section stays hidden if there are no valid entries.
    const influencesSection = $("#about-influences-section");
    const influencesList = $("#about-influences-list");
    if (influencesSection && influencesList) {
      const influences = (Array.isArray(data.owner.influences) ? data.owner.influences : [])
        .filter(item => item && String(item.name || "").trim() && String(item.description || "").trim());
      influencesList.innerHTML = influences.map(item => {
        const url = href(item.url);
        const link = url && /^https?:/i.test(url)
          ? `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${text(item.name)} <span aria-hidden="true">↗</span></a>`
          : text(item.name);
        return `<div class="about-influence-item">
          <div class="about-influence-item__heading"><h3>${link}</h3>${item.focus ? `<p class="about-influence-item__focus">${text(item.focus)}</p>` : ""}</div>
          <p class="about-influence-item__description">${text(item.description)}</p>
        </div>`;
      }).join("");
      influencesSection.hidden = influences.length === 0;
    }
    const links = $("#about-links");
    if (links) {
      const list = [linkMarkup(data.owner.githubUrl, "GitHub profile"),linkMarkup(data.owner.youtubeUrl,"Project videos"),linkMarkup(data.owner.linkedinUrl,"LinkedIn")].filter(Boolean);
      const mail = data.owner.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.owner.email) ? `<a class="text-link" href="mailto:${text(data.owner.email)}">Email ↗</a>` : "";
      if (mail) list.push(mail);
      links.innerHTML = list.length ? list.join("") : ``;
    }
  }

  function development() {
    const root = $("#development-content");
    if (!root) return;
    const devCard = p => projectCard(p);
    root.innerHTML = `<div class="container"><div class="project-intro"><p class="eyebrow">UNLISTED WORKSPACE</p><h1>Development Projects</h1><p>Preview published and draft projects on the live website. Selecting projects or using site navigation keeps development mode active until you choose <strong>Exit to public view</strong> above. Drafts are unlisted, not private: their content remains accessible in the public repository and to anyone with a preview URL.</p></div><div class="project-grid">${data.projects.map(devCard).join("")}</div></div>`;
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
    if (page === "development") development();
    previewBanner();
    previewNavigation();
  });
})();
