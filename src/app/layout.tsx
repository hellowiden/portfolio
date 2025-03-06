// src/app/layout.tsx

import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

import AuthProvider from '@/app/components/SessionProvider';
import Footer from '@/app/components/Footer/Footer';
import Header from '@/app/components/Header/Header';

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
        className={`${spaceGrotesk.className} grid grid-rows-[auto_1fr_auto] bg-zinc-50`}
      >
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
