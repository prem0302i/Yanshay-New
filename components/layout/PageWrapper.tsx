'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // The homepage has a Hero section that sits behind the transparent header.
  // Admin pages have their own layout structure.
  // All other pages need padding to prevent content from hiding behind the fixed header.
  const needsPadding = pathname !== '/' && !pathname.startsWith('/admin');

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={needsPadding ? 'pt-32' : ''}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageWrapper;
