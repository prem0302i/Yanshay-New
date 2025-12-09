'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

export const ProductForm = React.forwardRef<HTMLDivElement, { product?: any, onSave: (product: any) => void }>(({ product, onSave }, ref) => {
  const [name, setName] = React.useState(product?.name || '');
  const [description, setDescription] = React.useState(product?.description || '');
  const [imageUrl, setImageUrl] = React.useState(product?.image_url || '');
  const [price, setPrice] = React.useState(product?.product_variants?.[0]?.price || 0);
  const [stock, setStock] = React.useState(product?.product_variants?.[0]?.stock || 0);

  const handleSubmit = () => {
    onSave({ ...product, name, description, image_url: imageUrl, price, stock });
  };

  return (
    <DialogContent ref={ref}>
      <DialogHeader>
        <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
          <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">Price</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="stock" className="text-right">Stock</Label>
          <Input id="stock" type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value, 10))} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogFooter>
    </DialogContent>
  );
});
ProductForm.displayName = 'ProductForm';
