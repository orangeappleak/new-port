const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      height: {
        'locked-screen': 'calc(var(--vh-locked, 1vh) * 100)',
        'locked-screen-60': 'calc(var(--vh-locked, 1vh) * 60)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        imperial: ['var(--font-imperial)', ...fontFamily.sans],
      },
    },
  },
};

module.exports = config;

export default config;
