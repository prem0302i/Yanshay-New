'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart, User, ShoppingBag, Search } from 'lucide-react';
import CartCount from './CartCount';
import { SearchBar } from '@/components/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = dynamic(() => import('@/components/ui/ThemeToggle'), { ssr: false });
const Logo = dynamic(() => import('@/components/layout/Logo'), { ssr: false });

const Header = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-primary/10 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between gap-8">
          
          {/* Menu Button (Mobile/Tablet) */}
          <div className="flex md:hidden items-center w-1/4">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Desktop Navigation (Left) */}
          <nav className="hidden md:flex items-center gap-8 w-1/3">
            <Link href="/shop" className="text-[11px] tracking-[0.2em] font-sans font-medium uppercase hover:text-primary transition-colors py-1 relative group">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/customize" className="text-[11px] tracking-[0.2em] font-sans font-medium uppercase hover:text-primary transition-colors py-1 relative group">
              Customize
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Logo (Center) */}
          <div className="flex justify-center w-1/2 md:w-1/3">
            <Logo />
          </div>

          {/* Actions (Right) */}
          <div className="flex items-center justify-end gap-3 md:gap-6 w-1/4 md:w-1/3">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="group relative p-2 text-foreground/60 hover:text-primary transition-all duration-300"
              aria-label="Search Collection"
            >
              <Search size={19} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-full blur-md transition-all" />
            </button>

            <div className="hidden md:flex items-center gap-4 ml-2 mr-2">
              {!user ? (
                <>
                  <Link href="/login" className="text-[10px] tracking-[0.3em] font-bold uppercase text-foreground/40 hover:text-primary transition-colors">Login</Link>
                  <span className="w-[1px] h-3 bg-white/10" />
                  <Link href="/signup" className="text-[10px] tracking-[0.3em] font-bold uppercase text-foreground/40 hover:text-primary transition-colors">Sign Up</Link>
                </>
              ) : (
                <Link href="/account" className="group relative p-2 text-foreground/60 hover:text-primary transition-all duration-300">
                  <User size={19} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-full blur-md transition-all" />
                </Link>
              )}
            </div>

            <Link href="/cart" className="group relative p-2 text-foreground/60 hover:text-primary transition-all duration-300">
              <div className="relative">
                <ShoppingBag size={19} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <CartCount />
              </div>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-full blur-md transition-all" />
            </Link>

            <div className="hidden sm:block ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Expandable Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4 px-2"
            >
              <SearchBar onResultClick={() => setIsSearchOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 top-[60px] bg-background z-40 md:hidden p-8 flex flex-col gap-10 border-r border-primary/10"
            >
              <nav className="flex flex-col gap-8">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase tracking-tighter hover:text-primary transition-colors">Atelier Home</Link>
                <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase tracking-tighter hover:text-primary transition-colors">Ready To Wear</Link>
                <Link href="/customize" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase tracking-tighter hover:text-primary transition-colors">Custom Blueprint</Link>
                <Link href="/account" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display uppercase tracking-tighter hover:text-primary transition-colors">Profile Hub</Link>
                
                {!user && (
                   <div className="flex flex-col gap-4 pt-8 border-t border-white/5">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-[11px] tracking-[0.4em] font-bold uppercase text-foreground/40">Authorize Account</Link>
                      <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="text-[11px] tracking-[0.4em] font-bold uppercase text-primary">Sign Up Now</Link>
                   </div>
                )}
              </nav>
              
              <div className="mt-auto pb-10 flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <ThemeToggle />
                  {user && (
                    <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="text-[10px] tracking-[0.4em] uppercase font-bold text-red-400 opacity-60">
                      Terminate Session
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
