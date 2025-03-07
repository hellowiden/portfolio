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
      className={`flex items-center gap-2 rounded-md border px-2 py-1 text-sm transition
        ${
          isLight
            ? 'border-light bg-white text-black hover:bg-opacity-80'
            : 'border-dark bg-black text-white hover:bg-opacity-80'
        }`}
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
