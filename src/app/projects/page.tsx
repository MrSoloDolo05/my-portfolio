import Link from "next/link";
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { useState, useEffect } from 'react';
import { headers } from 'next/headers';

type Project = {
  id: string;
  title: string;
  summary: string;
  project_url: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
};

async function getProjects(): Promise<Project[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, summary, project_url, image_url, display_order, created_at')
    .order('display_order', { nullsFirst: true })
    .order('id', { nullsFirst: true });

  if (error) {
    throw error;
  }
  return data || [];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load projects.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
            </div>

            {error && (
              <div className="mt-6 retro-panel-raised p-4 font-mono text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <p className="retro-label text-[var(--accent)]">
                {loading ? 'LOADING...' : '/ DIRECTORY_CONTENTS'}
              </p>
              <p className="font-mono text-xs text-[var(--subtle)]">
                SORT: PROJECT_ORDER
              </p>
            </div>

            {loading ? (
              <div className="mt-8 flex items-center justify-center py-12">
                <p className="font-mono text-sm text-[var(--muted)]">LOADING...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="mt-8">
                <div className="retro-panel-raised p-6 text-center">
                  <p className="retro-label text-[var(--muted)]">/ EMPTY_DIRECTORY</p>
                  <p className="mt-2 text-[var(--muted)]">No projects have been added yet.</p>
                </div>
              </div>
            ) : (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="retro-panel-raised flex flex-col p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                      <span className="retro-label text-[var(--accent)]">
                        {project.id}
                      </span>
                    </div>

                    <p className="retro-label mt-5 text-[var(--subtle)]">
                      {project.display_order > 0 ? `ORDER_${project.display_order}` : 'PROJECT'}
                    </p>

                    <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-3 flex-1 leading-7 text-[var(--muted)]">
                      {project.summary}
                    </p>

                    {project.project_url && (
                      <div className="mt-5">
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="retro-link-panel p-4 font-mono text-sm text-[var(--accent)]"
                        >
                          VIEW PROJECT → →
                        </a>
                      </div>
                    )}

                    {project.image_url && (
                      <div className="mt-4">
                        <a
                          href={project.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="retro-link-panel p-4 font-mono text-sm text-[var(--accent)]"
                        >
                          VIEW IMAGE → →
                        </a>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
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
