//src/app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import EditUserModal from '../components/EditUserModal';
import AddUserModal from '../components/AddUserModal';

interface User {
  _id: string;
  name: string;
  email: string;
  roles: string[];
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.roles.includes('admin');

  useEffect(() => {
    if (
      status === 'unauthenticated' ||
      (status === 'authenticated' && !isAdmin)
    ) {
      router.replace(status === 'unauthenticated' ? '/login' : '/');
    }
  }, [status, isAdmin, router]);

  const [users, setUsers] = useState<User[]>([]);
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
    const fetchUsers = async () => {
      if (!isAdmin) return;
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const { users } = await response.json();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [isAdmin]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.roles.some((role) => role.toLowerCase().includes(query))
    );
  }, [users, searchQuery]);

  const handleEdit = (user: User) => setModalState({ isOpen: true, user });
  const handleCloseModal = () => setModalState({ isOpen: false, user: null });
  const handleSaveUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

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

  const handleAddUserModal = () => setAddUserModalState(true);
  const handleCloseAddUserModal = () => setAddUserModalState(false);
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
      if (!response.ok) throw new Error('Failed to create user');
      const { user } = await response.json();
      setUsers((prevUsers) => [...prevUsers, user]);
      handleCloseAddUserModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="w-full grid gap-4">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <button
        onClick={handleAddUserModal}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Add User
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded"
      />
      <table className="w-full border-collapse text-left text-sm text-zinc-800 dark:text-zinc-200">
        <thead className="bg-zinc-200 dark:bg-zinc-800">
          <tr>
            <th className="px-4 py-3 border-b border-zinc-300 dark:border-zinc-700">
              Name
            </th>
            <th className="px-4 py-3 border-b border-zinc-300 dark:border-zinc-700">
              Email
            </th>
            <th className="px-4 py-3 border-b border-zinc-300 dark:border-zinc-700">
              Roles
            </th>
            <th className="px-4 py-3 border-b border-zinc-300 dark:border-zinc-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <td className="px-4 py-3 border-b border-zinc-300 dark:border-zinc-700">
                {user.name}
              </td>
              <td className="px-4 py-3 border-b border-zinc-300 dark:border-zinc-700">
                {user.email}
              </td>
              <td className="px-4 py-3 border-b border-zinc-300 dark:border-zinc-700">
                {user.roles.join(', ')}
              </td>
              <td className="px-4 py-3 border-b border-zinc-300 dark:border-zinc-700 flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 text-sm font-medium text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 rounded-lg transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-lg transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalState.isOpen && modalState.user && (
        <EditUserModal
          user={modalState.user}
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />
      )}
      {addUserModalState && (
        <AddUserModal
          isOpen={addUserModalState}
          onClose={handleCloseAddUserModal}
          onSave={handleAddUser}
        />
      )}
    </div>
  );
}
