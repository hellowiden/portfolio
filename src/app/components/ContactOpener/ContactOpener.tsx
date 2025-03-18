//src/app/components/ContactOpener/ContactOpener.tsx

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

export default function ContactOpener() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="border dark:border-light rounded-xl bg-cover bg-center overflow-hidden relative grid h-[250px] "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="/issues.jpg"
        alt="Get in Touch"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="absolute inset-0 object-cover"
        priority
      />

      <h1 className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold text-white">
        Get in Touch
      </h1>

      {isHovered && (
        <div className="absolute inset-0 bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm p-6 text-zinc-900 dark:text-white grid gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
              Get in Touch
            </h1>

            <button
              onClick={() => router.push('/contact')}
              aria-label="Contact Me"
              className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition backdrop-blur-md bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
            >
              <motion.div
                key="contact"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiMail className="text-lg" />
              </motion.div>
              <span className="hidden sm:inline">Contact Me</span>
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Let&apos;s Connect
            </h2>
            <p className="opacity-80 tracking-wide max-w-[900px] text-zinc-700 dark:text-zinc-300">
              Reach out to discuss projects, collaborations, or any inquiries.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
