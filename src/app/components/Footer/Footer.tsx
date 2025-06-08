// src/app/components/Footer/Footer.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/app/components/Button/Button';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <footer className="w-full border-t border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-50 dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 transition">
      <div className="w-full px-6 sm:px-8 py-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? 'Hide Footer Info' : 'Show Footer Info'}
        </Button>
      </div>

      {isVisible && (
        <>
          <div className="w-full px-6 sm:px-8 py-10 grid gap-6 md:grid-cols-[1fr_auto]">
            <section>
              <h4 className="text-xl font-semibold text-primary-900 dark:text-secondary-50 mb-4">
                Portfolio Techstack
              </h4>
              <p className="text-sm text-primary-900 dark:text-primary-200">
                Built by Marcus Widén in under 3 weeks using Next.js,
                TypeScript, Tailwind CSS, and Framer Motion · Deployed on Vercel
              </p>
            </section>

            <nav className="md:text-right">
              <h4 className="text-xl font-semibold text-primary-900 dark:text-secondary-50 mb-4">
                Docs
              </h4>
              <Link href="/legal">
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  Legal
                </Button>
              </Link>
            </nav>
          </div>

          <div className="grid gap-4 border-t border-primary-100 dark:border-secondary-700 p-4 text-sm text-primary-900 dark:text-primary-200 sm:px-8 md:grid-cols-[1fr_auto]">
            <p>
              &copy; {currentYear} Marcus Widén — Personal Portfolio. All rights
              reserved.
            </p>
          </div>
        </>
      )}
    </footer>
  );
}
