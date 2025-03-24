// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid place-items-center container mx-auto bg-primary-100 dark:bg-primary-900 border-x border-primary-200 dark:border-secondary-700 min-h-full p-6">
      <div className="grid gap-6 text-center">
        <h1 className="text-4xl font-bold text-secondary-700 dark:text-primary-50">
          404 – Woopsie daisies! You’ve hit a dead end.
        </h1>
        <p className="text-lg text-secondary-300 dark:text-secondary-300">
          Either the file was deleted, or someone forgot to push to{' '}
          <code>main</code>. Happens to the best of us. 😘
        </p>
        <Link
          href="/"
          className="text-base font-medium text-accentPrimary-500 hover:text-accentPrimary-100 dark:text-accentPrimary-100 dark:hover:text-accentPrimary-500 transition"
        >
          Return to safety
        </Link>
      </div>
    </div>
  );
}
