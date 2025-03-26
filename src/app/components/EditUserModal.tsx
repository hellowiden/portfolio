//src/app/components/EditUserModal.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
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
    password: '',
    roles: [] as string[],
    createdAt: '',
    updatedAt: '',
    loading: false,
    error: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: user.password,
        roles: user.roles,
        createdAt: new Date(user.createdAt).toLocaleString(),
        updatedAt: new Date(user.updatedAt).toLocaleString(),
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
        password: formData.password,
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
    <div className="fixed inset-0 bg-[#121212]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#FFFFFF] dark:bg-[#121212] text-[#121212] dark:text-[#FFFFFF] p-6 rounded-lg max-w-lg w-full grid gap-4 border border-[#E3E3E3] dark:border-[#292929] shadow-lg">
        <h2 className="text-xl font-bold">Edit User</h2>

        {formData.error && (
          <p className="text-[#121212] dark:text-[#FFFFFF] bg-[#F1F1F1] dark:bg-[#191919] p-2 rounded">
            {formData.error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#121212] dark:text-[#FFFFFF]">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded border-[#E3E3E3] dark:border-[#191919] bg-[#F1F1F1] dark:bg-[#292929] text-[#121212] dark:text-[#FFFFFF]"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#121212] dark:text-[#FFFFFF]">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded border-[#E3E3E3] dark:border-[#191919] bg-[#F1F1F1] dark:bg-[#292929] text-[#121212] dark:text-[#FFFFFF]"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#121212] dark:text-[#FFFFFF]">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded border-[#E3E3E3] dark:border-[#191919] bg-[#F1F1F1] dark:bg-[#292929] text-[#121212] dark:text-[#FFFFFF]"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#121212] dark:text-[#FFFFFF]">
              Roles (comma-separated)
            </label>
            <input
              type="text"
              name="roles"
              className="w-full p-2 border rounded border-[#E3E3E3] dark:border-[#191919] bg-[#F1F1F1] dark:bg-[#292929] text-[#121212] dark:text-[#FFFFFF]"
              value={formData.roles.join(', ')}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#121212] dark:text-[#FFFFFF]">
              Created At
            </label>
            <input
              type="text"
              name="createdAt"
              className="w-full p-2 border rounded border-[#E3E3E3] dark:border-[#191919] bg-[#F1F1F1] dark:bg-[#292929] text-[#121212] dark:text-[#FFFFFF]"
              value={formData.createdAt}
              disabled
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#121212] dark:text-[#FFFFFF]">
              Updated At
            </label>
            <input
              type="text"
              name="updatedAt"
              className="w-full p-2 border rounded border-[#E3E3E3] dark:border-[#191919] bg-[#F1F1F1] dark:bg-[#292929] text-[#121212] dark:text-[#FFFFFF]"
              value={formData.updatedAt}
              disabled
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-[#121212] bg-[#F1F1F1] hover:bg-[#E3E3E3] border-[#E3E3E3] dark:text-[#FFFFFF] dark:bg-[#292929] dark:hover:bg-[#191919] dark:border-[#191919]"
              onClick={onClose}
              disabled={formData.loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-[#121212] bg-[#F1F1F1] hover:bg-[#E3E3E3] border-[#E3E3E3] dark:text-[#FFFFFF] dark:bg-[#292929] dark:hover:bg-[#191919] dark:border-[#191919]"
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
