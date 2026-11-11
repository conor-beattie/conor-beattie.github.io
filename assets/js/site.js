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
  // Status is a presentation/routing field, not proof of completed engineering.
  // Historical "Future" and "In Progress" records are accepted for compatibility.
  const isPlannedProject = item => ["planned", "future", "future-project"].includes(
    String(item?.projectStatus || item?.status || "").trim().toLowerCase().replace(/\s+/g, "-"));
  const activeProjects = () => visibleProjects().filter(p => !isPlannedProject(p));
  const displayProgress = item => {
    const raw = String(item?.projectStatus || item?.status || "").trim();
    if (isPlannedProject(item)) return "Future Project";
    if (raw === "in-progress") return "In Progress";
    if (raw === "completed") return ""; // Completed needn't be labelled on every card.
    return raw;
  };
  const targetStartMarkup = (item, detail = false) =>
    isPlannedProject(item) && nonempty(item.targetStart) ?
    `<p class="${detail ? "project-intro__target" : "project-card__target"}">Planned start: ${text(item.targetStart.trim())}</p>` : "";

  // A position is meaningful only within the item's own category. Keep
  // equal/missing values in their original file order (stable tie-breaker).
  const sortByCategoryOrder = items => items.map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const order = entry => Number.isInteger(entry.categoryOrder) && entry.categoryOrder > 0
        ? entry.categoryOrder : Number.POSITIVE_INFINITY;
      return order(a.item) - order(b.item) || a.index - b.index;
    }).map(entry => entry.item);
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
        (page === 'about' && el.dataset.nav === 'about') ||
        (page === 'timeline' && el.dataset.nav === 'timeline');
      if (selected) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
  }
  const paragraphs = (s) => String(s || "").split(/\n\s*\n/).filter(Boolean)
    .map(p => `<p>${text(p)}</p>`).join("");
  // Searchable skills are curated on each entry; historic topic tags are not displayed.
  const skillSlug = value => String(value || "").normalize("NFKD").toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const skillUrl = name => previewUrl(`projects.html?skill=${encodeURIComponent(skillSlug(name))}`);
  // Planned engineering projects do not claim demonstrated skills. Algorithm
  // cards may still show topic tags, with future methods clearly separated.
  const skillTags = (item, limit = 0, allowPlanned = false) => {
    if (isPlannedProject(item) && !allowPlanned) return "";
    const entries = Array.isArray(item.skills) ? [...new Set(item.skills.filter(nonempty))] : [];
    const chosen = limit ? entries.slice(0,limit) : entries;
    const tagLabel = isPlannedProject(item) ? "Browse future topics tagged" : "Browse work tagged";
    return chosen.length ? `<div class="tags${limit ? "" : " tags-large"}" aria-label="Skills and topics">${chosen.map(skill =>
      `<a class="tag skill-tag" href="${skillUrl(skill)}" title="${tagLabel} ${text(skill)}">${text(skill)}</a>`).join("")}</div>` : "";
  };
  const engineeringFields = [
    ["challenge", "Engineering Challenge"],
    ["contribution", "My Contribution"],
    ["outcome", "Key Outcome"],
    ["lessonsLearned", "Lessons Learned"]
  ];
  const summaryRows = item => engineeringFields.filter(([key])=>nonempty(item.engineeringSummary?.[key]));
  const engineeringSummary = item => {
    const rows = summaryRows(item);
    return rows.length ? `<section class="engineering-summary" aria-label="Engineering summary"><div class="engineering-summary__grid">${rows.map(([key,label])=>
      `<div class="engineering-summary__item"><h2>${label}</h2>${paragraphs(item.engineeringSummary[key])}</div>`).join("")}</div></section>` : "";
  };
  const cardOutcome = item => nonempty(item.engineeringSummary?.outcome) ?
    `<p class="project-card__outcome"><strong>Key Outcome:</strong> ${text(item.engineeringSummary.outcome.trim())}</p>` : "";
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
    if (!path || typeof path !== "string" || !/^assets\/(videos|images)\/[a-zA-Z0-9_ ./()-]+\.(mp4|webm|webp|png|jpe?g|svg)$/i.test(path) || path.includes("..")) return "";
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
    return `<article class="project-card${nonempty(p.image) ? '' : ' project-card--no-image'}">
      ${nonempty(p.image) ? `<a href="${projectUrl(p)}" class="project-card__image" aria-label="View project: ${text(p.title)}">
        <img src="${img(p.image)}" alt="${text(p.imageAlt || p.title)}" loading="lazy"${nonempty(p.imageFallback) ? ` data-fallback-src="${img(p.imageFallback)}"` : ''}${p.imageOptional === true ? ' data-optional-cover="true"' : ''} />
      </a>` : ''}
      <div class="project-card__body">
        <div class="eyebrow-row">${optionalCardText(kindLabel(p), "eyebrow", "span")}${previewDrafts && !isPublished(p) ? '<span class="preview-draft-tag">DRAFT</span>' : ''}</div>
        ${nonempty(p.title) ? `<h3 class="project-card__title"><a href="${projectUrl(p)}">${text(p.title)}</a></h3>` : ""}
        ${optionalCardText(p.subtitle, "project-card__subtitle")}
        ${optionalCardText(displayProgress(p), "project-card__status")}
        ${targetStartMarkup(p)}
        ${optionalCardText(p.summary, "project-card__summary", "p")}
        ${cardOutcome(p)}
        <div class="project-card__foot">
          ${skillTags(p,3)}
          <a href="${projectUrl(p)}" class="round-arrow" aria-label="Open ${text(p.title)}"><span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>`;
  }

  function algorithmCard(a) {
    // The title and summary remain; skill tags replace classification banners
    // and redundant reference/link-count footers.
    return `<article class="algorithm-card">
      <div class="algorithm-card__body">
        ${nonempty(a.title) ? `<h3><a href="${algorithmUrl(a)}">${text(a.title)}</a></h3>` : ""}
        ${optionalCardText(a.subtitle, "project-card__subtitle")}
        ${optionalCardText(a.summary, "algorithm-card__summary", "p")}
        ${skillTags(a,0,true)}
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
    // Keep the complete routine diagram on its detail page. At card size it is
    // too small to read, so the title, summary and tags are more useful here.
    return `<article class="software-card">
      <div class="software-card__body">
      <div class="eyebrow-row"><span class="eyebrow">SOFTWARE LOGIC${nonempty(item.type) ? " · " + text(item.type) : ""}</span></div>
      ${nonempty(item.title) ? `<h3><a href="${softwareUrl(item)}">${text(item.title)}</a></h3>` : ""}
      ${optionalCardText(item.subtitle, "project-card__subtitle")}
      ${optionalCardText(isPlannedProject(item) ? "Future Project" : item.cardStatus, "project-card__status")}${targetStartMarkup(item)}
      ${optionalCardText(item.summary, "software-card__summary", "p")}
      ${cardOutcome(item)}${skillTags(item,3)}
      </div>
    </article>`;
  }

  function software() {
    const root = $("#software-grid");
    if (!root) return;
    // Software Logic follows the robot's operating hierarchy, not alphabetical order.
    // Software Libraries remain alphabetical on their own page.
    const items = sortByCategoryOrder(softwareItems.filter(item => !isPlannedProject(item)));
    root.innerHTML = `<div class="software-card-grid">${items.map(softwareCard).join("")}</div>`;
  }
  function softwareDetail() {
    const id=new URLSearchParams(location.search).get('id');
    const item=softwareById(id), root=$('#software-content');
    if(!item){root.innerHTML=`<div class="container not-found"><p class="eyebrow">SOFTWARE NOT FOUND</p><h1>No software entry has that ID.</h1><a class="button button-primary" href="software.html">Browse Software Logic ↗</a></div>`;return;}
    document.title=`${item.title} · ${data.owner.name}`;
    // The detailed report is intentionally student-authored. Do not repopulate
    // empty sections from card summaries, code-file lists or linked methods.
    const rows=sectionLayouts(item);
    const media=item.flowchart ? `<figure class="flowchart-figure" id="flowchart"><a href="${img(item.flowchart)}" target="_blank" rel="noopener" title="Open flowchart at full size"><img src="${img(item.flowchart)}" alt="${text(item.imageAlt||`${item.title} control flowchart`)}" loading="eager"></a></figure>` : '';
    const modules = relatedAlgorithms(item.algorithmIds).filter((a,i,items)=>items.findIndex(x=>x.id===a.id)===i);
    const libraryLinks = modules.length ? `<section class="software-detail-links" aria-label="Software Libraries used"><h2>Software Libraries Used</h2><div class="method-chip-row">${chipLinks(modules,algorithmUrl)}</div></section>` : '';
    // Explicit relationships: each software page links to its robot projects,
    // and selected parent routines link to their documented child/supporting logic.
    const relatedRobots = [...new Set(item.robotIds || [])]
      .map(id => visibleProjects().find(p => p.id === id)).filter(Boolean);
    const robotLinks = relatedRobots.length ? `<section class="software-detail-links" aria-label="Related Projects"><h2>Related Projects</h2><div class="related-list">${relatedRobots.map(p => `<a class="related-item" href="${projectUrl(p)}"><strong>${text(p.title)}</strong>${optionalCardText(p.subtitle,"related-item__subtitle","span")}</a>`).join('')}</div></section>` : '';
    const relatedLogic = [...new Set(item.relatedSoftwareIds || [])]
      .map(id => softwareById(id)).filter(s => s && s.id !== item.id);
    const logicLinks = relatedLogic.length ? `<section class="software-detail-links" aria-label="Related Software Logic"><h2>Related Software Logic</h2><div class="related-list">${relatedLogic.map(s => `<a class="related-item" href="${softwareUrl(s)}"><strong>${text(s.title)}</strong></a>`).join('')}</div></section>` : '';
    const videos = (item.demos||[]).filter(d=>localMedia(d.video)).map(d=>{
      const path=localMedia(d.video);
      const poster=localMedia(d.poster);
      return `<article class="demo-card"><h3>${text(d.title||item.title)}</h3><video class="demo-player" controls playsinline preload="none" ${poster ? `poster="${poster}"` : ''}><source src="${path}" type="${path.toLowerCase().endsWith('.webm')?'video/webm':'video/mp4'}" />Your browser does not support HTML video.</video>${optionalDetailText(d.description,'demo-results')}</article>`;
    }).join('');
    const demonstrations=videos ? `<section class="software-detail-links" aria-label="Video demonstrations"><h2>Video Demonstrations</h2><div class="demo-grid">${videos}</div></section>` : '';
    root.innerHTML=`<div class="container"><div class="breadcrumb"><a href="software.html">Software Logic</a><span aria-hidden="true">/</span><span>${text(item.title)}</span></div>
      <div class="project-intro"><p class="eyebrow">SOFTWARE LOGIC${nonempty(item.type) ? ' · '+text(item.type) : ''}</p><h1>${text(item.title)}</h1>${optionalDetailText(item.subtitle,"project-intro__subtitle")}${optionalDetailText(item.summary,'project-lede')}${skillTags(item)}</div>
      ${media}${demonstrations}${engineeringSummary(item)}${detailLayout(rows,'Software sections')}${libraryLinks}${robotLinks}${logicLinks}</div>`;
  }
  function algorithmsPage() {
    const gallery = $("#algorithm-groups");
    if (!gallery) return;
    const visible = algorithms.filter(canShow);
    // Alphabetical sorting within the two status groups is simpler to scan.
    const alphabetic = items => [...items].sort((a,b) =>
      a.title.localeCompare(b.title, "en", {sensitivity:"base", numeric:true}));
    const current = alphabetic(visible.filter(a => !isPlannedProject(a)));
    const future = alphabetic(visible.filter(isPlannedProject));
    const renderGroup = (title, items) => items.length ?
      `<section class="project-list-group"><h2 class="project-list-group__title">${title}</h2><div class="algorithm-grid">${items.map(algorithmCard).join("")}</div></section>` : "";
    gallery.innerHTML = renderGroup("Implemented Libraries", current) + renderGroup("Future Libraries", future);
  }
  function algorithmDetail() {
    const id = new URLSearchParams(location.search).get("id");
    const selected = algorithm(id);
    const a = canShow(selected) ? selected : null;
    const root = $("#algorithm-content");
    if (!a) { root.innerHTML = `<div class="container not-found"><p class="eyebrow">ALGORITHM NOT FOUND</p><h1>No algorithm has that ID.</h1><a class="button button-primary" href="algorithms.html">Browse Software Libraries ↗</a></div>`; return; }
    document.title = `${a.title} · ${data.owner.name}`;
    // Descriptions are left for the student to write. Retain the familiar
    // technical headings; show each only after its text has been populated.
    const sections = [
      ["Introduction", a.introduction],
      ["What it does", a.overview],
      ["How it works", a.method],
      ["Limitations and considerations", a.considerations],
      ["Implementation notes", a.implementation]
    ].filter(([, body]) => nonempty(body))
      .map(([heading, body]) => `<section><h2>${text(heading)}</h2>${paragraphs(body)}</section>`).join("");
    const io = a.interface || {};
    const interfaceSections = [['Inputs',io.inputs],['Outputs',io.outputs],['Adjustable Settings',io.settings]]
      .filter(([,values])=>Array.isArray(values)&&values.length)
      .map(([heading,values])=>`<section><h2>${text(heading)}</h2><ul class="library-interface-list">${values.map(value=>`<li>${text(typeof value==='string'?value:value.name||'')}${value.description ? ` — ${text(value.description)}`:''}</li>`).join('')}</ul></section>`).join('');
    root.innerHTML = `<div class="container"><div class="breadcrumb"><a href="algorithms.html">Software Libraries</a><span aria-hidden="true">/</span><span>${text(a.shortName)}</span></div>
      <div class="project-intro"><p class="eyebrow">${isPlannedProject(a)?'FUTURE LIBRARY':'SOFTWARE LIBRARY'} · ${text(a.group)}</p><h1>${text(a.title)}</h1>${optionalDetailText(a.summary,'project-lede')}${a.fileName?`<p class="library-file-name">Python module: <code>${text(a.fileName)}</code></p>`:''}${skillTags(a,0,true)}</div>
      ${(sections||interfaceSections) ? `<div class="algorithm-detail-stack">${sections}${interfaceSections}</div>` : ""}</div>`;
  }

  function home() {
    setText("#hero-headline", data.owner.homeHeadline || data.owner.headline);
    setText("#hero-intro", data.owner.introduction);
    const imgEl = $("#home-hero-image");
    if (imgEl) imgEl.src = activeProjects()[0]?.image || data.categories[0]?.image;
    const catGrid = $("#category-grid");
    if (catGrid) catGrid.innerHTML = data.categories.map((cat) => `
      <a href="${cat.id === "software" ? "software.html" : cat.id === "algorithms" ? "algorithms.html" : `projects.html?category=${encodeURIComponent(cat.id)}`}" class="category-tile">
        <div class="category-tile__image"><img src="${img(cat.image)}" alt="${text(cat.title)}" loading="lazy" /></div>
        <div class="category-tile__info"><h3>${text(cat.title)}</h3><span class="tile-arrow" aria-hidden="true">↗</span></div>
      </a>`).join("");
    const featured = $("#featured-projects");
    if (featured) {
      // Only explicitly numbered entries appear here. Normal project listings
      // are independent of this order; software entries can also be featured.
      const isFeatured = item => Number.isInteger(item.featuredOrder) && item.featuredOrder > 0;
      const selected = [
        ...activeProjects().filter(isFeatured).map(item => ({ item, kind: "project" })),
        ...softwareItems.filter(item => !isPlannedProject(item) && isFeatured(item)).map(item => ({ item, kind: "software" }))
      ].sort((a, b) => a.item.featuredOrder - b.item.featuredOrder ||
        a.item.title.localeCompare(b.item.title));
      featured.innerHTML = selected.map(({ item, kind }) =>
        kind === "software" ? softwareCard(item) : projectCard(item)
      ).join("");
    }
  }

  function updateListingIntro(chosen,activeSkill="") {
    const title = $("#listing-title");
    const section = $(".page-top");
    const listing = $("#project-list")?.closest("section");
    const cat = category(chosen);
    if (title) title.textContent = activeSkill ? `Projects, Software Logic & Software Libraries · ${activeSkill}` : (cat ? cat.title : "All Projects");
    const description = $("#category-description");
    if (description) {
      description.textContent = !activeSkill && cat?.id === "electronics" ? cat.subtitle : "";
      description.hidden = !description.textContent;
    }
    // The active navigation already names the discipline. Keep the heading in
    // the document for accessibility without repeating it above each gallery.
    if (section) section.classList.toggle("page-top--category", Boolean(cat) && !activeSkill);
    if (listing) listing.classList.toggle("section--category-list", Boolean(cat) && !activeSkill);
    document.title = `${activeSkill ? `Skill: ${activeSkill}` : (cat ? cat.title : "All Projects")} · ${data.owner.name}`;
  }

  function projects() {
    const container = $("#project-list");
    const input = $("#project-search");
    const count = $("#project-count");
    const params = new URLSearchParams(location.search);
    const requestedSkill = params.get("skill") || "";
    // Skill search includes algorithm topics as well as engineering and
    // software, while still excluding planned engineering/software work.
    const availableAlgorithms = algorithms.filter(canShow);
    const allSkills = [...new Set([
      ...[...visibleProjects(),...softwareItems].filter(item=>!isPlannedProject(item)),
      ...availableAlgorithms
    ].flatMap(item=>item.skills || []))];
    const activeSkill = allSkills.find(skill=>skillSlug(skill)===requestedSkill) || "";
    let chosen = params.get("category") || "all";
    if (!requestedSkill && chosen === "software") { location.replace(previewUrl("software.html")); return; }
    if (!requestedSkill && chosen === "algorithms") { location.replace(previewUrl("algorithms.html")); return; }
    if (chosen !== "all" && !category(chosen)) chosen = "all";
    const filterInfo = $("#skill-filter-info");
    if (filterInfo && requestedSkill) filterInfo.innerHTML = activeSkill ?
      `Showing engineering projects and software tagged <strong>${text(activeSkill)}</strong>. Future libraries are listed separately. <a href="${previewUrl('projects.html')}">Clear skill filter</a>` :
      `No skill named <strong>${text(requestedSkill)}</strong> is defined. <a href="${previewUrl('projects.html')}">Browse all projects</a>`;
    function refresh() {
      const term = (input.value || "").toLocaleLowerCase().trim();
      const matchesSearch = item => [item.title,item.subtitle,displayProgress(item),item.summary,...(isPlannedProject(item)?[]:(item.skills||[]))]
        .join(" ").toLocaleLowerCase().includes(term);
      const inScope = chosen === "all" ? visibleProjects() : visibleProjects().filter(p=>p.category === chosen);
      const ordered = chosen === "all" ? inScope : sortByCategoryOrder(inScope);
      const present = requestedSkill ? (activeSkill ? activeProjects().filter(item=>(item.skills||[]).includes(activeSkill)) : []) :
        ordered.filter(item=>!isPlannedProject(item));
      const future = requestedSkill ? [] : ordered.filter(isPlannedProject);
      const softwareResults = requestedSkill && activeSkill ? softwareItems.filter(item=>!isPlannedProject(item) && (item.skills||[]).includes(activeSkill)) : [];
      const algorithmResults = requestedSkill && activeSkill ? availableAlgorithms.filter(item=>(item.skills||[]).includes(activeSkill) && matchesSearch(item)) : [];
      const activeAlgorithmResults = algorithmResults.filter(item=>!isPlannedProject(item))
        .sort((a,b)=>a.title.localeCompare(b.title,"en",{sensitivity:"base",numeric:true}));
      const futureAlgorithmResults = algorithmResults.filter(isPlannedProject)
        .sort((a,b)=>a.title.localeCompare(b.title,"en",{sensitivity:"base",numeric:true}));
      const currentCards = [
        ...present.filter(matchesSearch).map(item=>({item,kind:"project"})),
        ...softwareResults.filter(matchesSearch).map(item=>({item,kind:"software"}))
      ];
      const plannedCards = future.filter(matchesSearch);
      const renderCard = ({item,kind}) => kind === "software" ? softwareCard(item) : projectCard(item);
      const renderGroup = (heading,cards) => cards.length ?
        `<section class="project-list-group"><h2 class="project-list-group__title">${heading}</h2><div class="project-grid">${cards.map(renderCard).join("")}</div></section>` : "";
      const renderAlgorithmGroup = (heading,items) => items.length ?
        `<section class="project-list-group"><h2 class="project-list-group__title">${heading}</h2><div class="algorithm-grid">${items.map(algorithmCard).join("")}</div></section>` : "";
      const total = currentCards.length + plannedCards.length + algorithmResults.length;
      container.innerHTML = total ?
        renderGroup("Projects",currentCards) + renderGroup("Future Projects",plannedCards.map(item=>({item,kind:"project"}))) +
        renderAlgorithmGroup("Software Libraries",activeAlgorithmResults) + renderAlgorithmGroup("Future Libraries",futureAlgorithmResults) :
        `<div class="empty-state"><h3>No matching work</h3><p>${requestedSkill ? 'Try clearing the skill filter or search.' : 'Try clearing the search or choosing another category.'}</p></div>`;
      count.textContent = requestedSkill ? `${total} matching entr${total===1?'y':'ies'}` :
        `${total} project${total===1?'':'s'}${plannedCards.length ? ` · ${plannedCards.length} planned` : ''}`;
    }
    input.addEventListener("input", refresh);
    updateListingIntro(chosen,activeSkill || (requestedSkill ? requestedSkill : ""));
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
    const citations=citationContext(p);
    const printExtras=projectExtras(p,citations);
    // The project header already contains the description. A blank detailed
    // Overview stays blank; do not create a redundant section from the summary.
    const rows=sectionLayouts(p,printExtras,citations);
    const printSidebar=specs.length ? `<div class="print-spec-card"><p class="eyebrow">3D PRINT INFORMATION</p><h3>Print profile</h3>
      <dl class="print-spec-list">${specs.map(([key,label])=>`<div><dt>${text(label)}</dt><dd>${text(details[key])}</dd></div>`).join('')}</dl></div>` : "";
    root.innerHTML=`<div class="container print-detail-page">
      <div class="breadcrumb"><a href="projects.html?category=fabrication">3D Printing &amp; Fabrication</a><span aria-hidden="true">/</span><span>${text(p.title)}</span></div>
      <div class="project-intro print-intro"><p class="eyebrow">${text(kindLabel(p))}${p.date ? ' · '+text(p.date):''}</p><h1>${text(p.title)}</h1>
      ${optionalDetailText(p.subtitle,"project-intro__subtitle")}${optionalDetailText(displayProgress(p),"project-intro__status")}${targetStartMarkup(p,true)}${optionalDetailText(p.summary,"project-lede")}
      ${skillTags(p)}</div>
      <figure class="print-cad-figure"><div class="print-media-label">CAD MODEL</div><img src="${img(p.image)}" alt="${text(p.imageAlt||`${p.title} CAD model`)}"/></figure>
      ${photos.length ? `<section class="print-gallery-panel" aria-labelledby="print-gallery-title"><div class="print-gallery-heading"><div><p class="eyebrow">FROM DIGITAL TO PHYSICAL</p><h2 id="print-gallery-title">The finished print</h2><p>Photographs of the actual manufactured part.</p></div>
        <span class="print-photo-count">${photos.length} photo${photos.length===1?'':'s'}</span></div>
        <div class="print-photo-grid" data-count="${photos.length}">${cards}</div>
      </section>` : ""}
      ${engineeringSummary(p)}${detailLayout(rows,'Project sections',printSidebar)}
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
  function surfaceStudySection(p, key, label, cites) {
    const study = p.surfaceStudy || {};
    const inline = cites?.inline || text;
    const head = `<section class="detail-section detail-section--clean" id="${key}"><div><h2>${text(label)}</h2>`;
    const table = (headers, rows, className = "") => `<div class="investigation-table-wrap surface-table-wrap"><table class="investigation-table surface-table ${className}"><thead><tr>${headers.map(h => `<th scope="col">${text(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
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
        </dl><p class="surface-test-note"><strong>Method note:</strong> ${text(t.notes)}</p><div class="surface-test-reference">Reference: ${inline(t.reference)}</div></article>`;
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


  // Journal-style detail sections. Leave Abstract blank until results and conclusions
  // exist; the four optional engineering-summary fields remain independent.
  const STANDARD_SECTIONS = [
    ["abstract", "Abstract"],
    ["introduction", "Introduction"],
    ["materialsMethods", "Materials and Methods"],
    ["projectPlan", "Project Plan"],
    ["resultsDiscussion", "Results and Discussion"],
    ["conclusions", "Conclusions"],
    ["lessonsLearned", "Lessons Learned"],
    ["relatedProjects", "Related Projects"],
    ["references", "References & Resources"]
  ];
  const hasText = value => typeof value === "string" && value.trim().length > 0;
  const subheading = (label, body, showEmpty=false) => (body || showEmpty) ?
    `<div class="standard-subsection"><h3>${text(label)}</h3>${body}</div>` : "";
  const sectionShell = (key, label, content) => content ?
    `<section class="detail-section detail-section--clean" id="${key}"><div><h2>${text(label)}</h2>${content}</div></section>` : "";
  const sectionNavigation = (entries, label="Project sections") =>
    `<nav aria-label="${text(label)}">${entries.map(([key,title]) => `<a href="#${key}">${text(title)}</a>`).join("")}</nav>`;

  // Citations are written as [@reference-id] in the section text or research
  // tables. The bibliography is numbered by first citation, followed by any
  // uncited reading. The URL/title/description come from the data, not markup.
  function citationContext(entry) {
    const sourceArrays = [entry.surfaceStudy?.sources, entry.investigation?.sources, entry.references];
    const all = [], byId = new Map(), byUrl = new Set();
    sourceArrays.forEach(arr => (Array.isArray(arr) ? arr : []).forEach(source => {
      if (!source) return;
      const title = source.name || source.title || source.label || source.url;
      if (!title) return;
      const url = String(source.url || "").trim();
      if (url && byUrl.has(url.toLowerCase())) return;
      const baseId = String(source.id || skillSlug(url || title) || 'source').toLowerCase().replace(/[^a-z0-9-]/g,'-');
      let id = baseId, n = 2;
      while (byId.has(id)) id = `${baseId}-${n++}`;
      const record = {...source, title, id};
      byId.set(id,record);
      if (url) byUrl.add(url.toLowerCase());
      all.push(record);
    }));
    const marker = /\[@([a-z0-9-]+)\]/gi;
    const first = [], observed = new Set();
    const scan = value => {
      if (typeof value !== "string") return;
      let match;
      marker.lastIndex = 0;
      while ((match = marker.exec(value))) {
        const id=match[1].toLowerCase();
        if (byId.has(id) && !observed.has(id)) {first.push(id);observed.add(id);}
      }
    };
    STANDARD_SECTIONS.forEach(([key]) => {
      if (key === 'references') return;
      // Results and Discussion retain independent source fields and citations,
      // but are presented together under one visible report heading.
      const sourceKeys = key === 'resultsDiscussion'
        ? ['resultsDiscussion', 'results', 'discussion'] : [key];
      sourceKeys.forEach(sourceKey => {
        scan(entry.sections?.[sourceKey]);
        (entry.sectionDetails?.[sourceKey] || []).forEach(d => scan(d.text));
      });
    });
    // In the contact-pad investigation, material and test tables can also
    // cite specific journal papers without adding prose just to force a cite.
    (entry.surfaceStudy?.materials || []).forEach(row => Object.values(row).forEach(scan));
    (entry.materialSelection || []).forEach(row => row.forEach(scan));
    (entry.scopeLimitations || []).forEach(row => { if (row.referenceId) scan(`[@${row.referenceId}]`); });
    (entry.surfaceStudy?.tests || []).forEach(row => Object.values(row).forEach(scan));
    // Gripper study retains its established numbered bibliography (1–6) when adding source 7.
    const ordered = entry.preserveReferenceOrder ? all : [...first.map(id=>byId.get(id)),...all.filter(r=>!observed.has(r.id))];
    const numbers = new Map(ordered.map((r,i)=>[r.id,i+1]));
    // Inline text links are opt-in: [label](project:project-id) for published
    // portfolio entries or [label](https://example.org/) for external sources.
    // This keeps ordinary project writing escaped, including citation markers.
    const inline = value => {
      const raw = String(value || "");
      const linkPattern = /\[([^\]\n]+)\]\((project:[a-z0-9-]+|https:\/\/[^\s)]+)\)/gi;
      const citationText = chunk => text(chunk).replace(marker, (token,rawId) => {
        const id=rawId.toLowerCase(), n=numbers.get(id);
        return n ? `<a class="inline-citation" href="#ref-${id}" aria-label="Reference ${n}">[${n}]</a>` : token;
      });
      let out = '', pos = 0;
      for (const match of raw.matchAll(linkPattern)) {
        out += citationText(raw.slice(pos, match.index));
        const target = match[2];
        let url = '', external = false;
        if (target.startsWith('project:')) {
          const project = visibleProjects().find(p => p.id === target.slice(8));
          if (project) url = projectUrl(project);
        } else {
          url = href(target);
          external = Boolean(url);
        }
        out += url ? `<a class="inline-project-link" href="${text(url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text(match[1])}</a>` : text(match[1]);
        pos = match.index + match[0].length;
      }
      return out + citationText(raw.slice(pos));
    };
    const citedCount = first.length;
    const itemHtml = (ref,n) => {
      const url=href(ref.url);
      const title=url ? `<a href="${text(url)}" target="_blank" rel="noopener noreferrer">${text(ref.title)} ↗</a>` : text(ref.title);
      const note=ref.use || ref.description || "";
      return `<li id="ref-${ref.id}" value="${n}"><strong>${title}</strong>${note ? `<p>${text(note)}</p>` : ""}</li>`;
    };
    const bibliography = () => {
      if (!ordered.length) return "";
      const cited=ordered.slice(0,citedCount), further=ordered.slice(citedCount);
      return (cited.length ? subheading('Cited sources',`<ol class="portfolio-references">${cited.map((r,i)=>itemHtml(r,i+1)).join('')}</ol>`) : '') +
        (further.length ? subheading('Further reading & resources',`<ol class="portfolio-references" start="${citedCount+1}">${further.map((r,i)=>itemHtml(r,citedCount+i+1)).join('')}</ol>`) : '');
    };
    return {inline, bibliography, paragraphs:value=>String(value || "").split(/\n\s*\n/).filter(Boolean)
      .map(par=>`<p>${inline(par)}</p>`).join("")};
  }
  // Optional media attached to an ordinary report section or one named subsection.
  // project.sectionMedia.introduction = [{type:"image",src:"assets/images/example.jpg",caption:"..."}]
  // project.sectionDetails.materialsMethods[0].media = [{type:"video",src:"assets/videos/example.mp4"}]
  // Existing projectPhotos and printPhotos continue to work independently.
  function projectEvidence(items, fallbackLabel = "Project media") {
    if (!Array.isArray(items)) return "";
    const media = items.map(item => {
      if (!item || typeof item !== "object") return null;
      const type = item.type === "video" ? "video" : "image";
      const path = localMedia(item.src);
      const valid = type === "video" ? /\.(mp4|webm)$/i.test(path) : /\.(png|jpe?g|webp|svg)$/i.test(path);
      if (!valid) return null;
      const poster = localMedia(item.poster);
      return { ...item, type, path, optional: item.optional === true, poster: /\.(png|jpe?g|webp|svg)$/i.test(poster) ? poster : "" };
    }).filter(Boolean);
    if (!media.length) return "";
    const figures = media.map(item => {
      const caption = nonempty(item.caption) ? `<figcaption>${text(item.caption)}</figcaption>` : "";
      const wideClass = item.wide === true ? " project-evidence-item--wide" : "";
      const pendingClass = item.optional ? " project-evidence-item--pending" : "";
      const readyAttribute = item.optional ? ' data-optional-evidence-resource="true"' : '';
      if (item.type === "video") {
        const name = text(item.alt || item.caption || "Project demonstration video");
        const mime = /\.webm$/i.test(item.path) ? "video/webm" : "video/mp4";
        return `<figure class="project-evidence-item${wideClass}${pendingClass}"><video controls playsinline preload="metadata" aria-label="${name}"${readyAttribute}${item.poster ? ` poster="${item.poster}"` : ""}><source src="${item.path}" type="${mime}"/>Your browser does not support HTML video.</video>${caption}</figure>`;
      }
      const description = text(item.alt || item.caption || fallbackLabel);
      return `<figure class="project-evidence-item${wideClass}${pendingClass}"><a href="${item.path}" target="_blank" rel="noopener noreferrer" aria-label="Open full size image: ${description}"><img src="${item.path}" alt="${description}" loading="${item.optional ? 'eager' : 'lazy'}" decoding="async"${readyAttribute} /></a>${caption}</figure>`;
    }).join("");
    return `<div class="project-evidence-grid${media.length === 1 ? " project-evidence-grid--single" : ""}${media.every(item => item.optional) ? " project-evidence-grid--pending" : ""}">${figures}</div>`;
  }

  const sectionLayouts = (entry, extras={}, cites=citationContext(entry)) => STANDARD_SECTIONS.map(([key,defaultLabel]) => {
    const label = nonempty(entry.sectionLabels?.[key]) ? entry.sectionLabels[key] : defaultLabel;
    if (key === 'resultsDiscussion') {
      // Keep all previous results, commentary and nested details intact, as
      // distinguishable subsections of one report section on every project.
      // Legacy #results and #discussion deep links also remain valid.
      const combined = ['resultsDiscussion', 'results', 'discussion'].map(sourceKey => {
        const body = hasText(entry.sections?.[sourceKey]) ? cites.paragraphs(entry.sections[sourceKey]) : '';
        const sectionImages = projectEvidence(entry.sectionMedia?.[sourceKey], entry.title || 'Project media');
        const nested = (entry.sectionDetails?.[sourceKey] || []).map(item =>
          subheading(item.heading || 'Further details', cites.paragraphs(item.text || '') +
            projectEvidence(item.media, item.heading || entry.title || 'Project media'))).join('');
        const extra = extras[sourceKey] || '';
        if (!body && !sectionImages && !nested && !extra) return '';
        if (sourceKey === 'resultsDiscussion') return body + sectionImages + nested + extra;
        const label = sourceKey === 'results' ? 'Results' : 'Discussion';
        return `<div class="standard-subsection" id="${sourceKey}"><h3>${label}</h3>${body}${sectionImages}${nested}${extra}</div>`;
      }).join('');
      return {key,label,content:combined + (extras.resultsDiscussion || '')};
    }
    const base = hasText(entry.sections?.[key]) ? cites.paragraphs(entry.sections[key]) : "";
    const details = (entry.sectionDetails?.[key] || []).map(item => {
      // A subsection-specific evidence table is appended directly below its
      // matching heading, not below all headings in the parent report section.
      const linkedProject = item.relatedProjectId && visibleProjects().find(p => p.id === item.relatedProjectId);
      const projectLink = linkedProject ? `<p><a class="inline-project-link" href="${projectUrl(linkedProject)}">${text(linkedProject.title)} ↗</a></p>` : '';
      const specs = Array.isArray(item.specifications) && item.specifications.length
        ? `<div class="investigation-table-wrap"><table class="investigation-table" aria-label="${text(item.heading || 'Specifications')}"><tbody>${item.specifications.map(row=>`<tr><th scope="row">${text(row.label)}</th><td>${text(row.value)}</td></tr>`).join('')}</tbody></table></div>`
        : '';
      // Optional simple subsection table, e.g. a two-column hazard/precaution list.
      const detailTable = Array.isArray(item.table?.headers) && item.table.headers.length &&
        Array.isArray(item.table?.rows) && item.table.rows.length
        ? `<div class="investigation-table-wrap" role="region" aria-label="${text(item.heading || 'Details')}" tabindex="0"><table class="investigation-table"><thead><tr>${item.table.headers.map(header=>`<th scope="col">${text(header)}</th>`).join('')}</tr></thead><tbody>${item.table.rows.map(row=>`<tr>${row.map(cell=>`<td>${cites.inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
        : '';
      const content = cites.paragraphs(item.text || '') + specs + detailTable + cites.paragraphs(item.postText || '') +
        projectLink + (extras[`${key}:${item.id}`] || '') +
        projectEvidence(item.media, item.heading || entry.title || 'Project media');
      return subheading(item.heading || "Further details", content, item.showEmpty === true);
    }).join("");
    const content = base + projectEvidence(entry.sectionMedia?.[key], entry.title || 'Project media') +
      details + (extras[key] || "") + (key==='references' ? cites.bibliography() : '');
    return {key,label,content};
  }).filter(row => row.content.trim());
  const sectionMarkup = rows => rows.map(row => sectionShell(row.key,row.label,row.content)).join("");
  const sectionSidebar = (rows,label="Project sections", extra="") => {
    if (!rows.length && !extra) return "";
    return `<aside class="detail-aside">${rows.length ? `<p class="eyebrow">ON THIS PAGE</p>${sectionNavigation(rows.map(r=>[r.key,r.label]),label)}` : ""}${extra}</aside>`;
  };
  const detailLayout = (rows,label="Project sections", extra="") => {
    if (!rows.length && !extra) return "";
    return `<div class="detail-layout${rows.length ? "" : " detail-layout--aside-only"}">${sectionSidebar(rows,label,extra)}${rows.length ? `<div class="detail-main">${sectionMarkup(rows)}</div>` : ""}</div>`;
  };

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
  function projectExtras(p, cites) {
    const inv=p.investigation||{}, surface=p.surfaceStudy||{};
    const extra={};
    const add=(key,content)=>{ if(content) extra[key]=(extra[key]||"")+content; };
    // Optional supporting project photographs, without duplicating the hero cover.
    const projectPhotos = (Array.isArray(p.projectPhotos) ? p.projectPhotos : [])
      .filter(photo => localMedia(photo.src))
      .slice(0, 4);
    if (projectPhotos.length) {
      const figures = projectPhotos.map(photo => {
        const file = localMedia(photo.src);
        return `<figure class="investigation-media"><a href="${file}" target="_blank" rel="noopener noreferrer" aria-label="Open full size project photograph"><img src="${file}" alt="${text(photo.alt || photo.caption || p.title)}" loading="lazy" /></a>${photo.caption ? `<figcaption>${text(photo.caption)}</figcaption>` : ''}</figure>`;
      }).join('');
      add('introduction', `<div class="investigation-media-grid">${figures}</div>`);
    }
    const structured=(key,label,fn)=>nestedEvidence(fn(p,key,label,cites),label);
    if(inv.criteria?.length) add('introduction',structured('investigation-criteria','Engineering criteria',investigationSection));
    if(surface.benchmarks?.length) add('introduction',structured('surface-benchmarks','Success criteria against rubber bands',surfaceStudySection));
    if(surface.materials?.length) add('materialsMethods',structured('surface-materials','Material shortlist and decisions',surfaceStudySection));
    // Compact material-choice table for the contact-pad study. Textual research
    // citations use the same numbered bibliography as the report prose.
    // Phase 1 / optional Phase 2 research and scope, displayed at the end of Introduction.
    if (p.id === 'gripper-contact-surfaces' && p.scopeLimitations?.length) {
      const headers = ['Variable', 'Phase', 'Research findings', 'Scope and Limitations *', 'Source'];
      const heading = headers.map(h => `<th scope="col">${text(h)}</th>`).join('');
      const rows = p.scopeLimitations.map(item => {
        const source = item.referenceId
          ? `<a href="#ref-${text(item.referenceId)}">${text(item.source || '')}</a>`
          : text(item.source || '');
        return `<tr><td>${text(item.variable)}</td><td>${text(item.phase)}</td><td>${text(item.finding)}</td><td>${text(item.scope)}</td><td>${source}</td></tr>`;
      }).join('');
      const table = `<div class="investigation-table-wrap surface-table-wrap" role="region" aria-label="Study scope and limitations" tabindex="0"><table class="investigation-table surface-table scope-limitations-table"><thead><tr>${heading}</tr></thead><tbody>${rows}</tbody></table></div>`;
      const notes = (p.scopeLimitationsNotes || []).map(note => `<p class="scope-limitations-note">${text(note)}</p>`).join('');
      add('introduction:scope-limitations', table + notes);
    }
    if(p.materialSelection?.length) {
      const headers=['Status','Product Description','Material','P1S Compatible','Reasoning','Reference'];
      const heading=headers.map(h=>`<th scope="col">${text(h)}</th>`).join('');
      const rows=p.materialSelection.map(row=>`<tr>${row.map(cell=>{
        // Some product names link to their source; citation markers still use the bibliography system.
        if (cell && typeof cell === 'object' && cell.label && href(cell.url))
          return `<td><a href="${text(href(cell.url))}" target="_blank" rel="noopener noreferrer">${cites.inline(cell.label)}</a></td>`;
        return `<td>${cites.inline(cell)}</td>`;
      }).join('')}</tr>`).join('');
      const table=`<div class="investigation-table-wrap surface-table-wrap"><table class="investigation-table surface-table surface-materials-table"><thead><tr>${heading}</tr></thead><tbody>${rows}</tbody></table></div>`;
      if (p.id === 'gripper-contact-surfaces') add('materialsMethods:material-selection',table);
      else add('materialsMethods',subheading('Materials',cites.paragraphs(p.materialsIntro || '')+table));
    }
    if(p.testMethods?.length) {
      // Inline HTML formulas use subscripts/fractions, with no external math dependency.
      const fraction=(numerator,denominator)=>`<span class="test-method-fraction"><span>${numerator}</span><span>${denominator}</span></span>`;
      const formulas={
        slip: {label:'Coefficient of static friction equals force at the start of slip divided by normal force',html:`μ<sub>s</sub> = ${fraction('F<sub>slip</sub>','N')}`},
        retention: {label:'Retention force equals maximum force before pull-out slip',html:'F<sub>ret</sub> = F<sub>pull,max</sub>'},
        success: {label:'Successful operations divided by attempted operations, times 100 percent',html:`S = ${fraction('n<sub>successful</sub>','n<sub>attempted</sub>')} × 100%`},
        damage: {label:'Permanent thickness reduction percentage equals initial minus final thickness, divided by initial thickness, times 100 percent',html:`D = ${fraction('t<sub>0</sub> − t<sub>f</sub>','t<sub>0</sub>')} × 100%`}
      };
      const headers=['Test method','Sketch','What it measures','Formula / metric'];
      const heading=headers.map(h=>`<th scope="col">${text(h)}</th>`).join('');
      const renderTestRow = t=>{
        const file=localMedia(t.image);
        const sketch=file?`<img class="test-method-sketch" src="${file}" alt="${text(t.name)} test sketch" loading="lazy"/>`:'';
        const formula=formulas[t.formula];
        const equation=formula?`<span class="test-method-equation" role="math" aria-label="${text(formula.label)}">${formula.html}</span>`:'';
        return `<tr><td>${text(t.name)}</td><td class="test-method-sketch-cell">${sketch}</td><td>${text(t.measures)}</td><td>${equation}</td></tr>`;
      };
      const renderTestTable = items=>`<div class="investigation-table-wrap surface-table-wrap"><table class="investigation-table surface-table test-methods-table"><thead><tr>${heading}</tr></thead><tbody>${items.map(renderTestRow).join('')}</tbody></table></div>`;
      if (p.id === 'gripper-contact-surfaces') {
        // Proposal stage: one existing sketch, explanation and formula beneath each test heading.
        // Keep the additional cardboard-damage test in source data for possible study-stage use.
        const proposalTests = [
          ['slip', 'sliding-friction'],
          ['retention', 'gripper-pull-out'],
          ['success', 'robot-pickup']
        ];
        proposalTests.forEach(([formula,id])=>{
          const test=p.testMethods.find(t=>t.formula===formula);
          if(test) add(`materialsMethods:${id}`,renderTestTable([test]));
        });
      } else add('materialsMethods',subheading('Tests',cites.paragraphs(p.testsIntro || '')+renderTestTable(p.testMethods)));

    }

    // Proposal-stage schedule and risk planning live alongside other journal sections.
    // Table contents are editable project data; the bars represent STAGES, not dates.
    if (Array.isArray(p.projectSchedule) && p.projectSchedule.length) {
      const stageCount = Math.max(6, ...p.projectSchedule.map(task => Number(task.stage) || 0));
      const scheduleRows = p.projectSchedule.map(task => {
        const activity=text(task.activity);
        const stage=Number(task.stage);
        const cells=Array.from({length:stageCount},(_,i)=> {
          const active=i+1 === stage;
          return `<td class="project-schedule__cell${active ? ' project-schedule__cell--active' : ''}">${active ? `<span class="project-schedule__bar" aria-label="Stage ${i+1}"><span class="visually-hidden">Stage ${i+1}</span></span>` : ''}</td>`;
        }).join('');
        return `<tr><th scope="row">${activity}</th>${cells}</tr>`;
      }).join('');
      const schedule = `<div class="project-schedule-wrap" role="region" aria-label="Project schedule" tabindex="0"><table class="project-schedule"><thead><tr><th scope="col" rowspan="2">Activity</th><th scope="colgroup" colspan="${stageCount}" class="project-schedule__stage-heading">Stage</th></tr><tr>${Array.from({length:stageCount},(_,i)=>`<th scope="col">${i+1}</th>`).join('')}</tr></thead><tbody>${scheduleRows}</tbody></table></div>`;
      add('projectPlan:schedule', schedule);
    }
    if (Array.isArray(p.projectEquipment) && p.projectEquipment.length) {
      const rows = p.projectEquipment.map(item=>`<tr><th scope="row">${text(item.name)}</th><td>${text(item.notes)}</td></tr>`).join('');
      add('projectPlan:equipment',`<div class="investigation-table-wrap" role="region" aria-label="Equipment and materials" tabindex="0"><table class="investigation-table project-equipment"><thead><tr><th scope="col">Equipment / materials</th><th scope="col">Notes</th></tr></thead><tbody>${rows}</tbody></table></div>`);
    }
    // A compact cost table, used only when a project supplies estimated budget items.
    if (Array.isArray(p.projectBudget) && p.projectBudget.length) {
      const cost = value => Number(value);
      const rows = p.projectBudget.map(item => `<tr><td>${text(item.item)}</td><td>£${text(item.cost)}</td></tr>`).join('');
      const total = p.projectBudget.reduce((sum,item) => sum + cost(item.cost), 0);
      const budget = `<div class="investigation-table-wrap" role="region" aria-label="Estimated project budget" tabindex="0"><table class="investigation-table project-budget"><thead><tr><th scope="col">Item</th><th scope="col">Estimated cost</th></tr></thead><tbody>${rows}<tr><th scope="row">Total</th><td><strong>£${text(total)}</strong></td></tr></tbody></table></div>`;
      add('projectPlan:budget', budget);
    }
    if (Array.isArray(p.projectContingencies) && p.projectContingencies.length) {
      const rows=p.projectContingencies.map(item=>`<tr><th scope="row">${text(item.risk)}</th><td>${text(item.response)}</td></tr>`).join('');
      add('projectPlan:contingencies',`<div class="investigation-table-wrap"><table class="investigation-table project-contingencies"><thead><tr><th scope="col">Risk</th><th scope="col">Contingency</th></tr></thead><tbody>${rows}</tbody></table></div>`);
    }

    if(inv.jawOptions?.length || inv.detectionOptions?.length) add('materialsMethods',structured('concept-study','Mechanism concepts',investigationSection));
    if(p.ioMap?.rows?.length) add('materialsMethods',ioMapMarkup(p));
    if(surface.failures?.length) add('materialsMethods',structured('surface-failures','Failure analysis and design responses',surfaceStudySection));
    if(inv.trialRows?.length) add('materialsMethods',structured('trial-plan','Experimental test plan',investigationSection));
    if(surface.tests?.length) add('materialsMethods',structured('surface-tests','Experimental test programme',surfaceStudySection));
    const demos=demosForProject(p.id);
    if(demos.length) add('materialsMethods',subheading('Video demonstrations',`<div class="demo-grid">${demos.map(d=>demoMarkup(d,true)).join("")}</div>`));
    const resources=[
      linkMarkup(p.links?.github,'Source code / GitHub'),
      linkMarkup(p.links?.cad,'CAD / 3D model'),
      linkMarkup(p.links?.video,'Demonstration video'),
      linkMarkup(p.links?.downloads,'Technical files')
    ].filter(Boolean);
    if(resources.length) add('materialsMethods',subheading('Project files & media',`<div class="resource-links">${resources.join("")}</div>`));
    const linked=(p.relatedProjectIds||[]).map(id=>visibleProjects().find(item=>item.id===id)).filter(item=>item&&item.id!==p.id);
    const relatedPageLinks = (p.relatedPages || []).filter(page => nonempty(page.title) && /^(?:[a-z0-9-]+\.html)(?:#[a-z0-9-]+)?$/i.test(page.url || ''));
    if(p.showRelatedProjects !== false && (linked.length || relatedPageLinks.length)) add('relatedProjects',`<div class="related-list">${linked.map(item=>`<a class="related-item" href="${projectUrl(item)}"><strong>${text(item.title)}</strong>${optionalCardText(item.subtitle,"related-item__subtitle","span")}<span class="related-item__summary">${text(item.summary)} ↗</span></a>`).join("")}${relatedPageLinks.map(page=>`<a class="related-item" href="${text(page.url)}"><strong>${text(page.title)}</strong><span class="related-item__summary">${text(page.summary || '')} ↗</span></a>`).join("")}</div>`);
    const linkedSoftware=softwareItems.filter(item=>(item.robotIds||[]).includes(p.id));
    if(p.showRelatedProjects !== false && linkedSoftware.length) add('relatedProjects',subheading('Related Software Logic',`<div class="related-list">${linkedSoftware.map(item=>`<a class="related-item" href="${softwareUrl(item)}"><strong>${text(item.title)}</strong>${optionalCardText(item.subtitle,"related-item__subtitle","span")}<span class="related-item__summary">${text(item.summary)} ↗</span></a>`).join("")}</div>`));
    return extra;
  }
  function softwareExtras(item, cites) {
    const extras={};
    const add=(key,content)=>{if(content)extras[key]=(extras[key]||"")+content;};
    const algos=relatedAlgorithms(item.algorithmIds);
    if(algos.length) add('relatedProjects',subheading('Algorithms & methods',`<p>Reference pages for the techniques used by this software. Links do not imply separate physical validation of every method.</p><div class="method-chip-row">${chipLinks(algos,algorithmUrl)}</div>`));
    const robots=(item.robotIds||[]).map(id=>visibleProjects().find(p=>p.id===id)).filter(Boolean);
    if(robots.length) add('relatedProjects',subheading('Robots using this software',`<div class="related-list">${robots.map(p=>`<a class="related-item" href="${projectUrl(p)}"><strong>${text(p.title)}</strong>${optionalCardText(p.subtitle,"related-item__subtitle","span")}<span class="related-item__summary">${text(p.summary)} ↗</span></a>`).join("")}</div>`));
    if(item.codeFiles?.length) add('materialsMethods',subheading('Code structure',`<p>Relevant source modules (paths are informational until a public repository URL is supplied).</p><ul class="code-file-list">${item.codeFiles.map(f=>`<li><code>${text(f)}</code></li>`).join("")}</ul>`));
    const source=linkMarkup(item.sourceUrl,'View public source code');
    if(source) add('materialsMethods',subheading('Source code',`<div class="resource-links">${source}</div>`));
    return extras;
  }

  // Opt-in two-image comparison on a project detail page. The listing card
  // continues to use the original project image without modification.
  function projectHero(p) {
    if (!nonempty(p.image)) return '';
    if (nonempty(p.detailCompareImage)) {
      const figure = (src, alt, caption) => `<figure class="project-hero-comparison-item"><a href="${img(src)}" target="_blank" rel="noopener noreferrer" aria-label="Open full size image: ${text(alt)}"><img src="${img(src)}" alt="${text(alt)}"/></a>${nonempty(caption) ? `<figcaption>${text(caption)}</figcaption>` : ''}</figure>`;
      return `<div class="project-hero-comparison" role="group" aria-label="Initial prototype and completed control panel">
        ${figure(p.detailCompareImage, p.detailCompareAlt || 'Initial prototype', p.detailCompareCaption || '')}
        ${figure(p.image, p.imageAlt || p.title, p.detailMainCaption || '')}
      </div>`;
    }
    return `<figure class="project-hero-media ${p.imageFullSize ? 'project-hero-media--diagram':''}">${p.imageFullSize ? `<a href="${img(p.image)}" target="_blank" rel="noopener noreferrer" aria-label="Open the diagram at full size"><img src="${img(p.image)}" alt="${text(p.imageAlt||p.title)}"${nonempty(p.imageFallback) ? ` data-fallback-src="${img(p.imageFallback)}"` : ''}${p.imageOptional === true ? ' data-optional-cover="true"' : ''}/></a>` : `<img src="${img(p.image)}" alt="${text(p.imageAlt||p.title)}"${nonempty(p.imageFallback) ? ` data-fallback-src="${img(p.imageFallback)}"` : ''}${p.imageOptional === true ? ' data-optional-cover="true"' : ''}/>`}${p.hideImageCaption ? "" : `<figcaption>${text(p.imageCaption||p.title)}</figcaption>`}</figure>`;
  }

  function projectDetail() {
    const id=new URLSearchParams(location.search).get('id');
    const p=visibleProjects().find(item=>item.id===id);
    const root=$('#project-content');
    if(!p){root.innerHTML=missingProject;return;}
    if(p.category==='fabrication'){printDetail(p);return;}
    document.title=`${p.title} · ${data.owner.name}`;
    const citations=citationContext(p);
    const rows=sectionLayouts(p,projectExtras(p,citations),citations);
    root.innerHTML=`<div class="container">
      <div class="breadcrumb"><a href="projects.html">Projects</a><span aria-hidden="true">/</span><span>${text(p.title)}</span></div>
      <div class="project-intro"><p class="eyebrow">${text(kindLabel(p))} ${p.date ? '· '+text(p.date):''} ${previewDrafts&&!isPublished(p) ? ' · DRAFT':''}</p>
        <h1>${text(p.title)}</h1>${optionalDetailText(p.subtitle,"project-intro__subtitle")}${optionalDetailText(p.hideDetailStatus ? "" : displayProgress(p),"project-intro__status")}${targetStartMarkup(p,true)}${optionalDetailText(p.hideDetailSummary ? "" : p.summary,"project-lede")}${skillTags(p)}</div>
      ${projectHero(p)}
      ${engineeringSummary(p)}
      ${detailLayout(rows)}
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

  function timeline() {
    const root = $("#project-timeline");
    const plan = data.projectTimeline;
    if (!root || !Array.isArray(plan?.years) || !Array.isArray(plan?.groups)) return;
    const years = plan.years;
    const seasons = plan.seasons || ["Autumn", "Winter", "Spring", "Summer"];
    const quarters = years.length * seasons.length;
    // Use the project's existing page only if a real, published entry is available.
    const label = item => {
      const project = visibleProjects().find(p => p.id === item.projectId);
      return project
        ? `<a href="${projectUrl(project)}">${text(item.title)} <span aria-hidden="true">↗</span></a>`
        : text(item.title);
    };
    const seasonText = index => {
      const year = Math.floor(index / seasons.length);
      return `${seasons[index % seasons.length]} ${years[year]}`;
    };
    const row = item => {
      const start = Math.max(0, Math.min(quarters - 1, item.start));
      const hasEnd = Number.isInteger(item.end);
      const end = hasEnd ? Math.max(start, Math.min(quarters - 1, item.end)) : start;
      const period = hasEnd ? `${seasonText(start)} to ${seasonText(end)}` : `Starts ${seasonText(start)}; no end date set`;
      const cells = Array.from({length:quarters},(_,i)=>{
        let bar = '';
        if (!hasEnd && i === start) {
          bar = '<span class="timeline-milestone" aria-hidden="true"></span>';
        } else if (hasEnd && i >= start && i <= end) {
          const state = ['in-progress','planned','longer-term'].includes(item.status) ? item.status : 'planned';
          bar = `<span class="timeline-bar timeline-bar--${state}${i === start ? ' timeline-bar--first' : ''}${i === end ? ' timeline-bar--last' : ''}" aria-hidden="true"></span>`;
        }
        return `<td class="timeline-season-cell">${bar}</td>`;
      }).join('');
      return `<tr class="timeline-project-row"><th scope="row" class="timeline-project-label">${label(item)}<span class="visually-hidden"> — ${period}</span></th>${cells}</tr>`;
    };
    const heads = years.map(year=>`<th scope="colgroup" colspan="${seasons.length}">${text(year)}</th>`).join('');
    const seasonHeads = years.flatMap(()=>seasons.map(name=>`<th scope="col">${text(name)}</th>`)).join('');
    const groups = plan.groups.map(group =>
      `<tbody class="timeline-workstream"><tr class="timeline-group-row"><th scope="rowgroup" colspan="${quarters + 1}">${text(group.title)}</th></tr>${(group.projects || []).map(row).join('')}</tbody>`
    ).join('');
    root.innerHTML = `<div class="timeline-scroll" role="region" aria-label="Project timeline by season; scroll horizontally for later years" tabindex="0">
      <table class="timeline-table"><thead><tr><th class="timeline-corner" scope="col" rowspan="2">Project</th>${heads}</tr><tr>${seasonHeads}</tr></thead>${groups}</table>
    </div><div class="timeline-legend" aria-label="Timeline legend"><span><i class="timeline-key timeline-key--in-progress" aria-hidden="true"></i>In progress</span><span><i class="timeline-key timeline-key--planned" aria-hidden="true"></i>Planned</span><span><i class="timeline-key timeline-key--longer-term" aria-hidden="true"></i>Longer term</span><span><i class="timeline-key timeline-key--start" aria-hidden="true"></i>Start date only</span></div>`;
  }

  function development() {
    const root = $("#development-content");
    if (!root) return;
    const devCard = p => projectCard(p);
    root.innerHTML = `<div class="container"><div class="project-intro"><p class="eyebrow">UNLISTED WORKSPACE</p><h1>Development Projects</h1><p>Preview published and draft projects on the live website. Selecting projects or using site navigation keeps development mode active until you choose <strong>Exit to public view</strong> above. Drafts are unlisted, not private: their content remains accessible in the public repository and to anyone with a preview URL.</p></div><div class="project-grid">${data.projects.map(devCard).join("")}</div></div>`;
  }

  // A missing cover image falls back to the existing robot photograph, or is
  // hidden when optional. No empty/broken photo is shown in a published card.
  document.addEventListener("error", event => {
    const element = event.target;
    if (element?.tagName !== "IMG") return;
    const fallback = element.getAttribute("data-fallback-src");
    if (fallback) {
      element.removeAttribute("data-fallback-src");
      element.src = fallback;
      return;
    }
    if (element.getAttribute("data-optional-cover") === "true") {
      const holder = element.closest(".project-card__image, .project-hero-media");
      const card = holder?.closest(".project-card");
      holder?.remove();
      card?.classList.add("project-card--no-image");
    }
  }, true);

  // Named CAD / photo / video slots are already wired up in project data.
  // They appear as soon as the correct assets are uploaded to GitHub Pages.
  const showOptionalEvidence = element => {
    if (element?.getAttribute?.("data-optional-evidence-resource") !== "true") return;
    const figure = element.closest(".project-evidence-item--pending");
    if (!figure) return;
    figure.classList.remove("project-evidence-item--pending");
    figure.closest(".project-evidence-grid")?.classList.remove("project-evidence-grid--pending");
  };
  document.addEventListener("load", event => showOptionalEvidence(event.target), true);
  document.addEventListener("loadedmetadata", event => showOptionalEvidence(event.target), true);

  document.addEventListener("DOMContentLoaded", () => {
    siteShell();
    const page = document.body.dataset.page;
    if (page === "home") home();
    if (page === "projects") projects();
    if (page === "software") software();
    if (page === "software-detail") softwareDetail();
    if (page === "algorithms") algorithmsPage();
    if (page === "algorithm") algorithmDetail();
    if (page === "project") {
      projectDetail();
      // Load metadata for optional local video slots even while the video
      // remains hidden waiting for its named file to be uploaded.
      $$("video[data-optional-evidence-resource]").forEach(video => video.load());
    }
    if (page === "about") about();
    if (page === "development") development();
    if (page === "timeline") timeline();
    previewBanner();
    previewNavigation();
  });
})();
