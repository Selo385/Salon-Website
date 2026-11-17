import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/modules/dashboard/components/stat-card";
import { getDashboardStats } from "@/modules/dashboard/queries";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  return (
    <>
      <PageHeader title="Dashboard" description="Überblick über den heutigen Salonbetrieb." />
      {stats.ok ? null : (
        <Card className="mb-6 border-destructive/40">
          <CardContent className="p-5 text-sm">
            <p className="font-medium text-destructive">Datenbankabfrage fehlgeschlagen</p>
            <p className="mt-1 text-muted-foreground">
              Migration eingespielt? Rolle in <code>salon_members</code> gesetzt? ({stats.error})
            </p>
          </CardContent>
        </Card>
      )}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Termine heute" value={stats.appointmentsToday} />
        <StatCard label="Kunden" value={stats.customers} />
        <StatCard label="Mitarbeiter" value={stats.employees} hint="aktiv" />
        <StatCard label="Leistungen" value={stats.services} hint="aktiv" />
      </section>
    </>
  );
}
