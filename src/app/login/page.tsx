'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdBar from '../components/AdBar/AdBar';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        redirect: false,
        ...formData,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/');
      }
    } catch {
      setError('Something went wrong');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
      {/* Column 1: Login Form */}
      <div className="flex w-full items-center p-6 justify-center bg-zinc-100 dark:bg-zinc-900">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white dark:bg-zinc-800 shadow-md rounded-lg grid gap-4 border border-zinc-300 dark:border-zinc-700"
        >
          <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">
            Login
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
            className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            required
          />
          <button
            type="submit"
            className="text-sm bg-zinc-700 text-white p-2 rounded hover:bg-zinc-800 transition dark:bg-green-600 dark:hover:bg-green-500"
          >
            Login
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
      </div>

      {/* Column 2: AdBar Component (Hidden on Small Screens) */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-500 text-white p-8 dark:from-zinc-800 dark:to-zinc-600">
        <AdBar />
      </div>
    </div>
  );
}
