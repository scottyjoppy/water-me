"use client";

import { supabase } from "@/utils/supabase/client"; // adjust path if needed
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current session on mount
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Session fetch error:", error);
      setSession(data?.session ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for login/logout events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    // Listen to localStorage changes (e.g., across tabs or manual clearing)
    const onStorageChange = () => getSession();
    window.addEventListener("storage", onStorageChange);

    // Cleanup
    return () => {
      authListener?.subscription?.unsubscribe();
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) setSession(null);
    return error;
  };

  return { session, loading, logout };
};
