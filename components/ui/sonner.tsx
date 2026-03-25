'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="bottom-center"
      expand={true}
      richColors={false}
      toastOptions={{
        duration: 2500,
        style: {
          borderRadius: '0px',
          background: '#0a0a0a',
          color: '#ffffff',
          border: 'none',
          fontFamily: 'var(--font-manrope)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: '800',
          padding: '20px 40px',
          boxShadow: '0 -20px 40px -10px rgba(0,0,0,0.8)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'auto',
          minWidth: '300px',
        },
        classNames: {
          toast: 'group toast',
          description: 'text-[9px] opacity-40 mt-2 lowercase font-normal tracking-[0.1em] text-center w-full',
          actionButton: 'bg-primary text-black font-bold uppercase tracking-widest text-[9px] px-4 h-9 rounded-none mt-4',
          cancelButton: 'bg-white/5 text-white/50 font-bold uppercase tracking-widest text-[9px] px-4 h-9 rounded-none mt-4',
          success: 'text-primary',
          error: 'text-red-500',
          info: 'text-blue-500',
          warning: 'text-amber-500',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
