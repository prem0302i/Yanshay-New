import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-background border-r">
      <div className="p-4">
        <Link href="/admin" className="text-2xl font-bold text-primary">Admin</Link>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2">
          <li><Link href="/admin" className="block p-4 hover:bg-gray-200 dark:hover:bg-gray-800">Dashboard</Link></li>
          <li><Link href="/admin/products" className="block p-4 hover:bg-gray-200 dark:hover:bg-gray-800">Products</Link></li>
          <li><Link href="/admin/orders" className="block p-4 hover:bg-gray-200 dark:hover:bg-gray-800">Orders</Link></li>
          <li><Link href="/admin/users" className="block p-4 hover:bg-gray-200 dark:hover:bg-gray-800">Users</Link></li>
          <li><Link href="/admin/categories" className="block p-4 hover:bg-gray-200 dark:hover:bg-gray-800">Categories</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
