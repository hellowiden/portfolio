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
          900: '#121212',
          800: '#191919',
          700: '#292929',
          50: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default tailwindConfig;
