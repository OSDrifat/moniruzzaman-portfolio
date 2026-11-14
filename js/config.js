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
      }
    ]
  }
};
