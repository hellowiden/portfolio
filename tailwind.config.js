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
        zinc: {
          200: '#E4E4E7',
          300: '#D4D4D8',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
        },
        green: {
          DEFAULT: '#16A34A',
          500: '#16A34A',
          600: '#11833D',
          700: '#0D672F',
        },
        red: {
          500: '#D95254',
          600: '#D95254',
        },
      },
      borderColor: {
        light: '#E4E4E74D',
        dark: '#18181B4D',
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
