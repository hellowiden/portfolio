// src/app/contact/page.tsx
'use client';

import { useState } from 'react';

const budgetOptions = [
  { value: 'under_100', label: 'Under $100' },
  { value: '100_500', label: '$100 - $500' },
  { value: '500_1000', label: '$500 - $1000' },
  { value: '1000_plus', label: 'Over $1000' },
];

const contactReasons = [
  { value: 'job_offer', label: 'Job Offers' },
  { value: 'issues', label: 'Issues' },
  { value: 'general', label: 'General Conversations' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    message: '',
    budget: '',
    reason: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setStatus('Message sent successfully!');
      setFormData({ message: '', budget: '', reason: '' });
    } catch (error) {
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h1 className="text-2xl font-bold">Contact Me</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="" disabled>
            Select Budget
          </option>
          {budgetOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="" disabled>
            Select Reason
          </option>
          {contactReasons.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
