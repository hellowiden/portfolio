//src/app/profile/page.tsx
'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        newPassword: '',
      });
    }
  }, [session]);

  if (status === 'loading')
    return <p className="grid place-items-center">Loading...</p>;
  if (status !== 'authenticated')
    return (
      <p className="grid place-items-center">
        You need to log in to view this page.
      </p>
    );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      setLoading(true);
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.newPassword
            ? formData.newPassword.trim()
            : undefined,
        }),
      });
      setLoading(false);
      if (!res.ok) throw new Error('Update failed');
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        'Are you sure you want to permanently delete your account? This action cannot be undone.'
      )
    ) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: 'DELETE',
      });
      setLoading(false);
      if (!res.ok) throw new Error('Failed to delete account');
      alert('Your account has been deleted.');
      signOut();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 p-8 border rounded-lg max-w-4xl mx-auto bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700">
      {message && (
        <p className="grid place-items-center font-bold text-zinc-600 dark:text-zinc-400">
          {message}
        </p>
      )}
      {error && (
        <p className="grid place-items-center font-bold text-red-600">
          {error}
        </p>
      )}
      <h1 className="text-2xl font-bold text-center mb-4">Profile Page</h1>
      <form onSubmit={handleUpdate} className="grid gap-4 ">
        <FormField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormField
          label="New Password (optional)"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="grid place-items-center py-3 rounded-md border border-zinc-400 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      <hr className="border-t border-zinc-300 dark:border-zinc-700" />
      <button
        onClick={handleDeleteAccount}
        className="grid place-items-center py-3 rounded-md border border-zinc-400 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Remove Account'}
      </button>
    </div>
  );
}

const FormField = ({
  label,
  type,
  name,
  value,
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="grid gap-2">
    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      className="grid p-2 border rounded-md border-zinc-400 bg-zinc-100 text-zinc-900 focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-300"
    />
  </div>
);
