// supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import { Plant } from "./types/databaseValues";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<{
  plants: Plant;
}>(supabaseUrl, supabaseKey);
