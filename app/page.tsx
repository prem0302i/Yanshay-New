'use client';

import Hero from '@/components/layout/Hero';
import FeaturedProducts from '@/components/layout/FeaturedProducts';
import Link from 'next/link';
import { ArrowRight, Palette, Shirt, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="bg-background min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-6 py-24 space-y-32">
        
        {/* Featured Selection Section */}
        <section className="relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary text-[10px] tracking-[0.4em] font-sans font-bold uppercase mb-4 block">Selected Works</span>
              <h2 className="text-5xl md:text-6xl font-display font-medium leading-none tracking-tighter uppercase">
                Featured <br /> Selection
              </h2>
            </div>
            <Link href="/shop" className="group flex items-center gap-2 text-[11px] tracking-[0.2em] font-bold uppercase hover:text-primary transition-colors">
              Explore All Products 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <FeaturedProducts />
        </section>

        {/* Categories Section (Grid Style) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <CategoryCard 
             title="The Minimalist"
             description="Clean lines and premium basics for the modern silhouette."
             image="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80"
             href="/shop?category=casual"
           />
           <CategoryCard 
             title="The Performance"
             description="Durable, high-thread apparel designed for the architectural grind."
             image="https://images.unsplash.com/photo-1562157705-10c3451ea1a6?auto=format&fit=crop&q=80"
             href="/shop?category=formal"
           />
           <CategoryCard 
             title="Tailored Custom"
             description="Your blueprint, our craft. Personalized garments at scale."
             image="https://images.unsplash.com/photo-1583743814966-893bee5b505b?auto=format&fit=crop&q=80"
             href="/customize"
             accent
           />
        </section>

        {/* Customizer Teaser Section */}
        <section className="relative overflow-hidden bg-[#111] p-12 md:px-24 md:py-32 flex flex-col md:flex-row items-center gap-16">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          
          <div className="flex-1 space-y-8 relative z-10">
            <span className="text-primary text-[10px] tracking-[0.4em] font-sans font-bold uppercase block">Interactive Atelier</span>
            <h2 className="text-5xl md:text-7xl font-display font-medium leading-none tracking-tighter uppercase max-w-xl">
              Blueprint <br /> Your <span className="text-primary italic">Identity</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md font-sans">
              Access our full precision customization platform. Mix colors, placements, and graphics with instant visual feedback.
            </p>
            <div className="flex flex-wrap gap-12 pt-4">
              <FeatureItem icon={<Palette size={18} />} label="Vibrant Palettes" />
              <FeatureItem icon={<Shirt size={18} />} label="Premium Canvas" />
              <FeatureItem icon={<Zap size={18} />} label="Rapid Print" />
            </div>
            <Button size="lg" className="h-14 px-10 tracking-[0.2em] uppercase font-bold text-xs" onClick={() => (window.location.href = '/customize')}>
              Launch Customizer
            </Button>
          </div>

          <div className="flex-1 relative group md:translate-x-12">
             <div className="aspect-square bg-white/5 border border-white/5 relative overflow-hidden p-8 flex items-center justify-center transition-all duration-700 group-hover:scale-[1.02]">
                <img 
                  src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80" 
                  alt="Customizer" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                />
             </div>
             {/* Decorative lines */}
             <div className="absolute -top-4 -left-4 w-20 h-20 border-t border-l border-primary/30 pointer-events-none" />
             <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b border-r border-primary/30 pointer-events-none" />
          </div>
        </section>

      </div>
    </div>
  );
};

const CategoryCard = ({ title, description, image, href, accent = false }: { title: string; description: string; image: string; href: string; accent?: boolean }) => (
  <Link href={href} className="group relative block aspect-[4/5] overflow-hidden bg-card">
    <img 
      src={image} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-80"
    />
    <div className={`absolute inset-0 p-8 flex flex-col justify-end ${accent ? 'bg-gradient-to-t from-primary/20 via-transparent to-transparent' : 'bg-gradient-to-t from-black/80 via-transparent to-transparent'}`}>
      <h3 className="text-3xl font-display uppercase tracking-tighter mb-2 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
        {title}
      </h3>
      <p className="text-[11px] tracking-widest text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-6">
        {description}
      </p>
      <div className="w-10 h-[1px] bg-primary group-hover:w-full transition-all duration-700" />
    </div>
  </Link>
);

const FeatureItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] font-bold uppercase text-muted-foreground transition-colors hover:text-foreground">
    <div className="text-primary">{icon}</div>
    {label}
  </div>
);

export default HomePage;
