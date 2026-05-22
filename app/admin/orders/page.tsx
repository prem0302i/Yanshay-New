'use client';

import * as React from 'react';
import { getOrders } from '@/services/order.service';
import { updateOrderStatusAsAdmin } from '@/app/actions/order.actions';
import { supabase } from '@/lib/supabase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { toast } from 'sonner';

export const formatOrderId = (id: any) => 'ORD-' + id.toString().padStart(5, '0');

const AdminOrdersPage = () => {
  const [orders, setOrders] = React.useState<any[]>([]);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data || []);
  };

  React.useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('orders-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatusAsAdmin(orderId, newStatus);
      toast.success('Status updated successfully');
      fetchOrders(); // Refresh local list just in case realtime is slow
    } catch (err: any) {
      toast.error('Failed to update status: ' + err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-muted/50 cursor-pointer">
              <TableCell>
                <Link href={`/admin/orders/${order.id}`} className="font-mono text-primary font-bold hover:underline">
                  {formatOrderId(order.id)}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/admin/orders/${order.id}`} className="block w-full">
                  {order.users?.full_name || 'Guest'}
                </Link>
              </TableCell>
              <TableCell>
                <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                  <SelectTrigger>
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
              </TableCell>
              <TableCell>
                <Link href={`/admin/orders/${order.id}`} className="block w-full">
                  ₹{order.total_amount}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrdersPage;
