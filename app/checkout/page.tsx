'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { getCartItems } from '@/services/cart.service';
import { getAddresses, addAddress } from '@/services/address.service';
import { createOrder } from '@/services/order.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = React.useState<any[]>([]);
  const [addresses, setAddresses] = React.useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = React.useState<string | null>(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = React.useState(false);
  const [newAddress, setNewAddress] = React.useState({ street_address: '', city: '', state: '', postal_code: '', country: 'India', landmark: '' });
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const cartData = await getCartItems(user.id);
        setCartItems(cartData);
        const addressData = await getAddresses(user.id);
        setAddresses(addressData);
        if (addressData.length > 0) {
          setSelectedAddressId(addressData[0].id);
        } else {
          setIsAddingNewAddress(true); // Open form if no addresses exist
        }
      };
      fetchData();
    }
  }, [user]);

  const handleSaveAddress = async () => {
    if (!user) return;
    try {
      const savedAddress = await addAddress(user.id, newAddress);
      setAddresses([...addresses, savedAddress]);
      setSelectedAddressId(savedAddress.id);
      setIsAddingNewAddress(false);
      setNewAddress({ street_address: '', city: '', state: '', postal_code: '', country: 'India', landmark: '' });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user || !selectedAddressId) {
      setError('Please select a shipping address.');
      return;
    }

    try {
      const order = await createOrder(user.id, total, selectedAddressId, cartItems);
      router.push(`/payment/${order.id}`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product_variants.price * item.quantity, 0);
  const total = subtotal + 5.00;

  return (
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <RadioGroup value={selectedAddressId || ''} onValueChange={setSelectedAddressId}>
            {addresses.map(address => (
              <Label key={address.id} htmlFor={address.id} className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer mb-2">
                <RadioGroupItem value={address.id} id={address.id} />
                <div>
                  <p>{address.street_address}</p>
                  <p>{address.landmark}</p>
                  <p>{address.city}, {address.state} {address.postal_code}</p>
                  <p>{address.country}</p>
                </div>
              </Label>
            ))}
          </RadioGroup>
          
          {!isAddingNewAddress && (
            <Button variant="link" onClick={() => setIsAddingNewAddress(true)} className="mt-4">
              + Add New Address
            </Button>
          )}

          {isAddingNewAddress && (
            <div className="space-y-4 mt-4 border p-4 rounded-lg">
              <h3 className="text-lg font-bold">Add a new address</h3>
              <Input placeholder="Street Address" value={newAddress.street_address} onChange={(e) => setNewAddress({ ...newAddress, street_address: e.target.value })} />
              <Input placeholder="Landmark" value={newAddress.landmark || ''} onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
                <Input placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} />
                <Input placeholder="Postal Code" value={newAddress.postal_code} onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })} />
              </div>
              <div className="flex gap-4">
                <Button onClick={handleSaveAddress}>Save Address</Button>
                <Button variant="ghost" onClick={() => setIsAddingNewAddress(false)}>Cancel</Button>
              </div>
            </div>
          )}

          {selectedAddressId && !isAddingNewAddress && (
            <div className="mt-8 border-t pt-8">
               <div className="flex justify-between font-bold text-lg mb-4">
                <p>Total</p>
                <p>₹{total.toFixed(2)}</p>
              </div>
              <Button size="lg" className="w-full" onClick={handlePlaceOrder}>Place Order</Button>
            </div>
          )}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
  );
};

export default CheckoutPage;
