const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        imperial: ['var(--font-imperial)', ...fontFamily.sans],
      },
    },
  },
};

module.exports = config;

export default config;
