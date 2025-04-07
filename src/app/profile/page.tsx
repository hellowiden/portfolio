//src/app/profile/page.tsx

'use client';

import { useState, memo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Pencil, Trash2 } from 'lucide-react';
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
    <section className="w-full p-6 bg-primary-50 dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 rounded-xl grid gap-6">
      <div className="grid gap-4 grid-cols-[auto_1fr_auto] items-start">
        <ProfileAvatar name={session.user.name} />
        <div className="grid gap-1">
          <h2 className="text-sm font-bold text-primary-900 dark:text-secondary-50">
            {session.user.name}
          </h2>
          <p className="text-xs text-primary-200 dark:text-secondary-300">
            {session.user.email}
          </p>
        </div>
        <div className="grid gap-2 text-xs text-primary-900 dark:text-secondary-50">
          <button
            onClick={() => setIsModalOpen(true)}
            className="grid grid-cols-[auto_auto] items-center gap-1 hover:underline"
          >
            <Pencil size={14} /> Edit profile
          </button>
          <button
            onClick={handleDeleteAccount}
            disabled={loading}
            className="grid grid-cols-[auto_auto] items-center gap-1 hover:underline"
          >
            <Trash2 size={14} /> {loading ? 'Processing...' : 'Edit profile'}
          </button>
        </div>
      </div>

      <p className="text-xs text-primary-200 dark:text-secondary-300">
        Welcome to your profile. Here you can view all the information stored in
        our database. You may edit your details or permanently delete your
        account, which will result in complete removal from our system.
      </p>

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
  <div className="w-10 h-10 grid place-items-center rounded bg-primary-900 text-primary-50 dark:bg-secondary-50 dark:text-secondary-900 font-bold text-sm">
    {name ? name.charAt(0).toUpperCase() : '?'}
  </div>
));
ProfileAvatar.displayName = 'ProfileAvatar';
