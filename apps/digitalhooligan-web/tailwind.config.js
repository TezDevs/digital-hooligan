/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                rebel: {
                    red: {
                        DEFAULT: '#C1121F',        // Rebel Red primary
                        soft: 'rgba(193,18,31,0.1)',
                        border: 'rgba(193,18,31,0.2)',
                        text: '#F87171',
                    },
                },
            },
        },
    },
    plugins: [],
};