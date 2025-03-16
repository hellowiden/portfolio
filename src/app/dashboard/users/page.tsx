//src/app/dashboard/users/page.tsx

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EditUserModal from '@/app/components/EditUserModal';
import AddUserModal from '@/app/components/AddUserModal';

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

  // Fetch users
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
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <button
        onClick={() => setAddUserModalState(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add User
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="border p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-light dark:border-dark grid gap-2"
          >
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Roles:</strong> {user.roles.join(', ')}
            </p>
            <p>
              <strong>Created At:</strong>{' '}
              {new Date(user.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{' '}
              {new Date(user.updatedAt).toLocaleString()}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit User Modal */}
      {modalState.isOpen && modalState.user && (
        <EditUserModal
          user={modalState.user}
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onSave={fetchUsers} // Refresh user list after saving
        />
      )}

      {/* Add User Modal */}
      {addUserModalState && (
        <AddUserModal
          isOpen={addUserModalState}
          onClose={() => setAddUserModalState(false)}
          onSave={fetchUsers} // Refresh user list after adding
        />
      )}
    </div>
  );
}
