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
      <div className="container mx-auto p-4">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-6 w-1/3">
            <Logo />
            <nav className="flex items-center gap-4">
              {user?.role !== 'admin' && (
                <>
                  <Link href="/" className="hover:text-primary transition-colors"><Home /></Link>
                  <Link href="/shop" className="hover:text-primary transition-colors"><ShoppingBag /></Link>
                </>
              )}
            </nav>
          </div>

          {/* Center Section */}
          <div className="w-1/3 flex justify-center">
            <div className="w-full max-w-sm">
              <SearchBar />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-1/3 flex justify-end items-center gap-4">
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
                <Link href="/login" className="flex items-center hover:text-primary transition-colors">Login</Link>
                <Link href="/cart" className="relative hover:text-primary transition-colors">
                  <ShoppingCart />
                  <CartCount />
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <SearchBar />
          </div>
          {isMenuOpen && (
            <div className="absolute top-20 left-0 w-full bg-background border-b flex flex-col items-center gap-4 p-4 z-50">
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
      </div>
    </header>
  );
};

export default Header;
