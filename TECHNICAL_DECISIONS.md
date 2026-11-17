import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";

export const metadata: Metadata = { title: "Anmelden" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-8">
          <h1 className="text-xl font-semibold tracking-tight">Anmelden</h1>
          <form action={login} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Passwort</Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required />
            </div>
            {error ? <p role="alert" className="text-sm text-destructive">E-Mail oder Passwort ist falsch.</p> : null}
            <Button type="submit">Anmelden</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
