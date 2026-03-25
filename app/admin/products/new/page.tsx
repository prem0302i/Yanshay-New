'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/services/product.service';
import { ProductForm } from '@/components/admin/ProductForm';

const NewProductPage = () => {
  const router = useRouter();

  const handleSave = async (productData: any) => {
    try {
      await createProduct(productData);
      router.push('/admin/products');
    } catch (error) {
      console.error('Failed to create product:', error as Error);
      alert('Failed to create product.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <ProductForm onSave={handleSave} />
    </div>
  );
};

export default NewProductPage;
