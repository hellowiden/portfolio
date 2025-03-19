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
      className="bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm border dark:border-light rounded-xl bg-cover bg-center overflow-hidden relative grid h-[300px] md:h-[300px] lg:h-[300px] place-items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="/issues.jpg"
        alt="Get in Touch"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover w-full h-full col-start-1 row-start-1"
        priority
      />

      <div className="bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm p-6 text-zinc-900 dark:text-white grid gap-4 col-start-1 row-start-1 w-full h-full text-center place-items-center">
        {isHovered ? (
          <>
            <div className="grid grid-cols-[1fr_auto] items-center w-full max-w-[900px]">
              <h1 className="text-xl font-medium text-black dark:text-black">
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
              <h2 className="text-2xl font-bold text-black dark:text-black">
                Let&apos;s Connect
              </h2>
              <p className="opacity-80 tracking-wide max-w-[900px] text-zinc-700 dark:text-zinc-300">
                Reach out to discuss projects, collaborations, or any inquiries.
              </p>
            </div>
          </>
        ) : (
          <h1 className="underline underline-offset-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Get in Touch
          </h1>
        )}
      </div>
    </section>
  );
}
