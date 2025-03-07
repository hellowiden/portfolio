// src/app/components/Footer/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t p-6 grid  gap-10 border-light dark:border-dark bg-white/70 dark:bg-black/70 transition">
      <div className="max-w-screen-xl mx-auto py-10 p-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 text-start">
        <div>
          <h4 className="text-xl font-semibold mb-4">Portfolio Techstack</h4>
          <p className="text-sm text-black dark:text-white">
            Built with React, Next.js, TypeScript, Tailwind CSS, and Framer
            Motion, hosted on Vercel.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Docs</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/legal"
                className="text-sm text-green-700 hover:text-green-500 dark:text-green-300 dark:hover:text-green-400 transition"
              >
                Legal
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-light dark:border-dark mt-10 py-4 text-center text-sm text-black dark:text-white">
        &copy; {new Date().getFullYear()} Marcus Widén — Personal Portfolio. All
        rights reserved.
      </div>
    </footer>
  );
}
