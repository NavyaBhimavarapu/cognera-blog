import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cognera brand palette — use these in your components
        brand: {
          purple:     "#270F59",
          violet:     "#7B6CD9",
          lavender:   "#D288F2",
          navy:       "#010D26",
          dark:       "#101C26",
          slate:      "#344859",
          blue:       "#23518C",
          muted:      "#344859",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
