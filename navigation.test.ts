import { readSupabaseEnv } from "@/lib/env";

// Explizite Zugriffe noetig: Next.js ersetzt NEXT_PUBLIC_* nur bei literalem process.env.NAME.
export function supabaseConfig() {
  return readSupabaseEnv({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
}
