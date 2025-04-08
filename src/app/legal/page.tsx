//src/app/legal/page.tsx

'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { legal } from '../../data/legal';
import { motion } from 'framer-motion';

const sections = legal;

export default function LegalPage() {
  const sectionList = useMemo(() => sections, []);

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
                <span className="hover:text-primary-200 dark:hover:text-secondary-700 transition cursor-pointer">
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <hr className="border-primary-200 dark:border-secondary-700" />

      <main className="grid gap-6">
        {sectionList.map(({ id, title, content }) => (
          <motion.section
            key={id}
            id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3 }}
            className="grid gap-2 p-4 text-sm border rounded-xl text-primary-900 dark:text-secondary-50 border-primary-200 dark:border-secondary-700 hover:bg-primary-100 dark:hover:bg-secondary-800"
          >
            <h2 className="text-2xl font-semibold text-primary-900 dark:text-secondary-50 m-0">
              {title}
            </h2>
            <p className="text-primary-700 dark:text-secondary-200 m-0">
              {content}
            </p>
          </motion.section>
        ))}
      </main>
    </div>
  );
}
