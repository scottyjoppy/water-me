import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,   // never sent to the browser
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
