'use client';

import { useState, useEffect } from 'react';
import Button from '../Button/Button';

interface EditMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: {
    _id: string;
    reason?: string;
    budget?: string;
    message: string;
  };
  onSave: (updated: {
    _id: string;
    reason?: string;
    budget?: string;
    message: string;
  }) => void;
}

const BUDGETS = [
  { value: 'under_3000', label: 'Under $3,000' },
  { value: '3000_4500', label: '$3,000 - $4,500' },
  { value: '4500_6000', label: '$4,500 - $6,000' },
  { value: '6000_8000', label: '$6,000 - $8,000' },
  { value: '8000_plus', label: '$8,000+' },
];

export default function EditMessageModal({
  isOpen,
  onClose,
  message,
  onSave,
}: EditMessageModalProps) {
  const [form, setForm] = useState({
    reason: '',
    budget: '',
    message: '',
    loading: false,
    error: '',
  });

  useEffect(() => {
    if (message) {
      setForm({
        reason: message.reason || '',
        budget: message.budget || '',
        message: message.message,
        loading: false,
        error: '',
      });
    }
  }, [message]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) {
      setForm((prev) => ({ ...prev, error: 'Message is required' }));
      return;
    }
    setForm((prev) => ({ ...prev, loading: true, error: '' }));
    onSave({
      _id: message._id,
      reason: form.reason,
      budget: form.budget,
      message: form.message,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-secondary-900 border border-primary-200 dark:border-secondary-700 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Message</h2>

        {form.error && (
          <p className="text-red-600 dark:text-red-400 mb-2">{form.error}</p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="reason"
            value={form.reason}
            disabled
            className="p-2 border rounded bg-gray-100 dark:bg-secondary-800 dark:border-secondary-700 text-gray-500 cursor-not-allowed"
          />

          {form.reason === 'job_offer' && (
            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="p-2 border rounded bg-primary-50 dark:bg-secondary-800 dark:border-secondary-700"
            >
              <option value="">Select budget</option>
              {BUDGETS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          )}

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Your message"
            className="p-2 border rounded bg-primary-50 dark:bg-secondary-800 dark:border-secondary-700"
          />

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose} variant="ghost" size="sm">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.loading}
              variant="secondary"
              size="sm"
            >
              {form.loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
