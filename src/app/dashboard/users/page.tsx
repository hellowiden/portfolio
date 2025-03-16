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
  roles: string[];
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
      setAddUserModalState(false);
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
        onClick={() => setAddUserModalState(true)}
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

      {/* User Table */}
      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Edit User Modal */}
      {modalState.isOpen && modalState.user && (
        <EditUserModal
          user={modalState.user}
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />
      )}

      {/* Add User Modal */}
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

const UserTable = ({
  users,
  onEdit,
  onDelete,
}: {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}) => (
  <table className="w-full border-collapse text-left text-sm">
    <thead>
      <tr>
        <th className="px-4 py-3 border-b">Name</th>
        <th className="px-4 py-3 border-b">Email</th>
        <th className="px-4 py-3 border-b">Roles</th>
        <th className="px-4 py-3 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id} className="hover:bg-gray-100">
          <td className="px-4 py-3 border-b">{user.name}</td>
          <td className="px-4 py-3 border-b">{user.email}</td>
          <td className="px-4 py-3 border-b">{user.roles.join(', ')}</td>
          <td className="px-4 py-3 border-b flex gap-2">
            <button
              onClick={() => onEdit(user)}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(user._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
