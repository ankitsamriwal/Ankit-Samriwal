/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./index.tsx", "./App.tsx", "./advisory.ts", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: '#F6F2EA',
        paper: '#EFE9DD',
        ink: '#15130F',
        stone: '#5F5A50',
        rule: '#D9D1C2',
        oxblood: '#7A2E1D',
        brass: '#C9A46A',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
