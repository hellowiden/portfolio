//src/app/components/ThemeSwitch/ThemeSwitch.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/theme-context';
import { FiMoon, FiSun } from 'react-icons/fi';
import Button from '../Button/Button';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const isLight = theme === 'light';

  return (
    <Button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle theme"
      variant="ghost"
      size="sm"
      className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2"
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
      <span className="inline">{isLight ? 'Light Mode' : 'Dark Mode'}</span>
    </Button>
  );
}
