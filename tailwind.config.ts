import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
    "./interfaces/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          xl: "1280px"
        }
      },
      colors: {
        background: {
          navbar: "#FDFDFD",
          navbarMenu: {
            DEFAULT: "#F5F5F6",
            active: "#E4E4E4",
            hover: "#ECECED"
          },
          page: {
            primary: "#FDFDFD"
          },
          brand: {
            primary: "#F2FCFB",
            primary_hover: "#EAFCF7",
            solid_alt: "#135B44"
          },
        },
        text: {
          primary: "#000000",
          secondary: "#94969c",
          tertiary: "#F5F5F6",
          quaternary: "#F5F5F6",
          quinary: "#F5F5F6",
          senary: "#F5F5F6",
          septenary: "#F5F5F6",
          octonary: "#F5F5F6",
          nonary: "#F5F5F6"
        },
        border: {
          primary: "#CECFD2",
          secondary: "#ECECED",
          tertiary: "#EAECF0",
          quaternary: "#E4E4E4",
          brand: {
            DEFAULT: "#82EFCD",
            solid: "#1C8967",
            solid_alt: "#135B44"
          },
          success: {
            DEFAULT: "#75E0A7",
            solid: "#079455",
          },
          error: {
            DEFAULT: "#FDA29B",
            solid: "#D92D20",
          },
          warning: {
            DEFAULT: "#FEC84B",
            solid: "#DC6803",
          },
        }
      }
    }
  },
  plugins: []
};

export default config;
