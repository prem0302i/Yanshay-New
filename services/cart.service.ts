import { supabase } from '@/lib/supabase';

export const getCartItems = async (userId: string) => {
  const { data, error } = await supabase
    .from('carts')
    .select(`
      *,
      product_variants (*, products (*))
    `)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addToCart = async (userId: string, variantId: number, quantity: number) => {
  const { data, error } = await supabase
    .from('carts')
    .insert([{ user_id: userId, variant_id: variantId, quantity }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const removeFromCart = async (cartItemId: number) => {
  const { data, error } = await supabase.from('carts').delete().eq('id', cartItemId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
