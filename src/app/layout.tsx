// src/app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk } from 'next/font/google';

import AuthProvider from './components/SessionProvider';
import { ThemeContextProvider } from '@/context/theme-context';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
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
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} !scroll-smooth grid min-h-screen grid-rows-[auto_1fr_auto] bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100`}
      >
        <ThemeContextProvider>
          <AuthProvider>
            <Header />
            <main className=" grid p-6 items-start backdrop-blur-md">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
