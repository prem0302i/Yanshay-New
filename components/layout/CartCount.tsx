'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

const CartCount = () => {
  const { user } = useAuth();
  const [cartCount, setCartCount] = React.useState(0);

  const fetchCartCount = React.useCallback(async () => {
    if (user) {
      const { data, error } = await supabase
        .from('carts')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);
      setCartCount(data?.length || 0);
    } else {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    }
  }, [user]);

  React.useEffect(() => {
    fetchCartCount();
    window.addEventListener('cartUpdated', fetchCartCount);
    return () => window.removeEventListener('cartUpdated', fetchCartCount);
  }, [fetchCartCount]);

  if (cartCount === 0) return null;

  return (
    <div className="absolute -top-1 -right-1 bg-primary text-black font-sans font-bold h-4 w-4 min-w-[16px] flex items-center justify-center text-[9px] shadow-[0_0_10px_rgba(250,232,152,0.4)]">
      {cartCount}
    </div>
  );
};

export default CartCount;
