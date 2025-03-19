//src/app/components/Footer/Footer.tsx

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-light-dark-border dark:border-dark-dark-border bg-light-light-background dark:bg-dark-dark-background transition">
      <div className="w-full px-6 sm:px-8 py-10 grid gap-6 md:grid-cols-[1fr_auto]">
        <section>
          <h4 className="text-xl font-semibold text-light-light-foreground dark:text-dark-light-foreground mb-4">
            Portfolio Techstack
          </h4>
          <p className="text-sm text-light-dark-border dark:text-dark-dark-border">
            Built with Next.js, TypeScript, Tailwind CSS, and more. Designed in
            Figma & coded in VS Code. Hosted on Vercel.
          </p>
        </section>
        <nav className="md:text-right">
          <h4 className="text-xl font-semibold text-light-light-foreground dark:text-dark-light-foreground mb-4">
            Docs
          </h4>
          <Link
            href="/legal"
            className="text-sm font-medium text-light-dark-border dark:text-accent-greenDark hover:text-accent-greenLight dark:hover:text-accent-greenLight transition"
          >
            Legal
          </Link>
        </nav>
      </div>
      <div className="grid gap-4 border-t border-light-dark-border dark:border-dark-dark-border p-4 text-sm text-light-dark-border dark:text-dark-dark-border sm:px-8 md:grid-cols-[1fr_auto]">
        <p>
          &copy; {currentYear} Marcus Widén — Personal Portfolio. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
