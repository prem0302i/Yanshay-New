// This is a Deno environment, so the import will be resolved by the Supabase Edge Runtime.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req: Request) => {
  // In a real app, you would call the Bolt AI API here
  const design_id = '123';
  const preview_url = 'https://placehold.co/600x400';

  return new Response(JSON.stringify({ design_id, preview_url }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
