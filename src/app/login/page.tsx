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
    'w-full p-2 border rounded border-primary-200 bg-primary-100 text-secondary-700 dark:border-secondary-700 dark:bg-primary-900 dark:text-primary-50';

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full h-full border-x border-primary-200 dark:border-secondary-700">
      <section className="grid place-items-center p-6 bg-primary-100 dark:bg-primary-900">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white dark:bg-secondary-900 rounded grid gap-4 border border-primary-200 dark:border-secondary-700"
        >
          <h2 className="text-2xl font-bold text-center text-secondary-700 dark:text-primary-50">
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
            className="text-sm text-primary-50 bg-secondary-700 hover:bg-secondary-900 dark:bg-accentPrimary-500 dark:hover:bg-accentPrimary-100 p-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-secondary-700 dark:text-secondary-300">
            Not an account?{' '}
            <Link
              href="/register"
              className="text-sm text-accentPrimary-500 hover:text-accentPrimary-100 dark:text-accentPrimary-100 dark:hover:text-accentPrimary-500 transition hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </section>

      <section className="hidden md:grid place-items-center bg-gradient-to-br from-secondary-900 to-secondary-300 text-primary-50 p-8 dark:from-secondary-700 dark:to-secondary-300">
        <AdBar />
      </section>
    </section>
  );
}
