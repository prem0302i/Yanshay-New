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

  return (
    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
      {cartCount}
    </div>
  );
};

export default CartCount;
