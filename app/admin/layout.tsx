import Header from './components/Header';
import AuthRedirector from '@/components/AuthRedirector';
import Link from 'next/link';

import { Sidebar } from './components/Sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthRedirector>
      <div className="flex h-screen bg-background text-foreground font-sans selection:bg-primary/30">
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
