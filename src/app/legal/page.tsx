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
      {/* Table of Contents */}
      <nav aria-label="Table of Contents" className="grid gap-2">
        <h2 className="text-xl font-semibold dark:text-white">Contents</h2>
        <ul className="grid text-zinc-700 dark:text-zinc-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-auto gap-2">
          {sectionList.map(({ id, title }) => (
            <li key={id}>
              <Link href={`#${id}`} scroll={true}>
                <span
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200  transition cursor-pointer"
                  onClick={() => setActiveSection(id)}
                >
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <hr />

      {/* Sections */}
      <main className="grid gap-4">
        {sectionList.map(({ id, title, content }) => (
          <section
            key={id}
            id={id}
            className={`grid gap-2 p-4 text-sm border dark:border-light rounded-xl transition text-black dark:text-white ${
              activeSection === id
                ? 'bg-zinc-300 dark:bg-zinc-700'
                : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'
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
