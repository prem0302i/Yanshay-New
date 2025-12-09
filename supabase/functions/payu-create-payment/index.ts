import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createHash } from 'https://deno.land/std@0.168.0/hash/mod.ts';

serve(async (req: Request) => {
  const { amount, productinfo, firstname, email } = await req.json();

  // IMPORTANT: Set these in your Supabase project's environment variables
  const PAYU_MERCHANT_KEY = Deno.env.get('PAYU_MERCHANT_KEY') || 'your_key_here';
  const PAYU_SALT = Deno.env.get('PAYU_SALT') || 'your_salt_here';

  const txnid = `TXN${Date.now()}`;

  const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_SALT}`;
  
  const hash = createHash('sha512').update(hashString).toString();

  const paymentDetails = {
    key: PAYU_MERCHANT_KEY,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    surl: `${Deno.env.get('NEXT_PUBLIC_SITE_URL')}/payment/success`,
    furl: `${Deno.env.get('NEXT_PUBLIC_SITE_URL')}/payment/failure`,
    hash,
  };

  return new Response(JSON.stringify(paymentDetails), {
    headers: { 'Content-Type': 'application/json' },
  });
});
