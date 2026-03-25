'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { updateProduct } from '@/services/product.service';
import { ProductForm } from '@/components/admin/ProductForm';

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = React.useState<any | null>(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          console.error('Error fetching product:', error);
        } else {
          setProduct(data);
        }
      }
    };
    fetchProduct();
  }, [id]);

  const handleSave = async (productData: any) => {
    try {
      if (id) {
        await updateProduct(id as string, productData);
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Failed to update product.');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm product={product} onSave={handleSave} />
    </div>
  );
};

export default EditProductPage;
