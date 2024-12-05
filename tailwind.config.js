/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    screens : {
      "md" : "850px",
      "lg" : "1024px"
    }
  },
  plugins: [],
};
