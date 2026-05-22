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
    gender: 'Unisex',
    video_url: '',
    price: 0,
    stock: 0,
    rating: 0,
    review_count: 0,
  });
  const [mediaList, setMediaList] = React.useState<any[]>([]);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
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
        gender: product.gender || 'Unisex',
        video_url: product.video_url || '',
        price: product.price || 0,
        stock: product.stock || 0,
        rating: product.rating || 0,
        review_count: product.review_count || 0,
      };
      setFormData(initialData);

      if (product.variants?.length > 0) setSizes(product.variants.map((v: any) => v.size));
      if (product.colors?.length > 0) setColors(product.colors.map((c: any) => ({ name: c.color_name, hex: c.color_hex })));
      if (product.features?.length > 0) setFeatures(product.features.map((f: any) => ({ title: f.title, description: f.description })));
      if (product.box_items?.length > 0) setBoxItems(product.box_items.map((b: any) => b.item_name));
      if (product.categories?.length > 0) setSelectedCategories(product.categories.map((c: any) => c.category_id));
      
      if (product.image_url) {
        setMediaList(product.image_url.split(','));
      }
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
    setMediaList(prev => [...prev, ...files]);
  };

  const moveMedia = (index: number, direction: number) => {
    const newList = [...mediaList];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newList.length) {
      [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
      setMediaList(newList);
    }
  };

  const removeMedia = (index: number) => {
    const newList = [...mediaList];
    newList.splice(index, 1);
    setMediaList(newList);
  };

    const handleSubmit = () => {
    const variants = sizes.map(size => ({
      size,
      price: formData.price,
      stock_quantity: formData.stock
    }));
    const imageFile = mediaList.length > 0 && typeof mediaList[0] !== 'string' ? mediaList[0] : null;

    onSave({ 
      ...product, 
      ...formData, 
      imageFile,
      imageFiles: mediaList, 
      videoFile, 
      categories: selectedCategories, 
      sizes, 
      colors, 
      features, 
      boxItems,
      variants
    });
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
              <Select value={selectedCategories.length > 0 ? String(selectedCategories[0]) : undefined} onValueChange={(value) => setSelectedCategories(value ? [Number(value)] : [])}>
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
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unisex">Unisex</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
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
              <Input id="rating" type="number" min={1} max={5} step={0.1} value={formData.rating} onChange={(e) => handleInputChange('rating', e.target.value === '' ? 0 : parseFloat(e.target.value))} />
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
            <div className="flex flex-wrap gap-4 mt-4">
              {mediaList.map((item, index) => {
                const preview = typeof item === 'string' ? item : URL.createObjectURL(item);
                return (
                  <div key={index} className="flex flex-col items-center gap-2 border p-2 rounded-md bg-card">
                    <img src={preview} alt={`preview ${index}`} className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex gap-1 w-full justify-between">
                      <Button type="button" size="icon" className="w-6 h-6" variant="outline" onClick={() => moveMedia(index, -1)} disabled={index === 0}>&lt;</Button>
                      <Button type="button" size="icon" className="w-6 h-6" variant="destructive" onClick={() => removeMedia(index)}>X</Button>
                      <Button type="button" size="icon" className="w-6 h-6" variant="outline" onClick={() => moveMedia(index, 1)} disabled={index === mediaList.length - 1}>&gt;</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="video">Video (optional)</Label>
            <Input id="video" type="file" onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)} />
            {formData.video_url && !videoFile && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Current Video:</p>
                <video src={formData.video_url} controls className="w-48 rounded-md" />
              </div>
            )}
            {videoFile && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">New Video Selected:</p>
                <video src={URL.createObjectURL(videoFile)} controls className="w-48 rounded-md" />
              </div>
            )}
          </div>
        </div>
      </div>
                    <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Sizes</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(preset => (
               <Button 
                 key={preset}
                 type="button"
                 size="sm"
                 variant={sizes.includes(preset) ? 'default' : 'outline'}
                 onClick={() => {
                   if (!sizes.includes(preset)) {
                     setSizes(prev => {
                       const newSizes = prev.filter(s => s !== '');
                       return [...newSizes, preset];
                     });
                   }
                 }}
               >
                 {preset}
               </Button>
            ))}
          </div>
          {sizes.map((size, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input value={size} onChange={(e) => {
                const newSizes = [...sizes];
                newSizes[index] = e.target.value.toUpperCase();
                setSizes(newSizes);
              }} placeholder="Custom Size (e.g. 32)" />
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
