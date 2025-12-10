/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        "primary-light": "#334155",
        accent: "#f97316",
        "accent-hover": "#ea580c",
        background: "#f8fafc",
        surface: "#ffffff",
        "text-main": "#1e293b",
        "text-secondary": "#64748b",
        border: "#e2e8f0",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
