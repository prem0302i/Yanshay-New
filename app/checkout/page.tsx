'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { getCartItems } from '@/services/cart.service';
import { createOrder } from '@/services/order.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Script from 'next/script';
import { supabase } from '@/lib/supabase';

const CheckoutPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = React.useState<any[]>([]);
  const [shippingAddress, setShippingAddress] = React.useState({ firstName: '', lastName: '', address: '', city: '', state: '', zip: '' });
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        const data = await getCartItems(user.id);
        setCartItems(data);
      };
      fetchCartItems();
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    if (user) {
      try {
        const order = await createOrder(user.id, total, shippingAddress, cartItems);
        const { data } = await supabase.functions.invoke('payu-create-payment', {
          body: { amount: total, txnid: order.id, productinfo: 'Yanshay Order', firstname: shippingAddress.firstName, email: user.email },
        });
        const payuConfig = {
          key: 'YOUR_PAYU_KEY', // Replace with your actual PayU key
          ...data,
        };
        // @ts-ignore
        window.payu.launch(payuConfig);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product_variants.price * item.quantity, 0);
  const total = subtotal + 5.00;

  return (
    <>
      <Script src="https://sdk.payu.com/js/v1/payu-sdks.js" />
      <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={shippingAddress.firstName} onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={shippingAddress.lastName} onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" value={shippingAddress.state} onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" value={shippingAddress.zip} onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="border p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between mb-2">
                <p>{item.product_variants.products.name}</p>
                <p>${item.product_variants.price}</p>
              </div>
            ))}
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <Button size="lg" className="w-full mt-4" onClick={handlePlaceOrder}>Place Order</Button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CheckoutPage;
