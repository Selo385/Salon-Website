import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const metadata: Metadata = { title: "Kasse" };

export default function Page() {
  return <ModulePlaceholder title="Kasse" phase="Phase 3" description="Kasse, Rechnungen, Gutscheine und Tagesabschluss. Rechtskonforme Kassenführung erfordert eine externe zertifizierte TSE-Lösung." />;
}
