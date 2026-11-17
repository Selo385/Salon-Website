import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

/** Ausdruecklich gekennzeichneter Platzhalter fuer noch nicht implementierte Module. */
export function ModulePlaceholder({ title, phase, description }: { title: string; phase: string; description: string }) {
  return (
    <>
      <PageHeader title={title} />
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-sm font-medium">Noch nicht implementiert</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            {description} Geplant in {phase}.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
