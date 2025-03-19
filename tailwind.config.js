/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          light: {
            background: '#27272A', // Slightly lighter dark
            foreground: '#FFFFFF', // White text
            border: '#3F3F46', // Soft dark border
          },
          dark: {
            background: '#18181B', // Deep dark
            foreground: '#FFFFFF', // Bright white text
            border: '#52525B', // Stronger dark border
          },
        },
        light: {
          light: {
            background: '#FFFFFF', // Pure white
            foreground: '#18181B', // Dark text
            border: '#E4E4E7', // Light gray border
          },
          dark: {
            background: '#F4F4F5', // Muted white
            foreground: '#27272A', // Deep gray text
            border: '#D4D4D8', // Soft gray border
          },
        },
        accent: {
          greenLight: '#42D08B', // Green accent for light theme
          greenDark: '#16A34A', // Green accent for dark theme
        },
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default tailwindConfig;
