/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            width: {
                reader: '1024px',
            },
            height: {
                reader: '768px'
            },
            maxWidth: {
                reader: '1024px'
            },
            colors: {
                background: '#161514'
            }
        },
    },
    plugins: [],
}

