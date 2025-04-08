//src/app/legal/page.tsx

'use client';

import { useMemo, useContext } from 'react';
import Link from 'next/link';
import { legal } from '../../data/legal';
import { motion } from 'framer-motion';
import { LegalIndexContext } from './layout';

const sections = legal;

export default function LegalPage() {
  const sectionList = useMemo(() => sections, []);
  const activeIndex = useContext(LegalIndexContext);
  const activeSection = sectionList[activeIndex];

  return (
    <div className="grid gap-6">
      <nav aria-label="Table of Contents" className="grid gap-2">
        <h2 className="text-xl font-semibold text-primary-900 dark:text-secondary-50 m-0">
          Contents
        </h2>
        <ul className="grid gap-2 text-primary-900 dark:text-secondary-50 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-auto">
          {sectionList.map(({ id, title }, index) => (
            <li key={id} className="m-0">
              <Link href={`#${id}`} scroll={true}>
                <span
                  className={`transition cursor-pointer ${
                    index === activeIndex
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

      <main className="grid gap-6">
        <motion.section
          key={activeSection.id}
          id={activeSection.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-2 p-4 text-sm border rounded-xl text-primary-900 dark:text-secondary-50 border-primary-200 dark:border-secondary-700 bg-primary-200 dark:bg-secondary-700"
        >
          <h2 className="text-2xl font-semibold text-primary-900 dark:text-secondary-50 m-0">
            {activeSection.title}
          </h2>
          <p className="text-primary-700 dark:text-secondary-200 m-0">
            {activeSection.content}
          </p>
        </motion.section>
      </main>
    </div>
  );
}
