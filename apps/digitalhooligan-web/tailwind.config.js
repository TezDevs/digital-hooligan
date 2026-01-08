/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Digital Hooligan tokens (public v1)
        "dh-black": "#0B0B0B",
        "dh-offwhite": "#F8FAFC",
        "dh-street-gray": "#94A3B8",
        "dh-electric-mint": "#2AF3C0",
        "dh-rebel-red": "#FF2D2D",
      },
    },
  },
  plugins: [],
};
