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
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },
        green: {
          DEFAULT: '#16A34A',
          500: '#16A34A',
          600: '#11833D',
        },
      },
      borderColor: {
        light: '#E4E4E74D',
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
