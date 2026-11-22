(function () {
  "use strict";

  const root = document.documentElement;
  const config = window.SITE_CONFIG || {};

  // ---------------------------------------------------------------------------
  // 1. Hydrate content from config.js
  // ---------------------------------------------------------------------------
  function applyConfig() {
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el && value) el.textContent = value;
    };

    setText("brand-name", config.brandName);
    setText("brand-tag", config.brandTag);
    setText("availability-text", config.availability);
    setText("hero-role", config.role);
    setText("hero-location", config.location ? `BASED IN ${config.location}` : null);
    setText("hero-focus", config.focus ? `FOCUS: ${config.focus}` : null);
    setText("hero-bio", config.bio);
    setText("email-label", config.email);
    setText("spec-currently", config.currently);
    setText("spec-stack", config.coreStack);
    setText("placeholder-monogram", config.portraitMonogram);

    const headlineEl = document.getElementById("hero-headline");
    if (headlineEl && config.headlineHTML) {
      headlineEl.innerHTML = config.headlineHTML;
    }

    const resumeLink = document.getElementById("resume-link");
    if (resumeLink && config.resumeUrl) {
      resumeLink.href = config.resumeUrl;
    }

    const dockCv = document.getElementById("dock-cv");
    if (dockCv && config.resumeUrl && config.resumeUrl !== "#") {
      dockCv.href = config.resumeUrl;
      dockCv.target = "_blank";
      dockCv.rel = "noopener noreferrer";
    }

    if ((config.fullName || config.brandName) && config.role) {
      const displayName = config.fullName || config.brandName;
      document.title = `${displayName} — ${config.role}`;
    }

    // Portrait image or clean monogram placeholder
    const mediaBox = document.getElementById("portrait-media");
    const placeholderEl = document.getElementById("portrait-placeholder");
    const existingImg = document.getElementById("portrait-img");
    if (mediaBox && config.portraitUrl) {
      if (existingImg) {
        if (existingImg.getAttribute("src") !== config.portraitUrl) {
          existingImg.src = config.portraitUrl;
        }
        existingImg.alt = `${config.fullName || config.brandName || "Portfolio"} portrait`;
        if (existingImg.complete && existingImg.naturalWidth > 0 && placeholderEl) {
          placeholderEl.style.display = "none";
        }
        existingImg.addEventListener("load", () => {
          if (placeholderEl) placeholderEl.style.display = "none";
        });
        existingImg.addEventListener("error", () => {
          existingImg.remove();
          if (placeholderEl) placeholderEl.style.display = "flex";
        });
      } else {
        const img = document.createElement("img");
        img.id = "portrait-img";
        img.src = config.portraitUrl;
        img.alt = `${config.fullName || config.brandName || "Portfolio"} portrait`;
        img.loading = "eager";
        img.addEventListener("error", () => {
          img.remove();
          if (placeholderEl) placeholderEl.style.display = "flex";
        });
        img.addEventListener("load", () => {
          if (placeholderEl) placeholderEl.style.display = "none";
        });
        mediaBox.appendChild(img);
      }
    } else if (existingImg) {
      existingImg.remove();
      if (placeholderEl) placeholderEl.style.display = "flex";
    }

    // Education, Skills & Projects Section Hydration
    renderEducation();
    renderSkills();
    renderProjects();
    renderContact();

    // Social links
    if (config.socials) {
      const map = {
        "social-github": config.socials.github,
        "social-linkedin": config.socials.linkedin,
        "social-x": config.socials.x
      };
      Object.entries(map).forEach(([id, url]) => {
        const link = document.getElementById(id);
        if (link && url) link.href = url;
      });
    }
  }

  function createEl(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function renderEducation() {
    const edu = config.educationSection;
    if (!edu) return;

    const eyebrowEl = document.getElementById("edu-eyebrow");
    const titleEl = document.getElementById("edu-title");
    const eduListEl = document.getElementById("edu-list");

    if (eyebrowEl && edu.eyebrow) eyebrowEl.textContent = edu.eyebrow;
    if (titleEl && edu.titleHTML) titleEl.innerHTML = edu.titleHTML;

    if (eduListEl && Array.isArray(edu.entries)) {
      eduListEl.textContent = "";
      edu.entries.forEach((item) => {
        const card = createEl("article", "edu-card reveal-on-scroll");

        const top = createEl("div", "edu-card-top");
        const metaLeft = createEl("div", "edu-meta-left");
        metaLeft.appendChild(createEl("span", "edu-index mono", item.index));
        metaLeft.appendChild(createEl("span", "meta-sep", "/"));
        metaLeft.appendChild(createEl("span", "edu-period mono tabular", item.period));
        top.appendChild(metaLeft);

        if (item.result) {
          const pill = createEl(
            "span",
            item.ongoing ? "edu-result edu-result--ongoing" : "edu-result"
          );
          if (item.ongoing) {
            const dot = createEl("span", "status-dot");
            dot.setAttribute("aria-hidden", "true");
            pill.appendChild(dot);
          }
          pill.appendChild(document.createTextNode(item.result));
          top.appendChild(pill);
        }
        card.appendChild(top);

        card.appendChild(createEl("h3", "edu-degree", item.degree));

        const instText = item.location
          ? `${item.institution} · ${item.location}`
          : item.institution;
        card.appendChild(createEl("p", "edu-institution", instText));

        if (item.summary) {
          card.appendChild(createEl("p", "edu-summary", item.summary));
        }

        if (Array.isArray(item.highlights) && item.highlights.length) {
          const highlightsWrap = createEl("div", "edu-highlights");
          item.highlights.forEach((chip) => {
            highlightsWrap.appendChild(createEl("span", "edu-chip", chip));
          });
          card.appendChild(highlightsWrap);
        }

        eduListEl.appendChild(card);
      });
    }
  }

  function renderSkills() {
    const skills = config.skillsSection;
    if (!skills) return;

    const eyebrowEl = document.getElementById("skills-eyebrow");
    const titleEl = document.getElementById("skills-title");
    const filtersEl = document.getElementById("skill-filters");
    const gridEl = document.getElementById("skills-grid");

    if (eyebrowEl && skills.eyebrow) eyebrowEl.textContent = skills.eyebrow;
    if (titleEl && skills.titleHTML) titleEl.innerHTML = skills.titleHTML;

    if (gridEl && Array.isArray(skills.categories)) {
      gridEl.textContent = "";
      skills.categories.forEach((cat) => {
        const card = createEl("article", "skill-card reveal-on-scroll");
        card.setAttribute("data-filter-group", cat.filter || "all");

        const top = createEl("div", "skill-card-top");
        const headingWrap = createEl("div", "skill-card-heading");
        headingWrap.appendChild(createEl("span", "skill-index mono", cat.index));
        headingWrap.appendChild(createEl("h3", "skill-title", cat.title));
        top.appendChild(headingWrap);

        if (cat.badge) {
          top.appendChild(createEl("span", "skill-badge", cat.badge));
        }
        card.appendChild(top);

        if (Array.isArray(cat.items)) {
          const list = createEl("div", "skill-list");
          cat.items.forEach((item) => {
            const row = createEl("div", "skill-row");

            const nameWrap = createEl("span", "skill-name-wrap");
            const dot = createEl("span", "skill-dot");
            dot.setAttribute("aria-hidden", "true");
            nameWrap.appendChild(dot);
            nameWrap.appendChild(document.createTextNode(item.name));
            row.appendChild(nameWrap);

            if (item.note) {
              row.appendChild(createEl("span", "skill-note", item.note));
            }
            list.appendChild(row);
          });
          card.appendChild(list);
        }

        gridEl.appendChild(card);
      });
    }

    if (filtersEl && Array.isArray(skills.filters) && gridEl) {
      filtersEl.textContent = "";
      skills.filters.forEach((filter, idx) => {
        const btn = createEl(
          "button",
          idx === 0 ? "skill-filter-btn is-active" : "skill-filter-btn",
          filter.label
        );
        btn.type = "button";
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", String(idx === 0));

        btn.addEventListener("click", () => {
          filtersEl.querySelectorAll(".skill-filter-btn").forEach((other) => {
            const active = other === btn;
            other.classList.toggle("is-active", active);
            other.setAttribute("aria-selected", String(active));
          });

          const cards = Array.from(gridEl.querySelectorAll(".skill-card"));
          let visibleCount = 0;
          cards.forEach((card) => {
            const match =
              filter.id === "all" || card.getAttribute("data-filter-group") === filter.id;
            card.classList.toggle("is-hidden", !match);
            if (match) {
              card.classList.add("is-visible");
              visibleCount += 1;
            }
          });
          gridEl.classList.toggle("skills-grid--single", visibleCount === 1);
          setOrbitFilter(filter.id);
        });

        filtersEl.appendChild(btn);
      });
    }

    initOrbitSphere();
  }

  // ---------------------------------------------------------------------------
  // 1c. Projects & Case Study Modal
  // ---------------------------------------------------------------------------
  function buildProjectMock(item) {
    const mock = createEl("div", "preview-mock");
    const chrome = createEl("div", "mock-chrome");
    const dots = createEl("div", "mock-dots");
    dots.appendChild(createEl("span"));
    dots.appendChild(createEl("span"));
    dots.appendChild(createEl("span"));
    chrome.appendChild(dots);

    const urlLabel =
      item.previewType === "qa-report"
        ? "qa-suite / regression.spec"
        : item.previewType === "ai-xray"
          ? "xai-pipeline / chest_xray_cnn"
          : item.previewType === "web-ui"
            ? "portal / records.sql"
            : "src / BillingApp.java";
    chrome.appendChild(createEl("span", "mock-url", urlLabel));
    mock.appendChild(chrome);

    const body = createEl("div", "mock-body");
    const rows =
      item.previewType === "qa-report"
        ? [
            ["TC-01 · Cart quantity boundary", "PASS", "mock-pill--pass"],
            ["TC-14 · Coupon validation check", "PASS", "mock-pill--pass"],
            ["TC-29 · Session timeout guard", "VERIFIED", "mock-pill--info"]
          ]
        : item.previewType === "ai-xray"
          ? [
              ["Input · Chest X-Ray Scan", "PREPROCESSED", "mock-pill--info"],
              ["Model · Hybrid CNN Classifier", "TB / PNEUMONIA", "mock-pill--pass"],
              ["Layer · Explainable AI (XAI)", "INTERPRETABLE", "mock-pill--pass"]
            ]
          : item.previewType === "web-ui"
            ? [
                ["Schema · students_enrollments", "NORMALIZED", "mock-pill--info"],
                ["Form · Duplicate roll check", "VALIDATED", "mock-pill--pass"],
                ["UI · Responsive table flow", "CLEAN", "mock-pill--pass"]
              ]
            : [
                ["Class · InvoiceCalculator", "OOP", "mock-pill--info"],
                ["Guard · Negative qty exception", "HANDLED", "mock-pill--pass"],
                ["Suite · Boundary test run", "PASSED", "mock-pill--pass"]
              ];

    rows.forEach(([label, status, cls]) => {
      const row = createEl("div", "mock-row");
      row.appendChild(createEl("span", null, label));
      row.appendChild(createEl("span", `mock-pill ${cls}`, status));
      body.appendChild(row);
    });

    mock.appendChild(body);
    return mock;
  }

  const projectModal = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close");

  function closeProjectModal() {
    if (!projectModal || projectModal.hasAttribute("hidden")) return;
    projectModal.setAttribute("hidden", "");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openProjectModal(item) {
    if (!projectModal) return;

    const setModalText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val || "";
    };

    const mediaEl = document.getElementById("modal-media");
    if (mediaEl) {
      mediaEl.textContent = "";
      const slides =
        Array.isArray(item.gallery) && item.gallery.length
          ? item.gallery
          : item.imageUrl
            ? [{ label: "Preview", src: item.imageUrl, caption: item.title }]
            : [];

      if (slides.length) {
        const img = document.createElement("img");
        const captionEl = createEl("p", "modal-media-caption", "");
        const applySlide = (slide, fallbackIdx) => {
          img.src = slide.src;
          img.alt = slide.caption || `${item.title} screenshot ${fallbackIdx + 1}`;
          img.style.backgroundColor = slide.canvasBg || "#ffffff";
          captionEl.textContent = slide.caption || "";
        };

        applySlide(slides[0], 0);
        mediaEl.appendChild(img);
        if (slides[0].caption) mediaEl.appendChild(captionEl);

        if (slides.length > 1) {
          const switcher = createEl("div", "modal-gallery-tabs");
          slides.forEach((slide, idx) => {
            const tabBtn = createEl(
              "button",
              idx === 0 ? "modal-gallery-tab is-active" : "modal-gallery-tab",
              slide.label || `Shot 0${idx + 1}`
            );
            tabBtn.type = "button";
            tabBtn.addEventListener("click", () => {
              applySlide(slide, idx);
              switcher.querySelectorAll(".modal-gallery-tab").forEach((other) => {
                other.classList.toggle("is-active", other === tabBtn);
              });
            });
            switcher.appendChild(tabBtn);
          });
          mediaEl.appendChild(switcher);
        }

        mediaEl.removeAttribute("hidden");
      } else {
        mediaEl.setAttribute("hidden", "");
      }
    }

    setModalText("modal-index", item.index);
    setModalText("modal-year", item.year);
    setModalText("modal-category", item.category);
    setModalText("modal-title", item.title);
    setModalText("modal-tagline", item.tagline);
    setModalText("modal-problem", item.problem);
    setModalText("modal-solution", item.solution);

    const delivEl = document.getElementById("modal-deliverables");
    if (delivEl) {
      delivEl.textContent = "";
      (item.deliverables || []).forEach((d) => {
        delivEl.appendChild(createEl("li", null, d));
      });
    }

    const tagsEl = document.getElementById("modal-tags");
    if (tagsEl) {
      tagsEl.textContent = "";
      (item.tags || []).forEach((t) => {
        tagsEl.appendChild(createEl("span", "edu-chip", t));
      });
    }

    const linksEl = document.getElementById("modal-links");
    if (linksEl) {
      linksEl.textContent = "";
      if (item.githubUrl) {
        const gh = createEl("a", "project-detail-btn", "GitHub Repository ↗");
        gh.href = item.githubUrl;
        gh.target = "_blank";
        gh.rel = "noopener noreferrer";
        linksEl.appendChild(gh);
      }
      if (item.liveUrl) {
        const live = createEl("a", "project-detail-btn", "Live Demo ↗");
        live.href = item.liveUrl;
        live.target = "_blank";
        live.rel = "noopener noreferrer";
        linksEl.appendChild(live);
      }
      linksEl.style.display = linksEl.childElementCount ? "flex" : "none";
    }

    projectModal.removeAttribute("hidden");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
  }
  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  function renderProjects() {
    const projects = config.projectsSection;
    if (!projects) return;

    const eyebrowEl = document.getElementById("projects-eyebrow");
    const titleEl = document.getElementById("projects-title");
    const filtersEl = document.getElementById("project-filters");
    const gridEl = document.getElementById("projects-grid");

    if (eyebrowEl && projects.eyebrow) eyebrowEl.textContent = projects.eyebrow;
    if (titleEl && projects.titleHTML) titleEl.innerHTML = projects.titleHTML;

    if (gridEl && Array.isArray(projects.items)) {
      gridEl.textContent = "";
      projects.items.forEach((item) => {
        const cardClass = item.featured
          ? "project-card project-card--featured reveal-on-scroll"
          : "project-card reveal-on-scroll";
        const card = createEl("article", cardClass);
        card.setAttribute("data-project-group", item.filter || "all");

        // Preview frame
        const preview = createEl("div", "project-preview");
        if (item.imageUrl) {
          const img = document.createElement("img");
          img.src = item.imageUrl;
          img.alt = `${item.title} preview`;
          img.loading = "lazy";
          if (item.previewPosition) img.style.objectPosition = item.previewPosition;
          preview.appendChild(img);
          if (Array.isArray(item.gallery) && item.gallery.length > 1) {
            const shotBadge = createEl(
              "span",
              "preview-shot-badge mono",
              `${item.gallery.length} Screenshots`
            );
            preview.appendChild(shotBadge);
          }
          preview.style.cursor = "pointer";
          preview.addEventListener("click", () => openProjectModal(item));
        } else {
          preview.appendChild(buildProjectMock(item));
        }
        card.appendChild(preview);

        // Body
        const body = createEl("div", "project-body");
        const top = createEl("div", "project-meta-top");
        const idxGroup = createEl("div", "project-index-group");
        idxGroup.appendChild(createEl("span", "project-index mono", item.index));
        idxGroup.appendChild(createEl("span", "meta-sep", "/"));
        idxGroup.appendChild(createEl("span", "project-year mono tabular", item.year));
        top.appendChild(idxGroup);

        if (item.category) {
          top.appendChild(createEl("span", "project-cat", item.category));
        }
        body.appendChild(top);

        body.appendChild(createEl("h3", "project-title", item.title));
        body.appendChild(createEl("p", "project-tagline", item.tagline));

        if (Array.isArray(item.tags) && item.tags.length) {
          const tagList = createEl("div", "project-tags");
          item.tags.forEach((tag) => {
            tagList.appendChild(createEl("span", "edu-chip", tag));
          });
          body.appendChild(tagList);
        }

        const actions = createEl("div", "project-actions");
        const detailBtn = createEl("button", "project-detail-btn", "View Case Study →");
        detailBtn.type = "button";
        detailBtn.addEventListener("click", () => openProjectModal(item));
        actions.appendChild(detailBtn);

        const extLinks = createEl("div", "project-links");
        if (item.githubUrl) {
          const ghLink = createEl("a", "project-ext-link", "GitHub ↗");
          ghLink.href = item.githubUrl;
          ghLink.target = "_blank";
          ghLink.rel = "noopener noreferrer";
          extLinks.appendChild(ghLink);
        }
        if (item.liveUrl) {
          const liveLink = createEl("a", "project-ext-link", "Live ↗");
          liveLink.href = item.liveUrl;
          liveLink.target = "_blank";
          liveLink.rel = "noopener noreferrer";
          extLinks.appendChild(liveLink);
        }
        actions.appendChild(extLinks);
        body.appendChild(actions);

        card.appendChild(body);
        gridEl.appendChild(card);
      });
    }

    if (filtersEl && Array.isArray(projects.filters) && gridEl) {
      filtersEl.textContent = "";
      projects.filters.forEach((filter, idx) => {
        const btn = createEl(
          "button",
          idx === 0 ? "skill-filter-btn is-active" : "skill-filter-btn",
          filter.label
        );
        btn.type = "button";
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", String(idx === 0));

        btn.addEventListener("click", () => {
          filtersEl.querySelectorAll(".skill-filter-btn").forEach((other) => {
            const active = other === btn;
            other.classList.toggle("is-active", active);
            other.setAttribute("aria-selected", String(active));
          });

          gridEl.querySelectorAll(".project-card").forEach((card) => {
            const match =
              filter.id === "all" || card.getAttribute("data-project-group") === filter.id;
            card.classList.toggle("is-hidden", !match);
            if (match) card.classList.add("is-visible");
          });
        });

        filtersEl.appendChild(btn);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 1b. Continuous 3D Rotating Skills Sphere (60fps Golden-Angle Fibonacci)
  // ---------------------------------------------------------------------------
  let activeOrbitFilter = "all";
  let orbitNodes = [];

  function setOrbitFilter(filterId) {
    activeOrbitFilter = filterId || "all";
    orbitNodes.forEach((node) => {
      const dim = activeOrbitFilter !== "all" && node.group !== activeOrbitFilter;
      node.el.classList.toggle("is-dimmed", dim);
    });
  }

  function createSvg(viewBox, color, builder) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", viewBox || "0 0 24 24");
    svg.setAttribute("fill", "none");
    if (color) svg.style.color = color;
    builder(svg);
    return svg;
  }

  function svgEl(tag, attrs) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }

  function buildSkillSvg(type) {
    switch (type) {
      case "c":
        return createSvg("0 0 24 24", "#60a5fa", (s) => {
          s.appendChild(svgEl("polygon", { points: "12,2 21,7 21,17 12,22 3,17 3,7", fill: "rgba(37,99,235,0.2)", stroke: "currentColor", "stroke-width": "1.6" }));
          s.appendChild(svgEl("path", { d: "M15.2 9.4a4.2 4.2 0 1 0 0 5.2", stroke: "#93c5fd", "stroke-width": "2.2", "stroke-linecap": "round" }));
        });
      case "java":
        return createSvg("0 0 24 24", "#f59e0b", (s) => {
          s.appendChild(svgEl("path", { d: "M6 12h9v4a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4v-4z", fill: "rgba(245,158,11,0.18)", stroke: "currentColor", "stroke-width": "1.6" }));
          s.appendChild(svgEl("path", { d: "M15 13h2a2 2 0 0 1 0 4h-2", stroke: "currentColor", "stroke-width": "1.6" }));
          s.appendChild(svgEl("path", { d: "M9 8c0-1.5 1.5-2 1.5-3.5M12.5 8c0-1.5 1.5-2 1.5-3.5", stroke: "#fbbf24", "stroke-width": "1.5", "stroke-linecap": "round" }));
          s.appendChild(svgEl("path", { d: "M5 21h12", stroke: "#60a5fa", "stroke-width": "1.6", "stroke-linecap": "round" }));
        });
      case "js":
        return createSvg("0 0 24 24", "#facc15", (s) => {
          s.appendChild(svgEl("rect", { x: "3", y: "3", width: "18", height: "18", rx: "3.5", fill: "#facc15" }));
          s.appendChild(svgEl("path", { d: "M10.5 11v5a1.8 1.8 0 0 1-3.2 1", stroke: "#0f172a", "stroke-width": "1.9", "stroke-linecap": "round" }));
          s.appendChild(svgEl("path", { d: "M17.2 12.2c0-.9-.8-1.4-1.8-1.4s-1.8.5-1.8 1.3c0 1.9 3.7 1.1 3.7 3.1 0 1-.9 1.6-2 1.6-1 0-1.8-.4-2.1-1.1", stroke: "#0f172a", "stroke-width": "1.8", "stroke-linecap": "round" }));
        });
      case "html":
        return createSvg("0 0 24 24", "#f97316", (s) => {
          s.appendChild(svgEl("polygon", { points: "4,3 20,3 18.5,18.5 12,21 5.5,18.5", fill: "rgba(249,115,22,0.2)", stroke: "currentColor", "stroke-width": "1.6", "stroke-linejoin": "round" }));
          s.appendChild(svgEl("path", { d: "M15.5 7.5H8.8l.4 4h5.9l-.4 4.2-2.7.9-2.7-.9-.2-1.8", stroke: "#fdba74", "stroke-width": "1.7", "stroke-linecap": "round", "stroke-linejoin": "round" }));
        });
      case "css":
        return createSvg("0 0 24 24", "#38bdf8", (s) => {
          s.appendChild(svgEl("polygon", { points: "4,3 20,3 18.5,18.5 12,21 5.5,18.5", fill: "rgba(56,189,248,0.2)", stroke: "currentColor", "stroke-width": "1.6", "stroke-linejoin": "round" }));
          s.appendChild(svgEl("path", { d: "M8.5 7.5h7l-.5 4h-5m5 0l-.4 4.2-2.6.9-2.6-.9-.2-1.6", stroke: "#7dd3fc", "stroke-width": "1.7", "stroke-linecap": "round", "stroke-linejoin": "round" }));
        });
      case "sql":
        return createSvg("0 0 24 24", "#2dd4bf", (s) => {
          s.appendChild(svgEl("ellipse", { cx: "12", cy: "6", rx: "7.5", ry: "3", fill: "rgba(45,212,191,0.18)", stroke: "currentColor", "stroke-width": "1.6" }));
          s.appendChild(svgEl("path", { d: "M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6", stroke: "currentColor", "stroke-width": "1.6" }));
          s.appendChild(svgEl("path", { d: "M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6", stroke: "currentColor", "stroke-width": "1.6" }));
        });
      case "git":
        return createSvg("0 0 24 24", "#fb7185", (s) => {
          s.appendChild(svgEl("rect", { x: "5", y: "5", width: "14", height: "14", rx: "2.5", transform: "rotate(45 12 12)", fill: "rgba(251,113,133,0.18)", stroke: "currentColor", "stroke-width": "1.6" }));
          s.appendChild(svgEl("circle", { cx: "12", cy: "8.5", r: "1.4", fill: "currentColor" }));
          s.appendChild(svgEl("circle", { cx: "12", cy: "15.5", r: "1.4", fill: "currentColor" }));
          s.appendChild(svgEl("circle", { cx: "15.5", cy: "12", r: "1.4", fill: "currentColor" }));
          s.appendChild(svgEl("path", { d: "M12 9.9v4.2M12.8 10.2l2 1.4", stroke: "currentColor", "stroke-width": "1.5" }));
        });
      case "github":
        return createSvg("0 0 24 24", "var(--ink)", (s) => {
          s.appendChild(svgEl("path", {
            d: "M12 2.5a9.5 9.5 0 0 0-3 18.5c.47.09.65-.2.65-.45v-1.6c-2.64.57-3.2-1.27-3.2-1.27-.43-1.1-1.06-1.39-1.06-1.39-.86-.59.07-.58.07-.58.95.07 1.46.98 1.46.98.85 1.45 2.23 1.03 2.77.79.09-.61.33-1.03.6-1.27-2.11-.24-4.33-1.05-4.33-4.69 0-1.04.37-1.89.98-2.55-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.62.97a9.1 9.1 0 0 1 4.76 0c1.82-1.23 2.62-.97 2.62-.97.51 1.31.19 2.28.09 2.52.61.66.98 1.51.98 2.55 0 3.65-2.22 4.45-4.34 4.68.34.3.65.88.65 1.77v2.63c0 .25.17.55.66.45A9.5 9.5 0 0 0 12 2.5z",
            fill: "currentColor"
          }));
        });
      case "vscode":
        return createSvg("0 0 24 24", "#3b82f6", (s) => {
          s.appendChild(svgEl("path", { d: "M17.5 3.5l3 1.5v14l-3 1.5-8.5-7.8-4 3.1-1.8-.9 3.6-3.4-3.6-3.4 1.8-.9 4 3.1 8.5-6.8z", fill: "rgba(59,130,246,0.22)", stroke: "currentColor", "stroke-width": "1.5", "stroke-linejoin": "round" }));
          s.appendChild(svgEl("path", { d: "M17.5 3.5v17", stroke: "#60a5fa", "stroke-width": "1.6" }));
        });
      case "stlc":
        return createSvg("0 0 24 24", "#34d399", (s) => {
          s.appendChild(svgEl("path", { d: "M20 11a8 8 0 0 0-14.6-4.6M4 13a8 8 0 0 0 14.6 4.6", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round" }));
          s.appendChild(svgEl("polyline", { points: "16 4 20 5 19 9", stroke: "currentColor", "stroke-width": "1.7", "stroke-linecap": "round", "stroke-linejoin": "round" }));
          s.appendChild(svgEl("polyline", { points: "8 20 4 19 5 15", stroke: "currentColor", "stroke-width": "1.7", "stroke-linecap": "round", "stroke-linejoin": "round" }));
        });
      case "testcases":
        return createSvg("0 0 24 24", "#38bdf8", (s) => {
          s.appendChild(svgEl("rect", { x: "5", y: "4", width: "14", height: "17", rx: "2.5", fill: "rgba(56,189,248,0.16)", stroke: "currentColor", "stroke-width": "1.6" }));
          s.appendChild(svgEl("path", { d: "M9 9.5l1.5 1.5 3-3M9 15l1.5 1.5 3-3", stroke: "#7dd3fc", "stroke-width": "1.6", "stroke-linecap": "round", "stroke-linejoin": "round" }));
        });
      case "regression":
        return createSvg("0 0 24 24", "#60a5fa", (s) => {
          s.appendChild(svgEl("path", { d: "M12 3l7.5 3.5v5.5c0 4.5-3.2 8-7.5 9.2-4.3-1.2-7.5-4.7-7.5-9.2V6.5L12 3z", fill: "rgba(59,130,246,0.18)", stroke: "currentColor", "stroke-width": "1.6", "stroke-linejoin": "round" }));
          s.appendChild(svgEl("path", { d: "M8.8 12.2l2.1 2.1 4.4-4.4", stroke: "#93c5fd", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }));
        });
      case "smoke":
        return createSvg("0 0 24 24", "#4ade80", (s) => {
          s.appendChild(svgEl("circle", { cx: "12", cy: "12", r: "8.5", fill: "rgba(74,222,128,0.14)", stroke: "currentColor", "stroke-width": "1.6" }));
          s.appendChild(svgEl("path", { d: "M6.5 12h3l1.7-3.5 2.4 7 1.6-3.5h2.8", stroke: "currentColor", "stroke-width": "1.7", "stroke-linecap": "round", "stroke-linejoin": "round" }));
        });
      case "exploratory":
        return createSvg("0 0 24 24", "#fbbf24", (s) => {
          s.appendChild(svgEl("circle", { cx: "11", cy: "11", r: "6.5", fill: "rgba(251,191,36,0.15)", stroke: "currentColor", "stroke-width": "1.7" }));
          s.appendChild(svgEl("path", { d: "M16 16l4.5 4.5", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }));
          s.appendChild(svgEl("circle", { cx: "11", cy: "11", r: "1.8", fill: "currentColor" }));
        });
      default: // bug triage
        return createSvg("0 0 24 24", "#f87171", (s) => {
          s.appendChild(svgEl("ellipse", { cx: "12", cy: "13", rx: "4.5", ry: "5.5", fill: "rgba(248,113,113,0.16)", stroke: "currentColor", "stroke-width": "1.6" }));
          s.appendChild(svgEl("path", { d: "M9 7.5L7.5 5M15 7.5L16.5 5M5 12h2.5M16.5 12H19M6 16.5l2-1M18 16.5l-2-1M12 8v10", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round" }));
        });
    }
  }

  let orbitAnimId = null;

  function initOrbitSphere() {
    const stage = document.getElementById("orbit-stage");
    const cloud = document.getElementById("orbit-cloud");
    if (!stage || !cloud) return;

    if (orbitAnimId) {
      cancelAnimationFrame(orbitAnimId);
      orbitAnimId = null;
    }

    const items = [
      { label: "C", note: "Structured programming & logic", icon: "c", group: "code" },
      { label: "Java", note: "OOP & test scripting", icon: "java", group: "code" },
      { label: "JavaScript", note: "DOM logic & web debugging", icon: "js", group: "code" },
      { label: "HTML5", note: "Semantic UI structure", icon: "html", group: "code" },
      { label: "CSS3", note: "Responsive layout inspection", icon: "css", group: "code" },
      { label: "MySQL", note: "Database & SQL validation", icon: "sql", group: "code" },
      { label: "Git", note: "Branching & source control", icon: "git", group: "code" },
      { label: "GitHub", note: "Repos & PR collaboration", icon: "github", group: "code" },
      { label: "VS Code", note: "Code editing & debugging", icon: "vscode", group: "code" },
      { label: "STLC", note: "SRS analysis & test planning", icon: "stlc", group: "qa" },
      { label: "Test Cases", note: "Boundary & equivalence design", icon: "testcases", group: "qa" },
      { label: "Regression", note: "Release confidence checks", icon: "regression", group: "qa" },
      { label: "Smoke QA", note: "Build health verification", icon: "smoke", group: "qa" },
      { label: "Exploratory", note: "Edge-case discovery", icon: "exploratory", group: "qa" },
      { label: "Bug Triage", note: "Clear steps & defect lifecycle", icon: "bug", group: "qa" }
    ];

    cloud.textContent = "";
    orbitNodes = [];

    const count = items.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    items.forEach((item, idx) => {
      const y = 1 - (idx / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * idx;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const nodeEl = createEl("button", "orbit-node");
      nodeEl.type = "button";
      nodeEl.setAttribute("aria-label", `${item.label}: ${item.note}`);

      const iconWrap = createEl("span", "orbit-node-icon");
      iconWrap.appendChild(buildSkillSvg(item.icon));
      nodeEl.appendChild(iconWrap);
      nodeEl.appendChild(createEl("span", "orbit-node-label", item.label));

      nodeEl.addEventListener("pointerenter", () => {
        speedFactor = 0.2;
      });

      nodeEl.addEventListener("pointerleave", () => {
        speedFactor = 1;
      });

      nodeEl.addEventListener("focus", () => {
        speedFactor = 0.2;
      });

      nodeEl.addEventListener("blur", () => {
        speedFactor = 1;
      });

      cloud.appendChild(nodeEl);
      orbitNodes.push({
        el: nodeEl,
        x,
        y,
        z,
        group: item.group
      });
    });

    const baseVelY = 0.0048;
    const baseVelX = 0.0017;
    let velY = baseVelY;
    let velX = baseVelX;
    let targetVelY = baseVelY;
    let targetVelX = baseVelX;
    let speedFactor = 1;

    if (!stage.dataset.orbitBound) {
      stage.dataset.orbitBound = "true";
      stage.addEventListener("pointermove", (e) => {
        const rect = stage.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        targetVelY = nx * 0.018;
        targetVelX = -ny * 0.014;
      });

      stage.addEventListener("pointerleave", () => {
        targetVelY = baseVelY;
        targetVelX = baseVelX;
        speedFactor = 1;
      });
    }

    function tick() {
      velY += (targetVelY - velY) * 0.06;
      velX += (targetVelX - velX) * 0.06;

      const ay = velY * speedFactor;
      const ax = velX * speedFactor;
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);

      const radius = Math.min(stage.clientWidth, stage.clientHeight) * 0.37;
      const perspective = 2.65;

      orbitNodes.forEach((node) => {
        // Rotate around Y axis
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;
        // Rotate around X axis
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        node.x = x1;
        node.y = y2;
        node.z = z2;

        const depthScale = perspective / (perspective - z2);
        const px = x1 * radius * depthScale;
        const py = y2 * radius * depthScale;
        const scale = Math.max(0.58, Math.min(1.16, depthScale * 0.85));

        const dimmed = activeOrbitFilter !== "all" && node.group !== activeOrbitFilter;
        const baseAlpha = Math.max(0.24, Math.min(1, (z2 + 1.15) * 0.52));
        const finalAlpha = dimmed ? baseAlpha * 0.22 : baseAlpha;

        node.el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        node.el.style.opacity = finalAlpha.toFixed(2);
        node.el.style.zIndex = String(Math.round((z2 + 1.5) * 100));
      });

      orbitAnimId = requestAnimationFrame(tick);
    }

    orbitAnimId = requestAnimationFrame(tick);
  }


  // ---------------------------------------------------------------------------
  // 1d. Contact Section & Interactive Message Form
  // ---------------------------------------------------------------------------
  function renderContact() {
    const contact = config.contactSection;
    if (!contact) return;

    const eyebrowEl = document.getElementById("contact-eyebrow");
    const titleEl = document.getElementById("contact-title");
    const leadEl = document.getElementById("contact-lead");
    const emailLinkEl = document.getElementById("contact-email-link");
    const copyBtn = document.getElementById("contact-copy-btn");
    const copyText = document.getElementById("contact-copy-text");
    const socialsListEl = document.getElementById("contact-socials-list");
    const liveClockEl = document.getElementById("contact-live-clock");
    const form = document.getElementById("contact-form");
    const formStatus = document.getElementById("contact-form-status");

    if (eyebrowEl && contact.eyebrow) eyebrowEl.textContent = contact.eyebrow;
    if (titleEl && contact.titleHTML) titleEl.innerHTML = contact.titleHTML;
    if (leadEl && contact.lead) leadEl.textContent = contact.lead;

    const targetEmail = contact.email || config.email || "rifat.cse.dev@gmail.com";
    if (emailLinkEl) {
      emailLinkEl.textContent = targetEmail;
      emailLinkEl.href = `mailto:${targetEmail}`;
    }

    // Sync contact live clock with header clock
    if (liveClockEl) {
      function updateContactClock() {
        try {
          const now = new Date();
          const str = now.toLocaleTimeString("en-GB", {
            timeZone: config.timezone || "Asia/Dhaka",
            hour12: false
          });
          liveClockEl.textContent = `${str} GMT+6`;
        } catch (e) {
          liveClockEl.textContent = "Dhaka Time";
        }
      }
      updateContactClock();
      setInterval(updateContactClock, 1000);
    }

    // 1-Click Copy Email to Clipboard
    if (copyBtn) {
      let copyTimeout = null;
      copyBtn.addEventListener("click", async () => {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(targetEmail);
          } else {
            const ta = document.createElement("textarea");
            ta.value = targetEmail;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
          }

          copyBtn.classList.add("is-copied");
          const idleIcon = copyBtn.querySelector(".copy-icon-idle");
          const doneIcon = copyBtn.querySelector(".copy-icon-done");
          if (idleIcon) idleIcon.hidden = true;
          if (doneIcon) doneIcon.hidden = false;
          if (copyText) copyText.textContent = "Copied!";

          clearTimeout(copyTimeout);
          copyTimeout = setTimeout(() => {
            copyBtn.classList.remove("is-copied");
            if (idleIcon) idleIcon.hidden = false;
            if (doneIcon) doneIcon.hidden = true;
            if (copyText) copyText.textContent = "Copy";
          }, 2200);
        } catch (err) {
          console.error("Failed to copy email:", err);
          if (copyText) copyText.textContent = "Failed";
        }
      });
    }

    // Render Social Profile Pills
    if (socialsListEl && Array.isArray(contact.socials)) {
      socialsListEl.textContent = "";
      contact.socials.forEach((item) => {
        const a = createEl("a", "contact-social-pill");
        a.href = item.url || "#";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.appendChild(createEl("span", "", item.name));

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "1.8");
        const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
        l.setAttribute("x1", "7"); l.setAttribute("y1", "17"); l.setAttribute("x2", "17"); l.setAttribute("y2", "7");
        const p = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        p.setAttribute("points", "7 7 17 7 17 17");
        svg.appendChild(l);
        svg.appendChild(p);
        a.appendChild(svg);

        socialsListEl.appendChild(a);
      });
    }

    // Interactive Message Form Submit Handler
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput = form.querySelector("#contact-name");
        const emailInput = form.querySelector("#contact-sender-email");
        const inquiryInput = form.querySelector("#contact-inquiry");
        const subjectInput = form.querySelector("#contact-subject");
        const timelineInput = form.querySelector('input[name="timeline"]:checked');
        const sendCopyInput = form.querySelector("#contact-send-copy");
        const messageInput = form.querySelector("#contact-message");

        const name = (nameInput ? nameInput.value : "").trim();
        const email = (emailInput ? emailInput.value : "").trim();
        const inquiry = (inquiryInput ? inquiryInput.value : "").trim();
        const subject = (subjectInput ? subjectInput.value : "").trim();
        const timeline = timelineInput ? timelineInput.value : "Flexible";
        const sendCopy = sendCopyInput ? sendCopyInput.checked : false;
        const message = (messageInput ? messageInput.value : "").trim();

        if (!name || !email || !subject || !message) {
          if (formStatus) {
            formStatus.textContent = "Please fill in all required fields.";
            formStatus.className = "form-status mono is-error";
          }
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          if (formStatus) {
            formStatus.textContent = "Please enter a valid email address.";
            formStatus.className = "form-status mono is-error";
          }
          return;
        }

        const mailSubject = encodeURIComponent(`[${inquiry || 'Inquiry'}] ${subject} - from ${name}`);
        const mailBody = encodeURIComponent(
          `Hi Md. Moniruzzaman Rifat,\n\n${message}\n\n---\nSender Details:\nName: ${name}\nEmail: ${email}\nInquiry Type: ${inquiry || 'N/A'}\nTimeline: ${timeline}\nSend Copy Requested: ${sendCopy ? 'Yes' : 'No'}`
        );

        const mailtoUrl = `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`;

        if (formStatus) {
          formStatus.textContent = "Opening your email client...";
          formStatus.className = "form-status mono is-success";
        }

        window.location.href = mailtoUrl;

        setTimeout(() => {
          if (formStatus) {
            formStatus.textContent = "Email draft prepared! You can also copy my email directly.";
          }
        }, 1200);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Theme Toggle (Light Warm Paper <-> Dark Warm Obsidian)
  // ---------------------------------------------------------------------------
  const themeBtn = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("icon-sun");
  const moonIcon = document.getElementById("icon-moon");

  const THEME_KEY = "portfolio-theme-v2";

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
  }

  function setTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) {
      localStorage.setItem(THEME_KEY, theme);
    }

    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === "dark" ? "block" : "none";
      moonIcon.style.display = theme === "dark" ? "none" : "block";
    }
    if (themeBtn) {
      themeBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark", true);
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // ---------------------------------------------------------------------------
  // 3. Live Local Clock
  // ---------------------------------------------------------------------------
  const clockEl = document.getElementById("live-clock");

  function updateClock() {
    if (!clockEl) return;
    const tz = config.timezone || "Asia/Dhaka";
    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      clockEl.textContent = formatter.format(new Date());
    } catch {
      clockEl.textContent = new Date().toLocaleTimeString();
    }
  }

  // ---------------------------------------------------------------------------
  // 4. One-Click Copy Email
  // ---------------------------------------------------------------------------
  const copyBtn = document.getElementById("copy-email-btn");
  const emailLabel = document.getElementById("email-label");
  let copyTimer = null;

  async function copyEmail() {
    if (!copyBtn || !emailLabel) return;
    const email = config.email || "hello@example.com";

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for non-HTTPS or older environments
      const temp = document.createElement("textarea");
      temp.value = email;
      temp.setAttribute("readonly", "");
      temp.style.position = "absolute";
      temp.style.left = "-9999px";
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
    }

    copyBtn.classList.add("is-copied");
    emailLabel.textContent = "Copied to clipboard";

    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copyBtn.classList.remove("is-copied");
      emailLabel.textContent = email;
    }, 2200);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", copyEmail);
  }

  // ---------------------------------------------------------------------------
  // 5. Mobile Navigation Drawer
  // ---------------------------------------------------------------------------
  const menuBtn = document.getElementById("menu-toggle");
  const drawer = document.getElementById("mobile-drawer");

  function setDrawerState(open) {
    if (!menuBtn || !drawer) return;
    drawer.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }

  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", () => {
      const isOpen = drawer.classList.contains("is-open");
      setDrawerState(!isOpen);
    });

    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setDrawerState(false));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) setDrawerState(false);
    });
  }

  // ---------------------------------------------------------------------------
  // 5b. Floating Architectural Dock — Sliding Active Indicator
  // ---------------------------------------------------------------------------
  const dockTrack = document.getElementById("dock-track");
  const dockIndicator = document.getElementById("dock-indicator");
  const dockLinks = Array.from(document.querySelectorAll(".dock-link"));
  const drawerLinks = Array.from(document.querySelectorAll(".drawer-link"));

  function moveDockIndicator(targetLink, animate) {
    if (!dockTrack || !dockIndicator || !targetLink) return;
    if (!animate) {
      dockIndicator.style.transition = "none";
    } else {
      dockIndicator.style.transition = "";
    }

    dockIndicator.style.width = `${targetLink.offsetWidth}px`;
    dockIndicator.style.transform = `translateX(${targetLink.offsetLeft}px)`;
    dockIndicator.classList.add("is-ready");

    if (!animate) {
      // Force layout flush before re-enabling transitions
      void dockIndicator.offsetWidth;
      dockIndicator.style.transition = "";
    }
  }

  function setActiveNavItem(label) {
    dockLinks.forEach((link) => {
      const match = link.textContent.trim() === label;
      link.classList.toggle("is-active", match);
      if (match) {
        link.setAttribute("aria-current", "page");
        moveDockIndicator(link, true);
      } else {
        link.removeAttribute("aria-current");
      }
    });

    drawerLinks.forEach((link) => {
      const match = link.textContent.trim() === label;
      link.classList.toggle("is-active", match);
      if (match) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if (dockTrack && dockIndicator && dockLinks.length) {
    const initialActive =
      dockLinks.find((l) => l.classList.contains("is-active")) || dockLinks[0];

    moveDockIndicator(initialActive, false);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        const currentActive =
          dockLinks.find((l) => l.classList.contains("is-active")) || dockLinks[0];
        moveDockIndicator(currentActive, false);
      });
    }

    dockLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setActiveNavItem(link.textContent.trim());
      });
    });

    drawerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setActiveNavItem(link.textContent.trim());
      });
    });

    window.addEventListener("resize", () => {
      const currentActive =
        dockLinks.find((l) => l.classList.contains("is-active")) || dockLinks[0];
      moveDockIndicator(currentActive, false);
    });
  }

  // ---------------------------------------------------------------------------
  // 6. Keyboard Shortcuts (T = Theme, C = Copy Email, Esc = Close Menu)
  // ---------------------------------------------------------------------------
  document.addEventListener("keydown", (event) => {
    const tag = event.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || event.target.isContentEditable) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    const key = event.key.toLowerCase();
    if (key === "t") {
      toggleTheme();
    } else if (key === "c") {
      copyEmail();
    } else if (key === "escape") {
      setDrawerState(false);
      closeProjectModal();
    }
  });

  // ---------------------------------------------------------------------------
  // 7. Interactive Button Hover Physics (Subtle Magnetic Pull, Zero Glare)
  // ---------------------------------------------------------------------------
  const interactiveButtons = document.querySelectorAll(".btn-primary, .btn-secondary");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (hasFinePointer && !prefersReducedMotion) {
    interactiveButtons.forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const offsetX = ((x / rect.width) - 0.5) * 4;
        const offsetY = ((y / rect.height) - 0.5) * 3;

        btn.style.setProperty("--tx", `${offsetX.toFixed(2)}px`);
        btn.style.setProperty("--ty", `${offsetY.toFixed(2)}px`);
      });

      btn.addEventListener("pointerleave", () => {
        btn.style.setProperty("--tx", "0px");
        btn.style.setProperty("--ty", "0px");
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 8. Scroll Reveal & Section Scroll-Spy for Floating Dock
  // ---------------------------------------------------------------------------
  function initScrollEffects() {
    const revealEls = document.querySelectorAll(".reveal-on-scroll");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -30px 0px" }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
    }

    // Sync floating dock indicator precisely when scrolling between sections
    const sectionMap = [
      { el: document.getElementById("top"), label: "Home" },
      { el: document.getElementById("education"), label: "Education" },
      { el: document.getElementById("skills"), label: "Skills" },
      { el: document.getElementById("projects"), label: "Projects" },
      { el: document.getElementById("contact"), label: "Contact" }
    ].filter((item) => item.el);

    function updateActiveSection() {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. If at the very top of the page, activate Home
      if (scrollY < 120) {
        setActiveNavItem("Home");
        return;
      }

      // 2. If scrolled near the bottom, activate Contact
      if (scrollY + windowHeight >= docHeight - 80) {
        if (document.getElementById("contact")) {
          setActiveNavItem("Contact");
          return;
        }
      }

      // 3. Find the current active section (target viewing offset ~180px from top)
      const targetOffset = 180;
      let active = sectionMap[0];

      for (let i = 0; i < sectionMap.length; i++) {
        const item = sectionMap[i];
        const rect = item.el.getBoundingClientRect();
        if (rect.top <= targetOffset) {
          active = item;
        }
      }

      if (active) {
        setActiveNavItem(active.label);
      }
    }

    let scrollTicking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          window.requestAnimationFrame(() => {
            updateActiveSection();
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      },
      { passive: true }
    );

    updateActiveSection();
  }

  // Initialize
  applyConfig();
  setTheme(getPreferredTheme());
  updateClock();
  setInterval(updateClock, 1000);
  initScrollEffects();
})();
