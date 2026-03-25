import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="bg-background min-h-[90vh] w-full flex flex-col items-center justify-center pt-32 pb-24 px-6">
      <div className="w-full max-w-lg">
        <header className="mb-16 text-center">
           <span className="text-primary text-[10px] tracking-[0.4em] font-sans font-bold uppercase mb-4 block">System Authorization</span>
           <h1 className="text-6xl md:text-7xl font-display font-medium leading-[0.9] tracking-tighter uppercase mb-6">
             The <br /> <span className="text-primary italic">Gateway</span>
           </h1>
           <p className="text-muted-foreground text-sm font-sans font-light tracking-widest uppercase opacity-60">Architectural Identity Verification</p>
        </header>

        <LoginForm />

        <footer className="mt-16 text-center space-y-4">
           <p className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase font-bold">
              No Identity? <Link href="/signup" className="text-primary hover:underline transition-all">Sign Up</Link>
           </p>
           <div className="w-12 h-[1px] bg-white/5 mx-auto" />
           <Link href="/" className="text-[9px] tracking-widest uppercase text-muted-foreground/30 hover:text-muted-foreground transition-all">
              Return to Public Space
           </Link>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
