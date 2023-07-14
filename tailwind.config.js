/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#dd1f2c',
        'brand-black': '#050708',
        'smoke-black': '#393940',
        'gray-hover': '#56565a',
        'white-smoke': '#f0f2f5',
      },
      fontFamily: {
        'roboto': ['Roboto'],
        'poppin': ['Poppins'],
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin')
  ],
}