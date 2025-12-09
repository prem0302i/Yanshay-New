import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="container mx-auto py-16 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">Login</h1>
        <LoginForm />
        <p className="text-center mt-4">
          Don't have an account? <Link href="/signup" className="text-primary">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

