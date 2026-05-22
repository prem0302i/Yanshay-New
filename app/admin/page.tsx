'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight } from 'lucide-react';
import { getOrders } from '@/services/order.service';
import { getUsers } from '@/services/user.service';

const timeAgo = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
};

const AdminDashboard = () => {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [users, setUsers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedOrders, fetchedUsers] = await Promise.all([
          getOrders(),
          getUsers()
        ]);
        setOrders(fetchedOrders || []);
        setUsers(fetchedUsers || []);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + (order.final_amount || order.total_amount || 0), 0);
  const formattedRevenue = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalRevenue);
  
  const recentOrders = [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col gap-2">
        <span className="text-primary text-[10px] tracking-[0.5em] font-bold uppercase">Real-Time Overview</span>
        <h1 className="text-5xl font-display uppercase tracking-tighter">Studio Analytics</h1>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Revenue" value={loading ? "..." : formattedRevenue} increment="Real-time" icon={<DollarSign size={20} />} accent />
        <StatCard label="Orders" value={loading ? "..." : orders.length.toString()} increment="Real-time" icon={<ShoppingBag size={20} />} />
        <StatCard label="Users" value={loading ? "..." : users.length.toString()} increment="Real-time" icon={<Users size={20} />} />
        <StatCard label="Growth Rate" value="24%" increment="+2.4%" icon={<TrendingUp size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
           <SectionHeader title="Recent Orders" action="View All" />
           <div className="bg-card border border-border divide-y divide-border">
              {loading ? (
                <div className="p-6 text-center text-sm text-muted-foreground uppercase tracking-widest">Loading orders...</div>
              ) : recentOrders.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground uppercase tracking-widest">No recent orders</div>
              ) : recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-6 hover:bg-foreground/5 transition-colors group">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-10 bg-card flex items-center justify-center text-[10px] font-bold tracking-widest uppercase">
                        ORD-{order.id.toString().padStart(5, '0')}
                      </div>
                      <div>
                         <p className="text-xs tracking-widest uppercase font-bold">{order.users?.full_name || 'Guest User'}</p>
                         <p className="text-[10px] text-muted-foreground uppercase opacity-40">{order.order_items?.length || 0} items / {order.status}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-sans font-semibold text-primary">₹{order.final_amount || order.total_amount}</p>
                      <p className="text-[9px] tracking-widest uppercase opacity-30">{timeAgo(order.created_at)}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Quick Actions / Performance */}
        <div className="space-y-6">
           <SectionHeader title="System Status" />
           <div className="bg-card border border-border p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-8">
                 <div className="space-y-2">
                    <p className="text-[10px] tracking-[0.3em] font-bold uppercase opacity-40 text-primary">Server Uptime</p>
                    <p className="text-3xl font-display uppercase tracking-tighter text-foreground">99.9% Reliable</p>
                 </div>
                 <div className="space-y-4">
                    <StatusItem label="API" status="Online" />
                    <StatusItem label="CDN" status="Active" />
                    <StatusItem label="Database" status="Active" />
                 </div>
                 <button className="w-full h-12 bg-card hover:bg-border text-[10px] tracking-[0.2em] font-bold uppercase transition-all flex items-center justify-center gap-2">
                    View Details <ArrowUpRight size={14} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, increment, icon, accent = false }: { label: string; value: string; increment: string; icon: React.ReactNode; accent?: boolean }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`p-8 border ${accent ? 'bg-gradient-to-br from-primary/10 to-transparent border-primary/20' : 'bg-card border-border'} transition-all group`}
  >
    <div className="flex items-center justify-between mb-6">
       <div className={`${accent ? 'text-primary' : 'text-muted-foreground'} opacity-60`}>
         {icon}
       </div>
       <span className="text-[10px] font-bold text-primary tracking-widest">{increment}</span>
    </div>
    <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-muted-foreground mb-1">{label}</p>
    <p className="text-3xl font-display uppercase tracking-tighter text-foreground">{value}</p>
  </motion.div>
);

const SectionHeader = ({ title, action }: { title: string; action?: string }) => (
  <div className="flex items-center justify-between border-b border-border pb-4">
    <h3 className="text-[11px] tracking-[0.4em] font-bold uppercase text-primary/80">{title}</h3>
    {action && <button className="text-[9px] tracking-widest uppercase font-bold text-muted-foreground hover:text-primary transition-colors underline underline-offset-4">{action}</button>}
  </div>
);

const StatusItem = ({ label, status }: { label: string; status: string }) => (
  <div className="flex items-center justify-between py-1">
    <span className="text-[9px] tracking-widest uppercase font-bold text-muted-foreground">{label}</span>
    <span className="text-[9px] tracking-widest uppercase font-bold text-primary">{status}</span>
  </div>
);

export default AdminDashboard;
