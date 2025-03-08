import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { clientsData } from '../../../data/clients';

export default function ClientBanner() {
  return (
    <section
      id="clients"
      className="w-full items-center border rounded text-center py-4 border-light dark:border-50 dark:bg-50 relative sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24"
    >
      <div className="w-full overflow-hidden">
        <Marquee gradient={false} speed={50}>
          {clientsData.map(({ name, url }, index) => (
            <motion.a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-4 font-medium text-black dark:text-white relative group whitespace-nowrap"
              aria-label={`Client: ${name}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {name}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-light w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                aria-hidden="true"
              />
            </motion.a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
