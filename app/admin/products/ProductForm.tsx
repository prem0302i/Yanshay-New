'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  imageFile: z.any().optional(),
  price: z.preprocess((val) => Number(val), z.number().min(0, 'Price must be a positive number')),
  stock: z.preprocess((val) => Number(val), z.number().int().min(0, 'Stock must be a positive integer')),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: any | null;
  onSave: (data: ProductFormData) => void;
}

export const ProductForm = React.forwardRef<HTMLDivElement, ProductFormProps>(
  ({ product, onSave }, ref) => {
    const [isSaving, setIsSaving] = React.useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<ProductFormData>({
      resolver: zodResolver(productSchema),
      defaultValues: {
        id: product?.id || undefined,
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
      },
    });

    React.useEffect(() => {
      reset({
        id: product?.id || undefined,
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
      });
    }, [product, reset]);

    const onInvalid = (errors: any) => {
      console.error('Form validation errors:', errors);
    };

    const onSubmit = async (data: ProductFormData) => {
      setIsSaving(true);
      try {
        await onSave(data);
      } catch (error) {
        console.error('Failed to save product:', error);
      } finally {
        setIsSaving(false);
      }
    };

    return (
      <DialogContent ref={ref}>
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
          <DialogDescription>
            Fill in the details below to {product ? 'update the' : 'create a new'} product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div>
            <Label htmlFor="imageFile">Image</Label>
            <Input id="imageFile" type="file" {...register('imageFile')} />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" {...register('price')} />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" type="number" {...register('stock')} />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    );
  }
);

ProductForm.displayName = 'ProductForm';
