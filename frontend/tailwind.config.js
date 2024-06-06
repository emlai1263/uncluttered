/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      forest: "#496755",
      blue: "#697F87",
      "blue-dark": "#5D7178",
      beige: "#DCD3C9",
      "beige-dark": "#CDC5BC",
      sky: "#D8E5E1",
      "sky-dark": "#C7D5D0",
      lavender: "#B6A5AA",
      moss: "#879276",
      "moss-dark": "#7D876D",
      white: "#fff",
      black: "#000",
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#475569",
      },
    },
    container: {
      center: true,
      padding: "2rem",
    },
    fontFamily: {
      outfit: ["Outfit", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
  variants: {
    extend: {
      opacity: ["responsive", "hover", "focus", "group-hover"],
    },
  },
};
