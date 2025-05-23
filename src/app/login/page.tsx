// src/app/login/page.tsx

'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdBar from '@/app/components/AdBar/AdBar';

import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { useFormStatus } from '@/hooks/auth/useFormStatus';
import Button from '@/app/components/Button/Button';

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
        callbackUrl: '/',
        ...formData,
      });

      if (!result || result.error) {
        setError(result?.error || 'Invalid credentials');
      } else {
        router.replace(result.url || '/');
        router.refresh();
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full p-2 border rounded border-primary-200 bg-primary-100 text-primary-900 dark:border-secondary-700 dark:bg-secondary-900 dark:text-secondary-50 focus:outline-none focus:ring-0 focus:border-primary-300 dark:focus:border-secondary-500';

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full h-full border-x border-primary-200 dark:border-secondary-700">
      <section className="grid place-items-center bg-primary-100 dark:bg-secondary-800">
        <form
          onSubmit={handleSubmit}
          className="grid w-full max-w-md bg-primary-50 dark:bg-secondary-900 rounded border border-primary-200 dark:border-secondary-700"
        >
          <div className="grid gap-4 p-6">
            <h2 className="text-2xl font-bold text-center text-primary-900 dark:text-secondary-50 m-0">
              Let&apos;s get started!
            </h2>

            {error && (
              <p className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 p-2 rounded text-sm m-0">
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

            <Button
              type="submit"
              disabled={loading}
              variant="secondary"
              size="sm"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <p className="text-center text-sm text-primary-900 dark:text-secondary-50 m-0">
              Not an account?{' '}
              <Link
                href="/register"
                className="text-sm text-primary-700 hover:text-primary-900 dark:text-secondary-50 dark:hover:text-secondary-200 transition hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </section>

      <section className="hidden md:grid place-items-center bg-gradient-to-br from-primary-100 to-primary-200 text-primary-900 p-8 dark:from-secondary-800 dark:to-secondary-600">
        <AdBar />
      </section>
    </section>
  );
}
