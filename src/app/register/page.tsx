// src/app/registrer/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdBar from '../components/AdBar/AdBar';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      setError('You must agree to the legal terms.');
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.error || 'Registration failed');

      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
      {/* Column 1: Registration Form */}
      <div className="flex items-center justify-center bg-zinc-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-zinc-50 shadow-md rounded-lg grid gap-4 border border-zinc-300"
        >
          <h2 className="text-2xl font-bold text-center text-zinc-900">
            Register
          </h2>
          {error && (
            <p className="text-zinc-700 bg-zinc-200 p-2 rounded text-sm">
              {error}
            </p>
          )}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900"
            required
          />
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
          <div className="grid gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="mr-2"
              />
              <label htmlFor="agree" className="text-sm text-zinc-800">
                I agree to the{' '}
                <Link href="/legal" className="text-zinc-600 hover:underline">
                  legal terms
                </Link>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-sm bg-zinc-700 text-white p-2 rounded hover:bg-zinc-800 transition"
          >
            Register
          </button>
          <p className="text-center text-sm text-zinc-800">
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
      {/* Column 2: Gradient Background with Personal Branding Focus (Hidden on Small Screens) */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-500 text-white p-8">
        <AdBar />
      </div>
    </div>
  );
}
