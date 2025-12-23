'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { getCartItems, removeFromCart, updateCartItemQuantity } from '@/services/cart.service';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import LoginPopup from '@/components/LoginPopup';
import { toast } from 'sonner';

const CartPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);

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
    } else {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(cart);
      setIsLoading(false);
    }
  }, [user]);

  const handleRemove = async (variantId: number) => {
    if (user) {
      // Find the cart item id to pass to the service
      const cartItem = cartItems.find(item => item.variant_id === variantId);
      if (cartItem) {
        await removeFromCart(cartItem.id);
        setCartItems(cartItems.filter((item) => item.variant_id !== variantId));
      }
    } else {
      const updatedCart = cartItems.filter(item => item.variant_id !== variantId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  const handleUpdateQuantity = async (variantId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      return handleRemove(variantId);
    }
    if (user) {
      const cartItem = cartItems.find(item => item.variant_id === variantId);
      if (cartItem) {
        await updateCartItemQuantity(cartItem.id, newQuantity);
        setCartItems(cartItems.map(item => item.variant_id === variantId ? { ...item, quantity: newQuantity } : item));
      }
    } else {
      const updatedCart = cartItems.map(item => item.variant_id === variantId ? { ...item, quantity: newQuantity } : item);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product_variants ? item.product_variants.price : item.price;
    return acc + price * item.quantity;
  }, 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items to continue.');
      return;
    }
    if (!user) {
      setIsLoginPopupOpen(true);
    } else {
      router.push('/checkout');
    }
  };

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
            ) : cartItems.length === 0 ? (
              <div className="col-span-3 flex flex-col items-center justify-center text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Button onClick={() => router.push('/shop')}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="border rounded-lg">
                {cartItems.map((item, index) => (
                  <div key={item.variant_id || item.id} className={`flex items-center justify-between p-4 ${index < cartItems.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex items-center gap-4">
                      <img src={item.product_variants ? item.product_variants.products.image_url : item.image_url} alt={item.product_variants ? item.product_variants.products.name : item.name} className="h-24 w-24 object-cover rounded-md" />
                      <div>
                        <h3 className="font-bold">{item.product_variants ? item.product_variants.products.name : item.name}</h3>
                        {item.product_variants && <p className="text-muted-foreground">Size: {item.product_variants.size}</p>}
                        <p className="font-bold mt-2">₹{item.product_variants ? item.product_variants.price : item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(item.variant_id, item.quantity - 1)}>-</Button>
                        <span>{item.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(item.variant_id, item.quantity + 1)}>+</Button>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleRemove(item.variant_id)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {cartItems.length > 0 && (
          <div className="col-span-1">
            <div className="border p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>
              <Button size="lg" className="w-full mt-4" onClick={handleCheckout}>Checkout</Button>
              <LoginPopup open={isLoginPopupOpen} onOpenChange={setIsLoginPopupOpen} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
