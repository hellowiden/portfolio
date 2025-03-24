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
        primary: {
          50: '#FFFFFF',
          100: '#F1F1F1',
          200: '#E3E3E3',
          900: '#121212',
        },
        secondary: {
          50: '#FFFFFF',
          300: '#7F7F7F',
          700: '#292929',
          900: '#121212',
        },
        accentPrimary: {
          100: '#A8EDBF',
          500: '#16A34A',
        },
        accentSecondary: {
          700: '#0D672F',
          900: '#063A1A',
        },
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default tailwindConfig;
