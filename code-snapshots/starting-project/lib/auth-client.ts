"use client";

import { useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
}

interface UseSessionResult {
  data: { user: User } | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

export function useSession(): UseSessionResult {
  const [session, setSession] = useState<UseSessionResult>({
    data: null,
    status: "loading",
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const user = await res.json();
          setSession({ data: { user }, status: "authenticated" });
        } else {
          setSession({ data: null, status: "unauthenticated" });
        }
      } catch {
        setSession({ data: null, status: "unauthenticated" });
      }
    };
    checkSession();
  }, []);

  return session;
}

export async function signUp(email: string, password: string) {
  const res = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function signIn(email: string, password: string) {
  const res = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function signOut() {
  await fetch("/api/auth/sign-out", { method: "POST" });
}
