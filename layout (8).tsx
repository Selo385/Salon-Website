import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const metadata: Metadata = { title: "Mitarbeiter" };

export default function Page() {
  return <ModulePlaceholder title="Mitarbeiter" phase="Phase 2" description="Profile, Schichten, Urlaub und Zeiterfassung." />;
}
