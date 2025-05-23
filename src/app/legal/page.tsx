//src/app/legal/page.tsx

'use client';

import { motion } from 'framer-motion';
import { legal } from '../../data/legal';
import { useLegalContext } from '@/context/LegalContext';

export default function LegalPage() {
  const { activeIndex, setActiveIndex } = useLegalContext();
  const { id, title, content } = legal[activeIndex];

  return (
    <div className="grid gap-6">
      <nav aria-label="Table of Contents" className="grid gap-2">
        <h2 className="text-xl font-semibold text-primary-900 dark:text-secondary-50 m-0">
          Contents
        </h2>
        <ul className="grid gap-2 text-primary-900 dark:text-secondary-50 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-auto">
          {legal.map((section, index) => (
            <li key={section.id} className="m-0">
              <button
                onClick={() => setActiveIndex(index)}
                className="hover:text-primary-200 dark:hover:text-secondary-700 transition cursor-pointer bg-transparent border-none p-0 text-left"
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <hr className="border-primary-200 dark:border-secondary-700" />

      <motion.section
        key={id}
        id={id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-2 p-4 text-sm border rounded-xl text-primary-900 dark:text-secondary-50 border-primary-200 dark:border-secondary-700 bg-primary-100 dark:bg-secondary-800"
      >
        <h2 className="text-2xl font-semibold text-primary-900 dark:text-secondary-50 m-0">
          {title}
        </h2>
        <p className="text-primary-700 dark:text-secondary-200 m-0">
          {content}
        </p>
      </motion.section>
    </div>
  );
}
