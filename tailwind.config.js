module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        spacing: {
            '72': '18rem',
            '84': '21rem',
            '96': '24rem',
            '160': '40rem',
            '192': '48rem',
            '2px': '2px',
            '10px':'10px'
        },
        colors: {
            'taskBlue': '#0087c9',
            'taskYellow': '#ffb168',
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
