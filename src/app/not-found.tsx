// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid place-items-center container mx-auto border-x border-primary-200 dark:border-secondary-700 min-h-full p-6 bg-primary-50 text-primary-900 dark:bg-secondary-900 dark:text-secondary-50">
      <div className="grid gap-6 text-center">
        <h1 className="text-4xl font-bold text-primary-900 dark:text-secondary-50">
          404 – Woopsie daisies! You’ve hit a dead end.
        </h1>
        <p className="text-lg text-primary-200 dark:text-secondary-200">
          Either the file was deleted, or someone forgot to push to{' '}
          <code>main</code>. Happens to the best of us. 😘
        </p>
        <Link
          href="/"
          className="text-base font-medium text-primary-900 hover:text-primary-200 dark:text-secondary-50 dark:hover:text-secondary-200 transition"
        >
          Return to safety
        </Link>
      </div>
    </div>
  );
}
