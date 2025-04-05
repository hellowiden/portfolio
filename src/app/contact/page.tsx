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
import Button from '../components/Button/Button';

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
      <h1 className="text-2xl text-center font-bold text-primary-900 dark:text-secondary-50 p-0">
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
        <ListboxButton className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition focus:outline-none focus:ring-0 bg-primary-100 text-primary-900 border-primary-200 dark:bg-secondary-700 dark:text-secondary-50 dark:border-secondary-700">
          <span className="truncate">
            {selectedOption ? selectedOption.label : 'Select an Option'}
          </span>
          <ChevronDown className="w-5 h-5 text-primary-900 dark:text-secondary-50 justify-self-end" />
        </ListboxButton>

        <ListboxOptions className="w-full grid gap-1 p-1 bg-primary-50 text-primary-900 border border-primary-200 dark:bg-secondary-800 dark:text-secondary-50 dark:border-secondary-700 rounded shadow-md">
          {options.map((option, index) => (
            <div key={option.value} className="grid p-0">
              <ListboxOption
                value={option.value}
                className={({ active }) =>
                  `p-2 cursor-pointer grid rounded transition ${
                    active
                      ? 'bg-primary-200 text-primary-900 dark:bg-secondary-700 dark:text-secondary-50'
                      : 'text-primary-900 dark:text-secondary-50'
                  }`
                }
              >
                {({ selected }) => (
                  <div className="grid grid-cols-[1fr_auto] items-center p-2 rounded">
                    <span>{option.label}</span>
                    {selected && (
                      <Check className="w-4 h-4 text-primary-900 dark:text-secondary-50" />
                    )}
                  </div>
                )}
              </ListboxOption>
              {index < options.length - 1 && (
                <hr className="border-primary-200 dark:border-secondary-700" />
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
        className="w-full p-3 border rounded bg-primary-50 text-primary-900 border-primary-200 dark:bg-secondary-800 dark:text-secondary-50 dark:border-secondary-700 outline-none focus:outline-none focus:ring-0"
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
    <div className="grid gap-4 p-6 border rounded bg-primary-50 text-primary-900 border-primary-200 dark:bg-secondary-900 dark:text-secondary-50 dark:border-secondary-700">
      {step === 1 && (
        <Step title="Let's Start - What Brings You Here?">
          <CustomDropdown
            value={formData.reason}
            options={contactReasons}
            onChange={(value) => handleChange('reason', value)}
          />
          <Button
            onClick={() => setStep(2)}
            disabled={!formData.reason}
            variant="secondary"
            size="sm"
          >
            Next
          </Button>
        </Step>
      )}

      {step === 2 && formData.reason === 'job_offer' && (
        <Step title="Great! Let's Talk Budget">
          <CustomDropdown
            value={formData.budget}
            options={budgetOptions}
            onChange={(value) => handleChange('budget', value)}
          />
          <Button
            onClick={() => setStep(3)}
            disabled={!formData.budget}
            variant="secondary"
            size="sm"
          >
            Next
          </Button>
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
          <Button
            onClick={() => setStep(4)}
            disabled={!formData.message}
            variant="secondary"
            size="sm"
          >
            Next
          </Button>
        </Step>
      )}

      {step === 4 && (
        <Step title="Ready to Submit?">
          <Button onClick={handleSubmit} variant="secondary" size="sm">
            Send
          </Button>
        </Step>
      )}

      {status && (
        <p className="text-sm p-0 text-primary-900 dark:text-secondary-50">
          {status}
        </p>
      )}

      {step > 1 && (
        <Button onClick={() => setStep(step - 1)} variant="ghost" size="sm">
          Back
        </Button>
      )}
    </div>
  );
}
