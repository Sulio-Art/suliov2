"use client";

import { useSession } from "next-auth/react";

export function useInstagramConnection() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  const isConnected =
    status === "authenticated" && !!session?.isInstagramConnected;

  return { isConnected, loading };
}
