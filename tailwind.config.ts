import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ruinsSand: "#f1e4bf",
        ruinsStone: "#6f5a44",
        jungle: "#2d6a3f",
        ember: "#d96f30"
      }
    }
  },
  plugins: []
};

export default config;
