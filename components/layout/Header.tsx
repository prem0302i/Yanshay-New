'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from 'next-themes';

const ThemeToggle = dynamic(() => import('@/components/ui/ThemeToggle'), { ssr: false });
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import CartCount from './CartCount';

const Header = () => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className={user?.role === 'admin' ? '-ml-4' : ''}>
          {user?.role === 'admin' ? (
            <Link href="/admin">
              <Image src={theme === 'dark' ? '/yanshay-logo-dark.jpg' : '/yanshay-logo.jpg'} alt="Yanshay Logo" width={100} height={100} className="rounded-full object-contain w-[100px] h-[100px]" />
            </Link>
          ) : (
            <Link href="/" className="text-2xl font-bold text-primary">
              YANSHAY
            </Link>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {user?.role !== 'admin' && (
              <>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
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
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background border-b md:hidden flex flex-col items-center gap-4 p-4">
            <nav className="flex flex-col items-center gap-4">
              {user?.role !== 'admin' && (
                <>
                  <Link href="/" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
                  <Link href="/shop" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Shop</Link>
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
