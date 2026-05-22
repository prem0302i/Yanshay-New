'use client';

import * as React from 'react';
import { getOrderDetails, updateOrderDiscount, updateOrderStatus } from '@/services/order.service';
import { applyVoucher } from '@/services/voucher.service';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Script from 'next/script';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { formatOrderId } from '@/app/admin/orders/page';

const PaymentPage = ({ params }: { params: { orderId: string } }) => {
  const { user } = useAuth();
  const [order, setOrder] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [voucherCode, setVoucherCode] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardPin, setCardPin] = React.useState('');
  const [isPaid, setIsPaid] = React.useState(false);

  const fetchOrder = async () => {
    try {
      const data = await getOrderDetails(params.orderId);
      if (!data) return notFound();
      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOrder();
  }, [params.orderId]);

  const handleApplyVoucher = async () => {
    try {
      const { voucher, discountAmount, finalAmount } = await applyVoucher(voucherCode, order.total_amount);
      await updateOrderDiscount(order.id, voucher.id, discountAmount, finalAmount);
      fetchOrder(); // Refetch to show updated price
      toast.success('Voucher applied!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handlePayment = async () => {
    if (!user) return;
    try {
      const { data } = await supabase.functions.invoke('payu-create-payment', {
        body: { amount: order.final_amount, txnid: order.id, productinfo: `Yanshay Order ${order.id}`, firstname: user.full_name || 'Customer', email: user.email },
      });
      const payuConfig = {
        key: 'YOUR_PAYU_KEY', // Replace with your actual PayU key
        ...data,
        callback_url: `${window.location.origin}/api/payment-callback`,
      };
      // @ts-ignore
      window.payu.launch(payuConfig);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCardPayment = async () => {
    if (cardNumber === '170507' && cardPin === '121212') {
      try {
        await updateOrderStatus(order.id, 'paid');
        setIsPaid(true);
        toast.success('Payment successful!');
      } catch (err: any) {
        toast.error(err.message);
      }
    } else {
      toast.error('Invalid card credentials for testing.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!order) return notFound();

  if (isPaid) {
    return (
      <div className="container mx-auto py-16 text-center animate-in fade-in duration-700">
        <h1 className="text-4xl font-display uppercase tracking-widest text-primary mb-2">Payment Successful</h1>
        <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-12">Your order has been placed</p>
        
        <div className="max-w-xl mx-auto bg-card border border-border p-8 rounded-lg shadow-sm text-left mb-8">
          <div className="flex justify-between items-center border-b border-border pb-6 mb-6">
             <h2 className="text-xs tracking-widest font-bold uppercase text-muted-foreground">Receipt</h2>
             <span className="font-mono text-primary font-bold">{formatOrderId(order.id)}</span>
          </div>
          
          <div className="space-y-4 mb-6">
            {order.order_items?.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                 <div className="flex gap-4 items-center">
                    {item.product_variants?.products?.image_url && (
                      <img src={item.product_variants.products.image_url.split(',')[0]} alt="img" className="w-12 h-12 rounded object-cover border border-border" />
                    )}
                    <div>
                      <p className="font-bold uppercase tracking-widest text-[10px]">{item.product_variants?.products?.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Qty: {item.quantity} | Size: {item.product_variants?.size}</p>
                    </div>
                 </div>
                 <span className="font-mono font-bold text-sm">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border pt-4 space-y-2 text-xs uppercase tracking-widest">
             <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{order.total_amount}</span>
             </div>
             {order.discount_amount > 0 && (
               <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>- ₹{order.discount_amount}</span>
               </div>
             )}
             <div className="flex justify-between font-bold text-sm pt-2">
                <span>Total Paid</span>
                <span className="text-primary font-mono">₹{order.final_amount || order.total_amount}</span>
             </div>
          </div>
        </div>

        <div className="bg-muted p-6 rounded-md text-sm font-mono flex flex-col gap-2 border border-border max-w-xl mx-auto text-center shadow-sm mb-8">
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Paid With Test Credentials</span>
          <span>Card Number: <span className="font-bold">170507</span></span>
          <span>Password: <span className="font-bold">121212</span></span>
        </div>
        
        <Button onClick={() => window.location.href = '/account'} className="uppercase tracking-widest text-xs font-bold px-8 h-12">
           View My Orders
        </Button>
      </div>
    );
  }

  return (
    <>
      <Script src="https://sdk.payu.com/js/v1/payu-sdks.js" />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Payment</h1>
        <div className="max-w-2xl mx-auto">
          <div className="border p-4 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            {order.order_items.map((item: any) => (
              <div key={item.id} className="flex justify-between mb-2">
                <p>{item.product_variants.products.name} (x{item.quantity})</p>
                <p>₹{item.price}</p>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>₹{order.total_amount}</p>
              </div>
              {order.discount_amount > 0 && (
                <div className="flex justify-between text-green-600">
                  <p>Discount</p>
                  <p>- ₹{order.discount_amount}</p>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg mt-2">
                <p>Total</p>
                <p>₹{order.final_amount}</p>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Apply Discount</h2>
            <div className="flex gap-2">
              <Input placeholder="Voucher Code" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} />
              <Button onClick={handleApplyVoucher}>Apply</Button>
            </div>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="card">Card</TabsTrigger>
                <TabsTrigger value="upi">UPI</TabsTrigger>
                <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>
              <TabsContent value="card">
                <Card>
                  <CardHeader>
                    <CardTitle>Credit/Debit Card</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4 mb-4 mt-2">
                      <div className="space-y-2">
                        <Input placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} autoComplete="off" />
                      </div>
                      <div className="space-y-2">
                        <Input type="password" placeholder="PIN / Password" value={cardPin} onChange={e => setCardPin(e.target.value)} autoComplete="new-password" />
                      </div>
                    </div>
                    <Button size="lg" className="w-full" onClick={handleCardPayment}>Complete Order</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="upi">
                <Card>
                  <CardHeader>
                    <CardTitle>UPI</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>You will be redirected to our secure payment gateway to pay with UPI.</p>
                    <Button size="lg" className="w-full" onClick={handlePayment}>Pay with UPI</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="netbanking">
                <Card>
                  <CardHeader>
                    <CardTitle>Net Banking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>You will be redirected to our secure payment gateway to pay with Net Banking.</p>
                    <Button size="lg" className="w-full" onClick={handlePayment}>Pay with Net Banking</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="qr">
                <Card>
                  <CardHeader>
                    <CardTitle>QR Code</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>You will be redirected to our secure payment gateway to pay with a QR code.</p>
                    <Button size="lg" className="w-full" onClick={handlePayment}>Pay with QR Code</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
