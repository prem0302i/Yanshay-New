'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { getCartItems } from '@/services/cart.service';
import { getUserAddress, saveUserAddress } from '@/services/address.service';
import { createOrder } from '@/services/order.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CartItem, UserProfile, ShippingAddress } from '@/types/product';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, CreditCard, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CheckoutPage = () => {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [address, setAddress] = React.useState({
    street_address: '',
    landmark: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
  });
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const cartData = await getCartItems(user.id);
          setCartItems(cartData);
          const profile = await getUserAddress(user.id);
          setUserProfile(profile);

          if (profile) {
            setAddress({
              street_address: profile.street_address || '',
              landmark: profile.landmark || '',
              city: profile.city || '',
              state: profile.state || '',
              postal_code: profile.postal_code || '',
              country: profile.country || 'India',
            });
            if (!profile.street_address) setIsEditing(true);
          }
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : 'Connection lost.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  const hasAddress = userProfile?.street_address && userProfile?.city;

  const handleSaveAddress = async () => {
    if (!user) return;
    if (!address.street_address || !address.city || !address.state || !address.postal_code) {
      toast.error('Required fields missing.');
      return;
    }
    try {
      const updated = await saveUserAddress(user.id, address);
      setUserProfile(updated);
      setIsEditing(false);
      await refreshUser();
      toast.success('Shipping profile updated.');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user || !hasAddress) {
      toast.error('Verify your shipping details.');
      return;
    }
    setIsLoading(true);
    try {
      const shippingAddress: ShippingAddress = {
        street_address: userProfile!.street_address!,
        landmark: userProfile!.landmark,
        city: userProfile!.city!,
        state: userProfile!.state!,
        postal_code: userProfile!.postal_code!,
        country: userProfile!.country || 'India',
      };
      const order = await createOrder(user.id, total, shippingAddress, cartItems);
      router.push(`/payment/${order.id}`);
    } catch (err: any) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product_variants?.price ?? 0;
    return acc + price * item.quantity;
  }, 0);
  const shipping = 0.00;
  const total = subtotal + shipping;

  if (isLoading && cartItems.length === 0) return <div className="min-h-screen bg-background flex items-center justify-center tracking-[0.5em] uppercase text-[10px] animate-pulse">Initializing Secure Checkout...</div>;

  return (
    <div className="bg-background min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <header className="mb-16">
          <Link href="/cart" className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Bag
          </Link>
          <div className="border-b border-white/5 pb-12">
            <span className="text-primary text-[10px] tracking-[0.4em] font-sans font-bold uppercase mb-4 block">Secure Checkout</span>
            <h1 className="text-5xl md:text-6xl font-display font-medium leading-none tracking-tighter uppercase">
              Finalize <br /> <span className="text-primary italic">Acquisition</span>
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Left: Shipping & Payment */}
          <div className="lg:col-span-7 space-y-20">
            
            {/* Step 1: Shipping */}
            <section>
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-[10px] font-bold text-primary">01</div>
                  <h2 className="text-2xl font-display uppercase tracking-tighter">Shipping Destination</h2>
               </div>

               {hasAddress && !isEditing ? (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#111] p-8 space-y-4 border-l-2 border-primary">
                    <p className="text-sm font-sans font-bold uppercase tracking-widest">{userProfile?.full_name}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {userProfile?.street_address}<br />
                      {userProfile?.landmark && <span className="opacity-60">{userProfile.landmark}, </span>}
                      {userProfile?.city}, {userProfile?.state} {userProfile?.postal_code}<br />
                      {userProfile?.country}
                    </p>
                    <button onClick={() => setIsEditing(true)} className="text-[10px] tracking-widest uppercase font-bold text-primary hover:underline pt-2">
                       Change Destination
                    </button>
                 </motion.div>
               ) : (
                 <div className="space-y-8 bg-[#111] p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <Label className="text-[10px] tracking-widest uppercase opacity-60">Street Address</Label>
                          <Input className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors"
                            value={address.street_address} onChange={e => setAddress({...address, street_address: e.target.value})} />
                       </div>
                       <div className="space-y-3">
                          <Label className="text-[10px] tracking-widest uppercase opacity-60">Landmark</Label>
                          <Input className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors"
                            value={address.landmark} onChange={e => setAddress({...address, landmark: e.target.value})} />
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="space-y-3">
                          <Label className="text-[10px] tracking-widest uppercase opacity-60">City</Label>
                          <Input className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors"
                            value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                       </div>
                       <div className="space-y-3">
                          <Label className="text-[10px] tracking-widest uppercase opacity-60">State</Label>
                          <Input className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors"
                            value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
                       </div>
                       <div className="space-y-3">
                          <Label className="text-[10px] tracking-widest uppercase opacity-60">Postal Code</Label>
                          <Input className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors"
                            value={address.postal_code} onChange={e => setAddress({...address, postal_code: e.target.value})} />
                       </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                       <Button onClick={handleSaveAddress} className="h-12 px-8 text-[10px] font-bold tracking-widest uppercase">Verify Destination</Button>
                       {hasAddress && <Button variant="ghost" onClick={() => setIsEditing(false)} className="text-[10px] tracking-widest uppercase">Cancel</Button>}
                    </div>
                 </div>
               )}
            </section>

            {/* Step 2: Payment (Preview) */}
            <section className={!hasAddress || isEditing ? 'opacity-30 pointer-events-none' : ''}>
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold">02</div>
                  <h2 className="text-2xl font-display uppercase tracking-tighter">Secure Payment</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 border border-primary bg-primary/5 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <CreditCard className="text-primary" />
                        <span className="text-[11px] tracking-widest uppercase font-bold">Pay At Studio / COD</span>
                     </div>
                     <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div className="p-6 border border-white/5 opacity-50 flex items-center gap-4">
                     <CreditCard />
                     <span className="text-[11px] tracking-widest uppercase font-bold">Online Payment (Locked)</span>
                  </div>
               </div>
            </section>

          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:col-span-5">
             <div className="bg-[#111] p-10 space-y-10 sticky top-24">
                <h2 className="text-2xl font-display uppercase tracking-tighter border-b border-white/5 pb-6">Order Summary</h2>
                
                <div className="max-h-[300px] overflow-y-auto pr-4 space-y-6 scrollbar-hide">
                   {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4 group">
                         <div className="w-16 h-20 bg-background flex-shrink-0 overflow-hidden">
                            <img src={item.product_variants?.products.image_url} alt="" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                         </div>
                         <div className="flex-1 space-y-1">
                            <p className="text-[10px] tracking-widest font-bold uppercase truncate max-w-[150px]">{item.product_variants?.products.name}</p>
                            <p className="text-[9px] tracking-widest text-muted-foreground uppercase">Size: {item.product_variants?.size} • Qty: {item.quantity}</p>
                            <p className="text-[11px] font-sans font-bold text-primary/80">₹{(item.product_variants?.price || 0) * item.quantity}</p>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5">
                   <div className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-foreground">₹{subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      <span>Vault Security</span>
                      <span className="text-primary font-bold italic">Complimentary</span>
                   </div>
                   <div className="pt-6 flex justify-between items-end">
                      <span className="text-xs tracking-[0.2em] uppercase font-bold">Final Total</span>
                      <span className="text-3xl font-sans font-bold text-primary">₹{total.toFixed(2)}</span>
                   </div>
                </div>

                <div className="pt-6">
                   <Button 
                     size="lg" 
                     className="w-full h-16 text-[11px] font-bold tracking-[0.4em] uppercase"
                     onClick={handlePlaceOrder}
                     disabled={!hasAddress || isEditing}
                   >
                      Complete Order
                   </Button>
                   <div className="mt-6 flex items-center justify-center gap-2 text-[9px] tracking-[0.2em] uppercase text-muted-foreground opacity-50">
                      <ShieldCheck size={14} /> End-to-End Encrypted Transaction
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
