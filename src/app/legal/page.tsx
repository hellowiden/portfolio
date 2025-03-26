//src/app/legal/page.tsx

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { legal } from '../../data/legal';

const sections = legal;

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState('');

  const sectionList = useMemo(() => sections, []);

  return (
    <div className="grid gap-6">
      <nav aria-label="Table of Contents" className="grid gap-2">
        <h2 className="text-xl font-semibold text-primary-900 dark:text-secondary-50">
          Contents
        </h2>
        <ul className="grid text-primary-900 dark:text-secondary-50 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-auto gap-2">
          {sectionList.map(({ id, title }) => (
            <li key={id}>
              <Link href={`#${id}`} scroll={true}>
                <span
                  className="text-primary-900 dark:text-secondary-50 hover:text-primary-900 dark:hover:text-secondary-100 transition cursor-pointer"
                  onClick={() => setActiveSection(id)}
                >
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <hr className="border-primary-200 dark:border-secondary-700" />

      <main className="grid gap-4">
        {sectionList.map(({ id, title, content }) => (
          <section
            key={id}
            id={id}
            className={`grid gap-2 p-4 text-sm border rounded-xl transition text-primary-900 dark:text-secondary-50 border-primary-200 dark:border-secondary-700 ${
              activeSection === id
                ? 'bg-primary-200 dark:bg-secondary-700'
                : 'hover:bg-primary-100 dark:hover:bg-secondary-800'
            }`}
          >
            <h2 className="text-2xl font-semibold text-primary-900 dark:text-secondary-50">
              {title}
            </h2>
            <p className="text-primary-700 dark:text-secondary-200">
              {content}
            </p>
          </section>
        ))}
      </main>
    </div>
  );
}
