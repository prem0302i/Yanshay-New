'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast.error(error.message);
        setError(error.message);
        setLoading(false);
        return;
      }

      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError || !profile) {
          const msg = 'Failed to get user profile. Please try again.';
          toast.error(msg);
          setError(msg);
          await supabase.auth.signOut(); // Log out the user to be safe
        } else {
          toast.success('Logged in successfully! Redirecting...');
          // Use window.location for a more forceful redirect
          const targetUrl = profile.role === 'admin' ? '/admin' : '/';
          window.location.href = targetUrl;
          return; // Stop execution to allow redirect to happen
        }
      } else {
        const msg = 'Login failed. Please check your credentials.';
        toast.error(msg);
        setError(msg);
      }
    } catch (err) {
      const msg = 'An unexpected error occurred during login.';
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
};

export default LoginForm;
