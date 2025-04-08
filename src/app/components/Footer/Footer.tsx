// src/app/components/Footer/Footer.tsx

'use client';

import Link from 'next/link';
import Button from '@/app/components/Button/Button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-50 dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 transition">
      <div className="w-full px-6 sm:px-8 py-10 grid gap-6 md:grid-cols-[1fr_auto]">
        <section>
          <h4 className="text-xl font-semibold text-primary-900 dark:text-secondary-50 mb-4">
            Portfolio Techstack
          </h4>
          <p className="text-sm text-primary-900 dark:text-primary-200">
            Proudly built with Next.js TypeScript, Tailwind CSS and Framer ·
            Made by Marcus Widén · Hosted on Vercel
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
    </footer>
  );
}
