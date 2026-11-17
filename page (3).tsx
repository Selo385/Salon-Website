import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const metadata: Metadata = { title: "Termine" };

export default function Page() {
  return <ModulePlaceholder title="Termine" phase="Phase 2" description="Kalender, Buchungsstrecke und Reservierungsanfragen." />;
}
