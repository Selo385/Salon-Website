import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const metadata: Metadata = { title: "Kommunikation" };

export default function Page() {
  return <ModulePlaceholder title="Kommunikation" phase="Phase 4" description="Zentrale Inbox für WhatsApp, Instagram, TikTok und Telefon." />;
}
