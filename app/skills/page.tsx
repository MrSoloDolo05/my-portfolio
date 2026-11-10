import Link from "next/link";

const skillGroups = [
  {
    name: "Frontend Development",
    code: "SKILL_SET_01",
    skills: [
      {
        name: "HTML5",
        description:
          "Portfolio pages use semantic elements such as main, header, nav, section, and article.",
        evidence: [
          {
            label: "PORTFOLIO PAGE SOURCE",
            href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/app/page.tsx",
          },
        ],
      },
      {
        name: "CSS3",
        description:
          "The portfolio defines custom CSS variables, page themes, and reusable interface styles.",
        evidence: [
          {
            label: "PORTFOLIO STYLES",
            href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/app/globals.css",
          },
        ],
      },
      {
        name: "JavaScript",
        description:
          "THE BOX uses JavaScript modules for its application interface and behavior.",
        evidence: [
          {
            label: "THE BOX APP SOURCE",
            href: "https://github.com/MrSoloDolo05/THE-BOX/blob/c7e336064b1d47f1b044d3f3fc1d8fca98ccf03a/the-box/thebox/js/app.js",
          },
        ],
      },
      {
        name: "TypeScript",
        description:
          "The portfolio uses TypeScript for route components and typed Supabase data.",
        evidence: [
          {
            label: "PROJECT DATABASE TYPES",
            href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/src/lib/supabase/types/database.ts",
          },
        ],
      },
      {
        name: "React",
        description:
          "The portfolio is built with React components, including its project-management interface.",
        evidence: [
          {
            label: "PORTFOLIO REPOSITORY",
            href: "https://github.com/MrSoloDolo05/my-portfolio",
          },
        ],
      },
      {
        name: "Next.js",
        description:
          "The portfolio uses the Next.js App Router, including a dynamic project detail route.",
        evidence: [
          {
            label: "DYNAMIC PROJECT ROUTE",
            href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/app/projects/%5Bslug%5D/page.tsx",
          },
          {
            label: "LIVE PORTFOLIO",
            href: "https://my-portfolio-mauve-iota-25.vercel.app/",
          },
        ],
      },
      {
        name: "Tailwind CSS",
        description:
          "Portfolio pages use Tailwind utility classes for layout, spacing, and responsive presentation.",
        evidence: [
          {
            label: "PORTFOLIO PAGE SOURCE",
            href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/app/projects/page.tsx",
          },
        ],
      },
      {
        name: "Responsive Web Design",
        description:
          "Portfolio layouts use responsive breakpoints and flexible grids across page sizes.",
        evidence: [
          {
            label: "RESPONSIVE PAGE SOURCE",
            href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/app/contact/page.tsx",
          },
          {
            label: "LIVE PORTFOLIO",
            href: "https://my-portfolio-mauve-iota-25.vercel.app/",
          },
        ],
      },
    ],
  },
  {
    name: "Backend & Data",
    code: "SKILL_SET_02",
    skills: [
      {
        name: "Firebase Authentication",
        description:
          "THE BOX observes Firebase auth state and supports manual Google sign-in and sign-out.",
        evidence: [
          {
            label: "FIREBASE AUTH AND SYNC",
            href: "https://github.com/MrSoloDolo05/THE-BOX/blob/c7e336064b1d47f1b044d3f3fc1d8fca98ccf03a/the-box/thebox/js/sync.js",
          },
        ],
      },
      {
        name: "Cloud Firestore",
        description:
          "THE BOX syncs a per-user state document with Firestore and listens for document updates.",
        evidence: [
          {
            label: "FIRESTORE SYNC",
            href: "https://github.com/MrSoloDolo05/THE-BOX/blob/c7e336064b1d47f1b044d3f3fc1d8fca98ccf03a/the-box/thebox/js/sync.js",
          },
          {
            label: "FIRESTORE RULES",
            href: "https://github.com/MrSoloDolo05/THE-BOX/blob/c7e336064b1d47f1b044d3f3fc1d8fca98ccf03a/the-box/thebox/firestore.rules",
          },
        ],
      },
      {
        name: "Supabase",
        description:
          "The portfolio reads project records from Supabase and uses it for protected project administration.",
        evidence: [
          {
            label: "SUPABASE PROJECT QUERY",
            href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/app/projects/page.tsx",
          },
          {
            label: "LIVE PORTFOLIO",
            href: "https://my-portfolio-mauve-iota-25.vercel.app/",
          },
        ],
      },
      {
        name: "Database Management",
        description:
          "THE BOX manages structured local application state, import/export backups, and cloud synchronization.",
        evidence: [
          {
            label: "THE BOX DATABASE MODULE",
            href: "https://github.com/MrSoloDolo05/THE-BOX/blob/c7e336064b1d47f1b044d3f3fc1d8fca98ccf03a/the-box/thebox/js/database.js",
          },
          {
            label: "FIREBASE SYNC",
            href: "https://github.com/MrSoloDolo05/THE-BOX/blob/c7e336064b1d47f1b044d3f3fc1d8fca98ccf03a/the-box/thebox/js/sync.js",
          },
        ],
      },
      {
        name: "SQL",
        description:
          "The portfolio migration defines a PostgreSQL function that updates project display order.",
        evidence: [
          {
            label: "PROJECT ORDERING MIGRATION",
            href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/supabase/migrations/001_projects_ordering.sql",
          },
        ],
      },
      {
        name: "API Integration",
        description:
          "Project data is queried through the Supabase client, while THE BOX integrates Firebase Auth and Firestore APIs.",
        evidence: [
          {
            label: "SUPABASE PROJECT QUERY",
            href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/app/projects/page.tsx",
          },
          {
            label: "FIREBASE INTEGRATION",
            href: "https://github.com/MrSoloDolo05/THE-BOX/blob/c7e336064b1d47f1b044d3f3fc1d8fca98ccf03a/the-box/thebox/js/sync.js",
          },
        ],
      },
    ],
  },
  {
    name: "Development Practices",
    code: "SKILL_SET_03",
    skills: [
      {
        name: "Git & GitHub",
        description:
          "Both projects are maintained in public GitHub repositories with inspectable source and commit history.",
        evidence: [
          {
            label: "PORTFOLIO REPOSITORY",
            href: "https://github.com/MrSoloDolo05/my-portfolio",
          },
          {
            label: "THE BOX REPOSITORY",
            href: "https://github.com/MrSoloDolo05/THE-BOX",
          },
        ],
      },
      {
        name: "Debugging",
        description:
          "A documented sync issue involved repeated follow-up pushes; a later commit also addressed transaction concurrency with a test harness.",
        evidence: [
          {
            label: "FOLLOW-UP PUSH FIX",
            href: "https://github.com/MrSoloDolo05/THE-BOX/commit/135aeed6ee24be4033a757dd659785e528eeac32",
          },
          {
            label: "SYNC CONCURRENCY FIX",
            href: "https://github.com/MrSoloDolo05/THE-BOX/commit/6d1a1b683bb0aa5532fa971ab037db676a96715f",
          },
        ],
      },
      {
        name: "Authentication & Access Control",
        description:
          "THE BOX rules limit access to each signed-in user’s own Firestore document; the portfolio also guards its admin route.",
        evidence: [
          {
            label: "FIRESTORE ACCESS RULES",
            href: "https://github.com/MrSoloDolo05/THE-BOX/blob/c7e336064b1d47f1b044d3f3fc1d8fca98ccf03a/the-box/thebox/firestore.rules",
          },
          {
            label: "PORTFOLIO ADMIN GUARD",
            href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/app/admin/%28protected%29/auth-guard-server.tsx",
          },
        ],
      },
    ],
  },
];

