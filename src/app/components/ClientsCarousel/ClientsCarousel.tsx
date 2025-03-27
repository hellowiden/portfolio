// src/app/components/ClientsCarousel/ClientsCarousel.tsx

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { clientsData } from '@/data/clients';

export default function ClientsCarousel() {
  return (
    <section
      id="clients"
      className="w-full grid place-items-center py-4 text-center border border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-50 dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 rounded"
    >
      <Marquee gradient={false} speed={50}>
        <div className="flex gap-4">
          {clientsData.map(({ name, url }, index) => {
            const isLast = index === clientsData.length - 1;
            return (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group whitespace-nowrap bg-primary-100 text-primary-900 dark:bg-secondary-700 dark:text-secondary-50 text-sm px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                  isLast ? 'mr-4' : ''
                }`}
                aria-label={`Client: ${name}`}
                whileHover={{ scale: 1.05 }}
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
