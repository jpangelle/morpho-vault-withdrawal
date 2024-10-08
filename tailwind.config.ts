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
        "morpho-gradient":
          "linear-gradient(to top right, rgba(85, 51, 255),rgba(37, 148, 255),rgba(62, 220, 235),rgba(165, 254, 202))",
      },
      colors: {
        "morpho-card": "rgba(250, 252, 255, 1)",
        "morpho-background": "rgba(240, 242, 247, 1)",
        "morpho-primary": "rgba(25, 29, 32)",
        "morpho-error": "rgba(199, 62, 89, 0.95)",
        "morpho-success": "rgba(57, 166, 153, 0.95)",
        "morpho-blue": "rgba(68, 147, 237, 1)",
      },
      boxShadow: {
        "morpho-shadow": "0 3px 12px 0 rgba(0,0,0,0.09)",
      },
    },
  },
  plugins: [],
};
export default config;
