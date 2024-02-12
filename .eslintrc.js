module.exports = {
  extends: ["eslint:recommended", "prettier"],
  plugins: [],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
  },
};
