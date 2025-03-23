// src/app/components/ClientsCarousel/ClientsCarousel.tsx

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { clientsData } from '@/data/clients';

export default function ClientsCarousel() {
  return (
    <section
      id="clients"
      className="w-full grid place-items-center py-4 text-center border border-zinc-300 dark:border-zinc-700 backdrop-blur-md bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded"
    >
      <Marquee gradient={false} speed={50}>
        <div className="flex gap-4">
          {clientsData.map(({ name, url }) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group whitespace-nowrap bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 text-sm px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label={`Client: ${name}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {name}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                aria-hidden="true"
              />
            </motion.a>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
