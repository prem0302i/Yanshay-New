'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext';

const Logo = () => {
  const { user } = useAuth();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const logoSrc = currentTheme === 'dark' ? '/dark.jpeg' : '/yanshay-logo.jpg';
  const fallbackSrc = '/yanshay-logo.jpg';

  const [imgSrc, setImgSrc] = useState(logoSrc);

  useEffect(() => {
    setImgSrc(logoSrc);
  }, [logoSrc, currentTheme]);

  if (!mounted) {
    return <div className="w-[150px] h-[40px]" />;
  }

  const isAdmin = user?.role === 'admin';

  if (isAdmin) {
    return (
      <Link href="/admin">
        <Image 
          src={imgSrc}
          alt="Yanshay Logo" 
          width={100} 
          height={100} 
          className="object-contain w-[100px] h-[100px]" 
          onError={() => setImgSrc(fallbackSrc)}
        />
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary flex-shrink-0">
      <div className="relative w-8 h-8">
        <Image 
          src={imgSrc}
          alt="Yanshay Logo" 
          layout="fill"
          className="object-contain"
          onError={() => setImgSrc(fallbackSrc)}
        />
      </div>
      <span>YANSHAY<span className="text-sm text-yellow-500">.ofc</span></span>
    </Link>
  );
};

export default Logo;
