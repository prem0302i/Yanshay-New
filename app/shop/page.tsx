'use client';

import * as React from 'react';
import { getProducts } from '@/services/product.service';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Filter, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShopPage = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState({ category: '', minPrice: 0, maxPrice: 10000 });
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(filters);
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return (
    <div className="bg-background min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12">
            <div className="max-w-xl">
              <span className="text-primary text-[10px] tracking-[0.4em] font-sans font-bold uppercase mb-4 block">The Collection</span>
              <h1 className="text-6xl md:text-7xl font-display font-medium leading-none tracking-tighter uppercase mb-6">
                Ready To <br /> <span className="text-primary italic">Wear</span>
              </h1>
              <p className="text-muted-foreground text-lg font-sans font-light max-w-md">
                A curated selection of quality basics and standout pieces, designed to last and made with care.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => setIsFilterOpen(true)}
                 className="flex items-center gap-3 px-6 py-3 border border-white/10 hover:border-primary/50 transition-colors uppercase text-[10px] tracking-widest font-bold"
               >
                 <SlidersHorizontal size={14} />
                 Filters
               </button>
               <div className="relative group hidden sm:block">
                  <button className="flex items-center gap-3 px-6 py-3 border border-white/10 uppercase text-[10px] tracking-widest font-bold group-hover:border-primary transition-colors">
                    Best Selling <ChevronDown size={14} />
                  </button>
               </div>
            </div>
          </div>
        </header>

        {/* Products Grid */}
        <main className="w-full">
          {error && <p className="text-red-500 font-sans">{error}</p>}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-16 mt-8">
            {isLoading
              ? [...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse" />
                ))
              : products.map((product, index) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductItem product={product} />
                  </motion.div>
                ))}
          </div>

          {!isLoading && products.length === 0 && (
            <div className="text-center py-32 border border-dashed border-white/10">
               <p className="text-muted-foreground tracking-widest uppercase text-xs">No items found matching your criteria.</p>
               <Button variant="ghost" className="mt-4 text-primary" onClick={() => setFilters({ category: '', minPrice: 0, maxPrice: 10000 })}>
                 Reset Filters
               </Button>
            </div>
          )}
        </main>
      </div>

      {/* Slide-out Filter Mobile/Tablet (Premium Sidebar) */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />
            <motion.aside 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-card z-[101] p-10 flex flex-col gap-12"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-8">
                <h2 className="text-2xl font-display uppercase tracking-widest">Refine</h2>
                <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
              </div>

              <div className="space-y-10">
                 <div>
                    <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-primary mb-6">Categories</h3>
                    <div className="flex flex-col gap-4">
                       {['Casual', 'Formal', 'Customized', 'Heavyweight'].map(cat => (
                         <button 
                           key={cat}
                           className={`text-left text-sm tracking-widest uppercase transition-colors hover:text-primary ${filters.category === cat.toLowerCase() ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                           onClick={() => setFilters({ ...filters, category: cat.toLowerCase() })}
                         >
                           {cat}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div>
                    <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase text-primary mb-6">Sort By</h3>
                    <div className="flex flex-col gap-4">
                       {['Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Recommended'].map(sort => (
                         <button key={sort} className="text-left text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
                           {sort}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="mt-auto">
                 <Button className="w-full h-14 uppercase tracking-[0.2em] text-xs font-bold" onClick={() => setIsFilterOpen(false)}>
                   Show Results
                 </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductItem = ({ product }: { product: any }) => (
  <Link href={`/shop/${product.id}`} className="group block">
    <div className="relative aspect-[4/5] bg-[#111] overflow-hidden mb-6">
      {product.image_url ? (
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0" 
        />
      ) : (
         <div className="w-full h-full bg-card/50" />
      )}
      
      {/* Quick Buy Underline */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
    
    <div className="space-y-1">
      <h3 className="text-[12px] tracking-[0.2em] font-display uppercase font-medium group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-widest text-muted-foreground uppercase">{product.category || 'Apparel'}</span>
        <span className="text-[12px] font-sans font-semibold text-primary/80">₹{product.price}</span>
      </div>
    </div>
  </Link>
);

export default ShopPage;
