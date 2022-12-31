/** @type { import("eslint").ESLint.ConfigData } */
module.exports = {
  extends: '@cuaklabs/eslint-config-porygon',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};
