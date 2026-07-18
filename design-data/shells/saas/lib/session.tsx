"use client";

import { createContext, useContext, useState } from "react";
import type { Role } from "@/lib/fixtures";

/**
 * Mock session — no auth library. The RoleSwitcher in the app chrome flips
 * the current role live so every role's view is reachable without logging
 * in and out. Swap for a real session when the prototype graduates.
 */

export interface Session {
  name: string;
  email: string;
  role: Role;
}

interface SessionCtx {
  session: Session;
  setRole: (r: Role) => void;
  can: {
    editRoles: boolean;
    seeBilling: boolean;
    editSettings: boolean;
  };
}

const Ctx = createContext<SessionCtx | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("admin");
  const value: SessionCtx = {
    session: {
      name: "Priya Raghunathan",
      email: "priya.raghunathan@meridianlabs.io",
      role,
    },
    setRole,
    can: {
      editRoles: role === "admin",
      seeBilling: role === "admin",
      editSettings: role !== "viewer",
    },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSession(): SessionCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSession must be used inside <SessionProvider>");
  return ctx;
}
