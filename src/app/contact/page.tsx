//src/app/contact/page.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';

import { Check, ChevronDown } from 'lucide-react';

const budgetOptions = [
  { value: 'under_3000', label: 'Under $3,000' },
  { value: '3000_4500', label: '$3,000 - $4,500' },
  { value: '4500_6000', label: '$4,500 - $6,000' },
  { value: '6000_8000', label: '$6,000 - $8,000' },
  { value: '8000_plus', label: 'Over $8,000' },
];

const contactReasons = [
  { value: 'job_offer', label: 'Job Offers' },
  { value: 'issues', label: 'Issues' },
  { value: 'general', label: 'General Conversations' },
];

const placeholders: { [key: string]: string } = {
  job_offer: 'Tell me about the role, requirements, and expectations.',
  issues: 'Describe the issue in detail so I can assist you better.',
  general: 'What’s on your mind? Feel free to share your thoughts.',
};

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
      <h1 className="text-2xl text-center font-bold text-zinc-900 dark:text-white">
        {title}
      </h1>
      {children}
    </motion.div>
  );
}

function CustomDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="grid gap-2 p-2">
        <ListboxButton className="w-full grid grid-cols-[1fr_auto] items-start p-3 border border-light dark:border-dark rounded-xl bg-white dark:bg-zinc-800 text-black dark:text-white">
          <span>
            {selectedOption ? selectedOption.label : 'Select an Option'}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </ListboxButton>

        <ListboxOptions className="w-full bg-white dark:bg-zinc-800 border border-light dark:border-dark rounded-xl grid gap-1 p-2">
          {options.map((option, index) => (
            <div key={option.value}>
              <ListboxOption
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `p-2 cursor-pointer grid ${
                    active
                      ? 'bg-green-500 text-white'
                      : 'text-black dark:text-white'
                  }`
                }
              >
                {({ selected }) => (
                  <div className="grid grid-cols-[1fr_auto] items-start p-2 rounded-xl">
                    <span>{option.label}</span>
                    {selected && (
                      <Check className="w-4 h-4 text-green-500 rounded-xl" />
                    )}
                  </div>
                )}
              </ListboxOption>
              {index < options.length - 1 && (
                <hr className="border-gray-300 dark:border-gray-700" />
              )}
            </div>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

function CustomInput({
  name,
  value,
  onChange,
  placeholder,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative mt-4">
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border border-light dark:border-dark rounded bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
      />
    </div>
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

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
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
      if (!res.ok)
        throw new Error(responseData.error || 'Failed to send message');

      setStatus('Message sent successfully!');
      setFormData({ message: '', budget: '', reason: '' });
      setStep(1);
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : 'An unknown error occurred.'
      );
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 border dark:border-light rounded-xl">
      {step === 1 && (
        <Step title="Let's Start - What Brings You Here?">
          <CustomDropdown
            value={formData.reason}
            options={contactReasons}
            onChange={(value) => handleChange('reason', value)}
          />
          <button
            onClick={() => setStep(2)}
            disabled={!formData.reason}
            className="mt-4 p-2 bg-green-500 dark:bg-green-400 text-center text-white rounded w-full"
          >
            Next
          </button>
        </Step>
      )}

      {step === 2 && formData.reason === 'job_offer' && (
        <Step title="Great! Let's Talk Budget">
          <CustomDropdown
            value={formData.budget}
            options={budgetOptions}
            onChange={(value) => handleChange('budget', value)}
          />
          <button
            onClick={() => setStep(3)}
            disabled={!formData.budget}
            className="mt-4 p-2 bg-green-500 dark:bg-green-400 text-white rounded w-full"
          >
            Next
          </button>
        </Step>
      )}

      {((step === 2 && formData.reason !== 'job_offer') || step === 3) && (
        <Step title="Tell Me More">
          <CustomInput
            name="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder={
              placeholders[formData.reason] || 'Enter your message...'
            }
          />

          <button
            onClick={() => setStep(4)}
            disabled={!formData.message}
            className="mt-4 p-2 bg-green-500 dark:bg-green-400 text-white rounded w-full"
          >
            Next
          </button>
        </Step>
      )}

      {step === 4 && (
        <Step title="Ready to Submit?">
          <button
            onClick={handleSubmit}
            className="mt-4 p-2 bg-green-500 dark:bg-green-400 text-white rounded w-full"
          >
            Send
          </button>
        </Step>
      )}

      {status && (
        <p className="mt-2 text-sm text-zinc-900 dark:text-zinc-100">
          {status}
        </p>
      )}
      {step > 1 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mb-4 p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded w-full"
        >
          Back
        </button>
      )}
    </div>
  );
}
