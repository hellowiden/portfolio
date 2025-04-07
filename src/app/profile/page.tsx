//src/app/profile/page.tsx

'use client';

import { useState, memo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Button from '@/app/components/Button/Button';
import EditOwnProfileModal from '@/app/components/EditOwnProfileModal';

export default function Profile() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (status === 'loading') {
    return (
      <p className="text-primary-900 dark:text-secondary-50">Loading...</p>
    );
  }

  if (status !== 'authenticated' || !session?.user) {
    return (
      <p className="text-primary-900 dark:text-secondary-50">
        You need to log in to view this page.
      </p>
    );
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to permanently delete your account?'))
      return;
    setLoading(true);
    const res = await fetch(`/api/users/${session.user.id}`, {
      method: 'DELETE',
    });
    setLoading(false);
    if (res.ok) signOut();
  };

  return (
    <div className="grid gap-4 text-primary-900 dark:text-secondary-50">
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center min-w-0">
        <ProfileAvatar name={session.user.name} />
        <span className="text-lg font-medium truncate">
          {session.user.name}
        </span>
      </div>

      <div className="grid gap-1">
        <p>
          <strong>Email:</strong> {session.user.email}
        </p>
        <p>
          <strong>Roles:</strong> {session.user.roles.join(', ')}
        </p>
      </div>

      <Button
        onClick={() => setIsModalOpen(true)}
        variant="secondary"
        size="sm"
        className="w-fit"
      >
        Edit Profile
      </Button>

      <Button
        onClick={handleDeleteAccount}
        disabled={loading}
        variant="danger"
        size="sm"
        className="w-fit"
      >
        {loading ? 'Processing...' : 'Remove Account'}
      </Button>

      <EditOwnProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={{
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
        }}
        onSave={() => window.location.reload()}
      />
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
