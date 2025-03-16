//src/app/dashboard/users/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
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

  useEffect(() => {
    const fetchUsers = async () => {
      if (!isAdmin) return;
      try {
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const { users } = await res.json();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [isAdmin]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <UserForm fetchUsers={() => setUsers([])} />
      <div className="space-y-4 mt-4">
        {users.length > 0 ? (
          users.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              fetchUsers={() => setUsers([])}
            />
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}

const UserForm = ({ fetchUsers }: { fetchUsers: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', roles: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, roles } = formData;
    if (!name || !email || !roles) {
      alert('All fields are required.');
      return;
    }
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          roles: roles.split(',').map((role) => role.trim()),
        }),
      });
      if (!res.ok) throw new Error('Failed to create user');
      setFormData({ name: '', email: '', roles: '' });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="p-2 border w-full"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-2 border w-full"
      />
      <input
        type="text"
        name="roles"
        value={formData.roles}
        onChange={handleChange}
        placeholder="Roles (comma separated)"
        className="p-2 border w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Create User
      </button>
    </form>
  );
};

const UserItem = ({
  user,
  fetchUsers,
}: {
  user: User;
  fetchUsers: () => void;
}) => {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/users/${user._id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
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
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date(user.createdAt))}
      </p>
      <p>
        <strong>Updated At:</strong>{' '}
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date(user.updatedAt))}
      </p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-3 py-2 rounded mt-2"
      >
        Delete
      </button>
    </div>
  );
};
