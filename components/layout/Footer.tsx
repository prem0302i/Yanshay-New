import Link from 'next/link';
import { Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-display font-medium tracking-tighter uppercase grayscale hover:grayscale-0 transition-all duration-500">
                YANSHAY<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm font-sans font-light leading-relaxed max-w-xs opacity-70">
              Premium quality clothing designed for you. 
              Modern style meets lasting comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-8">Collection</h3>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-xs uppercase tracking-widest hover:text-primary transition-colors duration-300 opacity-60 hover:opacity-100 font-sans">All Products</Link></li>
              <li><Link href="/shop?category=t-shirts" className="text-xs uppercase tracking-widest hover:text-primary transition-colors duration-300 opacity-60 hover:opacity-100 font-sans">T-Shirts</Link></li>
              <li><Link href="/shop?category=hoodies" className="text-xs uppercase tracking-widest hover:text-primary transition-colors duration-300 opacity-60 hover:opacity-100 font-sans">Hoodies</Link></li>
              <li><Link href="/designer" className="text-xs uppercase tracking-widest hover:text-primary transition-colors duration-300 opacity-60 hover:opacity-100 font-sans">Customize</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-8">Information</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-xs uppercase tracking-widest hover:text-primary transition-colors duration-300 opacity-60 hover:opacity-100 font-sans">About Us</Link></li>
              <li><Link href="/faq" className="text-xs uppercase tracking-widest hover:text-primary transition-colors duration-300 opacity-60 hover:opacity-100 font-sans">FAQ</Link></li>
              <li><Link href="/contact" className="text-xs uppercase tracking-widest hover:text-primary transition-colors duration-300 opacity-60 hover:opacity-100 font-sans">Contact Us</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-8">Follow Us</h3>
            <div className="flex gap-6 mb-8">
              <Link href="https://www.instagram.com/yanshay.ofc" className="opacity-40 hover:opacity-100 hover:text-primary transition-all duration-300 transform hover:scale-110">
                <Instagram size={20} strokeWidth={1.5} />
              </Link>
              <Link href="#" className="opacity-40 hover:opacity-100 hover:text-primary transition-all duration-300 transform hover:scale-110">
                <Twitter size={20} strokeWidth={1.5} />
              </Link>
              <Link href="#" className="opacity-40 hover:opacity-100 hover:text-primary transition-all duration-300 transform hover:scale-110">
                <Youtube size={20} strokeWidth={1.5} />
              </Link>
            </div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground opacity-40">
              EST. 2024 / PREMIUM QUALITY
            </p>
          </div>
        </div>

        {/* Legal & Final Note */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground opacity-40">
            &copy; {new Date().getFullYear()} YANSHAY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[9px] uppercase tracking-[0.3em] opacity-30 hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link href="/terms" className="text-[9px] uppercase tracking-[0.3em] opacity-30 hover:opacity-100 transition-opacity">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

