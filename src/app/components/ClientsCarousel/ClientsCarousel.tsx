//src/app/components/ClientsCarousel/ClientsCarousel.tsx

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { clientsData } from '../../../data/clients';

export default function ClientsCarousel() {
  return (
    <section
      id="clients"
      className="w-full grid place-items-center py-4 backdrop-blur-md rounded-xl text-center border text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
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
              className="absolute bottom-0 left-0 h-[2px] bg-zinc-800 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
              aria-hidden="true"
            />
          </motion.a>
        ))}
      </Marquee>
    </section>
  );
}
