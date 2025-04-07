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
    <section className="w-full max-w-md mx-auto p-6 bg-white dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 rounded-md hover:ring-1 hover:ring-primary-300 dark:hover:ring-offset-2 hover:ring-offset-2 transition-shadow ">
      <div className="grid gap-4">
        <div className="flex items-center gap-4">
          <ProfileAvatar name={session.user.name} />
          <div>
            <h2 className="text-xl font-bold">{session.user.name}</h2>
            <p className="text-sm text-primary-600 dark:text-secondary-300">
              {session.user.email}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="secondary"
            size="sm"
          >
            Edit Profile
          </Button>
          <Button
            onClick={handleDeleteAccount}
            disabled={loading}
            variant="danger"
            size="sm"
          >
            {loading ? 'Processing...' : 'Remove Account'}
          </Button>
        </div>
      </div>

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
    </section>
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
