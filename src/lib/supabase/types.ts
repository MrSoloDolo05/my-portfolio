import type { Database } from './types/database';

export type Project = Database['public']['Tables']['projects']['Row'];

export type SupabaseClient = import('@supabase/supabase-js').SupabaseClient<Database>;

export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  }
  return url;
}

export function getSupabasePublishableKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not set');
  }
  return key;
}

export function getSupabaseOwnerId(): string {
  const id = process.env.SUPABASE_OWNER_ID;
  if (!id) {
    throw new Error('SUPABASE_OWNER_ID is not set');
  }
  return id;
}
