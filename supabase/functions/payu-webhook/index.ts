import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createHash } from 'https://deno.land/std@0.168.0/hash/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req: Request) => {
  const payload = await req.json();
  const { status, txnid, amount, productinfo, firstname, email, hash } = payload;

  const PAYU_MERCHANT_KEY = Deno.env.get('PAYU_MERCHANT_KEY') || 'your_key_here';
  const PAYU_SALT = Deno.env.get('PAYU_SALT') || 'your_salt_here';

  const hashString = `${PAYU_SALT}|${status}||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_MERCHANT_KEY}`;
  const calculatedHash = createHash('sha512').update(hashString).toString();

  if (calculatedHash !== hash) {
    return new Response('Hash verification failed.', { status: 400 });
  }

  // Create a Supabase client with the service role key to bypass RLS
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const newStatus = status === 'success' ? 'paid' : 'failed';
  const { error } = await supabaseAdmin.from('orders').update({ status: newStatus }).eq('txnid', txnid);

  if (error) {
    console.error('Error updating order status:', error);
    return new Response('Error updating order status.', { status: 500 });
  }

  return new Response('OK');
});
