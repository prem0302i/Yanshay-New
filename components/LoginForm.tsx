'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; 
import Link from 'next/link'; // Import Link for navigation

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Safeguard: Redirect away if already authenticated
  useEffect(() => {
    if (user) {
      const target = user.role === 'admin' ? '/admin' : '/';
      router.replace(target);
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast.error('Login Failed.', {
          description: error.message
        });
        setLoading(false);
      } else {
        toast.success('Welcome Back!', {
          description: 'You\'re now signed in.'
        });

        // Small delay to allow the toast to be seen and session to propagate
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user?.id)
          .single();

        const targetUrl = profile?.role === 'admin' ? '/admin' : '/';
        router.push(targetUrl);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error('Something Went Wrong.', {
        description: err.message || 'An unexpected error occurred.'
      });
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <form onSubmit={handleLogin} className="space-y-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <Label className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-60">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              autoComplete="email"
              className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg font-sans"
              placeholder="name@studio.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
               <Label className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-60">Password</Label>
               <button type="button" className="text-[9px] tracking-widest uppercase text-primary/50 hover:text-primary">Forgot Password?</button>
            </div>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              autoComplete="current-password"
              className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg font-sans"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-16 text-[11px] font-bold tracking-[0.4em] uppercase group" 
            disabled={loading}
          >
            {loading ? 'Signing In...' : (
              <span className="flex items-center gap-2">
                Log In <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>
          <div className="mt-8 flex items-center justify-center gap-2 text-[9px] tracking-[0.3em] uppercase text-muted-foreground opacity-40">
             <ShieldCheck size={14} /> Your data is secure
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
