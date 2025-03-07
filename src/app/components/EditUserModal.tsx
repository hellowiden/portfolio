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
    <div className="fixed inset-0 bg-zinc-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-50 p-6 rounded shadow-md w-96 grid gap-4 border border-zinc-300">
        <h2 className="text-xl font-bold text-zinc-900">Edit User</h2>
        {formData.error && (
          <p className="text-red-600 bg-red-100 p-2 rounded">
            {formData.error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-zinc-800">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-zinc-800">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-zinc-800">
              Roles (comma-separated)
            </label>
            <input
              type="text"
              name="roles"
              className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900"
              value={formData.roles.join(', ')}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-zinc-500 text-white rounded"
              onClick={onClose}
              disabled={formData.loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-700 text-white rounded"
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
