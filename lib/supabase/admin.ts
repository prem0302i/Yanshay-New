import { createClient } from '@supabase/supabase-js';

// Initialize the admin client once and export it
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
