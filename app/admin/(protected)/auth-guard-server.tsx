Inspect the current changes in `app/admin/(protected)/page.tsx`.

Confirm that:
- The new-project insert payload explicitly includes `slug`.
- The slug is generated from the title when creating a new project.
- The final submitted slug is a non-empty string.
- Existing project slugs are preserved during edits.

Do not make further changes. Do not commit or push. Report your findings.import { createSupabaseServerClient } from '@/lib/supabase/server';
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