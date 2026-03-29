'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { getCartItems, removeFromCart, updateCartItemQuantity } from '@/services/cart.service';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CartPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user) {
          const data = await getCartItems(user.id);
          setCartItems(data);
        } else {
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          setCartItems(cart);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
    
    const token = window.addEventListener('cartUpdated', fetchCartItems);
    return () => window.removeEventListener('cartUpdated', fetchCartItems as any);
  }, [user]);

  const handleRemove = async (variantId: number) => {
    try {
      if (user) {
        const cartItem = cartItems.find(item => item.variant_id === variantId);
        if (cartItem) await removeFromCart(cartItem.id);
      } else {
        const updatedCart = cartItems.filter(item => item.variant_id !== variantId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      }
      setCartItems(prev => prev.filter(item => item.variant_id !== variantId));
      toast.success('Removed from bag.');
    } catch (e) {
      toast.error('Failed to remove item.');
    }
  };

  const handleUpdateQuantity = async (variantId: number, newQuantity: number) => {
    if (newQuantity < 1) return handleRemove(variantId);
    
    try {
      if (user) {
        const cartItem = cartItems.find(item => item.variant_id === variantId);
        if (cartItem) await updateCartItemQuantity(cartItem.id, newQuantity);
      } else {
        const updatedCart = cartItems.map(item => item.variant_id === variantId ? { ...item, quantity: newQuantity } : item);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      setCartItems(prev => prev.map(item => item.variant_id === variantId ? { ...item, quantity: newQuantity } : item));
    } catch (e) {
      toast.error('Failed to update quantity.');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product_variants ? item.product_variants.price : (item.price || 0);
    return acc + price * item.quantity;
  }, 0);
  const shipping = 0.00; // Premium free shipping
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) return toast.error('Your bag is empty.');
    router.push(user ? '/checkout' : '/login?redirect=/checkout');
  };

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center tracking-[0.5em] uppercase text-[10px] animate-pulse">Loading...</div>;

  return (
    <div className="bg-background min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Page Header */}
        <header className="mb-16 border-b border-white/5 pb-12">
           <span className="text-primary text-[10px] tracking-[0.4em] font-sans font-bold uppercase mb-4 block">Your Selection</span>
           <h1 className="text-5xl md:text-6xl font-display font-medium leading-none tracking-tighter uppercase mb-6">
             Shopping <br /> <span className="text-primary italic">Bag</span>
           </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Main Bag Content */}
          <div className="lg:col-span-8">
            <AnimatePresence>
              {cartItems.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-32 border border-dashed border-white/10"
                >
                  <p className="text-muted-foreground tracking-[0.2em] uppercase text-xs mb-8">Your bag is currently empty.</p>
                  <Link href="/shop">
                    <Button size="lg" className="h-14 px-10 tracking-widest uppercase text-xs font-bold">
                      Explore Collections
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-12">
                  {cartItems.map((item, idx) => (
                    <motion.div 
                      key={item.variant_id || item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex flex-col sm:flex-row gap-8 pb-12 border-b border-white/5 last:border-0"
                    >
                      {/* Image */}
                      <div className="w-full sm:w-40 aspect-[3/4] bg-[#111] overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product_variants ? item.product_variants.products.image_url : (item.image_url || '')} 
                          alt="Product" 
                          className="w-full h-full object-cover grayscale-[0.3]" 
                        />
                      </div>

                      {/* Info & Controls */}
                      <div className="flex-1 flex flex-col pt-2">
                        <div className="flex justify-between items-start gap-4 mb-4">
                           <div className="space-y-1">
                              <h3 className="text-sm tracking-[0.2em] font-display uppercase font-medium">
                                {item.product_variants ? item.product_variants.products.name : item.name}
                              </h3>
                              <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                                {item.product_variants ? `Size: ${item.product_variants.size}` : 'Standard Size'}
                              </p>
                           </div>
                           <p className="text-sm font-sans font-semibold text-primary/90">
                              ₹{(item.product_variants ? item.product_variants.price : item.price) * item.quantity}
                           </p>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                           {/* Quantity Controls */}
                           <div className="flex items-center gap-6 border border-white/10 px-4 py-2">
                              <button onClick={() => handleUpdateQuantity(item.variant_id, item.quantity - 1)} className="text-muted-foreground hover:text-primary transition-colors">
                                <Minus size={14} />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                              <button onClick={() => handleUpdateQuantity(item.variant_id, item.quantity + 1)} className="text-muted-foreground hover:text-primary transition-colors">
                                <Plus size={14} />
                              </button>
                           </div>

                           <button 
                             onClick={() => handleRemove(item.variant_id)}
                             className="text-[10px] tracking-[0.2em] uppercase font-bold text-muted-foreground hover:text-red-400 transition-colors flex items-center gap-2"
                           >
                             <Trash2 size={12} /> Remove
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4">
             <div className="bg-[#111] p-10 space-y-10 relative overflow-hidden sticky top-24">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full" />
                
                <h2 className="text-2xl font-display uppercase tracking-tighter border-b border-white/5 pb-6">Summary</h2>
                
                <div className="space-y-6">
                   <div className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-foreground">₹{subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-primary font-bold">Free</span>
                   </div>
                   <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                      <span className="text-xs tracking-[0.2em] uppercase font-bold">Total</span>
                      <span className="text-3xl font-sans font-bold text-primary">₹{total.toFixed(2)}</span>
                   </div>
                </div>

                <div className="space-y-4 pt-4">
                   <Button size="lg" className="w-full h-16 text-[11px] font-bold tracking-[0.3em] uppercase group" onClick={handleCheckout}>
                      Checkout 
                      <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>
                   <Link href="/shop" className="block text-center text-[9px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors">
                      Continue Shopping
                   </Link>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
