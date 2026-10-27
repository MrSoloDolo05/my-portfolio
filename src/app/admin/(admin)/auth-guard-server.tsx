import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getSupabaseOwnerId } from '@/lib/supabase/types';

export async function AuthGuardServer({
  children,
  pathname = '/admin',
}: {
  children: React.ReactNode;
  pathname?: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login?redirect=' + pathname);
  }

  const ownerId = getSupabaseOwnerId();

  if (user.id !== ownerId) {
    redirect('/admin/login?redirect=' + pathname);
  }

  return <>{children}</>;
}