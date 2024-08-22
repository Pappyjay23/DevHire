/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        neohellenic: ['GFS Neohellenic', 'sans-serif'],
        gowun: ['Gowun Dodum', 'sans-serif']
      }
    }
  },
  plugins: []
}
