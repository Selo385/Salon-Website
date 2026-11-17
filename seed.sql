export const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
  { href: "/appointments", label: "Termine", icon: "appointments" },
  { href: "/customers", label: "Kunden", icon: "customers" },
  { href: "/employees", label: "Mitarbeiter", icon: "employees" },
  { href: "/services", label: "Leistungen", icon: "services" },
  { href: "/billing", label: "Kasse", icon: "billing" },
  { href: "/reports", label: "Auswertungen", icon: "reports" },
  { href: "/communication", label: "Kommunikation", icon: "communication" },
] as const;

export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
