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
  }
};
