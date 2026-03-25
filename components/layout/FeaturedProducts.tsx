'use client';

import * as React from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Star } from 'lucide-react';

const FeaturedProducts = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_variants(*)
        `)
        .eq('is_featured', true)
        .limit(4);

      if (error) {
        console.error('Error fetching featured products:', error);
      } else {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[4/5] bg-card/50 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group relative"
        >
          <Link href={`/shop/${product.id}`} className="block">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#111] mb-6">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                  <ShoppingBag size={48} strokeWidth={0.5} />
                </div>
              )}
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[10px] tracking-[0.3em] font-sans font-bold uppercase text-white border border-white/30 px-6 py-3 backdrop-blur-sm">
                  View Detail
                </span>
              </div>

              {/* Tag */}
              {index === 0 && (
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1">
                    New Collection
                  </span>
                </div>
              )}
            </div>

            {/* Product Meta */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[13px] tracking-widest font-display font-medium uppercase mb-1 transition-colors group-hover:text-primary">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 opacity-50">
                   <Star size={10} className="fill-current" />
                   <span className="text-[10px] tracking-widest">{product.rating || '5.0'}</span>
                </div>
              </div>
              <p className="text-[14px] font-sans font-semibold text-primary/90">
                ₹{product.price}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
