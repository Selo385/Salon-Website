import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const metadata: Metadata = { title: "Leistungen" };

export default function Page() {
  return <ModulePlaceholder title="Leistungen" phase="Phase 2" description="Leistungs- und Preisverwaltung." />;
}
