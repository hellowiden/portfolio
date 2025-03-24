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

const buttonClass =
  'grid grid-cols-[auto_1fr] items-center p-2 border border-zinc-300 dark:text-white dark:border-zinc-600 text-sm text-zinc-100 bg-zinc-700 hover:bg-zinc-800 dark:bg-green-600 dark:hover:bg-green-500 rounded transition disabled:opacity-50 focus:outline-none focus:ring-0';

function getPlaceholder(reason: string) {
  return placeholders[reason] || 'Enter your message...';
}

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
      className="grid gap-4 p-0"
    >
      <h1 className="text-2xl text-center font-bold text-zinc-900 dark:text-white p-0">
        {title}
      </h1>
      <div className="grid gap-4 p-0">{children}</div>
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
      <div className="grid gap-2 p-0">
        <ListboxButton className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition text-gray-900 bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-gray-100 dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600 focus:outline-none focus:ring-0">
          <span className="truncate">
            {selectedOption ? selectedOption.label : 'Select an Option'}
          </span>
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 justify-self-end" />
        </ListboxButton>

        <ListboxOptions className="w-full bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-zinc-300 dark:border-zinc-600 rounded shadow-md grid gap-1 p-1">
          {options.map((option, index) => (
            <div key={option.value} className="grid p-0">
              <ListboxOption
                value={option.value}
                className={({ active }) =>
                  `p-2 cursor-pointer grid rounded transition ${
                    active
                      ? 'bg-zinc-200 text-gray-900 dark:bg-zinc-700 dark:text-gray-100'
                      : 'text-gray-900 dark:text-gray-100'
                  }`
                }
              >
                {({ selected }) => (
                  <div className="grid grid-cols-[1fr_auto] items-center p-2 rounded">
                    <span>{option.label}</span>
                    {selected && <Check className="w-4 h-4 text-green-500" />}
                  </div>
                )}
              </ListboxOption>
              {index < options.length - 1 && (
                <hr className="border-zinc-300 dark:border-zinc-600" />
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
    <div className="grid p-0 gap-0">
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border border-light dark:border-dark rounded bg-white dark:bg-zinc-800 text-black dark:text-white outline-none focus:outline-none focus:ring-0"
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
    <div className="grid gap-4 bg-white dark:bg-zinc-900 p-6 border dark:border-light rounded">
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
            className={buttonClass}
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
            className={buttonClass}
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
            placeholder={getPlaceholder(formData.reason)}
          />
          <button
            onClick={() => setStep(4)}
            disabled={!formData.message}
            className={buttonClass}
          >
            Next
          </button>
        </Step>
      )}

      {step === 4 && (
        <Step title="Ready to Submit?">
          <button onClick={handleSubmit} className={buttonClass}>
            Send
          </button>
        </Step>
      )}

      {status && (
        <p className="text-sm text-zinc-900 dark:text-zinc-100 p-0">{status}</p>
      )}

      {step > 1 && (
        <button onClick={() => setStep(step - 1)} className={buttonClass}>
          Back
        </button>
      )}
    </div>
  );
}
