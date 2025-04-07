//src/app/profile/page.tsx

'use client';

import { useState, useEffect, memo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Pencil, Trash2 } from 'lucide-react';
import EditOwnProfileModal from '@/app/components/EditOwnProfileModal';
import Button from '@/app/components/Button/Button';

type UserMessage = {
  _id: string;
  reason?: string;
  budget?: string;
  message: string;
};

export default function Profile() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<UserMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
      }
    };

    if (status === 'authenticated') fetchMessages();
  }, [status]);

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
    <section className="grid gap-6 p-6 w-full bg-white dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 rounded-md hover:shadow-md hover:ring-1 hover:ring-primary-300 dark:hover:ring-offset-2 hover:ring-offset-2 transition-shadow">
      <div className="grid gap-4 grid-cols-[auto_1fr_auto] items-start">
        <ProfileAvatar name={session.user.name} />
        <div className="grid gap-1">
          <h2 className="text-lg font-bold tracking-tight">
            {session.user.name}
          </h2>
          <p className="text-sm opacity-80">{session.user.email}</p>
        </div>
        <div className="grid gap-2 text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1"
          >
            <Pencil size={14} /> Edit profile
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteAccount}
            disabled={loading}
            className="inline-flex items-center gap-1"
          >
            <Trash2 size={14} /> {loading ? 'Processing...' : 'Delete account'}
          </Button>
        </div>
      </div>

      <p className="text-sm opacity-80 tracking-wide leading-snug max-w-prose">
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

      {messages.length > 0 && (
        <div className="grid gap-4 mt-6">
          <h3 className="text-md font-semibold">Your Submitted Messages</h3>
          <ul className="grid gap-3">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className="border border-primary-200 dark:border-secondary-700 rounded p-3 bg-primary-100 dark:bg-secondary-700 text-sm"
              >
                <p>
                  <strong>Reason:</strong> {msg.reason ?? 'N/A'}
                </p>
                {msg.budget && (
                  <p>
                    <strong>Budget:</strong> {msg.budget}
                  </p>
                )}
                <p>
                  <strong>Message:</strong> {msg.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

const ProfileAvatar = memo(({ name }: { name: string }) => (
  <div className="w-10 h-10 grid place-items-center rounded-full bg-primary-900 text-white dark:bg-secondary-50 dark:text-secondary-900 font-bold text-sm shadow">
    {name ? name.charAt(0).toUpperCase() : '?'}
  </div>
));
ProfileAvatar.displayName = 'ProfileAvatar';
