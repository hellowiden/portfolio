// src/app/profile/page.tsx
'use client';

import { useState, useEffect, memo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Pencil, Trash2 } from 'lucide-react';
import EditOwnProfileModal from '@portfolio/ui/components/modals/EditOwnProfileModal';
import EditMessageModal from '@portfolio/ui/components/modals/EditMessageModal';
import Button from '@portfolio/ui/components/Button/Button';

type UserMessage = {
  _id: string;
  reason?: string;
  budget?: string;
  message: string;
};

export default function Profile() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMessageModalOpen, setEditMessageModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<UserMessage | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
      }
    };

    if (status === 'authenticated' && session?.user?.roles) {
      const admin =
        Array.isArray(session.user.roles) &&
        session.user.roles.includes('admin');
      setIsAdmin(admin);
      if (!admin) fetchMessages();
    }
  }, [status, session]);

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

  // ✅ Coerce nullable NextAuth fields to strings
  const displayName = session.user.name ?? session.user.email ?? 'User';
  const displayEmail = session.user.email ?? '';

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

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    if (res.ok) setMessages((prev) => prev.filter((msg) => msg._id !== id));
  };

  const handleEditMessage = (msg: UserMessage) => {
    setEditingMessage(msg);
    setEditMessageModalOpen(true);
  };

  const handleSaveMessage = (updated: UserMessage) => {
    setMessages((prev) =>
      prev.map((msg) => (msg._id === updated._id ? updated : msg))
    );
    setEditMessageModalOpen(false);
    setEditingMessage(null);
  };

  return (
    <>
      <section className="grid gap-6 p-4 sm:p-6 w-full bg-white dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 rounded-md hover:shadow-md hover:ring-1 hover:ring-primary-300 dark:hover:ring-offset-2 hover:ring-offset-2 transition-shadow">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-start">
          {/* ✅ Now always a string */}
          <ProfileAvatar name={displayName} />

          <div className="grid gap-1">
            <h2 className="text-lg font-bold tracking-tight">{displayName}</h2>
            <p className="text-sm opacity-80">{displayEmail}</p>
            <p className="text-sm">
              Status:{' '}
              <span
                className={
                  session.user.isOnline ? 'text-green-600' : 'text-gray-500'
                }
              >
                {session.user.isOnline ? 'Online' : 'Offline'}
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 text-sm sm:justify-end">
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
              <Trash2 size={14} />
              {loading ? 'Processing...' : 'Delete account'}
            </Button>
          </div>
        </div>

        <p className="text-sm opacity-80 tracking-wide leading-snug max-w-prose">
          Welcome to your profile. Here you can view all the information stored
          in our database. You may edit your details or permanently delete your
          account, which will result in complete removal from our system.
        </p>

        {/* ✅ Provide strict strings to modal */}
        <EditOwnProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={{
            id: session.user.id,
            name: displayName,
            email: displayEmail,
          }}
          onSave={() => window.location.reload()}
        />
      </section>

      {!isAdmin && messages.length > 0 && (
        <section className="grid gap-4 mt-6">
          <h3 className="text-md font-semibold">Your Submitted Messages</h3>
          <ul className="grid gap-4">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className="grid gap-3 p-4 sm:p-6 w-full bg-white dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 rounded-md cursor-default hover:shadow-md hover:ring-1 hover:ring-primary-300 dark:hover:ring-offset-2 hover:ring-offset-2 transition-shadow"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start gap-2">
                  <h4 className="text-lg font-bold tracking-tight">
                    {msg.reason || 'Message'}
                  </h4>
                  <div className="flex justify-start sm:justify-end gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditMessage(msg)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteMessage(msg._id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>

                <p className="text-sm opacity-80 tracking-wide leading-snug max-w-prose">
                  {msg.message}
                </p>

                {msg.budget && (
                  <p className="text-sm text-primary-700 dark:text-secondary-300">
                    <strong>Budget:</strong> {msg.budget}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {editingMessage && (
        <EditMessageModal
          isOpen={editMessageModalOpen}
          message={editingMessage}
          onClose={() => setEditMessageModalOpen(false)}
          onSave={async (updated) => {
            const res = await fetch(`/api/messages/${updated._id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updated),
            });
            if (res.ok) {
              const data = await res.json();
              handleSaveMessage(data.message);
            }
          }}
        />
      )}
    </>
  );
}

// Keep strict prop on the avatar; callers supply a string
const ProfileAvatar = memo(({ name }: { name: string }) => (
  <div className="w-10 h-10 grid place-items-center rounded-full bg-primary-900 text-white dark:bg-secondary-50 dark:text-secondary-900 font-bold text-sm shadow">
    {name ? name.charAt(0).toUpperCase() : '?'}
  </div>
));
ProfileAvatar.displayName = 'ProfileAvatar';
