"use client";

import { useAuthSession } from "@/hooks/useAuthSession";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { session, logout } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    const checkCookie = () => {
      const loggedIn = document.cookie.includes("authToken");
      if (!loggedIn && session) {
        logout();
        router.push("/login"); // redirect to login page
      }
    };

    const interval = setInterval(checkCookie, 10000);
    return () => clearInterval(interval);
  }, [session, logout, router]);

  return <>{children}</>;
}
