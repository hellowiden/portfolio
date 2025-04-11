// src/app/components/ClientsCarousel/ClientsCarousel.tsx

'use client';

import Marquee from 'react-fast-marquee';
import { motion, useReducedMotion } from 'framer-motion';
import { clientsData } from '@/data/clients';

export default function ClientsCarousel() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="clients"
      aria-label="Client showcase"
      className="w-full grid place-items-center py-4 text-center border border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-50 dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 rounded hover:ring-1 hover:ring-primary-300 dark:hover:ring-offset-2 hover:ring-offset-2"
    >
      <Marquee gradient={false} speed={50} pauseOnHover pauseOnClick>
        <div className="flex gap-4">
          {clientsData.map(({ name, url }, index) => {
            const isLast = index === clientsData.length - 1;
            return (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group whitespace-nowrap bg-primary-100 text-primary-900 dark:bg-secondary-700 dark:text-secondary-50 text-sm px-2 py-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  isLast ? 'mr-4' : ''
                }`}
                aria-label={`Client: ${name}`}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {name}
              </motion.a>
            );
          })}
        </div>
      </Marquee>
    </section>
  );
}
