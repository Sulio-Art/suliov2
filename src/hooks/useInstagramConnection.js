"use client";

import { useSession } from "next-auth/react";

/**
 * A clean, robust hook that reads the Instagram connection status directly
 * from the globally managed NextAuth session. It is designed to avoid
 * race conditions during login/logout transitions.
 *
 * @returns {object} { isConnected: boolean, loading: boolean }
 */
export function useInstagramConnection() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  const isConnected =
    status === "authenticated" && !!session?.isInstagramConnected;

  return { isConnected, loading };
}
