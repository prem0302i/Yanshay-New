'use client';

import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import animationData from '@/assets/lottie/hero-animation.json';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16">
      <motion.div
        className="md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-4">Design Your Style</h1>
        <p className="text-xl text-muted-foreground mb-8">Create and customize your own t-shirts with our easy-to-use online designer.</p>
        <Button size="lg">Get Started</Button>
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
