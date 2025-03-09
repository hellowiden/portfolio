'use client';

import { useState, useEffect, useCallback } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  roles: string[];
}

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export default function EditUserModal({
  user,
  isOpen,
  onClose,
  onSave,
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roles: [] as string[],
    loading: false,
    error: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        roles: user.roles,
        loading: false,
        error: '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'roles' ? value.split(',').map((r) => r.trim()) : value,
    }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) return;

      setFormData((prev) => ({ ...prev, loading: true, error: '' }));

      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        roles: formData.roles,
      };

      try {
        const response = await fetch(`/api/users/${user._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
          const data = await response.json();
          onSave(data.user);
          onClose();
        } else {
          const errorData = await response.json();
          setFormData((prev) => ({
            ...prev,
            error: errorData.error || 'Failed to update user',
            loading: false,
          }));
        }
      } catch (error) {
        console.error('Error updating user:', error);
        setFormData((prev) => ({
          ...prev,
          error: 'Server error. Please try again.',
          loading: false,
        }));
      }
    },
    [formData, user, onSave, onClose]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed backdrop-blur-sm p-6 inset-0 bg-zinc-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded  w-full grid gap-4 border border-zinc-300 dark:border-zinc-700">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Edit User
        </h2>
        {formData.error && (
          <p className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 p-2 rounded">
            {formData.error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-300">
              Roles (comma-separated)
            </label>
            <input
              type="text"
              name="roles"
              className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              value={formData.roles.join(', ')}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="px-3 py-2 text-sm border border-zinc-700 text-zinc-700 rounded transition hover:bg-zinc-800 hover:text-white dark:text-white dark:border-zinc-600 dark:hover:bg-zinc-600"
              onClick={onClose}
              disabled={formData.loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm border border-zinc-700 bg-zinc-800 text-zinc-300 rounded transition hover:bg-zinc-100 hover:text-black dark:bg-zinc-600 dark:text-white dark:hover:bg-green-500"
              disabled={formData.loading}
            >
              {formData.loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
