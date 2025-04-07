// src/app/layout.tsx

import type { Metadata } from 'next';
import '@/app/globals.css';
import { Open_Sans } from 'next/font/google';

import AuthProvider from '@/app/components/SessionProvider';
import { ThemeContextProvider } from '@/context/theme-context';
import Footer from '@/app/components/Footer/Footer';
import Header from '@/app/components/Header/Header';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: 'Marcus Widen | Strategic Brand & Web Consultant',
  description:
    'Marcus Widen helps brands grow with clarity, precision, and timeless strategy. 500+ global projects. $7.5B in revenue impact. Expert in full-stack development, UX/UI, and brand positioning that lasts.',
  keywords: [
    'Brand Strategy Consultant',
    'Strategic Web Design',
    'UX/UI Expert',
    'Full Stack Developer',
    'Digital Transformation',
    'Revenue Growth Strategy',
    'Next.js Developer',
    'High-Performance Branding',
    'Human-Centered Design',
    'MW Portfolio',
    'Marcus Widen',
    'Business-Centric Web Development',
    'Customer Retention Strategy',
    'Clarity in Branding',
    'Market Positioning Expert',
  ],
  authors: [
    { name: 'Marcus Widen', url: 'https://www.linkedin.com/in/marcuswiden/' },
    { name: 'hellowiden', url: 'https://github.com/hellowiden' },
  ],
  creator: 'Marcus Widen',
  metadataBase: new URL('https://hellowiden.vercel.app'),
  openGraph: {
    title: 'Marcus Widen | Strategic Brand & Web Consultant',
    description:
      'Trusted by global leaders to deliver clarity, strategy, and results. $7.5B revenue impact through precise brand, UX, and full-stack development solutions.',
    url: 'https://hellowiden.vercel.app',
    siteName: 'MW Portfolio',
    type: 'website',
    locale: 'en_US',
  },
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
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
