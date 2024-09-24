import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        bounce: "bounce 1.5s infinite",
        fadeIn: "fadeIn 1.5s ease-in-out",
        textPulse: "textPulse 2s infinite", // Custom text pulse animation
        zoomIn: "zoomIn 1.5s ease-in-out", // Custom image zoom animation
        fadeOut: "fadeOut 1.5s ease-in-out", // Fade-out animation for images
        spinSlow: "spinSlow 5s linear infinite", // Slow spin animation
        fadeInUp: "fadeInUp 1.5s ease-in-out",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        textPulse: {
          "0%": { opacity: "0.7" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.7" },
        },
        zoomIn: {
          "0%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      extend: {
        fontFamily: {
          lexend: ["Lexend Exa"],
          keyframes: {
            spinner: {
              to: { transform: "rotate(360deg)" },
            },
          },
          animation: {
            spinner: "spinner 0.5s linear infinite",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
