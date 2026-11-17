"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, CalendarDays, LayoutDashboard, MessageSquare, Receipt, Scissors, UserCog, Users,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS, isActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const ICONS: Record<(typeof NAV_ITEMS)[number]["icon"], LucideIcon> = {
  dashboard: LayoutDashboard,
  appointments: CalendarDays,
  customers: Users,
  employees: UserCog,
  services: Scissors,
  billing: Receipt,
  reports: BarChart3,
  communication: MessageSquare,
};

export function NavLinks({ orientation }: { orientation: "vertical" | "horizontal" }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Hauptnavigation"
      className={cn(orientation === "vertical" ? "flex flex-col gap-1" : "flex gap-1 overflow-x-auto px-3 pb-2")}
    >
      {NAV_ITEMS.map(({ href, label, icon }) => {
        const Icon = ICONS[icon];
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
