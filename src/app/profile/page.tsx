//src/app/profile/page.tsx
'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSession, signOut } from 'next-auth/react';
import AnimatedBackground from '@/app/components/AnimatedBackground/AnimatedBackground';

export default function Profile() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    roles: [] as string[],
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
        roles: Array.isArray(session.user.roles) ? session.user.roles : [],
      });
    }
  }, [session]);

  if (status === 'loading') return <p className="text-center">Loading...</p>;
  if (status !== 'authenticated')
    return <p className="text-center">You need to log in to view this page.</p>;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.newPassword.trim() || undefined,
          roles: session.user.roles.includes('admin')
            ? formData.roles
            : session.user.roles,
        }),
      });

      if (!res.ok) throw new Error('Update failed');
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        'Are you sure you want to permanently delete your account? This action cannot be undone.'
      )
    )
      return;

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete account');

      alert('Your account has been deleted.');
      signOut();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-zinc-50 border border-zinc-300 rounded-lg shadow-md grid gap-6">
      {message && (
        <p className="text-center font-bold text-zinc-700 bg-zinc-200 p-2 rounded">
          {message}
        </p>
      )}
      {error && (
        <p className="text-center font-bold text-red-600 bg-red-100 p-2 rounded">
          {error}
        </p>
      )}
      <h1 className="text-2xl font-bold text-center text-zinc-900">
        Profile Page
      </h1>
      <p className="text-center text-zinc-800">
        Role: {formData.roles.join(', ') || 'User'}
      </p>
      <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-zinc-600 flex items-center justify-center">
        <AnimatedBackground />
        <span className="absolute text-4xl font-bold text-zinc-900 z-10">
          {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
        </span>
      </div>
      <hr className="border-t border-zinc-300" />
      <form onSubmit={handleUpdate} className="grid gap-4">
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
          className="w-full py-3 rounded-md bg-zinc-700 text-white hover:bg-zinc-800 transition"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      <hr className="border-t border-zinc-300" />
      <button
        onClick={handleDeleteAccount}
        className="w-full py-3 rounded-md bg-red-600 text-white hover:bg-red-500 transition"
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
    <label className="text-sm font-semibold text-zinc-800">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      className="w-full p-2 border rounded-md bg-zinc-100 border-zinc-300 text-zinc-900"
    />
  </div>
);
