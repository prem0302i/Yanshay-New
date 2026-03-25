import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { ProductDetails } from '@/components/product/ProductDetails';

export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('id');
  return products?.map(({ id }) => ({ id: id.toString() })) || [];
}

async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, variants:product_variants (*)')
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
    <div className="container mx-auto py-16 pt-32">
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailPage;
