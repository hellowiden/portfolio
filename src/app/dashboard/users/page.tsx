'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  roles: string[];
}

export default function UsersPage() {
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

  const fetchUsers = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const { users } = await res.json();
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const UserForm = ({ fetchUsers }: { fetchUsers: () => void }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      roles: '',
    });

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
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to create user');
        await fetchUsers();
        setFormData({ name: '', email: '', roles: '' });
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="p-2 border"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border"
        />
        <input
          type="text"
          name="roles"
          value={formData.roles}
          onChange={handleChange}
          placeholder="Roles (comma separated)"
          className="p-2 border"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
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
        await fetchUsers();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div className="border p-4">
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.roles.join(', ')}</p>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="w-full grid gap-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <UserForm fetchUsers={fetchUsers} />
      <div className="space-y-4">
        {users.map((user) => (
          <UserItem key={user._id} user={user} fetchUsers={fetchUsers} />
        ))}
      </div>
    </div>
  );
}
