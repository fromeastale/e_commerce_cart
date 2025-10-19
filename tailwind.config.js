/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'cards': 'repeat(auto-fill, minmax(220px, 1fr))'
      }
    },
  },
  plugins: [],
};
