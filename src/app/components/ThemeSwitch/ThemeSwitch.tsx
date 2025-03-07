'use client';

import { useTheme } from '@/context/theme-context';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="p-2 rounded-md border border-zinc-300 bg-zinc-200 dark:bg-zinc-800 dark:border-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-zinc-900" />
      ) : (
        <Sun className="w-5 h-5 text-zinc-100" />
      )}
    </button>
  );
}
