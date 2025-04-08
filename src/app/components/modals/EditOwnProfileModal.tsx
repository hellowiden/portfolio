'use client';

import { useState } from 'react';
import Button from '@/app/components/Button/Button';

interface EditOwnProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { id: string; name: string; email: string };
  onSave: () => void;
}

interface FormData {
  name: string;
  email: string;
  newPassword: string;
  currentPassword: string;
  error: string;
  loading: boolean;
}

export default function EditOwnProfileModal({
  isOpen,
  onClose,
  user,
  onSave,
}: EditOwnProfileModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: user.name,
    email: user.email,
    newPassword: '',
    currentPassword: '',
    error: '',
    loading: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, loading: true, error: '' }));

    const res = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.newPassword || undefined,
        currentPassword: formData.currentPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      onSave();
      onClose();
    } else {
      setFormData((prev) => ({
        ...prev,
        loading: false,
        error: data.error || 'Failed to update profile',
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-secondary-900 rounded-lg p-6 w-full max-w-md shadow-lg border border-primary-200 dark:border-secondary-700">
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

        {formData.error && (
          <p className="text-red-600 dark:text-red-400 mb-2">
            {formData.error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="p-2 border rounded bg-primary-50 dark:bg-secondary-800 dark:border-secondary-700"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            className="p-2 border rounded bg-primary-50 dark:bg-secondary-800 dark:border-secondary-700"
          />
          <input
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            type="password"
            className="p-2 border rounded bg-primary-50 dark:bg-secondary-800 dark:border-secondary-700"
          />
          <input
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Current Password"
            type="password"
            required
            className="p-2 border rounded bg-primary-50 dark:bg-secondary-800 dark:border-secondary-700"
          />

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose} variant="ghost" size="sm">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={formData.loading}
              variant="secondary"
              size="sm"
            >
              {formData.loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
