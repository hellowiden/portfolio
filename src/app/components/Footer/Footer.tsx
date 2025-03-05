// src/app/components/Footer/Footer.tsx
function Footer() {
  return (
    <footer className="grid grid-cols-2 items-center px-4 py-2 border-t border-zinc-300 transition backdrop-blur-md bg-zinc-100 dark:bg-zinc-900">
      {/* Footer Text */}
      <div className="text-sm font-medium tracking-tight text-zinc-700 dark:text-zinc-300">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>

      {/* Footer Navigation */}
      <nav className="grid grid-flow-col auto-cols-max gap-4 justify-end">
        <a
          href="/privacy"
          className="text-sm text-zinc-700 hover:text-zinc-500 dark:text-zinc-300 dark:hover:text-zinc-400 transition"
        >
          Privacy Policy
        </a>
        <a
          href="/terms"
          className="text-sm text-zinc-700 hover:text-zinc-500 dark:text-zinc-300 dark:hover:text-zinc-400 transition"
        >
          Terms of Service
        </a>
        <a
          href="/contact"
          className="text-sm text-zinc-700 hover:text-zinc-500 dark:text-zinc-300 dark:hover:text-zinc-400 transition"
        >
          Contact
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
