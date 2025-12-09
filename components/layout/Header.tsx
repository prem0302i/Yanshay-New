'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          YANSHAY
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <Link href="/designer" className="hover:text-primary transition-colors">T-Shirt Designer</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
          {user ? (
            <>
              <Link href="/account" className="hover:text-primary transition-colors">Account</Link>
              <Button onClick={signOut} variant="outline">Logout</Button>
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
    </header>
  );
};

export default Header;
