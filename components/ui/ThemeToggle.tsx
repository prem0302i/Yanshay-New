'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-14 h-7" />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-14 h-7 rounded-full bg-[#111] border border-white/10 p-1 flex items-center transition-all duration-500 hover:border-primary/50 group overflow-hidden"
      aria-label="Toggle Theme"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      
      <motion.div
        className="relative z-10 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(250,229,21,0.3)]"
        animate={{ 
          x: isDark ? 28 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={10} className="text-black fill-black" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={10} className="text-black fill-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <Sparkles size={10} className={`text-primary/20 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`} />
      </div>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Sparkles size={10} className={`text-primary/20 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;
