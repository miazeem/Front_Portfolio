/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Manrope', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            colors: {
                navy: {
                    950: '#03050d',
                    900: '#060918',
                    800: '#090e22',
                    700: '#0d1228',
                    600: '#131830',
                    500: '#1a2040',
                    400: '#232b55',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s ease-in-out infinite',
                'marquee': 'marquee 30s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
        },
    },
    plugins: [],
}
