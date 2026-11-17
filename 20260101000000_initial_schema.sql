/** Validiert die oeffentlichen Supabase-Variablen. Erwartet explizit uebergebene Werte (siehe lib/supabase/config.ts). */
export function readSupabaseEnv(env: Record<string, string | undefined>) {
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY muessen gesetzt sein (siehe .env.example).",
    );
  }
  if (!/^https?:\/\//.test(url)) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL muss mit http(s):// beginnen.");
  }
  return { url, anonKey };
}
