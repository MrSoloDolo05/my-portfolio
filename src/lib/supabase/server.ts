import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            (cookieStore as any).set(name, value, options);
          } catch {
            // Failed to set cookie (e.g., in a non-response context)
          }
        },
        remove(name: string, options: any) {
          try {
            (cookieStore as any).set(name, '', options);
          } catch {
            // Failed to remove cookie
          }
        },
      },
    },
  );
}
