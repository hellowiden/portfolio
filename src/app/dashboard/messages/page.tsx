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
  budget: string;
  reason: string;
  response: string;
  isResolved: boolean;
  createdAt: string;
}

const budgetPriority: Record<string, string> = {
  '8000_plus': 'high',
  '6000_8000': 'medium',
  '4500_6000': 'medium',
  '3000_4500': 'low',
  under_3000: 'low',
};

export default function Messages() {
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

  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/messages');
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      const sortedMessages = data.messages.sort((a: Message, b: Message) => {
        return (
          ((budgetPriority[b.budget] || 'low') === 'high' ? 1 : -1) -
          ((budgetPriority[a.budget] || 'low') === 'high' ? 1 : -1)
        );
      });
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchMessages();
  }, [isAdmin, fetchMessages]);

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete message');
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`border p-4 rounded-xl ${
              budgetPriority[msg.budget] === 'high'
                ? 'bg-red-100 dark:bg-red-900'
                : budgetPriority[msg.budget] === 'medium'
                ? 'bg-yellow-100 dark:bg-yellow-900'
                : 'bg-green-100 dark:bg-green-900'
            } border-light dark:border-dark grid gap-2`}
          >
            <p>
              <strong>From:</strong> {msg.userName} ({msg.userEmail})
            </p>
            <p>
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
            <p>
              <strong>Budget:</strong> {msg.budget}
            </p>
            <p>
              <strong>Category:</strong> {msg.reason}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
            <button
              onClick={() => handleDeleteMessage(msg._id)}
              className="bg-red-600 text-white px-3 py-1 rounded mt-2"
            >
              Delete Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
