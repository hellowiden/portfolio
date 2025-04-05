//src/app/dashboard/users/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import EditUserModal from '@/app/components/EditUserModal';
import AddUserModal from '@/app/components/AddUserModal';
import SearchInput from '@/app/components/SearchInput/SearchInput';
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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    user: User | null;
  }>({ isOpen: false, user: null });

  const [addUserModalState, setAddUserModalState] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const { users } = await response.json();
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleEdit = (user: User) => setModalState({ isOpen: true, user });
  const handleCloseModal = () => setModalState({ isOpen: false, user: null });

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
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
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add user');
      }

      await fetchUsers();
      setAddUserModalState(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="space-y-6 p-4 text-primary-900 dark:text-secondary-50">
      <h1 className="text-2xl font-bold">Manage Users</h1>

      <div className="flex justify-between">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          data={users}
          onFilter={setFilteredUsers}
        />
        <Button
          onClick={() => setAddUserModalState(true)}
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
              <th className="border border-primary-200 dark:border-secondary-700 p-3">
                Name
              </th>
              <th className="border border-primary-200 dark:border-secondary-700 p-3">
                Email
              </th>
              <th className="border border-primary-200 dark:border-secondary-700 p-3">
                Roles
              </th>
              <th className="border border-primary-200 dark:border-secondary-700 p-3">
                Password
              </th>
              <th className="border border-primary-200 dark:border-secondary-700 p-3">
                Created At
              </th>
              <th className="border border-primary-200 dark:border-secondary-700 p-3">
                Updated At
              </th>
              <th className="border border-primary-200 dark:border-secondary-700 p-3 text-center">
                Actions
              </th>
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
                  ********
                </td>
                <td className="border border-primary-200 dark:border-secondary-700 p-3">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="border border-primary-200 dark:border-secondary-700 p-3">
                  {new Date(user.updatedAt).toLocaleString()}
                </td>
                <td className="grid gap-2 border border-primary-200 dark:border-secondary-700 p-3 text-center">
                  <Button
                    onClick={() => handleEdit(user)}
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

      {modalState.isOpen && modalState.user && (
        <EditUserModal
          user={modalState.user}
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onSave={fetchUsers}
        />
      )}

      {addUserModalState && (
        <AddUserModal
          isOpen={addUserModalState}
          onClose={() => setAddUserModalState(false)}
          onSave={handleAddUser}
        />
      )}
    </div>
  );
}
