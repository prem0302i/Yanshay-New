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
        // Use replace to prevent back button from returning to restricted area
        router.replace('/login');
      } else if (user.role !== 'admin') {
        // Logged in but not an admin, redirect to sanitized public home
        console.warn(`Restricted access prevented for ${user.email} (Role: ${user.role || 'unassigned'})`);
        router.replace('/');
      }
    }
  }, [user, loading, router]);

  // Show nothing while loading or if not authorized
  // Using a consistent placeholder to avoid layout shifts
  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-6 p-6">
        <div className="relative">
          <div className="w-16 h-16 border-[1px] border-primary/10 rounded-full" />
          <div className="absolute inset-0 w-16 h-16 border-t-[1px] border-primary animate-spin rounded-full shadow-[0_0_15px_rgba(255,191,0,0.1)]" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-primary/60">System Check</span>
          <span className="text-[9px] tracking-[0.3em] uppercase font-medium text-white/30">Decrypting Authorization Tokens...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthRedirector;
