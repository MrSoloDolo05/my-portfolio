
import Link from "next/link";

const projects = [
  {
    title: "Project One",
    description: "A website project where I can demonstrate my HTML, CSS and JavaScript skills.",
    number: "01",
  },
  {
    title: "Project Two",
    description: "A responsive design project focused on creating a great user experience.",
    number: "02",
  },
  {
    title: "Project Three",
    description: "A project to showcase what I learn as I grow as a developer.",
    number: "03",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-xl font-bold">
          MyPortfolio<span className="text-cyan-400">.</span>
        </Link>

        <div className="flex gap-6 text-sm text-slate-300">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div>
          <p className="mb-4 font-medium text-cyan-400">
            JUNIOR FRONTEND DEVELOPER
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Hello, I&apos;m a
            <span className="text-cyan-400"> developer.</span>
          </h1>

          <p className="mt-6 max-w-lg leading-7 text-slate-300">
            Welcome to my portfolio! I&apos;m learning to build modern,
            responsive websites and creating projects to develop my skills.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              View My Projects
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-slate-600 px-6 py-3 font-semibold transition hover:border-cyan-400"
            >
              Contact Me
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
          <p className="mb-6 text-sm text-slate-400">
            A LITTLE ABOUT ME
          </p>
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-400 text-3xl font-bold text-slate-950">
            DEV
          </div>
          <h2 className="text-2xl font-bold">Learning. Building. Growing.</h2>
          <p className="mt-3 leading-7 text-slate-300">
            My goal is to become a frontend developer and turn ideas into
            useful, attractive digital experiences.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["HTML", "CSS", "JavaScript", "TypeScript", "React"].map(
              (skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-700 px-3 py-2 text-sm text-cyan-300"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-cyan-400">MY WORK</p>
            <h2 className="mt-2 text-3xl font-bold">Featured Projects</h2>
          </div>
          <Link
            href="/projects"
            className="text-sm text-cyan-400 hover:underline"
          >
            All projects →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.number}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-400"
            >
              <p className="text-sm text-cyan-400">{project.number}</p>
              <h3 className="mt-4 text-xl font-bold">{project.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-400">
        Built with Next.js, TypeScript and Tailwind CSS.
      </footer>
    </main>
  );
}
