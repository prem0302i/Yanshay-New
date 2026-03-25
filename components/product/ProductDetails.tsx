'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { addToCart } from '@/services/cart.service';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ShoppingBag, Ruler, Truck, ShieldCheck } from 'lucide-react';

export const ProductDetails = ({ product }: { product: any }) => {
  const [selectedVariant, setSelectedVariant] = React.useState<any>(product.variants?.[0]);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('description');

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error('Please select a size.');
      return;
    }

    try {
      if (!user) {
         // Local storage cart for guest
         const cart = JSON.parse(localStorage.getItem('cart') || '[]');
         const existing = cart.find((item: any) => item.variant_id === selectedVariant.id);
         if (existing) existing.quantity += 1;
         else cart.push({ variant_id: selectedVariant.id, quantity: 1 });
         localStorage.setItem('cart', JSON.stringify(cart));
      } else {
         await addToCart(user.id, selectedVariant.id, 1);
      }
      toast.success('Added to your bag.');
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 pt-12 pb-24">
      
      {/* Product Image Gallery (Asymmetric) */}
      <div className="lg:col-span-7 space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="aspect-[4/5] bg-[#111] overflow-hidden group"
        >
          {product.image_url && (
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" 
            />
          )}
        </motion.div>
        
        {/* Secondary Details (Thumbnail style) */}
        <div className="grid grid-cols-2 gap-8">
           <div className="aspect-square bg-white/5 opacity-50 hover:opacity-100 transition-opacity" />
           <div className="aspect-square bg-white/5 opacity-50 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Product Info (Stick Sidebar style on large screens) */}
      <div className="lg:col-span-5 flex flex-col pt-4">
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-primary text-[10px] tracking-[0.4em] font-sans font-bold uppercase mb-4 block">Studio Archive</span>
          <h1 className="text-5xl md:text-6xl font-display font-medium leading-[0.9] tracking-tighter uppercase mb-6">
            {product.name}
          </h1>
          
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
             <p className="text-3xl font-sans font-semibold text-primary">₹{selectedVariant?.price || product.price}</p>
             <div className="flex items-center gap-1 text-[10px] tracking-widest text-muted-foreground uppercase">
                <ShieldCheck size={14} className="text-primary" /> 
                Refine Quality
             </div>
          </div>

          <p className="text-muted-foreground text-lg font-sans font-light leading-relaxed mb-10">
            {product.description || "A signature piece from the latest collection. Crafted with architectural intent and precision heavyweight cotton for a structured silhouette."}
          </p>

          {/* Configuration Selection */}
          <div className="space-y-10 mb-12">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-primary">Select Configuration</h3>
                <button className="flex items-center gap-2 text-[10px] tracking-widest uppercase hover:text-primary transition-colors">
                  <Ruler size={14} /> Size Guide
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant: any) => (
                  <button 
                    key={variant.id} 
                    className={`min-w-[70px] h-12 flex items-center justify-center text-xs tracking-widest font-bold uppercase transition-all duration-300 border-b-2 ${
                      selectedVariant?.id === variant.id 
                        ? 'border-primary text-primary bg-primary/5' 
                        : 'border-white/10 text-muted-foreground hover:border-white/30'
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button size="lg" className="w-full h-16 text-xs font-bold tracking-[0.3em] uppercase transition-transform hover:scale-[1.01]" onClick={handleAddToCart}>
               Secure to Bag
            </Button>
            <Button variant="outline" size="lg" className="w-full h-16 text-xs font-bold tracking-[0.3em] uppercase border-primary/20 hover:bg-primary/5">
               Launch Customizer
            </Button>
          </div>

          {/* Delivery Info Mini-Banner */}
          <div className="mt-12 p-6 bg-[#111] grid grid-cols-2 gap-4">
             <div className="flex items-center gap-3">
                <Truck size={16} className="text-primary" />
                <span className="text-[9px] tracking-widest uppercase font-bold text-muted-foreground">Standard Delivery (3-5 Days)</span>
             </div>
             <div className="flex items-center gap-3">
                <ShoppingBag size={16} className="text-primary" />
                <span className="text-[9px] tracking-widest uppercase font-bold text-muted-foreground">Studio Pickup Available</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
