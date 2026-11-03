import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projectDetails } from "@/lib/project-details";

export function generateStaticParams() {
  return projectDetails.map(({ slug }) => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectDetails.find((detail) => detail.slug === slug);

  if (!project) {
    notFound();
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
                aria-current="page"
                className="text-[var(--accent)]"
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

          <section className="border-b border-[var(--border)] px-6 py-12 sm:px-10 sm:py-16">
            <p className="retro-label mb-5 text-[var(--accent)]">
              {project.projectCode} / PROJECT DETAIL
            </p>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                {project.title}
                <span className="text-[var(--accent)]">.</span>
              </h1>
              <span className="retro-chip">{project.detailType}</span>
            </div>

            <p className="mt-5 max-w-3xl leading-7 text-[var(--muted)] sm:text-lg">
              {project.introduction}
            </p>
            {project.caseStudy && (
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={project.caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 font-mono text-sm font-bold text-[#09121d] transition hover:bg-transparent hover:text-[var(--accent)]"
                >
                  OPEN LIVE PROJECT ↗
                </a>
                <a
                  href={project.caseStudy.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[var(--border)] px-5 py-3 font-mono text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  VIEW GITHUB REPOSITORY ↗
                </a>
              </div>
            )}
          </section>

          {project.caseStudy ? (
            <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
              <section aria-labelledby="overview-heading">
                <div className="mb-4">
                  <p className="retro-label mb-2 text-[var(--accent)]">
                    / PROJECT_OVERVIEW
                  </p>
                  <h2
                    id="overview-heading"
                    className="text-2xl font-bold sm:text-3xl"
                  >
                    The problem and the idea
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {project.sections.map((section) => (
                    <article
                      key={section.heading}
                      className="retro-panel-raised p-5 sm:p-6"
                    >
                      <h3 className="text-xl font-bold">{section.heading}</h3>
                      <p className="mt-3 leading-7 text-[var(--muted)]">
                        {section.content}
                      </p>
                    </article>
                  ))}
                  <article className="retro-panel-raised p-5 sm:p-6">
                    <h3 className="text-xl font-bold">The problem it addresses</h3>
                    <p className="mt-3 leading-7 text-[var(--muted)]">
                      {project.caseStudy.problem}
                    </p>
                  </article>
                </div>
              </section>

              <section aria-labelledby="role-heading">
                <div className="retro-panel-raised p-5 sm:p-6">
                  <p className="retro-label text-[var(--accent)]">
                    ROLE_AND_CONTRIBUTION
                  </p>
                  <h2
                    id="role-heading"
                    className="mt-3 text-xl font-bold sm:text-2xl"
                  >
                    {project.caseStudy.role}
                  </h2>
                  <p className="mt-3 max-w-4xl leading-7 text-[var(--muted)]">
                    {project.caseStudy.roleDescription}
                  </p>
                </div>
              </section>

              <section aria-labelledby="technology-heading">
                <div className="mb-4">
                  <p className="retro-label mb-2 text-[var(--accent)]">
                    / TECHNOLOGY_STACK
                  </p>
                  <h2
                    id="technology-heading"
                    className="text-2xl font-bold sm:text-3xl"
                  >
                    Tools and technologies
                  </h2>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {project.caseStudy.technologies.map((technology) => (
                    <li key={technology} className="retro-chip">
                      {technology}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="features-heading">
                <div className="mb-4">
                  <p className="retro-label mb-2 text-[var(--accent)]">
                    / FEATURE_SET
                  </p>
                  <h2
                    id="features-heading"
                    className="text-2xl font-bold sm:text-3xl"
                  >
                    Key features
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {project.caseStudy.features.map((feature, index) => (
                    <article
                      key={feature.name}
                      className="retro-panel-raised p-5"
                    >
                      <p className="retro-label text-[var(--accent)]">
                        FEATURE_{String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-lg font-bold">
                        {feature.name}
                      </h3>
                      <p className="mt-2 leading-6 text-[var(--muted)]">
                        {feature.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section aria-labelledby="screenshots-heading">
                <div className="mb-4">
                  <p className="retro-label mb-2 text-[var(--accent)]">
                    / APPLICATION_CAPTURE
                  </p>
                  <h2
                    id="screenshots-heading"
                    className="text-2xl font-bold sm:text-3xl"
                  >
                    Screenshots
                  </h2>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {project.caseStudy.screenshots.map((screenshot) => (
                    <figure
                      key={screenshot.src}
                      className="retro-panel-raised overflow-hidden"
                    >
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        width={1917}
                        height={1077}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="h-auto w-full"
                      />
                      <figcaption className="border-t border-[var(--border)] px-4 py-3 text-sm leading-6 text-[var(--muted)]">
                        {screenshot.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>

              <section aria-labelledby="technical-heading">
                <div className="mb-4">
                  <p className="retro-label mb-2 text-[var(--accent)]">
                    / SYSTEM_NOTES
                  </p>
                  <h2
                    id="technical-heading"
                    className="text-2xl font-bold sm:text-3xl"
                  >
                    Technical highlights
                  </h2>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {project.caseStudy.technicalHighlights.map((highlight) => (
                    <article
                      key={highlight.heading}
                      className="retro-panel-raised p-5"
                    >
                      <h3 className="text-lg font-bold">
                        {highlight.heading}
                      </h3>
                      <p className="mt-2 leading-7 text-[var(--muted)]">
                        {highlight.content}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section aria-labelledby="reflection-heading">
                <div className="mb-4">
                  <p className="retro-label mb-2 text-[var(--accent)]">
                    / REFLECTION
                  </p>
                  <h2
                    id="reflection-heading"
                    className="text-2xl font-bold sm:text-3xl"
                  >
                    Challenges and lessons learned
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <article className="retro-panel-raised p-5 sm:p-6">
                    <h3 className="text-xl font-bold">Challenges</h3>
                    <ul className="mt-4 list-disc space-y-2 pl-5 leading-6 text-[var(--muted)]">
                      {project.caseStudy.challenges.map((challenge) => (
                        <li key={challenge}>{challenge}</li>
                      ))}
                    </ul>
                  </article>
                  <article className="retro-panel-raised p-5 sm:p-6">
                    <h3 className="text-xl font-bold">Lessons learned</h3>
                    <ul className="mt-4 list-disc space-y-2 pl-5 leading-6 text-[var(--muted)]">
                      {project.caseStudy.lessons.map((lesson) => (
                        <li key={lesson}>{lesson}</li>
                      ))}
                    </ul>
                  </article>
                </div>
              </section>

              <section aria-labelledby="improvements-heading">
                <div className="retro-panel-raised p-5 sm:p-6">
                  <p className="retro-label text-[var(--accent)]">
                    NEXT_ITERATION
                  </p>
                  <h2
                    id="improvements-heading"
                    className="mt-3 text-xl font-bold sm:text-2xl"
                  >
                    Future improvements
                  </h2>
                  <ul className="mt-4 grid gap-2 leading-6 text-[var(--muted)] sm:grid-cols-2">
                    {project.caseStudy.futureImprovements.map((improvement) => (
                      <li key={improvement} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="font-mono text-[var(--accent)]"
                        >
                          +
                        </span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section
                aria-label="Project links"
                className="retro-panel-raised flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6"
              >
                <div>
                  <p className="retro-label text-[var(--accent)]">
                    PROJECT_LINKS
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Explore the deployed application or its source repository.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.caseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[var(--accent)] bg-[var(--accent)] px-4 py-3 font-mono text-xs font-bold text-[#09121d] transition hover:bg-transparent hover:text-[var(--accent)]"
                  >
                    LIVE PROJECT ↗
                  </a>
                  <a
                    href={project.caseStudy.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[var(--border)] px-4 py-3 font-mono text-xs transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    GITHUB ↗
                  </a>
                </div>
              </section>
            </div>
          ) : (
            <section
              aria-label="Project details"
              className="grid gap-4 px-6 py-8 sm:px-10 sm:py-10"
            >
              {project.sections.map((section, index) => (
                <article
                  key={section.heading}
                  className="retro-panel-raised p-5 sm:p-6"
                >
                  <p className="retro-label text-[var(--accent)]">
                    SECTION_{String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-xl font-bold sm:text-2xl">
                    {section.heading}
                  </h2>
                  <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
                    {section.content}
                  </p>
                </article>
              ))}
            </section>
          )}

          <section className="border-t border-[var(--border)] px-6 py-7 sm:px-10">
            <p className="retro-label text-[var(--accent)]">
              END_OF_PROJECT_RECORD
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="border border-[var(--border)] px-5 py-3 font-mono text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                ← BACK TO PROJECTS
              </Link>
              <Link
                href="/"
                className="border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 font-mono text-sm font-bold text-[#09121d] transition hover:bg-transparent hover:text-[var(--accent)]"
              >
                HOME
              </Link>
            </div>
          </section>

          <footer className="flex flex-wrap justify-between gap-3 border-t border-[var(--border)] px-6 py-4 font-mono text-[10px] text-[var(--subtle)] sm:px-10">
            <span>PERSONAL ARCHIVE / PROJECT DETAIL</span>
            <span>{project.slug}</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
