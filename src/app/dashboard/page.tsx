//src/app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const isAdmin = useMemo(
    () => session?.user?.roles.includes('admin'),
    [session]
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (status === 'authenticated' && !isAdmin) {
      router.push('/');
    }
  }, [status, isAdmin, router]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [isAdmin]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.roles.some((role) =>
          role.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [users, searchQuery]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
        } else {
          console.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (!session?.user) return <p>User data not available</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold gap-4 text-zinc-900">
        Admin Dashboard
      </h1>

      <h2 className="text-xl font-semibold gap-2 text-zinc-800">All Users</h2>
      <input
        type="text"
        placeholder="Search by name, email, or role"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="gap-4 p-2 border rounded w-full border-zinc-300 bg-zinc-100 text-zinc-900"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-zinc-50 border rounded-sm border-zinc-300">
          <thead>
            <tr className="bg-zinc-200 border-b">
              <th className="px-4 py-2 text-left border border-zinc-300">
                Name
              </th>
              <th className="px-4 py-2 text-left border border-zinc-300">
                Email
              </th>
              <th className="px-4 py-2 text-left border border-zinc-300">
                Roles
              </th>
              <th className="px-4 py-2 text-left border border-zinc-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b border-zinc-300">
                <td className="px-4 py-2 border border-zinc-300 text-zinc-900">
                  {user.name}
                </td>
                <td className="px-4 py-2 border border-zinc-300 text-zinc-900">
                  {user.email}
                </td>
                <td className="px-4 py-2 border border-zinc-300 text-zinc-900">
                  {user.roles.join(', ')}
                </td>
                <td className="px-4 py-2 border border-zinc-300">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className="px-2 py-1 bg-zinc-500 text-white rounded"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-zinc-700 text-white rounded"
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

      {isEditModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
