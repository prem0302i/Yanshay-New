'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { getProducts, deleteProduct } from '@/services/product.service';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ConfirmationDialog } from '@/components/admin/ConfirmationDialog';

const AdminProductsPage = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<any | null>(null);
  const router = useRouter();

  const fetchProducts = async () => {
    const data = await getProducts({ minPrice: null, maxPrice: null });
    setProducts(data);
  };

  React.useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel('products-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        fetchProducts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDelete = async (id: string) => {
    setProductToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      setProductToDelete(null);
    }
    setIsConfirmDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => router.push('/admin/products/new')}>Add Product</Button>
      </div>
      <div className="overflow-y-auto h-[60vh]">
        <Table className="hidden md:table">
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.image_url && <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover" />}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/admin/products/edit/${product.id}`)} className="mr-2">Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-4">
                {product.image_url && <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded-md" />}
                <h3 className="font-bold flex-1">{product.name}</h3>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => router.push(`/admin/products/edit/${product.id}`)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmationDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};

export default AdminProductsPage;
