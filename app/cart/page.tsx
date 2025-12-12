'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { getCartItems, removeFromCart, updateCartItemQuantity } from '@/services/cart.service';
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

  const handleUpdateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      return; // Or handle as a remove action
    }
    await updateCartItemQuantity(cartItemId, newQuantity);
    setCartItems(cartItems.map(item => item.id === cartItemId ? { ...item, quantity: newQuantity } : item));
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
              <div className="border rounded-lg">
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`flex items-center justify-between p-4 ${index < cartItems.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex items-center gap-4">
                      <img src={item.product_variants.products.image_url} alt={item.product_variants.products.name} className="h-24 w-24 object-cover rounded-md" />
                      <div>
                        <h3 className="font-bold">{item.product_variants.products.name}</h3>
                        <p className="text-muted-foreground">Size: {item.product_variants.size}, Color: {item.product_variants.color}</p>
                        <p className="font-bold mt-2">${item.product_variants.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
                        <span>{item.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleRemove(item.id)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
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
