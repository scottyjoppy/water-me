"use client";
import { supabase } from "@/utils/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setLoading(false);
    });

    return () => sub?.subscription?.unsubscribe();
  }, []);

  const logout = () =>
    supabase.auth.signOut().then(({ error }) => {
      if (!error) setSession(null);
      return error;
    });

  return { session, loading, logout };
}
