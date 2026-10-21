
import Link from "next/link";

const projects = [
  {
    id: "PRJ_001",
    name: "Personal Portfolio Website",
    category: "WEB DEVELOPMENT",
    status: "IN PROGRESS",
    description:
      "A personal archive documenting my skills, projects, and journey through technology.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "PRJ_002",
    name: "Responsive Landing Page",
    category: "FRONTEND",
    status: "PLANNED",
    description:
      "A responsive page concept focused on layout, accessibility, and a consistent visual identity.",
    technologies: ["HTML", "CSS", "Responsive Design"],
  },
  {
    id: "PRJ_003",
    name: "JavaScript Mini Project",
    category: "PROGRAMMING",
    status: "PLANNED",
    description:
      "A small interactive project to practise JavaScript fundamentals and user interaction.",
    technologies: ["JavaScript", "DOM", "Problem Solving"],
  },
];

export default function Projects() {
  return (
    <main className="era-projects min-h-screen bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="retro-panel overflow-hidden rounded-xl">
          {/* Header and navigation */}
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-3"
            >
              <span className="h-3 w-3 bg-[var(--accent)]" />
              <span className="font-mono text-sm font-bold tracking-widest text-[var(--accent)]">
                PERSONAL_ARCHIVE
              </span>
            </Link>

            <nav
              aria-label="Main navigation"
              className="flex gap-5 font-mono text-xs sm:gap-7 sm:text-sm"
            >
              <Link
                href="/"
                className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                HOME
              </Link>
              <Link
                href="/projects"
                aria-current="page"
                className="text-[var(--accent)]"
              >
                PROJECTS
              </Link>
              <Link
                href="/contact"
                className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                CONTACT
              </Link>
            </nav>
          </header>

          {/* Page introduction */}
          <section className="border-b border-[var(--border)] px-6 py-12 sm:px-10 sm:py-16">
            <p className="retro-label mb-5 text-[var(--accent)]">
              DIRECTORY_01 / PROJECT ARCHIVE
            </p>

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  Projects<span className="text-[var(--accent)]">.</span>
                </h1>
                <p className="mt-5 max-w-2xl leading-7 text-[var(--muted)] sm:text-lg">
                  A collection of projects, experiments, and things built
                  while learning new skills. More entries will be added
                  as the archive grows.
                </p>
              </div>

              <div className="retro-panel-raised shrink-0 p-4">
                <p className="retro-label text-[var(--subtle)]">
                  ARCHIVE STATUS
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[var(--accent)]">
                  03 ENTRIES
                </p>
              </div>
            </div>
          </section>

          {/* Project archive */}
          <section
            aria-labelledby="archive-heading"
            className="px-6 py-8 sm:px-10 sm:py-10"
          >
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="retro-label mb-2 text-[var(--accent)]">
                  / DIRECTORY_CONTENTS
                </p>
                <h2 id="archive-heading" className="text-2xl font-bold">
                  Selected work
                </h2>
              </div>
              <p className="font-mono text-xs text-[var(--subtle)]">
                SORT: PROJECT_ID
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="retro-panel-raised flex flex-col p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                    <span className="retro-label text-[var(--accent)]">
                      {project.id}
                    </span>
                    <span className="retro-chip">
                      {project.status}
                    </span>
                  </div>

                  <p className="retro-label mt-5 text-[var(--subtle)]">
                    {project.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                    {project.name}
                  </h3>

                  <p className="mt-3 flex-1 leading-7 text-[var(--muted)]">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="retro-chip">
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-[var(--border)] pt-4">
                    <p className="font-mono text-xs text-[var(--subtle)]">
                      PROJECT DETAILS / COMING SOON
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Return navigation */}
          <section className="border-t border-[var(--border)] px-6 py-7 sm:px-10">
            <p className="retro-label text-[var(--accent)]">
              END_OF_DIRECTORY
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/"
                className="border border-[var(--border)] px-5 py-3 font-mono text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                ← BACK HOME
              </Link>
              <Link
                href="/contact"
                className="border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 font-mono text-sm font-bold text-[#09121d] transition hover:bg-transparent hover:text-[var(--accent)]"
              >
                CONTACT ↗
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-wrap justify-between gap-3 border-t border-[var(--border)] px-6 py-4 font-mono text-[10px] text-[var(--subtle)] sm:px-10">
            <span>PERSONAL ARCHIVE / PROJECTS</span>
            <span>ENTRIES: {projects.length}</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
