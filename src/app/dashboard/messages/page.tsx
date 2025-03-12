//src/app/dashboard/messages/page.tsx

'use client';

import { useEffect, useState, useCallback } from 'react';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [responseText, setResponseText] = useState<{ [key: string]: string }>(
    {}
  );

  // ✅ Move `fetchMessages` outside useEffect & use `useCallback`
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
    fetchMessages();
  }, [fetchMessages]);

  // ✅ Memoized `handleResponseChange` for better performance
  const handleResponseChange = useCallback(
    (messageId: string, response: string) => {
      setResponseText((prev) => ({ ...prev, [messageId]: response }));
    },
    []
  );

  const handleSendResponse = useCallback(
    async (messageId: string) => {
      try {
        const res = await fetch(`/api/messages/${messageId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            response: responseText[messageId] || '',
            isResolved: true,
          }),
        });

        if (!res.ok) {
          const responseData = await res.json();
          throw new Error(responseData.error || 'Failed to send response');
        }

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === messageId
              ? { ...msg, response: responseText[messageId], isResolved: true }
              : msg
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Messages</h1>
      <ul className="mt-4">
        {messages.map((msg) => (
          <li key={msg._id} className="border-b py-4">
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
            <p className="text-sm text-gray-500">
              {new Date(msg.createdAt).toLocaleString()}
            </p>

            <div className="mt-2 flex gap-2">
              <button
                className="px-3 py-2 bg-green-500 text-white rounded"
                onClick={() => handleSendResponse(msg._id)}
              >
                Respond
              </button>
              <button
                className="px-3 py-2 bg-red-500 text-white rounded"
                onClick={() => handleDeleteMessage(msg._id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
