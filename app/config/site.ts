export const siteConfig = {
  name: "Your Name",
  role: "Software Engineer",
  description:
    "A bilingual software engineering portfolio built with Remix, React, Three.js, Tailwind CSS, and Framer Motion.",
  social: {
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-username/",
  },
  // Add public/resume.pdf and change this value to "/resume.pdf" to enable
  // the résumé viewer and download button.
  resumePath: null as string | null,
  resumeDownloadName: "resume",
} as const;
