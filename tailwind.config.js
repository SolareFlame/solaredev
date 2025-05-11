/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
            },
            colors: {
                background: '#100E15',
            },
            keyframes: {
                scroll: {
                    '0%': {transform: 'translateX(0)'},
                    '100%': {transform: 'translateX(-50%)'},
                },
                scroll_reverse: {
                    '0%': {transform: 'translateX(-50%)'},
                    '100%': {transform: 'translateX(0)'},
                },
                gradient: {
                    '0%': {backgroundPosition: '0% 50%'},
                    '50%': {backgroundPosition: '100% 50%'},
                    '100%': {backgroundPosition: '0% 50%'},
                },
                shine: {
                    '0%': {'background-position': '100%'},
                    '100%': {'background-position': '-100%'},
                },
                'star-movement-bottom': {
                    '0%': {transform: 'translate(0%, 0%)', opacity: '1'},
                    '100%': {transform: 'translate(-100%, 0%)', opacity: '0'},
                },
                'star-movement-top': {
                    '0%': {transform: 'translate(0%, 0%)', opacity: '1'},
                    '100%': {transform: 'translate(100%, 0%)', opacity: '0'},
                },
            },
            animation: {
                scroll: 'scroll 20s linear infinite',
                scroll_reverse: 'scroll_reverse 20s linear infinite',
                gradient: 'gradient 8s linear infinite',
                shine: 'shine 5s linear infinite',
                'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
                'star-movement-top': 'star-movement-top linear infinite alternate',
            },
        },
    },
    plugins: [],
};
