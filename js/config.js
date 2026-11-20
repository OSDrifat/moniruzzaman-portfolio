/**
 * Centralized Portfolio Content Config
 * Update your personal details here — the Home page will update automatically.
 */
window.SITE_CONFIG = {
  brandName: "Moniruzzaman",
  fullName: "Md. Moniruzzaman Rifat",
  brandTag: "PORTFOLIO",
  focus: "Software Quality Assurance & Testing",
  role: "Software Quality Assurance Engineer",
  location: "Dhaka, BD",
  timezone: "Asia/Dhaka",
  availability: "Available for projects",

  // Headline supports custom editorial lockup spans
  headlineHTML:
    '<span class="headline-kicker">I am</span>' +
    '<span class="headline-main">Md. Moniruzzaman</span>' +
    '<span class="headline-accent">' +
      '<span class="corner tl" aria-hidden="true"></span>' +
      '<span class="corner tr" aria-hidden="true"></span>' +
      '<span class="corner bl" aria-hidden="true"></span>' +
      '<span class="corner br" aria-hidden="true"></span>' +
      'Rifat' +
    '</span>',
  bio: "Focused on catching edge cases early, structuring reliable test plans, and ensuring software ships cleanly. Working across manual testing, API validation, and test automation.",

  email: "rifat.cse.dev@gmail.com",
  resumeUrl: "#",

  // Set portraitUrl to an image path (e.g., "./assets/portrait.png") once ready.
  // Leave empty ("") to show the clean typographic monogram frame.
  portraitUrl: "./assets/portrait.png",
  portraitMonogram: "M.",

  currently: "Software Quality Assurance & Testing",
  coreStack: "Manual Testing · API Testing · Test Automation · Bug Tracking",

  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    x: "https://x.com"
  },

  // ---------------------------------------------------------------------------
  // Education Section (Replace placeholder entries with your exact academic info)
  // ---------------------------------------------------------------------------
  educationSection: {
    eyebrow: "01 / Education",
    titleHTML: "Academic <em>Background</em>",
    entries: [
      {
        index: "01",
        degree: "B.Sc. in Computer Science & Engineering",
        institution: "Daffodil International University",
        location: "Dhaka, Bangladesh",
        period: "2023 — 2026",
        result: "Ongoing",
        ongoing: true,
        summary:
          "Core focus on Software Engineering, Database Management Systems, Data Structures, and Algorithms.",
        highlights: ["Software Engineering", "DBMS", "Data Structures", "Java"]
      },
      {
        index: "02",
        degree: "Higher Secondary Certificate (HSC) — Science",
        institution: "Border Guard Public School And College",
        location: "CO Bazar, Rangpur",
        period: "2019 — 2020",
        result: "GPA: 5.00 / 5.00",
        summary:
          "Completed higher secondary studies in Science with a focus on Mathematics, Physics, and ICT.",
        highlights: ["Science Group", "Higher Math", "ICT"]
      },
      {
        index: "03",
        degree: "Secondary School Certificate (SSC) — Science",
        institution: "Bir Uttam Shaheed Samad School & College",
        location: "Rangpur, Bangladesh",
        period: "2017 — 2018",
        result: "GPA: 5.00 / 5.00",
        summary:
          "Completed secondary education in the Science track with strong grounding in Mathematics and Science.",
        highlights: ["Science Group", "Mathematics"]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Skills Section (Edit tools, languages, and QA areas to match your exact stack)
  // ---------------------------------------------------------------------------
  skillsSection: {
    eyebrow: "02 / Capabilities",
    titleHTML: "Testing &amp; <em>Technical Stack</em>",
    filters: [
      { id: "all", label: "All" },
      { id: "qa", label: "QA & Testing" },
      { id: "code", label: "Code & Tools" }
    ],
    categories: [
      {
        index: "01",
        filter: "qa",
        title: "QA & Manual Testing",
        badge: "Core QA",
        items: [
          { name: "Test Planning & STLC", note: "SRS analysis & test strategy" },
          { name: "Test Case Design", note: "Boundary & equivalence checks" },
          { name: "Regression & Smoke Testing", note: "Release confidence checks" },
          { name: "Exploratory Testing", note: "Edge-case discovery" },
          { name: "Bug Reporting & Lifecycle", note: "Clear steps & severity triage" }
        ]
      },
      {
        index: "02",
        filter: "code",
        title: "Programming & Databases",
        badge: "Engineering",
        items: [
          { name: "C", note: "Structured programming & logic" },
          { name: "Java", note: "OOP & test scripting" },
          { name: "JavaScript", note: "DOM logic & web debugging" },
          { name: "SQL / MySQL", note: "Data integrity & query checks" },
          { name: "HTML5 & CSS3", note: "UI structure & layout checks" }
        ]
      },
      {
        index: "03",
        filter: "code",
        title: "Dev Tools & Workflow",
        badge: "Workflow",
        items: [
          { name: "Git & GitHub", note: "Version control & PR review" },
          { name: "VS Code", note: "Code editing & debugging" }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // Projects Section (Replace placeholders with your exact projects & links)
  // ---------------------------------------------------------------------------
  projectsSection: {
    eyebrow: "03 / Selected Work",
    titleHTML: "Projects &amp; <em>Case Studies</em>",
    filters: [
      { id: "all", label: "All" },
      { id: "qa", label: "QA & Testing" },
      { id: "dev", label: "AI & Development" }
    ],
    items: [
      {
        index: "01",
        filter: "qa",
        category: "SQA Case Study",
        year: "2026",
        featured: true,
        previewType: "qa-report",
        imageUrl: "./assets/projects/skybound-jira.png",
        gallery: [
          {
            label: "01 · KAN-6 Bug",
            src: "./assets/projects/skybound-jira.png",
            caption: "KAN-6 / BUG-001 — System crashes during seat booking at midnight (High Severity, Low Priority)"
          },
          {
            label: "02 · KAN-5 Bug",
            src: "./assets/projects/skybound-jira-kan5.png",
            caption: "KAN-5 / BUG-002 — Airline name misspelled on dashboard (Low Severity, High Priority)"
          },
          {
            label: "03 · Re-Test Log",
            src: "./assets/projects/skybound-jira-retest.png",
            caption: "BUG-001 Re-Test Comment — Closing verified crash fix & logging linked confirmation email issue"
          }
        ],
        title: "SkyBound Airways — SQA Testing & Defect Lifecycle",
        tagline:
          "Requirements Traceability Matrix (RTM), Positive/Negative/Boundary test design, severity vs. priority bug analysis, and Jira defect tracking for a flight booking system.",
        problem:
          "An airline reservation workflow covering passport/security holds, 10-minute seat locks, 200-seat standby limits, and admin emergency overrides needed formal verification and structured defect triage.",
        solution:
          "Mapped REQ-01 to REQ-04 in an RTM (TS-01 to TS-04), authored 6 positive, negative, and boundary test cases (TC-01 to TC-06), documented BUG-001 (High Severity / Low Priority) and BUG-002 (Low Severity / High Priority) in Jira, and executed re-testing with linked-bug workflow triage.",
        deliverables: [
          "Requirements Traceability Matrix (REQ-01 – REQ-04)",
          "6 Positive, Negative & Boundary Test Cases",
          "Severity vs. Priority Matrix (BUG-001, BUG-002)",
          "6-Stage Defect Lifecycle & Jira Re-Testing"
        ],
        tags: ["Manual Testing", "RTM", "Test Cases", "Bug Reporting", "Jira"],
        githubUrl: "",
        liveUrl: ""
      },
      {
        index: "02",
        filter: "dev",
        category: "Deep Learning & XAI",
        year: "2026",
        featured: false,
        previewType: "ai-xray",
        imageUrl: "assets/projects/xai-dashboard.png",
        gallery: [
          {
            label: "Streamlit XAI UI",
            src: "assets/projects/xai-dashboard.png",
            canvasBg: "#080a0f",
            caption:
              "Interactive Streamlit clinical dashboard displaying chest X-ray upload validation, Grad-CAM++ heatmap overlay, confidence score, and clinical PDF report export."
          },
          {
            label: "System Workflow",
            src: "assets/projects/xai-workflow.png",
            caption:
              "End-to-end framework pipeline: SSIM OOD input validation, 224x224 preprocessing, DenseNet121/ResNet50/EfficientNet-B0 backbones, CBAM, multi-XAI engine, and ReportLab PDF export."
          },
          {
            label: "HybridTBPredictor",
            src: "assets/projects/xai-architecture.png",
            caption:
              "HybridTBPredictor neural architecture combining CNN feature extraction with sequential Channel & Spatial Attention (CBAM) and a regularized 3-class classification head."
          },
          {
            label: "Methodology",
            src: "assets/projects/xai-methodology.png",
            caption:
              "Overall research pipeline covering metadata verification, perceptual-hash deduplication, leakage-safe splits across 13,959 scans, AdamW training, and XAI evaluation."
          }
        ],
        title:
          "A Hybrid Explainable AI Framework for Automatic Tuberculosis and Pneumonia Detection from Chest X-Ray Images Using Convolutional Neural Networks",
        tagline:
          "Multi-backbone CNN-CBAM framework trained on 13,959 chest X-ray scans (98.06% test accuracy, 98.18% sensitivity) with Grad-CAM, Grad-CAM++, Guided Backpropagation, Saliency Mapping, and OOD validation.",
        problem:
          "Standard single-branch chest X-ray classifiers behave like black boxes, struggle with subtle TB vs. Pneumonia overlaps, risk data leakage across splits, and produce high-confidence errors on non-radiological out-of-distribution inputs.",
        solution:
          "Built HybridTBPredictor (DenseNet121, ResNet50, EfficientNet-B0 + sequential CBAM channel & spatial attention) trained with AdamW and class-weighted loss on pHash-deduplicated data, paired with 4 XAI visualizers, SSIM OOD validation, a Streamlit dashboard, and an in-memory ReportLab clinical PDF generator.",
        deliverables: [
          "HybridTBPredictor: DenseNet121 (97.99%), ResNet50 (97.92%) & EfficientNet-B0 (98.06% Acc, 98.18% Sens) + CBAM",
          "13,959-Scan Curated CXR Dataset with Perceptual-Hash Deduplication (1,392 Hold-Out Test Set)",
          "Multi-Method XAI Engine: Grad-CAM, Grad-CAM++, Guided Backpropagation & Saliency Mapping",
          "SSIM Out-of-Distribution CXR Validator, Streamlit Web App & ReportLab Clinical PDF Generator"
        ],
        tags: ["PyTorch", "CBAM CNN", "Grad-CAM++", "Streamlit", "SSIM OOD"],
        githubUrl: "",
        liveUrl: ""
      },
      {
        index: "03",
        filter: "dev",
        category: "Computer Graphics · C++ / OpenGL",
        year: "2026",
        featured: false,
        previewType: "code-arch",
        imageUrl: "assets/projects/village-day.png",
        previewPosition: "center center",
        gallery: [
          {
            label: "Daytime Scene",
            src: "assets/projects/village-day.png",
            canvasBg: "#87cefa",
            caption:
              "Daytime animated riverside village rendered in OpenGL/GLUT featuring moving sun, drifting clouds, rotating windmill, tube well, walking villagers, and sailing boat."
          },
          {
            label: "Night & Solar Lamps",
            src: "assets/projects/village-night.png",
            canvasBg: "#0a0a28",
            caption:
              "Automatic day-to-night cycle transition with crescent moon, blinking stars, and illuminated solar streetlamps along the village fence."
          },
          {
            label: "Night Rain Mode",
            src: "assets/projects/village-night-rain.png",
            canvasBg: "#0a0a28",
            caption:
              "Interactive 200-particle rainfall simulation toggled via keyboard ('s'/'t'), paired with real-time boat zooming ('+'/'-'/'r')."
          }
        ],
        title: "Smart Village Scenario — 2D OpenGL Simulation",
        tagline:
          "Animated Bangladeshi riverside village built in C++ with OpenGL & GLUT, featuring DDA line drawing, Midpoint Circle rendering, day-to-night cycle, and interactive rain.",
        problem:
          "Required building a complete multi-object 2D animated scene from low-level OpenGL primitives, custom rasterization routines, and frame-by-frame motion without external game engines.",
        solution:
          "Implemented DDA line drawing, Midpoint Circle geometry, layered transformations, automatic sun/moon day-night transitions, blinking stars, solar lamps, and keyboard-controlled rain and boat scaling across a 1,133-line C++/GLUT application.",
        deliverables: [
          "Custom DDA Line & Midpoint Circle Rasterization Primitives",
          "Automated Sun/Moon Day-to-Night Cycle & Illuminated Solar Streetlamps",
          "Rotating Windmill Blades, Mechanical Gear & Multi-Speed Villager Animation",
          "Keyboard-Controlled 200-Particle Rain ('s'/'t') & Boat Scale ('+'/'-'/'r')"
        ],
        tags: ["C++", "OpenGL", "GLUT", "Computer Graphics"],
        githubUrl: "",
        liveUrl: ""
      }
    ]
  }
};

