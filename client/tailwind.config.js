/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        "mobilex": "1rem",
        "normalx": "5rem"
      },
      colors: {
        "pr-red": "#EF4444",
        "pr-green": "#16A34A",
        "pr-blue": "#3B82F6",
        "pr-gray": "#E5E7EB",
        "sc-black": "#333333"
      }
    },
  },
  plugins: [],
}
