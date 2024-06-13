/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bb-black': {
          DEFAULT: '#22092C',
          light: '#37233F',
          lighter: '#5f426c'
        },
        'bb-white': '#D3CED5',
        'bb-maroon': '#872341',
        'bb-red': '#BE3144',
        'bb-orange': '#F05941'
      },
      zIndex: {
        '1-header': '100',
        '2-nav': '110',
        '3-menu': '120',
        '4-modal': '130'
      }
    }
  },
  plugins: []
}
