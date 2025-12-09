import { supabase } from '@/lib/supabase';

export const getProducts = async (filters: { minPrice?: number | null; maxPrice?: number | null }) => {
  let query = supabase.from('products').select('*');

  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }

  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createProduct = async (product: any) => {
  const { name, description, image_url, price, stock } = product;
  const { data, error } = await supabase
    .from('products')
    .insert({ name, description, image_url, price, stock })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProduct = async (id: string, updates: any) => {
  const { name, description, image_url, price, stock } = updates;
  const { data, error } = await supabase
    .from('products')
    .update({ name, description, image_url, price, stock })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
  return true;
};
