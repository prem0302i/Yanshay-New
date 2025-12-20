'use client';

import * as React from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services/product.service';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ProductForm } from './ProductForm';
import { ConfirmationDialog } from '@/components/admin/ConfirmationDialog';

const AdminProductsPage = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<any | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<any | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const formRef = React.useRef<HTMLDivElement>(null);

  const fetchProducts = async () => {
    const data = await getProducts({ minPrice: null, maxPrice: null });
    setProducts(data);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  React.useEffect(() => {
    if (!isDialogOpen) {
      triggerRef.current?.focus();
    } else {
      setTimeout(() => {
        const firstInput = formRef.current?.querySelector('input, textarea');
        if (firstInput instanceof HTMLElement) {
          firstInput.focus();
        }
      }, 100); // Timeout to allow dialog to render
    }
  }, [isDialogOpen]);

  const handleSave = async (productData: any) => {
    if (productData.id) {
      await updateProduct(productData.id, productData);
    } else {
      await createProduct(productData);
    }
    fetchProducts();
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = async (id: string) => {
    setProductToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      fetchProducts();
      setProductToDelete(null);
    }
    setIsConfirmDialogOpen(false);
  };

  const openForm = (product: any | null = null) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button ref={triggerRef} onClick={() => openForm()}>Add Product</Button>
          </DialogTrigger>
          {isDialogOpen && <ProductForm ref={formRef} product={selectedProduct} onSave={handleSave} />}
        </Dialog>
      </div>
      <div className="overflow-y-auto h-[60vh]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.image_url && <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover" />}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => openForm(product)} className="mr-2">Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
