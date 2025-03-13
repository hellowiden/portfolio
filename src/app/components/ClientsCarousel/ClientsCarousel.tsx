//src/app/components/ClientsCarousel/ClientsCarousel.tsx

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { clientsData } from '../../../data/clients';

export default function ClientBanner() {
  return (
    <section
      id="clients"
      className="w-full grid place-items-center py-4 backdrop-blur-md  rounded-xl text-center relative border dark:border-light bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100"
    >
      <div className="w-full grid">
        <Marquee
          gradient={false}
          speed={50}
          className="grid grid-flow-col auto-cols-max gap-2"
        >
          {clientsData.map(({ name, url }, index) => (
            <div key={index} className="grid place-items-center px-4">
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium relative group whitespace-nowrap"
                aria-label={`Client: ${name}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {name}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-green w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                  aria-hidden="true"
                />
              </motion.a>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
