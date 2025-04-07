// src/app/components/ClientsCarousel/ClientsCarousel.tsx

'use client';

import { useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { clientsData } from '@/data/clients';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ClientsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children);
      const scrollAmount = children[0]?.clientWidth + 16 || 100;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Buttons OUTSIDE the section */}
      {isHovered && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-secondary-700 p-2 rounded-full shadow hover:scale-105 transition"
            aria-label="Scroll left"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-secondary-700 p-2 rounded-full shadow hover:scale-105 transition"
            aria-label="Scroll right"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Marquee Section */}
      <section
        id="clients"
        className="w-full grid place-items-center py-4 text-center border border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-50 dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 rounded hover:ring-1 hover:ring-primary-300 dark:hover:ring-offset-2 hover:ring-offset-2"
      >
        <Marquee gradient={false} speed={50} pauseOnHover={true}>
          <div ref={containerRef} className="flex gap-4 px-8">
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
    </div>
  );
}
