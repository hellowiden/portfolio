'use client';

import { useState, useEffect, ChangeEvent, FormEvent, memo } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    roles: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
        roles: Array.isArray(session.user.roles) ? session.user.roles : [],
      }));
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

  const handleConfirmDelete = () => {
    if (confirm('Are you sure you want to permanently delete your account?')) {
      handleDeleteAccount();
    }
  };

  const handleDeleteAccount = async () => {
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
    <div className="grid gap-4 p-6">
      {/* Row 1, Column 1 */}
      <div className="flex items-center gap-3">
        <ProfileAvatar name={formData.name} />
        <span className="text-zinc-800 dark:text-zinc-200">
          {formData.name}
        </span>
      </div>

      <hr className="border-zinc-300 dark:border-zinc-700" />

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

        {/* Display User Role */}
        <FormInput
          label="Role"
          type="text"
          name="role"
          value={formData.roles.join(', ')}
          onChange={() => {}} // Prevents editing unless admin
          disabled={!session?.user.roles.includes('admin')}
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
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition grid"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      <hr className="border-zinc-300 dark:border-zinc-700" />

      <button
        onClick={handleConfirmDelete}
        disabled={loading}
        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition grid"
      >
        {loading ? 'Processing...' : 'Remove Account'}
      </button>
    </div>
  );
}

const ProfileAvatar = memo(({ name }: { name: string }) => (
  <div className="w-12 h-12 grid place-items-center bg-zinc-300 dark:bg-zinc-700 text-lg font-semibold rounded-xl">
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
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
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
      aria-label={label}
      className={`p-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    />
  </div>
);
