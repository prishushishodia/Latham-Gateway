/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-rust': '#b44f19',
        'brand-rust-hover': '#9e4313',
        'brand-teal': '#026362',
        'brand-teal-dark': '#0f5150',
        'brand-teal-light': '#e6f0f0',
        'brand-bg-top': '#f4f6f8',
        'brand-bg-middle': '#faf7eb',
        'brand-bg-section': '#f0f0f0',
        'brand-bg-footer': '#f0f0f0',
        'brand-text-main': '#212121',
        'brand-text-muted': '#666666',
        'brand-sp-bg': '#f7f8fa',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
