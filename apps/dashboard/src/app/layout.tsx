// src/app/layout.tsx

import type { Metadata } from 'next';
import '@/app/globals.css';
import { Open_Sans } from 'next/font/google';

import AuthProvider from '@portfolio/ui/components/SessionProvider';
import { ThemeContextProvider } from '@portfolio/ui/context/theme-context';
import Footer from '@portfolio/ui/components/Footer/Footer';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: 'Dashboard | Marcus Widen Portfolio',
  description: 'Admin dashboard for managing portfolio content.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-primary-100 text-primary-900 dark:bg-secondary-900 dark:text-secondary-50">
        <ThemeContextProvider>
          <AuthProvider>
            {children}
            <Footer />
          </AuthProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
