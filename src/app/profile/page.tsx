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
  const [feedback, setFeedback] = useState({ message: '', error: '' });
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
    setFeedback({ message: '', error: '' });
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
      setFeedback({ message: 'Profile updated successfully!', error: '' });
    } catch (err) {
      setFeedback({
        message: '',
        error: err instanceof Error ? err.message : 'Something went wrong',
      });
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
      setFeedback({
        message: '',
        error: err instanceof Error ? err.message : 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900  rounded-lg grid gap-6">
      {feedback.message && <Alert type="success" message={feedback.message} />}
      {feedback.error && <Alert type="error" message={feedback.error} />}

      <ProfileAvatar name={formData.name} />

      <hr className="border-t border-zinc-300 dark:border-zinc-700" />

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
          className="w-full py-3 rounded-md bg-zinc-700 dark:bg-zinc-800 text-white hover:bg-zinc-800 dark:hover:bg-zinc-700 transition"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      <hr className="border-t border-zinc-300 dark:border-zinc-700" />

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
    <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      className="w-full p-2 border rounded-md bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100"
    />
  </div>
);

const Alert = ({
  type,
  message,
}: {
  type: 'success' | 'error';
  message: string;
}) => {
  const color =
    type === 'success'
      ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900'
      : 'text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900';
  return (
    <p className={`text-center font-bold p-2 rounded ${color}`}>{message}</p>
  );
};

const ProfileAvatar = ({ name }: { name: string }) => (
  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-zinc-600 flex items-center justify-center">
    <AnimatedBackground />
    <span className="absolute text-4xl font-bold text-zinc-900 dark:text-zinc-100 z-10">
      {name ? name.charAt(0).toUpperCase() : '?'}
    </span>
  </div>
);
