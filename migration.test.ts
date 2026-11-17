import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./config";

/**
 * Service-Role-Client: umgeht RLS. Nur in Server Actions / Route Handlern nach
 * eigener Autorisierungspruefung verwenden (z. B. Buchung durch Kunden, Webhooks, Cron).
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY ist nicht gesetzt.");
  return createClient(supabaseConfig().url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
