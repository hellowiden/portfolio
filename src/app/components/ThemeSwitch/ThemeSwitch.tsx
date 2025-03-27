//src/app/components/ThemeSwitch/ThemeSwitch.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/theme-context';
import { FiMoon, FiSun } from 'react-icons/fi';

const buttonBaseClasses =
  'grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 rounded transition \
   text-primary-900 hover:bg-primary-100 \
   dark:bg-secondary-800 dark:text-secondary-50';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle theme"
      className={buttonBaseClasses}
    >
      <motion.div
        key={isHovered ? 'hover' : theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isHovered ? (
          <FiMoon className="text-lg" />
        ) : (
          <FiSun className="text-lg" />
        )}
      </motion.div>
      <span className="hidden sm:inline">
        {isLight ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}
