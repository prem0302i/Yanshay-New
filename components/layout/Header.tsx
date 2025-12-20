'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className={user?.role === 'admin' ? '-ml-4' : ''}>
          {user?.role === 'admin' ? (
            <Link href="/admin">
              <Image src="/yanshay-logo.jpg" alt="Yanshay Logo" width={60} height={60} className="rounded-full" />
            </Link>
          ) : (
            <Link href="/" className="text-2xl font-bold text-primary">
              YANSHAY
            </Link>
          )}
        </div>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {user?.role !== 'admin' && (
              <>
                <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
                <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              </>
            )}
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {user.role !== 'admin' ? (
                  <Link href="/account" className="hover:text-primary transition-colors">Account</Link>
                ) : (
                  <Button onClick={signOut} variant="destructive">Logout</Button>
                )}
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
                <Link href="/signup" className="hover:text-primary transition-colors">Sign Up</Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
