'use client';

import * as React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="group flex flex-col items-center justify-center select-none">
      <div className="flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <span className="text-2xl md:text-3xl font-display font-medium tracking-[0.4em] text-foreground leading-none">
          YANSHAY
        </span>
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(255,191,0,0.4)]" />
      </div>
      <div className="h-[1px] w-0 bg-primary/30 group-hover:w-full transition-all duration-700 ease-out overflow-hidden mt-1">
        <div className="w-full h-full bg-primary/60" />
      </div>
      <span className="text-[7px] tracking-[0.6em] text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 mt-1">
        Digital Collective
      </span>
    </Link>
  );
};

export default Logo;
