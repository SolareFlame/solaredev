/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        {
            pattern: /(bg|text|border|from|to)-(solart|camion|smpc|klaxon|crousto)(|-(background|tertiary|border|secondary|dark|dark-(background|tertiary|border|secondary)))/,
        },
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
            },
            colors: {
                background: '#FFFFFF',
                background_dark: '#100E15',

                camion: {
                    primary: '#D72626',
                    secondary: '#F8D1D1',
                    tertiary: '#FFEAEA',
                    border: '#E5B4B4',
                    background: '#FFF5F5',

                    dark: {
                        primary: '#F12D2D',
                        secondary: '#811E21',
                        tertiary: '#49161B',
                        border: '#2D1218',
                        background: '#1F1017',
                    },
                },
                solart: {
                    primary: '#FB6B00',
                    secondary: '#FFD6AC',
                    tertiary: '#FFEBD8',
                    border: '#FFC28B',
                    background: '#FFF4EC',

                    dark: {
                        primary: '#FB6B00',
                        secondary: '#863D0B',
                        tertiary: '#4B2610',
                        border: '#2E1A13',
                        background: '#1F1414',
                    },
                },
                smpc: {
                    primary: '#49D69B',
                    secondary: '#D1F2E6',
                    tertiary: '#EAFBF5',
                    border: '#B9EAD5',
                    background: '#F4FFFC',

                    dark: {
                        primary: '#49D69B',
                        secondary: '#2D7258',
                        tertiary: '#1F4037',
                        border: '#182726',
                        background: '#141B1E',
                    },
                },
                klaxon: {
                    primary: '#B53EFF',
                    secondary: '#E5D1FA',
                    tertiary: '#F3E9FF',
                    border: '#D9BFF7',
                    background: '#FBF6FF',

                    dark: {
                        primary: '#B53EFF',
                        secondary: '#63268A',
                        tertiary: '#3A1A50',
                        border: '#251433',
                        background: '#1B1124',
                    },
                },
                crousto: {
                    primary: '#FAAF18',
                    secondary: '#FFE8B2',
                    tertiary: '#FFF5D9',
                    border: '#FFD78A',
                    background: '#FFFBF0',

                    dark: {
                        primary: '#FAAF18',
                        secondary: '#855F17',
                        tertiary: '#4B3716',
                        border: '#2E2316',
                        background: '#1F1916',
                    },
                },
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
