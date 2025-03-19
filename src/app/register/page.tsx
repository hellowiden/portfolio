//src/app/register/page.ts

'use client';

import { useState, useCallback } from 'react';
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
    },
    [formData, agreed, router]
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-full border-x dark:border-light.border">
      <div className="grid place-items-center bg-light-zinc-100 dark:bg-dark-zinc-800">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white dark:bg-dark-zinc-900 rounded-lg grid gap-4 border border-light-border dark:border-dark-border"
        >
          <h2 className="text-2xl font-bold text-center text-dark-zinc-900 dark:text-light-zinc-100">
            It all starts here!
          </h2>

          {error && <ErrorMessage message={error} />}
          <InputField
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="accent-light-green-500 dark:accent-dark-green-600"
            />
            <label
              htmlFor="agree"
              className="text-sm text-dark-zinc-800 dark:text-light-zinc-300"
            >
              I agree to the{' '}
              <Link
                href="/legal"
                className="text-light-green-500 hover:underline dark:text-dark-green-600 hover:text-dark-green-500"
              >
                legal terms
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-sm bg-dark-zinc-700 text-white p-2 rounded hover:bg-dark-zinc-800 transition dark:bg-dark-green-600 dark:hover:bg-dark-green-500 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-sm text-dark-zinc-800 dark:text-light-zinc-300">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-light-green-500 hover:text-light-green-400 dark:text-dark-green-600 dark:hover:text-dark-green-500 transition hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:grid place-items-center bg-gradient-to-br from-dark-zinc-900 to-dark-zinc-700 text-white p-8 dark:from-dark-zinc-800 dark:to-dark-zinc-600">
        <AdBar />
      </div>
    </section>
  );
}

const InputField = ({
  type,
  name,
  placeholder,
  onChange,
}: {
  type: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-2 border rounded border-light-zinc-300 bg-light-zinc-100 text-dark-zinc-900 dark:border-dark-zinc-700 dark:bg-dark-zinc-800 dark:text-white"
      required
    />
  );
};

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 p-2 rounded text-sm">
      {message}
    </p>
  );
};
