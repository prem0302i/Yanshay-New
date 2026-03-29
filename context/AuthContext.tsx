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
    const fetchSessionAndProfile = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        setSession(session);

        if (session?.user) {
          const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          if (profileError) throw profileError;
          setUser({ ...session.user, ...userProfile });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching initial session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        setLoading(true);
      }
      
      setSession(session);
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userProfile) {
          const fullUser = { ...session.user, ...userProfile };
          setUser(fullUser);
          
          // Only redirect if on auth pages to avoid interrupting active sessions on deep links
          const currentPath = window.location.pathname;
          if (currentPath === '/login' || currentPath === '/signup') {
            const targetUrl = fullUser.role === 'admin' ? '/admin' : '/';
            routerRef.current.push(targetUrl);
          }
        } else if (profileError) {
          // Profile doesn't exist, create it
          const { data: newProfile, error: createError } = await supabase
            .from('users')
            .insert({ 
              id: session.user.id, 
              full_name: session.user.user_metadata.full_name,
              role: 'user'
            })
            .select()
            .single();

          if (newProfile) {
            const fullUser = { ...session.user, ...newProfile };
            setUser(fullUser);
            
            const currentPath = window.location.pathname;
            if (currentPath === '/login' || currentPath === '/signup') {
              routerRef.current.push('/'); 
            }
          } else {
            console.error('Error creating profile:', createError);
            await supabase.auth.signOut();
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
      setLoading(false);
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
