import { ProductPageClient } from '@/components/product-page-client';

export async function generateStaticParams() {
  // In a real app, you would fetch your product IDs from a database or API
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

const ProductPage = () => {
  return <ProductPageClient />;
};

export default ProductPage;
