'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="w-12 h-6 rounded-full p-1 flex items-center bg-gray-300 dark:bg-gray-700"
      initial={false}
      animate={{ backgroundColor: theme === 'light' ? '#d1d5db' : '#374151' }}
    >
      <motion.div
        className="w-5 h-5 bg-white rounded-full shadow-md"
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        style={{ x: theme === 'light' ? 0 : 24 }}
      >
        {theme === 'light' ? <Sun className="w-full h-full p-1 text-yellow-500" /> : <Moon className="w-full h-full p-1 text-blue-500" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
