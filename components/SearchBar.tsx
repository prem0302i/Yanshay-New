'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onResultClick?: () => void;
}

export const SearchBar = ({ onResultClick }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      if (onResultClick) onResultClick();
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto group">
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the collection..."
          className="h-14 pl-12 pr-12 bg-[#111] border-white/5 rounded-none text-sm tracking-widest uppercase focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all"
          suppressHydrationWarning
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors">
          <Search size={18} />
        </div>
        
        {query && (
          <button 
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      {/* Decorative focus line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[1px] bg-primary"
        initial={{ width: 0 }}
        whileFocus={{ width: '100%' }}
        transition={{ duration: 0.5 }}
      />
    </form>
  );
};
