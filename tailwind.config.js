module.exports = {
  purge: {
    content: ['./src/**/*.vue'],
    options: {
      whitelist: [
        'bg-blue-600',
        'bg-blue-700',
        'bg-blue-800',
        'border-blue-500',
        'border-blue-600',
        'border-blue-700',
      ],
    },
  },
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