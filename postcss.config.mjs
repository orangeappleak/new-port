const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        script: ['Imperial Script', 'sans-serif'],
      },
    },
  },
};
module.exports = config;

export default config;