export default function SkillsPage() {
  const skillCount = skillGroups.reduce(
    (total, group) => total + group.skills.length,
    0
  );

  return (
    <main className="era-projects min-h-screen bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="retro-panel overflow-hidden rounded-xl">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4">
            <Link href="/" aria-label="Home" className="flex items-center gap-3">
              <span className="h-3 w-3 bg-[var(--accent)]" />
              <span className="font-mono text-sm font-bold tracking-widest text-[var(--accent)]">
                PERSONAL_ARCHIVE
              </span>
            </Link>

            <nav
              aria-label="Main navigation"
              className="flex flex-wrap gap-5 font-mono text-xs sm:gap-7 sm:text-sm"
            >
              <Link
                href="/"
                className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                HOME
              </Link>
              <Link
                href="/projects"
                className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                PROJECTS
              </Link>
              <Link
                href="/skills"
                aria-current="page"
                className="text-[var(--accent)]"
              >
                SKILLS
              </Link>
              <Link
                href="/about"
                className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                ABOUT
              </Link>
              <Link
                href="/contact"
                className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                CONTACT
              </Link>
            </nav>
          </header>

          <section className="border-b border-[var(--border)] px-6 py-12 sm:px-10 sm:py-16">
            <p className="retro-label mb-5 text-[var(--accent)]">
              DIRECTORY_03 / SKILL EVIDENCE
            </p>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  Skills<span className="text-[var(--accent)]">.</span>
                </h1>
                <p className="mt-5 max-w-2xl leading-7 text-[var(--muted)] sm:text-lg">
                  A skills index linked to project source, deployments, and
                  specific development examples.
                </p>
              </div>
              <div className="retro-panel-raised shrink-0 p-4">
                <p className="retro-label text-[#7c92a4]">
                  EVIDENCE INDEX
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[var(--accent)]">
                  {String(skillCount).padStart(2, "0")} SKILLS
                </p>
              </div>
            </div>
          </section>

          <div className="space-y-10 px-6 py-8 sm:px-10 sm:py-10">
            {skillGroups.map((group) => (
              <section key={group.code} aria-labelledby={group.code}>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
                  <div>
                    <p className="retro-label mb-2 text-[var(--accent)]">
                      {group.code}
                    </p>
                    <h2
                      id={group.code}
                      className="text-2xl font-bold sm:text-3xl"
                    >
                      {group.name}
                    </h2>
                  </div>
                  <span className="retro-chip">
                    {String(group.skills.length).padStart(2, "0")} ENTRIES
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {group.skills.map((skill, index) => (
                    <article
                      key={skill.name}
                      className="retro-panel-raised flex flex-col p-5 sm:p-6"
                    >
                      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                        <span className="retro-label text-[var(--accent)]">
                          SKILL_{String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="retro-chip">EVIDENCE LINKED</span>
                      </div>
                      <h3 className="mt-5 text-xl font-bold">{skill.name}</h3>
                      <p className="mt-3 flex-1 leading-7 text-[var(--muted)]">
                        {skill.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-[var(--border)] pt-4">
                        {skill.evidence.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-[var(--accent)] transition-colors hover:underline"
                          >
                            {item.label} ↗
                          </a>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="border-t border-[var(--border)] px-6 py-7 sm:px-10">
            <p className="retro-label text-[var(--accent)]">
              END_OF_SKILL_INDEX
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="border border-[var(--border)] px-5 py-3 font-mono text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                ← VIEW PROJECTS
              </Link>
              <Link
                href="/contact"
                className="border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 font-mono text-sm font-bold text-[#09121d] transition hover:bg-transparent hover:text-[var(--accent)]"
              >
                CONTACT ↗
              </Link>
            </div>
          </section>

          <footer className="flex flex-wrap justify-between gap-3 border-t border-[var(--border)] px-6 py-4 font-mono text-[10px] text-[var(--subtle)] sm:px-10">
            <span>PERSONAL ARCHIVE / SKILLS</span>
            <span>ENTRIES: {skillCount}</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
