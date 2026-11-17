import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfig } from "./config";

/** Server-Client im Namen des eingeloggten Nutzers. RLS gilt vollstaendig. */
export async function createClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = supabaseConfig();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Aufruf aus einer Server Component: Cookies setzt die Middleware.
        }
      },
    },
  });
}
