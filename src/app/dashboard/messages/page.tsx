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
  const [responseText, setResponseText] = useState<{ [key: string]: string }>(
    {}
  );

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/messages');
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchMessages();
  }, [isAdmin, fetchMessages]);

  const handleResponseChange = useCallback(
    (messageId: string, response: string) => {
      setResponseText((prev) => ({ ...prev, [messageId]: response }));
    },
    []
  );

  const handleSendResponse = useCallback(
    async (messageId: string) => {
      const response = responseText[messageId]?.trim();
      if (!response) {
        alert('Please enter a response before sending.');
        return;
      }

      if (!confirm('Are you sure you want to send this response?')) return;

      try {
        const res = await fetch(`/api/messages/${messageId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            response,
            isResolved: true,
          }),
        });

        if (!res.ok) {
          const responseData = await res.json();
          throw new Error(responseData.error || 'Failed to send response');
        }

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === messageId ? { ...msg, response, isResolved: true } : msg
          )
        );
        setResponseText((prev) => ({ ...prev, [messageId]: '' }));
      } catch (error) {
        console.error('Error sending response:', error);
      }
    },
    [responseText]
  );

  const handleDeleteMessage = useCallback(async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const responseData = await res.json();
        throw new Error(responseData.error || 'Failed to delete message');
      }

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }, []);

  if (status === 'loading') return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="border p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-light dark:border-dark grid gap-2"
          >
            <p>
              <strong>From:</strong> {msg.userName} ({msg.userEmail})
            </p>
            <p>
              <strong>Message:</strong> {msg.message}
            </p>
            <p>
              <strong>Budget:</strong> {msg.budget}
            </p>
            <p>
              <strong>Reason:</strong> {msg.reason}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {new Date(msg.createdAt).toLocaleString()}
            </p>

            {!msg.isResolved && (
              <div className="grid grid-cols-2 gap-2">
                <textarea
                  className="w-full p-2 border rounded bg-zinc-100 dark:bg-zinc-800 border-light dark:border-dark text-zinc-900 dark:text-zinc-50 col-span-2"
                  placeholder="Write a response..."
                  value={responseText[msg._id] || ''}
                  onChange={(e) =>
                    handleResponseChange(msg._id, e.target.value)
                  }
                />
                <button
                  className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
                  onClick={() => handleSendResponse(msg._id)}
                  disabled={!responseText[msg._id]?.trim()}
                >
                  Respond
                </button>
                <button
                  className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
                  onClick={() => handleDeleteMessage(msg._id)}
                >
                  Remove
                </button>
              </div>
            )}

            {msg.isResolved && (
              <div className="grid grid-cols-2 gap-2">
                <span className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2">
                  Resolved
                </span>
                <button
                  className="grid items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
                  onClick={() => handleDeleteMessage(msg._id)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
