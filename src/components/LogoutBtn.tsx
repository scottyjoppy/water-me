"use client";

import { supabase } from "@/utils/supabase/client";

export default function LogoutButton() {
  return <button onClick={() => supabase.auth.signOut()}>Log out</button>;
}
