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
  // First, check if the variant exists
  const { data: variant, error: variantError } = await supabase
    .from('product_variants')
    .select('id')
    .eq('id', variantId)
    .single();

  if (variantError || !variant) {
    throw new Error('This product is out of stock.');
  }

  const { data: existingItem, error: selectError } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .eq('variant_id', variantId)
    .single();

  if (selectError && selectError.code !== 'PGRST116') {
    throw new Error(selectError.message);
  }

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    const { data, error } = await supabase
      .from('carts')
      .update({ quantity: newQuantity })
      .eq('id', existingItem.id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from('carts')
      .insert([{ user_id: userId, variant_id: variantId, quantity }]);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateCartItemQuantity = async (cartItemId: number, quantity: number) => {
  const { data, error } = await supabase
    .from('carts')
    .update({ quantity })
    .eq('id', cartItemId);

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
