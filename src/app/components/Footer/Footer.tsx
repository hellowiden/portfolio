// src/app/components/Footer/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/70 transition">
      <div className="max-w-screen-xl p-6 mx-auto py-10 px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 text-start">
        <div>
          <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Portfolio Techstack
          </h4>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Built with React, Next.js, TypeScript, Tailwind CSS, and Framer
            Motion, hosted on Vercel.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Docs
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/legal"
                className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition"
              >
                Legal
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-2 border-zinc-200 dark:border-zinc-800 mt-10 py-4 text-center text-sm text-zinc-700 dark:text-zinc-300">
        &copy; {new Date().getFullYear()} Marcus Widén — Personal Portfolio. All
        rights reserved.
      </div>
    </footer>
  );
}
