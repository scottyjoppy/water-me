"use client"

import { createBrowserClient } from "@supabase/ssr";
import { Plant } from "./types/databaseValues";
import { Database } from "./types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseKey);
