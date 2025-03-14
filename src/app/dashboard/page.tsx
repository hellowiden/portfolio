//src/app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useState, useMemo, useCallback, useEffect } from 'react';
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

  const isAdmin = useMemo(
    () => session?.user?.roles.includes('admin'),
    [session]
  );

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

  const [addUserModalState, setAddUserModalState] = useState<boolean>(false); // State for Add User Modal

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

  const handleAddUserModal = () => {
    setAddUserModalState(true);
  };

  const handleCloseAddUserModal = () => {
    setAddUserModalState(false);
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

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
        className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
      >
        Add User
      </button>

      <input
        type="text"
        placeholder="Search by name, email, or role"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full border p-2 rounded border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />

      <table className="w-full border border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-700">
        <thead>
          <tr className="bg-zinc-200 dark:bg-zinc-700 border-b dark:border-zinc-600">
            {['Name', 'Email', 'Roles', 'Actions'].map((header) => (
              <th
                key={header}
                className="text-left border border-zinc-300 dark:border-zinc-600 p-2"
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
              <td className="border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white p-2">
                {user.name
                  .split(new RegExp(`(${searchQuery})`, 'gi'))
                  .map((part, index) =>
                    part.toLowerCase() === searchQuery.toLowerCase() ? (
                      <span
                        key={index}
                        className="bg-yellow-200 dark:bg-yellow-600"
                      >
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
              </td>
              <td className="border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white p-2">
                {user.email
                  .split(new RegExp(`(${searchQuery})`, 'gi'))
                  .map((part, index) =>
                    part.toLowerCase() === searchQuery.toLowerCase() ? (
                      <span
                        key={index}
                        className="bg-yellow-200 dark:bg-yellow-600"
                      >
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
              </td>
              <td className="border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white p-2">
                {user.roles
                  .join(', ')
                  .split(new RegExp(`(${searchQuery})`, 'gi'))
                  .map((part, index) =>
                    part.toLowerCase() === searchQuery.toLowerCase() ? (
                      <span
                        key={index}
                        className="bg-yellow-200 dark:bg-yellow-600"
                      >
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
              </td>
              <td className="border border-zinc-300 dark:border-zinc-700 p-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
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
