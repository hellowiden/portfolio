//src/app/legal/layout.tsx

'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Button from '@/app/components/Button/Button';
import { legal } from '../../data/legal';
import { LegalProvider, useLegalContext } from '@/context/LegalContext';

function NavButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
}) {
  const isPrev = direction === 'prev';

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className="grid grid-cols-[auto_1fr] items-center text-sm sm:gap-2"
    >
      {isPrev && (
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <FaArrowLeft />
        </motion.div>
      )}
      <span className="hidden sm:inline">
        {isPrev ? 'Previous Section' : 'Next Section'}
      </span>
      {!isPrev && (
        <motion.div
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <FaArrowRight />
        </motion.div>
      )}
    </Button>
  );
}

function LegalLayoutContent({ children }: { children: ReactNode }) {
  const { activeIndex, setActiveIndex } = useLegalContext();
  const sectionIds = legal.map((s) => s.id);

  const scrollTo = (index: number) => {
    setActiveIndex(index);
    const id = sectionIds[index];
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="h-full container mx-auto border-x border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-50 dark:bg-secondary-900 text-primary-900 dark:text-secondary-50 flex flex-col">
      <header className="flex justify-between items-center p-4 border-b border-primary-200 dark:border-secondary-700 bg-primary-200 dark:bg-secondary-800">
        <h1 className="text-2xl font-bold">Legal Information</h1>
        <div className="grid grid-flow-col auto-cols-max gap-4">
          {activeIndex > 0 && (
            <NavButton
              direction="prev"
              onClick={() => scrollTo(activeIndex - 1)}
            />
          )}
          {activeIndex < sectionIds.length - 1 && (
            <NavButton
              direction="next"
              onClick={() => scrollTo(activeIndex + 1)}
            />
          )}
        </div>
      </header>

      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <LegalProvider>
      <LegalLayoutContent>{children}</LegalLayoutContent>
    </LegalProvider>
  );
}
