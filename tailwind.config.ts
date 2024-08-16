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
        "morpho-background": "rgba(240, 242, 247, 1)",
        "morpho-primary": "rgba(25, 29, 32)",
      },
    },
  },
  plugins: [],
};
export default config;
