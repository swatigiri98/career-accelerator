/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1120",
          900: "#131B2E",
          800: "#1B2540",
          200: "#94A3B8",
          50: "#E7EAF0",
        },
        paper: {
          50: "#F7F8FA",
          0: "#FFFFFF",
          200: "#E4E7EC",
          600: "#5B6474",
          900: "#12172B",
        },
        amber: {
          400: "#F5A524",
          600: "#C97D0A",
        },
        signal: {
          green: "#34D399",
          red: "#F87171",
        },
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
