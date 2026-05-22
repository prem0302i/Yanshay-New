'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { addToCart } from '@/services/cart.service';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ShoppingBag, Ruler, Truck, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductDetails = ({ product }: { product: any }) => {
  const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];
  const sortedVariants = [...(product.variants || [])].sort((a: any, b: any) => {
    const indexA = sizeOrder.indexOf(a.size?.toUpperCase());
    const indexB = sizeOrder.indexOf(b.size?.toUpperCase());
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.size?.localeCompare(b.size || '');
  });

  const [selectedVariant, setSelectedVariant] = React.useState<any>(sortedVariants[0] || null);
  const media = React.useMemo(() => {
    const items = [];
    if (product.video_url) {
      items.push({ type: 'video', url: product.video_url });
    }
    if (product.image_url) {
      product.image_url.split(',').forEach((img: string) => items.push({ type: 'image', url: img }));
    }
    return items;
  }, [product.video_url, product.image_url]);

  const [activeMedia, setActiveMedia] = React.useState<any>(media[0] || null);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('description');

  const handleNextMedia = () => {
    if (media.length <= 1) return;
    const currentIndex = media.indexOf(activeMedia || media[0]);
    const nextIndex = (currentIndex + 1) % media.length;
    setActiveMedia(media[nextIndex]);
  };

  const handlePrevMedia = () => {
    if (media.length <= 1) return;
    const currentIndex = media.indexOf(activeMedia || media[0]);
    const prevIndex = (currentIndex - 1 + media.length) % media.length;
    setActiveMedia(media[prevIndex]);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<span key={i} className="text-yellow-500">★</span>);
      } else if (rating >= i - 0.5) {
        stars.push(
          <span key={i} className="relative inline-block text-gray-300">
            ★
            <span className="absolute left-0 top-0 overflow-hidden text-yellow-500" style={{ width: '50%' }}>★</span>
          </span>
        );
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    return <div className="flex items-center text-lg leading-none">{stars}</div>;
  };

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12 pb-24">
      
      {/* Product Image Gallery (Asymmetric) */}
      <div className="lg:col-span-7 space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-square md:aspect-auto md:h-[75vh] bg-card overflow-hidden group flex items-center justify-center relative rounded-xl"
        >
          {activeMedia ? (
            <>
              {activeMedia.type === 'video' ? (
                <video 
                  src={activeMedia.url} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-contain grayscale-[0.1] group-hover:grayscale-0 transition-all duration-1000" 
                />
              ) : (
                <img 
                  src={activeMedia.url} 
                  alt={product.name} 
                  className="w-full h-full object-contain grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" 
                />
              )}
              {media.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevMedia} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/30 hover:bg-background/80 backdrop-blur-md text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={handleNextMedia} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/30 hover:bg-background/80 backdrop-blur-md text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground uppercase text-xs tracking-widest bg-foreground/5">No Image Available</div>
          )}
        </motion.div>
        
        {/* Secondary Details (Thumbnail style) */}
        {media.length > 1 && (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
            {media.map((item: any, idx: number) => (
               <button 
                 key={idx}
                 onClick={() => setActiveMedia(item)}
                 className={`aspect-square bg-card overflow-hidden border transition-all ${activeMedia?.url === item.url ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
               >
                 {item.type === 'video' ? (
                   <video src={item.url} muted className="w-full h-full object-cover" />
                 ) : (
                   <img src={item.url} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                 )}
               </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info (Stick Sidebar style on large screens) */}
      <div className="lg:col-span-5 flex flex-col pt-4">
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-primary text-[10px] tracking-[0.4em] font-sans font-bold uppercase mb-4 block">
            {product.categories?.length > 0 
              ? product.categories.map((c: any) => c.categories?.name).join(', ') 
              : product.category || 'Studio Archive'}
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-medium leading-[0.9] tracking-tighter uppercase mb-6">
            {product.name}
          </h1>
          
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
             <div className="flex flex-col gap-2">
               <p className="text-3xl font-sans font-semibold text-primary">₹{selectedVariant?.price || product.price}</p>
               {(product.rating > 0 || product.review_count > 0) && (
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   {renderStars(product.rating || 0)}
                   <span className="text-xs">({product.review_count || 0} reviews)</span>
                 </div>
               )}
             </div>
             <div className="flex flex-col items-end gap-2 text-[10px] tracking-widest text-muted-foreground uppercase">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-primary" /> 
                  Refine Quality
                </div>
                {product.gender && <span>Gender: {product.gender}</span>}
             </div>
          </div>

          <p className="text-muted-foreground text-lg font-sans font-light leading-relaxed mb-10">
            {product.description || "A signature piece from the latest collection. Crafted with architectural intent and precision heavyweight cotton for a structured silhouette."}
          </p>

          <div className="space-y-10 mb-12">
            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-primary">Select Configuration</h3>
                <button className="flex items-center gap-2 text-[10px] tracking-widest uppercase hover:text-primary transition-colors">
                  <Ruler size={14} /> Size Guide
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {sortedVariants.map((variant: any) => (
                  <button 
                    key={variant.id} 
                    className={`min-w-[70px] h-12 flex items-center justify-center text-xs tracking-widest font-bold uppercase transition-all duration-300 border-b-2 ${
                      selectedVariant?.id === variant.id 
                        ? 'border-primary text-primary bg-primary/5' 
                        : 'border-border text-muted-foreground hover:border-border'
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-primary mb-4">Available Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 border border-border px-3 py-2 rounded-full">
                      <div className="w-4 h-4 rounded-full border border-border/50 shadow-sm" style={{ backgroundColor: color.color_hex }} />
                      <span className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground">{color.color_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Features & Box Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border">
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-primary mb-4">Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature: any, idx: number) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{feature.title}:</span> {feature.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.box_items && product.box_items.length > 0 && (
                <div>
                  <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-primary mb-4">In The Box</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    {product.box_items.map((item: any, idx: number) => (
                      <li key={idx}>{item.item_name}</li>
                    ))}
                  </ul>
                </div>
              )}
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
          <div className="mt-12 p-6 bg-card grid grid-cols-2 gap-4">
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
