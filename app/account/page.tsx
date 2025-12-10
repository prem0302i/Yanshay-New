'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

const AccountPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const { data } = await supabase.from('orders').select('*').eq('user_id', user.id);
        setOrders(data || []);
      };

      fetchOrders();

      const channel = supabase
        .channel('realtime:public:orders')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${user.id}` }, (payload) => {
          fetchOrders();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-8">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <ul className="space-y-2">
            <li><a href="#orders" className="font-bold">Orders</a></li>
            <li><a href="#saved-designs" className="hover:text-primary transition-colors">Saved Designs</a></li>
            <li><a href="#settings" className="hover:text-primary transition-colors">Settings</a></li>
          </ul>
        </div>
        <div className="col-span-2">
          <div id="profile">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            {user && (
              <div className="space-y-2">
                <p><strong>Full Name:</strong> {user.full_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
            )}
          </div>
          <div id="orders" className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <p>Order ID: {order.id}</p>
                  <p>Total: ${order.total_amount}</p>
                  <p>Status: {order.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
