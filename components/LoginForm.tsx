'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
       toast.error('Access Denied.', {
         description: error.message
       });
    } else {
       toast.success('Identity Authorized.', {
         description: 'Entry to binary sanctuary granted.'
       });
    }
    setLoading(false);
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
            <Label className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-60">Identity / Email</Label>
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
               <Label className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-60">Credential / Password</Label>
               <button type="button" className="text-[9px] tracking-widest uppercase text-primary/50 hover:text-primary">Recov_Key</button>
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
            {loading ? 'Validating...' : (
              <span className="flex items-center gap-2">
                Authorize Access <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>
          <div className="mt-8 flex items-center justify-center gap-2 text-[9px] tracking-[0.3em] uppercase text-muted-foreground opacity-40">
             <ShieldCheck size={14} /> Encrypted Gateway Secure
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
