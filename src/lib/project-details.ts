export type ProjectDetailSection = {
  heading: string;
  content: string;
};

export type ProjectCaseStudy = {
  role: string;
  roleDescription: string;
  problem: string;
  technologies: string[];
  features: { name: string; description: string }[];
  screenshots: { src: string; alt: string; caption: string }[];
  technicalHighlights: { heading: string; content: string }[];
  challenges: string[];
  lessons: string[];
  futureImprovements: string[];
  liveUrl: string;
  repositoryUrl: string;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  projectCode: string;
  detailType: "CASE_STUDY" | "PROJECT_RECORD";
  introduction: string;
  sections: ProjectDetailSection[];
  caseStudy?: ProjectCaseStudy;
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "the-box",
    title: "THE BOX",
    projectCode: "PROJECT_001",
    detailType: "CASE_STUDY",
    introduction:
      "A personal songwriting workspace for capturing lyric ideas, organising verses, and developing songs. Built with JavaScript and Firebase, it combines local-first storage with cloud synchronisation.",
    sections: [
      {
        heading: "Project overview",
        content:
          "THE BOX brings songwriting materials into one workspace. It addresses the challenge of keeping song drafts, standalone lines, verses, and early ideas organised and easy to return to while a song is developing.",
      },
    ],
    caseStudy: {
      role: "Project Creator & Developer (AI-assisted development)",
      roleDescription:
        "AI tools were used extensively to generate code, assist with implementation, and troubleshoot problems. I directed development, defined requirements and functionality, reviewed generated changes, tested the application, and guided its refinement. I do not present the implementation as independently authored code.",
      problem:
        "Songwriting can produce material in different forms, from a quick line or phrase to a longer verse or a song in progress. THE BOX provides a dedicated place to capture those ideas, organise them, find them again, and continue developing them.",
      technologies: [
        "HTML5",
        "CSS3",
        "Vanilla JavaScript",
        "Firebase Authentication",
        "Cloud Firestore",
        "Browser Local Storage",
        "Datamuse API",
        "Web App Manifest",
        "Firebase Hosting",
      ],
      features: [
        {
          name: "CRATE",
          description:
            "Organise songs into folders and manage recently opened songs.",
        },
        {
          name: "ONE LINERS",
          description:
            "Capture and manage individual lyric ideas and longer verses.",
        },
        {
          name: "RED ROOM",
          description:
            "A dedicated songwriting environment for developing songs.",
        },
        {
          name: "SEARCH",
          description:
            "Search across songs, lyrics, lines, verses, and folders.",
        },
        {
          name: "TRASH",
          description:
            "Restore removed content or permanently delete it.",
        },
        {
          name: "Rhyme Finder",
          description:
            "Find rhymes using an offline dictionary and online Datamuse integration.",
        },
        {
          name: "Idea Helper",
          description:
            "Use songwriting prompts and creative inspiration to get started.",
        },
        {
          name: "Import and export",
          description:
            "Import supported content and export a complete JSON backup.",
        },
        {
          name: "Google sign-in and cloud sync",
          description:
            "Sign in with Google and synchronise user data through Firebase.",
        },
      ],
      screenshots: [
        {
          src: "/the-box/the%20box%20Crate.png",
          alt: "THE BOX Crate workspace showing its navigation, folders, songs area, and import and export controls.",
          caption:
            "CRATE — the main workspace for organising folders and songs.",
        },
        {
          src: "/the-box/the%20box%20one%20liners.png",
          alt: "THE BOX One Liners screen with line and verse tabs, an entry field, and usage filters.",
          caption:
            "ONE LINERS — capture a lyric line or work with longer verses.",
        },
        {
          src: "/the-box/the%20box%20red%20room.png",
          alt: "THE BOX Red Room editor showing a song title and a verse writing area.",
          caption:
            "RED ROOM — a focused space for developing a song draft.",
        },
        {
          src: "/the-box/the%20box%20seacrch.png",
          alt: "THE BOX Search screen with a field for searching songs, lyrics, and lines.",
          caption:
            "SEARCH — locate material across the songwriting workspace.",
        },
        {
          src: "/the-box/the%20box%20trash.png",
          alt: "THE BOX Trash screen for reviewing and managing deleted items.",
          caption:
            "TRASH — review items that can be restored or permanently removed.",
        },
        {
          src: "/the-box/The%20Box%20Intro.png",
          alt: "THE BOX sign-in screen displaying the project name and Google sign-in option.",
          caption:
            "Sign-in screen — Google sign-in is available for cloud features.",
        },
      ],
      technicalHighlights: [
        {
          heading: "Local-first storage",
          content:
            "Application data is stored in browser Local Storage, so the workspace can remain usable without depending on an active cloud connection.",
        },
        {
          heading: "Cloud synchronisation",
          content:
            "Firebase Firestore synchronises user data across devices when cloud access is available.",
        },
        {
          heading: "Conflict-aware updates",
          content:
            "Synchronisation compares local data, cloud data, and previous sync state rather than treating every update as a full overwrite. Deletion tracking helps prevent removed records from reappearing.",
        },
        {
          heading: "Protecting active writing",
          content:
            "RED ROOM protects active writing from being unintentionally overwritten by incoming sync changes.",
        },
        {
          heading: "User-scoped Firestore access",
          content:
            "Firestore security rules restrict access to each authenticated user's own data. This describes the configured rules and is not a claim of a complete security audit.",
        },
      ],
      challenges: [
        "Maintaining consistency between local and cloud data.",
        "Handling simultaneous changes and synchronisation conflicts.",
        "Protecting active writing during incoming updates.",
      ],
      lessons: [
        "AI-generated code needs to be evaluated and tested rather than accepted without review.",
      ],
      futureImprovements: [
        "More extensive simultaneous-edit and multi-device testing.",
        "Improve search relevance and ranking.",
        "Expand the offline rhyme dictionary.",
        "Improve import parsing for section headings.",
        "Dedicated mobile responsiveness testing.",
        "Accessibility audit and usability improvements.",
        "Broader functional, regression, and edge-case testing.",
      ],
      liveUrl: "https://the-box-6ce7b.web.app/#view=crate",
      repositoryUrl: "https://github.com/MrSoloDolo05/THE-BOX",
    },
  },
  {
    slug: "my-portfolio",
    title: "My Portfolio",
    projectCode: "PROJECT_002",
    detailType: "PROJECT_RECORD",
    introduction:
      "Placeholder: add a verified introduction to the My Portfolio project.",
    sections: [
      {
        heading: "Project details",
        content:
          "Placeholder: add verified details about this project.",
      },
    ],
  },
  {
    slug: "reviewall",
    title: "ReviewALL",
    projectCode: "PROJECT_003",
    detailType: "PROJECT_RECORD",
    introduction:
      "Placeholder: add a verified introduction to the ReviewALL project.",
    sections: [
      {
        heading: "Project details",
        content:
          "Placeholder: add verified details about this project.",
      },
    ],
  },
];
