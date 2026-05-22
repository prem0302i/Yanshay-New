import { supabase } from '@/lib/supabase';

export const getProducts = async (filters: { minPrice?: number | null; maxPrice?: number | null }) => {
  let query = supabase.from('products').select(`
    *,
    variants:product_variants (*)
  `);

  // Note: Filtering by price will need to be adjusted to consider variants.
  // This is a placeholder for now.
  if (filters.minPrice) {
    // query = query.gte('price', filters.minPrice);
  }

  if (filters.maxPrice) {
    // query = query.lte('price', filters.maxPrice);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createProduct = async (product: any) => {
  const { name, description, imageFile, imageFiles, videoFile, variants, price, stock, rating, review_count, gender, categories, colors, features, boxItems } = product;
  let imageUrl = '';
  let videoUrl = product.video_url || '';

  if (imageFiles && imageFiles.length > 0) {
    const urls = [];
    for (const file of imageFiles) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(`${Date.now()}_${file.name}`, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('product-images').getPublicUrl(uploadData.path);
      urls.push(data.publicUrl);
    }
    imageUrl = urls.join(',');
  } else if (imageFile) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(`${Date.now()}_${imageFile.name}`, imageFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('product-images').getPublicUrl(uploadData.path);
    imageUrl = data.publicUrl;
  }

  if (videoFile) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(`${Date.now()}_${videoFile.name}`, videoFile);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('product-images').getPublicUrl(uploadData.path);
    videoUrl = data.publicUrl;
  }

  // Create the product
  const { data: newProduct, error: productError } = await supabase
    .from('products')
    .insert({ name, description, image_url: imageUrl, price, stock, rating, review_count, gender, video_url: videoUrl })
    .select()
    .single();

  if (productError) throw productError;

  // Create variants
  const variantsToInsert = variants.map((variant: any) => ({
    product_id: newProduct.id,
    size: variant.size,
    price: variant.price,
    stock: variant.stock_quantity,
  }));

  const { error: variantError } = await supabase.from('product_variants').insert(variantsToInsert);
  if (variantError) throw variantError;

  if (categories?.length > 0) {
    await supabase.from('product_categories').insert(categories.map((c: number) => ({ product_id: newProduct.id, category_id: c })));
  }
  if (colors?.filter((c: any) => c.name).length > 0) {
    await supabase.from('product_colors').insert(colors.filter((c: any) => c.name).map((c: any) => ({ product_id: newProduct.id, color_name: c.name, color_hex: c.hex })));
  }
  if (features?.filter((f: any) => f.title).length > 0) {
    await supabase.from('product_features').insert(features.filter((f: any) => f.title).map((f: any) => ({ product_id: newProduct.id, title: f.title, description: f.description })));
  }
  if (boxItems?.filter((b: string) => b).length > 0) {
    await supabase.from('product_box_items').insert(boxItems.filter((b: string) => b).map((b: string) => ({ product_id: newProduct.id, item_name: b })));
  }

  return newProduct;
};

export const updateProduct = async (id: string, updates: any) => {
  const { name, description, imageFile, imageFiles, videoFile, variants, price, stock, rating, review_count, gender, categories, colors, features, boxItems } = updates;
  let imageUrl = updates.image_url;
  let videoUrl = updates.video_url;

  if (imageFiles && imageFiles.length > 0) {
    const urls = [];
    for (const file of imageFiles) {
      // Avoid uploading if it's already a URL (e.g. from existing images, though usually file objects are new)
      if (typeof file === 'string') {
        urls.push(file);
      } else {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(`${Date.now()}_${file.name}`, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('product-images').getPublicUrl(uploadData.path);
        urls.push(data.publicUrl);
      }
    }
    imageUrl = urls.join(',');
  } else if (imageFile) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(`${Date.now()}_${imageFile.name}`, imageFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('product-images').getPublicUrl(uploadData.path);
    imageUrl = data.publicUrl;
  }

  if (videoFile) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(`${Date.now()}_${videoFile.name}`, videoFile);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('product-images').getPublicUrl(uploadData.path);
    videoUrl = data.publicUrl;
  }

  // Update product details
  const { data: productData, error: productError } = await supabase
    .from('products')
    .update({ name, description, image_url: imageUrl, price, stock, rating, review_count, gender, video_url: videoUrl })
    .eq('id', id)
    .select()
    .single();

  if (productError) throw productError;

  // Delete existing variants
  const { error: deleteError } = await supabase.from('product_variants').delete().eq('product_id', id);
  if (deleteError) throw deleteError;

  // Insert new variants
  const variantsToInsert = variants.map((variant: any) => ({
    product_id: id,
    size: variant.size,
    price: variant.price,
    stock: variant.stock_quantity,
  }));

  const { error: insertError } = await supabase.from('product_variants').insert(variantsToInsert);
  if (insertError) throw insertError;

  await supabase.from('product_categories').delete().eq('product_id', id);
  if (categories?.length > 0) {
    await supabase.from('product_categories').insert(categories.map((c: number) => ({ product_id: id, category_id: c })));
  }

  await supabase.from('product_colors').delete().eq('product_id', id);
  if (colors?.filter((c: any) => c.name).length > 0) {
    await supabase.from('product_colors').insert(colors.filter((c: any) => c.name).map((c: any) => ({ product_id: id, color_name: c.name, color_hex: c.hex })));
  }

  await supabase.from('product_features').delete().eq('product_id', id);
  if (features?.filter((f: any) => f.title).length > 0) {
    await supabase.from('product_features').insert(features.filter((f: any) => f.title).map((f: any) => ({ product_id: id, title: f.title, description: f.description })));
  }

  await supabase.from('product_box_items').delete().eq('product_id', id);
  if (boxItems?.filter((b: string) => b).length > 0) {
    await supabase.from('product_box_items').insert(boxItems.filter((b: string) => b).map((b: string) => ({ product_id: id, item_name: b })));
  }

  return productData;
};

export const searchProducts = async (query: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, variants:product_variants (*)')
    .ilike('name', `%${query}%`);

  if (error) {
    throw new Error(error.message);
  }

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

  // Delete all cart and order items associated with the product's variants
  if (variantIds.length > 0) {
    const { error: cartError } = await supabase.from('carts').delete().in('variant_id', variantIds);
    if (cartError) throw cartError;

    const { error: orderItemsError } = await supabase.from('order_items').delete().in('variant_id', variantIds);
    if (orderItemsError) throw orderItemsError;
  }

  // Then, delete all variants associated with the product
  const { error: variantError } = await supabase.from('product_variants').delete().eq('product_id', id);
  if (variantError) throw variantError;

  // Finally, delete the product itself
  const { error: productError } = await supabase.from('products').delete().eq('id', id);
  if (productError) throw productError;

  return true;
};
