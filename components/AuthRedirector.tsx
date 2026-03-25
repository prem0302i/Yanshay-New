"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const AuthRedirector = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if loading is finished
    if (!loading) {
      if (!user) {
        // Not logged in at all, redirect to login
        router.push('/login');
      } else if (user.role !== 'admin') {
        // Logged in but not an admin, redirect to home
        console.warn('Unauthorized access attempt to admin: ', user.email);
        router.push('/');
      }
    }
  }, [user, loading, router, pathname]);

  // Show nothing while loading or if not authorized
  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary animate-spin rounded-full" />
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-primary/40">Authenticating Identity...</span>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthRedirector;
