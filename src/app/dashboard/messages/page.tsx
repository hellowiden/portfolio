//src/app/dashboard/messages/page.tsx

'use client';

import { useEffect, useState, useCallback } from 'react';
import SearchInput from '@/app/components/SearchInput/SearchInput';

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

const getPriorityColor = (reason: string, budget?: string) => {
  const lowerReason = reason.toLowerCase();
  if (lowerReason.includes('issue')) return 'bg-red-600';
  if (lowerReason.includes('job') && budget) {
    const budgetEnum: Record<string, string> = {
      under_3000: 'bg-red-500',
      '3000_4500': 'bg-orange-500',
      '4500_6000': 'bg-yellow-500',
      '6000_8000': 'bg-green-500',
      '8000_plus': 'bg-blue-500',
    };
    return budgetEnum[budget] || 'bg-gray-500';
  }
  return 'bg-green-500';
};

export default function Messages() {
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const res = await fetch('/api/messages', { signal });
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();

      const sorted = data.messages.sort(
        (a: Message, b: Message) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setAllMessages(sorted);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error fetching messages:', error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    fetchMessages(abortController.signal);
    return () => abortController.abort();
  }, [fetchMessages]);

  useEffect(() => {
    setFilteredMessages(allMessages);
  }, [allMessages]);

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete message');
      setAllMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid gap-6 p-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Messages
      </h1>

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        data={allMessages}
        onFilter={setFilteredMessages}
      />

      {Object.entries(
        filteredMessages.reduce((acc: Record<string, Message[]>, msg) => {
          if (!acc[msg.reason]) acc[msg.reason] = [];
          acc[msg.reason].push(msg);
          return acc;
        }, {})
      ).map(([category, msgs]) => (
        <div key={category} className="gap-6 grid">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {msgs.map((msg) => (
              <div
                key={msg._id}
                className="border dark:border-zinc-600 p-5 rounded transition-all bg-zinc-200 dark:bg-zinc-900 grid gap-4"
              >
                <hr
                  className={`h-3 rounded ${getPriorityColor(
                    msg.reason,
                    msg.budget
                  )}`}
                />
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
                  className="grid items-center p-2 text-sm border rounded transition bg-red-500 hover:bg-red-600 border-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:border-red-800"
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
