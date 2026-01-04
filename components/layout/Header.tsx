'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from 'next-themes';

const ThemeToggle = dynamic(() => import('@/components/ui/ThemeToggle'), { ssr: false });
const Logo = dynamic(() => import('@/components/layout/Logo'), { ssr: false });
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart, User, Home, ShoppingBag } from 'lucide-react';
import CartCount from './CartCount';
import { SearchBar } from '@/components/SearchBar';

const Header = () => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex items-center justify-between p-4 flex-wrap">
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-grow justify-center px-8">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          <nav className="flex items-center gap-6">
            {user?.role !== 'admin' && (
              <>
                <Link href="/" className="hover:text-primary transition-colors"><Home /></Link>
                <Link href="/shop" className="hover:text-primary transition-colors"><ShoppingBag /></Link>
              </>
            )}
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {user.role !== 'admin' ? (
                  <>
                    <Link href="/account" className="hover:text-primary transition-colors"><User /></Link>
                    <Link href="/cart" className="relative hover:text-primary transition-colors">
                      <ShoppingCart />
                      <CartCount />
                    </Link>
                  </>
                ) : (
                  <Button onClick={signOut} variant="destructive">Logout</Button>
                )}
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
                <Link href="/cart" className="relative hover:text-primary transition-colors">
                  <ShoppingCart />
                  <CartCount />
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
                {/* Mobile Search Bar */}
        <div className="md:hidden flex items-center w-full pt-4">
          <SearchBar />
        </div>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background border-b md:hidden flex flex-col items-center gap-4 p-4">
            <nav className="flex flex-col items-center gap-4">
              {user?.role !== 'admin' && (
                <>
                  <Link href="/" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}><Home /></Link>
                  <Link href="/shop" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}><ShoppingBag /></Link>
                </>
              )}
            </nav>
            <div className="flex flex-col items-center gap-4">
              {user ? (
                <>
                  {user.role !== 'admin' ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex items-center gap-4">
                        <Link href="/account" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}><User /></Link>
                        <Link href="/cart" className="relative hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                          <ShoppingCart />
                          <CartCount />
                        </Link>
                      </div>
                      <Button onClick={() => { signOut(); setIsMenuOpen(false); }} variant="destructive">Logout</Button>
                    </div>
                  ) : (
                    <Button onClick={() => { signOut(); setIsMenuOpen(false); }} variant="destructive">Logout</Button>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Link href="/login" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link href="/cart" className="relative hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <ShoppingCart />
                    <CartCount />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
