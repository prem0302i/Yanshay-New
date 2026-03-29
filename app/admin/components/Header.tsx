'use client';

import * as React from 'react';
import { User, Bell, Search, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-24 bg-[#050505] border-b border-white/5 flex items-center justify-between px-12">
      <div className="relative group w-[400px]">
        <Search size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Manifest Search..." 
          className="w-full h-12 bg-white/5 border-0 rounded-none pl-14 pr-6 text-[10px] tracking-[0.3em] uppercase font-bold focus:ring-1 focus:ring-primary/20 transition-all outline-none"
        />
      </div>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <button className="relative p-2.5 text-muted-foreground/60 hover:text-primary transition-colors">
            <Bell size={18} strokeWidth={1.5} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(255,191,0,0.4)]" />
          </button>
          <button className="p-2.5 text-muted-foreground/60 hover:text-primary transition-colors">
            <Settings size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="h-8 w-[1px] bg-white/10 mx-2" />

        <div className="flex items-center gap-6">
          <div className="text-right flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-white mb-0.5">Administrator</span>
            <span className="text-[9px] tracking-[0.3em] uppercase font-medium text-primary/40 truncate max-w-[150px]">{user?.email || 'System Root'}</span>
          </div>
          <div className="w-11 h-11 bg-primary/5 border border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors">
            <User size={19} strokeWidth={1.5} className="text-primary/70" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
