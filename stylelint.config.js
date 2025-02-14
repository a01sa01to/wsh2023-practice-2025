module.exports = {
  extends: ['stylelint-config-recommended'],
  overrides: [
    {
      customSyntax: 'postcss-styled-syntax',
      files: ['**/*.{js,ts,jsx,tsx,css}'],
    },
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
  },
};
