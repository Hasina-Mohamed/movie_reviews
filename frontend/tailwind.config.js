/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#161D2F',
        secondary: '#10141F',
        accent: '#FC4747',
        textPrimary: '#FFFFFF',
        textSecondary: '#8E95A9',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}


