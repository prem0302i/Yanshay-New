import { supabase } from '@/lib/supabase';

export const applyVoucher = async (code: string, totalAmount: number) => {
  const { data: voucher, error } = await supabase
    .from('vouchers')
    .select('*')
    .eq('code', code)
    .eq('is_active', true)
    .single();

  if (error || !voucher) {
    throw new Error('Invalid or expired voucher code.');
  }

  // Add more validation here (e.g., date checks)

  let discountAmount = 0;
  if (voucher.discount_type === 'percentage') {
    discountAmount = (totalAmount * voucher.discount_value) / 100;
  } else {
    discountAmount = voucher.discount_value;
  }

  const finalAmount = totalAmount - discountAmount;

  return { voucher, discountAmount, finalAmount };
};
