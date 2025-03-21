//src/app/login/page.tsx

'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdBar from '@/app/components/AdBar/AdBar';

import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { useFormStatus } from '@/hooks/auth/useFormStatus';

export default function Login() {
  const router = useRouter();
  const { formData, handleChange } = useLoginForm();
  const { error, setError, loading, setLoading } = useFormStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        ...formData,
      });

      if (!result || result.error) {
        setError(result?.error || 'Invalid credentials');
      } else {
        router.replace('/');
        router.refresh();
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white';

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full h-full border-x dark:border-light">
      <section className="grid place-items-center p-6 bg-zinc-100 dark:bg-zinc-800">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded grid gap-4 border border-zinc-300 dark:border-zinc-700"
        >
          <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">
            Let&apos;s get started!
          </h2>

          {error && (
            <p className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 p-2 rounded text-sm">
              {error}
            </p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={inputClass}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={inputClass}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="text-sm bg-zinc-700 hover:bg-zinc-800 dark:bg-green-600 dark:hover:bg-green-500 text-white p-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-center text-sm text-zinc-800 dark:text-zinc-300">
            Not an account?{' '}
            <Link
              href="/register"
              className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </section>

      <section className="hidden md:grid place-items-center bg-gradient-to-br from-zinc-900 to-zinc-500 text-white p-8 dark:from-zinc-800 dark:to-zinc-600">
        <AdBar />
      </section>
    </section>
  );
}
