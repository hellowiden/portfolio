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
        light: {
          zinc: {
            100: '#F4F4F5',
            200: '#E4E4E7',
            300: '#D4D4D8',
          },
          green: {
            DEFAULT: '#16A34A',
            500: '#16A34A',
          },
          border: '#E4E4E74D',
        },
        dark: {
          zinc: {
            700: '#3F3F46',
            800: '#27272A',
            900: '#18181B',
          },
          green: {
            DEFAULT: '#11833D',
            600: '#11833D',
          },
          border: '#E4E4E74D',
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
