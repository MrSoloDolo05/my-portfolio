
import Link from "next/link";

const skills = [
  {
    name: "JavaScript",
    type: "LANGUAGE",
    href: "https://github.com/MrSoloDolo05/THE-BOX/blob/c7e336064b1d47f1b044d3f3fc1d8fca98ccf03a/the-box/thebox/js/app.js",
    label: "THE BOX APP SOURCE",
  },
  {
    name: "TypeScript",
    type: "LANGUAGE",
    href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/src/lib/supabase/types/database.ts",
    label: "PROJECT DATABASE TYPES",
  },
  {
    name: "React",
    type: "FRAMEWORK",
    href: "https://github.com/MrSoloDolo05/my-portfolio",
    label: "PORTFOLIO REPOSITORY",
  },
  {
    name: "Next.js",
    type: "FRAMEWORK",
    href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/app/projects/%5Bslug%5D/page.tsx",
    label: "DYNAMIC PROJECT ROUTE",
  },
  {
    name: "Supabase",
    type: "DATA",
    href: "https://github.com/MrSoloDolo05/my-portfolio/blob/main/app/projects/page.tsx",
    label: "SUPABASE PROJECT QUERY",
  },
];

export default function Home() {
  return (
    <main className="era-home min-h-screen bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="retro-panel overflow-hidden rounded-xl">
          {/* Header and navigation */}
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-3"
            >
              <span className="h-3 w-3 rounded-full bg-[var(--accent)]" />
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
                aria-current="page"
                className="text-[var(--accent)]"
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
                className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
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

          {/* Introduction */}
          <section className="grid gap-10 px-6 py-12 sm:px-10 sm:py-16 md:grid-cols-[1.4fr_0.6fr] md:items-center">
            <div>
              <p className="retro-label mb-5 text-[var(--accent)]">
                ENTRY_001 / PROFILE FOUND
              </p>

              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                Growing up with the{" "}
                <span className="retro-accent">future.</span>
              </h1>

              <p className="mt-6 max-w-xl leading-7 text-[var(--muted)] sm:text-lg">
                This is placeholder introduction text. It will eventually
                tell the story behind this portfolio and its connection
                to games, films, technology and the changing digital world.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 font-mono text-sm font-bold text-[#0a0d0b] transition hover:bg-transparent hover:text-[var(--accent)]"
                >
                  VIEW PROJECTS ↗
                </Link>

                <Link
                  href="/contact"
                  className="border border-[var(--border)] px-5 py-3 font-mono text-sm text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  CONTACT
                </Link>

                <a
                  href="/documents/Tyrone_Owen_CV.pdf"
                  download="Tyrone_Owen_CV.pdf"
                  className="border border-[var(--border)] px-5 py-3 font-mono text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  DOWNLOAD CV ↓
                </a>
              </div>
            </div>

            {/* Profile panel */}
            <aside
              aria-labelledby="profile-heading"
              className="retro-panel-raised p-5"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <h2
                  id="profile-heading"
                  className="retro-label text-[var(--muted)]"
                >
                  USER_PROFILE
                </h2>
                <span className="font-mono text-xs text-[var(--accent)]">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-5 py-5">
                <div>
                  <p className="retro-label text-[#7b8a7d]">
                    ROLE
                  </p>
                  <p className="mt-1 text-sm">Placeholder role</p>
                </div>

                <div>
                  <p className="retro-label text-[var(--subtle)]">
                    CURRENT FOCUS
                  </p>
                  <p className="mt-1 text-sm">Placeholder focus area</p>
                </div>

                <div>
                  <p className="retro-label text-[var(--subtle)]">
                    PROFILE STATUS
                  </p>
                  <p className="mt-1 text-sm text-[var(--accent)]">
                    WORK IN PROGRESS
                  </p>
                </div>
              </div>
            </aside>
          </section>

          {/* Achievement log */}
          <section className="border-t border-[var(--border)] px-6 py-8 sm:px-10">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="retro-label mb-2 text-[var(--accent)]">
                  / ACHIEVEMENT_LOG
                </p>
                <h2 className="text-2xl font-bold">
                  Skills and achievements
                </h2>
              </div>
              <span className="font-mono text-xs text-[var(--subtle)]">
                ITEMS_UNLOCKED: {skills.length}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill, index) => (
                <a
                  key={skill.name}
                  href={skill.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-panel-raised flex items-center gap-3 p-4 transition-colors hover:border-[var(--accent)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--border)] font-mono text-sm text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <p className="font-semibold">{skill.name}</p>
                    <p className="retro-label mt-1 text-[var(--subtle)]">
                      {skill.type}
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)]">
                      {skill.label}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Link
                href="/skills"
                className="border border-[var(--border)] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                VIEW ALL SKILLS →
              </Link>
            </div>
          </section>

          {/* Page destinations */}
          <section className="grid gap-4 border-t border-[var(--border)] p-5 sm:grid-cols-2 sm:p-8">
            <Link
              href="/projects"
              className="retro-link-panel p-5 sm:p-7"
            >
              <p className="retro-label text-[var(--accent)]">
                DIRECTORY_01 / WORK
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                Projects archive
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Placeholder text for projects, experiments and work samples.
              </p>
              <p className="mt-6 font-mono text-sm text-[var(--accent)]">
                OPEN DIRECTORY →
              </p>
            </Link>

            <Link
              href="/contact"
              className="retro-link-panel p-5 sm:p-7"
            >
              <p className="retro-label text-[var(--accent)]">
                DIRECTORY_02 / CONNECTION
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                Contact
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Placeholder text for contact details and professional links.
              </p>
              <p className="mt-6 font-mono text-sm text-[var(--accent)]">
                OPEN CHANNEL →
              </p>
            </Link>
          </section>

          {/* Footer */}
          <footer className="flex flex-wrap justify-between gap-3 border-t border-[var(--border)] px-6 py-4 font-mono text-[10px] text-[var(--subtle)] sm:px-10">
            <span>PERSONAL ARCHIVE / V1.0</span>
            <span>MORE CONTENT TO COME</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
