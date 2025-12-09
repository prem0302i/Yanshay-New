import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AuthRedirector from '@/components/AuthRedirector';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthRedirector>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthRedirector>
  );
};

export default AdminLayout;
