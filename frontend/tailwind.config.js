/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#eef6ff",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af"
        },
        ink: "#172033"
      },
      boxShadow: {
        soft: "0 12px 36px rgba(23, 32, 51, 0.08)"
      }
    }
  },
  plugins: []
};
