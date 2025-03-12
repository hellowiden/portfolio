//src/app/legal/page.tsx

'use client';

import { useState } from 'react';

const sections = [
  {
    id: 'legal-terms',
    title: 'Legal Terms',
    content:
      'By accessing or using this website, you agree to comply with all applicable laws and regulations. Unauthorized activities, including hacking, data scraping, or other misuse, are prohibited and may result in legal consequences.',
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    content:
      'We respect your privacy and are committed to protecting it. Information such as IP addresses, browser details, visited pages, and timestamps is collected to monitor performance, improve user experience, and ensure security. We do not share your information with third parties except when required by law.',
  },
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    content:
      'By using this website, you agree to the terms and conditions outlined here. Prohibited activities or posting content that violates laws may result in suspension or termination of your access.',
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution',
    content:
      'Any disputes arising from the use of this website will be governed by the laws of the State of New York. Disputes must be resolved through binding arbitration, and users waive the right to participate in class-action lawsuits.',
  },
  {
    id: 'limitation-liability',
    title: 'Limitation of Liability',
    content:
      'The Service Provider is not responsible for damages, including loss of profits or data, resulting from the use of this website. Liability is limited to the amount paid for services, where applicable.',
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    content:
      'You agree to indemnify and hold the Service Provider harmless from any claims, damages, or losses arising from your use of the website or your breach of these terms.',
  },
  {
    id: 'termination',
    title: 'Termination',
    content:
      'The Service Provider may terminate accounts or restrict access at its sole discretion, especially in cases of non-compliance with these terms.',
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    content:
      'This website may include links to third-party services for your convenience. We are not responsible for the accuracy, content, or reliability of external websites or services.',
  },
  {
    id: 'cookie-policy',
    title: 'Cookie Policy',
    content:
      'We use cookies to enhance website functionality, analyze site performance, and improve your experience. By continuing to use this website, you agree to our use of cookies as described in our Cookie Policy.',
  },
  {
    id: 'accessibility',
    title: 'Accessibility Statement',
    content:
      'We are committed to making this website accessible to all users. If you encounter any barriers, please contact us so we can assist you and address the issue promptly.',
  },
  {
    id: 'data-retention',
    title: 'Data Retention Policy',
    content:
      'We retain user data only for as long as necessary to fulfill its intended purpose. Data is securely stored and regularly reviewed for deletion. If you wish to have your data deleted, please contact our support team.',
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content:
      'All content on this website, including text, images, and code, is protected under intellectual property laws. Unauthorized use, reproduction, or distribution is prohibited.',
  },
  {
    id: 'modifications',
    title: 'Modifications to the Agreement',
    content:
      'We may update these terms at any time. Continued use of the website after changes are made indicates your acceptance of the revised terms.',
  },
  {
    id: 'contact',
    title: 'Responsible Publisher',
    content:
      'The responsible publisher for this website is Marcus Widén. For inquiries, please contact us using the information provided on this website.',
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
