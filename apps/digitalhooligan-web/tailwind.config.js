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
        // Public v1 tokens (canonical)
        "dh-rebel-red": "#FF3B30",     // Primary CTA only (conversion)
        "dh-steel-blue": "#4DA3FF",    // Links + secondary CTAs

        "dh-carbon": "#0B0F14",        // Background
        "dh-panel": "#111827",         // Surface
        "dh-border": "#243042",        // Border

        "dh-text": "#F7FAFF",          // Text primary
        "dh-muted": "#A7B0C0",         // Text muted

        // Legacy names kept for existing usage (mapped to Public v1)
        "dh-black": "#0B0F14",
        "dh-offwhite": "#F7FAFF",
        "dh-street-gray": "#A7B0C0",
      },
    },
  },
  plugins: [],
};
