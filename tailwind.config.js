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
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#0F0F0F',
        },
        green: {
          DEFAULT: '#16A34A',
          50: '#E9FBEF',
          100: '#CFF7DC',
          200: '#A8EDBF',
          300: '#78DC9B',
          400: '#42C873',
          500: '#16A34A',
          600: '#11833D',
          700: '#0D672F',
          800: '#094D23',
          900: '#063A1A',
          950: '#042D13',
        },
      },
      borderColor: {
        light: '#E4E4E74D',
        dark: '#18181B4D',
        green: '#42D08B',
        red: '#D95254',
      },
    },
  },

  plugins: [],
  darkMode: 'class',
};

export default tailwindConfig;
