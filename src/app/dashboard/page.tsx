'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback } from 'react';
import EditUserModal from '../components/EditUserModal';

interface User {
  _id: string;
  name: string;
  email: string;
  roles: string[];
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    user: User | null;
  }>({
    isOpen: false,
    user: null,
  });

  const isAdmin = useMemo(
    () => session?.user?.roles.includes('admin'),
    [session]
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && !isAdmin) {
      router.push('/');
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

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.roles.some((role) => role.toLowerCase().includes(query))
    );
  }, [users, searchQuery]);

  const handleEdit = useCallback((user: User) => {
    setModalState({ isOpen: true, user });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalState({ isOpen: false, user: null });
  }, []);

  const handleSaveUser = useCallback((updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  }, []);

  const handleDelete = useCallback(async (userId: string) => {
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
  }, []);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session?.user) return <p>User data not available</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="p-4 grid gap-4 justify-center">
      <input
        type="text"
        placeholder="Search by name, email, or role"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded w-full border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-700">
          <thead>
            <tr className="bg-zinc-200 dark:bg-zinc-700 border-b dark:border-zinc-600">
              {['Name', 'Email', 'Role', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-left border border-zinc-300 dark:border-zinc-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b border-zinc-300 dark:border-zinc-700"
              >
                <td className="p-2 border border-zinc-300 text-zinc-900 dark:border-zinc-700 dark:text-white">
                  {user.name}
                </td>
                <td className="p-2 border border-zinc-300 text-zinc-900 dark:border-zinc-700 dark:text-white">
                  {user.email}
                </td>
                <td className="p-2 border border-zinc-300 text-zinc-900 dark:border-zinc-700 dark:text-white">
                  {user.roles.join(', ')}
                </td>
                <td className="p-2 border border-zinc-300 dark:border-zinc-700">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className="p-2 text-sm border border-zinc-700 text-zinc-700 rounded transition hover:bg-zinc-800 hover:text-white dark:text-white dark:border-zinc-600 dark:hover:bg-zinc-600"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="p-2 text-sm border border-zinc-700 bg-zinc-800 text-zinc-300 rounded transition hover:bg-zinc-100 hover:text-black dark:bg-zinc-600 dark:text-white dark:hover:bg-red-500"
                      onClick={() => handleDelete(user._id)}
                    >
                      Remove
                    </button>
                  </div>
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
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
