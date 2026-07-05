import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        "secondary-bg": "#0A0A0A",
        accent: {
          blue: "#FFFFFF",
          purple: "#737373",
          cyan: "#E5E5E5",
        },
        brand: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          500: "#737373",
          600: "#262626",
          700: "#171717",
        },
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-satoshi)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 25s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 8s ease-in-out infinite",
        "scroll": "scroll 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(12px) rotate(-2deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
