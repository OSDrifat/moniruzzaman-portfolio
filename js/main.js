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

    // Sync floating dock indicator when scrolling between sections
    const sectionMap = [
      { el: document.getElementById("top"), label: "Home" },
      { el: document.getElementById("education"), label: "Education" },
      { el: document.getElementById("skills"), label: "Skills" },
      { el: document.getElementById("projects"), label: "Projects" }
    ].filter((item) => item.el);

    if (sectionMap.length && "IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const found = sectionMap.find((item) => item.el === entry.target);
            if (found) setActiveNavItem(found.label);
          });
        },
        { rootMargin: "-35% 0px -45% 0px", threshold: 0 }
      );
      sectionMap.forEach((item) => sectionObserver.observe(item.el));
    }
  }

  // Initialize
  applyConfig();
  setTheme(getPreferredTheme());
  updateClock();
  setInterval(updateClock, 1000);
  initScrollEffects();
})();
