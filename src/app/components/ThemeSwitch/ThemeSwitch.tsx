//src/app/components/ThemeSwitch/ThemeSwitch.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/theme-context';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
    >
      <motion.div
        key={isHovered ? 'hover' : theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isHovered ? (
          isLight ? (
            <FiMoon className="text-lg" />
          ) : (
            <FiSun className="text-lg" />
          )
        ) : isLight ? (
          <FiSun className="text-lg" />
        ) : (
          <FiMoon className="text-lg" />
        )}
      </motion.div>
      <span className="hidden sm:inline">
        {isLight ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}
