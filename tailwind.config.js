/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F7FA",
        card: "#FFFFFF",
        primary: "#005BAA",
        button: "#0072CE",
        textMain: "#1F2937",
        textMuted: "#6B7280",
        danger: "#EF4444",
        success: "#10B981",
        warning: "#F59E0B",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 91, 170, 0.1)',
        'premium-hover': '0 10px 30px -5px rgba(0, 91, 170, 0.15)',
      }
    },
  },
  plugins: [],
}
