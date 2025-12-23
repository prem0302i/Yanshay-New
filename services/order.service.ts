import { supabase } from '@/lib/supabase';

export const getOrders = async () => {
  const { data, error } = await supabase.from('orders').select(`
    *,
    order_items (*),
    users!inner(id, full_name)
  `);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createOrder = async (userId: string, totalAmount: number, shippingAddressId: string, cartItems: any[]) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{
      user_id: userId,
      total_amount: totalAmount,
      final_amount: totalAmount, // Initially, final amount is the same as total
      shipping_address_id: shippingAddressId,
      status: 'pending',
    }])
    .select()
    .single();

  if (orderError) {
    throw new Error(orderError.message);
  }

  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    variant_id: item.variant_id,
    quantity: item.quantity,
    price: item.product_variants.price,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

  if (itemsError) {
    // Consider rolling back the order creation if items fail to insert
    throw new Error(itemsError.message);
  }

  return order;
};

export const getOrderDetails = async (orderId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*, product_variants(*, products(*)))
    `)
    .eq('id', orderId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateOrderDiscount = async (orderId: string, voucherId: string, discountAmount: number, finalAmount: number) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ voucher_id: voucherId, discount_amount: discountAmount, final_amount: finalAmount })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select('*, user_id')
    .single();

  if (error) throw error;

  // If the order is paid, clear the user's cart
  if (status === 'paid' && data) {
    const { error: deleteError } = await supabase.from('carts').delete().eq('user_id', data.user_id);
    if (deleteError) {
      console.error('Failed to clear cart:', deleteError.message);
      // Don't throw here, as the payment was successful
    }
  }

  return data;
};
