//src/app/components/Footer/Footer.tsx

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-light-border dark:border-dark-border bg-light-zinc-100/80 dark:bg-dark-zinc-900/70 transition">
      <div className="w-full px-6 sm:px-8 py-10 grid gap-6 md:grid-cols-[1fr_auto]">
        <section>
          <h4 className="text-xl font-semibold text-dark-zinc-900 dark:text-light-zinc-100 mb-4">
            Portfolio Techstack
          </h4>
          <p className="text-sm text-dark-zinc-700 dark:text-light-zinc-300">
            Built with Next.js, TypeScript, Tailwind CSS, and more. Designed in
            Figma & coded in VS Code. Hosted on Vercel.
          </p>
        </section>
        <nav className="md:text-right">
          <h4 className="text-xl font-semibold text-dark-zinc-900 dark:text-light-zinc-100 mb-4">
            Docs
          </h4>
          <Link
            href="/legal"
            className="text-sm font-medium text-dark-zinc-900/60 dark:text-dark-green-400 hover:text-dark-green-500 dark:hover:text-dark-green-300 transition"
          >
            Legal
          </Link>
        </nav>
      </div>
      <div className="grid gap-4 border-t border-light-border dark:border-dark-border p-4 text-sm text-dark-zinc-700 dark:text-light-zinc-300 sm:px-8 md:grid-cols-[1fr_auto]">
        <p>
          &copy; {currentYear} Marcus Widén — Personal Portfolio. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
