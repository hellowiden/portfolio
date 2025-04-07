//src/app/profile/page.tsx

'use client';

import { useState, useEffect, ChangeEvent, FormEvent, memo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Button from '@/app/components/Button/Button';

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
        roles: Array.isArray(session.user.roles)
          ? (session.user.roles as string[])
          : [],
        newPassword: '',
      });
    }
  }, [session]);

  if (status === 'loading')
    return (
      <p className="text-primary-900 dark:text-secondary-50">Loading...</p>
    );
  if (status !== 'authenticated')
    return (
      <p className="text-primary-900 dark:text-secondary-50">
        You need to log in to view this page.
      </p>
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
    <div className="grid gap-4 text-primary-900 dark:text-secondary-50">
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center min-w-0">
        <ProfileAvatar name={formData.name} />
        <span className="text-lg font-medium truncate">{formData.name}</span>
      </div>

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
          label="Roles"
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
          type="submit"
          disabled={loading}
          variant="secondary"
          size="sm"
          className="w-fit"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>

      <Button
        onClick={handleDeleteAccount}
        disabled={loading}
        variant="danger"
        size="sm"
        className="w-fit"
      >
        {loading ? 'Processing...' : 'Remove Account'}
      </Button>
    </div>
  );
}

const ProfileAvatar = memo(({ name }: { name: string }) => (
  <div
    className="w-12 h-12 flex items-center justify-center rounded border font-bold text-lg 
    bg-primary-900 text-primary-50 border-primary-200 dark:bg-secondary-50 dark:text-secondary-900 dark:border-secondary-200"
  >
    <span>{name ? name.charAt(0).toUpperCase() : '?'}</span>
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
    <label htmlFor={name} className="text-primary-900 dark:text-secondary-100">
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
      className="p-2 border rounded bg-primary-100 text-primary-900 border-primary-200
        dark:bg-secondary-800 dark:text-secondary-50 dark:border-secondary-700
        focus:border-primary-900 dark:focus:border-secondary-50"
    />
  </div>
);
