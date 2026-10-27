import Link from "next/link";
import { Suspense } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Project = {
  id: number;
  title: string;
  summary: string;
  project_url: string | null;
  image_url: string | null;
  display_order: number;
};

async function getProjects(): Promise<Project[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("projects")
    .select("id, title, summary, project_url, image_url, display_order")
    .order("display_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as Project[];
}

async function ProjectsContent() {
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    projects = await getProjects();
  } catch (err: unknown) {
    error =
      err instanceof Error ? err.message : "Failed to load projects.";
  }

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
                  while learning new skills. More entries will be added as
                  the archive grows.
                </p>
              </div>

              <div className="retro-panel-raised shrink-0 p-4">
                <p className="retro-label text-[var(--subtle)]">
                  ARCHIVE STATUS
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[var(--accent)]">
                  {String(projects.length).padStart(2, "0")} ENTRIES
                </p>
              </div>
            </div>
          </section>

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
                SORT: DISPLAY_ORDER
              </p>
            </div>

            {error ? (
              <div
                role="alert"
                className="retro-panel-raised p-5 text-[var(--muted)]"
              >
                <p className="font-mono text-sm text-[var(--accent)]">
                  ARCHIVE_LOAD_ERROR
                </p>
                <p className="mt-2">
                  Projects could not be loaded. Please try again later.
                </p>
              </div>
            ) : projects.length === 0 ? (
              <div className="retro-panel-raised p-5 text-[var(--muted)]">
                No projects have been added to the archive yet.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="retro-panel-raised flex flex-col p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                      <span className="retro-label text-[var(--accent)]">
                        PROJECT_{String(project.id).padStart(3, "0")}
                      </span>
                      <span className="retro-chip">
                        {project.display_order > 0
                          ? `ORDER_${project.display_order}`
                          : "PROJECT"}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold sm:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-3 flex-1 leading-7 text-[var(--muted)]">
                      {project.summary}
                    </p>

                    {project.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image_url}
                        alt={`Preview of ${project.title}`}
                        className="mt-5 max-h-64 w-full rounded-lg border border-[var(--border)] object-cover"
                      />
                    )}

                    <div className="mt-6 border-t border-[var(--border)] pt-4">
                      {project.project_url ? (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[var(--accent)] transition-colors hover:underline"
                        >
                          VIEW PROJECT ↗
                        </a>
                      ) : (
                        <p className="font-mono text-xs text-[var(--subtle)]">
                          PROJECT LINK / NOT AVAILABLE
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

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

          <footer className="flex flex-wrap justify-between gap-3 border-t border-[var(--border)] px-6 py-4 font-mono text-[10px] text-[var(--subtle)] sm:px-10">
            <span>PERSONAL ARCHIVE / PROJECTS</span>
            <span>ENTRIES: {projects.length}</span>
          </footer>
        </div>
      </div>
    </main>
  );
}

export default function Projects() {
  return (
    <Suspense
      fallback={
        <main className="era-projects min-h-screen bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="retro-panel rounded-xl p-8">
              <p className="retro-label text-[var(--accent)]">
                DIRECTORY_01 / PROJECT ARCHIVE
              </p>
              <p className="mt-4 font-mono text-sm text-[var(--muted)]">
                LOADING_ARCHIVE...
              </p>
            </div>
          </div>
        </main>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
