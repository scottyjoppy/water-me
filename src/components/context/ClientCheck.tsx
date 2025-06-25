"use client";

import { useAuthSession } from "@/hooks/useAuthSession";
import { getUser } from "@/utils/getUser";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { session, logout } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = await getUser();
      if (!user && session) {
        await logout();
        router.push("/login");
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [session, logout, router]);

  return <>{children}</>;
}
