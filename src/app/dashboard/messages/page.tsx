//src/app/dashboard/messages/page.tsx

'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Message {
  _id: string;
  userName: string;
  userEmail: string;
  message: string;
  reason: string;
  response: string;
  isResolved: boolean;
  createdAt: string;
  budget?: string;
}

export default function Messages() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [loading, setLoading] = useState(false);

  const isAdmin = useMemo(
    () => session?.user?.roles.includes('admin'),
    [session?.user?.roles]
  );

  useEffect(() => {
    if (
      status === 'unauthenticated' ||
      (status === 'authenticated' && !isAdmin)
    ) {
      router.replace(status === 'unauthenticated' ? '/login' : '/');
    }
  }, [status, isAdmin, router]);

  const fetchMessages = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const res = await fetch('/api/messages', { signal });
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();

      const categorizedMessages = data.messages.reduce(
        (acc: Record<string, Message[]>, msg: Message) => {
          if (!acc[msg.reason]) acc[msg.reason] = [];
          acc[msg.reason].push(msg);
          return acc;
        },
        {}
      );

      Object.keys(categorizedMessages).forEach((category: string) => {
        categorizedMessages[category].sort(
          (a: Message, b: Message) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setMessages(categorizedMessages);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError')
        console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    const abortController = new AbortController();
    fetchMessages(abortController.signal);
    return () => abortController.abort();
  }, [isAdmin, fetchMessages]);

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete message');
      setMessages((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((category) => {
          updated[category] = updated[category].filter(
            (msg) => msg._id !== messageId
          );
        });
        return updated;
      });
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (status === 'loading' || loading) return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="grid gap-6 p-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Messages
      </h1>
      {Object.entries(messages).map(([category, msgs]) => (
        <div key={category} className="gap-6 grid">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 gap-4 grid">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {msgs.map((msg) => (
              <div
                key={msg._id}
                className={`border dark:border-zinc-600 p-5 rounded transition-all bg-zinc-200 dark:bg-zinc-900 grid gap-4`}
              >
                <p className="text-lg">
                  <strong>From:</strong> {msg.userName} ({msg.userEmail})
                </p>
                <p className="text-lg font-bold">
                  <strong>Message:</strong> {msg.message}
                </p>
                {msg.message.startsWith('http') && (
                  <a
                    href={msg.message}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    View Attachment
                  </a>
                )}
                {msg.budget && (
                  <p className="text-lg font-bold">
                    <strong>Budget:</strong> {msg.budget}
                  </p>
                )}
                <p className="text text-zinc-500 dark:text-zinc-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDeleteMessage(msg._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete Message
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
