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

export const createOrder = async (userId: string, totalAmount: number, shippingAddress: any, cartItems: any[]) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{ user_id: userId, total_amount: totalAmount, shipping_address: shippingAddress }])
    .select();

  if (orderError) {
    throw new Error(orderError.message);
  }

  const orderItems = cartItems.map((item) => ({
    order_id: order[0].id,
    variant_id: item.variant_id,
    quantity: item.quantity,
    price: item.product_variants.price,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  // Clear the cart after creating the order
  const { error: deleteError } = await supabase.from('carts').delete().eq('user_id', userId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return order[0];
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;

  return data;
};
