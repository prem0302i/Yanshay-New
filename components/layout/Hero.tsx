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
    <section className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16">
      <motion.div
        className="md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Design Your Style</h1>
        <p className="text-xl text-muted-foreground mb-8">Create and customize your own t-shirts with our easy-to-use online designer.</p>
        <Button size="lg" onClick={() => router.push('/shop')}>Get Started</Button>
      </motion.div>
      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Lottie animationData={animationData} />
      </motion.div>
    </section>
  );
};

export default Hero;
