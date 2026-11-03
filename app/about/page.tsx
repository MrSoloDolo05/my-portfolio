import Link from "next/link";

export default function About() {
  return (
    <main className="era-home min-h-screen bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="retro-panel overflow-hidden rounded-xl">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4">
            <Link href="/" aria-label="Home" className="flex items-center gap-3">
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
                className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                SKILLS
              </Link>
              <Link
                href="/about"
                aria-current="page"
                className="text-[var(--accent)]"
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
              DIRECTORY_03 / DEVELOPER PROFILE
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              About Me<span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="mt-5 max-w-3xl leading-7 text-[var(--muted)] sm:text-lg">
              I&apos;m an aspiring full-stack developer who enjoys the art of
              making something out of nothing. What interests me most about
              programming is the combination of creativity and problem-solving:
              taking an idea, figuring out how to bring it to life, and working
              through the challenges along the way.
            </p>
          </section>

          <section
            aria-label="About my development journey"
            className="grid gap-4 px-6 py-8 sm:px-10 sm:py-10 md:grid-cols-2"
          >
            <article className="retro-panel-raised p-5 sm:p-6">
              <p className="retro-label text-[var(--accent)]">
                PROFILE_01 / HOW I BUILD
              </p>
              <h2 className="mt-3 text-xl font-bold sm:text-2xl">
                Exploring the whole application
              </h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">
                I enjoy exploring how applications work as a whole, from the
                interfaces people interact with to the logic and systems behind
                them. Through projects like THE BOX and my portfolio, I&apos;m
                continuing to develop my skills, experiment with new
                technologies, and learn how to turn ideas into working
                applications.
              </p>
            </article>

            <article className="retro-panel-raised p-5 sm:p-6">
              <p className="retro-label text-[var(--accent)]">
                PROFILE_02 / WHAT&apos;S NEXT
              </p>
              <h2 className="mt-3 text-xl font-bold sm:text-2xl">
                Growing through useful work
              </h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">
                My goal is to keep growing as a developer and build useful,
                thoughtful applications that solve problems and bring ideas to
                life.
              </p>
              <Link
                href="/projects"
                className="mt-6 inline-flex border border-[var(--border)] px-4 py-3 font-mono text-xs text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                EXPLORE PROJECTS →
              </Link>
            </article>
          </section>

          <footer className="flex flex-wrap justify-between gap-3 border-t border-[var(--border)] px-6 py-4 font-mono text-[10px] text-[var(--subtle)] sm:px-10">
            <span>PERSONAL ARCHIVE / ABOUT</span>
            <span>PROFILE IN PROGRESS</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
