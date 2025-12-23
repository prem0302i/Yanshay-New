'use client';

import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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

const variantSchema = z.object({
  size: z.string().min(1, 'Size is required'),
  price: z.preprocess((val) => Number(val), z.number().min(0, 'Price must be positive')),
  stock_quantity: z.preprocess((val) => Number(val), z.number().int().min(0, 'Stock must be a positive integer')),
});

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  imageFile: z.any().optional(),
  variants: z.array(variantSchema).min(1, 'At least one size variant is required'),
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
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<ProductFormData>({
      resolver: zodResolver(productSchema),
      defaultValues: {
        id: product?.id || undefined,
        name: product?.name || '',
        description: product?.description || '',
        variants: product?.variants || [{ size: '', price: 0, stock_quantity: 0 }],
      },
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'variants',
    });

    React.useEffect(() => {
      if (product) {
        reset({
          id: product.id,
          name: product.name,
          description: product.description,
          variants: product.variants.length > 0 ? product.variants : [{ size: '', price: 0, stock_quantity: 0 }],
        });
      } else {
        reset({
          id: undefined,
          name: '',
          description: '',
          variants: [{ size: '', price: 0, stock_quantity: 0 }],
        });
      }
    }, [product, reset]);

    const onInvalid = (errors: any) => {
      console.error('Form validation errors:', errors);
    };

    const onSubmit = async (data: ProductFormData) => {
      setIsSaving(true);
      try {
        const productData = { ...data };
        if (data.imageFile && data.imageFile.length > 0) {
          productData.imageFile = data.imageFile[0];
        }
        await onSave(productData);
      } catch (error) {
        console.error('Failed to save product:', error);
        // Optionally, show a toast notification to the user
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
            <Label>Sizes / Variants</Label>
            <div className="max-h-48 overflow-y-auto pr-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2 mb-2 p-2 border rounded-md">
                  <div className="flex-1">
                    <Label htmlFor={`variants.${index}.size`} className="sr-only">Size</Label>
                    <Input placeholder="Size (e.g., M)" {...register(`variants.${index}.size`)} />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`variants.${index}.price`} className="sr-only">Price</Label>
                    <Input placeholder="Price" type="number" {...register(`variants.${index}.price`)} />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`variants.${index}.stock_quantity`} className="sr-only">Stock</Label>
                    <Input placeholder="Stock" type="number" {...register(`variants.${index}.stock_quantity`)} />
                  </div>
                  <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>Remove</Button>
                </div>
              ))}
            </div>
            <Button type="button" onClick={() => append({ size: '', price: 0, stock_quantity: 0 })}>Add Size</Button>
            {errors.variants && <p className="text-red-500 text-sm">{errors.variants.message || (errors.variants as any).root?.message}</p>}
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
