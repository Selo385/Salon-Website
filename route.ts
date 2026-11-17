import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const metadata: Metadata = { title: "Kunden" };

export default function Page() {
  return <ModulePlaceholder title="Kunden" phase="Phase 2" description="Kundenakte, Check-in/-out und CSV-Import." />;
}
