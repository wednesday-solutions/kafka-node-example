module.exports = {
  content: [
    "./dist/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.html",
    "../../packages/ui-components/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [require("@tailwindcss/forms")],
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
};
