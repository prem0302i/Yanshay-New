'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangePasswordModal } from '@/components/ChangePasswordModal';
import { saveUserAddress } from '@/services/address.service';
import { toast } from 'sonner';
import { Order } from '@/types/product';
import { motion } from 'framer-motion';
import { User, MapPin, Package, Palette, Lock, LogOut, ChevronRight } from 'lucide-react';

const AccountPage = () => {
  const { user, signOut, refreshUser } = useAuth();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = React.useState(false);
  const [isEditingAddress, setIsEditingAddress] = React.useState(false);
  const [activeSegment, setActiveSegment] = React.useState('profile');
  const [address, setAddress] = React.useState({
    street_address: '',
    landmark: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
  });

  React.useEffect(() => {
    if (user) {
      setAddress({
        street_address: (user as any).street_address || '',
        landmark: (user as any).landmark || '',
        city: (user as any).city || '',
        state: (user as any).state || '',
        postal_code: (user as any).postal_code || '',
        country: (user as any).country || 'India',
      });

      const fetchOrders = async () => {
        const { data } = await supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        setOrders((data as Order[]) || []);
      };

      fetchOrders();
    }
  }, [user]);

  const hasAddress = (user as any)?.street_address && (user as any)?.city;

  const handleSaveAddress = async () => {
    if (!user) return;
    if (!address.street_address || !address.city || !address.state || !address.postal_code) {
      toast.error('Please fill in all required fields.');
      return;
    }
    try {
      await saveUserAddress(user.id, address);
      await refreshUser();
      setIsEditingAddress(false);
      toast.success('Address saved successfully!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const navItems = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'address', label: 'Address', icon: <MapPin size={16} /> },
    { id: 'orders', label: 'Orders', icon: <Package size={16} /> },
    { id: 'saved-designs', label: 'Saved Designs', icon: <Palette size={16} /> },
  ];

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <header className="mb-20 text-center">
           <span className="text-primary text-[10px] tracking-[0.4em] font-sans font-bold uppercase mb-4 block">My Account</span>
           <h1 className="text-5xl md:text-7xl font-display font-medium leading-[0.9] tracking-tighter uppercase mb-6">
             My <br /> <span className="text-primary italic">Account</span>
           </h1>
           <div className="w-12 h-[1px] bg-white/10 mx-auto" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          
          {/* Navigation Sidebar */}
          <aside className="md:col-span-3 space-y-12">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSegment(item.id)}
                  className={`flex items-center justify-between group py-4 px-2 border-l-2 transition-all duration-300 ${
                    activeSegment === item.id 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-white/5 text-muted-foreground hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={activeSegment === item.id ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}>
                      {item.icon}
                    </span>
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase">{item.label}</span>
                  </div>
                  <ChevronRight size={12} className={`transition-transform duration-300 ${activeSegment === item.id ? 'translate-x-0' : '-translate-x-2 opacity-0'}`} />
                </button>
              ))}
            </nav>

            <div className="pt-8 border-t border-white/5">
               <button 
                 onClick={signOut}
                 className="flex items-center gap-4 text-[10px] tracking-[0.3em] font-bold uppercase text-red-400/60 hover:text-red-400 transition-colors"
               >
                 <LogOut size={16} /> Log Out
               </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="md:col-span-9">
            <motion.div
              key={activeSegment}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              {/* Profile Segment */}
              {activeSegment === 'profile' && (
                <section className="space-y-12">
                   <div className="max-w-xl">
                      <h2 className="text-3xl font-display uppercase tracking-widest mb-2">My Profile</h2>
                      <p className="text-muted-foreground text-sm font-sans font-light tracking-widest uppercase opacity-60 mb-10">Your Personal Information</p>
                      
                      {user && (
                        <div className="space-y-12 bg-[#111] p-10">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                              <div className="space-y-2">
                                 <p className="text-[9px] tracking-[0.4em] font-bold uppercase text-primary/60">Full Name</p>
                                 <p className="text-lg font-sans font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{user.full_name}</p>
                              </div>
                              <div className="space-y-2">
                                 <p className="text-[9px] tracking-[0.4em] font-bold uppercase text-primary/60">Email</p>
                                 <p className="text-lg font-sans font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{user.email}</p>
                              </div>
                           </div>
                           
                           <div className="pt-8 border-t border-white/5 flex gap-6">
                              <Button 
                                variant="outline" 
                                className="h-12 px-8 text-[10px] font-bold tracking-widest uppercase border-primary/20 hover:bg-primary/5"
                                onClick={() => setIsChangePasswordOpen(true)}
                              >
                                <Lock size={14} className="mr-2" /> Change Password
                              </Button>
                           </div>
                        </div>
                      )}
                   </div>
                </section>
              )}

              {/* Address Segment */}
              {activeSegment === 'address' && (
                <section className="space-y-12">
                   <div className="max-w-2xl">
                      <h2 className="text-3xl font-display uppercase tracking-widest mb-2">Address</h2>
                      <p className="text-muted-foreground text-sm font-sans font-light tracking-widest uppercase opacity-60 mb-10">Your Shipping Address</p>
                      
                      {hasAddress && !isEditingAddress ? (
                        <div className="bg-[#111] p-10 border-l-2 border-primary space-y-6">
                           <div className="space-y-2">
                              <p className="text-[9px] tracking-[0.4em] font-bold uppercase text-primary/60">Address</p>
                              <div className="text-lg font-sans font-light leading-relaxed">
                                 {(user as any).street_address}<br />
                                 {(user as any).landmark && <span className="opacity-50">{(user as any).landmark}, </span>}
                                 {(user as any).city}, {(user as any).state} {(user as any).postal_code}<br />
                                 {(user as any).country}
                              </div>
                           </div>
                           <Button 
                             variant="outline" 
                             className="h-10 text-[9px] font-bold tracking-widest uppercase border-white/10 hover:border-primary transition-all px-6"
                             onClick={() => setIsEditingAddress(true)}
                           >
                             Edit Address
                           </Button>
                        </div>
                      ) : (
                        <div className="bg-[#111] p-10 space-y-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3">
                                 <Label className="text-[9px] tracking-widest uppercase opacity-40">Street Address</Label>
                                 <Input className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors font-sans"
                                   value={address.street_address} onChange={e => setAddress({...address, street_address: e.target.value})} />
                              </div>
                              <div className="space-y-3">
                                 <Label className="text-[9px] tracking-widest uppercase opacity-40">Landmark</Label>
                                 <Input className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors font-sans"
                                   value={address.landmark} onChange={e => setAddress({...address, landmark: e.target.value})} />
                              </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              <div className="space-y-3">
                                 <Label className="text-[9px] tracking-widest uppercase opacity-40">City</Label>
                                 <Input className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors font-sans"
                                   value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                              </div>
                              <div className="space-y-3">
                                 <Label className="text-[9px] tracking-widest uppercase opacity-40">State</Label>
                                 <Input className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors font-sans"
                                   value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
                              </div>
                              <div className="space-y-3">
                                 <Label className="text-[9px] tracking-widest uppercase opacity-40">Postal Code</Label>
                                 <Input className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors font-sans"
                                   value={address.postal_code} onChange={e => setAddress({...address, postal_code: e.target.value})} />
                              </div>
                           </div>
                           <div className="flex gap-4 pt-4 border-t border-white/5">
                              <Button onClick={handleSaveAddress} className="h-12 px-8 text-[10px] font-bold tracking-widest uppercase">Save Address</Button>
                              {hasAddress && (
                                <Button variant="ghost" onClick={() => setIsEditingAddress(false)} className="text-[10px] tracking-widest uppercase">Cancel</Button>
                              )}
                           </div>
                        </div>
                      )}
                   </div>
                </section>
              )}

              {/* Orders Segment */}
              {activeSegment === 'orders' && (
                <section className="space-y-12">
                   <div>
                      <h2 className="text-3xl font-display uppercase tracking-widest mb-2">Orders</h2>
                      <p className="text-muted-foreground text-sm font-sans font-light tracking-widest uppercase opacity-60 mb-10">Your Order History</p>
                      
                      <div className="space-y-6">
                        {orders.length === 0 ? (
                          <div className="py-24 text-center border border-dashed border-white/10 px-8">
                             <p className="text-muted-foreground tracking-widest uppercase text-[10px]">You haven't placed any orders yet.</p>
                             <Button variant="ghost" className="mt-6 text-primary uppercase text-[10px] tracking-widest font-bold" onClick={() => (window.location.href = '/shop')}>Start Shopping</Button>
                          </div>
                        ) : (
                          orders.map((order) => (
                            <div key={order.id} className="bg-[#111] p-8 border border-white/5 hover:border-primary/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group">
                              <div className="space-y-1">
                                <p className="text-[9px] tracking-[0.4em] font-bold uppercase text-primary/60">Order ID</p>
                                <p className="text-lg font-sans font-medium tracking-tight">#{order.id.toString().slice(0, 12)}</p>
                                <div className="pt-2 flex items-center gap-4 text-[10px] tracking-widest uppercase text-muted-foreground">
                                   <span>{new Date(order.created_at!).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                   <span className="w-1 h-1 bg-white/20 rounded-full" />
                                   <span>₹{order.total_amount}</span>
                                </div>
                              </div>
                              <div className={`px-4 py-2 text-[9px] font-bold tracking-widest uppercase text-center border ${
                                order.status === 'paid' ? 'border-green-500/30 text-green-400 bg-green-500/5' :
                                order.status === 'pending' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5' :
                                'border-white/10 text-muted-foreground'
                              }`}>
                                {order.status}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                   </div>
                </section>
              )}

              {/* Saved Designs (Placeholder) */}
              {activeSegment === 'saved-designs' && (
                <section className="space-y-12">
                   <div className="py-32 text-center border border-dashed border-white/10 max-w-2xl">
                      <Palette className="mx-auto mb-6 text-primary/20" size={48} strokeWidth={1} />
                      <p className="text-muted-foreground tracking-[0.3em] uppercase text-xs mb-8">No Saved Designs Yet</p>
                      <Button onClick={() => (window.location.href = '/customize')} className="h-14 px-10 tracking-[0.3em] uppercase text-xs font-bold">
                         Start Designing
                      </Button>
                   </div>
                </section>
              )}
            </motion.div>
          </main>
        </div>
      </div>
      <ChangePasswordModal open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen} />
    </div>
  );
};

export default AccountPage;
