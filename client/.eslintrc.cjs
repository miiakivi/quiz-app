module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "prettier"
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser"
  },
  plugins: [ "vue" ],
  rules: {
    "vue/script-indent": [ "error", 2, { baseIndent: 1 } ],
    "vue/no-unused-components": "warn",
    "vue/no-unused-vars": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/space-before-function-paren": [ "error", "always" ],
    // to enforce using type for object type definitions, can be type or interface
    "@typescript-eslint/consistent-type-definitions": [ "warn", "type" ],
    "array-bracket-spacing": [ "error", "always", { arraysInArrays: false } ],
    "space-in-parens": [ "error", "always" ],
    quotes: [ "error", "double" ],
    semi: [ "error", "always" ],
    "comma-spacing": [ "error", { before: false, after: true } ],
    "object-curly-spacing": [ "error", "always" ],
    "template-curly-spacing": [ "error", "always" ],
    "max-len": [ "warn", { code: 120 } ]
  }
};

