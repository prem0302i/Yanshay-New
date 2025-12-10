import { ProductPageClient } from '@/components/product-page-client';
import { supabase } from '@/lib/supabase';

export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('id');
  return products?.map(({ id }) => ({ id: String(id) })) || [];
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { data: product } = await supabase
    .from('products')
    .select('*, variants:product_variants(*)')
    .eq('id', params.id)
    .single();

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductPageClient product={product} />;
};

export default ProductPage;
