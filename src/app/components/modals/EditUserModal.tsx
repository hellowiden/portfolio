//src/app/components/EditUserModal.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import Button from '@/app/components/Button/Button';

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
    <div className="fixed inset-0 bg-primary-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-secondary-50 p-6 rounded-lg max-w-lg w-full grid gap-4 border border-primary-200 dark:border-secondary-700 shadow-lg">
        <h2 className="text-xl font-bold">Edit User</h2>

        {formData.error && (
          <p className="text-primary-900 dark:text-secondary-50 bg-primary-100 dark:bg-secondary-800 p-2 rounded">
            {formData.error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          {['name', 'email', 'password', 'roles', 'createdAt', 'updatedAt'].map(
            (field) => (
              <div key={field} className="grid gap-2">
                <label className="text-sm font-semibold text-primary-900 dark:text-secondary-50">
                  {field === 'roles'
                    ? 'Roles (comma-separated)'
                    : field === 'createdAt'
                    ? 'Created At'
                    : field === 'updatedAt'
                    ? 'Updated At'
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={
                    field === 'email'
                      ? 'email'
                      : field === 'password'
                      ? 'password'
                      : 'text'
                  }
                  name={field}
                  className="w-full p-2 border rounded border-primary-200 dark:border-secondary-800 bg-primary-100 dark:bg-secondary-700 text-primary-900 dark:text-secondary-50"
                  value={
                    field === 'roles'
                      ? formData.roles.join(', ')
                      : (formData[field as keyof typeof formData] as string)
                  }
                  onChange={handleChange}
                  disabled={field === 'createdAt' || field === 'updatedAt'}
                  required={['name', 'email', 'password', 'roles'].includes(
                    field
                  )}
                />
              </div>
            )
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={onClose}
              disabled={formData.loading}
              variant="ghost"
              size="sm"
            >
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
