//src/app/register/page.ts

'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdBar from '@/app/components/AdBar/AdBar';

import { useRegisterForm } from '@/hooks/auth/useRegisterForm';
import { useAgreement } from '@/hooks/auth/useAgreement';
import { useFormStatus } from '@/hooks/auth/useFormStatus';

export default function Register() {
  const router = useRouter();
  const { formData, handleChange } = useRegisterForm();
  const { agreed, toggleAgreement } = useAgreement();
  const { error, setError, loading, setLoading } = useFormStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      setError('You must agree to the legal terms.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || 'Registration failed');
      }

      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full p-2 border rounded border-primary-200 bg-primary-100 text-secondary-700 dark:border-secondary-700 dark:bg-primary-900 dark:text-primary-50';

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-full border-x border-primary-200 dark:border-secondary-700">
      <div className="grid place-items-center bg-primary-100 dark:bg-primary-900">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white dark:bg-secondary-900 rounded-lg grid gap-4 border border-primary-200 dark:border-secondary-700"
        >
          <h2 className="text-2xl font-bold text-center text-secondary-700 dark:text-primary-50">
            It all starts here!
          </h2>

          {error && (
            <p className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 p-2 rounded text-sm">
              {error}
            </p>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className={inputClass}
            required
          />
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

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={toggleAgreement}
              className="accent-accentPrimary-500 dark:accent-accentPrimary-100"
            />
            <label
              htmlFor="agree"
              className="text-sm text-secondary-700 dark:text-secondary-300"
            >
              I agree to the{' '}
              <Link
                href="/legal"
                className="text-secondary-300 hover:underline dark:text-accentPrimary-100 hover:text-secondary-700 dark:hover:text-accentPrimary-500"
              >
                legal terms
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-sm text-primary-50 bg-secondary-700 hover:bg-secondary-900 dark:bg-accentPrimary-500 dark:hover:bg-accentPrimary-100 p-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-sm text-secondary-700 dark:text-secondary-300">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-sm text-accentPrimary-500 hover:text-accentPrimary-100 dark:text-accentPrimary-100 dark:hover:text-accentPrimary-500 transition hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:grid place-items-center bg-gradient-to-br from-secondary-900 to-secondary-300 text-primary-50 p-8 dark:from-secondary-700 dark:to-secondary-300">
        <AdBar />
      </div>
    </section>
  );
}
