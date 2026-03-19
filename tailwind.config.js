/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: "#7A1E2C",   // slightly deeper, more aristocratic
        brown: "#2B211C",      // richer heritage brown
        cream: "#F6F3EE",      // warmer ivory (less modern white)
        ink: "#0F1720",        // deep navy-charcoal (for footer/nav)
      },
    }
  },
  plugins: [],
};