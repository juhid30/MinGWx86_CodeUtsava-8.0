/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".invisible-scrollbar": {
          "scrollbar-width": "none" /* For Firefox */,
          "-ms-overflow-style": "none" /* For Internet Explorer */,
        },
        ".invisible-scrollbar::-webkit-scrollbar": {
          display: "none" /* For Chrome, Safari, and Opera */,
        },
      });
    },
  ],
};
