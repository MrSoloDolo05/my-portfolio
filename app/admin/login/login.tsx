
'use client';

import { createSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseClient();

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('ACCESS DENIED: Check your email and password.');
        return;
      }

      router.push('/admin');
      router.refresh();
} catch (err) {
  console.error('Admin login exception:', err);
  setError('SYSTEM ERROR: Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#10152f] px-4 py-10 font-mono text-slate-100">
      {/* Decorative background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(#a3e635 1px, transparent 1px), linear-gradient(90deg, #a3e635 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <section className="relative w-full max-w-md">
        <div className="mb-5 text-center">
          <p className="text-xs font-bold tracking-[0.35em] text-cyan-300">
            GROWING UP WITH THE FUTURE
          </p>
          <p className="mt-2 text-[10px] tracking-[0.25em] text-slate-500">
            PORTFOLIO OPERATING SYSTEM // 01
          </p>
        </div>

        <div className="border-2 border-lime-300 bg-[#171e3d] shadow-[6px_6px_0_#84cc16]">
          <div className="flex items-center justify-between border-b-2 border-lime-300 bg-lime-300 px-4 py-3 text-[#10152f]">
            <span className="text-xs font-black tracking-widest">
              ADMIN TERMINAL
            </span>
            <span className="text-xs font-bold">[ SECURE ]</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
            <div className="mb-6">
              <p className="text-xs text-cyan-300">WELCOME BACK, PLAYER.</p>
              <h1 className="mt-2 text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
                Sign In
              </h1>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Authenticate to access your project control panel.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="border-2 border-red-400 bg-red-950/40 p-3 text-xs leading-5 text-red-300"
              >
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-lime-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="player@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border-2 border-slate-600 bg-[#10152f] px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-lime-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border-2 border-slate-600 bg-[#10152f] px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border-2 border-lime-300 bg-lime-300 px-4 py-3 text-sm font-black uppercase tracking-widest text-[#10152f] transition hover:bg-transparent hover:text-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'AUTHENTICATING...' : '> INITIALIZE SESSION'}
            </button>

            <p className="text-center text-[10px] leading-5 text-slate-500">
              RESTRICTED ACCESS // AUTHORIZED USERS ONLY
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-[10px] tracking-wider text-slate-600">
          © PORTFOLIO SYSTEMS — END OF TRANSMISSION
        </p>
      </section>
    </main>
  );
}
