//src/app/contact/page.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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

function Step({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </motion.div>
  );
}

function Dropdown({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="p-2 border rounded mt-4 w-full"
    >
      <option value="" disabled>
        Select an Option
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    message: '',
    budget: '',
    reason: '',
  });
  const [status, setStatus] = useState('');
  const [step, setStep] = useState(1);

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

      const responseData = await res.json();
      console.log('API Response:', responseData);
      if (!res.ok)
        throw new Error(responseData.error || 'Failed to send message');

      setStatus('Message sent successfully!');
      setFormData({ message: '', budget: '', reason: '' });
      setStep(1);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus(
        error instanceof Error ? error.message : 'An unknown error occurred.'
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      {step > 1 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mb-4 p-2 bg-gray-300 text-black rounded w-full"
        >
          Back
        </button>
      )}

      {step === 1 && (
        <Step title="Let's Start - What Brings You Here?">
          <Dropdown
            name="reason"
            value={formData.reason}
            options={contactReasons}
            onChange={handleChange}
          />
          <button
            onClick={() => setStep(2)}
            disabled={!formData.reason}
            className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
          >
            Next
          </button>
        </Step>
      )}

      {step === 2 && formData.reason === 'job_offer' && (
        <Step title="Great! Let's Talk Budget">
          <Dropdown
            name="budget"
            value={formData.budget}
            options={budgetOptions}
            onChange={handleChange}
          />
          <button
            onClick={() => setStep(3)}
            disabled={!formData.budget}
            className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
          >
            Next
          </button>
        </Step>
      )}

      {((step === 2 && formData.reason !== 'job_offer') || step === 3) && (
        <Step title="Tell Me More">
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="p-2 border rounded mt-4 w-full"
          />
          <button
            onClick={() => setStep(4)}
            disabled={!formData.message}
            className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
          >
            Next
          </button>
        </Step>
      )}

      {step === 4 && (
        <Step title="Ready to Submit?">
          <button
            onClick={handleSubmit}
            className="mt-4 p-2 bg-green-500 text-white rounded w-full"
          >
            Send
          </button>
        </Step>
      )}

      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
