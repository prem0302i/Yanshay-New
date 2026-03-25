'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCategories } from '@/services/category.service';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ProductForm = React.forwardRef<HTMLDivElement, { product?: any, onSave: (product: any) => void }>(({ product, onSave }, ref) => {
    const [formData, setFormData] = React.useState<any>({
    name: '',
    description: '',
    video_url: '',
    price: 0,
    stock: 0,
    rating: 0,
    review_count: 0,
  });
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>([]);
  const [sizes, setSizes] = React.useState<string[]>(['']);
  const [colors, setColors] = React.useState<{ name: string, hex: string }[]>([{ name: '', hex: '#000000' }]);
  const [features, setFeatures] = React.useState<{ title: string, description: string }[]>([{ title: '', description: '' }]);
  const [boxItems, setBoxItems] = React.useState<string[]>(['']);

    React.useEffect(() => {
    if (product) {
      const initialData = {
        name: product.name || '',
        description: product.description || '',
        video_url: product.video_url || '',
        price: product.price || 0,
        stock: product.stock || 0,
        rating: product.rating || 0,
        review_count: product.review_count || 0,
      };
      setFormData(initialData);
    }

    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data || []);
    };
    fetchCategories();
  }, [product]);

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData({ ...formData, [fieldName]: value });
  };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImageFiles(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

    const handleSubmit = () => {
    onSave({ ...product, ...formData, imageFiles, videoFile, categories: selectedCategories, sizes, colors, features, boxItems });
  };

  return (
    <div ref={ref} className="max-w-3xl">
      <div className="grid gap-6 py-4">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setSelectedCategories(value ? [Number(value)] : [])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
          </div>
                  </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Indian Pricing, Stock & Rating</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value === '' ? 0 : parseFloat(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" value={formData.stock} onChange={(e) => handleInputChange('stock', e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" type="number" value={formData.rating} onChange={(e) => handleInputChange('rating', e.target.value === '' ? 0 : parseFloat(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="review_count">Reviews</Label>
              <Input id="review_count" type="number" value={formData.review_count} onChange={(e) => handleInputChange('review_count', e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
            </div>
          </div>
        </div>

                <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Media</h3>
          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input id="images" type="file" multiple onChange={handleImageChange} />
            <div className="flex gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`preview ${index}`} className="w-24 h-24 object-cover rounded-md" />
              ))}
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="video">Video (optional)</Label>
            <Input id="video" type="file" onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)} />
          </div>
        </div>
      </div>
                    <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Sizes</h3>
          {sizes.map((size, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input value={size} onChange={(e) => {
                const newSizes = [...sizes];
                newSizes[index] = e.target.value;
                setSizes(newSizes);
              }} placeholder="Size (e.g., M)" />
              <Button variant="destructive" size="sm" onClick={() => setSizes(sizes.filter((_, i) => i !== index))}>Remove</Button>
            </div>
          ))}
          <Button onClick={() => setSizes([...sizes, ''])}>Add Size</Button>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Colors</h3>
          {colors.map((color, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input value={color.name} onChange={(e) => {
                const newColors = [...colors];
                newColors[index].name = e.target.value;
                setColors(newColors);
              }} placeholder="Color Name" />
              <Input type="color" value={color.hex} onChange={(e) => {
                const newColors = [...colors];
                newColors[index].hex = e.target.value;
                setColors(newColors);
              }} />
              <Button variant="destructive" size="sm" onClick={() => setColors(colors.filter((_, i) => i !== index))}>Remove</Button>
            </div>
          ))}
          <Button onClick={() => setColors([...colors, { name: '', hex: '#000000' }])}>Add Color</Button>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          {features.map((feature, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mb-2">
              <Input value={feature.title} onChange={(e) => {
                const newFeatures = [...features];
                newFeatures[index].title = e.target.value;
                setFeatures(newFeatures);
              }} placeholder="Feature Title" />
              <Input value={feature.description} onChange={(e) => {
                const newFeatures = [...features];
                newFeatures[index].description = e.target.value;
                setFeatures(newFeatures);
              }} placeholder="Feature Description" />
              <Button variant="destructive" size="sm" onClick={() => setFeatures(features.filter((_, i) => i !== index))}>Remove</Button>
            </div>
          ))}
          <Button onClick={() => setFeatures([...features, { title: '', description: '' }])}>Add Feature</Button>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">What's in the Box</h3>
          {boxItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input value={item} onChange={(e) => {
                const newBoxItems = [...boxItems];
                newBoxItems[index] = e.target.value;
                setBoxItems(newBoxItems);
              }} placeholder="Item Name" />
              <Button variant="destructive" size="sm" onClick={() => setBoxItems(boxItems.filter((_, i) => i !== index))}>Remove</Button>
            </div>
          ))}
          <Button onClick={() => setBoxItems([...boxItems, ''])}>Add Item</Button>
        </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
});
ProductForm.displayName = 'ProductForm';
