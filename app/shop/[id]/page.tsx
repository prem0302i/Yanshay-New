import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { ProductDetails } from '@/components/product/ProductDetails';

export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('id');
  return products?.map(({ id }) => ({ id: id.toString() })) || [];
}

export const revalidate = 0;

async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, variants:product_variants (*), colors:product_colors (*), features:product_features (*), box_items:product_box_items (*), categories:product_categories (category_id, categories(name))')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  return data;
}

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(params.id);

  return (
    <div className="container mx-auto py-12 pt-8">
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailPage;
