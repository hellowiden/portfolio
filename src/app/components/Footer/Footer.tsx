'use client';

import Link from 'next/link';
import { useMemo } from 'react';

export default function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/70 transition">
      <div className="w-full px-6 sm:px-8 py-10 grid gap-6 grid-cols-1 md:grid-cols-[1fr_auto] items-end">
        <div>
          <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Portfolio Techstack
          </h4>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Built with React, Next.js, TypeScript, Tailwind CSS, and Framer
            Motion, hosted on Vercel.
          </p>
        </div>
        <div className="md:text-right">
          <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Docs
          </h4>
          <Link
            href="/legal"
            prefetch={false}
            className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition"
          >
            Legal
          </Link>
        </div>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800 mt-10 p-4 text-center text-sm text-zinc-700 dark:text-zinc-300">
        &copy; {currentYear} Marcus Widén — Personal Portfolio. All rights
        reserved.
      </div>
    </footer>
  );
}
