/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        prussianBlueAccent: "#003B67",
        prussianBlueMediumDark: "#012A4A",
        prussianBlueDeep: "#001F36",
        prussianBlueMuted: "#001630",
        prussianBlueDarkest: "#0A1128",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
