'use client';

import { createSupabaseClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  return (
    <main className="era-projects min-h-screen bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="retro-panel overflow-hidden rounded-xl">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 bg-[var(--accent)]" />
              <span className="font-mono text-sm font-bold tracking-widest text-[var(--accent)]">
                PERSONAL_ARCHIVE
              </span>
            </div>
            <nav className="flex gap-5 font-mono text-xs sm:gap-7 sm:text-sm">
              <a
                href="/admin/login?redirect=/admin"
                className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                LOGIN
              </a>
            </nav>
          </header>

          <section className="px-6 py-12 sm:px-10 sm:py-16">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="retro-label mb-5 text-[var(--accent)]">
                  / AUTHENTICATION
                </p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  ADMIN LOGIN<span className="text-[var(--accent)]">.</span>
                </h1>
                <p className="mt-5 max-w-2xl leading-7 text-[var(--muted)] sm:text-lg">
                  Sign in with the administrator account created in Supabase Auth
                  to access the project management dashboard.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="retro-panel-raised p-6 sm:p-8 max-w-lg"
            >
              {error && (
                <div className="mb-4 border border-red-500/30 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-400">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label className="retro-label mb-2 block text-sm font-mono text-[var(--muted)]">
                  EMAIL_ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full border border-[var(--border)] px-4 py-3 font-mono text-sm text-[var(--foreground)] placeholder-[var(--subtle)] focus:outline-none focus:border-[var(--accent)]"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-6">
                <label className="retro-label mb-2 block text-sm font-mono text-[var(--muted)]">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[var(--border)] px-4 py-3 font-mono text-sm text-[var(--foreground)] placeholder-[var(--subtle)] focus:outline-none focus:border-[var(--accent)]"
                  required
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="retro-link-panel w-full p-4 font-mono text-center text-sm font-bold tracking-widest"
              >
                {loading ? 'SIGNING_IN...' : 'SIGN_IN'}
              </button>
            </form>
          </section>

          <footer className="flex flex-wrap justify-between gap-3 border-t border-[var(--border)] px-6 py-4 font-mono text-[10px] text-[var(--subtle)] sm:px-10">
            <span>PERSONAL ARCHIVE / ADMIN</span>
            <span>ADMIN LOGIN</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
