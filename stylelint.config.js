module.exports = {
  extends: ['stylelint-config-recommended'],
  overrides: [
    {
      customSyntax: 'postcss-styled-syntax',
      files: ['**/*.css'],
    },
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
  },
};
