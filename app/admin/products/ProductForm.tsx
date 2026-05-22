'use client';

import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';


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
  gender: z.string().optional(),
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
        gender: product?.gender || 'Unisex',
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
          gender: product.gender || 'Unisex',
          variants: product.variants.length > 0 ? product.variants : [{ size: '', price: 0, stock_quantity: 0 }],
        });
      } else {
        reset({
          id: undefined,
          name: '',
          description: '',
          gender: 'Unisex',
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
      <div ref={ref} className="bg-card border border-border p-8 rounded-lg max-w-4xl">
        <div className="mb-6">
          <h2 className="text-xl font-display uppercase tracking-tight">{product ? 'Edit Product' : 'Add Product'}</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Fill in the details below to {product ? 'update the' : 'create a new'} product.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
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
            <Label htmlFor="gender">Gender</Label>
            <select 
              id="gender" 
              {...register('gender')} 
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Unisex">Unisex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <Label htmlFor="imageFile">Image</Label>
            <Input id="imageFile" type="file" {...register('imageFile')} />
          </div>
          <div>
            <Label>Sizes / Variants</Label>
            <div className="max-h-48 overflow-y-auto pr-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2 p-2 border rounded-md">
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
          <div className="mt-8 pt-6 border-t border-border flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Product'}
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

ProductForm.displayName = 'ProductForm';
