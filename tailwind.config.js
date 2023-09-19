/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pageComponents/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-500/70',
    'bg-yellow-500/70',
    'bg-blue-500/70',
    'bg-sky-500/70',
    'bg-white-500/70',
  ],
};
