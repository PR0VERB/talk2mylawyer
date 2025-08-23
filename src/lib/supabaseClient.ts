import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase is not configured (missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY). Submissions will be disabled.');
}

export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null;

