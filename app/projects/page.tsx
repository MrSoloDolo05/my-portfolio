
import Link from "next/link";

export default function Projects() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <nav className="mx-auto flex max-w-4xl gap-6 text-cyan-400">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <section className="mx-auto max-w-4xl py-20">
        <p className="font-semibold text-cyan-400">MY WORK</p>
        <h1 className="mt-3 text-5xl font-bold">Projects</h1>
        <p className="mt-5 leading-7 text-slate-300">
          Here are some projects I plan to build as I develop my skills.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            "Personal Portfolio Website",
            "Responsive Landing Page",
            "JavaScript Mini Project",
          ].map((project) => (
            <article
              key={project}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-xl font-bold">{project}</h2>
              <p className="mt-3 text-slate-400">
                Project details and links will be added as I build my work.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
