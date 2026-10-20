
import Link from "next/link";

export default function Contact() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <nav className="mx-auto flex max-w-4xl gap-6 text-cyan-400">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <section className="mx-auto max-w-4xl py-20">
        <p className="font-semibold text-cyan-400">GET IN TOUCH</p>
        <h1 className="mt-3 text-5xl font-bold">Contact Me</h1>
        <p className="mt-5 max-w-xl leading-7 text-slate-300">
          I&apos;m open to learning opportunities, collaborations and
          connecting with other developers.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">Let&apos;s connect</h2>
          <p className="mt-3 text-slate-300">
            Email: add-your-email@example.com
          </p>
          <p className="mt-2 text-slate-300">
            GitHub: add your GitHub profile link
          </p>
        </div>
      </section>
    </main>
  );
}
