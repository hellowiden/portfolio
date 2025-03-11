'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/70 transition">
      <div className="w-full px-6 sm:px-8 py-10 grid gap-6 grid-cols-1 md:grid-cols-[1fr_auto] items-end">
        <div>
          <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Portfolio Techstack
          </h4>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Built with Next.js v15, React, TypeScript, Tailwind CSS, Framer
            Motion, MongoDB, and NextAuth etc. Hosted on gitHub pages.
          </p>
        </div>
        <div className="md:text-right">
          <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Docs
          </h4>
          <Link
            href="/legal"
            prefetch={false}
            className="text-sm text-black/60  dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition"
          >
            Legal
          </Link>
        </div>
      </div>
      <div className="grid gap-4 border-t border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-700 dark:text-zinc-300 w-full sm:px-8 grid-cols-1 md:grid-cols-[1fr_auto] items-end">
        <p>&copy; {currentYear} Marcus Widén — Personal Portfolio.</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}
