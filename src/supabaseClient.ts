// supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import type { Plant } from "../types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<{
  plants: Plant;
}>(supabaseUrl, supabaseKey);
