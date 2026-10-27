'use client';

import { createSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    router.push('/admin/login?redirect=/admin');
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="border border-red-500/30 px-4 py-2 font-mono text-sm text-red-400 hover:text-red-300 transition hover:border-red-500/60"
    >
      SIGN_OUT
    </button>
  );
}