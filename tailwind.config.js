/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gradientColorStops: theme => ({
        'gradientFrom': theme('colors.gradientFrom', '#6b7280'), // example color
        'gradientVia': theme('colors.gradientVia', '#3b82f6'),   // example color
        'gradientTo': theme('colors.gradientTo', '#9333ea'),      // example color
      }),

    },
  },
  plugins: [],

  
}
