// src/app/dashboard/messages/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface Message {
  _id: string;
  userName: string;
  userEmail: string;
  message: string;
  budget: string;
  reason: string;
  createdAt: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch('/api/messages');
        if (!res.ok)
          throw new Error(`Failed to fetch messages: ${res.statusText}`);
        const data = await res.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    async function checkAdminStatus() {
      try {
        const res = await fetch('/api/auth/user');
        if (!res.ok) {
          console.error(`Admin status fetch failed with status: ${res.status}`);
          return;
        }
        const userData = await res.json();
        setIsAdmin(userData.role === 'admin');
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    }

    checkAdminStatus();
    fetchMessages();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        {isAdmin ? 'All Messages' : 'My Messages'}
      </h1>
      <ul className="mt-4">
        {messages.map((msg) => (
          <li key={msg._id} className="border-b py-2">
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
          </li>
        ))}
      </ul>
    </div>
  );
}
