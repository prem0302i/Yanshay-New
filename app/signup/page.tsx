'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight, Shield } from 'lucide-react';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error('Identity Fields Mandatory.', {
        description: 'All architectural signature fields are required.'
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ 
      email, 
      password, 
      options: { 
        data: { 
          full_name: fullName,
          role: 'user'
        } 
      } 
    });
    
    if (error) {
      toast.error('Manifestation Failed.', {
        description: error.message
      });
    } else {
      toast.success('Manifestation Initiated.', {
        description: 'Verify your digital signature via email.'
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-background min-h-[90vh] w-full flex flex-col items-center justify-center pt-32 pb-24 px-6">
      <div className="w-full max-w-lg">
        
        <header className="mb-16 text-center">
           <span className="text-primary text-[10px] tracking-[0.4em] font-sans font-bold uppercase mb-4 block">New Profile Establishment</span>
           <h1 className="text-6xl md:text-7xl font-display font-medium leading-[0.9] tracking-tighter uppercase mb-6">
             Create <br /> <span className="text-primary italic">Identity</span>
           </h1>
           <p className="text-muted-foreground text-sm font-sans font-light tracking-widest uppercase opacity-60">Join the Collective Digital Atelier</p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div className="space-y-8">
            <div className="space-y-2">
              <Label className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-60">Full Name / Signature</Label>
              <Input 
                id="fullName" 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                required 
                className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg font-sans"
                placeholder="E.g. Alexander McQueen"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-60">Identity / Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                autoComplete="off"
                className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg font-sans"
                placeholder="name@studio.com"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-60">Credential / Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                autoComplete="new-password"
                className="h-12 border-0 border-b border-white/10 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg font-sans"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button 
              size="lg" 
              className="w-full h-16 text-[11px] font-bold tracking-[0.4em] uppercase group" 
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? 'Processing...' : (
                <span className="flex items-center gap-2">
                  Sign Up <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
            <div className="mt-8 flex items-center justify-center gap-2 text-[9px] tracking-[0.3em] uppercase text-muted-foreground opacity-40">
               <Shield size={14} /> Encrypted Gateway Secure
            </div>
          </div>
        </motion.div>

         <footer className="mt-16 text-center space-y-4">
            <p className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase font-bold">
               Already have an account? <Link href="/login" className="text-primary hover:underline transition-all">Log In</Link>
            </p>
           <div className="w-12 h-[1px] bg-white/5 mx-auto" />
           <Link href="/" className="text-[9px] tracking-widest uppercase text-muted-foreground/30 hover:text-muted-foreground transition-all">
              Return to Public Space
           </Link>
        </footer>
      </div>
    </div>
  );
};

export default SignupPage;
