import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { logout } from "@/app/login/actions";

export default function NoAccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-8 text-center">
          <h1 className="text-lg font-semibold">Kein Zugriff</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Dieser Bereich ist dem Salonteam vorbehalten. Der Kundenbereich folgt in Phase 2.
          </p>
          <form action={logout} className="mt-6">
            <Button variant="outline" type="submit">Abmelden</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
