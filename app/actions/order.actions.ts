'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase URL or Service Role key.');
}

// Create a supabase client with the service role key to bypass RLS
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function updateOrderStatusAsAdmin(orderId: string, status: string) {
  // Update the status using the admin client
  const { data: updatedOrder, error } = await supabaseAdmin
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select('*');

  if (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }

  const orderData = updatedOrder && updatedOrder.length > 0 ? updatedOrder[0] : null;

  // If the order is paid, clear the user's cart
  if (status === 'paid' && orderData) {
    const { error: deleteError } = await supabaseAdmin
      .from('carts')
      .delete()
      .eq('user_id', orderData.user_id);
      
    if (deleteError) {
      console.error('Failed to clear cart:', deleteError.message);
    }
  }

  return { success: true, order: orderData };
}
