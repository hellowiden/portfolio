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

  const getPriorityInfo = (reason: string, budget?: string) => {
    const lowerReason = reason.toLowerCase();
    if (lowerReason.includes('issue')) {
      return { color: 'bg-red-500', label: 'Urgent', icon: '🚨' };
    }
    if (lowerReason.includes('job') && budget) {
      const budgetMap: Record<string, { color: string; label: string }> = {
        under_3000: { color: 'bg-red-500', label: 'Low Budget' },
        '3000_4500': { color: 'bg-orange-500', label: 'Medium-' },
        '4500_6000': { color: 'bg-yellow-500', label: 'Medium' },
        '6000_8000': { color: 'bg-green-500', label: 'High' },
        '8000_plus': { color: 'bg-blue-500', label: 'Premium' },
      };
      return {
        ...(budgetMap[budget] || { color: 'bg-gray-400', label: 'Standard' }),
        icon: '💼',
      };
    }
    return { color: 'bg-green-500', label: 'General', icon: '💬' };
  };

  const priorityInfo = getPriorityInfo(msg.reason, msg.budget);
  const isUrl = msg.message.startsWith('http');

  return (
    <div className="group relative bg-white dark:bg-secondary-800 border border-primary-200 dark:border-secondary-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden cursor-pointer">
      {/* Priority indicator bar */}
      <div className={`h-1 w-full ${priorityInfo.color}`} />

      <div className="p-6">
        {/* Header with priority badge and delete button */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-white ${priorityInfo.color}`}
            >
              <span>{priorityInfo.icon}</span>
              {priorityInfo.label}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            ✕
          </Button>
        </div>

        {/* Main reason/subject */}
        <h3 className="text-lg font-semibold text-primary-900 dark:text-secondary-50 mb-4 line-clamp-2">
          {msg.reason}
        </h3>

        {/* User info card */}
        <div className="bg-primary-50 dark:bg-secondary-700/50 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-primary-200 dark:bg-secondary-600 rounded-full flex items-center justify-center text-sm font-medium">
              {msg.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-sm text-primary-900 dark:text-secondary-50">
                {msg.userName}
              </p>
              <p className="text-xs text-primary-600 dark:text-secondary-400">
                {msg.userEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Message content */}
        <div className="mb-4">
          <p className="text-sm text-primary-700 dark:text-secondary-300 leading-relaxed line-clamp-3">
            {isUrl ? (
              <a
                href={msg.message}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-dotted underline-offset-2"
                onClick={(e) => e.stopPropagation()}
              >
                <span>📎</span>
                View Attachment
              </a>
            ) : (
              msg.message
            )}
          </p>
        </div>

        {/* Budget info */}
        {msg.budget && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-primary-600 dark:text-secondary-400 bg-primary-100 dark:bg-secondary-700 px-2 py-1 rounded-full">
              💰 Budget: {msg.budget.replace('_', ' - ').replace('plus', '+')}
            </span>
          </div>
        )}

        {/* Footer with timestamp */}
        <div className="flex items-center justify-between pt-3 border-t border-primary-100 dark:border-secondary-700">
          <span className="text-xs text-primary-500 dark:text-secondary-500">
            {new Date(msg.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>

          {/* Status indicator */}
          <div
            className={`flex items-center gap-1 text-xs ${
              msg.isResolved
                ? 'text-green-600 dark:text-green-400'
                : 'text-orange-600 dark:text-orange-400'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                msg.isResolved ? 'bg-green-500' : 'bg-orange-500'
              }`}
            />
            {msg.isResolved ? 'Resolved' : 'Pending'}
          </div>
        </div>
      </div>
    </div>
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
