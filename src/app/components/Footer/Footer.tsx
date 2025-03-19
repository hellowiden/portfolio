//src/app/components/Footer/Footer.tsx

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/70 transition">
      <div className="w-full px-6 sm:px-8 py-10 grid gap-6 md:grid-cols-[1fr_auto]">
        <section>
          <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Portfolio Techstack
          </h4>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Built with Next.js, TypeScript, Tailwind CSS, and more. Designed in
            Figma & coded in VS Code. Hosted on Vercel.
          </p>
        </section>
        <nav className="md:text-right">
          <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Docs
          </h4>
          <Link
            href="/legal"
            className="text-sm font-medium text-black/60 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition"
          >
            Legal
          </Link>
        </nav>
      </div>
      <div className="grid gap-4 border-t border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-700 dark:text-zinc-300 sm:px-8 md:grid-cols-[1fr_auto]">
        <p>
          &copy; {currentYear} Marcus Widén — Personal Portfolio. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
