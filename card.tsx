import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** Öffentlicher Verbindungstest. Ruft nur die RPC health_check() auf, gibt keine Details preis. */
export async function GET() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("health_check");
    if (error) return NextResponse.json({ ok: false, db: false }, { status: 503 });
    return NextResponse.json({ ok: true, db: true });
  } catch {
    return NextResponse.json({ ok: false, db: false }, { status: 503 });
  }
}
