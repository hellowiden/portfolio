'use client';

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { clientsData } from './../../../data/clients';

export default function ClientBanner() {
  return (
    <section
      id="clients"
      className="w-full border rounded-md text-center py-4 border-light dark:border-dark dark:bg-black relative"
    >
      <div className="w-full overflow-hidden">
        <Marquee gradient={false} speed={50}>
          {clientsData.map((client, index) => (
            <motion.a
              key={`client-${index}`}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-4 font-medium text-black dark:text-white relative group"
              aria-label={`Client: ${client.name}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {client.name}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-light w-0 group-hover:w-full"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
