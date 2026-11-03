import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="era-projects min-h-screen bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="retro-panel overflow-hidden rounded-xl">
          <header className="border-b border-[var(--border)] px-5 py-4">
            <Link href="/" aria-label="Home" className="flex items-center gap-3">
              <span className="h-3 w-3 bg-[var(--accent)]" />
              <span className="font-mono text-sm font-bold tracking-widest text-[var(--accent)]">
                PERSONAL_ARCHIVE
              </span>
            </Link>
          </header>

          <section className="px-6 py-12 sm:px-10 sm:py-16">
            <p className="retro-label mb-5 text-[var(--accent)]">
              PROJECT_ARCHIVE / NOT_FOUND
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Project not found
              <span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="mt-5 max-w-2xl leading-7 text-[var(--muted)] sm:text-lg">
              This project detail page does not exist in the archive.
            </p>
            <Link
              href="/projects"
              className="retro-link-panel mt-8 inline-block px-5 py-3 font-mono text-sm text-[var(--accent)]"
            >
              ← BACK TO PROJECTS
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
