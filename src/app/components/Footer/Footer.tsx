//src/app/components/Footer/Footer.tsx

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#E3E3E3] dark:border-[#292929] backdrop-blur-md bg-[#FFFFFF]/70 dark:bg-[#191919]/70 text-[#121212] dark:text-[#FFFFFF] transition">
      <div className="w-full px-6 sm:px-8 py-10 grid gap-6 md:grid-cols-[1fr_auto]">
        <section>
          <h4 className="text-xl font-semibold text-[#121212] dark:text-[#FFFFFF] mb-4">
            Portfolio Techstack
          </h4>
          <p className="text-sm text-[#121212] dark:text-[#E3E3E3]">
            Proudly built with Next.js TypeScript, Tailwind CSS and Framer ·
            Made by Marcus Widén · Hosted on Vercel
          </p>
        </section>
        <nav className="md:text-right">
          <h4 className="text-xl font-semibold text-[#121212] dark:text-[#FFFFFF] mb-4">
            Docs
          </h4>
          <Link
            href="/legal"
            className="text-sm font-medium text-[#121212]/60 dark:text-[#FFFFFF] hover:text-[#121212] dark:hover:text-[#E3E3E3] transition"
          >
            Legal
          </Link>
        </nav>
      </div>
      <div className="grid gap-4 border-t border-[#F1F1F1] dark:border-[#292929] p-4 text-sm text-[#121212] dark:text-[#E3E3E3] sm:px-8 md:grid-cols-[1fr_auto]">
        <p>
          &copy; {currentYear} Marcus Widén — Personal Portfolio. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
