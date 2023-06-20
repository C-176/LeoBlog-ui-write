/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  // important: true,
  theme: {
    extend: {},
  },
  //字体大小
    fontSize: {
        'xs': '.75rem',

    },


  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
}
