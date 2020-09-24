module.exports = {
  purge: ['./components/*.vue', './views/*.vue'],
  theme: {
    container: {
      center: true,
      padding: {
        default: '2rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {},
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  corePlugins: {
    outline: false,
  },
  variants: {},
  plugins: [],
}
