//src/app/profile/page.tsx
'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
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
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white p-8 rounded-lg grid gap-4">
      <div className="grid grid-cols-[min-content_1fr] items-center gap-2">
        <ProfileAvatar name={formData.name} />
        <h2 className="grid grid-cols-[min-content_1fr] text-2xl font-bold items-center gap-2">
          <span>{formData.name}</span>
          <FaCheckCircle className="text-green-500" />
        </h2>
      </div>

      <nav className="flex justify-start border-b border-gray-300 dark:border-gray-700">
        {['Information'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab
                ? 'border-b-2 border-black dark:border-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <form onSubmit={handleUpdate} className="grid gap-4 ">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            New Password (optional)
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md bg-green-600 text-white hover:bg-green-500 transition"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      <button
        onClick={handleDeleteAccount}
        className="w-full py-3 mt-4 rounded-md bg-red-600 text-white hover:bg-red-500 transition"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Remove Account'}
      </button>
    </div>
  );
}

const ProfileAvatar = ({ name }: { name: string }) => (
  <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 flex items-center justify-center">
    <AnimatedBackground />
    <span className="absolute text-3xl font-bold text-black dark:text-white z-10">
      {name ? name.charAt(0).toUpperCase() : '?'}
    </span>
  </div>
);
