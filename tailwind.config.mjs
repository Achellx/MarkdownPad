module.exports = {
    important: '#root',
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/**/*.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace']
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}