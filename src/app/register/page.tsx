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
    'w-full p-2 border rounded border-primary-200 bg-primary-100 text-primary-900 dark:border-secondary-700 dark:bg-secondary-900 dark:text-secondary-200 focus:outline-none focus:ring-0 focus:border-primary-300 dark:focus:border-secondary-500';

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-full border-x border-primary-200 dark:border-secondary-700">
      <div className="grid place-items-center bg-primary-100 dark:bg-secondary-800">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-primary-50 dark:bg-secondary-900 rounded-lg grid gap-4 border border-primary-200 dark:border-secondary-700"
        >
          <h2 className="text-2xl font-bold text-center text-primary-900 dark:text-secondary-50">
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
              className="accent-primary-900 dark:accent-secondary-200 focus:outline-none focus:ring-0"
            />
            <label
              htmlFor="agree"
              className="text-sm text-primary-900 dark:text-secondary-200"
            >
              I agree to the{' '}
              <Link
                href="/legal"
                className="text-primary-700 hover:underline dark:text-secondary-200 dark:hover:text-secondary-50"
              >
                legal terms
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-sm bg-primary-200 hover:bg-primary-100 text-primary-900 dark:bg-secondary-700 dark:hover:bg-secondary-800 dark:text-secondary-50 p-2 rounded transition disabled:opacity-50 focus:outline-none focus:ring-0"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-sm text-primary-900 dark:text-secondary-50">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-sm text-primary-700 hover:text-primary-900 dark:text-secondary-50 dark:hover:text-secondary-200 transition hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:grid place-items-center bg-gradient-to-br from-primary-900 to-primary-200 text-primary-50 p-8 dark:from-secondary-800 dark:to-secondary-600">
        <AdBar />
      </div>
    </section>
  );
}
