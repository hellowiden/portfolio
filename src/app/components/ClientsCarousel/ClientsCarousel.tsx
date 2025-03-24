// src/app/components/ClientsCarousel/ClientsCarousel.tsx

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { clientsData } from '@/data/clients';

export default function ClientsCarousel() {
  return (
    <section
      id="clients"
      className="w-full grid place-items-center py-4 text-center border border-[#E3E3E3] dark:border-[#292929] backdrop-blur-md bg-[#FFFFFF] dark:bg-[#121212] text-[#121212] dark:text-[#FFFFFF] rounded"
    >
      <Marquee gradient={false} speed={50}>
        <div className="flex gap-4">
          {clientsData.map(({ name, url }) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group whitespace-nowrap bg-[#E3E3E3] text-[#7F7F7F] dark:bg-[#292929] dark:text-[#FFFFFF] text-sm px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7F7F7F]"
              aria-label={`Client: ${name}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {name}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-[#7F7F7F]"
                aria-hidden="true"
              />
            </motion.a>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
