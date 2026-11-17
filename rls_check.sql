import type { Role } from "../types/roles.ts";

export function isStaffRole(role: Role | null | undefined): boolean {
  return role === "owner" || role === "manager" || role === "staff";
}

export function isManagerRole(role: Role | null | undefined): boolean {
  return role === "owner" || role === "manager";
}
