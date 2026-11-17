import { Button } from "@/components/ui/button";
import { NavLinks } from "@/components/layout/nav-links";
import { logout } from "@/app/login/actions";

function Brand() {
  return <span className="text-base font-semibold tracking-tight">Salon<span className="text-accent">.</span></span>;
}

function LogoutForm() {
  return (
    <form action={logout}>
      <Button variant="ghost" size="sm" type="submit">Abmelden</Button>
    </form>
  );
}

export function Sidebar({ email }: { email: string }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r bg-card p-4 lg:flex">
      <div className="px-3 py-2"><Brand /></div>
      <div className="mt-6 flex-1"><NavLinks orientation="vertical" /></div>
      <div className="border-t pt-3">
        <p className="truncate px-3 pb-2 text-xs text-muted-foreground">{email}</p>
        <LogoutForm />
      </div>
    </aside>
  );
}

export function MobileNav() {
  return (
    <header className="border-b bg-card pt-3 lg:hidden">
      <div className="flex items-center justify-between px-4 pb-2">
        <Brand />
        <LogoutForm />
      </div>
      <NavLinks orientation="horizontal" />
    </header>
  );
}
