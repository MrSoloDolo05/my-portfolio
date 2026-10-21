
import Link from "next/link";

const contactMethods = [
  {
    id: "CON_001",
    name: "Email",
    detail: "add-your-email@example.com",
    description: "For enquiries, opportunities, and collaboration.",
    href: null,
  },
  {
    id: "CON_002",
    name: "GitHub",
    detail: "Add your GitHub profile link",
    description: "Explore code, projects, and development experiments.",
    href: null,
  },
];

export default function Contact() {
  return (
    <main className="era-contact min-h-screen bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-8">
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
                className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                PROJECTS
              </Link>
              <Link
                href="/contact"
                aria-current="page"
                className="text-[var(--accent)]"
              >
                CONTACT
              </Link>
            </nav>
          </header>

          {/* Contact introduction */}
          <section className="grid gap-10 border-b border-[var(--border)] px-6 py-12 sm:px-10 sm:py-16 md:grid-cols-[1.3fr_0.7fr] md:items-center">
            <div>
              <p className="retro-label mb-5 text-[var(--accent)]">
                DIRECTORY_02 / CONNECTION
              </p>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Let&apos;s connect
                <span className="text-[var(--accent)]">.</span>
              </h1>

              <p className="mt-5 max-w-xl leading-7 text-[var(--muted)] sm:text-lg">
                I&apos;m open to learning opportunities, collaborations,
                and connecting with other developers. This page is the
                starting point for getting in touch.
              </p>
            </div>

            {/* Connection status */}
            <aside
              aria-labelledby="connection-heading"
              className="retro-panel-raised p-5"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <h2
                  id="connection-heading"
                  className="retro-label text-[var(--muted)]"
                >
                  CONNECTION_STATUS
                </h2>
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              </div>

              <p className="mt-5 text-2xl font-bold">
                Open to connect
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Available for networking, learning, and future
                opportunities.
              </p>

              <p className="retro-label mt-6 border-t border-[var(--border)] pt-4 text-[var(--subtle)]">
                STATUS: PROFILE ACTIVE
              </p>
            </aside>
          </section>

          {/* Contact methods */}
          <section
            aria-labelledby="contact-methods-heading"
            className="px-6 py-8 sm:px-10 sm:py-10"
          >
            <div className="mb-6">
              <p className="retro-label mb-2 text-[var(--accent)]">
                / AVAILABLE CHANNELS
              </p>
              <h2
                id="contact-methods-heading"
                className="text-2xl font-bold"
              >
                Contact details
              </h2>
              <p className="mt-3 max-w-xl leading-7 text-[var(--muted)]">
                Replace these placeholders with your real contact details
                when you&apos;re ready to publish them.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {contactMethods.map((method) => (
                <article
                  key={method.id}
                  className="retro-panel-raised p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                    <span className="retro-label text-[var(--accent)]">
                      {method.id}
                    </span>
                    <span className="retro-chip">CONTACT CHANNEL</span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {method.name}
                  </h3>

                  <p className="mt-3 break-words font-mono text-sm text-[var(--accent)]">
                    {method.detail}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {method.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Page navigation */}
          <section className="border-t border-[var(--border)] px-6 py-7 sm:px-10">
            <p className="retro-label text-[var(--accent)]">
              END_OF_CONNECTION
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/"
                className="border border-[var(--border)] px-5 py-3 font-mono text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                ← BACK HOME
              </Link>

              <Link
                href="/projects"
                className="border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 font-mono text-sm font-bold text-[#111020] transition hover:bg-transparent hover:text-[var(--accent)]"
              >
                VIEW PROJECTS ↗
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-wrap justify-between gap-3 border-t border-[var(--border)] px-6 py-4 font-mono text-[10px] text-[var(--subtle)] sm:px-10">
            <span>PERSONAL ARCHIVE / CONTACT</span>
            <span>CHANNELS: {contactMethods.length}</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
