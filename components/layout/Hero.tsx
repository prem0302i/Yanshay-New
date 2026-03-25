'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-primary uppercase border border-primary/30">
            Est. 2024 • Prem Apparel
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-medium leading-[0.9] mb-8 tracking-tighter uppercase">
            Design Your <br />
            <span className="text-primary italic">Signature</span> Style
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 font-sans font-light leading-relaxed">
            Experience the digital atelier. Create, customize, and wear your identity with our premium quality fabrics and cutting-edge design tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="px-10 h-14 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
              onClick={() => router.push('/shop')}
            >
              Shop New Drop
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="px-10 h-14 text-sm font-semibold tracking-widest uppercase border-primary/50 text-primary hover:bg-primary/5 hover:border-primary transition-all duration-300"
              onClick={() => router.push('/customize')}
            >
              Start Designing
            </Button>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
