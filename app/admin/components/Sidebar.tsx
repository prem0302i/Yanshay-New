'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  return (
    <aside className="w-72 bg-card border-r border-border flex flex-col">
      <div className="p-8 border-b border-border">
        <Link href="/admin" className="block group">
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-primary/40 group-hover:text-primary transition-colors">Studio Control</span>
          <h2 className="text-2xl font-display uppercase tracking-tight mt-1">Admin Panel</h2>
        </Link>
      </div>
      <nav className="flex-1 py-10">
        <ul className="space-y-2 px-4">
          <SidebarLink href="/admin" label="Analytics" exact />
          <SidebarLink href="/admin/products" label="Products" />
          <SidebarLink href="/admin/orders" label="Orders" />
          <SidebarLink href="/admin/users" label="Users" />
          <SidebarLink href="/admin/categories" label="Categories" />
        </ul>
      </nav>
      <div className="p-8 border-t border-border">
        <Link href="/" className="text-[10px] tracking-[0.3em] uppercase font-bold text-muted-foreground hover:text-primary transition-colors">
          Back to Store
        </Link>
      </div>
    </aside>
  );
};

const SidebarLink = ({ href, label, exact = false }: { href: string; label: string; exact?: boolean }) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <li>
      <Link href={href} className={`flex items-center gap-4 px-6 py-4 text-[11px] tracking-[0.3em] font-bold uppercase transition-all hover:bg-foreground/5 hover:text-primary border-l-2 group ${isActive ? 'border-primary text-primary' : 'border-transparent text-foreground'}`}>
        {isActive ? (
          <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]" />
        ) : (
          <div className="w-1.5 h-1.5 bg-transparent" />
        )}
        <span>{label}</span>
      </Link>
    </li>
  );
};
