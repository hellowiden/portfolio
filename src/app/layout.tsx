// src/app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk } from 'next/font/google';

import AuthProvider from './components/SessionProvider';
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
        className={`${spaceGrotesk.className} !scroll-smooth grid min-h-screen grid-rows-[auto_1fr_auto] bg-zinc-50`}
      >
        <AuthProvider>
          <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
            <Header />
            <main className="backdrop-blur-md ">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
