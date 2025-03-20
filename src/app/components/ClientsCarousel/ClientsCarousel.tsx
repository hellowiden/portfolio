//src/app/components/ClientsCarousel/ClientsCarousel.tsx

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { clientsData } from '../../../data/clients';

export default function ClientsCarousel() {
  return (
    <section
      id="clients"
      className="w-full grid place-items-center py-4 backdrop-blur-md text-center border border-zinc-300 dark:border-zinc-700 rounded"
    >
      <Marquee
        gradient={false}
        speed={50}
        className="grid grid-flow-col auto-cols-max gap-2"
      >
        {clientsData.map(({ name, url }) => (
          <motion.a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium relative group px-4 whitespace-nowrap"
            aria-label={`Client: ${name}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {name}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-zinc-800 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              aria-hidden="true"
            />
          </motion.a>
        ))}
      </Marquee>
    </section>
  );
}
