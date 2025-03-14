//src/app/profile/page.tsx

'use client';

import { useState, useEffect, ChangeEvent, FormEvent, memo } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => ({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    roles: Array.isArray(session?.user?.roles) ? session.user.roles : [],
    newPassword: '',
  }));

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        roles: Array.isArray(session.user.roles) ? session.user.roles : [],
        newPassword: '',
      });
    }
  }, [session]);

  if (status === 'loading') return <p className="text-zinc-500">Loading...</p>;
  if (status !== 'authenticated')
    return (
      <p className="text-red-500">You need to log in to view this page.</p>
    );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
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
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to permanently delete your account?'))
      return;
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete account');
      signOut();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-6 w-full mx-auto bg-zinc-50 dark:bg-zinc-800 rounded-lg border dark:border-light">
      <div className="grid grid-cols-[min-content_1fr] gap-4 items-center">
        <ProfileAvatar name={formData.name} />
        <span className="text-zinc-800 dark:text-zinc-200">
          {formData.name}
        </span>
      </div>

      <div className="border-t border-zinc-300 dark:border-zinc-600" />

      <form onSubmit={handleUpdate} className="grid gap-4">
        <FormInput
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          label="Role"
          type="text"
          name="role"
          value={formData.roles.join(', ')}
          disabled
          readOnly
        />
        <FormInput
          label="New Password (optional)"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 dark:bg-green-600 text-white py-2 rounded-md border dark:border-light hover:bg-green-600 dark:hover:bg-green-700 transition"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      <div className="border dark:border-light dark:border-zinc-600" />

      <button
        onClick={handleDeleteAccount}
        disabled={loading}
        className="w-full bg-red-500 dark:bg-red-600 text-white py-2 rounded-md border dark:border-light dark:border-red-500 hover:bg-red-600 dark:hover:bg-red-700 transition"
      >
        {loading ? 'Processing...' : 'Remove Account'}
      </button>
    </div>
  );
}

const ProfileAvatar = memo(({ name }: { name: string }) => (
  <div className="w-12 h-12 grid place-items-center bg-zinc-300 dark:bg-zinc-600 text-lg font-semibold rounded-md">
    <span className="text-zinc-800 dark:text-zinc-200">
      {name ? name.charAt(0).toUpperCase() : '?'}
    </span>
  </div>
));
ProfileAvatar.displayName = 'ProfileAvatar';

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  disabled = false,
  readOnly = false,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
}) => (
  <div className="grid gap-2">
    <label
      htmlFor={name}
      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
      aria-label={label}
      className={`p-2 border dark:border-light dark:border-zinc-600 rounded-md focus:ring-green-500 dark:focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    />
  </div>
);
