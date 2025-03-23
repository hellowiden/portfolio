// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid place-items-center container mx-auto bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 min-h-full p-6">
      <div className="grid gap-6 bg-zinc-200 dark:bg-zinc-900 text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          404 – You’ve Hit a Dead End
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Either the page vanished into the void, or you’ve discovered a secret
          level. Either way, it’s not here.
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
