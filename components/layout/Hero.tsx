'use client';

import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { motion } from 'framer-motion';
import animationData from '@/assets/lottie/hero-animation.json';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <section className="container mx-auto flex flex-col items-center justify-center text-center min-h-[calc(100vh-81px)]">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-64 h-64 mx-auto">
          <Lottie animationData={animationData} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-8">Design Your Style</h1>
        <p className="text-xl text-muted-foreground mb-8">Create and customize your own t-shirts with our easy-to-use online designer.</p>
        <Button size="lg" onClick={() => router.push('/shop')}>Get Started</Button>
      </motion.div>
    </section>
  );
};

export default Hero;
