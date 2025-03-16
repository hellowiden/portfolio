//src/app/profile/page.tsx

'use client';

import { useState, useEffect, ChangeEvent, FormEvent, memo } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    roles: string[];
    newPassword: string;
  }>({
    name: '',
    email: '',
    roles: [],
    newPassword: '',
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        roles: Array.isArray(session.user.roles) ? session.user.roles : [],
        newPassword: '',
      });
    }
  }, [session]);

  if (status === 'loading') return <p className="text-zinc-500">Loading...</p>;
  if (status !== 'authenticated')
    return (
      <p className="text-red-500">You need to log in to view this page.</p>
    );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApiRequest = async (
    url: string,
    method: string,
    body?: object
  ) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!res.ok) throw new Error(`${method} request failed`);
      return res;
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    handleApiRequest(`/api/users/${session.user.id}`, 'PUT', {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.newPassword.trim() || undefined,
      roles: session.user.roles.includes('admin')
        ? formData.roles
        : session.user.roles,
    });
  };

  const handleUpdateClick = () => {
    const fakeEvent = { preventDefault: () => {} } as unknown as FormEvent;
    handleUpdate(fakeEvent);
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to permanently delete your account?'))
      return;
    const res = await handleApiRequest(
      `/api/users/${session.user.id}`,
      'DELETE'
    );
    if (res) signOut();
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-6 w-full mx-auto bg-zinc-50 dark:bg-zinc-800 rounded-lg border dark:border-light">
      <div className="grid grid-cols-[min-content_1fr] gap-4 items-center">
        <ProfileAvatar name={formData.name} />
        <span className="text-zinc-800 dark:text-zinc-200">
          {formData.name}
        </span>
      </div>
      <div className="border-t border-zinc-300 dark:border-zinc-600" />
      <form onSubmit={handleUpdate} className="grid gap-4">
        <FormInput
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          label="Role"
          type="text"
          name="role"
          value={formData.roles.join(', ')}
          disabled
          readOnly
        />
        <FormInput
          label="New Password (optional)"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <Button
          onClick={handleUpdateClick}
          disabled={loading}
          variant="primary"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
      <div className="border dark:border-light dark:border-zinc-600" />
      <Button onClick={handleDeleteAccount} disabled={loading} variant="danger">
        {loading ? 'Processing...' : 'Remove Account'}
      </Button>
    </div>
  );
}

const ProfileAvatar = memo(({ name }: { name: string }) => (
  <div className="w-12 h-12 grid place-items-center bg-zinc-300 dark:bg-zinc-600 text-lg font-semibold rounded-md">
    <span className="text-zinc-800 dark:text-zinc-200">
      {name ? name.charAt(0).toUpperCase() : '?'}
    </span>
  </div>
));
ProfileAvatar.displayName = 'ProfileAvatar';

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  disabled = false,
  readOnly = false,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
}) => (
  <div className="grid gap-2">
    <label
      htmlFor={name}
      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
      aria-label={label}
      className={`p-2 border dark:border-light dark:border-zinc-600 rounded-md focus:ring-green-500 dark:focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    />
  </div>
);

const Button = ({
  onClick,
  children,
  disabled,
  variant,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  disabled: boolean;
  variant: 'primary' | 'danger';
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-2 rounded-md border dark:border-light transition ${
      variant === 'primary'
        ? 'bg-green-500 dark:bg-green-600 text-white hover:bg-green-600 dark:hover:bg-green-700'
        : 'bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-700'
    }`}
  >
    {children}
  </button>
);
