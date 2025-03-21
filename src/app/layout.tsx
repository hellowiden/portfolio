//src/app/layout.tsx

import type { Metadata } from 'next';
import '@/app/globals.css';
import { Space_Grotesk } from 'next/font/google';

import AuthProvider from '@/app/components/SessionProvider';
import { ThemeContextProvider } from '@/context/theme-context';
import Footer from '@/app/components/Footer/Footer';
import Header from '@/app/components/Header/Header';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'MW Portfolio',
  description:
    'Showcasing projects, skills, and experience in web development.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-zinc-200 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
        <ThemeContextProvider>
          <AuthProvider>
            <Header />
            <div className="backdrop-blur-md">{children}</div>
            <Footer />
          </AuthProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
