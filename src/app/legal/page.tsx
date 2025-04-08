//src/app/legal/page.tsx

'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { legal } from '../../data/legal';

const sections = legal;

export default function LegalPage() {
  const sectionList = useMemo(() => sections, []);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    sectionList.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionList]);

  return (
    <div className="grid gap-6">
      <nav aria-label="Table of Contents" className="grid gap-2">
        <h2 className="text-xl font-semibold text-primary-900 dark:text-secondary-50 m-0">
          Contents
        </h2>
        <ul className="grid gap-2 text-primary-900 dark:text-secondary-50 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-auto">
          {sectionList.map(({ id, title }) => (
            <li key={id} className="m-0">
              <Link href={`#${id}`} scroll={true}>
                <span
                  className={`transition cursor-pointer ${
                    activeSection === id
                      ? 'font-semibold underline text-primary-600 dark:text-secondary-300'
                      : 'hover:text-primary-200 dark:hover:text-secondary-700'
                  }`}
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
            <h2 className="text-2xl font-semibold text-primary-900 dark:text-secondary-50 m-0">
              {title}
            </h2>
            <p className="text-primary-700 dark:text-secondary-200 m-0">
              {content}
            </p>
          </section>
        ))}
      </main>
    </div>
  );
}
