'use client';

import * as React from 'react';
import { getOrderDetails } from '@/services/order.service';
import { updateOrderStatusAsAdmin } from '@/app/actions/order.actions';
import { notFound, useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Package, User, MapPin } from 'lucide-react';
import Link from 'next/link';
import { formatOrderId } from '../page';

const AdminOrderDetailsPage = ({ params }: { params: { id: string } }) => {
  const [order, setOrder] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const fetchOrder = async () => {
    try {
      const data = await getOrderDetails(params.id);
      if (!data) return notFound();
      setOrder(data);
    } catch (err: any) {
      toast.error(err.message);
      router.push('/admin/orders');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateOrderStatusAsAdmin(order.id, newStatus);
      toast.success('Order status updated');
      setOrder({ ...order, status: newStatus });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground uppercase tracking-widest text-xs">Loading Order...</div>;
  if (!order) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <div className="flex items-center gap-4 border-b border-border pb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/orders"><ArrowLeft size={16} /></Link>
        </Button>
        <div>
          <span className="text-primary text-[10px] tracking-[0.4em] font-bold uppercase block mb-1">Order Details</span>
          <h1 className="text-3xl font-display uppercase tracking-widest">{formatOrderId(order.id)}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Info */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-card border border-border p-8 rounded-lg shadow-sm">
            <h2 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 text-muted-foreground border-b border-border pb-4">
              <Package size={16} /> Order Items
            </h2>
            <div className="space-y-6">
              {order.order_items?.map((item: any) => (
                <div key={item.id} className="flex gap-6 items-center">
                  {item.product_variants?.products?.image_url && (
                    <img src={item.product_variants.products.image_url.split(',')[0]} alt="Product" className="w-16 h-16 object-cover rounded-md border border-border" />
                  )}
                  <div className="flex-1">
                    <p className="font-bold uppercase tracking-widest text-sm">{item.product_variants?.products?.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Size: {item.product_variants?.size} | Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold">₹{item.price}</p>
                    <p className="text-[10px] uppercase text-muted-foreground tracking-widest mt-1">Sub: ₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border flex justify-end">
              <div className="w-64 space-y-3 text-sm">
                <div className="flex justify-between uppercase tracking-widest text-xs text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{order.total_amount}</span>
                </div>
                {order.discount_amount > 0 && (
                  <div className="flex justify-between uppercase tracking-widest text-xs text-green-500">
                    <span>Discount</span>
                    <span>- ₹{order.discount_amount}</span>
                  </div>
                )}
                <div className="flex justify-between uppercase tracking-widest font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary font-mono text-lg">₹{order.final_amount || order.total_amount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-card border border-border p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-4">Status & Actions</h2>
            <Select value={order.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="h-12 border-primary/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-4">Created: {new Date(order.created_at).toLocaleString()}</p>
          </div>

          <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
            <h2 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 text-muted-foreground border-b border-border pb-4">
              <User size={16} /> Customer
            </h2>
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-widest">{order.users?.full_name || 'Guest User'}</p>
              <p className="text-xs text-muted-foreground">{order.users?.email}</p>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
            <h2 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 text-muted-foreground border-b border-border pb-4">
              <MapPin size={16} /> Shipping Address
            </h2>
            {order.shipping_address ? (
              <div className="text-xs leading-relaxed opacity-80 uppercase tracking-wider font-light">
                <p>{order.shipping_address.street_address}</p>
                {order.shipping_address.landmark && <p>{order.shipping_address.landmark}</p>}
                <p>{order.shipping_address.city}, {order.shipping_address.state}</p>
                <p>{order.shipping_address.postal_code}</p>
                <p>{order.shipping_address.country}</p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">No address provided</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminOrderDetailsPage;
