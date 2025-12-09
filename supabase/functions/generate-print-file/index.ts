import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req: Request) => {
  const { design_id } = await req.json();

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { data: design, error: designError } = await supabaseAdmin
    .from('designs')
    .select('design_data')
    .eq('id', design_id)
    .single();

  if (designError) throw designError;

  // Placeholder for generating a print file (e.g., using a canvas library)
  const printFileContent = `Print file for design ${design_id}`;
  const fileName = `print_${design_id}.txt`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from('print_files')
    .upload(fileName, printFileContent, { contentType: 'text/plain' });

  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabaseAdmin.storage.from('print_files').getPublicUrl(fileName);

  await supabaseAdmin
    .from('print_jobs')
    .update({ status: 'ready', print_file_url: publicUrlData.publicUrl })
    .eq('design_id', design_id);

  return new Response(JSON.stringify({ success: true, url: publicUrlData.publicUrl }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
