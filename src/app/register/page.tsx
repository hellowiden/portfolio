//src/app/register/page.ts

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdBar from '@/app/components/AdBar/AdBar';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const inputClass =
    'w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-full border-x dark:border-light">
      <div className="grid place-items-center bg-zinc-100 dark:bg-zinc-800">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded-lg grid gap-4 border border-zinc-300 dark:border-zinc-700"
        >
          <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">
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
              onChange={() => setAgreed(!agreed)}
              className="accent-green-600 dark:accent-green-500"
            />
            <label
              htmlFor="agree"
              className="text-sm text-zinc-800 dark:text-zinc-300"
            >
              I agree to the{' '}
              <Link
                href="/legal"
                className="text-zinc-600 hover:underline dark:text-green-400 hover:text-green-500 dark:hover:text-green-300"
              >
                legal terms
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-sm bg-zinc-700 hover:bg-zinc-800 dark:bg-green-600 dark:hover:bg-green-500 p-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-sm text-zinc-800 dark:text-zinc-300">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:grid place-items-center bg-gradient-to-br from-zinc-900 to-zinc-500 text-white p-8 dark:from-zinc-800 dark:to-zinc-600">
        <AdBar />
      </div>
    </section>
  );
}
