// src/app/login/page.tsx
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
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Column 1: Login Form */}
      <div className="flex p-6 w-full items-center justify-center bg-zinc-100">
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 bg-zinc-50 shadow-md rounded-lg grid gap-4 border border-zinc-300"
        >
          <h2 className="text-2xl font-bold text-center text-zinc-900">
            Login
          </h2>
          {error && (
            <p className="text-zinc-700 bg-zinc-200 p-2 rounded text-sm">
              {error}
            </p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900"
            required
          />
          <button
            type="submit"
            className="w-full bg-zinc-700 text-white p-2 rounded hover:bg-zinc-800 transition"
          >
            Login
          </button>
          <p className="text-center text-sm text-zinc-800">
            Not an account?{' '}
            <Link href="/register" className="text-zinc-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>

      {/* Column 2: AdBar Component (Hidden on Small Screens) */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-500 text-white p-8">
        <AdBar />
      </div>
    </div>
  );
}
