'use client';

import { useEffect, useState, useRef } from 'react';
import { sendEmail } from './../../../email/actions/EmailHandler';
import SubmitBtn from './submitButton';
import toast from 'react-hot-toast';

const budgetOptions = [
  { value: 'under_100', label: 'Under $100' },
  { value: '100_500', label: '$100 - $500' },
  { value: '500_1000', label: '$500 - $1000' },
  { value: '1000_plus', label: 'Over $1000' },
] as const;

const contactReasons = [
  { value: 'job_offer', label: 'Job Offers' },
  { value: 'issues', label: 'Issues' },
  { value: 'general', label: 'General Conversations' },
] as const;

type DropdownType = 'budget' | 'contact';

export default function ContactForm() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observedElement = ref.current;
    if (!observedElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('Contact section is in view');
        }
      },
      { threshold: 0.75 }
    );

    observer.observe(observedElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const [formState, setFormState] = useState({
    selectedBudget: '',
    selectedContactReason: '',
    activeDropdown: null as DropdownType | null,
  });

  const toggleDropdown = (dropdown: DropdownType) => {
    setFormState((prev) => ({
      ...prev,
      activeDropdown: prev.activeDropdown === dropdown ? null : dropdown,
    }));
  };

  const handleFormSubmit = async (formData: FormData) => {
    if (!formState.selectedContactReason) {
      toast.error('Please select a contact reason.');
      return;
    }
    if (!formState.selectedBudget) {
      toast.error('Please select your budget.');
      return;
    }

    formData.append('Contact Reason', formState.selectedContactReason);
    formData.append('Budget', formState.selectedBudget);

    try {
      const { error } = await sendEmail(formData);
      error ? toast.error(error) : toast.success('Email sent successfully!');
    } catch {
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <section id="contact" ref={ref} className="w-full grid gap-4 text-center">
      <h1 className="text-3xl font-medium">Questions? Let’s connect</h1>
      <p className="mb-6">
        I’d love to hear from you! Feel free to reach out to me directly at
        <a
          className="px-1 py-1 font-sm transition rounded-md border border-light dark:border-dark bg-white dark:bg-black text-black dark:text-white"
          href="tel:+1234567890"
        >
          +46 (0)73 656 3171
        </a>
        or through this form.
      </p>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit(new FormData(e.target as HTMLFormElement));
        }}
      >
        <input
          className="bg-white w-full h-14 px-4 rounded-md text-sm border border-light dark:border-dark dark:bg-black dark:text-white placeholder-light dark:placeholder-dark focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          name="senderEmail"
          type="email"
          required
          placeholder="Your email"
        />
        {[
          {
            options: contactReasons,
            key: 'selectedContactReason' as const,
            type: 'contact' as const,
          },
          {
            options: budgetOptions,
            key: 'selectedBudget' as const,
            type: 'budget' as const,
          },
        ].map(({ options, key, type }) => {
          const selectedLabel =
            options.find((option) => option.value === formState[key])?.label ||
            'Please select an option';
          return (
            <div key={type} className="relative w-full">
              <div
                onClick={() => toggleDropdown(type)}
                className={`bg-white h-14 px-4 rounded-md text-sm border ${
                  !formState[key]
                    ? 'border-red-500 text-red-500'
                    : 'border-light text-black dark:text-white'
                } dark:border-dark dark:bg-black flex items-center justify-between cursor-pointer`}
              >
                {selectedLabel}
                <svg
                  className="w-5 h-5 text-light dark:text-dark"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      formState.activeDropdown === type
                        ? 'M5 15l7-7 7 7'
                        : 'M5 9l7 7 7-7'
                    }
                  />
                </svg>
              </div>
            </div>
          );
        })}
        <textarea
          className="bg-white w-full h-52 rounded-md text-sm border border-light dark:border-dark p-4 dark:bg-black dark:text-white placeholder-light dark:placeholder-dark focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          name="message"
          required
          placeholder="Your message"
        />
        <SubmitBtn />
      </form>
    </section>
  );
}
