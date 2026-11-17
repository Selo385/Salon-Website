import { redirect } from "next/navigation";
import { MobileNav, Sidebar } from "@/components/layout/sidebar";
import { getCurrentRole, getCurrentUser } from "@/lib/auth";
import { isStaffRole } from "@/lib/roles";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isStaffRole(await getCurrentRole())) redirect("/no-access");

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar email={user.email ?? ""} />
      <div className="min-w-0 flex-1">
        <MobileNav />
        <main className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
