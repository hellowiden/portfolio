// src/app/components/AddUserModal.tsx

import { useState } from 'react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUser: {
    name: string;
    email: string;
    password: string;
    roles: string[];
  }) => void;
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

  const handleSubmit = () => {
    const roleList = roles.split(',').map((role) => role.trim());
    onSave({ name, email, password, roles: roleList });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl mb-4">Add New User</h2>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Roles (comma separated)</label>
        <input
          type="text"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="grid items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-light dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-dark"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="grid items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-light dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-dark"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
