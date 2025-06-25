import { getUser } from "@/utils/getUser";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    console.log("User fetch error");
    redirect("/login");
  }

  return <>{children}</>;
}
