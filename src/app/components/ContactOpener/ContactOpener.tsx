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
      className="bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm border dark:border-light rounded-xl bg-cover bg-center overflow-hidden relative grid h-[300px] place-items-center"
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

      <div className="bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm p-6 text-zinc-900 dark:text-white flex flex-col items-center justify-center gap-4 col-start-1 row-start-1 w-full h-full text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white z-10">
          Get in Touch
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="opacity-80 tracking-wide max-w-[900px] text-zinc-700 dark:text-zinc-300 text-lg"
        >
          {isHovered
            ? 'Reach out to discuss projects, collaborations, or any inquiries.'
            : 'Hover to see more details.'}
        </motion.p>

        <motion.button
          onClick={() => router.push('/contact')}
          aria-label="Contact Me"
          className="flex items-center gap-2 p-3 text-sm border rounded transition backdrop-blur-md bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiMail className="text-lg" />
          <span>Contact Me</span>
        </motion.button>
      </div>
    </section>
  );
}
