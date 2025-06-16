"use client";

import { useAuthSession } from "@/hooks/useAuthSession";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { session, logout } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session && session) {
        await logout();
        router.push("/login");
      }
    }, 10000); // check every 10 seconds

    return () => clearInterval(interval);
  }, [session, logout, router]);

  return <>{children}</>;
}
