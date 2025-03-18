//src/app/components/ContactOpener/ContactOpener.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

interface ContactOpenerProps {
  title?: string;
  description?: string;
}

export default function ContactOpener({
  title = 'Get in Touch',
  description = 'Reach out to discuss projects, collaborations, or any inquiries.',
}: ContactOpenerProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="border dark:border-light rounded-xl bg-cover bg-center overflow-hidden relative grid">
      <Image
        src="/issues.jpg"
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="absolute inset-0 object-cover"
        priority
      />

      <div className="relative bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm p-6 text-zinc-900 dark:text-white grid gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </h1>
          <Link href="/contact">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition backdrop-blur-md bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
            >
              <motion.div
                key={isHovered ? 'hover' : 'contact'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiMail className="text-lg" />
              </motion.div>
              <span className="hidden sm:inline">Contact Me</span>
            </button>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Let&apos;s Connect
          </h2>
          <p className="opacity-80 tracking-wide max-w-[900px] text-zinc-700 dark:text-zinc-300">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
