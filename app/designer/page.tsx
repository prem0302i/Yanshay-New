'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import { saveDesign } from '@/services/designer.service';
import { uploadFile } from '@/services/storage.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DesignerCanvas = dynamic(() => import('@/components/designer/DesignerCanvas'), { ssr: false });

const DesignerPage = () => {
  const { user } = useAuth();
  const [text, setText] = React.useState('Hello World');
  const [image, setImage] = React.useState<HTMLImageElement | null>(null);
  const stageRef = React.useRef<any>(null);

  const handleSave = async () => {
    if (!user || !stageRef.current) {
      alert('You must be logged in to save a design.');
      return;
    }

    try {
      const dataUrl = stageRef.current.toDataURL();
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'design.png', { type: 'image/png' });

      const previewUrl = await uploadFile('designs', `${user.id}/${Date.now()}_preview.png`, file);
      await saveDesign(user.id, { text }, previewUrl, 'print_url_placeholder');

      alert('Design saved successfully!');
    } catch (error) {
      console.error('Failed to save design:', error);
      alert('There was an error saving your design.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      const img = new window.Image();
      img.src = url;
      img.onload = () => setImage(img);
    }
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-8">T-Shirt Designer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 space-y-6">
          <div>
            <Label htmlFor="text-input" className="text-lg font-semibold mb-2 block">Add Text</Label>
            <Input id="text-input" type="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="image-upload" className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <Input id="image-upload" type="file" onChange={handleImageUpload} />
          </div>
          <Button size="lg" onClick={handleSave} className="w-full">Save Design</Button>
        </div>
        <div className="col-span-2 bg-muted rounded-lg flex items-center justify-center">
          <DesignerCanvas text={text} image={image} stageRef={stageRef} />
        </div>
      </div>
    </div>
  );
};

export default DesignerPage;
