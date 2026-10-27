import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F4EE",
        foreground: "#292A25",
        ivory: {
          DEFAULT: "#F7F4EE",
          warm: "#F5F0E6",
          dark: "#EDE6D9",
        },
        beige: {
          DEFAULT: "#E9E0D3",
          light: "#EFE8DC",
          dark: "#D8CEBE",
        },
        charcoal: {
          DEFAULT: "#292A25",
          soft: "#383933",
          dark: "#1A1A18",
        },
        muted: {
          stone: "#77756E",
          light: "#9A978E",
          dark: "#5E5C56",
        },
        olive: {
          DEFAULT: "#56634B",
          leaf: "#4A5844",
          light: "#75836A",
          dark: "#3B4735",
          subtle: "#EFF2EC",
        },
        tan: {
          DEFAULT: "#A99276",
          light: "#C5B29B",
          dark: "#8C765C",
        },
        stone: {
          border: "#DDD7CC",
          light: "#E7E2D8",
          dark: "#C9C2B4",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        luxury: "0.15em",
        editorial: "0.08em",
      },
      transitionDuration: {
        luxury: "400ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
