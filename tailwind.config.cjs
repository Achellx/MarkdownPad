module.exports = {
  important: "#root",
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        tabIn: {
          "0%": {
            transform: "translateY(-10px) scale(0.95)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0) scale(1)",
            opacity: 1,
          },
        },
      },
      animation: {
        "tab-in": "tabIn 0.3s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
