//src/app/dashboard/users/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EditUserModal from '@/app/components/EditUserModal';
import AddUserModal from '@/app/components/AddUserModal';
import SearchInput from '@/app/components/SearchInput/SearchInput';

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
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.roles.includes('admin');

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    user: User | null;
  }>({
    isOpen: false,
    user: null,
  });
  const [addUserModalState, setAddUserModalState] = useState(false);

  useEffect(() => {
    if (
      status === 'unauthenticated' ||
      (status === 'authenticated' && !isAdmin)
    ) {
      router.replace(status === 'unauthenticated' ? '/login' : '/');
    }
  }, [status, isAdmin, router]);

  const fetchUsers = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const { users } = await response.json();
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  }, [isAdmin]);

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

  if (status === 'loading') return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold dark:text-white">Manage Users</h1>

      <div className="flex justify-between">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          data={users}
          onFilter={setFilteredUsers}
        />
        <button
          onClick={() => setAddUserModalState(true)}
          className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto border border-light dark:border-dark rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-white">
            <tr className="text-left">
              <th className="border border-light dark:border-dark p-3">Name</th>
              <th className="border border-light dark:border-dark p-3">
                Email
              </th>
              <th className="border border-light dark:border-dark p-3">
                Roles
              </th>
              <th className="border border-light dark:border-dark p-3">
                Password
              </th>
              <th className="border border-light dark:border-dark p-3">
                Created At
              </th>
              <th className="border border-light dark:border-dark p-3">
                Updated At
              </th>
              <th className="border border-light dark:border-dark p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="dark:bg-zinc-800 text-gray-900 dark:text-white">
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0
                    ? 'bg-zinc-50 dark:bg-zinc-900'
                    : 'bg-white dark:bg-zinc-800'
                } hover:bg-gray-100 dark:hover:bg-zinc-700`}
              >
                <td className="border border-light dark:border-dark p-3">
                  {user.name}
                </td>
                <td className="border border-light dark:border-dark p-3">
                  {user.email}
                </td>
                <td className="border border-light dark:border-dark p-3">
                  {user.roles.join(', ')}
                </td>
                <td className="border border-light dark:border-dark p-3">
                  ********
                </td>
                <td className="border border-light dark:border-dark p-3">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="border border-light dark:border-dark p-3">
                  {new Date(user.updatedAt).toLocaleString()}
                </td>
                <td className="grid gap-2 border border-light dark:border-dark p-3 text-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="grid items-center p-2 text-sm border rounded transition bg-red-500 hover:bg-red-600 border-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:border-red-800"
                  >
                    Delete
                  </button>
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
          onSave={fetchUsers}
        />
      )}
    </div>
  );
}
