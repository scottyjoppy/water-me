import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    console.log("User feth error:", error)
    redirect("/login");
  }

  return <>{children}</>;
}
