/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "blue": "#64748b",
        "dark blue": "#334155",
        "secondary": "#555",
        "prigmayBG": "#FCFCFC"
      }
    },
    screens: {
      'customBp': {'raw': '(max-height: 500px),(max-width:300px)'},
      ...defaultTheme.screens,
    },
  },
  plugins: [require('daisyui'),],
};
