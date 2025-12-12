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
  const { name, description, imageFile, price, stock } = product;
  let imageUrl = '';

  if (imageFile) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(`${Date.now()}_${imageFile.name}`, imageFile);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(uploadData.path);
    imageUrl = urlData.publicUrl;
  }

  // Create the product
  const { data: newProduct, error: productError } = await supabase
    .from('products')
    .insert({ name, description, image_url: imageUrl, price })
    .select()
    .single();

  if (productError) throw productError;

  // Create a default variant for the product
  const { error: variantError } = await supabase.from('product_variants').insert({
    product_id: newProduct.id,
    sku: `${name.toUpperCase().replace(/\s/g, '-')}-DEFAULT`,
    price,
    stock_quantity: stock,
  });

  if (variantError) throw variantError;

  return newProduct;
};

export const updateProduct = async (id: string, updates: any) => {
  const { name, description, imageFile, price, stock } = updates;
  let imageUrl = updates.image_url;

  if (imageFile) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(`${Date.now()}_${imageFile.name}`, imageFile);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(uploadData.path);
    imageUrl = urlData.publicUrl;
  }
  const { data, error } = await supabase
    .from('products')
    .update({ name, description, image_url: imageUrl, price, stock })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string) => {
  // First, get all variants associated with the product
  const { data: variants, error: variantsError } = await supabase
    .from('product_variants')
    .select('id')
    .eq('product_id', id);
  if (variantsError) throw variantsError;

  const variantIds = variants.map((v) => v.id);

  // Delete all cart items associated with the product's variants
  if (variantIds.length > 0) {
    const { error: cartError } = await supabase.from('carts').delete().in('variant_id', variantIds);
    if (cartError) throw cartError;
  }

  // Then, delete all variants associated with the product
  const { error: variantError } = await supabase.from('product_variants').delete().eq('product_id', id);
  if (variantError) throw variantError;

  // Finally, delete the product itself
  const { error: productError } = await supabase.from('products').delete().eq('id', id);
  if (productError) throw productError;

  return true;
};
