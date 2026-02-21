/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Syne', 'sans-serif'],
                body: ['Outfit', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#fdf8f6',
                    100: '#f2e8e5',
                    200: '#eaddd7',
                    300: '#e0cec7',
                    400: '#d2bab0',
                    500: '#a3a5ee', /* vibrant yet soft accent */
                    600: '#8e8bfa',
                    700: '#645cf4',
                    800: '#1b1b1f',
                    900: '#0f0f11',
                },
                surface: {
                    light: '#ffffff',
                    base: '#fafafa',
                    dark: '#f0f0f0',
                }
            },
            borderRadius: {
                'organic-1': '60% 40% 30% 70% / 60% 30% 70% 40%',
                'organic-2': '30% 70% 70% 30% / 30% 30% 70% 70%',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'morph': 'morph 8s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                morph: {
                    '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
                    '50%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
                }
            }
        },
    },
    plugins: [],
}
