'use client';

import * as React from 'react';
import { User, Bell, Search, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-[#050505] border-b border-white/5 flex items-center justify-between px-10">
      <div className="relative group w-96">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Manifest Search..." 
          className="w-full h-10 bg-white/5 border-0 rounded-none pl-12 pr-4 text-[10px] tracking-widest uppercase font-bold focus:ring-1 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(250,229,21,1)]" />
        </button>
        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
          <Settings size={18} />
        </button>
        <div className="h-6 w-[1px] bg-white/5 mx-2" />
        <div className="flex items-center gap-4">
          <div className="text-right flex flex-col">
            <span className="text-[10px] tracking-widest uppercase font-bold text-white">Administrator</span>
            <span className="text-[9px] tracking-widest uppercase font-medium text-primary/60">{user?.email || 'System Root'}</span>
          </div>
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
