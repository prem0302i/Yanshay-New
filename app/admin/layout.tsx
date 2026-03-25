import Header from './components/Header';
import AuthRedirector from '@/components/AuthRedirector';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col">
      <div className="p-8 border-b border-white/5">
        <Link href="/admin" className="block group">
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-primary/40 group-hover:text-primary transition-colors">Studio Control</span>
          <h2 className="text-2xl font-display uppercase tracking-tighter mt-1">Atelier Hub</h2>
        </Link>
      </div>
      <nav className="flex-1 py-10">
        <ul className="space-y-2 px-4">
          <SidebarLink href="/admin" label="Analytics" icon={<div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(250,229,21,1)]" />} />
          <SidebarLink href="/admin/products" label="Collection" />
          <SidebarLink href="/admin/orders" label="Manifests" />
          <SidebarLink href="/admin/users" label="Identities" />
          <SidebarLink href="/admin/categories" label="Architectures" />
        </ul>
      </nav>
      <div className="p-8 border-t border-white/5">
        <Link href="/" className="text-[10px] tracking-[0.3em] uppercase font-bold text-muted-foreground hover:text-primary transition-colors">
          Exit to Public Hub
        </Link>
      </div>
    </aside>
  );
};

const SidebarLink = ({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) => (
  <li>
    <Link href={href} className="flex items-center gap-4 px-6 py-4 text-[11px] tracking-[0.3em] font-bold uppercase transition-all hover:bg-white/[0.02] hover:text-primary border-l-2 border-transparent hover:border-primary group">
      {icon}
      <span>{label}</span>
    </Link>
  </li>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthRedirector>
      <div className="flex h-screen bg-[#050505] text-foreground font-sans selection:bg-primary/30">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 p-10 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthRedirector>
  );
};

export default AdminLayout;
