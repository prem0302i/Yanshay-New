import './globals.css';
import type { Metadata } from 'next';
import { Epilogue, Manrope } from 'next/font/google';

const epilogue = Epilogue({ 
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
});

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/AuthContext';
import ConditionalHeader from '@/components/layout/ConditionalHeader';
import ConditionalFooter from '@/components/layout/ConditionalFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Toaster } from '@/components/ui/sonner';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: {
    default: 'YANSHAY',
    template: '%s | YANSHAY',
  },
  description: 'Modern clothing and custom t-shirt printing.',
  metadataBase: new URL('https://yanshay.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={`${manrope.variable} ${epilogue.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ConditionalHeader />
            <main>
              <ErrorBoundary>
              <PageWrapper>{children}</PageWrapper>
            </ErrorBoundary>
            </main>
            <ConditionalFooter />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
