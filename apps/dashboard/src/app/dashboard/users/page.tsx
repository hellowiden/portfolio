// src/app/dashboard/users/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import EditUserModal from '@portfolio/ui/components/modals/EditUserModal';
import AddUserModal from '@portfolio/ui/components/modals/AddUserModal';
import SearchInput from '@portfolio/ui/components/SearchInput/SearchInput';
import Button from '@portfolio/ui/components/Button/Button';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [editModalUser, setEditModalUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const { users } = await res.json();
      setUsers(users);
      setFilteredUsers(users);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      const updated = users.filter((user) => user._id !== userId);
      setUsers(updated);
      setFilteredUsers(updated);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddUser = async (newUser: {
    name: string;
    email: string;
    password: string;
    roles: string[];
  }) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add user');
      }
      await fetchUsers();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleFilter = (filtered: User[]) => setFilteredUsers(filtered);

  return (
    <div className="space-y-6 p-4 text-primary-900 dark:text-secondary-50">
      <h1 className="text-2xl font-bold">Manage Users</h1>

      <div className="flex justify-between items-center">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          data={users}
          onFilter={handleFilter}
        />
        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="secondary"
          size="sm"
        >
          Add User
        </Button>
      </div>

      <div className="overflow-x-auto border border-primary-200 dark:border-secondary-700 rounded">
        <table className="w-full border-collapse">
          <thead className="bg-primary-200 text-primary-900 dark:bg-secondary-700 dark:text-secondary-50">
            <tr className="text-left">
              {[
                'Name',
                'Email',
                'Roles',
                'Created At',
                'Updated At',
                'Status',
                'Actions',
              ].map((header) => (
                <th
                  key={header}
                  className="border border-primary-200 dark:border-secondary-700 p-3"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="dark:bg-secondary-800">
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0
                    ? 'bg-primary-50 dark:bg-secondary-900'
                    : 'bg-primary-100 dark:bg-secondary-800'
                } hover:bg-primary-200 dark:hover:bg-secondary-700`}
              >
                <td className="border border-primary-200 dark:border-secondary-700 p-3">
                  {user.name}
                </td>
                <td className="border border-primary-200 dark:border-secondary-700 p-3">
                  {user.email}
                </td>
                <td className="border border-primary-200 dark:border-secondary-700 p-3">
                  {user.roles.join(', ')}
                </td>
                <td className="border border-primary-200 dark:border-secondary-700 p-3">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="border border-primary-200 dark:border-secondary-700 p-3">
                  {new Date(user.updatedAt).toLocaleString()}
                </td>
                <td className="border border-primary-200 dark:border-secondary-700 p-3">
                  <span
                    className={
                      user.isOnline ? 'text-green-600' : 'text-gray-500'
                    }
                  >
                    {user.isOnline ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td className="grid gap-2 border border-primary-200 dark:border-secondary-700 p-3 text-center">
                  <Button
                    onClick={() => setEditModalUser(user)}
                    variant="ghost"
                    size="sm"
                    className="text-primary-900 hover:text-primary-700 dark:text-secondary-50 dark:hover:text-secondary-200"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(user._id)}
                    variant="danger"
                    size="sm"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editModalUser && (
        <EditUserModal
          user={editModalUser}
          isOpen={!!editModalUser}
          onClose={() => setEditModalUser(null)}
          onSave={fetchUsers}
        />
      )}

      {isAddModalOpen && (
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddUser}
        />
      )}
    </div>
  );
}
