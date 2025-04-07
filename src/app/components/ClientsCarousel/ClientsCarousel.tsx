// src/app/components/ClientsCarousel/ClientsCarousel.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { clientsData } from '@/data/clients';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ClientsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered || !containerRef.current) return;

    const interval = setInterval(() => {
      const container = containerRef.current;
      const child = container?.children[0] as HTMLElement;
      if (container && child) {
        const scrollAmount = child.offsetWidth + 16;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

        // Loop back to start if end is reached
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 1
        ) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 2000); // scroll every 2s

    return () => clearInterval(interval);
  }, [isHovered]);

  // Manual scroll
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children);
      const scrollAmount =
        (children[0] as HTMLElement)?.offsetWidth + 16 || 100;
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
      {/* Buttons on hover */}
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

      {/* Scrollable container */}
      <section id="clients" className="w-full overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scrollbar-none px-8 py-4 scroll-smooth"
        >
          {clientsData.map(({ name, url }) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 whitespace-nowrap bg-primary-100 text-primary-900 dark:bg-secondary-700 dark:text-secondary-50 text-sm px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-200"
              aria-label={`Client: ${name}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {name}
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}
