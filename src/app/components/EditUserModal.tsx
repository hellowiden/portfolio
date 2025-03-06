'use client';

import { useState, useEffect } from 'react';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRoles(user.roles);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    const updatedUser = { ...user, name, email, roles };

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
        setError(errorData.error || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-50 p-6 rounded shadow-md w-96 grid gap-4 border border-zinc-300">
        <h2 className="text-xl font-bold text-zinc-900">Edit User</h2>
        {error && (
          <p className="text-zinc-700 bg-zinc-200 p-2 rounded">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-zinc-800">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-zinc-800">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-zinc-800">
              Roles (comma-separated)
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded border-zinc-300 bg-zinc-100 text-zinc-900"
              value={roles.join(', ')}
              onChange={(e) =>
                setRoles(e.target.value.split(',').map((role) => role.trim()))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-zinc-500 text-white rounded"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-700 text-white rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
