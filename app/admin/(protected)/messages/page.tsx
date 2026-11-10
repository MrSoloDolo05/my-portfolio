import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseOwnerId } from "@/lib/supabase/types";

export default async function AdminMessagesPage() {
  await connection();

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login?redirect=/admin/messages");
  }

  if (user.id !== getSupabaseOwnerId()) {
    redirect("/admin/login?redirect=/admin/messages");
  }

  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, subject, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to retrieve contact messages.", error);
  }

  return (
    <main className="min-h-screen bg-[#10152f] px-4 py-8 font-mono text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 border-b-4 border-lime-300 pb-5">
          <p className="mb-2 text-xs tracking-[0.3em] text-cyan-300">
            PLAYER ONE // INBOX
          </p>
          <h1 className="text-3xl font-black uppercase tracking-wide text-lime-300 sm:text-4xl">
            Messages
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Contact messages submitted through the portfolio.
          </p>
          <nav aria-label="Admin navigation" className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="inline-block border-2 border-cyan-300 px-4 py-2 text-xs font-bold uppercase text-cyan-300 transition hover:bg-cyan-300 hover:text-[#10152f]"
            >
              ← Dashboard
            </Link>
            <Link
              href="/projects"
              className="inline-block border-2 border-cyan-300 px-4 py-2 text-xs font-bold uppercase text-cyan-300 transition hover:bg-cyan-300 hover:text-[#10152f]"
            >
              View Public Portfolio ↗
            </Link>
          </nav>
        </header>

        {error ? (
          <div
            role="alert"
            className="border-2 border-red-400 bg-red-950/50 p-4 text-sm text-red-200"
          >
            Messages could not be loaded. Please try again later.
          </div>
        ) : !messages?.length ? (
          <section className="border-2 border-cyan-300/70 bg-[#171e3d] p-6 shadow-[5px_5px_0_#22d3ee33]">
            <p className="text-xs tracking-[0.2em] text-cyan-300">
              INBOX STATUS
            </p>
            <h2 className="mt-3 text-xl font-bold uppercase text-lime-300">
              No messages yet
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Contact form submissions will appear here.
            </p>
          </section>
        ) : (
          <section aria-label="Contact messages" className="space-y-4">
            {messages.map((message) => (
              <article
                key={message.id}
                className="border-2 border-cyan-300/70 bg-[#171e3d] p-5 shadow-[5px_5px_0_#22d3ee33] sm:p-6"
              >
                <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-600 pb-4">
                  <div className="min-w-0">
                    <h2 className="break-words text-lg font-bold text-lime-300">
                      {message.subject?.trim() || "No subject"}
                    </h2>
                    <p className="mt-2 break-words text-sm text-cyan-200">
                      {message.name} &lt;{message.email}&gt;
                    </p>
                  </div>
                  <time
                    className="shrink-0 text-xs text-slate-400"
                    dateTime={message.created_at}
                  >
                    {new Date(message.created_at).toLocaleString()}
                  </time>
                </header>
                <p className="mt-4 break-words whitespace-pre-wrap text-sm leading-6 text-slate-200">
                  {message.message}
                </p>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
