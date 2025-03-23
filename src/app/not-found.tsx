// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid place-items-center min-h-full p-6">
      <div className="grid gap-6 text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          404 – Page Not Found
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="text-base font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
