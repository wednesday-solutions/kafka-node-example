module.exports = {
  ...require('config/eslint-preset'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  }
}
