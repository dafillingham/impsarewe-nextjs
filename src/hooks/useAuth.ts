"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, logout as apiLogout } from "@/lib/api";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = (await getCurrentUser()) as any;
        setUser(response?.user || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to logout");
    }
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    logout,
  };
}
