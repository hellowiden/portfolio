//src/app/dashboard/messages/page.tsx

// src/app/dashboard/messages/page.tsx

'use client';

import { useEffect, useState, useCallback } from 'react';
import SearchInput from '@/app/components/SearchInput/SearchInput';
import Button from '@/app/components/Button/Button';

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

// === Utility ===

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
    return budgetEnum[budget] || 'bg-primary-300 dark:bg-secondary-600';
  }
  return 'bg-green-500';
};

// === Message Card Component ===

function MessageCard({
  msg,
  onDelete,
}: {
  msg: Message;
  onDelete: (id: string) => void;
}) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(msg._id);
  };

  const textBlockClass = 'text-sm opacity-80 tracking-wide leading-snug';

  return (
    <section className="grid gap-3 p-6 w-full h-full bg-white dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 rounded-md cursor-pointer hover:shadow-md hover:ring-1 hover:ring-primary-300 dark:hover:ring-offset-2 hover:ring-offset-2 transition-shadow">
      <div
        className={`h-2 w-full rounded ${getPriorityColor(
          msg.reason,
          msg.budget
        )}`}
      />

      <div className="grid grid-cols-[1fr_auto] items-start gap-2">
        <h2 className="text-lg font-bold tracking-tight">{msg.reason}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="p-2 text-sm"
        >
          Delete
        </Button>
      </div>

      <p className={textBlockClass}>
        <strong>From:</strong> {msg.userName} ({msg.userEmail})
      </p>

      <p className={textBlockClass}>
        <strong>Message:</strong> {msg.message}
      </p>

      {msg.message.startsWith('http') && (
        <a
          href={msg.message}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-700 dark:text-secondary-200 underline"
        >
          View Attachment
        </a>
      )}

      {msg.budget && (
        <p className={textBlockClass}>
          <strong>Budget:</strong> {msg.budget}
        </p>
      )}

      <p className="text-xs opacity-60">
        {new Date(msg.createdAt).toLocaleString()}
      </p>
    </section>
  );
}

// === Main Page Component ===

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
      setFilteredMessages(sorted);
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

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete message');
      setAllMessages((prev) => prev.filter((msg) => msg._id !== messageId));
      setFilteredMessages((prev) =>
        prev.filter((msg) => msg._id !== messageId)
      );
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid gap-6 p-6 text-primary-900 dark:text-secondary-50">
      <h1 className="text-3xl font-bold">Messages</h1>

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        data={allMessages}
        onFilter={setFilteredMessages}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMessages.map((msg) => (
          <MessageCard key={msg._id} msg={msg} onDelete={handleDeleteMessage} />
        ))}
      </div>
    </div>
  );
}
