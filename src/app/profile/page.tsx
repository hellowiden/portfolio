'use client';

import { useState, useEffect, ChangeEvent, FormEvent, memo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import AnimatedBackground from '@/app/components/AnimatedBackground/AnimatedBackground';
import { FaCheckCircle } from 'react-icons/fa';

export default function Profile() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    roles: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');

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

  if (status === 'loading') return <p className="text-center">Loading...</p>;
  if (status !== 'authenticated')
    return <p className="text-center">You need to log in to view this page.</p>;

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
    <div className=" p-8 rounded grid gap-4">
      <div className="grid grid-cols-[min-content_1fr] items-center gap-2">
        <ProfileAvatar name={formData.name} />
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span>{formData.name}</span>
          <FaCheckCircle className="text-green-500" />
        </h2>
      </div>

      <nav className="border-b border-gray-300 dark:border-gray-700">
        {['Information'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab
                ? 'border-b-2 border-black dark:border-white font-semibold'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

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
          label="New Password (optional)"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full py-3 rounded bg-green-600 text-white hover:bg-green-500 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      <hr />

      <button
        onClick={handleConfirmDelete}
        className="w-full py-3 rounded bg-red-600 text-white hover:bg-red-500 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Remove Account'}
      </button>
    </div>
  );
}

// Optimized Profile Avatar (Memoized for Performance)
const ProfileAvatar = memo(({ name }: { name: string }) => (
  <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 flex items-center justify-center">
    <AnimatedBackground />
    <span className="absolute text-3xl font-bold text-black dark:text-white z-10">
      {name ? name.charAt(0).toUpperCase() : '?'}
    </span>
  </div>
));
ProfileAvatar.displayName = 'ProfileAvatar';

// Reusable Form Input Component
const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="grid gap-2">
    <label
      htmlFor={name}
      className="text-sm font-semibold text-gray-600 dark:text-gray-300"
    >
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      aria-label={label}
      className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
    />
  </div>
);
