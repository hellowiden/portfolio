// src/app/components/AddUserModal.tsx

'use client';

import { useState } from 'react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUser: {
    name: string;
    email: string;
    password: string;
    roles: string[];
  }) => Promise<void>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRoles('');
    setError('');
  };

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const roleList = roles.split(',').map((role) => role.trim());
    setLoading(true);
    try {
      await onSave({ name, email, password, roles: roleList });
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to create user.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary-900/50 z-50">
      <div className="bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-secondary-50 p-4 rounded w-full max-w-md shadow-lg border border-primary-200 dark:border-secondary-700">
        <h2 className="text-xl mb-4 font-semibold">Add New User</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-primary-200 dark:border-secondary-800 rounded mb-4 bg-primary-50 dark:bg-secondary-700 text-primary-900 dark:text-secondary-50"
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-primary-200 dark:border-secondary-800 rounded mb-4 bg-primary-50 dark:bg-secondary-700 text-primary-900 dark:text-secondary-50"
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-primary-200 dark:border-secondary-800 rounded mb-4 bg-primary-50 dark:bg-secondary-700 text-primary-900 dark:text-secondary-50"
        />

        <label className="block mb-2">Roles (comma separated)</label>
        <input
          type="text"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          className="w-full p-2 border border-primary-200 dark:border-secondary-800 rounded mb-4 bg-primary-50 dark:bg-secondary-700 text-primary-900 dark:text-secondary-50"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm border rounded bg-primary-100 hover:bg-primary-200 border-primary-200 dark:bg-secondary-700 dark:hover:bg-secondary-800 dark:border-secondary-800 text-primary-900 dark:text-secondary-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="px-4 py-2 text-sm border rounded bg-primary-100 hover:bg-primary-200 border-primary-200 dark:bg-secondary-700 dark:hover:bg-secondary-800 dark:border-secondary-800 text-primary-900 dark:text-secondary-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
