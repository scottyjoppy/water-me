"use client";

import { supabase } from "@/supabaseClient";

export default function LogoutButton() {
  return <button onClick={() => supabase.auth.signOut()}>Log out</button>;
}
