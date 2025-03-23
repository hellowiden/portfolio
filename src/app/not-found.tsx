// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-zinc-950 text-zinc-100 p-6">
      <div className="grid gap-6 text-center">
        <h1 className="text-4xl font-bold text-zinc-50">
          404 – Page Not Found
        </h1>
        <p className="text-lg text-zinc-400">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="text-base font-medium text-green-400 hover:text-green-300 transition"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
