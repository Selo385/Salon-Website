import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const metadata: Metadata = { title: "Auswertungen" };

export default function Page() {
  return <ModulePlaceholder title="Auswertungen" phase="Phase 3" description="Umsatz- und Auslastungskennzahlen." />;
}
