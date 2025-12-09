'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { getCartItems, removeFromCart } from '@/services/cart.service';
import { Button } from '@/components/ui/button';

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        try {
          const data = await getCartItems(user.id);
          setCartItems(data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCartItems();
    }
  }, [user]);

  const handleRemove = async (cartItemId: number) => {
    await removeFromCart(cartItemId);
    setCartItems(cartItems.filter((item) => item.id !== cartItemId));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product_variants.price * item.quantity, 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="space-y-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <img src={item.product_variants.products.image_url} alt={item.product_variants.products.name} className="h-24 w-24 object-cover" />
                    <div>
                      <h3 className="font-bold">{item.product_variants.products.name}</h3>
                      <p className="text-muted-foreground">Size: {item.product_variants.size}, Color: {item.product_variants.color}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${item.product_variants.price}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => handleRemove(item.id)}>Remove</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col-span-1">
          <div className="border p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Shipping</p>
              <p>${shipping.toFixed(2)}</p>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <Button size="lg" className="w-full mt-4">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
