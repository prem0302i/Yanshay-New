'use client';

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { addToCart } from '@/services/cart.service';

import { UserProfile } from '@/types/product';

// Define the shape of the Auth context
interface AuthContextType {
  user: (User & UserProfile) | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<(User & UserProfile) | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userRef = React.useRef(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const refreshUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: userProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUser({ ...session.user, ...userProfile });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const routerRef = React.useRef(router);
  routerRef.current = router;

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        const isNewLogin = (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session?.user?.id !== userRef.current?.id;
        
        if (isNewLogin) {
          setLoading(true);
        }
        
        setSession(session);
        
        if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session?.user) {
          if (isNewLogin) {
            // Optimistically set user to unblock the UI immediately
            setUser(session.user as any);
          }

          // Fetch profile asynchronously in the background
          supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data: userProfile, error: profileError }) => {
              if (userProfile) {
                const fullUser = { ...session.user, ...userProfile };
                setUser(fullUser);
                
                if (event === 'SIGNED_IN') {
                  const currentPath = window.location.pathname;
                  if (currentPath === '/login' || currentPath === '/signup') {
                    const targetUrl = fullUser.role === 'admin' ? '/admin' : '/';
                    routerRef.current.push(targetUrl);
                  }
                }
              } else if (profileError) {
                console.error('Error fetching profile (DB trigger may have failed):', profileError);
              }
            });
        } else if (event === 'SIGNED_OUT' || (!session?.user && event === 'INITIAL_SESSION')) {
          setUser(null);
        }
      } catch (err) {
        console.error('Error in auth state change:', err);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    router.push('/');
  };

  const value = {
    session,
    user,
    loading,
    signOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
