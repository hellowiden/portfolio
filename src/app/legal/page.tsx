'use client';

import { useState } from 'react';

const sections = [
  { id: 'legal-terms', title: 'Legal Terms', content: 'By accessing...' },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    content: 'We are committed...',
  },
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    content: 'Use of this website...',
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution',
    content: 'All disputes...',
  },
  {
    id: 'limitation-liability',
    title: 'Limitation of Liability',
    content: 'The Service Provider...',
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    content: 'Users agree to indemnify...',
  },
  {
    id: 'termination',
    title: 'Termination',
    content: 'The Service Provider reserves...',
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    content: 'This website may contain...',
  },
  {
    id: 'cookie-policy',
    title: 'Cookie Policy',
    content: 'Cookies are used to enhance...',
  },
  {
    id: 'accessibility',
    title: 'Accessibility Statement',
    content: 'We strive to make this...',
  },
  {
    id: 'data-retention',
    title: 'Data Retention Policy',
    content: 'User data is retained...',
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: 'All website content...',
  },
  {
    id: 'modifications',
    title: 'Modifications to the Agreement',
    content: 'We reserve the right...',
  },
  {
    id: 'contact',
    title: 'Responsible Publisher',
    content: 'The responsible publisher...',
  },
];

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState('');

  return (
    <div className="grid gap-6">
      <nav aria-label="Table of Contents" className="grid gap-2">
        <h2 className="text-xl font-semibold dark:text-white">Contents</h2>
        <ul className="grid text-zinc-700 dark:text-zinc-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-auto gap-2">
          {sections.map(({ id, title }) => (
            <li key={id}>
              <a
                className={`text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 px-2 py-1 rounded-md transition`}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(id);
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <hr />

      <main className="grid gap-4">
        {sections.map(({ id, title, content }) => (
          <section
            key={id}
            id={id}
            className={`grid gap-2 p-4 text-sm border rounded-xl transition text-black dark:text-white ${
              activeSection === id
                ? 'bg-zinc-300 dark:bg-zinc-700'
                : 'hover:bg-zinc-200 dark:hover:bg-zinc-600'
            }`}
          >
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
              {title}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300">{content}</p>
          </section>
        ))}
      </main>
    </div>
  );
}
