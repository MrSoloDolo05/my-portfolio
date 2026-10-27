'use client';

import { createSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError(authError.message);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="retro-panel overflow-hidden rounded-xl max-w-md w-full">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h1 className="text-2xl font-bold font-mono text-[var(--foreground)]">Admin Login</h1>
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500/30 text-red-400 text-sm rounded">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="font-mono text-sm text-[var(--muted)]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 font-mono text-sm bg-[var(--background)] text-[var(--foreground)]"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-sm text-[var(--muted)]">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 font-mono text-sm bg-[var(--background)] text-[var(--foreground)]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white font-mono text-sm rounded hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}